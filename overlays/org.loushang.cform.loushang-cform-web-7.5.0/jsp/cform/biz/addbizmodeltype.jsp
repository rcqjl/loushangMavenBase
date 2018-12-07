<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<title><s:message code="cf.bmt" text="业务表类别"/></title>
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
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="bizModelTypeDs" cmd="org.loushang.cform.biz.cmd.BizModelTypeQueryCmd" method="queryBizModelTypes">
			<model:record fromBean="org.loushang.cform.biz.data.BizModelType"></model:record>
			<model:params>
				<model:param name="ID" value="${param.typeId}"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="parentTypeName"><s:message code="cf.superior" text="父类别"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="parentTypeName" value="${param.parentName }" class="form-control ue-form Validform_input" readonly>
	         <input id="parentId" hidden="hidden" data-bind="value: parentId">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="typeName"><s:message code="cf.name" text="类别名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeName" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="类别名称不能为空！"/>" errormsg="" data-bind="value: name">
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
	      <label class="col-xs-3 col-md-3 text-right" for="typeId">ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeId" maxlength=32 class="form-control ue-form Validform_input" type="text" datatype="typeId" errormsg="" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" data-bind="value: id">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="description"><s:message code="cf.description" text="描述"/></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="description" maxlength=100 class="form-control ue-form Validform_input" rows="2" data-bind="value: description"></textarea>
	         <span class="Validform_checktip Validfrom_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-8 col-md-8">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><s:message code="cf.save" text="保存"/></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><s:message code="cf.cancel" text="取消"/></button>
	      </div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var typeId = "${param.typeId}";
var parentId = "${param.parentId}";
var parentName = "${param.parentName}";
var status = "${param.status}";
var dialog = parent.dialog.get(window);

function init(){
	if(status == "new"){
		bizModelTypeDs.newRecord();
		// 初始化“自动生成ID”事件
		CFHelp.setCreateId(1, "createId", $("#typeName"), $("#typeId"), "blur");
	}else{
		bizModelTypeDs.load();
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

// 校验ID。
function ValidTypeId(gets, obj, curform, regxp) {
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelTypeQueryCmd");
	command.setParameter("ID", gets);
	command.execute("queryBizModelTypes");
	if(command.getData().length > 0) {
		obj.attr("errormsg", L.getLocaleMessage("cf.idexisted", "ID已存在"));
		return false;
	}
	return true;
}

// 保存
function saveVal() {
	var record = bizModelTypeDs.getCurrent();
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelTypeCmd");
	if(status == "new"){
		record.set("id", $("#typeId").val());
		record.set("parentId", parentId);
		
		command.setParameter("record", record);
		command.execute("insert");
	}else {
		command.setParameter("record", record);
		command.execute("update");
	}
	if(command.error){
		$.sticky(
			    command.error.msg,
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