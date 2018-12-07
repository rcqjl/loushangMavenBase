$(document).ready(function(){
	initTable();
	
	$("#moresearch").morequery({
    	"title":"",
    	"content":$("#searchpanel").html()
	});
	
	$("#add").click(function(){
		addBusinessProcessDef();
	});
	
	$("#addChild").click(function(){
		addLowerLevelBusinessProcessDef();
	});
	
	$("#delete").click(function(){
		deleteBusinessProcessDef();
	});
	
	$("#processImport").click(function(){
		importBusinessProcessDef();
	});
	
	$("#processExport").click(function(){
		exportBusinessProcessDef();
	});
	
	$("#query").click(function(){
		reload();
	});
	
	$("body").on("click","#search",function(){
		reload();
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
		                  {"data": "procDefName"},
		                  {"data": "templateType"},
		                  {"data": "procLevel"},
		                  {"data": "highLevelProcDefName"},
		                  {"data": "highLevelActDefName"},
		                  {"data": "isLeaf"},
		                  {"data": "isValid"},
		                  {"data": "createTime"},
		                  {"data": "id"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						 var element = full.id +"@"+ full.isLeaf +"@"+ full.isValid;
		       					     return '<input type="checkbox"  id="' + element + '" name="checkbox" />';
		       					  
		       					}
		       				},
		       				{
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	var element = full.id +"@"+ full.isLeaf +"@"+ full.isValid;
		 					    	return "<a title='" + data + "' href=\"javascript:updateBusinessProcessDef('"+ element +"')\">"+data+"</a>";
	 					    	  }
		 					},

		 					{
		 					    "targets": 2,	    		       
		 					    "render": function(data, type, full) {
		 					      	if (data==0){
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Common","普通");
		 					    	}else {
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Phase","分阶段");
		 					    	}
		 					      	return "<li title='"+ text +"'>"+text+"</li>";
		 					    }
		 					},
		     				{
		 					    "targets": 3,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data){
		 					    		return data;
		 					    	}else {
		 					    		return "";
		 					    	}
		 					    }
		 					},
		     				{
		 					    "targets": 4,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data){
		 					    		return "<li title='"+ data +"'>"+data+"</li>";
		 					    	}else {
		 					    		return "";
		 					    	}
 					    	   }
		 					},
		     				{
		 					    "targets": 5,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data){
		 					    		return "<li title='"+ data +"'>"+data+"</li>";
		 					    	}else {
		 					    		return "";
		 					    	}
 					    	   }
		 					},
		 					{
		 					    "targets": 6,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data==0){
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.No","否");
		 					    		return text;
		 					    	}else {
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Yes","是");
		 					    		return text;
		 					    	}
 					    	   }
		 					},
		 					{
		 					    "targets": 7,	    		       
		 					    "render": function(data, type, full) {
			 					   	if (data==0){
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.No","否");
		 					    		return text;
		 					    	}else {
		 					    		var text=L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Yes","是");
		 					    		return text;
		 					    	}
 					    	   }
		 					},
		 					
		     				{
		 					    "targets": 8,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data){
		 					    		return "<li title='"+ data +"'>"+data+"</li>";
		 					    	}else {
		 					    		return "";
		 					    	}
 					    	   }
		 					},
		 					{
	 		    		    	 "targets":9,
	 		    		    	 "render":function(data,type,full){
	 		    		    		var element = full.id +"@"+ full.isLeaf +"@"+ full.isValid;
	 		    		    		var editBtn = "<a href=\"javascript:updateBusinessProcessDef('"+element+"')\">"+L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Modify","编辑")+"</a>";
	 		    		    		var deployBtn =  "<a href=\"javascript:updateProcIsValid('"+element+"')\">"+L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Effect","生效")+"</a>";
	 		    		    		var delBtn = "<a href=\"javascript:deleteBusinessProcessDef('"+element+"')\">"+L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Delete","删除")+"</a>";
	 		    		    		return editBtn + "&nbsp;&nbsp;&nbsp;" + deployBtn+ "&nbsp;&nbsp;&nbsp;"+delBtn;
	 		    		    	 }
	 	                     }
		       	      	]
		});
		return table;
}

function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd");
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
	if($("#searchProcessName").val()){
		var str = $("#searchProcessName").val();
		if(str.indexOf("%") != -1){
			str = str.replace("%","\\%");
		}
		cmd.setParameter("WF_BUSINESS_PROCESS_DEF_MODEL.proc_def_name@like",str);
	}
	if($("#searchProcessVersion").val()){
		cmd.setParameter("WF_BUSINESS_PROCESS_DEF_MODEL.is_history@=", $("#searchProcessVersion").val());
	}
	if($("#searchProcessLevel").val()){
		cmd.setParameter("WF_BUSINESS_PROC_DEF_MODEL_REF.proc_level@=", $("#searchProcessLevel").val());
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

function reload(){
	$("#formList").DataTable().ajax.reload();
}

windowParam=' left=0,top=0,width='+ (screen.availWidth) +',height='+ (screen.availHeight) +',scrollbars=no,resizable=yes,toolbar=no';

//增加业务流程定义
function addBusinessProcessDef() {
	$.dialog({
	     type: 'iframe',
	     url: "selecttemplatetype.jsp",
	     title: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.SelectType",'选择类型'),
	     width: 300,
	     height: 110,
		 onclose: function () {
			 	if(this.returnValue != ""){
					ret=(this.returnValue);
					if(ret.flag){
						var url = "fullscreeninsertbusinessprocessmodeldef.jsp?pluginType="+"wfd_bpmn_biz"+"&templateType="+ret.data;
						window.open(url, L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.BusinessProcessDefinition",'业务流程定义'), windowParam)
					}else{
						return;
					}
				}
		}
	});
}

//修改业务流程定义
function updateBusinessProcessDef(element) {
	var temp = element.split("@");
	var id = temp[0];
	var cmd = new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd");
	cmd.setParameter("id",id);
	cmd.execute("getBusinessProcessDefModelById");
	if(cmd.error){
		UIAlert(cmd.error.msg);
		return false;
	}
	var data = cmd.getData();
	
	var templateType = data[0].templateType;
	var pluginType = data[0].pluginType;
	var highLevelProcDefUniqueId = data[0].highLevelProcDefUniqueId;
	var url="fullscreenupdatebusinessprocessmodeldef.jsp?id="+id+"&pluginType="+pluginType
	+"&templateType="+templateType+"&highLevelProcDefUniqueId="+highLevelProcDefUniqueId;
	
	window.open(url,L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.FormDesigner",'表单设计工具'),windowParam);
}

// 删除流程定义
function deleteBusinessProcessDef(element) {
	if(($("input[name='checkbox']:checked").length>0)||element){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip6",'确实要删除选中记录吗？'),
            ok: function () {
            	var procDefIds = [];
            	
            	if(element){
            		var temp = element.split("@");
            		var id = temp[0];
            		procDefIds.push(id);
            	} else {
            		$("input:checked").each(function(){
            			element=$(this).attr("id");
            			var temp = element.split("@");
                		var id = temp[0];
            			procDefIds.push(id);
            		});
            	}
            	var command = new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelCmd");
        		command.setParameter("procDefIds", procDefIds);
    			command.execute("delete");
    			if (!command.error){
            		sticky(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip7","删除成功！"));
            		reload();
				}else{
					sticky(command.error.message, 'error', 'center');
				}
            },
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip8","请选要删除的记录！"));
	}
	
}

// 导入流程定义
function importBusinessProcessDef() {
	window.location.href="forimportbusinessprocessmodeldef.jsp";
}

// 导出流程定义
function exportBusinessProcessDef() {
	if($("input:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip9","请选择要导出的记录!"));
		return false;
	}
	if($("input:checked").length>1){
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip10","请选择一条记录!"));
		return false;
	}
	
	var element=$("input:checked").attr("id");
	var temp = element.split("@");
	var procModelDefUniqueId = temp[0];

    $.dialog({
        type: 'confirm',
        content: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip11",'确定要导出选中的记录吗？'),
        ok: function () {
			var url = L5.webPath + 
			  "/command/dispatcher/org.loushang.workflow.businessprocessmodel.exchange.cmd.BusinessProcessDefExportCmd/exportProcDef";
			url = url + "?procModelDefUniqueId="+ procModelDefUniqueId;
			window.location.href = url;
        },
        cancel: function () {}
    });
}

function addLowerLevelBusinessProcessDef(element){
	if($("input:checked").length < 1){
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip12","请先选择高层业务流程!"));
		return false;
	}
	if($("input:checked").length > 1) {
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip10","请选择一条记录!"));
		return false;
	}
	
	var element=$("input:checked").attr("id");
	var temp = element.split("@");
	var highLevelProcDefUniqueId = temp[0];
	var isLeaf = temp[1];
	var isValid = temp[2];
	
	if(isLeaf=="1"){
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip13","叶子流程不能细化!"));
		return false;
	}
	if(isValid=="0"){
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip14","业务流程未生效不能细化!"));
		return false;
	}

	$.dialog({
	     type: 'iframe',
	     url: "selectextensionactivityhelp.jsp?id="+highLevelProcDefUniqueId,
	     title: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.SelectType",'选择类型'),
	     width: 400,
	     height: 180,
		 onclose: function () {
			 	if(this.returnValue != ""){
					ret=(this.returnValue);
					if(ret.flag){
						var pluginType = "wfd_bpmn_biz"
						var actDefId = ret.actDefId;
						var setLeafProc = ret.setLeafProc;
						var templateType=ret.templateType;
						var url = "fullscreeninsertbusinessprocessmodeldef.jsp?pluginType="+pluginType
						+"&highLevelProcDefUniqueId="+highLevelProcDefUniqueId+"&actDefId="+actDefId+"&setLeafProc="+setLeafProc+"&templateType="+templateType;
						window.open(url, L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.BusinessProcessDefinition",'业务流程定义'), windowParam)
					}else{
						return;
					}
				}
		}
	});
	
}

function updateLevelRef(){
	var userGridPanel=L5.getCmp("userGridPanel");
	var selectedRecords=userGridPanel.getSelectionModel().getSelections();
	if(selectedRecords.length<1){
		L5.Msg.alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.021", "提示"),getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.075", "请选择需要修改的流程!"));
		return false;
	}
	var procDefUniqueId=selectedRecords[0].get("id");
	var is_leaf=selectedRecords[0].get("isLeaf");
	var url="updateprocdefmodelrefhelp.jsp?is_leaf="+is_leaf;
	var ret = showModalDialog(url,window,"scroll:yes;status:no;location:no;dialogWidth:500px;dialogHeight:400px");
	if(ret==null)return false;
	var highLevelProcDefUniqueId=ret[0];
	var highLevelProcDefId=ret[1];
	var highLevelProcDefName=ret[2];
	var highLevelActDefId=ret[3];
	var highLevelActDefName=ret[4];
	var isLeaf=ret[5];
	var command = new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelCmd");
	command.setParameter("procDefUniqueId", procDefUniqueId);
	command.setParameter("highLevelProcDefUniqueId", highLevelProcDefUniqueId);
	command.setParameter("highLevelProcDefId", highLevelProcDefId);
	command.setParameter("highLevelProcDefName", highLevelProcDefName);
	command.setParameter("highLevelActDefId", highLevelActDefId);
	command.setParameter("highLevelActDefName", highLevelActDefName);
	command.setParameter("isLeaf", isLeaf);
	command.execute("updateLevelRef");
	if (!command.error) {
		L5.Msg.alert(getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.021", "提示"),getLocaleMsg("UI.BPM.BUSINESSPROCESSMODEL.076", "流程层次关系修改成功!"));
		init();
	} else {
		alert(command.error);
	}
}

function updateProcIsValid(element){
	var ids = []; 
	if($("input[name='checkbox']:checked").length>0 || element){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip15",'确实要生效选中记录？'),
            //确定按钮，回调函数
            ok: function () {
            	if(element){
            		var temp = element.split("@");
            		var id = temp[0];
            		ids.push(id);
            	} else {
            		$("input[name='checkbox']:checked").each(function(){
            			element = $(this).attr("id");
            			var temp = element.split("@");
                		var id = temp[0];
                		ids.push(id);
            		});
            	}
            	var command=new L5.Command("org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelCmd");
            	command.setParameter("ids", ids);
            	command.execute("setProcValid");
            	if (!command.error){
            		sticky(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip16","成功生效！"));
            		reload();
				}else{
					sticky(command.error.message, 'error', 'center');
				}
            	 $("#formList").DataTable().ajax.reload();
            },
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip17","请选择要生效的流程！"));
	}
}
 