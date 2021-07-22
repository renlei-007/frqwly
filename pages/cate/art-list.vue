<template>
	<view class="art-list content">
		<view class="cutbox">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(index,item)">{{item}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="cate_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="actives_point" v-for="(item,index) in artList" :key="index">
						<image class="actives_point_img" :src="item.titleImg" mode="" @tap="todetail(item.id)"></image>
						<view class="actives_point_info">
							<view class="actives_point_info_name">{{item.title}}</view>
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
				artList: [],
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
				orderBy: 4,
			};
		},
		onLoad() {
			this.getCateList()
			this.getList()
		},
		methods: {
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
					this.orderBy = ''
				}
				if(index==0){
					this.type = ''
					this.orderBy = 4
				}
				this.page = 0;
				this.artList = [];
				this.getList()
			},
			getCateList(){
				let params = {
					channelId : 114,
				}
				let array = []
				this.indexRequest({url:'/model/get',data:params}).then(res=>{
					res.data.body.map(item=>{
						if(item.field=='category'){
							array = item.optValue
						}
					})
					array.unshift('全部')
					this.cutList = array
				})
			},
			getList(){
				let params={
					channelIds: 114, count: 10, first: this.page, format:0, s_category: this.type, orderBy: this.orderBy,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.artList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.artList = this.artList.concat(res.data.body)
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
					url: '/pages/cate/art-expert?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
.art-list{
	width: 100%;
	height: 100%;
}
</style>
