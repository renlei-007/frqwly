import Vue from 'vue';

import rand from './random.js'
import sign from './sign.js'
import aes from './aes.js'

// const baseUrl = 'http://yuhuatestapi.culturalcloud.net'
const baseUrl = 'http://192.168.2.149:8080/'
var navigateTo_num = 0; //页面跳转次数,用于登录失效的跳转判断,防止多接口请求时跳转多个页面
const img_upload_path = '/api/upload_new/image' //图片上传接口地址
const img_upload_name = 'uploadFile' //图片上传名字
let globalData = {
	appId:"1580387213331704",
	appKey:"Sd6qkHm9o4LaVluYRX5pUFyNuiu2a8oi",
	memberUrl: baseUrl + "api/member",
	url: baseUrl+"api/front",
	aesKey:"S9u978Q31NGPGc5H",
	ivKey:"X83yESM9iShLxfwS",
	https: 0,
}

class common {
	constructor() {
		//测试域名 https://sgydev.douhuomall.com 生产域名 https://shu.wiwipu.com
		Vue.prototype.baseUrl = baseUrl
		//Vue.prototype.domainName = 'https://sgydev.douhuomall.com'; //开发域名
		Vue.prototype.domainName = 'http://192.168.2.149:8080/api/front'; //域名
		Vue.prototype.access_token = uni.getStorageSync('access_token') || '';
		// Vue.prototype.theme = {
		//   button_color: '#509919',
		//   text_color: '#ffffff',
		//   theme_color: '#6cc02d'
		// }; //平台主题颜色
		let isLogin = false
		if(uni.getStorageSync('user_info')&&JSON.stringify(uni.getStorageSync('user_info')).length>10){
			isLogin = true
		}
		Vue.prototype.isLogin = isLogin
		Vue.prototype.isAttestation = false
		Vue.prototype.isCertification = uni.getStorageSync('user_info').isCertification
		this._init();
	}
	_init() {
		this._initBase(); //基础方法
		this._setRequest(); //接口请求
		this.noLoginRequest()
		
		this._getUser()
		// this._getCfg(); //设置主题颜色
		// this._setCurrentPages(); //执行前一个页面事件
		this._setUpload(); //图片上传
		// this._setArraySlice() //数组裁剪
		// this._setPreviewImage() //图片预览
		// this._getRestTime(); //倒计时
	}
	_initBase() {
		/**
		 * 参数验证
		 */
		// Vue.prototype.verifyParam = (res) => {
		// 	return new verify().verifyParam(res)
		// };
		// Vue.prototype.verifyProfile = verifyProfile;
		/**
		 * 页面跳转
		 */
		Vue.prototype.navigateTo = (url) => {
			uni.navigateTo({
				url: url
			})
		};
		/**
		 * 页面跳转
		 */
		Vue.prototype.navigateBack = (obj) => {
			let {
				num = 1, time = 0
			} = obj
			console.log(time);
			if (time == 0) {
				uni.navigateBack({
					delta: num
				})
			} else {
				console.log('2', time);
				setTimeout(() => {
					uni.navigateBack({
						delta: num
					})
				}, time)
			}
		};
		Vue.prototype.bMapToQQMap = (lng, lat) => {
			if (lng == null || lng == '' || lat == null || lat == '')
			    return [lng, lat];
			
			var x_pi = 3.14159265358979324;
			var x = parseFloat(lng) - 0.0065;
			var y = parseFloat(lat) - 0.006;
			var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			var lng = (z * Math.cos(theta)).toFixed(7);
			var lat = (z * Math.sin(theta)).toFixed(7);
			
			return {'lng': parseFloat(lng), 'lat': parseFloat(lat)};
			
		};
		/**
		 * 拨号
		 */
		Vue.prototype.call = (phone) => {
			if (!phone) {
				return false
			}
			uni.makePhoneCall({
				phoneNumber: phone.toString() //仅为示例
			});
		};
		/**
		 * 数组对象深拷贝
		 */
		Vue.prototype.copyData = (data) => {
			return JSON.parse(JSON.stringify(data))
		};
		/**
		 * 消息弹窗
		 */
		Vue.prototype.toast = (title, icon = 'success', time = 1500) => {
			uni.showToast({
				title: title,
				icon: icon,
				duration: time
			})
			setTimeout(() => {
				uni.hideToast()
			}, time)
		}
		Date.prototype.format = function(fmt) {
			var o = {
				'M+': this.getMonth() + 1,
				'd+': this.getDate(),
				'h+': this.getHours(),
				'm+': this.getMinutes(),
				's+': this.getSeconds(),
				'q+': Math.floor((this.getMonth() + 3) / 3),
				S: this.getMilliseconds()
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
			for (var k in o) {
				if (new RegExp('(' + k + ')').test(fmt))
					fmt = fmt.replace(
						RegExp.$1,
						RegExp.$1.length == 1 ?
						o[k] < 10 ?
						'0' + o[k] :
						o[k] :
						('00' + o[k]).substr(('' + o[k]).length)
					);
			}
			return fmt;
		};
	}
	/**
	 * 全局配置
	 */
	_getCfg() {
		Vue.prototype.request({
			url: '/api/system/getCfg',
			data: {
				field: 'server_phone,site_title'
			},
			success: (res) => {
				console.log(res);
				Vue.prototype.server_phone = res.data.server_phone;
				Vue.prototype.site_title = res.data.site_title;
				console.log('颜色获取成功')
			}
		})
	}
	/*
	 * 值是否存在
	 * param mix value 要检查的值
	 * return boolean
	 */
	isset(value) {
		if (value === null || value === undefined)
			return false
		else
			return true
	}
	_getUser(){
		Vue.prototype.getUser = (username, sessionKey) => {
			var getUser_url= "http://192.168.2.149:8080/api/member/user/get";
			var nonce_str=rand.getRand();//获取随机数
			var postParams=[];//签名数组
			postParams[0]=["username",username];
			postParams[1]=["appId",globalData.appId];
			postParams[2]=["nonce_str",nonce_str];
			postParams[3]=["https",globalData.https];
			postParams[4]=["sessionKey", sessionKey];
			var signVal=sign.createSign(postParams, globalData.appKey);//签名
			//获取信息
			return new Promise((resolve, reject)=>{
				uni.request({
					url: getUser_url,
					data: {
						username: username,
						appId: globalData.appId,
						nonce_str: nonce_str,
						https: globalData.https,
						sign: signVal,
						sessionKey: sessionKey,
					},
					method: 'GET',
					success: (res) =>{
						if(res.data.code == 201){
							console.log(111111111);
							resolve(res.data);
						}else{
							console.log(res);
							reject(res.data);
						}
					},
					fail: (res)=>{
						reject(res);
					}
				})
			});
		}
	}
	extend() {
	    var length = arguments.length;
	    var target = arguments[0] || {};
	    if (typeof target!="object" && typeof target != "function") {
	        target = {};
	    }
	    if (length == 1) {
	        target = this;
	        i--;
	    }
	    for (var i = 1; i < length; i++) { 
	        var source = arguments[i]; 
	        for (var key in source) { 
	            // 使用for in会遍历数组所有的可枚举属性，包括原型。
	            if (Object.prototype.hasOwnProperty.call(source, key)) { 
	                target[key] = source[key]; 
	            } 
	        } 
	    }
	    return target; 
	}
	noLoginRequest(){
		Vue.prototype.indexRequest = (obj) => {
			let {
				url = '',
				method = 'GET',
				data = {}
				// success, //回调
				// fail,
				// complete
			} = obj
			let _data = this.extend(data,{
				siteIds: 1,
				https: 1,
				appId: globalData.appId,
			});
			return new Promise(resolve=>{
				uni.request({
					url: Vue.prototype.domainName+url,
					data: _data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: method,
					success: (res) => {
						resolve(res);
					}
				})
			})
		}
		Vue.prototype.homeRequest = (obj) => {
			let {
				url = '',
				method = 'GET',
				data = {}
				// success, //回调
				// fail,
				// complete
			} = obj
			let sessionKey = uni.getStorageSync('sessionKey');
			if(!sessionKey){
				return
			}
			let _data = this.extend(data,{
				siteIds: 1,
				https: 1,
				appId: globalData.appId,
				sessionKey: sessionKey
			});
			return new Promise(resolve=>{
				uni.request({
					url: globalData.memberUrl+url,
					data: _data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: method,
					success: (res) => {
						resolve(res.data);
					}
				})
			})
		}
	}
	/**
	 * 接口请求简化
	 */
	_setRequest() {
		Vue.prototype.request = (obj) => {
			let {
				url = "",
					method = 'POST',
					data = {},
					is_token = false,
					success, //回调
					fail,
					complete
			} = obj;
			const reg = new RegExp("^http");
			const is_domainName = url.match(reg);
			let request_url = url
			if (!is_domainName) {
				request_url = Vue.prototype.domainName + request_url;
			}
			if (is_token) {
				data.access_token = uni.getStorageSync('access_token') || '';
				// if (!data.access_token && navigateTo_num == 0) {
				// 	console.log(url, is_token);
				// 	navigateTo_num++
				// 	uni.showToast({
				// 		title: '请先登录~',
				// 		icon: 'none'
				// 	})
				// 	setTimeout(() => {
				// 		uni.navigateTo({
				// 			url: '/pages/login/login',
				// 			success: () => {
				// 				navigateTo_num = 0;
				// 			}
				// 		})
				// 	}, 500)
				// 	return false
				// }
			}
			//获取微信小程序信息
			// #ifdef MP-WEIXIN
			// const accountInfo = uni.getAccountInfoSync();
			// data.appid = accountInfo.miniProgram.appId
			// let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
			// data.appid = extConfig.appid
			// //data.appid = 'wx3ba5d834d90853f1'
			// console.log("==============extConfig===============")
			// console.log(extConfig)
			// #endif
			// #ifndef MP-WEIXIN

			//data.appid = 'wx3ba5d834d90853f1'
			//data.appid = 'wxa43f3a32be41f1c2'
			// #endif
			console.log(data.appid)


			uni.request({
				url: request_url,
				method: method,
				data: data,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {},
				fail: () => {},
				complete: (res) => {
					uni.hideLoading()
					if (res.statusCode == 500 || res.statusCode == 502 || res.statusCode == 404 ||
						res.errMsg ==
						"request:fail") {
						fail && fail(res)
					} else if (res.statusCode == 200) {
						if (this.isset(res.data)) {
							if (res.data.error_code == 401) {
								uni.showToast({
									title: '登录已过期',
									icon: 'none',
									mask: true
								})
								uni.clearStorageSync();
								if (navigateTo_num == 0) {
									navigateTo_num++;
									uni.navigateTo({
										url: '/pages/login/login',
										success: () => {
											navigateTo_num = 0;
										}
									})
								}
							} else {
								if (res.data.error_code == 0) {
									success && success(res.data)
								}
								complete && complete(res.data)
							}
						}
					}
				}
			});
		}
	}
	_setUpload() {
		Vue.prototype.upload = (path) => {
			let request_url = Vue.prototype.baseUrl + 'api/member/upload/o_upload';
			let sessionKey = uni.getStorageSync('sessionKey');
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: request_url, //仅为示例，非真实的接口地址
					filePath: path,
					name: img_upload_name,
					formData: {
						siteIds: 1,
						appId: globalData.appId,
						sessionKey: sessionKey
					},
					success: (res) => {
						console.log(res);
						let data = JSON.parse(res.data)
						if (data.code == 200) {
							resolve(data)
						} else {
							reject()
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						}
					},
					complete: (res) => {
						if (res.errMsg != 'uploadFile:ok') {
							console.log(res);
							reject()
						}
					},
					fail: (res) => {
						reject()
					}
				});
			})
		}
	}
	/*
	 * 执行前面页面的函数
	 */
	_setCurrentPages() {
		Vue.prototype.beforePage = (obj) => {
			let {
				before = 1,
				data = '',
				fn = 'init'
			} = obj;
			let pages = getCurrentPages();
			let befores = before > pages.length ? 0 : (pages.length - before - 1);
			let page = pages[befores]; //获取一页面
			// #ifdef H5
			page[fn] && page[fn](data)
			// #endif
			// #ifndef H5
			page.$vm[fn] && page.$vm[fn](data)
			// #endif
		}
	}
	/**
	 * 数组裁切
	 */
	_setArraySlice() {
		Vue.prototype.sliceArray = (array, size) => {
			var result = [];
			for (var x = 0; x < Math.ceil(array.length / size); x++) {
				var start = x * size;
				var end = start + size;
				result.push(array.slice(start, end));
			}
			return result;
		}
	}
	/**
	 * 图片预览
	 * @param {Array} urls
	 */
	_setPreviewImage() {
		Vue.prototype.previewImage = (urls) => {
			uni.previewImage({
				urls: urls,
				longPressActions: {
					itemList: ['保存图片'],
					success: (data) => {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) +
							'张图片');
					},
					fail: (err) => {
						console.log(err.errMsg);
					}
				}
			});
		}
	}
	/**
	 * 倒计时
	 * @param {start_time}   开始时间 时间戳格式
	 * @param {end_time}   结束时间 时间戳格式
	 * */
	_getRestTime() {
		Vue.prototype.getRestTime = (start_time, end_time) => {
			//let nowTime = new Date().valueOf()
			//let endTime = time
			if (!start_time) start_time = Math.floor(new Date().valueOf() / 1000)
			let restTime = end_time * 1000 - start_time * 1000
			console.log("当前的时间？", restTime, '====', end_time)
			if (restTime < 0) return false;
			//this.endDay = Math.floor((endTime-nowTime)/(24*3600*1000))
			let endHour = Math.floor((restTime % (24 * 3600 * 1000)) / (3600 * 1000))
			let endMinites = Math.floor((restTime % (3600 * 1000)) / (60 * 1000))
			let endSeconds = Math.round((restTime % (60 * 1000)) / (1000))
			if (endHour < 10) endHour = '0' + endHour
			if (endMinites < 10) endMinites = '0' + endMinites
			if (endSeconds < 10) endSeconds = '0' + endSeconds
			return {
				"h": endHour,
				"m": endMinites,
				"s": endSeconds
			}
		}
	}
}
export default common
