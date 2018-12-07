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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/css/actsyn.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/form/view/actsyn.js"></script>
<!-- 引入国际化文件 -->
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
	<div class="txtTitle">
		<div><span><spring:message code="BPM.INFOPROCESSMODEL.C047" text="待办操作"/>：</span><div id="procDaiban"></div></div>
		<div><span><spring:message code="BPM.INFOPROCESSMODEL.C048" text="已办操作"/>:</span><div id="procYiban"></div></div>
		<div><span><spring:message code="BPM.INFOPROCESSMODEL.C049" text="办结操作"/>：</span><div id="procBanjie"></div></div>
	</div>
	<div class="synHead">
		<table>
			<thead>
				<tr>
					<th><input type="checkbox"><spring:message code="BPM.INFOPROCESSMODEL.C050" text="环节名称"/></th>
					<th><input type="checkbox"><spring:message code="BPM.INFOPROCESSMODEL.C047" text="待办操作"/></th>
					<th><input type="checkbox"><spring:message code="BPM.INFOPROCESSMODEL.C048" text="已办操作"/></th>
					<th><input type="checkbox"><spring:message code="BPM.INFOPROCESSMODEL.C049" text="办结操作"/></th>
				</tr>
			</thead>
		</table>
  		<div class="content">
			<table>
				<tbody id="actContext"></tbody>
			</table>
		</div>
	</div>
	<div class="buttonArea">
		<input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.C001" text="确定" />'>
		<input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.C002" text="取消" />'></div>
</body>
</html>