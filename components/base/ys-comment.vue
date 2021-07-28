<template>
	<view class="ys-comment" @touchmove.stop.prevent="moveHandle">
		<view class="comment_area">
			<view class="comment_area_drop">
				<image class="comment_area_drop_icon" src="/static/drop.png" mode="" @tap="close"></image>
			</view>
			<view class="comment_part">
				<view class="comment_part_name">评论</view>
				<view class="comment_box">
					<ys-scroll :param="param" ref="scroll" @refresh="refresh" @loadMore = "loadMore">
						<view class="comment_list" v-for="(item,index) in commentList" :key="index">
							<view class="comment_list_left">
								<image class="comment_list_left_avatar" :src="item.commenterImg?item.commenterImg:'/static/user.png'" mode=""></image>
							</view>
							<view class="comment_list_center">
								<view class="comment_list_center_name">{{item.commenterRealname?item.commenterRealname:item.commenterUsername}}</view>
								<view class="comment_list_center_detail">{{item.text}}</view>
							</view>
						</view>
					</ys-scroll>
				</view>
			</view>
			<view class="comment_area_send">
				<input class="comment_area_send_input" placeholder="说点什么吧..." type="text" v-model="text" />
				<view class="comment_area_send_btn" @tap="send">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
				param:{//滚动区域配置
					scroll_y:true,
					background:'#ffffff',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
			};
		},
		props: {
			ids: [Array,String],
			commentList: {
				type: Array,
				default: ()=>{
					return [{
						commenterImg: require('../../static/user.png'),
						commenterRealname: 'xxxx',
						text: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
						ups: 20,
					},{
						commenterImg: require('../../static/user.png'),
						commenterRealname: 'xxxx',
						text: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
						ups: 0,
					},{
						commenterImg: require('../../static/user.png'),
						commenterRealname: 'xxxx',
						text: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
						ups: 20,
					},{
						commenterImg: require('../../static/user.png'),
						commenterRealname: 'xxxx',
						text: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
						ups: 0,
					},]
				}
			}
		},
		mounted() {
			console.log(this.ids);
			if(this.commentList.length==0){
				this.$refs.scroll.setLoadStatus('no_data');
				console.log(222222222);
			}
		},
		watch: {
			// commentList(newVal,oldVal){
			// 	if(newVal.length==0){
			// 		this.$refs.scroll.setLoadStatus('no_data');
			// 	}
			// },
		},
		methods: {
			moveHandle(){
				return false
			},
			refresh(){
				this.$emit('refresh')
				setTimeout(()=>{
				    this.$refs.scroll.endRefresh()
				},800)
			},
			loadMore(){
				this.$emit('loadMore')
			},
			close(){
				this.$emit('close')
			},
			send(){
				if(!this.isLogin){
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
				}else{
					if(!this.text){
						this.toast('请输入评论内容','none')
					}else{
						this.homeRequest({
							url: '/comment/save',
							method: 'GET',
							data: {contentId: this.ids, text: this.text},
						}).then(res=>{
							console.log(res);
							if(res.code==201){
								this.toast('评论成功！等待审核中~')
								this.refresh()
							}else{
								this.toast(res.message,'none')
							}
						})
					}
				}
			},
		},
	}
</script>

<style lang="scss">
.ys-comment{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.7);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10000;
	.comment_area{
		width: 100%;
		height: 800rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		&_drop{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			&_icon{
				width: 48rpx;
				height: 48rpx;
			}
		}
		&_send{
			width: 100%;
			height: 150rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 30rpx;
			align-items: center;
			box-shadow: 0px 2px 4px #000;
			&_input{
				width: 500rpx;
				height: 80rpx;
				border-bottom: 1px solid #ccc;
				font-size: 24rpx;
				line-height: 80rpx;
				box-sizing: border-box;
				text-indent: 1rem;
				// border-radius: 40rpx;
				color: #43474E;
			}
			&_btn{
				font-size: 36rpx;
				line-height: 36rpx;
				color: #43474E;
				margin-right: 20rpx;
			}
		}
		.comment_part{
			width: 100%;
			height: calc(100% - 250rpx);
			box-sizing: border-box;
			padding: 0 60rpx;
			&_name{
				font-size: 40rpx;
				line-height: 40rpx;
				color: #1B1C1E;
				box-sizing: border-box;
				padding-bottom: 20rpx;
			}
			.comment_box{
				width: 100%;
				height: calc(100% - 60rpx);
				.comment_list{
					width: 100%;
					display: flex;
					box-sizing: border-box;
					padding: 30rpx 0;
					border-bottom: 1px dashed #ccc;
					&_left_avatar{
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
					&_right{
						display: flex;
						flex-direction: column;
						align-items: center;
						text-align: center;
						width: 60rpx;
						image{
							width: 30rpx;
							height: 28rpx;
						}
						text{
							font-size: 22rpx;
							line-height: 22rpx;
							margin-top: 16rpx;
							color: #ccc;
						}
					}
					&_center{
						width: calc(100% - 160rpx);
						margin-right: 20rpx;
						&_name{
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: #1B1C1E;
						}
						&_detail{
							font-size: 24rpx;
							line-height: 36rpx;
							color: #1B1C1E;
							display: block;
							word-wrap:break-word
						}
					}
				}
			}
		}
	}
}
</style>
