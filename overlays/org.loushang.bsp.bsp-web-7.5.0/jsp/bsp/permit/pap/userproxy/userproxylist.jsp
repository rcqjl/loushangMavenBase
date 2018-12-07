<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<title><spring:message code="bsp.userproxy.024" text="权限委托"/></title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />

<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->

<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='jquery.form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/userproxy/userproxylist.js'/>"></script>
<style type="text/css">
.container {
	width: 100%;
	margin-left: 0px;
	margin-right: 0px;
}
.row {
	margin: 0px;
	padding: 0px;
}
</style>
</head>
<body>
<div class="container">
	<div class="row ">
		<form class="form-inline" onsubmit="return false;"style="height: 30px;">
		
			<div class="btn-group pull-right">
				<button id="add" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <spring:message code="bsp.userproxy.003" text="添加"/>
				</button>
				<button id="batchDel" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <spring:message code="bsp.userproxy.004" text="删除"/>
				</button>
			</div>
		</form>
		<table id="UserProxyList"
			class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%" data-field="proxyPermissionId" data-sortable="false"
						data-render="rendercheckbox"><input type="checkbox" /></th>
					<th width="23%" data-field="userName"><spring:message code="bsp.userproxy.025" text="委托人"/></th>
					<th width="23%" data-field="proxyUserName"><spring:message code="bsp.userproxy.026" text="代理人"/></th>
					<th width="34%" data-field="proxyPermissionInfo"><spring:message code="bsp.userproxy.029" text="代理类型"/></th>
					<th width="15%" data-field="proxyPermissionId"
						data-render="rendBtn"><spring:message code="bsp.userproxy.007" text="操作"/></th>
				</tr>
			</thead>
		</table>
	</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>