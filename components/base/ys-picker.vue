<!-- 
* 名称：输入框
* 时间：2019-07-10
* 方法：在页面正常调用组件 <ys-picker @change="callPicker" ref="ysPicker" :value="[0,0,0]" title="标题"></ys-picker>
*       @change 点击选项后的回调
*       :value="[0,0,0]" 初始下标 不传就为默认 时间默认为当前时间
*       title="标题" 可设置标题
*       ref="ysPicker" 用来标记执行 组件中的方法 调用方法this.$refs.ysPicker.showModal(type,data);
* 示例：this.$refs.ysPicker.showModal('time','b-y-M-d-h-m');//b-range-y-M-d-h-m-unit   b为过去时间 range为选择时间区间 unit不显示单位 时间区间只能使用 y-M-d 或 h-m
        this.$refs.ysPicker.showModal('region',type);//三级联动 type不传就为默认 type为no-area 则只可以选省市 type为其他 true 则区可以选全部
        this.$refs.ysPicker.showModal('range', {//区域选值
            list1: ['面谈', 1,2,3],//第一列 数据
            list2: [1,2,3],//第二列 数据
            no_two: [0],//第二列无数据 下标  即选'面谈' 第二列无数据
        });
        this.$refs.ysPicker.showModal('radio',['测试1','测试2','测试3','测试4']);//单选 key字段下标 可不传
*  -->
<script>
  // import cityData from '@/common/city.js';
  export default {
    name: 'ys-picker',
    props: {
      value: { //初始值
        type: Array,
        default () {
          return []
        }
      },
      title: { //标题
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: 0, //0隐藏 1过渡 2显示
        type: '', //类型 time region
        is_unit:true,
        timeType:'',
        yearIndex:'-1',
        dayIndex:'-1',
        dayNum:'',
        visible: false, //是否可见
        column: [], //列表
        values: this.value, //下标
        oldVal: this.value, //改变前的下标
        indicatorStyle: `height: ${uni.upx2px(90)}px;`, //设置滚动 item高度
        range: [], //区间数据
        regionType: ''
      }
    },
    methods: {
      prevent() {}, //阻止滑动内容
      showModal(type, data, key) { //显示
        uni.hideKeyboard()
        this.visible = false;
        this.show = 0;
        this.type = type || '';
        if (type === 'time') { //如果是时间 y-M-d-h-m-s
          this.initTime(data);
        }  else if (type === 'range') { //自定义 区间+隐藏第二列
          this.range = data;
          this.values = [0, 0]; //初始值
          this.initRange()
        } else { //自定义单选
          this.initRadio(data, key)
        }
        this.show = 1;
        setTimeout(() => {
          this.show = 2;
          this.visible = true;
        }, 100)
      },
      confirm() { //点击确认
        var value = [];
        var oldVal = [];
        for (let i = 0; i < this.values.length; i++) {
          let val = this.column[i][this.values[i]];
          let old = this.column[i][this.oldVal[i]];
          if (this.type == 'time') {
            if(this.column[i].length<=this.values[i]){
              val = this.column[i][this.column[i].length-1] 
            }
            if(this.column[i].length<=this.oldVal[i]){
              old = this.column[i][this.column[i].length-1]
            }
            val = val && (parseFloat(val) || parseFloat(val) == 0) ? parseFloat(val) : '&';
            old = old && (parseFloat(old) || parseFloat(old) == 0) ? parseFloat(old) : '&';
            if (!isNaN(val) && val < 10) {
              val = '0' + val;
            } else {
              val = '' + val;
            }
            if (!isNaN(old) && old < 10) {
              old = '0' + old;
            } else {
              old = '' + old;
            }
          }
          value.push(val)
          oldVal.push(old)
        }
        var objs = {
          title: this.title,
          index: this.values,
          value: value
        }
        if (this.type == 'time') {
          objs.nowTime = oldVal;
        }
        this.$emit('change', objs)
        this.hideModal()
      },
      hideModal() { //隐藏
        this.show = 1;
        setTimeout(() => {
          this.column = [];
          this.values = [];
          this.oldVal = [];
          this.show = 0;
        }, 200)
      },
      bindChange(e) { //监听滚动
        const val = e.detail.value;
        this.values = val;
        if(this.type=='time'&&this.timeType.indexOf('M-d')!=-1){
          var year = new Date().getFullYear(); //年
          if(this.timeType.indexOf('y')!=-1){
            year = parseFloat(this.column[this.yearIndex][val[this.yearIndex]])
          }
          const month = val[this.dayIndex-1]+1;
          if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){//31天
            this.dayNum=31;
          }else if(month==4||month==6||month==9||month==11){
            this.dayNum=30;
          }else if(month==2){
            if(year%4==0){
              this.dayNum=29;
            }else{
              this.dayNum=28;
            }
          }
          var days = [];
          const unitD = (this.is_unit ? '日' : '');
          for (let i = 1; i <= this.dayNum; i++) {
            let str = '0' + i;
            days.push(str.substr(str.length - 2, 2) + unitD)
          }
          this.$set(this.column,this.dayIndex,days)
        }else  if (this.type == 'range') {
          this.initRange()
        }
      },
      //类型1 time 时间 'b-y-M-d-h-m-s'  b 为取当前时间以前(无b则取当前时间以后) y年M月d日 h时m分s秒
      initTime(type) { //时间初始化
        if (!type) {
          type = 'b-y-M-d-h-m';
        }
        this.timeType = type;
        const types = type.split('-');
        var column = []; //列
        var values = []; //初始值
        const date = new Date();
        const year = date.getFullYear(); //年
        const month = date.getMonth() + 1; //月
        const is_unit = (types.indexOf('unit') == -1);
        this.is_unit = is_unit;
        var dayIndex = 0;
        if (types.indexOf('y') != -1) { //计算年
          var years = [];
          const unitY = (is_unit ? '年' : '');
          dayIndex = 0;
          this.yearIndex = 0;
          if (types[0] === 'b') {
            var byear = 0;
            if (!isNaN(types[1])) {
              byear = types[1]
            }
            values.push(80 - byear)
            for (let i = year - 80; i <= year - byear; i++) {
              years.push(i + unitY)
            }
          } else {
            values.push(0)
            for (let i = year; i <= year + 23; i++) {
              years.push(i + unitY)
            }
          }
          column.push(years)
        }

        if (types.indexOf('M') != -1) { //计算月
          var months = [];
          if (types.indexOf('y') != -1){
            dayIndex++;
          }
          values.push(month - 1);
          const unitM = (is_unit ? '月' : '');
          for (let i = 1; i <= 12; i++) {
            let str = '0' + i;
            months.push(str.substr(str.length - 2, 2) + unitM)
          }
          column.push(months)
        }

        if (types.indexOf('d') != -1) { //计算当月日期
          dayIndex++;
          this.dayIndex  = dayIndex;
          if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){//31天
            this.dayNum=31;
          }else if(month==4||month==6||month==9||month==11){
            this.dayNum=30;
          }else if(month==2){
            if(year%4==0){
              this.dayNum=29;
            }else{
              this.dayNum=28;
            }
          }
          var days = [];
          const day = date.getDate(); //日
          const nums = new Date(year, month, 0).getDate();
          const unitD = (is_unit ? '日' : '');
          values.push(day - 1);
          for (let i = 1; i <= nums; i++) {
            let str = '0' + i;
            days.push(str.substr(str.length - 2, 2) + unitD)
          }
          column.push(days)
        }

        if (types.indexOf('h') != -1) { //计算时
          var hours = [];
          const hour = date.getHours(); //时
          values.push(hour);
          const unitH = (is_unit ? '时' : '');
          for (let i = 0; i <= 23; i++) {
            let str = '0' + i;
            hours.push(str.substr(str.length - 2, 2) + unitH)
          }
          column.push(hours)
        }

        if (types.indexOf('m') != -1) { //计算分
          var minutes = [];
          const minute = date.getMinutes(); //分
          values.push(minute);
          const unitM = (is_unit ? '分' : '');
          for (let i = 0; i <= 59; i++) {
            let str = '0' + i;
            minutes.push(str.substr(str.length - 2, 2) + unitM)
          }
          column.push(minutes)
        }

        if (types.indexOf('s') != -1) { //计算秒
          var seconds = [];
          const second = date.getSeconds(); //秒
          values.push(second);
          const unitMs = (is_unit ? '秒' : '');
          for (let i = 0; i <= 59; i++) {
            let str = '0' + i;
            seconds.push(str.substr(str.length - 2, 2) + unitMs)
          }
          column.push(seconds)
        }

        if (types.indexOf('range') != -1) {
          const columnTwo = JSON.parse(JSON.stringify(column));
          const valuesTwo = JSON.parse(JSON.stringify(values));
          column.push(['至']);
          values.push(0);
          column = column.concat(columnTwo);
          values = values.concat(valuesTwo);
        }
        this.column = column;
        this.values = this.value.length > 0 ? this.value : values;
        this.oldVal = this.value.length > 0 ? this.value : values;
      },
      //类型3 range 区间选择
      initRange() {
        this.column[0] = this.range.list1;
        if (this.range.no_two.indexOf(this.values[0]) != -1) {
          this.column[1] = [''];
        } else {
          this.column[1] = this.range.list2;
        }
      },
      //类型4 单选
      initRadio(data, key) {
        var list = [];
        if (key) {
          for (let i = 0, len = data.length; i < len; i++) {
            list.push(data[i][key])
          }
        } else {
          list = data;
        }
        this.column = [list]; //列
        this.values = [0]; //初始值
      },
    }
  }
</script>
<template>
  <view class="ys-picker" :style="{display:show==0?'none':'block'}" @touchmove.stop.prevent="prevent">
    <view class="ys-picker-mask" :class="{mask_transition:show==2}" @tap.stop="hideModal"></view>
    <view class="ys-picker-content" :class="{content_transition:show==2}">
      <view class="ys-picker-title">
        <text>{{title}}</text>
        <image class="ys-picker-confirm" src="../../static/icon/true.png" mode="aspectFit" @tap="confirm"></image>
        <image class="ys-picker-cancel" src="../../static/icon/close.png" mode="aspectFit" @tap="hideModal"></image>
      </view>
      <picker-view class="picker-view" v-if="visible" :indicator-style="indicatorStyle" :value="values" @change="bindChange">
        <picker-view-column v-for="(item,index) in column" :key="index">
          <view class="item" v-for="(itm,key) in item" :key="key">{{itm}}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>
<style lang="scss">
  .ys-picker {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    .ys-picker-mask {
      position: absolute;
      z-index: 90;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .6);
      opacity: 0;
      transition: all 200ms linear;
    }

    .mask_transition {
      opacity: 1;
    }

    .ys-picker-content {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 999;
      transition: all 200ms linear;
      transform: translateY(100%);
      background-color: #fff;
    }

    .content_transition {
      transform: translate(0);
    }

    .ys-picker-title {
      width: 100%;
      height: 88upx;
      line-height: 88upx;
      font-size: 32upx;
      color: #333;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 10upx;
      background-color: #fff;
      position: relative;
      box-sizing: border-box;
    }

    .ys-picker-cancel,
    .ys-picker-confirm {
      position: absolute;
      top: 0;
      width: 88upx;
      height: 88upx;
      padding: 30upx;
      box-sizing: border-box;
    }

    .ys-picker-cancel {
      left: 10upx;
    }

    .ys-picker-confirm {
      right: 10upx;
    }

    .picker-view {
      height: 450upx;
      background-color: #fff;
    }

    .item {
      line-height: 90upx;
      text-align: center;
      font-size: 28upx;
      color: #333;
    }
  }
</style>
