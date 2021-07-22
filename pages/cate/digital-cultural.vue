<template>
	<view class="digital-cultural content">
		<image src="/static/zixun/whgzx.png" mode="" @tap="toList(0)"></image>
		<image src="/static/zixun/whghd.png" mode="" @tap="toList(1)"></image>
		<image src="/static/zixun/cgyy.png" mode="" @tap="toList(2)"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toList(index){
				if(index==0){
					uni.navigateTo({
						url: './digital-cultural-list'
					})
				}else if(index==1){
					uni.navigateTo({
						url: './digital-active-list'
					})
				}else if(index==2){
					uni.navigateTo({
						url: './digital-order-list'
					})
				}
			}
		},
	}
</script>

<style lang="scss">
.digital-cultural{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	justify-content: center;
	image{
		width: 686rpx;
		height: 226rpx;
		margin-bottom: 60rpx;
	}
}
</style>
