(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/live-detail"],{"2aaa":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{chapters:0,comment:"",id:"",content:{},liveList:[],commentList:[],is_show:!1,page:0,fullScreenFlag:!1,ctx:null,playerCtx:null,touchStartTime:0,showControlbar:!0,timer:null}},onLoad:function(t){this.id=t.id,this.getDetail(),this.getLiveList()},onReady:function(e){console.log("ready!"),this.ctx=wx.createLivePlayerContext("player"),this.playerCtx=t.createLivePlayerContext("livePlayer")},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getLiveList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getLiveList()},handleControlbar:function(){this.showControlbar=!this.showControlbar},handleFullScreen:function(){var t=this;t.fullScreenFlag?t.playerCtx.exitFullScreen({success:function(e){t.fullScreenFlag=!1,console.log("我要执行了")},fail:function(t){console.log("exit fullscreen success")}}):t.playerCtx.requestFullScreen({success:function(e){t.fullScreenFlag=!0,console.log("我要执行了")},fail:function(t){console.log("fullscreen fail")},direction:90})},close:function(){this.is_show=!1},chapterChange:function(t){this.chapters=t},getDetail:function(){var e=this,n={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:n}).then((function(n){console.log(n);var o=n.data.body;e.content=o,t.setNavigationBarTitle({title:o.title})}))},getLiveList:function(){var t=this,e={count:5,channelIds:"113",sort:4};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){console.log(e);var n=e.data.body;n.shift(),t.liveList=n}))},toDetail:function(e){t.redirectTo({url:"/pages/cate/live-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},"32a3":function(t,e,n){"use strict";n.r(e);var o=n("9574"),i=n("4a1f");for(var l in i)"default"!==l&&function(t){n.d(e,t,(function(){return i[t]}))}(l);n("5ae2");var a,c=n("f0c5"),s=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=s.exports},"3ed9":function(t,e,n){},"42b3":function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("32a3"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4a1f":function(t,e,n){"use strict";n.r(e);var o=n("2aaa"),i=n.n(o);for(var l in o)"default"!==l&&function(t){n.d(e,t,(function(){return o[t]}))}(l);e["default"]=i.a},"5ae2":function(t,e,n){"use strict";var o=n("3ed9"),i=n.n(o);i.a},9574:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return o}));var o={ysBottom:function(){return n.e("components/base/ys-bottom").then(n.bind(null,"a2ab"))},ysComment:function(){return Promise.all([n.e("common/vendor"),n.e("components/base/ys-comment")]).then(n.bind(null,"eb7c"))}},i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.is_show=!0})},l=[]}},[["42b3","common/runtime","common/vendor"]]]);