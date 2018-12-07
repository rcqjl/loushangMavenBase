(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	var getPath=function(N){
		var inner_x=N.width/2+N.x;
		var inner_y=N.height+N.y;
		var inner_path="M"+(inner_x-5)+","+inner_y+"L"+(inner_x+5)+","+inner_y+"L"+(inner_x+5)+","+(inner_y-10)
					+"L"+(inner_x-5)+","+(inner_y-10)+"L"+(inner_x-5)+","+inner_y+"M"+inner_x+","+inner_y
					+"L"+inner_x+","+(inner_y-10)+"M"+(inner_x-5)+","+(inner_y-5)+"L"+(inner_x+5)+","+(inner_y-5);
		return inner_path;
	}
	WFGraph.drawCallActivity = function(nodeInfo) {
		var currentNode = this;
		var graphList = {};
		
		this.model = nodeInfo.model;
		
		var nodeTaskRect = WFGraph.wfd_R.rect(0, 0, nodeInfo.width, nodeInfo.height, nodeInfo.r).attr(nodeInfo.attr).hide();
		var inner=WFGraph.wfd_R.path(getPath(nodeInfo)).attr({"stroke":"#333333"}).hide();
		graphList[nodeInfo.model.id + "_rect"] = nodeTaskRect;
		graphList["inner"] = inner;
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
			inner.attr({path:getPath(N)}).show();
			if (currentNode.showName) {
				currentNode.showName(N);
			}
		}
	}
})(jQuery);