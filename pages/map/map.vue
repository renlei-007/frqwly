<template>
	<view class="map">
		<sl-filter 
			:ref="'slFilter'" 
			:topFixed="true" 
			:isTransNav="true" 
			:navHeight="0" 
			:menuList="menuList"
			@result="result">
		</sl-filter>
		<ys-scroll v-if="!is_choose" :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="all_scroll">
				<view class="allpoint_li" v-for="(item,index) in pointList" :key="index">
					<view class="allpoint_li_img">
						
					</view>
					<view class="allpoint_li_content">
						<view class="allpoint_li_content_title">兰园生态农庄</view>
						<view class="allpoint_li_content_txt">地址：浏阳市金桥村</view>
						<view class="allpoint_li_content_txt">距离：4.07KM</view>
					</view>
				</view>
			</view>
		</ys-scroll>
		<view class="content_box" v-else>
			<view class="cate_list">
				<ys-scroll :param="cate_param">
					<view 
						class="cate_item" 
						:class="{cate_item_active:cate_index==index}" 
						v-for="(item,index) in cateList" 
						:key="index" 
						@tap="changeCate(index)"
					>{{item.title}}
					</view>
					<view class="bottom_distance"></view>
				</ys-scroll>
			</view>
			<view class="pt_list">
				<ys-scroll :param="pt_param" @loadMore = "loadMorePoints" ref = "scroll">
					<view v-for="(item,index) in catePointList" :key="index">
						<view class="pt_item">
							<view class="pt_item_img"></view>
							<view class="pt_item_info">
								<view class="pt_item_info_title">兰园生态农庄</view>
								<view class="pt_item_info_txt">地址：浏阳市金桥村</view>
								<view class="pt_item_info_txt">电话：13808435591</view>
							</view>
						</view>
					</view>
				</ys-scroll>
			</view>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
export default {
	components: {
		slFilter
	},
	data() {
		return {
			param:{//滚动区域配置
				scroll_y:true,
				background:'#f2f2f2',
				refresher:true,
				no_more_text:'',
				refresher_style:'black'
			},
			is_choose: false,
			page: 0,//页数
			pages: 0,
			pointList: [],
			catePointList: [],
			cate_index:0,//选中的二级菜单下标
			cate_param:{//一级分类滚动区域配置
				scroll_y:true,
				scroll_x:false,
				background:'#f2f2f2'
			},
			pt_param:{
			  scroll_y:true,
			  scroll_x:false
			},//商品滚动区域配置
			cateList: [{
				title: '文化馆',
			},{
				title: '街道分馆',
			},{
				title: '文化广场',
			},{
				title: '体育场馆',
			},{
				title: '影剧院',
			},{
				title: '博物馆',
			},{
				title: '景点',
			},{
				title: '社区',
			},{
				title: '厕所',
			},{
				title: '餐饮',
			},{
				title: '住宿',
			},{
				title: '娱乐',
			},{
				title: '旅行社',
			},{
				title: '其他',
			},],
			menuList: [{
					'title': '类别',
					'isSort': true,
					'key': 'type',
					'detailList': [{
							'title': '全部',
							'value': ''
						},
					]
				},
				{
					'title': '方式',
					'key': 'sort',
					'isSort': true,
					'reflexTitle': true,
					'detailList': [
						{
							'title': '距离',
							'value': '24'
						},
						{
							'title': '最新',
							'value': '4'
						},
						{
							'title': '最热',
							'value': '9'
						}
					]
				}
			],
		};
	},
	onLoad() {
		for(let i=0;i<10;i++){
			this.menuList[0].detailList.push({
				'title': '兰园生态农庄',
				'value': i
			})
		}
		this.getList()
	},
	methods: {
		/**
		 * 页面刷新
		 */
		refresh(){
			console.log('刷新');
			this.page = 1;
			this.pointList = [];
			this.getList(this.page);
			setTimeout(()=>{
			    this.$refs.scroll.endRefresh()
			},800)
		},
		loadMore(){
		    console.log('上拉加载');
		    this.page++
			this.getList(this.page);
		},
		result(val) {
			console.log(val);
			this.is_choose = true
			this.catePointList = []
			this.pages = 0
			this.loadMorePoints()
		},
		changeCate(index){
			this.cate_index = index
			this.catePointList = [];
			this.pages = 0;
			this.loadMorePoints();
		},
		loadMorePoints(){
			this.pages++
			this.getCatePointList(this.pages);
			this.$refs.scroll.setLoadStatus('loading')
		},
		getList(){
			this.pointList.push({},{},{},{},{},{},{},{},{},{})
		},
		getCatePointList(){
			setTimeout(()=>{
				this.catePointList.push({},{},{},{},{},{},{},{},{},{})
			},500)
		},
	},
}
</script>

<style lang="scss">
.map{
	width: 100%;
	/* #ifdef H5 */
	height: calc(100% - 90rpx);
	/* #endif */
	.all_scroll{
		width: 100%;
		.allpoint_li{
			width: 100%;
			height: 180rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			&:nth-child(1){
				margin-top: 0;
			}
			&_img{
				width: 200rpx;
				height: 112rpx;
				background: #E5E5E5;
				border-radius: 8rpx;
				margin-right: 30rpx;
			}
			&_content{
				width: calc(100% - 230rpx);
				height: 100%;
				&_title{
					width: 100%;
					font-size: 32rpx;
					line-height: 32rpx;
					color: #1B1C1E;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				&_txt{
					width: 100%;
					font-size: 24rpx;
					line-height: 24rpx;
					margin-top: 16rpx;
					color: #8B8B9C;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.content_box{
		width: 100%;
		height: 100%;
		display: flex;
		.cate_list{
			height: 100%;
			width: 180rpx;
			flex-shrink: 0;
			.cate_item{
				text-align: center;
				height: 100rpx;
				width: 100%;
				line-height: 100rpx;
				font-size: 32rpx;
				color: #4d4d4d;
				position: relative;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.bottom_distance{
			  width: 100%;
			  height: 150rpx;
			}
			.cate_item_active{
				width: calc(100% - 8rpx);
				background-color: #FFFFFF;
				border-left: 8rpx solid #F2520B;
				position: relative;
			}
		}
		.pt_list{
			width: calc(100% - 180rpx);
			height: 100%;
			flex-shrink: 0;
			.pt_item{
				width: calc(100% - 60rpx);
				margin: 0 30rpx;
				padding: 30rpx 0;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				&_img{
					width: 150rpx;
					height: 112rpx;
					background: #E5E5E5;
					border-radius: 8rpx;
					margin-right: 30rpx;
				}
				&_info{
					width: calc(100% - 180rpx);
					&_title{
						width: 100%;
						font-size: 32rpx;
						line-height: 32rpx;
						color: #1B1C1E;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					&_txt{
						width: 100%;
						font-size: 24rpx;
						line-height: 24rpx;
						margin-top: 16rpx;
						color: #8B8B9C;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
