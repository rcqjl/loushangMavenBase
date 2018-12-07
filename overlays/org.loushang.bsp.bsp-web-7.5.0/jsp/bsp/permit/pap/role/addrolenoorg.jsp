<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>增加新角色</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/role/addrolenoorg.css'/>"/>

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
	<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/bsp-common.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/role/addrolenoorg.js'/>"></script>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div class="container text-center" id="sandbox-container">
		<div id="bread" class="bread">
		<a href="<%=request.getContextPath()%>/service/bsp/role/"><spring:message code="bsp.role.011" text="角色管理"></spring:message></a>&nbsp;&nbsp;&gt;&nbsp;&nbsp;<spring:message code="bsp.role.004" text="增加角色"></spring:message></div>
		<div class="col-xs-12 col-md-12">
			<form class="form-horizontal" id="saveForm" name="saveForm"
				onsubmit="return false">
				<div class="form-group">
					<label class="col-sm-3 control-label"><spring:message code="bsp.role.007" text="角色名称"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="roleName" name="roleName" value="" datatype="ls60" nullmsg="<spring:message code="bsp.role.013" text="请输入角色名称"></spring:message>" />
						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label"><spring:message code="bsp.role.006" text="角色编码"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="roleCode" name="roleCode" value="" datatype="code, ls30"
							errormsg="" nullmsg="<spring:message code="bsp.role.015" text="请输入角色编码"></spring:message>" />

						<span class="Validform_checktip Validform_span"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label"><spring:message code="bsp.role.016" text="岗位类型"></spring:message></label>
					<div class="col-xs-8 col-md-8">
						<select id = "positionType" class="form-control ue-form Validform_input"
							id="positionType" name="positionType">
							<option value="" selected="selected"><spring:message code="bsp.role.001" text="请选择"></spring:message></option>
							</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label"><spring:message code="bsp.role.017" text="角色所属范围"></spring:message><span
						class="required">*</span></label>
					<div class="text-left radio col-md-8 col-xs-8" style="padding-top: 0px;">
						<label>
						<input type="radio"  name="isGlobal" value="1" onchange="showOrgan(this);"/><spring:message code="bsp.role.018" text="全局"></spring:message>
						</label>
						<label>
						<input type="radio"  name="isGlobal" value="0" checked="checked" onchange="showOrgan(this);" datatype="s1-10" nullmsg="<spring:message code="bsp.role.019" text="请选择角色所属范围"></spring:message>" /><spring:message code="bsp.role.020" text="机构"></spring:message>
						</label>
					    <span class="Validform_checktip"></span>
					</div>
				</div>
				<div class="form-group relationId">
					<label class="col-sm-3 control-label"><spring:message code="bsp.role.021" text="所属组织"></spring:message><span
						class="required">*</span></label>
					<div class="col-xs-8 col-md-8">
						<input type="text" class="form-control ue-form Validform_input"
							id="relationName" name="relationName" value="" placeholder="<spring:message code="bsp.role.001" text="请选择"></spring:message>" readonly="readonly" onclick="selectOrgan(this);"/> 
						<input id="relationId" type="hidden" name = "relationId" value=""/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-xs-3 col-md-3  text-right text-name"></label>
					<div class="col-xs-8 col-md-8" style="text-align: left">
						<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.role.022" text="保存"></spring:message></button>
						<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.role.023" text="取消"></spring:message></button>	
					</div>
				</div>
			</form>
			<div class="addreturn">
			<label class="rolesum"></label>
			<a class="queryAllroles"><spring:message code="bsp.role.024" text="查看所有角色"></spring:message></a>
			<table id="roleList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="19%"><spring:message code="bsp.role.006" text="角色编码"></spring:message></th>
						<th width="19%"><spring:message code="bsp.role.007" text="角色名称"></spring:message></th>
						<th width="19%"><spring:message code="bsp.role.008" text="岗位类型"></spring:message></th>
						<th width="19%" data-render="renderstatus"><spring:message code="bsp.role.009" text="全局/所属机构"></spring:message></th>
						<th width="24%"><spring:message code="bsp.role.010" text="操作"></spring:message></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</div>
	</div>
</body>
<script type="text/html" id = "trTpl">
<tr role="row" class="odd">
	<td>{{roleCode}}</td>
	<td>{{roleName}}</td>
	<td>{{positionType}}</td>
	<td>{{isGlobal}}</td>
	<td>
		<div>
			<a onclick="roleAuthrize('{{roleId}}')"><spring:message code="bsp.role.025" text="角色授权"></spring:message></a>
			<span>&nbsp;&nbsp;</span>
			<a onclick="roleBatchAuthorize('{{roleId}}')"><spring:message code="bsp.role.026" text="批量用户授权"></spring:message></a>
		</div>
	</td>
</tr>
</script>
</html>