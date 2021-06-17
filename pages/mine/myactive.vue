<template>
	<view class="content myactive">
		<view class="no_data">
			<image class="no_data_icon" src="../../static/kong.png" mode=""></image>
			<view class="no_data_text">空荡荡的。。。</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	.no_data{
		width: 100%;
		position: relative;
		text-align: center;
		&_icon{
			width: 340rpx;
			height: 270rpx;
			margin: 244rpx auto 0;
		}
		&_text{
			font-size: 32rpx;
			color: #4192FA;
			margin: 48rpx 0 0;
		}
	}
}
</style>
