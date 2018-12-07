$(document).ready(function(){
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#queryAct").click(function(){
		queryAct();
	});
	$("#queryEnd").click(function(){
		queryEnd();
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
		                  {"data": "processCount"},
		                  {"data": "processEndCount"},
		                  {"data": "procCreateTime"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						var element =full.processCount+"@"+ full.processEndCount +"@"+full.procDefName+"@"+full.procDefUniqueId;
		       						return '<input type="checkbox"  id="' + element + '" name="checkbox" />';
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
	 					    	  targets: 2,	    		       
	 					    	  render: function(data, type, full) {
	 					    		  if(data!=0){
	 					    			  var id = full.procDefUniqueId;
	 					    		  	  return "<a href=\"queryprocessadmin.jsp?procDefUniqueId="+id+"\">" + data + "</a>";
	 					    		  } else {
	 					    			  return data;
	 					    		  }
	 					    	  }
	 					      },
	 					      {
	 					    	  targets: 3,	    		       
	 					    	  render: function(data, type, full) {
	 					    		  if(data!=0){
	 					    			  var id = full.procDefUniqueId;
	 					    		  	  return "<a href=\"queryprocessend.jsp?procDefUniqueId="+id+"\">" + data + "</a>";
	 					    		  } else {
	 					    			  return data;
	 					    		  }
	 					    	  }
	 					      }/*,
	 	                      {
	 		    		    	 targets:5,
	 		    		    	 render:function(data,type,full){
	 		    		    		var element =full.processCount+"@"+ full.processEndCount +"@"+full.procDefName+"@"+full.procDefUniqueId;
	 		    		    		var delBtn = "<a href=\"javascript:del('"+element+"')\">删除</a>";
	 		    		    		return delBtn;
	 		    		    	 }
	 		    		      }*/
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.processdef.cmd.ProcessDefManageQueryCmd");
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
		cmd.setParameter("name@like",$("#searchId").val());
	}
	cmd.execute();
	if(cmd.error){
		if(cmd.error.msg){
			UIAlert(cmd.error.msg);
		}
		else{
			UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip15","该用户没有登录或者会话超时，请登录后重新访问"));
		}
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

function queryAct(){
	if($("input[name='checkbox']:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip16","请选择要查看的记录!"));
	}else if($("input[name='checkbox']:checked").length>1){
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}else{
		var id=$("input:checked").attr("id");
		temp=id.split("@");
		var procDefUniqueId=temp[3];
		location.href="queryprocessadmin.jsp?procDefUniqueId="+procDefUniqueId;
	}
}
function queryEnd(){
	if($("input[name='checkbox']:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip16","请选择要查看的记录!"));
	}else if($("input[name='checkbox']:checked").length>1){
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip1","请选择一条记录!"));
	}else{
		var id=$("input:checked").attr("id");
		temp=id.split("@");
		var procDefUniqueId=temp[3];
		location.href="queryprocessend.jsp?procDefUniqueId="+procDefUniqueId;
	}
}
	
function del(element){
	var flag = true;
	if(($("input[name='checkbox']:checked").length>0)||element){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.MANAGE.Tip14",'确实要删除选中记录吗？'),
            //确定按钮，回调函数
            ok: function () {
            	if(element){
                	flag=delById(element,flag);
            	} else {
            		$("input[name='checkbox']:checked").each(function(){
            			element=$(this).attr("id");
            			flag=delById(element,flag);
            			$("#formList").DataTable().ajax.reload();
            		});
            	}
            	if (flag){
            		$("#formList").DataTable().ajax.reload();
            		//UIAlert("删除成功！");
            		sticky(L.getLocaleMessage("BPM.MANAGE.Tip4","删除成功！"));
				}
            },
            //取消按钮，回调函数
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip17","请选要删除的记录！"));
	}
}
function delById(element,flag) {
	var temp = element.split("@");
	var processCount = temp[0];
	var processEndCount = temp[1];
	var procDefName = temp[2];
	var procDefUniqueId = temp[3];
	
	if (processCount > 0) {
		if (processEndCount > 0) {
			//UIAlert(procDefName+" ：存在"+processCount+"个活动流程实例和"+processEndCount+"个办结流程实例！");
			sticky(procDefName+L.getLocaleMessage("BPM.MANAGE.Tip18"," ：存在")+processCount+L.getLocaleMessage("BPM.MANAGE.Tip19","个活动流程实例和")+processEndCount+L.getLocaleMessage("BPM.MANAGE.Tip20","个办结流程实例！"), 'error', 'center');
			return false;
		}else{
			//UIAlert(procDefName+" ：存在"+processCount+"个活动流程实例！");
			sticky(procDefName+L.getLocaleMessage("BPM.MANAGE.Tip18"," ：存在")+processCount+L.getLocaleMessage("BPM.MANAGE.Tip19","个活动流程实例！"), 'error', 'center');
		}
		return false;
	}
	if (processEndCount > 0) {
		//UIAlert(procDefName+" ：存在"+processEndCount+"个办结流程实例！");
		sticky(procDefName+L.getLocaleMessage("BPM.MANAGE.Tip18"," ：存在")+processEndCount+L.getLocaleMessage("BPM.MANAGE.Tip20","个办结流程实例！"), 'error', 'center');
		return false;
	}
	
	var command = new L5.Command("org.loushang.workflow.manage.processdef.cmd.ProcessDefManageCmd");
	command.setParameter("delIds", [procDefUniqueId]);
	command.execute("delete");
	if (command.error) {
		/*$.dialog({
            type: 'alert',
            content: command.error.msg
        });*/	
		sticky(command.error.msg, 'error', 'center');
		return false;
	}
	return flag;
}
