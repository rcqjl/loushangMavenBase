<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%
    String contextPath = request.getContextPath();
%>
<html>
<head>
<title>组织结构规则维护</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/slickgrid.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/organ/organrule.css'/>" />
<style type="text/css">
html, body {
	height: 100%;
}

.container {
	width: 100%;
	height: 100%;
	margin-left: 0px;
	margin-right: 0px;
	padding-top: 5px; 
}

.grid {
	width: 100%;
	height: 92%;
	margin-top: 5px;
	border: 1px solid #ddd;
}

.slick-cell-hover {
	border: 1px solid #aaa;
}

.slick-cell.active {
	border: 1px solid #aaa;
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

.label-border {
	padding-right: 20px;
	padding-left: 0px;
}

.search-border {
	margin-left: -25px;
}

.search-text {
	margin-left: -25px;
	margin-top: 10px;
}

.flashing {
	background-color: yellow;
}

#hrperspective {
	width: 118px;
}

.btn .badge {
	position: relative;
	top: -12px;
	left: 16px;
}

.badge {
	min-width: 1px;
	padding: 1px 4px;
	font-size: 10px;
	font-weight: 500;
	background-color: #3e99ff;
	display: none;
}

.manager-type-link a,
.manager-type-link a:focus,
.manager-type-link a:hover,
.manager-type-link a:active {
	color: #3e99ff;
}
</style>

<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='slickgrid.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/organ/organrule.js'/>"></script>

<script id="hrperspectivepanel" type="text/html">
	
	</script>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">
			<div class="angleofview">
				<a class="btn ue-btn dbtn " tabindex="0" id="hrperspective" role="button" >
					<!-- 人力资源视角<i class="fa fa-angle-down"></i> -->
				</a>

				<div class="input-group">
					<input type="text" class="form-control ue-form" id="fromModelName"
						placeholder="<spring:message code="bsp.organ.016" text="组织类型"/>" />
					<div class="input-group-addon ue-form-btn" id="queryMap">
						<span class="fa fa-search"></span>
					</div>
				</div>

				<div class="btn-group pull-right">
					<button id="addRow" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span> <spring:message code="bsp.organ.031" text="增加一行"/>
					</button>
					<button id="batchDel" type="button" class="btn ue-btn">
						<span class="fa fa-minus"></span> <spring:message code="bsp.organ.032" text="删除多行"/>
					</button>
					<button id="saveChangedData" type="button" class="btn ue-btn">
						<span class="fa fa-save"></span> <spring:message code="bsp.organ.003" text="保存"/><span class="badge" id="saveBadge">8</span>
					</button>
				</div>
			</div>
		</form>
		<div id="mapGrid" class="grid"></div>

	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>