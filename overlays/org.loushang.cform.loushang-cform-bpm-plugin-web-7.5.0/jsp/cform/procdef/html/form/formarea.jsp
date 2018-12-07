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
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/formarea.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/zTreeStyle/zTreeStyle.css" />


<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/form/formarea.js"></script>
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
	<div id="floatDiv" class="floatDiv">
		<div id="floatContent" class="floatContent">
			<div id="floatLeftDiv" class="floatLeftDiv">
				<ul id="tree" class="ztree"></ul>
			</div>
			<div id="floatRightDiv" class="floatRightDiv">
			</div>
		</div>
		<div id="floatFooter" class="floatFooter">
			<div>
				<div id="chosen" class="chosen">
				<div></div><label><spring:message code="CForm.BPM.D202" text="已选域"/></label>
			</div>
			<div id="floatConfirmDiv" class="floatConfirmDiv"></div>
			<div id="union" class="union">
				<label><spring:message code="CForm.BPM.D203" text="连接符"/>:</label><input type="text">
			</div>
			</div>
			<div id="buttonArea" class="buttonArea"><input id="confirm" class="confirm" type="button" value="<spring:message code="BPM.INFOPROCESSMODEL.C001" text="确定" />"><input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.C002" text="取消" />'></div>
		</div>
	</div>
</body>
</html>