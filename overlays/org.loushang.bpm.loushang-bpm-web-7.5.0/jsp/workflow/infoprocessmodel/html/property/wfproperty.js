(function($) {
	if (typeof WFProp == "undefined") {
		WFProp = {};
	}
	
	WFProp.showProcessProperty=function(param_data){
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/jsp/workflow/infoprocessmodel/html/property/process/procproperty.jsp",
			data : {},
			dataType : "html",
			async : false,
			success : function(data) {
				var div = $("<div></div>");
				$(div).attr("id", "divProcProperty");
				$(div).html(data);
				$("#wfDivProperty").append(div);
				initProcessData(param_data);
				$("#divProcProperty").siblings().hide().end().show();
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D137","加载流程属性页面出错!"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	}
	WFProp.showTaskProperty=function(param_data){
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/jsp/workflow/infoprocessmodel/html/property/task/taskproperty.jsp",
			data : {},
			dataType : "html",
			async : false,
			success : function(data) {
				var div = $("<div></div>");
				$(div).attr("id", "divActProperty");
				$(div).html(data);
				$("#wfDivProperty").append(div);
				initTaskData(param_data);
				$("#divActProperty").siblings().hide().end().show();
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D138","加载环节属性页面出错!"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	}
	WFProp.showGatewayProperty=function(param_data){
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/jsp/workflow/infoprocessmodel/html/property/gateway/gatewayproperty.jsp",
			data : {},
			dataType : "html",
			async : false,
			success : function(data) {
				var div = $("<div></div>");
				$(div).attr("id", "divGWProperty");
				$(div).html(data);
				$("#wfDivProperty").append(div);
				initGatewayData(param_data);
				$("#divGWProperty").siblings().hide().end().show();
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D138","加载环节属性页面出错!"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	}
	
	WFProp.showCallProperty=function(param_data){
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/jsp/workflow/infoprocessmodel/html/property/subproc/subprocess.jsp",
			data : {},
			dataType : "html",
			async : false,
			success : function(data) {
				var div = $("<div></div>");
				$(div).attr("id", "divCallProperty");
				$(div).html(data);
				$("#wfDivProperty").append(div);
				initCallData(param_data);
				$("#divCallProperty").siblings().hide().end().show();
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D138","加载环节属性页面出错!"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	}
	
	WFProp.getJoinRule=function(){
		var joinRuleList=false;
		$.ajax({
			type : "POST",
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getComplexGatewayRuleTypeList",
			data : {},
			dataType: "json",
			async : false,
			success : function(data) {
				if(data && data.success){
					joinRuleList=data.joinRuleList;
				}else{
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D260","获取汇聚规则失败！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				} 
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
		return joinRuleList;
	}
	
	WFProp.init = function(){
		WFlow.bind(WFlow.event.WF_SHOW_BASIC_PROPERTY, function(e, data) {
			switch(data.eventType) {
				case "userTask":
					if($("#divActProperty").length<1){
						WFProp.showTaskProperty(data);
					}else{
						initTaskData(data);
						$("#divActProperty").siblings().hide().end().show();
					}
					break;
				case "callActivity" :
					if($("#divCallProperty").length<1){
						WFProp.showCallProperty(data);
					}else{
						initCallData(data);
						$("#divCallProperty").siblings().hide().end().show();
					}
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					if($("#divGWProperty").length<1){
						WFProp.showGatewayProperty(data);
					}else{
						initGatewayData(data);
						$("#divGWProperty").siblings().hide().end().show();
					}
					break;
				case "process":
					if($("#divProcProperty").length<1){
						WFProp.showProcessProperty(data);
					}else{
						initProcessData(data);
						$("#divProcProperty").siblings().hide().end().show();
					}
					break;
			}
			//这里是控制再次打开属性页面还原初始状态的
			$(".wfPropertyBodyArea").show();
			$(".headArea .shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
			if(WFlow.parameter["hideBranch"] == "1"){
				$("#actBranch").hide();
				$("#gateWayBranch").hide();
				$("#callSplitRule").hide();
			}
		});
		
		var data={model:WFModel.process, eventType : "process",flag:true};
		WFlow.trigger(WFlow.event.WF_SHOW_BASIC_PROPERTY, data);
		
		/**
		 * 图形上的环节的名称变化时，需要更新流程模型
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）模型（model）
		 */
		WFlow.bind(WFlow.event.WF_UPDATE_BASIC_MODEL, function(e, data) {
			var type = data.eventType, model = data.model, orgId = data.orgId;
			// TODO：需要检查生成的ID是否有重复的，如果有重复的需要自动处理
			var newId = WFlow.getNodeHomophonePinyin(model.name, orgId);
			switch(type) {
				case "process":
					if (WFlow.parameter["isRelease"] != "1") {
						WFModel.process.id = newId;
					}
					WFModel.process.name = model.name;
					WFModel.model().name = model.name;
					break;
				case "lane":
					var orgLaneModel = WFModel.process.laneDic[orgId];
					if (orgLaneModel.isNew) {
						orgLaneModel.id = newId;
						orgLaneModel.name = model.name;
						delete WFModel.process.laneDic[orgId];
						WFModel.process.laneDic[newId] = orgLaneModel;
					} else {
						orgLaneModel.name = model.name;
					}
					break;
				case "sequenceFlow":
					var orgSeqModel = WFModel.process.seqFlowDic[orgId];
					if (orgSeqModel.isNew) {
						orgSeqModel.id = newId;
						orgSeqModel.name = model.name;
						delete WFModel.process.seqFlowDic[orgId];
						WFModel.process.seqFlowDic[newId] = orgSeqModel;
					} else {
						orgSeqModel.name = model.name;
					}
					break;
				case "userTask":
				case "callActivity" :
				case "inclusiveGateway":
				case "parallelGateway":
				case "exclusiveGateway":
				case "complexGateway":
				case "startEvent":
				case "endEvent":
				case "intermediateCatchEvent":
					var orgNodeModel = WFModel.process.nodeDic[orgId];
					if (orgNodeModel.isNew) {
						orgNodeModel.id = newId;
						orgNodeModel.name = model.name;
						delete WFModel.process.nodeDic[orgId];
						WFModel.process.nodeDic[newId] = orgNodeModel;
					} else {
						orgNodeModel.name = model.name;
					}
					
					break;
			}
		});
	}
	
	$(function() {
		// 初始化属性面板
		WFProp.init();
	});
})(jQuery);