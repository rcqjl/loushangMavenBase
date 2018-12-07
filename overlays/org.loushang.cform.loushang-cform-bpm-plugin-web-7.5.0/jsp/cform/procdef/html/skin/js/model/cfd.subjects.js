(function($){
	var overrideSubs = {
		childList : null,
		
		init:function(){
			this.childList=new Array();
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Subjects");
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml());
			}
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Subject") {
					var childModel = new CFSubject();
					childModel.parseXml(child);
					this.childList[childModel.type+"#"+childModel.subjectKey] = childModel;
	         	}
			}
		}
	};
	CFSubjects = $.inherit(CFBase, overrideSubs);
})(jQuery);