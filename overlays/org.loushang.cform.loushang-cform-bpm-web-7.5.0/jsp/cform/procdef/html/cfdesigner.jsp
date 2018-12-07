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
<title>CForm流程设计工具</title>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/jquery.extend.js"></script>

<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/codemirror.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/codemirror.formatting.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/frame/codemirror.xml.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/cform/procdef/html/skin/js/cfdesigner.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript">
var cformPath='<%=fullWebPath%>';
if(typeof CFlow == 'undefined')
	CFlow={};
	CFlow.showCode="<%=showCode%>";
$(function(){
    CFDEvent.initOperation();
});
</script>

<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/cfdesigner.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/codemirror.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/cform/procdef/html/skin/css/dialog.css"/>
</head>
<body>
    <div class="cfdBaseArea">
        <div id="cfDivHandle" class="cfdHandleArea">
        	<span id="procTitle" class="cfProcTitle"></span>
            <ul>
             <li class="cfBtnSaveAsLi"><div id="cfBtnSaveAsNew" class="cfdButton"><div class="cfdButtonImg cfdBtnSaveAs"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C067" text="保存为..."/></span>
                <div id="saveAsNewVersion" class="cfdButton saveAs"><div class="cfdButtonImg cfdBtnSave"></div><spring:message code="BPM.INFOPROCESSMODEL.C068" text="新版本"/></div>
             	<div id="saveAsNewProcess" class="cfdButton saveAs"><div class="cfdButtonImg cfdBtnSave"></div><spring:message code="BPM.INFOPROCESSMODEL.C069" text="新流程"/></div></div>
             </li>
            <li class="cfBtnReleaseLi"><div id="cfBtnRelease" class="cfdButton"><div class="cfdButtonImg cfdBtnRelease"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C070" text="保存并发布"/></span></div></li>
            <li class="cfBtnSaveLi"><div id="cfBtnSave" class="cfdButton"><div class="cfdButtonImg cfdBtnSave"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C071" text="保存"/></span></div></li>
            <li class="cfBtnModelLi"><div id="seeSource" style="display:none" class="cfdButton">
                <div class="cfdButtonImg cfdBtnModel"></div><span><spring:message code="BPM.INFOPROCESSMODEL.C037" text="查看源码"/></span></div></li> 
            </ul>
        </div>
        <div style="clear: both;"></div>
        <div id="cfDivDesignArea" class="cfdBottomColumn">
        </div>
         <div id="divSource" class="wfdSourceColumn" style="display:none">
        	<button id="bpmnSource"><spring:message code="BPM.INFOPROCESSMODEL.C072" text="BPMN模型"/></button><button id="cformSource"><spring:message code="BPM.INFOPROCESSMODEL.C073" text="表单模型"/></button>
           <textarea id="txtSource" name="txtSource" disabled="disabled"></textarea>
        </div>
    </div>
</body>
</html>