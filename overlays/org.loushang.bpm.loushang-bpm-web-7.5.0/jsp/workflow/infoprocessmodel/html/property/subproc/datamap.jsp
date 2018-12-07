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
<title>Insert title here</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/datamap.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/subproc/datamap.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		
	<div id="tabContainer">
		<div id="tabs">
			<ul>
				<li id="tab0"><a href="#" class="on"
					onclick="switchTab(0);this.blur();return false;">
						<spring:message code="BPM.INFOPROCESSMODEL.D041" text="主流程-->子流程" /></a></li>
				<li id="tab1"><a href="#"
					onclick="switchTab(1);this.blur();return false;">
						<spring:message code="BPM.INFOPROCESSMODEL.D042" text="子流程-->主流程" /></a></li>
			</ul>
		</div>
		<div id="triangle" class="triangle"></div>
		<div style="clear: both"></div>
		<div id="con0" class="con">
			<div id="con0left" class="left">
				<div id="table0"  class="table">
					<table cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th><spring:message code="BPM.INFOPROCESSMODEL.D043" text="主流程相关数据" /></th>
								<th><spring:message code="BPM.INFOPROCESSMODEL.D044" text="子流程相关数据" /></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
		<div id="con1" style="display: none" class="con">
			<div id="con1left" class="left">
				<div id="table1"  class="table">
					<table cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th><spring:message code="BPM.INFOPROCESSMODEL.D044" text="子流程相关数据" /></th>
								<th><spring:message code="BPM.INFOPROCESSMODEL.D043" text="主流程相关数据" /></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="buttonArea">
		<input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D001" text="确定" />'><input
			id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D002" text="取消" />'>
	</div>
</body>
</html>