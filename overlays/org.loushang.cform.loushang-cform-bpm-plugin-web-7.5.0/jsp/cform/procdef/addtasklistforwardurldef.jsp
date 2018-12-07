<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<title><s:message code="cf.relativepath" text="任务跳转路径定义"/></title>
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
    <l:script path="jquery.js,form.js,bootstrap.js,ui.js,l5-adapter.js,knockout.js"/>
</head>
<body>
	<model:datasets>
		<model:dataset id="taskListForwardUrlDefQueryDataset" 
						cmd="org.loushang.cform.procdef.cmd.TaskListForwardUrlDefQueryCmd" 
						method="queryTaskListForwardUrlDefs">
			<model:record fromBean="org.loushang.cform.procdef.data.TaskListForwardUrl"></model:record>
			<model:params>
				<model:param name="ID" value="${param.id }"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="forwardType"><s:message code="cf.forwardtype" text="跳转类型"/></label>
	      <div class="col-xs-8 col-md-8">
	         <select id="forwardType" class="form-control ue-form Validform_input" data-bind="value: forwardType"></select>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="forwardValue"><s:message code="cf.forwardtypev" text="跳转类型值"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="forwardValue" class="form-control ue-form Validform_input" type="text" data-bind="value: forwardValue">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="taskType"><s:message code="cf.tasktype" text="任务类型"/></label>
	      <div class="col-xs-8 col-md-8">
	         <select id="taskType" class="form-control ue-form Validform_input" data-bind="value: taskType"></select>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="appCode"><s:message code="cf.appcode" text="应用编码"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="appCode" class="form-control ue-form Validform_input" type="text" data-bind="value: appCode">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="relativePath"><s:message code="cf.relativepath" text="跳转路径"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="relativePath" maxlength=512 class="form-control ue-form Validform_input" rows="2" datatype="*" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" data-bind="value: relativePath"></textarea>
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
var status = "${parm.status}";
var type = "${param.type}";

function init() {
	// 加载枚举
	initEnum();
	
	if(status == "new") {
		taskListForwardUrlDefQueryDataset.newRecord();
		if(type) {
			$("#forwardType").val(type);
		}
	}else{
		taskListForwardUrlDefQueryDataset.load();
	}
	// “保存”按钮
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
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
}

// 加载枚举值。
function initEnum() {
	var enumFields = [
	                  {
	                	  enumName: "CFORM_BPM.TASK_LIST_FORWARD_TYPE",
	                	  fieldId: "forwardType"
	                  },
	                  {
	                	  enumName: "CFORM_BPM.FORWARD_TASK_TYPE",
	                	  fieldId: "taskType"
	                  }
	                 ];
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	for(index in enumFields) {
		command.setParameter("enumName", enumFields[index].enumName);
		command.execute();
		var data = command.getData();
		// 组装options
		var options = "";
		for(var i = 0; i < data.length; i++){
			var saveVal = data[i].value;
			var showVal = data[i].text;		
			var option = "<option value='" + saveVal + "'>" + showVal + "</option>";
			$("#" + enumFields[index].fieldId).append(option);
		}
	}
}

// 保存
function saveVal() {
	var record = taskListForwardUrlDefQueryDataset.getCurrent();
	record.set("forwardType", $("#forwardType").val());
	var command = new L5.Command("org.loushang.cform.procdef.cmd.TaskListForwardUrlDefCmd");
	command.setParameter("records", [record]);
	command.execute("saveTaskListForwardUrlDefs");
	
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