(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	WFGraph.isNodeSeqExist = function(fromNodeDefId, toNodeDefId) {
		for(var key in WFGraph.flowDiagramDic) {
			var lineModel = WFGraph.flowDiagramDic[key].model;
			var fromNode = lineModel.sourceNode;
			var toNode = lineModel.targetNode;
			if (fromNodeDefId == fromNode.model.id 
				&& toNode && toNodeDefId == toNode.model.id) {
				return true;
			}
		}
		return false;
	}
	
	WFGraph.isStartSeqExist = function(nodeDefId) {
		for(var key in WFGraph.flowDiagramDic) {
			var lineModel = WFGraph.flowDiagramDic[key].model;
			var fromNodeModel = lineModel.sourceNode;
			if (nodeDefId == fromNodeModel.model.id && fromNodeModel.model.type == "startEvent") {
				return true;
			}
		}
		return false;
	}
	
	WFGraph.isEndSeqExist = function(nodeDefId) {
		for(var key in WFGraph.flowDiagramDic) {
			var lineModel = WFGraph.flowDiagramDic[key].model;
			var toNodeModel = lineModel.targetNode;
			if (nodeDefId == toNodeModel.model.id && toNodeModel.model.type == "endEvent") {
				return true;
			}
		}
		return false;
	}
	
	WFGraph.getDirection = function (node, point) {
		if (!WF.useStraight() && !point.direction) {
			return WFGraph.lineUtil.calculateQuadrant(node.position, point.x, point.y);
		}
		return point;
	}
	
	WFGraph.drawStraightLineWithToNode = function(line, node, mouseX, mouseY) {
		line.model.targetNode = node;
		var data = {};
		data.fromPos = line.model.sourceNode.position;
		data.fromType = line.model.sourceNode.model.type;
		data.toPos = line.model.targetNode.position;
		data.toType = line.model.targetNode.model.type;
		var newPoints = WFGraph.lineUtil.calculateStraightLineWithToNode(data);
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawAutoLineWithToNode = function(line, node, mouseX, mouseY) {
		line.model.targetNode = node;
		var newPoints = WFGraph.lineUtil.calculateAutoLineWithToNode(line, node, mouseX, mouseY);
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawLineWithToNode = function(line, node, mouseX, mouseY) {
		line.model.targetNode = node;
		var newPoints = WFGraph.lineUtil.calculateLineWithToNode(line, node, mouseX, mouseY);
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawStraightLineWithMouse = function(line, mouseX, mouseY) {
		var data = {}
		data.fromPos = line.model.sourceNode.position;
		data.fromType = line.model.sourceNode.model.type;
		data.mousePos = {x:mouseX, y:mouseY};
		var newPoints;
		var node = WF.getMouseOverSelected();
		if (node) {
			data.toPos = node.position;
			data.toType = node.model.type;
			newPoints = WFGraph.lineUtil.calculateStraightLineWithToNode(data);
		} else {
			newPoints = WFGraph.lineUtil.calculateStraightLineWithMouse(data);
		}
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawAutoLineWithMouse = function(line, mouseX, mouseY) {
		var newPoints;
		var node = WF.getMouseOverSelected();
		if (node) {
			if (node.model.id != line.model.sourceNode.model.id) {
				newPoints = WFGraph.lineUtil.calculateAutoLineWithToNode(line, node, mouseX, mouseY);
			}
		} else {
			newPoints = WFGraph.lineUtil.calculateAutoLineWithMouse(line, mouseX, mouseY);
		}
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawLineWithMouse = function(line, mouseX, mouseY) {
		var newPoints;
		var node = WF.getMouseOverSelected();
		if (node) {
			if (node.model.id != line.model.sourceNode.model.id) {
				newPoints = WFGraph.lineUtil.calculateLineWithToNode(line, node, mouseX, mouseY);
			}
		} else {
			newPoints = WFGraph.lineUtil.calculateLineWithMouse(line, mouseX, mouseY);
		}
		if (newPoints) {
			line.setPath(newPoints);
		}
	}
	
	WFGraph.drawLineWithNode = function(node) {
		for(var key in WFGraph.flowDiagramDic) {
			var line = WFGraph.flowDiagramDic[key];
			var nodeModel = node.model;
			var fromNodeModel = line.model.sourceNode;
			var toNodeModel = line.model.targetNode;
			if (nodeModel.id == fromNodeModel.model.id 
					|| nodeModel.id == toNodeModel.model.id) {
				var newPoints;
				if (WF.useStraight()) {
					var data = {};
					data.fromPos = fromNodeModel.position;
					data.line = line;
					data.toPos = toNodeModel.position;
					data.fromType = fromNodeModel.model.type;
					data.toType = toNodeModel.model.type;
					newPoints = WFGraph.lineUtil.calculateStraightLineWithNode(data, 
							nodeModel.id == fromNodeModel.model.id?true:false);
				} else {
					newPoints = WFGraph.lineUtil.calculateLineWithNode(line, nodeModel);
				}
				// 定位迁移线的位置
				line.setPath(newPoints);
			}
		}
	}
	
	WFGraph.calculateLineWhenMoveEndpoints = function(line, x, y, isMoveStartPoint) {
		var selectedNode = WF.getMouseOverSelected();
		if (WF.useStraight()) {
			return WFGraph.lineUtil.calculateStraightLineWhenMoveEndpoints(line, selectedNode, x, y, isMoveStartPoint);
		}
		var p = WFGraph.lineUtil.calculateLineWhenMoveEndpoints(line, selectedNode, x, y, isMoveStartPoint);
		return p;
	}
	
	WFGraph.addEventToLine = function(currentSeq) {
		mouseClick(currentSeq);
	}
	
	function mouseClick(currentSeq) {
		var graphList = currentSeq.graphList;
		for (var c in graphList) {
			$([graphList[c].node]).bind("click", function(e) {
				if (WF.getSelected() && WF.getSelected().disEditable) {
					WF.getSelected().disEditable();
				}
				// 设置选中的对象为当前迁移线
				WF.setSelected(currentSeq);
				return false;
			});
		};
	}
	
})(jQuery);