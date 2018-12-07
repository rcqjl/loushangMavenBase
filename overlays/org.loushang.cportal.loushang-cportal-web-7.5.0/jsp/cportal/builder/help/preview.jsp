<!DOCTYPE html>
<%@ page pageEncoding="UTF-8" language="java"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%
	String contextPath = request.getContextPath();
    String pageId=request.getParameter("pageId");
%>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='cportal/css/cportal.css'/>" />
	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='cportal/panel.js'/>"></script>
</head>

<body>
	<div id="htmlContainer" align="center" ></div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	//获取设计完的代码
	var content = window.opener.CPortal.getCode();
	//添加页面模板框架
	$("#htmlContainer").append(content);
	//填充框架内容
	$(".panel-body").each(function(i, div){
		
		var widgetId = $(div).attr("id");
		//加载微件内容
		loadWidget(widgetId)
	});
});
//加载微件
function loadWidget(widgetId){
	$.ajax({
		cache : false,
		async : false,
		url :"<%=contextPath%>/service/cportal/widgets/findByWidgetId",
		dataType : "json",
		data : "widgetId="+widgetId,
		type : "POST",
		success : function(widgetInfo){
			var widgetUrl=getWidgetUrl(widgetInfo);
			//去除模板中多余节点
			$("#" + widgetId).empty();
			//获取微件详细信息
			getWidgetInfo(widgetInfo,widgetUrl,widgetId)
		}	
	})
}
//组装微件url
function getWidgetUrl(widgetInfo){
	var url;
	var preUrl=widgetInfo.widgetUrl.substr(0,1).toLowerCase();
	
	if(preUrl=="/"){
		url="<%=contextPath%>/"+widgetInfo.widgetUrl;
	}else{
		url="http://"+widgetInfo.widgetUrl
	}
	return url;
}
//获取微件详细信息
function getWidgetInfo(widgetInfo,widgetUrl,widgetId){
	
	if(widgetInfo.loadType==0){
		 $.ajax({
			    cache: false,
				url: widgetUrl,
				async : false,
				success : function(widgetData){
					$("#" + widgetId).append(widgetData);
				}
		});
	 }else{
		var iframe='<iframe src ="'+widgetUrl+
		'"frameBorder="0" scrolling="no" style="height:100%;width:100%;">'+
					'</iframe>';
		 $("#" + widgetId).append(iframe);
	 }
}
</script>
</html>