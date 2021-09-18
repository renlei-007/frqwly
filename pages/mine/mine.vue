<template>
	<view class="content mine">
		<view class="user_box">
			<view class="user_box_b">
				<view class="user_info_box">
					<view class="user_img">
						<image :src="is_Login&&user.userImg?user.userImg:'/static/user.png'" mode=""></image>
					</view>
					<view class="user_name_box">
						<view class="user_name" @tap="toLogin">{{is_Login?user.realname||user.username:'点击登录'}}</view>
						<view class="attestation" v-if="is_Login">{{user.isCertification?'实名认证：已认证':'实名认证：未认证'}}</view>
					</view>
				</view>
				<view class="sign_right">
					<view class="iconfont icon-saoma" @tap="scan" v-if="user.admin"></view>
					<view class="sign_box" @tap="signIn" v-if="is_Login">
						<view class="sign_box_icon">
							<image src="/static/sign.png" class="sign_box_icon_img" mode=""></image>
						</view>
						<view class="sign_box_text">连续签到{{is_Login?signDays:0}}天</view>
					</view>
				</view>
			</view>
			<image class="bac_img" src="/static/gjzx.png" mode=""></image>
		</view>
		<view class="datas_box">
			<view class="datas_box_item" @tap="todetail(0)">
				<view class="datas_box_item_num">{{score}}</view>
				<view class="datas_box_item_name">积分</view>
			</view>
			<view class="datas_box_item" @tap="todetail(1)">
				<view class="datas_box_item_num">{{messageCount}}</view>
				<view class="datas_box_item_name">消息</view>
			</view>
			<view class="datas_box_item" @tap="todetail(2)">
				<view class="datas_box_item_num">{{commentCount}}</view>
				<view class="datas_box_item_name">评论</view>
			</view>
		</view>
		<view class="active_panel">
			<view class="active_panel_item" v-for="(item,index) in active_menu" :key="index" @tap="goPage('active',index)">
				<image class="active_panel_item_icon" :src="item.src" mode=""></image>
				<view class="active_panel_item_text">{{item.title}}</view>
			</view>
		</view>
		<view class="function_menu">
			<view class="menu_item menu_item_line" v-for="(item,index) in function_menu" :key = "index" @tap="goPage('function',index)"> 
				<image mode="" :src="item.src" class="icon"></image>
				<view class="name_area">
					<text>{{item.title}}</text>
					<!-- <text class="contents" v-if="index == 4">400-117-3773</text> -->
				</view>
			</view>
		</view>
		<view class="log_out" v-if="is_Login" @tap="logout">退出登录</view>
		
		<view class="mask" v-if="is_sign" @tap="is_sign = false">
			<view class="mask_content">
				<view class="point">积分明细</view>
				<image class="mask_img" src="/static/money.png" mode=""></image>
				<view class="get_point">签到得积分</view>
				<!-- <view class="continue">你累计签到<text style="color: #FF8E19;">11</text>天，请继续保持！</view> -->
				<view class="sign_btn" @tap.stop="toSign">签到</view>
				
				<view class="mask_content_blank1"></view>
				<view class="mask_content_blank2"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				is_sign: false,
				today_sign: false,
				signDays: 0,
				
				user: {},
				score: 0,
				messageCount: 0,
				commentCount: 0,
				function_menu: [
					{
						src: require('../../static/active-icon/wdsc.png'),
						title: '我的收藏',
					},
					{
						src: require('../../static/active-icon/wdjc.png'),
						title: '我的剧场',
					},
					{
						src: require('../../static/active-icon/wdpx.png'),
						title: '我的培训',
					},
					{
						src: require('../../static/active-icon/hdjl.png'),
						title: '互动交流',
					},
					{
						src: require('../../static/active-icon/zyhd.png'),
						title: '志愿活动',
					},
					{
						src: require('../../static/active-icon/smrz.png'),
						title: '实名认证',
					},
					{
						src: require('../../static/active-icon/xgsj.png'),
						title: '修改/绑定手机',
					},
					{
						src: require('../../static/active-icon/xgmm.png'),
						title: '修改密码',
					},
					{
						src: require('../../static/active-icon/grsz.png'),
						title: '个人设置',
					},
					{
						src: require('../../static/active-icon/yjfk.png'),
						title: '意见反馈',
					},
					{
						src: require('../../static/active-icon/gywm.png'),
						title: '关于我们',
					},
				],
				active_menu: [
					{
						src: require('../../static/active-icon/wdhd.png'),
						title: '我的活动',
					},
					{
						src: require('../../static/active-icon/wdcg.png'),
						title: '我的场馆',
					},
					{
						src: require('../../static/active-icon/wdst.png'),
						title: '我的社团',
					},
				],
				is_Login: false,
			};
		},
		onLoad() {
		},
		onShow() {
			this.is_Login = this.isLogin
			if(this.is_Login){
				// this.user = uni.getStorageSync('user_info')
				this.getMessageNumber()
				this.getSignDay()
			}
		},
		methods: {
			getSignDay(){
				this.homeRequest({url:'/continuousSigin',methods:'GET',data:{}}).then(res=>{
					console.log(res);
					this.signDays = res.body
				})
			},
			goPage(val,index){
				if(this.is_Login){
					if(val=='function'){
						switch (index){
							case 0:
								uni.navigateTo({
									url: './my-collection'
								})
								break
							case 1:
								uni.navigateTo({
									url: './my-theatre'
								})
								break
							case 2:
								uni.navigateTo({
									url: './my-train'
								})
								break
							case 3:
								uni.navigateTo({
									url: './communication'
								})
								break
							case 4:
								uni.navigateTo({
									url: './my-volunteer'
								})
								break
							case 5:
								uni.navigateTo({
									url: './attestation'
								})
								break
							case 6:
								uni.navigateTo({
									url: './revise-phone'
								})
								break
							case 7: 
								uni.navigateTo({
									url: '../login/forget?change=1'
								})
								break
							case 8:
								uni.navigateTo({
									url: './setting'
								})
								break
							case 9:
								uni.navigateTo({
									url: './feedback'
								})
								break
							case 10:
								uni.navigateTo({
									url: './aboutme'
								})
								break
						}
					}
					if(val=='active'){
						switch (index){
							case 0:
								uni.navigateTo({
									url: './myactive'
								})
								break
							case 1:
								uni.navigateTo({
									url: './myvenues'
								})
								break
							case 2:
								uni.navigateTo({
									url: './myorganization'
								})
								break
						}
					}
				}else{
					uni.showModal({
						title: '提示',
						content: '您还没有登录，无法查看或设置，确认要先登录吗？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							} else if (res.cancel) {
							}
						}
					});
				}
			},
			toLogin(){
				if(this.isLogin){
					return false
				}
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			todetail(index){
				if(!this.is_Login){
					uni.showModal({
						title: '提示',
						content: '您还没有登录，无法查看或设置，确认要先登录吗？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							} else if (res.cancel) {
							}
						}
					});
					return
				}
				if(index==0){
					uni.navigateTo({
						url: './reward-points'
					})
				}
				if(index==1){
					uni.navigateTo({
						url: './my-message'
					})
				}
				if(index==2){
					uni.navigateTo({
						url: './comment-list'
					})
				}
			},
			getMessageNumber(){
				let username = uni.getStorageSync('user_info').username
				this.homeRequest({
					url: '/user/get',
					method: 'GET',
					data: {username:username},
				}).then(res=>{
					console.log(res);
					this.user = res.body
					this.score = res.body.score
				})
				
				this.homeRequest({
					url: '/message/count',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.log(res);
					this.messageCount = res.body;
				})
				this.homeRequest({
					url: '/comment/count',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.log(res);
					this.commentCount = res.body;
				})
			},
			signIn(){
				this.is_sign = true
			},
			toSign(){
				this.homeRequest({
					url: '/signin',
					method: 'POST',
					data: {},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.toast('签到成功！','none')
						this.signDays++
					}else{
						this.toast(res.message,'none')
					}
					this.is_sign = false
				})
			},
			logout(){
				Vue.prototype.isLogin = false
				uni.showModal({
					title: '退出',
					content: '确定要退出登录吗?',
					success: (res) => {
						if(res.confirm){
							uni.clearStorageSync()
							uni.reLaunch({
								url: '../login/login'
							})
						}
					}
				})
			},
			scan(){
				uni.scanCode({
					success: (res) => {
						let result = JSON.parse(res.result.replace(/“/g, '"'));
						if(this.user.admin&&result.type){//核销
							uni.navigateTo({  
								url: '/pages/mine/writeoff?type='+result.type+"&value="+result.value
							});
						}else{
							this.toast('该二维码无法核销')
						}
					}
				});
			},
			moveHandle(){
				return false
			},
		},
	}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: auto;
	background: #F2F5FA;
	box-sizing: border-box;
	/* #ifdef H5 */
	padding-bottom: 150rpx;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	padding-bottom: 30rpx;
	/* #endif */
	.user_box {
		width: 100%;
		height: 240rpx;
		box-sizing: border-box;
		padding: 0 35rpx;
		background-color: #6851E2;
		border-radius: 0 0 10% 10%;
		position: relative;
		z-index: 1;
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		padding-top: 30rpx;
		/* #endif */
		.bac_img{
			position: absolute;
			width: 336rpx;
			height: 325rpx;
			bottom: -80rpx;
			right: 44rpx;
			z-index: -10;
		}
		&_b {
			align-items: center;
			display: flex;
			justify-content: space-between;
			position: relative;
			.user_info_box {
				display: flex;
				.user_img {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
					background-color: #F2F2F2;
					margin-right: 30rpx;
					text-align: center;
					line-height: 96rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.user_name_box {
					.user_name {
						font-size: 32rpx;
						line-height: 60rpx;
						color: #FFFFFF;
					}
					.attestation {
						font-size: 24rpx;
						color: #FFFFFF;
						opacity: 0.81;
					}
				}
			}
			.sign_right{
				display: flex;
				align-items: center;
				.iconfont{
					font-size: 40rpx;
					color: #fff;
					margin-right: 30rpx;
				}
				.sign_box {
					display: flex;
					flex-direction: column;
					align-items: center;
					// padding-top: 15rpx;
					.sign_box_icon {
						width: 48rpx;
						height: 48rpx;
						&_img{
							width: 48rpx;
							height: 48rpx;
						}
					}
					.sign_box_text {
						font-size: 18rpx;
						line-height: 36rpx;
						margin-top: 4rpx;
						color: #FEF8E0;
					}
				}
			}
		}
	}
	.datas_box {
		width: 690rpx;
		height: 150rpx;
		margin: -20rpx auto 0;
		background-color: #FFFFFF;
		display: flex;
		border-radius: 20rpx;
		position: relative;
		z-index: 10;
		font-family: Din;
		&_item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			&_num {
				font-size: 40rpx;
				color: #1B1C1E;
				font-family: Din;
			}
			&_name {
				font-size: 24rpx;
				color: #8B8B9C;
				margin-top: 10rpx;
			}
		}
	}
	.active_panel {
		width: 690rpx;
		height: 184rpx;
		margin: 30rpx auto 0;
		background-color: #FFFFFF;
		display: flex;
		border-radius: 20rpx;
		&_item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			&_icon {
				width: 80rpx;
				height: 80rpx;
			}
			&_text {
				font-size: 24rpx;
				line-height: 36rpx;
				color: #1B1C1E;
				margin-top: 10rpx;
			}
		}
	}
	.function_menu {
		width: 100%;
		background-color: #ffffff;
		// border-radius: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin: 30rpx auto 0;
		.menu_item {
			width: 100%;
			height: 110rpx;
			display: flex;
			align-items: center;
			position: relative;
			.icon {
				width: 50rpx;
				height: 50rpx;
				display: flex;
			}
			.name_area {
				width: 660rpx;
				height: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
				background-image: url('~@/static/more-black.png');
				background-position: right;
				background-repeat: no-repeat;
				background-size: 12rpx 22rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333333;

				.contents {
					color: #956FEC;
				}
			}
		}
		.menu_item_line::after {
			position: absolute;
			content: '';
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 690rpx;
			height: 1px;
			background-color: #F9FAFE;
		}
		.menu_item_line:last-child::after {
			background-color: #FFFFFF;
		}
	}
	.log_out{
		width: 100%;
		height: 112rpx;
		text-align: center;
		line-height: 112rpx;
		font-size: 34rpx;
		color: #EB5F45;
		margin-top: 60rpx;
		background-color: #FFFFFF;
	}
}
.mask{
	.mask_content{
		.mask_img{
			width: 260rpx;
			height: 214rpx;
			margin: 24rpx auto 0;
		}
		.get_point{
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: bolder;
			color: #1B1C1E;
			margin: 16rpx 0 0;
		}
		.continue{
			font-size: 22rpx;
			font-weight: 400;
			line-height: 22rpx;
			color: #6D6E6F;
			margin-top: 28rpx;
		}
		.sign_btn{
			width: 348rpx;
			height: 64rpx;
			background: linear-gradient(126deg, #C28FF5 0%, #7630DF 100%);
			border-radius: 36rpx;
			text-align: center;
			line-height: 64rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin: 50rpx auto 0;
		}
	}
}
</style>
