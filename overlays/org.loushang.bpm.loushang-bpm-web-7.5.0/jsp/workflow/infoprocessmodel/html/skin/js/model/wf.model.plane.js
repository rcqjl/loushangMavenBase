(function($){
	var overridePlane = {
		bpmnElement : null,
		shapeList : {},
		edgeList : {},

		generateXml : function() {
			var planeXml = WF.xmlDoc.createElement("bpmndi:BPMNPlane");
			// TODO
			planeXml.setAttribute("bpmnElement", WFModel.process.id);
			planeXml.setAttribute("id", "BPMNPlane");
			
			for (var laneId in WFGraph.laneDiagramDic) {
				var lDiagram = WFGraph.laneDiagramDic[laneId];
				if (lDiagram) {
					var lModel = lDiagram.model;
					var shapeXml = WF.xmlDoc.createElement("bpmndi:BPMNShape");
					shapeXml.setAttribute("bpmnElement", lModel.id);
					shapeXml.setAttribute("id", laneId);
					if (lModel.isHorizontal) {
						shapeXml.setAttribute("isHorizontal", lModel.isHorizontal);
					}
					
					var bounds = lDiagram.position;
					
					var boundXml = WF.xmlDoc.createElement("bpmndi:Bounds");
					boundXml.setAttribute("height", bounds.height);
					boundXml.setAttribute("width", bounds.width);
					boundXml.setAttribute("x", bounds.x);
					boundXml.setAttribute("y", bounds.y);
					shapeXml.appendChild(boundXml);
					
					planeXml.appendChild(shapeXml);
				}
			}
			
			for (var shapeId in WFGraph.nodeDiagramDic) {
				var nDiagram = WFGraph.nodeDiagramDic[shapeId];
				if (nDiagram) {
					var nModel = nDiagram.model;
					var shapeXml = WF.xmlDoc.createElement("bpmndi:BPMNShape");
					shapeXml.setAttribute("bpmnElement", nModel.id);
					shapeXml.setAttribute("id", shapeId);
					
					var bounds = nDiagram.position;
					
					var boundXml = WF.xmlDoc.createElement("bpmndi:Bounds");
					boundXml.setAttribute("height", bounds.height);
					boundXml.setAttribute("width", bounds.width);
					boundXml.setAttribute("x", bounds.x);
					boundXml.setAttribute("y", bounds.y);
					shapeXml.appendChild(boundXml);
					
					planeXml.appendChild(shapeXml);
				}
			}
			
			for (var edgeId in WFGraph.flowDiagramDic) {
				var fDiagram = WFGraph.flowDiagramDic[edgeId];
				if (fDiagram) {
					var dModel = fDiagram.model
					var edgeXml = WF.xmlDoc.createElement("bpmndi:BPMNEdge");
					edgeXml.setAttribute("bpmnElement", dModel.id);
					edgeXml.setAttribute("id", edgeId);
					
					var points = fDiagram.pointList;
					
					for (var k in points) {
						var linePoint = points[k];
						var lineXml = WF.xmlDoc.createElement("bpmndi:waypoint");
						lineXml.setAttribute("x", linePoint.x);
						lineXml.setAttribute("y", linePoint.y);
						edgeXml.appendChild(lineXml);
					}
					
					planeXml.appendChild(edgeXml);
				}
			}
			return planeXml;
		},
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.bpmnElement = element.getAttribute("bpmnElement");
			
			for(var k = 0; k < element.childNodes.length; k++) {
				var child = element.childNodes[k];
				if(child.nodeName == "bpmndi:BPMNShape") {
					var shape = new Object();
					shape.id = child.getAttribute("id");
					shape.bpmnElement = child.getAttribute("bpmnElement");
					if (child.getAttribute("isHorizontal")) {
						shape.isHorizontal = child.getAttribute("isHorizontal");
					}
					
					for(var i = 0; i < child.childNodes.length; i++) {
						var bChild = child.childNodes[i];
						if(bChild.nodeName == "bpmndi:Bounds") {
							shape.bounds = {x : Number(bChild.getAttribute("x")), 
									y : Number(bChild.getAttribute("y")), 
									width : Number(bChild.getAttribute("width")), 
									height : Number(bChild.getAttribute("height"))};
						}
					}
					this.shapeList[shape.bpmnElement] = shape;
				} else if(child.nodeName == "bpmndi:BPMNEdge") {
					var edge = new Object();
					edge.id = child.getAttribute("id");
					edge.bpmnElement = child.getAttribute("bpmnElement");
					
					edge.waypointList={};
					var cnt = 0;
					for(var m = 0; m < child.childNodes.length; m++) {
						var eChild = child.childNodes[m];
						if(eChild.nodeName == "bpmndi:waypoint") {
							edge.waypointList[cnt] = {x : Number(eChild.getAttribute("x")), 
									y : Number(eChild.getAttribute("y"))};
							cnt++;
						}
					}
					this.edgeList[edge.bpmnElement] = edge;
				}
			}
		}
	};
	BPMNPlane = $.inherit(BaseElement, overridePlane);
})(jQuery);