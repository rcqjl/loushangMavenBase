<!DOCTYPE html>
<%@ page pageEncoding="UTF-8" language="java"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>楼上云应用支撑平台-门户</title>
	<style type="text/css">
	.body{
		padding-bottom: 45px;
	    position: absolute;
	    top: 0px;
	    bottom: 0px;
	    left: 0px;
	    right: 0px;
	}
	</style>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,cportal/css/cportal.css,cportal/css/jsPanel.css"></l:link>
	<l:script path="jquery.js,bootstrap.js,jquery-ui.js,form.js,arttemplate.js,cportal/cportal.js,cportal/jquery.jspanel.js,cportal/jquery.resizeEnd.js,cportal/jquery.livequery.js,cportal/newpanel.js,cportal/cportal.event.js"></l:script>
	</head>
<body class="body">
		<div id = "htmlTitle">
			<span id = "showImgNavigator" class="fa fa-th-large"></span>
		</div>
	<!-- 图片轮播导航 -->
	<div class="imgnavigator">
		<div id="myCarousel" class="carousel slide">
		  <ol class="carousel-indicators">
		  </ol>
		  <!-- Carousel items -->
		  <div class="carousel-inner">
		  </div>
		  <!-- Carousel nav -->
		  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
		  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
		</div>
	</div>
	<!-- 默认导航 -->
	<div class="defnavigator">
		<ul></ul>
	</div>
	<!-- 侧边栏 -->
	<div class="pageWidgetColumn">
		<div class="pageWidgetContainer">
		</div>	
	</div>
	<!-- 内容区 -->
	<div id = "htmlContainer"></div>
</body>

<!-- 微件panel模板 -->
<script id="widgetTpl" type="text/html">
    <div class="panel ue-panel cportal-widget isdraggable" data_widgetId="{{widgetId}}">
		<div class="panel-heading">
			<span class="widgetTitle">{{widgetTitle}}</span>
			<ul class="ue-panel-tools">
				<li><a><i class="fa fa-refresh" widget_id="{{widgetId}}"></i></a></li>
				<li><a><i class="fa fa-expand" widget_id="{{widgetId}}"></i></a>
				<input type="hidden" value="{{widgetUrl}}" name="widgetUrl">
				<input type="hidden" value="{{widgetExpUrl}}" name="widgetExpUrl">
				<input type="hidden" value="{{loadType}}" name="loadType">
				<input type="hidden" value="{{widgetType}}" name="widgetType">
				</li>
				<li><a><i class="fa fa-times"></i></a></li>
			</ul>
				<input type="hidden" value="{{icon}}" name="icon">
		</div>
		<div class="panel-body" id="{{widgetId}}" style="height:{{height}}">
		</div>
	</div>
</script>

<!-- 添加微件按钮模板 -->
<script id="widgetAddTpl" type="text/html">
    <div align="center"; class="addWidget" >
		<button  class="addWidgetBtn" type="button"><spring:message code="cportal.droppable" text="添加微件"/></button>
	</div>
</script>

<!-- 多页面切换模板 -->
<script id="pageTpl" type="text/html">
	<li id ={{pageId}}>	
		<a>{{pageName}}</a>
   	 	<input name="pageUrl" type="hidden" value="{{pageUrl}}">
   	 	<input name="pageId" type="hidden" value="{{pageId}}">
	</li>
</script>

<!-- 侧边栏微件容器模板 -->
<script id ="widgetDiv" type="text/html">
<li class="widgets">
	<span class="widgetType">{{widgetTypeName}}
    	<i class="fa fa-list-ul"></i>
    </span>
	<div class="isWidget">
		<ul id="{{widgetTypeId}}"></ul>
	</div>
</li>
</script>

<!-- 侧边栏微件模板 -->
<script id ="widgets" type="text/html">
<li class="widget" title="{{widgetDesc}}">
	<span style="background:url({{wLogoPath}}) no-repeat 50% 50%"></span>
    <i class="fa fa-check-square"></i>
	<input name="widgetId" type="hidden" value="{{widgetId}}">
	<input name="widgetHeight" type="hidden" value="{{widgetHeight}}">
	<input name="widgetName" type="hidden" value="{{widgetName}}">
	<input name="loadType" type="hidden" value="{{loadType}}">
	<input name="widgetUrl" type="hidden" value="{{widgetUrl}}">
	<input name="widgetExpUrl" type="hidden" value="{{widgetExpUrl}}">
	<label>{{widgetName}}</label>
</li>
</script>

<script type="text/javascript">
	var contextPath = '<%=request.getContextPath()%>';
</script>
</html>