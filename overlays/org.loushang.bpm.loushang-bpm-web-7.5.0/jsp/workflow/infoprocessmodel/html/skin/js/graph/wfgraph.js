(function($){
	if (typeof WFGraph =="undefined") {
		WFGraph = {}
	};
	
	WFGraph.drawNodeFactory = function (type, data) {
		//图形ID,图形名称,图形模型，图形位置：x、y、width、height
		var node, gId, gName, gModel, gPos, isNewProc = true;
		if (data.model) {
			isNewProc = false;
			gId=data.id;
			gName=data.name;
			gModel=data.model; 
			gModel.innerId = gId;
			gPos={x:data.x, y:data.y, width:data.width, height:data.height};
		} else {
			gPos={x:data.x, y:data.y};
		}
		switch (type) {
			case "userTask" :
				if (isNewProc) {
					gModel = new UserTask();
					gModel.type = type;
					var tmpTaskId = WF.generateTaskId();
					gModel.name = L.getLocaleMessage("BPM.INFOPROCESSMODEL.D200","环节") + tmpTaskId;
					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
					gModel.innerId = "g_HuanJie" + tmpTaskId;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var taskData = $.extend(true, {}, WFConfig.actCommonCss,
						WFConfig.userTask, {id:gId, name:gName, model:gModel}, gPos);
				node = new WFGraph.drawTask(taskData);
				break;
			case "callActivity" :
				if (isNewProc) {
					gModel = new CallActivity();
					gModel.type = type;
					var tmpTaskId = WF.generateTaskId();
					gModel.name = L.getLocaleMessage("BPM.INFOPROCESSMODEL.D200","环节") + tmpTaskId;
					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
					gModel.innerId = "g_HuanJie" + tmpTaskId;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var taskData = $.extend(true, {}, WFConfig.actCommonCss,
						WFConfig.userTask, {id:gId, name:gName, model:gModel}, gPos);
				node = new WFGraph.drawCallActivity(taskData);
				break;
			case "startEvent" : 
			case "endEvent" : 
			case "intermediateCatchEvent":
				if (isNewProc) {
					if (type == "endEvent") {
						gModel = new ThrowEvent();
					} else {
						gModel = new CatchEvent();
					}
					gModel.type = type;
					var tmpEventId = WF.generateEventId();
					gModel.name =  L.getLocaleMessage("BPM.INFOPROCESSMODEL.D173","事件") + tmpEventId;
					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
					gModel.innerId = "g_ShiJian" + tmpEventId;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var eventData = $.extend(true, {}, WFConfig.actCommonCss,
						WFConfig.event, {id:gId, name:gName, model:gModel}, gPos);
				node = new WFGraph.drawEvent(eventData);
				break;
			case "inclusiveGateway" :
			case "exclusiveGateway":
			case "parallelGateway":
			case "complexGateway":
				if (isNewProc) {
					gModel = new Gateway();
					gModel.type = type;
					var tmpeGatewayId = WF.generateGatewayId();
					gModel.name =  L.getLocaleMessage("BPM.INFOPROCESSMODEL.D174","网关") + tmpeGatewayId;
					gModel.id = WF.getPinyin(gModel.name);
//					gModel.innerId = "g_" + gModel.id;
					gModel.innerId = "g_WangGuan" + tmpeGatewayId;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var gatewayData = $.extend(true, {}, WFConfig.actCommonCss,
						WFConfig.gateway, {id:gId, name:gName, model:gModel}, gPos);
				node = new WFGraph.drawGateway(gatewayData);
				break;
		};
		return node;
	};
	
	WFGraph.drawLineFactory = function (type, data) {
		//图形ID,图形名称,图形模型，连接线的点集合
		var flow, gId, gName, gModel, gPointList, isNewProc = true;
		if (data.model) {
			isNewProc = false;
			gId=data.id;
			gName=data.name;
			gModel=data.model; 
			var fromNodeModel = WFModel.process.nodeDic[gModel.sourceRef];
			var toNodeModel =  WFModel.process.nodeDic[gModel.targetRef];
			gModel.sourceNode = WFGraph.nodeDiagramDic[fromNodeModel.innerId];
			gModel.targetNode = WFGraph.nodeDiagramDic[toNodeModel.innerId];
			gModel.innerId = data.id;
			gPointList=data.waypointList;
		}
		switch (type) {
			case "sequenceFlow" :
				if (isNewProc) {
					gModel = new SequenceFlow();
					var tmpeSeqId = WF.generateSeqId();
					gModel.id = "seq" + tmpeSeqId;
					gModel.sourceNode = data.sourceNode;
//					gModel.innerId = "g_" + gModel.id;
					gModel.innerId = "g_seq" + tmpeSeqId;
					gId = gModel.innerId;
					gName = gModel.name;
				}
				var seqData = $.extend(true, {}, 
						WFConfig.flowSequence, 
						{id:gId, name:gName, model:gModel},
						{x:data.x, y:data.y, waypointList:gPointList});
				flow = new WFGraph.drawLine(seqData);
				break;
		}
		if (gModel.sourceNode && 
				gModel.sourceNode.model.type == "startEvent" && 
				gModel.targetNode) {
			gModel.targetNode.model.isStart = true;
		}
		return flow;
	};
	
	WFGraph.drawLaneFactory = function (type, data) {
		//图形ID,图形名称,图形模型，图形位置：x、y、width、height
		var node, gId, gName, gModel, gPos, isNewProc = true;
		if (data.model) {
			isNewProc = false;
			gId=data.id;
			gName=data.name;
			gModel=data.model; 
			gModel.innerId = gId;
			gPos={x:data.x, y:data.y, width:data.width, height:data.height};
		}
		if (type == "lane") {
			if (isNewProc) {
				gModel = new Lane();
				var tmpeLaneId = WF.generateLaneId();
				gModel.name = L.getLocaleMessage("BPM.INFOPROCESSMODEL.D177","组") + tmpeLaneId;
				gModel.id = WF.getPinyin(gModel.name);
				gModel.innerId = "g_Zu" + tmpeLaneId;
				gId = gModel.innerId;
				gName = gModel.name;
				
				if ("1" == WFlow.parameter["laneType"]) {
					gModel.isHorizontal = "false"
				}
				if ("true" == gModel.isHorizontal) {
					var x=0;
					for (var o in this.laneDiagramDic) {
						var laneObj = this.laneDiagramDic[o];
						x += laneObj.position.width;
					}
					gPos={x:x, y:0,height:$("#divDesign").height()};
				} else {
					var y=0;
					for (var o in this.laneDiagramDic) {
						var laneObj = this.laneDiagramDic[o];
						y += laneObj.position.height;
					}
					gPos={x:0, y:y,width:$("#divDesign").width()};
				}
			}
			var laneData = $.extend(true, {}, 
					WFConfig.lane, {id:gId, name:gName, model:gModel}, gPos);
			node = new WFGraph.drawLane(laneData);
		};
		return node;
	};
	
	WFGraph.init = function() {
		this.nodeDiagramDic = {};
		this.flowDiagramDic = {};
		this.laneDiagramDic = {};
		
		// 创建画布
		this.wfd_R = Raphael("divDesign", $("#divDesign").width(), $("#divDesign").height());
	};
	
	WFGraph.createNode = function() {
		// 增加节点删除组件
		this.drawOperation();
		// 增加环节画线用到的四个锚点
		this.drawNodeAction();
		
		if (!WFlow.parameter["procDefUniqueId"]) {
			// TODO：新增流程时，在面板上增加一个起始和一个结束
			WFEvent.trigger("wfd_add_element", ["endEvent", {x:800,y:200}]);
			WFEvent.trigger("wfd_add_element", ["startEvent", {x:40,y:200}]);
			WF.clearSelected();
		}
	};
	
})(jQuery);