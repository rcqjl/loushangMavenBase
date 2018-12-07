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
	<script type="text/javascript">
		var status = "<%=status %>";
		var id = "<%=id %>";
	</script>
</head>
<body>
<model:datasets>
	<model:dataset id="processTypeDataset" cmd="org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd">
		<model:record fromBean="org.loushang.workflow.processtype.data.ProcessType"></model:record>
		<model:params>
			<model:param name="TYPE_ID" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
	<div class="form-group">
        <label for="typeId" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.PROCESSTYPE.ID" text="流程类型ID"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="typeId" type="text" datatype="existence" nullmsg="<spring:message code="BPM.PROCESSTYPE.Tip8" text="ID不能为空"/>" errormsg="<spring:message code="BPM.PROCESSTYPE.Tip9" text="ID已存在"/>" data-bind="value: typeId">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="typeName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.PROCESSTYPE.Name" text="类型名称"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="typeName" type="text" datatype="s" nullmsg="<spring:message code="BPM.PROCESSTYPE.Tip8" text="名称不能为空"/>" data-bind="value: typeName">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="displayOrder" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.PROCESSTYPE.Displayorder" text="显示顺序"/></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="displayOrder" type="text" datatype="n" errormsg="<spring:message code="BPM.PROCESSTYPE.Tip10" text="显示顺序需为数字"/>" ignore="ignore" data-bind="value: displayOrder">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
  	<div class="form-group">
     	 <label class="col-xs-3 col-md-3  text-right" for="description"><spring:message code="BPM.PROCESSTYPE.Description" text="类型描述"/></label>
    	 <div class="col-xs-8 col-md-8">
      	 	  <textarea id="description" class="form-control ue-form Validform_input" rows="2" datatype="validDescription" ignore="ignore" data-bind="value: description"></textarea>
      	 	  <span class="Validform_checktip Validform_span"></span>
	     </div>
	</div>
    <div class="form-group ">
   		<label class="col-xs-3 col-md-3 text-right"></label>
   		<div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.PROCESSTYPE.Save" text="保存"/>	</button>
			<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.PROCESSTYPE.Cancel" text="取消"/></button>	
		</div>
	</div>		
</form>	
<script type="text/javascript">
$(document).ready(function(){

	if(status != "new") {
		$("#typeId").attr("readonly", true);
		processTypeDataset.load();
	} else {
		processTypeDataset.newRecord();
	}
	/***********************************/
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
			"validName":ValidName,
			"validDescription":ValidDescription
			
		}
    });
	/***********************************/
	
	$("#undo").click(function(){
		undo_click();
	});
});
//校验
function ValidDef(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 32) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.PROCESSTYPE.Tip11","不能超过32字符"));
		return false;
	}
	if(!gets.match(/^\w+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip12","只能输入字母、数字、下划线"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip13","不能以数字开头"));
		return false;
	}
	if(status=="new"){
		var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd");
		command.setParameter("TYPE_ID",gets);
		command.execute();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.PROCESSTYPE.Tip9","ID已存在"));
			return false;
		}
	}
	return true;
}
function ValidName(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.PROCESSTYPE.Tip14","不能超过100字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5]|\(|\)|\-|\（|\）)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.PROCESSTYPE.Tip15","不能输入特殊字符！"));
		return false;
	}
	return true;
}
function ValidDescription(gets, obj, curform, regxp) {
	if(gets.length > 255) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.PROCESSTYPE.Tip16","不能超过255字符"));
		return false;
	}
	return true;
}

//保存功能
function save_click() {
	var status = "<%=status %>";
	var records = processTypeDataset.getCurrent();
	records.set("typeName",$("#typeName").val());
	var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeCmd");
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
		return  false;
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