$(document).ready(function(){
	initEnum();
	initTable();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
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
		                  {"data": "displayName"},
		                  {"data": "description"},
		                  {"data": "pluginType"},
		                  {"data": "displayOrder"},
		                  {"data": "needSetProcType"},
		                  {"data": "isVisible"},
		                  {"data": "id"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     return '<input type="checkbox"  id="' + data + '" name="checkbox" >';
		       					  
		       					}
		       				},
	                        {
			       					"targets":1,	    		       
			       					"render": function(data, type, full) {
			       						var id = full.id;
			       						return "<a title='" + data + "' href=\"javascript:update('"+ id +"')\">"+data+"</a>";
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
		 					    "targets": 5,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getProcTypeEnum(data);
		 					    	  }
		       				},
	 						{
		 					    "targets": 6,	    		       
		 					    "render": function(data, type, full) {
		 					    	return  '<span  data-bind="value: description" >' + getVisibleEnum(data) + '</span>' ;
	 					    	  }
	 						},
	 	                     {
	 		    		    	 targets:7,
	 		    		    	 render:function(data,type,full){
	 		    		    		var delBtn = "<a href=\"javascript:del('"+data+"')\">"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Delete","删除")+"</a>";
	 		    		    		var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Modify","编辑")+"</a>";
	 		    		    		return editBtn + "&nbsp;&nbsp;&nbsp;" + delBtn;
	 		    		    		//return editBtn;
	 		    		    	 }
	 	                     }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.pagebuttondef.cmd.InfoProcPageButtonDefQueryCmd");
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
		cmd.setParameter("DISPLAY_NAME@like",$("#searchId").val());
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

function del(Id){
	var ids = "";
	if(Id) {
		ids = Id;
	}else{
		if($("input[name='checkbox']:checked").length < 1) {
			UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip3","请选要删除的记录！"));
			return;
		}
		var id;
		$("input:checked").each(function(){
			id = $(this).attr("id");
			ids += id;
			ids += ",";
		});
	}
	
	// 删除
	$.dialog({
		type: "confirm",
		content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip1","确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.workflow.infoprocessmodel.pagebuttondef.cmd.InfoProcPageButtonDefCmd");
			command.setParameter("Ids",ids);
			command.execute("deleteIds");
			if(!command.error){
				//UIAlert("删除成功！");
				sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip2","删除成功！"));
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
		title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Update","修改"),
		url: "modifyButtonConf.jsp?id=" + id,
		width: 460,
		height: 360,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
           	 	sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip44","保存数据成功！"));
            }
		}
	});
}

$(function(){
	$("#add").click(function(){
		$(this).blur();
		$.dialog({
	         type: 'iframe',
	         url: "modifyButtonConf.jsp?status=new",
	         title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.New",'新增'),
	         width: 460,
	         height: 360,
	         onclose: function () {
	             $("#formList").DataTable().ajax.reload();
	             if(this.returnValue){
	            	 sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip44","保存数据成功！"));
	             }
	         }	
		});
	});
})
//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_DEF_BUTTON_CONF_SET_PROC_TYPE");
	command.execute();
	procTypeEnum = command.getData();
	command.setParameter("enumName", "PROC_DEF_BUTTON_CONF_VISIBLE");
	command.execute();
	visibleEnum = command.getData();
}
//是否设置流程类型
function getProcTypeEnum(Id) {
	for(index in procTypeEnum) {
		if(procTypeEnum[index].value == Id) {
			return procTypeEnum[index].text;
		}
	}
}
//是否显示
function getVisibleEnum(Id) {
	for(index in visibleEnum) {
		if(visibleEnum[index].value == Id) {
			return visibleEnum[index].text;
		}
	}
}