(function($){
	var overridePara = {
		key : "",
		value : "",
		
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("parameter");
			root.setAttribute("key", this.key);
			root.setAttribute("value" , this.value);
			return root;
		},
		
		parseXml : function(element) {
			this.key = element.getAttribute("key");
			this.value = element.getAttribute("value");
		}
	};
	WFormParameter = $.inherit(WFormBase, overridePara);
})(jQuery);