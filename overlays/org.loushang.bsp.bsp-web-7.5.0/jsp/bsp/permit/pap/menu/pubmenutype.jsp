<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>菜单类别</title>
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
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="menuTypeForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="menuTypeName"><spring:message code="bsp.menu.007" text="菜单类别名称"></spring:message><span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="menuTypeName" name="menuTypeName" class="form-control ue-form Validform_input" type="text" datatype="ls30" nullmsg="<spring:message code="bsp.menu.008" text="名称不能为空!"></spring:message>" value="${object.menuTypeName}">
	     	 <span class="Validform_checktip Validform_span"></span>
	       </div>
	    </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="menuTypeId">菜单类别ID<span class="required">*</span></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="menuTypeId" name="menuTypeId" class="form-control ue-form Validform_input" type="text"
				datatype="lse,ls10,menutypeid" <c:if test="${param.status == 'edit'}" >readonly="readonly"</c:if>
				nullmsg="<spring:message code="bsp.menu.008" text="ID不能为空!"></spring:message>" value="${object.menuTypeId}"
				errormsg="请输入10以内的英文、数字或_">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="isSysDefault"><spring:message code="bsp.menu.009" text="是否默认菜单"></spring:message></label>
	      <div class="col-xs-8 col-md-8">
	         <input id="isSysDefault" name="isSysDefault" type="checkbox" value="1" <c:if test="${object.isSysDefault == '1'}">checked="checked"</c:if>>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-8 col-md-8">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.menu.010" text="保存"></spring:message></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.menu.005" text="取消"></spring:message></button>
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
	$("#menuTypeForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype: {
			"menutypeid": ValidmenuTypeId
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

function ValidmenuTypeId(gets, obj, curform, regxp) {
	var msg1 = L.getLocaleMessage("bsp.menu.012","菜单类型ID已存在!");
	var results;
	
	gets = encodeURI(gets);
	gets = encodeURI(gets);
	$.ajax({
		
		url: context + "/service/bsp/menu/isExistMenuTypeId?menuTypeId="+gets+"&status="+status,
		type: "post",
		async: false,
		success: function(result) {
			if (result) {
				results = true;
			} else {
				results = false;
			}
		}
	});

	if (results) {
		obj.attr("errormsg", msg1);
		return false;
	} else {
		return true;
	}
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/menu/updateMenuType";
	if(status == "create") {
		url = context + "/service/bsp/menu/createMenuType";
	}
	
	$.ajax({
		type: "post",
        url: url,
        async: false,
        data: $("#menuTypeForm").serialize(),
        error:function(data){
            alert("error："+data);
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