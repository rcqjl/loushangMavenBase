<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ page import="org.loushang.cform.util.BspUtil"%>
<%
	String contextPath = request.getContextPath();
	//获取bsp应用的上下文
	String bspAppName = BspUtil.getBspAppName();
	String bspAppPath;
	if(bspAppName == "."){ // 如果是集成部署，那么bsp的上下文就是当前应用的上下文
		bspAppPath = contextPath;
	}else if (80 == request.getServerPort()) {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName()
			+ bspAppName + "/";
	} else {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+bspAppName + "/";
	}
%>
<html>
<head>
<META content="text/html; charset=UTF-8" http-equiv=Content-Type>
<next:ScriptManager></next:ScriptManager>
<link rel="stylesheet" href="<%=contextPath%>/jsp/cform/skin/css/cform.css">

<script src="<%=contextPath%>/jsp/cform/skin/js/jquery.js"></script>
<script src="<%=contextPath%>/jsp/cform/skin/js/cform.js"></script>
<script src="<%=contextPath%>/jsp/cform/skin/js/cforml5.js"></script>
<script src="<%=contextPath%>/jsp/cform/skin/js/autosize.js"></script>
</head>
<body class="cfBody">
	<!-- 表单内容(html) -->
</body>
<script type="text/javascript">
var bspAppPath = "<%=bspAppPath%>";
$(function(){
	var selectedThemeCss = window.opener.CForm.selectedThemeCss;
	// 业务自定义主题
	if(selectedThemeCss != null && selectedThemeCss != 'undefined'){
		$("head").append(selectedThemeCss);
	}
	// 将表单html添加到body中
	var parentHtml = window.opener.CForm.getCode();
	// 重新引入css
	window.opener.CForm.importLink();
	// 表单html
	$html = $(parentHtml).appendTo("body");
	
	// 判断是否为表单组
	$(parentHtml).find("div[cf_formTemplate = '1']").each(function(){
		// 表单组，获取子表单添加到父类html中
		var childFormId = $(this).attr("cf_templateid");
		if(childFormId != null && childFormId != 'undefined'){
			// 获取子表单html片段
			$.ajax({
				url: "<%=request.getContextPath()%>/command/dispatcher/"
					+ "org.loushang.cform.form.cmd.FormDispatcherCmd/"
					+ "getFormContent",
				data: "formId=" + childFormId,
				async: false,
				success: function(msg){
					var html = msg.substring(msg.toLowerCase().indexOf("<form"),msg.toLowerCase().indexOf("</form>")) + "</form>";
					var $parentDiv = $("body").find("div[cf_templateId = '"+childFormId+"']");
					// 防止由于相同子表单Id形成的多次拼接
					$parentDiv.each(function(){
						$parentDiv = $(this);
					});
					// 将子表单html拼接到父表单中
					$(html).appendTo($parentDiv);
				},
				error: function(e){
					alert(e);
				}
			});
			
			// 删除子表单标题
			$("body").find("div[cf_formTemplate = '1']").each(function(){
				$(this).find("div[class=cfTitle]").empty();
				$(this).find("div[cf_widgetId=cf_gform]").empty();
			});
		}
		
	});
	
	// var $html = $(fromParent.htmlCode).appendTo("body");
	// 取消按钮绑定的鼠标事件
	var inputs = $html.find(":input");
	if(inputs) {
		$.each(inputs,function(i,inp){
			$(inp).removeAttr("onclick");
			$(inp).removeAttr("ondblclick");
		});
	}

	// 加载云表单初始化操作
	CForm.init();
});
</script>
</html>