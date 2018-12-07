(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {};
	}
	
	WFGraph.drawEvent = function(nodeInfo) {
		var currentNode = this;
		var graphList = {};
		
		this.model = nodeInfo.model;

		var nodeEvent = WFGraph.wfd_R.circle(0, 0, nodeInfo.r).attr(nodeInfo.attr).hide();
		graphList[nodeInfo.model.id + "_evt"] = nodeEvent;
		switch (nodeInfo.model.type) {
			case "startEvent" :
				var sInner = WFGraph.wfd_R.path("M0,0L0,0Z").attr(nodeInfo.startAttr).hide();
				graphList[nodeInfo.model.id + "_startInner"] = sInner;
				break;
			case "endEvent" :
				var tmpR = Number(nodeInfo.r)/2;
				var innerEvent = WFGraph.wfd_R.rect(0, 0, tmpR, tmpR).attr(nodeInfo.endAttr).hide();
				graphList[nodeInfo.model.id + "_endInner"] = innerEvent;
				break;
			case "intermediateCatchEvent" :
				var innerCatchEvt = WFGraph.wfd_R.circle(0, 0, Number(nodeInfo.r)/2).attr(nodeInfo.catchAttr).hide();
				graphList[nodeInfo.model.id + "_catchInner"] = innerCatchEvt;
				break;
		}
		
		var gX = nodeInfo.x;
		var gY = nodeInfo.y;
		var gWidth = nodeInfo.width;
		var gHeight = nodeInfo.height;
		if (!gWidth) {
			gWidth = nodeInfo.r * 2;
			gHeight = gWidth;
		}
		var N = {x : gX, y : gY, width : gWidth, height : gHeight};
		var r = gWidth/2, cx = gX + r, cy = gY + r;
		$.extend(true, N, {cx : cx, cy : cy, r : r});
		
		this.position = N;
		this.graphList = graphList;
		this.resetNodeAndAnchor = function (data) {
			N = $.extend(true, N, data);
			this.position = N;
			showNode(N);
		};
		
		WFGraph.addEventToNode(currentNode);
		
		showNode(N);
		function showNode(N) {
			// 拖拽节点到绘图区的区域：x坐标、y坐标、宽、高
			if (N.width > N.height) {
				N.r = N.width/2;
			} else {
				N.r = N.height/2;
			}
			N.width = N.r * 2;
			N.height = N.r * 2;
			N.cx = N.x + N.r;
			N.cy = N.y + N.r;
			nodeEvent.attr({cx : N.cx, cy : N.cy, r: N.r}).show();
			
			switch (nodeInfo.model.type) {
				case "startEvent" :
					var sW = N.width/3;
					var sH = N.height/2;
					var sX = N.cx - sW/2 + 2;
					var sY = N.cy - sH/2;
					var sBottomY = sY + sH;
					var sRightX = sX + sW;
					var sPath = "M" + sX + "," + sY + 
						"L" + sRightX + "," + N.cy + 
						"L" + sX + "," + sBottomY + "Z";
					sInner.attr({path : sPath}).show();
					break;
				case "endEvent" :
					var realH = N.width/3;
					var realX = N.cx - realH/2;
					var realY = N.cy - realH/2;
					innerEvent.attr({x : realX, y : realY, width: realH, height : realH}).show();
					break;
				case "intermediateCatchEvent" :
					innerCatchEvt.attr({cx : N.cx, cy : N.cy, r: N.r/2}).show();
					break;
			}
			if (currentNode.showName) {
				currentNode.showName(N);
			}
		}
	}
})(jQuery);