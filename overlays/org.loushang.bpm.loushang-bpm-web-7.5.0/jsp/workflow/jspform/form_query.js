$(document).ready(function(){
	initProcessType();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
});
//初始化表格
function initProcessType(){
	var table = $("#formList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "formId"},
		                  {"data": "formId"},
		                  {"data": "formName"},
		                  {"data": "formDescription"},
		                  {"data": "formId"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     return '<input type="checkbox"  id="' + data + '" name="checkbox" />';
		       					}
	                       },
	                       {
		       					"targets":1,	    		       
		       					"render": function(data, type, full) {
		       					  return "<a title='"+data +"' href=\"javascript:update('"+data+"')\">"+data+"</a>";
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
		    		    	"targets": 4,
		    		    	"render": function(data,type,full){
 		    		    		var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.JSPFORM.Edit","编辑")+"</a>";
 		    		    		var editField = "<a href=\"formListField.jsp?id="+data+"\">"+L.getLocaleMessage("BPM.JSPFORM.Area","域")+"</a>";
 		    		    		var editAction = "<a href=\"formListAction.jsp?id="+data+"\">"+L.getLocaleMessage("BPM.JSPFORM.Operating","操作")+"</a>";
 		    		    		var editUrl = "<a href=\"formListUrl.jsp?id="+data+"\">URL</a>";
 		    		    		return editBtn + "&nbsp;&nbsp;&nbsp;"
 		    		    		+ editField + "&nbsp;&nbsp;&nbsp;" + editAction + "&nbsp;&nbsp;&nbsp;" + editUrl;
		    		    	}
		    		      }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.jspform.formdef.cmd.JspFormQueryCmd");
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
		cmd.setParameter("FORM_NAME@like",$("#searchId").val());
	}
	cmd.execute();
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

function update(id){
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.JSPFORM.Modify","修改"),
		url: "modifyForm.jsp?id=" + id,
		width: 500,
		height: 260,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
           	 	sticky(L.getLocaleMessage("BPM.JSPFORM.Tip1","保存数据成功！"));
            }
		}
	});
}

$(function(){
	$("#add").click(function(){
		$(this).blur();
		$.dialog({
	         type: 'iframe',
	         url: "modifyForm.jsp?status=new",
	         title: L.getLocaleMessage("BPM.JSPFORM.Add","新增"),
	         width: 500,
	         height: 260,
	         onclose: function () {
	             $("#formList").DataTable().ajax.reload();
	             if(this.returnValue){
	            	 	sticky(L.getLocaleMessage("BPM.JSPFORM.Tip1","保存数据成功！"));
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
            content: L.getLocaleMessage("BPM.JSPFORM.Tip2","确实要删除选中记录吗？"),
            //确定按钮，回调函数
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
            		sticky(L.getLocaleMessage("BPM.JSPFORM.Tip3","删除成功！"));
				}
            },
            //取消按钮，回调函数
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.JSPFORM.Tip4","请选要删除的记录！"));
	}
}
function delById(id, flag) {
	var command=new L5.Command("org.loushang.workflow.jspform.formdef.cmd.JspFormCmd"); 
	var formId = id;
	command.setParameter("formId",formId);
	command.execute("delete");
	if (!command.error) {
		$("#formList").DataTable().ajax.reload();
	}else{
		flag = false;
		sticky(command.error.msg, 'error', 'center');
	}
	return flag;
}
