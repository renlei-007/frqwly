(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-active-code"],{3587:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.active-code[data-v-2ad1a386]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.active-code .active_code_img[data-v-2ad1a386]{width:%?508?%;height:%?508?%}',""]),t.exports=e},"3d63":function(t,e,n){var r=n("3587");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var c=n("4f06").default;c("d2b130e2",r,!0,{sourceMap:!1,shadowMode:!1})},"4ccb":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"active-code content"},[n("v-uni-image",{staticClass:"active_code_img",attrs:{src:t.baseUrl+"/special/o_create_dimensioncode.jspx?content="+t.qrcodeCotent(t.record.orders[0]),mode:""}})],1)},i=[]},7136:function(t,e,n){"use strict";n.r(e);var r=n("4ccb"),c=n("c5bf");for(var i in c)"default"!==i&&function(t){n.d(e,t,(function(){return c[t]}))}(i);n("c4fa");var o,a=n("f0c5"),d=Object(a["a"])(c["default"],r["b"],r["c"],!1,null,"2ad1a386",null,!1,r["a"],o);e["default"]=d.exports},7919:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{id:"",code:"",record:{orders:[]},content:{}}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{qrcodeCotent:function(t){var e={type:1,value:t.orderNo};return encodeURIComponent(JSON.stringify(e))},getDetail:function(){var t=this;this.id;this.homeRequest({url:"/ticket/detail",data:{recordId:this.id}}).then((function(e){console.log(e),t.record=e.body,t.indexRequest({url:"/content/get.jspx",data:{format:0,id:t.record.content.id}}).then((function(e){console.log(e);var n=e.data.body;t.content=n}))}))}}};e.default=r},c4fa:function(t,e,n){"use strict";var r=n("3d63"),c=n.n(r);c.a},c5bf:function(t,e,n){"use strict";n.r(e);var r=n("7919"),c=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=c.a}}]);