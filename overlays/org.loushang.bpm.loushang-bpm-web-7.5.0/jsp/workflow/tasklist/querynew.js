$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#publish").click(function(){
		dealNewTask();
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
		                  {"data": "procDefUniqueId"},
		                  {"data": "procDefName"},
		                  {"data": "procCreateTime"}
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
		       						var id = full.procDefUniqueId;
		       						return "<a title='" + data + "' href=\"javascript:dealNewTask('"+ id +"')\">"+data+"</a>";
		       					}
	                       }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.tasklist.taskinfo.cmd.NewTaskQueryCmd");
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
	
	if($("#queryProcDefName").val()){
		cmd.setParameter("procDefName",$("#queryProcDefName").val());
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

//处理新建任务
function dealNewTask(procDefUniqueId)
{	
	if($("input:checked").length==1 || procDefUniqueId){
		if($("input:checked").length==1){
			procDefUniqueId=$("input:checked").attr("id");
		}
		var url=L5.webPath+"/command/dispatcher/org.loushang.workflow.tasklist.forward.TaskListDispatcherCmd/newTaskForward";
		var query="?procDefUniqueId="+procDefUniqueId;
		location.href=url+query;
	}else{
		UIAlert(L.getLocaleMessage("BPM.TASKLIST.Tip1","请选择一条记录进行处理！"));
	}	
}
//查看流程状态图
function showState(procDefUniqueId){
	if($("input:checked").length==1 || procDefUniqueId){
		if($("input:checked").length==1){
			procDefUniqueId=$("input:checked").attr("id");
		}
		var url=L5.webPath+"/jsp/workflow/monitor/infoprocessviewer/infoprocessview.jsp";
		url+="?backUrl="+"jsp/workflow/tasklist/querynew.jsp"+"&procDefUniqueId="+procDefUniqueId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.TASKLIST.Tip1","请选择一条记录进行处理！"));
	}
}
