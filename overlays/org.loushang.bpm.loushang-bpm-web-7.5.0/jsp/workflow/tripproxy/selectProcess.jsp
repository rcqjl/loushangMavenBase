<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@ page import="org.loushang.workflow.util.bsp.WfStru"%>
<%
WfStru rootStru = BspUtil.getInstance().getTopMember("00"); 
String rootStruId = rootStru.getStruId();
%>
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
		.margin_bottom{
			margin-bottom:6px;
		}
		.input-group {
			float: left;
			width: 215px;
		}
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
</head>
<body>
<model:datasets>
	<model:dataset id="procDefDataset" cmd="org.loushang.workflow.processdefinition.cmd.ProcessDefinitionQueryCmd" method="query">
		<model:record fromBean="org.loushang.workflow.processdefinition.data.ProcessDef"></model:record>
	</model:dataset>
</model:datasets>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
	    		<div class="input-group">
	       		 	<input type="text" class="form-control ue-form" id="searchId" placeholder="<spring:message code="BPM.TRIPPROXY.ProcessName" text="流程名称"></spring:message>"/>
					<div id="query" class="input-group-addon ue-form-btn">
						<span class="fa fa-search"></span>
					</div>
				</div>
				<div class="btn-group pull-right margin_bottom">	
				    <button id="ok" type="button" class="btn ue-btn">
						<span class="fa fa-save"></span><spring:message code="BPM.INFOPROCESSMODEL.Confirm" text="确定"></spring:message>
					</button>
				    <button id="back" type="button" class="btn ue-btn">
						<span class="fa fa-undo"></span><spring:message code="BPM.JSPFORM.Return" text="返回"></spring:message> 
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="10%"><input type="checkbox" id="selectAll"  /></th>
						<th width="90%"><spring:message code="BPM.TRIPPROXY.ProcessName" text="流程名称"></spring:message></th>
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
		                  {"data": "id"},
		                  {"data": "name"}
		                ],
   	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
 		       					"render": function(data, type, full) {
 		       						var element=full.procDefId+"@"+full.name;
	       					     	return '<input type="checkbox"  id="' + element + '" name="checkbox"/>';
	       					  
	       					}
	       				}
                       ]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.processdefinition.cmd.ProcessDefinitionQueryCmd");
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
		cmd.setParameter("PROC_DEF_NAME",$("#searchId").val());
	}
	cmd.execute("query");
	var data = cmd.getData();
	if(!data){
		data = {};
	}
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

$("#back").click(function(){
	var dialog=parent.dialog.get(window);
	dialog.close();
}); 

function ok(){
	if($("input[name='checkbox']:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.TRIPPROXY.Tip10","请选择流程！"));
		return;
	}else{
		var procDefIds="";
		var names="";
		$("input[name='checkbox']:checked").each(function(){
			var id=$(this).attr("id");
			var temp=id.split("@");
			procDefIds+=temp[0];
			procDefIds+=",";
			names+=temp[1];
			names+=",";
		})
		
		//判断流程是否已设置
		var command =new L5.Command("org.loushang.workflow.tripproxy.cmd.TripProxyProcDefCmd");
		command.setParameter("procDefIds",procDefIds);
		command.afterExecute = function() {
			if (command.error) {
				UIAlert(command.error.msg);
				return false;
			}
	    }
		command.execute("verify");
		
		var satisfy = command.getReturn("satisfy");
		if(satisfy!=null && satisfy!="" && satisfy!="undefined"){
			var arr=new Array();
			arr[0]=satisfy;
			UIAlert(L.getLocaleMessage("BPM.TRIPPROXY.Process","流程")+arr[0]+L.getLocaleMessage("BPM.TRIPPROXY.Tip11","已进行了委托设置"));
			return false;
		}
		
		procDefIds=procDefIds.substring(0,procDefIds.length-1);
		names=names.substring(0,names.length-1);
		returnValue={
				procDefIds:	procDefIds,
				procDefNames:names,
				flag:true
		}
		var dialog=parent.dialog.get(window);
		dialog.close(returnValue);
	}
}

</script>
</html>