(function($) {
	if (typeof CFDCore == "undefined") {
		CFDCore = {};
	}
	
	CFDCore.showProcessProperty=function(pData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/cform/procdef/html/property/formproperty.jsp",
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
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	
	CFDCore.showTaskProperty=function(aData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/cform/procdef/html/property/activityformproperty.jsp",
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
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	CFDCore.showSubProcProperty=function(aData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/cform/procdef/html/property/subprocformproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divFormCallProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	CFDCore.showGatewayProperty=function(gData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/cform/procdef/html/property/gatewayformproperty.jsp",
			data:{
			},
			dataType:"html",
			async:true,
			success:function (datas){
				var div = $("<div></div>").addClass("propertyArea");
				$(div).attr("id", "divGwFormProperty");
				$(div).html(datas);
				$("#divProperty").append(div);
				$("#branchCondiId input").attr("gname",gData.name);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	
	CFDCore.init = function() {
		//创建流程对象
		CFPackageConfig=new CFPackageConfig();
		CFPackageConfig.init();
		CFProcess=CFPackageConfig.processes.process;
		if(CFlow.procDefUniqueId!=""){
			$.ajax({
				type : "POST",
				async : false,
				url : WFlow.fullWebPath + "/command/dispatcher/"
					+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
					+ "getModelContent",
				data : {"procDefUniqueId" : CFlow.getProcDefUniqueId()},
				dataType:"json",
				success : function(data) {
					if(data && data.success){
						if(data.modelContent){
							CFModel.parseModelContent(data.modelContent);
							$("#procTitle").text(CFProcess.name);
						}
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					}
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}
			});
		}else{
			CFProcess.id='LiuCheng';
			CFProcess.name=L.getLocaleMessage("CForm.BPM.D265","流程");
			$("#procTitle").text(L.getLocaleMessage("CForm.BPM.D265","流程"));
		}
		var showProc=function(data){
			if(CFlow.ptype!="process"){
				data.flag=true;
				CFlow.ptype="process";
			}
			if(CFlow.type!="process"){
				$("#divActFormProperty").hide();
				$("#divGwFormProperty").hide();
				$("#divProcFormProperty").show();
				$("#divFormCallProperty").hide();
			}
			if(data.flag){
				CFDCore.showProcessProperty(data);
			}else{
				if(CFProcess.formId&&CFProcess.formId!='null'){
					$("#procformName input:text").val(CFProcess.formName);
					$("#procformName input:text").attr("id",CFProcess.formId);
				}
			}
			
		}

		var showGateway = function(data){
			if(CFlow.gtype!="gateway"){
				data.flag=true;
				CFlow.gtype="gateway";
			}
			if(CFlow.type!="gateway"){
				$("#divActFormProperty").hide();
				$("#divGwFormProperty").show();
				$("#divProcFormProperty").hide();
				$("#divFormCallProperty").hide();
			}
			if(data.flag){
				CFDCore.showGatewayProperty(data);
			}else{
				CFlow.initGataWay(data.name);
			}
		}
		WFlow.bind(WFlow.event.WF_ADD_MODEL,function(e,data){
			if(data.eventType=="userTask"){
				var activity=new CFActivity();
				activity.init();
				activity.id=data.id;
				activity.name=data.name;
				if(CFProcess.isSet){
					activity.formId=CFProcess.formId;
					activity.formName=CFProcess.formName;
					activity.isSetForm=true;
				}
				CFProcess.activities.childList[activity.id]=activity;
			}
		});
		var showTask=function(data){
			CFlow.isStart=data.isStart;
			if(CFlow.ttype!="task"){
				data.flag=true;
				CFlow.ttype="task";
			}
			if(CFlow.type!="task"){
				$("#divActFormProperty").show();
				$("#divGwFormProperty").hide();
				$("#divProcFormProperty").hide();
				$("#divFormCallProperty").hide();
			}
			if(data.flag){
				CFDCore.showTaskProperty(data);
			}else{
				CFlow.initCFormActData();
			}
		}
		var showCallAct = function(data) {
			CFlow.isStart = data.isStart;
			if (CFlow.ctype != "subProcess") {
				data.flag = true;
				CFlow.ctype = "subProcess";
			}
			if (CFlow.type != "subProcess") {
				$("#divActFormProperty").hide();
				$("#divGwFormProperty").hide();
				$("#divProcFormProperty").hide();
				$("#divFormCallProperty").show();
			}
			if (data.flag) {
				CFDCore.showSubProcProperty(data);
			} else {
				CFlow.initCFormSubProcData();
			}
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
					CFlow.setSelectedId(data.id);
					showTask(data);
					break;
				case "callActivity":
					CFlow.setSelectedId(data.id);
					showCallAct(data);
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "complexGateway":
					CFlow.setSelectedId(data.id);
					showGateway(data);
					break;
				case "startEvent":
				case "endEvent":
					break;
			}
		});
		
		WFlow.bind(WFlow.event.WF_DELETE_MODEL,function(e,data){
			if(data.eventType=="userTask"){
				delete CFProcess.activities.childList[data.id];
			}
		});
		WFlow.bind(WFlow.event.WF_UPDATE_MODEL, function(e,data){
			if(data.eventType=="process"){
				CFProcess.id=data.id;
				CFProcess.name=data.name;
				$("#procTitle").text(data.name);
			};
			if(data.eventType=="userTask"){
				var activity=CFProcess.activities.childList[data.orgId];
				activity.name=data.name;
				activity.id=data.id;
				delete CFProcess.activities.childList[data.orgId];
				CFProcess.activities.childList[data.id]=activity;
				if (CFlow.getSelectedId() == data.orgId) {
					CFlow.setSelectedId(data.id);
				}
			};
		});

		var data={eventType:"process"}
		WFlow.trigger(WFlow.event.WF_SHOW_PROPERTY,data);
	}
	$(function(){
		CFDCore.init();
	});
	
})(jQuery);