(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/writeoff"],{"10ca":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,4==t.type?t.formatTime(t.record):null),r=4==t.type?t.formatTime(t.record):null;t.$mp.data=Object.assign({},{$root:{m0:n,m1:r}})},o=[]},"140a":function(t,e,n){"use strict";var r=n("df37"),i=n.n(r);i.a},1527:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{record:{content:{}},type:0,value:null,canWriteoff:!1}},onLoad:function(t){this.type=t.type,this.value=t.value,this.getDetail()},methods:{formatTime:function(t){return t&&t.content&&t.attr_startTime?record.content.attr_startTime.substring(0,10):t&&t.content&&t.attr_endTime?record.content.attr_endTime.substring(0,10):void 0},getDetail:function(){var t=this,e={},n="";1==this.type?(e.orderNo=this.value,n="/ticket/orderDetail"):2==this.type?(e.recordId=this.value,n="/bookings/detail"):3==this.type?(e.recordId=this.value,n="/train/detail"):4==this.type&&(e.recordId=this.value,n="/volunteer/detail"),this.homeRequest({url:n,data:e}).then((function(e){200==e.code?(t.record=e.body,1==t.type?t.canWriteoff=0==t.record.status:t.canWriteoff=1==t.record.status):t.toast(e.message,"none")}))},writeoff:function(){var e=this,n={},r="";1==this.type?(n.orderNo=this.value,r="/ticketing_record/writeOff"):2==this.type?(n.recordId=this.value,r="/booking_record/writeoff"):3==this.type?(n.ids=this.value,r="/train_record/writeoff"):4==this.type&&(n.recordId=this.value,r="/volunteer/writeoff"),this.adminGet({url:r,data:n}).then((function(n){200==n.code?(e.toast("核销成功！"),setTimeout((function(){t.navigateBack({delta:1},1500)}))):e.toast(n.message,"none")}))}}};e.default=n}).call(this,n("543d")["default"])},"61d7":function(t,e,n){"use strict";n.r(e);var r=n("10ca"),i=n("ddb5");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("140a");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=c.exports},"93a8":function(t,e,n){"use strict";(function(t){n("41a1");r(n("66fd"));var e=r(n("61d7"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ddb5:function(t,e,n){"use strict";n.r(e);var r=n("1527"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},df37:function(t,e,n){}},[["93a8","common/runtime","common/vendor"]]]);