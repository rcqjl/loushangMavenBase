<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model" %>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<resource:resource localeDir="ui.bpm.businessprocessmodel"></resource:resource>
<%ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.businessprocessmodel");%>
<html>
	<head>
		<title><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.001","流程定义增加")%></title>
		<next:ScriptManager></next:ScriptManager>
	</head>
	<body>
		<div align="center">
			<font color="red"><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.002","如果您没有看见设计界面说明您目前的浏览器设置阻止了将要弹出的设计界面！")%><br>
			<%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.003","解决方法为：将当前网站")%><b><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.004","设置为信任网站")%></b><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.005","或")%><b><%=res.getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.006","允许弹出当前网站弹出框！")%></b></font>
		</div>
		<script>
			var url=document.URL.replace("forinsertbusinessprocessmodeldef.jsp","fullscreeninsertbusinessprocessmodeldef.jsp");
			var ret=showModalDialog(url,window,"scroll:no;status:no;location:no;dialogWidth:"+screen.width+"px;dialogHeight:"+screen.height+"px");
			var url = 'jsp/workflow/businessprocessmodel/querybusinessprocessmodeldef.jsp';
			var text = getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.027", '业务流程定义查询');
			L5.forward(url, text);
		</script>
	</body>
</html>

