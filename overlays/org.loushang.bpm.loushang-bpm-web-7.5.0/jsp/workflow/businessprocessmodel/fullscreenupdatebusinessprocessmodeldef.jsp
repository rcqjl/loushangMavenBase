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
			
			String flexUrl=rootUrl+"jsp/workflow/businessprocessmodel/BusinessProcessDesigner.html";
			// 模板类型
			String templateType=request.getParameter("templateType");
			// 关联高层业务流程定义唯一ID
			String highLevelProcDefUniqueId=request.getParameter("highLevelProcDefUniqueId");
		%>

		<title><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.008","业务流程设计工具")%></title>
		<next:ScriptManager></next:ScriptManager>
		<%String locale= ContextInfoUtil.getLocale();%>
		<script>
		var needConvertToExecuteLevel='<%=request.getParameter("needConvertToExecuteLevel")%>';
		function needConvertHighLevelToExecuteLevel()
		{
			return needConvertToExecuteLevel=="true";
		}
		function getIframeWindow(id){
			return document.getElementById(id).contentWindow || document.frames[id].window;
		}
		
		function executeUpdatePre()
		{
			getIframeWindow("procEditor").saveProcessPre("executeUpdate");
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
				alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.009", "流程定义修改成功！"));
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
    		executeUpdatePre();
		}
		
		function forwardToQueryPage()
		{
			var url = 'jsp/workflow/businessprocessmodel/querybusinessprocessmodeldef.jsp';
			var text = getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.027", '业务流程定义查询');
			L5.forward(url, text);
		}
		function init()
		{
			var procDefDataset=L5.DatasetMgr.lookup("procDefDataset");
			procDefDataset.setParameter("id",'<%=request.getParameter("id")%>');
			procDefDataset.load();
			//L5.getCmp("mainPanel").setHeight(screen.height-25);
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
		<model:dataset pageSize="20" id="procDefDataset" cmd="org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd" method="getBusinessProcessDefModelById">
			<model:record fromBean="org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcessDefModel"></model:record>
		</model:dataset>
	</model:datasets>
		
		<next:Panel id="mainPanel" height="100%">
		<next:Html>
		<form id="userForm" method="post" dataset="procDefDataset" onsubmit="return false"  class="L5form">						
			<input type="hidden" name="id" field="id" id="id" value="<%=request.getParameter("id")%>"/>
			<input type="hidden" name="procDefId" id="procDefId" field="procDefId" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.012","流程定义ID")%>'/>			
			<input type="hidden" name="procDefName" field="procDefName" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.013","流程定义名称")%>'/>	
			<input type="hidden" name="modelContent" field="modelContent" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.014","流程定义XPDL")%>'/>				
			<input type="hidden" name="extensionContent" field="extensionContent" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.015","流程定义XML内容")%>'/>		
			<input type="hidden" id="rootUrl" name="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.016","根路径")%>'  value="<%=rootUrl%>"/>	
			<input type="hidden" id="locale" name="locale" value="<%=locale%>"/>
			<input type="hidden" name="pluginType" field="pluginType" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.029","插件类型")%>'/>
			<input type="hidden" name="procSpec" field="procSpec" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.030","规范")%>'/>
			<input type="hidden" name="isHistory" field="isHistory" title='<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.031","是否历史版本")%>'/>
			<input type="hidden" name="templateType"  id="templateType" value="<%=templateType%>"/>
			<input type="hidden" name="highLevelProcDefUniqueId" id="highLevelProcDefUniqueId" value="<%=highLevelProcDefUniqueId%>"/>
		</form>
		<iframe name="procEditor" id="procEditor" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"  width="100%" height="100%" src="<%=flexUrl%>"></iframe>
		</next:Html>
		</next:Panel>
		<input type="hidden" name="id" id="definitionId" field="id" value="<%=request.getParameter("id")%>"/>
		<input type="hidden" id="isHighLevel" field="isHighLevel" value="1"/>
		<input type="hidden" id="isHorizontal" field="isHorizontal" value="false"/>
	</body>
</html>

