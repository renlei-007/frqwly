<template>
	<view class="content aboutme">
		<view class="cutbox">
			<ys-scroll :param="first_cate_param" :scrollLeft="scrollLeft">
				<view class="cutlist">
					<view class="cutlist_item" :class="{'active':index==cutIndex}" v-for="(item,index) in cutList" :key="index" @tap="changeTab(item,index)">{{item.text}}
						<view class="cate_line" v-if="cutIndex == index"></view>
					</view>
				</view>
			</ys-scroll>
		</view>
		<view class="textarea">
			<rich-text :nodes="desc"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				desc: '',
				cutIndex: 0,
				scrollLeft: 0,
				first_cate_param: {//一级分类滚动区域配置
					scroll_y:false,
					scroll_x:true
				},
				id: 129,
				cutList: [{
						state: 0,
						text: '本馆简介',
						id: 129,
						video: null,
					},
					{
						state: 1,
						text: '机构领导',
						id: 131,
						video: null,
					},
					{
						state: 2,
						text: '雨花区公共图书馆',
						id: 132,
						video: null,
					},
					{
						state: 3,
						text: '雨花区文化馆',
						id: 145,
						video: null,
					},
					{
						state: 4,
						text: '雨花区文化市场综合执法局',
						id: 162,
						video: null,
					},
					{
						state: 5,
						text: '雨花区文物管理所',
						id: 163,
						video: null,
					},
					{
						state: 6,
						text: '区文旅体局办公室',
						id: 164,
						video: null,
					},
					{
						state: 7,
						text: '公共文体艺术科',
						id: 165,
						video: null,
					},
					{
						state: 8,
						text: '文化产业科（市场科）',
						id: 166,
						video: null,
					}
				],
			};
		},
		onLoad() {
			this.getDetail(this.id)
		},
		methods: {
			changeTab(item,index){
				if(this.cutIndex!=index){
					this.cutIndex = index
					this.id = item.id
					this.scrollLeft = (index - 1) * 130;
					this.getDetail(this.id)
				}
			},
			getDetail(id){
				let params = {
					id:id, 
					showTxt: true
				}
				this.indexRequest({url:'/channel/get',data:params}).then(res=>{
					console.log(res);
					this.desc = res.data.body.txt;
				})
			},
		},
	}
</script>

<style lang="scss">
page{
}
.aboutme{
	width: 100%;
	height: 100%;
}
.textarea{
	width: 100%;
	height: calc(100% - 98rpx);
	box-sizing: border-box;
	padding: 30rpx;
	overflow: auto;
	font-size: 28rpx;
	line-height: 1.8;
}
</style>
