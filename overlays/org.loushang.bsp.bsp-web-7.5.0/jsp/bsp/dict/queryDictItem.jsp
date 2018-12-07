<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>字典项管理</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/dict/queryDictItem.css'/>"/>

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
	<script  type="text/javascript" src="<l:asset path='bsp/dict/queryDictItem.js'/>"></script>
	<script  type="text/javascript">
		var context="<%=request.getContextPath()%>";
		var dictCode = "${param.dictCode}";
	</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<form class="form-inline">
			    <div class="btn-group pull-right">
					<button id="parentDictItem" type="button" class="btn ue-btn">
						<span class="fa fa-backward"></span><spring:message code="bsp.dict.007" text="上级"></spring:message>
					</button>
					<button id="addDictItem" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="bsp.dict.002" text="新增"></spring:message>
					</button>
					<button id="batchdelItem" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="bsp.dict.003" text="删除"></spring:message>
					</button>
					<button id="backDict" type="button" class="btn ue-btn">
						<span class="fa fa-arrow-circle-up"></span><spring:message code="bsp.dict.016" text="返回"></spring:message>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="itemList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="50px" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll"/>
						</th>
						<th width="25%" data-field="itemCode" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.019" text="编号"></spring:message></th>
						<th width="25%" data-field="itemValue" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.020" text="名称"></spring:message></th>
						<th width="10%" data-field="xh" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.021" text="序号"></spring:message></th>
						<th width="40%" data-field="note" data-sortable="false" data-render="renderLen"><spring:message code="bsp.dict.012" text="描述"></spring:message></th>
						<th width="150px" data-sortable="false" data-render="renderOpt"><spring:message code="bsp.dict.015" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>