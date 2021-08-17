<template>
	<view class="my-volunteer content">
		<ys-scroll :param="param" ref="scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="data_box">
				<view class="data_list" v-for="(item,index) in activeList" :key="index" @tap="toDetail(item.id)">
					<view class="data_list_img">
						<image class="data_list_img_url" :src="item.content.titleImg" mode="aspectFill"></image>
						<text class="states" v-if="item.status == 0">审核中</text>
						<text class="states" v-if="item.status == 1">审核通过</text>
						<text class="states" v-if="item.status == 2">审核不通过</text>
						<text class="states" v-if="item.status == 3">已使用</text>
						<text class="states" v-if="item.status == 4">已取消</text>
						<text class="states" v-if="item.status == 5">已过期</text>
					</view>
					<view class="data_list_info">
						<view class="data_list_info_title">{{item.content.title}}</view>
						<view class="data_list_info_text">服务时间：{{item.content.attr_startTime}}</view>
						<view class="data_list_info_text">地址：{{item.content.attr_address}}</view>
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
				pages: 0,
				activeList: [],
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
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
				let params = {
					first:this.pages,
					count: 10
				}
				this.homeRequest({
					url: '/volunteer/list',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.activeList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.activeList = this.activeList.concat(res.body)
							if(res.body.length<10){
								console.log(1);
							  this.$refs.scroll.setLoadStatus('no_more');
							}else{
								console.log(2);
							  this.$refs.scroll.setLoadStatus('more');
							}
						}
					}
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: './my-volunteer-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.my-volunteer{
	width: 100%;
	height: 100%;
	overflow: auto;
	.data_box{
		width: 690rpx;
		margin: 0 auto;
		.data_list{
			width: 100%;
			height: auto;
			margin-top: 30rpx;
			background-color: #FFFFFF;
			&_img{
				width: 100%;
				height: 300rpx;
				border-radius: 10rpx;
				position: relative;
				&_url{
					width: 100%;
					height: 100%;
				}
				.states{
					height: 54rpx;
					line-height: 54rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					font-size: 26rpx;
					position: absolute;
					right: 10rpx;
					bottom: 10rpx;
					background-color: #b92121;
					color: #FFFFFF;
				}
			}
			&_info{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				&_title{
					font-size: 30rpx;
					line-height: 50rpx;
					color: #000010;
				}
				&_text{
					color: #666;
					font-size: 26rpx;
					line-height: 46rpx;
				}
			}
		}
	}
}
</style>
