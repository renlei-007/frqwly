(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"06b3":function(e,n,o){"use strict";var t=o("c685"),a=o.n(t);a.a},"2ad0":function(e,n,o){"use strict";var t;o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return t}));var a=function(){var e=this,n=e.$createElement;e._self._c},i=[]},"6d30":function(e,n,o){"use strict";o.r(n);var t=o("2ad0"),a=o("a1c6");for(var i in a)"default"!==i&&function(e){o.d(n,e,(function(){return a[e]}))}(i);o("06b3");var r,c=o("f0c5"),s=Object(c["a"])(a["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],r);n["default"]=s.exports},"7cc0":function(e,n,o){"use strict";(function(e){o("41a1");t(o("66fd"));var n=t(o("6d30"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,o("543d")["createPage"])},a1c6:function(e,n,o){"use strict";o.r(n);var t=o("cd21"),a=o.n(t);for(var i in t)"default"!==i&&function(e){o.d(n,e,(function(){return t[e]}))}(i);n["default"]=a.a},c685:function(e,n,o){},cd21:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=c(o("1a55")),a=c(o("c5c5")),i=c(o("5364")),r=c(o("66fd"));function c(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{userform:{username:"",password:"",is_thing:!1}}},onLoad:function(e){this.is_thing=e.is_thing},methods:{goBindTel:function(n){var o=this,t=n.detail.userInfo;console.log(t),e.login({provider:"weixin",success:function(e){console.log(e),o.doLogin(t,e.code)},fail:function(e){console.log(e)}})},doLogin:function(n,o){var i={appId:"1580387213331704",appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",aesKey:"S9u978Q31NGPGc5H",ivKey:"X83yESM9iShLxfwS"},r=n.nickName,c=n.avatarUrl,s=(n.gender,n.province),u=n.city,d=n.country?n.country:"",l=t.default.getRand(),f=[],p=e.getStorageSync("shareCode");f[0]=["js_code",o],f[1]=["grant_type","authorization_code"],f[2]=["appId",i.appId],f[3]=["nonce_str",l],f[4]=["nickName",r],f[5]=["avatarUrl",c],f[6]=["province",s],f[7]=["city",u],f[8]=["country",d],f[9]=["shareCode",p];var g=a.default.createSign(f,i.appKey);this.request({url:"api/front/user/weixinLogin.jspx",data:{js_code:o,grant_type:"authorization_code",appId:appId,nonce_str:l,nickName:r,avatarUrl:c,province:s,city:u,country:d,shareCode:p,sign:g},complete:function(e){console.log(e),e.code}})},login:function(){var n=this,o={appId:"1580387213331704",appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",aesKey:"S9u978Q31NGPGc5H",ivKey:"X83yESM9iShLxfwS"},c=t.default.getRand(),s=[],u=i.default.encrypt(this.userform.password,o.aesKey,o.ivKey);s[0]=["username",this.userform.username],s[1]=["aesPassword",u],s[2]=["appId",o.appId],s[3]=["nonce_str",c];var d=a.default.createSign(s,o.appKey);this.request({url:"/user/login.jspx",data:{username:this.userform.username,aesPassword:u,appId:o.appId,nonce_str:c,sign:d},complete:function(o){console.log(o),200!=o.code&&(console.log(1),e.showToast({title:o.message,icon:"none"})),200==o.code&&(console.log(2),n.getUser(n.userform.username,o.body).then((function(t){console.log(11111111),e.setStorageSync("sessionKey",o.body),console.log(t),e.setStorageSync("user_info",t.body),e.showToast({title:"登录成功"}),r.default.prototype.isLogin=!0,n.is_thing?setTimeout((function(){e.navigateBack({delta:1})}),500):setTimeout((function(){e.reLaunch({url:"/pages/index/index"})}),500)})).catch((function(n){console.log(n),e.showToast({icon:"none",title:n.message})})))}})},toReg:function(){e.navigateTo({url:"./register"})},toforget:function(){e.navigateTo({url:"./forget"})}}};n.default=s}).call(this,o("543d")["default"])}},[["7cc0","common/runtime","common/vendor"]]]);