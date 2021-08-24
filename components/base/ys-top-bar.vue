/**
  * @Description:顶部导航条
  * @author RL
  * @Date 2020-7-8
  */
<template>
  <view class="ys_top_bar">
    <!-- #ifdef MP-WEIXIN -->
    <view class="wx_bar_box" :class="{white:isChange}" :style="head_box_style">
      <view class="wx_custom_box wx_logo_box">
        <!-- <view class="wx_logo_box_wai">{{title}}</view> -->
		<view class="search_box">
			<view class="search_box_input" @tap="toSearch">
				<image class="search_img" src="/static/logo.png" mode=""></image>
				<input type="text" disabled class="search_box_input_wri" placeholder="请输入关键词搜索"/>
			</view>
			<view class="point_div" @tap="toDel">
				<view class="point_txt">积分</view>
				<view class="point_num">{{point}}</view>
			</view>
		</view>
      </view>
    </view>
    <!-- #endif -->
	<swiper class="banner_box" circular :indicator-dots="false" autoplay>
		<swiper-item  class="swiper-recommend" v-for="(item, index) in carouselList"  :key="index" @tap="toPage(item)">
			<view class="img"><image class="swiper_img" :src="item.attr_image_url"></image></view>
		</swiper-item>
	</swiper>
	
  </view>
</template>

<script>
  export default{
    name:'ys-top-bar',
	props: {
		title: String,
		point: Number,
		isChange: false,
	},
    data(){
      return{
        head_box_style:'',//导航栏样式
        head_box_height:0,//导航栏高度
		carouselList: [], //轮播图
      }
    },
    mounted() {
      // #ifdef MP-WEIXIN
      uni.getSystemInfo({
      	success: (e)=> {
          let custom = uni.getMenuButtonBoundingClientRect();
          let head_box_height = custom.bottom + custom.top - e.statusBarHeight;
          this.head_box_height = head_box_height;
          let padding_top = e.statusBarHeight;
          this.head_box_style = 'height:'+head_box_height+'px;'+'padding-top:'+padding_top+'px';
        }
      })
      // #endif
	  this.indexRequest({url:'/ad/list.jspx',data:{adspaceId:5}}).then(res=>{
	  	this.carouselList = res.data.body;
	  })
    },
    methods:{
      /**
       * 页面返回
       */
      returnPage(){
        if(this.is_return){
          uni.navigateBack({
            delta:1
          })
        }
      },
      /**
       * 内容输入
       * @param {Object} e
       */
      input(e){
        this.$emit('input',e)
      },
	  toSearch(){
		  uni.navigateTo({
			url: '/pages/index/search'
		  })
	  },
	  toPage(item){
		console.log(1111111);
		uni.navigateTo({
		  url: item.attr_image_link
		})
	  },
	  toDel(){
		if(this.isLogin){
	  		this.navigateTo('/pages/mine/reward-points')
		}else{
			uni.showModal({
				title: '提示',
				content: '您还没有登录，确认要先登录吗？',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else if (res.cancel) {
					}
				}
			});
		}
	  },
    }
  }
</script>

<style lang="scss">
  
  .ys_top_bar{
    width: 100%;
	position: relative;
	/* #ifdef MP-WEIXIN */
	height: 750rpx;
	/* #endif */
    /* #ifdef MP-WEIXIN */
    .wx{
      &_bar_box{
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 997;
        left: 0;
        box-sizing: border-box;
		color: #fff;
      }
      &_custom_box,&_search_box{
        width: 550rpx;
        height: 100%;
        position: relative;
      }
      &_logo_box,&_custom_gradient{
        display: flex;
        align-items: center;
        padding: 0 0 0 30rpx;
        box-sizing: border-box;
      }
    }
    /* #endif */
    /* #ifndef MP-WEIXIN */
    .app{
      &_bar_box{
        width: 100%;
      }
      /* #ifdef APP-PLUS */
      &_status_bar {
        height: var(--status-bar-height);
        width: 100%;
      }
      &_top_view {
        height: var(--status-bar-height);
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 997;
      }
      /* #endif */
      &_custom_box,&_search_box{
        width: 100%;
        height: 88rpx;
        position: fixed;
        top: var(--status-bar-height);
        z-index: 997;
      }
      &_logo_box{
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        box-sizing: border-box;
      }
    }
    /* #endif */
	.banner_box{
		width: 100%;
		height: 750rpx;
		position: absolute;
		top: 0;
		left: 0;
		// border-radius: 16rpx;
		// margin: -60rpx auto 0;
		/* #ifdef MP-WEIXIN */
		/* #endif */
		
		/* #ifndef MP-WEIXIN */
		margin-top: -60rpx;
		/* #endif */
		// background-color: #3F444C;
		.swiper-recommend{
			width: 100%;
			font-size: 16rpx;
			text-align: center;
			.img{
				width: 100%;
				height: 100%;
				.swiper_img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
    .page_title{
      width: 100%;
      height: 100%;
      font-size: 36rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }
    .rt_pos {
      position: absolute;
      left: 30rpx;
      top: 50%;
      content: "";
      display: inline-block;
      height: 23rpx;
      width: 23rpx;
      border-width: 0 0 1.5px 1.5px;
      border-color: #fff;
      border-style: solid;
      transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0) translateY(-50%);
      -webkit-transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0) translateY(-50%);
    }
    .app_search_box,.wx_search_box{
      padding-left: 80rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
    .app_search_input,.wx_search_input{
      width: 470rpx;
      height: 55rpx;
      background-color: #ffffff;
      border-radius: 8rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .icon{
        width: 27rpx;
        height: 28rpx;
        display: block;
      }
      .input {
        width: 403rpx;
        box-sizing: border-box;
        padding-left: 10rpx;
        font-size: 26rpx;
      }
    }
    .wx_logo_box_wai{
      width: 400rpx;
      height: 60rpx;
      line-height: 60rpx;
    }
  }
  .wx_logo_box .search_box{
  	width: 100%;
  	height: 100%;
  	// background: #3F444C;
  	border-radius: 0 0 10% 10%;
  	display: flex;
	align-items: center;
  	justify-content: space-between;
  	&_input{
  		width: 360rpx;
  		height: 64rpx;
  		border-radius: 36rpx;
  		background-color: #F2F5FA;
		margin-right: 16rpx;
  		// margin-left: 30rpx;
  		/* #ifdef MP-WEIXIN */
  		// margin-top: 60rpx;
  		/* #endif */
  		
  		/* #ifndef MP-WEIXIN */
  		margin-top: 0;
  		/* #endif */
  		display: flex;
  		justify-content: space-between;
  		align-items: center;
  		.search_img{
  			width: 48rpx;
  			height: 48rpx;
			margin: 0 8rpx 0 16rpx;
  			// margin: -8rpx 8rpx 0 16rpx;
  		}
  		&_wri{
  			flex: 1;
  			line-height: 64rpx;
  			font-size: 28rpx;
  		}
  	}
  	.point_div{
  		font-size: 24rpx;
  		height: 70rpx;
  		color: #FFFFFF;
  		text-align: center;
  		margin-right: 30rpx;
		display: flex;
		align-items: center;
		.point_txt{
			width: 26rpx;
			margin-right: 4rpx;
		}
  		.point_num{
  			font-size: 60rpx;
  			line-height: 60rpx;
			font-family: Din;
  		}
  	}
  }
  .white{
	  background-color: #6851E2;
  }
</style>
