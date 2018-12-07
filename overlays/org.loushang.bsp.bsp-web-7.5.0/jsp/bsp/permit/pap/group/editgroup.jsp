<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>组编辑</title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,bsp/css/group/editgroup.css" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	
	<l:script path="jquery.js,bootstrap.js,form.js,loushang-framework.js,ui.js,jquery.form.js,bsp/bsp-common.js,bsp/group/editgroup.js"/>
</head>
<body>
	<div class="content">
		<form class="form-horizontal" id="saveForm" name="saveForm"
				onsubmit="return false">
			<div class="form-group">
				<label class="col-xs-2 control-label text-right">
					<spring:message code="bsp.group.006" text="组名称"></spring:message>
					<span class="required">*</span>
				</label>
				<div class="col-xs-10">
					<input class="groupIdV form-control ue-form Validform_input"
						id="groupId" name="groupId" value="${group.groupId }" datatype="lse,lse60,groupId"
						errormsg="<spring:message code="bsp.group.014" text='请输入60位以内的字母、数字或_'></spring:message>"
						nullmsg="<spring:message code="bsp.group.015" text="请输入组名称"></spring:message>"/>
					<span class="Validform_checktip Validform_span"></span>
					<input id="groupIdOld" name="groupIdOld" type="hidden" value="${group.groupId }" />
					<input id="id" name="id" type="hidden" value="${group.id }" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-2 control-label text-right">
					<spring:message code="bsp.group.007" text="备注"></spring:message>
				</label>
				<div class="col-xs-10">
					<input class="noteV form-control ue-form Validform_input"
						type="text" id="note" name="note" value="${group.note }" datatype="s0-125"
						errormsg="<spring:message code="bsp.group.012" text="请输入长度125以内的中或英文"></spring:message>" />
					<span class="Validform_checktip Validform_span"></span>
				</div>
			</div>
			<div class="btnGroup ">
				<label class="col-xs-2" ></label>
				<div class="col-xs-10">
					<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.group.022" text="保存"></spring:message></button>
					<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.group.023" text="取消"></spring:message></button>
					</div>					
			</div>
		</form>
	</div>
	<script type="text/javascript">
		var context = '<%=request.getContextPath()%>';
		var id = '${group.id}';
	</script>
</body>
</html>