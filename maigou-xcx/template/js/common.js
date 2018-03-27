

var comJs = {};
comJs.get_system_info=function(){
  wx.getSystemInfo({
    success: function (res) {
      console.log(res);
    }
  })
}
function b(){
  wx.getSystemInfo({
    success: function (res) {
      console.log(res);
    }
  })
}


module.exports.a = b;