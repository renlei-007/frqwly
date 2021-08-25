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
			<button class="log_btn wxphone_btn" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getphone" v-if="is_click_login">绑定手机授权</button>
		</view>
		<view class="orthers">
			<view class="wx_btn">微信快捷登录</view>
			<button class="circle" hover-class="none" open-type="getUserInfo" lang="zh_CN" @getuserinfo="goBindTel"></button>
			<!-- <view class="circle" @tap="getPhoness"></view> -->
			<view class="action">
				<text @tap="toforget">找回密码</text>
				<text class="space">|</text>
				<text @tap="toReg">注册账号</text>
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
				is_click_login: false,
				session_key: '',
				id: '',
				user_info: {},
			};
		},
		onLoad(e) {
			this.is_thing = e.is_thing
		},
		methods: {
			goBindTel(e){
				console.log(e);
				let userInfo = e.detail.userInfo;
				console.log(userInfo);
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes)
						this.doLogin(userInfo,loginRes.code)
					},
					fail: (err)=>{
						console.log(err);
					}
				});
			},
			getphone(e){
				console.log(e);
				var detail = e.detail;
				if (detail.errMsg == 'getPhoneNumber:ok') {
					let globalData = {
						appId:"1580387213331704",
						appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",
						aesKey:"S9u978Q31NGPGc5H",
						ivKey:"X83yESM9iShLxfwS",
					}
					var encryptedData = detail.encryptedData;
					var iv = detail.iv;
					var session_key = this.session_key;
					var nonce_str = rand.getRand();//随机数
					var id = this.id
					
					let postParams = [];
					
					postParams[0]=["session_key", session_key];
					postParams[1]=["encryptedData",encryptedData];
					postParams[2]=["appId", globalData.appId];
					postParams[3]=["nonce_str",nonce_str];
					postParams[4]=["iv",iv];
					postParams[5]=["userId", id];
					var signVal=sign.createSign(postParams, globalData.appKey);//签名
					let params = {
						encryptedData: detail.encryptedData,
						iv: detail.iv,
						session_key: this.session_key,
						appId: globalData.appId,
						nonce_str: nonce_str,
						sign: signVal,
						userId: id,
					}
					this.request({
						url:'api/front/user/bindingPhone',
						data:params,
						complete: res=>{
							console.log(res);
							if(res.code==200){
								this.user_info.phone = res.body.phoneNumber
								uni.setStorageSync('user_info',this.copyData(this.user_info));
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
							}
						}
					})
				}
			},
			doLogin(userInfo, code){
				let globalData = {
					appId:"1580387213331704",
					appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",
					aesKey:"S9u978Q31NGPGc5H",
					ivKey:"X83yESM9iShLxfwS",
				}
				var nickName = userInfo.nickName;
				var avatarUrl = userInfo.avatarUrl;
				var gender = userInfo.gender; //性别 0：未知、1：男、2：女
				var province = userInfo.province;
				var city = userInfo.city;
				var country = userInfo.country?userInfo.country:"";
				var nonce_str = rand.getRand();//随机数
				let postParams = [];
				let shareCode = uni.getStorageSync('shareCode');
				postParams[0]=["js_code", code];
				postParams[1]=["grant_type","authorization_code"];
				postParams[2]=["appId", globalData.appId];
				postParams[3]=["nonce_str",nonce_str];
				postParams[4]=["nickName",nickName];
				postParams[5]=["avatarUrl",avatarUrl];
				postParams[6]=["province",province];
				postParams[7]=["city",city];
				postParams[8]=["country",country];
				postParams[9]=['shareCode', shareCode];
				var signVal=sign.createSign(postParams, globalData.appKey);//签名
				
				this.request({
					url:'api/front/user/weixinLogin.jspx',
					data:{
						js_code: code,
						grant_type:'authorization_code',
						appId: globalData.appId,
						nonce_str:nonce_str,
						nickName:nickName,
						avatarUrl:avatarUrl,
						province:province,
						city:city,
						country:country,
						shareCode: shareCode,
						sign:signVal
					},
					complete: (res)=>{
						console.log(res);
						if(res.code==200){
							this.getUser(res.body.username, res.body.sessionKey).then(user=>{
								console.log(user);
								if(user.code==201){
									uni.setStorageSync('sessionKey', res.body.sessionKey);
									this.session_key = res.body.session_key
									this.id = user.body.id
									let user_info = user.body
									this.user_info = user.body
									if(user.phone!=undefined&&user.phone!=null&&user.phone.length>0){
										uni.setStorageSync('user_info',user_info);
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
									}else{
										this.is_click_login = true
									}
								}else{
									this.toast(user.message,'none')
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
				
				
			},
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
					url:'user/login.jspx',
					data:{
						username:this.userform.username,
						aesPassword: aesPassword,
						appId: globalData.appId,
						nonce_str:nonce_str,
						sign:signVal
					},
					complete: (res)=>{
						console.log(res);
						if(res.code==304){
							uni.showToast({
								title:'密码错误',
								icon:'none'
							})
							return
						}
						if(res.code!=200){
							console.log(1);
							uni.showToast({
							  title:res.message,
							  icon:'none'
							})
							return
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
			toReg(){
				uni.navigateTo({
					url: './register'
				})
			},
			toforget(){
				uni.navigateTo({
					url: './forget'
				})
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
		.wxphone_btn{
			margin-top: 30rpx;
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
