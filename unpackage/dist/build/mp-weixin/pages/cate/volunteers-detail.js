(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/volunteers-detail"],{"0ffe":function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("ed68"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"35f9":function(t,e,n){},"60b1":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={ysComment:function(){return Promise.all([n.e("common/vendor"),n.e("components/base/ys-comment")]).then(n.bind(null,"eb7c"))},ysShare:function(){return n.e("components/base/ys-share").then(n.bind(null,"4fab"))}},s=function(){var t=this,e=t.$createElement,n=(t._self._c,127==t.channelIds&&t.content.attr_startTime?t.content.attr_startTime.slice(0,10):null),o=127==t.channelIds&&t.content.attr_endTime?t.content.attr_endTime.slice(0,10):null;t._isMounted||(t.e0=function(e){t.comment_show=!0}),t.$mp.data=Object.assign({},{$root:{g0:n,g1:o}})},i=[]},"6bfa":function(t,e,n){"use strict";var o=n("35f9"),s=n.n(o);s.a},"79a1":function(t,e,n){"use strict";n.r(e);var o=n("7a4f"),s=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=s.a},"7a4f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{id:"",recordId:"",channelIds:"",content:{},teersList:[],status:0,comment_show:!1,commentList:[],page:0,isFabulous:!1,is_keep:!1,shareList:[{type:1,icon:"/static/share_wechat.png",text:"微信好友"},{type:2,icon:"/static/share_moment.png",text:"朋友圈"},{type:3,icon:"/static/share_qq.png",text:"QQ好友"},{type:4,icon:"/static/share_qqzone.png",text:"QQ空间"}]}},onLoad:function(e){var n=this;this.id=e.id,this.channelIds=e.channelIds,this.getDetail(),this.getTeersList(),this.getCommentList();var o=t.getStorageSync("fabulous"+this.id);o&&(this.isFabulous=!0),this.isLogin&&(this.homeRequest({url:"/content/collectExit",method:"GET",data:{cId:this.id}}).then((function(t){"true"==t.body?n.is_keep=!0:n.is_keep=!1})),this.getStatus())},methods:{getStatus:function(){var t=this;127==this.channelIds?this.homeRequest({url:"/volunteer/status",method:"GET",data:{contentId:this.id}}).then((function(e){200==e.code&&(t.status=e.body.status,t.recordId=e.body.recordId)})):this.homeRequest({url:"/group/status",method:"GET",data:{groupId:this.id}}).then((function(e){200==e.code&&(t.status=e.body)}))},refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getCommentList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getCommentList()},close:function(){this.comment_show=!1},share:function(){wx.showShareMenu()},getCommentList:function(){var t=this,e={contentId:this.id,checked:1,first:this.page,count:10};this.indexRequest({url:"/comment/list.jspx",data:e}).then((function(e){var n=e.data.body;t.commentList=t.commentList.concat(n)}))},getDetail:function(){var e=this,n={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:n}).then((function(n){var o=n.data.body;if(e.content=o,t.setNavigationBarTitle({title:o.title}),0==e.status&&e.content.registrationEnd){var s=new Date,i=Date.parse(e.content.registrationEnd);i<s.getTime()&&(e.status=3)}console.log(e.isLogin)}))},getTeersList:function(){var t=this,e={count:5,channelIds:this.channelIds,sort:4};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){console.log(e);var n=e.data.body;n.shift(),t.teersList=n}))},signUp:function(){var e=this;console.log(this.isLogin),this.isLogin||t.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(e){e.confirm?t.navigateTo({url:"/pages/login/login?is_thing="+!0}):e.cancel}}),this.isCertification||t.showModal({title:"提示",content:"您还没有实名认证，请先实名认证吧！",showCancel:!0,confirmText:"确定",success:function(t){t.confirm||t.cancel}}),127==this.channelIds?this.homeRequest({url:"/volunteer/add",method:"GET",data:{contentId:this.id}}).then((function(t){200==t.code?(e.toast("报名成功！"),e.status=1):e.toast(t.message,"none")})):this.homeRequest({url:"/group/join",method:"GET",data:{groupId:this.id}}).then((function(t){200==t.code?(e.toast("报名成功！"),e.status=1):e.toast(t.message,"none")}))},cancel:function(e){var n=this;t.showModal({title:"提示",content:"确定要退出吗？",showCancel:!0,confirmText:"确定",success:function(t){t.confirm?127==n.channelIds?n.homeRequest({url:"/volunteer/cancel",method:"GET",data:{recordId:n.id}}).then((function(t){200==t.code?(n.toast("操作成功！"),n.status=4):n.toast("操作失败！","none")})):n.homeRequest({url:"/group/cancelApply",method:"GET",data:{groupId:n.id}}).then((function(t){200==t.code?(n.toast("操作成功！"),n.getStatus()):n.toast("操作失败！","none")})):t.cancel}})},todetail:function(e){t.redirectTo({url:"/pages/cate/volunteers-detail?id="+e+"&&channelIds="+this.channelIds})},btnFabulous:function(){var e=this;this.isFabulous?this.indexRequest({url:"/content/down",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(e.isFabulous=!1,t.removeStorageSync("fabulous"+e.id),e.toast("取消点赞成功！"))})):this.indexRequest({url:"/content/up",data:{contentId:this.id}}).then((function(n){200==n.data.code&&(e.isFabulous=!0,t.setStorageSync("fabulous"+e.id,!0),e.toast("点赞成功！"))}))},collection:function(){var e=this;this.isLogin?this.homeRequest({url:"/content/collect",method:"GET",data:{id:this.id,operate:this.is_keep?0:1}}).then((function(t){200==t.code&&(e.is_keep?e.toast("取消收藏成功！"):e.toast("收藏成功！"),e.is_keep=!e.is_keep)})):t.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(e){e.confirm?t.navigateTo({url:"/pages/login/login?is_thing="+!0}):e.cancel}})}}};e.default=n}).call(this,n("543d")["default"])},ed68:function(t,e,n){"use strict";n.r(e);var o=n("60b1"),s=n("79a1");for(var i in s)"default"!==i&&function(t){n.d(e,t,(function(){return s[t]}))}(i);n("6bfa");var a,c=n("f0c5"),u=Object(c["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=u.exports}},[["0ffe","common/runtime","common/vendor"]]]);