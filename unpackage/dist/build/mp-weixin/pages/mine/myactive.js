(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/myactive"],{"18e4":function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("40bc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"3a94":function(t,e,n){"use strict";n.r(e);var o=n("8cff"),c=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=c.a},"40bc":function(t,e,n){"use strict";n.r(e);var o=n("5815"),c=n("3a94");for(var s in c)"default"!==s&&function(t){n.d(e,t,(function(){return c[t]}))}(s);n("e967");var a,i=n("f0c5"),r=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=r.exports},5815:function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}));var o={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},c=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"8cff":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pages:0,activeList:[],param:{scroll_y:!0,background:"#F2F5FA",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"}}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.activeList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},getList:function(){var t=this,e={first:this.pages,count:10};this.homeRequest({url:"/ticket/list",method:"GET",data:e}).then((function(e){console.log(e),200==e.code&&(0==e.body.length&&0==t.activeList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.activeList=t.activeList.concat(e.body),e.body.length<10?(console.log(1),t.$refs.scroll.setLoadStatus("no_more")):(console.log(2),t.$refs.scroll.setLoadStatus("more"))))}))},toDetail:function(e){t.navigateTo({url:"./myactive-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},a9b1:function(t,e,n){},e967:function(t,e,n){"use strict";var o=n("a9b1"),c=n.n(o);c.a}},[["18e4","common/runtime","common/vendor"]]]);