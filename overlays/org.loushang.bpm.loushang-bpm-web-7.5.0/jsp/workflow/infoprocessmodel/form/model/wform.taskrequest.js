(function($){
	var overrideReq = {
		typeId : "",
		requestId : "",
		requestName : "",
		
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("TaskRequest");
			root.setAttribute("typeId", this.typeId);
			root.setAttribute("requestId", this.requestId);
			root.setAttribute("requestName" , this.requestName);
			return root;
		},
		
		parseXml : function(element) {
			this.typeId = element.getAttribute("typeId");
			this.requestId = element.getAttribute("requestId");
			this.requestName = element.getAttribute("requestName");
		}
	};
	WFormTaskRequest = $.inherit(WFormBase, overrideReq);
})(jQuery);