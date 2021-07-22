/**
* @Description:下拉刷新上拉加载组件
* @author RL
* @Date 2021-6-2
*/
<template name="ys-scroll">
	<scroll-view :style="'background:'+background" 
		:scroll-left="scrollLeft" 
		class="ys_scroll" 
		:scroll-y="scroll_y"
		:scroll-x="scroll_x" 
		:lower-threshold="lower_threshold" 
		:upper-threshold="upper_threshold"
		:refresher-enabled="refresher" 
		:refresher-default-style="refresher_style"
		:refresher-background="refresher_background" 
		:refresher-triggered="triggered" 
		@refresherrefresh="onRefresh"
		@refresherrestore="onRestore" 
		@scrolltolower="loadMore">
		<slot></slot>
		<view class="load_status" v-if="load_status == 'loading'">
			<view class="loader loader_rotate"></view>
			<view class="text">{{load_text}}</view>
		</view>
		<view class="load_status" v-if="load_status == 'no_more'">
			<view class="text">{{no_more_text}}</view>
		</view>
		<view class="no_data" v-if="load_status == 'no_data'">
			<image :src="no_data_icon" mode="aspectFill" class="no_data_icon"></image>
			<view class="text">{{no_data_text}}</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'ys-scroll',
	props: {
		scrollLeft: '',
		param: {
			type: Object,
			default: () => {}
		}, //功能开启参数
		// no_data_text: '暂无数据~',
	},
	data() {
		return {
			scroll_x: false, //是否开启x轴滑动
			scroll_y: true, //是否开启y轴滑动
			upper_threshold: 50, //距顶部/左边多远时（单位px），触发 scrolltoupper 事件
			lower_threshold: 50, //距底部/右边多远时（单位px），触发 scrolltolower 事件
			refresher: false, //开启自定义下拉刷新
			refresher_style: ' black', //设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
			refresher_background: '#FFF', //设置自定义下拉刷新区域背景颜色
			load_status: 'more', //加载状态 loading加载中 more还有可加载数据 no_more没有可加载数据 no_data没有数据 refresher//下拉刷新
			load_text: '加载中...', //加载中文字提示
			no_more_text: '没有更多数据了~', //没有更多数据文字提示
			triggered: "restore", //Boolean 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
			freshing: false, //用于阻止多次触发下拉刷新
			no_data_icon: '/static/empty.png',
			no_data_text: '暂无数据~',
			background: '#ffffff'
		}
	},
	created() {
		if (JSON.stringify(this.param) != "{}") {
			for (let key in this.param) {
				this[key] = this.param[key]
			}
		}
	},
	methods: {
		/**
		 * 自定义下拉刷新被触发
		 */
		onRefresh() {
			if (this.freshing) return;
			this.freshing = true;
			this.$emit('refresh')
		},
		/**
		 * 自定义下拉刷新被复位
		 */
		onRestore() {
			this.triggered = 'restore'; // 需要重置
		},
		/**
		 * 结束下拉状态
		 */
		endRefresh() {
			this.triggered = false;
			this.freshing = false;
		},
		/**
		 * 设置加载状态
		 * @param {String} status
		 */
		setLoadStatus(status) {
			this.load_status = status
		},
		/**
		 * 加载更多
		 */
		loadMore() {
			if (this.load_status == 'no_more' || this.load_status == 'no_data') return;
			this.$emit('loadMore')
		},
		/**
		 * 设置背景颜色
		 * @param {Object} data
		 */
		setBackground(data) {
			this.background = data
		}
	}
}
</script>

<style lang="scss">
.ys_scroll {
	width: 100%;
	height: 100%;

	.load_status {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15upx 0;
	}

	.load_status .text {
		font-size: 26upx;
		color: #909090;
		margin-left: 5upx;
	}

	.loader {
		width: 26upx;
		height: 26upx;
		margin: 0 10upx;
		display: inline-block;
		border-radius: 50%;
		border: 2upx solid #158bef;
		border-bottom-color: transparent;
		vertical-align: middle;
	}

	.no_data {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		.no_data_icon {
			width: 250rpx;
			height: 210rpx;
			display: block;
		}

		.text {
			font-size: 26upx;
			color: #909090;
			marign-top: 15rpx;
		}
	}

	/* 旋转动画 */
	.loader_rotate {
		-webkit-animation: loaderRotate 0.6s linear infinite;
		animation: loaderRotate 0.6s linear infinite;
	}

	@-webkit-keyframes loaderRotate {
		0% {
			-webkit-transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes loaderRotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
