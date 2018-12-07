<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>菜单详情</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/menu/menudetail.css'/>"/>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
  
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/menu/menudetail.js'/>"></script>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<button class="btn select-menu-type">
				<span class="menu-type-name" title="${menuType.menuTypeName }">${menuType.menuTypeName }</span>
				<span class="fa fa-angle-right"></span>
			</button>
			<ul id="menuTypeTree" class="ztree"></ul>
		</div>
		<div class="ue-menu-right">
			<div class="row">
				<form class="form-inline" onsubmit="return false;">
					<span class="tableTitle">${menuType.menuTypeName}</span>
				    <div class="btn-group pull-right">
						<button id="addMenuItem" type="button" class="btn ue-btn">
							 <span class="fa fa-plus"></span><spring:message code="bsp.menu.022" text="增加"></spring:message>
						</button>
						<button id="selectItem" type="button" class="btn ue-btn">
							 <span class="fa fa-sitemap"></span><spring:message code="bsp.menu.023" text="选择下级菜单"></spring:message>
						</button>
						<button id="delStru" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span><spring:message code="bsp.menu.001" text="删除"></spring:message>
						</button>
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="bsp.menu.024" text="更多"></spring:message><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				               <li><a class="import"><span class="fa fa-upload"></span><spring:message code="bsp.menu.025" text="导入"></spring:message></a></li>
				               <li><a class="export"><span class="fa fa-download"></span><spring:message code="bsp.menu.026" text="导出"></spring:message></a></li>
				            </ul>
				        </div>
					</div>
				</form>
				<table id="menuList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="40px" data-field="menuId" data-sortable="false" data-render="rendCheckbox">
								<input type="checkbox" id="selectAllMenus" />
							</th>
							<th width="25%" data-field="menuName" data-render="rendTitle"><spring:message code="bsp.menu.014" text="菜单名称"></spring:message></th>
							<th width="110px" data-field="isLeaf" data-render="rendLeafMenu"><spring:message code="bsp.menu.027" text="是否叶子菜单"></spring:message></th>
							<th width="35%" data-field="requestAction" data-render="rendTitle"><spring:message code="bsp.menu.028" text="导航"></spring:message></th>
							<th width="60px" data-field="seq"><spring:message code="bsp.menu.020" text="顺序号"></spring:message></th>
							<th width="100px" data-field="menuStruId" data-render="rendBtn"><spring:message code="bsp.menu.029" text="操作"></spring:message></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
	var menuTypeId = "${param.menuTypeId}";
	var menuTypeName = "${menuType.menuTypeName}";
</script>
</html>