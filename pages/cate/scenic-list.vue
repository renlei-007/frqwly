<template>
	<view class="scenic-list content">
		<view class="cutbox" v-if="Index==4">
			<ys-scroll :param="first_cate_param">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(item,index)">{{item.name}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="cate_box" v-if="Index!=3" :style="'height:'+(Index==4?'calc(100% - 98rpx)':'100%')">
			<ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
				<view class="scenic_box" v-if="Index==1" style="justify-content: space-between;box-sizing: border-box;padding: 0 30rpx;">
					<view class="scenic_point" v-for="(item,index) in scenicList" :key="index">
						<!-- <rich-text class="scenic_point_img" style="height: auto;" :nodes="item.imgString"></rich-text> -->
						<image class="scenic_point_img" :src="item.titleImg" @tap="todetail(item.id,0)"></image>
						<view class="scenic_point_info">
							<view class="scenic_point_info_name">{{item.stitle}}</view>
							<view class="scenic_point_info_position">
								<image src="/static/position.png" class="scenic_point_info_position_icon" mode=""></image>
								<view class="scenic_point_info_position_txt">{{item.attr_address}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;width: 100%;box-sizing: border-box;padding: 0 30rpx;justify-content: space-between;" v-else>
					<view class="scenic_boxs">
						<view class="scenic_point" v-for="(item,index) in scenicLeftList" :key="index">
							<!-- <rich-text class="scenic_point_img" style="height: auto;" :nodes="item.imgString"></rich-text> -->
							<view style="position: relative;">
								<image class="scenic_point_img" :src="item.titleImg" mode="widthFix" @load="onImageLoad" @tap="todetail(item.id,1)"></image>
								<view class="stars" v-if="item.attr_start">
									<view v-for="(item,index) in Number(item.attr_start)" :key="index">★</view>
								</view>
							</view>
							<view class="scenic_point_info">
								<view class="scenic_point_info_name">{{item.stitle}}</view>
								<view class="scenic_point_info_position">
									<image src="/static/position.png" class="scenic_point_info_position_icon" mode=""></image>
									<view class="scenic_point_info_position_txt">{{item.attr_address}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="scenic_boxs">
						<view class="scenic_point" v-for="(item,index) in scenicRightList" :key="index">
							<!-- <rich-text class="scenic_point_img" style="height: auto;" :nodes="item.imgString"></rich-text> -->
							<view style="position: relative;">
								<image class="scenic_point_img" :src="item.titleImg" mode="widthFix" @load="onImageLoad" @tap="todetail(item.id,1)"></image>
								<view class="stars" v-if="item.attr_start">
									<view v-for="(item,index) in Number(item.attr_start)" :key="index">★</view>
								</view>
							</view>
							<view class="scenic_point_info">
								<view class="scenic_point_info_name">{{item.stitle}}</view>
								<view class="scenic_point_info_position">
									<image src="/static/position.png" class="scenic_point_info_position_icon" mode=""></image>
									<view class="scenic_point_info_position_txt">{{item.attr_address}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</ys-scroll>			
		</view>
		<view class="lineBox" v-if="Index==3">
			<view class="lineBox_one">
				<image class="lineBox_one_img" src="https://oss.culturalcloud.net/furong/202108/16083949k5gx.png" mode="widthFix"></image>
				<view 
					v-for="(item,index) in hsxpList" 
					:key="index" 
					class="point"
					:style="'width:'+item.width+'rpx;height:'+item.height+'rpx;left:'+getLocation(item,0)[0]+'%;top:'+getLocation(item,0)[1]+'%;'"
					@tap="goDetail(0,item.name)"
				></view>
				<!-- <view class="lineBox_one_left">
					<image class="flag" src="/static/flag.png" mode=""></image>
					<view class="lineBox_one_left_title">芙蓉印记 红色游</view>
					<view class="splitline">
						<view class="splitline_black"></view>
					</view>
				</view>
				<view class="lineBox_one_right">
					<view class="lineBox_one_right_top">
						
					</view>
					<view class="lineBox_one_right_bottom">
						
					</view>
				</view> -->
			</view>
			<view class="lineBox_one">
				<image class="lineBox_one_img" src="https://oss.culturalcloud.net/furong/202108/16084211f376.png" mode="widthFix"></image>
				<view 
					v-for="(item,index) in hsjyList" 
					:key="index" 
					class="point"
					@tap="goDetail(1,item.name)"
					:style="'width:'+item.width+'rpx;height:'+item.height+'rpx;left:'+getLocation(item,1)[0]+'%;top:'+getLocation(item,1)[1]+'%;'"
				></view>
			</view>
			<view class="lineBox_one">
				<image class="lineBox_one_img" src="https://oss.culturalcloud.net/furong/202108/16084232lvqi.png" mode="widthFix"></image>
				<view 
					v-for="(item,index) in yxyList" 
					:key="index" 
					class="point"
					@tap="goDetail(2,item.name)"
					:style="'width:'+item.width+'rpx;height:'+item.height+'rpx;left:'+getLocation(item,2)[0]+'%;top:'+getLocation(item,2)[1]+'%;'"
				></view>
			</view>
			<view class="lineBox_one">
				<image class="lineBox_one_img" src="https://oss.culturalcloud.net/furong/202108/16084252ucvh.png" mode="widthFix"></image>
				<view 
					v-for="(item,index) in whdkyList" 
					:key="index" 
					class="point"
					@tap="goDetail(3,item.name)"
					:style="'width:'+item.width+'rpx;height:'+item.height+'rpx;left:'+getLocation(item,3)[0]+'%;top:'+getLocation(item,3)[1]+'%;'"
				></view>
			</view>
		</view>
	</view>
</template>

<script>
	import lineData from '../../common/line.js'
	export default {
		data() {
			return {
				scenicList: [],
				lineList: [],
				scenicLeftList: [],
				scenicRightList: [],
				cutList: [{
					name: '吃',
					value: 204,
				},{
					name: '住',
					value: 205,
				},{
					name: '旅游公司',
					value: 206,
				},],
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'没有更多了~',
					refresher_style:'black'
				},
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				page: 0,
				Index: 0,
				cutIndex: 0,
				channelIds: 207,
				scenicListCount: 0,
				scenicLeftListHeight: 0,
				scenicRightListHeight: 0,
				
				hsxpList: lineData.hsxp.point,
				hsjyList: lineData.hsjy.point,
				yxyList: lineData.yxy.point,
				whdkyList: lineData.whdky.point,
				
				lineList1: [],
				lineList2: [],
				lineList3: [],
				lineList4: [],
			};
		},
		onLoad(e) {
			if(e.type){
				this.type = e.type
			}
			if(e.cutIndex){
				this.Index = e.cutIndex
			}
			this.channelIds = e.channelIds
			let title
			if(this.Index==1){
				title = '展览馆'
			}else if(this.Index==2){
				title = '网红打卡'
			}else if(this.Index==3){
				title = '精品路线'
			}else if(this.Index==4){
				title = '旅游服务'
			}
			uni.setNavigationBarTitle({
				title: title
			})
			if(this.Index==4){
				this.channelIds = 204
			}
			if(this.Index==3){
				this.getLineList()
			}else{
				this.getList()
			}
		},
		methods: {
			getLocation(item,e){
				let boxWidth,boxHeight
				boxWidth = 690
				if(e==0){
					boxHeight = 286
				}
				if(e==1){
					boxHeight = 336
				}
				if(e==2||e==3){
					boxHeight = 358
				}
				let _left = item.left/boxWidth * 100
				let _top = item.top/boxHeight * 100
				
				return [_left,_top]
			},
			/**
			 * 页面刷新
			 */
			refresh(){
				console.log('刷新');
				this.page = 0;
				this.scenicLeftList = [];
				this.scenicRightList = [];
				this.scenicList = []
				this.scenicListCount = 0
				this.scenicLeftListHeight = 0
				this.scenicRightListHeight = 0
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
			changeTab(item,index){
				this.channelIds = item.value
				this.page = 0
				this.cutIndex = index
				this.scenicLeftList = [];
				this.scenicRightList = [];
				this.scenicList = []
				this.scenicListCount = 0
				this.scenicLeftListHeight = 0
				this.scenicRightListHeight = 0
				this.getList()
			},
			getList(){
				let params={
					channelIds: this.channelIds, first: this.page, count: 10, format:0, orderBy: 9,
				}
				//星级的orderBy传25,线路orderby传5
				this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
					console.log(this.scenicList);
					if(res.data.body.length==0&&this.scenicList.length == 0){
						this.$refs.scroll.setLoadStatus('no_data');
					}else{
						this.scenicList = this.scenicList.concat(res.data.body)
						// this.scenicLeftList.push(res.data.body[0])
						if(this.Index!=1){
							if(this.scenicLeftListHeight > this.scenicRightListHeight){
								this.scenicRightList.push(res.data.body[0]);
							}else{
								this.scenicLeftList.push(res.data.body[0]);
							}
						}
						if(res.data.body.length<10){
						  this.$refs.scroll.setLoadStatus('no_more');
						}else{
						  this.$refs.scroll.setLoadStatus('more');
						}
					}
				})
			},
			getLineList(){
				let arr = [214,215,216,217]
				arr.map((item,index)=>{
					let params={
						channelIds: item, format:0, orderBy: 5,
					}
					this.indexRequest({url:'/content/list.jspx',data:params}).then(res=>{
						console.log(res);
						if(index==0){
							this.lineList1 = res.data.body
						}else if(index==1){
							this.lineList2 = res.data.body
						}else if(index==2){
							this.lineList3 = res.data.body
						}else{
							this.lineList4 = res.data.body
						}
						this.lineList.push(res.data.body)
					})
				})
			},
			onImageLoad(e){
				let divWidth = 328;
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height+112; //图片原始高度
				let rImgH = divWidth*oImgH/oImgW; //根据宽高比计算当前载入的图片的高度
				if(this.scenicListCount==0){
					this.scenicLeftListHeight += rImgH;	//第一张图片高度加到goodsLeftListHeight 
					this.scenicListCount++;	//图片索引加1
					this.scenicRightList.push(this.scenicList[this.scenicListCount]);	//添加第二张图片到goodsRightList数组，因为第一张已经初始化到左侧列表中
				}else{
					this.scenicListCount++;	//图片索引加1
					if(this.scenicLeftListHeight > this.scenicRightListHeight){		//把图片的高度加到目前高度更低的栏中
						this.scenicRightListHeight += rImgH;		//第二张图片高度加到scenicRightListHeight 
					}else{
						this.scenicLeftListHeight += rImgH;
					}
					if(this.scenicListCount<this.scenicList.length){				//根据目前的栏高，把下一张图片，push到低的那栏
						if(this.scenicLeftListHeight > this.scenicRightListHeight){
							this.scenicRightList.push(this.scenicList[this.scenicListCount]);
						}else{
							this.scenicLeftList.push(this.scenicList[this.scenicListCount]);
						}
					}
				}
			},
			todetail(id,index){
				uni.navigateTo({
					url: '/pages/cate/scenic-spot?id='+id+'&&channelIds='+this.channelIds
				})
			},
			goDetail(e,name){
				let id = ''
				let channelIds = ''
				if(e==0){
					channelIds = 214
					this.lineList1.map(item=>{
						if(item.title == name){
							id = item.id
						}
					})
				}else if(e==1){
					channelIds = 215
					this.lineList2.map(item=>{
						if(item.title == name){
							id = item.id
						}
					})
				}else if(e==2){
					channelIds = 216
					this.lineList3.map(item=>{
						if(item.title == name){
							id = item.id
						}
					})
				}else{
					channelIds = 217
					this.lineList4.map(item=>{
						if(item.title == name){
							id = item.id
						}
					})
				}
				uni.navigateTo({
					url: '/pages/cate/scenic-spot?id='+id+'&&channelIds='+channelIds
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #F2F5FA;
}
.scenic-list{
	height: 100%;
}
.cate_box{
	height: 100%;
	.scenic_boxs{
		width: 328rpx;
		.scenic_point{
			width: 328rpx;
			height: auto;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			&_img{
				width: 328rpx;
				height: 188rpx;
			}
			.stars{
				position: absolute;
				font-size: 32rpx;
				color: red;
				left: 0;
				bottom: 6rpx;
				display: flex;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				box-sizing: border-box;
				padding-left: 10rpx;
				color: #ffa500;
				background: rgba(0,0,0,0.5);
			}
			&_info{
				width: 100%;
				height: auto;
				box-sizing: border-box;
				padding: 20rpx;
				&_name{
					width: 100%;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 28rpx;
					color: #1B1C1E;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				&_position{
					display: flex;
					margin-top: 20rpx;
					&_icon{
						width: 21rpx;
						height: 25rpx;
						margin-right: 8rpx;
					}
					&_txt{
						width: calc(100% - 40rpx);
						font-size: 24rpx;
						font-weight: 400;
						line-height: 24rpx;
						color: #8B8B9C;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.actives_point{
			width: 328rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-top: 30rpx;
			position: relative;
			&_img{
				width: 328rpx;
				height: 188rpx;
			}
			&_info{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx;
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
						display: flex;
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
						background: url(@/static/position.png) no-repeat;
						background-size: 21rpx 25rpx;
						background-position: 0 9rpx;
						text-indent: 1rem;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 40rpx;
						color: #8B8B9C;
					}
				}
				&_piao{
					box-sizing: border-box;
					padding: 0 20rpx;
					height: 44rpx;
					font-size: 22rpx;
					line-height: 44rpx;
					color: #FF5212;
					background: rgba(112, 112, 112, 0.7);
					border-radius: 24px 0px 0px 24px;
					position: absolute;
					top: 30rpx;
					right: 0;
				}
			}
			.active_s{
				padding-bottom: 60rpx;
			}
			&:nth-child(1){
				width: 100%;
				.actives_point_img{
					width: 100%;
					height: 386rpx;
				}
			}
		}
	}
}
.lineBox{
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
	border-radius: 8rpx;
	overflow: auto;
	&_one{
		width: 686rpx;
		min-height: 286rpx;
		display: flex;
		background-color: rgba(255,186,186,0.35);
		margin: 30rpx auto 0;
		position: relative;
		.point{
			position: absolute;
		}
		&_img{
			width: 100%;
		}
		&_left{
			width: 156rpx;
			height: 100%;
			display: flex;
			position: relative;
			background-color: #FE6E8B;
			.flag{
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 60rpx;
				left: 6rpx;
			}
			&_title{
				width: 108rpx;
				font-size: 22rpx;
				font-weight: bold;
				line-height: 32rpx;
				color: #FFFFFF;
				position: absolute;
				top: 66rpx;
				left: 40rpx;
				text-align: center;
			}
		}
	}
}
</style>
