<template>
	<view class="content attestation">
		<view class="attestation_form">
			<view class="form_name">姓名</view>
			<input class="form_input" type="text" v-model="authInfo.realname" placeholder="请输入姓名" />
		</view>
		<view class="attestation_form">
			<view class="form_name">手机号</view>
			<input class="form_input" type="text" v-model="authInfo.phone" placeholder="请输入手机号" />
		</view>
		<view class="attestation_form">
			<view class="form_name">身份证号</view>
			<input class="form_input" type="text" v-model="authInfo.idNum" placeholder="身份证号必须与照片保持一致" />
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
						<image class="avatar" src="/static/avatar_t.png" mode=""></image>
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
						<image class="avatar" src="/static/avatar_g.png" mode=""></image>
					</view>
				</block>
				<block v-else>
					<image class="id_img" :src="imgList[1]" mode=""></image>
				</block>
			</view>
		</view>
		<view class="submit" @tap="submit">提交</view>
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
				imgList: ['',''],
				authInfo: {
					phone: '',
					idCardBackImg: '',
					id: '',
					idCardImg: '',
					idNum: '',
					userId: '',
					realname: '',
					status: '',
				},
			};
		},
		onLoad() {
			this.getStatus()
		},
		methods: {
			getStatus(){
				this.homeRequest({
					url: '/authInfo',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.log(res);
					if(res.code == 200){
						if(res.body.status==1){
							this.authInfo = res.body;
							this.imgList = [this.authInfo.idCardImg,this.authInfo.idCardBackImg]
						}
					}
				})
			},
			submit(){
				if(!this.authInfo.idNum || !this.checkIDCard(this.authInfo.idNum)){
					this.toast('请输入正确的身份证号码!','none')
					return ;
				}
				if(this.authInfo.status == 1){
					this.toast('认证审核已经通过,不能再次修改!','none')
					return ;
				}
				if(this.imgList[0].length==0||this.imgList[1].length==0){
					this.toast('照片不能为空!','none')
					return ;
				}
				let params = {
					phone: this.authInfo.phone,
					idCardBackImg: this.imgList[1],
					idCardImg: this.imgList[0],
					idNum: this.authInfo.idNum,
					realname: this.authInfo.realname,
					status: this.authInfo.status,
				}
				this.homeRequest({
					url: '/authInfo/save',
					method: 'POST',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code == 200){
						let user = uni.getStorageSync('user_info')
						user.isCertification = true
						uni.setStorageSync('user_info',user)
						this.toast('资料提交成功，等待管理员审核')
					}else{
						this.toast('保存失败','none')
					}
				})
			},
			chooseOne(index){
				this.piece = index
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						let url = res.tempFilePaths[0]
						_this.upload(url).then(r=>{
							console.log(r);
							_this.imgList[index-1] = r.body.uploadPath
						})
					}
				});
			},
			/**
			 * @param {Object} idcode
			 * 验证身份证号
			 */
			checkIDCard:function(idcode){
				// 加权因子
				var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
				// 校验码
				var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
			
				var code = idcode + "";
				var last = idcode[17];//最后一位
			
				var seventeen = code.substring(0,17);
			
				// ISO 7064:1983.MOD 11-2
				// 判断最后一位校验码是否正确
					var arr = seventeen.split("");
				var len = arr.length;
				var num = 0;
				for(var i = 0; i < len; i++){
					num = num + arr[i] * weight_factor[i];
				}
			    
				// 获取余数
				var resisue = num%11;
				var last_no = check_code[resisue];
			
				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
			
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
			
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			},
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
