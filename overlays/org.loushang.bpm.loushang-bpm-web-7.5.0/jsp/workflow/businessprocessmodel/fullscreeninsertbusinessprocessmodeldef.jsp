<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model" %>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<%@page import="org.loushang.workflow.util.ContextInfoUtil" %>
<resource:resource localeDir="ui.bpm.businessprocessmodel"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.businessprocessmodel");%>
<html>
	<head>
		<%
			StringBuffer sb = new StringBuffer();
			sb.append(request.getContextPath());
			sb.append("/");
			String rootUrl=sb.toString();
			
			// 细化的高层业务流程的定义唯一ID
			String highLevelProcDefUniqueId=request.getParameter("highLevelProcDefUniqueId");
			// 细化的高层业务流程的环节定义ID
			String actDefId = request.getParameter("actDefId");
			// 是否设置为叶子流程
			String setLeafProc=request.getParameter("setLeafProc");
			// 使用的模板类型
			String templateType = request.getParameter("templateType");
			// 插件类型
			String pluginType=request.getParameter("pluginType");
			String flexUrl=rootUrl+"jsp/workflow/businessprocessmodel/BusinessProcessDesigner.html";
			String locale= ContextInfoUtil.getLocale();
		%>
		<title><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.008","业务流程设计工具")%></title>
		<next:ScriptManager></next:ScriptManager>
		<script>
		function init()
		{
			var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
			procDefDataset.newRecord();
			//L5.getCmp("mainPanel").setHeight(screen.height-25);
		}

		function getIframeWindow(id){
			return document.getElementById(id).contentWindow || document.frames[id].window;
		}

		function needConvertHighLevelToExecuteLevel()
		{
			return false;
		}

		function insert()
		{
			var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
			var record = procDefDataset.getCurrent();
			if (record.get("id")!="") {
				if(executeUpdate())
					alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.009", "流程定义修改成功！"));
			}
			else
			{
				if(executeInsert())
					alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.010", "流程定义保存成功！"));
			}
		}
		function executeInsert()
		{
			var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
			var record = procDefDataset.getCurrent();
			var procDefName = getIframeWindow("procEditor").getProcDefName();
			var modelContent = getIframeWindow("procEditor").getModelContent();
			var extensionContent = getIframeWindow("procEditor").getExtensionContent();
			var procDefId = getIframeWindow("procEditor").getProcDefId();
			var procSpec = getIframeWindow("procEditor").getProcSpec();
			
			record.set("procDefId", procDefId);
			record.set("procDefName", procDefName);
			record.set("pluginType",'<%=pluginType%>');
			record.set("modelContent", modelContent);
			record.set("extensionContent", extensionContent);
			record.set("procSpec", procSpec);
			var valid = procDefDataset.isValidate();
			if (valid !== true) {
				alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.011", "校验未通过，不能保存！") + valid);
				return false;
			}
			var command = new L5.Command(
					"org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelCmd");
			command.setParameter("procDef",procDefDataset.getCurrent().toBean(
								"org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcessDefModel"));
			command.setParameter("templateType",'<%=templateType%>');
			command.setParameter("highLevelProcDefUniqueId",'<%=highLevelProcDefUniqueId%>');
			command.setParameter("actDefId",'<%=actDefId%>');
			command.setParameter("setLeafProc",'<%=setLeafProc%>');
			command.execute("insert");
			if (!command.error) {
				record.set("id",command.getReturn("procDefUniqueId"));
				record.set("isHistory", command.getReturn("isHistory"));
				return true;
			} else {
				alert(command.error);
				return false;
			}
		}

		function executeUpdate()
		{
			var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
			var record = procDefDataset.getCurrent();
			var procDefName = getIframeWindow("procEditor").getProcDefName();
			var modelContent = getIframeWindow("procEditor").getModelContent();
			var extensionContent = getIframeWindow("procEditor").getExtensionContent();
			var procDefId = getIframeWindow("procEditor").getProcDefId();

			record.set("procDefId", procDefId);
			record.set("procDefName", procDefName);
			record.set("pluginType",'<%=pluginType%>');
			record.set("modelContent", modelContent);
			record.set("extensionContent", extensionContent);
			var isValidate = procDefDataset.isValidate();
			if (isValidate != true) {
				alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.011", "校验未通过，不能保存！") + isValidate);
				return false;
			}
			var command = new L5.Command(
					"org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelCmd");
			command.setParameter("procDef",procDefDataset.getCurrent().toBean(
							"org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcessDefModel"));
			command.execute("update");
			if (!command.error) {
				return true;
			} else {
				alert(command.error);
				return false;
			}	
		}

		function procEditorScrollEventHandler()
		{
			var frame=getIframeWindow("procEditor");
			frame.designerContainerScrollSizeChanged(document.body.scrollLeft,document.body.scrollTop);
		}

    	function saveProcessDefinition()
		{
			getIframeWindow("procEditor").saveProcessPre("insert");
		}
		
		function forwardToQueryPage()
		{
			var url = 'jsp/workflow/businessprocessmodel/querybusinessprocessmodeldef.jsp';
			var text = getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.007", 'BPMN流程定义查询');
			L5.forward(url, text);
		}

		function designerLoadCompleted()
		{
			document.body.onscroll=procEditorScrollEventHandler;
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
		
		<model:datasets>
			<model:dataset pageSize="20" id="procDefDataset" cmd="org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd" >
				<model:record fromBean="org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcessDefModel">
				</model:record>
			</model:dataset>
		</model:datasets>
		
		<next:Panel id="mainPanel" height="100%">
		<next:Html>
		<form id="userForm" method="post" dataset="procDefDataset" onsubmit="return false"  class="L5form">						
			<input type="hidden" name="id" field="id"/>
			<input type="hidden" name="procDefId" id="procDefId" field="businessId" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.012","流程定义ID")%>'/>			
			<input type="hidden" name="businessName" field="businessName" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.013","流程定义名称")%>'/>	
			<input type="hidden" name="modelContent" field="modelContent" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.014","流程定义XPDL")%>'/>				
			<input type="hidden" name="extensionContent" field="extensionContent" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.015","流程定义XML内容")%>'/>		
			<input type="hidden" id="rootUrl" name="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.016","根路径")%>'  value="<%=rootUrl%>"/>
			<input type="hidden" id="locale" name="locale" value="<%=locale%>"/>
			<input type="hidden" name="procSpec" field="procSpec"/>
			<input type="hidden" id="templateType" name="templateType" value="<%=templateType%>"/>
			<input type="hidden" id="highLevelProcDefUniqueId" name="highLevelProcDefUniqueId" value="<%=highLevelProcDefUniqueId%>"/>
		</form>
		<iframe name="procEditor" id="procEditor" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"  width="100%" height="100%" src="<%=flexUrl%>"></iframe>
		</next:Html>
		</next:Panel>
		<input type="hidden" name="id" id="definitionId" field="id" value=""/>
		<input type="hidden" id="isHighLevel" field="isHighLevel" value="1"/>
		<input type="hidden" id="isHorizontal" field="isHorizontal" value="false"/>
	</body>
</html>

