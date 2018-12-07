<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html >
<html lang="en" style="height:100%">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 需要引用的CSS -->
    <link rel="shortcut icon" href="<l:asset path='platform/img/favicon.ico'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>" />
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/organ/organtype.css'/>" />
	<title>组织类型添加</title>
</head>
<body>

	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<button class="btn select-stru-type" data-original-title="" title="">
				<span class="stru-type-name" title="组织类型"><spring:message code="bsp.organ.016" text="组织类型"/></span>
				<span class="fa fa-angle-right"></span>
		  	</button>
		  	<div class="input-group">
	        	<input class="form-control ue-form" type="text" id="organName" placeholder="<spring:message code="bsp.organ.033" text="组织类型名称"/>">
		        <div class="input-group-addon ue-form-btn" id="query">
		        	<span class="fa fa-search"></span>
		        </div>
			</div>
	   		<ul id="organTypeTree" class="ztree">
	   		</ul>
	   
	  	</div>
	  	
	  	<div class="ue-menu-right">
			<div class="row">
				<form class="form-inline" onsubmit="return false;">
					<span class="tableTitle"></span>
				    <div class="btn-group pull-right">
						<button id="addMenuItem" type="button" class="btn ue-btn">
							 <span class="fa fa-plus"></span><spring:message code="bsp.organ.034" text="添加类型"/>
						</button>
						<button id="delStru" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span><spring:message code="bsp.organ.035" text="删除类型"/>
						</button>
					</div>
				</form>
				<table id="organList" class="table table-bordered table-hover" border="1">
					<thead>
						<tr>
							<th width="40px" data-field="organType" data-sortable="false" data-render="rendCheckbox">
								<input type="checkbox" id="selectAllMenus"/>
							</th>
							<th width="110px" data-field="organType" data-render="rendTitle"><spring:message code="bsp.organ.000" text="类型编码"/></th>
							<th width="110px" data-field="typeName" data-render="rendTitle"><spring:message code="bsp.organ.002" text="类型名称"/></th>
							<th width="110px" data-field="requestAction" data-render="parentType"><spring:message code="bsp.organ.036" text="上级类型"/></th>
							<th width="60px" data-field="menuStruId" data-render="rendBtn"><spring:message code="bsp.organ.017" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
  	</div>
	<!-- 需要引用的JS -->
  	
    <script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='form.js'/>"></script>
    <script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
    <script  type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='bsp/organ/organtype.js'/>"></script>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>"
	var typeName=""
</script>
</html>