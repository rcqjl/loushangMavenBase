(function($){
	if (typeof WFConfig == "undefined") {
		WFConfig = {};
	};
	
	WFConfig.actCommonCss = {
		attr : {
			fill : "#fff", stroke : "#538FD8",'stroke-width' : 2
		}
	};
	
	WFConfig.userTask = {
		width : 100, height : 55, r : 6 
	};
	
	WFConfig.event = {
		r : 15, 
		startAttr : {
			fill : "#538FD8", stroke : "#538FD8"
		},
		endAttr : {
			fill : "#538FD8", stroke : "#538FD8"
		},
		catchAttr : {
			fill : "#fff", stroke : "#538FD8",'stroke-width' : 2
		}
	};
	
	WFConfig.gateway = {
		width : 50, height : 50 
	};
	
	WFConfig.flowSequence = {
		attr : {
			stroke : "#828282", 'stroke-width' : 2
		}
	};
	
	WFConfig.lane = {
		width : 320, height : 200,
		attr : {
			stroke : "#538FD8",'stroke-width' : 1
		}
	};
	
	WFConfig.nodeAnchor = {
		h : 6,
		attr : {
			fill : "#aaa",
			stroke : "#fff"
		},
		pathAttr : {
			stroke : "#ccc"
		}
	};
	
	WFConfig.lineEndPointAnchor = {
		h : 6,
		attr : {
			fill:"#fff",
			stroke:"#000",
			cursor : "move"
		}
	};
	
	WFConfig.lineMidPoint = {
		h : 6,
		attr : {
			fill:"#000",
			stroke:"#fff",
			'stroke-width' : 2,
			cursor : "move"
		}
	};
	
	WFConfig.lineTurn = {
		width : 50,
		height : 50
	};

	WFConfig.nodeOperation = {
		h : 10,
		attr : {stroke : "#f08c1e",'stroke-width' : 2}
	};


	WFConfig.nodeAction = {
		width : 8, height : 14,
		attr : {fill : '#a4c5e0', stroke : "#a4c5e0"},
		mouseOverAttr : {fill : '#538FD8', stroke : "#538FD8"}
	};
	
	WFConfig.property = {
			showProperty : true
		}
})(jQuery);