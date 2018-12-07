<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.fml" text="表单映射定义"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/slickgrid.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		html, body {
			height: 100%;
		}
		.container {
			width: 100%;
			height: 100%;
			margin-left: 0px;
			margin-right: 0px;
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
		.label-border{
			padding-right: 20px;
			padding-left: 0px;
		}
		.search-border{
			margin-left: -25px;
		}
		.search-text{
			margin-left: -25px;
			margin-top: 10px;
		}
		.slick-cell.flashing {
			background-color: yellow;
		}
		.form-inline .input-group{
			width: 200px;
		}
		.slick-cell-hover {
			cursor: pointer;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,bootstrap.js,slickgrid.js,form.js,l5-adapter.js,ui.js"/>
	<script type="text/javascript" src="querybizmodelmap.js"></script>
	<script id="searchpanel" type="text/html">
	  <div id="searchtemp">
		<div class="form-group">
			<label class="col-xs-3 col-md-3  text-right label-border" for="toModelName"><s:message code="cf.tmn" text="目标表单名称"/>：</label>
	        <div class="col-xs-8 col-md-8">
	           <input type="text" class="form-control ue-form search-border" id="toModelName" />
	        </div>
		</div>
		<div class="form-group" style="margin-top:2px;">
			<label class="col-xs-3 col-md-3  text-right" for="search"></label>
	        <div class="col-xs-8 col-md-8 search-text">
	           <button id="search" class="btn ue-btn-primary"><s:message code="cf.search" text="搜索"/></button>
	        </div>
		</div>
      <div>
	</script>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">
			<div class="input-group">
		        <input type="text" class="form-control ue-form" id="fromModelName" placeholder="<s:message code="cf.smn" text="源表单名称"/>"/>
		        <div class="input-group-addon ue-form-btn" id="queryMap">
		        	<span class="fa fa-search"></span>
		        </div>
	        </div>
		    <a class="btn ue-btn dbtn" id="moresearch"><s:message code="cf.more" text="更多搜索"/><i class="fa fa-angle-down"></i></a>
		    <div class="btn-group pull-right">
				<button id="addRow" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
				</button>
				<button id="saveChangedData" type="button" class="btn ue-btn">
					<span class="fa fa-save"></span> <s:message code="cf.save" text="保存"/>
				</button>
				<button id="batchDel" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <s:message code="cf.delete" text="批量删除"/>
				</button>
			</div>
		</form>
		<div id="mapGrid" class="grid"></div>
	</div>
</body>
</html>