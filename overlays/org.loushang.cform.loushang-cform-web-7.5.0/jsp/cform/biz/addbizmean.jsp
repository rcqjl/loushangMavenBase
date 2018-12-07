<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><s:message code="cf.bizmean" text="业务含义"/></title>
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
    <l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="bizMeanDS" cmd="org.loushang.cform.biz.cmd.BizMeanQueryCmd" method="queryBizMeans">
			<model:record fromBean="org.loushang.cform.biz.data.BizMean"></model:record>
			<model:params>
				<model:param name="CODE" value="${param.code}"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="name"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="name" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" errormsg="" data-bind="value: name">
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
	      <label class="col-xs-3 col-md-3  text-right" for="code">ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="code" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="code" nullmsg="<s:message code="cf.notnull" text="组件名称不能为空！"/>" errormsg="" data-bind="value: code">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	   	<label class="col-xs-3 col-md-3 text-right"><s:message code="cf.display" text="是否显示"/></label>
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
	   	<div class="col-xs-8 col-xs-8">
	   		<button id="saveVal" type="button" class="btn ue-btn-primary"><s:message code="cf.save" text="保存"/></button>
	   		<button id="cancel" type="button" class="btn ue-btn"><s:message code="cf.cancel" text="取消"/></button>
	   	</div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
var code = "${param.code}";
var bizMeanType = "${param.bizMeanType}";
var status = "${param.status}";

function init(){
	// 加载枚举
	initEnum();
	if(status == "new"){
		var record = bizMeanDS.newRecord();
		// 初始化“自动生成ID”事件
		CFHelp.setCreateId(1, "createId", $("#name"), $("#code"), "blur");
		$("#isDisplay :radio[value=1]").prop("checked",true);
	}else{
		$("#createId").parents(".form-group").hide();
		$("#code").prop("readonly", true);
		$("#code").removeAttr("datatype");
		$("#code").removeAttr("nullmsg");
		$("#code").next("span").remove();
		bizMeanDS.load();
	}
	// 保存按钮
	$("#addform").Validform({
		btnSubmit:"#saveVal",
		tiptype:function(msg,o,cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip,o.type);
			objtip.text(msg);
		},
		callback:function(form){
			saveVal();
		},
		datatype: {
			"code": ValidCode
		}
	});
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
}

// 校验ID
function ValidCode(gets, obj, curform, regxp) {
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizMeanQueryCmd");
	command.setParameter("CODE",gets);
	command.execute("queryBizMeans");
	if(command.getData().length>0) {
		obj.attr("errormsg", L.getLocaleMessage("cf.idexisted", "ID已存在!"));
		return false;
	}
	return true;
}

// 加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_DISPLAY");
	command.execute();
	var data = command.getData();
	// 组装options
	var options = "";
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type=radio value='"+saveVal+"' data-bind='checked: isDisplay'/>"+showVal+"</label> ";
		// 添加到页面
		$("#isDisplay").append(radio);
	}
}

// 保存
function saveVal() {
	var record = bizMeanDS.getCurrent();
	record.set("code", $("#code").val());
	if(!record.get("isDisplay")){
		record.set("isDisplay","1");
	}
	if(bizMeanType && bizMeanType != "null") {
		record.set("bizMeanType", bizMeanType);
	}
	
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizMeanCmd");
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
		return;
	}else {
		dialog.close(true);
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