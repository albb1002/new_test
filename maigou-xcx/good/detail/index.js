// good/detail/index.js
var app = getApp();
var ajax = require("../../js/common_ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info_url: app.reqUrl("api/good/info"),//商品信息
    get_coupon_url: app.reqUrl("api/coupon/receive"),//领取优惠券
    coupon_add_or_remove: app.reqUrl("api/good/collection/add_or_remove"),//收藏商品或者移除收藏
    buy_url: app.reqUrl("api/shopcart/add"),//立即购买--加入购物车

    good_id: 1473,//商品详情的id
    good_info:{},//商品信息
    guess_love:{
      arr:[]
    },//猜你喜欢

    chose_spec:"",//当前选中的规格
    chose_spec_ids:"",//选中的规格id的集合
    spec_list_len:0,//规格分类的length
    spec_stock:-1,//选择规格后商品的库存
    spec_price:-1,//选择规格后商品的价格
    buy_number:1,//购买的商品数量  --默认为1
    buy_btn_can_reduce:1,//购买数量可减  1是0否 
    buy_btn_can_add: 1,//购买数量可增加 1是0否

    buy_btn_type : 0,//购买弹出层的三个按钮---0（加入购物车，立即购买） 1加入购物车 2立即购买
    is_collect:0,//是否收藏了该商品1是0否
    shopcart_num:0,//购物车的数量

    //swiper配置
    autoplay: true,//是否自动轮播
    interval: 4000,//停留时间
    duration: 500,//动画时间
    indicatorDots:true,//是否显示小图标
    circular: true,//是否采用衔接滑动
    indicatorColor:'rgba(255,255,255,.5)',//未选中的颜色
    indicatorActiveColor:'#f23030',//选中的颜色
    //swiper配置--end
    show_coupon:false,//是否显示优惠券层
    show_server: false,//是否显示放心购买服务
    show_buy:false,//是否显示立即购买

    coupon_style:"",//弹出绑定的样式--优惠券
    server_style: "",//弹出绑定的样式--放心购买服务
    buy_style: "",//弹出绑定的样式--立即购买选择规格加入购物车

    is_show_mask:false,//是否隐藏遮罩层
    mask_data:{  //遮罩层过渡样式
      mask_style:"opacity:0"
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    //that.setData({
     // good_id: option.good_id,
    //})
    that.get_good_info();
    ajax.ajax_info.get_guess_you_fav(that,'guess_love.arr',app);//猜你喜欢
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
  //点击--领券
  click_coupon_list:function(){
      this.setData({
        show_coupon:true,
        is_show_mask:true,
      });
      var that = this;
      setTimeout(function(){
        that.setData({
          coupon_style: "bottom:0;opacity:1",
          'mask_data.mask_style':"opacity:1",
        });
      },100);
  },
  //点击放心购买服务（正品保证）
  click_server_list:function(){
    this.setData({
      show_server: true,
      is_show_mask: true,
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        server_style: "bottom:0;opacity:1",
        'mask_data.mask_style': "opacity:1",
      });
    }, 100);
  },
  //购买选择商品--选择规格
  click_buy:function(event){
    var that = this;
    var t = event.currentTarget.dataset.btnType;//按钮类型
    if (t == 1 && that.data.spec_list_len==0){//加入购物车
      var obj = {
        good_id: that.data.good_id,//商品id
        spec_ids: "",//商品规格，如果没有规格，设置spec_ids=''
        count: 1,//当前购买总数量
        buy: 0,//buy=1时，表示立即购买（前端如果操作成功，需要直接跳转到订单确认页面），buy=0时不是立即购买
        flag: 1,//  flag=1表示商品详情处，添加到购物车； flag=2表示商品详情处，立即购买 flag=3表示购物车列表处修改购买数量 flag=4表示商品详情处，在限购情况下，添加到购物车
      }
      that.go_buy(obj);
      return false;
    }
    console.log(event);
    that.setData({
      show_buy: true,
      is_show_mask: true,
      buy_btn_type:t
    });
    setTimeout(function () {
      that.setData({
        buy_style: "bottom:0;opacity:1",
        'mask_data.mask_style': "opacity:1",
      });
    }, 100);
  },
  //隐藏弹出层--点击遮罩层事件mask_hide（函数名改变需改变公共模板common绑定的事件）
  mask_hide:function(){
    this.setData({
      coupon_style: "bottom:-700rpx;opacity:0",//优惠券
      server_style:"bottom:-700rpx;opacity:0",//服务
      buy_style:"bottom:-850rpx;opacity:0",//购买
      'mask_data.mask_style': "opacity:0",//遮罩层
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        show_coupon: false,//优惠券
        show_server:false,//服务
        show_buy:false,//购买
        is_show_mask: false,//遮罩层
      });
    }, 500);
  },
  //商品信息
  get_good_info:function(){
      var that = this;
      wx.request({
        url: that.data.good_info_url,
        data:{
          good_id: that.data.good_id
        },
        success:function(res){
          if (res.data.ResultCode!=0){
            app.load_fail("code!=0-get-good-info");
            return false;
          }
          that.setData({//赋值
            good_info:res.data.Data
          })
          that.js_info();
          console.log(res);
        },
        fail:function(){
          app.load_fail("err:get-good-info");
        }
      })
  },
  //数据解析
  js_info:function(){
    var that = this;
    //优惠券时间过滤--和会员名称过滤
    var arrs=[];
    for (var i = 0; i < that.data.good_info.coupon_list.length ; i++){
      var arr = that.data.good_info.coupon_list[i];
      arr.start_time = that.data.good_info.coupon_list[i].start_time.substr(0,10).replace(/-/g,".");
      arr.end_time = that.data.good_info.coupon_list[i].end_time.substr(0, 10).replace(/-/g, ".");
      arr.member_level_name = arr.member_level_name.substr(0,5);
      arr.is_show_coupon = 1//添加字段是否显示优惠券--领取后不显示
      arrs.push(arr);
    }
    var can_save = 0;//是否有优惠券1是0否
    that.data.good_info.has_coupon = can_save;//是否有优惠券1是0否---新增字段    
    var len = that.data.good_info.coupon_list.length;
    if(len>0){
      can_save = 1;
    }
    that.setData({
       'good_info.coupon_list':arrs,
       'good_info.has_coupon': can_save,
       'is_collect': that.data.good_info.is_collection
    })
    //优惠券时间过滤--和会员名称过滤--end

    //服务时间过滤
    if (that.data.good_info.good_type == 2 && that.data.good_info.virtual_type==1){
      var s_s_time = that.data.good_info.server_start_time.substr(0, 10).replace(/-/g, ".");
      var s_e_time = that.data.good_info.server_end_time.substr(0, 10).replace(/-/g, ".");
      that.setData({
        'good_info.server_start_time':s_s_time,
        'good_info.server_end_time': s_e_time
      })
    }
    //商品服务说明(1、微信认证 2、假一赔十 3、正品保证 4、送货上门 5、七天无理由退货)
    var tap = that.data.good_info.service_taps.split(",");
    that.data.good_info.tap_arr = "null";
    if(tap.length>0){
      that.setData({
        "good_info.tap_arr": tap
      });
    }else{
      that.setData({
        "good_info.tap_arr": "null"
      });
    }
    //规格是否选中
    var spec_list_arr = that.data.good_info.spec_class_list;//规格分类
    for(var lr = 0 ; lr<spec_list_arr.length ; lr++){
      spec_list_arr[lr].is_checked = 0;////注册字段--是否选中--分类
    }
    var spec_arr = that.data.good_info.spec_list;//规格选项
    for(var ar=0 ; ar<spec_arr.length ; ar++){
      spec_arr[ar].is_checked = 0;//注册字段--是否选中--规格选项
    }
    var good_num = that.data.good_info.shopcart_good_num;
    if (good_num>99){
      good_num="99+"
    }
    that.setData({
      'good_info.spec_list':spec_arr,
      'spec_list_len': spec_list_arr.length,
      'shopcart_num': good_num
    })
  },
  //领取优惠券--优惠券id
  click_get_coupon_info:function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.request({
      url: that.data.get_coupon_url,
      data:{
        coupon_id:id
      },
      success:function(res){
        if (res.data.ResultCode==0){
          wx.showToast({
            title:"领取成功",
            icon:"success",
            duration: 3000
          })
        }else{
          app.load_fail("fail:get-coupon-info");
          return false;
        }
        //隐藏当前领取成功的优惠券
        var count = 0;//剩余可领取的优惠券数量--为0没有可领取的优惠券
        var arr = that.data.good_info.coupon_list;
        for (var i = 0; i < arr.length; i++) {
          if (id == arr[i].coupon_id) {
            arr[i].is_show_coupon = 0;//隐藏当前领取的优惠券
          }else{
            count=1;
          }
        }
        that.setData({
          'good_info.coupon_list': arr,
          'good_info.has_coupon': count
        })
      },
      fail:function(){
        app.load_fail("fail:get-coupon-info")
      }
    })
  },
  //选择规格
  click_spec_list:function(event){
    var that = this;
    var p_id = event.currentTarget.dataset.parentSpecId;//当前节点父类选项
    var id = event.currentTarget.dataset.specId;//当前点击的规格id;
    var p_spec_arr = that.data.good_info.spec_class_list;//分类项数据
    var spec_arr = that.data.good_info.spec_list;//当前规格选项
    for (var fi = 0; fi < p_spec_arr.length ; fi++){
      if (p_id == p_spec_arr[fi].spec_class_id){
        p_spec_arr[fi].is_checked = 1;
      }
    }
    //判断当前分类是否有选中的--有选中就取消
    for (var i = 0; i < spec_arr.length; i++){
      if (spec_arr[i].is_checked == 1 && p_id == spec_arr[i].spec_class_id){
        spec_arr[i].is_checked = 0;
      }
    }
    //勾选当前选项
    var str = "";//规格名称
    var str_ids="";//规格ids
    var spec_ids_arr = [];//规格ids
    for(var i=0 ; i<spec_arr.length ; i++){
      if (id == spec_arr[i].spec_id){
        spec_arr[i].is_checked = 1
      }
      if (spec_arr[i].is_checked == 1){//已经选中的规格
        str += '"'+spec_arr[i].spec_name+'"';
        spec_ids_arr.push(spec_arr[i].spec_id);
      }
    }
    spec_ids_arr.sort(that.sort_num())
   
    str_ids = spec_ids_arr.join(",");
    //判断当前规格分类是否全部选中---已经全部全中获取当前规格的商品价格和库存
    var is_all = 0;
    var stock = 0;//库存
    var price = 0;//价格
    for (var i = 0; i < p_spec_arr.length ; i++){
      if (p_spec_arr[i].is_checked==1){
        is_all++;
      }
    }
    console.log(is_all, p_spec_arr.length)
    if (is_all == p_spec_arr.length){//s所有分类都已经选中
       var list = that.data.good_info.good_spec_price_list;
       for(var i=0 ; i<list.length ; i++){
         
         if (str_ids == list[i].spec_ids){
           stock = list[i].stock;
           price = list[i].price;
         }
       }
    }
    that.setData({
      'good_info.spec_class_list': p_spec_arr,
      'good_info.spec_list': spec_arr,
      'chose_spec':str,
      'chose_spec_ids':str_ids,
    })
    if (stock!=0||price!=0){
      that.setData({
        'spec_stock': stock,
        'spec_price': price
      })
    }
  },
  sort_num:function(a,b){
    return a-b;
  },
  //收藏
  click_coupon:function(){
    var that = this;
    wx.request({
      url: that.data.coupon_add_or_remove,
      data:{
        good_id: that.data.good_id
      },
      success:function(res){
          console.log(res);
          if(res.data.Data.code!=0){
            app.load_fail("err:click-coupon");
            return false;
          }
          if (that.data.is_collect==0){
            that.setData({
              'is_collect':1
            })
            wx.showToast({
              title: "已收藏",
              icon: "success",
              duration: 2000
            })
          }else{
            that.setData({
              'is_collect': 0
            })
          }
      },
      fail:function(){
        app.load_fail("fail:click-coupon");
      }
    })
  },
  //购买数量
  click_buy_bumber:function(event){
      var that = this;
      var num = event.detail.value;
      that.setData({
        buy_number:num
      })
  },
  //减少购买数量
  click_reduce_number:function(){
      var that = this;
      if (that.data.buy_number>1){
        var n = Number(that.data.buy_number)-1;
        that.setData({
          buy_number: n,
        })
      }
  },
  //增加购买数量
  click_add_number:function(){
     var that = this;
     var can_add = 0;
     var count = 0;
     if (that.data.spec_list_len>0){//有规格
        count = that.data.spec_stock;
     }else{//无规格
        count = that.data.good_info.stock
     }
     if(count>1){
       can_add=1;
     }
     if (can_add == 1 && that.data.buy_number<count){
       var n = Number(that.data.buy_number)+1;
       that.setData({
         buy_number:n
       })
     }
  },
  //立即购买
  go_buy:function(obj){
    var that = this;
    if (that.data.spec_list_len!=0){//存在规格
      var spec_list = that.data.good_info.spec_class_list;//分类的ids
      for(var i=0 ; i<spec_list.length ; i++){
        if(spec_list[i].is_checked!=1){
          wx.showToast({
            title: '请选择:'+spec_list[i].spec_class_name,
            icon: "none",
            duration: 2000
          })
          return false;
        }
      }
      if (that.data.buy_number > that.data.spec_stock){//库存不足
        wx.showToast({
          title: '库存不足，无法购买',
          icon: "none",
          duration: 2000
        })
        return false;
      }
    }else{//不存在规格
      if (that.data.buy_number > that.data.good_info.stock) {//库存不足
        wx.showToast({
          title: '库存不足',
          icon: "none",
          duration: 2000
        })
        return false;
      }
    }
    wx.request({
      url: that.data.buy_url,
      data:obj,
      success:function(res){
        console.log(res.data)
        if(res.data.Data.code!=0){
          wx.showToast({
            title: res.data.Data.msg,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        if(obj.buy==1){//立即购买--跳转到确认订单
          wx.navigateTo({
            url: '../../shopcart/confirm/index?shopcart_ids='+obj.spec_ids+'&buy='+obj.buy+''
          })
        }
        if (obj.buy == 0 && obj.flag==1){//加入购物车
          var good_num = Number(res.data.Data.refValue);
          if(good_num>99){
              good_num = "99+";
          }
          that.setData({
            shopcart_num: good_num
          })
          wx.showToast({
            title: "添加成功",
            icon: "success",
            duration: 2000
          });
          that.mask_hide();
        }
        console.log(res);
      },
      fail:function(){
        app.load_fail("fail:go-buy")
      }
    })
  },
  //立即购买和加入购物车的参数
  click_buy_obj:function(event){
    var that = this;
    var n = that.data.buy_number;
    n = n.toString().replace(/[^\d]/g, "");//正则验证删除非数字的字符
    if (n == '') {
      n = 1
    }
    that.setData({
      'buy_number': n
    });
    var f = event.currentTarget.dataset.flag;
    var b = event.currentTarget.dataset.buy;//1为立即购买2加入购物车
    
    var obj = {
      good_id: that.data.good_id,//商品id
      spec_ids: that.data.chose_spec_ids,//商品规格，如果没有规格，设置spec_ids=''
      count: n,//当前购买总数量
      buy: b,//buy=1时，表示立即购买（前端如果操作成功，需要直接跳转到订单确认页面），buy=0时不是立即购买
      flag: f,//  flag=1表示商品详情处，添加到购物车； flag=2表示商品详情处，立即购买 flag=3表示购物车列表处修改购买数量 flag=4表示商品详情处，在限购情况下，添加到购物车
    }
    that.go_buy(obj);
  }



})