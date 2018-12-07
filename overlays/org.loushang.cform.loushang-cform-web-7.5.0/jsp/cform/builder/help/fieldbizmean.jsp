<!DOCTYPE html > 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.fieldbizmean" text="域业务含义"/></title>
		<link rel="stylesheet" href="../skin/css/ztree.css">
		<link rel="stylesheet" href="../skin/css/dialog.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css" />
		<style>
			/*重新定义高度的样式，解决ie中样式覆盖问题*/
			ul.treeUl {
				height: 390px;
			}
		</style>
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="../skin/js/jquery.ztree.js"></script>
		<script src="../skin/js/jquery.ztree.excheck.js"></script>
		<script src="../skin/js/jquery.ztree.exedit.js"></script>
		<script src="../skin/js/cform.showdialog.js"></script>
		<script type="text/javascript">var context = '<l:assetcontext/>';</script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/help/fieldbizmean.js"></script>
	</head>
	<body>
		<div class="leftFrame"><ul id="formTree" class="ztree treeUl"></ul></div>
		<div class="rightFrame"><ul id="bizMeanTree" class="ztree treeUl"></ul></div>
	</body>
</html>