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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/zTreeStyle/zTreeStyle.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>

<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/formauth.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/form/mobileformauth.js"></script>
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
	<div id="tree1" class="left">
	<ul id="tree" class="ztree"></ul>
	</div>
	<div id="content" class="right">
		<div id="container" class="rightTop">
		<label><spring:message code="CForm.BPM.D237" text="区域名称"/></label><input id="containerName" type="text"><label class="hide" for="hide"><spring:message code="CForm.BPM.D238" text="是否隐藏"/></label><input class="hide" type="checkbox">
		</div>
		<div id="table" class="rightBottom">
		<table>
			<thead>
				<tr>
					<th><spring:message code="CForm.BPM.D232" text="表单域名称"/></th>
					<th><input type="checkbox"><spring:message code="CForm.BPM.D231" text="隐藏"/></th>
					<th><input type="checkbox"><spring:message code="CForm.BPM.D233" text="只读"/></th>
					<th><input type="checkbox"><spring:message code="CForm.BPM.D234" text="必填"/></th>
					<th><input type="checkbox"><spring:message code="CForm.BPM.D235" text="初始化"/></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<div class="buttonArea"><input id="confirm" class="confirm" type="button" value='<spring:message code="CForm.BPM.D185" text="确定" />'><input id="cancel" class="cancel" type="button" value='<spring:message code="CForm.BPM.D186" text="取消" />'></div>
		</div>
	</div>
</body>
</html>