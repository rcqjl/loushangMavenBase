<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.workflow.util.ContextInfoUtil"%>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<resource:resource localeDir="ui.bpm.analysis"></resource:resource>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.analysis");
String version=request.getParameter("version");
if(version==null)
	version="";
%>
<html>
<head>
<title><%=res.getLocaleMsg("UI.BPM.ANALYSIS.001","人员绩效分析") %></title>
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
<%	String chartCategory = "allparticipantperformancecompare";
	String organ_ids="";
	String organ_names="";

	StringBuffer sb = new StringBuffer();
	sb.append(request.getScheme());
	sb.append("://");
	sb.append(request.getServerName());
	sb.append(":");
	sb.append(request.getServerPort());
	sb.append(request.getContextPath());
	sb.append("/");
	String rootUrl = sb.toString();
	String flexUrl=rootUrl+"jsp/workflow/analysis/performance/WorkFlowChart.html";
%>
<next:Panel id="procAnalysis" height="100%">
	<next:Html>
		<form  name="frmList"  action="" class="L5form">					
			<input type="hidden" name="rootUrl" id="rootUrl" title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.002","根路径")%>'  value="<%=rootUrl%>"/>	
			<input type="hidden" name="chartCategory" id="chartCategory" title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.003","图表类别")%>'  value="<%=chartCategory%>"/>
			<input type="hidden" name="locale"  id="locale" value="<%=ContextInfoUtil.getLocale()%>"/>	
		</form>
		<iframe name="wfCharEditor" frameborder="1" marginheight="0" marginwidth="0" scrolling="no" width="100%" height="100%" src="<%=flexUrl%>"></iframe>
	</next:Html>
</next:Panel>
</body>
<script type="text/javascript">
function init(){
	var version='<%=version%>';
	var procAnalysis=document.getElementById('procAnalysis');
	if(version=='l6'){
		procAnalysis.style.marginLeft='24px';
		procAnalysis.style.marginRight='24px';
	}else{
		procAnalysis.style.width='100%';
	}
}
</script>
</html>