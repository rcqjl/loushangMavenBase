<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>角色编辑</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/role/update.css'/>"/>

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
</head>
<body>
	<div class="content">
		<form class="form-horizontal" id="saveForm" name="saveForm"
				onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-3 control-label text-right"><spring:message code="bsp.role.006" text="角色编码"></spring:message><span class="required">*</span></label>
				<div class="col-xs-8">
					<input class="roleCodeV form-control ue-form Validform_input" value="<%=URLDecoder.decode(request.getParameter("roleCode"),"UTF-8")%>" datatype="code"
						errormsg="<spring:message code="bsp.role.014" text="请输入30个字符以内的编码"></spring:message>" nullmsg="<spring:message code="bsp.role.015" text="请输入角色编码!"></spring:message>"/>
					<span class="Validform_checktip Validform_span"></span>
					<input class="roleCodeVOld" type="hidden" value="<%=URLDecoder.decode(request.getParameter("roleCode"),"UTF-8")%>" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label text-right"><spring:message code="bsp.role.007" text="角色名称"></spring:message><span class="required">*</span></label>
				<div class="col-xs-8">
					<input class="roleNameV form-control ue-form Validform_input" type="text" name="roleName" value="<%=URLDecoder.decode(request.getParameter("roleName"),"UTF-8")%>"
						datatype="s1-60" errormsg="<spring:message code="bsp.role.012" text="请输入60个字符以内的名称"></spring:message>" nullmsg="<spring:message code="bsp.role.013" text="请输入角色名称"></spring:message>"/>
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="btnGroup ">
				<label class="col-xs-3" ></label>
				<div class="col-xs-8">
					<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.role.022" text="保存"></spring:message></button>
					<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.role.023" text="取消"></spring:message></button>
					</div>					
			</div>
		</form>
	</div>
	<script type="text/javascript">
		var context = '<%=request.getContextPath()%>';
		$(function(){
			var dialog = parent.dialog.get(window);
			//校验
			$("#saveForm").Validform({
				btnSubmit : "#saveBtn",
				tiptype : function(msg, o, cssctl) {
					var objtip = o.obj.siblings(".Validform_checktip");
					cssctl(objtip, o.type);
					objtip.text(msg);
				},
				datatype:{
					"code": ValidCode
				},
				callback : function(form) {
					var roleName = $(".roleNameV").val();
					var roleCode = $(".roleCodeV").val();
					var returnVal = {
							roleName:roleName,
							roleCode:roleCode
					}
					dialog.close(returnVal);
					dialog.remove();
				}
			});
			
			function ValidCode(gets, obj, curform, regxp){
				var msg1 = L.getLocaleMessage("bsp.role.033","不能超过30个字符");
				var msg2 = L.getLocaleMessage("bsp.role.034","角色编码已存在");
				var isExist;
				if(gets == null || gets == ""){
					return false;
				}
				if(gets.length >30){
					obj.attr("errormsg",msg1);
					return false;
				}
				var roleCodeOld = $(".roleCodeVOld").val();
				if(roleCodeOld!=gets){
					$.ajax({
						url: context + "/service/bsp/role/isExistRoleCode?roleCode="+gets,
						type: "post",
						async: false,
						success: function(result){
							if(result == "true"){
								isExist = true;
							}else{
								isExist = false;
							}
						}
					});
				}
				
				if(isExist){
					obj.attr("errormsg",msg2);
					return false;
				}else{
					return true;
				}
			}
			
			$("#returnBtn").click(function(){
				dialog.close();
				dialog.remove();
			});
		});
	</script>
</body>
</html>