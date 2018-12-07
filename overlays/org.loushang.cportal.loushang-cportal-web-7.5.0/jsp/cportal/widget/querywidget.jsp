<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
<title><spring:message code="cportal.widget.title" text="微件定义"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<style type="text/css">
.ue-menu-wrap {
	top: 0px;
}
.ue-menu-right {
   overflow-y: auto;
   overflow-x: hidden;
}
.container {
		width: 100%;
		margin-left: 0px;
		margin-right: 0px;
	}
	
</style>
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<l:script path="jquery.js,bootstrap.js,form.js,ztree.js,datatables.js,loushang-framework.js,ui.js"></l:script>
<script type="text/javascript" src="<%=request.getContextPath()%>/jsp/cportal/widget/querywidget.js"></script>
<script type="text/javascript">
	var context = '<%=request.getContextPath()%>';
</script>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<ul id="widgetTypeTree" class="ztree"></ul>
		</div>
		<div class="ue-menu-right">
		 <div class="container">
			<form class="form-inline">
				<div class="input-group">
					<input type="text" class="form-control ue-form" id="widgetName" placeholder="<spring:message code="cportal.widget.name" text="名称"/>"/>
					<div class="input-group-addon ue-form-btn" id="query">
			        	<span class="fa fa-search"></span>
			        </div>
				</div>
				<div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span>
						<spring:message code="cportal.widget.new" text="增加"/>
					</button>
					<button id="batchdel" type="button" class="btn ue-btn">
						<span class="fa fa-minus"></span>
						<spring:message code="cportal.widget.delete" text="删除"/>
					</button>
					<button id="updateWidgetType" type="button" class="btn ue-btn">
						<span class="fa fa-pencil"></span>
						<spring:message code="cportal.widget.updateType" text="修改类别"/>
					</button>
				</div>
			</form>
			<table id="widgetList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="7%" data-field="id" data-sortable="false" data-render="rendercheckbox">
						<input type="checkbox" id="selectAll" onClick="selectAll(this,'checkList')" />
						</th>
						<th width="13%" data-field="id" data-render="modifyLink">
						<spring:message code="cportal.widget.id" text="微件ID"/></th>
						<th width="14%" data-field="name" data-render="rendername">
						<spring:message code="cportal.widget.name" text="微件名称"/></th>
						<th width="13%" data-field="author" data-render="renderauthor">
						<spring:message code="cportal.widget.author" text="作者"/></th>
						<th width="20%" data-field="createTime">
						<spring:message code="cportal.widget.createTime" text="创建时间"/></th>
						<th width="20%" data-field="updateTime">
						<spring:message code="cportal.widget.updateTime" text="更新时间"/></th>
						<th width="13%" data-render="operation" data-field="id" data-sortable="false">
						<spring:message code="cportal.widget.operation" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
	  </div>	
	</div>
</body>
</html>