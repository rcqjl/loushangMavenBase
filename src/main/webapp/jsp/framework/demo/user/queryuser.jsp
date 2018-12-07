<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户详细信息</title>
<!-- 引入css文件 -->
<l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css,framework/demo/user/user.css" />
<style>
.container {
	width: 100%;
};
</style>
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
<!-- 引入js文件 -->
<l:script
	path="jquery.js,bootstrap.js,form.js,datatables.js,loushang-framework.js,framework/demo/user/user.js,ui.js" />
<script id="searchpanel" type="text/html">
	  <div id="searchtemp">
		
		<div class="form-group">
			<div>
				<label for="userId" class="text-name"><spring:message code="user.id" text="账号："/></label> 
			</div>
			
			<div style="margin-left: 60px;margin-top: -30px;">
				<input type="text" class="form-control ue-form" id="userId" placeholder="<spring:message code="user.id" text="账号"/>">
				
			<div style="margin-top:15px">
					<button id="search" class="btn ue-btn-primary"><spring:message code="user.search" text="搜索"/></button>
			</div>
			</div>
		</div>
      <div>
	</script>
<script type="text/javascript">
	//项目上下文
	var context="<%=request.getContextPath()%>";
	$(document).ready(
		function() {
			var options = {};
			var url = context + "/service/framework/demo/user/query";
			grid = new L.FlexGrid("userList", url);
			grid.init(options); //初始化datatable
			//增加
			$("#add").on("click", modify);
			// 删除
			$(document).on("click",".del",function() {
				var recordIds = grid.oTable.row($(this).parents("tr")).data().id;
				$.dialog({type : 'confirm',content : L.getLocaleMessage("user.confirm","确认删除该记录?"),
					autofocus : true,
					ok : function() {
						window.location.href = context + "/service/framework/demo/user/delete/" + recordIds;
					},
					cancel : function() {}
				});
			});
			//批量删除
			$("#batchDel").on("click", Batchdelete);
			// 编辑
			$(document).on("click",".modify",
				function() {
					var data = grid.oTable.row($(this).parents("tr")).data();
					modify(data);
				});
	});

	function modify(data) {
		var url = context + "/service/framework/demo/user/edit";
		if (data.id) {
			url += "?id=" + data.id;
		}
		window.location.href = url;
	}

	function Batchdelete() {
		var recordTmp = [];
		var userIds = $(":checkbox[name=checkboxlist]:checked");
		if (userIds != null && userIds.length < 1) {
			$.dialog({
				type : 'confirm',
				content : L.getLocaleMessage("user.confirmTip", "请选择要删除的记录！"),
				autofocus : true,
				ok : function() {}
			});
		} else {
			userIds.each(function(i, checkbox) {
				recordTmp.push($(checkbox).val());
			});
			recordIds = recordTmp.join();
			$.dialog({
				type : 'confirm',
				content : L.getLocaleMessage("user.confirm", "确认删除该记录?"),
				autofocus : true,
				ok : function() {
					window.location.href = context + "/service/framework/demo/user/delete/" + recordIds;
				},
				cancel : function() {}
			});
		}
	}

	function rendercheckbox(data, type, full) {
		return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
	};

	function renderoptions(data, type, full) {
		var delBtn = "<a class=\"del\" ><spring:message code="user.delete" text="删除"/></a>";
		var editBtn = "<a class=\"modify\"><spring:message code="user.edit" text="编辑"/></a>";
		return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
	}
	function renderstatus(data, type, full) {
		switch (data) {
		case "N":
			data = L.getLocaleMessage("user.operationOn", "启用");
			break;
		case "X":
			data = L.getLocaleMessage("user.operationOff", "停用");
			break;
		}
		return data;
	}
</script>
</head>
<body>
	<div class="topdist"></div>
	<div class="container">
		<div class="row">
			<form class="form-inline" onsubmit="return false;">
				<div class="input-group">
					<input class="form-control ue-form" type="text" id="userName"
						placeholder="<spring:message code="user.name" text="用户名称"/>" />
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
					</div>
				</div>
				<a class="btn ue-btn dbtn" id="moresearch"><spring:message code="user.searchmore" text="更多搜索" />
					<i class="fa fa-angle-down"></i></a>
				<div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span>
						<spring:message code="user.add" text="增加" />
					</button>
					<button id="batchDel" type="button" class="btn ue-btn"
						style="margin-left: 5px;">
						<span class="fa fa-trash"></span>
						<spring:message code="user.batchDel" text="批量删除" />
					</button>
				</div>

			</form>
		</div>
		<l:excel tableId="userList" excelUrl="/service/framework/demo/user/query"></l:excel>
		<div class="row">
			<table id="userList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="10%" data-field="id" data-sortable="false" data-render="rendercheckbox">
							<input type="checkbox" id="selectAll" onchange="selectAll(this,'checkList')" /></th>
						<th width="18%" data-field="userId" data-sortable="false">
							<spring:message code="user.id" text="账号" /></th>
						<th width="18%" data-field="userName">
							<spring:message code="user.name" text="姓名" /></th>
						<th width="18%" data-field="nickname">
							<spring:message code="user.nickname" text="昵称" /></th>
						<th width="18%" data-field="status" data-render="renderstatus">
							<spring:message code="user.status" text="账号状态" /></th>
						<th width="18%" data-field="userId" data-render="renderoptions">
							<spring:message code="user.operation" text="操作" /></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
</html>