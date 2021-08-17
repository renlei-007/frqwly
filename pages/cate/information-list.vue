<template>
	<view class="information-list content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="news_box">
				<view class="news_list" v-for="(item,index) in newsList" :key="index" @tap="todetail(item.id)">
					<block v-if="item.titleImg">
						<view class="news_list_left">
							<view class="news_list_left_title">{{item.title}}</view>
							<view class="news_list_left_info">{{item.description}}</view>
							<view class="news_list_left_content">
								<view class="news_list_left_content_from">
									<image src="/static/resource.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
									<view class="news_list_left_content_from_name">{{item.origin}}</view>
								</view>
								<view class="news_list_left_content_time">{{item.releaseDate.slice(0,10)}}</view>
							</view>
						</view>
						<image class="news_list_img" :src="item.titleImg" mode=""></image>
					</block>
					
					<block v-else>
						<view class="news_list_left" style="width: 100%;">
							<view class="news_list_left_title">{{item.title}}</view>
							<view class="news_list_left_info">{{item.description}}</view>
							<view class="news_list_left_content">
								<view class="news_list_left_content_from">
									<image src="/static/resource.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
									<view class="news_list_left_content_from_name">{{item.origin}}</view>
								</view>
								<view class="news_list_left_content_time">{{item.releaseDate.slice(0,10)}}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</ys-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'#ffffff',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				page: 0,
				newsList: [],
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.newsList = [];
				this.getList();
				setTimeout(()=>{
				    this.$refs.scroll.endRefresh()
				},800)
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getList();
			},
			getList(){
				let params={
					channelIds: 110, count: 10, first: this.page, format:0,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.newsList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.newsList = this.newsList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			todetail(id){
				uni.navigateTo({
					url: './information-detail?id='+id+'&&channelIds=110'
				})
			},
		}
	}
</script>

<style lang="scss">
.information-list{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	.news_box{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.news_list{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 30rpx 0;
			border-bottom: 1px solid #eed;
			&:nth-last-child(1){
				border-bottom: none;
			}
			&_img{
				width: 232rpx;
				height: 192rpx;
				background: #E5E5E5;
				border-radius: 8rpx;
				margin-left: 20rpx;
			}
			&_left{
				width: calc(100% - 252rpx);
				&_title{
					width: 100%;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					font-weight: bolder;
					color: #1B1C1E;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-top: -8rpx;
				}
				&_info{
					width: 100%;
					font-size: 24rpx;
					line-height: 24rpx;
					color: #8B8B9C;
					margin: 20rpx 0;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				&_content{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&_from{
						background-color: #E7E7E7;
						display: flex;
						box-sizing: border-box;
						padding: 6rpx;
						font-size: 24rpx;
						line-height: 24rpx;
						color: #1B1C1E;
						align-items: center;
						image{
							margin-right: 8rpx;
						}
					}
					&_time{
						font-size: 24rpx;
						line-height: 24rpx;
						color: #8B8B9C;
					}
				}
			}
		}
	}
}
</style>
