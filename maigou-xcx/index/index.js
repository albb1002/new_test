// index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_url: app.reqUrl("api/mall/index"),//获取首页信息
    template_url: app.reqUrl("api/mall/index/ctrl"),//获取组件信息

    index_info:{},//首页信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.get_index_info();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //获取首页信息
  get_index_info:function(){
    var that = this;
    wx.request({
      url: that.data.index_url,
      data:{

      },
      success:function(res){
        console.log(res,"首页信息");
        if (res.data.ResultCode!=0){
          app.load_fail("err:get_index_info");
          return false;
        }
        var html = res.data.Data.index_content;
        html = html.replace(/<div/g,"<view");
        html = html.replace(/<\/div>/g, "</view>");
        console.log(html);
        
        that.setData({
          index_info:html
        })
      },
      fail:function(res){
        app.load_fail("err:get_index_info");
      }
    })
  }
})