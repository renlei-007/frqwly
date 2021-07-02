<template>
	<view class="venues-detail content">
		<view class="main_img">
			<image class="indeximg" :src="content.titleImg" mode=""></image>
		</view>
		<view class="venues_box">
			<view class="venues_title">{{content.stitle}}</view>
			<view class="venues_info">
				<view class="venues_info_title">类别：</view>
				<view class="venues_info_name">{{content.attr_type.length>0?content.attr_type[0]:'暂无'}}</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">地址：</view>
				<view class="venues_info_name address">{{content.attr_address}}</view>
				<view class="address_btn" @tap="openMap(content)" v-if="content.position">查看地图</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">电话：</view>
				<view class="venues_info_name">{{content.attr_phone}}</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">面积：</view>
				<view class="venues_info_name">{{content.attr_area}}</view>
			</view>
			<view class="venues_info">
				<view class="venues_info_title">容纳：</view>
				<view class="venues_info_name">{{content.attr_capacity}}</view>
			</view>
			<view class="venues_infos">
				<text>设备：</text>{{content.attr_equipment}}
			</view>
		</view>
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">简介</view>
			<view class="introduce">
				<rich-text :nodes="content.txt"></rich-text>
			</view>
		</view>
		
		<view class="blank"></view>
		
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in venuesList" :key="index" @tap="todetail(item.id)">
					<view class="tj_active_content_box_img">
						<image :src="item.titleImg" mode=""></image>
					</view>
					<view class="tj_active_content_box_title">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<view class="public_bottom">
			<view class="icon_area">
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/pinglun.png" mode=""></image>
					<text>评论</text>
				</view>
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/zhuanfa.png" mode=""></image>
					<text>转发</text>
				</view>
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/dianzan.png" mode=""></image>
					<text>点赞</text>
				</view>
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/shoucang.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="public_btn">马上预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowIndex: 0,
				id: '',
				is_show: true,
				content: {},
				venuesList: [],
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getVenuesList()
		},
		methods: {
			indexChange(e){
				this.nowIndex = e.detail.current
			},
			getDetail(){
				let params = {
					format: 0,
					contentId: this.id
				}
				this.indexRequest({url:'/bookings/content',data:params}).then(res=>{
					var content = res.data.body;
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getVenuesList(){
				let params = {
					count:5,
					channelIds: '117',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.venuesList = array
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
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/venues-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.venues-detail{
	width: 100%;
	overflow: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.venues_box{
		margin-top: 20rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.venues_title{
			width: 100%;
			font-size: 36rpx;
			line-height: 60rpx;
			font-weight: bolder;
			color: #1B1C1E;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.venues_info{
			font-size: 32rpx;
			font-weight: 400;
			line-height: 64rpx;
			color: #1B1C1E;
			display: flex;
			align-items: center;
			&_name{
				color: #666;
			}
			.address{
				max-width: calc(100% - 218rpx);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.address_btn{
				width: 108rpx;
				height: 38rpx;
				margin-left: 10rpx;
				border: 2rpx solid #5D4ADE;
				border-radius: 8rpx;
				text-align: center;
				line-height: 38rpx;
				color: #614DDF;
				font-size: 22rpx;
			}
		}
		.venues_infos{
			font-size: 32rpx;
			font-weight: 400;
			line-height: 64rpx;
			color: #666;
			text{
				color: #1B1C1E;
			}
		}
	}
	.introduce{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 0;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #8B8B9C;
		.more{
			font-size: 24rpx;
			line-height: 40rpx;
			color: #7666E3;
			margin-left: 6rpx;
		}
	}
}
</style>
