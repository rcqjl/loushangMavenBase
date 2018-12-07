<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.modellist" text="业务模型"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css"/>
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
		}
		.input-group {
			float: left;
			margin-bottom: 5px;
			width: 215px;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,datatables.js,l5-adapter.js,ui.js"/>
</head>
<body>
	<form class="form-inline" onsubmit="return false">	
		<div class="input-group">									
			<input type="text" class="form-control ue-form" id="formName" placeholder="<s:message code="cf.name" text="模型名称"/>"/>											
			<div class="input-group-addon ue-form-btn" id="query" >
				<span class="fa fa-search"></span>
		    </div>
		</div>
		<div class="btn-group pull-right">
			<button id="confirm" type="button" class="btn ue-btn">
				<span class="fa fa-save"></span> <s:message code="cf.confirm" text="确定"/>
			</button>
			<button id="cancel" type="button" class="btn ue-btn">
				<span class="fa fa-undo"></span> <s:message code="cf.cancel" text="取消"/>
			</button>
		</div>
	</form>
	<table id="formList" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th width="5%"></th>
				<th width="50%">ID</th>
				<th width="45%"><s:message code="cf.name" text="模型名称"/></th>
			</tr>
		</thead>
	</table>
</body>
<script type="text/javascript">
var modelType="${param.modelType}";
// 当前对话框对象
var dialog = parent.dialog.get(window);

$(document).ready(function(){
	// 初始化表格
	initTable();
	
	// 查询按钮
	$("#query").click(function(){
		queryForm();
	});
	
	//查询事件回车键绑定
	$("#formName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryForm();
		} 
	});
	
	// 确定按钮。
	$("#confirm").click(function(){
		confirm();
	});
	
	// 取消按钮。
	$("#cancel").click(function(){
		dialog.close();
		dialog.remove();
		return false;
	});
	
	// 点击行时选中。
	$("tbody tr").click(function(){
		$(this).find(":radio").prop("checked", true);
	});
});

// 初始化表格。
function initTable() {
	$("#formList").dtable({
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "modelId"},
		          {data: "modelId"},
		          {data: "modelName"}
		          ],
		columnDefs: [
						{
						  targets: 0,	    		       
						  data: "modelId",
						  render: function(data, type, full) {
							  return "<input type='radio' name='radio'/>";
						  }
						}
		             ]
	});
}

// 加载数据
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelQueryCmd");
	for(var i=0; i<aoData.length; i++){
		  if(aoData[i].name=="draw"){
			  draw=aoData[i].value;
		  }
		  if(aoData[i].name=="start"){
			  cmd.setParameter("start", aoData[i].value);
		  }
		  if(aoData[i].name=="length"){
			  cmd.setParameter("limit", aoData[i].value);
		  }
	}
	
	// 查询条件。
	var formName = $("#formName").val();
	if(formName) {
		cmd.setParameter("MODEL_NAME", formName);
	}
	
	if(modelType) {
		cmd.setParameter("MODEL_TYPE", modelType);
	}
	cmd.execute("queryBizModels");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {sEcho:"sEcho",draw:"draw","iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 确定按钮。
function confirm() {
	var $radio = $(":radio:checked");
	if($radio.length < 1) {
		parent.UIAlert(L.getLocaleMessage("cf.chooseorcancel", "请选择一个类别，或点击取消！"));
		return false;
	}
	
	var $tr = $radio.parents("tr");
	var table = $("#formList").DataTable();
	
	var formData = table.row($tr).data();
	dialog.close(formData);
	dialog.remove();
	return false;
}

// 查询
function queryForm() {
	$("#formList").DataTable().ajax.reload();
}
</script>
</html>