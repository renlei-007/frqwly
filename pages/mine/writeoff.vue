<template>
	<view class="writeoff content">
		<view class="box_show">
			<view class="title">预定详情</view>
			<view class="info" v-if="type == 1">
				<view><rich-text :nodes="record.record.content.title"></rich-text></view>
				<view>订单号：{{record.orderNo}}</view>
				<view>预订时间：{{record.record.bookingDate}}</view>
				<view>预订时段：{{record.record.slot}}</view>
				<view>预定电话：{{record.record.phone}}</view>
				<view>预定用户：{{record.record.user.authName || record.record.user.name}}</view>
			</view>
			<view class="info" v-if="type == 2">
				<view><rich-text :nodes="record.content.title"></rich-text></view>
				<view>预订时间：{{record.bookingDate}}</view>
				<view>预订时段：{{record.slot}}</view>
				<view>预定用户：{{record.user.authName || record.user.name}}</view>
				<view>预定电话：{{record.phone}}</view>
				<view>联系人：{{record.contact}}</view>
				<view>使用者：{{record.userName}}</view>
				<view>场馆地址：{{record.content.attr_address}}</view>
				<view>场馆电话：{{record.content.attr_phone}}</view>
			</view>
			<view class="info" v-if="type == 5">
				<view>编号：{{record.id}}</view>
				<view><rich-text :nodes="record.content.title"></rich-text></view>
				<view>预定电话：{{record.phone}}</view>
				<view>预定用户：{{record.user.authName || record.user.name}}</view>
				<view>报名时间：{{record.createTime}}</view>
				<view>已上课时：<text style="color: #FF1616;">{{record.count}}</text></view>
				<view>上课时间：{{record.content.attr_startTime}}至{{record.content.attr_endTime}}</view>
				<view>培训地址：{{record.content.attr_address}}</view>
			</view>
			<view class="info" v-if="type == 6">
				<view>编号：{{record.id}}</view>
				<view><rich-text :nodes="record.content.title"></rich-text></view>
				<view>预定电话：{{record.phone}}</view>
				<view>预定时间：{{record.createTime}}</view>
				<view>预定用户：{{record.user.authName || record.user.name}}</view>
				<view>服务时间：<text>{{record.content.attr_startTime}}</text>至<text>{{record.content.attr_endTime}}</text></view>
			</view>
		</view>
		<view class="page-bottom" @click="writeoff" v-if="canWriteoff">确认核销</view>
		<view class="page-bottom" v-else>订单已核销或已过期</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				record: {
					content:{},
				},
				type: 0,
				value: null,
				canWriteoff: false,
			};
		},
		onLoad(options){
			this.type = options.type;
			this.value = options.value;
			this.getDetail()
		},
		methods: {
			formatTime(item){
				if(item && item.content && item.attr_startTime){
					return record.content.attr_startTime.substring(0, 10);
				}
				if(item && item.content && item.attr_endTime){
					return record.content.attr_endTime.substring(0, 10);
				}
			},
			getDetail(){
				let params = {}
				let url = ''
				if(this.type == 1){//活动核销
					params.orderNo = this.value
					url = '/ticket/orderDetail'
				}else if(this.type == 2){//场馆核销
					params.recordId = this.value
					url = '/bookings/detail'
				}else if(this.type == 5){//培训核销
					params.recordId = this.value
					url = '/train/detail'
				}else if(this.type == 6){//自愿活动核销
					params.recordId = this.value
					url = '/volunteer/detail'
				}
				this.homeRequest({
					url: url,
					data: params,
				}).then(res=>{
					if(res.code==200){
						this.record = res.body;
						if(this.type == 1){
							this.canWriteoff = (this.record.status == 0)?true: false;
						}else{
							this.canWriteoff = (this.record.status == 1)?true: false;
						}
					}else{
						this.toast(res.message,'none')
					}
				})
			},
			writeoff(){
				let params = {}
				let url = ''
				if(this.type == 1){//活动核销
					params.orderNo = this.value
					url = '/ticketing_record/writeOff'
				}else if(this.type == 2){//场馆核销
					params.recordId = this.value
					url = '/booking_record/writeoff'
				}else if(this.type == 5){//培训核销
					params.ids = this.value
					url = '/train_record/writeoff'
				}else if(this.type == 6){//自愿活动核销
					params.recordId = this.value
					url = '/volunteer/writeoff'
				}
				this.adminGet({
					url: url,
					data: params,
				}).then(res=>{
					if(res.code==200){
						this.toast('核销成功！')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
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
.writeoff{
	width: 100%;
	height: 100%;
	.box_show{
		box-sizing: border-box;
		padding: 30rpx;
		.title{
			text-align: center;
			font-size: 28rpx;
			line-height: 50rpx;
			font-weight: bold;
		}
		.info{
			font-size: 28rpx;
			text-align: left;
			view{
				line-height: 50rpx;
			}
		}
	}
	.page-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
		font-size: 32rpx;
		background-color: #6851E2;
	}
}
</style>
