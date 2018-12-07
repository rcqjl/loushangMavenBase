<!DOCTYPE>
<%@ page isELIgnored="false" contentType="text/html; charset=utf-8"%>
<%@page import="org.loushang.bsp.security.context.GetBspInfo"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
	String userId = request.getParameter("userIds");
	String signId = GetBspInfo.getBspInfo().getUserId();
%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>批量用户数据授权</title>

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
	.table tbody tr td{
		vertical-align: middle;
		text-align: center;
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
	.ue-menu-wrap{
		top: 45px;
	}
	.container-fluid {
		padding-left: 25px;
		padding-right: 25px;
		margin-top: 10px;
	}
	.button{
		margin-left: 5px !important;
	}
	.button-spacing {
		margin-bottom: 6px;
	}

</style>

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/batchuserdataauthority.js'/>"></script>
</head>
<body>
	<div class="bread">
		<a href="<%=request.getContextPath()%>/service/bsp/user/"><spring:message code="bsp.user.052" text="用户管理"></spring:message></a><span> > <spring:message code="bsp.user.093" text="批量用户数据授权"></spring:message></span>
	</div>
	<div class="ue-menu-wrap">
		<div class="container-fluid">
			<form class="form-inline" onsubmit="return false;">	
				<label><strong><spring:message code="bsp.user.094" text="已选择的数据授权"></spring:message></strong></label>
			    <div class="btn-group pull-right button-spacing">
					<button id="addBatchUserAut" type="button" class="btn ue-btn-primary"><spring:message code="bsp.user.001" text="增加"></spring:message></button>
					<button id="delBatchUserAut" type="button" class="btn ue-btn button"><spring:message code="bsp.user.002" text="删除"></spring:message></button>
				</div>
			</form>
			<table id="batchDataAuthorityList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="id" data-sortable="false" data-render="rendercheckbox"><input type="checkbox" id="selectAll"/></th>
						<th width="20%" data-field="organType"><spring:message code="bsp.user.038" text="组织类型"></spring:message></th>
						<th width="25%" data-field="organName"><spring:message code="bsp.user.039" text="组织名称"></spring:message></th>
						<th width="30%" data-field="struTypeName"><spring:message code="bsp.user.040" text="业务组织结构"></spring:message></th>
						<th width="10%" data-field="isScope" data-render="renderIsScope"><spring:message code="bsp.user.041" text="是否包含下级"></spring:message></th>
						<th width="10%" data-field="isDefault" data-render="renderIsDefault"><spring:message code="bsp.user.042" text="是否默认"></spring:message></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
<script type="text/javascript">
var userIds = "<%=userId%>";
var signId =  "<%=signId%>";
var context = '<%=request.getContextPath()%>';
</script>
</html>