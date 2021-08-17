<template>
	<view class="volunteers-booking content">
		<view class="signin">
			<image class="detail_img" :src="content.titleImg" mode=""></image>
			<view class="detail">
				<rich-text :nodes="content.title"></rich-text>
			</view>
		</view>
		<view class="input_box">
			<view class="input_box_tit">填写志愿信息</view>
			<view class="input_box_item">
				<view class="input_box_item_name">姓名</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入姓名" v-model="form.name" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">民族</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入民族" v-model="form.ethnic" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected()">
				<view class="input_box_item_name">出生年月</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择日期" disabled v-model="birthday" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">籍贯</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入籍贯" v-model="form.nativePlace" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">政治面貌</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入政治面貌" v-model="form.politicalStatus" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">电话号码</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入电话号码" v-model="form.phoneNumber" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">学历</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入学历" v-model="form.education" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">专业</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入专业" v-model="form.major" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">邮箱</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入邮箱" v-model="form.mail" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">特长</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入特长" v-model="form.specialty" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">通讯地址</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入通讯地址" v-model="form.address" />
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" v-model="form.experience" placeholder="志愿者活动经历"></textarea>
			</view>
		</view>
		<view class="sub" @tap="submit">立即提交</view>
		<ys-picker @change="callPicker" ref="ysPicker" :title="pickTitle"></ys-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickTitle: '出生日期',
				content: {},
				form: {
					name: '',//姓名
					ethnic: '',//民族
					birthday: '',//出生年月
					nativePlace: '',//籍贯
					politicalStatus: '',//政治面貌
					phoneNumber: '',//电话号码
					education: '',//学历
					major: '',//专业
					mail: '',//邮箱
					specialty: '',//特长
					address: '',//通讯地址
					experience: '',
				},
				birthday: '',
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					var content = res.data.body;
					this.content = content;
				})
			},
			selected(val){//调起选择器组件
				this.$refs.ysPicker.showModal('time', 'y-M-d')
			},
			callPicker(res) {
				console.log(res);
				this.birthday = res.value[0]+'-'+res.value[1]+'-'+res.value[2]
			},
			submit(){
				let params = this.form
				params.contentId = this.id
				params.birthday = this.birthday
				this.homeRequest({
					url: '/volunteer/add',
					method: 'GET',
					data: params,
				}).then(res=>{
					if(res.code == 200){
						this.toast('报名成功！')
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					}else{
						this.toast(res.message,'none')
					}
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.volunteers-booking{
	width: 100%;
	height: auto;
	background-color: #FFFFFF;
	.signin{
		width: 100%;
		height: auto;
		.detail_img{
			width: 100%;
			height: 400rpx;
		}
		.detail{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 30rpx;
		}
	}
	.input_box{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		&_tit{
			width: 100%;
			height: 112rpx;
			font-size: 34rpx;
			color: #000;
			line-height: 112rpx;
			position: relative;
			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 100%;
				height: 1px;
				background-color: #e6e6e6;
			}
		}
		&_items{
			width: 100%;
			height: 112rpx;
			display: flex;
			align-items: center;
		}
		&_item{
			width: 100%;
			height: 112rpx;
			display: flex;
			align-items: center;
			position: relative;
			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 100%;
				height: 1px;
				background-color: #e6e6e6;
			}
			&_name{
				width: 180rpx;
				font-size: 30rpx;
				color: #000;
			}
			&_write{
				width: 450rpx;
				.inp{
					width: 100%;
					font-size: 28rpx;
					color: #000;
					line-height: 112rpx;
				}
			}
		}
		.cu-form-group{
			box-sizing: border-box;
			padding: 30rpx 0;
		}
		&_item_address{
			background-image: url('~@/static/marker.png');
			background-position: right;
			background-repeat: no-repeat;
			background-size: 52rpx 56rpx;
		}
		&_item_more{
			background-image: url('~@/static/more-black.png');
			background-position: right;
			background-repeat: no-repeat;
			background-size: 12rpx 22rpx;
		}
	}
}
.nodes{
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx;
	h3{
		color: #ff4600;
		font-size: 30rpx;
	}
}
.sub{
	width: 690rpx;
	height: 110rpx;
	margin: 10rpx auto 30rpx;
	line-height: 110rpx;
	text-align: center;
	background-color: rgb(149, 111, 236);
	color: #FFFFFF;
	border-radius: 10rpx;
}
</style>
