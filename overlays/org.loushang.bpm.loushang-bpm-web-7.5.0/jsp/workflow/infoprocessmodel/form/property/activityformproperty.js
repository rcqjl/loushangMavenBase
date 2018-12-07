var formActivity;
var hasActUrl=false;
$(function(){
	$("#divActivityformPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divActivityformPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#actFormName select").bind("change",function(){
		formActivity.formId=$(this).val();
		formActivity.formName=$(this).find("option:selected").text();
		formActivity.isSetForm=true;
		initActTaskRequest();
		updateActTaskRequest();
		delete formActivity.buttons;
		delete formActivity.newButtons;
		delete formActivity.yibanButtons;
		delete formActivity.endButtons;
		formActivity.isSetLocal=false;
		$("#actOpt input[type='text']").val("");
		delete formActivity.fields;
		formActivity.isSetAuth=false;
		$("#actAuth input[type='text']").val("");
		delete formActivity.phoneForm;
		$("#actPhoneOpt input[type='text']").val("");
		$("#actPhoneAuth input[type='text']").val("");
		delete formActivity.padForm;
		$("#actPadOpt input[type='text']").val("");
		$("#actPadAuth input[type='text']").val("");
	});
	function updateActTaskRequest(){
		if(WForm.isStart){
			var newTaskRequestInfo={"reqId":$("#actNewTask select").val(), "reqName":$("#actNewTask select").find("option:selected").text()};
			updateActTaskRequestModel(newTaskRequestInfo, "new");
		}
		var daiTaskRequestInfo={"reqId":$("#actDaiBan select").val(), "reqName":$("#actDaiBan select").find("option:selected").text()};
		updateActTaskRequestModel(daiTaskRequestInfo, "daiban");
		var yiTaskRequestInfo={"reqId":$("#actYiBan select").val(), "reqName":$("#actYiBan select").find("option:selected").text()};		
		updateActTaskRequestModel(yiTaskRequestInfo, "yiban");
		updateActTaskRequestModel(yiTaskRequestInfo, "finish");
	}
	$("#actNewTask select").bind("change",function(){
		var taskRequestInfo={"reqId":$(this).val(), "reqName":$(this).find("option:selected").text()};
		updateActTaskRequestModel(taskRequestInfo, "new");
	});
	$("#actDaiBan select").bind("change",function(){
		var taskRequestInfo={"reqId":$(this).val(), "reqName":$(this).find("option:selected").text()};
		updateActTaskRequestModel(taskRequestInfo, "daiban");
	});
	$("#actYiBan select").bind("change",function(){
		var taskRequestInfo={"reqId":$(this).val(), "reqName":$(this).find("option:selected").text()};
		updateActTaskRequestModel(taskRequestInfo, "yiban");
		updateActTaskRequestModel(taskRequestInfo, "finish");
	});
	$("#actOptBtn, #actPhoneOptBtn, #actPadOptBtn").bind("click",function(){
		var formType=$(this).attr("id");
		formType=formType.substring(0, formType.length-3);
		var deviceType="0";
		if(formType=="actPhoneOpt"){
			deviceType="1";
		}else if(formType=="actPadOpt"){
			deviceType="2";
		}
		var formId=$("#actFormName > select").val();
		if(formId){
			$.ajax({
				type:"POST",
				url: WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
				+ "getButtonList",
				data:{
					"formId":formId,
					"deviceType":deviceType
				},
				dataType:"json",
				async:false,
				success:function (data){
					if(data[0] && data[0].btnList.length>0){
						var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/localopt.jsp";
						var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
						var localOpts=null;
						if(formType=="actOpt"){//PC表单
							localOpts=activity;
						}else if(formType=="actPhoneOpt"){//Phone表单
							if(activity.phoneForm==null){
								activity.phoneForm=new WFormPhoneForm();
							}
							localOpts=activity.phoneForm;
						}else{//Pad表单
							if(activity.padForm==null){
								activity.padForm=new WFormPadForm();
							}
							localOpts=activity.padForm;						
						}
						
						var param={"show":true,"localOpts":localOpts,"formType":formType,btnList:data};
						showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C021","选择操作"), url, 550, 502,param, afterCloseLocalOpt);
					}else{
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C020","未注册表单按钮！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
		}else{
			switchTab('tab1','con1');
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C016","请先设置表单！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			return false;
		}
	});
	function afterCloseLocalOpt(ret){
		if(ret){
			var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
			var formHandle=activity;
			if(ret.formType=="actPhoneOpt"){
				formHandle=activity.phoneForm;
			}else if(ret.formType=="actPadOpt"){
				formHandle=activity.padForm;
			}
			var xinjian=ret.xinjian;
			formHandle.newButtons.childList={};
			for(var n in xinjian){
				var action=new WFormButton();
				action.id=xinjian[n].id;
				action.name=xinjian[n].name;
				action.funName=xinjian[n].funName;
				action.description=xinjian[n].description;
				action.order=xinjian[n].order;
				formHandle.newButtons.childList[n]=action;
			}
			var daiban=ret.daiban;
			formHandle.buttons.childList={};
			for(var n in daiban){
				var action=new WFormButton();
				action.id=daiban[n].id;
				action.name=daiban[n].name;
				action.funName=daiban[n].funName;
				action.description=daiban[n].description;
				action.order=daiban[n].order;
				formHandle.buttons.childList[n]=action;
			}
			var yiban=ret.yiban;
			formHandle.yibanButtons.childList={};
			for(var n in yiban){
				var action=new WFormButton();
				action.id=yiban[n].id;
				action.name=yiban[n].name;
				action.funName=yiban[n].funName;
				action.description=yiban[n].description;
				action.order=yiban[n].order;
				formHandle.yibanButtons.childList[n]=action;
			}
			var banjie=ret.banjie;
			formHandle.endButtons.childList={};
			for(var n in banjie){
				var action=new WFormButton();
				action.id=banjie[n].id;
				action.name=banjie[n].name;
				action.funName=banjie[n].funName;
				action.description=banjie[n].description;
				action.order=banjie[n].order;
				formHandle.endButtons.childList[n]=action;
			}
			if(xinjian[0] || daiban[0] || yiban[0] || banjie[0]){
				formHandle.isSetLocal=true;
				$("#"+ret.formType+" input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
			}else{
				formHandle.isSetLocal=false;
				$("#"+ret.formType+" input[type='text']").val("");
			}
		}
	}
	$("#actAuthBtn, #actPhoneAuthBtn, #actPadAuthBtn").bind("click",function(){
		var formType=$(this).attr("id");
		formType=formType.substring(0, formType.length-3);
		var deviceType="0";
		if(formType=="actPhoneAuth"){
			deviceType="1";
		}else if(formType=="actPadAuth"){
			deviceType="2";
		}
		var formName=$("#actFormName > select").val();
		if(formName){
			$.ajax({
				type : "POST",
				url : WFlow.fullWebPath
						+ "/command/dispatcher/"
						+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
						+ "getAuthList",
				data : {
					"formId" : formName,
					"deviceType" : deviceType
				},
				dataType : "json",
				async : false,
				success : function(data) {
					if(data && data.length>0){
						var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/formauth.jsp";
						var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
						var fields=activity.fields;
						if(formType=="actPhoneAuth"){
							if(activity.phoneForm==null){
								activity.phoneForm=new WFormPhoneForm();
							}
							fields=activity.phoneForm.fields;
						}else if(formType=="actPadAuth"){
							if(activity.padForm==null){
								activity.padForm=new WFormPadForm();
							}
							fields=activity.padForm.fields;
						}
						var param = {"fields":fields,'formId':formName, fieldList:data};
						// 打开子页面
						showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C019","设置域权限"), url, 570, 475,param, afterCloseFormAuth);
					}else{
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C018","未注册表单域！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
				},
				error : function() {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
		}else{
			switchTab('tab1','con1');
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C016","请先设置表单！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			return false;
		}
		// 子页面传给父页面的内容
		function afterCloseFormAuth(backData) {
			if(backData){
				var flag=false;
				for(var n in backData.childList){
					var field=backData.childList[n];
					if(field.isHidden || field.isReadOnly || field.isNotNull){
						flag=true;
						break;
					}
				}
				var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
				var formHandle=activity;
				if(formType=="actPhoneAuth"){
					formHandle=activity.phoneForm;
				}else if(formType=="actPadAuth"){
					formHandle=activity.padForm;
				}
				if(flag){
					formHandle.fields=backData;
					formHandle.isSetAuth=true;
					$("#"+formType+" input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
				}else{
					formHandle.isSetAuth=false;
					formHandle.fields=null;
					$("#"+formType+" input[type='text']").val("");
				}
			}
		}
	});
	
	$("#actDynapara").click(function(){
		var formName=$("#actFormName > select").val();
		if(formName){
			var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/form/view/dynamicpara.jsp";
			var dyparameter={};
			var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
			if(activity.taskParameters){
				var taskParameters=activity.taskParameters.childList;
				for(var key in taskParameters){
					dyparameter[key]=taskParameters[key].value;
				}
			}
			var param={"dyparameter":dyparameter};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C017","设置动态参数"), url, 380, 360,param, aftDynapara);
		}else{
			switchTab('tab1','con1');
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C016","请先设置表单！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
		}
		
		function aftDynapara(backdata){
			if(backdata){
				var activity=WFormProcess.activities.childList[WForm.parameter['selectedId']];				
				if(!activity.taskParameters){
					activity.taskParameters=new WFormTaskParameters();
				}
				activity.taskParameters.childList={};
				var taskParameters=activity.taskParameters.childList;
				var textValue="";
				var para;
				for(var n in backdata){
					textValue+=backdata[n].key+"-"+backdata[n].value+";";
					WFlow.setDataObject(backdata[n].value);
					para=new WFormParameter();
					para.key=backdata[n].key;
					para.value=backdata[n].value;
					taskParameters[para.key]=para;
				}
				if(textValue==""){
					delete activity.taskParameters;
				}else{
					textValue=textValue.substring(0,textValue.length-1);
				}
				$("#actDynamicParam input:text").val(textValue);
				$("#actDynamicParam input:text").attr("title",textValue);
			}
		}
	});
	
	function initActFormData(){
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
					showForm(data);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	function showForm(data){
		var formData=data.form;
		for(var id in formData){
				var node=formData[id];
				var option=$("<option></option>").val(node.formId).text(node.formName);
				$("#actFormName select").append(option);
		}
	}

	initActFormData();

	WForm.initFormActData();
});
function switchTab(ProTag, ProBox) {
		$("#divActivityFormPropertyBody #"+ProTag+" a").addClass("on");
		$("#divActivityFormPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
		$("#divActivityFormPropertyBody #"+ProBox).show();
		$("#divActivityFormPropertyBody .con:not('#"+ProBox+"')").hide();
}
function setActForm(){
	if(formActivity.isSetForm){
		$("#actFormName select").val(formActivity.formId);
	}else if(WFormProcess.isSetForm){
		$("#actFormName select").val(WFormProcess.formId);
		formActivity.formId=WFormProcess.formId;
		formActivity.formName=WFormProcess.formName;
		formActivity.isSetForm=true;
	}
}
function setActTaskRequest(){
	if(!hasActUrl)
		return ;
	if(!formActivity.taskRequests){
		formActivity.taskRequests=new WFormTaskRequests();
		formActivity.taskRequests.init();
	}
	var taskRequests=formActivity.taskRequests.childList;
	if(WForm.isStart){
		if(taskRequests["new"]){
			$("#actNewTask select").val(taskRequests["new"].requestId);
		}else{
			var taskNewRequest=new WFormTaskRequest();
			taskNewRequest.typeId="new";
			taskNewRequest.requestId=$("#actNewTask select").val();
			taskNewRequest.requestName=$("#actNewTask select").find("option:selected").text();
			taskRequests["new"]=taskNewRequest;
		}
	}else{
		delete taskRequests["new"]; 
	}
	if(taskRequests["daiban"]){
		$("#actDaiBan select").val(taskRequests["daiban"].requestId);
	}else{
		var taskDaiBanRequest=new WFormTaskRequest();
		taskDaiBanRequest.typeId="daiban";
		if(WFormProcess.formId==formActivity.formId){
			var procTaskRequests=WFormProcess.taskRequests.childList;
			taskDaiBanRequest.requestId=procTaskRequests["daiban"].requestId;
			taskDaiBanRequest.requestName=procTaskRequests["daiban"].requestName;
			$("#actDaiBan select").val(procTaskRequests["daiban"].requestId);
		}else{
			taskDaiBanRequest.requestId=$("#actDaiBan select").val();
			taskDaiBanRequest.requestName=$("#actDaiBan select").find("option:selected").text();
		}
		taskRequests["daiban"]=taskDaiBanRequest;
	}
	if(taskRequests["yiban"]){
		$("#actYiBan select").val(taskRequests["yiban"].requestId);
	}else{
		var taskYiBanRequest=new WFormTaskRequest();
		taskYiBanRequest.typeId="yiban";
		var taskEndBanRequest=new WFormTaskRequest();
		taskEndBanRequest.typeId="finish";
		if(WFormProcess.formId==formActivity.formId){
			var procTaskRequests=WFormProcess.taskRequests.childList;
			$("#actYiBan select").val(procTaskRequests["yiban"].requestId);
			taskYiBanRequest.requestId=procTaskRequests["yiban"].requestId;
			taskYiBanRequest.requestName=procTaskRequests["yiban"].requestName;
			taskEndBanRequest.requestId=procTaskRequests["finish"].requestId;
			taskEndBanRequest.requestName=procTaskRequests["finish"].requestName;
		}else{
			taskYiBanRequest.requestId=$("#actYiBan select").val();
			taskYiBanRequest.requestName=$("#actYiBan select").find("option:selected").text();
			taskEndBanRequest.requestId=$("#actYiBan select").val();
			taskEndBanRequest.requestName=$("#actYiBan select").find("option:selected").text();
		}
		taskRequests["yiban"]=taskYiBanRequest;
		taskRequests["finish"]=taskEndBanRequest;
	}
}
WForm.initFormActData=function(){
	if(WFormProcess.formId==null || WFormProcess.formId=="")
		return false;
	formActivity=WFormProcess.activities.childList[WForm.parameter['selectedId']];
	formActivity.isStart=WForm.isStart;
	setActForm();
	initActTaskRequest();
	setActTaskRequest();
	if(WForm.isStart){
		$("#actNewTask").show();
	}else{
		$("#actNewTask").hide();
	}
	if(formActivity.phoneForm!=null && formActivity.phoneForm.isSetLocal){
		$("#actPhoneOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actPhoneOpt input[type='text']").val("");
	}
	if(formActivity.padForm!=null && formActivity.padForm.isSetLocal){
		$("#actPadOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actPadOpt input[type='text']").val("");
	}
	if(formActivity.isSetLocal){
		if((formActivity.buttons&&formActivity.buttons.childList[0])||
				(formActivity.yibanButtons&&formActivity.yibanButtons.childList[0])||
				(formActivity.endButtons&&formActivity.endButtons.childList[0])){
			$("#actOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
		}else{
			$("#actOpt input[type='text']").val("");
		}
	}else if(WFormProcess.isSetLocal){
		if(WFormProcess.formId!=formActivity.formId){
			$("#actOpt input[type='text']").val("");
			return ;
		}
		var daiban=WFormProcess.buttons.childList;
		formActivity.buttons=new WFormButtons();
		formActivity.buttons.init();
		for(var n in daiban){
			var action=new WFormButton();
			action.id=daiban[n].id;
			action.name=daiban[n].name;
			action.funName=daiban[n].funName;
			action.description=daiban[n].description;
			action.order=daiban[n].order;
			formActivity.buttons.childList[n]=action;
		}
		var yiban=WFormProcess.yibanButtons.childList;
		formActivity.yibanButtons=new WFormYiBanButtons();
		formActivity.yibanButtons.init();
		for(var n in yiban){
			var action=new WFormButton();
			action.id=yiban[n].id;
			action.name=yiban[n].name;
			action.funName=yiban[n].funName;
			action.description=yiban[n].description;
			action.order=yiban[n].order;
			formActivity.yibanButtons.childList[n]=action;
		}
		var banjie=WFormProcess.endButtons.childList;
		formActivity.endButtons=new WFormEndButtons();
		formActivity.endButtons.init();
		for(var n in banjie){
			var action=new WFormButton();
			action.id=banjie[n].id;
			action.name=banjie[n].name;
			action.funName=banjie[n].funName;
			action.description=banjie[n].description;
			action.order=banjie[n].order;
			formActivity.endButtons.childList[n]=action;
		}
		formActivity.isSetLocal=true;
		$("#actOpt input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actOpt input[type='text']").val("");
	}
	if(formActivity.isSetAuth){
		$("#actAuth input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actAuth input[type='text']").val("");
	}
	if(formActivity.phoneForm!=null && formActivity.phoneForm.isSetAuth){
		$("#actPhoneAuth input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actPhoneAuth input[type='text']").val("");
	}
	if(formActivity.padForm!=null && formActivity.padForm.isSetAuth){
		$("#actPadAuth input[type='text']").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C015","已设置"));
	}else{
		$("#actPadAuth input[type='text']").val("");
	}
	if(formActivity.isSetPara){
		if(formActivity.taskParameters){
			var paras=formActivity.taskParameters.childList;
			var textValue="";
			for(var  n in paras){
					textValue+=paras[n].key+"-"+paras[n].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#actDynamicParam input[type='text']").val(textValue);
			$("#actDynamicParam input[type='text']").attr("title",textValue);
		}
	}else if(WFormModel.process){
		if(WFormModel.process.taskParameters){
			var taskParameters=WFormModel.process.taskParameters.childList;
			var textValue="";
			formActivity.taskParameters=new WFormTaskParameters();
			formActivity.taskParameters.childList={};
			var actTaskParameters=formActivity.taskParameters.childList;
			for(var key in taskParameters){
				var para=new WFormParameter();
				para.key=key;
				para.value=taskParameters[key].value;
				actTaskParameters[key]=para;
				textValue+=key+"-"+taskParameters[key].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#actDynamicParam input[type='text']").val(textValue);
			$("#actDynamicParam input[type='text']").attr("title",textValue);
			formActivity.isSetPara=true;
		}
	}else{
		$("#actDynamicParam input[type='text']").val("");
	}
}
function initActTaskRequest(){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+ "org.loushang.workflow.modeling.definition.htmlutil.JspProcessDefUtil/getTaskRequestsList",
		data:{
			"formId":formActivity.formId
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}else{
				$("#actNewTask select").empty();
				$("#actDaiBan select").empty();
				$("#actYiBan select").empty();
				if(!data || !data.taskUrlList || data.taskUrlList.length==0)
					return false;
				hasActUrl=true;
				var taskUrlList=data.taskUrlList;
				for(var id in taskUrlList){
					var node=taskUrlList[id];
					var newOption=$("<option></option>").val(node.reqId).text(node.reqName);
					$("#actNewTask select").append(newOption);
					var daiBanOption=$("<option></option>").val(node.reqId).text(node.reqName);
					$("#actDaiBan select").append(daiBanOption);
					var yiBanOption=$("<option></option>").val(node.reqId).text(node.reqName);
					$("#actYiBan select").append(yiBanOption);
				}
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
		}
	});
}
function updateActTaskRequestModel(taskRequestInfo, type){
	var taskRequests=formActivity.taskRequests.childList;
	var taskRequest=new WFormTaskRequest();
	taskRequest.typeId=type;
	taskRequest.requestId=taskRequestInfo.reqId;
	taskRequest.requestName=taskRequestInfo.reqName;
	taskRequests[type]=taskRequest;
}