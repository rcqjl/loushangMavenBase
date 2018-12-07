<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.widget.radioattr" text="单选框控件属性"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css" />
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
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
				<li><s:message code="cf.widget.groupattr" text="组属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li>
						<label for="fieldName"><s:message code="cf.widget.showvalue" text="显示值"/></label><input type="text" id="displayValue" name="显示值" class="cfIsRequired"></input>
					</li>				
				
					<li><label for="bizMean"><s:message code="cf.widget.savevalue" text="保存值"/></label><input type="text" id="saveValue" name="保存值" class="cfIsRequired"></input>
					</li>
					<li>
						<input type="checkbox" id="isSelected" name="isSelected" style="display:inline;"/><label for="isSelected"><s:message code="cf.widget.defaultvalue" text="默认选中"/></label>
					</li>				
				</ul>
			</div>
			<div id="groupAttrDiv" class="ui-tabs-panel ui-tabs-hide">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="<s:message code="cf.name" text="名称"/>" class="cfIsRequired"></input></li>
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="ID" class="cfIsRequired cfNotStartWithNum"></input></li>
				</ul>
			</div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
<script>
$(function() {
	var context = '<%=request.getContextPath()%>';
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;

	CFHelp.setCreateId(obj.isCreateId, 'createId', $('#fieldName'), $('#fieldId'), 'blur');
	initPage(obj);

	/**
	* 确定按钮处理
	*/
	$('#confirmBtn').click(function(){
		//校验
		if(!CFHelp.validate()){
			return;
		}
		//显示值
		var displayValue = $("#displayValue").val();
		//保存值
		var saveValue= $("#saveValue").val();
		// 组ID
		var groupId = $("#fieldId").val();
		// 组名称
		var groupName = $("#fieldName").val();

		var isSelected = false;
		if($("#isSelected").is(":checked")){
			isSelected = true; 
		}

		//是否自动生成ID
		var isCreateId = $('#createId').is(':checked') ? '1' : '0';

		// 返回值
		var obj = new Object();
		
		obj.displayValue=displayValue;
		obj.saveValue=saveValue;
		obj.groupId = groupId;
		obj.groupName = groupName;
		obj.isSelected = isSelected;
		obj.isCreateId = isCreateId;
		
		// 关闭弹出框
		closeDialog(obj);
	});
	
	function initPage(obj){
		if(obj.displayValue){
			$("#displayValue").val(obj.displayValue);
		}
		
		if(obj.saveValue){
			$("#saveValue").val(obj.saveValue);
		}

		if(obj.isSelected){
			$("#isSelected").attr("checked", true);
		}
		
		if (obj.groupId) {
			$("#fieldId").val(obj.groupId);
		}

		if (obj.groupName) {
			$("#fieldName").val(obj.groupName);
		}
	};
});
</script>
</html>