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
<title>数据权限</title>
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
</style>

<style type="text/css">
		.container{
			width:100%;
		}
		.ue-menu-wrap {
			top: 0px;
		}
		.table tbody tr td{
			vertical-align: middle;
			text-align: center;
		}
</style>

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/user/datapermit.js'/>"></script>
</head>
<body>
	<div>
		<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="btn-group">
			        <div class="dropdown">
			            <div class="form-select">
	         				<select name="" id="OrganPerspective" class="form-control ue-form" ></select>
     					</div>
					</div>
   		 		</div>
   		 		<div class="input-group">									
					<input type="text" class="form-control ue-form" id="toOrganName" placeholder="<spring:message code="bsp.user.090" text="请输入组织名称"></spring:message>"/>											
					<div class="input-group-addon ue-form-btn" id="addDataQuery" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			</form>
			<table id="AddDatas" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="20%" data-field="organName"><spring:message code="bsp.user.039" text="组织名称"></spring:message></th>
						<th width="36%" data-field="struTypeName"><spring:message code="bsp.user.040" text="业务组织结构"></spring:message></th>
						<th width="12%" data-field="isScope" data-render="rendercheckbox1"><spring:message code="bsp.user.041" text="包含下级"></spring:message></th>
						<th width="12%" data-field="isDefault" data-render="rendercheckbox2"><spring:message code="bsp.user.042" text="是否默认"></spring:message></th>
						<th width="20%" data-field="isDefault" data-render="permitPerations"><spring:message code="bsp.user.009" text="操作"></spring:message></th>
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