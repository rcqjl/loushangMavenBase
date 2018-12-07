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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<title><spring:message code="BPM.INFOPROCESSMODEL.D064" text="设置角色" /></title>

<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/participantForm.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonrole.js"></script>

<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>

</head>
<body>
	<div id="rolePage">
		<div id="roleSearch" class="searchArea">
			<label style="display:none;"><spring:message code="BPM.INFOPROCESSMODEL.D065" text="机构" />:</label><input id="struId" type="text" class="txtDiv" style="display:none;">
			<label><spring:message code="BPM.INFOPROCESSMODEL.D017" text="名称" />:</label><input id="roleName" class="txtDiv" type="text">
			<input id="roleSearchBtn" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D045" text="查询" />'>
		</div>
		<div id="rolePageTool" class="pagetool">
			<div id="rolePreAndNext" class="preAndNext">
				<div id="rolePreDiv" class="preDiv"><span></span></div>
				<div id="roleNextDiv" class="nextDiv"><span></span></div>
			</div>
			<div id="rolePageNum" class="pageNum"><spring:message code="BPM.INFOPROCESSMODEL.D066" text="共" /> <span></span> <spring:message code="BPM.INFOPROCESSMODEL.D067" text="页" /></div>
		</div>
		<div id="roleTable" class="divTable">
			<table>
				<thead>
					<tr>
						<th id="roleChk"></th>
						<th><spring:message code="BPM.INFOPROCESSMODEL.D068" text="角色名称" /></th>
						<th><spring:message code="BPM.INFOPROCESSMODEL.D069" text="全局/所属机构" /></th>
						<th id="roleAdd"><spring:message code="BPM.INFOPROCESSMODEL.D070" text="操作" /></th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<div id="roleBtnArea" class="buttonArea">
			<input id="roleConfirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D001" text="确定" />'>
			<input id="roleCancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D002" text="取消" />'>
		</div>
	</div>
</body>
</html>