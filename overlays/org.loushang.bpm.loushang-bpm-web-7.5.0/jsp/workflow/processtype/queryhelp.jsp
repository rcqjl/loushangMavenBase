<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
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
			margin-left: 0px;
			margin-right: 0px;
		}
		.ue-btn{
			color:#ccc;
		}
		.table {
			table-layout:fixed;
		}
		.table tbody tr td li{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
</head>
<body>
<model:datasets>
	<model:dataset id="processTypeDataset" cmd="org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd">
		<model:record  fromBean="org.loushang.workflow.processtype.data.ProcessType"></model:record>
	</model:dataset>
</model:datasets>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group pull-left">									
					<input type="text" class="form-control ue-form pull-left" id="searchId" placeholder="<spring:message code="BPM.PROCESSTYPE.Workflowtypename" text="流程类型名称"/>"/>											
				</div>
				<button type="button" class="btn ue-btn" id="query" >
					<span class="fa fa-search"></span>
			    </button>
			    <div class="btn-group pull-right">
					<button id="ok" type="button" class="btn ue-btn-primary"><spring:message code="BPM.PROCESSTYPE.OK" text="确定"/></button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="10%"></th>
						<th width="45%"><spring:message code="BPM.PROCESSTYPE.Workflowtypename" text="流程类型名称"/></th>
						<th width="45%"><spring:message code="BPM.PROCESSTYPE.Workflowtypedescription" text="流程类型描述"/></th>
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
	$("#ok").click(function(){
		ok();
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
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	return "<li title='"+ data +"'>"+data+"</li>";
	 					    	  }
		 					},
		 				    {
		 					    "targets": 2,	    		       
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
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

function ok(){
	var dialog = parent.dialog.get(window);
	if($("input:checked").length==1){
		var ret = $("input:checked").attr("id");
		var retu={
			flag:true,
			data:ret
		}
		dialog.close(retu);
		dialog.remove();
		return false;
	}else{
		PAlert(L.getLocaleMessage("BPM.PROCESSTYPE.Tip17","请选择流程类型！"));
	}
}

</script>
</html>