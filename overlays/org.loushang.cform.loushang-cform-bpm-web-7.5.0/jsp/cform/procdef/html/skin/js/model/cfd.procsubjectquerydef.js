(function($){
	var overrideQueryDef = {
		index : "",
		subjectKey : "",
		subjectFieldType : "",
		subjectOrder : "",
		subjectAlias:"",
		
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Subject");
			root.setAttribute("index", this.index);
			root.setAttribute("subjectKey" , this.subjectKey);
			root.setAttribute("subjectAlias",this.subjectAlias);
			root.setAttribute("subjectFieldType", this.subjectFieldType);
			root.setAttribute("subjectOrder", this.subjectOrder);
			return root;
		},
		
		parseXml : function(element) {
			this.index = element.getAttribute("index");
			this.subjectKey = element.getAttribute("subjectKey");
			this.subjectOrder = element.getAttribute("subjectOrder");
			this.subjectFieldType = element.getAttribute("subjectFieldType");
			this.subjectAlias=element.getAttribute("subjectAlias");
		}
	};
	CFProcSubjectQueryDef = $.inherit(CFBase, overrideQueryDef);
})(jQuery);