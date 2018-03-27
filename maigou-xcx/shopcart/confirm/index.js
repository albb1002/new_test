// shopcart/confirm/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirm_url: app.reqUrl("api/shopcart/confrim_order"),//确认订单

    confirm_info:[],//订单信息
    shopcart_ids:"",//规格ids--url参数
    buy:0,//是否立即购买--url参数

    show_deliver:false,//是否运费弹出层
    show_coupon:false,//选择优惠券
    show_bill:false,//发票信息
    is_show_mask:false,//是否遮罩层

    deliver_style:"opacity:0;bottom:-300rpx;",//选择运费弹出样式
    coupon_style:"opacity:0;bottom:-300rpx;",//选择优惠券
    bill_style:"opacity:0;bottom:-400rpx;height:800rpx;",//发票信息

    mask_data: {  //遮罩层过渡样式
      mask_style: "opacity:0"
    },

    bill_person_or_unit:1,//发票信息--1个人2单位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      var that = this;
      that.setData({
        shopcart_ids: "",
        buy: 1
      });
      that.get_confirm_info();
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
  //选择配送方式
  click_deliver:function(){
      var that = this;
      that.setData({
        is_show_mask:true,
        show_deliver:true
      });
      setTimeout(function(){
          that.setData({
            deliver_style: "bottom:0;opacity:1",//选择运费弹出层
            'mask_data.mask_style': "opacity:1",//遮罩层
          })
      },100)

  },
  //选择优惠券
  click_coupon:function(){
    var that = this;
    that.setData({
      is_show_mask: true,
      show_coupon: true
    });
    setTimeout(function () {
      that.setData({
        coupon_style: "bottom:0;opacity:1",//选择运费弹出层
        'mask_data.mask_style': "opacity:1",//遮罩层
      })
    }, 100)
  },
  //选择发票
  click_bill:function(){
    var that = this;
    that.setData({
      is_show_mask: true,
      show_bill: true
    });
    setTimeout(function () {
      that.setData({
        bill_style: "bottom:0;opacity:1;height:800rpx",//选择发票弹出层
        'mask_data.mask_style': "opacity:1",//遮罩层
      })
    }, 100)
  },
  //隐藏弹出层内容
  mask_hide:function(){
    this.setData({
      deliver_style:"bottom:-300rpx;opacity:0",//选择运费
      coupon_style:"bottom:-300rpx;opacity:0",//选择优惠券
      bill_style:"bottom:-400rpx;opacity:0",//发票信息
      'mask_data.mask_style': "opacity:0",//遮罩层
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        show_deliver:false,//是否显示运费选择-弹出层
        show_coupon:false,//是否显示选择优惠券--弹出层
        show_bill:false,//是否显示发票--弹出层
        is_show_mask: false,//遮罩层
      });
    }, 500);

  },
  //切换发票类型--个人或者单位
  chose_person_or_bill:function(event){
    var t = event.currentTarget.dataset.type;
    var that = this;
    console.log(t);
    that.setData({
      bill_person_or_unit:t
    })
      console.log(event);
  },
  //获取当前要购买的商品信息
  get_confirm_info:function(){
    var that = this;
    wx.request({
      url: that.data.confirm_url,
      data:{
        shopcart_ids: that.data.shopcart_ids,
        buy:that.data.buy
      },
      success:function(res){
          console.log(res);
          that.data.confirm_info = res.data.Data;
          that.js_conform_info();//解析
      },
      fail:function(){
        app.load_fail("fail:get-confirm-info")
      }
    })
  },
  //确认订单数据解析
  js_conform_info:function(){
      var that = this;
      var arr = that.data.confirm_info;
      for(var i=0 ; i<arr.length ; i++){
        arr[i].st_sp_len = arr[i].shopcart_item_list_1.length;//实体商品长度
        arr[i].xn_sp_len = arr[i].shopcart_item_list_2.length;//虚拟商品长度
      }
  
      that.setData({
        'confirm_info':arr
      })

      console.log(that.data.confirm_info,2);
  }
})