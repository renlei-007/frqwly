(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/my-message"],{2930:function(t,e,n){"use strict";n.r(e);var s=n("91ac"),o=n("7a3c");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("b910");var a,i=n("f0c5"),c=Object(i["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);e["default"]=c.exports},3673:function(t,e,n){},"52e4":function(t,e,n){"use strict";(function(t){n("41a1");s(n("66fd"));var e=s(n("2930"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},7098:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{Index:0,messList:[],box:0,page:0,param:{scroll_y:!0,background:"",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"}}},onLoad:function(){this.getList()},methods:{refresh:function(){var t=this;this.page=0,this.messList=[],this.getList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getList()},activeChange:function(t){this.Index!=t&&(this.Index=t,this.box=t,this.refresh())},getList:function(){var t=this;this.homeRequest({url:"/message/list",method:"GET",data:{box:this.box,first:this.page,count:10}}).then((function(e){console.log(e),200==e.code?0==e.body.length&&0==t.messList.length?t.$refs.scroll.setLoadStatus("no_data"):(t.messList=t.messList.concat(e.body),e.body.length<10?t.$refs.scroll.setLoadStatus("no_more"):t.$refs.scroll.setLoadStatus("more")):t.toast(e.message,"none")}))}}};e.default=s},"7a3c":function(t,e,n){"use strict";n.r(e);var s=n("7098"),o=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,(function(){return s[t]}))}(r);e["default"]=o.a},"91ac":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return s}));var s={ysScroll:function(){return n.e("components/base/ys-scroll").then(n.bind(null,"c42f"))}},o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},b910:function(t,e,n){"use strict";var s=n("3673"),o=n.n(s);o.a}},[["52e4","common/runtime","common/vendor"]]]);