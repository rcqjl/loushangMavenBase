<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model" %>
<%@page import="java.net.URLDecoder" %>
<%@page import="org.loushang.workflow.util.WfProcessPluginTypeApi"%>
<%@page import="org.loushang.next.data.Record"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<%@page import="org.loushang.workflow.util.ContextInfoUtil"%>
<resource:resource localeDir="ui.bpm.infoprocessmodel"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.infoprocessmodel");
String locale = ContextInfoUtil.getLocale();
%>

<%
	String displaySourceTypes=request.getParameter("displaySourceTypes");
	//ren为保留查询结果添加
	String procDefName=request.getParameter("procDefName");
	if(procDefName==null)
		procDefName="";
	procDefName = URLDecoder.decode(procDefName, "UTF-8");
	String version=request.getParameter("version");
%>
<html>
	<head>
		<title><%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.013","流程定义增加")%></title>
		<next:ScriptManager></next:ScriptManager>
		<script type="text/javascript" src="procdef.js"></script>
		<script>
		var fs_procDefId;
		var fs_procDefName;
		var fs_extensionContent;
		var fs_modelContent;
		var needLoadFromParent=false;
		var displaySourceTypes='<%=displaySourceTypes%>';
		var procDefName='<%=procDefName%>';
		var version='<%=version%>';
		function init()
		{
			var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
			procDefDataset.newRecord();
			L5.QuickTips.init();
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1 ;
			if(!isChrome){
				var backToQueryPage = document.getElementById("backToQueryPage");
				backToQueryPage.style.display="none";
				var isfullscreen = document.getElementById('isFullScreen').value;
				if(isfullscreen=="true"){
					needLoadFromParent=false;
					fullscreen();
				}
			}else{
				var fullScreenPage = document.getElementById("fullScreenPage");
				fullScreenPage.style.display="none";
				var back = document.getElementById("back");
				back.style.display="none";
			}
		}
		
		function fullScreenPage(){
			needLoadFromParent=true;
			getIframeWindow("procEditor").saveProcess();
			fullscreen();
		}
		
		function fullscreen()
		{
			var url=document.URL.replace("forinsert.jsp","fullscreeninsert.jsp")+"&needLoadFromParent="+needLoadFromParent
				+"&pluginPath="+document.getElementById('pluginPath').value+"&displaySourceTypes="+displaySourceTypes;
			var ret=showModalDialog(url,window,"scroll:yes;status:no;location:no;dialogWidth:"+screen.width+"px;dialogHeight:"+screen.height+"px")
			if(ret==null)return;
			if(ret=="backToQueryPage"){
				back();
			}
			if(ret=="backToNormalMode"){
				getIframeWindow("procEditor").location.reload();
				needLoadFromParent=true;
			}
			
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
	<body onbeforeunload="window.opener.reload()">
		<%
			StringBuffer sb = new StringBuffer();
			sb.append(request.getContextPath());
			sb.append("/");
			
			String rootUrl=sb.toString();
			
			String formId=request.getParameter("formId");
			if(formId==null)formId="";
			
			String processType=request.getParameter("processType");
			if(processType==null)processType="";
			// 插件类型
			String pluginType=request.getParameter("pluginType");
			Record Record = WfProcessPluginTypeApi.getByPluginType(pluginType);
			// 插件路径
			String pluginPath = (String) Record.get("pluginPath");
			if (pluginPath.startsWith("/")) {
				pluginPath = pluginPath.substring(1);
			}
			String isFullScreen=request.getParameter("isFullScreen");
			String displayModel=request.getParameter("displayModel");
			String flexUrl=rootUrl+pluginPath;
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
			<model:dataset pageSize="20" id="procDefDataset" cmd="org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelQueryCmd" >
				<model:record fromBean="org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel">
					<model:field name="isRelease" defaultValue="0"/>
				</model:record>
			</model:dataset>
		</model:datasets>
		<next:Panel height="<%= isHeight%>" hidden="<%=ishidden %>">
			<next:TopBar>
					<next:ToolBarItem symbol='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.014","流程设置")%>'></next:ToolBarItem>
					<next:ToolBarItem symbol="->"></next:ToolBarItem>
					<next:ToolBarItem iconCls="save"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.015","保存")%>' handler="saveProcessDefinition"/>
					<next:ToolBarItem iconCls="select"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.016","发布")%>' handler="releaseProcDefPre"/>
					<next:ToolBarItem id="backToQueryPage" iconCls="undo"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.003","返回")%>' handler="backToQueryPage"/>
					<next:ToolBarItem id="back" iconCls="undo"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.003","返回")%>' handler="back"/>
					<next:ToolBarItem id="fullScreenPage" iconCls="add"  text='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.017","全屏")%>' handler="fullScreenPage"/>
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
			<input type="hidden" name="rootUrl" id="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.INFOPROCESSMODEL.022","根路径")%>'  value="<%=rootUrl%>"/>	
			<input type="hidden" name="formId"  id="formId" value="<%=formId%>"/>
			<input type="hidden" name="processType"  id="processType" value="<%=processType%>"/>
			<input type="hidden" name="isFullScreen"  id="isFullScreen" value="<%=isFullScreen%>"/>
			<input type="hidden" name="displayModel"  id="displayModel" value="<%=displayModel%>"/>
			<input type="hidden" name="locale" id="locale" value="<%=locale%>" >
		</form>
		<iframe name="procEditor" id="procEditor" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"  width="100%" height="100%" src="<%=flexUrl%>"></iframe>
		</next:Html>
		</next:Panel>
		<input type="hidden" name="relativeBusinessProcessId" id="relativeBusinessProcessId" value="<%=relativeBusinessProcessId%>"/>
		<input type="hidden" name="isNew" id="isNew" value="<%=isNew%>"/>
		<input type="hidden" id="isHorizontal" field="isHorizontal" value="false"/>	
	</body>
</html>