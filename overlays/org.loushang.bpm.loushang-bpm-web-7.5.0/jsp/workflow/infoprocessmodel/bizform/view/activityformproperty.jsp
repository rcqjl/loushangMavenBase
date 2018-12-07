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
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/view/activityformproperty.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divActFormPropertyHead" class="headArea"><span><spring:message code="BPM.INFOPROCESSMODEL.C022" text="表单属性"/></span><div class="shrinkDiv"></div></div>
 		<div id="divActFormPropertyBody" class="propertyBodyArea">
 		<div id="actNew"  class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C027" text="新建任务"/>:</label><input type="text" /></div>
 		<div id="actDaiban"  class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C028" text="待办任务"/>:</label><input type="text" /></div>
 		<div id="actYiban"  class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C029" text="已办任务"/>:</label><input type="text" /></div>
	 		<div id="actDynamicParam" class="prop"><label><spring:message code="BPM.INFOPROCESSMODEL.C032" text="动态参数"/>:</label><input readonly="readonly" type="text"><input type="button"></div>
        </div>
</body>
</html>