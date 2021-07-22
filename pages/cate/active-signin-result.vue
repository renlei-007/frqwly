<template>
	<view class="active-signin-result content">
		<image class="sign_icon" src="/static/sign-success.png" mode=""></image>
		<view class="sign_result">{{status==0?'预约成功(请到我的活动页面等待审核结果)':status==1?'预约成功':'预约失败'}}</view>
		<view class="sign_tips">入场时请携带【身份证】</view>
		<view class="sub" v-if="status==1" @tap="submit">{{status==0?'到我的活动页面':status==1?'点击查看':'返回'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				status: 0,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getStatus()
		},
		methods: {
			getStatus(){
				this.homeRequest({url:'/ticket/detail',data:{recordId: this.id}}).then(res=>{
					console.log(res);
					let record = res.body;
					this.status = record.status
					if(record.status == 0){
						this.toast()
					}
				})
			},
			submit(){
				if(this.status==0){
					uni.navigateTo({
						url: '/pages/mine/myactive'
					})
				}else if(this.status==1){
					uni.navigateTo({
						url: './active-code?id='+this.id
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
			},
		},
	}
</script>

<style lang="scss">
.active-signin-result{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	.sign_icon{
		width: 240rpx;
		height: 240rpx;
	}
	.sign_result{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 40rpx;
		color: #1B1C1E;
	}
	.sign_tips{
		width: 100%;
		height: 68rpx;
		line-height: 68rpx;
		font-size: 32rpx;
		color: #ccc;
	}
	.sub{
		width: 432rpx;
		height: 84rpx;
		background: #F87C64;
		border-radius: 42rpx;
		margin: 30rpx auto 300rpx;
		line-height: 84rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
}
</style>
