(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/comment-list"],{"21ff":function(t,e,n){"use strict";var o=n("fa30"),s=n.n(o);s.a},"45e7":function(t,e,n){"use strict";n.r(e);var o=n("6391"),s=n("f62b");for(var r in s)"default"!==r&&function(t){n.d(e,t,(function(){return s[t]}))}(r);n("21ff");var c,a=n("f0c5"),i=Object(a["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=i.exports},6391:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},s=function(){var t=this,e=t.$createElement;t._self._c},r=[]},e2b0:function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("45e7"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e707:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{param:{scroll_y:!0,background:"",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"},page:0,commentList:[]}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.commentList=[],this.getList(this.page),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page++,this.getList(this.page)},getList:function(){var t=this,e={first:this.page,count:10};this.homeRequest({url:"/comment/mylist",method:"GET",data:e}).then((function(e){console.log(e),200==e.code?0==e.body.length&&0==t.commentList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.commentList=t.commentList.concat(e.body),e.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more")):t.toast(e.message,"none")}))},toDetail:function(t){}}};e.default=o},f62b:function(t,e,n){"use strict";n.r(e);var o=n("e707"),s=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=s.a},fa30:function(t,e,n){}},[["e2b0","common/runtime","common/vendor"]]]);