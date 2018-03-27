var ajax_info = {}

//猜你喜欢
ajax_info.get_guess_you_fav = function(t,c,app){
  var that = t;
  wx.request({
    url: app.reqUrl('api/good/guess/list'),
    data:{},
    success:function(res){
        that.c = res.data.Data;
    },
    fail:function(fail){
      app.load_fail("err:get_guess_you_fav");
    }
  })
}

module.exports.ajax_info = ajax_info;

