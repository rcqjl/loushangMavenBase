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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dataobj.css" />

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/process/dataobj.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divFormPropertyBody" class="propertyBodyArea">
        <div class="mainArea">
        	<div class="addImg img"></div><a id="add" class="opt"><spring:message code="BPM.INFOPROCESSMODEL.D026" text="增加"/></a>
            <div class="defTable">
            	<table>
            		<thead>
            			<tr>
            			<th><spring:message code="BPM.INFOPROCESSMODEL.D027" text="相关数据"/></th><th style="width: 40px;"><spring:message code="BPM.INFOPROCESSMODEL.D028" text="删除"/></th>
            			</tr>
            		</thead>
            		<tbody></tbody>
            	</table>
            </div>
        </div>
        <div class="buttonArea"><input id="confirm" class="confirm" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D001" text="确定"/>'><input id="cancel" class="cancel" type="button" value='<spring:message code="BPM.INFOPROCESSMODEL.D002" text="取消"/>'></div>
        </div>
</body>
</html>