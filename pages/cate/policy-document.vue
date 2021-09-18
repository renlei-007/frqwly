<template>
	<view class="policy-document content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="file_box">
				<view class="file_list" v-for="(item,index) in fileList" :key="index" @tap="todetail(item.id)">
					<image style="width: 172rpx;height: 110rpx;margin-right: 20rpx;" v-if="item.titleImg" :src="item.titleImg" mode=""></image>
					<view v-if="item.titleImg.length>0" style="width: calc(100% - 192rpx);">
						<view class="file_list_name">{{item.title}}</view>
						<view class="file_list_content">{{item.description}}</view>
					</view>
					<view v-else style="width: 100%;">
						<view class="file_list_name">{{item.title}}</view>
						<view class="file_list_content">{{item.description}}</view>
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
				param:{//滚动区域配置
					scroll_y:true,
					background:'#fff',
					refresher:true,
					no_more_text:'暂无更多~',
					refresher_style:'black'
				},
				fileList: [],
				page: 0,
				channelIds: 171,
			};
		},
		onLoad(e) {
			this.channelIds = e.channelIds
			uni.setNavigationBarTitle({
				title: e.channelIds==109?'通知公告':e.channelIds == 170?'法律法规':'政策文件'
			})
			this.getList()
			if(this.isLogin){
				this.homeRequest({url:'/view',method:'GET',data:{}})
			}
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.fileList = [];
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
					channelIds: this.channelIds, count: 10, first: this.page, format:0, s_type: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.fileList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.fileList = this.fileList.concat(res.data.body)
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
					url: './information-detail?id='+id+'&&channelIds='+this.channelIds
				})
			},
		},
	}
</script>

<style lang="scss">
.policy-document{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	.file_box{
		width: 100%;
		.file_list{
			width: 690rpx;
			box-sizing: border-box;
			padding: 30rpx 0;
			margin: 0 auto;
			border-bottom: 1px solid #ddd;
			display: flex;
			&:nth-last-child(1){
				border-bottom: none;
			}
			&_name{
				width: 100%;
				font-size: 32rpx;
				line-height: 32rpx;
				color: #1B1C1E;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&_content{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #8B8B9C;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 30rpx;
			}
		}
	}
}
</style>
