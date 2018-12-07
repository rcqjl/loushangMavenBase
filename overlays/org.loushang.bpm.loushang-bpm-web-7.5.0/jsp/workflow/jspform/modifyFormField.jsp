<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
	String Id = request.getParameter("id");
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
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='l5-adapter.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='knockout.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bpm/util.js'/>"></script>
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,bpm/util.js"></l:script>
	<script type="text/javascript">
		var status = "<%=status %>";
		var formId = "<%=formId %>";
	</script>
</head>
<body>
<model:datasets>
<model:dataset id="jspFormFieldInfoDataset" cmd="org.loushang.workflow.jspform.formdef.field.cmd.FieldQueryCmd" method="queryId">
		<model:record fromBean="org.loushang.workflow.jspform.formdef.field.data.JspFormFieldDef"></model:record>
		<model:params>
			<model:param name="ID" value="<%=Id %>"></model:param>
		</model:params>
	</model:dataset>	
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label for="fieldId" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.AreaID" text="域ID"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="fieldId" name="fieldId"  type="text" datatype="existence"  errormsg="<spring:message code="BPM.JSPFORM.Tip11" text="ID已存在"></spring:message>" nullmsg="<spring:message code="BPM.JSPFORM.Tip18" text="请输入域ID"></spring:message>" data-bind="value: fieldId">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
	<div class="form-group">
        <label for="fieldName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.AreaName" text="域名称"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="fieldName"  type="text" datatype="s" nullmsg="<spring:message code="BPM.JSPFORM.Tip19" text="请输入域名称"></spring:message>"  data-bind="value: fieldName">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>      
    <div class="form-group">
        <label for="fieldType" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.AreaType" text="域类型"></spring:message></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input" id="fieldType" name="fieldType"  data-bind="value: fieldType">
                <option value="div">div</option>
                <option value="field">field</option>
                <option value="table">table</option>
                <option value="tabPanel">tabPanel</option>
                <option value="text">text</option>
            </select>
        </div>
    </div>
	<div class="form-group">
        <label for="deviceType" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.FormType" text="表单类型"></spring:message></label>
        <div class="col-xs-8 col-md-8">
             <select class="form-control ue-form Validform_input" id="deviceType" name="deviceType"  data-bind="value: deviceType">
                <option value="4"><spring:message code="BPM.JSPFORM.AllType" text="所有类型"></spring:message></option>
                <option value="0"><spring:message code="BPM.JSPFORM.PCForm" text="PC表单"></spring:message></option>
                <option value="1"><spring:message code="BPM.JSPFORM.PhoneForm" text="手机表单"></spring:message></option>
                <option value="2"><spring:message code="BPM.JSPFORM.PadForm" text="PAD表单"></spring:message></option>
            </select>
        </div>
    </div>  
    <div class="form-group">
     	 <label class="col-xs-3 col-md-3  text-right" for="fieldDiscription"><spring:message code="BPM.JSPFORM.AreaDesc" text="域描述"></spring:message></label>
    	 <div class="col-xs-8 col-md-8">
      	 	  <textarea id="fieldDiscription" class="form-control ue-form Validform_input" rows="2" datatype="validDescription" ignore="ignore" data-bind="value: fieldDiscription"></textarea>
      	 	  <span class="Validform_checktip Validform_span"></span>
	     </div>
	</div>
    <div class="form-group ">
     	<label  class="col-xs-3 col-md-3 text-right"></label>
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
		jspFormFieldInfoDataset.load();
		$("#fieldId").attr("readonly", true);
	} else {
		jspFormFieldInfoDataset.newRecord();
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
			"validDescription":ValidDescription
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
		var command = new L5.Command("org.loushang.workflow.jspform.formdef.field.cmd.FieldQueryCmd");
		var formId = "<%=formId%>";
		command.setParameter("FORM_ID",formId);
		command.setParameter("FIELD_ID",gets);
		command.execute("query");
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip20","域ID已存在"));
			return false;
		}
	}
	return true;
}
function ValidDescription(gets, obj, curform, regxp) {
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip17","不能超过100字符"));
		return false;
	}
	return true;
}


//保存功能
function save_click() {
	var status = "<%=status %>";
	var formId = "<%=formId%>";
	var records = jspFormFieldInfoDataset.getCurrent();
	if(status == "new"){
		records.state = 1;
		records.set("formId",formId);
	} else {
		records.state = 3;
	}
	records.set("fieldName", $("#fieldName").val());
	
	var command = new L5.Command("org.loushang.workflow.jspform.formdef.field.cmd.FieldCmd");
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
		return ;
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