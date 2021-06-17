<template>
	<view class="content feedback">
		<view class="feedback_box">
			<textarea class="area_font" placeholder="请输入您要反馈的问题..." maxlength="500" v-model="feedback" />
			<view class="limit">{{limit}}/500</view>
		</view>
		<view class="add_box">
			<view class="add_box_tips">请提供问题的截图或照片（选填）</view>
			<view class="img_area">
				<image class="feedback_img" v-for="(item,index) in imgList" :key="index" :src="item" mode=""></image>
				<view class="img_hull" @tap="addImg">
					<image class="add_img" src="../../static/photo.png" mode=""></image>
					<view class="add_text">添加图片</view>
				</view>
			</view>
		</view>
		<view class="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback: '',
				imgList: [],
			};
		},
		computed: {
			limit(){
				let num = 500,_num
				_num = num - this.feedback.length
				return _num
			},
		},
		methods: {
			addImg(){
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(res);
						_this.imgList.push(res.tempFiles[0].path)
						console.log(_this.imgList);
					}
				});
			},
		},
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
}
.content{
	width: 100%;
	box-sizing: border-box;
	padding-top: 30rpx;
	.feedback_box{
		width: 690rpx;
		height: 285rpx;
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #F2F5FA;
		border-radius: 16rpx;
		margin: 0 auto;
		font-size: 28rpx;
		.area_font{
			width: 100%;
			height: 190rpx;
			text-indent: 1em;
		}
		.limit{
			width: 100%;
			font-size: 24rpx;
			color: #1B1C1E;
			text-align: right;
		}
	}
	.add_box{
		width: 690rpx;
		box-sizing: border-box;
		padding: 0 30rpx 30rpx;
		background-color: #F2F5FA;
		border-radius: 16rpx;
		margin: 30rpx auto 0;
		font-size: 28rpx;
		&_tips{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			color: #8B8B9C;
			opacity: 0.5;
			position: relative;
			&::after{
				position: absolute;
				content: '';
				bottom: 0;
				left: 50%;
				width: 100%;
				height: 1px;
				background-color: #707070;
				transform: translateX(-50%);
				opacity: 0.3;
			}
		}
		.img_area{
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding-top: 10rpx;
			flex-wrap: wrap;
			.feedback_img{
				width: 116rpx;
				height: 116rpx;
				margin-top: 20rpx;
				margin-right: 20rpx;
			}
			.img_hull{
				width: 116rpx;
				height: 116rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #E5E9FC;
				justify-content: center;
				margin-top: 20rpx;
				margin-right: 20rpx;
				.add_img{
					width: 56rpx;
					height: 48rpx;
				}
				.add_text{
					font-size: 20rpx;
					color: #8B8B9C;
					margin-top: 8rpx;
				}
			}
		}
	}
	.submit{
		width: 690rpx;
		height: 90rpx;
		background: #6446E1;
		border-radius: 54rpx;
		margin: 60rpx auto 0;
		font-size: 34rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
	}
}
</style>
