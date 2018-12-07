<!DOCTYPE>
<%@ page isELIgnored="false" contentType="text/html; charset=utf-8"%>
<%@page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	String signId = GetBspInfo.getBspInfo().getUserId();
%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>批量用户功能授权</title>

<!-- 需要引用的CSS -->
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />

<!--[if lt IE 9]>
   <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
   <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<style type="text/css">
	.col-xs-8 {
		width: 75%;
	}
	.form_height {
		margin-top: 20px
	}
	.dropdown{
		display:inline-block;
	}
	.selected {
			background-color: #3e99ff;
			color: #fff;
	}
	.table tbody tr td{
		vertical-align: middle;
		text-align: center;
	}
	.ue-menu-wrap{
		top: 70px;
	}
	.bread {
		border-bottom: 1px solid #ddd;
		margin-bottom: 10px;
		text-align: left;
		padding-bottom: 10px;
		padding-left: 1%;
		height: 31px;
		line-height: 26px;
		padding-top: 0px;
	}
	a, a:focus, a:hover, a:active{
		color: #3e99ff;
	}
	.ue-tabs>li>a {
		font-size: 14px;
	}
	.container-fluid {
		padding-left: 25px;
		padding-right: 25px;
		margin-top: 20px;
	}
	.input-select{
		width: 420px;
	}
</style>

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/batchfunctuserauthority.js'/>"></script>
</head>
<body>
	<div class="bread" id ="bread">
		<a href= "<%=request.getContextPath()%>/service/bsp/user/"><spring:message code="bsp.user.052" text="用户管理"></spring:message></a><span> > <spring:message code="bsp.user.091" text="批量用户功能授权"></spring:message></span>		
	</div>
	<ul id="myTab" class="nav nav-tabs ue-tabs">
		<li class="active"><a href="#kxjs" data-toggle="tab" id = selectTab><spring:message code="bsp.user.029" text="可选角色"></spring:message></a></li>
		<li><a href="#yxjs" data-toggle="tab" id = selectedTab><spring:message code="bsp.user.030" text="已选角色"></spring:message></a></li>
	</ul>
	<div id="myTabContent" class="tab-content">
		<div class="tab-pane active" id="kxjs">
			<div class="ue-menu-wrap">
				<div class="container-fluid">
					<form class="form-inline" onsubmit="return false">	
						<div id="forwardType" class="input-group input-select" style="width: 500px;">
							<label><spring:message code="bsp.user.095" text="角色类型:"></spring:message></label>
							<button value="" type="button" class="btn ue-btn selected" name = batfAll><spring:message code="bsp.user.092" text="所有角色"></spring:message> </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfGlobal><spring:message code="bsp.user.033" text="全局角色"></spring:message> </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfCommon><spring:message code="bsp.user.032" text="普通角色"></spring:message> </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfInternal><spring:message code="bsp.user.034" text="内置角色 "></spring:message></button>
						</div>
					    <div class="input-group pull-right">									
							<input type="text" class="form-control ue-form" name ="toBatUserName" id = "toBatUserNameId1" placeholder="<spring:message code="bsp.user.070" text="请输入名称查询 "></spring:message>"/>											
							<div class="input-group-addon ue-form-btn" name="batfQuery" >
								<span class="fa fa-search"></span>
						    </div>
						</div>
					</form>
					<table id="isSelectList" class="table table-bordered table-hover">
						<thead>
							<tr>
								<th width="45%" data-field="roleName" data-sortable="false"><spring:message code="bsp.user.035" text="角色名称"></spring:message></th>
								<th width="45%" data-field="roleCode"><spring:message code="bsp.user.036" text="角色编码"></spring:message></th>
								<th width="10%" data-field="isSelected" data-render="batchOperations"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		<div class="tab-pane" id="yxjs">
			<div class="ue-menu-wrap">
				<div class="container-fluid">
					<form class="form-inline" onsubmit="return false">	
						<div id="forwardType" class="input-group input-select" style="width: 500px;">
							<label><spring:message code="bsp.user.095" text="角色类型:"></spring:message> </label>
							<button value="" type="button" class="btn ue-btn selected" name = batfAll><spring:message code="bsp.user.092" text="所有角色"></spring:message>  </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfGlobal><spring:message code="bsp.user.033" text="全局角色"></spring:message> </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfCommon><spring:message code="bsp.user.032" text="普通角色"></spring:message> </button>&nbsp;
							<button value="" type="button" class="btn ue-btn" name = batfInternal><spring:message code="bsp.user.034" text="内置角色 "></spring:message></button>
						</div>
					    <div class="input-group pull-right">									
							<input type="text" class="form-control ue-form" name="toBatUserName" id = "toBatUserNameId2" placeholder="<spring:message code="bsp.user.096" text="请输入查询条件 "></spring:message>"/>											
							<div class="input-group-addon ue-form-btn" name="batfQuery" >
								<span class="fa fa-search"></span>
						    </div>
						</div>
					</form>
					<table id="isSelectedList" class="table table-bordered table-hover">
						<thead>
							<tr>
								<th width="45%" data-field="roleName" data-sortable="false"><spring:message code="bsp.user.035" text="角色名称"></spring:message></th>
								<th width="45%" data-field="roleCode"><spring:message code="bsp.user.036" text="角色编码"></spring:message></th>
								<th width="10%" data-field="isSelected" data-render="batchOperations"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
	var usersId = '${user}';
	var siginId = '<%=signId%>';
</script>
</html>