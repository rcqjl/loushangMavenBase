<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<title><s:message code="cf.ab" text="表单操作按钮"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css"/>
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
    <l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,ui.js,knockout.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="btnDS" cmd="org.loushang.cform.btn.cmd.BtnQueryCmd" method="queryBtns">
			<model:record fromBean="org.loushang.cform.btn.data.Button"></model:record>
			<model:params>
				<model:param name="ACTION_ID" value="${param.actionId }"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="actionName"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="actionName" maxlength=32 class="form-control ue-form Validform_input" type="text" datatype="*1-32" errormsg="" nullmsg="<s:message code="cf.notnull" text="名称不能为空！"/>" data-bind="value: actionName">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	   		<label class="col-xs-3 col-md-3  text-right" for="createId"></label>
		    <div class="col-xs-8 col-md-8">
		    	<div class="checkbox">
		    		<label><input type="checkbox" id="createId" name="createId" value="1" checked/><s:message code="cf.generateid" text="自动生成ID"/></label>
		    	</div> 
		    </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="actionId">ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="actionId" class="form-control ue-form Validform_input" type="text" datatype="actionId" errormsg="" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" data-bind="value: actionId">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="functionName"><s:message code="cf.function" text="函数"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="functionName" class="form-control ue-form Validform_input" type="text" datatype="/.*\(\s*\)$/" errormsg="<s:message code="cf.endwith()" text="函数名必须以()结尾！"/>" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" data-bind="value: functionName">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="className"><s:message code="cf.classname" text="样式类名"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="className" class="form-control ue-form Validform_input" type="text" data-bind="value: className">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="description"><s:message code="cf.description" text="描述"/></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="description" maxlength=100 class="form-control ue-form Validform_input" rows="2" data-bind="value: description"></textarea>
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
var actionId = "${param.actionId}";
var typeId = "${param.typeId}";
var status = "${param.status}";

function L6Alert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}

function init(){
	if(status == "new"){
		btnDS.newRecord();
		// 初始化“自动生成ID”事件。
		CFHelp.setCreateId(1, "createId", $("#actionName"), $("#actionId"), "blur");
	}else{
		$("#createId").parents(".form-group").hide();
		$("#actionId").prop("readonly", true);
		$("#actionId").removeAttr("datatype");
		$("#actionId").removeAttr("nullmsg");
		$("#actionId").next("span").remove();
		btnDS.setParameter("start", 0);
		btnDS.setParameter("limit", 10);
		btnDS.load();
	}
	
	// “保存”按钮。
	$("#addform").Validform({
		btnSubmit:"#saveVal",
		tiptype:function(msg,o,cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip,o.type);
			objtip.text(msg);
		},
		datatype: {
			"actionId": validActionId
		},
		callback:function(form){
			saveVal();
		}
	});
	// 取消按钮。
	$("#cancel").click(function(){
		cancel();
	});
}

// 校验操作ID。
function validActionId(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("cf.letternum_", "请填写字母、数字或下划线！"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("cf.noheadnum", "不能以数字开头"));
		return false;
	}
	var command = new L5.Command("org.loushang.cform.btn.cmd.BtnQueryCmd");
	command.setParameter("ACTION_ID", gets);
	command.setParameter("start", 0);
	command.setParameter("limit", 10);
	command.execute("queryBtns");
	if(command.getData().length > 0) {
		obj.attr("errormsg", L.getLocaleMessage("cf.idexisted", "ID已存在!"));
		return false;
	}
	return true;
}

// 保存
function saveVal() {
	var id = $("#actionId").val();
	var record = btnDS.getCurrent();
	record.set("actionId", id);
	if(status == "new") {
		record.set("actionType", typeId);
	}
	
	var command = new L5.Command("org.loushang.cform.btn.cmd.BtnCmd");
	command.setParameter("records", [record]);
	command.execute("save");
	
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