<template>
	<view class="content login">
		<view class="login_box">
			<view class="name_int log_int">
				<input type="number" v-model="userfrom.username" placeholder="用户名/电话" />
			</view>
			<view class="pass_int log_int">
				<input type="password" v-model="userfrom.password" placeholder="密码" />
			</view>
			<view class="log_btn">登录</view>
		</view>
		<view class="orthers">
			<view class="wx_btn">微信快捷登录</view>
			<view class="circle"></view>
			<view class="action">
				<text>找回密码</text>
				<text class="space">|</text>
				<text>注册账号</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userfrom: {
					username: '',
					password: '',
				},
			};
		}
	}
</script>

<style lang="scss">
.login{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	&_box{
		width: 690rpx;
		margin: 0 auto;
		box-sizing: border-box;
		padding-top: 150rpx;
		.log_int{
			width: 100%;
			height: 108rpx;
			background: #F2F5FA;
			border-radius: 16rpx;
			box-sizing: border-box;
			padding-left: 30rpx;
			input{
				width: 100%;
				height: 100%;
				line-height: 108rpx;
				color: #000;
				font-size: 34rpx;
			}
		}
		.pass_int{
			margin-top: 30rpx;
		}
		.log_btn{
			width: 690rpx;
			height: 90rpx;
			background: #FBA933;
			border-radius: 54rpx;
			text-align: center;
			line-height: 90rpx;
			margin-top: 64rpx;
			font-size: 34rpx;
			letter-spacing: 10rpx;
			color: #FFFFFF;
		}
	}
	.orthers{
		width: 100%;
		margin-top: 70rpx;
		.wx_btn{
			width: 100%;
			font-size: 28rpx;
			color: #576B95;
			text-align: center;
		}
		.circle{
			width: 100rpx;
			height: 100rpx;
			border: 2rpx solid #707070;
			border-radius: 50%;
			margin: 20rpx auto 0;
		}
		.action{
			width: 100%;
			font-size: 28rpx;
			color: #576B95;
			text-align: center;
			margin-top: 48rpx;
			.space{
				margin: 0 10rpx;
			}
		}
	}
}
</style>
