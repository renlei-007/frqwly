<template>
	<view class="volunteers-detail content">
		<view class="major">
			<view class="major_img">
				<image class="major_imgs" :src="content.titleImg" mode=""></image>
			</view>
			<view class="major_box" style="padding-bottom: 20rpx;">
				<view class="major_box_name">{{content.title}}</view>
				<view class="major_box_text">
					团队所在地：<text>{{content.attr_address?content.attr_address:'暂无'}}</text>
				</view>
				<view class="major_box_text">
					成立时间：<text>{{content.sortDate?content.sortDate:'暂无'}}</text>
				</view>
				<view class="major_box_text" v-if="channelIds==127">
					活动类型：
					<text v-for="(item,index) in content.attr_type" :key="index">{{index==content.attr_type.length-1?item:item+' | '}}</text>
				</view>
				<view class="major_box_text" v-else>
					社团类型：
					<text>{{content.attr_groupType}}</text>
				</view>
				<view class="major_box_text" v-if="channelIds!=127">
					招募人数：
					<text>{{content.group&&content.group.toplimit?content.group.toplimit:''}}人</text>
				</view>
				<view class="major_box_text" v-if="channelIds==127">
					招募截止日期：<text>
						{{content.registrationEnd?content.registrationEnd.slice(0,10):''}}</text>
				</view>
				<view class="major_box_text" v-else>
					招募日期：<text>
						{{content.group&&content.group.dateLimit?content.group.dateLimit:''}}</text>
				</view>
				<view class="major_box_text" v-if="channelIds==127">
					电话：<text>{{content.attr_phone?content.attr_phone:'暂无'}}</text>
				</view>
			</view>
			<view class="blank"></view>
			<view class="tj_active">
				<view class="tj_active_title">详情</view>
				<view class="introduce">
					<rich-text :nodes="content.txt"></rich-text>
				</view>
			</view>
			
			<view class="blank"></view>
			
			<view class="tj_active">
				<view class="tj_active_title">相关推荐</view>
				<view class="tj_active_content">
					<view class="tj_active_content_box" v-for="(item,index) in teersList" :key="index" @tap="todetail(item.id)">
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
			<block v-if="channelIds==127">
				<view class="public_btn" @tap="signUp" v-if='status == 0'>成为志愿者</view>
				<view class="public_btn" @tap="cancel" v-if="status == 1">取消申请</view>
				<view class="public_btn" @tap="cancel" v-if="status == 2">退出</view>
				<view class="public_btn public_btn_g" v-if="status == 3">报名已结束</view>
				<view class="public_btn public_btn_g" v-if="status == 4">已退出不能参与</view>
				<view class="public_btn public_btn_g" v-if="status == 5">已报名过</view>
			</block>
			<block v-else>
				<view class="public_btn" @tap="signUp" v-if='status == 0&&can_join'>加入社团</view>
				<view class="public_btn public_btn_g" v-if="status == 0&&!can_join">人数已满</view>
				<view class="public_btn" @tap="cancel" v-if="status == 1">取消申请</view>
				<view class="public_btn public_btn_g" v-if="status == 2||status == 3">已加入社团</view>
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
				recordId: '',
				channelIds: '',
				content: {},
				teersList: [],
				status: 0,
				can_join: false,
				isJoin: false,
				
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
				is_Certification: false,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.channelIds = e.channelIds
			if(e.scene){
				console.log(e.scene);
				let params = decodeURIComponent(e.scene).split('&');
				if(params.length == 2){
					this.id = params[0];
					this.channelIds = params[0];
				}
			}
			if(this.isLogin){
				this.getUser()
				this.homeRequest({url:'/view',method:'GET',data:{}})
				if(this.channelIds==127){
					this.getJoinStatus()
				}
			}
		},
		onShow() {
			this.getDetail()
			this.getTeersList()
			
			this.getCommentList()
			let isFabulous = uni.getStorageSync('fabulous'+this.id);
			if(isFabulous){
				this.isFabulous = true;
			}
			if(this.isLogin){
				
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
			getStatus(){
				if(this.channelIds == 127){
					this.homeRequest({
						url: '/volunteer/status',
						method: 'GET',
						data: {contentId: this.id},
					}).then(res=>{
						if(res.code==200){
							this.status = res.body.status;
							this.recordId = res.body.recordId;
						}
					})
				}else{
					this.homeRequest({
						url: '/group/status',
						method: 'GET',
						data: {groupId: this.id},
					}).then(res=>{
						if(res.code==200){
							this.status = res.body;
						}
					})
				}
			},
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
			getUser(){
				let username = uni.getStorageSync('user_info').username
				this.homeRequest({
					url: '/user/get',
					method: 'get',
					data: {username:username},
				}).then(res=>{
					console.log(res);
					this.is_Certification = res.body.isCertification
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
					if(this.channelIds == 142){
						if(content.group.memberCount<content.group.toplimit){
							this.can_join = true
						}else{
							this.can_join = false
						}
					}
					if(this.status == 0 && this.content.registrationEnd){
						var date = new Date(),end = Date.parse(this.content.registrationEnd);
						if(end < date.getTime()){
							this.status = 3;
						}
					}
				})
			},
			getJoinStatus(){
				this.homeRequest({url:'/volunteerInfo/check',method:'GET',data:{}}).then(res=>{
					console.log(res);
					if(res.code==101){
						this.isJoin = false
					}
					if(res.code==200){
						this.isJoin = true
					}
				})
			},
			getTeersList(){
				let params = {
					count:5,
					channelIds: this.channelIds,
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.teersList = array
				})
			},
			signUp(){
				console.log(this.isLogin);
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
				if(!this.is_Certification){
					this.toast('您还没有实名认证或认证正在审核中，请检查','none')
					return
				}
				if(this.channelIds==127){
					if(!this.isJoin){
						this.toast('请先成为志愿者！','none')
						return
					}
					uni.showModal({
						title: "提示",
						content: "确定要加入该志愿者活动吗？",
						showCancel: true,
						confirmText: "确定",
						success: (res)=>{
							if (res.confirm) {
								this.homeRequest({
									url: '/volunteer/add',
									method: 'GET',
									data: {contentId: this.id},
								}).then(res=>{
									if(res.code == 200){
										this.toast('报名成功！')
										this.status = 1
									}else{
										this.toast(res.message,'none')
									}
								})
							} else if (res.cancel) {
							}
						}
					})
				}else{
					uni.showModal({
						title: "提示",
						content: "确定要加入该社团吗？",
						showCancel: true,
						confirmText: "确定",
						success: (res)=>{
							if (res.confirm) {
								this.homeRequest({
									url: '/group/join',
									method: 'GET',
									data: {groupId: this.id},
								}).then(res=>{
									if(res.code == 200){
										this.toast('报名成功！')
										this.status = 1
									}else{
										this.toast(res.message,'none')
									}
								})
							} else if (res.cancel) {
							}
						}
					})
				}
			},
			cancel:function(e){
				uni.showModal({
					title: "提示",
					content: "确定要退出吗？",
					showCancel: true,
					confirmText: "确定",
					success: (res)=>{
						if (res.confirm) {
							if(this.channelIds==127){
								this.homeRequest({
									url:'/volunteer/cancel',
									method: 'GET',
									data: {recordId: this.id},
								}).then(r=>{
									if(r.code == 200){
										this.toast('操作成功！')
										this.status = 4
									}else{
										this.toast('操作失败！','none')
									}
								});
							}else{
								this.homeRequest({
									url:'/group/cancelApply',
									method: 'GET',
									data: {groupId: this.id},
								}).then(r=>{
									if(r.code == 200){
										this.toast('操作成功！')
										this.getStatus()
									}else{
										this.toast('操作失败！','none')
									}
								});
							}
						} else if (res.cancel) {
						}
					}
				})
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/volunteers-detail?id='+id+'&&channelIds='+this.channelIds
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
.volunteers-detail{
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
			background: url(../../static/default.png) no-repeat center center;
			.major_imgs{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
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
				line-height: 64rpx;
				text{
					color: #aaa;
				}
			}
		}
	}
}
</style>
