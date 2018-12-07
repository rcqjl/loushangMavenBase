<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>

<html>
<head>
	<title><s:message code="cf.abt" text="表单操作类别"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.Validform_input {
			width: 55%;
		}
		.required {
			top: 0;
		}
		textarea.form-control {
			height: 62px;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
    <l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="btnTypeQueryDs" cmd="org.loushang.cform.btn.cmd.BtnTypeQueryCmd" method="queryBtnTypes">
			<model:record fromBean="org.loushang.cform.btn.data.BtnType"></model:record>
			<model:params>
				<model:param name="ID" value="${param.typeId }"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="typeName"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeName" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" errormsg="" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" data-bind="value: name">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group" style="display:none;">
	   		<label class="col-xs-3 col-md-3  text-right" for="createId"></label>
		    <div class="col-xs-8 col-md-8">
		    	<div class="checkbox">
		    		<label><input type="checkbox" id="createId" name="createId" value="1" checked/><s:message code="cf.generateid" text="自动生成ID"/></label>
		    	</div> 
		    </div>
	   </div>
	   <div class="form-group" style="display:none;">
	      <label class="col-xs-3 col-md-3  text-right" for="typeId">ID</label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeId" class="form-control ue-form" type="text" data-bind="value: id">
	      </div>
	   </div>
	   <div class="form-group">
	   	<label class="col-xs-3 col-md-3 text-right" for="isDisplay"><s:message code="cf.display" text="是否显示"/></label>
	   	<div class="col-xs-8 col-md-8">
	   		<div class="radio" id="isDisplay">
	   		</div>
	   	</div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="description"><s:message code="cf.description" text="描述"/></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="description" maxlength=100 class="form-control ue-form Validform_input" rows="2" datatype="*1-100" errormsg="" ignore="ignore" data-bind="value: description"></textarea>
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	   	<label class="col-xs-3 col-md-3 text-right"></label>
	   	<div class="col-xs-8 col-md-8">
	   		<button id="saveVal" type="button" class="btn ue-btn-primary"><s:message code="cf.save" text="保存"/></button>
	   		<button id="cancel" type="button" class="btn ue-btn"><s:message code="cf.cancel" text="取消"/></button>
	   	</div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
var typeId = "${param.typeId}";
var status = "${param.status}";
var childrenNum = "${param.childrenNum}";

function init(){
	// 加载枚举。
	initEnum();
	
	if(status == "new"){
		btnTypeQueryDs.newRecord();
		// 初始化“自动生成ID”事件。
		CFHelp.setCreateId(1, "createId", $("#typeName"), $("#typeId"), "blur");
		$("#isDisplay :radio[value=1]").prop("checked",true);
	}else{
		$("#createId").parent().hide();
		$("#typeId").prop("readonly", true);
		btnTypeQueryDs.load();
	}
	// “保存”按钮。
	$("#addform").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback: function(form){
			saveVal();
		}
	});
	// “取消”按钮。
	$("#cancel").click(function(){
		cancel();
	});
}

// 加载枚举。
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_DISPLAY");
	command.execute();
	var data = command.getData();
	// 组装options
	var options = "";
	for(var index = 0; index < data.length; index++) {
		var saveVal = data[index].value;
		var showVal = data[index].text;		
		var radio = "<label><input type='radio' value='"+saveVal+"' data-bind='checked:isDisplay'/>"+showVal+"</label> ";
		// 添加到页面。
		$("#isDisplay").append(radio);
	}
	
}

// 保存。
function saveVal() {
	var id = $("#typeId").val();
	var record = btnTypeQueryDs.getCurrent();
	record.set("id", id);
	if(status == "new") {
		record.set("displayOrder", Number(childrenNum) + 1);
	}
	if(!record.get("isDisplay")){
		record.set("isDisplay","1");
	}
	
	
	var command = new L5.Command("org.loushang.cform.btn.cmd.BtnTypeCmd");
	command.setParameter("records", [record]);
	command.execute("saveBtnTypes");
	
	if(command.error){
		$.sticky(
			    command.error.message,
			    {
			        autoclose : 1000, 
			        position :'center',
			        style :'error'
		    	}
		);
		return false;
	}else {
		dialog.close(record.data);
		dialog.remove();
		return false;
	}
}

// 取消
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>