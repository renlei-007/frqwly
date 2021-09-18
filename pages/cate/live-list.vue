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
					<view class="is_live" v-if="item.liveRecord.type==1&&item.liveRecord.isLive">正在直播</view>
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
					no_more_text:'没有更多数据了~',
					refresher_style:'black'
				},
				page: 0,
				type: '',
			};
		},
		onLoad(e) {
			if(e.type){
				this.type = e.type
				if(e.type=='活动专区'){
					uni.setNavigationBarTitle({
						title: '直播点播'
					})
				}else{
					uni.setNavigationBarTitle({
						title: e.type
					})
				}
			}
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.liveList = [];
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
				let nowTime = new Date().getTime()
				let params={
					channelIds: 113, count: 10, first: this.page, format:0, s_category_like: this.type?this.type:'', orderBy: 4,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.liveList.length == 0){
						console.log(111111);
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						res.data.body.map(item=>{
							item.liveRecord.isLive = false
							if(item.liveRecord.type==1&&item.liveRecord.startTime&&item.liveRecord.endTime){
								if(nowTime>this.getTimeSec(item.liveRecord.startTime)&&nowTime<this.getTimeSec(item.liveRecord.endTime)){
									item.liveRecord.isLive = true
								}
							}
						})
						console.log(res.data.body);
						this.liveList = this.liveList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			getTimeSec(val){
				let time = new Date(val).getTime()
				return time
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
	margin: 0 auto;
	&_list{
		margin: 30rpx auto 0;
		width: 100%;
		background-color: #FFFFFF;
		position: relative;
		&_img{
			width: 100%;
			height: 414rpx;
			background: url(../../static/default.png) no-repeat;
			background-position: left top;
			background-size: 100% 100%;
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
.is_live{
	box-sizing: border-box;
	padding: 0 20rpx;
	height: 44rpx;
	font-size: 22rpx;
	line-height: 44rpx;
	color: #fff;
	background: #FF3616;
	border-radius: 24px 0px 0px 24px;
	position: absolute;
	top: 30rpx;
	right: 0;
}
</style>
