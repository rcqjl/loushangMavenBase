<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>选择字典</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<style type="text/css">
		table.dataTable thead>tr {
			height: 30px;
		}
		table.dataTable thead>tr>th {
			line-height: 30px;
			height: 30px;
		}
		.table-bordered>tbody>tr>td {
			height: 25px;
			line-height: 25px;
			white-space: nowrap;
			overflow: hidden;
		}
		body{
			padding-top: 15px;
		}
	}
	</style>
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
	<script  type="text/javascript" src="<l:assetcontext/>/jsp/cform/builder/databind/dictservice/querydict.js"></script>
	<script  type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<form class="form-inline">
			    <div class="input-group">
					<input type="text" class="form-control ue-form " id="dictName" placeholder="<spring:message code="bsp.dict.018" text="请输入字典名称"></spring:message>"/>											
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
				    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="confirm" type="button" class="btn ue-btn">
						</span><spring:message code="cf.confirm" text="确定"></spring:message>
					</button>
					<button id="cancel" type="button" class="btn ue-btn">
						</span><spring:message code="cf.cancel" text="取消"></spring:message>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="dictList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="10" data-sortable="false" data-render="rendercheckbox"></th>
						<th width="45" data-field="dictCode" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.010" text="字典编号"></spring:message></th>
						<th width="45" data-field="dictName" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.011" text="字典名称"></spring:message></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>