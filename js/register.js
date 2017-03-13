$(function(){
	$(".form-item span").on("click",function(){
		$(this).next().focus();
	});
	$(".form-item input").on("focus",function(){
		$(this).prev().css("display","none");
		$(this).parent().next().find("i").css("display","block");
		$(this).parent().next().find("span").css("display","block");
	});
	
	$(".form-item input").on("blur",function(){
		if ($(this).val() == "") {
			$(this).prev().css("display","inline-block");
			$(this).parent().next().find("i").css("display","none");
			$(this).parent().next().find("span").css("display","none");
		}
	});
	
	//用户名验证
	$("#username").on("input",function(){
		var reg = /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/;
		if ($(this).val() && !reg.test($(this).val())) {
			$(this).parent().find("i").css("display","none");
			$(this).parent().addClass("error");
			$(this).parent().next().find("i").removeClass();
			$(this).parent().next().find("i").addClass("i-error");
			$(this).parent().next().find("span").addClass("error");
			$(this).parent().next().find("span").html("格式错误，仅支持汉字、字母、数字、“-”“_”的组合");
		} else{
			$(this).parent().find("i").css("display","none");
			$(this).parent().removeClass("error");
			$(this).parent().next().find("i").removeClass();
			$(this).parent().next().find("i").addClass("i-def");
			$(this).parent().next().find("span").removeClass("error");
			$(this).parent().next().find("span").html('支持中文、字母、数字、"-" "_"的组合，4-20个字符');
		}
	});
	$("#username").on("blur",function(){
		var numReg = /^[0-9]{4,20}$/
		if (numReg.test($(this).val())) {
			$(this).parent().find("i").css("display","none");
			$(this).parent().addClass("error");
			$(this).parent().next().find("i").removeClass();
			$(this).parent().next().find("i").addClass("i-error");
			$(this).parent().next().find("span").addClass("error");
			$(this).parent().next().find("span").html("用户名不能是纯数字，请重新输入！");
		} else if (($(this).val().length<4 || $(this).val().length>20) && $(this).val() != "") {
			$(this).parent().find("i").css("display","none");
			$(this).parent().addClass("error");
			$(this).parent().next().find("i").removeClass();
			$(this).parent().next().find("i").addClass("i-error");
			$(this).parent().next().find("span").addClass("error");
			$(this).parent().next().find("span").html("长度只能在4-20个字符之间");
		} else if ($(this).val() != "") {
			$(this).parent().next().find("i").css("display","none");
			$(this).parent().next().find("span").css("display","none");
			$(this).parent().find("i").css("display","block");
		}
	});
	
	//密码验证
//	$("#password").on("input",function(){
//		
//		
//	});
	
});
