function sc_show(showName){
			if(typeof showName=="string"){
				
				var height = window.clientHeight;
				if(document.compatMode=="CSS1Compat"){
					height = document.documentElement.clientHeight;
				}
				if(document.compatMode=="BackCompat"){
					height = document.body.clientHeight;
				}
				
//				设置style
				
				var headEle = document.getElementsByTagName("head")[0]
				var div_style = document.createElement("style");
				div_style.setAttribute("data","div11");
				div_style.innerHTML=".show_div11{position:fixed;padding:10px 0;width:100px;left:50%;margin-left:-50px;background:rgba(0,0,0,0.5);color:#fff;text-align:center;z-index:9999999;border:1px solid rgb(193,193,193);-ms-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;"+
//				"transition:transform 2s;-webkit-transition:transform 2s;-ms-transition:transform 2s;-moz-transition:transform 2s}";
				"-o-animation:show 0.5s ease;-webkit-animation:show 0.5s ease;-moz-animation:show 0.5s ease;-ms-animation:show 0.5s ease;animation:show 0.5s ease;}"+
				"@keyframes show{from{transform:scale(0.5,0.5);-ms-scale(0.5,0.5);-moz-scale(0.5,0.5);-webkit-scale(0.5,0.5);-o-webkit-scale(0.5,0.5);}to{transform:scale(1,1);-ms-transform:scale(1,1);-moz-transform:scale(1,1);-webkit-transform:scale(1,1);-o-transform:scale(1,1)}};"+
				"@-webkit-keyframes show{from{transform:scale(0.5,0.5);-ms-scale(0.5,0.5);-moz-scale(0.5,0.5);-webkit-scale(0.5,0.5);-o-webkit-scale(0.5,0.5);}to{transform:scale(1,1);-ms-transform:scale(1,1);-moz-transform:scale(1,1);-webkit-transform:scale(1,1);-o-transform:scale(1,1)}};"+
				"@-moz-keyframes show{from{transform:scale(0.5,0.5);-ms-scale(0.5,0.5);-moz-scale(0.5,0.5);-webkit-scale(0.5,0.5);-o-webkit-scale(0.5,0.5);}to{transform:scale(1,1);-ms-transform:scale(1,1);-moz-transform:scale(1,1);-webkit-transform:scale(1,1);-o-transform:scale(1,1)}};"+
				"@-ms-keyframes show{from{transform:scale(0.5,0.5);-ms-scale(0.5,0.5);-moz-scale(0.5,0.5);-webkit-scale(0.5,0.5);-o-webkit-scale(0.5,0.5);}to{transform:scale(1,1);-ms-transform:scale(1,1);-moz-transform:scale(1,1);-webkit-transform:scale(1,1);-o-transform:scale(1,1)}};"+
				"@-o-keyframes show{from{transform:scale(0.5,0.5);-ms-scale(0.5,0.5);-moz-scale(0.5,0.5);-webkit-scale(0.5,0.5);-o-webkit-scale(0.5,0.5);}to{transform:scale(1,1);-ms-transform:scale(1,1);-moz-transform:scale(1,1);-webkit-transform:scale(1,1);-o-transform:scale(1,1)}};";
				
				headEle.insertBefore(div_style,headEle.childNodes[0]);
				
				
//				添加节点
				var bodyEle = document.getElementsByTagName("body")[0];
				var div = document.createElement("div");
				div.className="show_div11";
				div.innerHTML=showName;
				div.setAttribute("style","top:"+height*0.3+"px;")
				bodyEle.insertBefore(div,bodyEle.childNodes[0]);
				
				//动画结束后删除节点
				setTimeout(function(){
					var sty = document.getElementsByTagName("style");
					var showClass = document.getElementsByClassName("show_div11");
					showClass[0].parentNode.removeChild(showClass[0]);
					
					if(sty[0].getAttribute("data")=="div11"){
					sty[0].parentNode.removeChild(sty[0]);
						
					}

				},1000)
			}
		}