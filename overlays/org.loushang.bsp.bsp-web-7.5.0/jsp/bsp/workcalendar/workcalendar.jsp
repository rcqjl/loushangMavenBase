<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.workcalendar.000" text="工作日历管理"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/workcalendar/workcalendar.css'/>"/>
	<style type="text/css">
	</style>
	
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/workcalendar/workcalendar.js'/>"></script>
</head>
<body>
	<div class="container-fluid">
		<form class="form-inline" onsubmit="return false;">							  
		    <div class="btn-group pull-right">
				<button id="add" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <spring:message code="bsp.workcalendar.004" text="增加"/>
				</button>
				<button id="del" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <spring:message code="bsp.workcalendar.005" text="删除"/>
				</button>
			</div>
		</form>
		<table id="workcalendarList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%" data-field="solarDate" data-render="rendercheckbox"><input type="checkbox"/></th>
					<th width="30%" data-field="solarDate"><spring:message code="bsp.workcalendar.007" text="年份"/></th>
					<th width="50%" data-field="organName"><spring:message code="bsp.workcalendar.008" text="机构名称"/></th>
					<th width="10%" data-field="solarDate" data-render="renderedit" ><spring:message code="bsp.workcalendar.009" text="操作"/></th>
				</tr>
			</thead>
		</table>	
	</div>

</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</html>