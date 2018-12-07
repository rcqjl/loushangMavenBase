<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.widget.textk" text="文本框属性"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css" />
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
		<script type="text/javascript">
			var context = '<%=request.getContextPath()%>';			
		</script>
		<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/pinyin.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/cform.help.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
	</head>
	<body>
		<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected"><s:message code="cf.bdr.basicprop" text="基本属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="<s:message code="cf.widget.fieldname" text="域名称"/>" class="cfIsRequired" ></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="<s:message code="cf.widget.fieldid" text="域ID"/>" class="cfIsRequired cfNotStartWithNum"></input></li>				
				</ul>
			</div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
		// 从父窗口传递来的值
		var fromParent = null;
		$(function(){
			// 从父窗口传递来的值
			fromParent = window.parent.document.getElementById("popupFrame").inParam;
			
			CFHelp.setCreateId(fromParent.isCreateId, 'createId', $('#fieldName'), $('#fieldId'), 'blur');
			
			initPage(fromParent);

			/**
			* 确定按钮处理
			*/
			$('#confirmBtn').click(function(){
				//校验
				if(!CFHelp.validate()){
					return;
				}
				// 域ID
				var fieldId = $("#fieldId").val();
				// 域名称
				var fieldName = $("#fieldName").val();
				//是否自动生成ID
				var isCreateId = $('#createId').is(':checked') ? '1' : '0';
				
				// 返回值
				var obj = {
					fieldId : fieldId,
					fieldName : fieldName,
					isCreateId : isCreateId
				};
				
				// 关闭弹出框
				closeDialog(obj);
			});

			/**
			* 初始化控件的值
			*/
			function initPage(fromParent){
				if (fromParent.fieldId) {
					$("#fieldId").val(fromParent.fieldId);
				}
				if (fromParent.fieldName) {
					$("#fieldName").val(fromParent.fieldName);
				}
			};
		});
	</script>
</html>
