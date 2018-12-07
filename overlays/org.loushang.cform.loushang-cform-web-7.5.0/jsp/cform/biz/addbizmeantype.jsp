<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><s:message code="cf.bmt" text="业务含义类别"/></title>
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
    <l:script path="jquery.js,form.js,bootstrap.js,l5-adapter.js,ui.js,knockout.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="bizMeanTypeDs" cmd="org.loushang.cform.biz.cmd.BizMeanTypeQueryCmd" method="queryBizMeanTypes">
			<model:record fromBean="org.loushang.cform.biz.data.BizMeanType"></model:record>
			<model:params>
				<model:param name="ID" value="${param.typeId }"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="typeName"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeName" maxlength=100 class="form-control ue-form Validform_input" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" errormsg="" type="text" data-bind="value: name">
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
	      <label class="col-xs-3 col-md-3  text-right" for="typeId">ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeId" maxlength=32 class="form-control ue-form Validform_input" type="text" datatype="typeId" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" errormsg="" data-bind="value: id">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	   	<label class="col-xs-3 col-md-3 text-right" for="isDisplay"><s:message code="cf.display" text="是否显示"/></label>
	   	<div class="col-xs-8 col-md-8">
	   		<div class="radio" id="isDisplay"></div>
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

function init(){
	// 加载枚举
	initEnum();
	
	if(status == "new"){
		bizMeanTypeDs.newRecord();
		// 初始化“自动生成ID”事件
		CFHelp.setCreateId(1, "createId", $("#typeName"), $("#typeId"), "blur");
		$("#isDisplay :radio[value=1]").prop("checked", true);
	}else{
		$("#createId").parents(".form-group").hide();
		$("#typeId").prop("readonly", true);
		$("#typeId").removeAttr("datatype");
		$("#typeId").removeAttr("nullmsg");
		$("#typeId").next("span").remove();
		bizMeanTypeDs.load();
	}
	// “保存”按钮
	$("#addform").Validform({
		btnSubmit:"#saveVal",
		tiptype:function(msg,o,cssctl){
			var objtip=o.obj.siblings(".Validform_checktip");
			cssctl(objtip,o.type);
			objtip.text(msg);
		},
		callback:function(form){
			saveVal();
		},
		datatype:{
			"typeId": ValidTypeId
		}
	});
	$("#cancel").click(function(){
		cancel();
	});
}

// 弹窗样式
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
// 国际化。
function m(code, defMsg) {
	return L.getLocaleMessage(code, defMsg);
}

// 校验ID
function ValidTypeId(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", m("cf.letternum_", "请填写字母、数字或下划线！"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", m("cf.noheadnum", "不能以数字开头"));
		return false;
	}
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizMeanTypeQueryCmd");
	command.setParameter("ID", gets);
	command.execute("queryBizMeanTypes");
	if(command.getData().length > 0) {
		obj.attr("errormsg", m("cf.idexisted", "ID已存在!"));
		return false;
	}
	return true;
}

// 加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_DISPLAY");
	command.execute();
	var data = command.getData();
	// 组装options
	var options = "";
	for(var index = 0; index < data.length; index++){
		var saveVal = data[index].value;
		var showVal = data[index].text;	
		var radio = "<label><input type=radio value='"+saveVal+"' data-bind='checked:isDisplay'/>"+showVal+"</label> ";
		// 添加到页面
		$("#isDisplay").append(radio);
	}
}

// 保存
function saveVal() {
	var id = $("#typeId").val();
	var record = bizMeanTypeDs.getCurrent();
	record.set("id", id);
	if(!record.get("isDisplay")){
		record.set("isDisplay", "1");
	}
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizMeanTypeCmd");
	command.setParameter("records", [record]);
	command.execute("saveBizMeanTypes");
	
	if(command.error){
		sticky(command.error.messages, "error");
		return false;
	}else {
		dialog.close(record.data);
		dialog.remove();
		return false;
	}
}
// 取消
function cancel(){
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>