<template>
	<view class="myvenues content">
		<!-- <view class="cutbox">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(index,item)">{{item}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view> -->
		<view class="cate_box" style="height: 100%;">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="venues_box">
					<view class="venues_box_list" v-for="(item,index) in venuesList" :key="index">
						<view class="venues_box_list_top">
							<view class="venues_box_list_top_name">{{item.content.title}}</view>
							<view class="venues_box_list_top_time">{{item.bookingDate}}</view>
						</view>
						<view class="venues_box_list_bot">
							<view class="venues_box_list_bot_pos">
								<image class="venues_box_list_bot_pos_icon" src="/static/position.png" mode=""></image>
								<view class="venues_box_list_bot_pos_name">{{item.content.attr_address}}</view>
							</view>
							<!-- <view class="venues_box_list_bot_do">取消预约</view> -->
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
				cutIndex: 0,
				cutList: ['全部','已开始','未开始'],
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多数据了~',
					refresher_style:'black'
				},
				page: 0,
				venuesList: [],
				type: '',
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			changeTab(index,item){
				if(this.cutIndex!=index){
					this.cutIndex = index
					this.type = item
				}
				if(index==0){
					this.type = ''
				}
			},
			getList(){
				this.homeRequest({
					url: '/bookings/list',
					method: 'GET',
					data: {first:this.page, count: 10},
				}).then(res=>{
					console.log(res);
					if(res.body.length==0&&this.venuesList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.venuesList = this.venuesList.concat(res.body)
						if(res.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.myvenues{
	width: 100%;
	height: 100%;
	.venues_box{
		width: 100%;
		max-height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&_list{
			width: 690rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin: 30rpx auto 0;
			&_top,&_bot{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			&_top_name{
				font-size: 36rpx;
				line-height: 36rpx;
				color: #1B1C1E;
			}
			&_top_time{
				font-size: 24rpx;
				line-height: 36rpx;
				color: #8B8B9C;
			}
			&_bot_pos{
				display: flex;
				&_icon{
					width: 20rpx;
					height: 24rpx;
					margin-right: 16rpx;
				}
				&_name{
					font-size: 24rpx;
					line-height: 24rpx;
					color: #8B8B9C;
				}
			}
			&_bot_do{
				margin-top: 20rpx;
				width: 128rpx;
				height: 44rpx;
				border: 1px solid #6952E1;
				border-radius: 28rpx;
				text-align: center;
				line-height: 44rpx;
				font-size: 20rpx;
				color: #6952E1;
			}
		}
	}
}
</style>
