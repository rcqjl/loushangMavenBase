<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%
	String id = request.getParameter("id");
	String status = request.getParameter("status");
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
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
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js,bpm/util.js"></l:script>
</head>
<body>
<model:datasets>
	<model:dataset id="processPluginTypeDefDataset"	cmd="org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefQueryCmd">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.plugintypedef.data.InfoProcPluginDef"></model:record>
		<model:params>
			<model:param name="PLUGIN_TYPE" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>	
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
	<div class="form-group">
        <label for="pluginName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.PluginName" text="插件名称"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="pluginName" type="text" datatype="s" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip38" text="请输入插件名称"/>"  data-bind="value: pluginName">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="pluginType" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.PluginType" text="插件类型"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
      		<input class="form-control ue-form Validform_input" id="pluginType" type="text" datatype="validType" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip39" text="请输入插件类型"/>" errormsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip40" text="插件类型已存在"/>" data-bind="value: pluginType" >
      		 <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="pluginPath" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.PluginPath" text="插件路径"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="pluginPath" type="text" datatype="validPath" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip41" text="请输入插件路径"/>" data-bind="value: pluginPath">
             <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="jsPath" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.JsPath" text="插件js路径"/></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="jsPath" type="text" datatype="validPath" ignore="ignore" data-bind="value: jsPath">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="jsObject" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.JsObject" text="插件js对象"/></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="jsObject" type="text" ignore="ignore" data-bind="value: jsObject">
        </div>
    </div>
    <div class="form-group">
        <label for="xmlParser" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.XMLParsingClass" text="XML解析类"/></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="xmlParser" type="text" datatype="validPath" ignore="ignore" data-bind="value: xmlParser">
             <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="fileParser" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.IExportParseClass" text="导入导出解析类"/></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="fileParser" type="text" datatype="validPath" ignore="ignore" data-bind="value: fileParser">
             <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>    
    
      <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="parserType"><spring:message code="BPM.INFOPROCESSMODEL.ReleaseType" text="发布方式"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="parserType">
	      	</div>
	      </div>
	   </div>
    
       <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="itemType"><spring:message code="BPM.INFOPROCESSMODEL.VersionType" text="版本类型"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="itemType">
	      	</div>
	      </div>
	   </div>
    
    <div class="form-group ">
        <label class="col-xs-3 col-md-3 text-right"></label>
        <div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.INFOPROCESSMODEL.Save" text="保存"/></button>
			<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.INFOPROCESSMODEL.Cancel" text="取消"/></button>	
		</div>
	</div>		
</form>	
	
<script type="text/javascript">

$(document).ready(function(){
	initEnum();
	
	var status = "<%=status %>";
	if(status != "new") {
		$("#pluginType").attr("readonly", true);
		processPluginTypeDefDataset.load();
	} else {
		processPluginTypeDefDataset.newRecord();
		$("#parserType :radio[value=0]").prop("checked",true);
		$("#itemType :radio[value=0]").prop("checked",true);
	}
	/****************表单校验******************/
	$("#saveForm").Validform({
        btnSubmit:"#save",
        tiptype:function(msg,o,cssctl){
            if(!o.obj.is("form")){
                var objtip=o.obj.siblings(".Validform_checktip");
                cssctl(objtip,o.type);
                objtip.text(msg);
            } 
        },
        callback:function(form){
                save_click();
        },
		datatype: {
			"validName": ValidName,
			"validType": ValidDef,
			"validPath": ValidPath
		}
    });
	/***********************************/
	$("#undo").click(function(){
		undo_click();
	});
});

//校验类型
function ValidName(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 32) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip42","不能超过32字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5]|\.|\/|\-|\(|\)|\（|\）)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip31","不能输入特殊字符"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip35","不能以数字开头"));
		return false;
	}
	return true;
}
//校验类型
function ValidDef(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 32) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip42","不能超过32字符"));
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip43","只能输入字母、数字、下划线"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip35","不能以数字开头"));
		return false;
	}
	var status = "<%=status %>";
	if(status=="new"){
		var command = new L5.Command("org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefQueryCmd");
		command.setParameter("PLUGIN_TYPE",gets);
		command.execute();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip40","插件类型已存在"));
			return false;
		}
	}
	return true;
}
//路径校验
function ValidPath(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 200) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip37","不能超过200字符"));
		return false;
	}
	if(!gets.match(/^(\w|\.|\/|\=|\?|\-|\\|\&)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip31","不能输入特殊字符！"));
		return false;
	}
}

//保存功能
function save_click() {
	var status = "<%=status %>";
	var records = processPluginTypeDefDataset.getCurrent();
	if(status == "new"){
		records.state = 1;
		records.set("parserType",$("input[name='parserType']:checked").val());
		records.set("itemType",$("input[name='itemType']:checked").val());
	} else {
		records.state = 3;
	}
	records.set("pluginPath", $("#pluginPath").val());
	
	var command = new L5.Command("org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefCmd");
	command.setParameter("records", [records]);
	command.execute("save");
	
	var dialog = parent.dialog.get(window);
	if (!command.error) {
		dialog.close(true);
		//UIAlert("保存数据成功！");
	}else{
		dialog.close();
		UIAlert(command.error.msg);
		return  false;
	}
}

//取消
function undo_click() {
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
}

//加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	
	command.setParameter("enumName", "XML_PARSER_TYPE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' name='parserType' value='"+ saveVal +"' data-bind='checked:parserType'/> "+ showVal +"</label> "
		// 添加到页面
		$("#parserType").append(radio);
	}
	
	command.setParameter("enumName", "ITEM_TYPE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio1 = "<label><input type='radio' name='itemType' value='"+ saveVal +"' data-bind='checked:itemType'/> "+ showVal +"</label> "
		// 添加到页面
		$("#itemType").append(radio1);
	}
}
</script>
</body>
</html>