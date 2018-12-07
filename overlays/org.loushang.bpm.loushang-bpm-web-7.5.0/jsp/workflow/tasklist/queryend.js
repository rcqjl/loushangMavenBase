$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#view").click(function(){
		dealYiBanTask();
	});
	$("#checkMonitorChart").click(function(){
		showState();
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
		                  {"data": "assignmentId"},
		                  {"data": "subject"},
		                  {"data": "procDefName"},
		                  {"data": "actDefName"},
		                  {"data": "procCreateTime"},
		                  {"data": "endTime"},
		                  {"data": "procEndTime"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     return '<input type="radio"  id="' + data + '" name="checkradio" />';
		       					}
	                       },
	                       {
		       					"targets":1,	    		       
		       					"render": function(data, type, full) {
		       						var id = full.assignmentId;
		       						return "<a title='" + data + "' href=\"javascript:dealYiBanTask('"+ id +"')\">"+data+"</a>";
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
	var cmd = new L5.Command("org.loushang.workflow.tasklist.taskinfo.cmd.EndTaskQueryCmd");
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
	
	if(procTypeId!=""){
		cmd.setParameter("procTypeId",procTypeId);
	}
	if(exceptProcTypeIds!=""){
		cmd.setParameter("exceptProcTypeIds",exceptProcTypeIds);
	}
	
	if($("#subjectName").val()){
		cmd.setParameter("subject",$("#subjectName").val());
	}
	
	cmd.execute();
	if(cmd.error){
		UIAlert(cmd.error.msg);
		return false;
	}
	var data = cmd.getData();
	if(!data){
		data = {};
	}
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}
function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true,
	});
}
//处理新建任务
function dealYiBanTask(assignmentId)
{	
	if($("input:checked").length==1 || assignmentId){
		if($("input:checked").length==1){
			assignmentId=$("input:checked").attr("id");
		}
		var url=L5.webPath+"/command/dispatcher/org.loushang.workflow.tasklist.forward.TaskListDispatcherCmd/endTaskForward";
		var query="?assignmentId="+assignmentId;
		location.href=url+query;
	}else{
		UIAlert(L.getLocaleMessage("BPM.TASKLIST.Tip1","请选择一条记录进行处理！"));
	}	
}

//查看流程状态图
function showState(assignmentId){
	if($("input:checked").length==1 || assignmentId){
		assignmentId=$("input:checked").attr("id");
		var url=L5.webPath+"/jsp/workflow/monitor/infoprocessviewer/infoprocessview.jsp";
		url+="?backUrl="+"jsp/workflow/tasklist/queryend.jsp"+"&assignmentId="+assignmentId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.TASKLIST.Tip1","请选择一条记录进行处理！"));
	}
}
