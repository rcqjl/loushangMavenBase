(function($){
	var reStart = {
		type : "startEvent",
		timerEventList:null,

		generateXml : function() {
			// 流程
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);
			
			if (this.timerEventList) {
				for(var t in this.timerEventList){
					var timerObj = this.timerEventList[t];
					var timerXml = WF.xmlDoc.createElement("timerEventDefinition");
					act.appendChild(timerXml);
					
					var cycleXml = WF.xmlDoc.createElement("timeCycle");
					timerXml.appendChild(cycleXml);
					cycleXml.setAttribute("language", timerObj.language);	
					if (timerObj.expression) {
						var exp = WF.xmlDoc.createTextNode(timerObj.expression);
						cycleXml.appendChild(exp);
					}
				}
			}
			
			return act;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     switch (child.nodeName) {
				     case "timerEventDefinition":
				    	 if (!this.timerEventList) {
				    		 this.timerEventList = new Array();
				    	 }
				    	 for (var m = 0; m < child.childNodes.length; m++) {
						     var sChild = child.childNodes[m];
						     switch (sChild.nodeName) {
							     case "timeCycle":
							    	 var timerDef = {};
							    	 timerDef.language = sChild.getAttribute("language");
							    	 if (sChild.childNodes.length > 0 && sChild.childNodes[0].nodeValue) {
							    		 timerDef.expression = cycleElement.nodeValue;
							    	 }
							    	 this.timerEventList.push(timerDef);
							    	 break;
						     }
				    	 }
				    	 break;
			     }
			}
		}
	};
	CatchEvent = $.inherit(FlowElement, reStart);
})(jQuery);
(function($){
	var reEnd = {
		type : "endEvent",
		// 目前没有扩展,
		generateXml : function() {
			// 流程
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);
			
			return act;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
		}
	};
	ThrowEvent = $.inherit(FlowElement, reEnd);
})(jQuery);