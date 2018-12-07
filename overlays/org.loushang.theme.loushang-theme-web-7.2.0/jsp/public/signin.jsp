<!DOCTYPE html>
<%@ page pageEncoding="UTF-8" language="java"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page import="java.net.URLDecoder" %>
<%
String j_auth_action=request.getContextPath()+"/j_bsp_security_check/";

String msg=(String)request.getSession().getAttribute("AuthenticationException");
if(msg==null){
	msg=request.getParameter("m")==null? "":URLDecoder.decode((String)request.getParameter("m"));
}
request.getSession().setAttribute("AuthenticationException",null);
//获取用户名
String userName = null;
Cookie[] cookies = request.getCookies();
if(cookies!=null){
	for(int i = 0 ; i < cookies.length; i++){
		if(cookies[i].getName().equals("userId")) {
			userName=URLDecoder.decode(cookies[i].getValue(), "UTF-8");
			  break;
		}
	}
}
%>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title><spring:message code="signin.Tip001" text="楼上云应用支撑平台-登录页"/></title>

    <!-- 需要引用的CSS -->
    <link rel="shortcut icon" href="<l:asset path='platform/img/favicon.ico'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='platform/css/login.css'/>" />

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
  </head>
  <body>
	<!-- 页面结构 -->
	<div class="login">
		<header class="navbar navbar-static-top login-top">
		  <div class="container">
		    <div class="navbar-header">
		      <a href="#" class="navbar-brand"><span>|</span><spring:message code="singin.Tip013" text="楼上云应用支撑平台"/></a>
		    </div>
		    <nav class="collapse navbar-collapse">
		      <ul class="nav navbar-nav navbar-right">
		        <li>
		          <a href="http://loushang.inspur.com:8080/lswk"><spring:message code="signin.Tip002" text="开发文档"/></a>
		        </li>
		        <li>
		          <a href="#"><spring:message code="signin.Tip003" text="下载"/></a>
		        </li>
		        <li>
		          <a href="#"><spring:message code="signin.Tip004" text="帮助"/></a>
		        </li>
		      </ul>
		    </nav>
		  </div>
		</header>
		<div class="login-body">
			<div class="login-left pull-left"><img src="<l:asset path='platform/img/login-bg.png'/>" /></div>
			<div class="login-right pull-right">
				<div class="avatar">
				  	<h4><spring:message code="signin.Tip005" text="登录"/></h4>
				</div>
                <div id="hints" class="error-hints" >
                	<img src="<l:asset path='platform/img/error.png'/>"/>
                	<p><%=msg%></p>
                </div>
                	
				<form method="post" onsubmit="return false;">
				  <div class="form-group" >
				    <span class="quickdelete-wrap">
				    	<input type="text" class="form-control ue-form qd_ipt" id="userName" name="j_username" tabindex="1" placeholder="<spring:message code="signin.Tip006" text="请输入用户名"/>">
				    	<a id="deleteName" class="quickdelete" href="javascript:void(0)" onclick="clearName()" title='<spring:message code="signin.Tip007" text="清空"/>' ></a>
				    </span>
				  </div>
				  <div class="form-group">
				  	<span class="quickdelete-wrap">
						<input type="password" class="form-control ue-form qd_ipt" id="password" name="j_password" tabindex="2" placeholder='<spring:message code="signin.Tip008" text="请输入密码"/>'>
						<a id="deletePassword" class="quickdelete" href="javascript:void(0)" onclick="clearPassword()" title='<spring:message code="signin.Tip007" text="清空"/>' ></a>
					</span>
					<input type="hidden" name="rdmCode" id="rdmCode"/>
				  </div>
				  <div class="checkbox">
				    <label class="form-checkbox">
				      <input type="checkbox" tabindex="3"><spring:message code="signin.Tip009" text="下次自动登录"/> 
				    </label>
				    <label class="form-forget">
				       <a><spring:message code="signin.Tip010" text="忘记密码？"/></a>
				    </label>
				  </div>
			  	  <button class="btn btn-login" tabindex="4" onclick="doLogin()"><spring:message code="signin.Tip005" text="登录"/></button>
			  	  <button class="btn btn-try" tabindex="4" onclick="doTryLogin()"><spring:message code="signin.Tip011" text="体验账号登录"/></button>
				</form>
			</div>
		</div>
		<div class="login-bottom">
			&copy 1998-2016  浪潮软件股份有限公司版权所有</a>
		</div>
	</div>
	
    <!-- 需要引用的JS -->
    <l:script path="jquery.js"/>
    <script type="text/javascript" src="<%= request.getContextPath()%>/jsp/bsp/md5.js" ></script> 
    <script language="javascript">
    	$(function(){
    		$("#deleteName").hide();
    		$("#deletePassword").hide();
    		$("#hints").hide();
    		if('<%=msg%>' != ""){
    			$("#hints").show();
    		}
    		if('<%=userName%>' != "null"){
    			$("#userName")[0].value = '<%=userName%>';
    			$("#deleteName").show();
    		}
    		
    	});
		function doSession(){
		if(window.dialogArguments!=null){
			 window.dialogArguments.location=self.location;
			 window.returnValue="aa";
			 parent.close();
			 return;
			}
			if(self!=top){top.location=self.location+"?m="+encodeURI(encodeURI("<%=msg%>"));}
		}
		doSession();
		var salt = "1#2$3%4(5)6@7!poeeww$3%4(5)djjkkldss";
		function doLogin(){
			if(!check()) return;
		    document.forms[0].action ="<%=j_auth_action%>";
			var password = document.getElementById("password");
			password.value = hex_md5(password.value + "{" + salt + "}");
		    document.forms[0].submit();
		}
		//使用体验账号登录
		function doTryLogin(){
		    document.forms[0].action ="<%=j_auth_action%>";
			var password = document.getElementById("password");
			var userName = document.getElementById("userName");
			password.value = hex_md5("demo{" + salt + "}");
			userName.value = "demo";
		    document.forms[0].submit();
		}
		
		
		window.onload = function(){
			$.ajax({
				url :"<%= request.getContextPath()%>/service/bsp/randomCode",
				sync : false,
				success : successHandler
			});	
		
			function successHandler(code){
				var o = eval("(" + code + ")");
				document.getElementById("rdmCode").value = o.code;	
			}
		}
		//如果名称或者密码 为空要返回提示 
		function check(){
			var username = document.forms[0].j_username;
			var password = document.forms[0].j_password;
			if(username.value=="" && password.value==""){
				$("#hints").show();
				$("#hints").children("p").text(L.getLocaleMessage("signin.Tip012","请输入用户名和密码"));
				username.focus();
				return false;
			}
			if(username.value==""){
				$("#hints").show();
				$("#hints").children("p").text(L.getLocaleMessage("signin.Tip006","请输入用户名"));
				username.focus();
				return false;
			}
			if(password.value==""){
				$("#hints").show();
				$("#hints").children("p").text(L.getLocaleMessage("signin.Tip008","请输入密码"));
				password.focus();
				return false;
			}
			return true;
		
		}
		//'enter' key,/=47,*=42,+=43
		function keypress(e)
		{
		
			if(!window.event){
				e = e.which;
			}else{
				e = window.event.keyCode;
			}
			if(e==13||e==42)	//'enter' key,*
			{
				doLogin();
			}
		
		}
		//用户姓名输入框清空按钮
		$("#userName").bind("input propertychange",function(){
			if($("#userName")[0].value!="")
				$("#deleteName").show();
			else
				$("#deleteName").hide();
		});
		function clearName(){
			$("#userName")[0].value="";
			$("#deleteName").hide();
		}
		//用户密码输入框清空按钮
		$("#password").bind("input propertychange",function(){
			if($("#password")[0].value!="")
				$("#deletePassword").show();
			else
				$("#deletePassword").hide();
		});
		function clearPassword(){
			$("#password")[0].value="";
			$("#deletePassword").hide();
		}
</script>
  </body>
</html>