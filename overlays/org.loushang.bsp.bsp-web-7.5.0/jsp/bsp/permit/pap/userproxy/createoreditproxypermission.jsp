<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="bsp.userproxy.010" text="委托项"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userproxy/createoreditproxypermission.js'/>"></script>
<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var status = "${status}";
	var proxyPermissionId = "${proxyPermissionId}";
	var note = "${note}";
</script>
</head>
<body>
	<form class="form-horizontal" id="Form" name="Form"
		onsubmit="return false">

		<div class="form-group " style="margin-top: 30px";>
			<label class="col-xs-3 col-md-3 text-right" for="proxyPermissionName"><spring:message code="bsp.userproxy.005" text="委托项名称"/><span
				class="required" style="top: auto;">*</span></label>
			<div class="col-xs-9 col-md-8">
				<input id="proxyPermissionName" name="proxyPermissionName"
					class="form-control ue-form Validform_input" type="text"
					value="${proxyPermissionName}" datatype="ls60" errormsg="" nullmsg="<spring:message code="bsp.userproxy.002" text="请输入委托项名称"/>" style="width: 50%;">
				<span class="Validform_checktip Validform_span"></span>
			</div>
		</div>

		<div class="form-group" style="margin-top: 30px"; >
			<label class="col-xs-3 col-md-3 text-right" for="note"><spring:message code="bsp.userproxy.006" text="描述"/></label>
			<div class="col-xs-8 col-md-8" style="height: 165px;">

				<textarea id="note" style="resize: none;"
					class="form-control ue-form" name="note" rows="5px"></textarea>
				<span class="Validform_checktip Validform_span"></span>
			</div>
		</div>

		<div class="form-group button">
			<label class="col-xs-3 col-md-3  text-right"></label>
			<div class="col-xs-8 col-md-8" >
				<button id="saveVal" type="button" class="btn ue-btn-primary"><spring:message code="bsp.userproxy.012" text="保存"/></button>
				<button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.userproxy.013" text="取消"/></button>
			</div>
		</div>
	</form>
</body>
</html>