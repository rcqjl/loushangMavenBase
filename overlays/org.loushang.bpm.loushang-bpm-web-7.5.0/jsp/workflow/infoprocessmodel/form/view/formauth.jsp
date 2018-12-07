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

<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/css/formauth.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/form/view/formauth.js"></script>
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
	<!-- <div id="tree1" class="left">
	<ul id="tree" class="ztree"></ul>
	</div> -->
	<div id="content" class="right">
		<!-- <div id="container" class="rightTop">
		<label>区域名称:</label><input id="containerName" type="text" readonly="readonly"><label class="hide" for="hide">隐藏:</label><input class="hide" type="checkbox">
		</div> -->
		<div id="table" class="rightBottom">
		<table>
			<thead>
				<tr>
					<th style="width:160px;text-align:left;text-align: left;padding-left: 10px;"><spring:message code="BPM.INFOPROCESSMODEL.C057" text="表单域名称"/></th>
					<th><input type="radio" name="mauthRadio"><spring:message code="BPM.INFOPROCESSMODEL.C058" text="隐藏"/></th>
					<th><input type="radio" name="mauthRadio"><spring:message code="BPM.INFOPROCESSMODEL.C059" text="只读"/></th>
					<th><input type="radio" name="mauthRadio"><spring:message code="BPM.INFOPROCESSMODEL.C060" text="必填"/></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		</div>
	</div>
	<div class="buttonArea"><input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.C001" text="确定" />'><input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.C002" text="取消" />'></div>
	
</body>
</html>