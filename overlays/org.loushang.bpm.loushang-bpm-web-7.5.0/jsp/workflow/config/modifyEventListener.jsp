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
	
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"></l:script>
</head>
<body>
<model:datasets>
	<model:dataset id="propertyConfigDataset" cmd="org.loushang.workflow.config.property.cmd.PropertyConfigQueryCmd">
		<model:record fromBean="org.loushang.workflow.config.property.data.PropertyConfig"></model:record>
		<model:params>
			<model:param name="ID" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>	
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label for="propertyKey" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.CONFIG.EventType" text="事件类型"/></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input" id="propertyKey" name="propertyKey" datatype="s" nullmsg="<spring:message code="BPM.CONFIG.Tip5" text="请选择事件类型"/>" data-bind="value: propertyKey">
            </select>
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
	<div class="form-group">
        <label for="propertyValue" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.CONFIG.RegisteredListenerClass" text="注册监听类"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="propertyValue"  type="text" datatype="validDef" nullmsg="<spring:message code="BPM.CONFIG.Tip6" text="请输入注册监听类"/>"  data-bind="value: propertyValue">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>      

    <div class="form-group">
       <label class="col-xs-3 col-md-3  text-right" for="parserType"><spring:message code="BPM.CONFIG.Release" text="发布方式"/></label>
       <div class="col-xs-8 col-md-8">
     	  <div class="radio" id="parserType">
     	  </div>
       </div>
    </div>
    
	<div class="form-group">
        <label for="propertyDescription" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.CONFIG.Description" text="描述"/></label>
        <div class="col-xs-8 col-md-8">
      	 	  <textarea id="propertyDescription" class="form-control ue-form Validform_input" rows="2" datatype="validDescription" ignore="ignore" data-bind="value: propertyDescription"></textarea>
	     </div>
    </div>  
    <div class="form-group ">
    	<label class="col-xs-3 col-md-3 text-right"></label>
    	<div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.CONFIG.Save" text="保存"/>	</button>
			<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.CONFIG.Cancel" text="取消"/></button>
		</div>	
	</div>		
</form>	
<script type="text/javascript">

$(document).ready(function(){
	initEnum();
	
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_MANAGER_EVENT_TYPE");
	command.execute();
	procManagerEventTypeEnum = command.getData();
	var options = "";
	for(var i =0; i< procManagerEventTypeEnum.length; i++) {
		var option = "<option value='"+ procManagerEventTypeEnum[i].value +"'>"+ procManagerEventTypeEnum[i].text +"</option>";
		options += option;	
	}
	$("#propertyKey").append(options);	
	
	var status = "<%=status %>";
	if(status != "new") {
		propertyConfigDataset.load();
	} else {
		propertyConfigDataset.newRecord();
		$("#parserType :radio[value=0]").prop("checked",true);
	}
	
	/****************表单校验******************/
	$("#saveForm").Validform({
        btnSubmit:"#save",
        tiptype:function(msg,o,cssctl){
            var objtip=o.obj.siblings(".Validform_checktip");
            cssctl(objtip,o.type);
            objtip.text(msg);
        },
        callback:function(form){
            save_click();
        },
		datatype: {
			"validDef": ValidDef,
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
	if(gets.length > 255) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.CONFIG.Tip7","不能超过255字符"));
		return false;
	}
	if(!gets.match(/^(\w|\.)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.CONFIG.Tip8","只能输入字母、数字、下划线以及'.'"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.CONFIG.Tip9","不能以数字开头"));
		return false;
	}
	return true;
}
function ValidDescription(gets, obj, curform, regxp) {
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.CONFIG.Tip10","不能超过100字符"));
		return false;
	}
	return true;
}

//保存功能
function save_click() {
	var status = "<%=status %>";
	var records = propertyConfigDataset.getCurrent();
	records.set("propertyValue", $("#propertyValue").val());
	records.set("propertyKey", $("#propertyKey").val());
	records.set("parserType", $("input:checked").val());
	if(status == "new"){
		records.state = 1;
	} else {
		records.state = 3;
	}
	
	var command = new L5.Command("org.loushang.workflow.config.property.cmd.PropertyConfigCmd");
	command.setParameter("records", [records]);
	command.execute("save");
	
	var dialog = parent.dialog.get(window);
	if (!command.error) {
		dialog.close(true);
		//UIAlert('保存数据成功！');
	}else{
		sticky(command.error.msg, 'error', 'center');
 		return ; 
	}
}
//弹窗函数
function UIAlert(content) {
	parent.$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
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

function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	
	command.setParameter("enumName", "LISTENER_TYPE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' name='parserType' value='"+ saveVal +"' data-bind='checked:parserType'/> "+ showVal +"</label> "
		// 添加到页面
		$("#parserType").append(radio);
	}
}
</script>
</body>
</html>