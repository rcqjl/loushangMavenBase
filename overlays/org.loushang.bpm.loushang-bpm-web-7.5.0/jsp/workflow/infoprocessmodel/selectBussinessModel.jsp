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
			    <div class=" float_left">
		            <select class="form-control ue-form" id="isHistory" >
		                <option value=""><spring:message code="BPM.INFOPROCESSMODEL.All" text="全部"/></option>
		                <option value="0"><spring:message code="BPM.INFOPROCESSMODEL.NewVersion" text="新版本"/></option>
		                <option value="1"><spring:message code="BPM.INFOPROCESSMODEL.OldVersion" text="旧版本"/></option>
		            </select>
		        </div>
			    <div class="input-group">
	       			<input type="text" class="form-control ue-form" id="bussinessModel" placeholder="<spring:message code="BPM.INFOPROCESSMODEL.WorkflowName" text="流程名称"/>"/>
					<div id="query" class="input-group-addon ue-form-btn">
						<span class="fa fa-search"></span>
					</div>
				</div>
			</form>
			<table id="formList1" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="8%"></th>
						<th width="50%"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowName" text="流程名称"/></th>
						<th width="25%"><spring:message code="BPM.INFOPROCESSMODEL.CreateTime" text="创建时间"/></th>
						<th width="17%"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowVersion" text="流程版本"/></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList1").DataTable().ajax.reload();
	});
	$(document).on("click","#formList1 tr td:not(:first-child)",function(){
		var obj = $(this).parent().find("td:first").find("input");
		obj.prop("checked",!obj.is(":checked"));
	});
});
//初始化表格
function initTable(){
	var table = $("#formList1").dtable({
			"autoWidth": false,
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "id"},
		                  {"data": "procDefName"},
		                  {"data": "createTime"},
		                  {"data": "inHistory"}
		               ],
   	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						 var element=full.id+"@"+full.templateType;
		       					     return '<input type="radio"  id="' + element + '" name="checkradio"/>';
		       					  
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
	       					  
	       					},
	                       {
		       					"targets":3,	    		       
		       					"render": function(data, type, full) {
		       					     return getIsHistory(data);
		       					}
		       				}
	                       ]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd");
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
	if($("#bussinessModel").val()||$("#isHistory").val()){
		cmd.setParameter("WF_BUSINESS_PROCESS_DEF_MODEL.PROC_DEF_NAME@like",$("#bussinessModel").val());// 设置参数值,用@分开的两段：前面是参数名,后面是比较符号
		cmd.setParameter("WF_BUSINESS_PROCESS_DEF_MODEL.IS_HISTORY@like",$("#isHistory").val());
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
//返回id和template
function returnBM(){
	var BM_id=$("input[name='checkradio']:checked").attr("id");
	return BM_id;
}

function getIsHistory(data){
	 var text="";
		 if(data==0){
			 text=L.getLocaleMessage("BPM.INFOPROCESSMODEL.NewVersion","新版本");
		 }else if (data==1){
			text=L.getLocaleMessage("BPM.INFOPROCESSMODEL.OldVersion","旧版本");
		 }
	return text;
}
//是否显示
function getPartVisibleEnum(Id) {
	for(index in partVisibleEnum) {
		if(partVisibleEnum[index].value == Id) {
			return partVisibleEnum[index].text;
		}
	}
}
</script>
</html>