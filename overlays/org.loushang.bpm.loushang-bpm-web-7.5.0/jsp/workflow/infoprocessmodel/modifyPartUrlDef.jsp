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
		.addClass{
			margin-left:5px;
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
	<model:dataset id="partUrlDefDataset" cmd="org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlQueryDefCmd">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.parturldef.data.PartUrlDef"></model:record>
		<model:params>
			<model:param name="ID" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>	
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
	<div class="form-group">
        <label for="name" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.Name" text="名称"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="name" type="text" datatype="s" nullmsg='<spring:message code="BPM.INFOPROCESSMODEL.Tip27" text="请输入名称"/>' data-bind="value: name">
            <span class="Validform_checktip Validform_span"></span>
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
        <label for="displayOrder" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.DisplayOrder" text="显示顺序"/></label>
        <div class="col-xs-8 col-md-8">
      		<input class="form-control ue-form Validform_input" id="displayOrder" type="text" datatype="n" errormsg='<spring:message code="BPM.INFOPROCESSMODEL.Tip28" text="请输入数字"/>' ignore="ignore" data-bind="value: displayOrder" >
      		 <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
    
    <div class="form-group">
       <label for="partUrl" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.ParticipantsPath" text="参与者路径"/><span class="required">*</span></label>
       <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="partUrl" type="text" datatype="validPath" errormsg="" nullmsg="<spring:message code="BPM.INFOPROCESSMODEL.Tip34" text="请输入参与者路径"/>" data-bind="value: partUrl">
             <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>
<%--     <div class="form-group">
        <label for="position" class="col-xs-3 col-md-3 text-right">类别</label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control input-sm ue-form" id="partCategory" name="partCategory"  data-bind="value: partCategory" readonly="true">
                <option value="1">用户自定义</option>
                <option value="0">系统默认</option>
            </select>
            <span class="Validform_checktip ue-form-wrap-span"></span>
        </div>
    </div> --%>
    <div class="form-group" id="div1">
        <label for="partRule" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.ParticipantsRule" text="参与者规则"/></label>
        <div class="col-xs-8 col-md-8">
      	 	<textarea id="partRule" class="form-control ue-form Validform_input" rows="2" data-bind="value: partRule"></textarea>
       		<button  id="change" type="button" class="btn ue-btn addClass">
					<span class="fa fa-pencil "></span><spring:message code="BPM.INFOPROCESSMODEL.Modify" text="修改"/>
			</button>
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
	if (id != "context") {
		$("#div1").hide();
	}
	if(status != "new") {
		partUrlDefDataset.load();
		/*****id="context"*****/
		if(id == "context"){
			interval=setInterval(set,10);
		}
	} else {
		partUrlDefDataset.newRecord();
		$("#isVisible :radio[value=1]").prop("checked",true);
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
        datatype:{
        	"vaildName":VaildName,
			"validPath": ValidPath
		}
    });
	/***********************************/
	$("#undo").click(function(){
		undo_click();
	});
	
});
//定时器
var formPartRule;
function set(){
	//num
	formPartRule=$("#partRule").val();
	savePartRule=formPartRule;
	if(formPartRule){
		getEnum(formPartRule);
		clearInterval(interval);
	}
}
//枚举
function getEnum(formPartRule){
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PART_RULE");
	command.execute();
	partRuleEnum = command.getData();
	var text = "";
	if (formPartRule){
		var arr = new Array();
		arr = formPartRule.split(",");
		for(var i = 0; i < arr.length; i++) {
			for(index in partRuleEnum) {
				if(partRuleEnum[index].value == arr[i]) {
					text += partRuleEnum[index].text;
					text += ",";
					break;
				}
			}
		}
		text=text.substring(0,text.length-1);
		$("#partRule").prop("value", text);
	}
}
$("#change").click(function(){
		parent.$.dialog({
			type: "iframe",
			title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Update","修改"),
			url: "modifyPartUrlDef_Context.jsp?formPartRule="+formPartRule,
			width: 800,
			height: 320,
	        onclose: function () {
	            if(this.returnValue){
	           	 	savePartRule=(this.returnValue);
	           	 	getEnum(this.returnValue);
	            }
			}
		});
});

//名称校验
function VaildName(gets, obj, curform, regxp) {
	if(gets == null || gets == "") {
		return false;
	}
	if(gets.length > 100) {
		obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip30","不能超过100字符"));
		return false;
	}
	if(!gets.match(/^(\w|[\u4e00-\u9fa5]|\-|\(|\)|\（|\）)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip31","不能输入特殊字符！"));
		return false;
	}else if(gets.match(/^[0-9]/)){
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip35","不能以数字开头"));
		return false;
	}
	if(status=="new"){
		var command = new L5.Command("org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlQueryDefCmd");
		command.setParameter("NAME",gets);
		command.execute();
		if(command.getData().length>0){
			obj.attr("errormsg",L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip36","ID已存在"));
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
	if(!gets.match(/^(\w|\.|\/|\-|\\)+$/)) {
		obj.attr("errormsg", L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip31","不能输入特殊字符！"));
		return false;
	}
	return true;
}
//保存功能
function save_click() {
	var status = "<%=status %>";
	var records = partUrlDefDataset.getCurrent();
	if(status == "new"){
		records.state = 1;
		records.set("partCategory",1);
		records.set("isVisible",$("input[name='isVisible']:checked").val());
		if(!$("#displayOrder").val()){
			records.set("displayOrder",0);
		}
	} else {
		records.state = 3;
		if(id == "context"){
			records.set("partRule",savePartRule);
		}
	}
	records.set("partUrl",$("#partUrl").val());
	
	var command = new L5.Command("org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlDefCmd");
	command.setParameter("records", [records]);
	command.execute("save");
	
	var dialog = parent.dialog.get(window);
	if (!command.error) {
		dialog.close(true);
		//PAlet("保存数据成功！");
	}else{
		//dialog.close();
		//PAlet(command.error.msg);
		//return  false;
		sticky(command.error.msg, 'error', 'center');
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
}

//加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PART_VISIBLE");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' name='isVisible' value='"+ saveVal +"' data-bind='checked:isVisible'/>"+ showVal +"</label> "
		// 添加到页面
		$("#isVisible").append(radio);
	}
}
</script>
</body>
</html>