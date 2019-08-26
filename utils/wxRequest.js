// var Promise = require('../plugins/es6-promise.js')

function wxPromisify(fn) {
  return function (obj = {}) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
        wx.hideLoading();
      }
      obj.fail = function (res) {
        //失败
        wx.hideLoading();
        let err = JSON.parse(res);
        console.log(err + obj);
        console.log("接口请求错误...");
        wx.showToast({
          title: '网络请求超时',
          icon: 'none'
        })
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
// Promise.prototype.finally = function (callback) {
//   let P = this.constructor;
//   return this.then(
//     value => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => { throw reason })
//   );
// };
function wxPromisifyNoLoading(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        let err = JSON.stringify(res);
        wx.showModal({
          content: err,
        })
        reject(res)
      }
      fn(obj)
    })
  }
}
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}
/**
 * 微信请求，
 * @krislee . 2017/8/14
 * 请求方式：‘POST’,'GET'、
 * 微信请求的data可以是Object，也可以是String，
 * 为了和rn项目统一，这里统一请求以String类型。
 */
function dataRequest(url, method, data) {
  // var param = JSON.parse(data);
  var param = data;
  // param['encrypt'] = 'simple';
  // param['version'] = '1.0.0';
  // param['deviceType'] = 'WECHAT-M';
  // param['appType'] = 'C';
  console.log(param)
  var dataRequest = wxPromisify(wx.request)
  return dataRequest({
    url: url,
    method: method,
    data: JSON.stringify(param),
    header: {
      "Content-Type": "application/json"
    },
  })
  console.log(JSON.stringify(data));
}

/**
 * packaging request no loading
 */
function dataRequestNL(url, method, data) {
  var param = JSON.parse(data);
  param['encrypt'] = 'simple';
  param['version'] = '1.0.0';
  param['deviceType'] = 'WECHAT-M';
  param['appType'] = 'C';
  console.log(param)
  var dataRequest = wxPromisifyNoLoading(wx.request)
  return dataRequest({
    url: url,
    method: method,
    data: JSON.stringify(param),
    header: {
      "Content-Type": "application/json"
    },
  })
  console.log(JSON.stringify(data));
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  dataRequest: dataRequest,
  dataRequestNL: dataRequestNL
}