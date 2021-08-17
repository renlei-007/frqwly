<template>
	<view class="nonlegacy content">
		<view class="chooseway">
			<image src="/static/wenwu.png" mode="" @tap="gopage('/pages/cate/fymap')"></image>
			<image src="/static/feiyi.png" mode="" style="margin-top: 64rpx;" @tap="gopage('/pages/cate/nonlegacy-list')"></image>
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
}
.chooseway{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-items: center;
	image{
		width: 690rpx;
		height: 226rpx;
	}
}
</style>
