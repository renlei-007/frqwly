<template>
	<view class="venues-list content">
		<view class="cutbox">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(index,item)">{{item.name}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="cate_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="scenic_point" v-for="(item,index) in venuesList" :key="index" @tap="todetail(item.id)">
						<view class="bacImg" style="width: 328rpx;height: 188rpx;">
							<image class="scenic_point_img" :src="item.titleImg" mode=""></image>
						</view>
						<view class="scenic_point_info">
							<view class="scenic_point_info_name">{{item.stitle}}</view>
							<view class="scenic_point_info_position">
								<image src="/static/position.png" class="scenic_point_info_position_icon" mode=""></image>
								<view class="scenic_point_info_position_txt">{{item.attr_address}}</view>
							</view>
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
				cutList: [{
					id: '179',
					name: '文化馆'
				},{
					id: '198',
					name: '芙蓉剧场'
				},{
					id: '180',
					name: '图书馆'
				},{
					id: '185',
					name: '体育场馆'
				},{
					id: '183',
					name: '镇街综合文化站'
				},{
					id: '184',
					name: '和平馆'
				},],
				venuesList: [],
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
				cutIndex: 0,
				type: '',
				page: 0,
			};
		},
		onLoad(e) {
			if(e.title){
				switch (e.title) {
					case '文化馆':
						this.cutIndex = 0
						break
					case '图书馆':
						this.cutIndex = 2
						break
					case '体育馆':
						this.cutIndex = 3
						break
				}
			}
			// this.getCateList()
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.venuesList = [];
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
				}
				// if(index==0){
				// 	this.type = ''
				// }
				this.page = 0;
				this.venuesList = [];
				this.getList()
			},
			getCateList(){
				let params = {
					channelId : 117,
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
				})
			},
			getList(){
				let params={
					channelIds: this.cutList[this.cutIndex].id, count: 10, first: this.page, format:0, s_type: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.venuesList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.venuesList = this.venuesList.concat(res.data.body)
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
					url: '/pages/cate/venues-detail?id='+id+'&&channelId='+this.cutList[this.cutIndex].id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #F2F5FA;
}
.venues-list{
	width: 100%;
	height: 100%;
}
</style>
