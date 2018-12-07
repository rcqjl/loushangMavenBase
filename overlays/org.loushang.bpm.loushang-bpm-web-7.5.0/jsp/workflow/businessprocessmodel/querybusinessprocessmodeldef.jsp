<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@page import="org.loushang.next.data.Record"%>
<%@page import="org.loushang.next.data.DataSet"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="org.loushang.workflow.util.bsp.WfStru"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@page import="org.loushang.workflow.util.WfPageBtnDefApi"%>
<%@page import="org.loushang.workflow.util.WfProcessPluginTypeApi"%>
<%
String path = request.getContextPath();
String bspAppName=BspUtil.getInstance().getBspAppPath();
String basePath;
String bspAppPath;
if (80 == request.getServerPort()) {
	basePath = request.getScheme() + "://"
		+ request.getServerName()
		+ path + "/";
	bspAppPath = request.getScheme() + "://"
			+ request.getServerName()
			+ bspAppName + "/";
} else {
	basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";
	bspAppPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+bspAppName + "/";
}
String displaySourceTypes=request.getParameter("displaySourceTypes");
%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.table {
			table-layout:fixed;
		}
		.table tbody tr td li{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.labelel{
			float:left;
			margin-top:2px;
			margin-right:7px;
			width: 70px;
			text-align: right;
		}
		.form-group {
   			 margin-top: 5px;
		}
		#search {
			margin-left: 10px;
		}
	</style>

  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js,datatables.js,bpm/util.js"></l:script>
	<script type="text/javascript" src="querybusinessprocessmodeldef.js"></script>
	<script id="searchpanel" type="text/html">
	  <div id="searchtemp" class="form-horizontal">
		<div class="form-group">
			<div class="pull_left">
				<label class="labelel"><spring:message code="BPM.BUSINESSPROCESSMODEL.Version" text="版本："/></label>
				<select class="ue-form" id="searchProcessVersion">
		        	 <option value=""><spring:message code="BPM.BUSINESSPROCESSMODEL.All" text="全部"/></option>
		       	  	 <option value="0"><spring:message code="BPM.BUSINESSPROCESSMODEL.NewVersion" text="新版本"/></option>
		       		 <option value="1"><spring:message code="BPM.BUSINESSPROCESSMODEL.OldVersion" text="旧版本"/></option>
		   		</select>
			</div>
		</div>
		<div class="form-group">
			<div class="pull-left">
				<label class="labelel"><spring:message code="BPM.BUSINESSPROCESSMODEL.ProcessLevel" text="流程层次："/></label>
				<select class="ue-form" id="searchProcessLevel">
		       	  	<option value=""><spring:message code="BPM.BUSINESSPROCESSMODEL.All" text="全部"/></option>
		       		<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
		   		</select>
			</div>
	        <button type="button" id="search" class="btn ue-btn-primary"><spring:message code="BPM.BUSINESSPROCESSMODEL.Search" text="搜索"/></button>
		</div>
      <div>
	</script>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">
			<div class="input-group">
				<input type="text" class="form-control ue-form" id="searchProcessName" placeholder="<spring:message code="BPM.BUSINESSPROCESSMODEL.ProcessName" text="流程名称"/>"/>
				<div  class="input-group-addon ue-form-btn" id="query" >
					<span class="fa fa-search"></span>
				</div>	
			</div>
			<a class="btn ue-btn dbtn" id="moresearch"><spring:message code="BPM.BUSINESSPROCESSMODEL.MoreSearch" text="更多搜索"/><i class="fa fa-angle-down"></i></a>
			<div class="pull-right">
				<button id="add" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <spring:message code="BPM.BUSINESSPROCESSMODEL.IncreaseBusinessProcess" text="新增业务流程"/>
				</button>
				<button id="addChild" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <spring:message code="BPM.BUSINESSPROCESSMODEL.IncreaseLowerLevelProcessDefinition" text="新增下级流程"/>
				</button>
				<button id="delete" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <spring:message code="BPM.BUSINESSPROCESSMODEL.Delete" text="删除"/>
				</button>
				<button id="processImport" type="button" class="btn ue-btn">
					<span class="fa fa-download"></span> <spring:message code="BPM.BUSINESSPROCESSMODEL.Import" text="导入"/>
				</button>	
				<button id="processExport" type="button" class="btn ue-btn">
					<span class="fa fa-upload"></span> <spring:message code="BPM.BUSINESSPROCESSMODEL.Export" text="导出"/>
				</button>
			</div>
		</form>
		<table id="formList" class="table table-bordered table-hover" style="margin-top:6px;">
			<thead>
				<tr>
					<th width="4%"><input type="checkbox" id="selectAll"/></th>
					<th width="12%"><spring:message code="BPM.BUSINESSPROCESSMODEL.ProcessName" text="流程名称"/></th>
					<th width="8%"><spring:message code="BPM.BUSINESSPROCESSMODEL.TemplateType" text="模板类型"/></th>
					<th width="5%"><spring:message code="BPM.BUSINESSPROCESSMODEL.Level" text="层次"/></th>
					<th width="12%"><spring:message code="BPM.BUSINESSPROCESSMODEL.ParentProcess" text="父流程"/></th>
					<th width="12%"><spring:message code="BPM.BUSINESSPROCESSMODEL.ParentProcessLink" text="父流程环节"/></th>
					<th width="8%"><spring:message code="BPM.BUSINESSPROCESSMODEL.LeafProcess" text="叶子流程"/></th>
					<th width="5%"><spring:message code="BPM.BUSINESSPROCESSMODEL.Valid" text="生效"/></th>
					<th width="10%"><spring:message code="BPM.BUSINESSPROCESSMODEL.CreateTime" text="创建时间"/></th>
					<th width="10%"><spring:message code="BPM.BUSINESSPROCESSMODEL.Operation" text="操作"/></th>
				</tr>
			</thead>
		</table>
	</div>	
</body>
</html>