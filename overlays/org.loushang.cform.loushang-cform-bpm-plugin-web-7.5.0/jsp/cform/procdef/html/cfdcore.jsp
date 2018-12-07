<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>                                                                                                    
<% 
String webPath = request.getContextPath();
String procType=request.getParameter("processType");
if (procType == null) {
	procType = "";
}
String pluginType=request.getParameter("pluginType");
if (pluginType == null) {
	pluginType = "";
}
String procDefUniqueId=request.getParameter("procDefUniqueId");
if (procDefUniqueId == null) {
	procDefUniqueId = "";
}
StringBuffer sb = new StringBuffer();
sb.append(request.getScheme());
sb.append("://");
sb.append(request.getServerName());
sb.append(":");
sb.append(request.getServerPort());
sb.append(webPath);

String fullWebPath = sb.toString();
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>CForm流程设计工具核心</title>

<script type="text/javascript">
	if(typeof CFlow == 'undefined')
		CFlow={};
	CFlow.procType='<%=procType%>';
	CFlow.procDefUniqueId='<%=procDefUniqueId%>';
	CFlow.pluginType = '<%=pluginType%>';
	CFlow.webPath='<%=webPath%>';
</script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.extend.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.base.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.action.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.actions.daiban.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.actions.end.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.actions.new.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.actions.yiban.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.form.field.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.form.subform.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.form.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.form.mobile.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.form.pad.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.procsubjectdef.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.procsubjectdefs.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.procsubjectquerydef.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.procsubjectquerydefs.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.subject.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.subjects.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.activity.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.ativities.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.process.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.processes.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfd.packageconfig.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/model/cfdModel.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/cfd.api.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/cfdcore.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>

<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/cfdcore.css"/>
</head>
<body>
	<div class="cfdCore-Area">
		<jsp:include page="/jsp/workflow/infoprocessmodel/html/wfdcore.jsp"></jsp:include>
	</div>
</body>
</html>