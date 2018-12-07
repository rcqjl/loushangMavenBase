(function($){
	var overrideSub = {
		type : "",
		fieldId : "",
		fieldName : "",
		subjectKey : "",
		subjectAlias : "",
		
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Subject");
			root.setAttribute("type", this.type);
			root.setAttribute("fieldId" , this.fieldId);
			root.setAttribute("fieldName", this.fieldName);
			root.setAttribute("subjectKey", this.subjectKey);
			root.setAttribute("subjectAlias", this.subjectAlias);
			return root;
		},
		
		parseXml : function(element) {
			this.type = element.getAttribute("type");
			this.fieldId = element.getAttribute("fieldId");
			this.fieldName = element.getAttribute("fieldName");
			this.subjectKey = element.getAttribute("subjectKey");
			this.subjectAlias = element.getAttribute("subjectAlias");
		}
	};
	CFSubject = $.inherit(CFBase, overrideSub);
})(jQuery);