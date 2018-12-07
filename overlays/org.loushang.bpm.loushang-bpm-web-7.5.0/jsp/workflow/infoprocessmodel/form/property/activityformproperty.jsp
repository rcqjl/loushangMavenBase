<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/css/activityformproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/form/property/activityformproperty.js"></script>
<!-- 引入国际化文件 -->
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
	<div id="tabContainer">
 		<div id="divActivityformPropertyHead" class="headArea"><span><spring:message code="BPM.INFOPROCESSMODEL.C022" text="表单属性"/></span><div class="shrinkDiv"></div></div>
 		<div id="divActivityFormPropertyBody" class="formPropArea">
	 		<div id="tabs">
	        <ul>
            	<li id="tab1" class="tab wfFormTab"><a href="#" class="on" onclick="switchTab('tab1','con1');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C023" text="表单"/></a></li>
                <li id="tab4" class="tab wfAdvTab"><a href="#" onclick="switchTab('tab4','con4');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C024" text="高级"/></a></li>
            	<li id="tab2" class="tab wfTelFormTab"><a href="#" onclick="switchTab('tab2','con2');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C025" text="手机表单"/></a></li>
            	<li id="tab3" class="tab wfPadFormTab"><a href="#" onclick="switchTab('tab3','con3');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C026" text="PAD表单"/></a></li>
	        </ul>
	        </div>
	        <div style="clear: both"></div>
	        <div id="con1" class="con">
	            <div id="actFormName" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C023" text="表单"/>:</label><select></select></div>
				<div id="actNewTask" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C027" text="新建任务"/>:</label><select></select></div>
				<div id="actDaiBan" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C028" text="待办任务"/>:</label><select></select></div>
				<div id="actYiBan" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C029" text="已办任务"/>:</label><select></select></div>
 		    </div>
            <div id="con4" style="display: none" class="con">
                <div id="actAuth" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C030" text="域权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actAuthBtn" type="button" class="formBtnDiv"></div>
                <div id="actOpt" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C031" text="操作权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actOptBtn" type="button" class="formBtnDiv"></div>
                <div id="actDynamicParam" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C032" text="动态参数"/>:</label><input readonly="readonly" class="formTxtDiv" type="text"/><input id="actDynapara" type="button" class="formBtnDiv"/></div>
            </div>
	        <div id="con2" style="display: none" class="con">
	       		<div id="actPhoneAuth" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C030" text="域权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actPhoneAuthBtn" type="button" class="formBtnDiv"></div>
                <div id="actPhoneOpt" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C031" text="操作权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actPhoneOptBtn" type="button" class="formBtnDiv"></div>
	        </div>
	        <div id="con3" style="display: none" class="con">
	        	<div id="actPadAuth" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C030" text="域权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actPadAuthBtn" type="button" class="formBtnDiv"></div>
                <div id="actPadOpt" class="con1"><label><spring:message code="BPM.INFOPROCESSMODEL.C031" text="操作权限"/>:</label><input type="text" readonly="readonly" class="formTxtDiv" /><input id="actPadOptBtn" type="button" class="formBtnDiv"></div>
	        </div>
        </div>
    </div>
</body>
</html>