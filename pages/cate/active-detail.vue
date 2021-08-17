<template>
	<view class="active-detail content">
		<view class="main_img">
			<image class="indeximg" :src="content.titleImg" mode=""></image>
		</view>
		<view class="active_info">
			<view class="active_title">{{content.title}}</view>
			<view class="active_mess" style="margin-top: 16rpx;">
				<image class="info_icon" src="/static/first_time.png" mode=""></image>
				<text class="info_text">{{content.ticketingSetting&&content.ticketingSetting.startTime?content.ticketingSetting.startTime:'暂无 '}}-{{content.ticketingSetting&&content.ticketingSetting.endTime?content.ticketingSetting.endTime:' 暂无'}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/second_time.png" mode=""></image>
				<text class="info_text">{{dateFormat(content)}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/position.png" style="height: 34rpx;" mode=""></image>
				<text class="info_text">{{content.attr_address || '暂无'}}</text>
				<view class="address_btns" @tap="openMap(content)" v-if="content.position">查看地图</view>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/phone.png" mode=""></image>
				<text class="info_text">{{content.attr_phone || '暂无'}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/yupiao.png" mode=""></image>
				<view class="piao_count">
					余票：<text class="piao_red" v-if='content.ticketingSetting&&content.ticketingSetting.status == 0'>{{content.ticketingSetting.num -content.ticketingSetting.currentNum}}</text>
					<text class="piao_red" v-else>0</text>
					总票：<text class="piao_black">{{content.ticketingSetting?content.ticketingSetting.num:''}}</text>
				</view>
			</view>
			<view class="tips" v-if="content.ticketingSetting">
				<image src="/static/tips.png" class="tips_icon" mode=""></image>
				本场活动单次最多预订{{content.ticketingSetting.maxTicket}}张票，最多可预订{{content.ticketingSetting.times}}次
			</view>
		</view>
		<view class="blank"></view>
		<view class="active_detail">
			<view class="active_detail_tab">
				<view class="active_detail_tab_title active">活动详情</view>
			</view>
			<view class="active_detail_content">
				<rich-text :nodes="content.txt"></rich-text>
			</view>
		</view>
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in activeList" :key="index" @tap="todetail(item.id)">
					<view class="tj_active_content_box_img">
						<image :src="item.titleImg" mode=""></image>
					</view>
					<view class="tj_active_content_box_title">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<view class="public_bottom">
			<view class="icon_area">
				<view class="icon_item" @tap="comment_show=true">
					<image class="icon_img" src="/static/cate/pinglun.png" mode=""></image>
					<text>评论</text>
				</view>
				<view class="icon_item" @tap="share">
					<image class="icon_img" src="/static/cate/zhuanfa.png" mode=""></image>
					<text>转发</text>
				</view>
				<view class="icon_item" @tap="btnFabulous">
					<image class="icon_img" :src="isFabulous?'/static/cate/dianzan_red.png':'/static/cate/dianzan.png'" mode=""></image>
					<text :class="{dz_red:isFabulous}">点赞</text>
				</view>
				<view class="icon_item" @tap="collection">
					<image class="icon_img" :src="is_keep?'/static/cate/shoucang_red.png':'/static/cate/shoucang.png'" mode=""></image>
					<text :class="{dz_red:is_keep}">收藏</text>
				</view>
			</view>
			<view class="public_btn" @tap="signUp" v-if='ticketStatus == 0 && status == 0'>立即报名</view>
			<view class="public_btn public_btn_g" v-if="ticketStatus==1">即将开始</view>
			<view class="public_btn public_btn_g" v-if="ticketStatus==2">已结束</view>
			<view class="public_btn public_btn_g" v-if="ticketStatus==4">直接前往</view>
			<view class="public_btn public_btn_g" v-if="ticketStatus==5">人数已满</view>
			<view class="public_btn public_btn_g" v-if="status==6">报名次数已满</view>
		</view>
		<ys-comment v-if="comment_show" :ids="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
		
		<view class="mask" v-if="is_sign" @tap="is_sign = false">
			<view class="mask_content">
				<image class="mask_img" src="/static/lingdang.png" mode=""></image>
				<view class="success">报名成功，请准时参加哦~</view>
				<view class="sign_btn">开启</view>
				<view class="info">
					<image class="sign_icon" src="" mode=""></image>
					<text>允许发送消息通知提醒</text>
				</view>
				
				<view class="mask_content_blank1"></view>
				<view class="mask_content_blank2"></view>
			</view>
		</view>
		
		<view class="mask" v-if="is_show" @tap="is_show = false">
			<view class="mask_content">
				<view class="point">积分明细</view>
				<image class="mask_img" src="/static/lingdang.png" mode=""></image>
				<view class="get_point">报名前，请进行实名认证~</view>
				<view class="sign_btn" @tap.stop="toSign">前往</view>
				
				<view class="mask_content_blank1"></view>
				<view class="mask_content_blank2"></view>
			</view>
		</view>
		<ys-share ref="share" :contentHeight="580" :shareList="shareList"></ys-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				is_sign: false,
				nowIndex: 0,
				nodes: '',
				comment: '',
				content: {},
				status: 0,
				ticketStatus: 0,
				activeList: [],
				is_show: false,
				comment_show: false,
				commentList: [],
				page: 0,
				
				isFabulous: false,
				is_keep: false,
				shareList : [{
						type: 1,
						icon: '/static/share_wechat.png',
						text: '微信好友'
					},
					{
						type: 2,
						icon: '/static/share_moment.png',
						text: '朋友圈'
					},
					{
						type: 3,
						icon: '/static/share_qq.png',
						text: 'QQ好友'
					},
					{
						type: 4,
						icon: '/static/share_qqzone.png',
						text: 'QQ空间'
					}
				],
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getActiveList()
			this.getCommentList()
			let isFabulous = uni.getStorageSync('fabulous'+this.id);
			if(isFabulous){
				this.isFabulous = true;
			}
			if(this.isLogin){
				this.getTicketStatus()
				
				this.homeRequest({
					url: '/content/collectExit',
					method: 'GET',
					data: {cId: this.id},
				}).then(res=>{
					if(res.body=='true'){
						this.is_keep = true;
					}else{
						this.is_keep = false;
					}
				})
			}
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.commentList = [];
				this.getCommentList();
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getCommentList();
			},
			close(){
				this.comment_show = false
			},
			share(){
				// #ifdef MP-WEIXIN
				wx.showShareMenu();
				// #endif
				// #ifdef H5
				this.$refs.share.toggleMask();	
				// #endif
			},
			getCommentList(){
				let params = {
					contentId: this.id, 
					checked: 1, 
					first: this.page, 
					count: 10,
				}
				this.indexRequest({url:'/comment/list.jspx',data:params}).then(res=>{
					var content = res.data.body;
					this.commentList = this.commentList.concat(content);
				})
			},
			signUp(){
				// this.is_show = !this.isLogin
				// return
				if(!this.isLogin){
					uni.showModal({
						title: "提示",
						content: "您还未登录，确定先登录吗？",
						showCancel: true,
						confirmText: "确定",
						success: (res)=>{
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?is_thing='+true
								})
							} else if (res.cancel) {
							}
						}
					})
				}else{
					let username = uni.getStorageSync('user_info').username
					this.homeRequest({
						url: '/user/get',
						method: 'GET',
						data: {username: username},
					}).then(res=>{
						console.log(res);
						if(!res.body.isCertification){
							this.is_show = true
						}else{
							uni.navigateTo({
								url: './active-signin?id='+this.id
							})
						}
					})
				}
			},
			toSign(){
				uni.navigateTo({
					url: '../mine/attestation'
				})
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					content.txt = this.formatRichText(content.txt)
					this.content = content;
					// this.status = res.data.body.status;
					this.ticketStatus = res.data.body.ticketingSetting.status
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getTicketStatus(){
				this.homeRequest({
					url: '/ticket/status',
					method: 'GET',
					data: {contentId: this.id},
				}).then(res=>{
					if(res.code == 200){
						this.status = res.body.status;
					}
				})
			},
			getActiveList(){
				let params = {
					count:5,
					channelIds: '116',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.activeList = array
				})
			},
			dateFormat(item){
				if(item && item.ticketingSetting && item.ticketingSetting.registrationStart){
					let start = item.ticketingSetting.registrationStart ? item.ticketingSetting.registrationStart.substring(0, 10) : '';
					let end  =  item.ticketingSetting.registrationEnd ? item.ticketingSetting.registrationEnd.substring(0, 10) : '';
					return start + '-' + end;
				}else{
					return '暂无';
				}
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/active-detail?id='+id
				})
			},
			openMap(item){
				var pos = this.bMapToQQMap(item.position.lng, item.position.lat);
				uni.openLocation({
					latitude: pos.lat,
					longitude: pos.lng,
					name: item.title,
					address: item.attr_address
				})
			},
			btnFabulous: function() {
				if(this.isFabulous){
					this.indexRequest({url:'/content/down',data:{contentId: this.id}}).then(res=>{
						if(res.data.code==200){
							this.isFabulous = false;
							uni.removeStorageSync('fabulous'+this.id);
							this.toast('取消点赞成功！')
						}
					})
				}else{
					this.indexRequest({url:'/content/up',data:{contentId: this.id}}).then(res=>{
						if(res.data.code==200){
							this.isFabulous = true;
							uni.setStorageSync('fabulous'+this.id, true);
							this.toast('点赞成功！')
						}
					})
				}
			},
			collection(){
				if(!this.isLogin){
					uni.showModal({
						title: "提示",
						content: "您还未登录，确定先登录吗？",
						showCancel: true,
						confirmText: "确定",
						success: (res)=>{
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?is_thing='+true
								})
							} else if (res.cancel) {
							}
						}
					})
				}else{
					this.homeRequest({
						url: '/content/collect',
						method: 'GET',
						data: {id: this.id,operate: this.is_keep?0:1},
					}).then(res=>{
						if(res.code==200){
							if(this.is_keep){
								this.toast('取消收藏成功！')
							}else{
								this.toast('收藏成功！')
							}
							this.is_keep = !this.is_keep
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.active-detail{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	background-color: #FFFFFF;
	.wai{
		width: 690rpx;
		height: 292rpx;
		margin: 30rpx auto 0;
		position: relative;
		.banner_box{
			width: 100%;
			height: 100%;
			border-radius: 16rpx;
			background-color: #E5E5E5;
			.swiper-recommend{
				width: 100%;
				line-height: 292rpx;
				font-size: 16rpx;
				text-align: center;
				color: #fff;
			}
		}
		.indicator_point{
			width: 100rpx;
			height: 48rpx;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #FFFFFF;
			background: rgba(0,0,0,0.44);
			border-radius: 32rpx;
			position: absolute;
			right: 16rpx;
			bottom: 16rpx;
			text-align: center;
		}
	}
	.active_info{
		width: 690rpx;
		height: auto;
		margin: 38rpx auto 0;
		font-size: 32rpx;
		color: #1B1C1E;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		.active_title{
			font-size: 40rpx;
			line-height: 60rpx;
			color: #1B1C1E;
			font-weight: 500;
		}
		.active_mess{
			display: flex;
			align-items: center;
			line-height: 64rpx;
			.info_icon{
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
			.info_text{
				font-weight: 400;
			}
			.piao_count{
				display: flex;
				font-weight: 400;
				.piao_red{
					margin: 0 44rpx 0 16rpx;
					color: #C61219;
				}
			}
			.address_btns{
				width: 108rpx;
				height: 38rpx;
				border: 1px solid #5D4ADE;
				border-radius: 8rpx;
				text-align: center;
				line-height: 38rpx;
				font-size: 22rpx;
				color: #614DDF;
				margin-left: 30rpx;
			}
		}
		.tips{
			width: 690rpx;
			background: rgba(242, 240, 254, 0.56);
			border-radius: 4rpx;
			box-sizing: border-box;
			padding: 26rpx 30rpx 26rpx 84rpx;
			line-height: 40rpx;
			color: #614DDF;
			position: relative;
			font-size: 28rpx;
			margin-top: 20rpx;
			.tips_icon{
				width: 44rpx;
				height: 87rpx;
				position: absolute;
				top: -8rpx;
				left: 8rpx;
			}
		}
	}
	.blank{
		width: 100%;
		height: 4rpx;
		background-color: #F2F0FE;
	}
	.active_detail{
		width: 654rpx;
		margin: 0 auto;
		&_tab{
			width: 100%;
			height: 98rpx;
			border-bottom: 2rpx solid #ddd;
			display: flex;
			&_title{
				font-size: 40rpx;
				font-weight: 400;
				line-height: 90rpx;
				color: #7565E3;
				margin-right: 66rpx;
			}
			.active{
				font-weight: 500;
				color: #1B1C1E;
				// font-size: 40rpx;
				border-bottom: 8rpx solid #7565E3;
			}
		}
		&_content{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 0;
		}
	}
	.bottom_btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		background: #999;
		text-align: center;
		line-height: 110rpx;
		font-size: 34rpx;
		color: #fff;
	}
	.is_ing{
		background: linear-gradient(128deg, #947EEC 0%, #7458E8 100%);
		color: #FFFFFF;
	}
}

.mask{
	.mask_content{
		.mask_img{
			width: 294rpx;
			height: 240rpx;
			margin: 32rpx auto 0;
		}
		.success{
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: 500;
			color: #1B1C1E;
			margin-top: 8rpx;
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
			margin: 32rpx auto 0;
		}
		.info{
			display: flex;
			font-size: 22rpx;
			line-height: 28rpx;
			color: #6D6E6F;
			margin-top: 34rpx;
			align-items: center;
			justify-content: center;
			.sign_icon{
				margin-right: 10rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
}
.dz_red{
	color: rgb(223,20,20);
}
</style>
