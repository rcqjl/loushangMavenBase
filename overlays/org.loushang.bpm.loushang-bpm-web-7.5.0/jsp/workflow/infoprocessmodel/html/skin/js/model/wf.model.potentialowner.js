(function($){
	var overridePotentialowner = {
		expressionId : null,
		language : null,
		typeId : null,
		typeName :null,
		itemId : null,
		itemName : null,
		organId : null,
		organName : null,
		internalId : null,

		generateXml : function() {
			// 流程
			var pOwner = WF.xmlDoc.createElement("potentialOwner");
			pOwner.setAttribute("id", this.id);
			pOwner.setAttribute("name" , this.name);
			
			var resourceAssignmentExpression = WF.xmlDoc.createElement("resourceAssignmentExpression");
			pOwner.appendChild(resourceAssignmentExpression);
			
			var expression = WF.xmlDoc.createElement("expression");
			expression.setAttribute("id" , this.expressionId);
			expression.setAttribute("language" , this.language);
			var partyData = "typeName="+this.typeId+"|"+this.typeName+",itemName="+this.itemId+"|"+
				this.itemName+",itemValue="+this.organId+"|"+this.organName;
			var textNode = WF.xmlDoc.createTextNode(partyData);
			expression.appendChild(textNode);
			resourceAssignmentExpression.appendChild(expression);
			
			return pOwner;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     switch (child.nodeName) {
				     case "resourceAssignmentExpression":
				    	 for (var m = 0; m < child.childNodes.length; m++) {
						     var sChild = child.childNodes[m];
						     switch (sChild.nodeName) {
							     case "expression":
							    	 this.expressionId = sChild.getAttribute("id");
							    	 this.language = sChild.getAttribute("language");
							    	 if (sChild.childNodes.length > 0 && sChild.childNodes[0].nodeValue) {
							    		 var textNode = sChild.childNodes[0].nodeValue;
								    	 var arr = textNode.split(",");
								    	 var typeName = (arr[0].split("="))[1];
								    	 this.typeId = typeName.split("|")[0];
										 this.typeName = typeName.split("|")[1];
										 var itemName = (arr[1].split("="))[1];
										 this.itemId = itemName.split("|")[0];
										 this.itemName = itemName.split("|")[1];
										 var itemValue = (arr[2].split("="))[1];
										 this.organId = itemValue.split("|")[0];
										 this.organName = itemValue.split("|")[1];
										 this.internalId = this.typeId+"|"+this.itemId+"|"+this.organId;
							    	 }
							    	 break;
						     }
						}
				    	break;
			     }
			}
		}
	};
	Potentialowner = $.inherit(FlowElement, overridePotentialowner);
})(jQuery);