<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><s:message code="cf.mi" text="模型项"/></title>
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
		<model:dataset id="bizModelItemDs" cmd="org.loushang.cform.biz.cmd.BizModelItemQueryCmd" method="queryBizModelItems">
			<model:record fromBean="org.loushang.cform.biz.data.BizModelItem"></model:record>
			<model:params>
				<model:param name="MODEL_ID" value="${param.modelId }"></model:param>
				<model:param name="MODEL_ITEM_ID" value="${param.modelItemId }"></model:param>
			</model:params>
		</model:dataset>
	</model:datasets>
	<form class="form-horizontal" id="addform" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelItemName"><s:message code="cf.alias" text="别名"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="modelItemName" maxlength=100 class="form-control ue-form Validform_input" datatype="*1-100" errormsg="" ignore="ignore" type="text" data-bind="value: modelItemName">
	      </div>
	   </div>
	   <div class="form-group">
			<label class="col-xs-3 col-md-3  text-right" for="createId"></label>
			<div class="col-xs-8 col-md-8">
				<div class="checkbox">
					<label><input type="checkbox" id="createId" name="createId" value="1" checked/><s:message code="cf.generatecn" text="自动生成列名"/></label>
				</div>
			</div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelItemId"><s:message code="cf.name" text="名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="modelItemId" maxlength=30 class="form-control ue-form Validform_input" datatype="modelItemId" errormsg="" nullmsg="<s:message code="cf.notnull" text="不能为空！"/>" type="text" data-bind="value: modelItemId">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelItemType"><s:message code="cf.coltype" text="类型"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<select id="modelItemType" class="form-control ue-form Validform_input" data-bind="value: modelItemType"></select>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="modelItemLength"><s:message code="cf.length" text="长度"/></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="modelItemLength" maxlength=11 class="form-control ue-form Validform_input" datatype="n1-11" errormsg="" ignore="ignore" data-bind="value: modelItemLength">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="isPk"><s:message code="cf.pk" text="主键"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="isPk"></div>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="isFk"><s:message code="cf.fk" text="外键"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="isFk"></div>
	      </div>
	   </div>
	   <div class="form-group">
	   	<label class="col-xs-3 col-md-3 text-right"></label>
	   	<div class="col-xs-8 col-md-8">
	   		<button id="saveVal" class="btn ue-btn-primary"><s:message code="cf.save" text="保存"/></button>
	   		<button id="cancel" class="btn ue-btn"><s:message code="cf.cancel" text="取消"/></button>
	   	</div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
var status = "${param.status}";
var modelId = "${param.modelId}";

// 弹窗提示样式。
function sticky(msg, style) {
	var type = style ? style : 'success';
	$.sticky(
		    msg,
		    {
		        autoclose : 1000, 
		        position : 'center',
		        style : type
		    }
	);
}

function init(){
	// 加载枚举
	initEnum();
	
	if(status == "new"){
		bizModelItemDs.newRecord();
		CFHelp.setCreateId(1, "createId", $("#modelItemName"), $("#modelItemId"), "blur");
		$("#isPk :radio[value=0]").prop("checked",true);
		$("#isFk :radio[value=0]").prop("checked",true);
	} else {
		$("#createId").parents(".form-group").hide();
		$("#modelItemId").prop("readonly", true);
		$("#modelItemId").removeAttr("datatype");
		$("#modelItemId").removeAttr("nullmsg");
		$("#modelItemId").next("span").remove();
		bizModelItemDs.load();
	}
	
	// 校验
	$("#addform").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
            objtip.text(msg);
		},
		datatype: {
			"modelItemId": validModelItemId
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

// 校验列名称
function validModelItemId(gets, obj, curform, regxp) {
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
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemQueryCmd");
	command.setParameter("MODEL_ITEM_ID", gets);
	command.setParameter("MODEL_ID", modelId);
	command.execute("queryBizModelItems");
	if(command.getData().length > 0) {
		obj.attr("errormsg", m("cf.ce", "列名已存在"));
		return false;
	}
	return true;
}

// 加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_KEY");
	command.execute();
	var data = command.getData();
	// 组装radio
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' value='"+ saveVal +"' data-bind='checked:isPk'/>"+ showVal +"</label> "
		var radios = "<label><input type='radio' value='"+saveVal+"' data-bind='checked:isFk'/>"+showVal+"</label> "
		// 添加到页面
		$("#isPk").append(radio);
		$("#isFk").append(radios);
	}
	
	command.setParameter("enumName", "CFORM.MODEL_ITEM_TYPE");
	command.execute();
	var data = command.getData();
	//组装option
	for(var i = 0; i<data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;
		var option = "<option value='"+saveVal+"'>"+ showVal +"</option>";
		$("#modelItemType").append(option);
	}
	
}

// 保存
function saveVal() {
	var record = bizModelItemDs.getCurrent();
	if(modelId && modelId != "null") {
		record.set("modelId", modelId);
	}
	record.set("modelItemId", $("#modelItemId").val());
	if(!record.get("isPk")){
		record.set("isPk","0");
	}
	if(!record.get("isFk")){
		record.set("isFk","0");
	}
	
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemCmd");
	command.setParameter("records", [record]);
	command.execute("save");
	
	if(command.error){
		sticky(command.error.message, 'error');
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