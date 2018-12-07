<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><s:message code="cf.db" text="数据绑定"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.radio {
				padding-top: 0!important;
		}
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
    <l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"/>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/pinyin.js"></script>
	<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
</head>
<body>
	<model:datasets>
		<model:dataset id="dataBindDS" cmd="org.loushang.cform.biz.cmd.DataBindQueryCmd" method="queryDataBinds">
			<model:record fromBean="org.loushang.cform.biz.data.DataBind"></model:record>
			<model:params>
				<model:param name="CODE" value="${param.code}"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="name"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="name" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="名称不能为空！"/>" errormsg="" data-bind="value: name">
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
	         <input id="code" maxlength=32 class="form-control ue-form Validform_input" type="text" datatype="code" nullmsg="<s:message code="cf.notnull" text="组件名称不能为空！"/>" errormsg="" data-bind="value: code">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="fieldType"><s:message code="cf.type" text="绑定域类型"/></label>
	      <div class="col-xs-8 col-md-8">
	         <select id="fieldType" class="form-control ue-form Validform_input" data-bind="value: fieldType"></select>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="parseClass"><s:message code="cf.parseclass" text="解析类"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="parseClass" maxlength=100 class="form-control ue-form Validform_input" type="text" datatype="*1-100" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" errormsg=""  data-bind="value: parseClass">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="paramUrl"><s:message code="cf.paramurl" text="参数设置URL"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="paramUrl" maxlength=200 class="form-control ue-form Validform_input" type="text" datatype="*1-200" errormsg="" ignore="ignore" data-bind="value: paramUrl">
	         <span class="Validform_checktip Validfrom_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="isDisplay"><s:message code="cf.display" text="是否显示"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="isDisplay">
	      	</div>
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

function init(){
	// 加载枚举。
	initEnum();
	
	if(status == "new"){
		var record = dataBindDS.newRecord();
		// 初始化“自动生成ID”事件。
		CFHelp.setCreateId(1, "createId", $("#name"), $("#code"), "blur");
		$("#isDisplay :radio[value=1]").prop("checked",true);
	}else{
		$("#createId").parents(".form-group").hide();
		$("#code").prop("readonly", true);
		$("#code").removeAttr("datatype");
		$("#code").removeAttr("nullmsg");
		$("#code").next("span").remove();
		dataBindDS.load();
	}
	
	// 校验。
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
			"code": ValidCode
		}
	});
	// 取消按钮。
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.DataBindQueryCmd");
	command.setParameter("CODE",gets);
	command.execute("queryDataBinds");
	if(command.getData().length > 0) {
		obj.attr("errormsg", L.getLocaleMessage("cf.idexisted", "ID已存在!"));
		return false;
	}
	return true;
}

// 加载枚举值。
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	
	// 域绑定类型枚举。
	command.setParameter("enumName", "CFORM.BIND_FIELD_TYPE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++) {
		var saveVal = data[i].value;
		var showVal = data[i].text;
		var option = "<option value='"+saveVal+"'>"+ showVal +"</option>";
		$("#fieldType").append(option);
	}
	
	// 是否显示的枚举。
	command.setParameter("enumName", "CFORM.IS_DISPLAY");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++) {
		var saveVal = data[i].value;
		var showVal = data[i].text;
		var radio = "<label><input type='radio' value='"+ saveVal +"' data-bind='checked:isDisplay'/>"+ showVal +"</label> ";
		$("#isDisplay").append(radio);	
	}
}

// 保存
function saveVal() {
	var record = dataBindDS.getCurrent();
	record.set("code", $("#code").val());
	if(!record.get("isDisplay")){
		record.set("isDisplay","1");
	}
	
	var command = new L5.Command("org.loushang.cform.biz.cmd.DataBindCmd");
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