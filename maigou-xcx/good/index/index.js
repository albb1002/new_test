// good/index/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    good_list_url:"api/good/list",//商品列表--分页获取
    aside_nav:"api/good/category",//侧栏分类导航栏

    good_list_obj:{//分页获取商品的参数
      page:1,//当前页默认1开始
      dataCount:10,//每页显示的数据
      sort: 1, //排序，sort=1：升序 ， sort=0：降序
      flag: 0, //flag=0综合， flag=1销量， flag=2价格
      keyword: "",//搜索关键词，如果没有默认为空
      good_class_id: 0,//商品分类ID，如果没有选择分类good_class_id默认设置为0
      open_id: app.get_openid(),//消费者微信公众号open_id
    },
    good_list_info:[],//商品列表信息
    aside_nav_info:[],//侧栏导航栏

    good_list_isloading:-1,//订单数据是否加载完成1是0否
    price_sort:1,//升序 0降序---价格排序控制
    sort_style:1,//当前的排序方式 1综合2销量3价格-- 控制字体的颜色

    list_type:2,//列表排序方式1单列2多列
    is_show_mask:false,//是否隐藏遮罩层
    mask_data: {  //遮罩层过渡样式
      mask_style: "opacity:0"
    },
    head_position_style: 0,//搜索栏的定位方式是否为fixed 1是0否  在侧栏滑出时定位为fixed
    window_height:0,//窗口的可用高度  用来计算二级导航栏的高度
    aside_style:"display:none",//侧栏滑出的高度
    is_show_aside:0,//侧栏是否滑出1是0否

    sec_nav:"",//二级导航栏控制
    search_keyword:"",//搜索的关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品列表的排列方式 有缓存获取缓存的排列方式  没有缓存默认两列
    try {
      var list_type = wx.getStorageSync("list_show_type");
      if(list_type==1||list_type==2){
        this.setData({
          list_type: list_type
        })
      }
    } catch (e) { }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
      this.get_aside_nav();//获取导航信息
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            window_height: res.windowHeight,
          })
        },
      });
      console.log("read");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var keyword = wx.getStorageSync("search_keyword");
      console.log(keyword, "word");
      if (keyword != undefined) {
        this.setData({
          search_keyword: keyword,
          'good_list_obj.keyword': keyword
        })
      }
    } catch (e) { }
    this.get_good_list(); //获取商品列表信息
    
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
  onReachBottom: function (event) {
    if (this.data.good_list_isloading == 0) {
      this.get_good_list(1);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //单列和两列的切换
  nav_tab:function(){
    if (this.data.list_type == 1) {
      this.setData({
        list_type: 2
      })
    }else{
      this.setData({
        list_type: 1
      })
    }
    try{
      wx.setStorageSync("list_show_type", this.data.list_type);
    }catch(e){}

  },
  //显示侧栏
  show_aside:function(){
    var id = wx.createSelectorQuery();
    var id_height = 0;
    var that = this;
    id.select('#search_head').boundingClientRect();
    id.exec(function(res){
      console.log(res[0].height);
      id_height = res[0].height;
      var h = that.data.window_height - id_height;
      if (that.data.is_show_aside==0){
        that.setData({
          aside_style: "height:" + h + "px;display:block;top:" + id_height + "px;",
          is_show_mask: true,
          head_position_style: 1,
          is_show_aside: 1
        })
        setTimeout(function () {
          that.setData({
            aside_style: "height:" + h + "px;display:block;left:0;top:" + id_height + "px;",
            'mask_data.mask_style': "opacity:1"
          })
        }, 50)
      }else{
        that.setData({
          aside_style: "height:" + h + "px;display:block;left:-550rpx;top:" + id_height + "px;",
          'mask_data.mask_style': "opacity:0",
          
        })
        setTimeout(function () {
          that.setData({
            is_show_mask: false,
            head_position_style: 0,
            is_show_aside: 0
          })
        }, 500)
      }
      
    });
  },
  mask_hide: function () { 
    this.show_aside();
  },
  //获取商品列表
  get_good_list:function(i){
      var that = this;
      var a=i;
      if(i==1){
        var page = that.data.good_list_obj.page+1;
        that.setData({
          "good_list_obj.page":page
        })
        console.log(i);
      }
      //获取列表
      wx.request({
        url: app.reqUrl(that.data.good_list_url),
        data: that.data.good_list_obj,
        success: function (res) {
          
          console.log(res, "user/info",a);
          if (res.statusCode!="200"){
            wx.showLoading({
              title: 'get_list_info 错误',
              mask: true
            })
            return;
          }
          var len = res.data.Data.length;
          if (len < that.data.good_list_obj.dataCount){//获取的数据数量小于每页的数量---商品已经获取完毕
              that.setData({
                good_list_isloading:1  //商品获取完成
              })
          }else{
            that.setData({
              good_list_isloading: 0  //商品没有全部获取
            })
          }
          if(a==1){  //再次加载数据--滑到底部
            var arr = that.data.good_list_info;
            var info = res.data.Data;
            for (var i = 0; i < info.length; i++) {
              arr.push(info[i]);
            }
            console.log(arr,"arr");
            that.setData({
              good_list_info: arr
            })
          }else{  //首次加载数据--
            that.setData({
              good_list_info: res.data.Data
            })
          }
        },
        fail:function(res){
          app.load_fail("err:get_good_list");
        }
      })
  },
  //获取侧栏导航分类
  get_aside_nav:function(){
      var that = this;
      wx.request({
        url: app.reqUrl(that.data.aside_nav),
        data:{
          parent_id:0
        },
        success:function(res){
          if (res.statusCode != "200") {
            wx.showLoading({
              title: 'get_aside_nav 错误',
              mask: true
            })
            return;
          }
          that.setData({
            aside_nav_info:res.data.Data
          })

          console.log(that.data.aside_nav_info,"导航")
        },
        fail:function(){
          app.load_fail("err:get_aside_nav");
        }
      })
  },

  //综合排序
  click_flat_sort:function(){
      var that = this;
      that.setData({
        'good_list_obj.page': 1,//默认当天页为1
        'good_list_obj.sort': 1,//升序
        'good_list_obj.flag': 0,//综合
        sort_style:1,//颜色控制器
        price_sort:1
      })
      that.get_good_list();//获取数据
  },
  //销量排序
  click_sale_sort:function(){
    var that = this;
    that.setData({
      'good_list_obj.page': 1,//默认当天页为1
      'good_list_obj.sort': 0,//降序
      'good_list_obj.flag': 1,//销量
      sort_style:2,
      price_sort:1,
    })
    that.get_good_list();//获取数据
  },
  //价格排序
  click_price_sort:function(){
    var that = this;
    if (that.data.price_sort==1){
      that.setData({
        price_sort:0,
        'good_list_obj.page':1,//默认当天页为1
        'good_list_obj.sort': 0,//默认当天页为降序
        'good_list_obj.flag':2,//价格排序
        sort_style:3,
      })
    }else{
      that.setData({
        price_sort: 1,
        'good_list_obj.page': 1,//默认当天页为1
        'good_list_obj.sort': 1,//升序
        'good_list_obj.flag': 2,
        sort_style: 3,
      })
    }
    that.get_good_list();//获取数据
  },
  //展开二级导航栏
  click_aside_nav:function(event){
      var that = this;
      var sec = event.currentTarget.dataset.sec;
      if (sec == that.data.sec_nav) {//再次点击如果已经展开则合并
        that.setData({
          sec_nav: ""
        });
      } else {//展开当前选项
        that.setData({
          sec_nav: sec
        });
      }
  },
  //点击分类
  click_sec_nav:function(event){
    var that = this;
    var name = event.currentTarget.dataset.name;//当前导航的名称
    var id = event.currentTarget.dataset.id;//分类id
    var t = event.currentTarget.dataset.type;//当前是一级分类还是二级分类t=1 一级分类 2二级分类
    that.setData({
      search_keyword:name
    })
    if(t==1){
      name="";
      that.click_aside_nav_search(name, id);
    }else{
      that.click_aside_nav_search(name, id);
    }
    that.show_aside();
  },
  //执行搜索
  click_aside_nav_search:function(value,id){
      var that = this;
      that.setData({
        'good_list_obj.page': 1,//当前页默认1开始
        'good_list_obj.sort': 1,//排序，sort=1：升序 ， sort=0：降序
        'good_list_obj.flag': 0, //flag=0综合， flag=1销量， flag=2价格
        'good_list_obj.keyword': value,//搜索关键词，如果没有默认为空
        'good_list_obj.good_class_id': id,//商品分类ID，如果没有选择分类good_class_id默认设置为0
        'good_list_obj.open_id': app.get_openid(),//消费者微信公众号open_id
        sort_style: 1,//颜色控制器
        price_sort: 1,
      });
      that.get_good_list();//获取数据
  },
  //初始搜索--
  def_search:function(){
      var that = this;
      that.setData({
        "good_list_obj.page":1,
        "good_list_obj.dataCount":10,
        "good_list_obj.sort":1,
        "good_list_obj.flag":0,
        "good_list_obj.keyword":"",
        "good_list_obj.good_class_id":0,
        "good_list_obj.open_id":app.get_openid(),
        search_keyword: "",//关键字
        sort_style: 1,//颜色控制器
        price_sort: 1,
      });
      that.get_good_list();//获取数据
      wx.setStorageSync("search_keyword", "");
  },
  
})