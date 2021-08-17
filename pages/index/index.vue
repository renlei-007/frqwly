/**
 * @Description: 首页
 * @author RL
 * @Date 2021-06-02
 */
<template>
	<view class="content index">
		<!-- #ifdef MP-WEIXIN -->
		<ys-top-bar title="芙蓉区文旅体云" :point="point" :isChange="isChange"></ys-top-bar>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
			<view class="search_box">
				<view class="search_box_input" @tap="toSearch">
					<image class="search_img" src="/static/icon/search.png" mode=""></image>
					<input type="text" disabled class="search_box_input_wri" placeholder="请输入关键词搜索"/>
				</view>
				<view class="point_div" @tap="toDel">
					<view class="point_num">{{point}}</view>
					<view class="point_txt">积分</view>
				</view>
			</view>
			<swiper class="banner_box" circular indicator-dots="true" indicator-active-color="rgba(255,153,51,1)">
				<swiper-item  class="swiper-recommend" v-for="(item, index) in carouselList"  :key="index">
					<view class="img"><image class="swiper_img" :src="item.attr_image_url"></image></view>
				</swiper-item>
			</swiper>
		<!-- #endif -->
		<!-- 分类轮播 -->
		<!-- <view class="news" style="padding: 0;">
			<ys-menu-list class="z_index" :size="104" :list="cate_list" @select="cateSelect"></ys-menu-list>
		</view> -->
		
		
		<view class="panel_box" :style="{'padding-bottom':is_showAll?0:'20rpx'}">
			<view class="history_box">
				<view class="history_box_top">
					<image class="riliimg" src="/static/jinri.png" mode=""></image>
					<image class="jintianimg" src="/static/jintian.png" mode=""></image>
					<text>{{day}}</text>
				</view>
				<view class="history_box_bottom">
					<swiper class="historySwiper" circular :indicator-dots="false" :autoplay="true" :interval="4000" :duration="800" :vertical="true">
						<swiper-item class="historySwiper-item" v-for="(item,index) in historyList" :key="index">
							<view class="swiper-item">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="panel_box_show">
				<view class="panel_box_show_part" @tap="navigateTo('/pages/cate/digital-cultural-centre?title=文化馆')">
					<image src="/static/cate/whg.png" class="panel_box_show_part_img" mode=""></image>
					<view class="panel_box_show_part_name">文化馆</view>
				</view>
				<view class="panel_box_show_part" @tap="navigateTo('/pages/cate/digital-cultural-centre?title=图书馆')">
					<image src="/static/cate/tsg.png" class="panel_box_show_part_img" mode=""></image>
					<view class="panel_box_show_part_name">图书馆</view>
				</view>
				<view class="panel_box_show_part" @tap="navigateTo('/pages/cate/digital-cultural-centre?title=旅游')">
					<image src="/static/cate/ly.png" class="panel_box_show_part_img" mode=""></image>
					<view class="panel_box_show_part_name">旅游</view>
				</view>
				<view class="panel_box_show_part" @tap="navigateTo('/pages/cate/digital-cultural-centre?title=体育')">
					<image src="/static/cate/tyg.png" class="panel_box_show_part_img" mode=""></image>
					<view class="panel_box_show_part_name">体育</view>
				</view>
				<view class="panel_box_show_part" @tap="navigateTo('/pages/cate/nonlegacy')">
					<image src="/static/cate/fywb.png" class="panel_box_show_part_img" mode=""></image>
					<view class="panel_box_show_part_name">非遗文博</view>
				</view>
			</view>
			<view class="panel_box_hide">
				<view class="panel_box_hide_part" v-for="(item,index) in panelList" :key="index">
					<view class="panel_box_hide_part_one" v-for="(ite,ind) in item" :key="ind" @tap="navigateTo(ite.url)">
						<image :src="ite.img" class="panel_box_hide_part_one_img" mode=""></image>
						<view class="panel_box_hide_part_one_name">{{ite.name}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 我的活动 -->
		<view class="news" v-if="activeShow">
			<view class="news_title">
				<view class="news_titles">
					<image class="news_title_img" src="/static/home/wdsc.png" mode=""></image>
					<view class="news_title_txt">我的活动</view>
				</view>
				<view class="more" @tap="navigateTo('/pages/mine/myactive')">更多></view>
			</view>
			<view class="act_content">
				<view class="act_content_info">
					<view class="act_content_info_img">
						<image :src="actives.content.titleImg" mode=""></image>
					</view>
					<view class="act_content_info_title">{{actives.content.title}}</view>
				</view>
				<view class="act_content_btn" @tap="toActive(actives.id)">立即前往</view>
			</view>
		</view>
		
		<!-- 精彩推荐 -->
		<view class="news">
			<view class="news_title">
				<view class="news_titles">
					<image class="news_title_img" src="/static/home/jctj.png" mode=""></image>
					<view class="news_title_txt">精彩推荐</view>
				</view>
				<view class="more" @tap="navigateTo('/pages/cate/scenic-list')">更多></view>
			</view>
			<view class="news_content" style="box-sizing: border-box;padding: 30rpx 0;">
				<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;white-space:nowrap;">
					<view class="tj_list_box">
						<view class="tj_list" v-for="(item,index) in activityList" :key="index" @tap="gopage(item.id,index)">
							<image class="tj_list_img" :src="item.titleImg" mode=""></image>
							<view class="tj_list_txt">{{item.title}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 文旅资讯 -->
		<view class="news">
			<view class="news_title">
				<view class="news_titles">
					<image class="news_title_img" src="/static/home/wlzx.png" mode=""></image>
					<view class="news_title_txt">文旅资讯</view>
				</view>
				<view class="more" @tap="navigateTo('/pages/cate/information-list')">更多></view>
			</view>
			<view class="news_content">
				<view class="zx_news">
					<view class="zx_news_li" v-for="(item,index) in newsList" :key="index" @tap="navigateTo('/pages/cate/information-detail?id='+item.id+'&&channelIds=110')">
						<view class="zx_news_li_content">
							<view class="zx_news_li_content_title">{{item.title}}</view>
							<view class="zx_news_li_content_body">{{item.description}}</view>
							<view class="zx_news_li_content_source">
								<view class="zx_news_li_content_source_left">
									<image src="/static/resource.png" class="zx_news_li_content_source_left_img" mode=""></image>
									<text>{{item.origin}}</text>
								</view>
								<view class="zx_news_li_content_source_right">{{item.releaseDate.slice(0,10)}}</view>
							</view>
						</view>
						<view class="zx_news_li_img">
							<image class="zximgs" :src="item.titleImg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 精彩推荐 -->
		<view class="news">
			<!-- <view class="news_title">
				<image class="news_title_img" src="/static/home/jctj.png" mode=""></image>
				<view class="news_title_txt">精彩推荐</view>
			</view> -->
			<view class="news_title">
				<view class="news_titles">
					<image class="news_title_img" src="/static/home/wlfw.png" mode=""></image>
					<view class="news_title_txt">精品旅游</view>
				</view>
				<view class="more" @tap="navigateTo('/pages/cate/scenic-list?type=网红打卡&&cutIndex=2&&channelIds=201')">更多></view>
			</view>
			<view class="news_content">
				<view class="tj_news">
					<view class="tj_news_li" v-for="(item,index) in recommendList" :key="index" @tap="todetail(index,item.id)">
						<view class="tj_news_li_img">
							<image class="tjimgs" :src="item.titleImg" mode=""></image>
						</view>
						<view class="tj_news_li_name">{{item.title}}</view>
						<view class="tj_news_li_line">时间：{{item.releaseDate.slice(0,10)}}</view>
						<view class="tj_news_li_line">地址：{{item.attr_address}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],//轮播图数据
				recommendList:[],//精彩推荐
				activityList:[],//文旅服务
				newsList: [],//文旅资讯
				carouselList: [], //轮播图
				point: 0,
				day: '',
				is_showAll: false,
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				historyList: [],
				isChange: false,
				actives: {
					content: {
						title: '',
						titleImg: '',
					},
				},
				activeShow: false,
				panelList: [
					[{
						name: '场馆服务',
						img: require('../../static/cate/cgfw.png'),
						url: '/pages/cate/venues-list',
					},{
						name: '志愿者服务',
						img: require('../../static/cate/zyzfw.png'),
						url: '/pages/cate/volunteers-list',
					},],
					[{
						name: '活动报名',
						img: require('../../static/cate/hdbm.png'),
						url: '/pages/cate/active-list',
					},{
						name: '数字资源',
						img: require('../../static/cate/szzy.png'),
						url: '/pages/cate/digit-resource',
					},],
					[{
						name: '直播点播',
						img: require('../../static/cate/zbdb.png'),
						url: '/pages/cate/live-list',
					},{
						name: '用户社团',
						img: require('../../static/cate/yhst.png'),
						url: '/pages/cate/organization-list',
					},],
					[{
						name: '网上培训',
						img: require('../../static/cate/wspx.png'),
						url: '/pages/cate/nettrain-list',
					},],
				],
			}
		},
		onLoad() {
			this.getTime()
			this.getList()
			if(this.isLogin){
				this.getPoint()
				this.getMyActive()
			}
		},
		onPageScroll(event) {
			if(event.scrollTop>130){
				this.isChange = true
			}else{
				this.isChange = false
			}
		},
		methods: {
			getTime(){
				let date = new Date();
				let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)
				let day = date.getDate()<10?'0'+date.getDate():date.getDate()
				this.day = month+'-'+day
			},
			getPoint(){
				let username = uni.getStorageSync('user_info').username
				this.homeRequest({
					url: '/user/get',
					method: 'get',
					data: {username:username},
				}).then(res=>{
					console.log(res);
					this.point = res.body.score
				})
			},
			getMyActive(){
				let params = {
					first: 0,
					count: 1
				}
				this.homeRequest({
					url: '/ticket/list',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.body.length>0){
						this.actives = res.body[0]
						this.activeShow = true
					}
				})
			},
			toDel(){
				if(this.isLogin){
					this.navigateTo('/pages/mine/reward-points')
				}
				return
			},
			cateSelect(data){
				console.log(data);
				if(data.index==0&&data.key==1){
					this.navigateTo('/pages/cate/active-list')
				}else if(data.index==0&&data.key==2){
					this.navigateTo('/pages/cate/venues-list')
				}else if(data.index==0&&data.key==4){
					this.navigateTo('/pages/cate/live-list')
				}else if(data.index==1&&data.key==0){
					this.navigateTo('/pages/cate/art-list')
				}else if(data.index==0&&data.key==7){
					this.navigateTo('/pages/cate/scenic-list')
				}else if(data.index==1&&data.key==2){
					this.navigateTo('/pages/cate/digit-resource')
					// this.navigateTo('/pages/cate/digital-cultural')
				}else if(data.index==0&&data.key==6){
					this.navigateTo('/pages/cate/nonlegacy')
				}else if(data.index==0&&data.key==5){
					this.navigateTo('/pages/cate/nettrain-list')
				}else if(data.index==0&&data.key==3){
					this.navigateTo('/pages/cate/volunteers-list')
				}else if(data.index==0&&data.key==0){
					this.navigateTo('/pages/cate/information-choose')
				}else if(data.index==1&&data.key==1){
					this.navigateTo('/pages/cate/organization-list')
				}else if(data.index==1&&data.key==3){
					this.navigateTo('/pages/cate/digital-cultural')
				}
			},
			todetail(index,id){
				this.navigateTo('/pages/cate/scenic-spot?id='+id+'&&channelIds=201')
				// if(index==0||index==1){
				// }else{
				// 	this.navigateTo('/pages/cate/nonlegacy-detail?id='+id)
				// }
			},
			toSearch(){
				uni.navigateTo({
					url: '/pages/index/search'
				})
			},
			gopage(id,index){
				this.navigateTo('/pages/cate/active-detail?id='+id)
				// if(index==0||index==1){
				// }else{
				// 	this.navigateTo('/pages/cate/venues-detail?id='+id)
				// }
			},
			toActive(id){
				uni.navigateTo({
					url: '/pages/mine/myactive-detail?id='+id
				})
			},
			getList(){
				this.indexRequest({url:'/ad/list.jspx',data:{adspaceId:5}}).then(res=>{
					this.carouselList = res.data.body;
				})
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'201', count:4, orderBy:4, format:0}}).then(res=>{
					this.recommendList = this.recommendList.concat(res.data.body);
				})
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'116', count:4, orderBy:4}}).then(res=>{
					this.activityList = this.activityList.concat(res.data.body);
				})
				// this.indexRequest({url:'/content/list.jspx',data:{channelIds:'117', count:2, orderBy:4}}).then(res=>{
				// 	this.activityList = this.activityList.concat(res.data.body);
				// })
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'110', count:2, first:1, format:0,}}).then(res=>{
					this.newsList = res.data.body;
				})
				
				this.indexRequest({url:'/todayInHistory/get',data:{}}).then(res=>{
					console.log(res,11111111111);
					this.historyList = res.data.body.result
				})
			},
		}
	}
</script>

<style lang="scss">
.content{
	width: 100%;
	height: auto;
	background: #fff;
	box-sizing: border-box;
	/* #ifdef H5 */
	padding-bottom: 150rpx;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	padding-bottom: 30rpx;
	/* #endif */
	
	/* #ifndef MP-WEIXIN */
		.search_box{
			width: 100%;
			height: 220rpx;
			background: #3F444C;
			border-radius: 0 0 10% 10%;
			display: flex;
			justify-content: space-between;
			/* #ifdef MP-WEIXIN */
			padding-top: 158rpx;
			/* #endif */
			
			/* #ifndef MP-WEIXIN */
			padding-top: 60rpx;
			/* #endif */
			&_input{
				width: 560rpx;
				height: 68rpx;
				border-radius: 36rpx;
				background-color: #F2F5FA;
				margin-left: 30rpx;
				/* #ifdef MP-WEIXIN */
				// margin-top: 60rpx;
				/* #endif */
				
				/* #ifndef MP-WEIXIN */
				margin-top: 0;
				/* #endif */
				display: flex;
				justify-content: space-between;
				align-items: center;
				.search_img{
					width: 30rpx;
					height: 30rpx;
					margin: -8rpx 8rpx 0 16rpx;
				}
				&_wri{
					flex: 1;
					line-height: 68rpx;
					font-size: 28rpx;
				}
			}
			.point_div{
				font-size: 24rpx;
				height: 70rpx;
				color: #FFFFFF;
				text-align: center;
				margin-right: 30rpx;
				.point_num{
					font-size: 40rpx;
					line-height: 40rpx;
					margin-bottom: 5rpx;
				}
			}
		}
	
		.banner_box{
			width: 100%;
			height: 320rpx;
			// border-radius: 16rpx;
			// margin: -60rpx auto 0;
			/* #ifdef MP-WEIXIN */
			padding-top: 150rpx;
			/* #endif */
			
			/* #ifndef MP-WEIXIN */
			margin-top: -60rpx;
			/* #endif */
			background-color: #3F444C;
			.swiper-recommend{
				width: 100%;
				font-size: 16rpx;
				text-align: center;
				.img{
					width: 100%;
					height: 100%;
					.swiper_img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	/* #endif */
	.panel_box{
		width: 100%;
		margin: -10rpx auto 0;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 50rpx 0 20rpx;
		border-radius: 12rpx;
		position: relative;
		z-index: 100;
		.history_box{
			width: 314rpx;
			height: 88rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 8rpx rgba(12, 22, 84, 0.16);
			border-radius: 16rpx;
			position: absolute;
			top: -60rpx;
			right: 30rpx;
			box-sizing: border-box;
			padding: 12rpx;
			&_top{
				display: flex;
				align-items: center;
				.riliimg{
					width: 32rpx;
					height: 32rpx;
					margin-right: 4rpx;
				}
				.jintianimg{
					width: 168rpx;
					height: 34rpx;
					margin-right: 8rpx;
				}
				text{
					font-size: 18rpx;
					font-weight: 400;
					line-height: 18rpx;
					color: #6B6B77;
					display: block;
					width: calc(100% - 212rpx);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			&_bottom{
				width: 100%;
				height: 22rpx;
				margin-top: 10rpx;
				overflow: hidden;
			}
			.historySwiper{
				height: 30rpx;
				.swiper-item{
					width: 100%;
					height: 22rpx;
					font-size: 20rpx;
					line-height: 20rpx;
					color: #6B6B77;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		&_show{
			width: 100%;
			display: flex;
			justify-content: space-around;
			&_part{
				display: flex;
				flex-direction: column;
				align-items: center;
				&_all{
					width: 82rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.cate{
						width: 40rpx;
						height: 40rpx;
						border-radius: 4rpx;
					}
					.red{
						background-color: #E9151C;
					}
					.yellow{
						background-color: #FCDE61;
					}
					.blue{
						background-color: #4BB6FA;
						margin-top: 2rpx;
					}
					.purple{
						background-color: #A279F5;
						margin-top: 2rpx;
					}
				}
				&_img{
					width: 88rpx;
					height: 106rpx;
				}
				&_name{
					font-size: 24rpx;
					line-height: 24rpx;
					color: #6B6B77;
				}
			}
		}
		&_hide{
			width: 100%;
			height: 272rpx;
			display: flex;
			justify-content: center;
			margin-top: 30rpx;
			&_part{
				width: 25%;
				height: 100%;
				&_one{
					width: 100%;
					height: 50%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					&_img{
						width: 80rpx;
						height: 80rpx;
					}
					&_name{
						font-size: 24rpx;
						line-height: 24rpx;
						color: #6B6B77;
					}
				}
			}
		}
	}
	.news{
		width: 100%;
		margin: 30rpx auto 0;
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.more{
			font-size: 24rpx;
			line-height: 24rpx;
			color: #8255F7;
		}
		&_title{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&_img{
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}
			&_txt{
				font-size: 40rpx;
				font-weight: 400;
				line-height: 100rpx;
				color: #1B1C1E;
			}
		}
		&_titles{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&_content{
			width: 100%;
			.tj_list_box{
				min-width: 1112rpx;
				height: 160rpx;
				display: flex;
				overflow: auto;
				flex-shrink: 0;
				.tj_list{
					width: 268rpx;
					height: 150rpx;
					margin-right: 32rpx;
					position: relative;
					&_img{
						width: 100%;
						height: 100%;
					}
					&_txt{
						width: 200rpx;
						position: absolute;
						font-size: 30rpx;
						line-height: 30rpx;
						color: #FFFFFF;
						left: 18rpx;
						top: 61rpx;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.zx_news{
				width: 100%;
				&_li{
					width: 100%;
					box-sizing: border-box;
					padding: 30rpx 0;
					display: flex;
					justify-content: space-between;
					border-bottom: 2rpx solid #eee;
					&:nth-last-child(1){
						border-bottom: none;
					}
					&_img{
						width: 232rpx;
						height: 192rpx;
						margin-left: 30rpx;
						background-color: #E5E5E5;
						.zximgs{
							width: 100%;
							height: 100%;
						}
					}
					&_content{
						color: #8B8B9C;
						width: 368rpx;
						&_title{
							width: calc(100% - 20rpx);
							font-size: 32rpx;
							font-weight: 400;
							line-height: 48rpx;
							color: #1B1C1E;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						&_body{
							width: 100%;
							font-size: 26rpx;
							margin-top: 24rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						&_source{
							display: flex;
							justify-content: space-between;
							font-size: 24rpx;
							color: #8B8B9C;
							margin-top: 40rpx;
							&_left{
								width: 176rpx;
								height: 40rpx;
								background: #E7E7E7;
								opacity: 1;
								border-radius: 8rpx;
								display: flex;
								align-items: center;
								color: #1B1C1E;
								box-sizing: border-box;
								padding: 10rpx;
								&_img{
									width: 28rpx;
									height: 28rpx;
									margin-right: 8rpx;
								}
								text{
									display: block;
									width: 120rpx;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
							}
						}
					}
				}
			}
			
			.tj_news{
				width: 100%;
				box-sizing: border-box;
				padding-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				&_li{
					width: 324rpx;
					box-sizing: border-box;
					padding-bottom: 20rpx;
					&_img{
						width: 100%;
						height: 178rpx;
						background-color: #E5E5E5;
						.tjimgs{
							width: 100%;
							height: 100%;
						}
					}
					&_name{
						width: 100%;
						font-size: 32rpx;
						line-height: 72rpx;
						color: #1B1C1E;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					&_line{
						line-height: 40rpx;
						font-size: 24rpx;
						color: #8B8B9C;
						width: 100%;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
			
			.fw_news{
				width: 100%;
				box-sizing: border-box;
				padding-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				&_li{
					width: 296rpx;
					&_img{
						width: 100%;
						height: 168rpx;
						background-color: #E5E5E5;
						.fwimgs{
							width: 100%;
							height: 100%;
						}
					}
					&_text{
						width: 100%;
						&_title{
							width: 100%;
							font-size: 32rpx;
							line-height: 64rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						.fw_txt{
							width: 100%;
							font-size: 24rpx;
							line-height: 36rpx;
							color: #8B8B9C;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
		.act_content{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&_info{
				display: flex;
				align-items: center;
				&_img{
					width: 86rpx;
					height: 64rpx;
					background: #E5E5E5;
					border-radius: 8rpx;
					margin-right: 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				&_title{
					font-size: 28rpx;
					line-height: 28rpx;
					color: #1B1C1E;
				}
			}
			&_btn{
				width: 118rpx;
				height: 42rpx;
				background: #FFFFFF;
				border: 2rpx solid #885BFD;
				border-radius: 8rpx;
				text-align: center;
				line-height: 42rpx;
				color: #885BFD;
				font-size: 24rpx;
			}
		}
	}
}
</style>
