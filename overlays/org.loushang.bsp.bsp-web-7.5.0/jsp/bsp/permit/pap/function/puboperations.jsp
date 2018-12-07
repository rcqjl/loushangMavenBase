<!DOCTYPE html>
<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	if("create".equals(request.getParameter("status"))) {
		String functionName = URLDecoder.decode(request.getParameter("functionName"),"utf8");
		request.setAttribute("functionName", functionName);
	}
%>
<html>
<head>
	<title>操作</title>
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
	<script type="text/javascript" src="<l:asset path='bsp/bsp-convertToPinyinLower.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="operationForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="operationName"><spring:message code="bsp.function.025" text="操作名称"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input autofocus="autofocus" id="operationName" name="operationName" class="form-control ue-form Validform_input" type="text" datatype="*1-60" nullmsg="<spring:message code="bsp.function.049" text="名称不能为空"/>" value="${object.operationName}">
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	     <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="operationCode"><spring:message code="bsp.function.077" text="操作编码"/><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="operationCode" name="operationCode" class="form-control ue-form Validform_input" type="text" datatype="operationCodeValid,*1-30" nullmsg="<spring:message code="bsp.function.078" text="编码不能为空"/>" value="${object.operationCode}"
	         <c:if test="${param.status != 'create'}"> readonly="readonly"</c:if> />
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="functionName"><spring:message code="bsp.function.055" text="所属功能"/></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="functionName" readonly="readonly" name="functionName" class="form-control ue-form Validform_input" type="text" value="${object.functionName}">
	         <input id="functionCode" name="functionCode" type="hidden" value="${object.functionCode}">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="operationName"><spring:message code="bsp.function.028" text="操作类型"/></label>
	      <div class="col-xs-9 col-md-9 radio">
	         <c:forEach items="${operationType}" var="item" varStatus="itemStatus">
         		<label><input type="radio" name="operationTypeCode" value="${item.operationTypeCode}" <c:if test="${object.operationTypeCode == item.operationTypeCode || (param.status == 'create' && itemStatus.first)}" >checked="checked"</c:if> /> ${item.operationTypeName}</label>
         		<c:if test="${!itemStatus.last}">&nbsp;&nbsp;</c:if>
			 </c:forEach>
	         <span class="Validform_checktip Valiform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="isDefault"><spring:message code="bsp.function.029" text="是否默认操作"/></label>
	      <div class="col-xs-9 col-md-9 radio">
      		<label><input type="radio" name="isDefault" value="1" <c:if test="${object.isDefault == '1' || param.status == 'create'}" >checked="checked"</c:if> /><spring:message code="bsp.function.051" text="是"/></label>&nbsp;&nbsp;
      		<label>
      			<input type='radio' name="isDefault" value="0" <c:if test="${object.isDefault == '0'}" >checked="checked"</c:if>/><spring:message code="bsp.function.052" text="否"/>
      		</label>
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
		$("#functionCode").val("${param.functionCode}");
		$("#functionName").val("${functionName}");
		//操作名称失去焦点事件
		var focusblurid = $("#operationName");
		focusblurid.blur(function(){
			 var thisval = $(this).val();
			 if(thisval != "" && thisval.length<=60) { 
				 var pinyinval = pinyin.getFullChars(thisval);
				 var pinyinValue = "oper_" + pinyinval.toLowerCase();
				 if(pinyinValue.length<=30) {
					 $("#operationCode").val(pinyinValue);
				 } else {
					 pinyinValueLimit = pinyinValue.substring(0,30);
					 $("#operationCode").val(pinyinValueLimit);
				 }
			   } else {
				   $("#operationCode").val("");
			   }
		  });
	}
	
	// 校验
	$("#operationForm").uValidform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype : {
			"operationCodeValid" : ValidOperationCode
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

//校验
function ValidOperationCode(gets, obj, curform, regxp) {
	var msg = L.getLocaleMessage("bsp.function.079", "操作编码已存在");
	var results;
	if (gets == null || gets == "") {
		return false;
	}
	if (status == "create") {
		$.ajax({
			url : context + "/service/bsp/function/isExistOperationCode?operationCode="
					+ gets,
			type : "post",
			async : false,
			success : function(flag) {
				if (flag == "0") {
					results = true;
				} else {
					results = false;
				}
			}
		});

		if (results) {
			return true;
		} else {
			obj.attr("errormsg", msg);
			return false;
		}
	}
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/function/updateOperation";
	if(status == "create") {
		url = context + "/service/bsp/function/createOperation";
	}
	
	$("#operationForm").ajaxSubmit({
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