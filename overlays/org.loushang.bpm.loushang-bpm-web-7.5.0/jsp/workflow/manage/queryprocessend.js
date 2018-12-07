$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#back").click(function(){
		location.href = "queryprocessdefadmin.jsp";
	});
	$("#viewStatus").click(function(){
		viewStatus();
	});
	$("#viewActivity").click(function(){
		viewActivity();
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
		                  {"data": "processId"},
		                  {"data": "subject"},
		                  {"data": "procDefName"},
		                  {"data": "procCreateTime"},
		                  {"data": "procEndTime"},
		                  {"data": "processId"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						var element=full.processId+"@"+procDefUniqueId;
		       					     return '<input type="checkbox"  id="' + element + '" name="checkbox"/>';
		       					  
		       					}
		       				},
		       				{
		                    	   "targets": 1,	    		       
			 					    "render": function(data, type, full) {
			 					    	if(data){
			 					    		return "<li title='"+ data +"'>"+data+"</li>";
			 					    	}else{
			 					    		return "";
			 					    	}
						    	   }
		       				},
		       				{
		                    	   "targets": 2,	    		       
			 					    "render": function(data, type, full) {
			 					    	return "<li title='"+ data +"'>"+data+"</li>";
						    	   }
		       				},
		       				{
	 		    		    	 targets:5,
	 		    		    	 render:function(data,type,full){
	 		    		    		var element=full.processId+"@"+full.procDefUniqueId;
	 		    		    		var delBtn = "<a href=\"javascript:del('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.Delete","删除")+"</a>";
	 		    		    		var viewStatuBtn = "<a href=\"javascript:viewStatus('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.MonitorChart","监控图")+"</a>";
	 		    		    		var viewActBtn = "<a href=\"javascript:viewActivity('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.LinkInstanceArchiveList","环节实例归档列表")+"</a>";
	 		    		    		//return delBtn+ "&nbsp;&nbsp;&nbsp;" +viewStatuBtn+"&nbsp;&nbsp;&nbsp;" +viewActBtn;
	 		    		    		return viewStatuBtn+"&nbsp;&nbsp;&nbsp;" +viewActBtn;
	 		    		    	 }
		       				}
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.processend.cmd.ProcessEndManageQueryCmd");
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
	
	cmd.setParameter("procDefUniqueId",procDefUniqueId);
	if($("#searchId").val()){
		cmd.setParameter("subjectName@like",$("#searchId").val());
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
	if(!total){
		total = 0;
	}
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}


function viewActivity(element){
	if($("input[name='checkbox']:checked").length==1 || element){
		if($("input[name='checkbox']:checked").length==1){
			element=$("input[name='checkbox']:checked").attr("id");
		}
		temp=element.split("@");
		var processId=temp[0];
		var procDefUniqueId=temp[1];
		var url=L5.webPath+"/jsp/workflow/manage/queryactivityendadmin.jsp";
		url+="?processId="+processId;
		url+="&procDefUniqueId="+procDefUniqueId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}
function viewStatus(element){
	if($("input[name='checkbox']:checked").length==1 || element){
		if($("input[name='checkbox']:checked").length==1){
			element=$("input[name='checkbox']:checked").attr("id");
		}
		temp=element.split("@");
		var processId=temp[0];
		var procDefUniqueId=temp[1];
		var url=L5.webPath+"/jsp/workflow/monitor/infoprocessviewer/infoprocessview.jsp";
		url+="?processId="+processId+"&backUrl="+"jsp/workflow/manage/queryprocessend.jsp"+"[procDefUniqueId:"+procDefUniqueId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}

function del(element){
	var ids = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		ids.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip13","请至少选择一个流程归档实例！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var processId=temp[0];
			ids.push(processId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip14","确定要删除选中的记录吗?"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.processend.cmd.ProcessEndManageCmd");
			cmd.setParameter("ids",ids);
			cmd.execute("delete");
			if(!cmd.error){
				//UIAlert("删除操作完成！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip4","删除操作完成！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();	
		},
		cancel: function(){}
	});	
}
