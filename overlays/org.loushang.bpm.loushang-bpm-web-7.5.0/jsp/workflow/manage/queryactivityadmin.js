$(document).ready(function(){
	initTable();
	$("#back").click(function(){
		back();
	});
	$("#viewAssignment").click(function(){
		viewAssignment();
	});
	$("#start").click(function(){
		start();
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
		                  {"data": "activityId"},
		                  {"data": "actDefName"},
		                  {"data": "procDefName"},
		                  {"data": "state"},
		                  {"data": "createTime"},
		                  {"data": "currentStateTime"},
		                  {"data": "activityId"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						 var element=full.activityId+"@"+full.actDefName+"@"+full.state;
		       					     return '<input type="checkbox"  id="' + element + '" name="checkbox"/>';
		       					  
		       					}
	                        },
		       				{
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	return "<li title='"+ data +"'>"+data+"</li>";
		 					    	  }
		 					},
	                        {
		       				 	"targets":2,	    		       
		       					"render": function(data, type, full) {
		       					     return  "<li title='"+ decodeURI(procDefName) +"'>"+decodeURI(procDefName)+"</li>";  
		       					  
		       					}
	                       },
	                       {
		       					"targets":3,	    		       
		       					"render": function(data, type, full) {
		       					     return returnStatus(data);
		       					  
		       					}
	                       },
	                       {
		       					"targets":6,	    		       
		       					"render": function(data, type, full) {
		       						 var element=full.activityId+"@"+full.actDefName+"@"+full.state;
		       						 var viewBtn = "<a href=\"javascript:viewAssignment('"+element+"')\">"+L.getLocaleMessage("BPM.MANAGE.DelegateList","委派列表")+"</a>";
		       						 return viewBtn;
		       					/*	 var suspendBtn = "<a href=\"javascript:suspend('"+element+"')\">挂起</a>";
		       						 var resumeBtn = "<a href=\"javascript:resume('"+element+"')\">恢复</a>";
		       						 var abortBtn = "<a href=\"javascript:abort('"+element+"')\">中断</a>";
		       						 var terminateBtn = "<a href=\"javascript:terminate('"+element+"')\">终止</a>";
		       						 return viewBtn+"&nbsp;&nbsp;&nbsp;"+suspendBtn+"&nbsp;&nbsp;&nbsp;"+resumeBtn
		       						        +"&nbsp;&nbsp;&nbsp;"+abortBtn+"&nbsp;&nbsp;&nbsp;"+terminateBtn;*/
		       					}
	                       }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageQueryCmd");
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


function returnStatus(state){
	var text="";
	if(state=="open.running"){
		text=L.getLocaleMessage("BPM.MANAGE.Run","运行");
	}
	if(state=="open.not_running.suspended"){
		text=L.getLocaleMessage("BPM.MANAGE.Hang","挂起");
	}
	if(state=="closed.completed"){
		text=L.getLocaleMessage("BPM.MANAGE.End","结束");
	}
	if(state=="closed.aborted"){
		text=L.getLocaleMessage("BPM.MANAGE.Interrupt","中断");
	}
	if(state=="closed.terminated"){
		text=L.getLocaleMessage("BPM.MANAGE.Termination","终止");
	}
	if(state=="open.not_running.not_started"){
		text=L.getLocaleMessage("BPM.MANAGE.NotStarted","未开始");
	}
	return text;
/*	stateNameMap["open.running"]=getLocaleMsg("UI.BPM.MANAGE.055", "运行");
	stateNameMap["open.not_running.suspended"]=getLocaleMsg("UI.BPM.MANAGE.009", "挂起");
	stateNameMap["closed.completed"]=getLocaleMsg("UI.BPM.MANAGE.056", "结束");
	stateNameMap["closed.aborted"]=getLocaleMsg("UI.BPM.MANAGE.011", "中断");
	stateNameMap["closed.terminated"]=getLocaleMsg("UI.BPM.MANAGE.012", "终止");
	stateNameMap["open.not_running.not_started"]=getLocaleMsg("UI.BPM.MANAGE.057", "未开始");*/
}
function viewAssignment(element){
	if($("input:checked").length==1 || element){
		if($("input:checked").length==1){
			element=$("input:checked").attr("id");
		}
		var temp=element.split("@");
		var activityId=temp[0];
		var actDefName=temp[1];
		var state=temp[2];
		var url=L5.webPath+"/jsp/workflow/manage/queryassignmentadmin.jsp";
		url+="?activityId="+activityId+"&processId="+processId+"&procDefUniqueId="+procDefUniqueId;
		url+="&actDefName="+actDefName+"&state="+state+"&procDefName="+procDefName;//decodeURI(proDefName);
		url = encodeURI(encodeURI(url));
		location.href=url;
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}
}
function back(){
	location.href = "queryprocessadmin.jsp?procDefUniqueId="+procDefUniqueId;
}
//启动环节
function start(){
	$.dialog({
		type: "iframe",
		url: "activitystarthelper.jsp?processId="+processId+"&procDefUniqueId="+procDefUniqueId,
        title: L.getLocaleMessage("BPM.MANAGE.StartLink",'启动环节'),
        width: 500,
        height: 180,
        onclose: function(){
			if(this.returnValue != ""){
				var values=(this.returnValue);
				var organs=values.organs.split(";");
			    var organsString=organs[0]+";"+organs[1];
				var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageCmd");
				cmd.setParameter("processId",processId);
				cmd.setParameter("actDefUniqueId",values.actDefUniqueId);
				cmd.setParameter("organs",organsString);
				cmd.execute("start");
				if(!cmd.error){
					//UIAlert("启动环节完成");
					sticky(L.getLocaleMessage("BPM.MANAGE.Tip27","启动环节完成"));
				}else{
//					UIAlert(cmd.error.msg);
					sticky(cmd.error.msg, 'error', 'center');
				}
				$("#formList").DataTable().ajax.reload();
			}
        }
	});
}

//挂起
function suspend(element){
	var suspend = [];
	if(element) {
		var temp=element.split("@");
		var activityId=temp[0];
		suspend.push(activityId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip28","请至少选择一个环节实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var activityId=temp[0];
			suspend.push(activityId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip29","确认要挂起环节实例？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageCmd");
			cmd.setParameter("suspends",suspend);
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
		var activityId=temp[0];
		resume.push(activityId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip28","请至少选择一个环节实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var activityId=temp[0];
			resume.push(activityId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip30","确认要恢复挂起环节？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageCmd");
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
		var activityId=temp[0];
		abort.push(activityId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip28","请至少选择一个环节实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var activityId=temp[0];
			abort.push(activityId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip31","确认要中断环节实例？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageCmd");
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
		var activityId=temp[0];
		terminate.push(activityId);
	}else{
		if($("input[name='checkbox']:checked").length <1) {
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip28","请至少选择一个环节实例进行操作！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			element = $(this).attr("id");
			var temp=element.split("@");
			var activityId=temp[0];
			terminate.push(activityId);
		});
	}
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.MANAGE.Tip32","确认要终止环节实例？"),
		autofocus: true,
		ok: function() {
			var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageCmd");
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

