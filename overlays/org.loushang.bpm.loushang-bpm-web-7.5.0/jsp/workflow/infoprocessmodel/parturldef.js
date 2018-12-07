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
		                  {"data": "name"},
		                  {"data": "partUrl"},
		                  {"data": "isVisible"},
		                  {"data": "displayOrder"},
		                  {"data": "partCategory"},
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
		       					"targets":1,	    		       
		       					"render": function(data, type, full) {
		       						var id = full.id;
		       						return "<a title='" + data + "' href=\"javascript:update('"+ id +"')\">"+data+"</a>";
		       					}
	                        },
		 					{
		 					    "targets": 3,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getPartVisibleEnum(data);
		 					    	  }
		 					},
		 					{
		 					    "targets": 2,	    		       
		 					    "render": function(data, type, full) {
		 					    	return "<li title='"+ data +"'>"+data+"</li>";
		 					    	  }
		 					},
		 					{
		 					    "targets": 5,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getPartCategoryEnum(data);
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
	var cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlQueryDefCmd");
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
		cmd.setParameter("NAME@like",$("#searchId").val());
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
            		var ids = "";
            		$("input[name='checkbox']:checked").each(function(){
            			ids += $(this).attr("id");
            			ids += ",";
            		});
            		flag = delById(ids, flag);
            	}
            	if (flag){
//            		UIAlert("删除成功！");
            		sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip2","删除成功！"));
				}
            	$("#formList").DataTable().ajax.reload();
            },
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip3","请选要删除的记录！"));
	}
}
function delById(id, flag) {
	var command=new L5.Command("org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlDefCmd"); 
	command.setParameter("Ids",id);
	command.execute("deleteIds")
	if (!command.error) {
		$("#formList").DataTable().ajax.reload();
	}else{
		flag = false;
		sticky(command.error.msg, 'error', 'center');
	}
		return flag;
}

function update(id){
	var height;
	if(id=="context"){
		height=320;
	}else{
		height=250;
	}
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Update","修改"),
		url: "modifyPartUrlDef.jsp?id=" + id,
		width: 560,
		height: height,
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
	         url: "modifyPartUrlDef.jsp?status=new",
	         title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.New","新增"),
	         width: 560,
	         height: 250,
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
	command.setParameter("enumName", "PART_VISIBLE");
	command.execute();
	partVisibleEnum = command.getData();
	command.setParameter("enumName", "PART_RULE");
	command.execute();
	partRuleEnum = command.getData();
	command.setParameter("enumName", "PART_CATEGORY");
	command.execute();
	partCategoryEnum = command.getData();
}
//是否显示
function getPartVisibleEnum(Id) {
	for(index in partVisibleEnum) {
		if(partVisibleEnum[index].value == Id) {
			return partVisibleEnum[index].text;
		}
	}
}
//参与者规则
function getPartRuleEnum(Id) {
	var text = "";
	if (Id){
		var arr = new Array();
		arr = Id.split(",");
		for(var i = 0; i < arr.length; i++) {
			for(index in partRuleEnum) {
				if(partRuleEnum[index].value == arr[i]) {
					text += partRuleEnum[index].text;
					text += ",";
					break;
				}
			}
		}
		return text;
	} else if (Id == null || Id == ""){
		return text;
	}
}
//类别
function getPartCategoryEnum(Id) {
	for(index in partCategoryEnum) {
		if(partCategoryEnum[index].value == Id) {
			return partCategoryEnum[index].text;
		}
	}
}