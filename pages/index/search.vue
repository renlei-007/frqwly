<template>
	<view class="search content">
			<zy-search :h-list="list" ref="zysearch" :is-focus="true" :is-block="false" :show-want="true" @search="doSearch"></zy-search>
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" style="overflow: auto;" :style="{'height':`calc(100% - ${heights*2}rpx)`}">
			<view class="search_list">
				<view class="search_list_cell" v-for="(item,index) in result" :key="index"></view>
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
				heights: 0,
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
					height = Math.ceil(data.height)
					this.heights = height
				}).exec();
				let params={
					q: this.keywords, count: 10, first: this.page,
				}
				this.indexRequest({url:'/content/search',data:params}).then(res=>{
					if(res.data.body.length==0&&this.result.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.result = this.result.concat(res.data.body)
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
				// uni.downloadFile({
				// 	url: 'http://a-news.oss-cn-hangzhou.aliyuncs.com/avatar/1.jpg',
				// 	success: (res) => {
				// 		console.log(res);
				// 	},
				// 	fail: err => {
				// 		console.log(err);
				// 	}
				// })
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
		padding: 30rpx 0;
		font-size: 32rpx;
		color: #000;
		line-height: 36rpx;
		border-bottom: 1px solid #c8c7cc;
	}
}
</style>
