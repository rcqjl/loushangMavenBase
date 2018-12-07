<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model" %>
<%@page import="org.loushang.workflow.util.ContextInfoUtil"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<resource:resource localeDir="ui.bpm.infoprocessmodel"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.infoprocessmodel");%>
<html>
<head>
<title><%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.023","流程定义修改")%></title>
<next:ScriptManager></next:ScriptManager>
<%String locale = ContextInfoUtil.getLocale();%>
<script type="text/javascript" src="procdef.js">
</script>
<script>
var needLoadFromParent='<%=request.getParameter("needLoadFromParent")%>';
var displaySourceTypes='<%=request.getParameter("displaySourceTypes")%>';
var fs_procDefId;
var fs_procDefName;
var fs_extensionContent;
var fs_modelContent;


function init(){
	
	L5.QuickTips.init(); 
	if(needLoadFromParent=="true")
	{
		var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
		procDefDataset.newRecord();	
		var record = procDefDataset.getCurrent();
		
		fs_modelContent = window.dialogArguments.getIframeWindow("procEditor").getModelContent();
		fs_extensionContent = window.dialogArguments.getIframeWindow("procEditor").getExtensionContent();
		fs_procDefId = window.dialogArguments.getIframeWindow("procEditor").getProcDefId();
		fs_procDefName = window.dialogArguments.getIframeWindow("procEditor").getProcDefName();
		var baseProcDefDataset=window.dialogArguments.L5.DatasetMgr.lookup("procDefDataset");
		var baseRecord = baseProcDefDataset.getCurrent();
		record.set("id", baseRecord.get("id"));
		record.set("procDefId", baseRecord.get("procDefId"));
		record.set("procDefName", baseRecord.get("procDefName"));
		record.set("modelContent", baseRecord.get("modelContent"));
		record.set("extensionContent", baseRecord.get("extensionContent"));
		record.set("pluginType", baseRecord.get("pluginType"));
		record.set("processType", baseRecord.get("processType"));
	}
}
</script>
</head>
<body >
<%
	StringBuffer sb = new StringBuffer();
	sb.append(request.getContextPath());
	sb.append("/");
	
	String rootUrl=sb.toString();
		
	String processType=request.getParameter("processType");
	if(processType==null)processType="";
	String pluginPath=request.getParameter("pluginPath");
    String flexUrl= rootUrl+pluginPath;
	String pluginType=request.getParameter("pluginType");
	String displayModel = request.getParameter("displayModel");
	String isRelease=request.getParameter("isRelease");
	boolean ishidden = false;
	String isHeight="30";
	String fullHeignt="705";
	if ("wfd_bpmn_jspform".equals(pluginType)) {
		ishidden = true;
		isHeight="0";
		fullHeignt="735";
	}
%>
<model:datasets>
	<model:dataset pageSize="20" id="procDefDataset" cmd="org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelQueryCmd" method="getInfoProcessDefModelDataSetById" autoLoad="true">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"></model:record>
	</model:dataset>
</model:datasets>
<next:Panel height="<%=isHeight %>"  hidden="<%=ishidden %>">
	<next:TopBar>
			<next:ToolBarItem symbol='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.014","流程设置")%>'>"></next:ToolBarItem>
			<next:ToolBarItem symbol="->"></next:ToolBarItem>
			<next:ToolBarItem iconCls="save"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.015","保存")%>' handler="updatePre"/>
			<next:ToolBarItem iconCls="save"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.024","另存为新流程")%>' handler="saveAsPre"/>
			<next:ToolBarItem iconCls="save"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.025","另存为新版本")%>' handler="saveAsVersionPre"/>
			<next:ToolBarItem iconCls="select"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.016","发布")%>' handler="releaseProcDefPre"/>
			<next:ToolBarItem iconCls="undo"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.003","返回")%>' handler="backToQueryPage"/>
	</next:TopBar>
</next:Panel>
<next:Panel height="<%=fullHeignt %>">
<next:Html>
<form id="userForm" method="post" dataset="procDefDataset" onsubmit="return false" class="L5form">						
	<input type="hidden" name="id" field="id" id="id">
	<input type="hidden" name="isRelease" id="isRelease" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.026","是否发布")%>'   value="<%=isRelease%>">
	<input type="hidden" name="procDefId" id="procDefId" field="procDefId" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.018","流程定义ID")%>'>			
	<input type="hidden" name="procDefName" field="procDefName" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.019","流程定义名称")%>'>				
	<input type="hidden" name="designer" id="designer"   value="<%=pluginType%>">
	<input type="hidden" name="pluginType" id="pluginType" value="<%=pluginType%>">
	<input type="hidden" name="pluginPath"  id="pluginPath" value="<%=pluginPath%>">
	<input type="hidden" name="modelContent" field="modelContent" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.020","流程定义模型内容")%>'>				
	<input type="hidden" name="extensionContent" field="extensionContent" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.021","流程定义扩展模型内容")%>'>
	<input type="hidden" name="rootUrl" id="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.022","根路径")%>'  value="<%=rootUrl%>">
	<input type="hidden" name="formId"  id="formId" value=""/>	
	<input type="hidden" name="processType"  id="processType" value="<%=processType%>"/>	
	<input type="hidden" name="displayModel"  id="displayModel" value="<%=displayModel%>"/>
	<input type="hidden" name="locale"  id="locale" value="<%=locale%>"/>
</form>
	<iframe name="procEditor" id="procEditor" frameborder="1" marginheight="0" marginwidth="0" scrolling="no"  width="100%" height="100%" src="<%=flexUrl%>"></iframe>
</next:Html>
</next:Panel>

</body>
</html>
