(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/cate/venues-booking"],{"10c9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{id:"",content:{seatSetting:{seatArray:[]}},date:"",dateList:[],slot:"",slotList:[],num:"",ticketList:[],phone:"",contacts:"",user:"",purpose:"",startDate:"",endDate:"",team:"",teammate:"",bookingDates:[],remark:"",scale:1,x:0,y:0,seatArray:[],maxTicket:0,seatsList:[],chooseSets:[],rule:'\n\t\t\t\t<div style="width:100%">\n\t\t\t\t  <h3>预订须知</h3>\n\t\t\t\t\t1. 全年未入场票数达10张，将被取消当年预订资格；<br>\n\t\t\t\t\t2. 如需退票，请至“我的-我的活动“，退票截止至活动前一天（活动当天不可退票）；<br>\n\t\t\t\t\t3. 如因不可控因素导致活动无法进行，举办方有权延期或取消活动，并以短信方式通知订票人；<br>\n\t\t\t\t\t4. 如参加区图书馆、文化馆活动的市民，由于停车位有限，建议读者搭乘公共交通前往；<br>\n\t\t\t\t\t5. 活动最终解释权归举办方所有。\n\t\t\t\t</div>\n\t\t\t',userInfo:{},Index:0,pickTitle:"",dateIndex:0,teamList:[],memberList:[],channelId:"",notSeatArr:[],tipArray:[],height:"",width:""}},computed:{maxScheduled:function(){var t=[];return this.seatArray.map((function(e,n){t.push([]);var s=0,i=!1;e.map((function(a,o){t[n].push(n+1+"-"+(o+1)),-1==a?(s++,console.log(s,o)):i=!0,t[n][o]=n+1+"-"+(o+1-s),i||o!=e.length-1||(t[n][o]=n+"-"+(o+1-s))}))})),t}},onLoad:function(e){this.id=e.id,this.channelId=e.channelId,this.getDetail(),179==e.channelId&&this.getTeam(),this.userInfo=t.getStorageSync("user_info"),this.userInfo.phone?this.phone=this.userInfo.phone:this.phone=this.userInfo.authPhone},methods:{chooseSet:function(t,e){var n=this;if(console.log(e),0==this.seatArray[t][e]){var s=0,i=[];if(this.seatArray.map((function(e,n){e.map((function(e,a){3==e&&s++,n==t&&-1==e&&i.push(a)}))})),s==this.maxTicket)return void this.toast("最多可预定"+this.maxTicket+"张,点击已选座位可取消！","none");var a=e+1;console.log(e),i.map((function(t){e>t&&(console.log(a),a--)})),this.seatsList.push({index:t+"-"+e,name:this.tipArray[t]+1+"排"+a+"座"}),this.$set(this.seatArray[t],e,3),console.log(this.notSeatArr)}else this.seatsList.map((function(s,i){s.index==t+"-"+e&&n.seatsList.splice(i,1)})),this.$set(this.seatArray[t],e,0)},selected:function(t){if(this.Index=t,0==t)this.pickTitle="选择时间",this.$refs.ysPicker.showModal("radio",this.dateList);else if(1==t)if(this.pickTitle="选择时间",this.date){var e=[];this.bookingDates[this.dateIndex].slots.map((function(t){e.push(t.slot)})),this.$refs.ysPicker.showModal("radio",e)}else this.toast("请先选择日期!","none");else if(2==t){this.pickTitle="选择社团";var n=[];this.teamList.map((function(t){n.push(t.group.content.title)})),this.$refs.ysPicker.showModal("radio",n)}else if(3==t){this.pickTitle="选择成员";var s=[];this.memberList.map((function(t){t.realname?s.push(t.realname):s.push(t.username)})),this.$refs.ysPicker.showModal("radio",s)}},callPicker:function(t){if(console.log(t),0==this.Index)this.date=t.value[0].split("(")[0],this.dateIndex=t.index[0];else if(1==this.Index)this.slot=t.value[0];else if(2==this.Index){this.team=t.value[0];var e=t.index[0];this.getMember(e)}else 3==this.Index&&(this.teammate=t.value[0])},getMember:function(t){this.memberList=this.teamList[t].userList},chooseMember:function(t){t.isCheck=!t.isCheck},getDetail:function(){var t,e=this,n={format:0};198==this.channelId?(t="/content/get.jspx",n.id=this.id):(t="/bookings/content",n.contentId=this.id),this.indexRequest({url:t,data:n}).then((function(t){var n=t.data.body;if(e.content=n,198==e.channelId){e.seatArray=n.seatSetting.seatArray;var s=[];n.seatSetting.seatArray.map((function(t){s.push(t.length)}));var i=Math.max.apply(Math,s);console.log(i),console.log((690/(40*i+50)).toFixed(1)),e.scale=690/(40*i+50)>1?1:(690/(40*i+50)).toFixed(1),e.height=40*n.seatSetting.seatArray.length,e.width=40*i+50,console.log(e.height),e.maxTicket=n.seatSetting.maxScheduled,t.data.body.seatSetting.seatArray.map((function(t,n){e.tipArray.push(n);var s=!1;t.map((function(t){-1!=t&&(s=!0)})),s||e.notSeatArr.push(n)})),e.notSeatArr.map((function(t,n){var s=1e4;e.tipArray.map((function(n,i){t!=n?i>s&&(e.tipArray[i]=e.tipArray[i]-1):s=t}))}))}198!=e.channelId&&t.data.body.bookingDates.map((function(t,n){var s=!1;t.slots.map((function(n,i){!n.canBooking||n.isBooking||s||n.isFull||(e.dateList.push(t.showDate+"("+t.week+")"),s=!0,e.bookingDates.push(t))}))}))}))},submit:function(){var e,n,s,i,a,o,r=this;if(n=(new Date).getFullYear(),s=this.date.split("."),e=n+"-"+s[0]+"-"+s[1],198!=this.channelId){if(!this.date)return void this.toast("请选择时间!","none");if(!this.slot)return void this.toast("请选择时段!","none");if(!this.phone)return void this.toast("请输入号码！","none");if(!this.contacts)return void this.toast("请输入预定联系人！","none")}if(179==this.channelId){a="/bookings/add_group";var h=[];this.memberList.map((function(t){t.isCheck&&h.push(t.id)})),o=h.toString(),i={contentId:this.id,bookingDate:e,slot:this.slot,phone:this.phone,contact:this.contacts,userName:this.user,purpose:this.purpose,remark:this.remark,ids:o}}else if(198==this.channelId){a="/theatre/add";var c=[];this.seatsList.map((function(t){c.push(t.index)})),i={contentId:this.id,phone:this.phone,remark:this.remark,seats:c.toString()}}else a="/bookings/add",i={contentId:this.id,bookingDate:e,slot:this.slot,phone:this.phone,contact:this.contacts,userName:this.user,purpose:this.purpose,remark:this.remark};this.homeRequest({url:a,method:"POST",data:i}).then((function(e){console.log(e),200==e.code?(r.toast("预约成功"),setTimeout((function(){t.navigateBack({delta:3})}),1e3)):r.toast(e.message,"none")}))},getTeam:function(){var t=this;this.homeRequest({url:"/bookings/check_group",method:"GET",data:{}}).then((function(e){console.log(e),200==e.code?(e.body.map((function(e){e.userList.map((function(e){t.$set(e,"isCheck",!1)}))})),t.teamList=e.body):t.toast(e.message,"none")}))}}};e.default=n}).call(this,n("543d")["default"])},1136:function(t,e,n){"use strict";n.r(e);var s=n("ec93"),i=n("222c");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("1e2b");var o,r=n("f0c5"),h=Object(r["a"])(i["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],o);e["default"]=h.exports},"1e2b":function(t,e,n){"use strict";var s=n("4c74"),i=n.n(s);i.a},"222c":function(t,e,n){"use strict";n.r(e);var s=n("10c9"),i=n.n(s);for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);e["default"]=i.a},2594:function(t,e,n){"use strict";(function(t){n("41a1");s(n("66fd"));var e=s(n("1136"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"4c74":function(t,e,n){},ec93:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return s}));var s={ysPicker:function(){return n.e("components/base/ys-picker").then(n.bind(null,"1019"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,198==t.channelId?t.__map(t.tipArray,(function(e,n){var s=t.__get_orig(e),i=t.notSeatArr.indexOf(n);return{$orig:s,g0:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]}},[["2594","common/runtime","common/vendor"]]]);