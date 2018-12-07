<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><spring:message code="bsp.location.001" text="行政区划"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/location/cant.css'/>"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/location/cant.js'/>"></script>
	<script  type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div id="bread" class="bread"></div>
	
	<div class="container">
		<div class="row">
			<form class="form-inline" onsubmit="return false">
			    <div class="input-group">
					<input type="text" class="form-control ue-form " id="queryCant" placeholder="<spring:message code="bsp.location.012" text="请输入代码或名称"></spring:message>"/>											
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
				    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="addCant" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="bsp.location.002" text="新增"/>
					</button>
					<button id="batchDelCant" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="bsp.location.003" text="删除"/>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="cantList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="50px" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll"/>
						</th>
						<th width="15%" data-field="cantCode" data-sortable="false" data-render="renderLen"><spring:message code="bsp.location.004" text="行政区划代码"/></th>
						<th width="35%" data-field="cantName" data-sortable="false" data-render="renderName"><spring:message code="bsp.location.005" text="行政区划名称"/></th>
						<th width="30%" data-field="shortName" data-sortable="false" data-render="renderLen"><spring:message code="bsp.location.006" text="行政区划简称"/></th>
						<th width="20%" data-field="typeName" data-sortable="false" data-render="renderLen"><spring:message code="bsp.location.007" text="行政区划类型"></spring:message></th>
						<th width="150px"  data-sortable="false" data-render="renderOpt"><spring:message code="bsp.location.008" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>