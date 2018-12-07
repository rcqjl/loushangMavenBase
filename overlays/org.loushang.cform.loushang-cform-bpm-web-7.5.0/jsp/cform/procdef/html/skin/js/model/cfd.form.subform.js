(function($){
	var overrideSubForm = {
		id : null,
		name : null,
		isHidden : false, 
		
		childList : null,
		
		init:function(){
			this.childList={};
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("SubForm");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			if(this.isHidden){
				root.setAttribute("isHidden", "true");
			}else{
				root.setAttribute("isHidden", "false");
			}
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				if(childElement.isHidden || childElement.isReadOnly || childElement.isNotNull || childElement.isInitialize)
					root.appendChild(childElement.generateXml());
			}
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.isHidden = element.getAttribute("isHidden");
			if(this.isHidden=="false" ||this.isHidden=="0" || !this.isHidden) this.isHidden=false;else this.isHidden=true;
			this.init();
			
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Field") {
					var childModel = new CFField();
					childModel.parseXml(child);
					this.childList[childModel.id] = childModel;
	         	}
				if(child.nodeName == "SubForm") {
					var childModel = new CFSubForm();
					childModel.init();
					childModel.parseXml(child);
					this.childList[childModel.id] = childModel;
	         	}
			}
		}
	};
	CFSubForm = $.inherit(CFBase, overrideSubForm);
})(jQuery);