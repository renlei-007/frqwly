<template>
	<view class="nettrain-detail content">
		<view class="major">
			<view class="major_img">
				<!-- #ifndef MP-WEIXIN -->
					<image class="major_imgs" :src="content.titleImg" mode=""></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<image v-if='content.liveTrainRecord.online==0' class="major_imgs" :src="content.titleImg" mode=""></image>
					<video v-if="content.liveTrainRecord.online==1&&content.liveTrainRecord.type==2" class="major_video" :src="content.liveTrainRecord.recordUrl" controls></video>
					<video autoplay webkit-playsinline class="major_video" v-if='content.liveTrainRecord.online==1&&content.liveTrainRecord.type == 1'>
						<source :src="content.liveTrainRecord.pullUrl" type='rtmp/flv' />
					</video>
				<!-- #endif -->
			</view>
			<view class="major_box">
				<view class="major_box_name">{{content.title}}</view>
				<view class="major_box_text">
					<image src="/static/first_time.png" mode="" style="width: 28rpx;height: 28rpx;"></image>
					<text>{{content.registrationStart.slice(0,10)}}至{{content.registrationEnd.slice(0,10)}}</text>
				</view>
				<view class="major_box_text">
					<image src="/static/second_time.png" mode="" style="width: 28rpx;height: 28rpx;"></image>
					<text>{{content.attr_startTime.slice(0,10)}}至{{content.attr_endTime.slice(0,10)}}</text>
				</view>
				<view class="major_box_text">
					<image src="/static/position.png" mode="" style="width: 28rpx;height: 34rpx;"></image>
					<text class="address">{{content.attr_address?content.attr_address:'暂无'}}</text>
					<view class="address_btn" @tap="openMap(content)" v-if="content.position">查看地图</view>
				</view>
				<view class="major_box_text">
					<image src="/static/phone.png" mode="" style="width: 32rpx;height: 32rpx;"></image>
					<text>{{content.attr_phone}}</text>
				</view>
				<view class="major_box_text">
					<text>课时：{{content.attr_classHours}}</text>
				</view>
				<view class="major_box_text" v-if="content.quota!=null&&content.quota!=''&&content.quota!=undefined&&content.liveTrainRecord.online==0">
					<text>剩余名额：{{showStatus == 3&&content.quota?content.quota:0}}</text>
				</view>
			</view>
			
			<view class="blank"></view>
			
			<view class="chapters">
				<view class="chapters_tab">
					<view class="chapters_tab_title">培训详情</view>
					<!-- <view class="chapters_tab_title">培训课程</view> -->
				</view>
				<view class="introduce">
					<rich-text :nodes="content.txt"></rich-text>
				</view>
			</view>
			
			<view class="blank"></view>
			
			<view class="tj_active">
				<view class="tj_active_title">相关推荐</view>
				<view class="tj_active_content">
					<view class="tj_active_content_box" v-for="(item,index) in trainList" :key="index" @tap="todetail(item.id)">
						<view class="tj_active_content_box_img">
							<image :src="item.titleImg" mode=""></image>
						</view>
						<view class="tj_active_content_box_title">{{item.title}}</view>
					</view>
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
			<block v-if='content.liveTrainRecord.online==1'>
				<view class="public_btn public_btn_g">无需报名</view>
			</block>
			<block v-else>
				<view class="public_btn" @tap="signUp" v-if='showStatus == 3 && status == 0'>立即报名</view>
				<view class="public_btn" @tap="signOut" v-if='showStatus == 3 && status == 1'>取消申请</view>
				<view class="public_btn" @tap="signOut" v-if='showStatus == 3 && status == 2'>取消报名</view>
				<view class="public_btn public_btn_g" v-if='showStatus == 1'>即将开始</view>
				<view class="public_btn public_btn_g" v-if='showStatus == 2'>已结束</view>
			</block>
		</view>
		<ys-comment v-if="comment_show" :ids="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
		<ys-share ref="share" :contentHeight="580" :shareList="shareList"></ys-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: {
					registrationStart: '',
					registrationEnd: '',
					attr_startTime: '',
					attr_endTime: '',
					quota: null,
					liveTrainRecord: {
						online: 0,//是否线上
						type: 0,//是否直播  1为直播 2为录播
						recordUrl: '',
						pullUrl: '',
					},
				},
				trainList: [],
				status: 0,
				showStatus:2,
				
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
			this.getNettrainList()
			
			this.getCommentList()
			let isFabulous = uni.getStorageSync('fabulous'+this.id);
			if(isFabulous){
				this.isFabulous = true;
			}
			if(this.isLogin){
				console.log(111111111);
				// this.getTicketStatus()
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
				this.getStatus()
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
			getStatus(){
				this.homeRequest({
					url: '/train/status',
					method: 'GET',
					data: {contentId: this.id},
				}).then(res=>{
					if(res.code==200){
						this.status = res.body.status
					}
				})
			},
			signUp(){
				if(this.content.quota<=0){
					this.toast('名额不足,请选择其他课程!','none')
					return
				}
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
					return
				}
				if(!uni.getStorageSync('user_info').isCertification){
					this.toast('您还没有实名认证，请先实名认证！','none')
					return
				}
				this.homeRequest({
					url: '/train/add',
					method: 'GET',
					data: {contentId: this.id},
				}).then(res=>{
					if(res.code==200){
						this.toast('报名成功！')
						this.getStatus()
						this.getDetail()
					}else{
						this.toast(res.message,'none')
					}
				})
			},
			signOut(){
				uni.showModal({
					title: "提示",
					content: "确定要取消吗？",
					showCancel: true,
					confirmText: "确定",
					success: (res)=>{
						if (res.confirm) {
							this.homeRequest({
								url: '/train/cancel',
								method: 'GET',
								data: {recordId: this.id},
							}).then(res=>{
								if(res.code==200){
									this.toast('取消成功！','none')
									this.getStatus()
									this.getDetail()
								}else{
									this.toast('取消失败','none')
								}
							})
						} else if (res.cancel) {
						}
					}
				})
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
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					var content = res.data.body;
					content.txt = this.replaceSpecialChar(content.txt)
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
					if(content.registrationStart){
						var date = new Date(), start = this.transformTime(content.registrationStart), end = this.transformTime(content.registrationEnd);
						if(start> date.getTime()){
							this.showStatus = 1;
						}else if(end < date.getTime()){
							this.showStatus = 2;
						}else{
							this.showStatus = 3;
						}
					}
				})
			},
			getNettrainList(){
				let params = {
					count:5,
					channelIds: '133',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					if(res.data.body.length>4){
						let array = res.data.body
						array.shift()
						this.trainList = array
					}else{
						this.trainList = res.data.body
					}
				})
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/nettrain-detail?id='+id
				})
			},
			/**
			 * @param {Object} t
			 * 时间转换方法
			 */
			transformTime(t){
				var time = t.replace(/-/g,"/");
				//uni.showToast({ title: time, duration: 2000 }); 
				return new Date(time);
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
.nettrain-detail{
	width: 100%;
	height: 100%;
	overflow: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.major{
		width: 100%;
		&_img{
			width: 690rpx;
			height: 414rpx;
			margin: 30rpx auto 0;
			.major_imgs{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			.major_video{
				width: 100%;
				height: 100%;
			}
		}
		&_box{
			width: 690rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #1B1C1E;
			margin: 16rpx auto 0;
			&_name{
				font-size: 36rpx;
				font-weight: 500;
				line-height: 68rpx;
				color: #1B1C1E;
			}
			&_text{
				height: 64rpx;
				line-height: 64rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #1B1C1E;
				image{
					margin-right: 16rpx;
				}
				.address{
					max-width: calc(100% - 152rpx);
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
		}
		.chapters{
			width: 654rpx;
			margin: 0 auto;
			&_tab{
				width: 100%;
				height: 98rpx;
				border-bottom: 2rpx solid #eee;
				display: flex;
				&_title{
					font-size: 40rpx;
					font-weight: 400;
					line-height: 90rpx;
					color: #8B8B9C;
					margin-right: 66rpx;
				}
				.active{
					font-weight: 500;
					color: #7565E3;
					// font-size: 40rpx;
					border-bottom: 8rpx solid #7565E3;
				}
			}
			.introduce{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 0;
			}
		}
	}
}
.dz_red{
	color: rgb(223,20,20);
}
video,live-player {
	width: 100%;
	height: 100%;
}
uni-video{ height: 100%;}
</style>
