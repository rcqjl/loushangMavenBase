$(document).ready(function(){
	initEnum();
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#moresearch").morequery({
    	"title":"",
    	"content":$("#searchpanel").html()
	});
	$("body").on("click","#search",function(){
		$("#formList").DataTable().ajax.reload();
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
		                  {"data": "id"},
		                  {"data": "propertyKey"},
		                  {"data": "propertyValue"},
		                  {"data": "propertyDescription"},
		                  {"data": "parserType"},
		                  {"data": "id"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     return '<input type="checkbox"  id="' + data + '" name="checkbox"/>';
		       					  
		       					}
		       				},
		 					{
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getProcManagerEventTypeEnum(data);
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
		 					    "targets": 4,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getListenerTypeEnum(data);
		 					    	  }
		 					},
	                       {
		    		    		"targets": 5,
		    		    		"render": function(data,type,full){
		    		    			var delBtn = "<a href=\"javascript:del('"+data+"')\">"+L.getLocaleMessage("BPM.CONFIG.Delete","删除")+"</a>";
		    		    			var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.CONFIG.Modify","编辑")+"</a>";
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
	var cmd = new L5.Command("org.loushang.workflow.config.property.cmd.PropertyConfigQueryCmd");
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
	if($("#searchClass").val()){
		cmd.setParameter("PROPERTY_VALUE@like",$("#searchClass").val());
	}
	if($("#searchDescription").val()){
		cmd.setParameter("PROPERTY_DESCRIPTION@like",$("#searchDescription").val());
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

function del(id){
	var ids = "";
	if(id) {
		ids = id;
	}else{
		if($("input[name='checkbox']:checked").length < 1) {
			UIAlert(L.getLocaleMessage("BPM.CONFIG.Tip1","请选要删除的记录！"));
			return;
		}
		$("input[name='checkbox']:checked").each(function(){
			id = $(this).attr("id");
			ids += id;
			ids += ",";
		});
	}
	// 删除
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.CONFIG.Tip2","确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command=new L5.Command("org.loushang.workflow.config.property.cmd.PropertyConfigCmd");
			command.setParameter("Ids",ids);
			command.execute("deleteIds");
			if(!command.error){
				//UIAlert("删除成功！");
				sticky(L.getLocaleMessage("BPM.CONFIG.Tip3","删除成功！"));
			}else{
				//UIAlert("删除失败！");
				sticky(command.error.msg, 'error', 'center');
			}
			$("#formList").DataTable().ajax.reload();
		},
		cancel: function(){}
	});
}

function update(id){
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.CONFIG.Update","修改"),
		url: "modifyEventListener.jsp?id=" + id,
		width: 600,
		height: 260,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
           	 	sticky(L.getLocaleMessage("BPM.CONFIG.Tip4","保存数据成功！"));
            }
		}
	});
}

$(function(){
	$("#add").click(function(){
		$(this).blur();
		$.dialog({
	         type: 'iframe',
	         url: "modifyEventListener.jsp?status=new",
	         title: L.getLocaleMessage("BPM.CONFIG.New",'新增'),
	         width: 600,
	         height: 260,
	         onclose: function () {
	             $("#formList").DataTable().ajax.reload();
	             if(this.returnValue){
	            	 sticky(L.getLocaleMessage("BPM.CONFIG.Tip4","保存数据成功！"));
	             }
	         }	
		});
	});
})

//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_MANAGER_EVENT_TYPE");
	command.execute();
	procManagerEventTypeEnum = command.getData();
	command.setParameter("enumName", "LISTENER_TYPE");
	command.execute();
	listenerTypeEnum = command.getData();
}

function getProcManagerEventTypeEnum(Id) {
	for(index in procManagerEventTypeEnum) {
		if(procManagerEventTypeEnum[index].value == Id) {
			return procManagerEventTypeEnum[index].text;
		}
	}
}

function getListenerTypeEnum(Id) {
	for(index in listenerTypeEnum) {
		if(listenerTypeEnum[index].value == Id) {
			return listenerTypeEnum[index].text;
		}
	}
}