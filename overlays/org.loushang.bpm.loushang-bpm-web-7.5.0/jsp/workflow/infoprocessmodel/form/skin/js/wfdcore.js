(function($) {
	if (typeof WForm == "undefined") {
		WForm = {
			parameter:{}
		};
	}
	
	WForm.setProcDefUniqueId=function(procDefUniqueId){
		WForm.procDefUniqueId = procDefUniqueId;
		WFlow.procDefUniqueId = procDefUniqueId;
	}
	
	WForm.parseUrl = function() {
		var fullUrl = document.URL.split("?");
		if (fullUrl.length > 1) {
			var params = fullUrl[1].split("&");
			for ( var i = 0; i < params.length; i++) {
				var keyValue = params[i].split("=");
				if (keyValue.length == 2) {
					WForm.parameter[keyValue[0]] = keyValue[1];
				}
			}
			if (WForm.parameter["procDefUniqueId"]) {
				WForm.procDefUniqueId = WForm.parameter["procDefUniqueId"];
			}
		}
	}
	
	WForm.getModelContent = function() {
		return WFormModel.generateModelContent();
	}
	
	WForm.showProcessProperty=function(pData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/workflow/infoprocessmodel/form/property/formproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divProcFormProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	
	WForm.showTaskProperty=function(tData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/workflow/infoprocessmodel/form/property/activityformproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divActFormProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	WForm.initProcess=function(){
		var showProc=function(data){
			if(WForm.ptype!="process"){
				data.flag=true;
				WForm.ptype="process";
			}
			if(WForm.type!="process"){
				$("#divActFormProperty").hide();
				$("#divProcFormProperty").show();
			}
			if(data.flag){
				WForm.showProcessProperty(data);
			}else{
				WForm.initFormProcData();
			}
		}
		var showTask=function(data){
			if(WForm.ttype!="task"){
				data.flag=true;
				WForm.ttype="task";
			}
			if(WForm.type!="task"){
				$("#divActFormProperty").show();
				$("#divProcFormProperty").hide();
			}
			if(data.flag){
				WForm.showTaskProperty(data);
			}else{
				WForm.initFormActData();
			}
		}
		var showCallAct=function(data){
				$("#divActFormProperty").hide();
				$("#divProcFormProperty").hide();
		}	
		var showGateway=function(data){
			$("#divActFormProperty").hide();
			$("#divProcFormProperty").hide();
		}
		WFlow.bind(WFlow.event.WF_SHOW_PROPERTY,function(e,data){
				switch(data.eventType) {
				case "process":
					showProc(data);
					break;
				case "lane":
					break;
				case "sequenceFlow":
					break;
				case "userTask":
					WForm.isStart=data.isStart;
					WForm.parameter['selectedId']=data.id;
					showTask(data);
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					WForm.parameter['selectedId']=data.id;
					showGateway(data);
					break;
				case "callActivity" :
					WForm.parameter['selectedId']=data.id;
					showCallAct(data);
				case "startEvent":
				case "endEvent":
					break;
			}
		});
		var data={eventType:"process"}
		WFlow.trigger(WFlow.event.WF_SHOW_PROPERTY,data);
	}
	function checkTaskRequest(formId,formName, taskRequests, warnInfoList){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.JspProcessDefUtil/getTaskRequestsList",
			data:{
				"formId":formId
			},
			dataType:"json",
			async:false,
			success:function (data){
				if(data.errMessage){ 
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}else{
					var urlList={};
					if(data&&data.taskUrlList){
						for(var id in data.taskUrlList){
							urlList[data.taskUrlList[id].reqId]=data.taskUrlList[id];
						}
					}
					for(var id in taskRequests.childList){
						if(!urlList[taskRequests.childList[id].requestId]){
							warnInfoList[L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C010","]的URL[")+taskRequests.childList[id].requestName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！")]=
								L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C010","]的URL[")+taskRequests.childList[id].requestName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！");
							delete taskRequests.childList[id];
						}
					}
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	function checkTaskBtns(formId, formName, deviceType, buttonList, warnInfoList){
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
				var btnList={};
				if(data[0] && data[0].btnList.length>0){
					for(var n in data[0].btnList){
						btnList[data[0].btnList[n].buttonId]=data[0].btnList[n];
					}
				}
				for(var n in buttonList){
					var btns=buttonList[n].childList;
					for(var m in btns){
						if(!btnList[btns[m].id]){
							warnInfoList[L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C012","]的操作[")+btns[m].name+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！")]=
								L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C012","]的操作[")+btns[m].name+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！");
							delete btns[m];
						}
					}
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	function checkTaskField(formId, formName, deviceType, FieldList, warnInfoList){
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/command/dispatcher/"
					+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
					+ "getAuthList",
			data : {
				"formId" : formId,
				"deviceType" : deviceType
			},
			dataType : "json",
			async : false,
			success : function(data) {
				var Fields={};
				if(data && data.length>0){
					for(var n in data){
						Fields[data[n].id]=data[n];
					}
				}
				for(var m in FieldList.childList){
					if(!Fields[FieldList.childList[m].id]){
						warnInfoList[L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C013","]的域[")+FieldList.childList[m].name+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！")]=
							L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C013","]的域[")+FieldList.childList[m].name+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！");
						delete FieldList.childList[m];
					}
				}
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	}
	WForm.checkData=function(){
		var warnInfoList={};
		var formList={};
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
					showDialog("alert",data.errMessage,L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}else{
					if(data.form.length>0){
						for(var n in data.form){
							formList[data.form[n].formId]=data.form[n].formId;
						}
					}
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
		//校验流程数据
		if(WFormProcess.isSetForm){
			if(!formList[WFormProcess.formId]){
				warnInfoList[L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+WFormProcess.formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！")]=L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+WFormProcess.formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！");
				WFormProcess.formId="";
				WFormProcess.formName="";
				WFormProcess.isSetForm=false;
				delete WFormProcess.taskRequests;
				delete WFormProcess.buttons;
				delete WFormProcess.yibanButtons;
				delete WFormProcess.endButtons;
				WFormProcess.isSetLocal=false;
			}else{
				if(WFormProcess.taskRequests){
					checkTaskRequest(WFormProcess.formId, WFormProcess.formName, WFormProcess.taskRequests, warnInfoList);
				}
				if(WFormProcess.isSetLocal){
					var buttonList={};
					if(WFormProcess.buttons)
						buttonList["daiban"]=WFormProcess.buttons;
					if(WFormProcess.yibanButtons)
						buttonList["yiban"]=WFormProcess.yibanButtons;
					if(WFormProcess.endButtons)
						buttonList["end"]=WFormProcess.endButtons;				
					checkTaskBtns(WFormProcess.formId, WFormProcess.formName, "0", buttonList, warnInfoList);
				}
			}
		}
		//校验环节数据
		if(WFormProcess.activities){
			for(var id in WFormProcess.activities.childList){
				var activity=WFormProcess.activities.childList[id];
				if(activity.isSetForm){
					if(!formList[activity.formId]){
						warnInfoList[L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+activity.formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！")]=L.getLocaleMessage("BPM.INFOPROCESSMODEL.C009","表单[")+activity.formName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.C011","]未注册！");
						activity.formId="";
						activity.formName="";
						activity.isSetForm=false;
						delete activity.taskRequests;
						delete activity.newButtons;
						delete activity.buttons;
						delete activity.yibanButtons;
						delete activity.endButtons;
						delete activity.fields;
						activity.isSetLocal=false;
						activity.isSetAuth=false;
					}else{
						if(activity.taskRequests){
							checkTaskRequest(activity.formId, activity.formName, activity.taskRequests, warnInfoList);
						}
						if(activity.isSetLocal){
							var buttonList={};
							if(activity.newButtons)
								buttonList["new"]=activity.newButtons;
							if(activity.buttons)
								buttonList["daiban"]=activity.buttons;
							if(activity.yibanButtons)
								buttonList["yiban"]=activity.yibanButtons;
							if(activity.endButtons)
								buttonList["end"]=activity.endButtons;
							checkTaskBtns(activity.formId, activity.formName, "0", buttonList, warnInfoList);
						}
						if(activity.isSetAuth){
							checkTaskField(activity.formId, activity.formName, "0", activity.fields, warnInfoList);
						}
						if(activity.phoneForm && activity.phoneForm!=null){
							if(activity.phoneForm.isSetLocal){
								var buttonList={};
								if(activity.phoneForm.newButtons)
									buttonList["new"]=activity.phoneForm.newButtons;
								if(activity.phoneForm.buttons)
									buttonList["daiban"]=activity.phoneForm.buttons;
								if(activity.phoneForm.yibanButtons)
									buttonList["yiban"]=activity.phoneForm.yibanButtons;
								if(activity.phoneForm.endButtons)
									buttonList["end"]=activity.phoneForm.endButtons;
								checkTaskBtns(activity.formId, activity.formName, "1", buttonList, warnInfoList);
							}
							if(activity.phoneForm.isSetAuth){
								checkTaskField(activity.formId, activity.formName, "1", activity.phoneForm.fields, warnInfoList);
							}
						}
						if(activity.padForm && activity.padForm!=null){
							if(activity.padForm.isSetLocal){
								var buttonList={};
								if(activity.padForm.newButtons)
									buttonList["new"]=activity.padForm.newButtons;
								if(activity.padForm.buttons)
									buttonList["daiban"]=activity.padForm.buttons;
								if(activity.padForm.yibanButtons)
									buttonList["yiban"]=activity.padForm.yibanButtons;
								if(activity.padForm.endButtons)
									buttonList["end"]=activity.padForm.endButtons;
								checkTaskBtns(activity.formId, activity.formName, "2", buttonList, warnInfoList);
							}
							if(activity.padForm.isSetAuth){
								checkTaskField(activity.formId, activity.formName, "2", activity.padForm.fields, warnInfoList);
							}
						}
					}
				}
			}
		}
		for(var id in warnInfoList){
			showDialog("alert", id,L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300, false, closefn);
			return false;
		}
		//初始化流程
		WForm.initProcess();

		function closefn(){
			//初始化流程
			WForm.initProcess();
		}
	};
	function getUrl() {
		var fullUrl = document.URL.split("?");
		if (fullUrl.length <= 1) {
			return;
		}
		var params={};
		var param = fullUrl[1].split("&");
		for ( var i = 0; i < param.length; i++) {
			var keyValue = param[i].split("=");
			if (keyValue.length == 2) {
				params[keyValue[0]] = keyValue[1];
			}
		}
		return params;
	};
	function initWfdCore() {
		$.ajax({
			type : "POST",
			async : false,
			url : WForm.webPath + "/jsp/workflow/infoprocessmodel/html/wfdcore.jsp",
			data : getUrl(),
			dataType:"html",
			success:function(data){
				$("#wfdCoreArea").append(data);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C014","加载页面失败！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	};
	$(function() {
		//加载核心
		initWfdCore();
		//解析URL
		WForm.parseUrl();
		// 初始化模型
		WFormModel.init();
		if(WForm.parameter["procDefUniqueId"]){
			// 数据完整性检验
			WForm.checkData();
		}else{
			//初始化流程
			WForm.initProcess();
		}
	});
	
})(jQuery);