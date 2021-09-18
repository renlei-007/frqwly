<template>
	<view class="my-train content">
		<ys-scroll :param="param" ref="scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="data_box">
				<view class="data_list" v-for="(item,index) in trainList" :key="index" @tap="toDetail(item.id)">
					<view class="data_list_img">
						<image class="data_list_img_url" :src="item.content.titleImg" mode="aspectFill"></image>
						<text class="state" v-if="item.status == 0">审核中</text>
						<text class="state" v-if="item.status == 1">审核通过</text>
						<text class="state" v-if="item.status == 2">审核不通过</text>
						<text class="state" v-if="item.status == 3">已使用</text>
						<text class="state" v-if="item.status == 4">已取消</text>
						<text class="state" v-if="item.status == 5">已过期</text>
					</view>
					<view class="data_list_info">
						<view class="data_list_info_title">{{item.content.title}}</view>
						<view class="data_list_info_text">报名时间:{{item.createTime}}</view>
						<view class="data_list_info_text">上课时间:{{item.content.attr_startTime}}</view>
						<view class="data_list_info_text">培训地址:{{item.content.attr_address}}</view>
						<view class="data_list_info_text">总课时:{{item.content.attr_classHours}}</view>
						<view class="data_list_info_text" v-if="item.content.liveTrainRecord.online==0">已上课时:{{item.count}}</view>
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
				trainList: [],
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
				this.trainList = [];
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
					url: '/train/list',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.trainList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.trainList = this.trainList.concat(res.body)
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
					url: './my-train-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.my-train{
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
				.state{
					height: 54rpx;
					line-height: 54rpx;
					box-sizing: border-box;
					padding: 0 20rpx;
					font-size: 26rpx;
					position: absolute;
					right: 10rpx;
					bottom: 10rpx;
					background-color: #6851E2;
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
