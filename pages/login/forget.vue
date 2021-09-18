<template>
	<view class="forget content">
		<view class="forget_box">
			<view class="name_int log_int">
				<input type="text" :disabled="is_change" v-model="userform.username" placeholder="手机号" />
			</view>
			<view class="pass_int log_int code_box">
				<input type="number" class="code_inp" v-model="userform.code" placeholder="验证码" />
				<view class="tips" @tap="getVerCode">{{tips}}</view>
			</view>
			<view class="pass_int log_int psw_int">
				<input v-if="is_see" type="text" v-model="userform.password" placeholder="登录密码" />
				<input v-else type="password" v-model="userform.password" placeholder="登录密码" />
				<image src="/static/password.png" class="pass_see" mode="" @tap="seePsw"></image>
			</view>
			<view class="log_btn" @tap="register">重置密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userform: {
					username: '',
					password: '',
					code: '',
				},
				tips: '获取验证码',
				step: 0,
				timer: null,
				is_see: false,
				is_change: false,
			};
		},
		onLoad(e) {
			if(e.change&&e.change==1){
				this.is_change = true
				this.userform.username = uni.getStorageSync('user_info').phone
				uni.setNavigationBarTitle({
					title: '修改密码',
				})
			}
		},
		methods: {
			seePsw(){
				this.is_see = !this.is_see
			},
			getVerCode(){
				var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (this.userform.username.length != 11 || !myreg.test(this.userform.username)) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				
				if(this.step==0){
					this.indexRequest({url:'/sms/send_register_msg',data:{
						smsSendType: 2,
						mobilePhone: this.userform.username,
					}}).then(res=>{
						if(res.data.code==200){
							this.tips = 60
							let s = 60
							this.step = 2
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
						}else{
							this.toast(res.data.message,'none')
						}
					})
				}
				if(this.step==1){
					this.indexRequest({url:'/sms/send_register_msg',data:{
						smsSendType: 2,
						mobilePhone: this.userform.username,
					}}).then(res=>{
						this.tips = 60
						let s = 60
						this.step = 2
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
					})
				}
			},
			register(){
				var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (this.userform.username.length != 11 || !myreg.test(this.userform.username)) {
					this.toast('手机号不正确！','none')
				    return false;
				}
				if (this.userform.password.length < 6) {
				    this.toast('密码不能小于6位！','none')
				    return false;
				}
				this.indexRequest({url:'/user/forgot',methods: 'POST',data:{
					phone: this.userform.username,
					loginPassword: this.userform.password,
					captcha: this.userform.code,
					// shareCode: shareCode,
				}}).then(res=>{
					if(res.data.code==200){
						this.toast('设置成功！')
						setTimeout(()=>{
							uni.navigateBack()
						}, 1000);
					}else{
						this.toast('设置失败','none')
					}
				})
			},
		},
	}
</script>

<style lang="scss">
.forget{
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
		.code_box{
			box-sizing: border-box;
			padding-right: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.code_inp{
				width: 50%;
			}
			.tips{
				font-size: 32rpx;
				color: #6446E1;
			}
		}
		.psw_int{
			margin-top: 30rpx;
			position: relative;
			display: flex;
			align-items: center;
			input{
				width: 85%;
			}
			.pass_see{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
}
</style>
