(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/art-list"],{"0636":function(t,e,n){"use strict";n.r(e);var a=n("6aa0"),s=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=s.a},"203a":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},s=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"65a4":function(t,e,n){},"6aa0":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{cutIndex:0,cutList:[],artList:[],first_cate_param:{scroll_y:!1,scroll_x:!0},param:{scroll_y:!0,background:"#F2F5FA",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"},type:"",page:0,orderBy:1}},onLoad:function(){this.getCateList(),this.getList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.page=0,this.activeList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},changeTab:function(t,e){this.cutIndex!=t&&(this.cutIndex=t,this.type=e,this.orderBy=""),0==t&&(this.type="",this.orderBy=1),this.page=0,this.artList=[],this.getList()},getCateList:function(){var t=this,e={channelId:114},n=[];this.indexRequest({url:"/model/get",data:e}).then((function(e){e.data.body.map((function(t){"category"==t.field&&(n=t.optValue)})),n.unshift("全部"),t.cutList=n}))},getList:function(){var t=this,e={channelIds:114,count:10,first:this.page,format:0,s_category:this.type,orderBy:this.orderBy};this.indexRequest({url:"/content/list.jspx",data:e}).then((function(e){0==e.data.body.length&&0==t.artList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.artList=t.artList.concat(e.data.body),e.data.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more"))}))},todetail:function(e){t.navigateTo({url:"/pages/cate/art-expert?id="+e})}}};e.default=n}).call(this,n("543d")["default"])},"8a4a":function(t,e,n){"use strict";var a=n("65a4"),s=n.n(a);s.a},f429:function(t,e,n){"use strict";(function(t){n("41a1");a(n("66fd"));var e=a(n("f8cc"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},f8cc:function(t,e,n){"use strict";n.r(e);var a=n("203a"),s=n("0636");for(var r in s)"default"!==r&&function(t){n.d(e,t,(function(){return s[t]}))}(r);n("8a4a");var o,i=n("f0c5"),c=Object(i["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports}},[["f429","common/runtime","common/vendor"]]]);