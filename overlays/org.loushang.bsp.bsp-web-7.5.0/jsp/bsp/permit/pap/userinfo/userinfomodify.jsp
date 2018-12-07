<%@page import="java.util.Map"%>
<%@page import="org.loushang.bsp.api.user.IUserService"%>
<%@page language="java" contentType="text/html; charset=UTF-8" 
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@page import="org.loushang.bsp.api.user.UserServiceFactory"%>
<%@page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>资料修改</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/userinfo/userinfomodify.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/userinfo/PasswordStrength.css'/>" />


<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
	    <script  type="text/javascript" src="<l:asset path='html5shiv.js'/>"></script>
		<script  type="text/javascript" src="<l:asset path='respond.js'/>"></script>
	<![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userinfo/RSA.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userinfo/md5.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userinfo/passwordstrength.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userinfo/userinfomodify.js'/>"></script>

</head>
<body>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
	
	<div id="bread" class="bread"></div>
	
	<div class="col-xs-10 col-md-10" style="width: 100%">
		<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-3 col-md-3  control-label text-right" style="width: 15%"><span
					class="required">*</span><spring:message code="bsp.userinfo.000" text="当前密码"></spring:message></label>
				<div class="col-xs-9 col-md-9 text-left">
					<input type="password" class="form-control ue-form Validform_input"
						id="oldpassWord" name="oldpassWord" value="" placeholder="<spring:message code="bsp.userinfo.001" text="密码"></spring:message>"
						datatype="checkoldpassword" errormsg="" nullmsg="<spring:message code="bsp.userinfo.002" text="请输入密码"></spring:message>">
					<span class="Validform_span Validform_checktip"></span>
					
				</div>
			</div>
			<div class="form-group" style="margin-top: 20px;">
				<label class="col-xs-3 col-md-3  control-label text-right" style="width: 15%"><span
					class="required">*</span><spring:message code="bsp.userinfo.003" text="新密码"></spring:message></label>
				<div class="col-xs-9 col-md-9 text-left">
					<input type="password" class="form-control ue-form Validform_input"
						id="newpassWord" name="newpassWord" value="" placeholder="<spring:message code="bsp.userinfo.003" text="新密码"></spring:message>"
						datatype="newpasswordstandard" plugin="passwordStrength"
						errormsg="" nullmsg="<spring:message code="bsp.userinfo.004" text="请输入新密码"></spring:message>">
					<span class="Validform_span Validform_checktip"></span>
					
					<div class="passwordStrength" style="width: 300px;">
						<label> <spring:message code="bsp.userinfo.005" text="密码强度："></spring:message> <span><spring:message code="bsp.userinfo.006" text="弱"></spring:message></span><span><spring:message code="bsp.userinfo.007" text="中"></spring:message></span><span
							class="last"><spring:message code="bsp.userinfo.008" text="强"></spring:message></span></label>
					</div>
				</div>
			</div>

			<div class="form-group" style="margin-top: 15px;">
				<label class="col-xs-3 col-md-3  control-label text-right" style="width: 15%;"><span
					class="required">*</span><spring:message code="bsp.userinfo.009" text="确认新密码"></spring:message></label>
				<div class="col-xs-9 col-md-9 text-left">
					<input type="password" class="form-control ue-form Validform_input"
						datatype="*" id="surepassword" name="surepassword" value=""
						recheck="newpassWord" placeholder="<spring:message code="bsp.userinfo.009" text="确认新密码"></spring:message>"
						errormsg="<spring:message code="bsp.userinfo.010" text="您两次输入的新密码不一致"></spring:message>" nullmsg="<spring:message code="bsp.userinfo.011" text="请再输入一次新密码"></spring:message>">
					<span class="Validform_span Validform_checktip"></span>
				</div>
			</div>

			<div class="form-group" style="margin-top: 30px;">
				<label class="col-xs-3 col-md-3  control-label text-right" style="width: 15%;"></label>
				<div class="col-xs-9 col-md-9">
					<button type="button" class="btn ue-btn-primary saveBtn"
						id="saveBtn"><spring:message code="bsp.userinfo.012" text="保存"></spring:message></button>
					<button type="button" class="btn ue-btn" id="reset"><spring:message code="bsp.userinfo.013" text="重置"></spring:message></button>
				</div>
			</div>
		</form>
	</div>

</body>

</html>