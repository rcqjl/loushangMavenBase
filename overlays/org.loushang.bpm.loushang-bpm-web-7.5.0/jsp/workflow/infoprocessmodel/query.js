// 当前选中的树节点。
var curRecord;

// 弹窗
function UIAlert(msg){
	$.dialog({
		type: "alert",
	    content: msg,
	    autofocus: true
    });
}
// 弹窗提示样式
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	var param = {
	        autoclose : 1000, 
	        position : place,
	        style : type
	    }
	$.sticky(msg, param);
}
// 国际化
function m(code, defMsg) {
	return L.getLocaleMessage(code, defMsg);
}
$(document).ready(function(){
	initEnum();
	
	// 初始化流程类别树。
	initTypeTree();
	
	initTable();
	$("#query").click(function(){
		reload();
	});
	$("#moresearch").morequery({
    	"title":"",
    	"content":$("#searchpanel").html()
	});
	$("body").on("click","#search",function(){
		reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#release").click(function(){
		release();
	});
	$("#processImport").click(function(){
		location.href="forimport.jsp";
	});
	$("#processExport").click(function(){
		processExport();
	});
	$("#updateProcessDef").click(function(){
		updateProcessDef();
	});
	$("#updateProcessType").click(function(){
		updateProcessType();
	});
	$("#updateOwnOrgan").click(function(){
		updateOwnOrgan();
	});
	$("#procList tr").each(function(){
		$(this).find("td:eq(6)").css("color","gray");
	});
});
//初始化表格
function initTable(){
	var table = $("#procList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "id",},
		                  {"data": "procDefName"},
		                  {"data": "isHistory"},
		                  {"data": "isRelease"},
		                  {"data": "organName"},
		                  {"data": "createTime"},
		                  {"data": "id"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						 var element =full.itemType +"@"+full.id+"@"+full.procDefName
		       						 +"@"+full.pluginType+"@"+full.jsObject+"@"+full.isRelease
		       						 +"@"+full.pluginPath+"@"+full.processType+"@"+full.organId;
		       					     return '<input type="checkbox"  id="' + element + '" name="checkbox" />';
		       					  
		       					}
		       				},
		       				{
		 					    "targets": 1,	    		       
		 					    "render": function(data, type, full) {
		 					    	var element =full.itemType +"@"+full.id+"@"+full.procDefName
		       						 +"@"+full.pluginType+"@"+full.jsObject+"@"+full.isRelease
		       						 +"@"+full.pluginPath+"@"+full.processType;
		 					    	return "<a title='" + data + "' href=\"javascript:updateProcessDef('"+ element +"')\">"+data+"</a>";
	 					    	  }
		 					},
		       				{
		 					    "targets": 2,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data==0){
		 					    		var text=L.getLocaleMessage("BPM.INFOPROCESSMODEL.NewVersion","新版本");
		 					    		return text;
		 					    	}else {
		 					    		var text=L.getLocaleMessage("BPM.INFOPROCESSMODEL.OldVersion","旧版本");
		 					    		return text;
		 					    	}
 					    	   }
		 					},
		 					{
		 					    "targets": 3,	    		       
		 					    "render": function(data, type, full) {
		 					    	return getProcTypeEnum(data);
		 					    	  }
		 					},
		     				{
		 					    "targets": 4,	    		       
		 					    "render": function(data, type, full) {
		 					    	if (data){
		 					    		return data;
		 					    	}else {
		 					    		return "";
		 					    	}
 					    	   }
		 					},
		 					{
	 		    		    	 "targets":6,
	 		    		    	 "render":function(data,type,full){
	 		    		    		var element =full.itemType +"@"+full.id+"@"+full.procDefName
		       						 +"@"+full.pluginType+"@"+full.jsObject+"@"+full.isRelease
		       						 +"@"+full.pluginPath+"@"+full.processType;
	 		    		    		var deployBtn =  "<a href=\"javascript:release('"+element+"')\">"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Release","发布")+"</a>";
	 		    		    		var editBtn = "<a href=\"javascript:updateProcessDef('"+element+"')\">"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Modify","编辑")+"</a>";
	 		    		    		return editBtn + "&nbsp;&nbsp;&nbsp;" + deployBtn;
	 		    		    	 }
	 	                     }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelQueryCmd");
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
		cmd.setParameter("WF_INFO_PROCESS_DEF_MODEL.PROC_DEF_NAME@like", $("#searchProcessName").val());
	}
	if($("#searchOrgan").val()){
		cmd.setParameter("corpOrganId", document.getElementById("searchOrgan").text);
	}
	//设置流程类型
	if(curRecord && !curRecord.isRoot){
		cmd.setParameter("processType",curRecord.id);
	}
	cmd.setParameter("WF_INFO_PROCESS_DEF_MODEL.IS_HISTORY@like", $("#searchProcessVersion").val());
	
	if(displaySourceTypes!="null"&&displaySourceTypes.length>0){
		cmd.setParameter("WF_INFO_PROCESS_DEF_MODEL.PLUGIN_TYPE@in", displaySourceTypes);
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
	$("#procList").DataTable().ajax.reload();
	$("#procList tr").each(function(){
		$(this).find("td:eq(6)").css("color","gray");
	});
}

//删除
function del(element){
	if(($("input[name='checkbox']:checked").length>0)||element){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip1",'确实要删除选中记录吗？'),
            ok: function () {
            	var flag = true;
            	if(element){
                	flag=delet(element,flag);
            	} else {
            		$("input:checked").each(function(){
            			element=$(this).attr("id");
            			flag=delet(element,flag);
            		});
            	}
            	if (flag){
            		sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip2","删除成功！"));
				}
    			reload();
            },
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip3","请选要删除的记录！"));
	}
}
function delet(element,flag){
	var temp = element.split("@");
	var itemType = temp[0];
	var id = temp[1];
	var procDefName = temp[2];
	var pluginType = temp[3];
	var jsObject = temp[4];
	
	if(itemType=="0"){
		var command	= new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
    	command.setParameter("procDefUniqueIds",[id]);
    	command.execute("delete");
		if (command.error) {
			/*$.dialog({
	            type: 'alert',
	            content: command.error.msg
	        });	*/
			sticky(command.error.msg, 'error', 'center');
			return false;
		}
	}else{
		if(jsObject==null ||jsObject==""){
			//UIAlert("流程["+procDefName+"]删除失败："+"未注册["+pluginType+"]插件的js对象！");
			sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip4","流程")+"["+procDefName+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip5","删除失败：")+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip6","未注册")+"["+pluginType+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip7","插件的js对象！"), 'error', 'center');
			return false;
		}
		try{
			var _jsObject=eval(jsObject);
			var returnInfo = _jsObject.deleteModel([id]);
			if(returnInfo!=undefined && returnInfo["error"]!=null){
				//UIAlert("流程["+procDefName+"]删除失败："+returnInfo.error.msg);
				sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip4","流程")+"["+procDefName+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip5","删除失败：")+returnInfo.error.msg, 'error', 'center');
				return false;
			}
		}catch (e){
			//UIAlert("调用["+pluginType+"]类型插件的"+jsObject+"."+"deleteModel()方法失败！");
			sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip8","调用")+"["+pluginType+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip9","类型插件的")+jsObject+"."+"deleteModel()"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip10","方法失败！"), 'error', 'center');
			return false;
		}
	}
	return flag;
}

//发布
function release(element) {
	var flag = true;
	if(($("input:checked").length>0)||element){
		if(element){
        	flag=rele(element,flag);
    	} else {
			$("input[name='checkbox']:checked").each(function(){
				var element=$(this).attr("id");
				flag=rele(element,flag);
			});
    	}
    	if (flag){
    		//UIAlert("发布成功！");
    		sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip11","发布成功！"));
    	}
    	reload();
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip12","请选择一条记录！"));
	}
}
function rele(element,flag){
	var temp = element.split("@");
	var itemType = temp[0];
	var id = temp[1];
	var procDefName = temp[2];
	var pluginType = temp[3];
	var jsObject = temp[4];
	
	if(itemType=="0"){
    	var command	= new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
    	command.setParameter("procDefUniqueIds",[id]);
    	command.execute("release");
		if (command.error) {
			//UIAlert("流程["+procDefName+"]发布失败："+command.error.msg);
			//UIAlert(command.error.msg);
			sticky(command.error.msg, 'error', 'center');
			return false;
		}
	}else{
		if(jsObject==null || jsObject==""){
			//UIAlert("未注册["+pluginType+"]插件的js对象！");
			sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip6","未注册")+"["+pluginType+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip7","插件的js对象！"), 'error', 'center');
			return false;
		}
		try{
			var _jsObject=eval(jsObject);
			var returnInfo = _jsObject.releaseModel([id]);
			if(returnInfo!=undefined && returnInfo["error"]!=null){
				//UIAlert("流程["+procDefName+"]发布失败："+returnInfo.error.msg);
				//UIAlert(returnInfo.error.msg);
				sticky(returnInfo.error.msg, 'error', 'center');
				return false;
			}
		}catch (e){
			//UIAlert("调用["+pluginType+"]类型插件的"+jsObject+"."+"releaseModel()方法失败！");
			sticky(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip8","调用")+"["+pluginType+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip9","类型插件的")+jsObject+"."+"releaseModel()"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip10","方法失败！"), 'error', 'center');
			return false;
		}
	}
	return flag;
}
 
//新增
function insertNewProcessDef(element) {
	var temp = element.split(";");
	var pluginType = temp[0];//插件类型
	var needSetProcType = temp[1];//是否设置流程类型
	var itemType = temp[2];
	var pluginPath = temp[3];//插件路径
	if(itemType=="1"){//版本类型，1为html,0为flex   parseType是发布方式，0是本地，1是高速服务
		var retResult={data:[]};
		insertHtml(retResult,pluginPath,pluginType);	
	}else{//(itemType!="1")

		var url1 = basePath+ "jsp/workflow/infoprocessmodel/forinsert.jsp?" 
			+ "pluginType=" + pluginType + "&isFullScreen=true" + "&displaySourceTypes="+displaySourceTypes;
		$.dialog({
	         type: 'iframe',
	         url: "selectrelativeprocessinfo.jsp",
	         title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip13",'选择类型'),
	         width: 600,
	         height: 440,
			 onclose: function () {
				 	if(this.returnValue != ""){
						ret=(this.returnValue);
						if(ret.flag){
							insertFlex(ret,url1);
							reload(); 
						}else{
							return;
						}
					}
        	}
		});
	}   
}

var ua = navigator.userAgent.toLowerCase();
var windowParam,widthCut,heightCut;
if(ua.indexOf("chrome") != -1){//调整表单设计器页面在谷歌浏览器中的大小
	widthCut = 15;
	heightCut = 65;
}else{
	widthCut = 10;
	heightCut = 50;
}
windowParam=' left=0,top=0,width='+ (screen.availWidth - widthCut) +',height='+ (screen.availHeight-heightCut) +',scrollbars=no,resizable=yes,toolbar=no';


//新增html
function insertHtml(retResult,pluginPath,pluginType){
	if(retResult!=null){
		var htmlUrl = basePath + pluginPath;
		if(pluginPath.indexOf("?")!=-1){
			htmlUrl += "&pluginType="+pluginType;
		}else{
			htmlUrl += "?pluginType="+pluginType;
		}
		if(curRecord && !curRecord.isRoot){
			htmlUrl += "&processType="+curRecord.id;
		}
		var returnValue = window.open(htmlUrl,L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip14",'jsp表单设计工具'),windowParam);  
	}else{
		return;
	}
}

//新增flex
function insertFlex(ret,url1){
	if(ret!=null){
		var relativeBusinessProcessId = ret.data[1];
		var templateType=ret.data[2];
		var addUrl="";
		if(curRecord && !curRecord.isRoot){
			addUrl += "&processType="+curRecord.id;
		}
		if(relativeBusinessProcessId != null && relativeBusinessProcessId != ""){
			url1 = url1 + "&relativeBusinessProcessId=" + relativeBusinessProcessId 
				+ addUrl + "&templateType=" + templateType + "&isNew=1";
		}else{
			url1 = url1 + addUrl + "&templateType=0" + "&isNew=0";
		}
		
		window.open(url1,L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip14",'jsp表单设计工具'),windowParam); 
		reload();
	}else{
		return;
	}
}

//修改流程定义
function updateProcessDef(element) {
	if($("input:checked").length>0||element){
		   if($("input:checked").length>1){
				UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip12","请选择一条记录!"));
				return false;
			}else{
				if($("input:checked").length==1){
					element = $("input:checked").attr("id");
				}
				var temp = element.split("@");
				var itemType = temp[0];
				var id = temp[1];
				var procDefName = temp[2];
				var pluginType = temp[3];
				var isRelease = temp[5];
				var pluginPath = temp[6];
				var processType = temp[7];
				
				if(itemType=="1"){//html版本
					var htmlUrl= basePath + pluginPath;
					if(pluginPath.indexOf("?")!=-1){
						htmlUrl += "&pluginType="+pluginType;						
					}else{
						htmlUrl += "?pluginType="+pluginType;												
					}
					if (isRelease == "1") {
						htmlUrl += "&isRelease="+isRelease;   
					}
					if(processType!=null && processType!=""){
						htmlUrl += "&processType="+processType;						
					}
					htmlUrl += "&procDefUniqueId="+id;
					
					window.open(htmlUrl,L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip14",'jsp表单设计工具'),windowParam);  
					
					reload();
				}else{//item!=1, flex版本
					var url1 = 'fullscreenupdate.jsp?id='+id+'&procDefName='+procDefName;//+'&version='+version
					url1 = url1 + "&pluginType=" + pluginType + "&isRelease=" + isRelease
							+ "&processType=" + processType + "&pluginPath=" + pluginPath;
					url1 = url1 + "&isFullScreen=true";
					url1+="&displaySourceTypes="+displaySourceTypes;
					url1 = encodeURI(encodeURI(url1));
					//location.href=url1;
					window.open(url1,L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip14",'jsp表单设计工具'),windowParam); 
					reload();
				}
			}
	}else if($("input:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip15","请选择要修改的记录!"));
		return false;
	}
}

function updateOwnOrgan(element){
	if($("input[name='checkbox']:checked").length==1 || element){
		if($("input[name='checkbox']:checked").length==1){
			element=$("input:checked").attr("id");
		}
		var temp = element.split("@");
		var id = temp[1];
		var organId = temp[8];
		var url;
		
		url=bspAppPath+"service/bsp/organHelp?isChkbox=0&selType=1&struType=00&showableType=1";
		url = url + "&userId=" + loginUserId;
		
		$.dialog({
			type: 'iframe',
			url: url,
			title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip16","选择单位"),
			width: 300,
			height: 400,
			onclose: function(){
				var node = this.returnValue;
				var organNames,organIds,struIds,organTypes;
				if(typeof node!='string'){
					if(node.length>0){
						organName=node[0].organName;
						organId=node[0].organId;
						var cmd = new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
						cmd.setParameter("organId", organId);
						cmd.setParameter("procDefUniqueId", id);
						cmd.execute("updateOrgan");
						if (!cmd.error) {
							UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip17","修改所属单位成功！"));
						} else {
							UIAlert(cmd.error.msg);
						}
						reload();
					}
				}
			}
		});
		
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip12","请选择一条记录！"));
	}
}

//修改流程类型
function updateProcessType(element) {
	if($("input[name='checkbox']:checked").length==1 || element){
		var element=$("input:checked").attr("id");
		var temp = element.split("@");
		var processDefUniqueId = temp[1];
		$.dialog({
	        type: 'iframe',
	        url: "../processtype/queryhelp.jsp",
	        title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip18",'修改流程类型'),
	        width: 600,
	        height: 440,
			 onclose: function () {
				 	if(this.returnValue != ""){
						ret=(this.returnValue);
					}
					if(ret.flag){
						var command = new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
						command.setParameter("processType",ret.data);
						command.setParameter("processDefUniqueId",processDefUniqueId);
						command.execute("updateProcessType");
						if (!command.error) {
							UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip19","保存成功！"))
						} else {
							UIAert(command.error);
						}
						reload(); 
					}else{
						return;
					}
			 }
		});
	}else {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip12","请选择一条记录！"));
	}
}

//选择单位，根据所属单位进行过滤
function selectCorp(txtCorp){

	url=bspAppPath+"service/bsp/organHelp?isChkbox=1&selType=1&struType=00&showableType=1";
	url = url + "&userId=" + loginUserId;
	
	$.dialog({
		type: 'iframe',
		url: url,
		title: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip16","选择单位"),
		width: 300,
		height: 400,
		onclose: function(){
			var node = this.returnValue;
			var organNames,organIds,struIds,organTypes;
			if(typeof node!='string'){
				if(node.length>0){
					organNames=node[0].organName;
					organIds=node[0].organId;
					if(node.length>1){
						$.each(node,function(i,n){
							if(i>0){
								organNames=organNames+","+n["organName"];
								organIds=organIds+","+n["organId"];
							}
						});
					}
					txtCorp.value=organNames;
					txtCorp.text=organIds;
				}else{
					txtCorp.value="";
					txtCorp.text="";
				}
			}
		}
	});
	
}

//导出流程定义
function processExport(element) {
	if($("input:checked").length<1){
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip20","请选择要导出的记录!"));
		return false;
	}else if($("input:checked").length>1){
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip12","请选择一条记录!"));
		return false;
	}else{
		var element=$("input:checked").attr("id");
		var temp = element.split("@");
		var procModelDefUniqueId = temp[1];
		
	        $.dialog({
	            type: 'confirm',
	            content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip21",'确定要导出选中的记录吗？'),
	            ok: function () {
					var url = L5.webPath + 
					  "/command/dispatcher/org.loushang.workflow.infoprocessmodel.exchange.cmd.InfoProcessDefModelExportCmd/exportProcDef";
					url = url + "?procModelDefUniqueId="+ procModelDefUniqueId;
					window.location.href = url;
	            },
	            cancel: function () {}
	        });
	}
}


//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_DEF_BUTTON_CONF_SET_PROC_TYPE");
	command.execute();
	procTypeEnum = command.getData();
}
//是否设置流程类型
function getProcTypeEnum(Id) {
	for(index in procTypeEnum) {
		if(procTypeEnum[index].value == Id) {
			return procTypeEnum[index].text;
		}
	}
}

////////////////////////////////类别树   ////////////////////////////////////////////
/**
 * 初始化流程类别树
 */
function initTypeTree() {
	var procTypeTree = [];
	// 根节点
	var rootJson = {
			id:'-1', 
			name: m("BPM.INFOPROCESSMODEL.D216", "流程类别树"), 
			isParent: true,
			iconSkin:"icon01",
			isRoot: true
	}; 
	procTypeTree.push(rootJson);
	
	// ztree设置
	var treeSetting = {
		edit : {
			enable : true,
		},
		data : {
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey: "parentId",
				rootPId: null
			}
		},
		async : {
			enable : true,
			url : context + "/command/dispatcher/"
					+ "org.loushang.workflow.processtype.cmd.ProcessTypeDispatcherCmd/"
					+ "getProcessTypes",
			autoParam : [ "id" ],
			dataFilter : dataFilter
		},
		callback : {
			onClick: onClick
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		view : {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom
		}
	};
	
	// 初始化流程类别树
	var tree = $.fn.zTree.init($("#procTypeTree"), treeSetting, procTypeTree);
	// 打开根节点
	tree.expandNode(tree.getNodes()[0],true,false,true);
}

// 鼠标悬停在节点上时，添加操作按钮
function addHoverDom(treeId, treeNode) {
	// “增加”按钮
	addNewBtn(treeId, treeNode);
	
	// 根节点只显示“增加”按钮
	if(treeNode.isRoot){
		return;
	}
	
	// “修改”按钮
	addModifyBtn(treeId, treeNode);
	// “删除”按钮
	addDelBtn(treeId, treeNode);
};

// 添加“增加”按钮
function addNewBtn(treeId, treeNode){
	// 组装“增加”按钮的id
	var newBtnId = treeNode.tId + "_new";
	if ($("#"+newBtnId).length>0) {
		return;
	}
	
	var addStr = "<span id='"+newBtnId+"' class='button add' title='"+m("BPM.INFOPROCESSMODEL.D221", "增加类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(addStr);
	
	// 绑定事件
	$("#"+newBtnId).bind("click", function(){
		var parentName = treeNode.name;
		var parentId　= treeNode.id;
		var level = treeNode.level+1;
		$.dialog({
			type: "iframe",
			url: "../processtype/addprocesstype.jsp?parentName=" + parentName + "&parentId=" + parentId + "&level=" + level + "&status=new",
			title: m("BPM.INFOPROCESSMODEL.D221", "增加类别"),
			width: 500,
			height: 300,
			onclose: function () {
				var returnVal = this.returnValue;
				// 在树中添加节点
				if(returnVal) {
					sticky(m("BPM.INFOPROCESSMODEL.Tip19", "保存成功!"));
					var newNode = {
							id: returnVal.typeId,
							name: returnVal.typeName
					}
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.addNodes(treeNode, newNode);
				}
			}
		});

	});
}

// “修改”按钮
function addModifyBtn(treeId, treeNode){
	// 组装“修改”按钮的id
	var editBtnId = treeNode.tId + "_edit";
	if ($("#"+editBtnId).length>0) {
		return;
	}
	
	var editBtn = "<span id='"+editBtnId+"' class='button edit' title='"+m("BPM.INFOPROCESSMODEL.D220", "修改类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(editBtn);
	
	// 绑定事件
	$("#"+editBtnId).bind("click", function(){
		// 获取节点信息
		var typeId = treeNode.id;
		var parentName = treeNode.getParentNode().name;
		$.dialog({
			type: "iframe",
			url: "../processtype/addprocesstype.jsp?status=edit" + "&typeId=" + typeId + "&parentName=" + parentName,
			title: m("BPM.INFOPROCESSMODEL.D220", "修改类别"),
			width: 500,
			height: 260,
			onclose: function () {
				var returnVal = this.returnValue;				
				// 修改树中的节点信息
				if(returnVal) {
					sticky(m("BPM.INFOPROCESSMODEL.Tip19", "保存成功!"));
					treeNode.name = returnVal.typeName;
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.updateNode(treeNode, false);
				}
			}
		});
	})
}

// “删除”按钮
function addDelBtn(treeId, treeNode){
	// 组装“删除”按钮的id
	var delBtnId = treeNode.tId + "_remove";
	if ($("#"+delBtnId).length>0) {
		return;
	}
	
	var delBtn = "<span id='"+delBtnId+"' class='button remove' title='"+m("BPM.INFOPROCESSMODEL.D219", "删除类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(delBtn);
	
	// 绑定事件
	$("#"+delBtnId).bind("click", function(){
		var typeId = treeNode.id;
		
		var command = new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelQueryCmd");
		command.setParameter("PROCESS_TYPE", typeId);
		command.setParameter("start", 0);
		command.setParameter("limit", 10);
		command.execute("execute");
		if(command.returns.rows.length >0){
			UIAlert(m("BPM.INFOPROCESSMODEL.D217", "该类别下有流程，不能删除！"));
			return false;
		}
		
		var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeQueryCmd");
		command.setParameter("PARENT_ID", typeId);
		command.execute("execute");
		if(command.returns.rows.length >0){
			UIAlert(m("BPM.INFOPROCESSMODEL.D218", "该类别下有子类别，不能删除！"));
			return false;
		}
		
		$.dialog({
			type: "confirm",
			content: m("BPM.INFOPROCESSMODEL.Tip1", "确定要删除选中记录吗？"),
			autofocus: true,
			ok: function(){
				var command = new L5.Command("org.loushang.workflow.processtype.cmd.ProcessTypeCmd");
				command.setParameter("id", typeId);
				command.execute("delete");
				if(command.error){
					UIAlert(command.error.message);
				}else{
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.removeNode(treeNode);
					sticky(m("BPM.INFOPROCESSMODEL.Tip2", "删除成功！"));
				}
			},
			cancel: function(){}
		});
		
	})
}

// 鼠标离开节点时。
function removeHoverDom(treeId, treeNode) {
	// 移除操作按钮
	$("#"+treeNode.tId + "_new").unbind().remove();
	$("#"+treeNode.tId + "_remove").unbind().remove();
	$("#"+treeNode.tId + "_edit").unbind().remove();
}

// 当前选中的树节点。
var curRecord;

/**
 * 表单类别树数据过滤
 * 
 * @param treeId
 * @param parentNode
 * @param childNodes
 * @returns
 */
function dataFilter(treeId, parentNode, childNodes) {
	return childNodes;
}

/**
 * 单击节点，查询该类别下的表单
 * @param e
 * @param treeId
 * @param treeNode
 */
function onClick(e,treeId, treeNode) {
	// 记录当前选中的节点。
	curRecord = treeNode;
	
/*	// 清空查询条件。
	$("#formName").val(null);*/
	
	// 重新加载数据。
	$("#procList").DataTable().ajax.reload();
}
