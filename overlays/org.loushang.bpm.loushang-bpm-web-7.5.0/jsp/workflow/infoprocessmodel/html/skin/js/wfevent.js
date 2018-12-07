(function($){
	if (typeof WFEvent == "undefined") {
		WFEvent = {};
	}

	// TODO:delte
	WFEvent.bind = function(eventName, method) {
		$(WFEvent).bind(eventName, method);
	};
	// TODO:delte
	WFEvent.trigger = function(eventName, args) {
		$(WFEvent).trigger(eventName, args);
	};
	
	
	/**
	 * 增加节点/迁移线时
	 * 1）触发事件”wf_event_add_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）模型（model）
	 * 2）触发事件“wf_event_add_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerWhenAddGraph = function(model) {
		var bData = {eventType:model.type, model:model};
		WFlow.trigger(WFlow.event.WF_ADD_BASIC_MODEL, bData);
		
		var mData = {eventType:model.type, id:model.id, name:model.name, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_ADD_MODEL, mData);
	}
	
	/**
	 * 删除节点/迁移线时
	 * 1）触发事件”wf_event_delete_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * 2）触发事件“wf_event_delete_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerWhenDeleteGraph = function(model) {
		var bData = {eventType:model.type, model:model};
		WFlow.trigger(WFlow.event.WF_DELETE_BASIC_MODEL, bData);
		
		var mData = {eventType:model.type, id:model.id, name:model.name, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_DELETE_MODEL, mData);
	}
	
	/**
	 * 图形上的环节的ID和名称变化时
	 * 1）触发事件”wf_event_update_basic_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）模型（model）
	 *    3）原始ID（orgId）
	 * 2）触发事件“wf_event_update_model”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 *    4）原始ID（orgId）
	 * @param model
	 */
	WFEvent.triggerWhenUpdateGraph = function(model, orgId) {
		var bData = {eventType:model.type, model:model, orgId:orgId};
		WFlow.trigger(WFlow.event.WF_UPDATE_BASIC_MODEL, bData);
		
		var mData = {eventType:model.type, id:model.id, name:model.name, orgId:orgId, innerId:model.innerId};
		WFlow.trigger(WFlow.event.WF_UPDATE_MODEL, mData);
		
		switch(model.type) {
			case "process":
				WF.clearSelectedType();
				WF.clearSelectedAndHideAnchor();
				// 选中图形时，通知流程和业务展现各自的属性面板
				WFEvent.triggerShowProperty(WFModel.process);
				break;
			case "lane":
				break;
			case "sequenceFlow":
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
				WFEvent.triggerShowProperty(model);
				break;
		}
	}
	
	/**
	 * 选中节点/迁移线 或 单击绘图区的空白区域时，展现属性面板
	 * 1）触发事件”wf_event_show_basic_property”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）模型（model）
	 * 2）触发事件“wf_event_show_property”，需要传递的参数：
	 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
	 *    2）环节/迁移线ID（id）
	 *    3）环节/迁移线名称（name）
	 * @param model
	 */
	WFEvent.triggerShowProperty = function(model) {
		var bData = {eventType:model.type, model:model};
		WFlow.trigger(WFlow.event.WF_SHOW_BASIC_PROPERTY, bData);
		
		var mData = {eventType:model.type, id:model.id, name:model.name, innerId:model.innerId, isStart:model.isStart};
		WFlow.trigger(WFlow.event.WF_SHOW_PROPERTY, mData);
	}
	
	WFEvent.init = function() {
		/**
		 * 解析BPMN模型时，绘图
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）图形ID（id）
		 *    3）图形名称（name）
		 *    4）图形关联的模型（model）
		 *    5）图形位置：x、y、width、height、sourceNode、targetNode、waypointList
		 */
		WFlow.bind(WFlow.event.WF_ADD_DIAGRAM, function(e, data){
			var type = data.eventType;
			switch(type) {
				case "process":
					break;
				case "lane":
					var laneDiagram = WFGraph.drawLaneFactory(type, data);
					if (laneDiagram) {
						WFGraph.laneDiagramDic[data.model.innerId] = laneDiagram;
					}
					break;
				case "sequenceFlow":
					var lineDiagram = WFGraph.drawLineFactory(type, data);
					if (lineDiagram) {
						WFGraph.flowDiagramDic[data.model.innerId] = lineDiagram;
					}
					break;
				case "userTask":
				case "callActivity":
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
				case "startEvent":
				case "endEvent":
				case "intermediateCatchEvent":
					var nodeDiagram = WFGraph.drawNodeFactory(type, data);
					if (nodeDiagram) {
						WFGraph.nodeDiagramDic[data.model.innerId] = nodeDiagram;
					}
					break;
			}
		});
		
		/**
		 * 修改了属性面板的ID和名称时，需要更新图形的名称
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）模型（model）
		 */
		WFlow.bind(WFlow.event.WF_UPDATE_DIAGRAM, function(e, data) {
			var type = data.eventType, model = data.model, innerId = model.innerId;
			model.name = data.updateInfo.name;
			switch(type) {
				case "process":
					if (WFlow.parameter["isRelease"] != "1") {
						model.id = data.updateInfo.id;
					}
					WFModel.model().name = model.name;
					break;
				case "lane":
					break;
				case "sequenceFlow":
					var lineDiagram = WFGraph.flowDiagramDic[innerId];
					if (lineDiagram) {
						if (model.isNew) {
							model.id = data.updateInfo.id;
						}
						lineDiagram.name(model.name);
					}
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
					var nodeDiagram = WFGraph.nodeDiagramDic[innerId]; 
					if (nodeDiagram) {
						if (model.isNew) {
							model.id = data.updateInfo.id;
						}
						if (nodeDiagram.name) {
							nodeDiagram.name(model.name);
						}
					}
					break;
			}
			// 2)那么触发事件"wf_event_update_model "通知相关业务
			var mData = {eventType:type, id:model.id, name:model.name, orgId:data.orgId, innerId:model.innerId};
			WFlow.trigger(WFlow.event.WF_UPDATE_MODEL, mData);
		});
		
		// 绑定自定义事件：增加节点时触发
		WFEvent.bind("wfd_add_element", function(event, type, position) {
			var data = $.extend(true, {}, position);
			var node = WFGraph.drawNodeFactory(type, data);
			if (node) {
				WFEvent.trigger("wfd_cashe_element", node);
				WF.setScrollWhenDragNode();
				WF.setSelected(node);
				
				// 增加图形时，通知流程和业务处理各自的模型
				var model = node.model;
				WFEvent.triggerWhenAddGraph(model);
				// 选中图形时，通知流程和业务展现各自的属性面板
				WFEvent.triggerShowProperty(model);
			}
		});
		
		WFEvent.bind("wfd_add_lane", function(event, type, position) {
			var data = $.extend(true, {}, position);
			var lane = WFGraph.drawLaneFactory(type, data);
			if (lane) {
				if (!WFModel.process.laneSet) {
					WFModel.process.laneSet = new LaneSet();
				}
				
				var model = lane.model;
				WFGraph.laneDiagramDic[model.innerId] = lane;
				WF.setScrollWhenDragNode();
				
				// 增加图形时，通知流程和业务处理各自的模型
				WFEvent.triggerWhenAddGraph(model);
				// 选中图形时，通知流程和业务展现各自的属性面板
				WFEvent.triggerShowProperty(model);
			}
		});

		WFEvent.bind("wfd_cashe_element", function(e, node) {
			var nodeElement = node.model;
			WFGraph.nodeDiagramDic[nodeElement.innerId] = node;
		});
		
		WFEvent.bind("wfd_cashe_line", function(e, line) {
			var flowElement = line.model;
			WFGraph.flowDiagramDic[flowElement.innerId] = line;
		});
		
		WFEvent.bind("wfd_delete_node", function(e, node) {
			WFEvent.trigger("cancelDrawLine", {cancel:false});
			var model = node.model;
			if (!model.isNew) {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D152","环节")+"["+model.name+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D154","已经发布，不能删除！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return;
			}
			var id = model.id, innerId = model.innerId;
			for (var innerKey in WFGraph.flowDiagramDic) {
				var tempLine = WFGraph.flowDiagramDic[innerKey];
				var fromModel = tempLine.model.sourceNode.model;
				var toModel = tempLine.model.targetNode.model;
				if (id == fromModel.id || id == toModel.id) {
					WFEvent.trigger("wfd_delete_line", tempLine);
				}
			}
			WFEvent.triggerWhenDeleteGraph(model);
			delete WFGraph.nodeDiagramDic[innerId];
			if (WF.getSelected() && WF.getSelected().model
					&& WF.getSelected().model.id == id) {
				WF.clearSelected();
			}
			node.remove();
			
			WF.setScrollWhenDragNode();
		});
		
		WFEvent.bind("wfd_delete_line", function(e, line) {
			var model = line.model;
			var id = model.id, innerId = model.innerId;
			WFEvent.triggerWhenDeleteGraph(model);
			delete WFGraph.flowDiagramDic[innerId];
			if (WF.getSelected() && WF.getSelected().model
					&& WF.getSelected().model.id == id) {
				WF.clearSelected();
			}
			line.remove();
			
			WF.setScrollWhenDragNode();
		});
		
		WFEvent.bind("wfd_delete_lane", function(e, lane) {
			var model = lane.model;
			var id = model.id, innerId = model.innerId;
			WFEvent.triggerWhenDeleteGraph(model);
			
			delete WFGraph.laneDiagramDic[innerId];
			var startX = lane.position.x, startY = lane.position.y;
			for(var l in WFGraph.laneDiagramDic) {
				var lG = WFGraph.laneDiagramDic[l];
				if ("true" == lG.model.isHorizontal) {
					var tempX = lG.position.x, tempW = lG.position.width;
					if (tempX > startX) {
						lG.resetNodeAndAnchor({x:startX});
						startX = startX+tempW;
					}
				} else {
					var tempY = lG.position.y, tempH = lG.position.height;
					if (tempY > startY) {
						lG.resetNodeAndAnchor({y:startY});
						startY = startY+tempH;
					}
				}
			}
			
			if (WF.getSelected() && WF.getSelected().model
					&& WF.getSelected().model.id == id) {
				WF.clearSelected();
			}
			lane.remove();
			
			WF.setScrollWhenDragNode();
		});
		
		// 绑定自定义事件：删除节点或迁移线时触发
		WFEvent.bind("wfd_event_delete_element", function(event, data) {
			var o = data.selected;
			if (o) {
				var model = o.model;
				var tmpMess = L.getLocaleMessage("BPM.INFOPROCESSMODEL.D155","确定删除");
				switch(model.type) {
					case "lane":
						tmpMess = tmpMess + "【" + model.name + "】";
						break;
					case "sequenceFlow":
						tmpMess = tmpMess + "【" + model.id + "】";
						break;
					default:
						tmpMess = tmpMess + "【" + model.name + "】";
						break;
				}
				tmpMess = tmpMess + L.getLocaleMessage("BPM.INFOPROCESSMODEL.D156","吗？");
				showConfirm(tmpMess, function() {
					switch(model.type) {
						case "lane":
							WFEvent.trigger("wfd_delete_lane", o);
							break;
						case "sequenceFlow":
							WFEvent.trigger("wfd_delete_line", o);
							break;
						default:
							WFEvent.trigger("wfd_delete_node", o);
							break;
					}
				}, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				
			}
		});
		
		WFEvent.bind("cancelDrawLine", function(e, data) {
			if (WF.selectedType() == "sequenceFlow" || 
					$("#divDesign").data("drawingLine")) {
				var line = $("#divDesign").data("drawingLine");
				if (line && line.model.type == "sequenceFlow") {
					WFEvent.trigger("wfd_delete_line", line);
					$("#divDesign").removeData("wfd_triangle_click");
					$("#divDesign").removeData("drawingLine");
					WF.clearSelectedType();
					data.cancel = true;
				}
			}
		});
		
		WFEvent.bind("bizClickNode", function(e, data) {
			var currentNode = data.node;
			if (WF.selectedType() == "sequenceFlow" || $("#divDesign").data("wfd_triangle_click")) {
				var mousePoint = data.mousePoint;
				WFGraph.drawLineWhenClick(currentNode, mousePoint);
			} else {
				WF.setSelected(currentNode);
				// 选中图形时，通知流程和业务展现各自的属性面板
				var model = currentNode.model;
				WFEvent.triggerShowProperty(model);
			}
			return false;
		});
		
		WFEvent.bind("updateWhenNodeIdChanged", function(e, data) {
			var currentNode = data.node;
			var model = currentNode.model;
			if (model.name == data.name) {
				return;
			}
			if (model.type == "lane") {
				if (!data.name) {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D157","名称不能为空！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					currentNode.name(model.name);
					return;
				}
				for (var key in WFGraph.laneDiagramDic) {
					var lane = WFGraph.laneDiagramDic[key];
					if (lane.model.name == data.name) {
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D017","名称")+"["+data.name+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D151","已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
						currentNode.name(model.name);
						return;
					}
				}
			} else {
				
				var ret = WFlow.validateNodeName(data.name);
				if (!ret) {
					currentNode.name(model.name);
					return;
				}
			}
			var oldActId = model.id;
			model.name = data.name;
			WFEvent.triggerWhenUpdateGraph(model, oldActId);
		});
		
		function isNodeExist(actName) {
			for (var key in WFGraph.nodeDiagramDic) {
				var act = WFGraph.nodeDiagramDic[key];
				if (act.model.name == actName) {
					return true;
				}
			}
			return false;
		}
		
		// 单击绘图区时
		$("#divDesign").click(function(event) {
			if (WF.selectedType()) {
				var data = {cancel:false};
				WFEvent.trigger("cancelDrawLine", data);
				if (data.cancel == true) {
					return;
				}
				if (WF.selectedType() != "sequenceFlow") {
					var temp = WF.getMouseXY(event.pageX, event.pageY);
					if (WF.selectedType() == "lane") {
						WFEvent.trigger("wfd_add_lane", [WF.selectedType(), temp]);
						return false;
					}
					
					var isMove = WF.canDrawOrMove(temp.x, temp.y);
					if (isMove == false) {
						return;
					}
					WFEvent.trigger("wfd_add_element", [WF.selectedType(), temp]);
					return false;
				}
			}
			WF.clearSelectedType();
			WF.clearSelectedAndHideAnchor();
			// 选中图形时，通知流程和业务展现各自的属性面板
			WFEvent.triggerShowProperty(WFModel.process);
			
			return false;
		}).mousemove(function(e) {
			if (WF.selectedType() == "sequenceFlow" || 
					$("#divDesign").data("wfd_triangle_click")) {
				var line = $("#divDesign").data("drawingLine");
				if (line && line.model.type == "sequenceFlow") {
					var mousePoint = WF.getMouseXY(e.pageX, e.pageY);
					if (WF.useStraight()) {
						WFGraph.drawStraightLineWithMouse(line, mousePoint.x, mousePoint.y);
					} else {
						if (WF.selectedType() == "sequenceFlow") {
							WFGraph.drawAutoLineWithMouse(line,mousePoint.x, mousePoint.y);
						} else {
							WFGraph.drawLineWithMouse(line,mousePoint.x, mousePoint.y);
						}
					}
				}
			}
		}).mousedown(function(event) {
			// 单击鼠标右键时，清除选中节点及选中组件类型
			if (3 == event.which) {
				$("#btnSelect").trigger("click");
			}
		}).bind("contextmenu", function(){
			return false;
		});
		
//		$.contextMenu({
//			selector: '#divDesign', 
//			callback: function(key, options) {
//				var data = {selected:WF.getSelected()};
//				WFEvent.trigger("wfd_event_delete_element", data);
//			},
//			items: {
//				"delete": {name: "删除", icon: "delete"}
//			}
//		});
		
		$("#divProperty, #divTool").mouseover(function(e) {
			WFEvent.trigger("cancelDrawLine", {cancel:false});
		});
		
		$(document).click(function(e) {
			var x = e.pageX, y = e.pageY;
			var toolLeft = $("#divTool").offset().left;
			var toolRight = toolLeft + $("#divTool").width();
			var mainLeft = $("#divMain").offset().left;
			var mainRight = $("#divMain").width();
			
			if (x >= toolLeft && x <= toolRight && y >= $("#divTool").offset().top) {
				return;
			}
			if (x >= mainLeft && x <= mainRight && y >= $("#divMain").offset().top) {
				return;
			}
			WF.clearSelectedType();
		}).keydown(function(event) {
			if(46 == event.keyCode) {
				if (WF.getSelected() && $("#divDesign").data("wfd_editing_actname")) {
					return;
				}
				var data = {selected:WF.getSelected()};
				WFEvent.trigger("wfd_event_delete_element", data);
			}
		});
	}
})(jQuery);