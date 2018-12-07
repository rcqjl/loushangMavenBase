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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/wfdcore.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/activityformproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/property/activityformproperty.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
 <div id="tabContainer">
 		<div id="divActivityformPropertyHead" class="headArea"><span><spring:message code="CForm.BPM.D239" text="表单属性"/></span><div class="shrinkDiv"></div></div>
 		<div id="divActivityFormPropertyBody" class="propertyBodyArea">
 		<div id="tabs">
        <ul>
            <li id="tab1" class="tab"><a href="#" class="on" onclick="switchTab('tab1','con1');this.blur();return false;">
             <spring:message code="CForm.BPM.D181" text="表单"/></a></li>
            <li id="tab2" class="tab"><a href="#" onclick="switchTab('tab2','con2');this.blur();return false;">
                <spring:message code="CForm.BPM.D240" text="高级"/></a></li>
             <li id="tab3" class="tab"><a href="#" onclick="switchTab('tab3','con3');this.blur();return false;">
               <spring:message code="CForm.BPM.D241" text="手机表单"/></a></li>
             <li id="tab4" class="tab"><a href="#" onclick="switchTab('tab4','con4');this.blur();return false;">
                <spring:message code="CForm.BPM.D242" text="PAD表单"/></a></li>
        </ul>
        </div>
        <div style="clear: both">
        </div>
        <div id="con1" class="con">
            <div id="formName" class="con1"><label><spring:message code="CForm.BPM.D181" text="表单"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div id="localOpt" class="con1"><label><spring:message code="CForm.BPM.D177" text="操作"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div id="formAuth" class="con1"><label><spring:message code="CForm.BPM.D243" text="域权限"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
        </div>
        <div id="con2" style="display: none" class="con">
            <div class="con2" id="typeSubject"><label><spring:message code="CForm.BPM.D178" text="类型标题"/>:</label>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div class="con2" id="defSubject"><label><spring:message code="CForm.BPM.D179" text="流程标题"/>:</label>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div id="cfActBranch" class="con2" style="display: none"><label><spring:message code="CForm.BPM.D244" text="分支条件"/>:</label>
            <input type="text" readonly="readonly"/><input type="button" /></div>
            <div id="actBranchCondi" class="gatwayCon"><label><spring:message code="CForm.BPM.D244" text="分支条件"/>:</label>
            	<input type="text" readonly="readonly"/><input type="button" /></div>
        </div>
        <div id="con3" style="display: none" class="con">
			<div class="con1" id="mobileFormName"><label><spring:message code="CForm.BPM.D181" text="表单"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div  class="con1" id="mobileLocalOpt"><label><spring:message code="CForm.BPM.D177" text="操作"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div  class="con1" id="mobileFormAuth"><label><spring:message code="CForm.BPM.D243" text="域权限"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
        </div>
        <div id="con4" style="display: none" class="con">
            <div class="con1" id="padFormName"><label><spring:message code="CForm.BPM.D181" text="表单"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
            <div  class="con1" id="padLocalOpt"><label><spring:message code="CForm.BPM.D177" text="操作"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"></div>
            <div  class="con1" id="padFormAuth"><label><spring:message code="CForm.BPM.D243" text="域权限"/>:</label><span></span>
            <input type="text" readonly="readonly"/><input type="button"/></div>
        </div>
        </div>
    </div>
</body>
</html>