(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/base/ys-comment"],{"8eae":function(x,e,t){"use strict";var n=t("ec2b"),o=t.n(n);o.a},a443:function(x,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return n}));var n={ysScroll:function(){return t.e("components/base/ys-scroll").then(t.bind(null,"c42f"))}},o=function(){var x=this,e=x.$createElement;x._self._c},s=[]},ab3b:function(x,e,t){"use strict";t.r(e);var n=t("ce2f"),o=t.n(n);for(var s in n)"default"!==s&&function(x){t.d(e,x,(function(){return n[x]}))}(s);e["default"]=o.a},ce2f:function(x,e,t){"use strict";(function(x){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{text:"",param:{scroll_y:!0,background:"#ffffff",refresher:!0,no_more_text:"没有更多了~",refresher_style:"black"}}},props:{ids:[Array,String],commentList:{type:Array,default:function(){return[{commenterImg:t("d62b"),commenterRealname:"xxxx",text:"xxxxxxxxxxxxxxxxxxxxxxxxx",ups:20},{commenterImg:t("d62b"),commenterRealname:"xxxx",text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",ups:0},{commenterImg:t("d62b"),commenterRealname:"xxxx",text:"xxxxxxxxxxxxxxxxxxxxxxxxx",ups:20},{commenterImg:t("d62b"),commenterRealname:"xxxx",text:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",ups:0}]}}},mounted:function(){console.log(this.ids),0==this.commentList.length&&(this.$refs.scroll.setLoadStatus("no_data"),console.log(222222222))},watch:{},methods:{moveHandle:function(){return!1},refresh:function(){var x=this;this.$emit("refresh"),setTimeout((function(){x.$refs.scroll.endRefresh()}),800)},loadMore:function(){this.$emit("loadMore")},close:function(){this.$emit("close")},send:function(){var e=this;this.isLogin?this.text?this.homeRequest({url:"/comment/save",method:"GET",data:{contentId:this.ids,text:this.text}}).then((function(x){console.log(x),201==x.code?(e.toast("评论成功！等待审核中~"),e.refresh()):e.toast(x.message,"none")})):this.toast("请输入评论内容","none"):x.showModal({title:"提示",content:"您还未登录，确定先登录吗？",showCancel:!0,confirmText:"确定",success:function(e){e.confirm?x.navigateTo({url:"/pages/login/login?is_thing="+!0}):e.cancel}})}}};e.default=n}).call(this,t("543d")["default"])},eb7c:function(x,e,t){"use strict";t.r(e);var n=t("a443"),o=t("ab3b");for(var s in o)"default"!==s&&function(x){t.d(e,x,(function(){return o[x]}))}(s);t("8eae");var c,r=t("f0c5"),a=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=a.exports},ec2b:function(x,e,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/base/ys-comment-create-component',
    {
        'components/base/ys-comment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eb7c"))
        })
    },
    [['components/base/ys-comment-create-component']]
]);