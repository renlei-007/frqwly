/**
 * @Description: 首页
 * @author RL
 * @Date 2021-06-02
 */
<template>
	<view class="content index">
		<!-- #ifdef MP-WEIXIN -->
		<ys-top-bar title="芙蓉区文旅体云"></ys-top-bar>
		<!-- #endif -->
		<view class="search_box">
			<view class="search_box_input">
				<image class="search_img" src="../../static/icon/search.png" mode=""></image>
				<input type="text" class="search_box_input_wri" placeholder="请输入关键词搜索"/>
			</view>
		</view>
		<swiper class="banner_box" circular  indicator-dots="true" indicator-active-color="rgba(255,153,51,1)">
			<swiper-item  class="swiper-recommend" v-for="(item, index) in carouselList"  :key="index">
				<view class="img"><image class="swiper_img" :src="item.attr_image_url" mode="widthFix"></image></view>
			</swiper-item>
		</swiper>
		<!-- 分类轮播 -->
		<view class="news" style="padding: 0;">
			<ys-menu-list class="z_index" :size="116" :list="cate_list" @select="cateSelect"></ys-menu-list>
		</view>
		
		<!-- 文旅资讯 -->
		<view class="news">
			<view class="news_title">
				<image class="news_title_img" src="../../static/home/wlzx.png" mode=""></image>
				<view class="news_title_txt">文旅资讯</view>
			</view>
			<view class="news_content">
				<view class="zx_news">
					<view class="zx_news_li" v-for="(item,index) in newsList" :key="index">
						<view class="zx_news_li_content">
							<view class="zx_news_li_content_title">{{item.title}}</view>
							<view class="zx_news_li_content_body">{{item.description}}</view>
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
			<view class="news_title">
				<image class="news_title_img" src="../../static/home/jctj.png" mode=""></image>
				<view class="news_title_txt">精彩推荐</view>
			</view>
			<view class="news_content">
				<view class="tj_news">
					<view class="tj_news_li" v-for="(item,index) in recommendList" :key="index">
						<view class="tj_news_li_img">
							<image class="tjimgs" :src="item.titleImg" mode=""></image>
						</view>
						<view class="tj_news_li_name">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 文旅服务 -->
		<view class="news">
			<view class="news_title">
				<image class="news_title_img" src="../../static/home/wlfw.png" mode=""></image>
				<view class="news_title_txt">文旅服务</view>
			</view>
			<view class="news_content">
				<view class="fw_news">
					<view class="fw_news_li" v-for="(item,index) in activityList" :key="index">
						<view class="fw_news_li_img">
							<image class="fwimgs" :src="item.titleImg" mode=""></image>
						</view>
						<view class="fw_news_li_text">
							<view class="fw_news_li_text_title">{{item.title}}</view>
							<view class="fw_news_li_text_time fw_txt">时间：{{item.releaseDate.slice(0,10)}}</view>
							<view class="fw_news_li_text_address fw_txt" style="margin-bottom: 20rpx;">地址：湘乡市文化馆</view>
						</view>
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
				cate_list: [[{//分类数据
					title: '文旅体资讯',
					img: require('@/static/banner/wltzx.png'),
					bac: 'linear-gradient(161deg, #EC6B1F 0%, #E75325 87%, #E64F26 100%);',
				},{
					title: '活动报名',
					img: require('../../static/banner/hdbm.png'),
					bac: 'linear-gradient(144deg, #0FD79A 0%, #1FD369 100%);',
				},{
					title: '场馆服务',
					img: require('../../static/banner/cgfw.png'),
					bac: 'linear-gradient(140deg, #F79A0B 0%, #EF770E 100%);',
				},{
					title: '志愿者服务',
					img: require('../../static/banner/zyzfw.png'),
					bac: 'linear-gradient(140deg, #FB65C9 0%, #EF18A1 100%);',
				},{
					title: '直播点播',
					img: require('../../static/banner/zbdb.png'),
					bac: 'linear-gradient(140deg, #AD87FB 0%, #9566FF 100%);',
				},{
					title: '网上培训',
					img: require('../../static/banner/wspx.png'),
					bac: 'linear-gradient(138deg, #6CD6FE 0%, #33A0F8 100%);',
				},{
					title: '非遗保护',
					img: require('../../static/banner/fybh.png'),
					bac: 'linear-gradient(138deg, #FB65C9 0%, #F62EAF 100%);',
				},{
					title: '精品旅游',
					img: require('../../static/banner/jply.png'),
					bac: 'linear-gradient(144deg, #0FD79A 0%, #1FD369 100%);',
				}],[{
					title: '艺术欣赏',
					img: require('../../static/banner/ysxs.png'),
					bac: 'linear-gradient(140deg, #AD87FB 0%, #9566FF 100%);',
				},{
					title: '用户社团',
					img: require('../../static/banner/yhst.png'),
					bac: 'linear-gradient(141deg, #FDD945 0%, #FCB909 100%);',
				},{
					title: '数字资源',
					img: require('../../static/banner/szzy.png'),
					bac: 'linear-gradient(146deg, #E64F36 0%, #DF1C29 100%);',
				},{
					title: '数字文化馆',
					img: require('../../static/banner/szwhg.png'),
					bac: 'linear-gradient(138deg, #6CD6FE 0%, #33A0F8 100%);',
				}],],
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
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
				}
			},
			getList(){
				this.indexRequest({url:'/ad/list.jspx',data:{adspaceId:5}}).then(res=>{
					this.carouselList = res.data.body;
				})
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'135', count:2, orderBy:4}}).then(res=>{
					this.recommendList = this.recommendList.concat(res.data.body);
				})
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'125', count:2, orderBy:4}}).then(res=>{
					this.recommendList = this.recommendList.concat(res.data.body);
				})
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'116', count:2, orderBy:4}}).then(res=>{
					this.activityList = this.activityList.concat(res.data.body);
				})
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'117', count:2, orderBy:4}}).then(res=>{
					this.activityList = this.activityList.concat(res.data.body);
				})
				
				this.indexRequest({url:'/content/list.jspx',data:{channelIds:'108', count:2, orderBy:4}}).then(res=>{
					this.newsList = res.data.body;
				})
			},
		}
	}
</script>

<style lang="scss">
.content{
	width: 100%;
	background: #F2F5FA;
	box-sizing: border-box;
	/* #ifdef H5 */
	padding-bottom: 150rpx;
	/* #endif */
	.search_box{
		width: 100%;
		height: 220rpx;
		background: #956FEC;
		border-radius: 0 0 10% 10%;
		/* #ifdef MP-WEIXIN */
		padding-top: 88rpx;
		/* #endif */
		
		/* #ifndef MP-WEIXIN */
		padding-top: 60rpx;
		/* #endif */
		&_input{
			width: 690rpx;
			height: 68rpx;
			border-radius: 36rpx;
			background-color: #F2F5FA;
			/* #ifdef MP-WEIXIN */
			margin: 60rpx auto 0;
			/* #endif */
			
			/* #ifndef MP-WEIXIN */
			margin: 0 auto;
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
	}
	.banner_box{
		width: 690rpx;
		height: 292rpx;
		background: #E5E5E5;
		border-radius: 16rpx;
		margin: -60rpx auto 0;
		background-color: #E5E5E5;
		.swiper-recommend{
			width: 100%;
			line-height: 292rpx;
			font-size: 16rpx;
			text-align: center;
			color: #fff;
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
	.news{
		width: 690rpx;
		margin: 30rpx auto 0;
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		&_title{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #eee;
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
		&_content{
			width: 100%;
			.zx_news{
				width: 100%;
				&_li{
					width: 100%;
					box-sizing: border-box;
					padding: 30rpx 0;
					display: flex;
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
							margin-top: 30rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
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
					width: 296rpx;
					&_img{
						width: 100%;
						height: 168rpx;
						background-color: #E5E5E5;
						.tjimgs{
							width: 100%;
							height: 100%;
						}
					}
					&_name{
						width: 100%;
						font-size: 24rpx;
						line-height: 72rpx;
						text-align: center;
						color: #1B1C1E;
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
	}
}
</style>
