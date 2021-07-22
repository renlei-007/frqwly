<template>
	<view class="comment-list content">
		<view class="mess_box">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" class="ys_content">
				<view class="mess_li" v-for="(item,index) in commentList" :key="index" @tap="toDetail(item)">
					<view class="mess_li_time">{{item.createTime}}</view>
					<view class="mess_li_title">{{item.text}}</view>
					<view class="mess_li_detail">{{item.commenterUsername}}评论内容</view>
				</view>
			</ys-scroll>
		</view>
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
			toDetail(item){
				
			},
		}
	}
</script>

<style lang="scss">
.content{
	width: 100%;
	height: 100%;
}
.mess_box{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	.mess_li{
		width: 100%;
		background: #FFFFFF;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding: 30rpx;
		margin-top: 30rpx;
		&_time{
			font-size: 24rpx;
			line-height: 24rpx;
			color: #8B8B9C;
		}
		&_title{
			font-size: 36rpx;
			line-height: 80rpx;
			color: #1B1C1E;
		}
		&_detail{
			font-size: 24rpx;
			line-height: 36rpx;
			color: #8B8B9C;
		}
	}
}
</style>
