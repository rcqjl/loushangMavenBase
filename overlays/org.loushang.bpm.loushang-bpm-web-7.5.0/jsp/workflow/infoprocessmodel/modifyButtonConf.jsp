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
	<model:dataset id="procDefPageButtonDefDataset" cmd="org.loushang.workflow.infoprocessmodel.pagebuttondef.cmd.InfoProcPageButtonDefQueryCmd">
		<model:record
			fromBean="org.loushang.workflow.infoprocessmodel.pagebuttondef.data.InfoProcPageButtonDef">
		</model:record>
		<model:params>
			<model:param name="ID" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
	<div class="form-group">
        <label for="displayName" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.ButtonName" text="按钮名称"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="displayName" type="text" datatype="s" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip27" text="请输入按钮名称"/>"  data-bind="value: displayName">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>

    <div class="form-group">
        <label for="displayOrder" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.DisplayOrder" text="显示顺序"/></label>
   	    <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="displayOrder" type="text" datatype="n" errormsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip28" text="显示顺序需为数字"/>" ignore="ignore" data-bind="value: displayOrder">
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="pluginType" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.PlugInType" text="插件类型"/></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input"  id="pluginType" name="pluginType" datatype="s" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip29" text="请选择插件类型"/>" data-bind="value: pluginType">
            </select>
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>

   	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="needSetProcType"><spring:message code="BPM.INFOPROCESSMODEL.SetWorkflowType" text="配置流程类型"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="needSetProcType">
	      	</div>
	      </div>
	   </div>
   
      <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="isVisible"><spring:message code="BPM.INFOPROCESSMODEL.IsDisplay" text="是否显示"/></label>
	      <div class="col-xs-8 col-md-8">
	      	<div class="radio" id="isVisible">
	      	</div>
	      </div>
	   </div>
    
    <div class="form-group">
        <label for="description" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.ButtonDescription" text="按钮说明"/></label>
        <div class="col-xs-8 col-md-8">
     	    <textarea id="description" class="form-control ue-form Validform_input" rows="2" datatype="validDescription" ignore="ignore" data-bind="value: description"></textarea>
     	    <span class="Validform_checktip Validform_span"></span>
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
	//加载枚举值
	initEnum();

	cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefQueryCmd");
	cmd.execute();
	data = cmd.getData();

	var options = "";
	for(var i = 0; i < data.length; i++) {
		var option = "<option value='"+ data[i].pluginType +"'>"+ data[i].pluginType +"</option>";
		options += option;	
	}
	$("#pluginType").append(options);
	
	var status = "<%=status %>";
	if(status != "new") {
		procDefPageButtonDefDataset.load();
	} else {
		procDefPageButtonDefDataset.newRecord();
		$("#needSetProcType :radio[value=1]").prop("checked",true);
		$("#isVisible :radio[value=1]").prop("checked",true);
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
			"existence": ValidExistence,
			"validDescription": ValidDescription
		} 
    });
	/***********************************/
	$("#undo").click(function(){
		undo_click();
	});
});
//校验按钮名称
function ValidExistence(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip30","不能超过100字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5]|\(|\)|\-|\（|\）)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip31","不能输入特殊字符！"));
		return false;
	}
	var status = "<%=status %>";
	if(status=="new"){
		var command = new L5.Command("org.loushang.workflow.infoprocessmodel.pagebuttondef.cmd.InfoProcPageButtonDefQueryCmd");
		command.setParameter("DISPLAY_NAME",gets);
		command.execute();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip32","按钮名称已存在"));
			return false;
		}
	}
	return true;
} 
function ValidDescription(gets, obj, curform, regxp) {
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip30","不能超过100字符"));
		return false;
	}
	return true;
}


//保存功能
function save_click() {
	var status = "<%=status %>";
	var records = procDefPageButtonDefDataset.getCurrent();
	records.set("displayName", $("#displayName").val());
	records.set("pluginType", $("#pluginType").val());
	records.set("needSetProcType", $("input[name='needSetProcType']:checked").val());
	records.set("isVisible", $("input[name='isVisible']:checked").val());
	if(status == "new"){
		records.state = 1;
	} else {
		records.state = 3;
	}
	var command = new L5.Command("org.loushang.workflow.infoprocessmodel.pagebuttondef.cmd.InfoProcPageButtonDefCmd");
	command.setParameter("records", [records]);
	command.execute("update");
	
	var dialog = parent.dialog.get(window);
	// 返回执行结果
	if (!command.error) {
		dialog.close(true);
		//PAlet("保存数据成功！")
	}else{
		//dialog.close();
		//PAlet(command.error.msg)
		//return  false;
		sticky(command.error.msg, 'error', 'center');
	}
}
//取消
function undo_click() {
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
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
//加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_DEF_BUTTON_CONF_SET_PROC_TYPE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' name='needSetProcType' value='"+ saveVal +"' data-bind='checked:needSetProcType'/>"+ showVal +"</label> "
		var radio1 = "<label><input type='radio' name='isVisible' value='"+ saveVal +"' data-bind='checked:isVisible'/>"+ showVal +"</label> "
		// 添加到页面
		$("#needSetProcType").append(radio);
		$("#isVisible").append(radio1);
	}
}
</script>
</body>
</html>