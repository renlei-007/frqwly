<template>
	<view class="communication content">
		<view class="communication_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" class="ys_content">
				<view class="uni-comment" v-for="(item, index) in guestList"  :key="index">
					<view class="uni-comment-list">
						<view class="uni-comment-face"><image :src="item.commenterImg || '/static/portrait.png'" mode="widthFix" class="portrait"></image></view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{item.title}}</text>
							</view>
							<view class="uni-comment-content">{{item.content}}</view>
							<view class="uni-comment-img" v-if="item.imgPath.length>0">
								<image v-for="ite in item.imgPath.split(',')" :key="ite" :src="ite" class="uni-comment-img-images" mode=""></image>
							</view>
							<view class="uni-comment-reply" v-if="item.reply">
								<text class="nickname">管理员：</text>
								<text>{{item.reply}}</text>
								<view class="time">回复于·{{item.replayTime}}</view>
							</view>
							<view class="uni-comment-date">
								<text>{{item.createTime}}</text>
							</view>
						</view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="send_box" @tap="tosend">发布留言</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				guestList: [],
				pages: 0,
			};
		},
		onShow() {
			this.pages = 0
			this.guestList = [];
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.guestList = [];
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
			getList(){
				let params = {
					first:this.pages,
					count: 10
				}
				this.homeRequest({
					url: '/guestbook/mylist',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.guestList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.guestList = this.guestList.concat(res.body)
							if(res.body.length<10){
							  this.$refs.scroll.setLoadStatus('no_more');
							}else{
							  this.$refs.scroll.setLoadStatus('more');
							}
						}
					}
				})
			},
			tosend(){
				uni.navigateTo({
					url: './feedback'
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.communication{
	width: 100%;
	height: 100%;
	&_box{
		box-sizing: border-box;
		padding: 30rpx 30rpx 120rpx;
	}
}
.send_box{
	width: 100%;
	height: 90rpx;
	text-align: center;
	line-height: 90rpx;
	font-size: 32rpx;
	color: #FFFFFF;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: rgb(149, 111, 236);
}
/* comment */
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:70upx; height:70upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%; border-radius:100%;}
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#379be9; font-size:30upx;}
.uni-comment-img{width: 100%;display: flex;flex-wrap: wrap;margin-bottom: 10rpx;}
.uni-comment-img-images{width: 100rpx;height: 100rpx;margin-right: 20rpx;}
.uni-comment-date{line-height:38upx; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1;color: #999; margin-top: 8upx;font-size: 24upx;}
.uni-comment-date view{color:#666666; font-size:24upx; line-height:38upx;}
.uni-comment-content{line-height:1.4em; font-size:26upx; padding:8rpx 0; margin-bottom: 8upx;}
.uni-comment-reply{background: #f2f2f2;line-height:1.4em; font-size:26upx; padding:20upx 20upx; }
.uni-comment-reply .nickname{font-weight: bold;}
.uni-comment-reply .time{ color: #999;font-size: 22upx;padding-top: 8upx;}
.uni-comment-replay-btn{background:#FFF; font-size:24upx; line-height:28upx; padding:5rpx 20upx; border-radius:30upx; color:#333 !important; margin:0 10upx;}
</style>
