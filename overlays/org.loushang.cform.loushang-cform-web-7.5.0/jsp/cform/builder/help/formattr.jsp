<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
<title><l:assetcontext/><s:message code="cf.bdr.fp" text="表单属性"/></title>
<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css">
<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/dialog.css">
<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
<l:script path="i18n.js"/>
<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected"><s:message code="cf.bdr.basicprop" text="基本属性"/></li>
				<li><s:message code="cf.bdr.advancedprop" text="高级属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="formName"><s:message code="cf.bdr.fname" text="表单名称"/></label><input type="text" id="formName" maxlength="100" name="表单名称" class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="formId"><s:message code="cf.formid" text="表单定义ID"/></label><input type="text" id="formId" maxlength="30" name="<s:message code="cf.formid" text="表单定义ID"/>" class="cfIsRequired cfNotStartWithNum"></input></li>				
				</ul>
			</div>
			
			<div id="advancedAttrDiv" class="ui-tabs-panel ui-tabs-hide">
				<ul>
					<li><label class="rightLabel" for="isTemplate" style="display:inline;"><input type="checkbox" id="isTemplate" name="isTemplate" style="display:inline;"/>&nbsp;<s:message code="cf.bdr.istemplate" text="是否为表单模板"/></label></li>
					<li><span id="isTemplateSpan" style="color:red;font-size:11px;display:none;"><s:message code="cf.bdr.containstemp" text="表单中存在模板表单，不能再做为模板表单！"/></span></li>
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
	</div>
</body>
<script>
$(function() {
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;
	CFHelp.setCreateId(obj.isCreateId, 'createId', $('#formName'), $('#formId'), 'blur');
	
	if(obj.formId){
		$("#formId").val(obj.formId);
	}
	
	if(obj.formName){
		$("#formName").val(obj.formName);
	}
	
	//修改表单时，不能修改表单ID
	if(obj.hideFormId == "1"){
		$("#createId").attr('checked', false);
		$("#baseAttrDiv ul li:eq(1)").hide();
		$("#baseAttrDiv ul li:eq(2)").hide();
	}
	
	// 如果表单中存在模板表单，则不能再设置成模板表单
	if(obj.hasTemplate){
		$("#isTemplate").parent().attr("disabled", true);
		$("#isTemplateSpan").show();
	}
		
	//是否为模板标单
	if(obj.isTemplate == "1"){
		$("#isTemplate").attr('checked', true);
	}

	function isExistHandler(d){
		if(d == "true"){
			var msg = L.getLocaleMessage("cf.bdr.formormodelidexist", "表单或业务模型ID已经存在！")
			cfalert(msg);
			return;
		}else{
			saveForm();
		}
	};

	function saveForm(){
		// 表单定义ID
		var formId = $("#formId").val();
		// 表单名称
		var formName = $("#formName").val();
		//是否自动生成ID
		var isCreateId = $('#createId').is(':checked') ? '1' : '0';
		
		//是否为表单模板
		var isTemplate = $('#isTemplate').is(':checked') ? '1' : '0';
		if(!CFHelp.validate()){
			return;
		}
		
		var obj=new Object();

		obj.formId=formId;
		obj.formName=formName;
		obj.isCreateId = isCreateId;
		obj.isTemplate = isTemplate;
		
		// 关闭弹出框
		closeDialog(obj);
	}
	
	$('#confirmBtn').click(function(){
		var newFormId = $('#formId').val();
		if(obj.hideFormId == "0"){
			$.ajax({
				url: "<l:assetcontext/>/command/dispatcher/"
					+ "org.loushang.cform.form.cmd.FormDispatcherCmd/"
					+ "isExist",
				data: "formId=" + newFormId,
				success: isExistHandler
			});
		}else{
			if(obj.isCreateId && obj.isCreateId == '1'){
				$('#createId').attr('checked', true);
			}
			saveForm();
		}
	});
});

</script>
</html>