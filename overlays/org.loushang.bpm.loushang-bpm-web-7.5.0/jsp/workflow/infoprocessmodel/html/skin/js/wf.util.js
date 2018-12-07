(function($){
	if (typeof WF == "undefined") {
		WF = {};
	}
	
	// 工具类，主要用来生成流程ID：32位随机数
	WF.generateProcessId = function() {
		var uuid = "";
		var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		for(var i = 0; i < 32 ; i++) {
			var id = Math.ceil(Math.random() * 35);
			uuid = uuid + chars[id];
		}
		return uuid;
	}
	
	WF.maxTaskId = 0;
	WF.maxGatewayId = 0;
	WF.maxEventId = 0;
	WF.maxSeqId = 0;
	WF.maxPartId = 0;
	WF.maxLaneId = 0;
	
	WF.generateTaskId = function() {
		return ++WF.maxTaskId;
	}
	WF.generateGatewayId = function() {
		return ++WF.maxGatewayId;
	}
	WF.generateEventId = function() {
		return ++WF.maxEventId;
	}
	
	// 工具类，主要用来自动生成迁移线的ID
	WF.generateSeqId = function() {
		return ++WF.maxSeqId;
	}
	
	WF.generatePartId = function() {
		return ++WF.maxPartId;
	}
	
	WF.generateLaneId = function() {
		return ++WF.maxLaneId;
	}
	
	// 工具类，设置缓存中存储的组件类型
	WF.selectedType = function(type) {
		if (type) {
			$("#divDesign").data("selectedType", type);
		} else {
			return $("#divDesign").data("selectedType");
		}
	}
	
	WF.removeDrawingLine = function() {
		$("#divDesign").removeData("drawingLine");
		if ($("#divDesign").data("wfd_triangle_click")) {
			$("#divDesign").removeData("wfd_triangle_click");
			$("#divDesign").removeData("selectedType");
		}
	}
	
	// 工具类，清除缓存中存储的组件类型
	WF.clearSelectedType = function() {
		$("#divDesign").removeData("selectedType");
		WFTool.setSelected();
	}
	
	// 工具类，设置缓存中存储的环节
	WF.setSelected = function(element) {
		if (WF.getSelected()) {
			var model = WF.getSelected().model;
			switch(model.type) {
				case "lane":
					WFGraph.hideOperation();
					break;
				case "sequenceFlow":
					WFGraph.removeLineAddition();
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
					WFGraph.hideNodeAddition();
					break;
			}
		}
		$("#divDesign").data("selectedNode", element);
		switch(element.model.type) {
			case "lane":
				WFGraph.showOperation({type:'lane', node:element});
				break;
			case "sequenceFlow":
				element.toFront();
				WFGraph.showOperation({type:"flow", node : element});
				WFGraph.drawLineAddition(element);
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
				element.toFront();
				WFGraph.showNodeAddition(element);
				break;
		}
	}
	
	// 工具类，获取缓存中存储的环节
	WF.getSelected = function() {
		return $("#divDesign").data("selectedNode");
	}
	
	// 工具类，清除缓存中存储的环节
	WF.clearSelected = function() {
		var element = WF.getSelected();
		if (!element) {
			return;
		}
		switch(element.model.type) {
			case "lane":
				WFGraph.hideOperation();
				break;
			case "sequenceFlow":
				WFGraph.hideOperation();
				WFGraph.removeLineAddition();
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
				if (element && element.disEditable) {
					element.disEditable();
				}
				WFGraph.hideNodeAddition();
				break;
		}
		$("#divDesign").removeData("selectedNode");
	}
	
	WF.setMouseOverSelected = function(element) {
		$("#divDesign").data("mouseOverSelected", element);
	}
	
	WF.getMouseOverSelected = function() {
		return $("#divDesign").data("mouseOverSelected");
	}
	WF.clearMouseOverSelected = function() {
		$("#divDesign").removeData("mouseOverSelected");
	}
	
	WF.setIsDrawLine = function(element) {
		$("#divDesign").data("isDrawLine", element);
	}
	
	WF.getIsDrawLine = function() {
		return $("#divDesign").data("isDrawLine");
	}
	
	WF.setDesignerEditor = function(element) {
		$("#divDesign").data("designerEditor", element);
	}
	
	WF.getDesignerEditor = function() {
		return $("#divDesign").data("designerEditor");
	}
	
	// 工具类，清除缓存中存储的环节并因此锚点
	WF.clearSelectedAndHideAnchor = function() {
		WF.clearSelected();
	}
	
	function getSubNum(str, subStr) {
		var retNum = 0;
		var subLen = subStr.length;
		if(str.length > subLen && str.indexOf(subStr) > -1 && 
				!isNaN(str.substr(subLen))) {
			retNum = str.substr(subLen);
		}
		return retNum;
	}
	
	WF.getMaxNodeId = function() {
		var tempTaskNum = 0, tempEventNum = 0, tempGatewayNum = 0, tempLaneNum=0;
		for (var nKey in WFGraph.nodeDiagramDic) {
			var node = WFGraph.nodeDiagramDic[nKey].model;
			var taskNum=0, evtNum=0, gatewayNum=0, laneNum=0;
			var actId = node.innerId;
			switch (node.type) {
				case "userTask" :
				case "callActivity" :
					taskNum = getSubNum(actId, "g_HuanJie");
					if (tempTaskNum < Number(taskNum)) {
						tempTaskNum = Number(taskNum);
					}
					break;
				case "endEvent" :
				case "startEvent" :
				case "intermediateCatchEvent":
					evtNum = getSubNum(actId, "g_ShiJian");
					if (tempEventNum < Number(evtNum)) {
						tempEventNum = Number(evtNum);
					}
					break;
				case "inclusiveGateway" :
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					gatewayNum = getSubNum(actId, "g_WangGuan");
					if (tempGatewayNum < Number(gatewayNum)) {
						tempGatewayNum = Number(gatewayNum);
					}
					break;
				case "lane":
					laneNum = getSubNum(actId, "g_Zu");
					if (tempLaneNum < Number(laneNum)) {
						tempLaneNum = Number(laneNum);
					}
					break;
			}
		}
		WF.maxTaskId = tempTaskNum;
		WF.maxEventId = tempEventNum;
		WF.maxGatewayId = tempGatewayNum;
		WF.maxLaneId = tempLaneNum;
	}
	
	WF.getMaxSeqId = function() {
		var tempNum = 0;
		for(var sKey in WFGraph.flowDiagramDic) {
			var line = WFGraph.flowDiagramDic[sKey].model;
			var flowNum;
			var seqId = line.innerId;
			switch (line.type) {
				case "sequenceFlow" :
					flowNum = getSubNum(seqId, "g_seq");
					break;
			}
			for(var cKey in WFGraph.flowDiagramDic) {
				var cN = WFGraph.flowDiagramDic[cKey].model;
				var cNum;
				var cId = cN.innerId;
				switch (cN.type) {
					case "sequenceFlow" :
						cNum = getSubNum(cId, "g_seq");
						if (Number(flowNum) > Number(cNum)) {
							tempNum = Number(flowNum);
						} else {
							tempNum = Number(cNum)
						}
						break;
				}
			}
		}
		WF.maxSeqId = tempNum;
	}
	
	WF.getMaxPartId = function() {
		var tempNum = 0;
		for(var pId in WFModel.process.potentialOwnerDic) {
			var pOwner = WFModel.process.potentialOwnerDic[pId];
			var cNum = pOwner.id.substr(6);
			if (Number(cNum) > Number(tempNum)) {
				tempNum = Number(cNum);
			}
		}
		WF.maxPartId = tempNum;
	}
	
	WF.getMouseXY = function (x, y) {
		// 绘图区的x坐标
		var dx = $("#divDesign").offset().left;
		// 相对于document的y坐标
		var dy = $("#divDesign").offset().top;
		 return {x : x-dx,y : y-dy};
	}

	WF.canDrawOrMove = function(x, y) {
		if (x < 20 || y < 20) {
			return false;
		}
		return true;
	}
	
	function getMaxXY() {
		var i = 0, xArr = new Array(), yArr = new Array();
		for (var actId in WFGraph.nodeDiagramDic) {
			if (actId) {
				var nodeP = WFGraph.nodeDiagramDic[actId].position;
				var nodeRight = nodeP.x + nodeP.width + 50 + 10;
				var nodeBottom = nodeP.y + nodeP.height + 50 + 10;
				xArr[i] = nodeRight;
				yArr[i] = nodeBottom;
				i++;
			}
		}
		for (var seqId in WFGraph.flowDiagramDic) {
			var wayPointList = WFGraph.flowDiagramDic[seqId].pointList;
			var seqXArr = new Array(), seqYArr = new Array();
			var t = 0;
			for (var j in wayPointList) {
				var p = wayPointList[j];
				seqXArr[t] = p.x;
				seqYArr[t] = p.y;
				t++;
			}
			var maxSeqX = Math.max.apply(Math,seqXArr), maxSeqY = Math.max.apply(Math,seqYArr);
			xArr[i] = maxSeqX + 10;
			yArr[i] = maxSeqY + 10;
			i++;
		}
		var tX = Math.max.apply(Math,xArr), tY = Math.max.apply(Math,yArr);
		var tempW = 0, tempH = 0;
		for (var laneId in WFGraph.laneDiagramDic) {
			if (laneId) {
				var lane = WFGraph.laneDiagramDic[laneId];
				if ("true" == lane.model.isHorizontal) { 
					tempW += lane.position.width;
				} else {
					tempH += lane.position.height;
				}
			}
		}
		
		var maxX = Math.max.apply(Math,[tempW,tX]), maxY = Math.max.apply(Math,[tempH,tY]);
		return {right : maxX, bottom : maxY};
	}
	
	WF.setScrollWhenDragNode = function() {
		var tempW, tempH, oldW, oldH, maxXY;
		oldW = $("#divDesign").width();
		oldH = $("#divDesign").height();
		maxXY = getMaxXY();
		tempW = maxXY.right;
		tempH = maxXY.bottom;
		
		if (tempW <= $("#divMain").width()) {
			tempW = $("#divMain").width();
			$("#divMain").css("overflow-x", "hidden");
		} else {
			$("#divMain").css("overflow-x", "scroll");
		}
		if (tempH <= $("#divMain").height()) {
			tempH = $("#divMain").height();
			$("#divMain").css("overflow-y", "hidden");
		} else {
			$("#divMain").css("overflow-y", "scroll");
		}
		
		$("#divDesign").width(tempW);
		$("#divDesign").height(tempH);
		if (WFGraph && WFGraph.wfd_R) {
			WFGraph.wfd_R.setSize(tempW, tempH);
		}
		// 更新泳道的高度
		for(var l in WFGraph.laneDiagramDic) {
			var lG = WFGraph.laneDiagramDic[l];
			if ("true" == lG.model.isHorizontal) {
				if ($("#divDesign").width() > $("#divMain").width()) {
					lG.resetNodeAndAnchor({height:tempH-16});
				} else {
					lG.resetNodeAndAnchor({height:tempH});
				}
			} else {
				if ($("#divDesign").height() > $("#divMain").height()) {
					lG.resetNodeAndAnchor({width:tempW-20});
				} else {
					lG.resetNodeAndAnchor({width:tempW});
				}
			}
		}
	}
	
	WF.useStraight = function() {
		if (WFlow.parameter["lineType"] == '1') {
			return true;
		}
		return null;
	}
	
	WF.getOrgPinyin = function(key) {
		var pinyin = '';
		if (key) {
			var o = new Pinyin();
			pinyin = o.getFullChars(key);
			pinyin = removeSpecialChar(pinyin);
		}

		if (pinyin != '') {
			if (pinyin.length > 32) {
				pinyin = pinyin.substring(0, 32);
			}
		}
		return pinyin;
	}
	
	WF.getPinyin = function(key) {
		var pinyin = '';
		if (key) {
			pinyin = WF.getOrgPinyin(key);
		}
		var retId = getIdHomophone(pinyin, "");
		return retId;
	}
	
	function removeSpecialChar(idStr){
		var charPatten = /[a-zA-Z0-9_]{1}/;
		var retStr = ""; 
		for (var i = 0; i < idStr.length; i++) { 
			var charStr = idStr.substr(i, 1);
			if(charStr.match(charPatten)){
				retStr = retStr + charStr;
			} 
		}
		return retStr;
	}
	
	function getIdHomophone(id, orgId) {
		var i=0;
		var hasHomophone = false;
		for (var innerId in WFGraph.nodeDiagramDic) {
			var node = WFGraph.nodeDiagramDic[innerId].model;
			var key = node.id;
			if (key && key != orgId) {
				var idx = key.indexOf("_");
				if (key == id || key.substring(0, idx) == id) {
					if (idx > 0 && key.substring(idx+1) > i) {
						i = key.substring(idx+1);
					}
					i++;
					hasHomophone = true;
				}
			}
		}
		for (var seqInnerId in WFGraph.flowDiagramDic) {
			var flow = WFGraph.flowDiagramDic[seqInnerId].model;
			var seqId = flow.id;
			if (seqId && seqId != orgId) {
				var seqIdx = seqId.indexOf("_");
				if (seqId == id || seqId.substring(0, seqIdx) == id) {
					if (idx > 0 && seqId.substring(seqIdx+1) > i) {
						i = seqId.substring(seqIdx+1);
					}
					i++;
					hasHomophone = true;
				}
			}
		}
		if (!hasHomophone) {
			return id;
		}
		return id + "_"+i;
	}
})(jQuery);