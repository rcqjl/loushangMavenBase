(function($){
	var overrideDaiban = {
		childList : null,
		init:function(){
		this.childList=new Array();
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Fields");
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml(xmlDoc));
			}
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Field") {
					var childModel = new WFormField();
					childModel.parseXml(child);
					this.childList[i] = childModel;
	         	}
			}
		}
	};
	WFormFields = $.inherit(WFormBase, overrideDaiban);
})(jQuery);