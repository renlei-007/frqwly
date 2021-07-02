<template>
	<view class="live-detail">
		<view class="video_info">
			<view class="video_play">
				
			</view>
			<view class="video_info_detail">
				<view class="video_info_detail_title">{{content.title}}</view>
				<view class="video_info_detail_txt">课程分类：{{content.typeName}}</view>
				<view class="video_info_detail_txt">课程章节：1</view>
				<view class="video_info_detail_txt">课程时长：</view>
				<view class="video_info_detail_txt">课程主讲：{{content.realname}}</view>
				<view class="video_info_detail_txt">学习人数：{{content.views+1}}</view>
			</view>
			<view class="chapters">
				<view class="chapters_tab">
					<view class="chapters_tab_title active">章节</view>
				</view>
				<view class="chapters_info">
					<view class="chapters_info_list" v-for="(item,Index) in 4" :key="Index" :class="{'actives':chapters==Index}" @tap="chapterChange(Index)">
						<view class="chapters_info_list_title">VTS_01_1.MP4</view>
						<view class="chapters_info_list_free">免费</view>
					</view>
				</view>
				<!-- <view class="active_detail_comment" v-else>
					<view class="active_detail_comment_area">
						<image class="avatar" src="../../static/user_avatar.png" mode=""></image>
						<view class="active_detail_comment_area_box">
							<textarea class="active_detail_comment_area_box_inp" v-model="comment" placeholder="说两句吧..." />
							<view class="submit_btn">提交</view>
						</view>
					</view>
					<view class="active_detail_comment_else">
						<view class="all_comment">
							<image src="../../static/active-icon/gywm.png" mode=""></image>
							<text>全部评论</text>
						</view>
						<view class="right_part">
							<view class="right_part_detail">
								<image src="../../static/active-icon/gywm.png" mode=""></image>
								<text>分享</text>
							</view>
							<view class="right_part_detail">
								<image src="../../static/active-icon/gywm.png" mode=""></image>
								<text>22</text>
							</view>
							<view class="right_part_detail">
								<image src="../../static/active-icon/gywm.png" mode=""></image>
								<text>收藏</text>
							</view>
						</view>
					</view>
				</view> -->
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
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getLiveList()
		},
		methods: {
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
					channelIds: '113',
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
.live-detail{
	width: 100%;
	background-color: #FFFFFF;
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
