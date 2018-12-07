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
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/smartpaginator.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/subproc/showprocess.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/showprocess.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/smartpaginator.css" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
<div>
	<div id="divSearch" class="searchArea"><label><spring:message code="BPM.INFOPROCESSMODEL.D044" text="子流程名称" />：</label><input id="searchValue" type="text"><input id="search" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D045" text="查询" />'></div>
	<div id="divTable" class="divTable">
	<table cellspacing="0" cellpadding="2px">
		<thead>
			<tr>
				<th><spring:message code="BPM.INFOPROCESSMODEL.D046" text="子流程ID" /></th>
				<th><spring:message code="BPM.INFOPROCESSMODEL.D044" text="子流程名称" /></th>
			</tr>
		</thead>
		<tbody>
			<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
		</tbody>
	</table>
	</div>
	<div id="bottom"></div>
	<div class="button"><input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D001" text="确定" />'><input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D002" text="取消" />'></div>
</div>
</body>
</html>