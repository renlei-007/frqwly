(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/digital-active-list"],{2355:function(t,e,n){"use strict";(function(t){n("41a1");a(n("66fd"));var e=a(n("3e7d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"2b11":function(t,e,n){"use strict";n.r(e);var a=n("2c2b"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"2c2b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{param:{scroll_y:!0,background:"#F9FAFE",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"},page:0,activeList:[]}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.activeList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},getList:function(){var t=this,e={channelIds:116,count:10,first:this.page,format:0,s_type_like:"文化馆活动"};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){0==e.data.body.length&&0==t.activeList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.activeList=t.activeList.concat(e.data.body),e.data.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more"))}))},todetail:function(e){t.navigateTo({url:"./active-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},"3a62":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"3e7d":function(t,e,n){"use strict";n.r(e);var a=n("3a62"),o=n("2b11");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("bef0");var s,c=n("f0c5"),r=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=r.exports},"4b71":function(t,e,n){},bef0:function(t,e,n){"use strict";var a=n("4b71"),o=n.n(a);o.a}},[["2355","common/runtime","common/vendor"]]]);