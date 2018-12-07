<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<title><s:message code="BPM.INFOPROCESSMODEL.D225" text="新增流程类别"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/validform.css"/>
	<style type="text/css">
		.col-xs-8  {
			width: 75%;
		}
		.Validform_input {
			width: 48%;
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
	<script src="<l:assetcontext/>/jsp/workflow/processtype/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/workflow/processtype/help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="processTypeDs" cmd="org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd" method="execute">
			<model:record fromBean="org.loushang.workflow.processtype.data.ProcessType"></model:record>
			<model:params>
				<model:param name="TYPE_ID" value="${param.typeId}"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="parentTypeName"><s:message code="BPM.INFOPROCESSMODEL.D222" text="父类别"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="parentTypeName" value="${param.parentName}" class="form-control ue-form Validform_input" readonly>
	         <input id="parentId" hidden="hidden" data-bind="value: parentId">
	         <input id="level" hidden="hidden" data-bind="value: level">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="typeName"><s:message code="BPM.INFOPROCESSMODEL.D223" text="类别名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeName" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="BPM.INFOPROCESSMODEL.D157" text="类别名称不能为空！"/>" data-bind="value: typeName">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
			<label class="col-xs-3 col-md-3  text-right" for="createId"></label>
			<div class="col-xs-8 col-md-8">
				<div class="checkbox">
					<label><input type="checkbox" id="createId" name="createId" value="1" checked/><s:message code="BPM.INFOPROCESSMODEL.D224" text="自动生成ID"/></label>
				</div>
			</div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="typeId">ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeId" maxlength=32 class="form-control ue-form Validform_input" type="text" datatype="typeId" errormsg="<s:message code="BPM.PROCESSTYPE.Tip9" text="ID已存在"/>" nullmsg="<s:message code="BPM.PROCESSTYPE.Tip8" text="不能为空！"/>" data-bind="value: typeId">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="description"><s:message code="BPM.CONFIG.Description" text="描述"/></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="description" maxlength=100 class="form-control ue-form Validform_input" rows="2" data-bind="value: description"></textarea>
	         <span class="Validform_checktip Validfrom_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-8 col-md-8">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><s:message code="BPM.PROCESSTYPE.Save" text="保存"/></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><s:message code="BPM.PROCESSTYPE.Cancel" text="取消"/></button>
	      </div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var typeId = "${param.typeId}";
var parentId = "${param.parentId}";
var level = "${param.level}";
var parentName = "${param.parentName}";
var status = "${param.status}";
var dialog = parent.dialog.get(window);

function init(){
	if(status == "new"){
		processTypeDs.newRecord();
		// 初始化“自动生成ID”事件
		WFHelp.setCreateId(1, "createId", $("#typeName"), $("#typeId"), "blur");
	}else{
		processTypeDs.load();
		$("#createId").parents(".form-group").hide();
		$("#typeId").prop("readonly", true);
		$("#typeId").removeAttr("datatype");
		$("#typeId").removeAttr("nullmsg");
		$("#typeId").next("span").remove();
	}
	// 校验
	$("#addform").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback: function(form){
			saveVal();
		},
		datatype: {
			"typeId": ValidTypeId
		}
	});
	
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
}

// 校验ID
function ValidTypeId(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip12", "请填写字母、数字或下划线！"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip13", "不能以数字开头"));
		return false;
	}
	var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd");
	command.setParameter("TYPE_ID", gets);
	command.execute("execute");
	if(command.getData().length > 0) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip9", "ID已存在"));
		return false;
	}
	return true;
}

// 保存
function saveVal() {
	var record = processTypeDs.getCurrent();
	var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeCmd");
	
	if(status == "new"){
		record.set("typeId", $("#typeId").val());
		record.set("parentId", parentId);
		record.set("level", level);
		command.setParameter("struRecord", record);
		command.execute("insertProcessType");
	}else {
		command.setParameter("struRecord", record);
		command.execute("updateProcessType");
	}
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