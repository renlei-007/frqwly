(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/nonlegacy-detail"],{"0275a":function(t,n,e){"use strict";var i=e("15bc"),o=e.n(i);o.a},"15bc":function(t,n,e){},1872:function(t,n,e){"use strict";e.r(n);var i=e("d2ef"),o=e("ff8a");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("0275a");var a,s=e("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=u.exports},"9dc4":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{id:"",content:{},nonlegacyList:[],commentList:[],is_show:!1,page:0,imgList:[]}},onLoad:function(t){this.id=t.id,this.getDetail(),this.getNonlegacyList(),this.getCommentList()},methods:{refresh:function(){console.log("刷新"),this.page=0,this.commentList=[],this.getCommentList()},loadMore:function(){console.log("上拉加载"),this.page+=10,this.getCommentList()},close:function(){this.is_show=!1},getCommentList:function(){var t=this,n={contentId:this.id,checked:1,first:this.page,count:10};this.indexRequest({url:"/comment/list.jspx",data:n}).then((function(n){console.log(n);var e=n.data.body;t.commentList=t.commentList.concat(e)}))},getDetail:function(){var n=this,e={format:0,id:this.id};this.indexRequest({url:"/content/get.jspx",data:e}).then((function(e){var i=e.data.body;i.txt=n.replaceSpecialChar(i.txt),n.content=i,t.setNavigationBarTitle({title:i.title})}))},getNonlegacyList:function(){var t=this,n={count:4,channelIds:"175",sort:4};this.indexRequest({url:"/content/list.jspx",data:n}).then((function(n){console.log(n);var e=n.data.body;t.nonlegacyList=e}))},todetail:function(n){t.redirectTo({url:"/pages/cate/nonlegacy-detail?id="+n})},preview:function(){var t=this;this.content.picArr.map((function(n){t.imgList.push(n.picPaths)})),this.previewImage(this.imgList)}}};n.default=e}).call(this,e("543d")["default"])},d2ef:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var i={ysBottom:function(){return e.e("components/base/ys-bottom").then(e.bind(null,"a2ab"))},ysComment:function(){return Promise.all([e.e("common/vendor"),e.e("components/base/ys-comment")]).then(e.bind(null,"eb7c"))}},o=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.is_show=!0})},c=[]},ff82:function(t,n,e){"use strict";(function(t){e("41a1");i(e("66fd"));var n=i(e("1872"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},ff8a:function(t,n,e){"use strict";e.r(n);var i=e("9dc4"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=o.a}},[["ff82","common/runtime","common/vendor"]]]);