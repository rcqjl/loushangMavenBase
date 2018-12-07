(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	var actAdditionList = {};
	
	WFGraph.addEventToNode = function(currentNode) {
		mouseDrag(currentNode);

		var graphList = currentNode.graphList;
		
		for (var m in graphList) {
			$([graphList[m].node]).hover(function(e) {
				WF.setMouseOverSelected(currentNode);
			},function(e) {
				WF.clearMouseOverSelected();
			}).click(function(e) {
				if (WF.getSelected() && WF.getSelected().disEditable) {
					WF.getSelected().disEditable();
				}
				var mousePoint = WF.getMouseXY(e.pageX, e.pageY);
				var data = {node:currentNode, mousePoint:mousePoint};
				WFEvent.trigger("bizClickNode", data);
				
//				$("#dispatcher select").focus();
				return false;
			});
		};
		
		currentNode.toFront = function() {
			for (var o in graphList) {
				graphList[o].toFront();
			};
			for(var key in WFGraph.flowDiagramDic) {
				var line = WFGraph.flowDiagramDic[key];
				var nodeModel = currentNode.model;
				var fromNodeModel = line.model.sourceNode;
				var toNodeModel = line.model.targetNode;
				if (nodeModel.id == fromNodeModel.model.id 
						|| nodeModel.id == toNodeModel.model.id) {
					line.toFront();
				}
			}
		};
		
		currentNode.toBack = function() {
			for (var o in graphList) {
				graphList[o].toBack();
			};
		};
		
		if (currentNode.model.type == "userTask" || 
				currentNode.model.type == "callActivity" ||
				((currentNode.model.type == "inclusiveGateway" || 
						currentNode.model.type == "exclusiveGateway" ||
						currentNode.model.type == "parallelGateway" || 
						currentNode.model.type == "complexGateway") && "1" == WFlow.parameter["editGateway"]) || 
				((currentNode.model.type == "startEvent" || 
						currentNode.model.type == "intermediateCatchEvent" || 
						currentNode.model.type == "endEvent") && "1" == WFlow.parameter["editEvent"])) {
			var gName = currentNode.model.name;
			var N = currentNode.position;
			var taskTextDiv = $("<div class='wfdTaskNameDiv'></div>");
			$("#divDesign").append(taskTextDiv);
			var taskText = $("<textarea></textarea>").text(gName);
			taskText.attr("readonly", true);
			$(taskTextDiv).append(taskText);
			
			if (currentNode.model.type == "callActivity") {
				
			}
			// 通过双击事件使文本可编辑
			$(taskText).bind("click", function(e) {
				$("#divDesign").removeData("wfd_move_document");
				$("#divDesign").removeData("wfd_move_actname");
				currentNode.disEditable();
				var mousePoint = WF.getMouseXY(e.pageX, e.pageY);
				var data = {node:currentNode, mousePoint:mousePoint};
				WFEvent.trigger("bizClickNode", data);
				$(".wfdTaskNameDiv textarea").blur();
				return false;
			}).bind("dblclick", function(e){
				WF.clearSelectedType();
				
				$("#divDesign").removeData("wfd_move_document");
				$("#divDesign").removeData("wfd_move_actname");
				
				$(".wfdTaskNameDiv textarea").attr("readonly", true);
				$(".wfdTaskNameDiv").css("border","0px solid #fff");

				$("#divDesign").data("wfd_editing_actname", true);
				$(taskText).attr("readonly" , false);
				$(taskText).focus();
				$(taskTextDiv).css("border","1px solid #D1E1EE");
			}).blur(function(e){
				var data = {node:currentNode, name : $.trim($(e.target).val())};
				WFEvent.trigger("updateWhenNodeIdChanged", data);
				return false;
			});
			
			// 拖拽事件：拖拽文本时节点随着鼠标位置移动
			$(taskText).bind("mousedown",function(e){
				var mousePoint = WF.getMouseXY(e.pageX, e.pageY);
				var dx = mousePoint.x - N.x;
				var dy = mousePoint.y - N.y;
				var data = {node:currentNode, dx:dx, dy:dy};
				$("#divDesign").data("wfd_move_actname", data);
			});
			
			$(document).mousemove(function(e) {
				if (WF.selectedType() != "sequenceFlow" && 
						$("#divDesign").data("wfd_move_actname")) {
					$("#divDesign").data("wfd_move_document", true);
					var data = $("#divDesign").data("wfd_move_actname");
					var moveingNode = data.node;
					var N = moveingNode.position;
					var T = $.extend(true, {}, N);
					var realXY = WF.getMouseXY(e.pageX, e.pageY);
					T.x = realXY.x-data.dx;
					T.y = realXY.y-data.dy;
					WFGraph.resetBBox(moveingNode, N, T);
				}
			}).mouseup(function(e) {
				if (WF.selectedType() != "sequenceFlow" && 
						$("#divDesign").data("wfd_move_actname") && 
						$("#divDesign").data("wfd_move_document")) {
					var data = $("#divDesign").data("wfd_move_actname");
					var moveingNode = data.node;
					var N = moveingNode.position;
					var T = $.extend(true, {}, N);
					var realXY = WF.getMouseXY(e.pageX, e.pageY);
					T.x = realXY.x-data.dx;
					T.y = realXY.y-data.dy;
					WFGraph.resetBBox(moveingNode, N, T);
					WFGraph.hideRefLine(moveingNode);
				}
				$("#divDesign").removeData("wfd_move_document");
				$("#divDesign").removeData("wfd_move_actname");
			});
			
			$(taskText).hover(function(e){
				WF.setMouseOverSelected(currentNode);
			},function(e) {
				WF.clearMouseOverSelected();
			});
			
			currentNode.showName = function(N) {
				var dx = $("#divDesign").offset().left;
				// 相对于document的y坐标
				var dy = $("#divDesign").offset().top;
				$(taskTextDiv).offset({top: N.y+dy+5, left: N.x+dx+5});
				$(taskTextDiv).width(N.width-12);
				$(taskTextDiv).height(N.height-12);
			};
			
			currentNode.name = function(value) {
				if (gName) {
					gName = value;
					$(taskText).val(value);
				} else {
					return gName;
				}
			};

			currentNode.removeName = function() {
				$(taskTextDiv).empty();
				$(taskTextDiv).remove();
			};
		}
		
		currentNode.disEditable = function() {
			$(".wfdTaskNameDiv textarea").attr("readonly", true);
			$(".wfdTaskNameDiv").css("border","0px solid #fff");
			$("#divDesign").removeData("wfd_editing_actname");
		}

		currentNode.remove = function() {
			for (var o in graphList) {
				graphList[o].remove();
			}
			if (currentNode.removeName) {
				currentNode.removeName();
			}
		};
	}
	
	WFGraph.showNodeAddition = function(currentNode) {
		WFGraph.showOperation({type:'node', node:currentNode});
		WFGraph.showNodeAction(currentNode);
	}
	
	WFGraph.hideNodeAddition = function() {
		WFGraph.hideOperation();
		WFGraph.hideNodeAction();
	}

	function mouseDrag(currentNode) {
		var graphList = currentNode.graphList;
		var N = currentNode.position;
		var type = currentNode.model.type;
		
		// 用于记录拖拽开始时节点的x坐标、y坐标
		var oldX, oldY;
		// 拖拽开始的处理函数
		var onStartFn = function() {
			switch (type) {
				case "userTask" :
				case "callActivity" :
				case "inclusiveGateway" :
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					oldX = N.x;
					oldY = N.y;
					break;
				case "startEvent" :
				case "endEvent" :
				case "intermediateCatchEvent":
					oldX = N.cx;
					oldY = N.cy;
					break;
			}
			
			// 拖拽开始时半透明
			for (var s in graphList) {
				graphList[s].attr({opacity : 0.5});
			}
		};
		
		// 拖拽结束处理函数
		var onEndFn = function() {
			WFGraph.hideRefLine(currentNode);
			// 拖拽结束后不透明
			for (var e in graphList) {
				graphList[e].attr({opacity : 1});
			}
		};

		// 移动处理函数
		var onMoveFn = function(dx, dy) {
			var T = $.extend(true, {}, N);
			switch (type) {
				case "userTask" :
				case "callActivity" :
				case "inclusiveGateway" :
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					T.x = oldX + dx;
					T.y = oldY + dy;
					break;
				case "startEvent" :
				case "endEvent" :
				case "intermediateCatchEvent":
					T.cx = oldX + dx;
					T.cy = oldY + dy;
					T.x = T.cx - T.r;
					T.y = T.cy - T.r;
					T.width = T.r * 2;
					T.height = T.r * 2;
					break;
			}
			WFGraph.resetBBox(currentNode, N, T);
		};
		
		for (var o in graphList) {
			var g = graphList[o];
			g.drag(onMoveFn, onStartFn, onEndFn);
		};
	}
	
	WFGraph.resetBBox = function(currentNode, N, T) {
		// 环节移动时，如果移到左侧、上侧则不允许移动
		var isMove = WF.canDrawOrMove(T.x, T.y);
		if (!isMove) {
			return;
		}
		
		// 参考线对齐
		autoAlignWhenDrag(currentNode, T);
		
		$.extend(true, N, T);
		currentNode.position = N;
		currentNode.resetNodeAndAnchor(N);
		// 更新迁移线的位置
		WFGraph.drawLineWithNode(currentNode);
		// 环节移到时，如果超出绘图区时自动出现滚动条
		WF.setScrollWhenDragNode();
		
		WF.setSelected(currentNode);
	}
	
	WFGraph.drawLineWhenClick = function(currentNode, mousePoint) {
		var currModel = currentNode.model;
		var currActId = currModel.id, currActType = currModel.type;
		var selectedLine = $("#divDesign").data("drawingLine");
		if (selectedLine) {
			var selectedModel = selectedLine.model;
			if (selectedModel.type == "sequenceFlow") {
				if (currActType == "startEvent") {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D167","不能指向开始环节！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					selectedLine.remove();
					WF.removeDrawingLine();
					return false;
				}
				if (currActType == "endEvent" && WFGraph.isEndSeqExist(currActId)) {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D168","结束环节的迁入线已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					selectedLine.remove();
					WF.removeDrawingLine();
					return false;
				}
				var fromNode = selectedModel.sourceNode.model;
				if (fromNode.type == "startEvent" && currActType == "endEvent") {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D169","不能在开始环节和结束环节之间画线！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					selectedLine.remove();
					WF.removeDrawingLine();
					return false;
				}
				if (fromNode.id == currActId) {
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D170","不能在同一环节画线！"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					selectedLine.remove();
					WF.removeDrawingLine();
					return false;
				}
				if (WFGraph.isNodeSeqExist(fromNode.id, currActId)) {
					// 两点之间已经存在顺序流、不再绘制
					showDialog("alert","["+fromNode.name+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D171","和")+"["+currModel.name+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D172","之间的迁移线已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					selectedLine.remove();
					WF.removeDrawingLine();
					return false;
				}
				if (WF.useStraight()) {
					WFGraph.drawStraightLineWithToNode(selectedLine, currentNode, mousePoint.x, mousePoint.y);
				} else {
					if (WF.selectedType() == "sequenceFlow") {
						WFGraph.drawAutoLineWithToNode(selectedLine, currentNode, mousePoint.x, mousePoint.y);
					} else {
						WFGraph.drawLineWithToNode(selectedLine, currentNode, mousePoint.x, mousePoint.y);
					}
				}
				var gModel = selectedLine.model;
				if (gModel.sourceNode && 
						gModel.sourceNode.model.type == "startEvent" && 
						gModel.targetNode) {
					gModel.targetNode.model.isStart = true;
				}
				
				// TODO:增加图形时，通知流程和业务处理各自的模型
				WFEvent.triggerWhenAddGraph(selectedModel);
				
				WFEvent.trigger("wfd_cashe_line", selectedLine);
				WF.removeDrawingLine();
				return false;
			}
		}
		if (currActType == "endEvent") {
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D165","不能从结束环节开始画线！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			if ($("#divDesign").data("wfd_triangle_click")) {
				$("#divDesign").removeData("wfd_triangle_click");
				$("#divDesign").removeData("selectedType");
			}
			return false;
		}
		if (currActType == "startEvent" && WFGraph.isStartSeqExist(currActId)) {
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D166","起始环节的迁出线已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			if ($("#divDesign").data("wfd_triangle_click")) {
				$("#divDesign").removeData("wfd_triangle_click");
				$("#divDesign").removeData("selectedType");
			}
			return false;
		}
		var data = {sourceNode : currentNode, x : mousePoint.x, y : mousePoint.y};
		var line = WFGraph.drawLineFactory("sequenceFlow", data);
		$("#divDesign").data("drawingLine",line);
	}

	var hRefLine = null, vRefLine = null, refPos;
	var isNeedShowH = false, isNeedShowV = false;
	function autoAlignWhenDrag(currentNode, mousePos) {
		isNeedShowH = false;
		isNeedShowV = false;
		refPos = null;
		var curModel = currentNode.model;
		var curActId = curModel.id;
		var range = 10, zone = 200;
		var mouseMidX = mousePos.x+mousePos.width/2, mouseMidY = mousePos.y+mousePos.height/2;
		// 扫描区域：以拖拽节点的中心为中心的宽400高400的区域
		var lbx = mouseMidX-zone, mbx = mouseMidX, rbx = mouseMidX+zone;
		var tby = mouseMidY-zone, mby = mouseMidY, bby = mouseMidY+zone;
		// 左上
		var minX = mousePos.x-range, maxX = mousePos.x+range, 
			minY = mousePos.y-range, maxY = mousePos.y+range;
		// 水平中，垂直中
		var midMinX = mouseMidX-range, midMaxX = mouseMidX+range, 
			midMinY = mouseMidY-range, midMaxY = mouseMidY+range;
		// 右下
		var mouseRightX = mousePos.x+mousePos.width, mouseBottomY = mousePos.y+mousePos.height;
		var rMinX = mouseRightX-range, rMaxX = mouseRightX+range, 
			bMinY = mouseBottomY-range, bMaxY = mouseBottomY+range;
		// 遍历当前节点之外的其他节点
		// 找到距离当前节点的水平方向和垂直方向最近的节点
		// 如果找到则自动对齐
		var hRefLineY, vRefLineX;
		var leftN=0,rightN=0,vMidN=0,topN=0,bottomN=0,hMidN=0;
		var leftArr = new Array(), rightArr = new Array(), 
			vMidArr = new Array(), topArr = new Array(), 
			bottomArr = new Array(), hMidArr = new Array();
		var zoneDic = {};
		var zoneN = 0;
		for (var key in WFGraph.nodeDiagramDic) {
			if (key) {
				var g = WFGraph.nodeDiagramDic[key];
				if (g.model.id != curActId) {
					var nodeP = g.position;
//					// 左右
//					var nodeLeft = nodeP.x, nodeRight = nodeP.x + nodeP.width;
//					// 上下
//					var nodeTop = nodeP.y, nodeBottom = nodeP.y + nodeP.height;
//					if (nodeLeft >= lbx && nodeRight <= rbx && 
//							nodeTop >= tby && nodeBottom <= bby) {
						// 水平中，垂直中
					var hMid = nodeP.x + nodeP.width/2, vMid = nodeP.y + nodeP.height/2;
					if (hMid >= midMinX && hMid <= midMaxX || 
							vMid >= midMinY && vMid <= midMaxY) {
						var x2 = (hMid-mouseMidX)*(hMid-mouseMidX);
						var y2 = (vMid-mouseMidY)*(vMid-mouseMidY);
						var path = Math.sqrt(x2+y2);
						zoneDic[zoneN] = {pos:nodeP, midX:hMid, midY:vMid, path:path};
						zoneN++;
					
					}
//					}
				}
			}
		}
		// {pos:nodeP, midX:hMid, midY:vMid, path:path}
		if (zoneN > 0) {
			for (var i=0; i<zoneN-1; i++) {
				for (var j=0; j<zoneN-1-i; j++) {
					if (zoneDic[j+1].path <= zoneDic[j].path) {
						var temp = zoneDic[j];
						zoneDic[j] = zoneDic[j+1];
						zoneDic[j+1] = temp;
					}
				}
			}
			var minPath = zoneDic[0];
			var minPathMidx=minPath.midX, minPathMidy=minPath.midY;
			var minPos = minPath.pos;
			var minPathRightx = minPos.x+minPos.width;
			var minPathBottomY = minPos.y+minPos.height;
			var x,y;
			if (minPathMidx >= midMinX && minPathMidx <= midMaxX) {
				isNeedShowV = true;
				vMidArr[vMidN] = {pos:nodeP, flag:"mid"};
				vMidN++;
				x=minPathMidx-mousePos.width/2;
			}
			if (minPathMidy >= midMinY && minPathMidy <= midMaxY) {
				isNeedShowH = true;
				hMidArr[hMidN] = {pos:nodeP, flag:"mid"};
				hMidN++;
				y=minPathMidy-mousePos.height/2;
			}
			refPos = $.extend(true, {}, mousePos, {x:x, y:y});
		}
		
		if (isNeedShowH) {
			showHRefLine(mouseMidY);
		} else {
			hideHRefLine();
		}
		if (isNeedShowV) {
			showVRefLine(mouseMidX);
		} else {
			hideVRefLine();
		}
	}
	WFGraph.hideRefLine = function(currentNode) {
		if (isNeedShowH) {
			//根据水平参考线重新设置节点位置
			var N = currentNode.position;
			$.extend(true, N, {x:refPos.x,y:refPos.y});
			currentNode.position = N;
			currentNode.resetNodeAndAnchor(N);
			// 更新迁移线的位置
			WFGraph.drawLineWithNode(currentNode);
			// 环节移到时，如果超出绘图区时自动出现滚动条
			WF.setScrollWhenDragNode();
			
			WF.setSelected(currentNode);
		}
		if (isNeedShowV) {
			//根据垂直参考线重新设置节点位置
			var T = currentNode.position;
			$.extend(true, T, {x:refPos.x,y:refPos.y});
			currentNode.position = T;
			currentNode.resetNodeAndAnchor(T);
			// 更新迁移线的位置
			WFGraph.drawLineWithNode(currentNode);
			// 环节移到时，如果超出绘图区时自动出现滚动条
			WF.setScrollWhenDragNode();
			
			WF.setSelected(currentNode);
		}
		isNeedShowH = false;
		isNeedShowV = false;
		refPos = null;
		
		hideHRefLine();
		hideVRefLine();
	}
	
	function showHRefLine(y) {
		if (hRefLine) {
			var dx = $("#divDesign").width();
			hRefLine.attr({path : "M0 "+y+"H"+dx}).toFront().show();
		} else {
			hRefLine = WFGraph.wfd_R.path("M0 "+y+"H"+dx).toFront().show();
		}
	}
	function hideHRefLine() {
		isNeedShowH = false;
		if (hRefLine) {
			hRefLine.hide();
		}
	}
	function showVRefLine(x) {
		var dy = $("#divDesign").height();
		if (vRefLine) {
			vRefLine.attr({path : "M"+x+" 0V"+dy}).toFront().show();
		} else {
			vRefLine = WFGraph.wfd_R.path("M"+x+" 0V"+dy).toFront().show();
		}
	}
	function hideVRefLine() {
		isNeedShowV = false;
		if (vRefLine) {
			vRefLine.hide();
		}
	}
	
})(jQuery);