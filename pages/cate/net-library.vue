<template>
	<view class="net-library content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="cultural_box" style="box-sizing: border-box;padding: 0 30rpx;">
				<view class="cultural_box_point" v-for="(item,index) in bookList" :key="index">
					<image class="cultural_box_point_img" :src="item.titleImg" mode=""></image>
					<view class="cultural_box_point_name">{{item.title}}</view>
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
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				page: 0,
				bookList: [],
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
				this.bookList = [];
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
					channelIds: 193, count: 10, first: this.page, format:0,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.bookList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.bookList = this.bookList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss">

.cultural_box{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	&_point{
		width: 328rpx;
		height: 280rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		&_img{
			width: 100%;
			height: 188rpx;
			background: #E5E5E5;
			border-radius: 8rpx 8rpx 0px 0px;
		}
		&_name{
			width: 100%;
			height: 92rpx;
			text-align: center;
			line-height: 92rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
