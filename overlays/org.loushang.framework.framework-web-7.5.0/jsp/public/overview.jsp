<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
	<title>Loushang2016框架-介绍页</title>
	<!-- 需要引用的JS -->
    <script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='form.js'/>"></script>
    <script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	
    <!-- 需要引用的CSS -->
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />   
    <link rel="stylesheet" type="text/css" href="<l:asset path='platform/css/overview.css'/>"/> 

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
</head>
<body>
    <div class = "layout-top">
		<div class="navbar navbar-static-top">
		    <a class="navbar-brand"><span>|</span>Loushang2016框架</a>
		</div>
	</div>
	
	<div id="fullpage" >
		<div class="framework" >
			<div class="headline">
				<label class="title">Loushang2016<span class="span-font">框架</span></label>
				<label class="subtitle">Loushang2016框架是一种轻量级的Web应用程序框架，该框架充分吸收业界优秀开源框架（jQuery、Bootstrap、Spring、MyBatis 等），对基础功能进行模块化封装，以帮助开发者快速搭建结构清晰、稳定、易用的Web应用程序。</label>
			</div>
			<div>
				<img class="intro" src="<l:asset path='platform/img/01.png'/>">
			</div>
		</div>
		
		<div id="div_fun" class="section div_fun">
			<p class="headp">功能</p>
			<div class="div_pic">
				<div class="pull-left sub" id="sub1">
					<img class="sub_pic" src="<l:asset path='platform/img/06.png'/>">
					<div>
						<label class="midtitle">开放的架构模式</label>
						<%-- <label class="smalltitle">view + controller+dao</label> --%>
					</div>
				</div>				
				<div class="pull-left sub" id="sub2">
					<img class="sub_pic" src="<l:asset path='platform/img/07.png'/>">
					<div>
						<label class="midtitle">灵活的界面组装方式</label>
						<%-- <label class="smalltitle">iframe + sitemesh</label> --%>
					</div>
				</div>				
				<div class="pull-left sub" id="sub3">
					<img class="sub_pic" src="<l:asset path='platform/img/08.png'/>">
					<div>
						<label class="midtitle">多样的数据可视化组件</label>
						<%-- <label class="smalltitle">这里可以有一个简单介绍</label> --%>
					</div>
				</div>				
				<div class="pull-left sub" id="sub4">
					<img class="sub_pic" src="<l:asset path='platform/img/09.png'/>">
					<div>
						<label class="midtitle">丰富的互联网风格组件</label>
						<%-- <label class="smalltitle">这里可以有一个简单介绍</label> --%>
					</div>
				</div>
				<div class="pull-left sub" id="sub5">
					<img class="sub_pic" src="<l:asset path='platform/img/10.png'/>">
					<div>
						<label class="midtitle">更多新特性</label>
						<%-- <label class="smalltitle">这里可以有一个简单介绍</label> --%>
					</div>
				</div>				
			</div>
		</div>
		
		<div class="section " id="block1">
			<div class="headline pull-left">
				<label class="title">开放的<span class="span-font">架构模式</span></label>
				<label class="subtitle">互联网环境下，越来越多的软件走向开源化。Loushang2016框架作为一个基础的开发框架，既有自己优秀的产品沉淀，又能兼容优秀的开源框架，支持各种主流软件实现无缝对接。</label>
			</div>
			<div >
				<img class="intro pull-right" src="<l:asset path='platform/img/02.png'/>">
			</div>
		</div>
		<div class="section " id="block2">
			<div >
				<img class="intro pull-left" src="<l:asset path='platform/img/03.png'/>">
			</div>
			<div class="headline pull-right">
				<label class="title">灵活的<span class="span-font">界面组装方式</span></label>
				<label class="subtitle">随着互联网应用和移动应用的增加，框架提供两种风格的页面布局方式： 企业级应用风格和互联网应用风格，开发者可以根据项目需求自行选择。</label>
			</div>
		
		</div>
		<div class="section " id="block3">
			<div class="headline pull-left">
				<label class="title">多样的<span class="span-font">数据可视化组件</span></label>
				<label class="subtitle">随着云和大数据时代的来临，各种数据的增加，数据可视化也成为当前一个热门话题。框架提供了各种可视化组件，使大量繁杂的数据以图形化的形式清晰直观地展现在用户面前。</label>
			</div>
			<div >
				<img class="intro pull-right" src="<l:asset path='platform/img/04.png'/>">
			</div>
		</div>
		<div class="section " id="block4">
			<div class="headline pull-right" >
				<label class="title">丰富的<span class="span-font">互联网风格组件</span></label>
				<label class="subtitle">为了便于开发者使用，提高开发效率，框架提供了一套互联网风格的WEB组件库，包含布局、导航、表单、图表和日期等基础组件，登录、主页等典型场景页面。</label>
			</div>
			<div>
				<img class="intro pull-left" src="<l:asset path='platform/img/05.png'/>">
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	$(".sub").click(function(){
		//fun_goto();
		var id = $(this).attr("id");
		id = id.substring(id.length-1,id.length);
		for(var i = 1; i<6; i++){
			if (i == id)
				fun_goto(id);
		}
	});
});
function fun_goto(num){
	location.href="#block"+num;
}
</script>
</html>