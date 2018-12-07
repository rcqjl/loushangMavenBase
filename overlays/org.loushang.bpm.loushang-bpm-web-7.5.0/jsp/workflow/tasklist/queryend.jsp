<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@page import="java.util.*"%>
<%@page import="org.loushang.workflow.tasklist.taskinfo.util.TaskListJspUtil"%>
<%@page import="org.loushang.workflow.processdefinition.tasklist.defaultsubjectdef.data.DefaultSubjectDef" %>
<%@page import="org.loushang.workflow.processdefinition.tasklist.defaultsubjectdef.data.DefaultSubjectQueryDef" %>
<%
	//指定流程类型查询
	String procTypeId = request.getParameter("procTypeId");
	if(procTypeId==null){
		procTypeId ="";
	}
	//指定过滤流程类型查询	
	String exceptProcTypeIds = request.getParameter("exceptProcTypeIds");
	if(exceptProcTypeIds==null){
		exceptProcTypeIds="";
	}
	//任务标题
	List defaultEndSubjectDefList = TaskListJspUtil.getDefaultEndSubjectDefList();
	//查询条件
	List defaultEndSubjectQueryDefList = TaskListJspUtil.getDefaultEndSubjectQueryDefList();
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
        .table {
            table-layout:fixed;
        }
        .table tr td li{
            overflow-x: hidden;
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
	<script type="text/javascript" src="queryend.js"></script>
	<script type="text/javascript">
		var procTypeId ="<%=procTypeId%>";
		var exceptProcTypeIds="<%=exceptProcTypeIds%>";
	</script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">									
					<input type="text" class="form-control ue-form" id="subjectName" placeholder="<spring:message code="BPM.TASKLIST.Title" text="标题"/>"/>											
					<div class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			    <div class="btn-group pull-right">
					<button id="view" type="button" class="btn ue-btn">
						<span class="fa fa-eye"></span><spring:message code="BPM.TASKLIST.View" text="查看"/>
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
						<th width="25%"><spring:message code="BPM.TASKLIST.Title" text="标题"/></th>
						<th width="20%"><spring:message code="BPM.TASKLIST.WorkflowName" text="流程名称"/></th>
						<th width="10%"><spring:message code="BPM.TASKLIST.Donestep" text="已办环节"/></th>
						<th width="12%"><spring:message code="BPM.TASKLIST.W-inittime" text="流程发起时间"/></th>
						<th width="12%"><spring:message code="BPM.TASKLIST.Processtime" text="办理时间"/></th>
						<th width="12%"><spring:message code="BPM.TASKLIST.W-endtime" text="流程结束时间"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>