(function($){
	var overrideLaneSet = {
		type:"laneSet",
		
		generateXml : function() {
			var laneSetXml = WF.xmlDoc.createElement("laneSet");
			laneSetXml.setAttribute("id", "laneSet1");
			for (var d in WFModel.process.laneDic) {
				var laneObj = WFModel.process.laneDic[d];
				laneSetXml.appendChild(laneObj.generateXml());
			}
			return laneSetXml;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     var lane = new Lane();
			     lane.parseXml(child);
			     WFModel.process.laneDic[lane.id] = lane;
			}
		}
	};
	LaneSet = $.inherit(BaseElement, overrideLaneSet);
	var overrideLane = {
		type:"lane",
		name:null,
		isHorizontal:"true",
		flowNodeRefList:{},
		
		generateXml : function() {
			var laneXml = WF.xmlDoc.createElement("lane");
			laneXml.setAttribute("id", this.id);
			laneXml.setAttribute("name", this.name);
			for (var e in this.flowNodeRefList) {
				var flowXml = WF.xmlDoc.createElement("flowNodeRef");
				var textNode = WF.xmlDoc.createTextNode(this.laneList[e]);
				flowXml.appendChild(textNode);
				laneXml.appendChild(flowXml);
			}
			return laneXml;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			for (var m = 0; m < element.childNodes.length; m++) {
			     var flowChild = element.childNodes[m];
			     var actId = flowChild[0].nodeValue;
			     this.flowNodeRefList[actId] = actId;
			}
		}
	};
	Lane = $.inherit(BaseElement, overrideLane);
})(jQuery);