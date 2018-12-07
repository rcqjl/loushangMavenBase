<%@page import="java.util.Map"%>
<%@page import="org.loushang.bsp.api.user.IUserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@page import="org.loushang.bsp.api.user.UserServiceFactory"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%
IUserService userService = UserServiceFactory.getUserService();	
String pubKey = userService.getPublicKey();		
%>
<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户增加</title>
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='bsp/css/userself/useradd.css'/>" />
<style>
</style>
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	    <script  type="text/javascript" src="<l:asset path='html5shiv.js'/>"></script>
		<script  type="text/javascript" src="<l:asset path='respond.js'/>"></script>
	<![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userself/RSA.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userself/md5.js'/>"></script>

<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var pubkey="<%=pubKey%>";
</script>

</head>
<body>
	<div id="bread" class="bread"></div>
	<div class="container text-center" id="sandbox-container" style="width:auto">
		
		<form class="form-horizontal" id="saveForm" name="saveForm"
			onsubmit="return false">

			<div class="form-group">
				<label class="col-xs-2 col-md-2 control-label">登录用户名<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="text"	class="form-control ue-form ue-form-nowrap-input" id="userId"
						name="userId" value="" placeholder="登录用户名" datatype="account" sucmsg=" " nullmsg="账号不能为空" errormsg="账号已存在" />
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-2 col-md-2 control-label">用户名称<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="text" class="form-control ue-form ue-form-nowrap-input" id="userName"
						name="userName" value="" placeholder="用户名称" datatype="*1-30" sucmsg=" "errormsg="不能超过30个字符" nullmsg="名称不能为空" />
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">密码<span
					class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="password"
						class="form-control ue-form Validform_input" id="passWord"
						name="passWord" value="" placeholder="密码" datatype="password"
						sucmsg=" "nullmsg="密码不能为空" />
						<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">确认密码<span
					class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="password"	class="form-control ue-form Validform_input" datatype="*"
						id="passwordConfirm" name="passwordConfirm" value="" 
						 placeholder="确认密码" 
						recheck="passWord"
						sucmsg=" "nullmsg="确认密码不能为空" errormsg="密码不匹配"/> 
					 <span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>
			<input type="hidden" name="isSys" value="0" /><!-- 默认新增用户非管理员 -->
			<%-- <div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">是否是系统管理员
				<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left ue-form-nowrap-input chose">
					<div class="ue-form text-left">
						<input type="radio" name="isSys" value="1" datatype="*"	nullmsg="请选择" > 是 </input>
						<input type="radio" class="choose"	name="isSys" value="0" > 否 </input>
					</div>
					<div class="Validform_checktip"></div>
				</div>
			</div> --%>

			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">账号状态<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<select class="form-control input-sm ue-form ue-form-nowrap-input"
						name="accountStatus" datatype="s" sucmsg=" "nullmsg="请设置账号状态">
						<option value="">请选择</option>
						<option value="11">打开</option>
						<option value="00">锁定</option>
						<!-- <option value="0">已删除</option> -->
					</select>  <span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">用户类型</label>
				<div class="col-xs-10 col-md-10 text-left">
					<select class="form-control input-sm ue-form ue-form-nowrap-input"
						name="userTypeId" datatype="s" sucmsg=" " nullmsg="请设置用户类型">
						<option value="00">请选择</option>
						<option value="user">普通用户</option>
						<option value="admin">管理员</option>
					</select>  <span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>
			<br>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 control-label"></label>
				<div class="col-xs-10 col-md-10 text-left">
					<div>
						<button type="button" class="btn ue-btn-primary saveBtn" id="saveBtn">保存</button>
						<button type="button" class="btn ue-btn" id="reset">重置</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<script type="text/javascript" src="<l:asset path='bsp/userself/useradd.js'/>"></script>
</body>
</html>