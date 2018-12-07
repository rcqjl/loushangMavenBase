<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%
	String processId = request.getParameter("processId");
	String activityId = request.getParameter("activityId");
	String procDefUniqueId = request.getParameter("procDefUniqueId");
	
	String actDefName=request.getParameter("actDefName");
	String actState = request.getParameter("state");
	String procDefName = request.getParameter("procDefName");
	//获取bsp应用地址
	String bspAppName=BspUtil.getInstance().getBspAppPath();
	String bspAppPath;
	if (80 == request.getServerPort()) {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName()
			+ bspAppName + "/";
	} else {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+bspAppName + "/";
	}
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
	<script type="text/javascript" src="queryassignmentadmin.js"></script>
	<script type="text/javascript">
		var processId = "<%=processId%>";
		var activityId = "<%=activityId%>";
		var procDefUniqueId = "<%=procDefUniqueId%>";
		var actDefName = "<%=actDefName%>";
		actDefName = decodeURI(actDefName);
		var procDefName = "<%=procDefName%>";
	    procDefName = decodeURI(procDefName);
		var actState = "<%=actState%>";
		var bspAppPath='<%=bspAppPath%>';
	</script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
			    <div class="btn-group pull-right" id="addCss">
					<button id="reAssign" type="button" class="btn ue-btn">
						<span class="fa fa-repeat"></span><spring:message code="BPM.MANAGE.Re-appoint" text="重新委派"/> 
					</button>
					<button id="cancelAssign" type="button" class="btn ue-btn">
						<span class="fa fa-remove"></span><spring:message code="BPM.MANAGE.CancelDelegate" text="取消委派"/> 
					</button>
					<button id="back" type="button" class="btn ue-btn">
						<span class="fa fa-undo"></span><spring:message code="BPM.MANAGE.Return" text="返回"/> 
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" id="selectAll"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.Participants" text="参与者"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.ActualProcessing" text="实际处理人"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.LinkName" text="环节名称"/></th>
						<th width="10%"><spring:message code="BPM.MANAGE.DelegateStatus" text="委派状态"/></th>
						<th width="15%"><spring:message code="BPM.MANAGE.TaskArrivalTime" text="任务到达时间"/></th>
						<th width="15%"><spring:message code="BPM.MANAGE.TaskProcessingTime" text="任务办理时间"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>