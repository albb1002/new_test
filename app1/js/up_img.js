
//上传图片部分----（上传视频在底部）
var img_base64=[];//图片上传的base64数组--最多四张
var d_index = "";//当值不为空或者不为null表示修改图片

//check_reader();//验证当前浏览器是否支持上传图片
//点击上传图片
function up_img(e){
	try{
		d_index = e.getAttribute("data-index");
	}catch(e){}
	document.getElementById("fi").click();
}
//获取图片
function getImg(val,id){
	var _file = val[0]
	var kb_size = 3*1024;//设置图片最大值 kb
	var img_type = _file.type;//获取文件类型
	var img_size = _file.size;//获取文件大小
	var _size = 1024*kb_size;//设置图片上传的最大尺寸
	
	//判断文件类型
	if(img_type!="image/png"&&img_type!="image/jpg"&&img_type!="image/jpeg"){
		alert("请上传.png/.jpg/.jpeg/格式的图片");
		return false;
	}
	//判断文件大小
	if(img_size>_size){
		alert("图片不得大于3M");
		return false;
	}
	var loader = new FileReader();
	loader.readAsDataURL(_file);  
	//读取文件成功
	loader.onload = function(e){
		var url = e.target.result;//得到二进制
		//修改图片--修改数组的url值
		console.log("index",d_index,img_base64.length)
		if(d_index!=null&&d_index!=""){
			var tz_img_list = document.getElementsByClassName("tz-img-list");
			for(var i=0 ; i<img_base64.length ; i++){
				if(d_index==img_base64[i].data_index){
					tz_img_list[i].getElementsByTagName("img")[0].setAttribute("src",url);
				}
			}
		}else{
			//添加图片
			var obj = {
				url:url,
				data_index:new Date().getTime()
			}
			img_base64.unshift(obj);
			//添加节点
			add_dom(obj);
		}
	}
	//上传中
	loader.onprogress = function(){
	}
	//上传错误
	loader.onerror = function(){
//				alert("上传失败");
	}
	//上传中断
	loader.onabort = function(){
//				alert("上传被中断");
	}	
}
//添加节点
function add_dom(obj){
	//图片限制张数
//	var arr_len = img_base64.length;
//	if(arr_len==4){
//		document.getElementById("add_img_icon").setAttribute("style","display: none;");
//	}
	var upimg_wrap = document.getElementById("upimg_wrap");
	var div = document.createElement("div");
	div.setAttribute("class","relative tz-img-list");
	div.setAttribute("data-index",obj.data_index);
	div.setAttribute("onclick","up_img(this)");
	div.innerHTML="<img src='"+obj.url+"'/><div class='del-img' onclick='del_img(event,this)'></div>";
	
	upimg_wrap.insertBefore(div,upimg_wrap.childNodes[0]);
}
//刪除图片节点
function del_img(e,dom){
	e.preventDefault();
	 var evt = e ? e : window.event; 
         if (evt.stopPropagation) {        //W3C 
            evt.stopPropagation(); 
         }else {       //IE      
            evt.cancelBubble = true; 
         }  
	var p_dom = dom.parentNode;
	var d_index=p_dom.getAttribute("data-index");
	var upimg_wrap = document.getElementById("upimg_wrap");
	upimg_wrap.removeChild(p_dom);//删除节点
	
	//删除数组
	var arr = [];
	for(var i=0 ; i<img_base64.length ; i++){
		if(img_base64[i].data_index!=d_index){
			arr.push(img_base64[i]);
		}
	}
	img_base64 = arr;
	//图片限制张数--隐藏长传的图标
//	if(img_base64.length<4){
//		document.getElementById("add_img_icon").setAttribute("style","display: block;");
//	}
}
function check_reader(){
	//判断浏览器是否支持FileReader接口  
	if(typeof FileReader == 'undefined'){  
	    alert("您的浏览器不支持上传图片");
		}  
  
}
//以下为上传视频----------------------------------
var xhr;//异步请求对象
var ot; //时间
var oloaded;//大小
//上传文件方法
function UpladFile() {
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    if(fileObj.name){
        $(".el-upload-list").css("display","block");
        $(".el-upload-list li").css("border","1px solid #20a0ff");
        $("#videoName").text(fileObj.name);
    }else{
        alert("请选择文件");
    }
}
/*点击取消*/
function del(){
    $("#file").val('');
    $(".el-upload-list").css("display","none");
}
/*点击提交*/
function sub(){
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    if(fileObj==undefined||fileObj==""){
        alert("请选择文件");
        return false;
    };
    var title = $.trim($("#title").val());
    if(title==''){
        alert("请填写视频标题");
        return false;
    }
    var url = "{php echo webUrl('goods/iframe.upload')}"; // 接收上传文件的后台地址 
    var form = new FormData(); // FormData 对象
    form.append("mf", fileObj); // 文件对象 
    form.append("title", title); // 标题
    xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
    xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
    xhr.onload = uploadComplete; //请求完成
    xhr.onerror = uploadFailed; //请求失败
    xhr.upload.onprogress = progressFunction; //【上传进度调用方法实现】
    xhr.upload.onloadstart = function() { //上传开始执行方法
        ot = new Date().getTime(); //设置上传开始时间
        oloaded = 0; //设置上传开始时，以上传的文件大小为0
    };
    xhr.send(form); //开始上传，发送form数据
}

//上传进度实现方法，上传过程中会频繁调用该方法
function progressFunction(evt) { 
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    if(evt.lengthComputable) {
        $(".el-progress--line").css("display","block");
        /*进度条显示进度*/
        $(".el-progress-bar__inner").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
        $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100)+"%");   
    }

    var time = document.getElementById("time");
    var nt = new Date().getTime(); //获取当前时间
    var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
    ot = new Date().getTime(); //重新赋值时间，用于下次计算

    var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b 
    oloaded = evt.loaded; //重新赋值已上传文件大小，用以下次计算

    //上传速度计算
    var speed = perload / pertime; //单位b/s
    var bspeed = speed;
    var units = 'b/s'; //单位名称
    if(speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'k/s';
    }
    if(speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'M/s';
    }
    speed = speed.toFixed(1);
    //剩余时间
    var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
    time.innerHTML = '上传速度：' + speed + units + ',剩余时间：' + resttime + 's';
    if(bspeed == 0)
        time.innerHTML = '上传已取消';
}
//上传成功响应
function uploadComplete(evt) {
    //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
    if(evt.target.responseText){
        var str = "../shiping/"+evt.target.responseText;
        alert("上传成功！");
        $(".preview").append("<video class='up_video' controls='' autoplay='' name='media'><source src="+str+" type='video/mp4'></video>");
    }else{
        alert("上传失败");
    }
}
//上传失败
function uploadFailed(evt) {
    alert("上传失败！");
}


