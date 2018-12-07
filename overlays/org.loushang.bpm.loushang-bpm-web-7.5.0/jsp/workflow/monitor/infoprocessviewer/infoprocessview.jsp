<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<%@page import="org.loushang.workflow.util.ContextInfoUtil"%>
<resource:resource localeDir="ui.bpm.monitor"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.monitor");
String locale = ContextInfoUtil.getLocale();
%>
<html>
<head>
<title><%=res.getLocaleMsg("UI.BPM.MONITOR.030","流程状态图")%></title>
<next:ScriptManager></next:ScriptManager>
<style type="text/css">
input {
	width:300px;
}
.button{
	width:75px;
}
</style>
</head>
<body>
<%
	StringBuffer sb = new StringBuffer();
	sb.append(request.getContextPath());
	sb.append("/");
	String rootUrl = sb.toString();
   String procDefUniqueId=(String)request.getAttribute("procDefUniqueId");
   if(procDefUniqueId==null)procDefUniqueId=request.getParameter("procDefUniqueId");
   String procDefId=(String)request.getAttribute("procDefId");
   if(procDefId==null)procDefId=request.getParameter("procDefId");
   String processId=(String)request.getAttribute("processId");
   if(processId==null)processId=request.getParameter("processId");
   String backUrl=request.getParameter("backUrl");
   if(backUrl==null)backUrl="";
   String isHighLevel = "0";
   String version=request.getParameter("version");
   if(version==null)
	   version="";
%>
<next:Panel id="procMonitor" height="100%">
	<next:Html>
		<form  name="frmList"  action="" class="L5form">					
					<input type="hidden" name="procDefUniqueId" id="procDefUniqueId" value="<%=procDefUniqueId%>" >
					<input type="hidden" name="procDefId" id="procDefId" field="procDefId" value="<%=procDefId%>"/>
					<input type="hidden" name="processId" id="processId" value="<%=processId%>" >
					<input type="hidden" name="assignmentId" id="assignmentId" value="<%=request.getParameter("assignmentId") %>" >
					<input type="hidden" name="isShowOrderCounterSign" id="isShowOrderCounterSign" value="<%=request.getParameter("isShowOrderCounterSign") %>" >
					<input type="hidden" name="isShowParallelCounterSign" id="isShowParallelCounterSign" value="<%=request.getParameter("isShowParallelCounterSign") %>" >
					<input type="hidden" name="isShowSplit" id="isShowSplit" value="<%=request.getParameter("isShowSplit") %>" >
					<input type="hidden" name="isShowJoin" id="isShowJoin" value="<%=request.getParameter("isShowJoin") %>" >
					<input type="hidden" name="isShowSubflow" id="isShowSubflow" value="<%=request.getParameter("isShowSubflow") %>" >
					<input type="hidden" name="isShowActPropertyUrl" id="isShowActPropertyUrl" value="<%=request.getParameter("isShowActPropertyUrl") %>" >
					<input type="hidden" name="actionType" id="actionType" value="<%=request.getParameter("actionType") %>" >
					<input type="hidden" name="isShowActInfoByMouseOver" id="isShowActInfoByMouseOver" value="<%=request.getParameter("isShowActInfoByMouseOver") %>" >
					<input type="hidden" name="isShowStartEndNode" id="isShowStartEndNode" value="<%=request.getParameter("isShowStartEndNode") %>" >
					<input type="hidden" name="isShowIconDetailPanel" id="isShowIconDetailPanel" value="<%=request.getParameter("isShowIconDetailPanel") %>" >
					<input type="hidden" name="isShowSimpleFlowView" id="isShowSimpleFlowView" value="<%=request.getParameter("isShowSimpleFlowView") %>" >
					<input type="hidden" name="isShowProcessInfo" id="isShowProcessInfo" value="<%=request.getParameter("isShowProcessInfo") %>" >
					<input type="hidden" name="isShowBackBtn" id="isShowBackBtn" value="<%=request.getParameter("isShowBackBtn") %>" >
					<input type="hidden" name="pkDataField" id="pkDataField" value="<%=request.getParameter("primaryKey") %>" >
					<input type="hidden" name="rootUrl" id="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.MONITOR.029","根路径")%>'  value="<%=rootUrl%>"/>	
					<input type="hidden" name="backUrl" id="backUrl" value="<%=backUrl%>" >
					<input type="hidden" name="projectType" id="projectType" value="<%=request.getParameter("projectType")%>" >
					<input type="hidden" name="isShowparentFlowViewButton" id="isShowparentFlowViewButton" value="<%=request.getParameter("isShowparentFlowViewButton") %>" >
					<input type="hidden" name="locale" id="locale" value="<%=locale%>" >
					<input type="hidden" id="isHighLevel" field="isHighLevel" value="<%=isHighLevel%>"/>
					<input type="hidden" id="isHorizontal" field="isHorizontal" value="false"/>
		</form>
		<iframe name="procEditor" id="procEditor" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto" width="100%" height="100%" src=""></iframe>
	</next:Html>
</next:Panel>
<canvas id="checkExplorer" style="display:none"/>
</body>
<script>
function getProcessGraphDefModelInfo(processId,procDefId,procDefUniqueId,assignmentId,primaryKey){
	var cmd=new L5.Command("org.loushang.workflow.monitor.cmd.ProcessMonitorCmd");
	cmd.setParameter("processId",processId);
	cmd.setParameter("procDefId",procDefId);
	cmd.setParameter("procDefUniqueId",procDefUniqueId);
	cmd.setParameter("assignmentId",assignmentId);
	cmd.setParameter("pkDataField",primaryKey);
	cmd.execute("getHtml5ProcessGraphDefModelContent");
	if(!cmd.error)
	{
		processGraphDefXml=cmd.getReturn("modelContent");
		return processGraphDefXml;
	}
	else
	{
		return false;
	}	
}
function getProcessInstanceModelInfo(processId,assignmentId,primaryKey){
	var cmd=new L5.Command("org.loushang.workflow.monitor.cmd.ProcessMonitorCmd");
	cmd.setParameter("processId",processId);
	cmd.setParameter("assignmentId",assignmentId);
	cmd.setParameter("pkDataField",primaryKey);
	cmd.execute("getHtml5ProcessInstanceModelContent");
	if(!cmd.error)
	{
		processInstanceXML=cmd.getReturn("modelContent");
		return processInstanceXML;
	}
	else
	{
		return false;
	}	
}
function back(){
    var backUrl=document.getElementById('backUrl').value;
    if(backUrl!=null&&backUrl!="")
    {
    	if(backUrl.match("^http://") || backUrl.match("^https://")) {
    		if (backUrl.indexOf("\[") != -1) {
	    		var newBackUrl = backUrl.substring(0,backUrl.indexOf("\["));
	    		var paraString = backUrl.substring(backUrl.indexOf("\[")+1,backUrl.length); 
		    	paraString = paraString.replace(/:/g,"=");
		    	paraString = paraString.replace(/;/g,"&");
	    		window.location.href = newBackUrl+"?"+paraString;
    		} else {
    			window.location.href = backUrl;
    		}
    		
    	} else {
    		backUrl = backUrl.replace("\[","?");
	    	backUrl = backUrl.replace(/:/g,"=");
	    	backUrl = backUrl.replace(/;/g,"&");
	        L5.forward(backUrl,"");
    	}
    }
    else
    {
    	window.history.back();
    }      
}
function init(){
	var version='<%=version%>';
	var procMonitor=document.getElementById('procMonitor');
	if(version=='l6'){
		procMonitor.style.marginLeft='24px';
		procMonitor.style.marginRight='24px';
	}else{
		procMonitor.style.width='100%';
	}
	var viewerConfig = "0";
	var cmd=new L5.Command("org.loushang.workflow.monitor.config.cmd.MonitorPropertyConfigCmd");
	cmd.execute("getProcessMonitorViewerConfig");
	if(!cmd.error)
	{
		viewerConfig=cmd.getReturn("viewerConfig");
	} else {
		return;
	}

	var editor=document.getElementById("procEditor").contentWindow || document.frames["procEditor"].window
	var rootUrl="<%=rootUrl%>";
	// 流程监控配置的值为1：使用新图（没有概要图，可能有泳道图，虚环节图标是菱形，名称为网关）
	if (viewerConfig == "1") {
		editor.location.href=rootUrl+"jsp/workflow/monitor/infoprocessviewer/taskandgatewayviewer/InfoProcessViewer.html";
		return;
	}
	// 流程监控配置的值为0：使用旧的概要、详细图模式（虚环节图标是圆角矩形）
	var checkExplorer=document.getElementById("checkExplorer");
	if(checkExplorer&&checkExplorer.getContext){
		editor.location.href=rootUrl+"jsp/workflow/monitor/infoprocessviewer/summaryanddetailviewer/Html5FlowView.html";	
	}else{
		editor.location.href=rootUrl+"jsp/workflow/monitor/infoprocessviewer/summaryanddetailviewer/FlowView.html";
	}
}

function closeWindow(returnValue){
	window.returnValue=returnValue;
	window.close();
}
</script>
</html>