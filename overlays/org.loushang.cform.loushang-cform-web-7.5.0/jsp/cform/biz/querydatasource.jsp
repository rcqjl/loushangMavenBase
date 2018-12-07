<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSS -->
    <l:link path="css/bootstrap.css,css/font-awesome.css,css/ui.css,css/form.css,css/datatables.css"></l:link>
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
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	
	<!-- JS -->
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,datatables.js,loushang-framework.js"></l:script>
  </head>
  <body>
	<div class="container">
		<div class="row">
			<form class="form-inline" onsubmit="return false;">
				<div class="input-group pull-left">
					<input type="text" class="form-control ue-form" id="searchId"/>
					<div class="input-group-addon ue-form-btn" id="query">
						<span class="fa fa-search"></span>
					</div>
				</div>
				<div class="btn-group pull-right">
					<button id="confirm" type="button" class="btn ue-btn">确定</button>
				</div>
			</form>
		</div>
		<div class="row">
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="8%" data-field="dsId" data-render="renderRadio"></th>
						<th width="23%" data-field="dsName">名称</th>
						<th width="23%" data-field="dbType">类型</th>
						<th width="23%" data-field="dbName">数据库/实例名称</th>
						<th width="23%" data-field="dbIp">数据库IP</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<script type="text/javascript">
	var context="<%=request.getContextPath()%>";
	var dialog = parent.dialog.get(window);
	(function($) {
		$.initTable = function(options) {
			grid = new L.FlexGrid(options.listId, options.appUrl);
			grid.init({
				ordering : false
			});
		};
		$.queryEvent = function(appUrl, param) {
			grid.reload(appUrl, param);
		}
	})(jQuery);
	function renderRadio(data, type, full) {
	    return '<input type="radio" value="' + data + '" title="' + data + '"name="datasource"/>'
	};
	$(function(){
	// 初始化表格
		$.initTable({
			listId : "formList",
			appUrl : context + "/service/cform/datasource/query"
		});
	//单击任意td选中
		$(document).on("click","#formList tr td:not(:first-child)",function(){
			var obj = $(this).parent().find("td:first").find("input");
			obj.prop("checked",!obj.is(":checked"));
		});
	// 查询
		$("#query").click(function() {
			var searchVal = $("#searchId").val();
			var param = {}
			if (searchVal != "") {
				param = {
						"dsName" : searchVal
				}
			}
			var appUrl = context + "/service/cform/datasource/query";
			$.queryEvent(appUrl, param);
		});
	//确定
		$("#confirm").click(function(){
			dialog.close($("[name=datasource]:checked").val());
			dialog.remove();
			return false;
		});
	});
	</script>
</body>
</html>
