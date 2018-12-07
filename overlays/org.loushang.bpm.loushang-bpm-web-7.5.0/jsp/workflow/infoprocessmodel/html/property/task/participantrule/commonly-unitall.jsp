<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
%>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.extend.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.ztree.exedit-3.5.min.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/task/participantrule/commonunitall.js"></script>

<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/zTreeStyle/zTreeStyle.css">

<style type="text/css">
.ztree{
	margin-top:10px;
}
.ztree li span.button.corpType_ico_open{
	margin-right:2px; 
	background-position:-14px -73px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.corpType_ico_close{
	margin-right:2px; 
	background-position:-14px -73px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.deptType_ico_open{
	margin-right:2px; 
	background-position:-14px -73px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.deptType_ico_close{
	margin-right:2px; 
	background-position:-17px -153px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.postType_ico_open{
	margin-right:2px; 
	background-position:-14px -73px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.postType_ico_close{
	margin-right:2px; 
	background-position:-17px -153px;
	vertical-align:top;
	*vertical-align:middle
}

.ztree li span.button.corpType_ico_docu{
	margin-right:2px; 
	background-position:-37px -115px;
	vertical-align:top; 
	*vertical-align:middle;
}
.ztree li span.button.deptType_ico_docu{
	margin-right:2px; 
	background-position:-37px -115px;
	vertical-align:top; 
	*vertical-align:middle;
}
.ztree li span.button.postType_ico_docu{
	margin-right:2px; 
	background-position:-37px -115px;
	vertical-align:top; 
	*vertical-align:middle;
}
.ztree li span.button.empType_ico_docu{
	margin-right:2px; 
	background-position:-37px -115px;
	vertical-align:top; 
	*vertical-align:middle;
}
.ztree li span.button.defaultType_ico_docu{
	margin-right:2px; 
	background-position:-37px -115px;
	vertical-align:top; 
	*vertical-align:middle;
}

</style>

<script type="text/javascript">
if(typeof WFlow=="undefined") WFlow={};
WFlow.webPath = '<%=webPath %>';
WFlow.fullWebPath = '<%=fullWebPath %>';
</script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="apple-mobile-web-app-capable" content="yes" />

<title><spring:message code="BPM.INFOPROCESSMODEL.D073" text="组织机构下所有人" /></title>
</head>
<body>
	<div id="unitallDiv" class="treeDiv">
		<div id="unitallContext" class="ztree" style="margin-left:-15px; float:left;">
		</div>
    </div>
</body>
</html>