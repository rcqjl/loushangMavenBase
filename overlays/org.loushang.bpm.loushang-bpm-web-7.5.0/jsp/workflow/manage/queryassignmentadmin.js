$(document).ready(function(){
	initTable();
	$("#back").click(function(){
		back();
	});
	$("#reAssign").click(function(){
		reAssign();
	});
	$("#cancelAssign").click(function(){
		cancelAssign();
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
		                  {"data": "organName"},
		                  {"data": "actualOrganName"},
		                  {"data": "assignmentId"},     //环节名称
		                  {"data": "status"},           //委派状态
		                  {"data": "createTime"},
		                  {"data": "endTime"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						  var element=full.assignmentId+"@"+full.status;
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
		 					    "targets": 2,	    		       
		 					    "render": function(data, type, full) {
			 					    	if(data)
			 					    		return "<li title='"+ data +"'>"+data+"</li>";
			 					    	else
			 					    		return "";
		 					    	  }
		       				},
	                       {
		       					"targets":3,	    		       
		       					"render": function(data, type, full) {
		       					     return "<li title='"+  decodeURI(actDefName) +"'>"+ decodeURI(actDefName)+"</li>"; 
		       					}
	                       },
	                       {
		       					"targets":4,	    		       
		       					"render": function(data, type, full) {
		       					     return returnState(data);
		       					  
		       					}
	                       }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.manage.assignment.cmd.AssignmentManageQueryCmd");
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
	var url="queryactivityadmin.jsp";
	url+="?processId="+processId+"&procDefUniqueId="+procDefUniqueId;
	url+="&procDefName="+procDefName;
	url = encodeURI(encodeURI(url));
	location.href =url; //"queryactivityadmin.jsp?processId="+processId+"&procDefUniqueId="+procDefUniqueId;
}
function returnState(state){
	if(state=="TASK_CANCELLED"){
		text=L.getMssage("BPM.MANAGE.Canceled","取消");
	}
	if(state=="TASK_SENT"){
		text=L.getLocaleMessage("BPM.MANAGE.Send","发送");
	}
	if(state=="TASK_COMPLETED"){
		text=L.getLocaleMessage("BPM.MANAGE.Finish","完成");
	}
	return text;
}

function reAssign(){
	if(actState!="open.running"){
		//UIAlert("当前环节不处于活动状态！");
		sticky(L.getLocaleMessage("BPM.MANAGE.Tip23","当前环节不处于活动状态！"), 'error', 'center');
		return;
	}else{
		var values;
		var url = bspAppPath + "service/bsp/organHelp?isChkbox=1&selType=8&struType=00&showableType=1;2;6;8";
		url = url + "&userId=" + userId;
		
		$.dialog({
			type: 'iframe',
			url: url,
			title: L.getLocaleMessage("BPM.MANAGE.Re-appoint","重新委派"),
			width: 300,
			height: 500,
			onclose: function(){
				var node = this.returnValue;
				var organId,organName;
				var list = new L5.List();
				if(typeof node!='string'){
					if(node.length>0){
						$.each(node,function(i,n){
							var map = new L5.Map();
							map.put("organId",n["organId"]);
							map.put("organName",n["organName"]);
							list.add(map);
						});
						
						var cmd = new L5.Command("org.loushang.workflow.manage.assignment.cmd.AssignmentManageCmd");
						cmd.setParameter("actOrganList",list);
						cmd.setParameter("activityId",activityId);
						cmd.execute("reAssign");
						if(!cmd.error){
							$("#formList").DataTable().ajax.reload();
							//UIAlert("重新委派操作完成");
							sticky(L.getLocaleMessage("BPM.MANAGE.Tip26","重新委派操作完成"));
						}else{
							$("#formList").DataTable().ajax.reload();
							//UIAlert(cmd.error.msg);
							sticky(cmd.error.msg, 'error', 'center');
						}
					}
				}
			}
		});
	}
}

function cancelAssign(element){
	var flag = true;
	if(($("input[name='checkbox']:checked").length>0)||element){
		if(actState=="open.running"){
			
				$.dialog({
		            type: 'confirm',
		            content: L.getLocaleMessage("BPM.MANAGE.Tip25",'确实要取消委托吗？'),
		            ok: function () {
				    	if(element){
				    		flag = cancel(element, flag);
				    	} else {
				    		$("input[name='checkbox']:checked").each(function(){
				    			element=$(this).attr("id");
				    			flag = cancel(element, flag);
				    		});
				    	}
		            	if (flag){
		            		//UIAlert("取消委派操作成功！");
		            		sticky(L.getLocaleMessage("BPM.MANAGE.Tip24","取消委派操作成功！"));
		            		$("#formList").DataTable().ajax.reload();
						}
		            },
		            cancel: function () {}
		        });	
				
		}else{
			//UIAlert("当前环节不处于活动状态！");
			sticky(L.getLocaleMessage("BPM.MANAGE.Tip23","当前环节不处于活动状态！"), 'error', 'center');
			return;
		}
	}else{
		UIAlert(L.getLocaleMessage("BPM.MANAGE.Tip22","请选择一个委派实例进行操作"));
	}
}	

function cancel(element, flag) {
	var cmd = new L5.Command("org.loushang.workflow.manage.assignment.cmd.AssignmentManageCmd");
	var temp=element.split("@");
	var id=temp[0];
	var status=temp[1];
	if(status!="TASK_CANCELLED"){
		cmd.setParameter("assignmentId",id);
		cmd.execute("cancelAssign");
		if (cmd.error) {
			//UIAlert(cmd.error.msg);
			sticky(cmd.error.msg, 'error', 'center');
			$("#formList").DataTable().ajax.reload();
			return false;
		}
	 }else{
			//UIAlert("当前委派已经被取消！");
			sticky(L.getLocaleMessage("BPM.MANAGE.Tip21","当前委派已经被取消！"), 'error', 'center');
			return false;
	}
	return flag;
}
