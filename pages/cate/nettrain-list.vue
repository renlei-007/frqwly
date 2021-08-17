<template>
	<view class="nettrain-list content">
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
				<view class="cultural_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="cultural_box_point" v-for="(item,index) in trainList" :key="index" @tap="todetail(item.id)">
						<image class="cultural_box_point_img" :src="item.titleImg" mode=""></image>
						<view class="cultural_box_point_box">
							<view class="cultural_box_point_box_name">{{item.title}}</view>
							<view class="cultural_box_point_box_time">
								<image src="/static/first_time.png" class="times" mode=""></image>
								<text>{{item.registrationStart}} </text>
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
				cutIndex: 0,
				cutList: [],
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
				page: 0,
				trainList: [],
				type: '',
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
				this.trainList = [];
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
				this.trainList = [];
				this.getList()
			},
			getList(){
				let params={
					channelIds: 133, count: 10, first: this.page, format:0, s_category_like: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.trainList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.trainList = this.trainList.concat(res.data.body)
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			getCateList(){
				let params = {
					channelId : 133,
				}
				let array = []
				this.indexRequest({url:'/model/get',data:params}).then(res=>{
					console.log(res);
					res.data.body.map(item=>{
						if(item.field=='category'){
							array = item.optValue
						}
					})
					array.unshift('全部')
					this.cutList = array
				})
			},
			todetail(id){
				uni.navigateTo({
					url: './nettrain-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
.nettrain-list{
	width: 100%;
	height: 100%;
	.cultural_box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&_point{
			width: 328rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			&_img{
				width: 100%;
				height: 188rpx;
				background: #E5E5E5;
				border-radius: 8rpx 8rpx 0px 0px;
			}
			&_box{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 30rpx 20rpx 15rpx;
				&_name{
					font-size: 28rpx;
					line-height: 40rpx;
					color: #1B1C1E;
					width: 100%;
					// overflow: hidden;
					// text-overflow: ellipsis;
					// white-space: nowrap;
				}
				&_time{
					display: flex;
					margin-top: 10rpx;
					.times{
						width: 24rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
					text{
						font-size: 24rpx;
						font-weight: 400;
						line-height: 24rpx;
						color: #8B8B9C;
					}
				}
			}
		}
	}
}
</style>
