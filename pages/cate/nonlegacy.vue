<template>
	<view class="nonlegacy content">
		<view class="chooseway">
			<image class="fy_top" src="/static/fy-top.png" mode=""></image>
			<image src="/static/wenwu.png" mode="" @tap="gopage('/pages/cate/fymap')"></image>
			<image src="/static/feiyi.png" mode="" @tap="gopage('/pages/cate/nonlegacy-list')"></image>
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
			gopage(url){
				uni.navigateTo({
					url: url
				})
			},
		},
	}
</script>

<style lang="scss">
.nonlegacy{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.chooseway{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	image{
		width: 690rpx;
		height: 226rpx;
		margin-top: 30rpx;
	}
	.fy_top{
		width: 690rpx;
		height: 386rpx;
	}
}
</style>
