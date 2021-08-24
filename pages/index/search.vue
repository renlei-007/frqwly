<template>
	<view class="search content">
		<zy-search :h-list="list" ref="zysearch" :is-focus="true" :is-block="false" :show-want="true" @search="doSearch"></zy-search>
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" style="overflow: auto;" :style="{'height':`calc(100% - ${heights*2}rpx)`}">
			<view class="search_list">
				<view class="search_list_cell" v-for="(item,index) in result" :key="index" @tap="navToDetailPage(item)">{{item.title}}</view>
			</view>
		</ys-scroll>
	</view>
</template>

<script>
	import zySearch from '@/components/zy-search/zy-search.vue';
	export default {
		components: {
			zySearch,
		},
		data() {
			return {
				list:[],
				result: [],
				page: 0,
				keywords: '',
				param:{//滚动区域配置
					scroll_y:true,
					background:'#fff',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				heights: 45,
			};
		},
		onShow() {
			const value = uni.getStorageSync('search_cache');
			if (value) {
				this.list = value;
			}
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.result = [];
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
				const query = uni.createSelectorQuery().in(this);
				let height = 0
				query.select('#zy-search').boundingClientRect(data => {
					console.log(data);
					height = Math.ceil(data.height)
					this.heights = height
				}).exec();
				let params={
					q: this.keywords, count: 10, first: this.page,
				}
				this.indexRequest({url:'/content/search',data:params}).then(res=>{
					console.log(res);
					if(res.data.body.length==0&&this.result.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.result = this.result.concat(res.data.body)
						console.log(this.result);
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			doSearch(keywords){
				this.keywords = keywords;
				this.refresh()
			},
			navToDetailPage(item){
				switch(item.modelName){
					case '艺术欣赏':
						this.navigateTo('/pages/cate/art-expert?id='+item.id)
						break
					case '旅游景点':
						this.navigateTo('/pages/cate/scenic-spot?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '新闻':
						this.navigateTo('/pages/cate/information-detail?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '非遗名录':
						this.navigateTo('/pages/cate/nonlegacy-detail?id='+item.id)
						break
					case '直播':
						this.navigateTo('/pages/cate/live-detail?id='+item.id)
						break
					case '志愿服务':
						this.navigateTo('/pages/cate/volunteers-detail?id='+item.id)
						break
					case '活动预定':
						this.navigateTo('/pages/cate/active-detail?id='+item.id)
						break
					case '培训':
						this.navigateTo('/pages/cate/nettrain-detail?id='+item.id)
						break
					case '群组':
						this.navigateTo('/pages/cate/volunteers-detail?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '场馆预定':
						this.navigateTo('/pages/cate/venues-detail?id='+item.id+'&&channelIds='+item.channelId)
						break
					case '课程':
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
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	width: 100%;
	height: 100%;
	overflow: auto;
}
.search_list{
	width: 100%;
	box-sizing: border-box;
	padding: 3 30rpx;
	&_cell{
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		font-size: 32rpx;
		color: #000;
		line-height: 52rpx;
		border-bottom: 1px solid #c8c7cc;
		&:nth-last-child(1){
			border-bottom: none;
		}
	}
}
</style>
