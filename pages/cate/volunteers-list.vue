<template>
	<view class="volunteers-list content">
		<view class="cate_box" style="height: 100%;">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box">
					<view class="scenic_point" v-for="(item,index) in teersList" :key="index">
						<view class="bacImg">
							<image class="scenic_point_img" :src="item.titleImg" mode="" @tap="todetail(item.id)"></image>
						</view>
						<view class="scenic_point_info">
							<view class="scenic_point_info_name">{{item.stitle}}</view>
							<view class="scenic_point_info_position">
								<view class="scenic_point_info_position_txt" style="width: 100%;">截止时间:{{endDate(item)}}</view>
							</view>
							<view class="scenic_point_info_position">
								<image src="/static/personcount.png" style="width: 24rpx;height: 24rpx;" class="scenic_point_info_position_icon" mode=""></image>
								<view class="scenic_point_info_position_txt">人数:{{item.quota}}</view>
							</view>
						</view>
					</view>
				</view>
			</ys-scroll>			
		</view>
		<view class="join_box" v-if="checkCode==101||checkCode==365||checkCode==362">
			<view class="join_box_btn" v-if="checkCode==101" @tap="toJoin">成为志愿者</view>
			<view class="join_box_btn " v-if="checkCode==365">审核中</view>
			<view class="join_box_btn" v-if="checkCode==362" @tap="toJoin">审核不通过,重新申请</view>
		</view>
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
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				type: '',
				page: 0,
				teersList: [],
				isJoin: false,
				is_login: false,
				checkCode: 0,
			};
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			this.is_login = this.isLogin
			if(this.isLogin){
				this.getStatus()
			}
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.teersList = [];
				this.getList();
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
				this.getList();
			},
			getStatus(){
				this.homeRequest({url:'/volunteerInfo/check',method:'GET',data:{}}).then(res=>{
					console.log(res);
					this.checkCode = res.code
				})
			},
			toJoin(){
				if(this.isLogin){
					uni.navigateTo({
						url: '/pages/cate/volunteers-booking'
					})
				}else{
					uni.showModal({
						title: "提示",
						content: "您还未登录，确定先登录吗？",
						showCancel: true,
						confirmText: "确定",
						success: (res)=>{
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?is_thing='+true
								})
							} else if (res.cancel) {
							}
						}
					})
				}
			},
			getList(){
				let params={
					channelIds: 127, count: 10, first: this.page, format:0,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.teersList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.teersList = this.teersList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			endDate(item){
				if(item && item.registrationEnd){
						return item.registrationEnd.substring(0,10);
				}else{
					return "长期";
				}
			},
			todetail(id){
				uni.navigateTo({
					url: './volunteers-detail?id='+id+'&&channelIds=127'
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #F2F5FA;
}
.volunteers-list{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 30rpx 100rpx;
}
.join_box{
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: rgb(104, 81, 226);
	&_btn{
		width: 100%;
		height: 100%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
	}
}
</style>
