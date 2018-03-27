// shopcart/index/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcart_url: app.reqUrl("api/shopcart/list"),//购物车商品
    good_spec_url: app.reqUrl("api/good/spec"),//获取商品的规格
    updata_shopcart_url: app.reqUrl("api/shopcart/update"),//更新购物车的商品信息

    shopcart_info:[],//购物车的商品信息
    total_price:0,//商品总价
    has_spec_good_info:{},//选中当前商品的规格
    spec_info:{},//点击当前商品的规格

    updata_spec: {//更新当前购物车规格--更新完成后更新视图--辅助参数
      index:0,
      list_type:""
    },
    is_buy:true,//true为编辑按钮（底部为去支付） false为完成按钮（底部为删除）
    mask_data: {  //遮罩层过渡样式
      mask_style: "opacity:0"
    },
    tip:{//是否显示弹出层提示文字
        show:false,//是否现在提示弹出层
        cancel:true,//是否显示取消按钮
        txt:"提示的文字信息",//提示的文字信息
        style:"opacity:0;top:35%",//过渡样式
    },
    spec_style: "bottom:-850rpx;opacity:0",//弹出绑定的样式--重新选择规格
    show_spec:false,//是否弹出重新选择规格

    is_null:false,//购物车是否为空
    is_checked_all:0,//是否全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.get_shopcart_info();
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
  //编辑和完成的切换
  tab_edi:function(){
    var that = this;
    this.setData({
      is_buy:!that.data.is_buy
    })
  },
  //点击遮罩层
  //隐藏弹出层--点击遮罩层事件mask_hide（函数名改变需改变公共模板common绑定的事件）
  mask_hide: function () {
    this.setData({
      'mask_data.mask_style': "opacity:0",//遮罩层
      "tip.style": "opacity:0;top:35%",//提示成过渡效果
      spec_style: "opacity:0;bottom:-850rpx;",//提示成过渡效果
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        is_show_mask: false,//遮罩层
        "tip.show":false,//提示层
        show_spec:false,
      });
    }, 500);
  },
  //点击删除--或者移至收藏夹弹出询问
  mask_show:function(event){
    var that = this;
    var btn_type = event.target.dataset.choseBtnType;//1移至收藏2删除
    if(btn_type==1){
      that.setData({
        "tip.txt": "确定将选中的商品移到收藏夹么？",
      })
    }
    if (btn_type == 2) {
      that.setData({
        "tip.txt": "确定将选中的商品从购物车删除么？",
      })
    }
    that.setData({
      is_show_mask:true,
      "tip.show":true,
    })
    setTimeout(function(){
      that.setData({
        'mask_data.mask_style': "opacity:1",//遮罩层过渡效果
        "tip.style":"opacity:1;top:25%;",//提示成过渡效果
      });
    },100)
  },
  //选择规格
  chose_spec:function(event){
    var that = this;
    console.log(event);
    var item = event.currentTarget.dataset.item;
    var index = event.currentTarget.dataset.indx;
    var t = event.currentTarget.dataset.type;
    console.log(that.data.shopcart_info,index,t);
    that.setData({
      has_spec_good_info:item,
      'updata_spec.index':index,
      'updata_spec.type':t
    })
    that.get_good_spec(item.good_id);//获取该商品的规格

    that.setData({
      show_spec: true,
      is_show_mask: true,
    });
    setTimeout(function () {
      that.setData({
        'mask_data.mask_style': "opacity:1",//遮罩层过渡效果
        spec_style: "opacity:1;bottom:0;",//提示成过渡效果
      });
    }, 100)
  },
  //获取购物车商品
  get_shopcart_info:function(){
    var that = this;
    wx.request({
      url: that.data.shopcart_url,
      data:{},
      success:function(res){
        console.log(res);
        that.setData({
          shopcart_info: res.data.Data
        });
        that.js_info();
        console.log(that.data.shopcart_info);
      },fail:function(err){
        app.load_fail("err:get-shopcart-info");
      }
    })
  },
  //获取商品的规格
  get_good_spec:function(good_id){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: that.data.good_spec_url,
      data:{
        good_id: good_id
      },
      success:function(res){
        console.log(res.data,"商品规格");
        wx.hideLoading()
        that.setData({
          spec_info:res.data.Data
        })
        console.log(that.data.has_spec_good_info.spec_ids)
        var spec_ids = that.data.has_spec_good_info.spec_ids.split(",");
        var item_spec = that.data.spec_info.spec_list;
        var list_spec = that.data.spec_info.spec_class_list;
        var price_spec = that.data.spec_info.good_spec_price_list;

        //循环判断当前选中的商品规格
        for (var i = 0; i < list_spec.length ; i++){
          for (var n = 0; n < item_spec.length ; n++){
            if (list_spec[i].spec_class_id == item_spec[n].spec_class_id){
                item_spec[n].is_check = 0;//新增字段   是否选中当前选中的商品规格 1是0否
                for(var j=0 ; j<spec_ids.length ; j++){
                  if(item_spec[n].spec_id==spec_ids[j]){
                    item_spec[n].is_check = 1;
                  }
                }
            }
          }
        }
        //获取库存
        for (var i = 0; i < price_spec.length ; i++){
          if (that.data.has_spec_good_info.spec_ids == price_spec[i].spec_ids){
            that.data.has_spec_good_info.stock = price_spec[i].stock;
          }
        }
        that.setData({
          'spec_info.spec_list': item_spec,
          'has_spec_good_info': that.data.has_spec_good_info
        });
        console.log(that.data.spec_info)
      },
      fail:function(err){
        app.load_fail("err:get-good-spec");
      }
    })
  },
  //数据解析
  js_info:function(){
    var that = this;
    var info = that.data.shopcart_info;
    if(info.length==0){//购物车商品为空
     that.setData({
       is_null:true
     })
      return false;
    }
    for (var i = 0; i < info.length ; i++){
      var st_sp_len = info[i].shopcart_item_list_1.length;//实体商品
      var xn_sp_len = info[i].shopcart_item_list_2.length;//虚拟商品
      info[i].has_st_sp = 0;//是否存在实体商品1是0否
      info[i].has_xn_sp = 0;//是否存在虚拟商品1是0否
      info[i].index = i+1;
      if (st_sp_len>0){
        info[i].has_st_sp = 1;
      }
      if (xn_sp_len>0){
        info[i].has_xn_sp = 1;
      }
      //判断当前列是否全选
      info[i].tal_st_checked = 0;
      info[i].tal_xn_checked = 0;
      var st_i = 0;
      var xn_i = 0;
      if (st_sp_len>0){
        for (var st = 0; st < info[i].shopcart_item_list_1.length; st++) {
          if (info[i].shopcart_item_list_1[st].is_select == 1) {
            st_i++;
          }
        }
      }
      if (xn_sp_len>0){
        for (var xn = 0; xn < info[i].shopcart_item_list_2.length; xn++) {
          if (info[i].shopcart_item_list_2[xn].is_select == 1) {
            xn_i++;
          }
        }
      }
      
      if (st_i == st_sp_len && st_i!=0){
        info[i].tal_st_checked = 1;
      }
      if (xn_i == xn_sp_len && xn_i!=0){
        info[i].tal_xn_checked = 1;
      }

    }
    that.setData({
      shopcart_info:info
    });
    //判断当前列是否全选--end
    that.is_checked_all();//是否全选
    that.get_price();//总价
  },
  //点击当前列全选
  click_list_title:function(event){
    var that = this;
    var indx = event.currentTarget.dataset.indx;
    var t = event.currentTarget.dataset.type;//type类型  1自营实体商品  2自营虚拟商品 3供应商
    var is_sed = event.currentTarget.dataset.select;//当前列是否已经全选
    var info = that.data.shopcart_info;

    if (is_sed==0){//当前列全选
      for (var i = 0; i < info.length; i++) {
        if (info[i].index == indx) {
          if (t == 1) {//实体
            info[i].tal_st_checked = 1;
            for (var n = 0; n < info[i].shopcart_item_list_1.length; n++) {
              info[i].shopcart_item_list_1[n].is_select = 1;
            }
          }
          if (t == 2) {//虚拟
            info[i].tal_xn_checked = 1;
            for (var n = 0; n < info[i].shopcart_item_list_2.length; n++) {
              info[i].shopcart_item_list_2[n].is_select = 1;
            }
          }
          if (t == 3) {//供应商
            info[i].tal_st_checked = 1;
            for (var n = 0; n < info[i].shopcart_item_list_1.length; n++) {
              info[i].shopcart_item_list_1[n].is_select = 1;
            }
          }
        }
      }
      that.setData({
        shopcart_info: info
      })
    }else{//当前列全部取消选择
      for (var i = 0; i < info.length; i++) {
        if (info[i].index == indx) {
          if (t == 1) {//实体
            info[i].tal_st_checked = 0;
            for (var n = 0; n < info[i].shopcart_item_list_1.length; n++) {
              info[i].shopcart_item_list_1[n].is_select = 0;
            }
          }
          if (t == 2) {//虚拟
            info[i].tal_xn_checked = 0;
            for (var n = 0; n < info[i].shopcart_item_list_2.length; n++) {
              info[i].shopcart_item_list_2[n].is_select = 0;
            }
          }
          if (t == 3) {//供应商
            info[i].tal_st_checked = 0;
            for (var n = 0; n < info[i].shopcart_item_list_1.length; n++) {
              info[i].shopcart_item_list_1[n].is_select = 0;
            }
          }
        }
      }
      that.setData({
        shopcart_info: info
      })
    }
    that.is_checked_all();//判断是否全选
    that.get_price();//计算价格
  },
  //选择单个选项
  click_item_checked:function(event){
     var that = this;
     var indx = event.currentTarget.dataset.indx;
     var t = event.currentTarget.dataset.type;//type类型  1自营实体商品  2自营虚拟商品 3供应商
     var is_sed = event.currentTarget.dataset.sed;//当前是否选中
     var id = event.currentTarget.dataset.id;//购物车id
     var info = that.data.shopcart_info;
     for(var i=0 ; i<info.length ; i++){
       if(info[i].index == indx){
         if (t == 1) {//实体商品
           for (var n = 0; n < info[i].shopcart_item_list_1.length; n++) {
             if (id == info[i].shopcart_item_list_1[n].shopcart_id) {
               if (is_sed == 0) {//未选中
                 info[i].shopcart_item_list_1[n].is_select = 1;
               } else {
                 info[i].shopcart_item_list_1[n].is_select = 0;
               }
             }
           }
         }
         if (t == 2) {//虚拟商品
           for (var n = 0; n < info[i].shopcart_item_list_2.length; n++) {
             if (id == info[i].shopcart_item_list_2[n].shopcart_id) {
               if (is_sed == 0) {//未选中
                 info[i].shopcart_item_list_2[n].is_select = 1;
               } else {
                 info[i].shopcart_item_list_2[n].is_select = 0;
               }
             }
           }
         }
          if(t==3){//供应商
            for (var n = 0; n < info[i].shopcart_item_list_1.length ; n++){
              if (id == info[i].shopcart_item_list_1[n].shopcart_id){
                if (is_sed==0){//未选中
                  info[i].shopcart_item_list_1[n].is_select=1;
                }else{
                  info[i].shopcart_item_list_1[n].is_select = 0;
                }
              }
            }
          }
       }
     }
     that.setData({
       shopcart_info:info
     });
     that.list_is_need_check(indx,t);//当前列是否需要全选
     that.is_checked_all();//判断是否全选
     that.get_price();//计算价格
  },
  //当前列是否需要全选--i某列--t类型
  list_is_need_check:function(i,t){
    var that = this;
    var info = that.data.shopcart_info;
    for(var m=0 ; m<info.length ; m++){
      if(i==info[m].index){
        if(t==1){//实体
          var is_all_c = 0;
          for (var l = 0; l < info[m].shopcart_item_list_1.length ; l++){
            if (info[m].shopcart_item_list_1[l].is_select==1){
              is_all_c++;
            }
          }
          if(is_all_c==info[m].shopcart_item_list_1.length){
            info[m].tal_st_checked = 1;
          }else{
            info[m].tal_st_checked = 0;
          }
        }
        if(t==2){//虚拟商品
          var is_all_c = 0;
          for (var l = 0; l < info[m].shopcart_item_list_2.length; l++) {
            if (info[m].shopcart_item_list_2[l].is_select == 1) {
              is_all_c++;
            }
          }
          if (is_all_c == info[m].shopcart_item_list_2.length) {
            info[m].tal_xn_checked = 1;
          } else {
            info[m].tal_xn_checked = 0;
          }
        }
        if (t == 3) {//供应商
          var is_all_c = 0;
          for (var l = 0; l < info[m].shopcart_item_list_1.length; l++) {
            if (info[m].shopcart_item_list_1[l].is_select == 1) {
              is_all_c++;
            }
          }
          if (is_all_c == info[m].shopcart_item_list_1.length) {
            info[m].tal_st_checked = 1;
          } else {
            info[m].tal_st_checked = 0;
          }
        }
      }
    };
    that.setData({
      shopcart_info:info
    });
  },
  //全选--全不选
  checked_all:function(){
    var that = this;
    var info = that.data.shopcart_info;
    if (that.data.is_checked_all==0){
      for (var i = 0; i < info.length; i++) {
        info[i].tal_st_checked = 1;
        info[i].tal_xn_checked = 1;
        for (var j = 0; j < info[i].shopcart_item_list_1.length; j++) {
          info[i].shopcart_item_list_1[j].is_select = 1;
        }
        for (var j = 0; j < info[i].shopcart_item_list_2.length; j++) {
          info[i].shopcart_item_list_2[j].is_select = 1;
        }
      };
      that.setData({
        shopcart_info: info,
        is_checked_all:1
      })
    }else{
      for (var i = 0; i < info.length; i++) {
        info[i].tal_st_checked = 0;
        info[i].tal_xn_checked = 0;
        for (var j = 0; j < info[i].shopcart_item_list_1.length; j++) {
          info[i].shopcart_item_list_1[j].is_select = 0;
        }
        for (var j = 0; j < info[i].shopcart_item_list_2.length; j++) {
          info[i].shopcart_item_list_2[j].is_select = 0;
        }
      };
      that.setData({
        shopcart_info: info,
        is_checked_all: 0
      })
    }
    that.get_price();//计算价格
  },
  //是否已经全选
  is_checked_all:function(){
    var that = this;
    var info = that.data.shopcart_info;
    var len = 0;
    for(var i=0 ; i<info.length ; i++){
      var st_len = info[i].shopcart_item_list_1.length;
      if (st_len > 0 && info[i].tal_st_checked==1){
        len++;
      }
      var xn_len = info[i].shopcart_item_list_2.length;
      if (xn_len > 0 && info[i].tal_xn_checked == 1) {
        len++;
      }
    }
    if(len==info.length){//全选
        that.setData({
          is_checked_all:1
        })
    }else{//不全选
      that.setData({
        is_checked_all: 0
      })
    }
  },
  //当前选中的价格
  get_price:function(){
    var that = this;
    var info = that.data.shopcart_info;
    var price = 0;
    for(var i=0 ; i<info.length ; i++){
      var st_list = info[i].shopcart_item_list_1;
      var xn_list = info[i].shopcart_item_list_2;
      if(st_list.length>0){
        for(var j=0 ; j<st_list.length ; j++){
          var p = st_list[j].count*st_list[j].price;
          if (st_list[j].is_select==1){//是否选中
              price+=p
          }
        }
      }
      if(xn_list.length>0){
        for(var j=0 ; j<xn_list.length ; j++){
          var p=xn_list[j].count*xn_list[j].price;
          if (xn_list[j].is_select==1){
            price+=p
          }
        }
      }``
    };
    if(price.toString().split('.')[1]>99){
      price = price.toFixed(2);
    }
    that.setData({
      total_price: price
    })
  },
  //重新选择规格
  click_spec_list:function(event){
    var that = this;
    var index = event.currentTarget.dataset.indx;//当前列
    var specid = event.currentTarget.dataset.specId;//当前spec_id
    var p_id = event.currentTarget.dataset.pid;//当前规格的父类id
    console.log(that.data.has_spec_good_info,"111");
    var spec_list = that.data.spec_info.spec_class_list;
    var spec_item = that.data.spec_info.spec_list;
    var spec_price = that.data.spec_info.good_spec_price_list;//规格对应的价格可库存
    var spec_arr = [];//已经选中的规格id
    var spec_name = [];//已经选中的规格名称
    for(var i=0 ; i<spec_list.length ; i++){
      if(i==index){
        for(var n=0 ; n<spec_item.length ; n++){
          if (spec_item[n].spec_class_id == p_id){
            spec_item[n].is_check = 0;
            if (spec_item[n].spec_id == specid) {
              spec_item[n].is_check = 1;
            }
          }
        }
      }
    }
    //获取新的规格和规格id
    for (var i = 0; i < spec_list.length; i++) {
      for (var n = 0; n < spec_item.length; n++) {
        if (spec_list[i].spec_class_id == spec_item[n].spec_class_id){
          if (spec_item[n].is_check == 1) {
            spec_arr.push(spec_item[n].spec_id);
            spec_name.push(spec_item[n].spec_name);
          }
        }
      }
    }
    var spec_str = spec_arr.sort(that.sort_number()).join(",");
    var name = spec_name.join(",");
    //当前规格商品的价格和库存
    for (var i = 0; i < spec_price.length ; i++){
      if(spec_str==spec_price[i].spec_ids){
        that.data.has_spec_good_info.price = spec_price[i].price;
        that.data.has_spec_good_info.stock = spec_price[i].stock;
      }
    }
    that.setData({
      'spec_info.spec_list': spec_item,
      'has_spec_good_info': that.data.has_spec_good_info,
      'has_spec_good_info.spec_ids': spec_str,
      'has_spec_good_info.spec_name':name
    })

    console.log(that.data.has_spec_good_info);
  },
  sort_number:function(a,b){
    return a-b;
  },
  //弹出规格--数量增加
  tan_add_num:function(){
      var that = this;
      var num = that.data.has_spec_good_info.count;//获取当前的购买数量
      var stock = that.data.has_spec_good_info.stock;//当前规格的库存
      if(num<stock){
        that.data.has_spec_good_info.count++;
        that.setData({
          has_spec_good_info: that.data.has_spec_good_info
        })
      }
  },
  //弹出规格--数量减少
  tan_reduce_num:function(){
    var that = this;
    var num = that.data.has_spec_good_info.count;//获取当前的购买数量
    if(num>1){
      that.data.has_spec_good_info.count--;
      that.setData({
        has_spec_good_info: that.data.has_spec_good_info
      })
    }
  },
  //弹出规格--文本框blur事件
  tan_blur_num:function(event){
    var that = this;
    console.log(event);
    var num = event.detail.value;
    that.data.has_spec_good_info.count = num;
    that.setData({
      has_spec_good_info: that.data.has_spec_good_info
    })
  },
  //弹出规格--确定按钮
  click_confirm_change_spec:function(){
    var that = this;
    console.log(that.data.has_spec_good_info)
    var obj = {
      shopcart_id: that.data.has_spec_good_info.shopcart_id,//购物车id
      good_id: that.data.has_spec_good_info.good_id,//商品id
      spec_ids: that.data.has_spec_good_info.spec_ids,//规格的ids
      spec_name: that.data.has_spec_good_info.spec_name,//规格名称
      count: that.data.has_spec_good_info.count,//购买数量
      price: that.data.has_spec_good_info.price,//商品价格
    }
   

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: that.data.updata_shopcart_url,
      data:obj,
      success:function(res){
          console.log(res.data);
          if(res.data.Data.code==20004){//修改成功
            wx.hideLoading();
            that.mask_hide();
            var arr = that.data.shopcart_info;
            var list_arr = [];//
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].index == that.data.updata_spec.index) {
                if (that.data.updata_spec.type == 2) {
                  for (var n = 0; n < arr[i].shopcart_item_list_2.length; n++) {
                    //console.log(arr[i].shopcart_item_list_2[n].shopcart_id, "id", that.data.has_spec_good_info.shopcart_id)
                    if (arr[i].shopcart_item_list_2[n].shopcart_id == that.data.has_spec_good_info.shopcart_id) {
                      arr[i].shopcart_item_list_2[n] = that.data.has_spec_good_info;
                      //console.log(arr[i].shopcart_item_list_2[n], "list2")
                      break;
                    }
                  }
                }
              }
            }
            that.setData({
              shopcart_info: arr
            })
          }else{
            
          }
      },
      fail:function(err){
        app.load_fail("err:confirm_change_spec");
      }
    })
  },
  //增加购物车是数量
  add_shopcart_num:function(event){
    var that = this;
    var item = event.currentTarget.dataset.list;//当前的商品信息
    var indx = event.currentTarget.dataset.indx;//当前循环列
    var t = event.currentTarget.dataset.type;//当前循环 1实体商品2虚拟商品

    var arr = that.data.shopcart_info;//购物车商品信息
    var list_arr = [];//
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].index == indx) {
        if (t == 2) {
          for (var n = 0; n < arr[i].shopcart_item_list_2.length; n++) {
            console.log(arr[i].shopcart_item_list_2[n].shopcart_id, "id", item.shopcart_id)
            if (arr[i].shopcart_item_list_2[n].shopcart_id == item.shopcart_id) {
              //虚拟修改购物车数量
              item.count++;
              arr[i].shopcart_item_list_2[n] = item;
              console.log(arr[i].shopcart_item_list_2[n], "list2")
              break;
            }
          }
        }
      }
    }
    that.setData({
      shopcart_info: arr
    })

    var obj = {
      shopcart_id: item.shopcart_id,//购物车id
      good_id: item.good_id,//商品id
      spec_ids: item.spec_ids,//规格的ids
      spec_name: item.spec_name,//规格名称
      count: item.count,//购买数量
      price: item.price,//商品价格
    }
    console.log(event,obj);
  },
  //获取改变购物车数量的参数
  get_updated_shopcart_obj:function(){


  },
  //更新购物车商品数量
  updated_shopcart_number:function(obj){
    var that = this;
    wx.request({
      url: that.data.updata_shopcart_url,
      data:obj,
      success:function(res){
         console.log(res.data);
      },
      fail:function(err){
         app.fail_load("err:updated_shopcart_number");
      }
    })
  }

})