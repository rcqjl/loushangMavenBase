(function($){
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	WFGraph.drawLine = function (lineInfo) {
		// 记录当前迁移线
		var currentSeq = this;
		var modelElement = lineInfo.model;
		this.model = modelElement;
		var sourceNode = modelElement.sourceNode;
		var targetNode = modelElement.targetNode;
		
		var graphList = {};
		var seqBackGraph = WFGraph.wfd_R.path("M0,0L10,10").attr(
				{stroke : "#fff", 'stroke-width' : 10}).hide();
		graphList[lineInfo.id+"_backSeq"] = seqBackGraph;
		// 迁移线
		var seqLine = WFGraph.wfd_R.path("M0,0L10,10").attr(
				lineInfo.attr).hide();
		graphList[lineInfo.id] = seqLine;
		var seqArrow = WFGraph.wfd_R.path("M0,0L10,10").attr(
				lineInfo.attr).hide();
		graphList[lineInfo.id+"_arrowSeq"] = seqArrow;
		var seqArrow2 = WFGraph.wfd_R.path("M0,0L10,10").attr(
				lineInfo.attr).hide();
		graphList[lineInfo.id+"_arrowSeq2"] = seqArrow2;
		this.graphList = graphList;
		
		var startPoint,endPoint,useAutoDraw = "Y";
		
		this.pointList = {};
		this.useAuto = function(v) {
			if (v) {
				useAutoDraw = v;
			} else {
				return useAutoDraw;
			}
		}
		
		this.startDot = function(v) {
			if (v) {
				startPoint = v;
			} else {
				return startPoint;
			}
		}
		this.endDot = function(v) {
			if (v) {
				endPoint = v;
			} else {
				return endPoint;
			}
		}
		this.dotNum = 0;
		
		this.setPath = function(wayPointList) {
			if (!wayPointList) {
				return;
			}
			var m = 0;
			var tempPList = {};
			for (var j in wayPointList) {
				var tP = wayPointList[j];
				if (tP.direction) {
					tempPList[j] = {x:new Number(tP.x.toFixed(2)), y:new Number(tP.y.toFixed(2)), direction: tP.direction};
				} else {
					tempPList[j] = {x:new Number(tP.x.toFixed(2)), y:new Number(tP.y.toFixed(2))};
				}
				m++;
			}
			var s = tempPList[0], e = tempPList[m-1];
			if (!s.direction) {
				s = WFGraph.getDirection(sourceNode, {x:s.x, y:s.y});
				tempPList[0] = s;
			}
			if (targetNode && !e.direction) {
				e = WFGraph.getDirection(targetNode, {x:e.x, y:e.y});
				tempPList[m-1] = e;
			}
			this.pointList = tempPList;
			this.startDot(s);
			this.endDot(e);
			this.dotNum = m;

			var tempPath = "";
			for (var i in tempPList) {
				var p = tempPList[i];
				if (i != 0 && i != m-1) {
					tempPath = tempPath+"L"+p.x+","+p.y;
				}
			}
			
			//计算箭头
			var seqPath = "M"+s.x+","+s.y+tempPath+"L"+e.x+","+e.y;
			seqLine.attr({path : seqPath}).show();
			var arrow=calculateArrow(tempPList[m-2], e, 6);
			var tmpArrPath = "M"+e.x+","+e.y+"L"+arrow[0].x+","+arrow[0].y;
			seqArrow.attr({path : tmpArrPath}).show();
			var tmpArrPath2 = "M"+e.x+","+e.y+"L"+arrow[1].x+","+arrow[1].y;
			seqArrow2.attr({path : tmpArrPath2}).show();

			var smb = {x:(s.x+tempPList[1].x)/2, y:(s.y+tempPList[1].y)/2};
			var sb = {x:(s.x+smb.x)/2, y:(s.y+smb.y)/2};
			var eN = tempPList[m - 2];
			var emb = {x:(e.x+eN.x)/2, y:(e.y+eN.y)/2};
			var eb = {x:(e.x+emb.x)/2, y:(e.y+emb.y)/2};
			var backSeqPath = "M"+sb.x+","+sb.y+tempPath+"L"+eb.x+","+eb.y;
			seqBackGraph.toBack();
			seqBackGraph.attr({path : backSeqPath}).show();
		};
		
		var points = lineInfo.waypointList;
		if (!points) {
			var linePoint = WFGraph.getDirection(sourceNode, {x:lineInfo.x, y:lineInfo.y});
			var ep;
			switch(linePoint.direction) {
				case "right" : 
					ep = {x : linePoint.x + 10, y : linePoint.y};
					break;
				case "bottom" : 
					ep = {x : linePoint.x, y : linePoint.y + 10};
					break;
				case "left" : 
					ep = {x : linePoint.x - 10, y : linePoint.y};
					break;
				case "top" : 
					ep = {x : linePoint.x, y : linePoint.y - 10};
					break;
				default : 
					ep = {x : linePoint.x+1, y : linePoint.y};
					break;
			}
			points = {0:linePoint, 1:ep};
		}
		
		// 定位迁移线的位置
		this.setPath(points);
		
		WFGraph.addEventToLine(currentSeq);

		this.toBack = function() {
			for (var o in graphList) {
				graphList[o].toBack();
			};
		}

		this.toFront = function() {
			seqLine.toFront();
			seqArrow.toFront();
			seqArrow2.toFront();
			
			seqBackGraph.toBack();
		}
		
		this.remove = function() {
			for (var o in graphList) {
				graphList[o].remove();
			}
		};
		function calculateArrow(fromPoint, toPoint, r) {
			// 从 x 轴到点 (x,y) 之间的角度
			var D = Math.atan2(fromPoint.y - toPoint.y, toPoint.x - fromPoint.x) * (180/Math.PI);
			
			var h = toPoint.x - r * Math.cos(D * (Math.PI/180));
			var f = toPoint.y + r * Math.sin(D * (Math.PI/180));
			var p1x = h + r * Math.cos((D + 120) * (Math.PI/180));
			var p1y = f - r * Math.sin((D + 120) * (Math.PI/180));
			var p2x = h + r * Math.cos((D + 240) * (Math.PI/180));
			var p2y = f - r * Math.sin((D + 240) * (Math.PI/180));
			return [{x : p1x, y : p1y}, {x : p2x, y : p2y}];
		}
	}
	
})(jQuery);