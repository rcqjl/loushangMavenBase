<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<title>选择下级组织类型</title>
<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>" />
<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/organ/selectorgan.css'/>" />
<style type="text/css">
table.kTable thead>tr {
	height: 30px;
}

table.dataTable thead>tr>th {
	line-height: 30px;
	height: 30px;
}

.table-bordered>tbody>tr>td {
	height: 30px;
	line-height: 30px;
}

.input-group {
	float: left;
	margin-bottom: 5px;
	width: 215px;
}
</style>

<!--[if lt IE 9]>
      <script src="/ls2016/skins/js/html5shiv.js"></script>
      <script src="/ls2016/skins/js/respond.js"></script>
    <![endif]-->
<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/organ/selectorgan.js'/>"></script>


</head>

<body>

	<form class="form-inline" onsubmit="return false">
		<div class="input-group">
			<input type="text" class="form-control ue-form" id="formName"
				placeholder="<spring:message code="bsp.organ.045" text="下级允许的组织类型"/>">
			<div class="input-group-addon ue-form-btn" id="query">
				<span class="fa fa-search"></span>
			</div>
		</div>
		<div class="btn-group pull-right">
			<button id="confirm" type="button" class="btn ue-btn">
				<span class="fa fa-save"></span> <spring:message code="bsp.organ.046" text="确定"/>
			</button>
			<button id="cancel" type="button" class="btn ue-btn">
				<span class="fa fa-undo"></span> <spring:message code="bsp.organ.004" text="取消"/>
			</button>
		</div>
	</form>

	<table id="organtypeList"
		class="table table-bordered table-hover dataTable no-footer"
		role="grid" aria-describedby="formList_info">
		<thead>
			<tr role="row">
				<th width="5%" 
					data-field="organType" data-sortable="false"
					data-render="organcheckbox"><input type="checkbox"
					id="selectAll" /></th>
				<th width="95%" 
					data-field="typeName"><spring:message code="bsp.organ.016" text="组织类型"/></th>
			</tr>
		</thead>
		<tbody></tbody> 
	</table>

	<script type="text/javascript">
		var selected = [];
		selected = ${selected};//接收下级允许的组织类型的数据	
		var organtypeGrid;
		var srcName = "";
		var gridData = [];
		// 当前对话框对象
		var dialog = parent.dialog.get(window);

		var context = "<l:assetcontext/>";

		$(document).ready(function() {

			// 初始化表格
			initOrganTypeTable();

			// 点击行时选中checkbox绑定
			rolwClickBandingSet();

			// 查询按钮
			$("#query").click(function() {
				srcName = $("#formName").val();
				queryForm(srcName);
			});

			//查询事件回车键绑定
			$("#formName").keydown(function(event) {
				if (event.keyCode == 13) {
					srcName = $("#formName").val();
					queryForm(srcName);
				}
			});

			// 确定按钮
			$("#confirm").click(function() {
				confirm();

			});

			// 取消按钮
			$("#cancel").click(function() {
				dialog.close();
				dialog.remove();
				return false;
			});

 
		});

		//加载数据
		function initOrganTypeTable() {
			var options = {
				ordering : false
			};

			var url = context + "/service/bsp/organtyperule/tableData";
			organtypeGrid = new L.FlexGrid("organtypeList", url);
			organtypeGrid.init(options);
		}

		function rolwClickBandingSet() {
			rowClickBanding();

			//修改每页行数时进行checkbox行选中事件绑定
			$(".input-sm").on('click', rowClickBanding);

			//点击翻页时进行checkbox行选中事件绑定
			$(".paging_full_numbers").on('click', rowClickBanding);
		}

		// 行点击事件绑定
		function rowClickBanding() {
			$("tbody tr").click(function() {
				if ($(this).find(":checkbox").is(":checked")) {
					$(this).find(":checkbox").prop("checked", false);
				} else{
					$(this).find(":checkbox").prop("checked", true);
				}
			}); 
			$("tbody :checkbox").click(function() {
				if ($(this).is(":checked")) {
					$(this).prop("checked", false);
				} else {
					$(this).prop("checked", true);
				}
			});
		}

		// 确定按钮
		function confirm() {
			var list_map = [];//List<Map>
			var list_map_un = [];
			var list = [];
			var $checkbox = $(":checkbox:gt(0):checked");//获取所有的被选中的checkbox，除了selectAll

			$checkbox.each(function() {//遍历选中的checkbox
				var $tr = $(this).parents("tr");
				var table = $("#organtypeList").DataTable();
				var formData = table.row($tr).data();
				list_map.push(formData);
			});
			
			$("input[name='organcheckbox']").not("input:checked").each(function() {
				//遍历未选中的checkbox
				var $tr = $(this).parents("tr");
				var table = $("#organtypeList").DataTable();
				var formData = table.row($tr).data();
				list_map_un.push(formData);
			});
			
			list.push(list_map);
			list.push(list_map_un);
			
			dialog.close(list);
			dialog.remove();
			return false;

		}

		//查询
		function queryForm(srcName) {
			var url = context + "/service/bsp/organtyperule/tableData";
			if (srcName != "") {
				url = url + "?srcName="+srcName
				url=encodeURI(encodeURI(url));
			}

			organtypeGrid.reload(url);

			// 点击行时选中checkbox绑定
			rolwClickBandingSet();
		}

		// 判断checkbox是否是选中状态
		function organcheckbox(data, type, full) {
			if($.inArray(full.typeName, selected) > -1) {
				return '<input type="checkbox" name="organcheckbox" checked value="' + data + '" />';
			} else {
				return '<input type="checkbox" name="organcheckbox" value="' + data + '" />';
			}
		}
	</script>

</body>
</html>