<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/prettify.css'/>"/>
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
	</style>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
	<script type="text/javascript" src="queryprocessdefadmin.js"></script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">									
					<input type="text" class="form-control ue-form" id="searchId" placeholder="<spring:message code="BPM.MANAGE.WorkflowName" text="流程名称"/>"/>											
					<div  class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			    <div class="btn-group pull-right">
					<button id="queryAct" type="button" class="btn ue-btn">
						<span class="fa fa-eye"></span><spring:message code="BPM.MANAGE.ActiveWorkflowInstance" text="活动流程实例"/> 
					</button>
					<button id="queryEnd" type="button" class="btn ue-btn">
						<span class="fa fa-eye"></span><spring:message code="BPM.MANAGE.GoneThroughTheWorkflowInstance" text="办结流程实例"/> 
					</button>
					<button id="delete" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="BPM.MANAGE.Delete" text="删除"/> 
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" id="selectAll"/></th>
						<th width="30%"><spring:message code="BPM.MANAGE.ProcessDefinitionName" text="流程定义名称"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.ActiveProcessNumber" text="活动流程个数"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.EndProcessNumber" text="办结流程个数"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.CreateTime" text="创建时间"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>