<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8" %>
<%@	page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.user.052" text="用户管理" /></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: 0px;
		}
		
		.ztree li span.button.add{
			margin-right: 2px;
			background-position: -142px 0px;
			vertical-align: top;
		}
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
		.ue-menu-right{
			overflow:auto;
		}
		.search-label{
			float:left;
			margin-left:20px;
			padding-right:0px;
		}
		.search-input{
			padding-left:5px;
		}
		@media(max-width:992px) {
			.max-width {
				width:150px;
				float:left;
			}
		}
	</style>
	
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='arttemplate.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/user/usertree.js'/>"></script>
	<script id="searchpanel" type="text/html">
	  <div id="searchtemp">
		<div class="form-group">
			<label class="search-label text-right label-border" for="toUserName"><spring:message code="bsp.user.010" text="名称："></spring:message></label>
	        <div class="col-xs-8 col-md-8 search-input">
	           <input type="text" class="form-control ue-form" id="toUserName" placeholder="<spring:message code="bsp.user.062" text="请输入名称"></spring:message>"/>
	        </div>
		</div>
		<div class="form-group search-border">
			<label class="col-xs-3 col-md-3  text-right" for="search"></label>
	        <div class="col-xs-8 col-md-8 search-text">
	           <button id="search" class="btn ue-btn-primary"><spring:message code="bsp.user.011" text="搜索"></spring:message></button>
	        </div>
		</div>
      <div>
	</script>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<ul id="organTypeTree" class="ztree"></ul>
		</div>
		
		<div class="ue-menu-right">
			<div class="container">
				<form class="form-inline" onsubmit="return false;">	
					<div class="input-group max-width">									
						<input type="text" class="form-control ue-form" id="toUserId" placeholder="<spring:message code="bsp.user.061" text="请输入账号"></spring:message>"/>											
						<div class="input-group-addon ue-form-btn" id="query" >
							<span class="fa fa-search"></span>
					    </div>
					</div>
					<a class="btn ue-btn dbtn" id="moresearch"><spring:message code="bsp.user.097" text="更多搜索"></spring:message><i class="fa fa-angle-down"></i></a>
				    <div class="btn-group pull-right">
						<button id="add" type="button" class="btn ue-btn"><span class="fa fa-plus"></span><spring:message code="bsp.user.001" text="增加"></spring:message></button>
						<button id="batchDel" type="button" class="btn ue-btn"><span class="fa fa-trash"></span><spring:message code="bsp.user.002" text="删除"></spring:message></button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.user.003" text="更多"></spring:message>
								<span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <%-- <li><a id="authorityForm">权限报表</a></li> --%>
				               <li><a id="batchFunAuthority"><spring:message code="bsp.user.004" text="批量功能授权"></spring:message></a></li>
				               <li><a id="batchDataAuthority"><spring:message code="bsp.user.005" text="批量数据授权"></spring:message></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="userList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%" data-field="userId" data-sortable="false" data-render="rendercheckbox"><input type="checkbox"/></th>
							<th width="27%" data-field="userId" data-sortable="false"><spring:message code="bsp.user.006" text="账号"></spring:message></th>
							<th width="33%" data-field="userName"><spring:message code="bsp.user.007" text="名称"></spring:message></th>
							<th width="15%" data-field="accountStatus" data-render="renderstatus"><spring:message code="bsp.user.008" text="用户状态"></spring:message></th>
							<th width="20%" data-field="accountStatus" data-render="renderedit"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</html>