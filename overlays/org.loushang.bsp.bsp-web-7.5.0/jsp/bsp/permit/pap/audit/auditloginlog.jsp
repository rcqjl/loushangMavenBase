<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8"%>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<title>登录日志</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/audit/auditloginlog.css'/>" />

<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/audit/auditloginlog.js'/>"></script>
<script id="searchpanel" type="text/html">
	<div class="form-group">
	  <label class="search-label text-right label-border" for="startTime"><spring:message code="bsp.auditlog.000" text="开始时间："/></label>
	  <div class="col-xs-8 col-md-8 search-input input-group date dateDemo" style=" margin-left: 4px;">
	    <div id="create-date">
	      <input type="text" class="form-control ue-form" id="startTime" placeholder="<spring:message code="bsp.auditlog.001" text="请输入开始时间"/>" /></div>
	    <span class="input-group-addon ue-form-btn">
	      <i class="fa fa-calendar"></i>
	    </span>
	  </div>
	</div>
	<div class="form-group">
	  <label class="search-label text-right label-border" for="endTime"><spring:message code="bsp.auditlog.002" text="结束时间："/></label>
	  <div class="col-xs-8 col-md-8 search-input input-group date dateDemo" style=" margin-left: 4px;">
	    <div id="create-date">
	      <input type="text" class="form-control ue-form" id="endTime" placeholder="<spring:message code="bsp.auditlog.003" text="请输入结束时间"/>" /></div>
	    <span class="input-group-addon ue-form-btn">
	      <i class="fa fa-calendar"></i>
	    </span>
	  </div>
	</div>
	<div class="form-group search-border">
	  <label class="col-xs-3 col-md-3  text-right" for="search"></label>
	  <div class="col-xs-8 col-md-8 search-text">
	    <button id="search" class="btn ue-btn-primary"><spring:message code="bsp.auditlog.004" text="搜索"/></button></div>
	</div>

</script>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false;">
			<div class="input-group max-width">
				<input type="text" class="form-control ue-form" id="toUserNameOrId"
					placeholder="<spring:message code="bsp.auditlog.005" text="用户账号/名称"/>" />
				<div class="input-group-addon ue-form-btn" id="query">
					<span class="fa fa-search"></span>
				</div>
			</div>
			<a class="btn ue-btn dbtn" id="moresearch"><spring:message code="bsp.auditlog.006" text="更多搜索"/><i
				class="fa fa-angle-down" id="faangle"></i></a>
		</form>
		<table id="auditlogList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="16%" data-field="userId" data-sortable="false"><spring:message code="bsp.auditlog.008" text="用户账号"/></th>
					<th width="16%" data-field="userName"><spring:message code="bsp.auditlog.009" text="用户名称"/></th>
					<th width="18%" data-field="logType"><spring:message code="bsp.auditlog.011" text="日志类型"/></th>
					<th width="18%" data-field="loginIp"><spring:message code="bsp.auditlog.011" text="客户端IP"/></th>
					<th width="14%" data-field="logTime"><spring:message code="bsp.auditlog.012" text="操作时间"/></th>
				</tr>
			</thead>
		</table>
	</div>

</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</html>