(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-reward-points"],{"0948":function(t,e,i){"use strict";i.r(e);var n=i("2c8a"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},"197e":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={ysScroll:i("c42f").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"reward-points content"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-image",{staticClass:"renwu",attrs:{src:i("7a41"),mode:""}}),n("v-uni-view",{staticClass:"all_point"},[t._v("总积分")]),n("v-uni-view",{staticClass:"point_data"},[t._v(t._s(t.is_login?t.user.score:0))])],1),n("v-uni-view",{staticClass:"pointbody"},[n("v-uni-view",{staticClass:"pointbody_top"},[n("v-uni-view",{staticClass:"pointbody_top_title",class:{active:0==t.Index},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.indexChange(0)}}},[n("v-uni-text",[t._v("我的积分")])],1),n("v-uni-view",{staticClass:"pointbody_top_title",class:{active:1==t.Index},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.indexChange(1)}}},[n("v-uni-text",[t._v("积分规则")])],1)],1),0==t.Index?n("v-uni-view",{staticClass:"pointbody_content",staticStyle:{height:"780rpx"}},[n("ys-scroll",{ref:"scroll",staticClass:"ys_content",staticStyle:{height:"780rpx"},attrs:{param:t.param},on:{refresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh.apply(void 0,arguments)},loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"ys_lines"},[n("v-uni-view",{staticClass:"lines"},[n("v-uni-view",{staticClass:"lines_text"},[t._v("积分类型")])],1)],1),t._l(t.pointList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"ys_content_list"},[n("v-uni-view",{staticClass:"ys_content_list_info"},[n("v-uni-view",{staticClass:"ys_content_list_info_type"},[t._v(t._s(e.remark))]),n("v-uni-view",{staticClass:"ys_content_list_info_add"},[t._v(t._s(0==e.type?"+"+e.score:"-"+e.score))])],1),n("v-uni-view",{staticClass:"ys_content_list_time"},[t._v(t._s(e.upateTime))])],1)}))],2)],1):t._e(),1==t.Index?n("v-uni-view",{staticClass:"pointbody_content"},[n("v-uni-view",{staticClass:"ys_content"},t._l(t.pointRules,(function(e,i){return n("v-uni-view",{key:i,staticClass:"ys_content_list"},[n("v-uni-view",{staticClass:"ys_content_list_info"},[n("v-uni-view",{staticClass:"ys_content_list_info_type"},[t._v(t._s(e.type))]),n("v-uni-view",{staticClass:"ys_content_list_info_add"},[t._v(t._s(e.point>0?"+"+e.point:e.point))])],1),n("v-uni-view",{staticClass:"ys_content_list_time"},[t._v(t._s(e.tips))])],1)})),1)],1):t._e()],1),1==t.Index?n("v-uni-view",{staticClass:"tips"},[t._v("1.积分针对活动预约、场馆预订、公益培训、大讲堂需要积分时直接抵扣使用。"),n("br"),t._v("2.积分可以累积，有效期至少为1年，即从获得开始至次年年底，逾期自动作废。")]):t._e()],1)},s=[]},"2c8a":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"ys-scroll",props:{scrollLeft:0,param:{type:Object,default:function(){}}},data:function(){return{scroll_x:!1,scroll_y:!0,upper_threshold:50,lower_threshold:50,refresher:!1,refresher_style:" black",refresher_background:"#FFF",load_status:"more",load_text:"加载中...",no_more_text:"没有更多数据了~",triggered:"restore",freshing:!1,no_data_icon:"/static/empty.png",no_data_text:"暂无数据~",background:"#ffffff"}},created:function(){if("{}"!=JSON.stringify(this.param))for(var t in this.param)this[t]=this.param[t]},methods:{onRefresh:function(){this.freshing||(this.freshing=!0,this.$emit("refresh"))},onRestore:function(){this.triggered="restore"},endRefresh:function(){this.triggered=!1,this.freshing=!1},setLoadStatus:function(t){this.load_status=t},loadMore:function(){"no_more"!=this.load_status&&"no_data"!=this.load_status&&this.$emit("loadMore")},setBackground:function(t){this.background=t}}};e.default=n},"3b6e":function(t,e,i){var n=i("4cdb");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("52412a38",n,!0,{sourceMap:!1,shadowMode:!1})},"4b35":function(t,e,i){var n=i("ac4d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("61d6346e",n,!0,{sourceMap:!1,shadowMode:!1})},"4cdb":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-99349e5e]{background-color:#fff}.reward-points[data-v-99349e5e]{width:100%}.reward-points .header[data-v-99349e5e]{width:100%;height:%?400?%;background:-webkit-linear-gradient(306deg,#956fec,#9f7cef);background:linear-gradient(144deg,#956fec,#9f7cef);position:relative;box-sizing:border-box;padding-top:%?40?%}.reward-points .header .renwu[data-v-99349e5e]{width:%?336?%;height:%?370?%;position:absolute;right:%?54?%;bottom:%?14?%}.reward-points .header .all_point[data-v-99349e5e]{font-size:%?32?%;font-weight:400;line-height:%?32?%;color:#fff;margin-left:%?48?%}.reward-points .header .point_data[data-v-99349e5e]{font-size:%?96?%;font-family:DIN;font-weight:700;line-height:%?118?%;color:#fff;margin:%?32?% 0 0 %?48?%}.reward-points .pointbody[data-v-99349e5e]{width:%?690?%;box-shadow:0 %?6?% %?12?% rgba(21,11,77,.16);border-radius:%?20?%;background-color:#fff;margin:%?-140?% auto 0;min-height:%?800?%;position:relative}.reward-points .pointbody_top[data-v-99349e5e]{width:100%;height:%?140?%;display:-webkit-box;display:-webkit-flex;display:flex}.reward-points .pointbody_top_title[data-v-99349e5e]{width:50%;height:%?130?%;background:-webkit-linear-gradient(bottom,#8989e3,#fff);background:linear-gradient(1turn,#8989e3,#fff);border-radius:%?20?%;line-height:%?130?%;text-align:center;font-size:%?32?%;opacity:.8;color:#1b1c1e}.reward-points .pointbody_top .active[data-v-99349e5e]{background:#fff;opacity:1;font-size:%?40?%;color:#6952e1}.reward-points .pointbody_top .active uni-text[data-v-99349e5e]{display:inline-block;height:%?122?%;border-bottom:%?8?% solid #7630df}.reward-points .pointbody_content[data-v-99349e5e]{width:100%;box-sizing:border-box;padding:0 %?48?%}.reward-points .pointbody_content .ys_content[data-v-99349e5e]{width:100%}.reward-points .pointbody_content .ys_content .ys_lines[data-v-99349e5e]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?28?%}.reward-points .pointbody_content .ys_content .ys_lines .lines[data-v-99349e5e]{width:%?272?%;height:%?11?%;border-bottom:%?1?% solid #ccc;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.reward-points .pointbody_content .ys_content .ys_lines .lines_text[data-v-99349e5e]{width:%?128?%;height:%?22?%;line-height:%?22?%;background-color:#fff;font-size:%?22?%;font-weight:400;color:#999;text-align:center}.reward-points .pointbody_content .ys_content_list[data-v-99349e5e]{width:100%;height:%?148?%;box-sizing:border-box;padding:%?32?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?28?%;border-bottom:%?1?% solid #ddd}.reward-points .pointbody_content .ys_content_list[data-v-99349e5e]:nth-last-child(1){border:none}.reward-points .pointbody_content .ys_content_list_info[data-v-99349e5e]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;color:#6d6e6f;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;line-height:%?28?%}.reward-points .pointbody_content .ys_content_list_time[data-v-99349e5e]{color:#ccc;line-height:%?28?%}.reward-points .tips[data-v-99349e5e]{width:%?690?%;margin:%?50?% auto;font-size:%?22?%;line-height:%?40?%;color:silver}body.?%PAGE?%[data-v-99349e5e]{background-color:#fff}',""]),t.exports=e},"608c":function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{Index:0,user:{},is_login:!0,param:{scroll_y:!0,background:"#fff",refresher:!0,no_more_text:"",refresher_style:"black"},page:0,pointList:[],pointRules:[{type:"个人用户注册",point:5,tips:"仅1次"},{type:"实名认证",point:100,tips:"仅1次"},{type:"快速登录",point:1,tips:"每日登录记一次"},{type:"第三方登录",point:1,tips:"每日登录记一次"},{type:"分享",point:2,tips:"每日分享记一次"},{type:"连续签到1-5天",point:1,tips:"每次签到加1分"},{type:"搜索行为",point:10,tips:"不累计，仅1次"},{type:"用户每评论一次",point:5,tips:"评论审核通过加分"},{type:"每收藏一条资源",point:1,tips:"累计1天不超过20分"},{type:"浏览平台资源",point:1,tips:"累计1天不超过20分"},{type:"观看直播",point:1,tips:"累计1天不超过20分"},{type:"抽奖",point:0,tips:"不限次数"},{type:"参加志愿活动",point:10,tips:"累计1天不超过20分"},{type:"场馆预定",point:5,tips:"累计1天不超过20分"},{type:"活动预定",point:5,tips:"累计1天不超过20分"},{type:"培训",point:5,tips:"累计1天不超过20分"},{type:"参加社团文化",point:5,tips:"累计1天不超过20分"},{type:"编写旅游攻略",point:10,tips:"累计1天不超过20分"}]}},onLoad:function(){uni.getStorageSync("user_info")&&(this.user=uni.getStorageSync("user_info")),"{}"==JSON.stringify(this.user)?this.is_login=!1:this.is_login=!0,this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.pointList=[],this.getList(this.page),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList(this.page)},getList:function(){var t=this,e={first:this.page,count:10};this.homeRequest({url:"/score/list",method:"GET",data:e}).then((function(e){console.log(e),200==e.code?0==e.body.length&&0==t.pointList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.pointList=t.pointList.concat(e.body),e.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more")):t.toast(e.message,"none")}))},indexChange:function(t){this.Index!=t&&(this.Index=t)}}};e.default=n},"73f9":function(t,e,i){"use strict";i.r(e);var n=i("608c"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},"7a41":function(t,e,i){t.exports=i.p+"static/img/renwu.4002b87b.png"},"839d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-scroll-view",{staticClass:"ys_scroll",style:"background:"+t.background,attrs:{"scroll-left":t.scrollLeft,"scroll-y":t.scroll_y,"scroll-x":t.scroll_x,"lower-threshold":t.lower_threshold,"upper-threshold":t.upper_threshold,"refresher-enabled":t.refresher,"refresher-default-style":t.refresher_style,"refresher-background":t.refresher_background,"refresher-triggered":t.triggered},on:{refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.onRefresh.apply(void 0,arguments)},refresherrestore:function(e){arguments[0]=e=t.$handleEvent(e),t.onRestore.apply(void 0,arguments)},scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)}}},[t._t("default"),"loading"==t.load_status?i("v-uni-view",{staticClass:"load_status"},[i("v-uni-view",{staticClass:"loader loader_rotate"}),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.load_text))])],1):t._e(),"no_more"==t.load_status?i("v-uni-view",{staticClass:"load_status"},[i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.no_more_text))])],1):t._e(),"no_data"==t.load_status?i("v-uni-view",{staticClass:"no_data"},[i("v-uni-image",{staticClass:"no_data_icon",attrs:{src:t.no_data_icon,mode:"aspectFill"}}),i("v-uni-view",{staticClass:"text"},[t._v(t._s(t.no_data_text))])],1):t._e()],2)},s=[]},a04a:function(t,e,i){"use strict";var n=i("3b6e"),o=i.n(n);o.a},ac4d:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.ys_scroll[data-v-9dad0cae]{width:100%;height:100%\r\n  /* 旋转动画 */}.ys_scroll .load_status[data-v-9dad0cae]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin:%?15?% 0}.ys_scroll .load_status .text[data-v-9dad0cae]{font-size:%?26?%;color:#909090;margin-left:%?5?%}.ys_scroll .loader[data-v-9dad0cae]{width:%?26?%;height:%?26?%;margin:0 %?10?%;display:inline-block;border-radius:50%;border:%?2?% solid #158bef;border-bottom-color:transparent;vertical-align:middle}.ys_scroll .no_data[data-v-9dad0cae]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ys_scroll .no_data .no_data_icon[data-v-9dad0cae]{width:%?250?%;height:%?210?%;display:block}.ys_scroll .no_data .text[data-v-9dad0cae]{font-size:%?26?%;color:#909090;marign-top:%?15?%}.ys_scroll .loader_rotate[data-v-9dad0cae]{-webkit-animation:loaderRotate-data-v-9dad0cae .6s linear infinite;animation:loaderRotate-data-v-9dad0cae .6s linear infinite}@-webkit-keyframes loaderRotate-data-v-9dad0cae{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn)}}@keyframes loaderRotate-data-v-9dad0cae{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""]),t.exports=e},bb0b:function(t,e,i){"use strict";i.r(e);var n=i("197e"),o=i("73f9");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("a04a");var a,r=i("f0c5"),d=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"99349e5e",null,!1,n["a"],a);e["default"]=d.exports},c42f:function(t,e,i){"use strict";i.r(e);var n=i("839d"),o=i("0948");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("ec2d");var a,r=i("f0c5"),d=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"9dad0cae",null,!1,n["a"],a);e["default"]=d.exports},ec2d:function(t,e,i){"use strict";var n=i("4b35"),o=i.n(n);o.a}}]);