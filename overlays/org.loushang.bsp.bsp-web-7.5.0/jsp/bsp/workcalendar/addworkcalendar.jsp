<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.workcalendar.000" text="工作日历管理"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/workcalendar/workcalendar.css'/>"/>
	
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
	<div class="container">
	    <form class="form-horizontal" id="addForm" onsubmit="return false;">
		    <div class="form-group">
		        <label for="date" class="col-xs-2 control-label"><spring:message code="bsp.workcalendar.007" text="年份"/><span class="required">*</span></label>
		        <div class="col-xs-8 Validform_span">
		            <div class="input-group date" id="dateDemo">
		                <div id="create-date">
		                    <input type="text" name="solarDate" id="solarDate" class="form-control ue-form">
		                </div>
		                <span class="input-group-addon ue-form-btn">
		                    <i class="fa fa-calendar"></i>
		                </span>
		            </div>
		        </div>
		    </div>
	       
		    <div class="form-group" id="footer">
		        <div class="col-sm-3">
		            <button type="button" class="btn ue-btn-primary" id="insert"><spring:message code="bsp.workcalendar.003" text="保存"/></button>
		        </div>
	    	</div>
	    </form>
	</div>
</body>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
	$('#dateDemo').datetimepicker({
	    container: $("#create-date"),
	    language: "zh-CN",
	    autoclose: 1,
	    startView: 4,
	    minView: 4,
	    format: "yyyy"
	});
</script>
</html>