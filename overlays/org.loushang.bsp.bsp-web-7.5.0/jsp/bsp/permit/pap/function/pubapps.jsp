<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>应用</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
	
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
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='knockout.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="appForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="appCode"><spring:message code="bsp.function.036" text="应用编码"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	      	 <c:if test="${ object.appCode == null }">
	      	 	<input autofocus="autofocus" id="appCode" name="appCode" class="form-control ue-form Validform_input" type="text" datatype="appCode" nullmsg="<spring:message code="bsp.function.037" text="编码不能为空"/>" value="${object.appCode}">
	      	 </c:if>
	      	 <c:if test="${ object.appCode != null }">
	      	 	<input readonly="readonly" autofocus="autofocus" id="appCode" name="appCode" class="form-control ue-form Validform_input" type="text" datatype="*1-30" nullmsg="<spring:message code="bsp.function.037" text="编码不能为空"/>" value="${object.appCode}">
	      	 </c:if>
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="appName"><spring:message code="bsp.function.004" text="应用名称"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input autofocus="autofocus" id="appName" name="appName" class="form-control ue-form Validform_input" type="text" datatype="*1-60" nullmsg="<spring:message code="bsp.function.038" text="名称不能为空"/>" value="${object.appName}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="transport" style="padding-top: 0px;margin-bottom: 0px;margin-top: 6px;"><spring:message code="bsp.function.039" text="设置应用地址"/></label>
	      <div class="col-xs-9 col-md-9 checkbox" style="padding-left: 35px;">
	      	<input type="checkbox" id="UriCheckbox" class="form-control" value="" <c:if test="${!empty object.transport }" >checked="checked"</c:if>>&nbsp;&nbsp;
	      	<span style="color:#999999; font-size:12px"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="transport"><spring:message code="bsp.function.010" text="传输协议"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9 radio">
	         <label><input type="radio" id="radio1" class="Radio" name="transport" value="http" disabled="disabled" <c:if test="${object.transport == 'http' || empty object.transport }" >checked="checked"</c:if>/> http</label>&nbsp;&nbsp;
	         <label><input type="radio" id="radio2" class="Radio" name="transport" value="https" disabled="disabled" <c:if test="${object.transport == 'https'}" >checked="checked"</c:if>/> https</label>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right " for="serverHost"><spring:message code="bsp.function.011" text="服务器地址"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="serverHost" name="serverHost" disabled="disabled" class="form-control ue-form Validform_input uriHidden" type="text" value="${object.serverHost}" datatype="*1-30" nullmsg="<spring:message code="bsp.function.040" text="服务器地址不能为空"/>">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="port"><spring:message code="bsp.function.041" text="端口号"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="port" name="port" disabled="disabled" class="form-control ue-form Validform_input uriHidden" type="text" value="${object.port}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="context"><spring:message code="bsp.function.012" text="上下文根"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="context" name="context" class="form-control ue-form Validform_input" type="text" value="${object.context}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="seq"><spring:message code="bsp.function.013" text="顺序号"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="seq" name="seq" class="form-control ue-form Validform_input" datatype="n1-8" errormsg="<spring:message code="bsp.function.076" text="请输入1-8位数字"/>" nullmsg="<spring:message code="bsp.function.042" text="请填写顺序号"/>" type="text" value="${object.seq}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="note"><spring:message code="bsp.function.043" text="备注"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="note" name="note" class="form-control ue-form Validform_input" rows="1" datatype="*1-300" errormsg="<spring:message code="bsp.function.044" text="不能超过300字符"/>" ignore="ignore" value="${object.note }">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-9 col-md-9">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.function.045" text="保存"/></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.function.046" text="取消"/></button>
	      </div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var context = "<l:assetcontext/>";
var status = "${param.status}";
var dialog = parent.dialog.get(window);

$(function(){
	if(status == "create") {
		$("#seq").val("${param.seq}");
	}else{
	}
	// 校验
	$("#appForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype:{
			"appCode": ValidAppCode
		},
		callback: function(form){
			saveVal();
		}
	});

	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
	//初始化时 uri 未勾选，对不可用的标签元素属性做一些处理
	if(!$("#UriCheckbox").is(":checked")){
		$(".Radio").removeAttr("checked");
		$("#serverHost").removeAttr("datatype");

	}else {
		$(".Radio").removeAttr("disabled");
		$(".uriHidden").removeAttr("disabled");
	}
	$("#UriCheckbox").change(function(){
		if($("#UriCheckbox").is(":checked")){
			/* 勾选时：
				1、移除单选框、指定 input 的 disabled 属性。
				2、向单选框添加默认选中项。此处要选用 prop() 方法。
				3、添加服务器地址的验证。
				4、若上下文根不填写、为保证可查询出该应用，将该值置为"".
			*/
			$(".Radio").removeAttr("disabled");
			$(".uriHidden").removeAttr("disabled");
			if("${object.transport == 'http' || empty object.transport }"=="true"){
				$("#radio1").prop("checked",true);
			}
			if("${object.transport == 'https'}"=="true"){
				$("#radio1").removeAttr("checked");
				$("#radio2").prop("checked",true);
			}
			$("#serverHost").attr("datatype", "*1-30");
			$("#serverHost").after("<span class='Validform_checktip Valiform_span'></span>");
			if($("#context").val()==""){
				$("#context").val(" ");
			}
		}else{
			/* 没有勾选时
				1、移除单选框的 checked 属性。
				2、向单选框、指定 input 添加 disabled 属性。
				3、移除服务器地址的验证。
			*/
			$(".Radio").removeAttr("checked");
			$(".Radio").attr("disabled", "disabled");
			$(".uriHidden").attr("disabled", "disabled");
			$("#serverHost").removeAttr("datatype");
			$("#serverHost+span").remove();
		}
	});
})

function ValidAppCode(gets, obj, curform, regxp){
	var msg1 = L.getLocaleMessage("bsp.function.047","不能超过30个字符");
	var msg2 = L.getLocaleMessage("bsp.function.048","应用编码已存在");
	var results;
	if(gets == null || gets == ""){
		return false;
	}
	if(gets.length >30){
		obj.attr("errormsg",msg1);
		return false;
	}
	$.ajax({
		url: context + "/service/bsp/function/isExistAppCode?appCode="+gets,
		type: "post",
		async: false,
		success: function(result){
			if(result == "1"){
				results = true;
			}else{
				results = false;
			}
		}
	});
	
	if(results){
		obj.attr("errormsg",msg2);
		return false;
	}else{
		return true;
	}
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/function/updateApp";
	if(status == "create") {
		url = context + "/service/bsp/function/createApp";
	}
	
	$("#appForm").ajaxSubmit({
        type: "post",
        url: url,
        error:function(data){
            alert("error："+data);  
        },
        success:function(data){
        	dialog.close(true);
    		dialog.remove();
    		return false;
        }  
    });
	return false;
}

// 取消
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>