<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><s:message code="cf.bm" text="业务模型"/></title>
	
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
	</style>
	
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="bizModelDS" cmd="org.loushang.cform.biz.cmd.BizModelQueryCmd" method="queryBizModels">
			<model:record fromBean="org.loushang.cform.biz.data.BizModel"></model:record>
			<model:params>
				<model:param name="MODEL_ID" value="${param.modelId}"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelName"><s:message code="cf.alias" text="别名"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="modelName" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="别名不能为空！"/>" errormsg="" data-bind="value: modelName">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
			<label class="col-xs-3 col-md-3  text-right" for="createId"></label>
			<div class="col-xs-8 col-md-8">
				<div class="checkbox">
					<label><input type="checkbox" id="createId" name="createId" value="1" checked/><s:message code="cf.generatetn" text="自动生成表名"/></label>
				</div>
			</div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelId"><s:message code="cf.tn" text="表名"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="modelId" maxlength=30 class="form-control ue-form Validform_input" type="text" datatype="modelId" nullmsg="<s:message code="cf.notnull" text="表名不能为空！"/>" errormsg="" data-bind="value: modelId">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="parentModelId"><s:message code="cf.masterform" text="所属主表"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<input id="parentModelId" class="form-control ue-form Validform_input" data-bind="value: parentModelId" datatype="parentModelId" ignore="ignore"/>
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
var status = "${param.status}";
var modelId = "${param.modelId}";
var bizModelType = "${param.bizModelType}";
var dsId = "${param.dsId}";
// 弹窗样式。
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	var param = {
	        autoclose : 1000, 
	        position : place,
	        style : type
	    }
	$.sticky(msg, param);
}
function init() {
	if(status == "new"){
		bizModelDS.newRecord();
		CFHelp.setCreateId(1, "createId", $("#modelName"), $("#modelId"), "blur");
	} else {
		$("#createId").parents(".form-group").hide();
		$("#modelId").prop("readonly", true);
		$("#parentModelId").prop("readonly", true);
		$("#modelId").removeAttr("datatype");
		$("#parentModelId").removeAttr("datatype");
		$("#modelId").removeAttr("nullmsg");
		$("#modelId").next("span").remove();
		bizModelDS.setParameter("start", 0);
		bizModelDS.setParameter("limit", 10);
		bizModelDS.load();
	}

	// 保存按钮。
	$("#addform").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o,cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback: function(form){
			saveVal();
		},
		datatype: {
			"modelId": ValidModelId,
			"parentModelId": ValidParentModelName
		}
	});
	// 取消按钮。
	$("#cancel").click(function(){
		cancel();
	});
}

// 校验ID。
function ValidModelId(gets, obj, curform, regxp) {
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelQueryCmd");
	command.setParameter("MODEL_ID",gets);
	command.setParameter("start", 0);
	command.setParameter("limit", 10);
	command.execute("queryBizModels");
	if(command.getData().length>0) {
		obj.attr("errormsg",L.getLocaleMessage("cf.te", "表名已存在"));
		return false;
	}
	return true;
}
// 校验ID。
function ValidParentModelName(gets, obj, curform, regxp) {
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelQueryCmd");
	command.setParameter("MODEL_ID",gets);
	command.setParameter("start", 0);
	command.setParameter("limit", 10);
	command.execute("queryBizModels");
	if(command.getData().length<=0) {
		obj.attr("errormsg","表名不存在");
		return false
	}
	return true;
}

// 保存。
function saveVal() {
	var record = bizModelDS.getCurrent();
	record.set("bizModelType", bizModelType);
	record.set("modelType", "1");
	record.set("modelId", $("#modelId").val());
	if(dsId!=""&&dsId!="null"){
	record.set("dsId",dsId);
	}
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelCmd");
	command.setParameter("records", [record]);
	command.execute("save");
	
	if(command.error){
		sticky(command.error.message,'error');
		return false;
	}else {
		dialog.close(true);
		dialog.remove();
		return false;
	}
}

// 取消。
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>