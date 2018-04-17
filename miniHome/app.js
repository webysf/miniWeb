//app.js
App({
  onLaunch: function () {
    
  },
  login: function () {
    var that = this;
    var token = that.globalData.token;
    var globaURL = that.globalData.url;
    if (token) {
      wx.request({
        url: globaURL + that.globalData.subDomain + '/user/check-token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          url: globaURL + that.globalData.subDomain + '/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            //console.log(res.data.data)
            that.globalData.token = res.data.data.token;
            that.globalData.uid = res.data.data.uid;
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    var globaURL = that.globalData.url;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: globaURL + that.globalData.subDomain + '/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登陆接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }

  },
  sendAjaxRequest: function (url, params, method, succFunc){
    wx.request({
      url: url,
      data: params,
      method: method,
      header: { 'Content-Type': 'application/json' },
      dataType: "json",
      responseType: "text",
      success: succFunc
    })
  },
  globalData: {
    url: "https://www.baidu.com/",
    userInfo: null,
    subDomain: "abcd", // 如果你的域名是： https://www.baidu.com/abcd 那么这里只要填写 abcd
    version: "2.0",
    shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
  }


})