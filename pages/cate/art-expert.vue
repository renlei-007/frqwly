<template>
	<view class="art-expert content">
		<view class="main_img">
			<image class="indeximg" :src="content.titleImg" mode=""></image>
		</view>
		<view class="arts">
			<view class="arts_title">{{content.title}}</view>
			<view class="arts_detail">
				<view class="arts_detail_time">{{content.releaseDate}}</view>
				<view class="arts_detail_read">阅读:{{content.views+1}}</view>
			</view>
			<view class="arts_txt">{{showText}}<text v-if="!showAll" style="color: #7666E3;margin-left: 16rpx;" @tap="getMore">展开更多</text></view>
		</view>
		
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in artList" :key="index" @tap="toDetail(item.id)">
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
				nowIndex: 0,
				showText: '',
				showAll: false,
				Index: 0,
				id: '',
				comment: '',
				content: {},
				artList: [],
				is_show: false,
				commentList: [],
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getArtList()
			if(this.isLogin){
				this.getCommentList()
			}
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				this.page = 0;
				this.commentList = [];
				this.getCommentList();
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    this.page += 10
				this.getCommentList();
			},
			close(){
				this.is_show = false
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
			indexChange(e){
				this.nowIndex = e.detail.current
			},
			getMore(){
				this.showText = this.content.description
				this.showAll = true
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
					if(content.description.length>48){
						this.showText = content.description.slice(0,42)+'...'
					}else{
						this.showAll = true
						this.showText = content.description
					}
				})
			},
			getArtList(){
				let params = {
					count:5,
					channelIds: '114',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.artList = array
				})
			},
			toDetail(id){
				uni.redirectTo({
					url: '/pages/cate/art-expert?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.art-expert{
	background-color: #FFFFFF;
	box-sizing: border-box;
	width: 100%;
	height: auto;
	padding-bottom: 150rpx;
	.arts{
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 32rpx;
		&_title{
			font-size: 40rpx;
			font-weight: 500;
			line-height: 60rpx;
			color: #1B1C1E;
		}
		&_detail{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			color: #8B8B9C;
		}
		&_txt{
			width: 100%;
			font-size: 28rpx;
			line-height: 48rpx;
			color: #8B8B9C;
		}
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
			min-height: 400rpx;
		}
	}
}
</style>
