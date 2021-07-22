<template>
	<view class="information-detail content">
		<view class="information_title">{{content.title}}</view>
		<view class="information_mess">
			<view class="information_mess_resource">来源：{{content.origin}}</view>
			<view v-if="show_news" class="information_mess_time">{{content.releaseDate?content.releaseDate.slice(0,10):''}}</view>
			<view v-else class="information_mess_time">阅读：{{content.views}}</view>
		</view>
		<view class="video_box" v-if="content.mediaPath.length>0">
			<video class="video" :src="content.mediaPath" controls object-fit="fill"></video>
		</view>
		<view class="information_content">
			<rich-text :nodes="content.txt"></rich-text>
		</view>
		<ys-bottom v-if="show_news" :id="id" @show="is_show = true"></ys-bottom>
		<ys-comment v-if="is_show" :id="id" :commentList="commentList" @share="share" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: {},
				commentList: [],
				is_show: false,
				page: 0,
				channelIds: 110,
				show_news: true,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.channelIds = e.channelIds
			if(this.channelIds==110){
				this.show_news = true
			}else{
				this.show_news = false
			}
			this.getDetail()
			this.getCommentList()
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
				this.is_show = false
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
					console.log(res);
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
					console.log(res);
					var content = res.data.body;
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.information-detail{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.information_title{
		width: 100%;
		font-size: 48rpx;
		line-height: 72rpx;
		color: #1B1C1E;
		box-sizing: border-box;
		padding: 30rpx;
		font-weight: bold;
	}
	.information_mess{
		width: 100%;
		box-sizing: 0 30rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #999;
		display: flex;
		box-sizing: border-box;
		padding: 30rpx;
		justify-content: space-between;
	}
	.video_box{
		width: 100%;
		height: 400rpx;
		box-sizing: border-box;
		padding: 30rpx;
		.video{
			width: 100%;
			height: 100%;
		}
	}
	.information_content{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
	}
}
</style>
