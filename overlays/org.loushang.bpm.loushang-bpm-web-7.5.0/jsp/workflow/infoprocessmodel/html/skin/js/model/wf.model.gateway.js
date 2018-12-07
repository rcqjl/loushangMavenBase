(function($){
	var overrideGateway = {
		type : null,
		gatewayDirection : null,
		relativeGateway : null,
		conditionObj:null,
		
		generateXml : function() {
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);
			act.setAttribute("gatewayDirection" , this.gatewayDirection);
			
			// 复杂网关时的网关条件
			if (this.conditionObj) {
				var loopXml = WF.xmlDoc.createElement("activationCondition");
				act.appendChild(loopXml);
				if (this.conditionObj.id) {
					loopXml.setAttribute("id", this.conditionObj.id);
				} else {
					loopXml.setAttribute("id", "multi_"+this.id);
				}
				loopXml.setAttribute("language", this.conditionObj.language);	
				
				if (this.conditionObj.expression) {
					var exp = WF.xmlDoc.createTextNode(this.conditionObj.expression);
					loopXml.appendChild(exp);
				}
			}
			
			if(this.gatewayDirection!="Diverging"){
				if(this.relativeGateway!=null && this.relativeGateway!=""){
					var relativeGateway = WF.xmlDoc.createElement("loushang:relativeDivergingActivity");
					relativeGateway.setAttribute("relativeDivergingActDefId",this.relativeGateway);
					act.appendChild(relativeGateway);
				}
			}
			
			return act;
		},
		
		parseXml : function(element) {
			this.type=element.nodeName;
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.gatewayDirection = element.getAttribute("gatewayDirection");
			
			this.potentialOwnerList={};
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     var pOwner;
			     switch (child.nodeName) {
				     case "activationCondition":
				    	 this.conditionObj = {};
				    	 this.conditionObj.id = child.getAttribute("id");
				    	 this.conditionObj.language = child.getAttribute("language");
						
				    	 if (child.nodeValue) {
				    		 this.conditionObj.expression = child.nodeValue;
				    	 }
				    	 break;
				     case "loushang:relativeDivergingActivity":
				    	 if(this.gatewayDirection!="Diverging"){
							this.relativeGateway = child.getAttribute("relativeDivergingActDefId");
						}
				    	 break;
			     }
			}
		}
	};
	Gateway = $.inherit(FlowElement, overrideGateway);
})(jQuery);