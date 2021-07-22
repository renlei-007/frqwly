<template>
	<view class="digit-resource content">
		<view class="main_body">
			<image src="/static/muke.png" mode="" @tap="gopage('/pages/cate/mooc')"></image>
			<image src="/static/whbk.png" mode="" @tap="gopage('/pages/cate/cultural-encyclopedia')"></image>
			<image src="/static/dzts.png" mode="" @tap="gopage('/pages/cate/net-library')"></image>
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
.digit-resource{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	.main_body{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 686rpx;
			height: 226rpx;
			margin-bottom: 64rpx;
		}
	}
}
</style>
