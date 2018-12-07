(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	WFGraph.drawGateway = function(nodeInfo) {
		var currentNode = this;
		var graphList = {};
		
		this.model = nodeInfo.model;

		var nodeGateway = WFGraph.wfd_R.path("M0 0L1 1L1 0Z").attr(nodeInfo.attr).hide();
		graphList[nodeInfo.model.id + "Rhombus"] = nodeGateway;
		
		var N = {x : nodeInfo.x, y : nodeInfo.y, width : nodeInfo.width, height : nodeInfo.height};
		this.position = N;
		this.graphList = graphList;
		this.resetNodeAndAnchor = function(data) {
			N = $.extend(true, N, data);
			this.position = N;
			showNode(N);
		};
		
		WFGraph.addEventToNode(currentNode);
		
		showNode(N);
		function showNode(N) {
			var mX = N.x + N.width/2;
			var mY = N.y + N.height/2;
			var rX = N.x + N.width;
			var bY = N.y + N.height;
			
			var newV = "M" + mX + " " + N.y + 
				"L" + N.x + " " + mY + 
				"L" + mX + " " + bY + 
				"L" + rX + " " + mY + "Z";
			// 重新设置网关节点的位置并展现
			nodeGateway.attr({path: newV}).show();
			
			if (currentNode.showName) {
				currentNode.showName(N);
			}
		}
	}
})(jQuery);