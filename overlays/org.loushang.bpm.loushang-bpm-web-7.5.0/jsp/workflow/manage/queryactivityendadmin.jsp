<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%
	String processId = request.getParameter("processId");
	String procDefUniqueId = request.getParameter("procDefUniqueId");
%>
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
		#addCss{
			margin-bottom:6px;
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
	<script type="text/javascript" src="queryactivityendadmin.js"></script>
	<script type="text/javascript">
		var processId = "<%=processId%>";
		var procDefUniqueId = "<%=procDefUniqueId%>";
	</script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
			    <div class="btn-group pull-right" id="addCss">
					<!-- <button id="viewAssignment" type="button" class="btn ue-btn">
						<span class="fa fa-eye"></span> 委派归档列表
					</button> -->
					<button id="back" type="button" class="btn ue-btn">
						<span class="fa fa-undo"></span><spring:message code="BPM.MANAGE.Return" text="返回"/>
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="3%"></th>
						<th width="20%"><spring:message code="BPM.MANAGE.LinkName" text="环节名称"/></th>
						<th width="20%"><spring:message code="BPM.MANAGE.StartTime" text="开始时间"/></th>
						<th width="20%"><spring:message code="BPM.MANAGE.EndTime" text="结束时间"/></th>
						<th width="20%"><spring:message code="BPM.MANAGE.Operation" text="操作"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>