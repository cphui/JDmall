$(function(){
	var qrcodeTimer = null;
	//扫码登录按钮点击效果
	$(".login-way").find("a").eq(0).on("click",function(){
		clearTimeout(qrcodeTimer);
		$(".login-qrcode").css("display","block");
		$(".login-account").css("display","none");
		qrcodeAnimate()
	})
	qrcodeAnimate();
	function qrcodeAnimate(){
		$(".qrcode-box").find("img").animate({
			"left" : "0"
		},350,function(){
			$(".qrcode-help").css("display","block");
		})
		qrcodeTimer = setTimeout(function(){
			$(".qrcode-help").css("display","none");
			$(".qrcode-box").find("img").animate({
				"left" : "64px"
			},350)
		},4000)
	}
	//账号登录按钮点击效果
	$(".login-way").find("a").eq(1).on("click",function(){
		$(".login-qrcode").css("display","none");
		$(".login-account").css("display","block");
		$(".qrcode-help").css("display","none");
		$(".qrcode-box").find("img").animate({
			"left" : "64px"
		},350)
	})
	//扫码登录二维码移入移出效果
	$(".qrcode-box").hover(function(){
		clearTimeout(qrcodeTimer);
		$(this).find("img").stop().animate({
			"left" : "0"
		},350,function(){
			$(".qrcode-help").css("display","block");
		})
	},function(){
		$(".qrcode-help").css("display","none");
		$(this).find("img").stop().animate({
			"left" : "64px"
		},350)
	})
	
	
	
	
	
	
});