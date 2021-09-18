<template>
	<view class="check-team content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" style="height: 100%;">
			<view class="org_box" v-if="orgList.length>0">
				<view class="org_box_list" v-for="(item,index) in orgList" :key="index">
					<view class="org_box_list_left">
						<view class="org_box_list_left_name">{{item.user.realname||item.user.authRealName}}</view>
						<view class="org_box_list_left_person">
							<image class="org_box_list_left_person_icon" src="../../static/phone.png" mode=""></image>
							<text>{{item.user.phone}}</text>
						</view>
					</view>
					<view>
						<view class="org_box_list_right" @tap="lookup(item.record.id,true)">审核通过</view>
						<view class="org_box_list_right org_box_list_right2" style="margin-top: 20rpx;" @tap="lookup(item.record.id,false)">不通过</view>
					</view>
				</view>
			</view>
		</ys-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				page: 0,
				orgList: [],
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.orgList = [];
				this.getDetail();
				setTimeout(()=>{
				    this.$refs.scroll.endRefresh()
				},800)
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getDetail();
			},
			getDetail(){
				this.homeRequest({
					url:'/group/user/list',
					method: 'GET',
					data: {groupId:this.id,pageSize:1000,pageNo:1,},
				}).then(res=>{
					console.log(res);
					res.body.map(item=>{
						if(item.record.status==0){
							this.orgList.push(item)
						}
					})
					if(this.orgList.length==0){
						console.log(1111111111);
						this.$refs.scroll.setLoadStatus('no_data');
					}
				});
			},
			lookup(id,is_pass){
				this.homeRequest({
					url:'/group/user/verify',
					method: 'GET',
					data: {guId:id,pass:is_pass,refuseReason:''},
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.toast('审核成功！')
						this.orgList = []
						this.getDetail()
					}else{
						this.toast(res.message,'none')
					}
				});
			},
		},
	}
</script>

<style lang="scss">
.check-team{
	width: 100%;
	height: 100%;
}
.org_box{
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 90rpx;
}
.org_box_list{
	width: 690rpx;
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 30rpx;
	margin: 30rpx auto 0;
	&_left{
		&_name{
			font-size: 36rpx;
			line-height: 36rpx;
			color: #1B1C1E;
		}
		&_person{
			font-size: 24rpx;
			line-height: 24rpx;
			color: #8B8B9C;
			margin-top: 32rpx;
			display: flex;
			align-items: center;
			&_icon{
				width: 20rpx;
				height: 20rpx;
				margin-right: 6rpx;
			}
		}
	}
	&_right{
		width: 128rpx;
		height: 44rpx;
		border: 1px solid #6952E1;
		opacity: 1;
		border-radius: 28rpx;
		text-align: center;
		line-height: 44rpx;
		font-size: 20rpx;
		color: #6952E1;
	}
	&_right2{
		border: 1px solid rgb(253,112,130);
		color: rgb(253,112,130);
	}
}
</style>
