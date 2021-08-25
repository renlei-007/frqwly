<template>
	<view class="active-list content">
		<view class="cutbox">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(index,item)">{{cutText(item)}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="cate_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="actives_point" v-for="(item,index) in activeList" :key="index" @tap="todetail(item.id)">
						<image v-if="item.titleImg" class="actives_point_img" :src="item.titleImg" mode=""></image>
						<image v-else class="actives_point_img" src="/static/default.png" mode=""></image>
						<view class="actives_point_info" :class="{active_s:item.ticketingSetting.status==1}">
							<view class="actives_point_info_name">{{item.title}}</view>
							<view class="actives_point_info_position">
								<!-- <image src="/static/position.png" class="actives_point_info_position_icon" mode=""></image> -->
								<view class="actives_point_info_position_txt">{{item.attr_address}}</view>
							</view>
							<view class="actives_point_info_piao">余票{{item.ticketingSetting.status == 0?item.ticketingSetting.num -item.ticketingSetting.currentNum:0}}</view>
							<view class="is_coming" v-if='item.ticketingSetting.status == 0'>可预约</view>
							<view class="is_coming" v-if='item.ticketingSetting.status == 1'>即将开始</view>
							<view class="is_coming" v-if='item.ticketingSetting.status == 2'>已结束</view>
							<view class="is_coming" v-if='item.ticketingSetting.status == 4'>直接前往</view>
							<view class="is_coming" v-if='item.ticketingSetting.status == 5'>人数已满</view>
						</view>
					</view>
				</view>
			</ys-scroll>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cutIndex: 0,
				cutList: [],
				activeList: [],
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				type: '',
				page: 0,
			};
		},
		onLoad(e) {
			if(e.type){
				this.type = e.type
			}
			this.getCateList()
			this.getList()
		},
		methods: {
			cutText(item){
				if(item.indexOf('活动')!==-1){
					return item.slice(0,item.indexOf('活动'))
				}else{
					return item
				}
			},
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.activeList = [];
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
			changeTab(index,item){
				if(this.cutIndex!=index){
					this.cutIndex = index
					this.type = item
				}
				if(index==0){
					this.type = ''
				}
				this.page = 0;
				this.activeList = [];
				this.getList()
			},
			getCateList(){
				let params = {
					channelId : 116,
				}
				let array = []
				this.indexRequest({url:'/model/get',data:params}).then(res=>{
					console.log(res);
					res.data.body.map(item=>{
						if(item.field=='type'){
							array = item.optValue
						}
					})
					array.unshift('全部')
					this.cutList = array
					this.cutList.map((item,index)=>{
						if(item==this.type){
							this.cutIndex = index
						}
					})
				})
			},
			getList(){
				let params={
					channelIds: 116, count: 10, first: this.page, format:0, s_type_like: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.activeList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.activeList = this.activeList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			todetail(id){
				uni.navigateTo({
					url: '/pages/cate/active-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #F2F5FA;
}
.active-list{
	width: 100%;
	height: 100%;
}
.actives_point_info{
	padding-bottom: 70rpx !important;
}
.is_coming{
	position: absolute;
	bottom: 20rpx;
	right: 10rpx;
	height: 42rpx;
	background: #FF3616;
	border-radius: 10rpx;
	text-align: center;
	line-height: 42rpx;
	font-size: 22rpx;
	color: #FFFFFF;
	box-sizing: border-box;
	padding: 0 20rpx;
}
</style>
