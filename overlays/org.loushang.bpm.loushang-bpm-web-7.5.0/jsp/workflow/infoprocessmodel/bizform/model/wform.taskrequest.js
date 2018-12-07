(function($){
	var overrideReq = {
		id : "",
		url : "",
		
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("TaskRequest");
			root.setAttribute("id", this.id);
			root.setAttribute("url" , this.url);
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.url = element.getAttribute("url");
		}
	};
	WFormTaskRequest = $.inherit(WFormBase, overrideReq);
})(jQuery);