<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>jsp表单流程设计工具核心</title>

<script type="text/javascript">
	if(typeof WForm == 'undefined')
		WForm={};
	WForm.webPath='<%=webPath%>';
    WForm.fullWebPath='<%=fullWebPath%>';
</script>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/skin/css/wfdcore.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.extend.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.base.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.parameter.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.taskparameters.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.taskrequest.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.taskrequests.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.activity.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.activities.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.process.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.processes.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wform.package.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/model/wformmodel.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/bizform/skin/js/wfdcore.js"></script>
</head>
<body>
	<div id="wfdCoreArea" class="wfdCore-Area">
	</div>
</body>
</html>