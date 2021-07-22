<template>
	<view class="map-detail content">
		<map class="map" id="map" :latitude="latitude" show-location="true" :longitude="longitude" :markers="markers" :scale="12"></map>
		<view class="map_content">
			<image class="map_content_img" :src="content.titleImg" mode=""></image>
			<view class="map_content_detail">
				<view class="map_content_detail_title">{{content.title}}</view>
				<view class="map_content_detail_text">地址:{{content.attr_address}}</view>
				<view class="map_content_detail_text">电话:{{content.attr_phone}}</view>
				<view class="map_content_detail_text">地址:{{calDistance(content)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: {},
				latitude: '',
				longitude: '',
				markers: [],
				lat: '',
				lng: '',
				points: '27.46727283131032,112.16941164086553,28.876774200707032,113.8581604412483',
				type: '',
				sort: '',
			};
		},
		onLoad(e) {
			this.type = e.type
			let content = uni.getStorageSync('maps')
			this.content = uni.getStorageSync('maps')
			this.latitude = content.position.lat
			this.longitude = content.position.lng
			this.markers = [{
				iconPath: '/static/map_ico01.png',
				width : 25,
				height: 40,
				latitude: this.latitude,
				longitude: this.longitude,
			}]
			let params={
				channelIds: 147,
				count: 25,
				points: this.points,
				orderBy: this.sort
			}
			if(this.type){
				params['type'] = this.type
			}
			params['orderBy'] = this.sort
			let position = this.getLocation()
			position.then(res=>{
				this.lat = res.latitude;
				this.lng = res.longitude;
				params['lat'] = this.lat;
				params['lng'] = this.lng;
			})
		},
		methods: {
			getLocation(){
				return new Promise((resolve, reject)=>{
					uni.getLocation({
						type: 'wgs84',
						success: (res)=>{
							resolve(res);
						},
						fail:(res)=>{
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: '获取地址失败',
							});
							//没有获取到位置，使用默认地址
							resolve({
								latitude : 28.141998,
								longitude : 113.044478,
							});
						}
					})
				});
			},
			calDistance(item){
				if(item && item.position && this.lat){
					return this.getDistance(this.lat, this.lng, item.position.lat, item.position.lng)+'KM';
				}
				return '';
			},
			getDistance(lat1,  lng1,  lat2,  lng2){
				var radLat1 = lat1*Math.PI / 180.0;
				var radLat2 = lat2*Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
				Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
				s = s *6378.137 ;// EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				return s.toFixed(2);
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.map{
	width: 100%;
	height: 450rpx;
}
.map_content{
	width: 690rpx;
	margin: 0 auto;
	border: 1px solid #ddd;
	&_img{
		width: 100%;
		height: 300rpx;
	}
	&_detail{
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 26rpx;
		color: #666;
		&_img{
			width: 100%;
			height: 300rpx;
		}
		&_title{
			font-size: 30rpx;
			line-height: 54rpx;
			color: #333;
		}
		&_text{
			line-height: 46rpx;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
