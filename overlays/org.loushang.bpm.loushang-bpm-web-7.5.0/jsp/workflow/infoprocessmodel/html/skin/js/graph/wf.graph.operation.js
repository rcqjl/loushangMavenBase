(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	var delDiv;
	
	WFGraph.showOperation = function(data) {
		var dx = $("#divDesign").offset().left;
		var dy = $("#divDesign").offset().top;
		var h = Number(WFConfig.nodeOperation.h);
		var rx, ry, delX,delY;
		var currG = data.node;
		switch(data.type) {
			case "lane":
				var L = currG.position;
				rX = L.x + L.width - h - 4;
				tY = L.y + 4;
				break;
			case "flow":
				var sp = currG.pointList[0];
				var ep = currG.pointList[1];
				var mx = (sp.x + ep.x)/2, my = (sp.y + ep.y)/2;
				rX = mx - h - 10;
				tY = my - h - 10;
				break;
			case "node":
				var N = currG.position;
				rX = N.x + N.width + 4;
				tY = N.y - h - 4;
				break;
		}
		delX = rX+dx;
		delY = tY+dy;
		delDiv.show().offset({top: delY, left: delX});
	}

	WFGraph.hideOperation = function() {
		delDiv.hide();
	}
	
	WFGraph.drawOperation = function() {
		delDiv = $("<div></div>").addClass("wfdDeleteOperation").hide();
		$("#divDesign").append(delDiv);
		
		delDiv.click(function() {
			var data = {selected:WF.getSelected()};
			WFEvent.trigger("wfd_event_delete_element", data);
			return false;
		});
	}
})(jQuery);