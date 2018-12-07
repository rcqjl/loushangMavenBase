<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
  <title><spring:message code="bsp.userproxy.024" text="权限委托"/></title>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>  
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
  <link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/userproxy/createoredituserproxy.css'/>"/>
  
  <!--[if lt IE 9]>
    <script src="<l:asset path='html5shiv.js'/>"></script>
    <script src="<l:asset path='respond.js'/>"></script>
  <![endif]-->
  <script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='form.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
  <script type="text/javascript" src="<l:asset path='bsp/userproxy/createoredituserproxy.js'/>"></script>
</head>
<body>
    <div id="bread" class="bread">
		<a href="<%=request.getContextPath()%>/service/bsp/userproxylist/"><spring:message code="bsp.userproxy.024" text="权限委托"/></a>&nbsp;&nbsp;&gt;&nbsp;&nbsp;<span id="tip"><spring:message code="bsp.userproxy.003" text="增加"/></span></div>
  <form class="form-horizontal" id="userProxyForm" name="userProxyForm" onsubmit="return false" style="margin-top: 50px;">
                        
    <div class="form-group">
      <label class="col-xs-3 col-md-3 text-right" for="userId"><spring:message code="bsp.userproxy.025" text="委托人"/><span class="required" style="top: auto;">*</span></label>
      <div class="col-xs-9 col-md-8">
        <input id="userId" name="userId" type="hidden" value="${userId}" />
        <input id="userName" name="userName" class="form-control ue-form Validform_input" type="text" value="${userName}" disabled="disabled">
      </div>
    </div>
              
    <div class="form-group">
      <label class="col-xs-3 col-md-3 text-right" for="proxyUserName"><spring:message code="bsp.userproxy.026" text="代理人"/><span class="required" style="top: auto;">*</span></label>
      <div class="col-xs-9 col-md-8">
        <div  class="input-group Validform_input">
          <input id="proxyUserName" name="proxyUserName" readonly="readonly" value="${proxyUserName}" class="form-control ue-form " type="text">
         
           <div class="input-group-addon ue-form-btn select-principal">
            <span id="btn" class="fa fa-user" disabled="disabled"></span>
           </div> 
        </div>
        
        <input id="proxyUserId" name="proxyUserId"  type="hidden" value="${proxyUserId }">  

      </div>
    </div>
              
              
    <div class="form-group">
      <label class="col-xs-3 col-md-3 text-right" for="proxyPermissionType"><spring:message code="bsp.userproxy.029" text="委托类型"/><span class="required" style="top: auto;">*</span></label>
      <div class="col-xs-9 col-md-8">
        <select id="proxyPermissionId" name="proxyPermissionId" class="form-control ue-form Validform_input" style="display:none">
          <option value="0"><spring:message code="bsp.userproxy.038" text="全代理"/></option>
        </select>
        <input id="editproxyPermissionName" name="editproxyPermissionName" readonly="readonly" value="${proxyPermissionName}" class="form-control ue-form Validform_input" type="text" style="display:none">
        <input id="editproxyPermissionId" name="editproxyPermissionId"  value="${proxyPermissionId}" class="form-control ue-form Validform_input" type="hidden">
      </div>
    </div>
              
    <div class="form-group">
      <label class="col-xs-3 col-md-3 text-right " for="startTime"><spring:message code="bsp.userproxy.030" text="生效时间"/></label>
      <div class="col-xs-9 col-md-8 search-input input-group date dateDemo" style="padding-left: 15px; width: 260px;">
        <div id="create-date">
          <input type="text" class="form-control ue-form Validform_input" id="startTime" name="startTime"  value="${startTime}" placeholder="<spring:message code="bsp.userproxy.036" text="请输入生效时间"/>" />
        </div>
        <span class="input-group-addon ue-form-btn">
          <i class="fa fa-calendar"></i>
        </span>            
      </div>

    </div>
    
    <div class="form-group" >
      <label class="col-xs-3 col-md-3 text-right" for="endTime"><spring:message code="bsp.userproxy.031" text="失效时间"/></label>
      <div class="col-xs-9 col-md-8 search-input input-group date dateDemo" style="padding-left: 15px; width: 260px;">
        <div id="create-date">
          <input type="text" class="form-control ue-form" id="endTime" name="endTime"  value="${endTime}" placeholder="<spring:message code="bsp.userproxy.037" text="请输入失效时间"/>" />
        </div>
        <span class="input-group-addon ue-form-btn">
          <i class="fa fa-calendar"></i>
        </span>            
      </div>
    </div>
    
         
    <div class="form-group button" style=" margin-bottom: 20px;">
      <label class="col-xs-3 col-md-3  text-right"></label>
      <div class="col-xs-8 col-md-8">
        <button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.userproxy.012" text="保存"/></button>
        <button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.userproxy.013" text="取消"/></button>
      </div>
    </div>
  </form>
</body>
<script type="text/javascript">
  
  var context = "<l:assetcontext/>";
  var userId = "${userId}";
  var status = "${status}";
  var proxyUserId = "${proxyUserId}";
  var proxyPermissionName = "${proxyPermissionName}";
  var proxyPermissionId = "${proxyPermissionId}";
  var startTime = "${startTime}";
  var endTime = "${endTime}";
  var proxyType = "${proxyType}";
  $(".dateDemo").datetimepicker({
    container: $("#create-date"),
      language: "zh-CN",
      autoclose: 1,
      startView: 2,
      format: "yyyymmdd hh:ii:ss",
    forceParse: 0 ,
    pickerPosition: "bottom-right"
  });
 
</script>
</html>