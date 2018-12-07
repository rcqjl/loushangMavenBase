(function($){
	var overrideButton = {
		id : "",
		name : "",
		funName : "",
		order : "",
		description : "",
		generateXml : function(xmlDoc){
			var root = xmlDoc.createElement("Button");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("funName", this.funName);
			root.setAttribute("order", this.order);
			root.setAttribute("description",this.description);
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.funName = element.getAttribute("funName");
			this.order = element.getAttribute("order");
			this.description = element.getAttribute("description");
		}
	};
	WFormButton = $.inherit(WFormBase, overrideButton);
})(jQuery);