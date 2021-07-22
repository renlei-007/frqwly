<template>
	<view class="mooc-detail content">
		<view class="video_info">
			<view class="video_play">
				<!-- #ifdef MP-WEIXIN -->
				<video id="myVideo" :src="content.courses[chapters].videoPath" object-fit="fill"></video>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<video id="myVideo" :src="content.courses[chapters].videoPath" object-fit="fill"></video>
				<!-- #endif -->
			</view>
			<view class="video_info_detail">
				<view class="video_info_detail_title">{{content.title}}</view>
				<view class="video_info_detail_txt">课程分类：{{content.typeName}}</view>
				<view class="video_info_detail_txt">课程章节：{{content.courses.length}}</view>
				<view class="video_info_detail_txt">课程时长：</view>
				<view class="video_info_detail_txt">课程主讲：{{content.attr_teacher}}</view>
				<view class="video_info_detail_txt">学习人数：{{content.views+1}}</view>
			</view>
			<view class="chapters">
				<view class="chapters_tab">
					<view class="chapters_tab_title">章节</view>
				</view>
				<view class="chapters_info">
					<view class="chapters_info_list" v-for="(item,Index) in content.courses" :key="Index" :class="{'actives':chapters==Index}" @tap="chapterChange(Index)">
						<view class="chapters_info_list_title">{{item.name}}</view>
						<view class="chapters_info_list_free">{{item.isFree?'免费':'收费'}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in liveList" :key="index" @tap="toDetail(item.id)">
					<view class="tj_active_content_box_img">
						<image :src="item.titleImg" mode=""></image>
					</view>
					<view class="tj_active_content_box_title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<ys-bottom :id="id" @show="is_show = true"></ys-bottom>
		<ys-comment v-if="is_show" :id="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chapters: 0,
				comment: '',
				id: '',
				content: {},
				liveList: [],
				
				commentList: [],
				is_show: false,
				page: 0,
				fullScreenFlag:false,
				ctx: null,
				playerCtx:null,
				touchStartTime: 0, // 触摸开始时间   用来判断是否是双击	
				
				showControlbar: true,
				timer:null,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getLiveList()
		},
		onReady(res) {
			console.log('ready!');
			this.ctx = wx.createLivePlayerContext('player')
			this.playerCtx = uni.createLivePlayerContext('livePlayer');
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.commentList = [];
				this.getLiveList();
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getLiveList();
			},
			handleControlbar() {
				this.showControlbar = !this.showControlbar
			},
			//全屏功能的实现
			handleFullScreen() {
				var that = this
				if (!that.fullScreenFlag) {
					that.playerCtx.requestFullScreen({
						success: res => {
							that.fullScreenFlag = true
							console.log('我要执行了');
						},
						fail: res => {
							console.log('fullscreen fail');
						},
						direction: 90
					});
				} else {
					//缩小
					that.playerCtx.exitFullScreen({
						success: res => {
							that.fullScreenFlag = false
							console.log('我要执行了');
						},
						fail: res => {
							console.log('exit fullscreen success');
						}
					});
				}
			},
			close(){
				this.is_show = false
			},
			chapterChange(index){
				this.chapters = index
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getLiveList(){
				let params = {
					count:5,
					channelIds: '191',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.liveList = array
				})
			},
			toDetail(id){
				uni.redirectTo({
					url: '/pages/cate/mooc-detail?id='+id
				})
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
video,live-player {
	width: 100%;
}
uni-video{ height: 100%;}
video{height: 100%;}
.mooc-detail{
	width: 100%;
	height: auto;
	background-color: #FFFFFF;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.video_info{
		width: 100%;
		.video_play{
			width: 100%;
			height: 420rpx;
			background: #707070;
		}
		&_detail{
			width: 100%;
			box-sizing: border-box;
			padding: 0 32rpx 16rpx;
			border-bottom: 2rpx solid #ddd;
			&_title{
				width: 100%;
				font-size: 40rpx;
				font-weight: 500;
				line-height: 104rpx;
				color: #1B1C1E;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&_txt{
				font-size: 32rpx;
				font-weight: 400;
				line-height: 64rpx;
				color: #1B1C1E;
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
			&_info{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx 0;
				font-size: 28rpx;
				color: #222;
				&_list{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 76rpx;
				}
				.actives{
					color: #7565E3;
				}
			}
		}
	}
	.recommend{
		width: 100%;
		box-sizing: border-box;
		padding: 0 48rpx;
		&_name{
			font-size: 40rpx;
			font-weight: 500;
			line-height: 96rpx;
			color: #1B1C1E;
			border-bottom: 1px solid #eee;
		}
	}
}
</style>
