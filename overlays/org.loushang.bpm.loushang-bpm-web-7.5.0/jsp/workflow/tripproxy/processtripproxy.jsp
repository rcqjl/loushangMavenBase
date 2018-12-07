<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
	 <script type="text/javascript" src="processtripproxy.js"></script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">
					<input type="text" class="form-control ue-form" id="searchId" placeholder="<spring:message code="BPM.TRIPPROXY.ProcessName" text="流程名称"></spring:message>"/>											
					<div  class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			    <div class="btn-group pull-right">
					<button id="setProxy" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="BPM.TRIPPROXY.SettingDelegate" text="设置委托"></spring:message> 
					</button>
					<button id="delete" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="BPM.TRIPPROXY.CancelDelegate" text="取消委托"></spring:message>
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%"><input type="checkbox" id="selectAll" /></th>
						<th width="40%"><spring:message code="BPM.TRIPPROXY.ProcessName" text="流程名称"></spring:message></th>
						<th width="10%"><spring:message code="BPM.TRIPPROXY.Client" text="委托人"></spring:message></th>
						<th width="20%"><spring:message code="BPM.TRIPPROXY.Agent" text="代理人"></spring:message></th>
						<th width="17%"><spring:message code="BPM.TRIPPROXY.WhetherTask" text="是否代理已有任务"></spring:message></th>
						<th width="8%"><spring:message code="BPM.JSPFORM.Operating" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
</html>