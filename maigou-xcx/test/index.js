// test/index.js
var c = require("../js/cityJson.js");
var app = getApp();
var ajax = require("other.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: c.obj,//参数详情---cityJson.js---

    guess_love:[],//猜你喜欢
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.city);
    var that = this;
    ajax.ajax_info.get_guess_you_fav(that, that.data.guess_love,app);
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

  //弹出选择地址
  city_show:function(){
    var that = this;
    c.show(that);
  },
  //隐藏选择地址
  hide_city:function(){
    var that = this;
    c.hide(that);
  },
  //点击省份-城市--区县导航
  click_city_nav:function(event){
   var that = this;
    c.click1(event,that);
  },
  //选择地区
  click_city_list:function(event){
    var that = this;
    c.click2(event, that);
  }

})