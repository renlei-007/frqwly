<template>
	<view class="venues-detail content">
		<view class="main_img">
			<image class="indeximg" :src="content.titleImg" mode="aspectFill"></image>
		</view>
		<view class="venues_box" style="box-sizing: border-box;padding-bottom: 20rpx;">
			<view class="venues_title">{{content.stitle}}</view>
			<view class="venues_info">
				<view class="venues_info_title">类别：</view>
				<view class="venues_info_name">{{content.typeName?content.typeName:'暂无'}}</view>
			</view>
			<view class="venues_info" v-if="content.attr_address">
				<view class="venues_info_title">地址：</view>
				<view class="venues_info_name address">{{content.attr_address}}</view>
				<view class="address_btn" @tap="openMap(content)" v-if="content.position">查看地图</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">电话：</view>
				<view class="venues_info_name">{{content.attr_phone?content.attr_phone:'暂无'}}</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">面积：</view>
				<view class="venues_info_name">{{content.attr_area?content.attr_area:'暂无'}}</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">容纳：</view>
				<view class="venues_info_name">{{content.attr_number?content.attr_number:'暂无'}}</view>
			</view>
			<view class="venues_info" v-if="channelId==198">
				<view class="venues_info_title">预定开始时间：</view>
				<view class="venues_info_name">{{content.seatSetting.registrationTime[0]}}</view>
			</view>
			<view class="venues_info" v-if="channelId==198">
				<view class="venues_info_title">预定结束时间：</view>
				<view class="venues_info_name">{{content.seatSetting.registrationTime[1]}}</view>
			</view>
			<view class="venues_info" v-if="channelId==198">
				<view class="venues_info_title">演出开始时间：</view>
				<view class="venues_info_name">{{content.seatSetting.time[0]}}</view>
			</view>
			<view class="venues_info" v-if="channelId==198">
				<view class="venues_info_title">演出结束时间：</view>
				<view class="venues_info_name">{{content.seatSetting.time[1]}}</view>
			</view>
			<view class="venues_infos">
				<text>设备：</text>{{content.attr_equipment?content.attr_equipment:'暂无'}}
			</view>
		</view>
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">简介</view>
			<view class="introduce">
				<rich-text :nodes="content.txt"></rich-text>
			</view>
		</view>
		
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in venuesList" :key="index" @tap="todetail(item.id)">
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
				<button class="icon_item" hover-class="none" open-type="share" @tap="share">
					<image class="icon_img" src="/static/cate/zhuanfa.png" mode=""></image>
					<text>转发</text>
				</button>
				<view class="icon_item" @tap="btnFabulous">
					<image class="icon_img" :src="isFabulous?'/static/cate/dianzan_red.png':'/static/cate/dianzan.png'" mode=""></image>
					<text :class="{dz_red:isFabulous}">点赞</text>
				</view>
				<view class="icon_item" @tap="collection">
					<image class="icon_img" :src="is_keep?'/static/cate/shoucang_red.png':'/static/cate/shoucang.png'" mode=""></image>
					<text :class="{dz_red:is_keep}">收藏</text>
				</view>
			</view>
			<view class="public_btn" v-if="(channelId==179||channelId==180||channelId==198)&&canBooking" @tap="bookings">马上预约</view>
			<view class="public_btn gray" v-if="channelId==198&&!canBooking">已过预约时间</view>
			<view class="public_btn gray" v-if="channelId!=179&&channelId!=180&&channelId!=198">无需预约</view>
		</view>
		<ys-comment v-if="comment_show" :ids="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
		<ys-share ref="share" :contentHeight="580" :shareList="shareList"></ys-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowIndex: 0,
				id: '',
				is_show: true,
				content: {
					seatSetting: {
						registrationTime: [],
						time: [],
					},
				},
				venuesList: [],
				
				canBooking: true,
				
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
				channelId: '',
			};
		},
		onLoad(e) {
			this.id = e.id
			this.channelId = e.channelId
			if(e.scene){
				console.log(e.scene);
				let params = decodeURIComponent(e.scene).split('&');
				if(params.length == 2){
					this.id = params[0];
					this.channelId = params[1]
					// this.doShare(params[1], params[2]);
				}
			}
			this.getDetail()
			this.getVenuesList()
			this.getCommentList()
			let isFabulous = uni.getStorageSync('fabulous'+this.id);
			if(isFabulous){
				this.isFabulous = true;
			}
			if(this.isLogin){
				this.homeRequest({url:'/view',method:'GET',data:{}})
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
			indexChange(e){
				this.nowIndex = e.detail.current
			},
			getDetail(){
				let params = {
					format: 0,
				}
				if(this.channelId==179){
					params.contentId = this.id
				}else{
					params.id = this.id
				}
				let url = this.channelId==179?'/bookings/content':this.channelId==180?'/content/get.jspx':'/content/get.jspx'
				this.indexRequest({url:url,data:params}).then(res=>{
					var content = res.data.body;
					content.txt = this.replaceSpecialChar(content.txt)
					this.content = content;
					if(this.channelId == 198){
						let time = new Date().getTime()
						let _time = new Date(content.seatSetting.registrationTime[1]).getTime()
						if(time>_time){
							this.canBooking = false
						}
					}
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			bookings(){
				if(!this.isLogin){
					uni.showModal({
						title: '提示',
						content: '您还没有登录，无法预定，确定先登录吗？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?is_thing=true'
								})
							} else if (res.cancel) {
							}
						}
					});
					return
				}
				if(!uni.getStorageSync('user_info').isCertification){
					this.toast('您还没有实名认证，请先实名认证！','none')
					return
				}
				if(this.channelId==179){
					this.homeRequest({
						url:'/bookings/check_group',
						method: 'GET',
					}).then(res=>{
						console.log(res);
						if(res.code==200){
							uni.navigateTo({
								url: './venues-booking?id='+this.id+'&&channelId='+this.channelId
							})
						}else{
							this.toast(res.message,'none',1500)
						}
					});
				}else{
					uni.navigateTo({
						url: './venues-booking?id='+this.id+'&&channelId='+this.channelId
					})
				}
			},
			getVenuesList(){
				let params = {
					count:4,
					channelIds: this.channelId,
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					this.venuesList = array
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
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/venues-detail?id='+id+'&&channelId'+this.channelId
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
.venues-detail{
	width: 100%;
	overflow: auto;
	box-sizing: border-box;
	.venues_box{
		margin-top: 20rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.venues_title{
			width: 100%;
			font-size: 36rpx;
			line-height: 60rpx;
			font-weight: bolder;
			color: #1B1C1E;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.venues_info{
			font-size: 32rpx;
			font-weight: 400;
			line-height: 64rpx;
			color: #1B1C1E;
			display: flex;
			align-items: center;
			&_name{
				color: #666;
			}
			.address{
				max-width: calc(100% - 218rpx);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.address_btn{
				width: 108rpx;
				height: 38rpx;
				margin-left: 10rpx;
				border: 2rpx solid #5D4ADE;
				border-radius: 8rpx;
				text-align: center;
				line-height: 38rpx;
				color: #614DDF;
				font-size: 22rpx;
			}
		}
		.venues_infos{
			font-size: 32rpx;
			font-weight: 400;
			line-height: 64rpx;
			color: #666;
			text{
				color: #1B1C1E;
			}
		}
	}
	.introduce{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 0;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #8B8B9C;
		.more{
			font-size: 24rpx;
			line-height: 40rpx;
			color: #7666E3;
			margin-left: 6rpx;
		}
	}
}
.dz_red{
	color: rgb(223,20,20);
}
.gray{
	background: #ccc !important;
}
</style>
