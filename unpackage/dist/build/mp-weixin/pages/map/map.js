(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/map/map"],{"37c6":function(t,e,i){"use strict";i.r(e);var n=i("e9d5"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},9660:function(t,e,i){},b0b6:function(t,e,i){"use strict";i.r(e);var n=i("e2bf"),o=i("37c6");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("cb1b");var a,l=i("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=c.exports},cb1b:function(t,e,i){"use strict";var n=i("9660"),o=i.n(n);o.a},ce0c:function(t,e,i){"use strict";(function(t){i("41a1");n(i("66fd"));var e=n(i("b0b6"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},e2bf:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={slFilter:function(){return i.e("components/sl-filter/sl-filter").then(i.bind(null,"6c2f"))},ysScroll:function(){return i.e("components/base/ys-scroll").then(i.bind(null,"c42f"))}},o=function(){var t=this,e=t.$createElement,i=(t._self._c,t.is_choose?null:t.__map(t.pointList,(function(e,i){var n=t.__get_orig(e),o=t.calDistance(e);return{$orig:n,m0:o}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},s=[]},e9d5:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){i.e("components/sl-filter/sl-filter").then(function(){return resolve(i("6c2f"))}.bind(null,i)).catch(i.oe)},o={components:{slFilter:n},data:function(){return{param:{scroll_y:!0,background:"#f2f2f2",refresher:!0,no_more_text:"",refresher_style:"black"},is_choose:!1,page:0,pages:0,pointList:[],catePointList:[],cate_index:0,cate_param:{scroll_y:!0,scroll_x:!1,background:"#f2f2f2"},pt_param:{scroll_y:!0,scroll_x:!1},cateList:[],points:"27.46727283131032,112.16941164086553,28.876774200707032,113.8581604412483",menuList:[{title:"类别",isSort:!0,key:"type",detailList:[{title:"全部",value:""}]},{title:"方式",key:"sort",isSort:!0,reflexTitle:!0,detailList:[{title:"距离",value:"24"},{title:"最新",value:"4"},{title:"最热",value:"9"}]}],type:"",sort:"",lat:"",lng:"",mapTitle:""}},onLoad:function(){this.getCateList()},onShow:function(){t.getStorageSync("mapTitle")&&(this.mapTitle=t.getStorageSync("mapTitle"),console.log(this.mapTitle),t.removeStorageSync("mapTitle"),this.type=this.mapTitle,this.$refs.slFilter.titleList=[{title:this.type,key:"type"},{title:"方式",key:"sort"}]),this.getCatePointList()},methods:{refresh:function(){var t=this;console.log("刷新"),this.pages=0,this.pointList=[],this.getCatePointList(),setTimeout((function(){t.$refs.scroll.endRefresh()}),800)},loadMore:function(){console.log("上拉加载"),this.pages+=15,this.getCatePointList()},result:function(t){var e=this;console.log(t),this.cateList.map((function(i,n){i.title==t.type&&(e.cate_index=n)})),this.type=t.type,console.log(this.type),this.sort=t.sort,this.is_choose=!0,this.pointList=[],this.pages=0,this.loadMorePoints()},changeCate:function(t){this.cate_index=t,this.pointList=[],this.type=this.cateList[t].title,console.log(this.type),0==t&&(this.type=""),this.pages=0,this.getCatePointList()},getCateList:function(){var t=this,e={channelId:147},i=[];this.indexRequest({url:"/model/get",data:e}).then((function(e){t.cateList=[{title:"全部"}],e.data.body.map((function(e){"type"==e.field&&(i=e.optValue,i.map((function(e,i){t.cateList.push({title:e}),t.menuList[0].detailList.push({title:e,value:e})})))}))}))},loadMorePoints:function(){this.pages+=10,this.getCatePointList()},getCatePointList:function(){var t=this,e={channelIds:147,count:25,points:this.points,orderBy:this.sort};this.type&&(e["type"]=this.type),e["orderBy"]=this.sort;var i=this.getLocation();i.then((function(i){console.log(i),t.lat=i.latitude,t.lng=i.longitude,e["lat"]=t.lat,e["lng"]=t.lng,t.indexRequest({url:"/query/position",data:e}).then((function(e){console.log(e),0==e.data.body.data.length?t.$refs.scroll.setLoadStatus("no_data"):t.$refs.scroll.setLoadStatus("more"),t.pointList=e.data.body.data}))}))},calDistance:function(t){return t&&t.position&&this.lat?this.getDistance(this.lat,this.lng,t.position.lat,t.position.lng)+"KM":""},getDistance:function(t,e,i,n){var o=t*Math.PI/180,s=i*Math.PI/180,a=o-s,l=e*Math.PI/180-n*Math.PI/180,c=2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(o)*Math.cos(s)*Math.pow(Math.sin(l/2),2)));return c*=6378.137,c=Math.round(1e4*c)/1e4,c.toFixed(2)},getLocation:function(){var e=this;return new Promise((function(i,n){t.getLocation({type:"wgs84",success:function(t){console.log(t),i(t)},fail:function(t){console.log(t),e.toast("获取地址失败","none"),i({latitude:28.141998,longitude:113.044478})}})}))},todetail:function(e){t.setStorageSync("maps",e),t.navigateTo({url:"./map-detail?type="+this.type+"&&sort="+this.sort})}}};e.default=o}).call(this,i("543d")["default"])}},[["ce0c","common/runtime","common/vendor"]]]);