(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/digital-active-detail"],{"03aa":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"05e7":function(t,n,e){},"063e":function(t,n,e){"use strict";(function(t){e("41a1");a(e("66fd"));var n=a(e("72f1"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"1b5e":function(t,n,e){"use strict";e.r(n);var a=e("9650"),i=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=i.a},"72f1":function(t,n,e){"use strict";e.r(n);var a=e("03aa"),i=e("1b5e");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("fe04");var o,c=e("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);n["default"]=r.exports},9650:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{id:"",content:{}}},onLoad:function(t){this.id=t.id},methods:{getDetail:function(){var n=this,e={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:e}).then((function(e){console.log(e);var a=e.data.body;n.content=a,t.setNavigationBarTitle({title:a.title})}))}}};n.default=e}).call(this,e("543d")["default"])},fe04:function(t,n,e){"use strict";var a=e("05e7"),i=e.n(a);i.a}},[["063e","common/runtime","common/vendor"]]]);