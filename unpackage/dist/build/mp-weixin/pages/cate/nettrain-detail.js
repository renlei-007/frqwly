(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/nettrain-detail"],{2259:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{id:"",content:{registrationStart:"",registrationEnd:"",attr_startTime:"",attr_endTime:""},trainList:[],status:0,showStatus:2,comment_show:!1,commentList:[],page:0,isFabulous:!1,is_keep:!1,shareList:[{type:1,icon:"/static/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/share_qqzone.png",text:"QQ空间"}]}},onLoad:function(e){var n=this;this.id=e.id,this.getDetail(),this.getNettrainList(),this.getCommentList();var i=t.getStorageSync("fabulous"+this.id);i&&(this.isFabulous=!0),this.isLogin&&(console.log(111111111),this.homeRequest({url:"/content/collectExit",method:"GET",data:{cId:this.id}}).then((function(t){"true"==t.body?n.is_keep=!0:n.is_keep=!1})),this.getStatus())},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getCommentList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getCommentList()},close:function(){this.comment_show=!1},share:function(){wx.showShareMenu()},getStatus:function(){var t=this;this.homeRequest({url:"/train/status",method:"GET",data:{contentId:this.id}}).then((function(e){200==e.code&&(t.status=e.body.status)}))},signUp:function(){var e=this;this.isLogin?t.getStorageSync("user_info").isCertification?this.homeRequest({url:"/train/add",method:"GET",data:{contentId:this.id}}).then((function(t){200==t.code?(e.toast("报名成功！"),e.getStatus(),e.getDetail()):e.toast(t.message,"none")})):this.toast("您还没有实名认证，请先实名认证！","none"):t.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(e){e.confirm?t.navigateTo({url:"/pages/login/login?is_thing="+!0}):e.cancel}})},signOut:function(){var e=this;t.showModal({title:"提示",content:"确定要取消吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?e.homeRequest({url:"/train/cancel",method:"GET",data:{recordId:e.id}}).then((function(t){200==t.code?(e.toast("取消成功！","none"),e.getStatus(),e.getDetail()):e.toast("取消失败","none")})):t.cancel}})},getCommentList:function(){var t=this,e={contentId:this.id,checked:1,first:this.page,count:10};this.indexRequest({url:"/comment/list.jspx",data:e}).then((function(e){var n=e.data.body;t.commentList=t.commentList.concat(n)}))},getDetail:function(){var e=this;console.log(this.isLogin);var n={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:n}).then((function(n){var i=n.data.body;if(i.txt=e.replaceSpecialChar(i.txt),e.content=i,t.setNavigationBarTitle({title:i.title}),i.registrationStart){var o=new Date,s=e.transformTime(i.registrationStart),a=e.transformTime(i.registrationEnd);s>o.getTime()?e.showStatus=1:a<o.getTime()?e.showStatus=2:e.showStatus=3}}))},getNettrainList:function(){var t=this,e={count:5,channelIds:"133",sort:4};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){if(console.log(e),e.data.body.length>4){var n=e.data.body;n.shift(),t.trainList=n}else t.trainList=e.data.body}))},todetail:function(e){t.redirectTo({url:"/pages/cate/nettrain-detail?id="+e})},transformTime:function(t){var e=t.replace(/-/g,"/");return new Date(e)},btnFabulous:function(){var e=this;this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(e.isFabulous=!1,t.removeStorageSync("fabulous"+e.id),e.toast("取消点赞成功！"))})):this.indexRequest({url:"/content/up",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(e.isFabulous=!0,t.setStorageSync("fabulous"+e.id,!0),e.toast("点赞成功！"))}))},collection:function(){var e=this;this.isLogin?this.homeRequest({url:"/content/collect",method:"GET",data:{id:this.id,operate:this.is_keep?0:1}}).then((function(t){200==t.code&&(e.is_keep?e.toast("取消收藏成功！"):e.toast("收藏成功！"),e.is_keep=!e.is_keep)})):t.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(e){e.confirm?t.navigateTo({url:"/pages/login/login?is_thing="+!0}):e.cancel}})}}};e.default=n}).call(this,n("543d")["default"])},"5c4c":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={ysComment:function(){return Promise.all([n.e("common/vendor"),n.e("components/base/ys-comment")]).then(n.bind(null,"eb7c"))},ysShare:function(){return n.e("components/base/ys-share").then(n.bind(null,"4fab"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.content.registrationStart.slice(0,10)),i=t.content.registrationEnd.slice(0,10),o=t.content.attr_startTime.slice(0,10),s=t.content.attr_endTime.slice(0,10);t._isMounted||(t.e0=function(e){t.comment_show=!0}),t.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:o,g3:s}})},s=[]},"71a8":function(t,e,n){"use strict";n.r(e);var i=n("2259"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},"7f72":function(t,e,n){"use strict";var i=n("ad1a"),o=n.n(i);o.a},ad1a:function(t,e,n){},caa5:function(t,e,n){"use strict";n.r(e);var i=n("5c4c"),o=n("71a8");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("7f72");var a,c=n("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=r.exports},e873:function(t,e,n){"use strict";(function(t){n("41a1");i(n("66fd"));var e=i(n("caa5"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["e873","common/runtime","common/vendor"]]]);