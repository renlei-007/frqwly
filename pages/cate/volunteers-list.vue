<template>
	<view class="volunteers-list content">
		<!-- <ys-scroll :param="param" ref = "scroll" @refresh="refresh" @loadMore = "loadMore">
			<view class="scenic_box" style="box-sizing: border-box;padding: 0 30rpx;">
				<view class="actives_point" v-for="(item,index) in activeList" :key="index">
					<image class="actives_point_img" :src="item.titleImg" mode="" @tap="todetail(item.id)"></image>
					<view class="actives_point_info">
						<view class="actives_point_info_name">{{item.title}}</view>
						<view class="actives_point_info_position">
							<image src="/static/position.png" class="actives_point_info_position_icon" mode=""></image>
							<view class="actives_point_info_position_txt">{{item.attr_address}}</view>
						</view>
					</view>
				</view>
			</view>
		</ys-scroll> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param:{//滚动区域配置
					scroll_y:true,
					background:'#F2F5FA',
					refresher:true,
					no_more_text:'',
					refresher_style:'black'
				},
				type: '',
				page: 0,
			};
		},
		methods: {
			
		},
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.volunteers-list{
	width: 100%;
	height: 100%;
}
</style>
