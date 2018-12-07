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
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/css/formproperty.css" />
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>


<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel//html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/form/property/formproperty.js"></script>
<!-- 引入国际化文件 -->
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>
</head>
<body>
    <div id="divProcessformPropertyHead" class="headArea"><span><spring:message code="BPM.INFOPROCESSMODEL.C022" text="表单属性"/></span><div class="shrinkDiv"></div></div>
    <div id="divProcessFormPropertyBody" class="formPropArea">
        <div id="procTabs" class="procTabs">
        <ul>
            <li id="procTab1"><a href="#" class="on" onclick="switchProcTab('procTab1','procCon1');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C023" text="表单"/></a></li>
            <li id="procTab2"><a href="#" onclick="switchProcTab('procTab2','procCon2');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C024" text="高级"/></a></li>
        </ul>
        </div>
        <div style="clear: both"></div>
        <div id="procCon1" class="procCon">
            <div id="procFormName"><label><spring:message code="BPM.INFOPROCESSMODEL.C023" text="表单"/>:</label><select></select></div>
            <div id="procDaiBan"><label><spring:message code="BPM.INFOPROCESSMODEL.C028" text="待办任务"/>:</label><select></select></div>
            <div id="procYiBan"><label><spring:message code="BPM.INFOPROCESSMODEL.C029" text="已办任务"/>:</label><select></select></div>
        </div>
        <div id="procCon2" style="display: none" class="procCon">
            <div id="procOpt"><label><spring:message code="BPM.INFOPROCESSMODEL.C031" text="操作权限"/>:</label><input id="localOptInput" readonly="readonly" type="text" class="formTxtDiv"><input id="localOptBtn" type="button" class="formBtnDiv"></div>
            <div id="procDynamicParam"><label><spring:message code="BPM.INFOPROCESSMODEL.C032" text="动态参数"/>:</label><input readonly="readonly" class="formTxtDiv" type="text"><input type="button" id="dynapara" class="formBtnDiv"></div>
        </div>
    </div>
</body>
</html>