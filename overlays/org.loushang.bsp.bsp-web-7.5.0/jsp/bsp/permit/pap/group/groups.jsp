<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>组</title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css,bsp/css/group/groups.css" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js,bsp/bsp-common.js,bsp/group/groups.js"/>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<form class="form-inline" onsubmit="return false">
			    <div class="input-group">
					<input type="text" class="form-control ue-form " id="groupId" placeholder="<spring:message code="bsp.group.003" text="请输入组名称"></spring:message>"/>											
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
				    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="bsp.group.004" text="添加组"></spring:message>
					</button>
					<button id="batchdel" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="bsp.group.005" text="删除组"></spring:message>
					</button>
				</div>
			</form>
			
		</div>
		<div class="row">
			<table id="groupList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%" data-field="id" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll"/>
						</th>
						<th width="20%" data-field="groupId" data-sortable="false" data-render="renderTitle"><spring:message code="bsp.group.006" text="组名称"></spring:message></th>
						<th width="20%" data-field="note" data-sortable="false" data-render="renderTitle"><spring:message code="bsp.group.007" text="备注"></spring:message></th>
						<th width="20%" data-field="ctime" data-sortable="false"><spring:message code="bsp.group.007" text="创建时间"></spring:message></th>
						<th width="15%" data-field="id" data-sortable="false" data-render="renderOpt"><spring:message code="bsp.group.010" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>