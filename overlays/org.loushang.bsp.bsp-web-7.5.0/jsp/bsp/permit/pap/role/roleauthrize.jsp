<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>角色授权</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/role/roleauthrize.css'/>"/>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/role/roleauthrize.js'/>"></script>
	<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var roleId ="<%=request.getParameter("roleId")%>"
	</script>
</head>
<body>
	<div class="content">
		<div class="head">
		<div class="head-content-left">
			<div class="input-group">
				<ul id="myTab" class="nav nav-tabs ue-tabs">
					<li class="active"><a href="#menuAuthTab" data-toggle="tab"><spring:message code="bsp.role.027" text="菜单权限"></spring:message></a></li>
    				<li><a href="#nmenuAuthTab" data-toggle="tab"><spring:message code="bsp.role.028" text="非菜单权限"></spring:message></a></li>
				</ul>
			 </div>
		</div>
		</div>
		<div class="body">
			<div  id="myTabContent" class="tab-content">
				<div class="tab-pane active" id="menuAuthTab">
					<div class="body-content-left">
						<div class="body-content-left-body">
    						<div class="menuAuthHead">
								<select class="form-control ue-form col-md-4" name="" id="menu-type" onchange ="changeMenuTree()">
								</select>
    						</div>
    						<div class="menAuthBody">
    							<ul id="menuTree" class="ztree"></ul>
    						</div>
						</div>
					</div>
				</div>
				<div class="tab-pane" id="nmenuAuthTab">
					<div class="body-content-left">
						<div class="body-content-left-body">
		   					<div class="tab-pane" id="nmenuAuthTab">
		   						<ul id="functionTree" class="ztree"></ul>
		   					</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="foot">
			<div class="btnGroup roleAuthzBtn">
				<lable id="bitMsg" style="font-size: 12px; color:#f68300; vertical-align:bottom;display:none">(超级管理员角色授权不允许被修改)</lable>
				<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.role.022" text="保存"></spring:message></button>
				<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.role.023" text="取消"></spring:message></button>	
			</div>
		</div>
	</div>
</body>
</html>