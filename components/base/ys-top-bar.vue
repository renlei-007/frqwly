/**
  * @Description:顶部导航条
  * @author XM
  * @Date 2020-7-8
  */
<template>
  <view class="ys_top_bar">
    <!-- #ifdef MP-WEIXIN -->
    <view class="wx_bar_box" :style="head_box_style">
      <view class="wx_custom_box wx_logo_box">
        <view class="wx_logo_box_wai">{{title}}</view>
      </view>
    </view>
    <!-- #endif -->
	
	
  </view>
</template>

<script>
  export default{
    name:'ys-top-bar',
	props: {
		title: String,
	},
    data(){
      return{
        head_box_style:'',//导航栏样式
        head_box_height:0,//导航栏高度
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
    }
  }
</script>

<style lang="scss">
  
  .ys_top_bar{
    width: 100%;
    /* #ifdef MP-WEIXIN */
    .wx{
      &_bar_box{
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 997;
        left: 0;
        box-sizing: border-box;
		background: #956FEC;
		color: #fff;
      }
      &_custom_box,&_search_box{
        width: 100%;
        height: 100%;
        position: relative;
      }
      &_logo_box,&_custom_gradient{
        display: flex;
        align-items: center;
        padding: 0 30rpx;
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
</style>
