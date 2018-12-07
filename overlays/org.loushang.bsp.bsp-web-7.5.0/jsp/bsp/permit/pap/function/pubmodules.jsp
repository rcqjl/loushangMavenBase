<!DOCTYPE html>
<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	if("create".equals(request.getParameter("status"))) {
		String parentModuleName = URLDecoder.decode(request.getParameter("parentModuleName"),"utf8");
		String appName = URLDecoder.decode(request.getParameter("appName"),"utf8");
		String moduleIsMenu = request.getParameter("moduleIsMenu");
		request.setAttribute("parentModuleName", parentModuleName);
		request.setAttribute("appName", appName);
		request.setAttribute("moduleIsMenu", moduleIsMenu);
	}else{
		String moduleIsMenu = request.getParameter("moduleIsMenu");
		request.setAttribute("moduleIsMenu", moduleIsMenu);
	}
%>
<html>
<head>
	<title>模块</title>
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
	<form class="form-horizontal" id="moduleForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="moduleName"><spring:message code="bsp.function.015" text="模块名称"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input autofocus="autofocus" id="moduleName" name="moduleName" class="form-control ue-form Validform_input" type="text" datatype="*1-60" nullmsg="<spring:message code="bsp.function.049" text="名称不能为空"/>" value="${object.moduleName}">
	         <input id="moduleCode" name="moduleCode" type="hidden" value="${object.moduleCode}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="parentModuleName"><spring:message code="bsp.function.053" text="上级模块"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="parentModuleName" readonly="readonly" name="parentModuleName" class="form-control ue-form Validform_input" type="text" value="${object.parentModuleName}">
	         <input id="parentModuleCode" name="parentModuleCode" type="hidden" value="${object.parentModuleCode}">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="isLeafModule"><spring:message code="bsp.function.020" text="是否末级模块"/></label>
	      <div class="col-xs-9 col-md-9 isLeafModule">
      		<label><input type="radio" name="isLeafModule" value="1" <c:if test="${object.isLeafModule == '1' || param.status == 'create'}" >checked="checked"</c:if> /> <spring:message code="bsp.function.051" text="是"/></label>&nbsp;&nbsp;
      		<label><input type='radio' name="isLeafModule" value="0" <c:if test="${object.isLeafModule == '0'}" >checked="checked"</c:if> /> <spring:message code="bsp.function.052" text="否"/></label>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="isMenu"><spring:message code="bsp.function.019" text="是否菜单"/></label>
	      <div class="col-xs-9 col-md-9 moduleIsMenu">
      		<label><input type="radio" name="isMenu" value="1" <c:if test="${object.isMenu == '1'  || param.status == 'create'}" >checked="checked"</c:if> /> <spring:message code="bsp.function.051" text="是"/></label>&nbsp;&nbsp;
      		<label><input type='radio' name="isMenu" value="0" <c:if test="${object.isMenu == '0'}" >checked="checked"</c:if> /> <spring:message code="bsp.function.052" text="否"/></label>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="appName"><spring:message code="bsp.function.054" text="所属应用"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="appName" name="appName" readonly="readonly" class="form-control ue-form Validform_input" type="text" value="${object.appName}">
	         <input id="appCode" name="appCode" type="hidden" value="${object.appCode}">
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
	      <label class="col-xs-3 col-md-3 text-right" for="icon"><spring:message code="bsp.function.024" text="图标路径"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="icon" name="icon" class="form-control ue-form Validform_input" type="text" value="${object.icon}">
	         <span class="Validform_checktip Valiform_span"></span>
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
var status = "${ param.status }";
var dialog = parent.dialog.get(window);

$(function(){
	var msg1 = L.getLocaleMessage("bsp.function.051","是");
	var msg2 = L.getLocaleMessage("bsp.function.052","否");
	if(status == "create") {
		$("#seq").val("${ param.seq }");
		$("#parentModuleCode").val("${ param.parentModuleCode }");
		$("#parentModuleName").val("${ parentModuleName }");
		$("#appCode").val("${ param.appCode }");
		$("#appName").val("${ appName }");
		if(${moduleIsMenu == '0'}){
			$(".moduleIsMenu").find("input:first").removeAttr("checked");
			$(".moduleIsMenu").find("input:last").attr("checked","checked");
			$(".moduleIsMenu").find("input:first").attr("disabled","true");
		}
	}else{
		$(".isLeafModule label").hide();
		$(".isLeafModule").append(${object.isLeafModule == '1'} ? msg1 : msg2);
		if(${moduleIsMenu == '0'}){
			$(".moduleIsMenu").find("input:first").removeAttr("checked");
			$(".moduleIsMenu").find("input:last").attr("checked","checked");
			$(".moduleIsMenu").find("input:first").attr("disabled","true");
		}
	}
	// 校验
	$("#moduleForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback: function(form){
			saveVal();
		}
	});

	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
})

// 保存
function saveVal() {
	var url = context + "/service/bsp/function/updateModule";
	if(status == "create") {
		url = context + "/service/bsp/function/createModule";
	}
	
	$("#moduleForm").ajaxSubmit({
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