(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zy-search/zy-search"],{1708:function(t,e,n){"use strict";n.r(e);var r=n("a64e"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},2586:function(t,e,n){"use strict";var r=n("e664"),a=n.n(r);a.a},4545:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},a64e:function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw i}}}}function r(t,e){if(t){if("string"===typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"zy-search",props:{isFocus:{type:Boolean,value:!1},isBlock:{type:Boolean,value:!0},showWant:{type:Boolean,value:!1},hList:{type:Array,required:!0,default:function(){return[]}}},data:function(){return{searchText:"",wantList:["栏目1","栏目2","栏目3","栏目4"]}},created:function(){},computed:{hisList:function(){var t=this.hList;return t}},methods:{searchStart:function(){var e=this;if(""==e.searchText)return t.showToast({title:"请输入关键字",icon:"none",duration:1e3}),!1;t.getStorage({key:"search_cache",success:function(r){var a=r.data;if(a.length>5){var o,i=n(a);try{for(i.s();!(o=i.n()).done;){var c=o.value;if(c==e.searchText)return!1}}catch(l){i.e(l)}finally{i.f()}a.pop(),a.unshift(e.searchText)}else{var u,s=n(a);try{for(s.s();!(u=s.n()).done;){var f=u.value;if(f==e.searchText)return!1}}catch(l){s.e(l)}finally{s.f()}a.unshift(e.searchText)}e.hisList=a,t.setStorage({key:"search_cache",data:e.hisList})},fail:function(){e.hisList.push(e.searchText),t.setStorage({key:"search_cache",data:e.hisList})}}),this.$emit("search",e.searchText)},keywordsClick:function(t){this.searchText=t},delhistory:function(){this.hisList=[],t.setStorage({key:"search_cache",data:[]})},startRecognize:function(){var t=this,e={engine:"iFly",punctuation:!1,timeout:1e4};plus.speech.startRecognize(e,(function(e){t.searchText=t.searchText+e}))}}};e.default=o}).call(this,n("543d")["default"])},e664:function(t,e,n){},fad8:function(t,e,n){"use strict";n.r(e);var r=n("4545"),a=n("1708");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("2586");var i,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"02e8ac2a",null,!1,r["a"],i);e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zy-search/zy-search-create-component',
    {
        'components/zy-search/zy-search-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fad8"))
        })
    },
    [['components/zy-search/zy-search-create-component']]
]);