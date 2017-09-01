(function(){
	var f_w_height = window.width;
	//var c= browserRedirect() ;
	
	if(document.compatMode=="CSS1Compat"){
		f_w_height = document.documentElement.clientWidth;
		if(f_w_height>640){
			f_w_height=640
		}
		var font_size = f_w_height/22;
		document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+font_size+"px;");
	}else{
		f_w_height = document.body.clientWidth;
		if(f_w_height>640){
			f_w_height=640
		}
		var font_size = f_w_height/22;

		document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+font_size+"px;");

	}
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