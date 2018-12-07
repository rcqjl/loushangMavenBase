<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="org.loushang.next.i18n.ResourceBundle" %>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.common");
%>
<html>
<head>
<title>js调试设置页面</title>
<next:ScriptManager></next:ScriptManager>
<resource:resource localeDir="ui.common"></resource:resource>
<script language="javascript">
function init(){
	var debug=L5.get("debugger");
	if(L5.getDebug()){
		debug.dom.firstChild.nodeValue=getLocaleMsg("UI.COMMON.006","关闭调试");
	}else{
		debug.dom.firstChild.nodeValue=getLocaleMsg("UI.COMMON.007","开启调试");
	}
}
function debug(){
	var debug=L5.get("debugger");
	if(debug.dom.firstChild.nodeValue==getLocaleMsg("UI.COMMON.007","开启调试")){
		L5.setDebug(true);
		debug.dom.firstChild.nodeValue=getLocaleMsg("UI.COMMON.006","关闭调试");
	}else{
		L5.setDebug(false);
		debug.dom.firstChild.nodeValue=getLocaleMsg("UI.COMMON.007","开启调试");
	}
}
</script>
</head>
<body>
<button id="debugger" name="debugger" onclick="debug()">开启调试</button>

</body>
</html>