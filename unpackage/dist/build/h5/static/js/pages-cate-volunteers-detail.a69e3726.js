(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cate-volunteers-detail"],{3894:function(t,n,e){"use strict";e("99af"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{id:"",recordId:"",channelIds:"",content:{},teersList:[],status:0,can_join:!1,comment_show:!1,commentList:[],page:0,isFabulous:!1,is_keep:!1,shareList:[{type:1,icon:"/static/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/share_qqzone.png",text:"QQ空间"}],is_Certification:!1}},onLoad:function(t){this.id=t.id,this.channelIds=t.channelIds,this.isLogin&&(this.getUser(),this.homeRequest({url:"/view",method:"GET",data:{}}))},onShow:function(){var t=this;this.getDetail(),this.getTeersList(),this.getCommentList();var n=uni.getStorageSync("fabulous"+this.id);n&&(this.isFabulous=!0),this.isLogin&&(this.homeRequest({url:"/content/collectExit",method:"GET",data:{cId:this.id}}).then((function(n){"true"==n.body?t.is_keep=!0:t.is_keep=!1})),this.getStatus())},methods:{getStatus:function(){var t=this;127==this.channelIds?this.homeRequest({url:"/volunteer/status",method:"GET",data:{contentId:this.id}}).then((function(n){200==n.code&&(t.status=n.body.status,t.recordId=n.body.recordId)})):this.homeRequest({url:"/group/status",method:"GET",data:{groupId:this.id}}).then((function(n){200==n.code&&(t.status=n.body)}))},refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getCommentList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getCommentList()},close:function(){this.comment_show=!1},share:function(){this.$refs.share.toggleMask()},getUser:function(){var t=this,n=uni.getStorageSync("user_info").username;this.homeRequest({url:"/user/get",method:"get",data:{username:n}}).then((function(n){console.log(n),t.is_Certification=n.body.isCertification}))},getCommentList:function(){var t=this,n={contentId:this.id,checked:1,first:this.page,count:10};this.indexRequest({url:"/comment/list.jspx",data:n}).then((function(n){var e=n.data.body;t.commentList=t.commentList.concat(e)}))},getDetail:function(){var t=this,n={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:n}).then((function(n){var e=n.data.body;if(e.txt=t.replaceSpecialChar(e.txt),t.content=e,uni.setNavigationBarTitle({title:e.title}),142==t.channelIds&&(e.group.memberCount<e.group.toplimit?t.can_join=!0:t.can_join=!1),0==t.status&&t.content.registrationEnd){var i=new Date,s=Date.parse(t.content.registrationEnd);s<i.getTime()&&(t.status=3)}}))},getTeersList:function(){var t=this,n={count:5,channelIds:this.channelIds,sort:4};this.indexRequest({url:"/content/list.jspx",data:n}).then((function(n){console.log(n);var e=n.data.body;e.shift(),t.teersList=e}))},signUp:function(){var t=this;console.log(this.isLogin),this.isLogin?this.is_Certification?127!=this.channelIds?uni.showModal({title:"提示",content:"确定要加入该社团吗？",showCancel:!0,confirmText:"确定",success:function(n){n.confirm?t.homeRequest({url:"/group/join",method:"GET",data:{groupId:t.id}}).then((function(n){200==n.code?(t.toast("报名成功！"),t.status=1):t.toast(n.message,"none")})):n.cancel}}):uni.navigateTo({url:"./volunteers-booking?id="+this.id}):this.toast("您还没有实名认证或认证正在审核中，请检查","none"):uni.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?uni.navigateTo({url:"/pages/login/login?is_thing="+!0}):t.cancel}})},cancel:function(t){var n=this;uni.showModal({title:"提示",content:"确定要退出吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?127==n.channelIds?n.homeRequest({url:"/volunteer/cancel",method:"GET",data:{recordId:n.id}}).then((function(t){200==t.code?(n.toast("操作成功！"),n.status=4):n.toast("操作失败！","none")})):n.homeRequest({url:"/group/cancelApply",method:"GET",data:{groupId:n.id}}).then((function(t){200==t.code?(n.toast("操作成功！"),n.getStatus()):n.toast("操作失败！","none")})):t.cancel}})},todetail:function(t){uni.redirectTo({url:"/pages/cate/volunteers-detail?id="+t+"&&channelIds="+this.channelIds})},btnFabulous:function(){var t=this;this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(t.isFabulous=!1,uni.removeStorageSync("fabulous"+t.id),t.toast("取消点赞成功！"))})):this.indexRequest({url:"/content/up",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(t.isFabulous=!0,uni.setStorageSync("fabulous"+t.id,!0),t.toast("点赞成功！"))}))},collection:function(){var t=this;this.isLogin?this.homeRequest({url:"/content/collect",method:"GET",data:{id:this.id,operate:this.is_keep?0:1}}).then((function(n){200==n.code&&(t.is_keep?t.toast("取消收藏成功！"):t.toast("收藏成功！"),t.is_keep=!t.is_keep)})):uni.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?uni.navigateTo({url:"/pages/login/login?is_thing="+!0}):t.cancel}})}}};n.default=i},4803:function(t,n,e){var i=e("f983");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("50afdd12",i,!0,{sourceMap:!1,shadowMode:!1})},"79a1":function(t,n,e){"use strict";e.r(n);var i=e("3894"),s=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=s.a},a1d3:function(t,n,e){"use strict";var i=e("4803"),s=e.n(i);s.a},cd5c:function(t,n,e){"use strict";e.d(n,"b",(function(){return s})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={ysComment:e("eb7c").default,ysShare:e("4fab").default},s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"volunteers-detail content"},[e("v-uni-view",{staticClass:"major"},[e("v-uni-view",{staticClass:"major_img"},[e("v-uni-image",{staticClass:"major_imgs",attrs:{src:t.content.titleImg,mode:""}})],1),e("v-uni-view",{staticClass:"major_box",staticStyle:{"padding-bottom":"20rpx"}},[e("v-uni-view",{staticClass:"major_box_name"},[t._v(t._s(t.content.title))]),e("v-uni-view",{staticClass:"major_box_text"},[t._v("团队所在地："),e("v-uni-text",[t._v(t._s(t.content.attr_address?t.content.attr_address:"暂无"))])],1),e("v-uni-view",{staticClass:"major_box_text"},[t._v("成立时间："),e("v-uni-text",[t._v(t._s(t.content.sortDate?t.content.sortDate:"暂无"))])],1),127==t.channelIds?e("v-uni-view",{staticClass:"major_box_text"},[t._v("活动类型："),t._l(t.content.attr_type,(function(n,i){return e("v-uni-text",{key:i},[t._v(t._s(i==t.content.attr_type.length-1?n:n+" | "))])}))],2):e("v-uni-view",{staticClass:"major_box_text"},[t._v("社团类型："),e("v-uni-text",[t._v(t._s(t.content.attr_groupType))])],1),127!=t.channelIds?e("v-uni-view",{staticClass:"major_box_text"},[t._v("招募人数："),e("v-uni-text",[t._v(t._s(t.content.group&&t.content.group.toplimit?t.content.group.toplimit:"")+"人")])],1):t._e(),127==t.channelIds?e("v-uni-view",{staticClass:"major_box_text"},[t._v("招募截止日期："),e("v-uni-text",[t._v(t._s(t.content.registrationEnd?t.content.registrationEnd.slice(0,10):""))])],1):e("v-uni-view",{staticClass:"major_box_text"},[t._v("招募日期："),e("v-uni-text",[t._v(t._s(t.content.group&&t.content.group.dateLimit?t.content.group.dateLimit:""))])],1),127==t.channelIds?e("v-uni-view",{staticClass:"major_box_text"},[t._v("电话："),e("v-uni-text",[t._v(t._s(t.content.attr_phone?t.content.attr_phone:"暂无"))])],1):t._e()],1),e("v-uni-view",{staticClass:"blank"}),e("v-uni-view",{staticClass:"tj_active"},[e("v-uni-view",{staticClass:"tj_active_title"},[t._v("详情")]),e("v-uni-view",{staticClass:"introduce"},[e("v-uni-rich-text",{attrs:{nodes:t.content.txt}})],1)],1),e("v-uni-view",{staticClass:"blank"}),e("v-uni-view",{staticClass:"tj_active"},[e("v-uni-view",{staticClass:"tj_active_title"},[t._v("相关推荐")]),e("v-uni-view",{staticClass:"tj_active_content"},t._l(t.teersList,(function(n,i){return e("v-uni-view",{key:i,staticClass:"tj_active_content_box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.todetail(n.id)}}},[e("v-uni-view",{staticClass:"tj_active_content_box_img"},[e("v-uni-image",{attrs:{src:n.titleImg,mode:""}})],1),e("v-uni-view",{staticClass:"tj_active_content_box_title"},[t._v(t._s(n.title))])],1)})),1)],1)],1),e("v-uni-view",{staticClass:"public_bottom"},[e("v-uni-view",{staticClass:"icon_area"},[e("v-uni-view",{staticClass:"icon_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.comment_show=!0}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/pinglun.png",mode:""}}),e("v-uni-text",[t._v("评论")])],1),e("v-uni-button",{staticClass:"icon_item",attrs:{"hover-class":"none","open-type":"share"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.share.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:"/static/cate/zhuanfa.png",mode:""}}),e("v-uni-text",[t._v("转发")])],1),e("v-uni-view",{staticClass:"icon_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.btnFabulous.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:t.isFabulous?"/static/cate/dianzan_red.png":"/static/cate/dianzan.png",mode:""}}),e("v-uni-text",{class:{dz_red:t.isFabulous}},[t._v("点赞")])],1),e("v-uni-view",{staticClass:"icon_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.collection.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"icon_img",attrs:{src:t.is_keep?"/static/cate/shoucang_red.png":"/static/cate/shoucang.png",mode:""}}),e("v-uni-text",{class:{dz_red:t.is_keep}},[t._v("收藏")])],1)],1),127==t.channelIds?[0==t.status?e("v-uni-view",{staticClass:"public_btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.signUp.apply(void 0,arguments)}}},[t._v("成为志愿者")]):t._e(),1==t.status?e("v-uni-view",{staticClass:"public_btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[t._v("取消申请")]):t._e(),2==t.status?e("v-uni-view",{staticClass:"public_btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[t._v("退出")]):t._e(),3==t.status?e("v-uni-view",{staticClass:"public_btn public_btn_g"},[t._v("报名已结束")]):t._e(),4==t.status?e("v-uni-view",{staticClass:"public_btn public_btn_g"},[t._v("已退出不能参与")]):t._e(),5==t.status?e("v-uni-view",{staticClass:"public_btn public_btn_g"},[t._v("已报名过")]):t._e()]:[0==t.status&&t.can_join?e("v-uni-view",{staticClass:"public_btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.signUp.apply(void 0,arguments)}}},[t._v("加入社团")]):t._e(),0!=t.status||t.can_join?t._e():e("v-uni-view",{staticClass:"public_btn public_btn_g"},[t._v("人数已满")]),1==t.status?e("v-uni-view",{staticClass:"public_btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[t._v("取消申请")]):t._e(),2==t.status||3==t.status?e("v-uni-view",{staticClass:"public_btn public_btn_g"},[t._v("已加入社团")]):t._e()]],2),t.comment_show?e("ys-comment",{attrs:{ids:t.id,commentList:t.commentList},on:{refresh:function(n){arguments[0]=n=t.$handleEvent(n),t.refresh.apply(void 0,arguments)},loadMore:function(n){arguments[0]=n=t.$handleEvent(n),t.loadMore.apply(void 0,arguments)},close:function(n){arguments[0]=n=t.$handleEvent(n),t.close.apply(void 0,arguments)}}}):t._e(),e("ys-share",{ref:"share",attrs:{contentHeight:580,shareList:t.shareList}})],1)},a=[]},ed68:function(t,n,e){"use strict";e.r(n);var i=e("cd5c"),s=e("79a1");for(var a in s)"default"!==a&&function(t){e.d(n,t,(function(){return s[t]}))}(a);e("a1d3");var o,c=e("f0c5"),u=Object(c["a"])(s["default"],i["b"],i["c"],!1,null,"4bd1b517",null,!1,i["a"],o);n["default"]=u.exports},f983:function(t,n,e){var i=e("24fb"),s=e("1de5"),a=e("d05f");n=i(!1);var o=s(a);n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-4bd1b517]{background-color:#fff}.volunteers-detail[data-v-4bd1b517]{width:100%;height:100%;overflow:auto;box-sizing:border-box;padding-bottom:%?150?%}.volunteers-detail .major[data-v-4bd1b517]{width:100%}.volunteers-detail .major_img[data-v-4bd1b517]{width:%?690?%;height:%?414?%;margin:%?30?% auto 0;background:url('+o+") no-repeat 50%}.volunteers-detail .major_img .major_imgs[data-v-4bd1b517]{width:100%;height:100%;border-radius:%?8?%}.volunteers-detail .major_box[data-v-4bd1b517]{width:%?690?%;font-size:%?32?%;font-weight:400;color:#1b1c1e;margin:%?16?% auto 0}.volunteers-detail .major_box_name[data-v-4bd1b517]{font-size:%?36?%;font-weight:500;line-height:%?68?%;color:#1b1c1e}.volunteers-detail .major_box_text[data-v-4bd1b517]{line-height:%?64?%}.volunteers-detail .major_box_text uni-text[data-v-4bd1b517]{color:#aaa}body.?%PAGE?%[data-v-4bd1b517]{background-color:#fff}",""]),t.exports=n}}]);