<template>
	<view class="digital-active-detail content">
		<view class="main_img">
			<image class="indeximg" src="" mode=""></image>
		</view>
		<view class="main_body">
			<view class="main_body_title">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</view>
			<view class="main_body_text">
				<image src="/static/first_time.png" mode=""></image>
				<text>2020-08-25至2020-08-30</text>
			</view>
			<view class="main_body_text">
				<image src="/static/second_time.png" mode=""></image>
				<text>2020-08-25至2020-08-30</text>
			</view>
			<view class="main_body_text">
				<image src="/static/position.png" mode="" style="width: 28rpx;height: 34rpx;"></image>
				<text>xxxxxxxxxxxxxx</text>
			</view>
		</view>
		<view class="blank"></view>
		<view class="tj_active">
			<view class="tj_active_title">活动详情</view>
			<view class="introduce">
				<!-- <rich-text :nodes="content.txt"></rich-text> -->
			</view>
		</view>
		<view class="public_bottom">
			<view class="icon_area">
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/pinglun.png" mode=""></image>
					<text>评论</text>
				</view>
				<button class="icon_item" hover-class="none" open-type="share" @tap="share">
					<image class="icon_img" src="/static/cate/zhuanfa.png" mode=""></image>
					<text>转发</text>
				</button>
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/dianzan.png" mode=""></image>
					<text>点赞</text>
				</view>
				<view class="icon_item">
					<image class="icon_img" src="/static/cate/shoucang.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="public_btn">立即报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: {},
			};
		},
		onLoad(e) {
			this.id = e.id
			// this.getDetail()
		},
		methods: {
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					content.txt = this.replaceSpecialChar(content.txt)
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.digital-active-detail{
	width: 100%;
	overflow: auto;
	.main_body{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx 30rpx;
		margin-top: 48rpx;
		&_title{
			font-size: 36rpx;
			line-height: 36rpx;
			color: #1B1C1E;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		&_text{
			font-size: 28rpx;
			color: #999;
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
			text{
				line-height: 28rpx;
			}
		}
	}
}
</style>
