<template>
	<view class="live-list content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="live">
				<view class="live_list" v-for="(item,index) in liveList" :key="index" @tap="toDetail(item.id)">
					<view class="live_list_img">
						<image class="live_list_img_url" :src="item.titleImg" mode="aspectFill"></image>
					</view>
					<view class="live_list_info">
						<view class="live_list_info_title">{{item.title}}</view>
						<view class="live_list_info_detail">
							<view class="live_list_info_detail_left">
								<image class="icon" src="/static/position.png" mode=""></image>
								<text>{{item.siteName}}</text>
							</view>
							<view class="live_list_info_detail_right">
								{{item.views}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</ys-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liveList: [],
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				page: 0,
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
				this.activeList = [];
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
					channelIds: 113, count: 10, first: this.page, format:0, s_category: '', orderBy: 4,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.liveList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.liveList = this.liveList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/cate/live-detail?id='+id
				})
			}
		},
	}
</script>

<style lang="scss">
.live-list{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.live{
	width: 690rpx;
	height: 100%;
	margin: 0 auto;
	&_list{
		margin: 30rpx auto 0;
		width: 100%;
		background-color: #FFFFFF;
		&_img{
			width: 100%;
			height: 386rpx;
			&_url{
				width: 100%;
				height: 100%;
			}
		}
		&_info{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx;
			&_title{
				width: 100%;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				color: #1B1C1E;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&_detail{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #8B8B9C;
				margin-top: 20rpx;
				&_left{
					display: flex;
					align-items: center;
					.icon{
						width: 21rpx;
						height: 24rpx;
						margin-right: 16rpx;
					}
				}
				&_right{
					
				}
			}
		}
	}
}
</style>
