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
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/formproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>


<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/property/formproperty.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 		<div id="divProcessformPropertyHead" class="headArea"><span><spring:message code="BPM.INFOPROCESSMODEL.C022" text="表单属性"/></span><div class="shrinkDiv"></div></div>
 		<div id="divProcessFormPropertyBody" class="propertyBodyArea">
 		<div id="procTabs">
        <ul>
            <li id="procTab1"><a href="#" class="on" >
               <spring:message code="BPM.INFOPROCESSMODEL.C023" text="表单"/></a></li>
            <li id="procTab2"><a href="#">
                <spring:message code="BPM.INFOPROCESSMODEL.C024" text="高级"/></a></li>
        </ul>
        </div>
        <div style="clear: both">
        </div>
        <div id="procCon1" class="procCon">
            <div id="procFormName" class="procCon1"><label><spring:message code="CForm.BPM.D181" text="表单"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button" /></div>
            <div id="procLocalOpt" class="procCon1"><label><spring:message code="CForm.BPM.D177" text="操作"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button" /></div>
            <div class="procCon1" id="procDefaultSubject"><label><spring:message code="CForm.BPM.D180" text="标题"/>:</label>
            <input type="text" readonly="readonly"/><input type="button" /></div>
        </div>
        <div id="procCon2" style="display: none" class="procCon">
            <div class="procCon2" id="procTypeSubject"><label><spring:message code="CForm.BPM.D178" text="类型标题"/>:</label>
            <input type="text" readonly="readonly"/><input type="button" /></div>
            <div class="procCon2" id="procDefSubject"><label><spring:message code="CForm.BPM.D179" text="流程标题"/>:</label>
            <input type="text" readonly="readonly"/><input type="button" /></div>
        </div>
        </div>
</body>
</html>