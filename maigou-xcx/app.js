App({
  //小程序初始化只执行一次
  onLaunch:function(option){
    
  },
  //获取请求的地址
  reqUrl:function(str){
    var wxid = "4";
    var _t = "12CD486EA7C2C12BEAE111B92B0AA96A2FB5CC2BA37BBF870F633BFFDC5E4BA7";
    var open_id="test123456";
    return "https://xcx.maigoucrm.com/"+str+"?wxid="+wxid+"&_t="+_t+"&open_id="+open_id;
  },
  //请求报错
  load_fail:function(title){
    wx.showLoading({
      title: title,
      mask: true
    })
  },
  //open_id
  get_openid:function(){
    return "test123456";
  }

}) 