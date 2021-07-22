<template>
	<view class="content revise-phone">
		<view class="phone inp_box">
			<input type="number" v-model="phonenumber" placeholder="请输入手机号码" />
		</view>
		<view class="code inp_box">
			<input type="number" class="code_inp" v-model="code" placeholder="验证码" />
			<view class="tips" @tap="getVerCode">{{tips}}</view>
		</view>
		<view class="submit" @tap="submit">保存修改</view>
	</view>
</template>

<script>
	import {Throttle} from '@/common/tool.js'
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
			getVerCode(){
				var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (this.phonenumber.length != 11 || !myreg.test(this.phonenumber)) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				
				if(this.step==0){
					this.indexRequest({url:'/sms/send_register_msg',data:{
						smsSendType: 3,
						mobilePhone: this.phonenumber,
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
						smsSendType: 3,
						mobilePhone: this.phoneData,
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
			submit:Throttle(function(){
				console.log(1);
				var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (this.phonenumber.length !=11 || !myreg.test(this.phonenumber)) {
				    this.toast('请输入正确的手机号码','none')
				    return false;
				}
				if (this.code.length != 6) {
				    this.toast('验证码不正确','none')
				    return false;
				}
				
				this.homeRequest({url:'/changePhone',methods:'POST',data:{
					phone: this.phonenumber,
					validCode: this.code
				}}).then(res=>{
					if(res.code==200){
						this.toast('修改成功！')
						let params = uni.getStorageSync('user_info')
						uni.removeStorageSync('user_info')
						params.authPhone = this.phonenumber
						uni.setStorageSync('user_info',params)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else{
						this.toast(res.message,'none')
					}
				})
			})
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
