<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="bsp.userproxy.019" text="角色委托"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/userproxy/roleproxy.css'/>" />

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userproxy/roleproxy.js'/>"></script>
<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var proxypermissionId = "<%=request.getParameter("proxypermissionId")%>";
</script>
</head>
<body>
	<div class="content">
		<div class="head">
			<div class="head-left" >
				
				<div class="input-group" style="left: auto;">	
				<input class="form-control ue-form" type="text"
					id="roleCodeOrName" placeholder='<spring:message code="bsp.userproxy.039" text="请输入角色编码/名称"/>' />
				<div class="input-group-addon ue-form-btn" id="query">
					<span class="fa fa-search"></span>
				</div>
				</div>
			</div>
			<div class="head-right">
				<label class="body-content-right-head-title"><spring:message code="bsp.userproxy.040" text="已选角色"/></label>
			</div>
		</div>
		<div class="body">
			<div class="body-left">
				<table id="RoleListLeft" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="10%" data-field="roleId" data-sortable="false"
								data-render="roleCheckboxLeft"><input type="checkbox"
								id="selectAllRoleLeft" /></th>
							<th width="40%" data-field="roleCode" data-sortable="false"><spring:message code="bsp.userproxy.041" text="角色编码"/></th>
							<th width="40%" data-field="roleName" data-sortable="false"><spring:message code="bsp.userproxy.042" text="角色名称"/></th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="body-center">
				<div class="movebtns">
					<button id="move" type="button" class="btn ue-btn move btn-default"
						title="Move selected">
						<i class="glyphicon glyphicon-arrow-right"></i>
					</button>
					<button id="remove" type="button"
						class="btn ue-btn remove btn-default" title="Remove selected">
						<i class="glyphicon glyphicon-arrow-left"></i>
					</button>
				</div>
			</div>
			<div class="body-right">
				<table id="RoleListRight" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="10%" data-field="roleId" data-sortable="false"
								data-render="roleCheckboxRight"><input type="checkbox"
								id="selectAllRoleRight" /></th>
							<th width="40%" data-field="roleCode" data-sortable="false"><spring:message code="bsp.userproxy.041" text="角色编码"/></th>
							<th width="40%" data-field="roleName" data-sortable="false"><spring:message code="bsp.userproxy.042" text="角色名称"/></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="foot">
			<div class="btnGroup">
				<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.userproxy.020" text="关闭"/></button>
			</div>
		</div>
	</div>
</body>
</html>