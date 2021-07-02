<template>
	<view class="comment-list content">
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" class="p10">
			<!-- 评论区 start -->
			<view class="uni-comment" v-for="(item, index) in commentList"  :key="index">
				<view class="uni-comment-list" @click="navToDetailPage(item)">
					<view class="uni-comment-face"><image :src="item.commenterImg || '/static/images/portrait.png'" mode="widthFix" class="portrait"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.contentTitle}}</text>
						</view>
						<view class="uni-comment-content">{{item.text}}</view>
						<view class="uni-comment-reply" v-for="(items,index2) in item.reply" :key="index2"  v-show="!!item.reply">
							<text class="nickname">{{items.name}}：</text>
							<text>{{items.content}}</text>
							<view class="time">回复于·{{items.createTime}}</view>
						</view>
						<view class="uni-comment-date">
							<text>{{item.time}}</text>
						</view>
						<view class="uni-comment-date">
							<text>评论于：{{item.createTime}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论区 end -->
		</ys-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'#fff',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				page: 0,
				commentList: [],
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.commentList = [];
				this.getList(this.page);
				setTimeout(()=>{
				    this.$refs.scroll.endRefresh()
				},800)
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page++
				this.getList(this.page);
			},
			getList(){
				let params = {first:this.page, count:10};
				this.homeRequest({
					url: '/comment/mylist',
					method: 'GET',
					data: params,
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.body.length==0&&this.commentList.length == 0){
							this.$refs.scroll.setLoadStatus('no_data');
						}else{
							this.commentList = this.commentList.concat(res.body)
							if(res.body.length<10){
							  this.$refs.scroll.setLoadStatus('no_more');
							}else{
							  this.$refs.scroll.setLoadStatus('more');
							}
						}
					}else{
						this.toast(res.message,'none')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content{
	width: 100%;
	height: 100%;
}
.p10{
	box-sizing: border-box;
	padding: 28rpx;
	height: 100%;
	width: 100%;
}
/* comment */
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:70upx; height:70upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%; border-radius:100%;}
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#379be9; font-size:30upx;}
.uni-comment-date{line-height:38upx; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1;color: #999; margin-top: 8upx;font-size: 24upx;}
.uni-comment-date view{color:#666666; font-size:24upx; line-height:38upx;}
.uni-comment-content{line-height:1.4em; font-size:26upx; padding:8rpx 0; margin-bottom: 8upx;}
.uni-comment-reply{background: #f2f2f2;line-height:1.4em; font-size:26upx; padding:20upx 20upx; }
.uni-comment-reply .nickname{font-weight: bold;}
.uni-comment-reply .time{ color: #999;font-size: 22upx;padding-top: 8upx;}
.uni-comment-replay-btn{background:#FFF; font-size:24upx; line-height:28upx; padding:5rpx 20upx; border-radius:30upx; color:#333 !important; margin:0 10upx;}
</style>
