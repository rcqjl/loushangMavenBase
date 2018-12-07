<!DOCTYPE html > 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.fieldp" text="域属性"/></title>
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/dialog.css">
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
	</head>
	<body>
		<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected"><s:message code="cf.bdr.basicprop" text="基本属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="名称"  maxlength="100"  class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="定义ID"  maxlength="30"  class="cfIsRequired cfNotStartWithNum"></input></li>				
				</ul>
			</div>
		</div>
		<div class="foot">
				<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
	$(function() {
		// 默认自动生成ID
		CFHelp.setCreateId('1', 'createId', $('#fieldName'), $('#fieldId'), 'blur');
		
		$('#confirmBtn').click(function(){
			//校验
			if(!CFHelp.validate()){
				return;
			}
			var fieldId = $("#fieldId").val();
			var fieldName = $("#fieldName").val();
			var isCreateId = $('#createId').is(':checked') ? '1' : '0';

			// 返回值
			var obj = new Object();
			obj.fieldId = fieldId;
			obj.fieldName = fieldName;
			obj.isCreateId = isCreateId;

			// 关闭弹出框
			closeDialog(obj);
		});
	});

	</script>
</html>