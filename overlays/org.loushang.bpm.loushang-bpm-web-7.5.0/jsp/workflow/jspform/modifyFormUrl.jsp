<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
	String id = request.getParameter("id");
	String status = request.getParameter("status");
	String formId = request.getParameter("formId");
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
			width: 40%;
		}
		.required {
			top: 0;
		}
		textarea.form-control {
			height: 62px;
		}
	</style>
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,bpm/util.js"></l:script>
	<script type="text/javascript">
		var status = "<%=status %>";
		var formId = "<%=formId %>";
	</script>
</head>
<body>
<model:datasets>
<model:dataset id="jspFormUrlInfoDataset" cmd="org.loushang.workflow.jspform.formdef.requesturl.cmd.RequestUrlQueryCmd" method="queryId">
			<model:record fromBean="org.loushang.workflow.jspform.formdef.requesturl.data.JspFormRequestUrlDef"></model:record>
			<model:params>
				<model:param name="ID" value="<%=id %>"></model:param>
			</model:params>
		</model:dataset>
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label for="position" class="col-xs-3 col-md-3 text-right">UrlID<span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="urlId" name="urlId"  type="text" datatype="existence"  errormsg="<spring:message code="BPM.JSPFORM.Tip11" text="ID已存在"></spring:message>" nullmsg="<spring:message code="BPM.JSPFORM.Tip14" text="请输入操作ID"></spring:message>" data-bind="value: urlId">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
	<div class="form-group">
        <label for="urlName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.UrlName" text="Url名称"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="urlName"  type="text" datatype="validName" nullmsg="<spring:message code="BPM.JSPFORM.Tip21" text="请输入Url名称"></spring:message>"  data-bind="value: urlName">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>      
    <div class="form-group">
        <label for="urlValue" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.PCFormUrl" text="PC表单Url"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
       		<input class="form-control ue-form Validform_input" id="urlValue"  type="text" datatype="validPath" nullmsg="<spring:message code="BPM.JSPFORM.Tip22" text="请输入PC表单Url"></spring:message>"  data-bind="value: urlValue">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
	<div class="form-group">
        <label for="phoneUrlValue" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.PhoneFormUrl" text="手机表单Url"></spring:message></label>
        <div class="col-xs-8 col-md-8">
			<input class="form-control ue-form Validform_input" id="phoneUrlValue"  type="text" ignore="ignore" datatype="validPath" data-bind="value: phoneUrlValue">
			 <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
   	<div class="form-group">
        <label for="padUrlValue" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.PadFormUrl" text="Pad表单Url"></spring:message></label>
        <div class="col-xs-8 col-md-8">
			<input class="form-control ue-form Validform_input" id="padUrlValue"  type="text" ignore="ignore" datatype="validPath" data-bind="value: padUrlValue">
			 <span class="Validform_checktip Validform_span"></span>
        </div>
    </div> 
    <div class="form-group ">
   		<label class="col-xs-3 col-md-3 text-right"></label>
        <div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.INFOPROCESSMODEL.Save" text="保存"></spring:message></button>
			<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.INFOPROCESSMODEL.Cancel" text="取消"></spring:message></button>	
		</div>
	</div>		
</form>	
	
<script type="text/javascript">

$(document).ready(function(){
	var status = "<%=status %>";
	if(status != "new") {
		jspFormUrlInfoDataset.load();
		$("#urlId").attr("readonly", true);
	} else {
		jspFormUrlInfoDataset.newRecord();
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
			"existence": ValidDef,
			"validPath": ValidPath,
			"validName": ValidName
		}
    });
	/***********************************/
	
	$("#undo").click(function(){
		undo_click();
	});
});
//校验ID
function ValidDef(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 32) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip8","不能超过32字符"));
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.JSPFORM.Tip9","只能输入字母、数字、下划线"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.JSPFORM.Tip10","不能以数字开头"));
		return false;
	}
	if(status=="new"){
		var command = new L5.Command("org.loushang.workflow.jspform.formdef.requesturl.cmd.RequestUrlQueryCmd");
		var formId = "<%=formId%>";
		command.setParameter("FORM_ID",formId);
		command.setParameter("URL_ID",gets);
		command.execute("query");
		var data = command.getData();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip23","UrlID已存在"));
			return false;
		}
	}
	return true;
}
//校验名称
function ValidName(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip17","不能超过100字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5])+$/)) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip13","不能输入特殊字符！"));
		return false;
	}
	return true;
}
//校验路径
function ValidPath(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip17","不能超过100字符"));
		return false;
	}
	if(!gets.match(/^(\w|\.|\/|\=|\?|\-|\\|\&)+$/)) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip13","不能输入特殊字符！"));
		return false;
	}
	return true;
}

//保存功能
function save_click() {
	var status = "<%=status %>";
	var formId = "<%=formId%>";
	var records = jspFormUrlInfoDataset.getCurrent();
	if(status == "new"){
		records.state = 1;
		records.set("formId",formId);
	} else {
		records.state = 3;
	}
	records.set("urlValue", $("#urlValue").val());
	
	var command = new L5.Command("org.loushang.workflow.jspform.formdef.requesturl.cmd.RequestUrlCommand");
	command.setParameter("records", [records]);
	command.execute("save");
	
	var dialog = parent.dialog.get(window);
	if (!command.error) {
		dialog.close(true);
		//PAlet('保存数据成功！');
	}else{
		//dialog.close();
		//PAlet(command.error.message);
		sticky(command.error.msg, 'error', 'center');
		return;
	}
}

//弹窗提示样式
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg,
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    }
	);
}
//取消
function undo_click() {
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</body>
</html>