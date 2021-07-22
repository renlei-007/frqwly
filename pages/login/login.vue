<template>
	<view class="content login">
		<view class="login_box">
			<view class="name_int log_int">
				<input type="text" v-model="userform.username" placeholder="用户名/电话" />
			</view>
			<view class="pass_int log_int">
				<input type="password" v-model="userform.password" placeholder="密码" />
			</view>
			<view class="log_btn" @tap="login">登录</view>
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
	import rand from '@/common/random.js'
	import sign from '@/common/sign.js'
	import aes from '@/common/aes.js'
	import Vue from 'vue'
	export default {
		data() {
			return {
				userform: {
					username: '',
					password: '',
					is_thing: false,
				},
			};
		},
		onLoad(e) {
			this.is_thing = e.is_thing
		},
		methods: {
			login(){
				let globalData = {
					appId:"1580387213331704",
					appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",
					aesKey:"S9u978Q31NGPGc5H",
					ivKey:"X83yESM9iShLxfwS",
				}
				var nonce_str = rand.getRand();//随机数
				let postParams=[];
				let aesPassword = aes.encrypt(this.userform.password, globalData.aesKey, globalData.ivKey);
				postParams[0] = ['username', this.userform.username];
				postParams[1] = ['aesPassword', aesPassword];
				postParams[2]=["appId", globalData.appId];
				postParams[3]=["nonce_str",nonce_str];
				var signVal=sign.createSign(postParams, globalData.appKey);//签名
				this.request({
					url:'/user/login.jspx',
					data:{
					  username:this.userform.username,
					  aesPassword: aesPassword,
					  appId: globalData.appId,
					  nonce_str:nonce_str,
					  sign:signVal
					},
					complete: (res)=>{
						console.log(res);
						if(res.code!=200){
							console.log(1);
							uni.showToast({
							  title:res.message,
							  icon:'none'
							})
						}
						if(res.code==200){
							console.log(2);
							this.getUser(this.userform.username, res.body).then(user=>{
								console.log(11111111);
								uni.setStorageSync('sessionKey', res.body);
								console.log(user);
								uni.setStorageSync('user_info',user.body);
								uni.showToast({
								  title:'登录成功'
								});
								Vue.prototype.isLogin = true
								if(this.is_thing){
									setTimeout(()=>{
									  uni.navigateBack({
										delta: 1
									  })
									},500)
								}else{
									setTimeout(()=>{
									  uni.reLaunch({
										url:'/pages/index/index'
									  })
									},500)
								}
							}).catch((message)=>{
								console.log(message);
								uni.showToast({
									icon: 'none',
									title: message.message
								});
							});
						}
					}
				})
				// uni.switchTab({
				// 	url: '../index/index'
				// })
			},
		},
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
