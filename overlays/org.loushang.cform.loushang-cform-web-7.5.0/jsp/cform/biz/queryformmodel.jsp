<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.fm" text="表单表"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.container {
				width: 100%;
				margin-left: 0px;
				margin-right: 0px;
		}
		.form-inline .input-group{
			width: 200px;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,datatables.js,ui.js,l5-adapter.js"/>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">	
			<div class="input-group">									
				<input type="text" class="form-control ue-form" id="modelName" placeholder="<s:message code="cf.alias" text="别名"/>"/>											
				<div class="input-group-addon ue-form-btn" id="query" >
					<span class="fa fa-search"></span>
			    </div>
			</div>
		</form>
		<table id="formModelList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="35%"><s:message code="cf.tn" text="表名"/></th>
					<th width="30%"><s:message code="cf.alias" text="别名"/></th>
					<th width="30%"><s:message code="cf.masterform" text="所属主表"/></th>
				</tr>
			</thead>
		</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	// 初始化表格。
	initTable();
	
	// 查询。
	$("#query").click(function(){
		queryModel();
	});
	
	// 查询事件回车键绑定。
	$("#modelName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryModel();
		} 
	});
});

// 初始化表格。
function initTable(){
	$("#formModelList").dtable({
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          	{data: "modelId"},
		          	{data: "modelName"},
		          	{data: "parentModelName"}
		         ],
		columnDefs: [
		            	{
		            		targets: 0,
					    	data: "formId",
					    	render: function(data, type, full){
					    		return "<a href=\"javascript:selectItem('"+data+"')\">"+data+"</a>";
					    	}
		            	} 
		            ]
	});
}

// 加载数据。
function retrieveData(sSource, aoData, fnCallback){
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
	
	// 查询表单表。
	cmd.setParameter("MODEL_TYPE", "0");
	
	var modelName = $("#modelName").val();
	if(modelName){
		cmd.setParameter("MODEL_NAME",modelName);
	}
	
	cmd.execute("queryBizModels");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询模型。
function queryModel() {
	$("#formModelList").DataTable().ajax.reload();
}

// 查询模型项。
function selectItem(modelId) {
	window.location.href = "queryformmodelitem.jsp?modelId=" + modelId;
}
</script>
</html>