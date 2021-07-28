<template>
	<view class="myvenues content">
		<ys-scroll :param="param" ref="scroll" @refresh="refresh" @loadMore = "loadMore" v-show="venuesList.length>0">
			<view class="data_box">
				<view class="data_list" v-for="(item,index) in venuesList" :key="index" @tap="toDetail(item.id)">
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
						<view class="data_list_info_text">预定时间:{{item.bookingDate}}</view>
						<view class="data_list_info_text">场馆电话:{{item.content.attr_phone}}</view>
						<view class="data_list_info_text">场馆地址：{{item.content.attr_address}}</view>
					</view>
				</view>
			</view>
		</ys-scroll>
		<view class="no_data" v-show="venuesList.length==0">
			<image class="no_data_icon" src="/static/kong.png" mode=""></image>
			<view class="no_data_text">空荡荡的。。。</view>
		</view>
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
					no_more_text:'没有更多数据了~',
					refresher_style:'black'
				},
				page: 0,
				venuesList: [],
				type: '',
			};
		},
		onShow() {
			this.page = 0
			this.venuesList = []
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
			toDetail(id){
				uni.navigateTo({
					url: './myvenues-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.myvenues{
	width: 100%;
	height: 100%;
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
	.no_data{
		width: 100%;
		position: relative;
		text-align: center;
		&_icon{
			width: 340rpx;
			height: 270rpx;
			margin: 244rpx auto 0;
		}
		&_text{
			font-size: 32rpx;
			color: #4192FA;
			margin: 48rpx 0 0;
		}
	}
}
</style>
