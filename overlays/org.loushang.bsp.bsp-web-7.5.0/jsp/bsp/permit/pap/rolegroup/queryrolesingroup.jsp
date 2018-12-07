<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><spring:message code="bsp.rolegroup.014" text="角色组管理"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/rolegroup/queryrolesingroup.css'/>"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/rolegroup/queryrolesingroup.js'/>"></script>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
		var roleGroupId="${roleGroupId}";
		var roleGroupName="${roleGroupName }";
	</script>
</head>
<body>
	<div id="bread" class="bread">
		<a href="<%=request.getContextPath()%>/service/bsp/rolegroup/"><spring:message code="bsp.rolegroup.014" text="角色组管理"/></a>
		&nbsp;&nbsp;&gt;&nbsp;&nbsp;<span id="roleGroupNameBread">${roleGroupName }</span>
		<div class="btn-group pull-right">
			<button id="undoBtn" type="button" class="btn ue-btn">
				<span class="fa fa-undo"></span><spring:message code="bsp.rolegroup.018" text="返回"/>
			</button>
		</div>
	</div>
	
	<div class="container">
		
		<div class="row">
			<form class="form-inline" onsubmit="return false">
			    <div class="input-group">							
					<input type="text" class="form-control ue-form " id="roleName" placeholder="<spring:message code="bsp.role.013" text="请输入角色名称"/>"/>
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
				    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="bsp.role.004" text="添加角色"/>
					</button>
					<button id="batchdel" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="bsp.role.005" text="删除角色"/>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="roleList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="roleId" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll"/>
						</th>
						<th width="18%" data-field="roleCode" data-sortable="false"><spring:message code="bsp.role.006" text="角色编码"/></th>
						<th width="18%" data-field="roleName" data-sortable="false"><spring:message code="bsp.role.007" text="角色名称"/></th>
						<th width="15%" data-field="organTypeName" data-sortable="false"><spring:message code="bsp.role.008" text="岗位类型"/></th>
						<th width="18%" data-field="isGlobal" data-sortable="false" data-render="renderstatus"><spring:message code="bsp.role.009" text="全局/所属机构"/></th>
						<th width="26%" data-field="roleId" data-sortable="false" data-render="renderOpt"><spring:message code="bsp.role.010" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>