
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/mine/mine","pages/login/login","pages/map/map","pages/mine/setting","pages/mine/revise-phone","pages/mine/attestation","pages/mine/feedback","pages/mine/aboutme","pages/mine/myactive","pages/cate/active-detail","pages/mine/reward-points","pages/cate/live-detail","pages/cate/art-expert","pages/cate/scenic-spot","pages/mine/comment-list","pages/cate/scenic-list","pages/cate/venues-list","pages/cate/venues-detail","pages/cate/active-list","pages/cate/art-list","pages/cate/live-list","pages/cate/volunteers-list","pages/cate/nonlegacy","pages/cate/digit-resource","pages/cate/mooc","pages/cate/cultural-encyclopedia","pages/cate/nonlegacy-list","pages/cate/nonlegacy-detail","pages/cate/nettrain-list","pages/cate/nettrain-detail","pages/cate/volunteers-detail","pages/cate/information-choose","pages/cate/information-list","pages/cate/organization-list","pages/mine/myvenues","pages/mine/myorganization","pages/cate/digital-cultural","pages/cate/digital-cultural-list","pages/cate/digital-active-list","pages/cate/digital-active-detail","pages/cate/digital-order-list","pages/cate/policy-document","pages/cate/information-detail","pages/cate/active-signin","pages/cate/active-signin-result","pages/cate/active-code","pages/mine/my-message","pages/mine/myactive-detail","pages/cate/net-library","pages/cate/venues-booking","pages/mine/creat-organization","pages/mine/check-team","pages/cate/mooc-detail","pages/cate/cultural-encyclopedia-detail","pages/map/map-detail","pages/mine/my-collection","pages/mine/myvenues-detail","pages/login/register","pages/login/forget","pages/mine/communication","pages/mine/my-train","pages/mine/my-train-detail","pages/index/search","pages/mine/my-theatre","pages/mine/my-theatre-detail","pages/mine/writeoff"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#6851E2","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#aaa","selectedColor":"#4B44A2","borderStyle":"black","backgroundColor":"#fff","list":[{"pagePath":"pages/index/index","iconPath":"/static/icon/home.png","selectedIconPath":"/static/icon/home_on.png","text":"首页"},{"pagePath":"pages/map/map","iconPath":"/static/icon/map.png","selectedIconPath":"/static/icon/map_on.png","text":"地图"},{"pagePath":"pages/mine/mine","iconPath":"/static/icon/user.png","selectedIconPath":"/static/icon/user_on.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"芙蓉区文旅云","compilerVersion":"3.1.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","scrollIndicator":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/map/map","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"地图","enablePullDownRefresh":false}},{"path":"/pages/mine/setting","meta":{},"window":{"navigationBarTitleText":"个人设置","enablePullDownRefresh":false}},{"path":"/pages/mine/revise-phone","meta":{},"window":{"navigationBarTitleText":"修改号码","enablePullDownRefresh":false}},{"path":"/pages/mine/attestation","meta":{},"window":{"navigationBarTitleText":"实名认证","enablePullDownRefresh":false}},{"path":"/pages/mine/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/mine/aboutme","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/mine/myactive","meta":{},"window":{"navigationBarTitleText":"我的活动","enablePullDownRefresh":false}},{"path":"/pages/cate/active-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/reward-points","meta":{},"window":{"navigationBarTitleText":"积分明细","enablePullDownRefresh":false}},{"path":"/pages/cate/live-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/art-expert","meta":{},"window":{"navigationBarTitleText":"艺术欣赏","enablePullDownRefresh":false}},{"path":"/pages/cate/scenic-spot","meta":{},"window":{"navigationBarTitleText":"精品旅游","enablePullDownRefresh":false}},{"path":"/pages/mine/comment-list","meta":{},"window":{"navigationBarTitleText":"我的评论","enablePullDownRefresh":false}},{"path":"/pages/cate/scenic-list","meta":{},"window":{"navigationBarTitleText":"精品旅游","enablePullDownRefresh":false}},{"path":"/pages/cate/venues-list","meta":{},"window":{"navigationBarTitleText":"场馆服务","enablePullDownRefresh":false}},{"path":"/pages/cate/venues-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/active-list","meta":{},"window":{"navigationBarTitleText":"活动报名","enablePullDownRefresh":false}},{"path":"/pages/cate/art-list","meta":{},"window":{"navigationBarTitleText":"艺术欣赏","enablePullDownRefresh":false}},{"path":"/pages/cate/live-list","meta":{},"window":{"navigationBarTitleText":"直播点播","enablePullDownRefresh":false}},{"path":"/pages/cate/volunteers-list","meta":{},"window":{"navigationBarTitleText":"志愿者服务","enablePullDownRefresh":false}},{"path":"/pages/cate/nonlegacy","meta":{},"window":{"navigationBarTitleText":"非遗保护","enablePullDownRefresh":false}},{"path":"/pages/cate/digit-resource","meta":{},"window":{"navigationBarTitleText":"数字资源","enablePullDownRefresh":false}},{"path":"/pages/cate/mooc","meta":{},"window":{"navigationBarTitleText":"慕课","enablePullDownRefresh":false}},{"path":"/pages/cate/cultural-encyclopedia","meta":{},"window":{"navigationBarTitleText":"文化百科","enablePullDownRefresh":false}},{"path":"/pages/cate/nonlegacy-list","meta":{},"window":{"navigationBarTitleText":"非遗","enablePullDownRefresh":false}},{"path":"/pages/cate/nonlegacy-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/nettrain-list","meta":{},"window":{"navigationBarTitleText":"网上培训","enablePullDownRefresh":false}},{"path":"/pages/cate/nettrain-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/volunteers-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/information-choose","meta":{},"window":{"navigationBarTitleText":"文旅体资讯","enablePullDownRefresh":false}},{"path":"/pages/cate/information-list","meta":{},"window":{"navigationBarTitleText":"文旅体资讯","enablePullDownRefresh":false}},{"path":"/pages/cate/organization-list","meta":{},"window":{"navigationBarTitleText":"用户社团","enablePullDownRefresh":false}},{"path":"/pages/mine/myvenues","meta":{},"window":{"navigationBarTitleText":"我的场馆","enablePullDownRefresh":false}},{"path":"/pages/mine/myorganization","meta":{},"window":{"navigationBarTitleText":"我的社团","enablePullDownRefresh":false}},{"path":"/pages/cate/digital-cultural","meta":{},"window":{"navigationBarTitleText":"数字文化馆","enablePullDownRefresh":false}},{"path":"/pages/cate/digital-cultural-list","meta":{},"window":{"navigationBarTitleText":"资讯","enablePullDownRefresh":false}},{"path":"/pages/cate/digital-active-list","meta":{},"window":{"navigationBarTitleText":"文化馆活动","enablePullDownRefresh":false}},{"path":"/pages/cate/digital-active-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/digital-order-list","meta":{},"window":{"navigationBarTitleText":"文化馆预约","enablePullDownRefresh":false}},{"path":"/pages/cate/policy-document","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/information-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/active-signin","meta":{},"window":{"navigationBarTitleText":"活动报名","enablePullDownRefresh":false}},{"path":"/pages/cate/active-signin-result","meta":{},"window":{"navigationBarTitleText":"预约结果","enablePullDownRefresh":false}},{"path":"/pages/cate/active-code","meta":{},"window":{"navigationBarTitleText":"二维码","enablePullDownRefresh":false}},{"path":"/pages/mine/my-message","meta":{},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":false}},{"path":"/pages/mine/myactive-detail","meta":{},"window":{"navigationBarTitleText":"我的活动-预约详情","enablePullDownRefresh":false}},{"path":"/pages/cate/net-library","meta":{},"window":{"navigationBarTitleText":"电子图书","enablePullDownRefresh":false}},{"path":"/pages/cate/venues-booking","meta":{},"window":{"navigationBarTitleText":"提交信息","enablePullDownRefresh":false}},{"path":"/pages/mine/creat-organization","meta":{},"window":{"navigationBarTitleText":"创建社团","enablePullDownRefresh":false}},{"path":"/pages/mine/check-team","meta":{},"window":{"navigationBarTitleText":"审核社团","enablePullDownRefresh":false}},{"path":"/pages/cate/mooc-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/cate/cultural-encyclopedia-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/map/map-detail","meta":{},"window":{"navigationBarTitleText":"地图详情","enablePullDownRefresh":false}},{"path":"/pages/mine/my-collection","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":false}},{"path":"/pages/mine/myvenues-detail","meta":{},"window":{"navigationBarTitleText":"我的场馆详情","enablePullDownRefresh":false}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"找回密码","enablePullDownRefresh":false}},{"path":"/pages/mine/communication","meta":{},"window":{"navigationBarTitleText":"互动交流","enablePullDownRefresh":false}},{"path":"/pages/mine/my-train","meta":{},"window":{"navigationBarTitleText":"我的培训","enablePullDownRefresh":false}},{"path":"/pages/mine/my-train-detail","meta":{},"window":{"navigationBarTitleText":"我的培训-报名详情","enablePullDownRefresh":false}},{"path":"/pages/index/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false}},{"path":"/pages/mine/my-theatre","meta":{},"window":{"navigationBarTitleText":"我的剧场","enablePullDownRefresh":false}},{"path":"/pages/mine/my-theatre-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/writeoff","meta":{},"window":{"navigationBarTitleText":"核销","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
