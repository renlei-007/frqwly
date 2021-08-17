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
				id: '',
				cutList: [],
			};
		},
		onLoad() {
			this.getList()
			// this.getDetail(this.id)
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
			getList(){
				this.indexRequest({url:'/channel/list',data:{parentId:128}}).then(res=>{
					console.log('wwwwwwwww',res);
					res.data.body.map((item,index)=>{
						this.cutList.push({
							state: index,
							text: item.title,
							id: item.id,
							video: null,
						})
						this.id = this.cutList[0].id
						this.getDetail(this.id)
					})
				})
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
