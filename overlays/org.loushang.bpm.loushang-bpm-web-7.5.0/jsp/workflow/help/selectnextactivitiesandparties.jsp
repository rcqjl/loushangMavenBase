<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
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
	var assignmentId="<%=assignmentId%>";
	var isCounterSignature = "";
	
	//判断当前环节是否是结束环节
	window['activityIsEnd']=new L5.Dataset({
		id:'nextActivityIsCounterSignature',
		cmd:'org.loushang.workflow.client.common.help.cmd.TaskHelpCmd',
		method:'getActivityDefInfoWithIsEndByAssignmentId',
		recordType:L5.Record.create([
			{name:'isEnd',type:'string'}
		])
	})	

	activityIsEnd.baseParams["assignmentId"]=assignmentId;
	activityIsEnd.load(true);

	//接受后台传回的自定义数据
	var activityIsEndInfo = activityIsEnd.getCustomData("activityIsEndInfo");
	var isEnd = activityIsEndInfo.get("isEnd");

	if(isEnd=="1"){
		var dialog = parent.dialog.get(window);
		parent.$.dialog({
            type: 'alert',
            content: L.getLocaleMessage("BPM.HELP.API.003","当前环节是结束环节不能选择发送下一环节！"),
            ok: function () {
				dialog.close(); 
          	}
        });
	}else{
		isCountSignaturnAndLastOne();
	}

	//判断当前环节是否是会签环节同时是不是最后一个会签
	function isCountSignaturnAndLastOne(){
		//window['activityIsCounterSignature']= new L5.model.Dataset({proxy:new L5.CommandProxy('org.loushang.workflow.client.common.help.cmd.TaskHelpCmd','getActivityDefInfoWithIsCounterSignatureAndIsLastCounterSignatureByAssignmentId'),reader: new L5.model.JsonReader({fields:[{name:'isCounterSignature',type:'string'},{name:'isLastCounterSignature',type:'string'}]}),ds:'activityIsCounterSignature',pageSize:-1,id:'activityIsCounterSignature',remoteSort:true});
		window['activityIsCounterSignature']=new L5.Dataset({
			id:'activityIsCounterSignature',
			cmd:'org.loushang.workflow.client.common.help.cmd.TaskHelpCmd',
			method:'getActivityDefInfoWithIsCounterSignatureAndIsLastCounterSignatureByAssignmentId',
			recordType:L5.Record.create([
				{name:'isCounterSignature',type:'string'},
				{name:'isLastCounterSignature',type:'string'}
			])
		})

		activityIsCounterSignature.baseParams["assignmentId"]=assignmentId;
		activityIsCounterSignature.load(true);

		//接受后台传回的自定义数据
		var activityIsCounterSignatureInfo = activityIsCounterSignature.getCustomData("activityIsCounterSignatureInfo");
		isCounterSignature = activityIsCounterSignatureInfo.get("isCounterSignature");

		//1是并行会签，2是顺序会签
		if(isCounterSignature=="1" || isCounterSignature=="2"){
			var isLastCounterSignature = activityIsCounterSignatureInfo.get("isLastCounterSignature");
			if(isLastCounterSignature == "0"){
				//是会签环节,同时不是最后一个会签,则不能跳转
				var dialog = parent.dialog.get(window);
				parent.$.dialog({
		            type: 'alert',
		            content: L.getLocaleMessage("BPM.HELP.API.004","您不是最后一个会签者，不能选择跳转环节！"),
		            ok: function () {
						dialog.close(); 
		          	}
		        });
			}
		}
	}
	</script>
</head>
<body>
<model:datasets>
	<model:dataset id="actDataSet" cmd="org.loushang.workflow.client.common.help.cmd.TaskHelpCmd" autoLoad="true" method="selectNextActivitiesAndParties">
		<model:record >
			<model:field name="text" mapping="actDefName" type="string"></model:field>
			<model:field name="value" mapping="actDefUniqueId" type="string"></model:field>
		</model:record>
		<model:params>
			<model:param name="assignmentId" value="<%=assignmentId %>"></model:param>
		</model:params>
	</model:dataset>
</model:datasets>
	
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group ">
        <label class="col-xs-3 col-md-3 text-right extra"><spring:message code="BPM.HELP.Aspect" text="选择环节"></spring:message><span class="required">*</span></label>
        <div class="col-xs-5 col-md-5">
            <select class="form-control ue-form Validform_input" id="actDef" onchange="selectedActChanged()" >
           		 <option value=""><spring:message code="BPM.HELP.Select" text="请选择..."></spring:message></option>
            </select>
        </div>
       	<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.HELP.OK" text="确定"></spring:message></button>
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
	var data = actDataSet.data;
	var options = "";
	for(var i=0;i<data.length;i++) {
		var option = "<option value='"+ data[i].actDefUniqueId +"'>"+ data[i].actDefName +"</option>";
		options += option;	
	}
	$("#actDef").append(options);	
	
	$("#save").click(function(){
		save_click();
	});
	
	$("#undo").click(function(){
		undo_click();
	});
});

//isTableInited代表table是否初始化
var isTableInited=false;
var actDefUniqueId;
var actDefName;

function selectedActChanged(){
	
	actDefUniqueId = $("#actDef").val();
	actDefName=$("#actDef").find("option:selected").text();
	
	if(actDefUniqueId ==""){
		PAlert(L.getLocaleMessage("BPM.HELP.SelectAspectFirst","请先选择环节！"));
		return ;
	}
	
	//判断选择的跳转环节是否是会签环节
	window['nextActivityIsCounterSignature']=new L5.Dataset({
		id:'nextActivityIsCounterSignature',
		cmd:'org.loushang.workflow.client.common.help.cmd.TaskHelpCmd',
		method:'getActivityDefInfoWithIsCounterSignatureByActDefUniqueId',
		recordType:L5.Record.create([{name:'isCounterSignature',type:'string'}])
	})

	nextActivityIsCounterSignature.baseParams["actDefUniqueId"]=actDefUniqueId;
	nextActivityIsCounterSignature.load(true);

	nextActivityIsCounterSignatureInfo = nextActivityIsCounterSignature.getCustomData("nextActivityIsCounterSignatureInfo");
	nextIsCounterSignature = nextActivityIsCounterSignatureInfo.get("isCounterSignature");

	//选择的跳转环节是会签环节则不能选择会签环节参与者
	if(nextIsCounterSignature=="1" || nextIsCounterSignature=="2"){
		PAlert(L.getLocaleMessage("BPM.HELP.API.001","您选择的是会签环节，不能选择会签环节参与者！"));
		return;
	}
	
	reload();
}

function reload(){
	if(isTableInited){
		$("#formList").DataTable().ajax.reload();
	}else{
		initTable();
		isTableInited=true;
	}
}

function initTable(){
	table = $("#formList").dtable({
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

var cmd;
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	cmd = new L5.Command("org.loushang.workflow.client.common.help.cmd.TaskHelpCmd");
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
	cmd.execute("selectActivityParties");
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
		if(nextIsCounterSignature!="0"){
			PAlert(L.getLocaleMessage("BPM.HELP.API.001","您选择的是会签环节，不能选择会签环节参与者！"));
			return;
		}
		else{
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
}

function undo_click(){
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
}


</script>
</html>
