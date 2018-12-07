<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>URL</title>
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
		.form-horizontal .radio {
			padding-top: 0;
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
	<form class="form-horizontal" id="urlForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="urlName"><spring:message code="bsp.function.033" text="URL名称"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="urlCode" name="urlCode" type="hidden" value="${object.urlCode}">
	         <input autofocus="autofocus" id="urlName" name="urlName" class="form-control ue-form Validform_input" type="text" datatype="*1-60" nullmsg="<spring:message code="bsp.function.049" text="名称不能为空"/>" value="${object.urlName}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="urlContent"><spring:message code="bsp.function.034" text="URL内容"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="urlContent" name="urlContent" class="form-control ue-form Validform_input" type="text" datatype="urlContent" nullmsg="<spring:message code="bsp.function.056" text="内容不能为空"/>" value="${object.urlContent}">
	         <input id="functionCode" name="functionCode" type="hidden" value="${object.functionCode}">
	         <input id="operationCode" name="operationCode" type="hidden" value="${object.operationCode}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="accessType"><spring:message code="bsp.function.057" text="操作方式"/></label>
	      <div class="col-xs-9 col-md-9">
	         <select id="accessType" name="accessType" class="form-control ue-form Validform_input">
	         	<option value="http" <c:if test="${object.accessType == 'http'}" >selected='selected'</c:if>>http</option>
	         	<option value="webservice" <c:if test="${object.accessType == 'webservice'}" >selected='selected'</c:if>><spring:message code="bsp.function.058" text="web服务"/></option>
	         </select>
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>

	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="seq"><spring:message code="bsp.function.035" text="是否默认"/></label>
	      <div class="col-xs-9 col-md-9 radio">
      		<label><input type="radio" name="seq" value="0" <c:if test="${object.seq == '0' || param.status == 'create'}" >checked="checked"</c:if> /><spring:message code="bsp.function.051" text="是"/></label>&nbsp;&nbsp;
      		<label>
      			<input type='radio' name="seq" value="1" <c:if test="${object.seq == '1'}" >checked="checked"</c:if>/><spring:message code="bsp.function.052" text="否"/>
      		</label>
     		<span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="note"><spring:message code="bsp.function.043" text="备注"/></label>
	      <div class="col-xs-9 col-md-9">
	         <textarea id="note" name="note" class="form-control ue-form Validform_input" rows="2" datatype="*1-300" errormsg="<spring:message code="bsp.function.044" text="不能超过300字符"/>" ignore="ignore">${object.note }</textarea>
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
var status = "${ param.status }";
var dialog = parent.dialog.get(window);

$(function(){
	if(status == "create") {
		$("#seq").val("${ param.seq }");
		$("#operationCode").val("${ param.operationCode }");
		$("#functionCode").val("${ param.functionCode }");
	}else{
	}
	// 校验
	$("#urlForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback: function(form){
			saveVal();
		},
		datatype: {
			"urlContent": validUrlContent
		}
	});

	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
})

// 校验url内容
function validUrlContent(gets, obj, curform, regxp) {
	var msg = L.getLocaleMessage("bsp.function.058","URL内容已存在");
	// 编辑状态下如果没有改动url内容，则不需要校验
	if(status == "update" && "${object.urlContent}" == gets)
		return true;
	
	if(gets == null || gets == "") {
		return false;
	}
	
	var isExist = "0";
	$.ajax({
		url: context + "/service/bsp/function/isExistUrlContent",
		data: {urlContent: gets},
		async: false,
		success: function(result) {
			isExist = result;
		},
		error: function(e) {
			alert("请求出错！");
		}
	})
	
	if(isExist == "1"){
		obj.attr("errormsg",msg);
		return false;
	}
	
	return true;
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/function/updateUrl";
	if(status == "create") {
		url = context + "/service/bsp/function/createUrl";
	}
	
	$("#urlForm").ajaxSubmit({
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