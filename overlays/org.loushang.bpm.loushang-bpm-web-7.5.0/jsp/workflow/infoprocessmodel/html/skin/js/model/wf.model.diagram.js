(function($){
	var overrideDiagram = {
		plane : new BPMNPlane(),
		
		generateXml : function() {
			var diagram = WF.xmlDoc.createElement("bpmndi:BPMNDiagram");
			diagram.setAttribute("id", "BPMNDiagram");
			
			diagram.appendChild(this.plane.generateXml());
			return diagram;
		},
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			
			for(var i = 0; i < element.childNodes.length; i++) {
				if(element.childNodes[i].nodeName == "bpmndi:BPMNPlane") {
					var child = element.childNodes[i];
					this.plane.parseXml(child);
				}
			}
		}
	};
	BPMNDiagram = $.inherit(BaseElement, overrideDiagram);
})(jQuery);