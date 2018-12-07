$(document).ready(function(){
	initTable();
	$("#back").click(function(){
		back();
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
		                  {"data": "actualOrganName"},
		                  {"data": "assCreateTime"},
		                  {"data": "assEndTime"}
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
		       				}
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.assignmentend.cmd.AssignmentEndManageQueryCmd");
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
	cmd.setParameter("activityId",activityId);
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
	if(!total){
		total = 0;
	}
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

function back(){
	location.href = "queryactivityendadmin.jsp?processId="+processId+"&procDefUniqueId="+procDefUniqueId;
}
