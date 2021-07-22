<template>
	<view class="content creat-organization">
		<view class="team_img" @tap="chooseImg">
			<image v-if="teamImg" :src="teamImg" mode=""></image>
			<image v-else src="/static/user_team_portrait.png" mode=""></image>
		</view>
		<view class="input_box">
			<view class="input_box_item">
				<view class="input_box_item_name">社团名称</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入社团名称" v-model="team.name" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">法人社团</view>
				<image class="check" @tap="isCheck=!isCheck" :src="isCheck?'/static/check.png':'/static/nocheck.png'" mode=""></image>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(0)">
				<view class="input_box_item_name">社团类别</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择社团类别" v-model="team.groupType" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">团队所在地</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入团队所在地" v-model="team.address" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(1)">
				<view class="input_box_item_name">成立时间</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择时间" disabled v-model="team.founded" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">招募人数</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入招募人数" v-model="team.toplimit" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(2)">
				<view class="input_box_item_name">招募日期</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择招募截止日期" disabled v-model="team.dateLimit" />
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" v-model="team.description" placeholder="简介"></textarea>
			</view>
			
		</view>
		<view class="submit" @tap="submit">保存提交</view>
		<ys-picker @change="callPicker" ref="ysPicker" :title="pickTitle"></ys-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickTitle: '',
				teamImg: '',
				isCheck: false,
				team: {
					name: '',
					groupType: '',
					address: '',
					founded: '',
					toplimit: '',
					dateLimit: '',
					description: '',
				},
				remark: '',
				Index: 0,
				typeList: ['舞蹈', '音乐', '戏剧', '，曲艺', '美术', '摄影', '文学', '其它'],
				
			};
		},
		onLoad() {
			
		},
		methods: {
			selected(e){
				this.Index = e
				if(e==0){
					this.pickTitle = '社团类型'
					this.$refs.ysPicker.showModal('radio', this.typeList)
				}else if(e==1){
					this.pickTitle = '选择时间'
					this.$refs.ysPicker.showModal('time', 'b-y-M-d')
				}else{
					this.pickTitle = '选择时间'
					this.$refs.ysPicker.showModal('time', 'b-y-M-d')
				}
			},
			callPicker(res){//选中结果
				console.log(res);
				if(this.Index == 0){
					this.team.groupType = res.value[0]
				}else if(this.Index == 1){
					this.team.founded = res.value[0]+'-'+res.value[1]+'-'+res.value[2]
				}else{
					this.team.dateLimit = res.value[0]+'-'+res.value[1]+'-'+res.value[2]
				}
			},
			chooseImg(){
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						let url = res.tempFilePaths[0]
						_this.upload(url).then(r=>{
							console.log(r);
							_this.teamImg = r.body.uploadPath
						})
					}
				});
			},
			submit(){
				if(!this.teamImg){
					this.toast('请选择封面图片','none')
					return ;
				}
				if(!this.team.name||!this.team.groupType||!this.team.address||!this.team.founded||!this.team.toplimit||!this.team.dateLimit){
					this.toast('请检查是否有信息没填','none')
					return ;
				}
				this.homeRequest({
					url:'/group/add',
					method: 'GET',
					data: {
						name: this.team.name,
						toplimit: this.team.toplimit,
						description: this.team.description,
						titleImg: this.teamImg,
						groupType: this.team.groupType,
						founded:  this.team.founded,
						dateLimit: this.team.dateLimit,
						address: this.team.address,
						legal: this.isCheck?'是':'否'
					},
				}).then(res=>{
					if(res.code == 200){
						console.log(res);
						this.toast('社团创建成功！等待审核！')
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}else{
						this.toast(res.message,'none')
					}
				});
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	.team_img{
		width: 100%;
		height: 400rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.input_box{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
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
			.check{
				width: 40rpx;
				height: 40rpx;
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
			.points{
				width: 38rpx;
				height: 46rpx;
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
	.submit{
		width: 690rpx;
		height: 90rpx;
		margin: 60rpx auto 30rpx;
		background: #6446E1;
		border-radius: 54rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #FFFFFF;
	}
}
</style>
