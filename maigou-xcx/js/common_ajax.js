var ajax_info = {}

//猜你喜欢--t(this对象) c(接收参数) app（getApp()）
ajax_info.get_guess_you_fav = function (t, c, app) {
  var that = t;
  wx.request({
    url: app.reqUrl('api/good/guess/list'),
    data: {},
    success: function (res) {
      that.setData({
        [c]:res.data.Data
      })
      console.log(that);
      console.log(that.data.c, "猜你喜欢", res.data.Data,that.data.c);
    },
    fail: function (fail) {
      app.load_fail("err:get_guess_you_fav");
    }
  })
}

module.exports.ajax_info = ajax_info;