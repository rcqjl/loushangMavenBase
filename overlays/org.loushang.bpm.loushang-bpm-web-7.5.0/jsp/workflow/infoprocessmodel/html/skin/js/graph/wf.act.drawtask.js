(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}

	WFGraph.drawTask = function(nodeInfo) {
		var currentNode = this;
		var graphList = {};
		
		this.model = nodeInfo.model;
		
		var nodeTaskRect = WFGraph.wfd_R.rect(0, 0, nodeInfo.width, nodeInfo.height, nodeInfo.r).attr(nodeInfo.attr).hide();
		graphList[nodeInfo.model.id + "_rect"] = nodeTaskRect;

		var N = {x : nodeInfo.x, y : nodeInfo.y, width : nodeInfo.width, height : nodeInfo.height};
		this.position = N;
		this.graphList = graphList;
		this.resetNodeAndAnchor = function (data) {
			N = $.extend(true, N, data);
			currentNode.position = N;
			showNode(N);
		};
		
		WFGraph.addEventToNode(currentNode);
		
		showNode(N);
		function showNode(N) {
			// 拖拽节点到绘图区的区域：x坐标、y坐标、宽、高
			// 重新设置节点的矩形框、图标、环节名称的位置并展现
			nodeTaskRect.attr({x : N.x, y : N.y, width : N.width, height : N.height}).show();
			
			if (currentNode.showName) {
				currentNode.showName(N);
			}
		}
	}
})(jQuery);