$(document).ready(function(){
	initEnum();
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#setProxy").click(function(){
		add();
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
		                  {"data": "PROC_DEF_ID"},
		                  {"data": "PROC_DEF_NAME"},
		                  {"data": "ORIGINAL_ORGAN_NAME"},
		                  {"data": "PROXY_ORGAN_NAME"},
		                  {"data": "IS_PROXY_EXIST_TASK"},
		                  {"data": "PROC_DEF_ID"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						var element=full.PROC_DEF_ID+"@"+full.ORIGINAL_ORGAN_ID+"@"
		 					    	+full.PROXY_ORGAN_ID+"@"+full.ID+"@"+full.ORIGINAL_ORGAN_NAME;
		       					    return '<input type="checkbox" id="'+ element + '" name="checkbox"/>';
		       					  
		       					}
		       				},
		 					{
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	var element=full.PROC_DEF_ID+"@"+full.ORIGINAL_ORGAN_ID+"@"
		 					    	+full.PROXY_ORGAN_ID+"@"+full.ID+"@"+full.ORIGINAL_ORGAN_NAME;
		       						return "<a title='"+ data +"' href=\"javascript:update('"+element+"')\">"+data+"</a>";
		 					    }
		 					},
		 					 {
		 					    "targets": 3,	    		       
		 					    "render": function(data, type, full) {
		 					    			return "<li title='"+ data +"'>"+data+"</li>";
		 					    	  }
		 					},
		 					{
		 					    "targets": 4,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getTripProxyEnum(data);
	 					    	  }
		 					},
 	                        {
		    		    		"targets": 5,
		    		    		"render": function(data,type,full){
		 					    	var element=full.PROC_DEF_ID+"@"+full.ORIGINAL_ORGAN_ID+"@"
		 					    	+full.PROXY_ORGAN_ID+"@"+full.ID+"@"+full.ORIGINAL_ORGAN_NAME;
		 					    	var editBtn = "<a href=\"javascript:update('"+element+"')\">"+L.getLocaleMessage("BPM.JSPFORM.Edit","编辑")+"</a>";
		    		    			var delBtn = "<a href=\"javascript:del('"+element+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Cancel","取消")+"</a>";
		    		    			return editBtn + "&nbsp;&nbsp;&nbsp;" + delBtn;
		    		    			//return  editBtn;
		    		    		}
	                       } 
		       	      	]
		});
		return table;
}

function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.tripproxy.cmd.TripProxyProcDefQueryCmd");
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
		cmd.setParameter("PROC_DEF_NAME@like",$("#searchId").val());
	}
	cmd.execute("query");
	if(cmd.error){
		if(cmd.error.msg){
			UIAlert(cmd.error.msg);
		}
		else{
			UIAlert(L.getLocaleMessage("BPM.TRIPPROXY.Tip3","该用户没有登录或者会话超时，请登录后重新访问"));
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

function del(element){
	var temp;
	var procDefId = [];
	var proxyOrganId = [];
	var id = [];
	if($("input[name='checkbox']:checked").length>0 || element){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.TRIPPROXY.Tip4","确实要取消选中委派吗？"),
            //确定按钮，回调函数
            ok: function () {
            	if(element){
            		 temp = element.split("@");
            		 procDefId.push(temp[0]);
            		 proxyOrganId.push(temp[2]);
            		 id.push(temp[3]);
            	} else {
            		var Id;
            		$("input[name='checkbox']:checked").each(function(){
            			 Id = $(this).attr("id");
                   		 temp = Id.split("@");
                   		 procDefId.push(temp[0]);
                   		 proxyOrganId.push(temp[2]);
                   		 id.push(temp[3]);
            		});
            	}
            	var command=new L5.Command("org.loushang.workflow.tripproxy.cmd.TripProxyProcDefCmd");
            	command.setParameter("procDefIds",procDefId);
            	command.setParameter("proxyOrganIds",proxyOrganId);
            	command.setParameter("Ids",id);
            	command.execute("deleteByIds");
            	if (!command.error){
            		//UIAlert("删除成功！");
            		sticky(L.getLocaleMessage("BPM.TRIPPROXY.Tip5","取消委托成功！"));
				}else{
					//UIAlert(command.error.msg);
					sticky(command.error.message, 'error', 'center');
				}
            	 $("#formList").DataTable().ajax.reload();
            },
            //取消按钮，回调函数
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.TRIPPROXY.Tip6","请选择要取消的委派！"));
	}
}
function update(element){//, oldProxyOrganId
	var temp = element.split("@");
	procDefId=temp[0];
	//originalOrganId=temp[1];
	oldProxyOrganId=temp[2];
	id=temp[3];
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.TRIPPROXY.Tip7","修改代理人"),
		url: "modifyTripProxy.jsp?procDefId=" + procDefId+"&oldProxyOrganId="+oldProxyOrganId+"&id="+id,
		width: 500,
		height: 180,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
            	sticky(L.getLocaleMessage("BPM.JSPFORM.Tip1","保存数据成功！"));
            }
		}
	});
}
//不用传参，organName,organName由session获取
function add(){
	$.dialog({
        type: 'iframe',
        url: "modifyTripProxy.jsp?status=new",
        title: L.getLocaleMessage("BPM.TRIPPROXY.Tip8","设置代理人"),
        width: 500,
        height: 180,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
            	sticky(L.getLocaleMessage("BPM.TRIPPROXY.Tip9","设置成功！"));
            }
        }	
	});
}
	
//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "TRIP_PROXY.IS_PROXY_EXIST_TASK");
	command.execute();
	tripProxyEnum = command.getData();
}
function getTripProxyEnum(Id) {
	for(index in tripProxyEnum) {
		if(tripProxyEnum[index].value == Id) {
			return tripProxyEnum[index].text;
		}
	}
}