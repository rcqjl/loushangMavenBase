var dyparameter={};
var isSetForm=false;
var hasProcUrl=false;
$(function(){
	if(WFormProcess.formId&&WFormProcess.formId!=""){
		$("#procFormName input").val(WFormProcess.formName);
		$("#procFormName input").attr("id",WFormProcess.formId);
	}
	if(WFormProcess.isSetLocal){
		$("#procOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}
	$("#divProcessformPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divProcessformPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#procFormName select").bind("change",function(){
		var formInfo={"formId":$(this).val(), "formName":$(this).find("option:selected").text()};
		updateProcFormData(formInfo);
	});
	$("#procDaiBan select").bind("change",function(){
		var daiBanTaskInfo={"reqId":$(this).val(), "reqName":$(this).find("option:selected").text()};
		updateProcTaskRequest(daiBanTaskInfo, "daiban");
	});
	$("#procYiBan select").bind("change",function(){
		var yiBanTaskInfo={"reqId":$(this).val(), "reqName":$(this).find("option:selected").text()};
		updateProcTaskRequest(yiBanTaskInfo, "yiban");
	});
	$("#localOptBtn").click(function(){
		var formId=$("#procFormName > select").val();
		if(formId){
			$.ajax({
				type:"POST",
				url: WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
				+ "getButtonList",
				data:{
					"formId":formId,
					"deviceType":"0"
				},
				dataType:"json",
				async:false,
				success:function (data){
					if(data[0] && data[0].btnList.length>0){
						var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/localopt.jsp";
						var param={"show":false,"FormProcess":WFormProcess, btnList:data};
						showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C021","选择操作"), url, 550, 502,param, afterCloseLocalOpt);
					}else{
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C033","未注册表单按钮！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}			
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
		}else{
			switchProcTab("procTab1","procCon1");
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C034","请先设置表单!"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
		}
	});
	function afterCloseLocalOpt(ret){
		if(ret){
			var txtDaiban="";
			var txtYiban="";
			var txtBanjie="";
			var addDaiban={};
			var addYiban={};
			var addBanjie={};
			var delDaiban={};
			var delYiban={};
			var delBanjie={};
			if(WFormProcess.buttons){
				var btnList=WFormProcess.buttons.childList;
				for(var n in btnList){
					delDaiban[btnList[n].id]=btnList[n];
				}
			}
			if(WFormProcess.yibanButtons){
				var btnList=WFormProcess.yibanButtons.childList;
				for(var n in btnList){
					delYiban[btnList[n].id]=btnList[n];
				}
			}
			if(WFormProcess.endButtons){
				var btnList=WFormProcess.endButtons.childList;
				for(var n in btnList){
					delBanjie[btnList[n].id]=btnList[n];
				}
			}

			var daiban=ret.daiban;
			WFormProcess.buttons.childList={};
			for(var n in daiban){
				var action=new WFormButton();
				action.id=daiban[n].id;
				action.name=daiban[n].name;
				action.funName=daiban[n].funName;
				action.description=daiban[n].description;
				action.order=daiban[n].order;
				WFormProcess.buttons.childList[n]=action;
				txtDaiban+=action.name+";";
				if(delDaiban[daiban[n].id]){
					delete delDaiban[daiban[n].id];
				}else{
					addDaiban[daiban[n].id]=daiban[n];
				}
			}
			var yiban=ret.yiban;
			WFormProcess.yibanButtons.childList={};
			for(var n in yiban){
				var action=new WFormButton();
				action.id=yiban[n].id;
				action.name=yiban[n].name;
				action.funName=yiban[n].funName;
				action.description=yiban[n].description;
				action.order=yiban[n].order;
				WFormProcess.yibanButtons.childList[n]=action;
				txtYiban+=action.name+";";
				if(delYiban[yiban[n].id]){
					delete delYiban[yiban[n].id];
				}else{
					addYiban[yiban[n].id]=yiban[n];
				}
			}
			var banjie=ret.banjie;
			WFormProcess.endButtons.childList={};
			for(var n in banjie){
				var action=new WFormButton();
				action.id=banjie[n].id;
				action.name=banjie[n].name;
				action.funName=banjie[n].funName;
				action.description=banjie[n].description;
				action.order=banjie[n].order;
				WFormProcess.endButtons.childList[n]=action;
				txtBanjie+=action.name+";";
				if(delBanjie[banjie[n].id]){
					delete delBanjie[banjie[n].id];
				}else{
					addBanjie[banjie[n].id]=banjie[n];
				}
			}
			if(daiban[0] || yiban[0] || banjie[0]){
				WFormProcess.isSetLocal=true;
				$("#procOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
			}else{
				WFormProcess.isSetLocal=false;
				$("#procOpt input[type='text']").val("");
			}
			var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/actsyn.jsp";
			var flag=false;
			var updateBtn=function(activity, daibansyn, yibansyn, endsyn){
				if(daibansyn){
					if(!activity.buttons){
						activity.buttons=new WFormButtons();
					}
					var actBtns={};
					var tmpBtns=activity.buttons.childList;
					for(var m in tmpBtns){
						actBtns[tmpBtns[m].id]=tmpBtns[m];
					}
					for(var key1 in addDaiban){
						actBtns[key1]=addDaiban[key1];
					}
					for(var key2 in delDaiban){
						delete actBtns[key2];
					}
					var num=0;
					activity.buttons.childList={};
					for(var key in actBtns){
						var action=new WFormButton();
						action.id=actBtns[key].id;
						action.name=actBtns[key].name;
						action.funName=actBtns[key].funName;
						action.description=actBtns[key].description;
						action.order=actBtns[key].order;
						activity.buttons.childList[num++]=action;
						activity.isSetLocal=true;
					}
				}
				if(yibansyn){
					if(!activity.yibanButtons){
						activity.yibanButtons=new WFormYiBanButtons();
					}
					var actBtns={};
					var tmpBtns=activity.yibanButtons.childList;
					for(var m in tmpBtns){
						actBtns[tmpBtns[m].id]=tmpBtns[m];
					}
					for(var key1 in addYiban){
						actBtns[key1]=addYiban[key1];
					}
					for(var key2 in delYiban){
						delete actBtns[key2];
					}
					var num=0;
					activity.yibanButtons.childList={};
					for(var key in actBtns){
						var action=new WFormButton();
						action.id=actBtns[key].id;
						action.name=actBtns[key].name;
						action.funName=actBtns[key].funName;
						action.description=actBtns[key].description;
						action.order=actBtns[key].order;
						activity.yibanButtons.childList[num++]=action;
						activity.isSetLocal=true;
					}
				}
				if(endsyn){
					if(!activity.endButtons){
						activity.endButtons=new WFormEndButtons();
					}
					var actBtns={};
					var tmpBtns=activity.endButtons.childList;
					for(var m in tmpBtns){
						actBtns[tmpBtns[m].id]=tmpBtns[m];
					}
					for(var key1 in addBanjie){
						actBtns[key1]=addBanjie[key1];
					}
					for(var key2 in delBanjie){
						delete actBtns[key2];
					}
					var num=0;
					activity.endButtons.childList={};
					for(var key in actBtns){
						var action=new WFormButton();
						action.id=actBtns[key].id;
						action.name=actBtns[key].name;
						action.funName=actBtns[key].funName;
						action.description=actBtns[key].description;
						action.order=actBtns[key].order;
						activity.endButtons.childList[num++]=action;
						activity.isSetLocal=true;
					}
				}
			}
			var synActivities={};
			var defaultSynActivities={};
			for(var n in WFormModel.process.activities.childList){
				var act=WFormModel.process.activities.childList[n];
				if(act.formId==WFormProcess.formId){
					if(act.isSetLocal){
						synActivities[act.id]=act;
						flag=true;
					}else{
						defaultSynActivities[act.id]=act;
					}
				}
			}
			for(var id in defaultSynActivities){
				updateBtn(defaultSynActivities[id], true, true, true);
			}
			var afterSyn=function(backdata){
				for(var n in backdata){
					var bd=backdata[n];
					var activity=synActivities[bd.id];
					updateBtn(synActivities[bd.id], bd.daibansyn, bd.yibansyn, bd.endsyn);
				}
			}
			var param={activities:synActivities, procDaiban:txtDaiban, procYiBan:txtYiban, procBanjie:txtBanjie};
			if(flag)
				showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C035","选择需要同步的环节"), url, 650, 500,param, afterSyn);
		}
	}
	$("#dynapara").click(function(){
		var formName=$("#procFormName > select").val();
		if(formName){
			var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/dynamicpara.jsp";
			dyparameter={};
			if(WFormProcess.taskParameters){
				var taskParameters=WFormProcess.taskParameters.childList;
				for(var key in taskParameters){
					dyparameter[key]=taskParameters[key].value;
				}
			}
			var param={"dyparameter":dyparameter};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C017","设置动态参数"), url, 380, 360,param, aftDynapara1);
		}else{
			switchProcTab("procTab1","procCon1");
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C034","请先设置表单！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
		}
		
		function aftDynapara1(backdata){
			if(backdata){
				if(!WFormProcess.taskParameters){
					WFormProcess.taskParameters=new WFormTaskParameters();
				}
				WFormProcess.taskParameters.childList={};
				var taskParameters=WFormProcess.taskParameters.childList;
				var textValue="";
				var addList={};
				var para;
				for(var n in backdata){
					textValue+=backdata[n].key+"-"+backdata[n].value+";";
					WFlow.setDataObject(backdata[n].value);
					para=new WFormParameter();
					para.key=backdata[n].key;
					para.value=backdata[n].value;
					taskParameters[para.key]=para;
					if(!dyparameter[para.key]){
						addList[para.key]=para;
					}else{
						delete dyparameter[para.key];
					}
				}
				updateActDynamicParam(addList, dyparameter);
				if(textValue==""){
					delete WFormProcess.taskParameters;
				}else{
					textValue=textValue.substring(0,textValue.length-1);
				}
				$("#procDynamicParam input:text").val(textValue);
				$("#procDynamicParam input:text").attr("title",textValue);
			}
		}
		function updateActDynamicParam(addList, delList){
			var activities=WFormProcess.activities.childList;
			for(var n in activities){
				if(!activities[n].taskParameters){
					activities[n].taskParameters=new WFormTaskParameters();
					activities[n].taskParameters.childList={};
				}
				var taskParameters=activities[n].taskParameters.childList;
				var para;
				for(var key1 in addList){
					para=new WFormParameter();
					para.key=key1;
					para.value=addList[key1].value;
					taskParameters[para.key]=para;
				}
				for(var key2 in delList){
					delete taskParameters[key2];
				}
			}
		}
	});
	
	var initFormData=function(){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.JspProcessDefUtil/queryJspForms",
			data:{
				"start":0,
				"limit":10000
			},
			dataType:"json",
			async:false,
			success:function (data){
				if(data.errMessage){
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}else{
					var showForm=function(data){
						var formData=data.form;
						for(var id in formData){
								var node=formData[id];
								var option=$("<option></option>").val(node.formId).text(node.formName);
								$("#procFormName select").append(option);
						}
					}
					if(data.form.length>0){
						isSetForm=true;
						showForm(data);
					}else{
						if(!WForm.parameter["procDefUniqueId"])
							showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C075","未注册自开发表单，请注册！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	};
	initFormData();
	WForm.initFormProcData();
});
function switchTab(ProTag, ProBox) {
	$("#divActivityFormPropertyBody #"+ProTag+" a").addClass("on");
	$("#divActivityFormPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
	$("#divActivityFormPropertyBody #"+ProBox).show();
	$("#divActivityFormPropertyBody .con:not('#"+ProBox+"')").hide();
}
function switchProcTab(ProTag, ProBox) {
	$("#divProcessFormPropertyBody #"+ProTag+" a").addClass("on");
	$("#divProcessFormPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
	$("#divProcessFormPropertyBody #"+ProBox).show();
	$("#divProcessFormPropertyBody .procCon:not('#"+ProBox+"')").hide();
}
WForm.initFormProcData=function(){
	if(!isSetForm)
		return false;
	if(WFormProcess.isSetForm){
		$("#procFormName select").val(WFormProcess.formId);
	}else{
		WFormProcess.formId=$("#procFormName select").val();
		WFormProcess.formName=$("#procFormName select").find("option:selected").text();
		WFlow.setDataObject(WFormProcess.processSubject);
	}
	initTaskRequest();
	var daibanflag=false;
	var yibanflag=false;
	if(WFormProcess.taskRequests){
		var taskRequests=WFormProcess.taskRequests.childList;
		if(taskRequests["daiban"]){
			$("#procDaiBan select").val(taskRequests["daiban"].requestId);
			daibanflag=true;
		}
		if(taskRequests["yiban"]){
			$("#procYiBan select").val(taskRequests["yiban"].requestId);
			yibanflag=true;
		}
	}
	if(!daibanflag){
		setProcTaskRequest("daiban");
	}
	if(!yibanflag){
		setProcTaskRequest("yiban");
		setProcTaskRequest("finish");
	}
	if(WFormProcess.isSetPara){
		if(WFormProcess.taskParameters){
			var paras=WFormProcess.taskParameters.childList;
			var textValue="";
			for(var  n in paras){
				textValue+=paras[n].key+"-"+paras[n].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#procDynamicParam input[type='text']").val(textValue);
			$("#procDynamicParam input[type='text']").attr("title",textValue);
		}
	}else{
		$("#procDynamicParam input[type='text']").val("dataId-dataId");
		$("#procDynamicParam input[type='text']").attr("title","dataId-dataId");
		var process=WFormProcess;
		WFormProcess.taskParameters=new WFormTaskParameters();
		WFormProcess.taskParameters.childList={};
		var para=new WFormParameter();
		para.key="dataId";
		para.value="dataId";
		WFormProcess.taskParameters.childList["dataId"]=para;
		WFlow.setDataObject("dataId");
		WFormProcess.isSetPara=true;
	}
	if(!WFormProcess.isSetForm){
		updateActForm();
	}
	WFormProcess.isSetForm=true;
}
function initTaskRequest(){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+ "org.loushang.workflow.modeling.definition.htmlutil.JspProcessDefUtil/getTaskRequestsList",
		data:{
			"formId":WFormProcess.formId
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}else{
				showProcTaskRequest(data);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
		}
	});
}
function showProcTaskRequest(data){
	$("#procDaiBan select").empty();
	$("#procYiBan select").empty();
	if(!data || !data.taskUrlList ||data.taskUrlList.length==0){
		return false;
	}
	hasProcUrl=true;
	var taskUrlList=data.taskUrlList;
	for(var id in taskUrlList){
		var node=taskUrlList[id];
		var daiBanOption=$("<option></option>").val(node.reqId).text(node.reqName);
		$("#procDaiBan select").append(daiBanOption);
		var yiBanOption=$("<option></option>").val(node.reqId).text(node.reqName);
		$("#procYiBan select").append(yiBanOption);
	}
}
function updateProcFormData(){
		WFormProcess.formId=$("#procFormName select").val();
		WFormProcess.formName=$("#procFormName select").find("option:selected").text();
		initTaskRequest();
		setProcTaskRequest("daiban");
		setProcTaskRequest("yiban");
		setProcTaskRequest("finish");
		WFormProcess.isSetLocal=false;
		delete WFormProcess.buttons;
		delete WFormProcess.yibanButtons;
		delete WFormProcess.endButtons;
		$("#procOpt input[type='text']").val("");
		updateActForm();
}
function updateProcTaskRequest(taskInfo, type){
	var procTaskRequests=WFormProcess.taskRequests.childList;
	var proTaskRequest=new WFormTaskRequest();
	proTaskRequest.typeId=type;
	proTaskRequest.requestId=taskInfo.reqId;
	proTaskRequest.requestName=taskInfo.reqName;
	procTaskRequests[type]=proTaskRequest;
	if(type=="yiban"){
		var procEndTaskRequest=new WFormTaskRequest();
		procEndTaskRequest.typeId="finish";
		procEndTaskRequest.requestId=taskInfo.reqId;
		procEndTaskRequest.requestName=taskInfo.reqName;
		procTaskRequests["finish"]=procEndTaskRequest;
	}
	updateProcActTaskRequest(taskInfo, type);
}
function updateProcActTaskRequest(taskInfo, type){
	var activities=WFormProcess.activities.childList;
	var act=new Array();
	var index=0;
	for(var n in activities){
		if(activities[n].formId==WFormProcess.formId){
			var taskRequests=activities[n].taskRequests.childList;
			if(taskRequests[type].requestId!=taskInfo.reqId){
				act.push(activities[n]);
			}
		}
	}
	function dealTaskRequest(){
		if(index==act.length)
			return false;
		showConfirm(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C036","是否将变化同步到")+act[index].name+"?", taskConfirmClick, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300, false,taskCancelClick);
	}
	function taskConfirmClick(){
		var taskRequests=act[index].taskRequests.childList;
		var taskRequest=new WFormTaskRequest();
		taskRequest.typeId=type;
		taskRequest.requestId=taskInfo.reqId;
		taskRequest.requestName=taskInfo.reqName;
		taskRequests[type]=taskRequest;
		if(type=="yiban"){
			var endTaskRequest=new WFormTaskRequest();
			endTaskRequest.typeId="finish";
			endTaskRequest.requestId=taskInfo.reqId;
			endTaskRequest.requestName=taskInfo.reqName;
			taskRequests["finish"]=endTaskRequest;
		}
		index++;
		dealTaskRequest();
	}
	function taskCancelClick(){
		index++;
		dealTaskRequest();
	}
	dealTaskRequest();
}
function setProcTaskRequest(taskType){
	if(!hasProcUrl)
		return ;
	if(!WFormProcess.taskRequests){
		WFormProcess.taskRequests=new WFormTaskRequests();
		WFormProcess.taskRequests.init();
	}
	var procTaskRequests=WFormProcess.taskRequests.childList;
	var procRequest=new WFormTaskRequest();
	procRequest.typeId=taskType;
	if(taskType=="daiban"){
		procRequest.requestId=$("#procDaiBan select").val();
		procRequest.requestName=$("#procDaiBan select").find("option:selected").text();
	}else if(taskType=="yiban" || taskType=="finish"){
		procRequest.requestId=$("#procYiBan select").val();
		procRequest.requestName=$("#procYiBan select").find("option:selected").text();
	}
	procTaskRequests[taskType]=procRequest;
}
function setProcActTaskRequest(activity){
	if(!hasProcUrl)
		return ;
	var procTaskRequests=WFormProcess.taskRequests.childList;
	if(!activity.taskRequests){
		activity.taskRequests=new WFormTaskRequests();
		activity.taskRequests.childList={};
	}
	var taskRequests=activity.taskRequests.childList;
	if(activity.isStart){
		var newTaskRequest=new WFormTaskRequest();
		newTaskRequest.typeId="new";
		newTaskRequest.requestId=procTaskRequests["daiban"].requestId;
		newTaskRequest.requestName=procTaskRequests["daiban"].requestName;
		taskRequests["new"]=newTaskRequest;
	}else{
		delete taskRequests["new"];
	}
	var daibanRequest=new WFormTaskRequest();
	daibanRequest.typeId="daiban";
	daibanRequest.requestId=procTaskRequests["daiban"].requestId;
	daibanRequest.requestName=procTaskRequests["daiban"].requestName;
	taskRequests["daiban"]=daibanRequest;
	var yibanRequest=new WFormTaskRequest();
	yibanRequest.typeId="yiban";
	yibanRequest.requestId=procTaskRequests["yiban"].requestId;
	yibanRequest.requestName=procTaskRequests["yiban"].requestName;
	taskRequests["yiban"]=yibanRequest;
	var endRequest=new WFormTaskRequest();
	endRequest.typeId="finish";
	endRequest.requestId=procTaskRequests["finish"].requestId;
	endRequest.requestName=procTaskRequests["finish"].requestName;
	taskRequests["finish"]=endRequest;
}
function updateActForm(){
	var act=new Array();
	var actleng=0;
	var index=0;
	var activities=WFormProcess.activities.childList;
	for(var n in activities){
		var activity=activities[n];
		if(!activity.isSetForm){
			activity.formId=WFormProcess.formId;
			activity.formName=WFormProcess.formName;
			activity.isSetForm=true;
			setProcActTaskRequest(activity);
		}else{
			if(activity.formId!=WFormProcess.formId){
				act.push(activity);
			}
		}	
	}
	actleng=act.length;
	function dealAct(){
		if(index==actleng)
			return false;
		showConfirm(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C036","是否将变化同步到")+act[index].name+"?", confirmclick, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300, false,cancelclick);
	}
	function confirmclick(){
		act[index].formId=WFormProcess.formId;
		act[index].formName=WFormProcess.formName;
		act[index].isSetForm=true;
		setProcActTaskRequest(act[index]);
		delete act[index].buttons;
		delete act[index].newButtons;
		delete act[index].yibanButtons;
		delete act[index].endButtons;
		delete act[index].fields;
		act[index].isSetLocal=false;
		act[index].isSetAuth=false;
		delete act[index].phoneForm;
		delete act[index].padForm;
		index++;
		dealAct();
	}
	function cancelclick(){
		index++;
		dealAct();
	}
	dealAct();
}