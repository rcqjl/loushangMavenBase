<!DOCTYPE html>
<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	String parentMenuName = URLDecoder.decode(request.getParameter("parentMenuName"),"utf8");
	request.setAttribute("parentMenuName", parentMenuName);
%>
<html>
<head>
	<title>菜单项</title>
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
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='knockout.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="menuItemForm" onsubmit="return false">
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="menuParentName"><span><spring:message code="bsp.menu.013" text="上级菜单"></spring:message></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="parentMenuName" name="parentMenuName" class="form-control ue-form Validform_input" readonly="readonly" type="text" value="${object.menuParentName}">
	         <input id="parentMenuId" name="parentMenuId" type="hidden" value="${object.parentMenuId}">
	         <input id="menuTypeId" name="menuTypeId" type="hidden" value="${object.menuTypeId}">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="menuName"><spring:message code="bsp.menu.014" text="菜单名称"></spring:message><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="menuName" name="menuName" class="form-control ue-form Validform_input" type="text" datatype="menuname" nullmsg="<spring:message code="bsp.menu.015" text="名称不能为空"></spring:message>" value="${object.menuName}">
	         <input id="menuId" name="menuId" type="hidden" value="${object.menuId}">
	         <input id="menuStruId" name="menuStruId" type="hidden" value="${object.menuStruId}">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="target"><spring:message code="bsp.menu.016" text="目标区域"></spring:message></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="target" name="target" class="form-control ue-form Validform_input" type="text" value="${object.target}">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="icon"><spring:message code="bsp.menu.017" text="图标路径"></spring:message></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="icon" name="icon" class="form-control ue-form Validform_input" type="text" value="${object.icon}">
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="requestAction"><spring:message code="bsp.menu.018" text="请求对象"></spring:message></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="requestAction" name="requestAction" class="form-control ue-form Validform_input" type="text" value="${object.requestAction}">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="isLeaf"><spring:message code="bsp.menu.019" text="是否叶子节点"></spring:message></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="isLeaf" name="isLeaf" class="form-control Validform_input" type="checkbox" value="1" <c:if test="${object.isLeaf == '1' }">checked="chdecked"</c:if>>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3 text-right" for="seq"><spring:message code="bsp.menu.020" text="顺序号"></spring:message><span class="required">*</span></label>
	      <div class="col-xs-9 col-md-9">
	         <input id="seq" name="seq" class="form-control ue-form Validform_input" type="text" datatype="n1-8" errormsg="<spring:message code="bsp.menu.043" text="请输入1-8位数字"/>" nullmsg="<spring:message code="bsp.menu.021" text="序号不能为空"></spring:message>" value="${object.seq}">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-3 col-md-3  text-right"></label>
	      <div class="col-xs-9 col-md-9">
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
	$("#parentMenuName").val("${parentMenuName}");
	if(status == "create") {
		$("#parentMenuId").val("${param.parentMenuId}");
		$("#menuTypeId").val("${param.menuTypeId}");
	}
	// 校验
	$("#menuItemForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl){
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype: {
			"menuname": validMenu
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

function validMenu(gets, obj, curform, regxp) {
	var reg = /^[\u4E00-\u9FA5A-Za-z0-9_·,:\u0020]+$/;
	if (gets == null || gets == "") {
		return false;
	}
	if (gets.length > 60) {
		var msg = L.getLocaleMessage("bsp.menu.044","不能超过60个字符");
		obj.attr("errormsg", msg);
		return false;
	}
	if(!reg.test(gets)) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.menu.045","请输入中、英文或下划线"));
		return false;
	}
}

// 保存
function saveVal() {
	var url = context + "/service/bsp/menu/updateMenuItem";
	if(status == "create") {
		url = context + "/service/bsp/menu/createMenuItem";
	}
	
	$("#menuItemForm").ajaxSubmit({
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