(function($){
	if (typeof WFModel =="undefined") {
		WFModel = {};
	};
	
	WFModel.getAndParserModelContent = function(id) {
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
				+ "getProcInfoModel",
			data : {"id" : id},
			dataType:"json",
			success : function(data) {
				if(data && data.success){
					if(data.modelContent){
						WFModel.parseModelContent(data.modelContent);
					}
						
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D063","请求流程模型时出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	};
	
	WFModel.parseModelContent = function(modelContent) {
		var xmlDoc;
		if (window.DOMParser) {
			xmlDoc = new DOMParser().parseFromString(modelContent, "text/xml");
		} else {
			// Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(modelContent);
		}
		
		this.model().parseXml(xmlDoc);
		
		var actDic = this.model().process.nodeDic;
		var seqDic = this.model().process.seqFlowDic;
		var laneDic = this.model().process.laneDic;
		var actDiagramDic = this.model().diagram.plane.shapeList;
		var seqDiagramDic = this.model().diagram.plane.edgeList;
		
		for (var l in laneDic) {
			var lane = laneDic[l];
			var laneId = lane.id;
			var graphInfo = actDiagramDic[laneId];
			lane.isHorizontal = graphInfo.isHorizontal;
			
			//图形ID,图形名称,图形模型，图形位置：x、y、width、height
			var lData = $.extend(true, 
					{eventType:lane.type, id:graphInfo.id, name:lane.name, model:lane}, 
					graphInfo.bounds);
			WFlow.trigger(WFlow.event.WF_ADD_DIAGRAM, lData);
		}
		
		for (var a in actDic) {
			var act = actDic[a];
			var nodeId = act.id;
			var graphInfo = actDiagramDic[nodeId];
			
			//图形ID,图形名称,图形模型，图形位置：x、y、width、height
			var nData = $.extend(true, 
					{eventType:act.type, id:graphInfo.id, name:act.name, model:act}, 
					graphInfo.bounds);
			WFlow.trigger(WFlow.event.WF_ADD_DIAGRAM, nData);
		}
		for (var s in seqDic) {
			var seq = seqDic[s];
			var seqInfo = seqDiagramDic[seq.id];
			var waypointList = seqInfo.waypointList;
			//图形ID,图形名称,图形模型，连接线的点集合
			var seqData = {eventType:seq.type, id : seqInfo.id, name : seq.name, model:seq, 
					waypointList : waypointList};
			WFlow.trigger(WFlow.event.WF_ADD_DIAGRAM, seqData);
		}
		
		if(WFModel.model().id == WFModel.process.id) {
			WFModel.model().id = WF.generateProcessId();
		}
		
		if (WFlow.parameter["isRelease"] == "1") {
			WFlow.setRelease();
		}
		
		WF.setScrollWhenDragNode();
		WF.getMaxNodeId();
		WF.getMaxSeqId();
		WF.getMaxPartId();
	}
	
	WFModel.generateModelContent = function() {
		var xmlDoc;
		var isIE = false;
		try {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			isIE = true;
		} catch(e) {
			xmlDoc = document.implementation.createDocument("", "", null);
			isIE = false;
		}
		
		var xmlHead = xmlDoc.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"UTF-8\"");
		xmlDoc.appendChild(xmlHead);
		
		WF.xmlDoc = xmlDoc;
		
		var root = this.model().generateXml();
		xmlDoc.appendChild(root);
		
		var modelContent;
		if (isIE) {
			modelContent = xmlDoc.xml;
		} else {
			var xs = new XMLSerializer();
			modelContent = xs.serializeToString(xmlDoc);
		}
		return modelContent;
	}
		
	WFModel.model = function(value) {
		if (value) {
			this.definition = value;
		} else {
			return this.definition;
		}
	}
	
	WFModel.init = function() {
		this.model(new Definition());
		this.process = this.model().process;
		if (WFlow.parameter["procDefUniqueId"]) {
			this.getAndParserModelContent(WFlow.procDefUniqueId);
		} else {
			// 初始化流程模型
			var name = this.model().name;
			var procDefId = WF.getPinyin(name);
			this.model().id = WF.generateProcessId();
			this.process.id = procDefId;
			this.process.name = name;
			this.process.innerId = procDefId;
		}
		
		/**
		 * 增加节点/迁移线时，需要记录流程模型
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）模型（model）
		 */
		WFlow.bind(WFlow.event.WF_ADD_BASIC_MODEL, function(e, data) {
			var type = data.eventType, model = data.model;
			switch(type) {
				case "process":
					break;
				case "lane":
					WFModel.process.laneDic[model.id] = model;
					break;
				case "sequenceFlow":
					WFModel.process.seqFlowDic[model.id] = model;
					break;
				case "userTask":
				case "callActivity" :
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
				case "startEvent":
				case "endEvent":
				case "intermediateCatchEvent":
					WFModel.process.nodeDic[model.id] = model;
					break;
			}
		});
		
		/**
		 * 删除图形时，需要删除流程模型
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）模型（model）
		 */
		WFlow.bind(WFlow.event.WF_DELETE_BASIC_MODEL, function(e, data) {
			var type = data.eventType, model = data.model;
			switch(type) {
				case "process":
					break;
				case "lane":
					delete WFModel.process.laneDic[model.id];
					var laneFlag = true;
					for (var l in WFModel.process.laneDic) {
						if (l) {
							laneFlag = false;
						}
					}
					if (laneFlag) {
						WFModel.process.laneSet = null;
					}
					break;
				case "sequenceFlow":
					delete WFModel.process.seqFlowDic[model.id];
					break;
				case "userTask":
				case "callActivity" :
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
				case "startEvent":
				case "endEvent":
				case "intermediateCatchEvent":
					delete WFModel.process.nodeDic[model.id];
					break;
			}
		});
	};
})(jQuery);