<template>
	<view class="cultural-encyclopedia content">
		<!-- <view class="search_top">
			<view class="search_top_box">
				<input class="search_top_box_inp" type="text" placeholder="请输入你要搜索的内容" v-model="title" />
				<view class="search_top_box_btn" @tap="getList">搜索</view>
			</view>
		</view> -->
		<view class="top_bac">
			<view class="search_top">
				<view class="search_top_box">
					<view class="search_top_box_write">
						<image class="search_top_box_write_icon" src="/static/search.png" mode=""></image>
						<input class="search_top_box_write_inp" type="text" v-model="title" />
					</view>
					<view class="search_top_box_btn" @tap="tosearch">确认</view>
				</view>
			</view>
		</view>
		<view class="cate_box" style="height: calc(100% - 442rpx)">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="cultural_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="cultural_box_point" v-for="(item,index) in culturalList" :key="index" @tap="todetail(item.id)">
						<image class="cultural_box_point_img" :src="item.titleImg" mode=""></image>
						<view class="cultural_box_point_name">{{item.title}}</view>
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
					background:'none',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				page: 0,
				culturalList: [],
				type: '',
				title: '',
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
				this.culturalList = [];
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
				this.culturalList = [];
				this.getList()
			},
			getList(){
				let params={
					channelIds: 192, count: 10, first: this.page, format:0, s_type_like: this.type, title: '',
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.culturalList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.culturalList = this.culturalList.concat(res.data.body)
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
					channelId : 192,
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
			todetail(id){
				uni.navigateTo({
					url: './cultural-encyclopedia-detail?id='+id
				})
			},
			tosearch(){
				if(!this.title){
					this.toast('请输入内容！')
					return
				}
				this.culturalList = []
				this.getList()
			},
		},
	}
</script>

<style lang="scss">
.cultural-encyclopedia{
	width: 100%;
	height: 100%;
	.top_bac{
		width: 100%;
		height: 442rpx;
		background: url('https://oss.culturalcloud.net/furong/202108/19170307chnn.png') no-repeat center center;
		background-size: 100% 101%;
	}
	.search_top{
		width: 100%;
		height: 144rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 30rpx;
		align-items: center;
		&_box{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&_write{
				background-color: #FFFFFF;
				width: 588rpx;
				height: 64rpx;
				background: #FFFFFF;
				border-radius: 36rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				&_icon{
					width: 35rpx;
					height: 31rpx;
					margin-right: 16rpx;
				}
				&_inp{
					flex: 1;
					font-size: 24rpx;
					color: #000;
					font-weight: 400;
					line-height: 24rpx;
				}
			}
			&_btn{
				width: 68rpx;
				height: 68rpx;
				background: #7965E2;
				border-radius: 50%;
				line-height: 68rpx;
				text-align: center;
				font-size: 24rpx;
				color: #FFFFFF;
			}
		}
	}
	.cultural_box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		&_point{
			width: 328rpx;
			height: 288rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			&_img{
				width: 100%;
				height: 196rpx;
				background: #E5E5E5;
				border-radius: 8rpx 8rpx 0px 0px;
			}
			&_name{
				width: 100%;
				height: 92rpx;
				text-align: center;
				line-height: 92rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
