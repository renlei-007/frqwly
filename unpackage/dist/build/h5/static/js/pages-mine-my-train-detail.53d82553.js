(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-my-train-detail"],{2203:function(t,e,n){"use strict";n.r(e);var i=n("eac8"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},2910:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"my-train-detail content"},[n("v-uni-view",{staticClass:"actives_box"},[n("v-uni-view",{staticClass:"actives_box_title"},[t._v(t._s(t.record.content.title))]),1==t.record.status||3==t.record.status?n("v-uni-view",{staticClass:"actives_box_img"},[n("v-uni-image",{staticClass:"code_img",attrs:{src:t.globalUrl+"special/o_create_dimensioncode.jspx?content="+t.qrcodeCotent(),mode:""}}),3==t.record.status?n("v-uni-view",{staticClass:"state"},[n("v-uni-image",{attrs:{src:t.verifyImg}})],1):t._e()],1):t._e(),n("v-uni-view",{staticClass:"info"},[n("v-uni-view",[t._v("编号："+t._s(t.record.id))]),n("v-uni-view",[t._v("报名时间："+t._s(t.record.createTime))]),n("v-uni-view",[t._v("上课时间："+t._s(t.record.content.attr_startTime)+"至"+t._s(t.record.content.attr_endTime))]),n("v-uni-view",[t._v("培训地址："+t._s(t.record.content.attr_address))]),n("v-uni-view",[t._v("状态："),0==t.record.status?n("v-uni-text",[t._v("审核中")]):t._e(),1==t.record.status?n("v-uni-text",[t._v("审核通过")]):t._e(),2==t.record.status?n("v-uni-text",[t._v("审核不通过")]):t._e(),3==t.record.status?n("v-uni-text",[t._v("审核通过,已使用")]):t._e(),4==t.record.status?n("v-uni-text",[t._v("已经取消")]):t._e()],1),t.record.reason?n("v-uni-view",{staticClass:"rule"},[t._v(t._s(t.record.reason))]):t._e()],1),0==t.record.status||1==t.record.status?n("v-uni-view",{staticClass:"cancel_btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancelRecord(t.id)}}},[t._v("取消订单")]):t._e()],1)],1)},o=[]},"491b":function(t,e,n){"use strict";n.r(e);var i=n("2910"),a=n("2203");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("8a24");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"f8d0b4c2",null,!1,i["a"],r);e["default"]=s.exports},"56dc":function(t,e,n){var i=n("ca91f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("57872a34",i,!0,{sourceMap:!1,shadowMode:!1})},"8a24":function(t,e,n){"use strict";var i=n("56dc"),a=n.n(i);a.a},ca91f:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.my-train-detail[data-v-f8d0b4c2]{width:100%;height:100%;background-color:#fff}.my-train-detail .actives_box[data-v-f8d0b4c2]{width:100%;box-sizing:border-box;padding:%?30?%;font-size:%?28?%;line-height:1.8}.my-train-detail .actives_box_tips[data-v-f8d0b4c2]{text-align:center}.my-train-detail .actives_box_img[data-v-f8d0b4c2]{width:%?400?%;height:%?400?%;margin:%?10?% auto %?20?%;position:relative}.my-train-detail .actives_box_img .code_img[data-v-f8d0b4c2]{width:100%;height:100%}.my-train-detail .actives_box_img .state[data-v-f8d0b4c2]{width:100%;height:100%;position:absolute;top:0;left:0}.my-train-detail .actives_box_img .state uni-image[data-v-f8d0b4c2]{width:100%;height:100%}.my-train-detail .actives_box_title[data-v-f8d0b4c2]{font-size:%?34?%;color:#000;padding-bottom:%?10?%;font-weight:700}.my-train-detail .actives_box .rule[data-v-f8d0b4c2]{color:#ff4600}.my-train-detail .actives_box .cancel_btn[data-v-f8d0b4c2]{width:%?200?%;height:%?90?%;margin:%?30?% auto 0;text-align:center;line-height:%?90?%;border:1px solid #ddd;color:#000}',""]),t.exports=e},eac8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{record:{content:{}},verifyImg:"/static/verify_img.png",id:"",globalUrl:"https://furong.culturalcloud.net/"}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{qrcodeCotent:function(){var t={type:5,value:this.id};return encodeURIComponent(JSON.stringify(t))},cancelRecord:function(t){var e=this;uni.showModal({title:"提示",content:"确定要取消该活动预约吗？",success:function(n){n.confirm?e.homeRequest({url:"/ticket/cancelRecord",method:"GET",data:{recordId:t}}).then((function(t){console.log(t),200==t.code?(e.getDetail(),e.toast("取消成功！","none")):e.toast(t.message,"none")})):n.cancel}})},cancel:function(t){var e=this;uni.showModal({title:"提示",content:"确定要取消该活动吗？全年未入场票数达10张，将被取消当年预订资格！",success:function(n){n.confirm?e.homeRequest({url:"/train/cancel",method:"GET",data:{orderNo:t}}).then((function(t){console.log(t),200==t.code?(e.getDetail(),e.toast("取消成功！","none")):e.toast(t.message,"none")})):n.cancel}})},getDetail:function(){var t=this;this.homeRequest({url:"/train/detail",method:"GET",data:{recordId:this.id}}).then((function(e){console.log(e),200==e.code&&(t.record=e.body,console.log(e.body.status),t.indexRequest({url:"/content/get.jspx",data:{format:0,id:t.record.content.id}}).then((function(e){t.content=e.data.body})))}))}}};e.default=i}}]);