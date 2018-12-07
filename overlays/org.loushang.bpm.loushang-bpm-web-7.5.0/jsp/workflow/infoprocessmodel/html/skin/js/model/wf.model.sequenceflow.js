(function($){
	var overrideSeq = {
		type : "sequenceFlow",
		sourceRef : null,
		targetRef : null,
		sourceNode : null,
		targetNode : null,
		// 迁移条件
		expObj : null,
		// 目前没有扩展,
		generateXml : function() {
			// 流程
			var seqFlow = WF.xmlDoc.createElement(this.type);
			seqFlow.setAttribute("id", this.id);
			if(this.name==null)
				this.name="";
			seqFlow.setAttribute("name" , this.name);
			seqFlow.setAttribute("sourceRef", this.sourceNode.model.id);
			seqFlow.setAttribute("targetRef", this.targetNode.model.id);
			if(this.expObj){
				var expXml = WF.xmlDoc.createElement("conditionExpression");
				if (this.expObj.id) {
					expXml.setAttribute("id" , this.expObj.id);
				} else {
					expXml.setAttribute("id" , "exp_"+this.id);
				}
				expXml.setAttribute("language" ,this.expObj.language);
				var textNode = WF.xmlDoc.createTextNode(this.expObj.expression);
				expXml.appendChild(textNode);
				seqFlow.appendChild(expXml);
			}
			return seqFlow;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.sourceRef = element.getAttribute("sourceRef");
			this.targetRef = element.getAttribute("targetRef");
			
			for (var m = 0; m < element.childNodes.length; m++) {
			     var child = element.childNodes[m];
			     switch (child.nodeName) {
				     case "conditionExpression":
				    	 this.expObj = {};
				    	 this.expObj.language = child.getAttribute("language");
						 this.expObj.id = child.getAttribute("id");
						 if (child.childNodes.length > 0 && child.childNodes[0].nodeValue) {
							 this.expObj.expression = child.childNodes[0].nodeValue;
						 }
				    	 break;
			     }
			}
		}
	};
	SequenceFlow = $.inherit(FlowElement, overrideSeq);
})(jQuery);