(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/mooc-detail"],{"00ca":function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("5ef6"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"5e76":function(t,e,n){"use strict";var o=n("d737"),i=n.n(o);i.a},"5ef6":function(t,e,n){"use strict";n.r(e);var o=n("6fca"),i=n("6a44");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("5e76");var a,l=n("f0c5"),s=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=s.exports},"6a44":function(t,e,n){"use strict";n.r(e);var o=n("c50c"),i=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=i.a},"6fca":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}));var o={ysBottom:function(){return n.e("components/base/ys-bottom").then(n.bind(null,"a2ab"))},ysComment:function(){return Promise.all([n.e("common/vendor"),n.e("components/base/ys-comment")]).then(n.bind(null,"eb7c"))}},i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.chapters=0},t.e1=function(e){t.chapters=1},t.e2=function(e){t.chapters=2},t.e3=function(e){t.is_show=!0})},c=[]},c50c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{chapters:0,comment:"",id:"",content:{},liveList:[],commentList:[],is_show:!1,page:0,fullScreenFlag:!1,ctx:null,playerCtx:null,touchStartTime:0,showControlbar:!0,timer:null,typeList:[]}},onLoad:function(t){this.id=t.id,this.getDetail(),this.getLiveList()},onReady:function(e){console.log("ready!"),this.ctx=wx.createLivePlayerContext("player"),this.playerCtx=t.createLivePlayerContext("livePlayer")},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getLiveList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getLiveList()},handleControlbar:function(){this.showControlbar=!this.showControlbar},handleFullScreen:function(){var t=this;t.fullScreenFlag?t.playerCtx.exitFullScreen({success:function(e){t.fullScreenFlag=!1,console.log("我要执行了")},fail:function(t){console.log("exit fullscreen success")}}):t.playerCtx.requestFullScreen({success:function(e){t.fullScreenFlag=!0,console.log("我要执行了")},fail:function(t){console.log("fullscreen fail")},direction:90})},close:function(){this.is_show=!1},chapterChange:function(t){this.chapters=t},getDetail:function(){var e=this,n={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:n}).then((function(n){console.log(n);var o=n.data.body;o.txt=e.replaceSpecialChar(o.txt),o.txt1=e.replaceSpecialChar(o.txt1),e.typeList=o.attr_system,e.content=o,t.setNavigationBarTitle({title:o.title})}))},getLiveList:function(){var t=this,e={count:4,channelIds:"191",sort:4};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){console.log(e);var n=e.data.body;t.liveList=n}))},toDetail:function(e){t.redirectTo({url:"/pages/cate/mooc-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},d737:function(t,e,n){}},[["00ca","common/runtime","common/vendor"]]]);