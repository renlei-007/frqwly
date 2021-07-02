<template>
	<view class="content active-detail">
		<view class="main_img">
			<image class="indeximg" :src="content.titleImg" mode=""></image>
		</view>
		<view class="active_info">
			<view class="active_title">{{content.title}}</view>
			<view class="active_mess" style="margin-top: 16rpx;">
				<image class="info_icon" src="/static/first_time.png" mode=""></image>
				<text class="info_text">{{content.ticketingSetting?content.ticketingSetting.startTime:''}}至{{content.ticketingSetting?content.ticketingSetting.endTime:''}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/second_time.png" mode=""></image>
				<text class="info_text">{{dateFormat(content)}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/position.png" mode=""></image>
				<text class="info_text">{{content.attr_address || ''}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/phone.png" mode=""></image>
				<text class="info_text">{{content.attr_phone || ''}}</text>
			</view>
			<view class="active_mess">
				<image class="info_icon" src="/static/yupiao.png" mode=""></image>
				<view class="piao_count">
					余票：<text class="piao_red" v-if='content.ticketingSetting&&content.ticketingSetting.status == 0'>{{content.ticketingSetting.num -content.ticketingSetting.currentNum}}</text>
					<text class="piao_red" v-else>0</text>
					总票：<text class="piao_black">{{content.ticketingSetting?content.ticketingSetting.num:''}}</text>
				</view>
			</view>
			<view class="tips" v-if="content.ticketingSetting">
				<image src="../../static/tips.png" class="tips_icon" mode=""></image>
				本场活动单次最多预订{{content.ticketingSetting.maxTicket}}张票，最多可预订{{content.ticketingSetting.times}}次
			</view>
		</view>
		<view class="blank"></view>
		<view class="active_detail">
			<view class="active_detail_tab">
				<view class="active_detail_tab_title active">活动详情</view>
			</view>
			<view class="active_detail_content">
				<rich-text :nodes="content.txt"></rich-text>
			</view>
			<!-- <view class="active_detail_comment" v-else>
				<view class="active_detail_comment_area">
					<image class="avatar" src="../../static/user_avatar.png" mode=""></image>
					<view class="active_detail_comment_area_box">
						<textarea class="active_detail_comment_area_box_inp" v-model="comment" placeholder="说两句吧..." />
						<view class="submit_btn">提交</view>
					</view>
				</view>
				<view class="active_detail_comment_else">
					<view class="all_comment">
						<image src="../../static/active-icon/gywm.png" mode=""></image>
						<text>全部评论</text>
					</view>
					<view class="right_part">
						<view class="right_part_detail">
							<image src="../../static/active-icon/gywm.png" mode=""></image>
							<text>分享</text>
						</view>
						<view class="right_part_detail">
							<image src="../../static/active-icon/gywm.png" mode=""></image>
							<text>22</text>
						</view>
						<view class="right_part_detail">
							<image src="../../static/active-icon/gywm.png" mode=""></image>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="tj_active">
			<view class="tj_active_title">相关推荐</view>
			<view class="tj_active_content">
				<view class="tj_active_content_box" v-for="(item,index) in activeList" :key="index" @tap="todetail(item.id)">
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
			<view class="public_btn" @tap="signUp" v-if='ticketStatus == 0 && status == 0'>立即报名</view>
			<view class="public_btn public_btn_g" v-else>{{ticketStatus==1?'即将开始':ticketStatus==2?'已结束':ticketStatus==4?'直接前往':ticketStatus==5?'人数已满':'报名次数已满'}}</view>
		</view>
		<!-- <view class="bottom_btn" @tap="signUp" :class="{'is_ing':type==1}">{{type==0?'已结束':'立即报名'}}</view> -->
		
		<view class="mask" v-if="is_sign" @tap="is_sign = false">
			<view class="mask_content">
				<image class="mask_img" src="../../static/lingdang.png" mode=""></image>
				<view class="success">报名成功，请准时参加哦~</view>
				<view class="sign_btn">开启</view>
				<view class="info">
					<image class="sign_icon" src="" mode=""></image>
					<text>允许发送消息通知提醒</text>
				</view>
				
				<view class="mask_content_blank1"></view>
				<view class="mask_content_blank2"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				is_sign: false,
				nowIndex: 0,
				nodes: '',
				comment: '',
				type: 1,
				content: {},
				status: 0,
				ticketStatus: 0,
				activeList: [],
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getActiveList()
		},
		methods: {
			signUp(){
				if(this.type==1){
					this.is_sign = true
				}
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					this.content = content;
					this.status = res.data.body.status;
					this.ticketStatus = res.data.body.ticketingSetting.status
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getActiveList(){
				let params = {
					count:5,
					channelIds: '116',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.activeList = array
				})
			},
			dateFormat(item){
				if(item && item.ticketingSetting){
					let start = item.ticketingSetting.registrationStart ? item.ticketingSetting.registrationStart.substring(0, 10) : '';
					let end  =  item.ticketingSetting.registrationStart ? item.ticketingSetting.registrationStart.substring(0, 10) : '';
					return start + '至' + end;
				}else{
					return '';
				}
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/active-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.active-detail{
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	background-color: #FFFFFF;
	.wai{
		width: 690rpx;
		height: 292rpx;
		margin: 30rpx auto 0;
		position: relative;
		.banner_box{
			width: 100%;
			height: 100%;
			border-radius: 16rpx;
			background-color: #E5E5E5;
			.swiper-recommend{
				width: 100%;
				line-height: 292rpx;
				font-size: 16rpx;
				text-align: center;
				color: #fff;
			}
		}
		.indicator_point{
			width: 100rpx;
			height: 48rpx;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #FFFFFF;
			background: rgba(0,0,0,0.44);
			border-radius: 32rpx;
			position: absolute;
			right: 16rpx;
			bottom: 16rpx;
			text-align: center;
		}
	}
	.active_info{
		width: 690rpx;
		height: auto;
		margin: 38rpx auto 0;
		font-size: 32rpx;
		color: #1B1C1E;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		.active_title{
			font-size: 40rpx;
			line-height: 60rpx;
			color: #1B1C1E;
			font-weight: 500;
		}
		.active_mess{
			display: flex;
			align-items: center;
			line-height: 64rpx;
			.info_icon{
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
			.info_text{
				font-weight: 400;
			}
			.piao_count{
				display: flex;
				font-weight: 400;
				.piao_red{
					margin: 0 44rpx 0 16rpx;
					color: #C61219;
				}
			}
		}
		.tips{
			width: 690rpx;
			background: rgba(242, 240, 254, 0.56);
			border-radius: 4rpx;
			box-sizing: border-box;
			padding: 26rpx 30rpx 26rpx 84rpx;
			line-height: 40rpx;
			color: #614DDF;
			position: relative;
			font-size: 28rpx;
			margin-top: 20rpx;
			.tips_icon{
				width: 44rpx;
				height: 87rpx;
				position: absolute;
				top: -8rpx;
				left: 8rpx;
			}
		}
	}
	.blank{
		width: 100%;
		height: 4rpx;
		background-color: #F2F0FE;
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
	}
	.bottom_btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		background: #999;
		text-align: center;
		line-height: 110rpx;
		font-size: 34rpx;
		color: #fff;
	}
	.is_ing{
		background: linear-gradient(128deg, #947EEC 0%, #7458E8 100%);
		color: #FFFFFF;
	}
}

.mask{
	.mask_content{
		.mask_img{
			width: 294rpx;
			height: 240rpx;
			margin: 32rpx auto 0;
		}
		.success{
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: 500;
			color: #1B1C1E;
			margin-top: 8rpx;
		}
		.sign_btn{
			width: 348rpx;
			height: 64rpx;
			background: linear-gradient(126deg, #C28FF5 0%, #7630DF 100%);
			border-radius: 36rpx;
			text-align: center;
			line-height: 64rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin: 32rpx auto 0;
		}
		.info{
			display: flex;
			font-size: 22rpx;
			line-height: 28rpx;
			color: #6D6E6F;
			margin-top: 34rpx;
			align-items: center;
			justify-content: center;
			.sign_icon{
				margin-right: 10rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
}
</style>
