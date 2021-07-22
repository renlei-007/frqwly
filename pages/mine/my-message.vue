<template>
	<view class="my-message content">
		<view class="cate_area">
			<view class="cate_area_list" :class="{active:Index==0}" @tap="activeChange(0)">收到的消息</view>
			<view class="cate_area_list" :class="{active:Index==1}" @tap="activeChange(1)">发送的消息</view>
		</view>
		<view class="mess_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" class="ys_content">
				<view class="mess_li" v-for="(item,index) in messList" :key="index">
					<view class="mess_li_time">{{item.sendTime}}</view>
					<view class="mess_li_title">{{item.msgTitle}}</view>
					<view class="mess_li_detail">{{item.msgContent}}</view>
				</view>
			</ys-scroll>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Index: 0,
				messList: [],
				box: 0,
				page: 0,
				param:{//滚动区域配置
					scroll_y:true,
					background:'',
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
				this.page = 0;
				this.messList = [];
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
			activeChange(index){
				if(this.Index!=index){
					this.Index = index
					this.box = index
					this.refresh()
				}
			},
			getList(){
				this.homeRequest({
					url: '/message/list',
					method: 'GET',
					data: {box:this.box, first:this.page, count: 10},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.messList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.messList = this.messList.concat(res.body)
							if(res.body.length<10){
							  this.$refs.scroll.setLoadStatus('no_more');
							}else{
							  this.$refs.scroll.setLoadStatus('more');
							}
						}
					}else{
						this.toast(res.message,'none')
					}
				})
			},
		},
	}
</script>

<style lang="scss">
.my-message{
	width: 100%;
	height: 100%;
	.cate_area{
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		&_list{
			font-size: 32rpx;
			line-height: 92rpx;
			color: #474757;
		}
		.active{
			font-size: 40rpx;
			font-weight: 500;
			color: #6952E1;
			position: relative;
			&::after{
				content: '';
				width: 62rpx;
				height: 8rpx;
				background: linear-gradient(270deg, #C28FF5 0%, #7630DF 100%);
				position: absolute;
				bottom: -4rpx;
				left: 50%;
				border-radius: 4rpx;
				transform: translateX(-31rpx);
			}
		}
	}
	.mess_box{
		width: 100%;
		height: calc(100% - 100rpx);
		box-sizing: border-box;
		padding: 0 30rpx;
		.mess_li{
			width: 100%;
			background: #FFFFFF;
			border-radius: 8rpx;
			box-sizing: border-box;
			padding: 30rpx;
			margin-top: 30rpx;
			&_time{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #8B8B9C;
			}
			&_title{
				font-size: 36rpx;
				line-height: 80rpx;
				color: #1B1C1E;
			}
			&_detail{
				font-size: 24rpx;
				line-height: 36rpx;
				color: #8B8B9C;
			}
		}
	}
}
</style>
