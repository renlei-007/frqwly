<template>
	<view class="fymap content">
		<web-view src="https://furong.culturalcloud.net/heritageMap_h5.html" @message="message2"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			message1(res){
				console.log(res);
			},
			message2(res){
				console.log(res);
			},
		},
	}
</script>

<style lang="scss">
.fymap{
	width: 100%;
	height: 100%;
}
</style>
