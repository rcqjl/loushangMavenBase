(function($){
	var overrideDef = {
		name : L.getLocaleMessage("BPM.INFOPROCESSMODEL.D175","流程"),
		targetNamespace : "http://www.omg.org/spec/BPMN/20100524/MODEL",
		loushang : "http://www.loushang.com",
		bpmndi : "http://www.omg.org/spec/BPMN/20100524/DI",
		
		process : new Process(),
		diagram : new BPMNDiagram(),
		
		generateXml : function() {
			var root = WF.xmlDoc.createElement("definitions");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("xmlns", this.targetNamespace);
			root.setAttribute("xmlns:loushang", this.loushang);
			root.setAttribute("xmlns:bpmndi", this.bpmndi);
			
			root.appendChild(this.process.generateXml());
			root.appendChild(this.diagram.generateXml()); 
			return root;
		},
		
		parseXml : function(element) {
			var definitions = element.getElementsByTagName("definitions")[0];
			this.id = definitions.getAttribute("id");
			this.name = definitions.getAttribute("name");
			if (definitions.getAttribute("xmlns")) {
				this.targetNamespace = definitions.getAttribute("xmlns");
			}
			this.loushang = definitions.getAttribute("xmlns:loushang");
			this.bpmndi = definitions.getAttribute("xmlns:bpmndi");
			
			for (var i = 0; i < definitions.childNodes.length; i++) {
				var child = definitions.childNodes[i];
				if(child.nodeName == "process") {
					this.process.parseXml(child);
	         	} else if(child.nodeName == "bpmndi:BPMNDiagram") {
	         		this.diagram.parseXml(child);
	         	}
			}
		}
	};
	Definition = $.inherit(BaseElement, overrideDef);
})(jQuery);