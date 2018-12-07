<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8" %>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.user.052" text="用户管理" /></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css" />
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.popover {
			min-width: 360px;
		}
		.form-group {
			width: 100%;
		}
		.col-md-3 {
			width: 40%;
		}
		.col-md-8 {
			width: 60%;
		}
		.label-border{
			padding-right: 20px;
			padding-left: 0px;
			margin-top: 5px;
		}
		.search-border{
			margin-top: 2px;
		}
		.search-text{
			margin-left: -67px;
			margin-top: 10px;
			padding-left:3px;
		}
		.search-label{
			float:left;
			margin-left:20px;
			padding-right:0px;
		}
		.search-input{
			padding-left:5px;
		}
		@media(max-width:768px) {
			.max-width {
				width:150px;
				float:left;
			}
		}
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,bsp/bsp-common.js,bsp/user/usersnoorg.js"/>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false;">	
			<div class="input-group max-width">									
				<input type="text" class="form-control ue-form" id="toUserId" placeholder="<spring:message code="bsp.user.061" text="请输入账号或名称"></spring:message>"/>											
				<div class="input-group-addon ue-form-btn" id="query" >
					<span class="fa fa-search"></span>
			    </div>
			</div>
		    <div class="btn-group pull-right">
				<button id="add" type="button" class="btn ue-btn"><span class="fa fa-plus"></span><spring:message code="bsp.user.001" text="增加"></spring:message></button>
				<button id="batchDel" type="button" class="btn ue-btn"><span class="fa fa-trash"></span><spring:message code="bsp.user.002" text="删除"></spring:message></button>
			</div>
		</form>
		<table id="userList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%" data-field="userId" data-sortable="false" data-render="rendercheckbox"><input type="checkbox"/></th>
					<th width="27%" data-field="userId" data-sortable="false" data-render="renderTitle"><spring:message code="bsp.user.006" text="账号"></spring:message></th>
					<th width="33%" data-field="userName" data-render="renderTitle"><spring:message code="bsp.user.007" text="名称"></spring:message></th>
					<th width="15%" data-field="accountStatus" data-render="renderstatus"><spring:message code="bsp.user.008" text="用户状态"></spring:message></th>
					<th width="20%" data-field="accountStatus" data-render="renderedit"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
				</tr>
			</thead>
		</table>
	</div>

</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</html>