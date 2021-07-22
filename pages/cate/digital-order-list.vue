<template>
	<view class="digital-order-list content">
		<view class="cate_box" style="height: 100%;">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="scenic_point" v-for="(item,index) in venuesList" :key="index">
						<image class="scenic_point_img" :src="item.titleImg" mode="" @tap="todetail(item.id)"></image>
						<view class="scenic_point_info">
							<view class="scenic_point_info_name">{{item.stitle}}</view>
							<view class="scenic_point_info_position">
								<image src="/static/position.png" class="scenic_point_info_position_icon" mode=""></image>
								<view class="scenic_point_info_position_txt">{{item.attr_address}}</view>
							</view>
						</view>
					</view>
				</view>
			</ys-scroll>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				venuesList: [],
				param:{//滚动区域配置
					scroll_y:true,
					background:'#ffffff',
					refresher:true,
					no_more_text:'没有更多了~',
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
				this.venuesList = [];
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
					channelIds: 179, count: 10, first: this.page, format:0, s_type: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.venuesList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.venuesList = this.venuesList.concat(res.data.body)
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
					url: '/pages/cate/venues-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
.digital-order-list{
	width: 100%;
	height: 100%;
}
</style>
