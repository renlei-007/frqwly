(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-policy-document"],{"0948":function(t,e,n){"use strict";n.r(e);var r=n("2c8a"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},"2c8a":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"ys-scroll",props:{scrollLeft:0,param:{type:Object,default:function(){}}},data:function(){return{scroll_x:!1,scroll_y:!0,upper_threshold:50,lower_threshold:50,refresher:!1,refresher_style:" black",refresher_background:"#FFF",load_status:"more",load_text:"加载中...",no_more_text:"没有更多数据了~",triggered:"restore",freshing:!1,no_data_icon:"/static/empty.png",no_data_text:"暂无数据~",background:"#ffffff"}},created:function(){if("{}"!=JSON.stringify(this.param))for(var t in this.param)this[t]=this.param[t]},methods:{onRefresh:function(){this.freshing||(this.freshing=!0,this.$emit("refresh"))},onRestore:function(){this.triggered="restore"},endRefresh:function(){this.triggered=!1,this.freshing=!1},setLoadStatus:function(t){this.load_status=t},loadMore:function(){"no_more"!=this.load_status&&"no_data"!=this.load_status&&this.$emit("loadMore")},setBackground:function(t){this.background=t}}};e.default=r},"4b35":function(t,e,n){var r=n("ac4d");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("61d6346e",r,!0,{sourceMap:!1,shadowMode:!1})},"4b8a":function(t,e,n){"use strict";n.r(e);var r=n("5dbc"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},"4ff7":function(t,e,n){"use strict";n.r(e);var r=n("d476"),a=n("4b8a");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("b461");var o,s=n("f0c5"),l=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"79bb4748",null,!1,r["a"],o);e["default"]=l.exports},5910:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.policy-document[data-v-79bb4748]{width:100%;height:100%;background-color:#fff}.policy-document .file_box[data-v-79bb4748]{width:100%}.policy-document .file_box .file_list[data-v-79bb4748]{width:%?690?%;box-sizing:border-box;padding:%?30?% 0;margin:0 auto;border-bottom:1px solid #ddd;display:-webkit-box;display:-webkit-flex;display:flex}.policy-document .file_box .file_list[data-v-79bb4748]:nth-last-child(1){border-bottom:none}.policy-document .file_box .file_list_name[data-v-79bb4748]{width:100%;font-size:%?32?%;line-height:%?32?%;color:#1b1c1e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.policy-document .file_box .file_list_content[data-v-79bb4748]{font-size:%?24?%;line-height:%?24?%;color:#8b8b9c;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:%?30?%}',""]),t.exports=e},"5dbc":function(t,e,n){"use strict";n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{param:{scroll_y:!0,background:"#fff",refresher:!0,no_more_text:"暂无更多~",refresher_style:"black"},fileList:[],page:0,channelIds:171}},onLoad:function(t){this.channelIds=t.channelIds,uni.setNavigationBarTitle({title:109==t.channelIds?"通知公告":170==t.channelIds?"法律法规":"政策文件"}),this.getList(),this.isLogin&&this.homeRequest({url:"/view",method:"GET",data:{}})},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.fileList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},getList:function(){var t=this,e={channelIds:this.channelIds,count:10,first:this.page,format:0,s_type:this.type};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){0==e.data.body.length&&0==t.fileList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.fileList=t.fileList.concat(e.data.body),e.data.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more"))}))},todetail:function(t){uni.navigateTo({url:"./information-detail?id="+t+"&&channelIds="+this.channelIds})}}};e.default=r},"839d":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-scroll-view",{staticClass:"ys_scroll",style:"background:"+t.background,attrs:{"scroll-left":t.scrollLeft,"scroll-y":t.scroll_y,"scroll-x":t.scroll_x,"lower-threshold":t.lower_threshold,"upper-threshold":t.upper_threshold,"refresher-enabled":t.refresher,"refresher-default-style":t.refresher_style,"refresher-background":t.refresher_background,"refresher-triggered":t.triggered},on:{refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.onRefresh.apply(void 0,arguments)},refresherrestore:function(e){arguments[0]=e=t.$handleEvent(e),t.onRestore.apply(void 0,arguments)},scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[t._t("default"),"loading"==t.load_status?n("v-uni-view",{staticClass:"load_status"},[n("v-uni-view",{staticClass:"loader loader_rotate"}),n("v-uni-view",{staticClass:"text"},[t._v(t._s(t.load_text))])],1):t._e(),"no_more"==t.load_status?n("v-uni-view",{staticClass:"load_status"},[n("v-uni-view",{staticClass:"text"},[t._v(t._s(t.no_more_text))])],1):t._e(),"no_data"==t.load_status?n("v-uni-view",{staticClass:"no_data"},[n("v-uni-image",{staticClass:"no_data_icon",attrs:{src:t.no_data_icon,mode:"aspectFill"}}),n("v-uni-view",{staticClass:"text"},[t._v(t._s(t.no_data_text))])],1):t._e()],2)},i=[]},ac4d:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.ys_scroll[data-v-9dad0cae]{width:100%;height:100%\r\n  /* 旋转动画 */}.ys_scroll .load_status[data-v-9dad0cae]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin:%?15?% 0}.ys_scroll .load_status .text[data-v-9dad0cae]{font-size:%?26?%;color:#909090;margin-left:%?5?%}.ys_scroll .loader[data-v-9dad0cae]{width:%?26?%;height:%?26?%;margin:0 %?10?%;display:inline-block;border-radius:50%;border:%?2?% solid #158bef;border-bottom-color:transparent;vertical-align:middle}.ys_scroll .no_data[data-v-9dad0cae]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ys_scroll .no_data .no_data_icon[data-v-9dad0cae]{width:%?250?%;height:%?210?%;display:block}.ys_scroll .no_data .text[data-v-9dad0cae]{font-size:%?26?%;color:#909090;marign-top:%?15?%}.ys_scroll .loader_rotate[data-v-9dad0cae]{-webkit-animation:loaderRotate-data-v-9dad0cae .6s linear infinite;animation:loaderRotate-data-v-9dad0cae .6s linear infinite}@-webkit-keyframes loaderRotate-data-v-9dad0cae{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn)}}@keyframes loaderRotate-data-v-9dad0cae{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""]),t.exports=e},b461:function(t,e,n){"use strict";var r=n("ecca"),a=n.n(r);a.a},c42f:function(t,e,n){"use strict";n.r(e);var r=n("839d"),a=n("0948");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("ec2d");var o,s=n("f0c5"),l=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"9dad0cae",null,!1,r["a"],o);e["default"]=l.exports},d476:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var r={ysScroll:n("c42f").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"policy-document content"},[n("ys-scroll",{ref:"scroll",attrs:{param:t.param},on:{refresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh.apply(void 0,arguments)},loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"file_box"},t._l(t.fileList,(function(e,r){return n("v-uni-view",{key:r,staticClass:"file_list",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.todetail(e.id)}}},[e.titleImg?n("v-uni-image",{staticStyle:{width:"172rpx",height:"110rpx","margin-right":"20rpx"},attrs:{src:e.titleImg,mode:""}}):t._e(),e.titleImg.length>0?n("v-uni-view",{staticStyle:{width:"calc(100% - 192rpx)"}},[n("v-uni-view",{staticClass:"file_list_name"},[t._v(t._s(e.title))]),n("v-uni-view",{staticClass:"file_list_content"},[t._v(t._s(e.description))])],1):n("v-uni-view",{staticStyle:{width:"100%"}},[n("v-uni-view",{staticClass:"file_list_name"},[t._v(t._s(e.title))]),n("v-uni-view",{staticClass:"file_list_content"},[t._v(t._s(e.description))])],1)],1)})),1)],1)],1)},i=[]},ec2d:function(t,e,n){"use strict";var r=n("4b35"),a=n.n(r);a.a},ecca:function(t,e,n){var r=n("5910");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("89320568",r,!0,{sourceMap:!1,shadowMode:!1})}}]);