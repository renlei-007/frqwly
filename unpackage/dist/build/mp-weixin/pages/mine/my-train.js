(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/my-train"],{"6f42":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pages:0,trainList:[],param:{scroll_y:!0,background:"#F2F5FA",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"}}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.trainList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},getList:function(){var t=this,e={first:this.pages,count:10};this.homeRequest({url:"/train/list",method:"GET",data:e}).then((function(e){console.log(e),200==e.code&&(0==e.body.length&&0==t.trainList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.trainList=t.trainList.concat(e.body),e.body.length<10?(console.log(1),t.$refs.scroll.setLoadStatus("no_more")):(console.log(2),t.$refs.scroll.setLoadStatus("more"))))}))},toDetail:function(e){t.navigateTo({url:"./my-train-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},8082:function(t,e,n){"use strict";var o=n("e415"),r=n.n(o);r.a},9771:function(t,e,n){"use strict";n.r(e);var o=n("bc2e"),r=n("a822");for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);n("8082");var a,i=n("f0c5"),c=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=c.exports},a822:function(t,e,n){"use strict";n.r(e);var o=n("6f42"),r=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=r.a},bc2e:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}));var o={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},r=function(){var t=this,e=t.$createElement;t._self._c},s=[]},e415:function(t,e,n){},eb6d:function(t,e,n){"use strict";(function(t){n("41a1");o(n("66fd"));var e=o(n("9771"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["eb6d","common/runtime","common/vendor"]]]);