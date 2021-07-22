<template>
	<view class="active-code content">
		<image class="active_code_img" :src="baseUrl+'/special/o_create_dimensioncode.jspx?content='+qrcodeCotent(record.orders[0])" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				code: '',
				record: {orders:[]}, 
				content: {},
			};
		},
		onLoad(e){
			this.id = e.id
			this.getDetail()
		},
		methods: {
			qrcodeCotent(item){
				let params={
					type : 1,
					value: item.orderNo
				}
				return encodeURIComponent(JSON.stringify(params));
			},
			getDetail(){
				let params = {
					format: 0,
					id: this.id
				}
				this.homeRequest({url:'/ticket/detail',data:{recordId: this.id}}).then(res=>{
					console.log(res);
					this.record = res.body;
					this.indexRequest({url:'/content/get.jspx',data:{
						format: 0,
						id: this.record.content.id
					}}).then(res=>{
						console.log(res);
						var content = res.data.body;
						this.content = content;
					})
				})
			},
		},
	}
</script>

<style lang="scss">
.active-code{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.active_code_img{
		width: 508rpx;
		height: 508rpx;
	}
}
</style>
