<template>
	<view class="scenic-spot content">
		<view class="spot_info">
			<!-- <view class="spot_info_img"></view> -->
			<swiper class="spot_info_img" circular  indicator-dots="true" indicator-active-color="rgba(255,153,51,1)">
				<swiper-item  class="swiper-recommend" v-for="(item, index) in content.picArr"  :key="index">
					<image class="swiper_img" :src="item.picPaths" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<view class="spot_info_title">{{content.stitle}}</view>
			<view class="spot_info_line">
				<image src="/static/first_time.png" mode=""></image>
				<text>{{content.attr_open}}</text>
			</view>
			<view class="spot_info_line">
				<image src="/static/position.png" style="width: 26rpx;" mode=""></image>
				<text>{{content.attr_address}}</text>
				<view class="openmap" @tap="openMap(content)">查看地图</view>
			</view>
			<view class="spot_info_line">
				<image src="/static/phone.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
				<text>{{content.attr_phone}}</text>
			</view>
		</view>
		<view class="blank"></view>
		<view class="active_detail">
			<view class="active_detail_tab">
				<view class="active_detail_tab_title active">景点简介</view>
			</view>
			<view class="spot_detail">
				<rich-text :nodes="content.txt"></rich-text>
			</view>
		</view>
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in tourList" :key="index" @tap="todetail(item.id)">
					<view class="tj_active_content_box_img">
						<image :src="item.titleImg" mode=""></image>
					</view>
					<view class="tj_active_content_box_title">{{item.stitle}}</view>
				</view>
			</view>
		</view>
		
		<ys-bottom :ids="spotId" @show="is_show = true"></ys-bottom>
		<ys-comment v-if="is_show" :ids="spotId" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				spotId: '',
				content: {},
				tourList: [],
				
				commentList: [],
				is_show: false,
				page: 0,
			};
		},
		onLoad(e) {
			this.spotId = e.id
			this.getDetail()
			this.getTourList()
			this.getCommentList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.commentList = [];
				this.getCommentList();
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getCommentList();
			},
			close(){
				this.is_show = false
			},
			getCommentList(){
				let params = {
					contentId: this.id, 
					checked: 1, 
					first: this.page, 
					count: 10,
				}
				this.indexRequest({url:'/comment/list.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					this.commentList = this.commentList.concat(content);
				})
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.spotId
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					var content = res.data.body;
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getTourList(){
				let params = {
					count:5,
					channelIds: '135',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.tourList = array
				})
			},
			operate(index){
				if(index==2){
					if(this.isFabulous){
						this.indexRequest({url:'/content/down',data:{contentId: this.spotId}}).then(res=>{
							if(res.data.code == 200){
								this.isFabulous = false;
								uni.setStorageSync('fabulous'+this.spotId, false);
								this.toast('取消点赞成功！','none')
							}else{
								this.toast(res.data.message,'none')
							}
						})
					}else{
						this.indexRequest({url:'/content/up',data:{contentId: this.spotId}}).then(res=>{
							if(res.data.code == 200){
								this.isFabulous = true;
								uni.setStorageSync('fabulous'+this.spotId, true);
								this.toast('点赞成功！')
							}else{
								this.toast(res.data.message,'none')
							}
						})
					}
				}
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/scenic-spot?id='+id
				})
			},
			openMap(item){
				var pos = this.bMapToQQMap(item.position.lng, item.position.lat);
				uni.openLocation({
					latitude: pos.lat,
					longitude: pos.lng,
					name: item.title,
					address: item.attr_address
				})
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.scenic-spot{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.spot_info{
		width: 690rpx;
		box-sizing: border-box;
		padding: 30rpx 0;
		margin: 0 auto;
		&_img{
			width: 100%;
			height: 292rpx;
			background-color: #E5E5E5;
			.swiper_img{
				width: 100%;
				height: 100%;
			}
		}
		&_title{
			font-size: 40rpx;
			font-weight: 500;
			line-height: 104rpx;
			color: #1B1C1E;
		}
		&_line{
			font-size: 32rpx;
			color: #1B1C1E;
			display: flex;
			height: 64rpx;
			align-items: center;
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
			text{
				display: block;
				max-width: calc(100% - 160rpx);
				line-height: 64rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.openmap{
				width: 108rpx;
				height: 38rpx;
				border: 2rpx solid #5D4ADE;
				opacity: 1;
				border-radius: 8rpx;
				line-height: 38rpx;
				font-size: 22rpx;
				text-align: center;
				color: #614DDF;
				margin-left: 10rpx;
			}
		}
	}
	.active_detail{
		width: 654rpx;
		margin: 0 auto;
		&_tab{
			width: 100%;
			height: 98rpx;
			border-bottom: 2rpx solid #ddd;
			display: flex;
			&_title{
				font-size: 40rpx;
				font-weight: 400;
				line-height: 90rpx;
				color: #7565E3;
				margin-right: 66rpx;
			}
			.active{
				font-weight: 500;
				color: #1B1C1E;
				// font-size: 40rpx;
				border-bottom: 8rpx solid #7565E3;
			}
		}
		&_content{
			width: 100%;
			min-height: 400rpx;
		}
		.spot_detail{
			width: 100%;
			box-sizing: border-box;
			padding: 40rpx 0;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #8B8B9C;
		}
	}
}
</style>
