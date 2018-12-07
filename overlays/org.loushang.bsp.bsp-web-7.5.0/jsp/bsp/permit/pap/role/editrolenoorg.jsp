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
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,bsp/css/role/editrolenoorg.css" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	
	<l:script path="jquery.js,bootstrap.js,form.js,loushang-framework.js,ui.js,jquery.form.js,bsp/bsp-common.js,bsp/role/editrolenoorg.js"/>
</head>
<body>
	<div class="content">
		<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-2 control-label text-right">
					<spring:message code="bsp.role.006" text="角色编码"></spring:message>
					<span class="required">*</span>
				</label>
				<div class="col-xs-10">
					<input class="roleCodeV form-control ue-form Validform_input"
						id="roleCode" name="roleCode" value="${role.roleCode }" datatype="code, ls30"
						errormsg="<spring:message code="bsp.role.014" text="请输入30个字符以内的编码"></spring:message>"
						nullmsg="<spring:message code="bsp.role.015" text="请输入角色编码"></spring:message>"/>
					<span class="Validform_checktip Validform_span"></span>
					<input class="roleCodeVOld" type="hidden" value="${role.roleCode }" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 control-label text-right">
					<spring:message code="bsp.role.007" text="角色名称"></spring:message>
					<span class="required">*</span>
				</label>
				<div class="col-xs-10">
					<input class="roleNameV form-control ue-form Validform_input" type="text"
						id="roleName" name="roleName" value="${role.roleName }"
						datatype="ls60"
						nullmsg="<spring:message code="bsp.role.013" text="请输入角色名称"></spring:message>"/>
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="btnGroup ">
				<label class="col-xs-2" ></label>
				<div class="col-xs-10">
					<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.role.022" text="保存"></spring:message></button>
					<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.role.023" text="取消"></spring:message></button>
					</div>					
			</div>
		</form>
	</div>
	<script type="text/javascript">
		var context = '<%=request.getContextPath()%>';
		var dialog = parent.dialog.get(window);
		var check = "${role.roleId}";
	</script>
</body>
</html>