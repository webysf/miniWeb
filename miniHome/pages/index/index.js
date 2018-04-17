//index.js
//获取应用实例
var app = getApp()
var utils = require("../../utils/util.js");
Page({
  data: {
    showView: true
  },
  onLoad: function (options){
    showView: (options.showView == "true" ? true : false)
  },
  clickQuery: function (){
    var that = this
    var url = "https://www.baidu.com"
    var params = {"name":"rose"};
    var method = "get";
    var succFunc = that.queryProSuccFunc();
    app.sendAjaxRequest(url, params, method, succFunc)
  },
  queryProSuccFunc: function(res){
    console.log('成功回调。。')
    var that = this
    that.setData({
      proinfo: '科学技术是第一生产力。。',
      pro: { "title": "苹果笔记本电脑只要998", "content": "苹果电脑公司由斯蒂夫·乔布斯、斯蒂夫·盖瑞·沃兹尼亚克和Ron Wayn在 1976年4月1日创立。1975年春天，AppleⅠ由Wozon设计，并被Byte的电脑商店购买了50台当时售价为666.66美元的AppleⅠ。" },
      showView: (!that.data.showView)
    })
  },
  clickFormatDate: function(e){
    var that = this;
    var date = utils.formatTime(new Date);
    that.setData({
      dateText: date
    })

  }
})