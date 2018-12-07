<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<html>
<head>
<META content="text/html; charset=UTF-8" http-equiv=Content-Type>
<next:ScriptManager></next:ScriptManager>
<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/skin/css/jquery.mobiscroll.css">
<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/skin/css/mcform.css">

<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
<l:script path="i18n.js"/>
<script src="<l:assetcontext/>/jsp/cform/skin/js/mcform.js"></script>
<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.mobiscroll.js"></script>
</head>
<body class="cfBody">
	<!-- 表单内容(html) -->
</body>
<script type="text/javascript">
$(function(){
	var selectedThemeCss = window.opener.CForm.selectedThemeCss;
	//业务自定义主题
	if(selectedThemeCss){
		$("head").append(selectedThemeCss);
	}
	var parentHtml = window.opener.CForm.getCode();
	var $html = $(parentHtml).appendTo("body");
	// 重新引入css
	window.opener.CForm.importLink();
	//取消按钮绑定的鼠标事件
	var inputs = $html.find(":input");
	if(inputs) {
		$.each(inputs,function(i,inp){
			$(inp).removeAttr("onclick");
			$(inp).removeAttr("ondblclick");
		});
	}

	//加载云表单初始化操作
	CForm.init();
});
</script>
</html>