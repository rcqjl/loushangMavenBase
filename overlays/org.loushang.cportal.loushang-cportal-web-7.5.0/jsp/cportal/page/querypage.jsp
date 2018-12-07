<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title><spring:message code="cportal.page.title" text="页面定义"/></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<style type="text/css">
	.container {
		width: 100%;
	}
	.row {
	   margin: 0px;
	}
	.ue-menu-right {
	   overflow-y: auto;
	   overflow-x: hidden;
}
</style>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<l:script path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,ui.js"></l:script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/jsp/cportal/page/querypage.js"></script>
	<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<div class="topdist"></div>
	<div class="container">
		<div class="row">
			<form class="form-inline">
				<div class="input-group">									
				<input type="text" class="form-control ue-form " id="pageName" placeholder="<spring:message code="cportal.page.name" text="页面名称"/>"/>											
				<div class="input-group-addon ue-form-btn" id="query">
					<span class="fa fa-search"></span>
			    </div>
			    </div>
			    <div class="btn-group pull-right">
					<button id="add" type="button"
						class="btn ue-btn">
						<span class="fa fa-plus"></span>
						<spring:message code="cportal.page.new" text="增加"/>
					</button>
					<button id="batchdel" type="button"
						class="btn ue-btn">
						<span class="fa fa-minus"></span>
						<spring:message code="cportal.page.delete" text="删除"/>
					</button>
					<button id=release type="button"
						class="btn ue-btn">
						<span class="fa fa-twitter"></span>
						<spring:message code="cportal.page.release" text="发布"/>
					</button>
				</div>
			   
			</form>
			
		</div>
		<div class="row">
			<table id="pageList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="7%" data-field="id" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll" onClick="selectAll(this,'checkList')" />
						</th>
						<th width="16%" data-field="name" data-render="modifyLink">
						<spring:message code="cportal.page.name" text="页面名称"/></th>
						<th width="20%" data-field="description">
						<spring:message code="cportal.page.description" text="页面描述"/></th>
						<th width="10%" data-field="isRelease" data-render="renderstatus">
						<spring:message code="cportal.page.isRelease" text="是否发布"/></th>
						<th width="16%" data-field="createTime">
						<spring:message code="cportal.page.createTime" text="创建时间"/></th>
						<th width="16%" data-field="updateTime">
						<spring:message code="cportal.page.updateTime" text="更新时间"/></th>
						<th width="15%" data-render="operation" data-field="id" data-sortable="false">
						<spring:message code="cportal.page.operation" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>