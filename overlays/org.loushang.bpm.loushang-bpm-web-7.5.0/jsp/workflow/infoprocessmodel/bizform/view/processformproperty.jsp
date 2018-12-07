<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
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
<title>Insert title here</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/skin/css/formproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>


<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/view/processformproperty.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divProcFormPropertyHead" class="headArea"><span><spring:message code="BPM.INFOPROCESSMODEL.C022" text="表单属性"/></span><div class="shrinkDiv"></div></div>
	 	<div id="divProcFormPropertyBody" class="propertyBodyArea">
	 		<div id="procDaiban" class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C028" text="待办任务"/>:</label><input type="text" /></div>
	 		<div id="procYiban" class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C029" text="已办任务"/>:</label><input type="text" /></div>
	 		<div id="procSubject" class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C074" text="默认标题"/>:</label><input type="text" /></div>
	 		<div id="procDynamicParam" class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C032" text="动态参数"/>:</label><input readonly="readonly" type="text"><input type="button"></div>
        </div>
</body>
</html>