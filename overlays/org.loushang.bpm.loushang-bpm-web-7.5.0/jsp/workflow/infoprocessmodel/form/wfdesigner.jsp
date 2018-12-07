<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
String showCode=request.getParameter("showCode");
if(showCode==null){
	showCode="";
}
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<title>jsp表单流程设计工具</title>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/codemirror.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/css/wfdesigner.css"/>

<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.extend.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/codemirror.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/codemirror.formatting.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/codemirror.xml.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/form/skin/js/wfdesigner.js"></script>
<!-- 引入国际化文件 -->
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
if(typeof WForm == 'undefined')
	WForm={
		parameter:{}
	};
WForm.webPath = '<%=webPath %>';
WForm.fullWebPath = '<%=fullWebPath %>';
WForm.parameter['showCode']="<%=showCode%>";
</script>
</head>
<body onbeforeunload="window.opener.reload()">
    <div class="wfd_BaseArea">
        <div id="wfd_div_handle" class="wfd_HandleArea">
        	<span id="wfd_procTitle" class="wfProcTitle"></span>
            <ul>
            <li class="wfBtnSaveAsLi"><div id="wfd_btn_saveAsNew" class="wfdButton"><div class="wfdButtonImg wfdBtnSaveAs"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C067" text="保存为..."/></span>
            	<div id="saveAsNewVersion" class="wfdButton saveAs"><div class="wfdButtonImg wfdBtnSave"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C068" text="新版本"/></span></div>
             	<div id="saveAsNewProcess" class="wfdButton saveAs"><div class="wfdButtonImg wfdBtnSave"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C069" text="新流程"/></span></div>
             	</div>
             </li>
            <li class="wfBtnReleaseLi"><div id="wfd_btn_saveAndRelease" class="wfdButton"><div class="wfdButtonImg wfdBtnRelease"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C070" text="保存并发布"/></span></div></li>
            <li class="wfBtnSaveLi"><div id="wfd_btn_save" class="wfdButton"><div class="wfdButtonImg wfdBtnSave"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C071" text="保存"/></span></div></li>
            <li class="wfBtnModelLi"><div id="seeSource" class="wfdButton" style="display:none"><div class="wfdButtonImg wfdBtnModel"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C037" text="查看源码"/></span></div></li>
            </ul>
        </div>
        <div style="clear: both;"></div>
        <div id="wfd_div_designArea" class="wfd_DesignColumn">
        </div>
        <div id="wfd_div_code" class="wfd_SourceColumn" style="display:none">
        	<button id="wfd_ProcModelSource" ><spring:message code="BPM.INFOPROCESSMODEL.C072" text="BPMN模型"/></button><button id="wfd_FormSource"><spring:message code="BPM.INFOPROCESSMODEL.C073" text="表单模型"/></button>
           <textarea id="wfd_txtSource" name="wfd_txtSource" disabled="disabled"></textarea>
        </div>
    </div>
</body>
</html>