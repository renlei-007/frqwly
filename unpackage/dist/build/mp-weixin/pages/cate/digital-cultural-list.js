(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/digital-cultural-list"],{"0ac4":function(t,e,n){"use strict";n.r(e);var a=n("9889"),o=n("53ab");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("1c70");var r,i=n("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports},"0cad":function(t,e,n){"use strict";(function(t){n("41a1");a(n("66fd"));var e=a(n("0ac4"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1c70":function(t,e,n){"use strict";var a=n("e32f"),o=n.n(a);o.a},"53ab":function(t,e,n){"use strict";n.r(e);var a=n("e90b"),o=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=o.a},9889:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}));var a={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.newsList,(function(e,n){var a=t.__get_orig(e),o=e.releaseDate.slice(0,10);return{$orig:a,g0:o}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},s=[]},e32f:function(t,e,n){},e90b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{param:{scroll_y:!0,background:"#ffffff",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"},page:0,newsList:[]}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.newsList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},getList:function(){var t=this,e={channelIds:110,count:10,first:this.page,format:0,s_cultural:"是"};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){0==e.data.body.length&&0==t.newsList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.newsList=t.newsList.concat(e.data.body),e.data.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more"))}))},todetail:function(e){t.navigateTo({url:"./information-detail?id="+e})}}};e.default=n}).call(this,n("543d")["default"])}},[["0cad","common/runtime","common/vendor"]]]);