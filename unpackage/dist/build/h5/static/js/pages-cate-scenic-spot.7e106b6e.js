(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-scenic-spot"],{"148d":function(t,i,e){"use strict";var n=e("73dc"),s=e.n(n);s.a},"230c":function(t,i,e){var n=e("d10c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("1c043833",n,!0,{sourceMap:!1,shadowMode:!1})},"478b":function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}));var n={ysBottom:e("a2ab").default,ysComment:e("eb7c").default},s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"scenic-spot content"},[e("v-uni-view",{staticClass:"spot_info"},[e("v-uni-swiper",{staticClass:"spot_info_img",attrs:{circular:!0,autoplay:!t.content.attr_videopath,"indicator-dots":"true","indicator-active-color":"rgba(255,153,51,1)"}},[t.content.attr_videopath?e("v-uni-swiper-item",{staticClass:"swiper-item"},[e("v-uni-video",{staticClass:"video-box",attrs:{id:"myVideo",src:t.content.attr_videopath,controls:!1,"object-fit":"fill"}})],1):t._e(),t._l(t.content.picArr,(function(i,n){return e("v-uni-swiper-item",{key:n,staticClass:"swiper-recommend",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.preview()}}},[e("v-uni-image",{staticClass:"swiper_img",attrs:{src:i.picPaths,mode:"widthFix"}}),e("v-uni-image",{staticClass:"screen",attrs:{src:"/static/screen.png",mode:""}})],1)}))],2),e("v-uni-view",{staticClass:"spot_info_title"},[t._v(t._s(t.content.title))]),e("v-uni-view",{staticClass:"spot_info_line"},[e("v-uni-image",{attrs:{src:"/static/first_time.png",mode:""}}),e("v-uni-text",[t._v(t._s(t.content.attr_open?t.content.attr_open:"暂无"))])],1),e("v-uni-view",{staticClass:"spot_info_line"},[e("v-uni-image",{staticStyle:{width:"26rpx"},attrs:{src:"/static/position.png",mode:""}}),e("v-uni-text",[t._v(t._s(t.content.attr_address))]),t.content.position.lng>0&&t.content.position.lat>0?e("v-uni-view",{staticClass:"openmap",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openMap(t.content)}}},[t._v("查看地图")]):t._e()],1),e("v-uni-view",{staticClass:"spot_info_line"},[e("v-uni-image",{staticStyle:{width:"28rpx",height:"28rpx"},attrs:{src:"/static/phone.png",mode:""}}),e("v-uni-text",[t._v(t._s(t.content.attr_phone?t.content.attr_phone:"暂无"))])],1)],1),e("v-uni-view",{staticClass:"blank"}),e("v-uni-view",{staticClass:"active_detail"},[e("v-uni-view",{staticClass:"active_detail_tab"},[e("v-uni-view",{staticClass:"active_detail_tab_title active"},[t._v(t._s(204==t.channelIds?"美食简介":205==t.channelIds?"酒店简介":206==t.channelIds?"公司简介":"景点简介"))])],1),e("v-uni-view",{staticClass:"spot_detail"},[e("v-uni-rich-text",{attrs:{nodes:t.content.txt}})],1)],1),e("v-uni-view",{staticClass:"blank"}),e("v-uni-view",{staticClass:"tj_active"},[e("v-uni-view",{staticClass:"tj_active_title"},[t._v("相关推荐")]),e("v-uni-view",{staticClass:"tj_active_content"},t._l(t.tourList,(function(i,n){return e("v-uni-view",{key:n,staticClass:"tj_active_content_box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.todetail(i.id)}}},[e("v-uni-view",{staticClass:"tj_active_content_box_img"},[e("v-uni-image",{attrs:{src:i.titleImg,mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"tj_active_content_box_title"},[t._v(t._s(i.stitle))])],1)})),1)],1),e("ys-bottom",{attrs:{ids:t.spotId},on:{show:function(i){arguments[0]=i=t.$handleEvent(i),t.is_show=!0}}}),t.is_show?e("ys-comment",{attrs:{ids:t.spotId,commentList:t.commentList},on:{refresh:function(i){arguments[0]=i=t.$handleEvent(i),t.refresh.apply(void 0,arguments)},loadMore:function(i){arguments[0]=i=t.$handleEvent(i),t.loadMore.apply(void 0,arguments)},close:function(i){arguments[0]=i=t.$handleEvent(i),t.close.apply(void 0,arguments)}}}):t._e()],1)},a=[]},"6c95":function(t,i,e){"use strict";e.r(i);var n=e("8a98"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},"73dc":function(t,i,e){var n=e("95b8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("279228ff",n,!0,{sourceMap:!1,shadowMode:!1})},8214:function(t,i,e){"use strict";e.r(i);var n=e("478b"),s=e("a92f");for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("148d");var o,c=e("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,"987dfee6",null,!1,n["a"],o);i["default"]=r.exports},8222:function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}));var n={ysShare:e("4fab").default},s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"public_bottom"},[e("v-uni-view",{staticClass:"public_inp"},[e("v-uni-image",{staticClass:"write",attrs:{src:"/static/write.png",mode:""}}),e("v-uni-view",{staticClass:"public_inp_write",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.show.apply(void 0,arguments)}}},[e("v-uni-input",{attrs:{type:"text",disabled:!0,placeholder:"说点什么吧..."},model:{value:t.comment,callback:function(i){t.comment=i},expression:"comment"}})],1)],1),e("v-uni-view",{staticClass:"icon_area"},[e("v-uni-view",{staticClass:"icon_item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.show.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/pinglun.png",mode:""}}),e("v-uni-text",[t._v("评论")])],1),e("v-uni-button",{staticClass:"icon_item",attrs:{"hover-class":"none","open-type":"share"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.share.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/zhuanfa.png",mode:""}}),e("v-uni-text",[t._v("转发")])],1),e("v-uni-view",{staticClass:"icon_item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.btnFabulous.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:t.isFabulous?"/static/cate/dianzan_red.png":"/static/cate/dianzan.png",mode:""}}),e("v-uni-text",{class:{dz_red:t.isFabulous}},[t._v("点赞")])],1),e("v-uni-view",{staticClass:"icon_item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.collection.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:t.is_keep?"/static/cate/shoucang_red.png":"/static/cate/shoucang.png",mode:""}}),e("v-uni-text",{class:{dz_red:t.is_keep}},[t._v("收藏")])],1)],1),e("ys-share",{ref:"share",attrs:{contentHeight:580,shareList:t.shareList}})],1)},a=[]},"8a98":function(t,i,e){"use strict";e("a9e3"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={props:{ids:[String,Number],ups:0},data:function(){return{isFabulous:!1,is_keep:!1,up:0,comment:"",shareList:[{type:1,icon:"/static/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/share_qqzone.png",text:"QQ空间"}]}},mounted:function(){var t=this,i=uni.getStorageSync("fabulous"+this.ids);i&&(this.isFabulous=!0),this.isLogin&&this.homeRequest({url:"/content/collectExit",method:"GET",data:{cId:this.ids}}).then((function(i){"true"==i.body?t.is_keep=!0:t.is_keep=!1}))},methods:{show:function(){this.$emit("show")},share:function(){this.$refs.share.toggleMask()},btnFabulous:function(){var t=this;this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.ids}}).then((function(i){200==i.data.code&&(t.isFabulous=!1,uni.removeStorageSync("fabulous"+t.ids),t.toast("取消点赞成功！"))})):this.indexRequest({url:"/content/up",data:{contentId:this.ids}}).then((function(i){200==i.data.code&&(t.isFabulous=!0,uni.setStorageSync("fabulous"+t.ids,!0),t.toast("点赞成功！"))}))},collection:function(){var t=this;this.isLogin?this.homeRequest({url:"/content/collect",method:"GET",data:{id:this.ids,operate:this.is_keep?0:1}}).then((function(i){200==i.code&&(t.is_keep?t.toast("取消收藏成功！"):t.toast("收藏成功！"),t.is_keep=!t.is_keep)})):uni.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?uni.navigateTo({url:"/pages/login/login?is_thing="+!0}):t.cancel}})}}};i.default=n},"95b8":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-987dfee6]{background-color:#fff}.scenic-spot[data-v-987dfee6]{width:100%;height:auto;box-sizing:border-box;padding-bottom:%?150?%}.scenic-spot .spot_info[data-v-987dfee6]{width:%?690?%;box-sizing:border-box;padding:%?30?% 0;margin:0 auto}.scenic-spot .spot_info_img[data-v-987dfee6]{width:100%;height:%?414?%;background-color:#e5e5e5}.scenic-spot .spot_info_img uni-video[data-v-987dfee6]{width:100%;height:100%}.scenic-spot .spot_info_img .swiper-recommend[data-v-987dfee6]{width:100%;height:100%;position:relative}.scenic-spot .spot_info_img .swiper-recommend .swiper_img[data-v-987dfee6]{width:100%;height:100%}.scenic-spot .spot_info_img .swiper-recommend .screen[data-v-987dfee6]{width:%?40?%;height:%?40?%;position:absolute;right:%?20?%;bottom:%?20?%}.scenic-spot .spot_info_title[data-v-987dfee6]{font-size:%?40?%;font-weight:500;line-height:%?64?%;color:#1b1c1e;margin:%?20?% 0}.scenic-spot .spot_info_line[data-v-987dfee6]{font-size:%?32?%;color:#1b1c1e;display:-webkit-box;display:-webkit-flex;display:flex;height:%?64?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.scenic-spot .spot_info_line uni-image[data-v-987dfee6]{width:%?28?%;height:%?28?%;margin-right:%?16?%}.scenic-spot .spot_info_line uni-text[data-v-987dfee6]{display:block;max-width:calc(100% - %?160?%);line-height:%?64?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.scenic-spot .spot_info_line .openmap[data-v-987dfee6]{width:%?108?%;height:%?38?%;border:%?2?% solid #5d4ade;opacity:1;border-radius:%?8?%;line-height:%?38?%;font-size:%?22?%;text-align:center;color:#614ddf;margin-left:%?10?%}.scenic-spot .active_detail[data-v-987dfee6]{width:%?654?%;margin:0 auto}.scenic-spot .active_detail_tab[data-v-987dfee6]{width:100%;height:%?98?%;border-bottom:%?2?% solid #ddd;display:-webkit-box;display:-webkit-flex;display:flex}.scenic-spot .active_detail_tab_title[data-v-987dfee6]{font-size:%?40?%;font-weight:400;line-height:%?90?%;color:#7565e3;margin-right:%?66?%}.scenic-spot .active_detail_tab .active[data-v-987dfee6]{font-weight:500;color:#1b1c1e;border-bottom:%?8?% solid #7565e3}.scenic-spot .active_detail_content[data-v-987dfee6]{width:100%;min-height:%?400?%}.scenic-spot .active_detail .spot_detail[data-v-987dfee6]{width:100%;box-sizing:border-box;padding:%?40?% 0;font-size:%?28?%;font-weight:400;line-height:%?40?%}.video-box[data-v-987dfee6]{width:100%;height:100%}body.?%PAGE?%[data-v-987dfee6]{background-color:#fff}',""]),t.exports=i},"96c5":function(t,i,e){"use strict";var n=e("230c"),s=e.n(n);s.a},"9a86":function(t,i,e){"use strict";e("99af"),e("d81d"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{spotId:"",content:{position:{lat:0,lng:0}},tourList:[],commentList:[],is_show:!1,page:0,channelIds:"",imgList:[]}},onLoad:function(t){this.spotId=t.id,this.channelIds=t.channelIds,this.getDetail(),this.getTourList(),this.getCommentList(),this.isLogin&&this.homeRequest({url:"/view",method:"GET",data:{}})},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getCommentList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getCommentList()},close:function(){this.is_show=!1},getCommentList:function(){var t=this,i={contentId:this.id,checked:1,first:this.page,count:10};this.indexRequest({url:"/comment/list.jspx",data:i}).then((function(i){console.log(i);var e=i.data.body;t.commentList=t.commentList.concat(e)}))},getDetail:function(){var t=this,i={format:0,id:this.spotId};this.indexRequest({url:"/content/get.jspx",data:i}).then((function(i){var e=i.data.body;e.txt=t.replaceSpecialChar(e.txt),t.content=e,uni.setNavigationBarTitle({title:e.title})}))},getTourList:function(){var t=this,i={count:4,channelIds:this.channelIds,orderBy:9,format:0};this.indexRequest({url:"/content/list.jspx",data:i}).then((function(i){console.log(i);var e=i.data.body;t.tourList=e}))},operate:function(t){var i=this;2==t&&(this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.spotId}}).then((function(t){200==t.data.code?(i.isFabulous=!1,uni.setStorageSync("fabulous"+i.spotId,!1),i.toast("取消点赞成功！","none")):i.toast(t.data.message,"none")})):this.indexRequest({url:"/content/up",data:{contentId:this.spotId}}).then((function(t){200==t.data.code?(i.isFabulous=!0,uni.setStorageSync("fabulous"+i.spotId,!0),i.toast("点赞成功！")):i.toast(t.data.message,"none")})))},todetail:function(t){uni.redirectTo({url:"/pages/cate/scenic-spot?id="+t})},openMap:function(t){var i=this.bMapToQQMap(t.position.lng,t.position.lat);uni.openLocation({latitude:i.lat,longitude:i.lng,name:t.title,address:t.attr_address})},preview:function(){var t=this;this.imgList=[],this.content.picArr.map((function(i){t.imgList.push(i.picPaths)})),this.previewImage(this.imgList)}}};i.default=n},a2ab:function(t,i,e){"use strict";e.r(i);var n=e("8222"),s=e("6c95");for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("96c5");var o,c=e("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,"5463f76e",null,!1,n["a"],o);i["default"]=r.exports},a92f:function(t,i,e){"use strict";e.r(i);var n=e("9a86"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},d10c:function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.dz_red[data-v-5463f76e]{color:#df1414}',""]),t.exports=i}}]);