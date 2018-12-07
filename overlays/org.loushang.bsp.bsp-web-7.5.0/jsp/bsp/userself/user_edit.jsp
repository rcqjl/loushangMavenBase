<%@page import="java.util.Map"%>
<%@page import="org.loushang.bsp.api.user.IUserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@page import="org.loushang.bsp.api.user.UserServiceFactory"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	IUserService userService = UserServiceFactory.getUserService();	
	String pubKey = userService.getPublicKey();		
%>
<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css"	href="<l:asset path='bsp/css/userself/useradd.css'/>" />
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
</head>
<body>
	<div id="bread" class="bread"></div>
	<div class="container text-center" id="sandbox-container" style="width:auto">

		<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-left control-label">登录用户名<!-- <span 	class="required">*</span> --></label>
				<div class="col-xs-10 col-md-10">
					<input type="text"	class="form-control ue-form ue-form-nowrap-input" id="userId"
						name="userId" value="${user.userId}" placeholder="登录用户名" datatype="s"
						sucmsg=" "errormsg="" nullmsg="请设置登录用户名" 
						style="border:0; background-color:#fff;" disabled />
						<input type="hidden" value="${user.userId}" name="userIdH" />
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">用户名称<span
					class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="text" class="form-control ue-form ue-form-nowrap-input" id="userName"
						name="userName" value="${user.userName}" placeholder="用户名称"  datatype="*1-30" sucmsg=" " errormsg="不能超过30个字符" nullmsg="名称不能为空" />
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">密码<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="password"
						class="form-control ue-form ue-form-nowrap-input" id="passWord"
						name="passWord" value="${user.passWord}" placeholder="密码" datatype="password"
						sucmsg=" " nullmsg="密码不能为空"  />
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>

			<input type="hidden" name="newPassWord" id="newPassWord" value="" />
			<div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">确认密码<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10 text-left">
					<input type="password"	class="form-control ue-form ue-form-nowrap-input" datatype="*"
						id="passwordConfirm" name="passwordConfirm" value="${user.passWord}"recheck="passWord" placeholder="确认密码" sucmsg=" "nullmsg="确认密码不能为空" errormsg="密码不匹配"/> 
					<span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>
			<%-- <div class="form-group">
				<label class="col-xs-2 col-md-2  control-label">是否是系统管理员<span class="required">*</span></label>
					<div class="col-xs-10 col-md-10  text-left ue-form-nowrap-input chose">
						<div class="ue-form text-left">
							<c:if test="${user.isSys=='1'}">
								<input type="radio" name="isSys" value="1" nullmsg="请选择" checked="true" disabled> 是 </input>
								<input type="radio" name="isSys" value="0" disabled>否 </input>
							</c:if>
							<c:if test="${user.isSys=='0'}">
								<input type="radio" name="isSys" value="1" datatype="*" nullmsg="请选择" > 是 </input>
								<input type="radio" name="isSys" value="0" > 否 </input>
							</c:if>
						</div>
						<div class="Validform_checktip"></div>
					</div>
			</div> --%>
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-left control-label">账号状态<span class="required">*</span></label>
				<div class="col-xs-10 col-md-10">
					<select class="form-control input-sm ue-form ue-form-nowrap-input"
						name="accountStatus" datatype="s"sucmsg=" " nullmsg="请设置账号状态">
						<option value="">请选择</option>
						<option value="11">打开</option>
						<option value="00">锁定</option>
					</select> 
					 <span class="Validform_span Validform_checktip"></span> 
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-xs-2 col-md-2 text-left control-label">用户类型</label>
				<div class="col-xs-10 col-md-10">
					<select class="form-control input-sm ue-form ue-form-nowrap-input"
						name="userTypeId" datatype="s" sucmsg=" " nullmsg="请设置用户类型">
						<option value="00">请选择</option>
						<option value="user">普通用户</option>
						<option value="admin">管理员</option>
					</select> 
					 <span class="Validform_span Validform_checktip"></span> 
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
	<script type="text/javascript">
	 	var context="<%=request.getContextPath()%>";
	 
		$(function() {
			$("#bread").append('<a href="' + context + '/service/bsp/userself/">用户管理</a> > 编辑用户');
			$("input[name='isSys'][value='${user.isSys}']").attr("checked",true);
			$("select[name='accountStatus']").find("option[value='${user.accountStatus}']").attr("selected",true);
			$("select[name='userTypeId']").find("[value='${user.userTypeId}']").attr("selected",true);
			
			$("#saveForm").Validform({
				btnSubmit:"#saveBtn",
				tiptype:function(msg,o,cssctl){
					if(!o.obj.is("form")){
						var objtip=o.obj.siblings(".Validform_checktip");
						//根据生日框的DOM结构查找其验证结果框
						if(objtip.length == 0){
							 objtip=o.obj.parent("div").siblings(".Validform_checktip");
						}
					    cssctl(objtip,o.type);
					    objtip.text(msg);
					} else{
						var objtip=o.obj.find("#msgdemo");
						cssctl(objtip,o.type);
						objtip.text(msg);
					} 
				},
				datatype: {
					"account": ValidAccount,
					"password": ValidPassword
				},
				/* 	datatype:{//传入自定义datatype类型;
				      "idcard":idcard,
				      password_rule : function(gets, obj){
				    	  if(gets == obj[0].defaultValue)
				    		  return true;
                          var result = /^[\w\W]{6,15}$/i.test(gets);
                          return result;
                    },
				}, */
				callback:function(form){
					save();
				}
			});
			//返回user页面
			$("#returnBtn").click(function() {
				window.location = context + "/service/bsp/userself";
			})
		});
		//保存实例
		function save(){
			var password = "${user.passWord}";
			if(password != $("#passWord").val()){
				var enPwd = encodePwd($("#passWord").val());
				$("#passWord").val(enPwd);
				$("#passwordConfirm").val(enPwd);
				$("#newPassWord").val(enPwd);
			}else{
				$("#newPassWord").val("");
			}			
			var url = "<%=request.getContextPath()%>/service/bsp/userself/update";
			saveForm.action = url;
			saveForm.method = "POST";
			saveForm.submit();
		}
		// 密码加密
		function encodePwd(rawPassword) {
			var pubKey = "<%=pubKey %>";
			setMaxDigits(130);
			var key = new RSAKeyPair("10001", "", pubKey); //"00a285169b1b7826a1220edcb1aaaca92187b2c290e43ec60d0dc9ca34f5c0a3764bc86edc1e5418631e912f761b3fb7206c278a8673ae45f5a67941d37315548a4458604b4c4ea87fef9f51b40daf5052e3db6aa60fefc7d159915b0c0924acadeebceeb11625a3f91616f3b673b65531f26812191f89cb9707151f0f27a8c28f"
			var result = encryptedString(key, rawPassword);
			return result;
		}
		function ValidAccount(gets, obj, curform, regxp) {
			var results;
			if (gets == null || gets == "") {
				return false;
			}
			if (gets.length > 30) {
				obj.attr("errormsg", "不能超过30个字符");
				return false;
			}
			$.ajax({
				url: context + "/service/bsp/userself/isExistUserId?userId=" + gets,
				type: "post",
				async: false,
				success: function(result) {
					if (result == "true") {
						results = true;
					} else {
						results = false;
					}
				}
			});

			if (results) {
				obj.attr("errormsg", "账号已存在");
				return false;
			} else {
				return true;
			}
		}

		function ValidPassword(gets, obj, curform, regxp) {
			var results;
			var message;
			if (gets == null || gets == "") {
				return false;
			}
			var oldPwd = "${user.passWord}";
			if (oldPwd != "" && oldPwd == gets) {
				return true;
			}
			$.ajax({
				url: context + "/service/bsp/userself/passwdPolicy",
				type: "post",
				data: "password="+encodePwd(gets),
				async: false,
				success: function(result) {
					if (result.flag == "true") {
						results = true;
					} else {
						results = false;
						message = result.message;
						
					}
				}
			});

			if (!results) {
				obj.attr("errormsg", message);
				return false;
			} else {
				return true;
			}
		}
	</script>
</body>
</html>