(function($){
	var overrideSysSubjectScDef = {
		subjectDefId : "",
		dataFieldDefId : "",
		subjectDefName : "",
		init:function(){
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("SysSubjectScDef");
			root.setAttribute("subjectDefId", this.subjectDefId);
			root.setAttribute("dataFieldDefId" , this.dataFieldDefId);
			root.setAttribute("subjectDefName", this.subjectDefName);
			return root;
		},
		
		parseXml : function(element) {
			this.subjectDefId = element.getAttribute("subjectDefId");
			this.dataFieldDefId = element.getAttribute("dataFieldDefId");
			this.subjectDefName = element.getAttribute("subjectDefName");
		}
	};
	WFormSysSubjectScDef = $.inherit(WFormBase, overrideSysSubjectScDef);
})(jQuery);