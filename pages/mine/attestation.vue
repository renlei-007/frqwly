<template>
	<view class="content attestation">
		<view class="attestation_form">
			<view class="form_name">用户名</view>
			<input class="form_input" type="text" v-model="form.name" placeholder="请输入用户名" />
		</view>
		<view class="attestation_form">
			<view class="form_name">手机号</view>
			<input class="form_input" type="text" v-model="form.phone" placeholder="请输入手机号" />
		</view>
		<view class="attestation_form">
			<view class="form_name">身份证号</view>
			<input class="form_input" type="text" v-model="form.ID_number" placeholder="身份证号必须与照片保持一致" />
		</view>
		<view class="avatar_box">
			<view class="avatar_tips">请上传身份证的正反面</view>
			<view class="avatar_item" :style="piece==1?'border-color: #6547E2;':''" @tap="chooseOne(1)">
				<block v-if="imgList[0].length==0">
					<view class="avatar_item_info">
						<view class="avatar_item_info_name" :style="piece==1?'color: #6547E2;':''">头像面</view>
						<view class="avatar_item_info_tips" :style="piece==1?'color: #6547E2;':''">请上传您的身份证头像面</view>
					</view>
					<view class="avatar_item_img">
						<image class="avatar" src="../../static/avatar_t.png" mode=""></image>
					</view>
				</block>
				<block v-else>
					<image class="id_img" :src="imgList[0]" mode=""></image>
				</block>
			</view>
			<view class="avatar_item" :style="piece==2?'border-color: #6547E2;':''" @tap="chooseOne(2)">
				<block v-if="imgList[1].length==0">
					<view class="avatar_item_info">
						<view class="avatar_item_info_name" :style="piece==2?'color: #6547E2;':''">国徽面</view>
						<view class="avatar_item_info_tips" :style="piece==2?'color: #6547E2;':''">请上传您的身份证国徽面</view>
					</view>
					<view class="avatar_item_img">
						<image class="avatar" src="../../static/avatar_g.png" mode=""></image>
					</view>
				</block>
				<block v-else>
					<image class="id_img" :src="imgList[1]" mode=""></image>
				</block>
			</view>
		</view>
		<view class="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					phone: '',
					ID_number: '',
				},
				piece: 0,
				imgList: ['','']
			};
		},
		methods: {
			chooseOne(index){
				this.piece = index
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(res);
						_this.imgList[index-1] = res.tempFilePaths[0]
						console.log(_this.imgList[index-1]);
					}
				});
			}
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	box-sizing: border-box;
	padding: 0 30rpx 50rpx;
	.attestation_form{
		width: 100%;
		height: 112rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #000;
		position: relative;
		.form_name{
			width: 180rpx;
		}
		.form_input{
			flex: 1;
		}
		&::after{
			position: absolute;
			content: '';
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			height: 1px;
			background-color: #eee;
		}
	}
	.avatar_box{
		width: 100%;
		.avatar_tips{
			font-size: 40rpx;
			line-height: 130rpx;
		}
		.avatar_item{
			width: 690rpx;
			height: 386rpx;
			background: #FFFFFF;
			border: 1rpx solid #eee;
			border-radius: 16rpx;
			box-sizing: border-box;
			padding: 48rpx 30rpx;
			display: flex;
			justify-content: space-between;
			.id_img{
				width: 100%;
				height: 100%;
			}
			&_info{
				&_name{
					font-size: 40rpx;
					color: #1B1C1E;
				}
				&_tips{
					margin-top: 30rpx;
					font-size: 24rpx;
					color: #8B8B9C;
					opacity: 0.4;
				}
			}
			&_img{
				display: flex;
				width: 328rpx;
				height: 100%;
				align-items: center;
				.avatar{
					width: 328rpx;
					height: 214rpx;
				}
			}
			&:nth-last-child(1){
				margin-top: 30rpx;
			}
		}
	}
	.submit{
		width: 100%;
		height: 90rpx;
		background: #6446E1;
		border-radius: 54rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		margin-top: 60rpx;
	}
}
</style>
