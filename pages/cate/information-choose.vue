<template>
	<view class="information-choose content">
		<view class="information_choose">
			<view class="information_choose_box" @tap="todetail(0,110)">
				<view class="information_choose_box_top">
					<image src="/static/zixun/wlzx.png" style="width: 176rpx;height: 134rpx;" mode=""></image>
				</view>
				<view class="information_choose_box_bottom" style="color: #BCBABA;">
					<view class="information_choose_box_bottom_title">文旅资讯</view>
					<view class="information_choose_box_bottom_eng">Cultural  Information</view>
				</view>
			</view>
			<view class="information_choose_box" @tap="todetail(1,109)">
				<view class="information_choose_box_top">
					<image src="/static/zixun/tzgg.png" style="width: 176rpx;height: 134rpx;" mode=""></image>
				</view>
				<view class="information_choose_box_bottom" style="color: #F7931B;">
					<view class="information_choose_box_bottom_title">通知公告</view>
					<view class="information_choose_box_bottom_eng">Announcements</view>
				</view>
			</view>
			<view class="information_choose_box top_ma" @tap="todetail(2,171)">
				<view class="information_choose_box_top">
					<image src="/static/zixun/zcwj.png" style="width: 126rpx;height: 124rpx;" mode=""></image>
				</view>
				<view class="information_choose_box_bottom" style="color: #9880EE;">
					<view class="information_choose_box_bottom_title">政策文件</view>
					<view class="information_choose_box_bottom_eng">Policy Document</view>
				</view>
			</view>
			<view class="information_choose_box top_ma" @tap="todetail(3,170)">
				<view class="information_choose_box_top">
					<image src="/static/zixun/flfg.png" style="width: 226rpx;height: 114rpx;" mode=""></image>
				</view>
				<view class="information_choose_box_bottom" style="color: #528BF1;">
					<view class="information_choose_box_bottom_title">法律法规</view>
					<view class="information_choose_box_bottom_eng">Law Regulations</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			todetail(index,id){
				let url = ''
				switch (index) {
					case 0:
						url = '/pages/cate/information-list'
						break
					case 1:
						url = '/pages/cate/policy-document?channelIds='+id
						break
					case 2:
						url = '/pages/cate/policy-document?channelIds='+id
						break
					case 3:
						url = '/pages/cate/policy-document?channelIds='+id
						break
				}
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">
.information-choose{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	.information_choose{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		&_box{
			width: 328rpx;
			height: 360rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			&_top{
				width: 100%;
				height: 230rpx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			&_bottom{
				width: 100%;
				height: 130rpx;
				text-align: center;
				&_title{
					font-size: 48rpx;
					font-weight: 500;
					line-height: 48rpx;
				}
				&_eng{
					font-size: 28rpx;
					line-height: 28rpx;
					margin-top: 12rpx;
				}
			}
		}
		.top_ma{
			margin-top: 48rpx;
		}
	}
}
</style>
