<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
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
	}
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,datatables.js,loushang-framework.js"></l:script>
</head>
<body>
<div>
	<form class="form-inline">	
		<div class="input-group">									
			<input type="text" class="form-control ue-form" id="typeName" placeholder="<spring:message code="cportal.widgetType.name" text="名称"/>"/>											
			<div  class="input-group-addon ue-form-btn" id="query" >
				<span class="fa fa-search"></span>
		    </div>
		</div>
		<div class="btn-group pull-right">
			<button id="confirm" type="button" class="btn ue-btn">
				<spring:message code="cportal.confirm" text="确定"/>
			</button>
			<button id="cancel" type="button" class="btn ue-btn">
				<spring:message code="cportal.cancel" text="取消"/>
			</button>
		</div>
	</form>
	<table id="typeList" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th width="10%" data-field="id" data-render="renderRadio" data-sortable="false"></th>
				<th width="45%" data-field="id" data-sortable="false"><spring:message code="cportal.widgetType.id" text="ID"/></th>
				<th width="45%" data-field="name" data-sortable="false"><spring:message code="cportal.widgetType.name" text="名称"/></th>
			</tr>
		</thead>
	</table>
</div>
</body>
<script type="text/javascript">
var context="<%=request.getContextPath()%>";
var radioName = "typeList";
var dialog = parent.dialog.get(window);

$(document).ready(function(){
	// 初始化表格
	var url = context + "/service/cportal/widgets/selectwidgettype";
	init(url);
	// 查询按钮
	$("#query").click(function(){
		queryType();
	});
	
	// 确定按钮
	$("#confirm").click(function(){
		confirmValue();
	});
	// 取消按钮
	$("#cancel").click(function(){
		dialog.close();
		dialog.remove();
		return false;
	});
});
function init(url){
	var options = {};
	grid = new L.FlexGrid("typeList",url);
	grid.init(options);
}
function renderRadio(data, type, full) {
    return '<input type="radio" value="' + data + '" title="' + data + '" id="checkbox" name="'+radioName+'"/>'
};

// 查询
function queryType() {
	var typeName=$("#typeName").val();
	if ((typeName == "" || typeName == null)) {
		var url=context+"/service/cportal/widgets/selectwidgettype";
		grid.reload(url);
	} else {
		var url= context+"/service/cportal/widgets/findTypeByName";
		var options = {
				"typeName":typeName
		};
		grid.reload(url,options);
	}
}

// 确定按钮
function confirmValue() {
	var $radio = $("[name="+radioName+"]:checked");
	if(!$radio.length) {
		return false;
	}
	
	var typeId = $radio.val();
	dialog.close(typeId);
	dialog.remove();
	return false;
}

</script>
</html>