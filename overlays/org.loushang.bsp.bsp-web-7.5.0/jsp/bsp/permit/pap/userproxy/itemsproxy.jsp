<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="bsp.userproxy.010" text="委托事项"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/role/roleauthrize.css'/>" />
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
<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userproxy/itemsproxy.js'/>"></script>
<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var proxypermissionId ="<%=request.getParameter("proxypermissionId")%>";
</script>
</head>
<body>
	<div class="content">
		<div class="head">
			<div class="head-content-left">
				<div class="input-group">
					<ul id="myTab" class="nav nav-tabs ue-tabs">
						<li class="active"><a href="#menuAuthTab" data-toggle="tab"><spring:message code="bsp.role.027" text="菜单权限" /></a></li>
						<li><a href="#nmenuAuthTab" data-toggle="tab"><spring:message code="bsp.role.028" text="非菜单权限" /></a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="body">
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane active" id="menuAuthTab">
					<div class="body-content-left">
						<div class="body-content-left-body">
							<div class="menuAuthHead">
								<select class="form-control ue-form" name="" id="menu-type"
									onchange="changeMenuTree()">
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
			<div class="btnGroup">
				<button type="button" class="btn ue-btn-primary" id="saveBtn"><spring:message code="bsp.userproxy.012" text="保存"/></button>
				<button type="button" class="btn ue-btn" id="returnBtn"><spring:message code="bsp.userproxy.013" text="取消"/></button>
			</div>
		</div>
	</div>
</body>
</html>