<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
String webPath = request.getContextPath();
StringBuffer sb = new StringBuffer();
sb.append(request.getScheme());
sb.append("://");
sb.append(request.getServerName());
sb.append(":");
sb.append(request.getServerPort());
sb.append(webPath);

String fullWebPath = sb.toString();
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<title><spring:message code="CForm.BPM.D210" text="设置分支条件" /></title>

<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/zTreeStyle/zTreeStyle.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/branch.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/condition/branch.js"></script>
<!-- 引入国际化文件 -->
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>


<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>

</head>
<body>
	<div id="mainArea" class="mainArea">
		<div id="mainDiv" class="mainDiv"></div>
		<div class="btnArea">
		<input id="confirm" class="confirm" type="button" value='<spring:message code="CForm.BPM.D185" text="确定" />'>
		<input id="cancel" class="cancel" type="button" value='<spring:message code="CForm.BPM.D186" text="取消" />'>
		</div>
	</div>
</body>
</html>