<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>组织视角</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
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
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="struTypeForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="struType"><spring:message code="bsp.organ.037" text="组织视角ID"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="struType" name="struType" class="form-control ue-form Validform_input" type="text" datatype="struType" nullmsg="<spring:message code="bsp.organ.038" text="ID不能为空"/>" value="${object.struType}">
	         <input id="rootId" name="rootId" type="hidden" value="1">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="typeName"><spring:message code="bsp.organ.039" text="组织视角名称"/><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="typeName" name="typeName" class="form-control ue-form Validform_input" type="text" datatype="ls30" errormsg="请输入30位内的中、英文或下划线" nullmsg="<spring:message code="bsp.organ.040" text="名称不能为空"/>" value="${object.typeName}">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right" for="note"><spring:message code="bsp.organ.041" text="备注"/></label>
	      <div class="col-xs-8 col-md-8">
	         <textarea id="note" name="note" class="form-control ue-form Validform_input" rows="2" datatype="*1-250" errormsg="<spring:message code="bsp.organ.042" text="不能超过250字符"/>" ignore="ignore" >${object.note}</textarea>
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-8 col-md-8">
	      	<input id="isDefault" name="isDefault" type="hidden" value="${object.isDefault}">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.organ.003" text="保存"/></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.organ.004" text="取消"/></button>
	      </div>
	   </div>
	</form>
</body>
<script type="text/javascript">
var context = "<l:assetcontext/>";
var status = "${param.status}";
var dialog = parent.dialog.get(window);

$(function(){
	// 校验
	var vForm = $("#struTypeForm").Validform({
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
			"struType": ValidStruType
		}
	});

	if(status == "edit") {
		// 编辑状态下不能修改组织视角ID，也不需要校验
		$("#struType").attr("readonly", "readonly");
		vForm.ignore("#struType");
	}
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
})

// 校验组织视角ID
function ValidStruType(gets, obj, curform, regxp) {
	var msg1 = L.getLocaleMessage("bsp.organ.043","不能超过10个字符！");
	var msg2 = L.getLocaleMessage("bsp.organ.044","ID已存在！");
	if (gets == null || gets == "") {
		return false;
	}
	if(!regxp["ls"].test(gets)) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.common.000","请输入中、英文或下划线"));
		return false;
	}
	if(gets.length > 10) {
		obj.attr("errormsg", msg1);
		return false;
	}
	var isExist = false;
	$.ajax({
		url : context + "/service/bsp/organ/isExistStruType/" + gets,
		async : false,
		success : function(data) {
			isExist = data;
		}
	});
	if (isExist) {
		obj.attr("errormsg", msg2);
		return false;
	}

	return true;
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/organ/saveStruType/" + status;
	
	$.ajax({
		type: "post",
        url: url,
        async: false,
        data: $("#struTypeForm").serialize(),
        error:function(data){
            alert(data.responseText);
        },
        success:function(data){
        	dialog.close(true);
    		dialog.remove();
    		return false;
        }
	});
}

// 取消
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>