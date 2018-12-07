(function($){
	var overrideReqs = {
		childList : null,
		init:function(){
			this.childList=new Array();
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("TaskRequests");
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml(xmlDoc));
			}
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "TaskRequest") {
					var childModel = new WFormTaskRequest();
					childModel.parseXml(child);
					this.childList[childModel.typeId] = childModel;
	         	}
			}
		}
	};
	WFormTaskRequests = $.inherit(WFormBase, overrideReqs);
})(jQuery);