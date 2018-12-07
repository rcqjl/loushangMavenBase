<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><spring:message code="bsp.globalpolicy.000" text="全局策略"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/intro.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/globalpolicy/passwordStrAndLock.css'/>"/>

 	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/globalpolicy/passwordStrAndLock.js'/>"></script>
	<script type="text/javascript">
		var context = '<%=request.getContextPath()%>';
	</script>
</head>
<body style="overflow: -Scroll; overflow-x: hidden">

	<div id="bread" class="bread">
		<a href="<%=request.getContextPath()%>/service/bsp/globalpolicy"><spring:message
				code="bsp.globalpolicy.000" text="全局策略" /></a> &gt;
		<spring:message code="bsp.globalpolicy.001" text="密码强度和锁定策略" />
	</div>

	<form class="form-horizontal form_height" id="saveForm"
		onsubmit="return false" style="margin-left: 19px">
		<div class="container">
			<div class="smalltitle">
				<spring:message code="bsp.globalpolicy.002" text="密码强度" />
			</div>

			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right" for="pwdMinLength"><spring:message
						code="bsp.globalpolicy.005" text="密码最小长度" /><span class="required">*</span></label>
				<div class="col-xs-9 col-md-10">

					<input id="pwdMinLength" name="pwdMinLength"
						value="${pwdMinLength }"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="validIsPositiveInt" nullmsg="<spring:message
						code="bsp.globalpolicy.039" text="请填入信息" />"> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right" for="pwdMaxLength"><spring:message
						code="bsp.globalpolicy.006" text="密码最大长度" /><span class="required">*</span></label>
				<div class="col-xs-9 col-md-10">

					<input id="pwdMaxLength" name="pwdMaxLength"
						value="${pwdMaxLength}"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="pwdMaxLengthChk" nullmsg="<spring:message
						code="bsp.globalpolicy.039" text="请填入信息" />"> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2  text-right" for="isUpCase"><spring:message
						code="bsp.globalpolicy.007" text="包含大写字母" /></label>
				<div class="col-xs-9 col-md-10">
					<div class="checkbox">
						<label><input type="checkbox" id="isUpCase"
							name="isUpCase" value="${isUpCase}"></label>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2  text-right" for="isLowerCase"><spring:message
						code="bsp.globalpolicy.008" text="包含小写字母" /></label>
				<div class="col-xs-9 col-md-10">
					<div class="checkbox">
						<label><input type="checkbox" id="isLowerCase"
							name="isLowerCase" value="${isLowerCase}"></label>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2  text-right" for="isNum"><spring:message
						code="bsp.globalpolicy.009" text="包含数字" /></label>
				<div class="col-xs-9 col-md-10">
					<div class="checkbox">
						<label><input type="checkbox" id="isNum" name="isNum"
							value="${isNum}"></label>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2  text-right" for="isSpecialChar"><spring:message
						code="bsp.globalpolicy.010" text="包含特殊符号" /></label>
				<div class="col-xs-9 col-md-10">
					<div class="checkbox">
						<label><input type="checkbox" id="isSpecialChar"
							name="isSpecialChar" value="${isSpecialChar}"></label>
					</div>
				</div>
			</div>

			<div class="smalltitle second">
				<spring:message code="bsp.globalpolicy.003" text="锁定策略" />
			</div>

			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right l2" for="loginAttempts"><spring:message
						code="bsp.globalpolicy.014" text="用户失败登录次数" /></label>
				<div class="col-xs-9 col-md-10">
					<input id="loginAttempts" name="loginAttempts"
						value="${loginAttempts}"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="validIsPositiveInt" nullmsg="<spring:message
						code="bsp.globalpolicy.039" text="请填入信息" />"> <label
						class="help-text"><spring:message
							code="bsp.globalpolicy.027" text="(帐户锁定的登录失败次数)" /></label> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right l2" for="pwdLockTime"><spring:message
						code="bsp.globalpolicy.015" text="用户锁定时间" /></label>
				<div class="col-xs-9 col-md-10">
					<input id="pwdLockTime" name="pwdLockTime" value="${pwdLockTime}"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="validIsInt"
						nullmsg="<spring:message code="bsp.globalpolicy.039" text="请填入信息"/>">
					<label class="help-text"><spring:message
							code="bsp.globalpolicy.028" text="(分钟, 负数表永久; 帐户密码输入错误后被锁定的时间)" /></label>
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right" for="pwdLifeTime"><spring:message
						code="bsp.globalpolicy.013" text="密码有效期时间" /></label>
				<div class="col-xs-9 col-md-10">
					<input id="pwdLifeTime" name="pwdLifeTime" value="${pwdLifeTime}"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="validIsInt"
						nullmsg="<spring:message code="bsp.globalpolicy.039" text="请填入信息"/>">
					<label class="help-text"><spring:message
							code="bsp.globalpolicy.029" text="(分钟, 负数表永久; 密码需要修改的提示时间)" /></label> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 col-md-2 text-right" for="pwdGraceTime"><spring:message
						code="bsp.globalpolicy.016" text="密码失效前更改的时间" /></label>
				<div class="col-xs-9 col-md-10">
					<input id="pwdGraceTime" name="pwdGraceTime"
						value="${pwdGraceTime }"
						class="inputtx form-control ue-form Validform_input" type="text"
						datatype="validIsInt"
						nullmsg="<spring:message code="bsp.globalpolicy.039" text="请填入信息"/>">
					<label class="help-text"><spring:message
							code="bsp.globalpolicy.030"
							text="(分钟, 负数表永久; 密码有效期后到密码失效用户锁定的时间)" /></label> <span
						class="Validform_checktip Validform_span"></span>
				</div>
			</div>

			<div class="form-group bt">
				<label class="col-xs-3 col-md-2 text-right" for="pwdGraceTime"></label>
				<div class="col-xs-9 col-md-10">
					<button id="saveVal" type="button" class="btn ue-btn-primary"
						style="width: 82px">
						<spring:message code="bsp.globalpolicy.012" text="保存" />
					</button>
					<button id="reset" type="button" class="btn ue-btn-primary">
						<spring:message code="bsp.globalpolicy.004" text="重置策略" />
					</button>
				</div>
			</div>

		</div>

	</form>

</body>
</html>