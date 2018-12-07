(function($){
	var overrideEnd = {
		childList : null,
		init:function(){
			this.childList={};
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("EndButtons");
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml(xmlDoc));
			}
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Button") {
					var childModel = new WFormButton();
					childModel.parseXml(child);
					this.childList[i] = childModel;
	         	}
			}
		}
	};
	WFormEndButtons = $.inherit(WFormBase, overrideEnd);
})(jQuery);