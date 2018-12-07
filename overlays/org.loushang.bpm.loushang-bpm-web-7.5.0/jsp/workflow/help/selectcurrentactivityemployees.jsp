<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@page import="java.util.List"%>
<%
  String assignmentId=(String)request.getParameter("assignmentId");
  if(assignmentId==null||"".equals(assignmentId))
  {
	  assignmentId=(String)request.getAttribute("assignmentId"); 
  }	  
  if(assignmentId==null)
	  assignmentId="";
%>
<html>
<head>
	<title><spring:message code="BPM.HELP.API.002" text="选择跳转环节以及参与者"></spring:message></title>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.extra{
			margin-top:3px;
		}
		.required {
			top: 0;
		}
	</style>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,bpm/util.js"></l:script>
	<script type="text/javascript">
	//获取委派Id
	assignmentId="<%=assignmentId%>";
	
	//获取当前环节
	window['activityDef']=new L5.Dataset({
		id:'activityDef',
		cmd:'org.loushang.workflow.client.common.help.cmd.TaskHelpCmd',
		method:'getCurrentActivityDefNameAndIdByAssignmentId',
		recordType:L5.Record.create([
              	{name:'value',type:'string',mapping:'actDefUniqueId'},
              	{name:'text',type:'string',mapping:'actDefName'},
              	{name:'actDefId',type:'string'},
              	{name:'actType',type:'string'}
    	])
	})	

	activityDef.baseParams["assignmentId"]=assignmentId;
	activityDef.load(true);

	//接受后台传回的自定义数据
	var activityDefInfo = activityDef.getCustomData("activityDefInfo");
	actDefUniqueId = activityDefInfo.get("actDefUniqueId");
	actDefName = activityDefInfo.get("actDefName"); 
	
	//var data = actDataSet.getCustomData("activityDefInfo");
	</script>
</head>
<body>

<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group ">
        <label class="col-xs-3 col-md-3 text-right extra"><spring:message code="BPM.HELP.CurrentStep" text="当前环节"></spring:message>
        <span class="required">*</span></label>
        <div class="col-xs-5 col-md-5">
	        <input class="form-control ue-form" type="text" id="actDefName">
        </div>
       	<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.HELP.OK" text="确定"></spring:message>	</button>
		<button id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.HELP.Cancel" text="取消"></spring:message>	</button>
    </div>  
    
	<table id="formList" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th width="10%"><input type="checkbox" id="selectAll"/></th>
				<th width="30%"><spring:message code="BPM.HELP.Participant" text="参与者"></spring:message></th>
				<th width="30%"><spring:message code="BPM.HELP.Departments" text="部门"></spring:message></th>
				<th width="30%"><spring:message code="BPM.HELP.Units" text="单位"></spring:message></th>
			</tr>
		</thead>
	</table>
</form>	
</body>
<script type="text/javascript">
$(document).ready(function(){
	$("#actDefName").val(actDefName);
	
	initTable();
	
	$("#save").click(function(){
		save_click();
	});
	
	$("#undo").click(function(){
		undo_click();
	});
});

function initTable(){
	var table = $("#formList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "organId"},
		                  {"data": "organName"},
		                  {"data": "departmentOrganName"},
		                  {"data": "enterpriseOrganName"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						  var element =full.organId +"@"+full.organName;
	       					  	 	  return '<input type="checkbox"  id="' + element + '" name="checkbox" />';
		       					}
		       				},
		       				{
		       					"targets":2,	    		       
		       					"render": function(data, type, full) {
		       						if(data){return data;} else{return "";}
		       					}
		       				},
		       				{
		       					"targets":3,	    		       
		       					"render": function(data, type, full) {
		       						if(data){return data;} else{return "";}
		       					}
		       				}
		       	      	]
		});
	return table;
} 

function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.client.common.help.cmd.TaskHelpCmd");
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
	cmd.setParameter("actDefUniqueId", actDefUniqueId);
	cmd.setParameter("assignmentId", assignmentId);
	cmd.execute("selectActivityEmployees");
	if(cmd.error){
		PAlert(cmd.error.msg);
		return false;
	}
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

function save_click(){
	if($("input[name='checkbox']:checked").length<1){
		PAlert(L.getLocaleMessage("BPM.HELP.SelectParticipantsFirst","请选择参与者！"));
		return;
	}else{
		var organId="";
		var organName="";
		$("input[name='checkbox']:checked").each(function(){
			var id=$(this).attr("id");
			var temp=id.split("@");
			organId+=temp[0];
			organId+=",";
			organName+=temp[1];
			organName+=",";
		})
		
		organId=organId.substring(0,organId.length-1);
		organName=organName.substring(0,organName.length-1);
		
		var returnValue={
				organId: organId,
				organName: organName,
				actDefUniqueId: actDefUniqueId,
				flag:true
		}
		
		var dialog=parent.dialog.get(window);
		dialog.close(returnValue);
	}
}

function undo_click(){
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
}

</script>
</html>
