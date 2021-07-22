<template>
	<view class="public_bottom">
		<view class="public_inp">
			<image class="write" src="/static/write.png" mode=""></image>
			<view class="public_inp_write" @tap="show">
				<input type="text" v-model="comment" disabled placeholder="说点什么吧..."/>
			</view>
		</view>
		<view class="icon_area">
			<view class="icon_item" @tap="show">
				<image class="icon_img" src="/static/cate/pinglun.png" mode=""></image>
				<text>评论</text>
			</view>
			<view class="icon_item" @tap="share">
				<image class="icon_img" src="/static/cate/zhuanfa.png" mode=""></image>
				<text>转发</text>
			</view>
			<view class="icon_item" @tap="btnFabulous">
				<image class="icon_img" :src="isFabulous?'/static/cate/dianzan_red.png':'/static/cate/dianzan.png'" mode=""></image>
				<text :class="{dz_red:isFabulous}">点赞</text>
			</view>
			<view class="icon_item" @tap="collection">
				<image class="icon_img" :src="is_keep?'/static/cate/shoucang_red.png':'/static/cate/shoucang.png'" mode=""></image>
				<text :class="{dz_red:is_keep}">收藏</text>
			</view>
		</view>
		<ys-share ref="share" :contentHeight="580" :shareList="shareList"></ys-share>
	</view>
</template>

<script>
	export default {
		props: {
			id: [String,Number],
			ups: 0,
		},
		data() {
			return {
				isFabulous: false,
				is_keep: false,
				up: 0,
				comment: '',
				shareList : [{
						type: 1,
						icon: '/static/share_wechat.png',
						text: '微信好友'
					},
					{
						type: 2,
						icon: '/static/share_moment.png',
						text: '朋友圈'
					},
					{
						type: 3,
						icon: '/static/share_qq.png',
						text: 'QQ好友'
					},
					{
						type: 4,
						icon: '/static/share_qqzone.png',
						text: 'QQ空间'
					}
				],
			};
		},
		mounted() {
			let isFabulous = uni.getStorageSync('fabulous'+this.id);
			if(isFabulous){
				this.isFabulous = true;
			}
			if(this.isLogin){
				this.homeRequest({
					url: '/content/collectExit',
					method: 'GET',
					data: {cId: this.id},
				}).then(res=>{
					if(res.body=='true'){
						this.is_keep = true;
					}else{
						this.is_keep = false;
					}
				})
			}
		},
		methods: {
			show(){
				this.$emit('show')
			},
			share(){
				// #ifdef MP-WEIXIN
				wx.showShareMenu();
				// #endif
				// #ifdef H5
				this.$refs.share.toggleMask();	
				// #endif
			},
			btnFabulous: function() {
				if(this.isFabulous){
					this.indexRequest({url:'/content/down',data:{contentId: this.id}}).then(res=>{
						if(res.data.code==200){
							this.isFabulous = false;
							uni.removeStorageSync('fabulous'+this.id);
							this.toast('取消点赞成功！')
						}
					})
				}else{
					this.indexRequest({url:'/content/up',data:{contentId: this.id}}).then(res=>{
						if(res.data.code==200){
							this.isFabulous = true;
							uni.setStorageSync('fabulous'+this.id, true);
							this.toast('点赞成功！')
						}
					})
				}
			},
			collection(){
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
					this.homeRequest({
						url: '/content/collect',
						method: 'GET',
						data: {id: this.id,operate: this.is_keep?0:1},
					}).then(res=>{
						if(res.code==200){
							if(this.is_keep){
								this.toast('取消收藏成功！')
							}else{
								this.toast('收藏成功！')
							}
							this.is_keep = !this.is_keep
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss">
.dz_red{
	color: rgb(223,20,20);
}
</style>
