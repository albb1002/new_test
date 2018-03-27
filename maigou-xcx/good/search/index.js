// good/search/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_url:"api/good/search/keyword_list",//热搜
     
    search_keyword_info:[],//热搜字段

    other_height:"height:0;overflow:hidden",
    keyword:"",//搜索关键字--键盘输入--待确认
    keyword1: "",//搜索关键字--当前搜索的关键字
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
     wx.getSystemInfo({
       success: function(res) {
         console.log(res); 
         that.queryMultipleNodes(res.windowHeight);//获取节点的信息
        
       },
     });
     //缓存 关键字
     try {
       var keyword = wx.getStorageSync("search_keyword");
       console.log(keyword, "word");
       if (keyword != undefined) {
         this.setData({
           keyword1: keyword,
           keyword:keyword
         })
       }
     } catch (e) { }
     //获取热搜
     that.get_serch_keyword();

  },
  queryMultipleNodes: function (windowHeight) {
    var that= this;
    var query = wx.createSelectorQuery()
    query.select('#wrap').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      that.setData({
        other_height: "height:" + (windowHeight-res[0].height) + "px;overflow:hidden"
      })
      console.log(res);
    })
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

  //获取热搜关键字
  get_serch_keyword:function(){
    var that = this;
    wx.request({
      url: app.reqUrl(that.data.search_url),
      success: function(res) {
        that.setData({
          search_keyword_info:res.data.Data
        })
        console.log(res,"data");
      },
      fail: function(res) {
        app.load_fail("err:get_search_keyword");
      },
      complete: function(res) {},
    })
  },
  //获取输入的搜索关键字
  get_keyword:function(event){
    var that = this;
    that.setData({
      keyword:event.detail.value
    })
  },
  //搜索
  search:function(){
    var that = this;
    that.setData({
      keyowrd1:that.data.keyword
    });
    wx.setStorageSync("search_keyword", that.data.keyowrd1);
    wx.switchTab({//跳转到商品列表页面
      url: '../index/index',
      fail:function(res){
        console.log(res);
      }
    })
    console.log(that.data.keyowrd1);
  },
  //热搜
  hold_search:function(event){
    var that = this;
    var name = event.currentTarget.dataset.keyword;
    console.log(event);
    that.setData({
        keyword:name,
        keyword1:name
    });
    wx.setStorageSync("search_keyword", name);
    wx.switchTab({//跳转到商品列表页面
      url: '../index/index',
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //清除搜索记录
  del_keyword:function(){
    var that = this;
    that.setData({
      keyword:"",
      keyword1:""
    });
  },
  //返回
  back:function(){
    wx.navigateBack({
      delta: 2
    })
  }

})