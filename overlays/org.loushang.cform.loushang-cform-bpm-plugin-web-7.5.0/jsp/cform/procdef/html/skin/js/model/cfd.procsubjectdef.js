(function($){
	var overrideProcDef = {
		subjectKey : "",
		subjectAlias : "",
		subjectOrder : "",
		subjectWidth : "",
		isQueryCondition : false,
		
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("ProcSubjectDef");
			root.setAttribute("subjectKey", this.subjectKey);
			root.setAttribute("subjectAlias" , this.subjectAlias);
			root.setAttribute("subjectOrder", this.subjectOrder);
			root.setAttribute("subjectWidth", this.subjectWidth);
			root.setAttribute("isQueryCondition", this.isQueryCondition);
			return root;
		},
		
		parseXml : function(element) {
			this.subjectKey = element.getAttribute("subjectKey");
			this.subjectAlias = element.getAttribute("subjectAlias");
			this.subjectOrder = element.getAttribute("subjectOrder");
			this.subjectWidth = element.getAttribute("subjectWidth");
			this.isQueryCondition = element.getAttribute("isQueryCondition");
		}
	};
	CFProcSubjectDef = $.inherit(CFBase, overrideProcDef);
})(jQuery);