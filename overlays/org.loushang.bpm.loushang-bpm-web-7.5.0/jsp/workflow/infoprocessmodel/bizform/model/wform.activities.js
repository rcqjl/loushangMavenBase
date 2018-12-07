(function($){
	var overrideActs = {
		childList : null,
		init:function(){
			this.childList=new Array();
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Activities");
			
			for (var i in this.childList) {
				var childElement = this.childList[i];
				root.appendChild(childElement.generateXml(xmlDoc));
			}
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Activity") {
					var childModel = new WFormActivity();
					childModel.init();
					childModel.parseXml(child);
					this.childList[childModel.id] = childModel;
	         	}
			}
		}
	};
	WFormActivities = $.inherit(WFormBase, overrideActs);
})(jQuery);