<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
<title>设置参与者</title>

<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/wfdproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/participantForm.css">
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.extend.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.util.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/linkedList.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/task/participantForm.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>

<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>

</head>
<body>
	<div id="selectArea" class="contextArea">
		<div id="tabsArea" >
			<ul></ul>
		</div>
		<div id="triangleArea" class="triangle"></div>
		<div id="optionArea" class="partyListArea" ></div>
	</div>
	<div id="showAreaHead" class="contextArea">
		<label><spring:message code="BPM.INFOPROCESSMODEL.D122" text="已选参与者" /></label>
	</div>
	<div id="showArea" class="contextArea" >
	</div>
	<div class="buttonArea">
		<input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D001" text="确定" />'>
		<input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D002" text="取消" />'>
	</div>

</body>
</html>