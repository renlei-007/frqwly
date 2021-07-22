<template>
	<view class="nonlegacy content">
		<view class="chooseway">
			<image src="/static/nonlegacy.png" mode="" @tap="gopage('/pages/cate/nonlegacy-list')"></image>
			<image src="" mode=""></image>
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
	image{
		width: 100%;
		height: 280rpx;
	}
}
</style>
