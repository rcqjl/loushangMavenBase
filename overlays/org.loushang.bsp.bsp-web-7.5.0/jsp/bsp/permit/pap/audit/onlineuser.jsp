<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8"%>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<title><spring:message code="bsp.online.001" text="在线用户"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/audit/onlineuser.css'/>" />

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
<script type="text/javascript" src="<l:asset path='bsp/audit/onlineuser.js'/>"></script>

</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false;">
			<div class="input-group max-width">
				<input type="text" class="form-control ue-form" id="toUserNameOrId"
					placeholder="<spring:message code="bsp.online.002" text="账号/用户名称"/>" />
				<div class="input-group-addon ue-form-btn" id="query">
					<span class="fa fa-search"></span>
				</div>
			</div>
		</form>
		<table id="onlineList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="16%" data-field="userId" data-sortable="false"><spring:message code="bsp.online.003" text="用户账号"/></th>
					<th width="16%" data-field="userName"><spring:message code="bsp.online.004" text="用户名称"/></th>
					<th width="18%" data-field="corporationName"><spring:message code="bsp.online.005" text="单位名称"/></th>
					<th width="18%" data-field="remoteAddr"><spring:message code="bsp.online.006" text="客户端IP"/></th>
					<th width="14%" data-field="loginTime"><spring:message code="bsp.online.007" text="登录时间"/></th>
				</tr>
			</thead>
		</table>
	</div>

</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</html>