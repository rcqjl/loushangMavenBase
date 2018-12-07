(function($){
	var overrideDyns = {
		childList : null,
		init:function(){
			this.childList={};
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("DynamicParameters");
			var daiBanParameter=xmlDoc.createElement("daiBanTaskDynamicParameter");
			for (var i in this.childList) {
				var childElement = this.childList[i];
				daiBanParameter.appendChild(childElement.generateXml(xmlDoc));
			}
			root.appendChild(daiBanParameter);
			var yiBanParameter=xmlDoc.createElement("yiBanTaskDynamicParameter");
			for (var i in this.childList) {
				var childElement = this.childList[i];
				yiBanParameter.appendChild(childElement.generateXml(xmlDoc));
			}
			root.appendChild(yiBanParameter);
			var endParameter=xmlDoc.createElement("endTaskDynamicParameter");
			for (var i in this.childList) {
				var childElement = this.childList[i];
				endParameter.appendChild(childElement.generateXml(xmlDoc));
			}
			root.appendChild(endParameter);
			var monitorParameter=xmlDoc.createElement("monitorTaskDynamicParameter");
			for (var i in this.childList) {
				var childElement = this.childList[i];
				monitorParameter.appendChild(childElement.generateXml(xmlDoc));
			}
			root.appendChild(monitorParameter);
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var taskParamNode = element.childNodes[i];
				if(taskParamNode.nodeName == "daiBanTaskDynamicParameter" ||
						taskParamNode.nodeName == "yiBanTaskDynamicParameter" ||
						taskParamNode.nodeName == "endTaskDynamicParameter" ||
						taskParamNode.nodeName == "monitorTaskDynamicParameter") {
					for (var j = 0; j < taskParamNode.childNodes.length; j++) {
						var child = taskParamNode.childNodes[j];
						if(child.nodeName == "parameter") {
							var childModel = new WFormParameter();
							childModel.parseXml(child);
							this.childList[childModel.key] = childModel;
			         	}
					}
	         	}
			}
		}
	};
	WFormTaskParameters = $.inherit(WFormBase, overrideDyns);
})(jQuery);