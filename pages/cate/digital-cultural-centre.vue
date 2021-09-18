<template>
	<view class="digital-cultural-centre content">
		<view class="commom_img">
			<image class="commom_img_icon" v-if="title=='文化馆'" src="https://oss.culturalcloud.net/furong/202108/28162008gwcn.png" mode=""></image>
			<image class="commom_img_icon" v-if="title=='图书馆'" src="https://oss.culturalcloud.net/furong/202108/16084556lak8.png" mode=""></image>
			<image class="commom_img_icon" v-if="title=='旅游'" src="https://oss.culturalcloud.net/furong/202108/16084617x9fi.png" mode=""></image>
			<image class="commom_img_icon" v-if="title=='体育'" src="https://oss.culturalcloud.net/furong/202108/160846305677.png" mode=""></image>
		</view>
		<view class="tj_service">
			<view class="tj_service_title">推荐服务</view>
			<view class="tj_service_box" v-if="title=='文化馆'">
				<view class="tj_service_box_cate" v-for="(item,index) in whgList" :key="index" :class="{'right_line':item.right,'bottom_line':item.bottom}" @tap="goPage(item.url,index,1)">
					<image class="tj_service_box_cate_img" :src="item.imgs" mode=""></image>
					<text class="tj_service_box_cate_text">{{item.title}}</text>
				</view>
			</view>
			<view class="tj_service_box" v-else-if="title=='图书馆'">
				<view class="tj_service_box_cate" v-for="(item,index) in tsgList" :key="index" :class="{'right_line':item.right,'bottom_line':item.bottom}" @tap="goPage(item.url,index,2)">
					<image class="tj_service_box_cate_img" :src="item.imgs" mode=""></image>
					<text class="tj_service_box_cate_text">{{item.title}}</text>
				</view>
			</view>
			<view class="tj_service_box" v-else-if="title=='旅游'">
				<view class="tj_service_box_cate" v-for="(item,index) in lyList" :key="index" :class="{'right_line':item.right,'bottom_line':item.bottom}" @tap="goPage(item.url,index,3)">
					<image class="tj_service_box_cate_img" :src="item.imgs" mode=""></image>
					<text class="tj_service_box_cate_text">{{item.title}}</text>
				</view>
			</view>
			<view class="tj_service_box" v-else-if="title=='体育'">
				<view class="tj_service_box_cate" v-for="(item,index) in tyList" :key="index" :class="{'right_line':item.right,'bottom_line':item.bottom}" @tap="goPage(item.url,index,4)">
					<image class="tj_service_box_cate_img" :src="item.imgs" mode=""></image>
					<text class="tj_service_box_cate_text">{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				whgList: [{
					imgs: require('@/static/images/cgyy.png'),
					url: '/pages/cate/venues-list?title=文化馆',
					title: '场馆预约',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/hdbm.png'),
					url: '/pages/cate/digital-active-list',
					title: '活动报名',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/yspx.png'),
					url: '/pages/cate/all-list?pageVal=1&&s_category_like=文化馆培训',
					title: '艺术培训 ',
					right: false,
					bottom: true,
				},{
					imgs: require('../../static/images/zbdb.png'),
					url: '/pages/cate/live-list?type=活动专区',
					title: '直播点播',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/ysxs.png'),
					url: '/pages/cate/art-list',
					title: '艺术欣赏',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/zyzfw.png'),
					url: '/pages/cate/volunteers-list',
					title: '志愿者服务',
					right: false,
					bottom: true,
				},{
					imgs: require('../../static/images/mk.png'),
					url: '/pages/cate/mooc',
					title: '慕课',
					right: true,
					bottom: false,
				},],
				tsgList: [{
					imgs: require('../../static/images/rgyy.png'),
					url: '/pages/cate/venues-list?title=图书馆',
					title: '入馆预约',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/jzzb.png'),
					url: '/pages/cate/all-list?pageVal=3&&s_category_like=活动专区',
					title: '讲座直播',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/dzfw.png'),
					url: '',
					title: '读者服务',
					right: false,
					bottom: true,
				},{
					imgs: require('../../static/images/szzy.png'),
					url: '/pages/cate/digit-resource',
					title: '数字资源',
					right: false,
					bottom: false,
				},],
				lyList: [{
					imgs: require('../../static/images/zlg.png'),
					url: '/pages/cate/scenic-list?type=展览馆&&cutIndex=1&&channelIds=200',
					title: '展览馆',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/whdk.png'),
					url: '/pages/cate/scenic-list?type=网红打卡&&cutIndex=2&&channelIds=201',
					title: '网红打卡',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/jpxl.png'),
					url: '/pages/cate/scenic-list?type=精品线路&&cutIndex=3&&channelIds=202',
					title: '精品线路',
					right: false,
					bottom: true,
				},{
					imgs: require('../../static/images/lyfw.png'),
					url: '/pages/cate/scenic-list?type=旅游服务&&cutIndex=4&&channelIds=203',
					title: '旅游服务',
					right: false,
					bottom: false,
				},],
				tyList: [{
					imgs: require('../../static/images/tyss.png'),
					url: '/pages/cate/active-list?type=体育赛事',
					title: '体育赛事',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/tyst.png'),
					url: '/pages/cate/organization-list?type=体育',
					title: '体育社团',
					right: true,
					bottom: true,
				},{
					imgs: require('../../static/images/cwld.png'),
					url: '/pages/map/map?title=晨晚练点',
					title: '晨晚练点 ',
					right: false,
					bottom: true,
				},{
					imgs: require('../../static/images/tycg.png'),
					url: '/pages/cate/venues-list?title=体育馆',
					title: '体育场馆',
					right: true,
					bottom: false,
				},{
					imgs: require('../../static/images/sszb.png'),
					url: '/pages/cate/live-list?type=赛事直播',
					title: '赛事直播',
					right: true,
					bottom: false,
				},{
					imgs: require('../../static/images/zhjsd.png'),
					url: '/pages/map/map?title=智慧健身点',
					title: '智慧健身点',
					right: false,
					bottom: false,
				},],
			};
		},
		onLoad(e) {
			this.title = e.title
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		onReady() {
			if(this.title=='文化馆'){
				this.setBarStyle('#6755C3')
			}else if(this.title=='图书馆'){
				this.setBarStyle('#1B5A6B')
			}else if(this.title=='旅游'){
				this.setBarStyle('#44B133')
			}else if(this.title=='体育'){
				this.setBarStyle('#0061A5')
			}
		},
		methods: {
			setBarStyle(color){
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: color,
				})
			},
			goPage(url,index,e){
				if(!url){
					this.toast('功能正在开发中，敬请期待~','none')
					return
				}
				if(e==4 && (index==2||index==5)){
					let title = index==2?'晨晚练点':'智慧健身点'
					uni.setStorageSync('mapTitle',title)
					uni.switchTab({
						url: '/pages/map/map'
					})
				}else{
					this.navigateTo(url)
				}
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F9FAFE;
}
.digital-cultural-centre{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 30rpx 30rpx 0;
	.commom_img{
		width: 690rpx;
		height: 386rpx;
		&_icon{
			width: 100%;
			height: 100%;
		}
	}
	.tj_service{
		width: 100%;
		&_title{
			font-size: 36rpx;
			line-height: 100rpx;
			color: #6B6B77;
		}
		&_box{
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding: 0 16rpx;
			flex-wrap: wrap;
			background-color: #FFFFFF;
			&_cate{
				width: 33.33%;
				height: 168rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				&_img{
					width: 80rpx;
					height: 80rpx;
				}
				&_text{
					font-size: 24rpx;
					line-height: 24rpx;
					color: #6B6B77;
				}
			}
			.right_line{
				position: relative;
				&::before{
					position: absolute;
					content: '';
					right: 0;
					width: 1px;
					height: 104rpx;
					top: 50%;
					transform: translateY(-52rpx);
					background-color: #707070;
					opacity: 0.15;
				}
			}
			.bottom_line{
				position: relative;
				&::after{
					position: absolute;
					content: '';
					bottom: 1rpx;
					height: 1rpx;
					width: 100%;
					left: 0;
					background-color: #707070;
					opacity: 0.15;
				}
			}
		}
	}
}
</style>
