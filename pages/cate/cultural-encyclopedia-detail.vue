<template>
	<view class="cultural-encyclopedia-detail content">
		<view class="major">
			<view class="major_img">
				<image class="major_imgs" :src="content.titleImg" mode=""></image>
			</view>
			<view class="major_box">
				<view class="major_box_name">{{content.title}}</view>
				<view class="major_box_text">
					类别：<text>{{content.attr_type&&content.attr_type.length>0?content.attr_type[0]:'暂无'}}</text>
				</view>
				<view class="major_box_text">
					级别：<text>{{content.attr_level?content.attr_level:'暂无'}}</text>
				</view>
				<view class="major_box_text">
					批次：<text>{{content.attr_batch?content.attr_batch:'暂无'}}</text>
				</view>
				<view class="major_box_text">
					代表人：<text></text>
				</view>
				<view class="major_box_text">
					地址：<text>{{content.attr_address?content.attr_address:'暂无'}}</text>
				</view>
			</view>
			<view class="blank"></view>
			<view class="tj_active">
				<view class="tj_active_title">非遗详情</view>
				<view class="introduce">
					<rich-text :nodes="content.txt"></rich-text>
				</view>
			</view>
			
			<view class="blank"></view>
			
			<view class="tj_active" v-if="nonlegacyList.length>0">
				<view class="tj_active_title">相关推荐</view>
				<view class="tj_active_content">
					<view class="tj_active_content_box" v-for="(item,index) in nonlegacyList" :key="index" @tap="todetail(item.id)">
						<view class="tj_active_content_box_img">
							<image :src="item.titleImg" mode=""></image>
						</view>
						<view class="tj_active_content_box_title">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<ys-bottom :id="id" @show="is_show = true"></ys-bottom>
		<ys-comment v-if="is_show" :id="id" :commentList="commentList" @refresh="refresh" @loadMore="loadMore" @close="close"></ys-comment>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: {},
				nonlegacyList: [],
				
				commentList: [],
				is_show: false,
				page: 0,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getNonlegacyList()
			
			this.getCommentList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.commentList = [];
				this.getCommentList();
			},
			/**
			 * 加载更多
			 */
			loadMore(){
			    console.log('上拉加载');
			    this.page += 10
				this.getCommentList();
			},
			close(){
				this.is_show = false
			},
			getCommentList(){
				let params = {
					contentId: this.id, 
					checked: 1, 
					first: this.page, 
					count: 10,
				}
				this.indexRequest({url:'/comment/list.jspx',data:params}).then(res=>{
					console.log(res);
					var content = res.data.body;
					this.commentList = this.commentList.concat(content);
				})
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.indexRequest({url:'/content/get.jspx',data:params}).then(res=>{
					var content = res.data.body;
					this.content = content;
					uni.setNavigationBarTitle({
						title: content.title
					})
				})
			},
			getNonlegacyList(){
				let params = {
					count:5,
					channelIds: '192',
					sort:4
				}
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(res);
					let array = res.data.body
					array.shift()
					this.nonlegacyList = array
				})
			},
			todetail(id){
				uni.redirectTo({
					url: '/pages/cate/cultural-encyclopedia-detail?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.cultural-encyclopedia-detail{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	.major{
		width: 100%;
		&_img{
			width: 690rpx;
			height: 292rpx;
			margin: 30rpx auto 0;
			.major_imgs{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
		&_box{
			width: 690rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #1B1C1E;
			margin: 16rpx auto 0;
			&_name{
				font-size: 36rpx;
				font-weight: 500;
				line-height: 68rpx;
				color: #1B1C1E;
			}
			&_text{
				line-height: 64rpx;
				text{
					color: #aaa;
				}
			}
		}
	}
}
</style>
