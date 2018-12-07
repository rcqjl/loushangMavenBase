<!DOCTYPE html > 
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>域属性</title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/help.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/dialog.css">
		<script src="<%=request.getContextPath()%>/jsp/cportal/skin/js/jquery.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/pinyin.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.showdialog.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.help.js"></script>
	</head>
	<body>
		<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected">
				<spring:message code="cportal.basicAttribute" text="基本属性"/>
				</li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName">
					<spring:message code="cportal.name" text="名称"/>
					</label><input type="text" id="fieldName" name="名称"  maxlength="100"  class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;">自动生成ID</label></li>				
					<li><label for="fieldId">定义ID
					<spring:message code="cportal.id" text="定义ID"/>
					</label><input type="text" id="fieldId" name="定义ID"  maxlength="30"  class="cfIsRequired cfNotStartWithNum"></input></li>				
				</ul>
			</div>
		</div>
		<div class="foot">
				<a href="javascript:void(0);" id="confirmBtn" class="cportalhelp-confirmbtn"></a>
		</div>
	</body>
	<script type="text/javascript">
	$(function() {
		// 默认自动生成ID
		CPHelp.setCreateId('1', 'createId', $('#fieldName'), $('#fieldId'), 'blur');
		
		$('#confirmBtn').click(function(){
			//校验
			if(!CPHelp.validate()){
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