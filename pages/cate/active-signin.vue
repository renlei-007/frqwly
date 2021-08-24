<template>
	<view class="content active-signin">
		<view class="signin">
			<image class="detail_img" :src="content.titleImg" mode=""></image>
			<view class="detail">
				<rich-text :nodes="content.title"></rich-text>
			</view>
		</view>
		<view class="blank" style="height: 20rpx;"></view>
		<view class="input_box">
			<view class="input_box_tit">填写预约信息</view>
			<view class="input_box_item input_box_item_more" @tap="selected(0)">
				<view class="input_box_item_name">选择日期</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择日期" disabled v-model="date" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(1)">
				<view class="input_box_item_name">选择场次</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择场次" disabled v-model="slots" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(2)">
				<view class="input_box_item_name">选择数量</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择数量" disabled v-model="num" />
				</view>
			</view>
			<view class="input_box_item">
				<view class="input_box_item_name">手机号码</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" disabled v-model="userInfo.phone || userInfo.authPhone" />
				</view>
			</view>
		</view>
		<view class="nodes">
			<rich-text :nodes="rule"></rich-text>
		</view>
		<view class="sub" @tap="submit">同意条款并提交订单</view>
		<ys-picker @change="callPicker" ref="ysPicker" :title="pickTitle"></ys-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: {},
				date: '',
				slots: '',
				slotsList: [],
				num: '',
				ticketList: [],
				phone: '',
				startDate: '',
				endDate: '',
				rule:`
					<div style="width:100%">
					  <h3>预订须知</h3>
						1. 全年未入场票数达10张，将被取消当年预订资格；<br>
						2. 如需退票，请至“我的-我的活动“，退票截止至活动前一天（活动当天不可退票）；<br>
						3. 如因不可控因素导致活动无法进行，举办方有权延期或取消活动，并以短信方式通知订票人；<br>
						4. 如参加区图书馆、文化馆活动的市民，由于停车位有限，建议读者搭乘公共交通前往；<br>
						5. 活动最终解释权归举办方所有。
					</div>
				`,
				userInfo: {},
				Index: 0,
				pickTitle: '',
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.userInfo = uni.getStorageSync('user_info')
		},
		methods: {
			selected(val){//调起选择器组件
				this.Index = val
				if(val==0){
					this.pickTitle='选择时间'
					this.$refs.ysPicker.showModal('time', 'y-M-d')
				}else if(val==1){
					this.pickTitle='选择场次'
					this.$refs.ysPicker.showModal('radio', this.slotsList)
				}else{
					this.pickTitle='选择数量'
					this.$refs.ysPicker.showModal('radio', this.ticketList)
				}
			},
			callPicker(res) {
				if(this.Index == 0){
					this.date = res.value[0]+'-'+res.value[1]+'-'+res.value[2]
				}else if(this.Index == 1){
					this.slots = res.value[0]
				}else{
					this.num = res.value[0]
				}
			},
			submit(){
				let params = {
					contentId: this.id,
					phone: this.userInfo.phone,
					bookingDate: this.date,
					slot: this.slots,
					num: this.num,
				}
				this.homeRequest({
					url: '/ticket/add',
					method: 'POST',
					data: params,
				}).then(res=>{
					if(res.code == 200){
						uni.redirectTo({
							url: './active-signin-result?id='+this.id
						})
					}else{
						this.toast(res.message,'none')
					}
				})
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					this.content = content;
					this.startDate = content.ticketingSetting.startTime.substring(0, 10);
					this.date = this.startDate;
					this.endDate = content.ticketingSetting.endTime.substring(0, 10);
					var slots = content.ticketingSetting.slots;
					if(slots){
						let sa = slots.split(',');
						this.slotsList = sa;
						this.slots = sa[0];
					}
					var ticketList = content.ticketingSetting.maxTicket;
					var arr = [];
					for(let i=0; i<ticketList;i++){
						arr.push(i+1);
					}
					this.ticketList = arr
					this.num = arr[0]
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.active-signin{
	background-color: #FFFFFF;
}
.active-signin{
	width: 100%;
	.signin{
		width: 100%;
		height: auto;
		.detail_img{
			width: 100%;
			height: 450rpx;
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
