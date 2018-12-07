<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<% 
  String procTypeId=request.getParameter("procTypeId");
  if(procTypeId==null)
	  procTypeId="";
  //增加过滤流程类型Id
  String exceptProcTypeIds=request.getParameter("exceptProcTypeIds");
  if(exceptProcTypeIds==null)
	  exceptProcTypeIds="";
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
	<script type="text/javascript" src="querynew.js"></script>
	<script type="text/javascript">
		 var procTypeId="<%=procTypeId%>";
	     var exceptProcTypeIds="<%=exceptProcTypeIds%>";
	</script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">									
					<input type="text" class="form-control ue-form" id="queryProcDefName" placeholder="<spring:message code="BPM.TASKLIST.WorkflowName" text="流程名称"/>"/>											
					<div class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			    <div class="btn-group pull-right">
					<button id="publish" type="button" class="btn ue-btn">
						<span class="fa fa-paper-plane"></span><spring:message code="BPM.TASKLIST.Initiate" text="发起"/>
					</button>
					<button id="checkMonitorChart" type="button" class="btn ue-btn">
						<span class="fa fa-dashboard"></span><spring:message code="BPM.TASKLIST.MonitorChart" text="监控图"/>
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="3%"></th>
						<th width="50%"><spring:message code="BPM.TASKLIST.WorkflowName" text="流程名称"/></th>
						<th width="20%"><spring:message code="BPM.TASKLIST.Starttime" text="创建时间"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>