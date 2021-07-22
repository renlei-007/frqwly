/**
 * 菜单列表组件
 */
<script>
  export default{
    name:'ys-menu-list',
    props:{
      list:{
        type:Array
      },
      line_num:{
        type:Number,
        default:4
      },
      size:{
        type:Number,
        default:90
      }//图标大小
    },
    data(){
      return{
        icon_size:'',//图标大小
        menu_index:0,//轮播分类当前页面数组下标
      }
    },
    computed:{
    },
    mounted() {
		console.log(this.list);
      this.icon_size = uni.upx2px(this.size);
    },
    methods:{
      /**
       * 点击菜单
       */
      tapMenu:function (index,key) {
        var data = {
          index:index,
          key:key
        };
        this.$emit('select',data)
      },
      /**
       * 菜单切换
       */
      swiperChange:function(e){
        this.menu_index=e.detail.current
        console.log(this.menu_index);
      }
    }
  }
</script>

<template name="ys-menu-list">
  <view class="ys_menu_list">
    <swiper class="menu_box" @change="swiperChange" :style="'height:'+(list.length>0&&list[menu_index].length>line_num?350:170)+'rpx'" :disable-touch = "list.length>1?false:true">
      <swiper-item v-for="(content,index) in list" :key="index" >
        <view class="menu_list">
          <view class="menu_item" v-for="(item,key) in content" :key="key" :style="'width:'+(100/line_num)+'%;'" @tap="tapMenu(index,key)">
            <view class="icon_box" :style="'width: '+icon_size+'px;'">
              <image :src="item.img" mode="aspectFill" class="icon" style="width: 104rpx;height: 110rpx;"></image>
            </view>
            <view class="name">{{item.title}}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="points_box" :style="'width:'+((list.length)*30)+'rpx'" v-if="list.length>1">
      <view class="points" :style="'left:'+(menu_index*30)+'rpx;background-color:#415DEE'"></view>
    </view>
  </view>
</template>

<style lang="scss">
  .ys_menu_list{
    width:690rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx;
    .menu_box{
      width: 100%;
      .menu_list{
        width: 100%;
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
        .menu_item{
          padding-top: 30rpx;
          box-sizing: border-box;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
          .icon_box{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
			border-radius: 50%;
            .icon{
              display: block;
              border-radius: 50%;
            }
          }
          .name{
            width: 100%;
            text-align: center;
            color: #646464;
            font-size:24rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: -20rpx;
          }
        }
      }
    }
    .points_box{
      height: 5upx;
      background-color: #FFFFFF;
      border-radius: 6upx;
      margin-left: 50%;
      transform: translateX(-50%);
      position: relative;
      margin-top: 20rpx;
      .points{
        width: 30upx;
        height: 100%;
        border-radius: 6px;
        position: absolute;
        left: 0;
        top:0;
        transition: 500ms;
      }
    }
  }
</style>
