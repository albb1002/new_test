(function(){
	var f_w_height = window.width;
	//var c= browserRedirect() ;
	
	if(document.compatMode=="CSS1Compat"){
		f_w_height = document.documentElement.clientWidth;
		if(f_w_height>640){
			f_w_height=414
		}
		var font_size = f_w_height/22;
		document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+font_size+"px;");
	}else{
		f_w_height = document.body.clientWidth;
		if(f_w_height>640){
			f_w_height=414
		}
		var font_size = f_w_height/22;

		document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+font_size+"px;");
	}
    //29分钟刷新一次--秘钥30分钟过期1740000
	setTimeout(function () {
	    window.location.reload();
	}, 1740000)
    //返回页面不刷新的问题-针对重新选择地址
	//var is_reload = 0;//是否重新刷新1是0否
	//window.addEventListener("pageshow", function (e) {
	  //  if (e.persisted) {
	      //  is_reload = 1;
	       // window.location.reload();
	       // return false;
	   // }
	////})
	//if (is_reload == 0) {
	   // if (window.name != "abs") {
	        //window.name = "abs";
	       // is_reload = 1;
	       // console.log(window.name);
	       // location.reload();
	   // } else {
	       // window.name = "";
	       // console.log(window.name);
	   // }
	//}
	//if (is_reload == 1) {
	   // return false;
//	}
})()


function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
               return 1;//移动
            } else {
                return 0;
            }
        }