<template>
	<view class="mooc content">
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
				<view class="mooc_box" style="box-sizing: border-box;padding: 0 30rpx;">
					<view class="mooc_box_point" v-for="(item,index) in moocList" :key="index">
						<image class="mooc_box_point_img" :src="item.titleImg" mode="" @tap="todetail(item.id)"></image>
						<view class="mooc_box_point_info">
							<view class="mooc_box_point_info_name">{{item.title}}</view>
							<view class="mooc_box_point_info_mess">
								<view class="mooc_box_point_info_mess_label">
									<view class="mooc_box_point_info_mess_label_item" v-for="(ite,ind) in item.attr_system" :key="ind">{{ite}}</view>
								</view>
								<view class="mooc_box_point_info_mess_view">
									<!-- <image src="" mode=""></image> -->
									<text>{{item.views}}</text>
								</view>
							</view>
							<!-- <view class="actives_point_info_name">{{item.title}}</view>
							<view class="actives_point_info_position">
								<view class="actives_point_info_position_txt">{{item.attr_address}}</view>
							</view> -->
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
				page: 0,
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				moocList: [],
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
				this.moocList = [];
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
				this.moocList = [];
				this.getList()
			},
			getList(){
				let params={
					channelIds: 191, count: 10, first: this.page, format:0, s_subject_like: this.type,
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					if(res.data.body.length==0&&this.moocList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.moocList = this.moocList.concat(res.data.body)
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
					channelId : 191,
				}
				let array = []
				this.indexRequest({url:'/model/get',data:params}).then(res=>{
					console.log(res);
					res.data.body.map(item=>{
						if(item.field=='subject'){
							array = item.optValue
						}
					})
					array.unshift('全部')
					this.cutList = array
				})
			},
			todetail(id){
				uni.navigateTo({
					url: '/pages/cate/mooc-detail?id='+id
				})
			},
		}
	}
</script>

<style lang="scss">
.mooc{
	width: 100%;
	height: 100%;
	background-color: #F9FAFE;
	.mooc_box{
		background-color: #F9FAFE;
		&_point{
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			position: relative;
			&_img{
				width: 690rpx;
				height: 414rpx;
			}
			&_info{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 20rpx 20rpx;
				&_name{
					width: 100%;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
					color: #1B1C1E;
				}
				&_mess{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					&_label{
						width: 75%;
						display: flex;
						flex-wrap: wrap;
						&_item{
							height: 34rpx;
							background: rgb(255,217,217);
							border-radius: 8rpx;
							box-sizing: border-box;
							padding: 0 12rpx;
							line-height: 34rpx;
							font-size: 18rpx;
							font-weight: 400;
							color: #FF6868;
							margin-right: 32rpx;
						}
					}
					&_view{
						display: flex;
						font-size: 24rpx;
						color: #8B8B9C;
					}
				}
				&_position{
					display: flex;
					margin-top: 16rpx;
					&_icon{
						width: 21rpx;
						height: 25rpx;
						margin-right: 8rpx;
						display: inline-block;
					}
					&_txt{
						background: url(../../static/position.png) no-repeat;
						background-size: 21rpx 25rpx;
						background-position: 0 9rpx;
						text-indent: 1rem;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 40rpx;
						color: #8B8B9C;
					}
				}
			}
		}
	}
}
</style>
