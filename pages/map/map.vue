<template>
	<view class="map">
		<sl-filter 
			:ref="'slFilter'" 
			:topFixed="true" 
			:isTransNav="true" 
			:navHeight="0" 
			:menuList="menuList"
			@result="result">
		</sl-filter>
		<ys-scroll v-if="!is_choose" :param="param" ref = "scroll" @refresh="refresh" @loadMore = "">
			<view class="all_scroll">
				<view class="allpoint_li" v-for="(item,index) in pointList" :key="index" @tap="todetail(item)">
					<view class="allpoint_li_img">
						<image :src="item.titleImg" mode=""></image>
					</view>
					<view class="allpoint_li_content">
						<view class="allpoint_li_content_title">{{item.title}}</view>
						<view class="allpoint_li_content_txt">地址：{{item.attr_address}}</view>
						<view class="allpoint_li_content_txt">距离：{{calDistance(item)}}</view>
					</view>
				</view>
			</view>
		</ys-scroll>
		<view class="content_box" v-else>
			<view class="cate_list">
				<ys-scroll :param="cate_param">
					<view 
						class="cate_item" 
						:class="{cate_item_active:cate_index==index}" 
						v-for="(item,index) in cateList" 
						:key="index" 
						@tap="changeCate(index)"
					>{{item.title}}
					</view>
					<!-- <view class="bottom_distance"></view> -->
				</ys-scroll>
			</view>
			<view class="pt_list">
				<ys-scroll :param="pt_param" @loadMore = "getMore" ref = "scroll">
					<view v-for="(item,index) in pointList" :key="index" @tap="todetail(item)">
						<view class="pt_item">
							<view class="pt_item_img">
								<image :src="item.titleImg" mode=""></image>
							</view>
							<view class="pt_item_info">
								<view class="pt_item_info_title">{{item.title}}</view>
								<view class="pt_item_info_txt">地址：{{item.attr_address}}</view>
								<view class="pt_item_info_txt">电话：{{item.attr_phone}}</view>
							</view>
						</view>
					</view>
				</ys-scroll>
			</view>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
export default {
	components: {
		slFilter
	},
	data() {
		return {
			param:{//滚动区域配置
				scroll_y:true,
				background:'#f2f2f2',
				refresher:true,
				no_more_text:'',
				refresher_style:'black'
			},
			is_choose: false,
			page: 0,//页数
			pages: 0,
			pointList: [],
			catePointList: [],
			cate_index:0,//选中的二级菜单下标
			cate_param:{//一级分类滚动区域配置
				scroll_y:true,
				scroll_x:false,
				background:'#f2f2f2'
			},
			pt_param:{
			  scroll_y:true,
			  scroll_x:false
			},//商品滚动区域配置
			cateList: [],
			points: '27.46727283131032,112.16941164086553,28.876774200707032,113.8581604412483',
			menuList: [{
					'title': '类别',
					'isSort': true,
					'key': 'type',
					'detailList': [{
							'title': '全部',
							'value': ''
						},
					]
				},
				{
					'title': '方式',
					'key': 'sort',
					'isSort': true,
					'reflexTitle': true,
					'detailList': [
						{
							'title': '距离',
							'value': '24'
						},
						{
							'title': '最新',
							'value': '4'
						},
						{
							'title': '最热',
							'value': '9'
						}
					]
				}
			],
			type: '',
			sort: '',
			lat: '',
			lng: '',
			mapTitle: '',
			countPage: 0,
		};
	},
	onLoad() {
		this.getCateList()
		
	},
	onShow() {
		if(uni.getStorageSync('mapTitle')){
			this.mapTitle = uni.getStorageSync('mapTitle')
			console.log(this.mapTitle);
			uni.removeStorageSync('mapTitle')
			this.type = this.mapTitle
			this.$refs.slFilter.titleList = [{
				title: this.type,
				key: 'type'
			},{
				title: '方式',
				key: 'sort'
			},]
		}
		this.getCatePointList()
	},
	methods: {
		/**
		 * 页面刷新
		 */
		refresh(){
			console.log('刷新');
			this.pages = 0;
			this.pointList = [];
			this.getCatePointList()
			setTimeout(()=>{
			    this.$refs.scroll.endRefresh()
			},800)
		},
		loadMore(){
		    console.log('上拉加载');
		    this.pages += 15
			this.getCatePointList();
		},
		result(val) {
			console.log(val);
			this.cateList.map((item,index)=>{
				if(item.title==val.type){
					this.cate_index = index
				}
			})
			this.type = val.type;
			console.log(this.type);
			this.sort = val.sort;
			this.countPage = 0
			this.is_choose = true
			this.pointList = []
			this.pages = 0
			this.loadMorePoints()
		},
		changeCate(index){
			this.cate_index = index
			this.pointList = [];
			this.type = this.cateList[index].title
			this.countPage = 0
			console.log(this.type);
			if(index==0){
				this.type = ''
			}
			this.pages = 0;
			this.getCatePointList();
		},
		getCateList(){
			let params = {
				channelId : 147,
			}
			let array = []
			this.indexRequest({url:'/model/get',data:params}).then(res=>{
				this.cateList = [{
					title: '全部',
				}]
				res.data.body.map(item=>{
					if(item.field=='type'){
						array = item.optValue
						array.map((k,v)=>{
							this.cateList.push({title: k})
							this.menuList[0].detailList.push({title: k, value: k});
						});
					}
				})
				// this.cutList = array
			})
		},
		loadMorePoints(){
			this.pages += 10
			this.getCatePointList();
			// this.$refs.scroll.setLoadStatus('loading')
		},
		getMore(){
			console.log('上拉加载');
			this.countPage += 25
			this.getCatePointList();
		},
		getCatePointList(){
			let params={
				channelIds: 147,
				count: 25,
				points: this.points,
				orderBy: this.sort,
				first: this.countPage
			}
			if(this.type){
				params['type'] = this.type
			}
			params['orderBy'] = this.sort
			let position = this.getLocation()
			position.then(res=>{
				console.log(res);
				this.lat = res.latitude;
				this.lng = res.longitude;
				params['lat'] = this.lat;
				params['lng'] = this.lng;
				this.indexRequest({url:'/query/position',data:params}).then(res=>{
					console.log(res);
					if(res.data.body.data.length == 0 && this.pointList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.pointList = this.pointList.concat(res.data.body.data)
						if(res.data.body.data.length<25){
							this.$refs.scroll.setLoadStatus('no_more');
						}else{
							this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			})
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
		getLocation(){
			return new Promise((resolve, reject)=>{
				uni.getLocation({
					type: 'gcj02',
					success: (res)=>{
						console.log(res);
						resolve(res);
					},
					fail:(res)=>{
						console.log(res);
						this.toast('获取地址失败','none')
						//没有获取到位置，使用默认地址
						resolve({
							latitude : 28.141998,
							longitude : 113.044478,
						});
					}
				})
			});
		},
		todetail(item){
			uni.setStorageSync('maps',item)
			uni.navigateTo({
				url: './map-detail?type='+this.type+'&&sort='+this.sort
			})
		},
	},
}
</script>

<style lang="scss">
.map{
	width: 100%;
	/* #ifdef H5 */
	height: calc(100% - 90rpx);
	/* #endif */
	/* #ifdef MP-WEIXIN */
	height: 100%;
	/* #endif */
	.all_scroll{
		width: 100%;
		.allpoint_li{
			width: 100%;
			height: 180rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			&:nth-child(1){
				margin-top: 0;
			}
			&_img{
				width: 200rpx;
				height: 112rpx;
				border-radius: 8rpx;
				margin-right: 30rpx;
				background: url(../../static/default.png) no-repeat;
				background-size: 400rpx 224rpx;
				background-position: -100rpx -56rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			&_content{
				width: calc(100% - 230rpx);
				height: 100%;
				&_title{
					width: 100%;
					font-size: 32rpx;
					line-height: 32rpx;
					color: #1B1C1E;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				&_txt{
					width: 100%;
					font-size: 24rpx;
					line-height: 24rpx;
					margin-top: 16rpx;
					color: #8B8B9C;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.content_box{
		width: 100%;
		height: calc(100% - 90rpx);
		display: flex;
		.cate_list{
			height: 100%;
			width: 180rpx;
			flex-shrink: 0;
			.cate_item{
				text-align: center;
				height: 100rpx;
				width: 100%;
				line-height: 100rpx;
				font-size: 32rpx;
				color: #4d4d4d;
				position: relative;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.bottom_distance{
			  width: 100%;
			  height: 150rpx;
			}
			.cate_item_active{
				width: calc(100% - 8rpx);
				background-color: #FFFFFF;
				border-left: 8rpx solid #F2520B;
				position: relative;
			}
		}
		.pt_list{
			width: calc(100% - 180rpx);
			height: 100%;
			flex-shrink: 0;
			.pt_item{
				width: calc(100% - 60rpx);
				margin: 0 30rpx;
				padding: 30rpx 0;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				&_img{
					width: 150rpx;
					height: 112rpx;
					border-radius: 8rpx;
					margin-right: 30rpx;
					background: url(../../static/default.png) no-repeat;
					background-size: 300rpx 224rpx;
					background-position: -75rpx -56rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				&_info{
					width: calc(100% - 180rpx);
					&_title{
						width: 100%;
						font-size: 32rpx;
						line-height: 32rpx;
						color: #1B1C1E;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					&_txt{
						width: 100%;
						font-size: 24rpx;
						line-height: 24rpx;
						margin-top: 16rpx;
						color: #8B8B9C;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
