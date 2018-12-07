(function($){
	var overrideAction = {
		id : "",
		name : "",
		description : "",
		order : "",
		
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Action");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("description", this.description);
			root.setAttribute("order", this.order);
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.description = element.getAttribute("description");
			this.order = element.getAttribute("order");
		}
	};
	CFAction = $.inherit(CFBase, overrideAction);
})(jQuery);