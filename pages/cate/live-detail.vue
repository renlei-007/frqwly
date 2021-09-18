<template>
	<view class="live-detail">
		<view class="video_info">
			<view class="video_play">
				<!-- #ifdef MP-WEIXIN -->
				<video id="myVideo" :src="content.liveRecord.recordUrl" v-if='content.liveRecord.type == 2' object-fit="fill"></video>
				<video id="myVideo" :src="content.liveRecord.pullUrl" v-if='content.liveRecord.type == 1' object-fit="fill"></video>
				<!-- <live-player 
					id="livePlayer" 
					class="live-player" 
					catchtouchmove 
					:src="content.liveRecord.pullUrl" 
					:autoplay="true"
					v-if='content.liveRecord.type == 1' 
					@tap="handleControlbar"
					mode="live"
				>
					<cover-view class="player-tool" :style="{bottom:(showControlbar?'0':'-60rpx')}">
						<cover-view class="tools">
							<cover-view class="full-screen" @tap.stop="handleFullScreen()">
								<cover-image class="screen_icon" src="../../static/screen.png" ></cover-image>
								<cover-view class="screen_icon" v-if="false">&#xe6d9;</cover-view>
								<cover-view class="iconfont" v-if="false">&#xe794;</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</live-player> -->
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<video id="myVideo" :src="content.liveRecord.recordUrl" v-if='content.liveRecord.type == 2' object-fit="fill"></video>
				<video autoplay webkit-playsinline v-if='content.liveRecord.type == 1'>      
					<source :src="content.liveRecord.pullUrl" type='rtmp/flv' />
				</video>
				<!-- #endif -->
			</view>
			<view class="video_info_detail">
				<view class="video_info_detail_title">{{content.title}}</view>
				<view class="video_info_detail_txt">发布时间：{{content.releaseDate}}</view>
				<view class="video_info_detail_txt">视频类型：<text v-for="(item,index) in content.attr_category" :key="index">{{item+(index==content.attr_category.length-1?'':'|')}}</text></view>
				<view class="video_info_detail_txt">观看人数：{{content.views+1}}</view>
			</view>
			<view class="tj_active">
				<view class="tj_active_title">视频详情</view>
				<view class="introduce">
					<rich-text :nodes="content.txt"></rich-text>
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
		<ys-bottom :ids="id" @show="is_show = true"></ys-bottom>
		<ys-comment v-if="is_show" :ids="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chapters: 0,
				comment: '',
				id: '',
				content: {
					liveRecord: {
						type: '',
					}
				},
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
				
				lastTapDiffTime: 0,
				
				index: 0,  
				start_time: 0,  
				end_time: 0
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getLiveList()
			if(this.isLogin){
				this.homeRequest({url:'/view',method:'GET',data:{}})
			}
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
				console.log(111111111);
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
					content.txt = this.replaceSpecialChar(content.txt)
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getLiveList(){
				let params = {
					count:4,
					channelIds: '113',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					this.liveList = array
				})
			},
			toDetail(id){
				uni.redirectTo({
					url: '/pages/cate/live-detail?id='+id
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
	height: 100%;
}
uni-video{ height: 100%;}
.live-detail{
	width: 100%;
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
//播放器弹出工具
.player-tool {
	width: 100%;
	height: 60rpx;
	background: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	left: 0;
	z-index: 1000000;
	padding: 0 0rpx;
	transition: all 0.3s;
	.tools {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;

		.full-screen {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right:40upx; 
			.screen_icon{
				width: 40rpx;
				height: 40rpx;
			}
			.iconfont {
				color: #fff;
				font-weight: bold;font-size:36upx ;padding: 0 0 0 40upx;

			}
		}

		.cruise {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 25rpx;

			.iconfont {
				color: #E45A3E;
				font-size: 45rpx;
			}
		}
	}

}
</style>
