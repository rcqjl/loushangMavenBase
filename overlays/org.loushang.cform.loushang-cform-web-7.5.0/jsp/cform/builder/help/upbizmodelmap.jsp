<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.bdr.upmapping" text="上行映射"/></title>
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/ztree.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/dialog.css">
		<style type="text/css">
			ul.ztree {
				height: 415px;
			}
		</style>
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/jquery.ztree.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/jquery.ztree.excheck.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/jquery.ztree.exedit.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/help/upbizmodelmap.js"></script>
	</head>
	<body>
		<div style="height:425px;">
			<div class="leftFrame"><ul id="sourceTreeContainer" class="ztree"></ul></div>
			<div class="rightFrame"><ul id="targetTreeContainer" class="ztree"></ul></div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script>
	var context = '<l:assetcontext/>';
	</script>
</html>