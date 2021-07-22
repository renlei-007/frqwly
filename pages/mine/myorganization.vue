<template>
	<view class="myorganization content">
		<view class="cutbox">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(index)">{{item}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore" style="height: calc(100% - 188rpx);">
			<view class="org_box" v-if="cutIndex==0">
				<view class="org_box_list" v-for="(item,index) in orgList" :key="index">
					<view class="org_box_list_left">
						<view class="org_box_list_left_name">{{item.group.content.title}}</view>
						<view class="org_box_list_left_person">
							<image class="org_box_list_left_person_icon" src="/static/personcount.png" mode=""></image>
							<text>人数：{{item.group.memberCount}}人</text>
						</view>
					</view>
					<view class="org_box_list_right" @tap="lookup(item.group.id)">点击查看</view>
				</view>
			</view>
			<view class="org_box" v-else>
				<view class="org_box_list" v-for="(item,index) in teamList" :key="index">
					<view class="org_box_list_left">
						<view class="org_box_list_left_name">{{item.content.title}}</view>
						<view class="org_box_list_left_person">
							<image class="org_box_list_left_person_icon" src="/static/personcount.png" mode=""></image>
							<text>人数：{{item.memberCount}}人</text>
						</view>
					</view>
					<view class="org_box_list_right" @tap="examine(item.id)">查看审核</view>
				</view>
			</view>
		</ys-scroll>
		<view class="creat" @tap="creatTeam">创建社团</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cutIndex: 0,
				cutList: ['加入的社团','我的社团',],
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				page: 0,
				orgList: [],
				teamList: [],
			};
		},
		onShow() {
			this.page = 0;
			this.orgList = [];
			this.teamList = []
			this.getList()
		},
		methods: {
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.orgList = [];
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
			changeTab(index){
				if(this.cutIndex!=index){
					this.cutIndex = index
					this.page = 0
					this.orgList = []
					this.teamList = []
					this.getList();
				}
			},
			creatTeam(){
				let user = uni.getStorageSync('user_info')
				if(user.isCertification){
					uni.navigateTo({
						url:'./creat-organization'
					})
				}else{
					this.tosat('您还没有实名认证，请先进行实名认证！')
				}
			},
			getList(){
				this.homeRequest({
					url:this.cutIndex==0?'/group/joined/list':'/group/created/list',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.log(res);
					if(this.cutIndex==0){
						this.orgList = res.body
					}else{
						this.teamList = res.body
					}
				});
			},
			lookup(id){
				uni.navigateTo({
					url: '../cate/volunteers-detail?id='+id+'&&channellds=142'
				})
			},
			examine(id){
				uni.navigateTo({
					url: './check-team?id='+id
				})
			},
		},
	}
</script>

<style lang="scss">
.myorganization{
	width: 100%;
	height: 100%;
	overflow: auto;
	.org_box{
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 90rpx;
	}
	.org_box_list{
		width: 690rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 30rpx;
		margin: 30rpx auto 0;
		&_left{
			&_name{
				font-size: 36rpx;
				line-height: 36rpx;
				color: #1B1C1E;
			}
			&_person{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #8B8B9C;
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				&_icon{
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
		&_right{
			width: 128rpx;
			height: 44rpx;
			border: 1px solid #6952E1;
			opacity: 1;
			border-radius: 28rpx;
			text-align: center;
			line-height: 44rpx;
			font-size: 20rpx;
			color: #6952E1;
		}
	}
}
.creat{
	width: 100%;
	height: 90rpx;
	text-align: center;
	line-height: 90rpx;
	background-color: #6952E1;
	color: #FFFFFF;
	font-size: 32rpx;
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
