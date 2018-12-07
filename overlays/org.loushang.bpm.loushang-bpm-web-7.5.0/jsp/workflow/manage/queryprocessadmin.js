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
	$("#suspend").click(function(){
		suspend();
	});
	$("#resume").click(function(){
		resume();
	});
	$("#abort").click(function(){
		abort();
	});
	$("#terminate").click(function(){
		terminate();
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
		                  {"data": "reqOrganName"},
		                  {"data": "currentState"},
		                  {"data": "procCreateTime"},
		                  {"data": "procDefUniqueId"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						 var element=full.processId+"@"+full.procDefUniqueId+"@"+full.procDefName;
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
		 					    "targets": 3,	    		       
		 					    "render": function(data, type, full) {
		 					    			return "<li title='"+ data +"'>"+data+"</li>";
		 					    	  }
		       				},
		       				{
		       					"targets":4,	    		       
		       					"render": function(data, type, full) {
		       					     		return returnState(data);
		       						}
		       				},
	 	                      {
	 		    		    	 targets:6,
	 		    		    	 render:function(data,type,full){
		 		    		    		var element=full.processId+"@"+procDefUniqueId+"@"+full.procDefName;
		 		    		    		var viewStatuBtn = "<a href=\"javascript:viewStatus('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.MonitorChart","监控图")+"</a>";
		 		    		    		var viewActBtn = "<a href=\"javascript:viewActivity('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.LinkListOfExample","环节实例列表")+"</a>";
		 		    		    		return viewStatuBtn+"&nbsp;&nbsp;&nbsp;"+viewActBtn;
			       						/* var suspendBtn = "<a href=\"javascript:suspend('"+element+"')\">挂起</a>";
		 		    		    		 var delBtn = "<a href=\"javascript:del('"+element+"')\">删除</a>";
			       						 var resumeBtn = "<a href=\"javascript:resume('"+element+"')\">恢复</a>";
			       						 var abortBtn = "<a href=\"javascript:abort('"+element+"')\">中断</a>";
			       						 var terminateBtn = "<a href=\"javascript:terminate('"+element+"')\">终止</a>";
			       						 return delBtn+ "&nbsp;&nbsp;&nbsp;" +viewStatuBtn+"&nbsp;&nbsp;&nbsp;" +viewActBtn+"&nbsp;&nbsp;&nbsp;"
			       						 		+suspendBtn+"&nbsp;&nbsp;&nbsp;"+resumeBtn+"&nbsp;&nbsp;&nbsp;"+abortBtn+"&nbsp;&nbsp;&nbsp;"+terminateBtn;*/
	 		    		    	 }
	 		    		      }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageQueryCmd");
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


//查看留着状态
function viewStatus(element){
	if($("input:checked").length==1 || element){
		if($("input:checked").length==1){
			element=$("input:checked").attr("id");
		}
		temp=element.split("@");
		var processId=temp[0];
		var procDefUniqueId=temp[1];
		var url=L5.webPath+"/jsp/workflow/monitor/infoprocessviewer/infoprocessview.jsp";
		url+="?processId="+processId+"&backUrl="+"jsp/workflow/manage/queryprocessadmin.jsp"+"[procDefUniqueId:"+procDefUniqueId;
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}
function viewActivity(element){
	if($("input:checked").length==1 || element){
		if($("input:checked").length==1){
			element=$("input:checked").attr("id");
		}
		temp=element.split("@");
		var processId=temp[0];
		var procDefUniqueId=temp[1];
		var procDefName=temp[2];
		var url=L5.webPath+"/jsp/workflow/manage/queryactivityadmin.jsp";
		url+="?processId="+processId;
		url+="&procDefUniqueId="+procDefUniqueId;
		url+="&procDefName="+procDefName;
		url = encodeURI(encodeURI(url));
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}

//删除
function del(element){
	var ids = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		ids.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip2","请至少选择一个流程实例进行操作！"));
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
		content: L.getLocaleMessage("BPM.MANAGE.Tip3","此操作将删除流程实例，确认要删除吗?"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageCmd");
			cmd.setParameter("processIds",ids);
			cmd.execute("directDelete");
			if(!cmd.error){
				//UIAlert("删除操作成功！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip4","删除成功！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});	
}

//挂起
function suspend(element){
	var suspends = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		suspends.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip2","请至少选择一个流程实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var processId=temp[0];
			suspends.push(processId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip5","确认要挂起流程吗？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageCmd");
			cmd.setParameter("suspends",suspends);
			cmd.execute("suspend");
			if(!cmd.error){
				//UIAlert("挂起操作成功！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip6","挂起操作成功！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});	
}

//恢复
function resume(element){
	var resume = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		resume.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip2","请至少选择一个流程实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var processId=temp[0];
			resume.push(processId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip7","确认要恢复挂起环节？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageCmd");
			cmd.setParameter("resumes",resume);
			cmd.execute("resume");
			if(!cmd.error){
				//UIAlert("恢复操作成功！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip8","恢复操作成功！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});	
}

//中断
function abort(element){
	var abort = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		abort.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip2","请至少选择一个流程实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var processId=temp[0];
			abort.push(processId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip9","该操作将结束流程实例，确认执行此操作吗？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageCmd");
			cmd.setParameter("aborts",abort);
			cmd.execute("abort");
			if(!cmd.error){
				//UIAlert("中断操作成功！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip10","中断操作成功！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});	
}

//终止
function terminate(element){
	var terminate = [];
	if(element) {
		var temp=element.split("@");
		var processId=temp[0];
		terminate.push(processId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip2","请至少选择一个流程实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var processId=temp[0];
			terminate.push(processId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip11","此操作将结束流程实例，确认要终止吗？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.process.cmd.ProcessManageCmd");
			cmd.setParameter("terminates",terminate);
			cmd.execute("terminate");
			if(!cmd.error){
				//UIAlert("终止操作成功！");
				sticky(L.getLocaleMessage("BPM.MANAGE.Tip12","终止操作成功！"));
			}else{
				//UIAlert(cmd.error.msg);
				sticky(cmd.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});	
}


function returnState(state){
	if(state=="open.running"){
		text=L.getLocaleMessage("BPM.MANAGE.Run","运行");
	}
	if(state=="open.not_running.suspended"){
		text=L.getLocaleMessage("BPM.MANAGE.Hang","挂起");
	}
	return text;
}
