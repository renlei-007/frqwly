<template>
	<view class="content setting">
		<view class="input_box">
			<view class="input_box_item">
				<view class="input_box_item_name">用户名</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入用户名" v-model="user_form.name" />
				</view>
			</view>
			<view class="input_box_item input_box_item_address">
				<view class="input_box_item_name">选择区域</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请点击进行选择" disabled v-model="user_form.area" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">详细地址</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入详细地址（可选填）" v-model="user_form.address" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">毕业院校</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入毕业院校" v-model="user_form.school" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(0)">
				<view class="input_box_item_name">最高学历</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择学历" disabled v-model="user_form.education" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(1)">
				<view class="input_box_item_name">政治面貌</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择政治面貌" disabled v-model="user_form.politic" />
				</view>
			</view>
		</view>
		<view class="submit" @tap="submit">提交</view>
		<ys-picker @change="callPicker" ref="ysPicker" :title="pickTitle"></ys-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_form: {
					name: '',
					area: '',
					address: '',
					school: '',
					education: '',
					politic: '',
				},
				pickTitle: '',
				educationList: ['小学','初中','高中','专科','本科','研究生',],
				politicList: ['中共党员','共青团员','群众'],
				
				Index: -1,
			};
		},
		methods: {
			selected(val){//调起选择器组件
				this.Index = val
				if(val==0){
					this.$refs.ysPicker.showModal('radio', this.educationList)
				}else{
					this.$refs.ysPicker.showModal('radio', this.politicList)
				}
			},
			callPicker(res){//选中结果
				console.log(res);
				if(this.Index == 0){
					this.user_form.education = res.value[0]
				}else{
					this.user_form.politic = res.value[0]
				}
			},
			submit(){
				uni.navigateBack({
					delta: 1,
				})
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
				font-size: 34rpx;
				color: #000;
			}
			&_write{
				width: 450rpx;
				.inp{
					width: 100%;
					font-size: 32rpx;
					color: #000;
					line-height: 112rpx;
				}
			}
			.points{
				width: 38rpx;
				height: 46rpx;
			}
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
		margin: 60rpx auto 0;
		background: #6446E1;
		border-radius: 54rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #FFFFFF;
	}
}
</style>
