<template>
	<view class="content venues-booking">
		<view class="signin">
			<image class="detail_img" :src="content.titleImg" mode=""></image>
			<view class="detail">
				<rich-text :nodes="content.title"></rich-text>
			</view>
		</view>
		<view class="blank" style="height: 20rpx;"></view>
		<view class="input_box">
			<view class="input_box_tit">填写预约信息</view>
			<view class="input_box_item">
				<view class="input_box_item_name">手机号码</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入手机号码" v-model="phone" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(0)" v-if="channelId!=198">
				<view class="input_box_item_name">预定日期</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请选择日期" disabled v-model="date" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(1)" v-if="channelId!=198">
				<view class="input_box_item_name">预定时段</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="预定时段" disabled v-model="slot" />
				</view>
			</view>
			<view class="input_box_item" v-if="channelId!=198">
				<view class="input_box_item_name">预订联系人</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="预订联系人" v-model="contacts" />
				</view>
			</view>
			<view class="input_box_item" v-if="channelId!=198">
				<view class="input_box_item_name">使用者</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入使用者" v-model="user" />
				</view>
			</view>
			<view class="input_box_item" v-if="channelId!=198">
				<view class="input_box_item_name">预定用途</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="请输入预定用途" v-model="purpose" />
				</view>
			</view>
			<view class="input_box_item input_box_item_more" @tap="selected(2)" v-if="channelId==179">
				<view class="input_box_item_name">选择社团</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" placeholder="选择社团" disabled v-model="team" />
				</view>
			</view>
			<view class="input_box_item" style="height: auto;box-sizing: border-box;padding: 30rpx 0;" v-if="channelId==179">
				<view class="input_box_item_name">选择成员</view>
				<view class="input_box_item_choose">
					<!-- <input type="text" class="inp" placeholder="选择社团" disabled v-model="teammate" /> -->
					<view class="input_box_item_choose_list" v-for="(item,index) in memberList" :key="index">
						<image class="check" @tap="chooseMember(item)" :src="item.isCheck?'/static/check.png':'/static/nocheck.png'" mode=""></image>
						<text>{{item.realname?item.realname:item.username}}</text>
					</view>
				</view>
			</view>
			<view class="input_box_item" v-if="channelId==198">
				<view class="input_box_item_name">最多选座</view>
				<view class="input_box_item_write">
					<input type="text" class="inp" disabled v-model="content.seatSetting.maxScheduled" />
				</view>
			</view>
			<view class="input_box_items" style="border-bottom: none;" v-if="channelId==198">
				<view class="input_box_item_name">选择座位</view>
			</view>
			<view class="choose_seat" v-if="channelId==198" :style="{'height':height+120+'rpx',}">
				<movable-area scale-area  class="movable-area" :style="{'height':(height+60)*2+'rpx','width':'200%'}">
					<movable-view
						:style="{'height':height+60+'rpx','width':width+'rpx',}"
						class="movable-view"
						direction="all"
						:out-of-bounds="true"
						scale="true"
						:x="x"
						:y="y"
						scale-min="0.5"
						scale-max="2"
						:scale-value="scale"
					>
						<view class="screen">
							<view class="screen_box">舞台中央</view>
						</view>
						<view class="choose_seat_box">
							<view class="choose_seat_hover">
								<view class="choose_seat_hover_num" v-for="(item,index) in tipArray" :key="index">
									<text v-show="notSeatArr.indexOf(index)==-1">{{item+1}}</text>
								</view>
							</view>
							<view class="seat_box" :style="{'height':height+'rpx',}">
								<view class="seat_box_row" v-for="(item,index) in seatArray" :key="index">
									<view class="seat_box_row_col" v-for="(ite,ind) in item" :key="ind">
										<view class="seat_can" style="background-color: #fff;" v-if="ite==0" @tap="chooseSet(index,ind)"></view>
										<view class="seat_no" style="background-color: rgb(199,62,44);" v-if="ite==2"></view>
										<view class="seat_choose" style="background-color: rgb(63,174,73);" v-if="ite==3" @tap="chooseSet(index,ind)"></view>
										<view class="kong" style="border: none;" v-if="ite==-1"></view>
										<!-- <image src="/static/seat_can.png" v-if="ite==0" mode="" @tap="chooseSet(index,ind)"></image>
										<image src="/static/seat_no.png" v-if="ite==2" mode=""></image>
										<image src="/static/seat_choose.png" v-if="ite==3" mode="" @tap="chooseSet(index,ind)"></image>
										<image src="" v-show="ite==-1" mode=""></image> -->
									</view>
								</view>
							</view>
						</view>
					</movable-view>
				</movable-area>
			</view>
			<view class="input_box_item" style="height: auto;box-sizing: border-box;padding: 30rpx 0;" v-if="channelId==198">
				<view class="input_box_item_name">选择座位</view>
				<view class="input_box_item_choose" style="width: calc(100% - 180rpx);">
					<view class="input_box_item_choose_list" v-for="(item,index) in seatsList" :key="index">{{item.name}}</view>
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="200" v-model="remark" placeholder="备注"></textarea>
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
				content: {
					seatSetting: {
						seatArray: [],
					}
				},
				date: '',
				dateList: [],
				slot: '',
				slotList: [],
				num: '',
				ticketList: [],
				phone: '',
				contacts: '',
				user: '',
				purpose: '',
				startDate: '',
				endDate: '',
				team: '',
				teammate: '',
				bookingDates: [],
				remark: '',
				
				scale: 1,
				x: 0,
				y: 0,
				seatArray: [],
				maxTicket: 0,
				seatsList: [],
				chooseSets: [],
				
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
				dateIndex: 0,
				teamList: [],
				memberList: [],
				channelId: '',
				notSeatArr: [],
				tipArray: [],
				height: '',
				width: '',
			};
		},
		computed: {
			maxScheduled(){
				let array = []
				this.seatArray.map((item,index)=>{
					array.push([])
					let num = 0
					let is_reduce = false
					item.map((ite,ind)=>{
						array[index].push(index+1+'-'+(ind+1))
						if(ite==-1){
							num++
							console.log(num,ind);
						}else{
							is_reduce = true
						}
						array[index][ind] = index+1+'-'+(ind+1-num)
						if(!is_reduce&&ind==(item.length-1)){
							array[index][ind] = index+'-'+(ind+1-num)
						}
					})
				})
				return array
				
			},
			// height(){
			// 	return this.seatArray.length*40+60
			// },
		},
		onLoad(e) {
			this.id = e.id
			this.channelId = e.channelId
			this.getDetail()
			if(e.channelId==179){
				this.getTeam()
			}
			this.userInfo = uni.getStorageSync('user_info')
			if(this.userInfo.phone){
				this.phone = this.userInfo.phone
			}else{
				this.phone = this.userInfo.authPhone
			}
		},
		methods: {
			chooseSet(value,ind){
				console.log(ind);
				if(this.seatArray[value][ind]==0){
					let num = 0
					let colArr = []
					this.seatArray.map((item,index)=>{
						item.map((ite,e)=>{
							if(ite==3){
								num++
							}
							if(index==value&&ite==-1){
								colArr.push(e)
							}
						})
					})
					if(num==this.maxTicket){
						this.toast('最多可预定'+this.maxTicket+'张,点击已选座位可取消！','none')
						return
					}
					let _val = ind+1
					console.log(ind);
					colArr.map(item=>{
						if(ind>item){
							console.log(_val);
							_val--
						}
					})
					this.seatsList.push({index:value+'-'+ind,name:this.tipArray[value]+1+'排'+(_val)+'座'})
					this.$set(this.seatArray[value],ind,3)
					console.log(this.notSeatArr);
				}else{
					this.seatsList.map((item,x)=>{
						if(item.index==value+'-'+ind){
							this.seatsList.splice(x,1)
						}
					})
					this.$set(this.seatArray[value],ind,0)
				}
			},
			selected(val){//调起选择器组件
				this.Index = val
				if(val==0){
					this.pickTitle='选择时间'
					this.$refs.ysPicker.showModal('radio', this.dateList)
				}else if(val==1){
					this.pickTitle='选择时间'
					if(this.date){
						let array = []
						this.bookingDates[this.dateIndex].slots.map(item=>{
							array.push(item.slot)
						})
						this.$refs.ysPicker.showModal('radio', array)
					}else{
						this.toast('请先选择日期!','none')
					}
				}else if(val==2){
					this.pickTitle='选择社团'
					let arr = []
					this.teamList.map(item=>{
						arr.push(item.group.content.title)
					})
					this.$refs.ysPicker.showModal('radio', arr)
				}else if(val == 3){
					this.pickTitle = '选择成员'
					let arr = []
					this.memberList.map(item=>{
						if(item.realname){
							arr.push(item.realname)
						}else{
							arr.push(item.username)
						}
					})
					this.$refs.ysPicker.showModal('radio', arr)
				}
			},
			callPicker(res) {
				console.log(res);
				if(this.Index == 0){
					this.date = res.value[0].split('(')[0]
					this.dateIndex = res.index[0]
				}else if(this.Index == 1){
					this.slot = res.value[0]
				}else if(this.Index == 2){
					this.team = res.value[0]
					let val = res.index[0]
					this.getMember(val)
				}else if(this.Index == 3){
					this.teammate = res.value[0]
				}
			},
			getMember(val){
				this.memberList = this.teamList[val].userList
			},
			chooseMember(item){
				item.isCheck=!item.isCheck
			},
			getDetail(){
				let params = {
					format: 0,
					// contentId: this.id
				}
				let url
				if(this.channelId==198){
					url = '/content/get.jspx'
					params.id = this.id
				}else{
					url = '/bookings/content'
					params.contentId = this.id
				}
				this.indexRequest({url:url,data:params}).then(res=>{
					var content = res.data.body;
					this.content = content;
					if(this.channelId==198){
						this.seatArray = content.seatSetting.seatArray
						let maxArr = []
						content.seatSetting.seatArray.map(item=>{
							maxArr.push(item.length)
						})
						let maxNum = Math.max(...maxArr)
						console.log(maxNum);
						console.log((690/(maxNum*40+50)).toFixed(1))
						this.scale = 690/(maxNum*40+50)>1?1:(690/(maxNum*40+50)).toFixed(1)
						this.height = content.seatSetting.seatArray.length*40
						this.width = maxNum*40+50
						console.log(this.height);
						this.maxTicket = content.seatSetting.maxScheduled
						res.data.body.seatSetting.seatArray.map((item,index)=>{
							this.tipArray.push(index)
							let _num = 0
							let is_reduce = false
							item.map(ite=>{
								if(ite!=-1){
									is_reduce = true
								}
							})
							if(!is_reduce){
								this.notSeatArr.push(index)
							}
						})
						this.notSeatArr.map((item,index)=>{
							let val = 10000
							this.tipArray.map((ite,ind)=>{
								if(item==ite){
									val = item
									return
								}
								if(ind>val){
									this.tipArray[ind] = this.tipArray[ind]-1
								}
							})
						})
					}
					if(this.channelId!=198){
						res.data.body.bookingDates.map((item,index)=>{
							let canBooking = false
							item.slots.map((ite,ind)=>{
								if(ite.canBooking&&!ite.isBooking&&!canBooking&&!ite.isFull){
									this.dateList.push(item.showDate+'('+item.week+')')
									canBooking = true
									this.bookingDates.push(item)
								}
							})
						})
					}
				})
			},
			submit(){
				let date,year,month,day
				year = new Date().getFullYear()
				day = this.date.split('.')
				date = year+'-'+day[0]+'-'+day[1]
				let params
				let url,ids
				if(this.channelId!=198){
					if(!this.date){
						this.toast('请选择时间!','none')
						return
					}
					if(!this.slot){
						this.toast('请选择时段!','none')
						return
					}
					if(!this.phone){
						this.toast('请输入号码！','none')
						return
					}
					if(!this.contacts){
						this.toast('请输入预定联系人！','none')
						return
					}
				}
				if(this.channelId == 179){
					url = '/bookings/add_group'
					let arr = []
					this.memberList.map(item=>{
						if(item.isCheck){
							arr.push(item.id)
						}
					})
					ids = arr.toString()
					params = {
						contentId: this.id,
						bookingDate: date,
						slot: this.slot,
						phone: this.phone,
						contact: this.contacts,
						userName: this.user,
						purpose: this.purpose,
						remark: this.remark,
						ids: ids
					}
				}else if(this.channelId==198){
					url = '/theatre/add'
					let arr = []
					this.seatsList.map(item=>{
						arr.push(item.index)
					})
					params = {
						contentId: this.id,
						phone: this.phone,
						remark: this.remark,
						seats: arr.toString()
					}
					
				}else{
					url = '/bookings/add'
					params = {
						contentId: this.id,
						bookingDate: date,
						slot: this.slot,
						phone: this.phone,
						contact: this.contacts,
						userName: this.user,
						purpose: this.purpose,
						remark: this.remark,
					}
				}
				this.homeRequest({
					url: url,
					method: 'POST',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.toast('预约成功')
						setTimeout(()=>{
							uni.navigateBack({
								delta: 3
							})
						},1000)
					}else{
						this.toast(res.message,'none')
					}
				})
			},
			getTeam(){
				this.homeRequest({
					url:'/bookings/check_group',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						res.body.map(item=>{
							item.userList.map(ite=>{
								this.$set(ite,'isCheck',false)
								// ite.isCheck = false
							})
						})
						this.teamList = res.body
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
	overflow: auto;
}
.venues-booking{
	width: 100%;
	height: auto;
	background-color: #FFFFFF;
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
			&_choose{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				&_list{
					box-sizing: border-box;
					padding-right: 30rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					.check{
						width: 40rpx;
						height: 40rpx;
						margin-right: 7rpx;
					}
				}
			}
			.points{
				width: 38rpx;
				height: 46rpx;
				font-size: 28rpx;
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
		.choose_seat{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 0;
			background-color: rgba(225,227,230,0.3);
			// background-color: #ccc;
			overflow: auto;
			.movable-area{
				width: 100%;
				height: 100%;
				overflow: auto;
				// margin-left: -200px;
				// margin-top: -200px;
				.movable-view{
					width: 100%;
					height: 100%;
					// display: flex;
					position: relative;
					transform: translateX(100rpx) translateY(100rpx);
					.screen{
						width: 100%;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 20rpx;
						&_box{
							width: 200rpx;
							text-align: center;
							height: 36rpx;
							line-height: 36rpx;
							font-size: 28rpx;
							color: rgba(0,0,0,0.3);
							// border: 1px solid #000;
						}
					}
					.choose_seat_box{
						display: flex;
						.choose_seat_hover{
							color: rgba(0,0,0,0.3);
							width: auto;
							text-align: center;
							&_num{
								width: 50rpx;
								height: 40rpx;
								line-height: 40rpx;
								font-size: 24rpx;
							}
						}
						.seat_box{
							height: 500rpx;
							&_row{
								width: 100%;
								height: 40rpx;
								display: flex;
								&_col{
									min-width: 40rpx;
									height: 40rpx;
									box-sizing: border-box;
									padding: 5rpx;
									view{
										width: 30rpx;
										height: 30rpx;
										border: 1rpx solid #ccc;
										border-radius: 6rpx;
									}
									image{
										width: 30rpx;
										height: 30rpx;
									}
									text{
										font-size: 24rpx;
										display: block;
										line-height: 24rpx;
									}
								}
							}
						}
					}
				}
			}
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
