<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
	String id = request.getParameter("id");
	String status = request.getParameter("status");
%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/prettify.css'/>"/>
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
	
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
	<script type="text/javascript">
		var status = "<%=status %>";
		var id = "<%=id %>";
	</script>
</head>
<body>
<model:datasets>
		<model:dataset id="jspFormBasicInfoDataset" cmd="org.loushang.workflow.jspform.formdef.cmd.JspFormQueryCmd" >
			<model:record fromBean="org.loushang.workflow.jspform.formdef.data.JspFormDef"></model:record>
			<model:params>
				<model:param name="FORM_ID" value="<%=id %>"></model:param>
			</model:params>
		</model:dataset>
		<model:dataset id="appCodeDataset" cmd="org.loushang.workflow.util.bsp.AppCodesQueryCommand" >
			<model:record>
				<model:field name="value"  type="string"/>
				<model:field name="text"  type="string"/>
			</model:record>
		</model:dataset>
</model:datasets>
	<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
		 	<div class="form-group">
			   <label for="formId" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.FormID" text="表单ID"></spring:message><span class="required">*</span></label>
			    <div class="col-xs-8 col-md-8">
			        <input class="form-control ue-form Validform_input" id="formId" type="text"  datatype="existence"  errormsg="<spring:message code="BPM.JSPFORM.FormID" text="ID已存在"></spring:message>" nullmsg="<spring:message code="BPM.JSPFORM.FormID" text="请输入表单ID"></spring:message>"  data-bind="value: formId">
			        <span class="Validform_checktip Validform_span"></span>
			    </div>
			</div>
			<div class="form-group">
			    <label for="formName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.FormName" text="表单名称"></spring:message><span class="required">*</span></label>
			    <div class="col-xs-8 col-md-8">
			        <input class="form-control ue-form Validform_input" id="formName" type="text" datatype="validName" nullmsg="<spring:message code="BPM.JSPFORM.Tip7" text="请输入表单名称"></spring:message>" data-bind="value: formName">
			        <span class="Validform_checktip Validform_span"></span>
			    </div>
			</div>
		    <div class="form-group">
		        <label for="appPath" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.Belongs" text="所属应用"></spring:message></label>
		        <div class="col-xs-8 col-md-8">
		            <select class="form-control ue-form Validform_input" id="appPath" name="appPath"  data-bind="value: appPath">
		            </select>
		            <span class="Validform_checktip Validform_span"></span>
		        </div>
		    </div>
			<div class="form-group">
			    <label for="formDescription" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.JSPFORM.FormDesc" text="表单描述"></spring:message></label>
			    <div class="col-xs-8 col-md-8">
			          <textarea id="formDescription" class="form-control ue-form Validform_input" rows="2" data-bind="value: formDescription"></textarea>
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
</body>
<script type="text/javascript">
$(document).ready(function(){
	initEnum();
	 
	var command = new L5.Command("org.loushang.workflow.util.bsp.AppCodesQueryCommand");
	command.execute();
	var data = command.getData();
	var options;
	for(var i = 0; i < data.length; i++) {
		var option = "<option value='"+ data[i].appCode +"'>"+ data[i].appName +"</option>";
		options += option;	
	}
	$("#appPath").append(options);
	
	var status = "<%=status %>";
	if(status != "new") {
		$("#formId").attr("readonly", true);
		jspFormBasicInfoDataset.load();
	} else {
		jspFormBasicInfoDataset.newRecord();
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
		var command = new L5.Command("org.loushang.workflow.jspform.formdef.cmd.JspFormQueryCmd");
		command.setParameter("FORM_ID",gets);
		command.execute();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip11","ID已存在"));
			return false;
		}
	}
	return true;
}

//路径校验
function ValidName(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 200) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip12","不能超过200字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5]|\(|\)|-)+$/)) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.JSPFORM.Tip13","不能输入特殊字符！"));
		return false;
	}
	return true;
}

//保存功能
function save_click() {
	var record = jspFormBasicInfoDataset.getCurrent();
	var command = new L5.Command("org.loushang.workflow.jspform.formdef.cmd.JspFormCmd");
	record.set("formName", $("#formName").val());
	record.set("appPath", $("#appPath").val());
	command.setParameter("record", record);
	if(status == "new"){
		command.execute("insert");
	} else {
		command.execute("update");
	}
	
	var dialog = parent.dialog.get(window);
	if (!command.error) {
		dialog.close(true);
		//PAlet('保存数据成功！');
	}else{
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
//checkbox全选 
function selectAll(obj,iteName){
	if (obj.checked) {
		$("input[name='checkbox']").each(function(){this.checked=true;}); 
	} else {
		$("input[name='checkbox']").each(function(){this.checked=false;}); 
	}
}
//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "JSP_FORM_DATA_FIELD_TYPE");
	command.execute();
	jspFormDataFieldTypeEnum = command.getData();
	command.setParameter("enumName", "JSP_FORM.DEVICE_TYPE");
	command.execute();
	jspFormDeviceTypeEnum = command.getData();
}
//域类型
function getJspFormDataFieldTypeEnum(Id) {
	for(index in jspFormDataFieldTypeEnum) {
		if(jspFormDataFieldTypeEnum[index].value == Id) {
			return jspFormDataFieldTypeEnum[index].text;
		}
	}
}
//表单设备类型
function getJspFormDeviceTypeEnum(Id) {
	for(index in jspFormDeviceTypeEnum) {
		if(jspFormDeviceTypeEnum[index].value == Id) {
			return jspFormDeviceTypeEnum[index].text;
		}
	}
}
</script>
</html>