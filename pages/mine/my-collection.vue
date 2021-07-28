<template>
	<view class="my-collection content">
		<view class="uni-list">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore="loadMore">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in collectionList"  :key="index" >
					<ys-swipe-action :options="options" @click="bindClick(index, item.id)" style="width:100%;">
						<view class="uni-media-list" @click="navToDetailPage(item)">
							<view class="uni-media-list-logo">
								<image :src="item.titleImg" mode="aspectFill" v-if="item.titleImg"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top "><text v-text="cutText(item)"></text></view>
								<view class="uni-media-list-text-bottom uni-ellipsis">{{item.channelName}}</view>
							</view>
						</view>
					</ys-swipe-action>
				</view>
			</ys-scroll>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'#fff',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				page: 0,
				collectionList: [],
				options: [{
					text: '取消收藏'
				}],
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
				this.collectionList = [];
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
			cutText(item){
				if(item && item.title){
					return item.title.substring(0,36);
				}else{
					return '';
				}
			},
			getList(){
				let params = {
					first:this.page, 
					count: 10
				}
				this.homeRequest({
					url: '/content/mycollect',
					method: 'GET',
					data: params,
				}).then(res=>{
					if(res.body.length==0&&this.collectionList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.collectionList = this.collectionList.concat(res.body)
						if(res.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			bindClick(index,id){
				let params = {
					id: id,
					operate: 0
				}
				this.homeRequest({
					url: '/content/collect',
					method: 'GET',
					data: params,
				}).then(res=>{
					if(res.code==200){
						this.toast('取消成功！','none')
						this.refresh()
					}
				})
			},
			navToDetailPage(item){
				switch(item.channelName){
					case '艺术欣赏':
						this.navigateTo('/pages/cate/art-expert?id='+item.id)
						break
					case '景点攻略':
						this.navigateTo('/pages/cate/scenic-spot?id='+item.id)
						break
					case '文旅咨询':
						this.navigateTo('/pages/cate/information-detail?id='+item.id)
						break
					case '非遗':
						this.navigateTo('/pages/cate/nonlegacy-detail?id='+item.id)
						break
					case '直播点播':
						this.navigateTo('/pages/cate/live-detail?id='+item.id)
						break
					case '志愿者服务':
						this.navigateTo('/pages/cate/volunteers-detail?id='+item.id)
						break
					case '活动报名':
						this.navigateTo('/pages/cate/active-detail?id='+item.id)
						break
					case '网上培训':
						this.navigateTo('/pages/cate/nettrain-detail?id='+item.id)
						break
					case '文体社团':
						this.navigateTo('/pages/cate/volunteers-detail?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '体育场馆':
						this.navigateTo('/pages/cate/venues-detail?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '慕课':
						this.navigateTo('/pages/cate/mooc-detail?id='+item.id)
						break
					case '文化百科':
						this.navigateTo('/pages/cate/cultural-encyclopedia-detail?id='+item.id)
						break
					// case '网上培训':
					// 	this.navigateTo('/pages/cate/nettrain-detail?id='+item.id)
					// 	break
					break
				}
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.my-collection{
	width: 100%;
	height: 100%;
}
.uni-list {
	background-color: #FFFFFF;
	position: relative;
	width: 100%;
	height: 100%;
}
.uni-list:after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list::before {
	position: absolute;
	z-index: 10;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list-cell {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-list-cell::after {
	position: absolute;
  z-index: 3;
	right: 0;
	bottom: 0;
	left: 30upx;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.uni-list .uni-list-cell:last-child::after {
	height: 0upx;
}
.uni-media-list{
	width: 100%;
	box-sizing: border-box;
	padding: 36rpx 30rpx;
	display: flex;
}
.uni-media-list-logo {
	width: 172rpx;
	height: 110rpx;
	background: url(../../static/default.png);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 200%;
	margin-right: 20rpx;
}
.uni-media-list-body {
	width: calc(100% - 182rpx);
}
.uni-media-list-text-top{
	margin-bottom:15rpx;
	font-size: 30rpx;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.uni-media-list-text-bottom {
	font-size: 24rpx
}
.uni-media-list-logo image{
	width: 100%;
	height: 100%;
}
</style>
