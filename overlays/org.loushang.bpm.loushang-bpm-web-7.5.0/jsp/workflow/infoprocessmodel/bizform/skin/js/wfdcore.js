(function($) {
	if (typeof WForm == "undefined") {
		WForm = {};
	}
	
	WForm.setProcDefUniqueId=function(procDefUniqueId){
		WForm.procDefUniqueId = procDefUniqueId;
		WFlow.procDefUniqueId = procDefUniqueId;
	}
	
	WForm.parseUrl = function() {
		WForm.parameter = {};
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
	
	WForm.showTaskProperty=function(aData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/workflow/infoprocessmodel/bizform/view/activityformproperty.jsp",
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
	WForm.showProcProperty=function(aData){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/jsp/workflow/infoprocessmodel/bizform/view/processformproperty.jsp",
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
				WForm.showProcProperty(data);
			}else{
				WForm.initWFormProcData();
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
				WForm.initWFormActData();
			}
		}
		var showCallAct=function(data){
			$("#divProcFormProperty").hide();
			$("#divActFormProperty").hide();
		}
		var showGateway=function(data){
			$("#divProcFormProperty").hide();
			$("#divActFormProperty").hide();
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
					WForm.parameter['selectedId']=data.id;
					WForm.isStart=data.isStart;
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
	
	WForm.getModelContent = function() {
		return WFormModel.generateModelContent();
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
	$(function(){
		//加载核心
		initWfdCore();
		//解析URL
		WForm.parseUrl();
		// 初始化模型
		WFormModel.init();
		//初始化流程
		WForm.initProcess();
	});
	
})(jQuery);