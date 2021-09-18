<template>
	<view class="my-volunteer-detail content">
		<view class="actives_box">
			<block v-if="record.status ==1  || record.status == 3">
				<view class="actives_box_tips">核销二维码</view>
				<view class="actives_box_img">
					<image class="code_img" :src="globalUrl+'special/o_create_dimensioncode.jspx?content='+qrcodeCotent()" mode=""></image>
					<view class="state" v-if="record.status ==3"><image :src="verifyImg"></image></view>
				</view>
			</block>
			<view class="actives_box_title">{{record.content.title}}</view>
			<view class="info">
				<view>编号：{{record.id}}</view>
				<view>服务时间：<text v-text="(record.content.attr_startTime || '').substring(0,10)"></text>至<text v-text="(record.content.attr_endTime || '').substring(0,10)"></text></view>
				<view>电话：{{record.content.attr_phone}}</view>
				<view>地址：{{record.content.attr_address}}</view>
				<view class="rule" v-if="record.reason">{{record.reason}}</view>
				<view>状态：
					<text v-if="record.status == 0">未审核</text>
					<text v-if="record.status == 1">审核通过</text>
					<text v-if="record.status == 2">审核不通过</text>
					<text v-if="record.status == 3">已使用</text>
					<text v-if="record.status == 4">已经取消</text>
					<text v-if="record.status == 5">已过期</text>
				</view>
			</view>
			<view class="cancel_btn" v-if="record.status == 0 || record.status == 1" @tap="cancel()">取消报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verifyImg:'/static/verify_img.png',
				record: {
					id: '',
					status: '',
					orderNo: '',
					content: {
						attr_startTime: '',
						attr_endTime: '',
						attr_phone: '',
						
					},
					reason: '',
				},
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
					type: 6,
					value: this.record.id
				}
				return encodeURIComponent(JSON.stringify(params));
			},
			cancel(){
				var tip = '确定要取消该志愿服务吗？全年取消次数达到10次，将被取消当年预订资格！';
				uni.showModal({
					title: '提示',
					content: tip,
					success: (res) => {
						if (res.confirm) {
							this.homeRequest({
								url: '/volunteer/cancel',
								method: 'GET',
								data: {recordId: this.id},
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
					url: '/volunteer/detail',
					method: 'GET',
					data: {recordId: this.id},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						uni.setNavigationBarTitle({
							title: res.body.content.title
						})
						this.record = res.body
					}
				})
			},
		},
	}
</script>

<style lang="scss">
.my-volunteer-detail{
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
