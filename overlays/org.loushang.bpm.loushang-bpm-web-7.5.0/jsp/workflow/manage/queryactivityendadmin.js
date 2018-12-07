$(document).ready(function(){
	initTable();
	$("#back").click(function(){
		back();
	});
	$("#viewAssignment").click(function(){
		viewAssignment();
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
		                  {"data": "activityId"},
		                  {"data": "actDefName"},
		                  {"data": "actCreateTime"},
		                  {"data": "actEndTime"},
		                  {"data": "activityId"}
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
		       					"targets":4,	    		       
		       					"render": function(data, type, full) {
		       						 var viewBtn = "<a href=\"javascript:viewAssignment('"+data+"')\">"+L.getLocaleMessage("BPM.MANAGE.DelegateArchiveList","委派归档列表")+"</a>";
		       						 return viewBtn;
		       					}
	                       }
	                       
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.activityend.cmd.ActivityEndManageQueryCmd");
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
	cmd.setParameter("processId",processId);
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


function viewAssignment(activityId){
	if($("input:checked").length==1 || activityId){
		if($("input:checked").length==1){
			activityId=$("input:checked").attr("id");
		}
		var url=L5.webPath+"/jsp/workflow/manage/queryassignmentendadmin.jsp";
		url+="?activityId="+activityId+"&processId="+processId+"&procDefUniqueId="+procDefUniqueId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}
function back(){
	location.href = "queryprocessend.jsp?procDefUniqueId="+procDefUniqueId;
}

