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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/subjectdef.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>



<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/subject/subjectdef.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divFormPropertyBody" class="propertyBodyArea">
        <div class="mainArea">
        	<div class="addImg1"></div>
           <a id="add"><spring:message code="CForm.BPM.D205" text="增加一条信息"/></a>
            <div class="defTable">
            	<table>
            		<thead>
            			<tr>
            			<th style="width:135px;padding-left:10px;"><spring:message code="CForm.BPM.D182" text="标题名称"/></th><th style="width:60px;"><spring:message code="CForm.BPM.D206" text="宽度"/></th><th style="width:120px;"><spring:message code="CForm.BPM.D207" text="作为查询条件"/></th><th style="width:135px;"><spring:message code="CForm.BPM.D208" text="表单域"/></th><th style="width:100px;"><spring:message code="CForm.BPM.D209" text="删除"/></th>
            			</tr>
            		</thead>
            		<tbody></tbody>
            	</table>
            </div>
        </div>
        <div class="buttonArea"><input id="confirm" class="confirm" type="button" value="<spring:message code="" text="确定"/>"><input id="cancel" class="cancel" type="button" value="<spring:message code="" text="取消"/>"></div>
        </div>
</body>
</html>