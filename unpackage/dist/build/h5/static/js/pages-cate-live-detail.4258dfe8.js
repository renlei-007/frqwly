(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-live-detail"],{"21ab":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{chapters:0,comment:"",id:"",content:{liveRecord:{type:""}},liveList:[],commentList:[],is_show:!1,page:0,fullScreenFlag:!1,ctx:null,playerCtx:null,touchStartTime:0,showControlbar:!0,timer:null,lastTapDiffTime:0,index:0,start_time:0,end_time:0}},onLoad:function(t){this.id=t.id,this.getDetail(),this.getLiveList(),this.isLogin&&this.homeRequest({url:"/view",method:"GET",data:{}})},onReady:function(t){console.log("ready!"),this.ctx=wx.createLivePlayerContext("player"),this.playerCtx=uni.createLivePlayerContext("livePlayer")},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getLiveList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getLiveList()},handleControlbar:function(){console.log(111111111),this.showControlbar=!this.showControlbar},handleFullScreen:function(){var t=this;t.fullScreenFlag?t.playerCtx.exitFullScreen({success:function(e){t.fullScreenFlag=!1,console.log("我要执行了")},fail:function(t){console.log("exit fullscreen success")}}):t.playerCtx.requestFullScreen({success:function(e){t.fullScreenFlag=!0,console.log("我要执行了")},fail:function(t){console.log("fullscreen fail")},direction:90})},close:function(){this.is_show=!1},chapterChange:function(t){this.chapters=t},getDetail:function(){var t=this,e={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:e}).then((function(e){console.log(e);var i=e.data.body;i.txt=t.replaceSpecialChar(i.txt),t.content=i,uni.setNavigationBarTitle({title:i.title})}))},getLiveList:function(){var t=this,e={count:4,channelIds:"113",sort:4};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){console.log(e);var i=e.data.body;t.liveList=i}))},toDetail:function(t){uni.redirectTo({url:"/pages/cate/live-detail?id="+t})}}};e.default=n},"230c":function(t,e,i){var n=i("d10c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("1c043833",n,!0,{sourceMap:!1,shadowMode:!1})},"32a3":function(t,e,i){"use strict";i.r(e);var n=i("4ab8"),a=i("4a1f");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("43df");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"3f7741e3",null,!1,n["a"],s);e["default"]=l.exports},"409c":function(t,e,i){var n=i("89a4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("25b29441",n,!0,{sourceMap:!1,shadowMode:!1})},"43df":function(t,e,i){"use strict";var n=i("409c"),a=i.n(n);a.a},"4a1f":function(t,e,i){"use strict";i.r(e);var n=i("21ab"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"4ab8":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={ysBottom:i("a2ab").default,ysComment:i("eb7c").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"live-detail"},[i("v-uni-view",{staticClass:"video_info"},[i("v-uni-view",{staticClass:"video_play"},[2==t.content.liveRecord.type?i("v-uni-video",{attrs:{id:"myVideo",src:t.content.liveRecord.recordUrl,"object-fit":"fill"}}):t._e(),1==t.content.liveRecord.type?i("v-uni-video",{attrs:{autoplay:!0,"webkit-playsinline":!0}},[i("source",{attrs:{src:t.content.liveRecord.pullUrl,type:"rtmp/flv"}})]):t._e()],1),i("v-uni-view",{staticClass:"video_info_detail"},[i("v-uni-view",{staticClass:"video_info_detail_title"},[t._v(t._s(t.content.title))]),i("v-uni-view",{staticClass:"video_info_detail_txt"},[t._v("发布时间："+t._s(t.content.releaseDate))]),i("v-uni-view",{staticClass:"video_info_detail_txt"},[t._v("视频类型："),t._l(t.content.attr_category,(function(e,n){return i("v-uni-text",{key:n},[t._v(t._s(e+(n==t.content.attr_category.length-1?"":"|")))])}))],2),i("v-uni-view",{staticClass:"video_info_detail_txt"},[t._v("观看人数："+t._s(t.content.views+1))])],1),i("v-uni-view",{staticClass:"tj_active"},[i("v-uni-view",{staticClass:"tj_active_title"},[t._v("视频详情")]),i("v-uni-view",{staticClass:"introduce"},[i("v-uni-rich-text",{attrs:{nodes:t.content.txt}})],1)],1)],1),i("v-uni-view",{staticClass:"tj_active"},[i("v-uni-view",{staticClass:"tj_active_title"},[t._v("相关推荐")]),i("v-uni-view",{staticClass:"tj_active_content"},t._l(t.liveList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"tj_active_content_box",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e.id)}}},[i("v-uni-view",{staticClass:"tj_active_content_box_img"},[i("v-uni-image",{attrs:{src:e.titleImg,mode:""}})],1),i("v-uni-view",{staticClass:"tj_active_content_box_title"},[t._v(t._s(e.title))])],1)})),1)],1),i("ys-bottom",{attrs:{ids:t.id},on:{show:function(e){arguments[0]=e=t.$handleEvent(e),t.is_show=!0}}}),t.is_show?i("ys-comment",{attrs:{ids:t.id,commentList:t.commentList},on:{refresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh.apply(void 0,arguments)},loadMore:function(e){arguments[0]=e=t.$handleEvent(e),t.loadMore.apply(void 0,arguments)},close:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}):t._e()],1)},o=[]},"6c95":function(t,e,i){"use strict";i.r(e);var n=i("8a98"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},8222:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={ysShare:i("4fab").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"public_bottom"},[i("v-uni-view",{staticClass:"public_inp"},[i("v-uni-image",{staticClass:"write",attrs:{src:"/static/write.png",mode:""}}),i("v-uni-view",{staticClass:"public_inp_write",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.show.apply(void 0,arguments)}}},[i("v-uni-input",{attrs:{type:"text",disabled:!0,placeholder:"说点什么吧..."},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1)],1),i("v-uni-view",{staticClass:"icon_area"},[i("v-uni-view",{staticClass:"icon_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.show.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/pinglun.png",mode:""}}),i("v-uni-text",[t._v("评论")])],1),i("v-uni-button",{staticClass:"icon_item",attrs:{"hover-class":"none","open-type":"share"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.share.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/zhuanfa.png",mode:""}}),i("v-uni-text",[t._v("转发")])],1),i("v-uni-view",{staticClass:"icon_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.btnFabulous.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon_img",attrs:{src:t.isFabulous?"/static/cate/dianzan_red.png":"/static/cate/dianzan.png",mode:""}}),i("v-uni-text",{class:{dz_red:t.isFabulous}},[t._v("点赞")])],1),i("v-uni-view",{staticClass:"icon_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.collection.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon_img",attrs:{src:t.is_keep?"/static/cate/shoucang_red.png":"/static/cate/shoucang.png",mode:""}}),i("v-uni-text",{class:{dz_red:t.is_keep}},[t._v("收藏")])],1)],1),i("ys-share",{ref:"share",attrs:{contentHeight:580,shareList:t.shareList}})],1)},o=[]},"89a4":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-3f7741e3]{background-color:#fff}uni-video[data-v-3f7741e3], uni-live-player[data-v-3f7741e3]{width:100%;height:100%}uni-video[data-v-3f7741e3]{height:100%}.live-detail[data-v-3f7741e3]{width:100%;background-color:#fff;box-sizing:border-box;padding-bottom:%?150?%}.live-detail .video_info[data-v-3f7741e3]{width:100%}.live-detail .video_info .video_play[data-v-3f7741e3]{width:100%;height:%?420?%;background:#707070}.live-detail .video_info_detail[data-v-3f7741e3]{width:100%;box-sizing:border-box;padding:0 %?32?% %?16?%;border-bottom:%?2?% solid #ddd}.live-detail .video_info_detail_title[data-v-3f7741e3]{width:100%;font-size:%?40?%;font-weight:500;line-height:%?104?%;color:#1b1c1e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.live-detail .video_info_detail_txt[data-v-3f7741e3]{font-size:%?32?%;font-weight:400;line-height:%?64?%;color:#1b1c1e}.live-detail .video_info .chapters[data-v-3f7741e3]{width:%?654?%;margin:0 auto}.live-detail .video_info .chapters_tab[data-v-3f7741e3]{width:100%;height:%?98?%;border-bottom:%?2?% solid #eee;display:-webkit-box;display:-webkit-flex;display:flex}.live-detail .video_info .chapters_tab_title[data-v-3f7741e3]{font-size:%?40?%;font-weight:400;line-height:%?90?%;color:#8b8b9c;margin-right:%?66?%}.live-detail .video_info .chapters_tab .active[data-v-3f7741e3]{font-weight:500;color:#7565e3;border-bottom:%?8?% solid #7565e3}.live-detail .video_info .chapters_info[data-v-3f7741e3]{width:100%;box-sizing:border-box;padding:%?24?% 0;font-size:%?28?%;color:#222}.live-detail .video_info .chapters_info_list[data-v-3f7741e3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?76?%}.live-detail .video_info .chapters_info .actives[data-v-3f7741e3]{color:#7565e3}.live-detail .recommend[data-v-3f7741e3]{width:100%;box-sizing:border-box;padding:0 %?48?%}.live-detail .recommend_name[data-v-3f7741e3]{font-size:%?40?%;font-weight:500;line-height:%?96?%;color:#1b1c1e;border-bottom:1px solid #eee}.player-tool[data-v-3f7741e3]{width:100%;height:%?60?%;background:rgba(0,0,0,.5);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:absolute;left:0;z-index:1000000;padding:0 %?0?%;-webkit-transition:all .3s;transition:all .3s}.player-tool .tools[data-v-3f7741e3]{height:100%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.player-tool .tools .full-screen[data-v-3f7741e3]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:absolute;right:%?40?%}.player-tool .tools .full-screen .screen_icon[data-v-3f7741e3]{width:%?40?%;height:%?40?%}.player-tool .tools .full-screen .iconfont[data-v-3f7741e3]{color:#fff;font-weight:700;font-size:%?36?%;padding:0 0 0 %?40?%}.player-tool .tools .cruise[data-v-3f7741e3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-left:%?25?%}.player-tool .tools .cruise .iconfont[data-v-3f7741e3]{color:#e45a3e;font-size:%?45?%}body.?%PAGE?%[data-v-3f7741e3]{background-color:#fff}',""]),t.exports=e},"8a98":function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{ids:[String,Number],ups:0},data:function(){return{isFabulous:!1,is_keep:!1,up:0,comment:"",shareList:[{type:1,icon:"/static/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/share_qqzone.png",text:"QQ空间"}]}},mounted:function(){var t=this,e=uni.getStorageSync("fabulous"+this.ids);e&&(this.isFabulous=!0),this.isLogin&&this.homeRequest({url:"/content/collectExit",method:"GET",data:{cId:this.ids}}).then((function(e){"true"==e.body?t.is_keep=!0:t.is_keep=!1}))},methods:{show:function(){this.$emit("show")},share:function(){this.$refs.share.toggleMask()},btnFabulous:function(){var t=this;this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.ids}}).then((function(e){200==e.data.code&&(t.isFabulous=!1,uni.removeStorageSync("fabulous"+t.ids),t.toast("取消点赞成功！"))})):this.indexRequest({url:"/content/up",data:{contentId:this.ids}}).then((function(e){200==e.data.code&&(t.isFabulous=!0,uni.setStorageSync("fabulous"+t.ids,!0),t.toast("点赞成功！"))}))},collection:function(){var t=this;this.isLogin?this.homeRequest({url:"/content/collect",method:"GET",data:{id:this.ids,operate:this.is_keep?0:1}}).then((function(e){200==e.code&&(t.is_keep?t.toast("取消收藏成功！"):t.toast("收藏成功！"),t.is_keep=!t.is_keep)})):uni.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?uni.navigateTo({url:"/pages/login/login?is_thing="+!0}):t.cancel}})}}};e.default=n},"96c5":function(t,e,i){"use strict";var n=i("230c"),a=i.n(n);a.a},a2ab:function(t,e,i){"use strict";i.r(e);var n=i("8222"),a=i("6c95");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("96c5");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"5463f76e",null,!1,n["a"],s);e["default"]=l.exports},d10c:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.dz_red[data-v-5463f76e]{color:#df1414}',""]),t.exports=e}}]);