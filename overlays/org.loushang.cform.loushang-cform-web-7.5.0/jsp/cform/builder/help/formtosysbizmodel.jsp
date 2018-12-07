<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.bdr.form2model" text="表单-业务模型"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/ztree.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
		<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/jquery.ztree.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/jquery.ztree.excheck.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/jquery.ztree.exedit.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/help/formtosysbizmodel.js"></script>
	</head>
	<body>
		<div>
			<div class="leftFrame"><ul id="formTreeContainer" class="ztree"></ul></div>
			<div class="rightFrame"><ul id="bizModelTreeContainer" class="ztree"></ul></div>
		</div>
	</body>
<script>
var context = '<%=request.getContextPath()%>';
$(function() {	
	// 组装表单树
	initFormTree();
	
	// 组装业务表树
	initBizModelTree();	
});
</script>
</html>