$(document).ready(function(){
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
		                  {"data": "typeId"},
		                  {"data": "typeId"},
		                  {"data": "typeName"},
		                  {"data": "description"},
		                  {"data": "displayOrder"},
		                  {"data": "typeId"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     		return '<input type="checkbox"  id="' + data + '" name="checkbox"/>';
		       						}
		       				},
 					        {
	 					    	  targets: 1,	    		       
	 					    	  render: function(data, type, full) {
	 					    		  return "<a title='"+data +"' href=\"javascript:update('"+data+"')\">" + data + "</a>";
	 					    	  }
 					        },
 					        {
			 					    "targets": 2,	    		       
			 					    "render": function(data, type, full) {
					 					   	if(data){
				 					    		return "<li title='"+ data +"'>"+data+"</li>";
				 					    	}else{
				 					    		return "";
				 					    	}
			 					    }
		 					 },
 					         {
			 					    "targets": 3,	    		       
			 					    "render": function(data, type, full) {
				 					    	if(data){
				 					    		return "<li title='"+ data +"'>"+data+"</li>";
				 					    	}else{
				 					    		return "";
				 					    	}
		 					    	  }
		 					 },
 	                        {
	 		    		    	 targets:5,
	 		    		    	 render:function(data,type,full){
	 		    		    		var delBtn = "<a href=\"javascript:del('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Delete","删除")+"</a>";
	 		    		    		var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Modify","编辑")+"</a>";
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
	var cmd = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd");
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
		cmd.setParameter("TYPE_NAME@like",$("#searchId").val());
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
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

function update(id){
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.PROCESSTYPE.Update","修改流程类型信息"),
		url: "modifyData.jsp?id=" + id,
		width: 540,
		height: 260,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
            	sticky(L.getLocaleMessage("BPM.PROCESSTYPE.Tip2","保存数据成功！"));
            }
		}
	});
}
$(function(){
	$("#add").click(function(){
		$(this).blur();
		$.dialog({
	         type: 'iframe',
	         url: "modifyData.jsp?status=new",
	         title: L.getLocaleMessage("BPM.PROCESSTYPE.New","新增流程类型"),
	         width: 540,
	         height: 260,
	         onclose: function () {
	             $("#formList").DataTable().ajax.reload();
	             if(this.returnValue){
	            	 sticky(L.getLocaleMessage("BPM.PROCESSTYPE.Tip2","保存数据成功！"));
	             }
	         }	
		});
	});
})

function del(id){
	var flag = true;
	if(($("input[name='checkbox']:checked").length>0)||id){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.PROCESSTYPE.Tip3","确实要删除选中记录吗？"),
            ok: function () {
            	if(id){
            		flag = delById(id, flag);
            	} else {
            		var formId;
            		$("input[name='checkbox']:checked").each(function(){
            			formId = $(this).attr("id");
            			flag = delById(formId, flag);
            		});
            	}
            	if (flag){
            		//UIAlert("删除成功！");
            		sticky(L.getLocaleMessage("BPM.PROCESSTYPE.Tip4","删除成功！"));
				}
            },
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.PROCESSTYPE.Tip5","请选要删除的记录！"));
	}
}
function delById(id, flag) {
	var command=new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeCmd");  
	var typeId = id;
	command.setParameter("typeId",typeId);
	command.execute("isDelete");
	
	if (!command.error) {
		var isDelete=command.getReturn("isDelete");
		if(isDelete=="true"){
			$("#formList").DataTable().ajax.reload();
		}
		else{
			$.dialog({
	            type: 'alert',
	            content: L.getLocaleMessage("BPM.PROCESSTYPE.Tip6","已定义流程类型ID为 ")+typeId+L.getLocaleMessage("BPM.PROCESSTYPE.Tip7"," 的流程，请先删除对应流程！")
	        });
			return false;
		}
	}else{
		/*$.dialog({
            type: 'alert',
            content: command.error.message
        });	*/
		sticky(command.error.msg, 'error', 'center');
		return  false;
	}
	return flag;
}
