

document.ready = function (callback) {
            ///兼容FF,Google
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    callback();
                }, false)
            }
             //兼容IE
            else if (document.attachEvent) {
                document.attachEvent('onreadystatechange', function () {
                      if (document.readyState == "complete") {
                                document.detachEvent("onreadystatechange", arguments.callee);
                                callback();
                       }
                })
            }
            else if (document.lastChild == document.body) {
                callback();
            }
        }


//获取屏幕的高度和宽度
function GetClient(){
	this.width = window.width;
	this.height = window.height;
	this.width = function(){
		if(document.compatMode=="CSS1Compat"){
			this.width = document.documentElement.clientWidth;
			return this.width;
		}else{
			this.width = document.body.clientWidth;
			return this.width
		}
	}
	this.height = function(){
		if(document.compatMode=="CSS1Compat"){
			this.height = document.documentElement.clientHeight;
			return this.height;
		}else{
			this.height = document.body.clientHeight;
			return this.height;
		}
	}
}


//遮罩层想显示
function mask_show(id,z_index){
	var height = new GetClient().height();
	var id = document.getElementById(id);
	id.setAttribute("style","height:"+height+"px;opacity:1;z-index:"+z_index+";");
	//document.getElementsByTagName("html")[0].setAttribute("class","mask-html");
}
//遮罩层隐藏
function mask_hide(id){
	var height = new GetClient().height();
	var id = document.getElementById(id);
	id.setAttribute("style","opacity: 0;");
	//document.getElementsByTagName("html")[0].setAttribute("class","");
}

//侧栏的滑出效果
function show_slide(arg){
	var el = arg.el;//当前节点
	var slideEl = arg.slideEl;//滑出的整体节点
	var mask = arg.mask;//遮罩层id
	var sty = arg.sty;//设置的style
	var ctr = 0;
	var cls = document.getElementById(slideEl);
	var aside_left_icon =arg.icon;
	if(typeof el == "string" && el){
		document.getElementById(el).onclick = function(){
			if(ctr==0){
				mask_show(arg.mask)
				cls.setAttribute("style",sty);
				document.getElementById(aside_left_icon).setAttribute("style","background-position: -6rem -4rem;")
				ctr=1
			}else{
				mask_hide(arg.mask);
				cls.setAttribute("style","");
				document.getElementById(aside_left_icon).setAttribute("style","background-position: -6rem -2rem;")
				ctr=0;
			}
			
		}
	}

//		document.getElementById(mask).onclick = function(){
//			mask_hide(arg.mask);
//			cls.setAttribute("style","")
//		}
}



//加减数量
function buy_number(args){
	var stock =document.getElementById(args.stock);//库存id
	var min = document.getElementById(args.minues);//购买数量减
	var add = document.getElementById(args.add);//购买数量加
	var textId =document.getElementById(args.textValue);//购买的数量
	var textValue =parseInt(textId.value);
	var mClass = min.getAttribute("class");
	var aClass = add.getAttribute("class");
	var reg = /^[+]{0,1}(\d+)$/ //正整数
	
	if(textValue>1){
		min.setAttribute("class",mClass+" active");
	}
	if(textValue<parseInt(stock.innerHTML)){
		add.setAttribute("class",aClass + " active");
	}
	min.onclick = function(){
		if(parseInt(textId.value)<=1){
			textId.value=1;
		}else{
			textId.value--;
			if(parseInt(textId.value)<=1){
				min.setAttribute("class",mClass);
			}
			if(parseInt(textId.value)<parseInt(stock.innerHTML)){
				add.setAttribute("class",aClass+" active");
			}
		}
	}
	
	add.onclick = function(){
		if(parseInt(textId.value)>=parseInt(stock.innerHTML)){
			textId.value=parseInt(stock.innerHTML);
		
		}else{
			textId.value++;
			if(parseInt(textId.value)>0){
				min.setAttribute("class",mClass+" active");
			}
			if(parseInt(textId.value)>=parseInt(stock.innerHTML)){
				add.setAttribute("class",aClass);
			}
			
		}
	}
	
	textId.onblur = function(){
		if(!reg.test(textId.value)){
			textId.value="0";
			min.setAttribute("class",mClass);
			add.setAttribute("class",aClass + " active");
			return false;
		}
		if(parseInt(textId.value)>=parseInt(stock.innerHTML)){
			textId.value=parseInt(stock.innerHTML);
			add.setAttribute("class",aClass);
			//_tip("最多可购买"+textId.value)
			return false
		}
		if(parseInt(textId.value)<=1){
			min.setAttribute("class",mClass);
			//_tip("最少购买1件")
			textId.value=1;
			return false
		}
		
	}	
}

//底部滑块slidedown
function goods_footer_slideDown(id){
	var idNode = document.getElementById(id);
	var nodeHeight = idNode.offsetHeight;
	var width =new GetClient().width()/22;
	idNode.setAttribute("style","bottom:-"+(nodeHeight+width)+"px;opacity:0")
}
//底部滑块slideUp
function goods_footer_slideUp(id,args){
	var idNode = document.getElementById(id);
	idNode.setAttribute("style","bottom:0px;opacity:1")
}

//购物车重新选择规格
function goods_f_up(id,args){
	var idNode = document.getElementById(id);
	idNode.setAttribute("style","bottom:0px;opacity:1")
	if(args.arr){
		var inn = "";
		//sel_cls 底部滑出后的ulclass
		//arr:sel_arr,//传入属性   数组---颜色--大小--
		//sel_cls:privite_select,//底部滑出后的ul列class
		//result:private_sel_res,//已选择的结果显示--已选--
		//str1:str,//更改后的值 数组
		//shock:"private-stock",//当前可购买的库存的class;
		//goodsValue:"goodsValue"//滑出后的库存textid
		if(typeof args.sel_cls == "object"){
			var arr = args.arr;
			args.str1.length=arr.length;
			for(var i=0 ; i<args.sel_cls.length ; i++){
				var sel_li = args.sel_cls[i].getElementsByTagName("li");
				var sel_li_shock = args.sel_cls[i].parentNode.getElementsByClassName(args.shock);
				for(var j=0 ; j<sel_li.length ; j++){
					if(args.arr[i]==sel_li[j].innerHTML){
						var get_cls = sel_li[i].getAttribute("class");
						for(var n=0 ; n<sel_li.length ; n++){
							sel_li[n].setAttribute("class","");
						}
						sel_li[j].setAttribute("class",get_cls+" active");
						//console.log(args.arr[i]+"---"+sel_li[j].innerHTML)
						args.str1[i]='"'+args.arr[i]+'"';
						if(args.str1.length>i+1){
							args.str1.pop();
						}
					}
				}
			}
		}
		//滑块库存---和---购买数量---
		document.getElementById(args.shock).innerHTML = args.count;
		document.getElementById(args.goodsValue).value = args.buy_count;
		
		args.result.innerHTML = args.str1;
	}
}


//我的收藏  改变图标
function collect_change(id,message,message1){
	var el = document.getElementById(id);
	var el_img = el.getElementsByClassName("foo-icon2")[0];
	
	var el_control = 1;
	el.onclick = function(){
		if(el_control==1){
			el_img.setAttribute("style","background-position: 0 -6rem;");	
			_tip(message);//提示收藏成功的信息
			el_control=0;
		}else{
			el_img.setAttribute("style","background-position: 0 -2rem;");	
			_tip(message1);
			el_control=1;
		}
	}
	
}


//提示信息
function _tip(txt){
			var sty = document.createElement("style");
			var hed = document.getElementsByTagName("head")[0];
			var body = document.getElementsByTagName("body")[0];
			var str = ""
			
			str+="#top_tan_1212{background:rgba(0,0,0,0.7);z-index:999999999;display:inline-block;color:white;font-size:0.9rem;position:fixed;bottom:5rem;left:0;padding:0.2rem 0.5rem;";
			str+="border-radius:0.2rem;-ms-border-radius:0.2rem;-webkit-border-radius:0.2rem;-moz-border-radius:0.2rem;-o-border-radius:0.2rem;";
			str+="		animation:tip 1.5s linear forward;";
			str+="		-webkit-animation:tip 1.5s linear forwards;";
			str+="		-moz-animation:tip 1.5s linear forwards;";
			str+="		-ms-animation:tip 1.5s linear forwards;";
			str+="		-o-animation:tip 1.5s linear forwards;";
			str+="	}";
			str+="@keyframes tip{0%{opacity:0;} 30%{opacity:1} 90%{opacity:1} 100%{opacity:0}}";
			str+="@-webkit-keyframes tip{0%{opacity:0;} 30%{opacity:1} 90%{opacity:1} 100%{opacity:0}}";
			str+="@-moz-keyframes tip{0%{opacity:0;} 30%{opacity:1} 90%{opacity:1} 100%{opacity:0}}";
			str+="@-ms-keyframes tip{0%{opacity:0;} 30%{opacity:1} 90%{opacity:1} 100%{opacity:0}}";
			str+="@-o-keyframes tip{0%{opacity:0;} 30%{opacity:1} 90%{opacity:1} 100%{opacity:0}}";
			sty.innerHTML = str;
			sty.setAttribute("data-tip","tip");
			
			var div = document.createElement("div");
			div.setAttribute("id","top_tan_1212");
			div.innerHTML = txt;
			hed.insertBefore(sty,hed.childNodes[0]);
			body.insertBefore(div,body.childNodes[0]);
			var top_el = document.getElementById("top_tan_1212");
			var top_el_with = top_el.clientWidth;
			top_el.setAttribute("style","left:50%;margin-left: -"+top_el_with/2+"px")
			
			
			setTimeout(function(){
				var data_sty = document.getElementsByTagName("style");
				for(var i=0 ; i<data_sty.length ; i++){
					var data_tip = data_sty[i].getAttribute("data-tip");
					if(data_tip){
						data_sty[i].parentNode.removeChild(data_sty[i]);
						break;
					}
				}
				body.removeChild(top_el);
			},1800)
}


//购物车列表中加减购物数量
function number_select(args){
	if(args.wrap_class){
		var cls = document.getElementsByClassName(args.wrap_class);
		
		for(var i=0 ; i<cls.length ; i++){
			//减----
			cls[i].getElementsByClassName(args.minues)[0].onclick = function(i){
				return function(){
					var textCls = cls[i].getElementsByClassName(args.textVal)[0];
					textCls.value--;
					var check = cls[i].parentNode.parentNode.getElementsByClassName("privite-checked")[0].getAttributeNode("checked");
					if(check){
						document.getElementById(args.total_id).innerHTML = getPrice("privite-checked","private-price","gz-value");//总价
					}
					
					if(parseInt(textCls.value)<1){
						_tip("购买数量不能小于1");
						textCls.value=1;
						document.getElementById(args.total_id).innerHTML = getPrice("privite-checked","private-price","gz-value");//总价
					
					}
				}
			}(i)
			//加++++
			cls[i].getElementsByClassName(args.add)[0].onclick = function(i){
				return function(){
					var textCls = cls[i].getElementsByClassName(args.textVal)[0];
					textCls.value++;
					var check = cls[i].parentNode.parentNode.getElementsByClassName("privite-checked")[0].getAttributeNode("checked");
					if(check){
						document.getElementById(args.total_id).innerHTML = getPrice("privite-checked","private-price","gz-value");//总价
					}
					var stk = cls[i].parentNode.getElementsByClassName(args.stock)[0].innerHTML;
					if(parseInt(textCls.value)>parseInt(stk)){
						_tip("购买数量不能超过"+stk)
						textCls.value=stk;
						document.getElementById(args.total_id).innerHTML = getPrice("privite-checked","private-price","gz-value");//总价
					}
					
				}
			}(i)
			
			//改变文本内容
			cls[i].getElementsByClassName(args.textVal)[0].onchange = function(i){
				return function(){
					var reg = /^[+]{0,1}(\d+)$/ //正整数
					var textCls = cls[i].getElementsByClassName(args.textVal)[0]
					var stk = cls[i].parentNode.getElementsByClassName(args.stock)[0].innerHTML;
					if(!reg.test(textCls.value)){
						_tip("请输入正确的数字");
						textCls.value=1;
						return false
					}
					if(parseInt(textCls.value)>parseInt(stk)){
						_tip("购买数量不能超过"+stk)
						textCls.value=stk;
						return false
					}
					if(parseInt(textCls.value)<1){
						_tip("购买数量不能小于1");
						textCls.value=1;
						return false;
					}
					var check = cls[i].parentNode.parentNode.getElementsByClassName("privite-checked")[0].getAttributeNode("checked");
					if(check){
						document.getElementById(args.total_id).innerHTML = getPrice("privite-checked","private-price","gz-value");//总价
					}
				}
			}(i)
			
		}
//		for---end
	}
}


//
function check_sel_total(id,type,cls,ctr){
	var type = type;
	var ctr = ctr;
	if(type=="id"){
		if(ctr==true){
			var id = document.getElementById(id);
			var id_class = id.getAttribute("class");
			var active_split =id_class.split(" active");
			var id_check = id.getAttributeNode("checked");
			if(id_check){
				id.removeAttributeNode(id_check);
				id.setAttribute("class",active_split[0]);
			}else{
				id.setAttribute("checked","checked");
				id.setAttribute("class",id_class+" "+cls);
			}
		}
		if(ctr==false){
			var id = document.getElementById(id);
			var id_class = id.getAttribute("class");
			var active_split =id_class.split(" active");
			var id_check = id.getAttributeNode("checked");
			if(id_check){
				id.removeAttributeNode(id_check);
				id.setAttribute("class",active_split[0]);	
			}
		}
		
	}
}

//全部选中（全部取消选中）
function check_sel_all(title,con,ctr){
	var t_cls = document.getElementsByClassName(title);
	var c_cls = document.getElementsByClassName(con);
	//console.log(t_cls)
	if(t_cls.length!=0&&c_cls.length!=0){
		
		var t_spl = t_cls[0].getAttribute("class").split(" active")[0];
		var c_spl = c_cls[0].getAttribute("class").split(" active")[0];
		if(ctr==false){
			for(var i=0 ; i<t_cls.length ; i++){
				var t_node = t_cls[i].getAttributeNode("checked");
				if(t_node){
					t_cls[i].removeAttributeNode(t_node);
					t_cls[i].setAttribute("class",t_spl);
				}
			}
			i=null;
			for(var i=0 ; i<c_cls.length ; i++){
				var c_node = c_cls[i].getAttributeNode("checked");
				if(c_node){
					c_cls[i].removeAttributeNode(c_node);
					c_cls[i].setAttribute("class",c_spl);
				}
			}
			i=null;
		}
		if(ctr==true){
			for(var i=0 ; i<t_cls.length ; i++){
				t_cls[i].setAttribute("checked","checked");
				t_cls[i].setAttribute("class",t_spl+" active");
			}
			i=null;
			for(var i=0 ; i<c_cls.length ; i++){
				c_cls[i].setAttribute("checked","checked");
				c_cls[i].setAttribute("class",c_spl+" active");
			}
			i=null;
		}
	}
	
	
}
//判断产品列表是否全部打钩
function _check(cls1,cls2,id){
	var t_cls = document.getElementsByClassName(cls1);
	var c_cls = document.getElementsByClassName(cls2);
	var n=0;
	for(var i=0 ; i<t_cls.length ; i++){
		var t_node = t_cls[i].getAttributeNode("checked");
		if(!t_node){
			n=1;
			break;
		}
	}
	i=null;
	for(var i=0 ; i<c_cls.length ; i++){
		var c_node = c_cls[i].getAttributeNode("checked");
		if(!c_node){
			n=1
			break;
		}
	}
	if(n==0){
		var id = document.getElementById(id);
		var id_cls = id.getAttribute("class").split(" active")[0];
		id.setAttribute("class",id_cls+" active");
		id.setAttribute("checked","checked");
	}
}


//获取总价
function getPrice(cls,cls1,num){
	var cls = document.getElementsByClassName(cls);
	var str = 0;
	for(var i=0 ; i<cls.length ; i++){
		var tis_node = cls[i].getAttributeNode("checked");
		if(tis_node){
			var count = parseInt(cls[i].parentNode.getElementsByClassName(num)[0].value);
			//console.log(count);
			var price_node =parseInt(cls[i].parentNode.getElementsByClassName(cls1)[0].innerHTML)*count;
			str+=price_node;
		}
		
	}
	var p = str.toFixed(2);
	return p;
}

//删除商品
function goods_edi_del(t_clss,n_clss){
	var t_cls = document.getElementsByClassName(t_clss);
	for(var i=0 ; i<t_cls.length ; i++){
		var t_node = t_cls[i].getAttributeNode("checked");
		if(t_node){
			
			var n_cls = t_cls[i].parentNode.parentNode.getElementsByClassName(n_clss);
			
			//列表中的class长度为1删除整块、、--隐藏
			if(n_cls.length==1){
				var pre = t_cls[i].parentNode.parentNode;
				pre.parentNode.removeChild(pre);
				
			}else{//列表class不为1时  判断当前块是否全选。没有的话删除选中的--有的话删除整块----
				var nnn = t_cls[i].parentNode.parentNode
				delete_all(n_cls,nnn,t_clss);
				goods_edi_del(t_clss,n_clss);//节点删除改变dom树，再次执行当前函数
			}
			
		}
	}
}
function delete_all(cls,tcl,t_clss){
	
	for(var o=0 ; o<cls.length ; o++){
		var nod = cls[o].getAttributeNode("checked");
		if(nod){
			var pre = cls[o].parentNode;
			
			pre.parentNode.removeChild(pre);
			if(cls.length==0){
				tcl.parentNode.removeChild(tcl);
			}else{
				var tcl_cls = tcl.getElementsByClassName(t_clss)[0];
				var tcl_cls_check = tcl_cls.getAttributeNode("checked");
				if(tcl_cls_check){
					var tcl_cls_cls = tcl_cls.getAttribute("class").split(" active")[0];
					tcl_cls.removeAttributeNode(tcl_cls_check);
					tcl_cls.setAttribute("class",tcl_cls_cls);
				}
			}
			delete_all(cls,tcl,t_clss);
		}
	}
}

function get_class_len(cls,sx){
	var clss = document.getElementsByClassName(cls);
	var len=0;
	if(sx){
		for(var i=0 ; i<clss.length ; i++){
			var n = clss[i].getAttributeNode(sx);
			if(n){
				len++;		
			}
		}
		return len;
	}else{
		return clss.length;
	}
	
}

function check_name(val){
	var check_name =  /(?:[\u4E00-\u9FFF]{1,8}·\u4E00-\u9FFF]{1,8})|(?:[\u4E00-\u9FFF]{2,5})/
	if(!check_name.test(val)){
		_tip("请输入正确的姓名")
		return false;
	}
}

function check_phone(val){
	var check_phone = /^1[34578]\d{9}$/;
	if(!check_phone.test(val)){
		_tip("请输入正确的手机号码");
		return false;
	}
}

function check_special(val){
	var re =/[`~!@#$%^&*_+<>{}\/'[\]]/im;
	if(re.test(val)){
		_tip("不能输入特殊字符");
		return false;
	}
}

function check_integer(val,null_mes,err_mes){
	var re = /^[1-9]\d*$/;
	if(val==undefined||val==""){
		_tip(null_mes);
		return false;
	}
	if(!re.test(val)){
		_tip(err_mes);
		return false;
	}
}



