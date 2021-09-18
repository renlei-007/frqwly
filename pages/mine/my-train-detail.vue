<template>
	<view class="my-train-detail content">
		<view class="actives_box">
			<view class="actives_box_title">{{record.content.title}}</view>
			<view class="actives_box_img" v-if="record.status == 1 || record.status == 3">
				<image class="code_img" :src="globalUrl+'special/o_create_dimensioncode.jspx?content='+qrcodeCotent()" mode=""></image>
				<view class="state" v-if="record.status ==3"><image :src="verifyImg"></image></view>
			</view>
			<view class="info">
				<view>编号：{{record.id}}</view>
				<view>报名时间：{{record.createTime}}</view>
				<view>上课时间：{{record.content.attr_startTime}}至{{record.content.attr_endTime}}</view>
				<view>培训地址：{{record.content.attr_address}}</view>
				<view>状态：
				<text v-if="record.status == 0">审核中</text>
				<text v-if="record.status == 1">审核通过</text>
				<text v-if="record.status == 2">审核不通过</text>
				<text v-if="record.status == 3">审核通过,已使用</text>
				<text v-if="record.status == 4">已经取消</text>
				</view>
				<view class="rule" v-if="record.reason">{{record.reason}}</view>
			</view>
			<view class="cancel_btn" @click="cancelRecord(id)" v-if="record.status == 0||record.status == 1">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				record: {
					content: {},
				},
				verifyImg:'/static/verify_img.png',
				id: '',
				globalUrl: 'https://furong.culturalcloud.net/',
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			qrcodeCotent(){
				let params={
					type : 5,
					value: this.id
				}
				return encodeURIComponent(JSON.stringify(params));
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
								url: '/train/cancel',
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
					url: '/train/detail',
					method: 'GET',
					data: {recordId: this.id},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.record = res.body
						console.log(res.body.status);
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
.my-train-detail{
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
