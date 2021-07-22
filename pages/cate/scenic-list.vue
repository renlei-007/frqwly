<template>
	<view class="scenic-list content">
		<view class="cate_box" style="height: 100%;">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box">
					<view class="scenic_point" v-for="(item,index) in scenicList" :key="index">
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
				scenicList: [],
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
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
				this.scenicList = [];
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
					channelIds: 135, first: this.page, format:0, orderBy: 4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.scenicList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.scenicList = this.scenicList.concat(res.data.body)
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
					url: '/pages/cate/scenic-spot?id='+id
				})
			}
		},
	}
</script>

<style lang="scss">
page{
	background-color: #F2F5FA;
}
.scenic-list{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
}
</style>
