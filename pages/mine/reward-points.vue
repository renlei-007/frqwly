<template>
	<!-- 积分明细 -->
	<view class="reward-points content">
		<view class="header">
			<image class="renwu" src="../../static/renwu.png" mode=""></image>
			<view class="all_point">总积分</view>
			<view class="point_data">{{is_login?user.score:0}}</view>
		</view>
		<view class="pointbody">
			<view class="pointbody_top">
				<view class="pointbody_top_title" :class="{active: Index==0}" @tap="indexChange(0)"><text>我的积分</text></view>
				<view class="pointbody_top_title" :class="{active: Index==1}" @tap="indexChange(1)"><text>积分规则</text></view>
			</view>
			<view class="pointbody_content" v-if="Index==0">
				<ys-scroll :param="param" style="height: 780rpx;" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" class="ys_content">
					<view class="ys_lines">
						<view class="lines">
							<view class="lines_text">积分类型</view>
						</view>
					</view>
					<view class="ys_content_list" v-for="(item,index) in pointList" :key="index">
						<view class="ys_content_list_info">
							<view class="ys_content_list_info_type">{{item.remark}}</view>
							<view class="ys_content_list_info_add">{{item.type==0?'+'+item.score:'-'+item.score}}</view>
						</view>
						<view class="ys_content_list_time">{{item.upateTime}}</view>
					</view>
				</ys-scroll>
			</view>
			<view class="pointbody_content" v-if="Index==1">
				<view class="ys_content">
					<view class="ys_content_list" v-for="(item,index) in pointRules" :key="index">
						<view class="ys_content_list_info">
							<view class="ys_content_list_info_type">{{item.type}}</view>
							<view class="ys_content_list_info_add">{{item.point>0?'+'+item.point:item.point}}</view>
						</view>
						<view class="ys_content_list_time">{{item.tips}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips" v-if="Index==1">
			1.积分针对活动预约、场馆预订、公益培训、大讲堂需要积分时直接抵扣使用。
			<br/>
			2.积分可以累积，有效期至少为1年，即从获得开始至次年年底，逾期自动作废。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Index: 0,
				user: {},
				is_login: true,
				param:{//滚动区域配置
					scroll_y:true,
					background:'#fff',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				page: 0,
				pointList: [],
				pointRules: [{
					type: '个人用户注册',
					point: 5,
					tips: '仅1次',
				},{
					type: '实名认证',
					point: 100,
					tips: '仅1次',
				},{
					type: '快速登录',
					point: 1,
					tips: '每日登录记一次',
				},{
					type: '第三方登录',
					point: 1,
					tips: '每日登录记一次',
				},{
					type: '分享',
					point: 2,
					tips: '每日登录记一次',
				},],
			};
		},
		onLoad() {
			if(uni.getStorageSync('user_info')){
				this.user = uni.getStorageSync('user_info')
			}
			if(JSON.stringify(this.user)=='{}'){
				this.is_login = false
			}else{
				this.is_login = true
			}
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 1;
				this.pointList = [];
				this.getList(this.page);
				setTimeout(()=>{
				    this.$refs.scroll.endRefresh()
				},800)
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page++
				this.getList(this.page);
			},
			getList(){
				let params = {first:this.page, count:10};
				this.homeRequest({
					url: '/score/list',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.pointList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.pointList = this.pointList.concat(res.body)
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
			indexChange(index){
				if(this.Index!=index){
					this.Index = index
				}
			}
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.reward-points{
	width: 100%;
	.header{
		width: 100%;
		height: 400rpx;
		background: linear-gradient(144deg, #956FEC 0%, #9F7CEF 100%);
		position: relative;
		box-sizing: border-box;
		padding-top: 40rpx;
		.renwu{
			width: 336rpx;
			height: 370rpx;
			position: absolute;
			right: 54rpx;
			bottom: 14rpx;
		}
		.all_point{
			font-size: 32rpx;
			font-weight: 400;
			line-height: 32rpx;
			color: #FFFFFF;
			margin-left:48rpx;
		}
		.point_data{
			font-size: 96rpx;
			font-family: DIN;
			font-weight: bold;
			line-height: 118rpx;
			color: #FFFFFF;
			margin: 32rpx 0 0 48rpx;
		}
	}
	.pointbody{
		width: 690rpx;
		box-shadow: 0px 6rpx 12rpx rgba(21, 11, 77, 0.16);
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: -140rpx auto 0;
		min-height: 800rpx;
		position: relative;
		// z-index: 5;
		&_top{
			width: 100%;
			height: 140rpx;
			display: flex;
			&_title{
				width: 50%;
				height: 130rpx;
				background: linear-gradient(360deg, #8989E3 0%, #FFFFFF 100%);
				border-radius: 20rpx;
				line-height: 130rpx;
				text-align: center;
				font-size: 32rpx;
				opacity: 0.8;
				color: #1B1C1E;
				
			}
			.active{
				background: #FFFFFF;
				opacity: 1;
				font-size: 40rpx;
				color: #6952E1;
				text{
					display: inline-block;
					height: 122rpx;
					border-bottom: 8rpx solid #7630DF;
				}
			}
		}
		&_content{
			width: 100%;
			box-sizing: border-box;
			padding: 0 48rpx;
			.ys_content{
				width: 100%;
				.ys_lines{
					width: 100%;
					display: flex;
					justify-content: center;
					margin-top: 28rpx;
					.lines{
						width: 272rpx;
						height: 11rpx;
						border-bottom: 1rpx solid #ccc;
						display: flex;
						justify-content: center;
						&_text{
							width: 128rpx;
							height: 22rpx;
							line-height: 22rpx;
							background-color: #FFFFFF;
							font-size: 22rpx;
							font-weight: 400;
							color: #999999;
							text-align: center;
						}
					}
				}
				&_list{
					width: 100%;
					height: 148rpx;
					box-sizing: border-box;
					padding: 32rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 28rpx;
					border-bottom: 1rpx solid #ddd;
					&:nth-last-child(1){
						border: none;
					}
					&_info{
						width: 100%;
						display: flex;
						color: #6D6E6F;
						justify-content: space-between;
						line-height: 28rpx;
					}
					&_time{
						color: #ccc;
						line-height: 28rpx;
					}
				}
			}
		}
	}
	.tips{
		width: 690rpx;
		margin: 50rpx auto;
		font-size: 22rpx;
		line-height: 40rpx;
		color: #C0C0C0;
	}
}
</style>
