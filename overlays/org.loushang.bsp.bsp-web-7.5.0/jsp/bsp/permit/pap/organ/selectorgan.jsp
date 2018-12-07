<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
<title>选择组织类型</title>
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
<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
<script type="text/javascript" src="<l:asset path='bsp/organ/selectorgan.js'/>"></script>

</head>

<body>

	<form class="form-inline" onsubmit="return false">
		<div class="input-group">
			<input type="text" class="form-control ue-form" id="formName"
				placeholder=" <spring:message code="bsp.organ.016" text="组织类型"/>">
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
				<th width="5%" class="sorting_disabled"
					data-field="organType" data-sortable="false"
					data-render="organTypeRadioSet"></th>
				<th width="90%" class="sorting_disabled"
					data-field="typeName"><spring:message code="bsp.organ.016" text="组织类型"/></th>
			</tr>
		</thead>
	</table>

	<script type="text/javascript">
		var selected;

		selected = ${selected};	//接收组织类型的行内数据 srcName	 
		
		var organtypeGrid;
		var srcName = "";
		// 当前对话框对象
		var dialog = parent.dialog.get(window);

		var context = "<l:assetcontext/>";

		$(document).ready(function() {
			// 初始化表格
			initOrganTypeTable();

			//行点击事件绑定
			rowClickBinding();

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
				"ordering" : false
				
			};
			var url = context + "/service/bsp/organtyperule/tableData";
			organtypeGrid = new L.FlexGrid("organtypeList", url);
			organtypeGrid.init(options);
		}

		// 行点击事件绑定
		function rowClickBinding() {
			//点击翻页将已选择的组织类型的radio选中
			$(".paging_full_numbers").on('click', function() {
				$("tbody tr").click(function() {
					$(this).find(":radio").prop("checked", true);
				}); 
			});
			//点击“改变行数”将已选择的组织类型的radio选中
			$(".input-sm").on('click', function() {
				$("tbody tr").click(function() {
					$(this).find(":radio").prop("checked", true);
				}); 
			});
			// 点击行时选中
			$("tbody tr").click(function() {
				$(this).find(":radio").prop("checked", true);
			});
		}

		// 确定按钮
		function confirm() {
			var msg = L.getLocaleMessage("bsp.organ.047","请选择一条记录，或点击取消！");
			var $radio = $(":radio:checked");
			var $allradio = $(":radio");//获取所有radio
			if ($radio.length < 1) {
				sticky(msg, "warning");
				return false;
			}
			var $tr = $radio.parents("tr");
			var table = $("#organtypeList").DataTable();
			var formData = table.row($tr).data();
			dialog.close(formData);
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
			
			//行点击事件绑定
			rowClickBinding();

		}
		
		// 判断redio是否为选中状态
		function organTypeRadioSet(data, type, full) {
			if($.inArray(full.typeName, selected) > -1) {
				return '<input type="radio" name="organType" checked value="' + data + '" />';
			} else {
				return '<input type="radio" name="organType" value="' + data + '" />';
			}
		}
	</script>

</body>
</html>