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
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/actsubjectsyn.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/form/actsubjectsyn.js"></script>
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
	<div class="txtTitle"><label><spring:message code="CForm.BPM.D222" text="流程上设置的标题和域的对应关系"/>:</label>
		<div id="synSubject"></div></div>
	<div class="synHead">
		<table>
			<thead>
				<tr>
					<th class="actTh"><input type="checkbox"><spring:message code="CForm.BPM.D223" text="环节名称"/></th>
					<th class="conTh"><spring:message code="CForm.BPM.D224" text="标题和域的对应关系"/></th>
				</tr>
			</thead>
		</table>
		<div class="context">
			<table>
				<tbody id="actContext"></tbody>
			</table>
		</div>
	</div>
	<div class="buttonArea">
		<input id="confirm" class="confirm" type="button" value='<spring:message code="CForm.BPM.D185" text="确定"/>'>
		<input id="cancel" class="cancel" type="button" value='<spring:message code="CForm.BPM.D186" text="取消"/>'></div>
</body>
</html>