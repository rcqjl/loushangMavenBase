(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}

	WFGraph.drawLane = function(nodeInfo) {
		var currLane = this;
		var graphList = {};
		var modelElement = nodeInfo.model;
		this.model = modelElement;
		var gName = modelElement.name;
		
		var gX = nodeInfo.x;
		var gY = nodeInfo.y;
		var gWidth = nodeInfo.width;
		var gHeight = nodeInfo.height;
	
		var N = {x : gX, y : gY, width : gWidth, height : gHeight};
		
		var g_lane = WFGraph.wfd_R.rect(0, 0, nodeInfo.width, nodeInfo.height).attr(nodeInfo.attr).hide();
		var g_drag = WFGraph.wfd_R.rect(0, 0, 2, nodeInfo.height).attr({fill:"#fff",stroke : "#fff",'stroke-width' :4}).hide();
		graphList[modelElement.id + "_rect"] = g_lane;
		graphList[modelElement.id + "_g_drag"] = g_drag;
		
		var oldX, oldY, oldW, oldH;
		var onStartFn = function() {
			if ("true" == currLane.model.isHorizontal) {
				this.attr({cursor : "e-resize"});
			} else {
				this.attr({cursor : "n-resize"});
			}
			oldX = this.attr("x");
			oldY = this.attr("y");
			oldW = N.width;
			oldH = N.height;
		}
		var onMoveFn = function(dx, dy) {
			if ("true" == currLane.model.isHorizontal) {
				if (oldX + dx < N.x + 60) {
					return;
				}
				currLane.resetNodeAndAnchor({width:oldW+dx});
			} else {
				if (oldY + dy < N.y + 60) {
					return;
				}
				currLane.resetNodeAndAnchor({height:oldH+dy});
			}
			
			var startX = currLane.position.x, startY = currLane.position.y;
			var startW = currLane.position.width, startH = currLane.position.height;
			for(var l in WFGraph.laneDiagramDic) {
				var lG = WFGraph.laneDiagramDic[l];
				if ("true" == lG.model.isHorizontal) {
					var tempX = lG.position.x;
					if (tempX > startX) {
						lG.resetNodeAndAnchor({x:startX+startW});
						startX = lG.position.x;
						startW = lG.position.width;
					}
				} else {
					var tempY = lG.position.y;
					if (tempY > startY) {
						lG.resetNodeAndAnchor({y:startY+startH});
						startY = lG.position.y;
						startH = lG.position.height;
					}
				}
			}
			WF.setScrollWhenDragNode();
		}
		g_drag.drag(onMoveFn, onStartFn, function() {this.attr({cursor : "default"});});
		g_drag.hover(function() {
			if ("true" == currLane.model.isHorizontal) {
				this.attr({cursor : "e-resize"});
			} else {
				this.attr({cursor : "n-resize"});
			}
		},function(){
			this.attr({cursor : "default"});
		});
		
		
		var laneNameDiv = $("<div></div>").attr("id", modelElement.id + "_div_name");
		$("#divDesign").append(laneNameDiv);
		var taskText = $("<textarea></textarea>").val(gName).attr(
				"id", modelElement.id + "_name");
		$(laneNameDiv).append(taskText);
		
		var delDiv = $("<div></div>").attr(
				"id", modelElement.id + "_delete").addClass("wfdLaneNameDiv_delete");
		$(laneNameDiv).append(delDiv);
		
		if ("true" == currLane.model.isHorizontal) {
			laneNameDiv.addClass("wfdLaneNameDiv");
		} else {
			laneNameDiv.addClass("wfdLaneNameDiv_vertical");
		}
		
		$(taskText).blur(function(e){
			var data = {node:currLane, name : $.trim($(e.target).val())};
			WFEvent.trigger("updateWhenNodeIdChanged", data);
			return false;
		});
		
		$(delDiv).click(function() {
			if (WF.getSelected() && WF.getSelected().disEditable) {
				WF.getSelected().disEditable();
			}
			
			var data = {selected:currLane};
			WFEvent.trigger("wfd_event_delete_element", data);
			return false;
		});
		
		if (!gWidth) {
			gWidth = nodeInfo.width;
		}
		if (!gHeight) {
			gHeight = nodeInfo.height;
		}
		$.extend(true, N, {width : gWidth, height : gHeight});

		this.position = N;
		this.graphList = graphList;
		
		showNode(N);
		function showNode(N) {
			// 拖拽节点到绘图区的区域：x坐标、y坐标、宽、高
			// 重新设置节点的矩形框、图标、环节名称的位置并展现
			g_lane.attr({x : N.x, y : N.y, width : N.width, height : N.height}).toBack().show();
			
			var dx = $("#divDesign").offset().left;
			var dy = $("#divDesign").offset().top;
			
			if ("true" == currLane.model.isHorizontal) {
				g_drag.attr({x : N.x+N.width-4, y : N.y+20, width:2, height : N.height-40}).toBack().show();
				var h = Number(WFConfig.nodeOperation.h);
				laneNameDiv.offset({top: N.y+dy+1, left: N.x+dx+1});
				laneNameDiv.width(N.width-4);
			} else {
				g_drag.attr({x : N.x+20, y : N.y+N.height-4, width : N.width-40, height:2}).toBack().show();
				
				laneNameDiv.offset({top: N.y+dy+1, left: N.x+dx+1});
				laneNameDiv.height(N.height-4);
			}
		}
		
		this.resetNodeAndAnchor = function(data) {
			N = $.extend(true, N, data);
			currLane.position = N;
			showNode(N);
		};
		
		for (var c in graphList) {
			$([graphList[c].node]).bind("click", function(e) {
				if (WF.getSelected() && WF.getSelected().disEditable) {
					WF.getSelected().disEditable();
				}
				// 设置选中的对象为当前迁移线
				WF.setSelected(currLane);
				return false;
			});
		};
		
		this.remove = function() {
			for (var o in graphList) {
				graphList[o].remove();
			}
			$(laneNameDiv).empty();
			$(laneNameDiv).remove();
			$(delDiv).remove();
		};
		
		this.name = function(value) {
			if (gName) {
				gName = value;
				$(taskText).val(value);
			} else {
				return gName;
			}
		}
	}
})(jQuery);