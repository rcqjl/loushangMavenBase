<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>批量用户授权</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/role/rolebatchauthorize.css'/>"/>

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/role/rolebatchauthorize.js'/>"></script>
	<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var roleId = "<%=request.getParameter("roleId")%>";
	</script>
</head>
<body>
	<div class="content">
		<div class="head">
			<div class="head-left">
				<select class="ue-form" id="positionType">
					<option value=""><spring:message code="bsp.role.001" text="请选择"></spring:message></option>
				</select>
				<form class="form-inline pull-right" onsubmit="return false">
				    <div class="input-group">
						<input type="text" class="form-control ue-form " id="userIdOrNameSelect" placeholder="<spring:message code="bsp.role.028" text="请输入账号或名称"></spring:message>"/>											
						<div class="input-group-addon ue-form-btn" id="querySelect">
							<span class="fa fa-search"></span>
					    </div>
				    </div>
				</form>
			</div>
			<div class="head-right">
					<label class="body-content-right-head-title"><spring:message code="bsp.role.029" text="已选用户"></spring:message></label>
					<form class="form-inline pull-right" onsubmit="return false">
				    <div class="input-group">
						<input type="text" class="form-control ue-form" id="userIdOrNameSelected" placeholder="<spring:message code="bsp.role.003" text="请输入账号或名称"></spring:message>"/>											
						<div class="input-group-addon ue-form-btn" id="querySelected">
							<span class="fa fa-search"></span>
					    </div>
				    </div>
				</form>
			</div>
		</div>
		<div class="body">
			<div class="body-left">
				<table id="userList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="10%" data-field="userId" data-sortable="false" data-render="userCheckbox">
								<input type="checkbox" id="selectAllUser"/>
							</th>
							<th width="40%" data-field="userId" data-sortable="false"><spring:message code="bsp.role.030" text="帐号"></spring:message></th>
							<th width="40%" data-field="userName" data-sortable="false"><spring:message code="bsp.role.031" text="用户名称"></spring:message></th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="body-center">
				<div class="movebtns">
					<button id="move" type="button" class="btn ue-btn move btn-default" title="Move selected">
						<i class="glyphicon glyphicon-arrow-right"></i>
					</button>
					<button id="remove" type="button" class="btn ue-btn remove btn-default" title="Remove selected">
						<i class="glyphicon glyphicon-arrow-left"></i> 
					</button>
				</div>
			</div>
			<div class="body-right">
				<table id="userRoleList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="10%" data-field="userId" data-sortable="false" data-render="userRoleCheckbox">
								<input type="checkbox" id="selectAllUserRole"/>
							</th>
							<th width="40%" data-field="userId" data-sortable="false"><spring:message code="bsp.role.030" text="帐号"></spring:message></th>
							<th width="40%" data-field="userName" data-sortable="false"><spring:message code="bsp.role.031" text="用户名称"></spring:message></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="foot">
			<div class="btnGroup">
				<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.role.032" text="关闭"></spring:message></button>
			</div>
		</div>
	</div>
</body>
</html>