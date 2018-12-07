<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model" %>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<%@page import="org.loushang.workflow.util.ContextInfoUtil"%>
<resource:resource localeDir="ui.bpm.infoprocessmodel"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.infoprocessmodel");
String locale = ContextInfoUtil.getLocale();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.013","流程定义增加")%></title>
<next:ScriptManager></next:ScriptManager>
<script type="text/javascript" src="procdef.js"></script>
<script>
var needLoadFromParent='<%=request.getParameter("needLoadFromParent")%>';
var displaySourceTypes='<%=request.getParameter("displaySourceTypes")%>';
var fs_procDefId;
var fs_procDefName;
var fs_extensionContent;
var fs_modelContent;

function init()
{
	L5.QuickTips.init();
	var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
	procDefDataset.newRecord();	
	var record = procDefDataset.getCurrent();
	if(needLoadFromParent=="true")
	{
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

function backToNormalMode()
{
	getIframeWindow("procEditor").saveProcess();
	window.dialogArguments.fs_procDefId = getIframeWindow("procEditor").getProcDefId();
	window.dialogArguments.fs_procDefName = getIframeWindow("procEditor").getProcDefName();
	window.dialogArguments.fs_modelContent = getIframeWindow("procEditor").getModelContent();
	window.dialogArguments.fs_extensionContent = getIframeWindow("procEditor").getExtensionContent();
	var baseProcDefDataset=window.dialogArguments.L5.DatasetMgr.lookup("procDefDataset");
	var baseRecord = baseProcDefDataset.getCurrent();
	var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	baseRecord.set("id", record.get("id"));
	baseRecord.set("procDefId", record.get("procDefId"));
	baseRecord.set("procDefName", record.get("procDefName"));
	baseRecord.set("modelContent", record.get("modelContent"));
	baseRecord.set("extensionContent", record.get("extensionContent"));
	baseRecord.set("pluginType", record.get("pluginType"));
	baseRecord.set("processType", record.get("processType"));
	window.returnValue="backToNormalMode";
	window.close();
}
//关闭浏览器窗口时更新非全屏窗口
window.onbeforeunload=function(){
	if(window.returnValue==null)
		backToNormalMode();
}
</script>
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
	
	String rootUrl=sb.toString();
	
	String formId=request.getParameter("formId");
	if(formId==null)formId="";
	
	String processType=request.getParameter("processType");
	if(processType==null)processType="";
	String displayModel = request.getParameter("displayModel");
	// 插件路径
	String pluginPath = request.getParameter("pluginPath");
	String flexUrl=rootUrl+pluginPath;
	String pluginType=request.getParameter("pluginType");
	String relativeBusinessProcessId = request.getParameter("relativeBusinessProcessId");
	if (relativeBusinessProcessId == null) {
		relativeBusinessProcessId = "";
	}
	
	String isNew = request.getParameter("isNew");
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
	<model:dataset pageSize="20" id="procDefDataset" cmd="org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelQueryCmd">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel">
			<model:field name="isRelease" defaultValue="0"/>
		</model:record>
	</model:dataset>
</model:datasets>

<next:Panel height="<%= isHeight%>"  hidden="<%=ishidden %>">
	<next:TopBar>
			<next:ToolBarItem symbol='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.014","流程设置")%>'></next:ToolBarItem>
			<next:ToolBarItem symbol="->"></next:ToolBarItem>
			<next:ToolBarItem iconCls="save"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.015","保存")%>' handler="saveProcessDefinition"/>
			<next:ToolBarItem iconCls="select"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.016","发布")%>' handler="releaseProcDefPre"/>
			<next:ToolBarItem iconCls="undo"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.028","退出全屏")%>' handler="backToNormalMode"/>
			<next:ToolBarItem iconCls="undo"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.003","返回")%>' handler="backToQueryPage"/>
	</next:TopBar>
</next:Panel>
<next:Panel height="<%=fullHeignt %>">
	
<next:Html>
<form id="userForm" method="post" dataset="procDefDataset" onsubmit="return false"  class="L5form">						
	<input type="hidden" name="id" field="id"/>
	<input type="hidden" name="isRelease" field="isRelease" >
	<input type="hidden" name="procDefId" id="procDefId" field="procDefId" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.018","流程定义ID")%>'/>			
	<input type="hidden" name="procDefName" field="procDefName" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.019","流程定义名称")%>'/>	
	<input type="hidden" name="designer" id="designer"  value="<%=pluginType%>">
	<input type="hidden" name="pluginType"  id="pluginType" value="<%=pluginType%>">
	<input type="hidden" name="pluginPath"  id="pluginPath" value="<%=pluginPath%>">
	<input type="hidden" name="modelContent" field="modelContent" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.020","流程定义模型内容")%>'/>				
	<input type="hidden" name="extensionContent" field="extensionContent" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.021","流程定义扩展模型内容")%>'/>
	<input type="hidden" name="procSpec" field="procSpec"/>
	<input type="hidden" id="rootUrl" name="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.022","根路径")%>'  value="<%=rootUrl%>"/>	
	<input type="hidden" name="formId"  id="formId" value="<%=formId%>"/>
	<input type="hidden" name="processType"  id="processType" value="<%=processType%>"/>
	<input type="hidden" name="displayModel"  id="displayModel" value="<%=displayModel%>"/>
	<input type="hidden" name="locale" id="locale" value="<%=locale%>" >
</form>
<iframe name="procEditor" id="procEditor" frameborder="1" marginheight="0" marginwidth="0" scrolling="no"  width="100%" height="100%" src="<%=flexUrl%>"></iframe>

</next:Html>
</next:Panel>
<input type="hidden" name="relativeBusinessProcessId" id="relativeBusinessProcessId" value="<%=relativeBusinessProcessId%>"/>
<input type="hidden" name="isNew" id="isNew" value="<%=isNew%>"/>
<input type="hidden" id="isHorizontal" field="isHorizontal" value="false"/>	
</body>
</html>

