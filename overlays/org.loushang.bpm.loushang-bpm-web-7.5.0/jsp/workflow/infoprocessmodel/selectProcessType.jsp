<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/prettify.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: -15px;
			margin-right: 0px;
		}
		.table {
			table-layout:fixed;
		}
		.table tr td li{
			overflow-x: hidden;
			text-overflow: ellipsis;
		    white-space: nowrap;
		}
		.float_left{
			float:left;
			margin-right:10px;
			margin-top:6px;
		}
		.input-group {
			float: left;
			width: 215px;
			margin-top:6px;
			margin-bottom:6px;
		}
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js"></l:script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
		    	<div class="input-group">
	       			<input type="text" class="form-control ue-form" id="searchId" placeholder="<spring:message code="BPM.INFOPROCESSMODEL.WorkflowTypeName" text="流程类型名称"/>"/>
					<div id="query" class="input-group-addon ue-form-btn">
						<span class="fa fa-search"></span>
					</div>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="6%"></th>
						<th width="47%"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowTypeName" text="流程类型名称"/></th>
						<th width="47%"><spring:message code="BPM.INFOPROCESSMODEL.Workflowtypedescription" text="流程类型描述"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$(document).on("click","#formList tr td:not(:first-child)",function(){
		var obj = $(this).parent().find("td:first").find("input");
		obj.prop("checked",!obj.is(":checked"));
	});
});
//初始化表格
function initTable(){
	var table = $("#formList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "typeId"},
		                  {"data": "typeName"},
		                  {"data": "description"}
		                ],
   	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
 		       					"render": function(data, type, full) {
	       					     	return '<input type="radio"  id="' + data + '" name="checkradio"/>';
	       						}
	                       },
	       					{
		       					"targets":1,	    		       
 		       					"render": function(data, type, full) {
 		       						return "<li title='"+ data +"'>"+data+"</li>";
 		       					}
	       					  
	       					},
	       					{
		       					"targets":2,	    		       
 		       					"render": function(data, type, full) {
 		       						return "<li title='"+ data +"'>"+data+"</li>";
 		       					}
	       					}
                       ]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd");
	for(var i = 0; i<aoData.length; i++){
		  if(aoData[i].name == "draw"){
			  draw = aoData[i].value;
		  }
		  if(aoData[i].name == "start"){
			  cmd.setParameter("start", aoData[i].value);
		  }
		  if(aoData[i].name == "length"){
			  cmd.setParameter("limit", aoData[i].value);
		  }
	}
	if($("#searchId").val()){
		cmd.setParameter("TYPE_NAME@like",$("#searchId").val());
	}
	cmd.execute();
	var data = cmd.getData();
	if(!data){
		data = {};
	}
	var total = cmd.returns.total;
	if(!total){
		total = 0;
	}
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

function returnPT(){
	var PT_id=$("input[name='checkradio']:checked").attr("id");
	if($("input[name='checkradio']:checked").length>0){
		return PT_id;
	}
}
</script>
</html>