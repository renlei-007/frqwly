<template>
	<view class="content revise-phone">
		<view class="phone inp_box">
			<input type="number" v-model="phonenumber" placeholder="请输入手机号码" />
		</view>
		<view class="code inp_box">
			<input type="number" class="code_inp" v-model="code" placeholder="验证码" />
			<view class="tips" @tap="getCode">{{tips}}</view>
		</view>
		<view class="submit" @tap="submit">保存修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonenumber: '',
				code: '',
				tips: '获取验证码',
				step: 0,
				timer: null,
			};
		},
		methods: {
			getCode(){
				if(this.step==0){
					this.tips = 60
					let s = 60
					this.timer = setInterval(()=>{
						console.log(22222222);
						s--
						this.tips = s
						if(s==0){
							this.tips = '重新获取'
							this.step = 1
							clearTimeout(this.timer)
							this.timer = null
						}
					},1000)
				}
				if(this.step==1){
					this.tips = 60
					let s = 60
					this.timer = setInterval(()=>{
						console.log(22222222);
						s--
						this.tips = s
						if(s==0){
							this.tips = '重新获取'
							this.step = 1
							clearTimeout(this.timer)
							this.timer = null
						}
					},1000)
				}
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	box-sizing: border-box;
	padding-top: 40rpx;
	.inp_box{
		width: 690rpx;
		height: 106rpx;
		background-color: #f2f5fa;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 0 32rpx;
		margin: 40rpx auto 0;
		display: flex;
		align-items: center;
		input{
			width: 100%;
			height: 40rpx;
			font-size: 32rpx;
			color: #000;
		}
	}
	.code{
		justify-content: space-between;
		margin-top: 60rpx;
		.code_inp{
			width: 50%;
		}
		.tips{
			font-size: 32rpx;
			color: #6446E1;
		}
	}
	.submit{
		width: 690rpx;
		height: 90rpx;
		background: #6446E1;
		border-radius: 54rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 80rpx auto 0;
		font-size: 32rpx;
		color: #FFFFFF;
		opacity: 0.9;
	}
}
</style>
