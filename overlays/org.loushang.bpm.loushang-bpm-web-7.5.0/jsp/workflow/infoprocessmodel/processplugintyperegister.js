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
		                  {"data": "pluginType"},
		                  {"data": "pluginName"},
		                  {"data": "pluginType"},
		                  {"data": "pluginPath"},
		                  {"data": "parserType"},
		                  {"data": "itemType"},
		                  {"data": "pluginType"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       					     return '<input type="checkbox"  id="' + data + '" name="checkbox"/>';
		       					  
		       					}
		       				},
	                        {
		       					"targets":1,	    		       
		       					"render": function(data, type, full) {
		       						var id = full.pluginType;
		       						return "<a title='" + data + "' href=\"javascript:update('"+ id +"')\">"+data+"</a>";
		       					}
	                        },
	                        {
		       					"targets":2,	    		       
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
		 					    	return getParserTypeEnum(data);
		 					    	  }
		 					},
		 					{
		 					    "targets": 5,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getItemTypeEnum(data);
		 					    	  }
		 					},
	 	                     {
	 		    		    	 targets: 6,
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
	var cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefQueryCmd");
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
		cmd.setParameter("PLUGIN_NAME@like",$("#searchId").val());
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
	if(!total){
		total = 0;
	}
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

function del(id){
	var flag = true;
	if(($("input[name='checkbox']:checked").length>0)||id){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip1",'确实要删除选中记录吗？'),
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
            		sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip2","删除成功！"));
				}
            },
            //取消按钮，回调函数
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip3","请选要删除的记录！"));
	}
}
function delById(id, flag) {
	var command=new L5.Command("org.loushang.workflow.infoprocessmodel.plugintypedef.cmd.InfoProcPluginDefCmd");  
	command.setParameter("Id",id);
	command.execute("isDelete");
	
	if (!command.error) {
		var isDelete=command.getReturn("isDelete");
		if(isDelete=="true"){
			$("#formList").DataTable().ajax.reload();
		}
		else{
	        sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip45",'已定义插件类型为')+id+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip46",'的按钮，请先删除对应按钮配置页面按钮!'), 'error', 'center');
			return false;
		}
	}else{
		sticky(command.error.msg, 'error', 'center');
		return  false;
	}
	return flag;
}

function update(id){
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Update","修改"),
		url: "modifyPlugInConf.jsp?id=" + id,
		width: 520,
		height: 460,
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
	         url: "modifyPlugInConf.jsp?status=new",
	         title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.New",'新增'),
	         width: 520,
	         height: 460,
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
	command.setParameter("enumName", "XML_PARSER_TYPE");
	command.execute();
	parserTypeEnum = command.getData();
	command.setParameter("enumName", "ITEM_TYPE");
	command.execute();
	itemTypeEnum = command.getData();
}
//是否设置流程类型
function getParserTypeEnum(Id) {
	for(index in parserTypeEnum) {
		if(parserTypeEnum[index].value == Id) {
			return parserTypeEnum[index].text;
		}
	}
}
//是否显示
function getItemTypeEnum(Id) {
	for(index in itemTypeEnum) {
		if(itemTypeEnum[index].value == Id) {
			return itemTypeEnum[index].text;
		}
	}
}