<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>添加类型</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.text-right{
			padding-top:6px;
		}
	</style>
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/organ/addorgan.js'/>"></script>
</head>
<body>
	<form class="form-horizontal" id="organItemForm" onsubmit="return false">
		<input id="parentOrganType" class="parentOrganType" name="parentOrganType" value="${parentOrganType }" type="hidden">
	   <div class="form-group form-group2">
	      <label class="col-xs-2 col-md-3 text-right" for="organType"><spring:message code="bsp.organ.000" text="类型编码"/><span class="required">*</span></label>
	      <div class="col-xs-10 col-md-8">
	         <input id="organType" name="organType"  class="form-control ue-form Validform_input" type="text" value="${update_organType}"  datatype="valid_organType,ls10" nullmsg="<spring:message code="bsp.organ.001" text="请填入信息"/>" errormsg="" style="width: 186px;">
	         <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-2 col-md-3 text-right" for="typeName"><spring:message code="bsp.organ.002" text="类型名称"/><span class="required">*</span></label>
	      <div class="col-xs-10 col-md-8">
	         <input id="typeName" name="typeName" class="form-control ue-form Validform_input" type="text" value="${update_typeName}" datatype="ls60" nullmsg="<spring:message code="bsp.organ.001" text="请填入信息"/>" errormsg="" style="width: 186px;">
	      	 <span class="Validform_checktip Validform_span"></span>
	      </div>
	   </div>
	   <div class="form-group">
	      <label class="col-xs-2 col-md-3  text-right"></label>
	      <div class="col-xs-10 col-md-8">
	      	<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.organ.003" text="保存"/></button>
	      	<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.organ.004" text="取消"/></button>
	      </div>
	   </div>
	</form>

</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
	var dialog = parent.dialog.get(window);
	var parentTypeName="${parentTypeName}";
	var parentOrganType="${parentOrganType}";
	var update_organType="${update_organType}";
	var update_typeName="${update_typeName}";
	var status="${status}";
	
	$(function(){
		
		if(status=="update"){
			$("#organType").attr("disabled","disabled")
							.removeAttr("datatype");
			
		}
	});
</script>
</html>