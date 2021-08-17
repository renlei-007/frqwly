<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/common/index.scss';
	/*每个页面公共css */
	/*取消滚动条*/
	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
	::-webkit-scrollbar {
		display:none !important;
		width:0;
		height:0;
		color:transparent;
	}
	/*
		全局公共样式和字体图标
	*/
	@font-face {
		font-family: iconfont;
		font-weight: normal;
		font-style: normal;
		src: url('./static/iconfont.ttf') format('truetype');
	}
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-saoma:before {
	  content: "\e66a";
	}
</style>
