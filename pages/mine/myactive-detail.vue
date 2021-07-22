<template>
	<view class="myactive-detail content">
		<view class="actives_box" v-if="record.status != 1 && record.status != 3">
			<view class="actives_box_tips">订单详情</view>
			<view class="actives_box_title">{{record.content.title}}</view>
			<view class="info">
				<view>预订时间：{{record.bookingDate}}</view>
				<view>预订时段：{{record.slot}}</view>
				<view>预定数量：{{record.num}}</view>
				<view>创建时间：{{record.createTime}}</view>
				<view>订单状态：
				<text v-if="record.status == 0">审核中</text>
				<text v-if="record.status == 1">审核通过</text>
				<text v-if="record.status == 2">审核不通过</text>
				<text v-if="record.status == 3">审核通过,已使用</text>
				<text v-if="record.status == 4">已经取消</text>
				</view>
				<view class="rule" v-if="record.reason">{{record.reason}}</view>
			</view>
			<view class="cancel_btn" @click="cancelRecord(record.id)" v-if="record.status == 0">取消订单</view>
		</view>
		<block v-if="record.status == 1 || record.status == 3">
			<view class="actives_box" v-for="(item, index) in record.orders" :key="index">
				<view class="actives_box_tips">核销二维码</view>
				<view class="actives_box_img">
					<image class="code_img" :src="baseUrl+'special/o_create_dimensioncode.jspx?content='+qrcodeCotent(item)" mode=""></image>
					<view class="state" v-if="item.status ==1"><image :src="verifyImg"></image></view>
				</view>
				<view class="actives_box_title">{{record.content.title}}</view>
				<view class="info">
					<view>订单编号：{{item.orderNo}}</view>
					<view>订单地址：{{content.attr_address}}</view>
					<view>预订时间：{{record.bookingDate}}</view>
					<view>预订时段：{{record.slot}}</view>
					<view>订单票数：{{record.orders.length}}张（第{{index+1}}张）</view>
					<view>订单状态：{{formatState(item)}}</view>
					<view class="rule" v-if="record.reason">{{record.reason}}</view>
				</view>
				<view class="cancel_btn" v-if="item.status == 0" @tap="cancel(item.orderNo)">取消报名</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verifyImg:'/static/verify_img.png',
				id: '',
				content: {},
				record: {
					orders:[],
					content: {},
				}, 
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			qrcodeCotent(item){
				let params={
					type : 1,
					value: item.orderNo
				}
				return encodeURIComponent(JSON.stringify(params));
			},
			formatState(item){
				if(item.status == 0){
					return '审核通过，待参加';
				}else if(item.status == 1){
					return '已核销';
				}else if(item.status == 2){
					return '已取消';
				}else if(item.status == 3){
					return '已过期';
				}
			},
			cancelRecord(recordId){
				uni.showModal({
					title: '提示',
					content: '确定要取消该活动预约吗？',
					success: (res) => {
						if (res.confirm) {
							this.homeRequest({
								url: '/ticket/cancelRecord',
								method: 'GET',
								data: {recordId: recordId},
							}).then(res=>{
								console.log(res);
								if(res.code==200){
									this.getDetail()
									this.toast('取消成功！','none')
								}else{
									this.toast(res.message,'none')
								}
							})
						} else if (res.cancel) {
						}
					}
				});
			},
			cancel(orderNo){
				uni.showModal({
					title: '提示',
					content: '确定要取消该活动吗？全年未入场票数达10张，将被取消当年预订资格！',
					success: (res) => {
						if (res.confirm) {
							this.homeRequest({
								url: '/ticket/cancel',
								method: 'GET',
								data: {orderNo: orderNo},
							}).then(res=>{
								console.log(res);
								if(res.code==200){
									this.getDetail()
									this.toast('取消成功！','none')
								}else{
									this.toast(res.message,'none')
								}
							})
						} else if (res.cancel) {
						}
					}
				});
			},
			getDetail(){
				this.homeRequest({
					url: '/ticket/detail',
					method: 'GET',
					data: {recordId: this.id},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.record = res.body
						this.indexRequest({url:'/content/get.jspx',data:{
							format: 0,
							id: this.record.content.id
						}}).then(res=>{
							this.content = res.data.body
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
.myactive-detail{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	.actives_box{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 28rpx;
		line-height: 1.8;
		&_tips{
			text-align: center;
		}
		&_img{
			width: 400rpx;
			height: 400rpx;
			margin: 10rpx auto 20rpx;
			position: relative;
			.code_img{
				width: 100%;
				height: 100%;
			}
			.state{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		&_title{
			font-size: 34rpx;
			color: #000;
			padding-bottom: 10rpx;
			font-weight: bold;
		}
		.rule{
			color: #ff4600
		}
		.cancel_btn{
			width: 200rpx;
			height: 90rpx;
			margin: 30rpx auto 0;
			text-align: center;
			line-height: 90rpx;
			border: 1px solid #ddd;
			color: #000;
		}
	}
}
</style>
