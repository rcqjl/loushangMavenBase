(function($){
	var overrideForm = {
		id : "",
		name : "",
		
		childList : null,

		init:function(){
			this.childList={};
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Form");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml());
			} 
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			
			
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "SubForm") {
					var childModel = new CFSubForm();
					childModel.init();
					childModel.parseXml(child);
					this.childList[childModel.id] = childModel;
	         	}
				if(child.nodeName == "Field"){
					var childModel=new CFField();
					childModel.parseXml(chiild);
					this.childList[childModel.id]=childModel;
				}
			}
		}
	};
	CFForm = $.inherit(CFBase, overrideForm);
})(jQuery);