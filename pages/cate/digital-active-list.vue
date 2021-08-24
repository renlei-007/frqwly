<template>
	<view class="digital-active-list content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="act_box">
				<view class="act_list" v-for="(item,index) in activeList" :key="index" @tap="todetail(item.id)">
					<view class="act_list_bac" style="width: 100%;height: 414rpx;">
						<image class="act_list_bac_img" :src="item.titleImg" mode=""></image>
					</view>
					<view class="act_list_content">
						<view class="act_list_content_title">{{item.title}}</view>
						<view class="act_list_content_info">
							<view class="act_list_content_info_posi">
								<image class="act_list_content_info_posi_icon" src="/static/position.png" mode=""></image>
								<text>{{item.attr_address}}</text>
							</view>
							<!-- <view class="act_list_content_info_status" v-if="item.ticketingSetting.status==1">即将到来</view> -->
							<view class="act_list_content_info_status" v-if='item.ticketingSetting.status == 0'>可预约</view>
							<view class="act_list_content_info_status" v-if='item.ticketingSetting.status == 1'>即将开始</view>
							<view class="act_list_content_info_status" v-if='item.ticketingSetting.status == 2'>已结束</view>
							<view class="act_list_content_info_status" v-if='item.ticketingSetting.status == 4'>直接前往</view>
							<view class="act_list_content_info_status" v-if='item.ticketingSetting.status == 5'>人数已满</view>
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
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F9FAFE',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				page: 0,
				activeList: [],
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
					channelIds: 116, count: 10, first: this.page, format:0, s_type_like:'文化馆活动'
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.activeList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.activeList = this.activeList.concat(res.data.body)
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
					url: './active-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.digital-active-list{
	width: 100%;
	height: 100%;
}
.act_box{
	width: 100%;
	.act_list{
		width: 690rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 30rpx auto 0;
		&_bac{
			width: 100%;
			height: 414rpx;
			background: url(@/static/default.png) no-repeat center center;
			background-size: 200% 200%;
			&_img{
				width: 100%;
				height: 100%;
			}
		}
		&_content{
			height: auto;
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 20rpx 20rpx;
			&_title{
				font-size: 28rpx;
				line-height: 38rpx;
				color: #1B1C1E;
			}
			&_info{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				&_posi{
					font-size: 24rpx;
					line-height: 24rpx;
					color: #8B8B9C;
					display: flex;
					align-items: center;
					&_icon{
						width: 20rpx;
						height: 24rpx;
						margin-right: 6rpx;
					}
				}
				&_status{
					width: 120rpx;
					height: 42rpx;
					background: rgb(255,82,82);
					border-radius: 10rpx;
					text-align: center;
					line-height: 42rpx;
					font-size: 22rpx;
					color: #FFFFFF;
				}
				.gray{
					background-color: #BFBFBF;
				}
			}
		}
	}
}
</style>
