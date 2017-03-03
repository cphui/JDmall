$(function(){
	//当前屏幕是否在移动
	var isScroll = false;
	
	//设置左侧固定定位导航栏top
	$("#jd-navbar").css("top",($(window).height() - $("#jd-navbar").height())/2 + "px");
	
	//设置左侧固定定位导航栏left
	//宽度临界点
	var widthCriticalPoint = $("#jd-navbar").width() + 50;
	if (($(window).width()-1190)/2 > widthCriticalPoint) {
		$("#jd-navbar").css("left",($(window).width() - 1190)/2 - widthCriticalPoint + 10 + "px");
	} else{
		$("#jd-navbar").css("left",10 + "px");
	}
	
	//当浏览器窗口大小改变时执行方法
	$(window).resize(function(){
		//设置左侧固定定位导航栏top
		$("#jd-navbar").css("top",($(window).height() - $("#jd-navbar").height())/2 + "px");
		
		//设置左侧固定定位导航栏left
		//宽度临界点
		var widthCriticalPoint = $("#jd-navbar").width() + 50;
		if (($(window).width()-1190)/2 > widthCriticalPoint) {
			$("#jd-navbar").css("left",($(window).width() - 1190)/2 - widthCriticalPoint + 10 + "px");
		} else{
			$("#jd-navbar").css("left",10 + "px");
		}
	});
	
	//当浏览器滚动条滑动时执行方法
	$(window).scroll(function(){
		//显示or隐藏顶部固定定位搜索栏
		//京东秒杀区域顶部坐标
		var seckillOffsetTop = $("#j-seckill").offset().top;
		if ($(window).scrollTop() > seckillOffsetTop) {
			$("#jd-search").stop().animate({top:"0"},300);
		} else{
			$("#jd-search").stop().css("top",-50 + "px");
		}
		
		//显示or隐藏左侧固定定位导航栏
		//领券中心区域顶部坐标
		var couponOffsetTop = $("#coupon").offset().top;
		if ($(window).scrollTop() > couponOffsetTop) {
			$("#jd-navbar").fadeIn(400);
		} else{
			$("#jd-navbar").fadeOut(400);
		}
		
		//当用户滚动时，停止回到顶部
		if(!isTop){
			clearInterval(toTopTimer);
		}
		isTop = false;
		
		//当用户滚动时，左侧固定定位导航栏选中状态设置
		var items = $("#nav-item").find(".nav-item");
		var navbar = $("#jd-navbar");
		//滚动条现在所在位置的item id
		var navSelectId = "";
		items.each(function(){
			var m = $(this);
	        //注意：m.offset().top代表每一个item的顶部位置
	        if ($(document).scrollTop() > m.offset().top - 450) {
	            navSelectId = "#" + m.attr("id");
	        } else {
	            return false;
	        }
		});
		var selectLink = navbar.find(".navbar-item-on");
        if (navSelectId && selectLink.attr("id") != navSelectId) {
        		if (!isScroll) {
        			selectLink.removeClass("navbar-item-on");
           	 	navbar.find("[id=" + navSelectId + "]").addClass("navbar-item-on");
        		}
        }
		
	});
	
	//左侧固定定位导航栏点击效果
	$("#jd-navbar .navbar-item").click(function(){
		isScroll = true;
		$("#jd-navbar .navbar-item").removeClass("navbar-item-on");
		$(this).addClass("navbar-item-on");
		$("body").animate({
			scrollTop : $("#nav-item .nav-item").eq($(this).index()).offset().top - 48
		},500,function(){
			isScroll = false;
		})
		$("html").animate({
			scrollTop : $("#nav-item .nav-item").eq($(this).index()).offset().top - 48
		},500,function(){
			isScroll = false;
		})
	});
	
	//左侧固定定位导航栏返回页面顶部按钮
	var	toTopTimer = null;
	var isTop = true;
	$("#return-top").click(function(){
		//设置定时器
		toTopTimer = setInterval(function(){
			//获取滚动条距离顶部的高度
//			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var osTop = $(document).scrollTop();
			//设置返回顶部的速度
			var ispeen = Math.floor(-osTop / 5);
//			document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeen;
			$(document).scrollTop(osTop + ispeen);
			isTop = true;
			if(osTop == 0){
				clearInterval(toTopTimer);
			}
		},30)
	});
	
	//搜索区域-促销、广告选项卡
	$('#info-notice .notice-title li').click(function(){
		$('#info-notice .notice-content .item').css('display','none');
		$('#info-notice .notice-content .item').eq($(this).index()).css('display','block');
		if ($(this).index() === 0) {
			$('#info-notice .title-active').css('left',-2);
		} else {
			$('#info-notice .title-active').css('left',$(this).index()*48);
		}
	});
	
	//排行榜选项卡
	$('#hot-rank-content .rank-title a').mouseover(function(){
		$('#hot-rank-content .rank-content').css('display','none');
		$('#hot-rank-content .rank-content').eq($(this).index()).css('display','block');
		$('#hot-rank-content .rank-title .title-active').css('left',$(this).index()*77);
	});
	
	//banner轮播效果(淡入淡出)
	var bannerLi = $(".banner li");		//获取所有的图片列表集合	
	var bannerIndicator = $(".banner .banner-indicator-btn");	//获取分页集合
	var iSize = bannerLi.size();
	var bannerIndex = 0;
	var bannerTimer = null;
	//显示隐藏左右箭头
	$(".banner").hover(function(){
		$(".banner-control-prev").css("display","block");
		$(".banner-control-next").css("display","block");
	},function(){
		$(".banner-control-prev").css("display","none");
		$(".banner-control-next").css("display","none");
	})
	//淡入淡出执行函数
	function change(){
		bannerIndicator.removeClass('active');
		bannerIndicator.eq(bannerIndex).addClass('active');
		bannerLi.stop();
		//隐藏除了当前元素，所有图像
		bannerLi.eq(bannerIndex).siblings().animate({
			opacity:0
		},250)
		//显示当前图像
		bannerLi.eq(bannerIndex).animate({
			opacity:1
		},250)
	};
	//下一张图片切换
	function next(){
		clearInterval(bannerTimer);
		bannerIndex++;
		if(bannerIndex>iSize-1){
			bannerIndex=0;
		}
		change();
		bannerTimer = setInterval(next,3000);	
	};
	//上一张图片切换
	function previous(){
		clearInterval(bannerTimer);
		bannerIndex--;
		if(bannerIndex<0){
			bannerIndex=iSize-1;
		}
		change();
		bannerTimer = setInterval(next,3000);	
	}
	//左箭头按钮点击
	$('.banner-control-prev').click(function(){		
		previous();
	});
	$('.banner-control-prev').hover(function(){
		$(this).css("background-color","rgba(0,0,0,0.5)");
	},function(){
		$(this).css("background-color","rgba(0,0,0,0.1)");
	})
	//右箭头按钮点击
	$('.banner-control-next').click(function(){    
		next();
	});
	$('.banner-control-next').hover(function(){
		$(this).css("background-color","rgba(0,0,0,0.5)");
	},function(){
		$(this).css("background-color","rgba(0,0,0,0.1)");
	})
	//分页按钮移入切换
	bannerIndicator.mouseover(function(){
		bannerIndex = $(this).index();
		change();
	});
	
	//京东秒杀倒计时
	var endTime = new Date();
	endTime.setHours(endTime.getHours()+2);
	var hour = $(".cd-hour span");
	var minute = $(".cd-minute span");
	var second = $(".cd-second span");
	var seckillTimer = null;
	
	function toTwo(n){return n<10?'0'+n:''+n;}
	
	function countDown(){
		var nowTime = new Date();
		var timeDifference = parseInt((endTime.getTime() - nowTime.getTime())/1000);
		var h = parseInt((timeDifference/3600)%24);
        var m = parseInt((timeDifference/60)%60);
        var s = parseInt(timeDifference%60);
        hour.html(toTwo(h));
		minute.html(toTwo(m));
		second.html(toTwo(s));
		if (timeDifference<=0) {
			hour.html("00");
			minute.html("00");
			second.html("00");
			clearInterval(seckillTimer);
		}
	}
	countDown();
	seckillTimer = setInterval(countDown,1000);
	
	//模块底部广告切换
	$(".content-bottom ul").attr("logoIndex","1");	//为每一个ul列表添加标识
	$(".content-bottom").hover(function(){	//显示隐藏箭头
		$(this).find(".logo-btn-wrapper").css("display","block");
	},function(){
		$(this).find(".logo-btn-wrapper").css("display","none");
	})
	$(".logo-btn-prev").hover(function(){	//左箭头颜色改变
		$(this).css("color","red");
	},function(){
		$(this).css("color","gray");
	})
	$(".logo-btn-prev").on("click",function(){	//左箭头点击事件
		var thisUl = $(this).offsetParent().find("ul");
		var ulWidth = $(this).offsetParent().width();
		var logoIndex = thisUl.attr("logoIndex");
		logoIndex--;
		thisUl.attr("logoIndex",logoIndex);
		thisUl.css({
			"-webkit-transition" : "-webkit-transform .6s cubic-bezier(0,1.35,.83,.98)",
			"-moz-transition" : "-moz-transform .6s cubic-bezier(0,1.35,.83,.98)",
			"transition" : "-webkit-transform .6s cubic-bezier(0,1.35,.83,.98)"
		})
		thisUl.css("transform","translateX("+(-ulWidth*logoIndex)+"px)")
		setTimeout(function(){
			if (logoIndex == 0) {
				logoIndex = 2
				thisUl.attr("logoIndex",logoIndex);
				thisUl.css({
					"-webkit-transition" : "0s",
					"-moz-transition" : "0s",
					"transition" : "0s"
				})
				thisUl.css("transform","translateX("+(-ulWidth*logoIndex)+"px)")
			}
		},600);
	})
	$(".logo-btn-next").hover(function(){	//右箭头颜色改变
		$(this).css("color","red");
	},function(){
		$(this).css("color","gray");
	})
	$(".logo-btn-next").on("click",function(){	//右箭头点击事件
		var thisUl = $(this).offsetParent().find("ul");
		var ulWidth = $(this).offsetParent().width();
		var logoIndex = thisUl.attr("logoIndex");
		logoIndex++;
		thisUl.attr("logoIndex",logoIndex);
		thisUl.css({
			"-webkit-transition" : "-webkit-transform .6s cubic-bezier(0,1.35,.83,.98)",
			"-moz-transition" : "-moz-transform .6s cubic-bezier(0,1.35,.83,.98)",
			"transition" : "-webkit-transform .6s cubic-bezier(0,1.35,.83,.98)"
		})
		thisUl.css("transform","translateX("+(-ulWidth*logoIndex)+"px)")
		setTimeout(function(){
			if (logoIndex == 3) {
				logoIndex = 1
				thisUl.attr("logoIndex",logoIndex);
				thisUl.css({
					"-webkit-transition" : "0s",
					"-moz-transition" : "0s",
					"transition" : "0s"
				})
				thisUl.css("transform","translateX("+(-ulWidth*logoIndex)+"px)")
			}
		},600);
	})
	
	
	
	
	
	
});






















