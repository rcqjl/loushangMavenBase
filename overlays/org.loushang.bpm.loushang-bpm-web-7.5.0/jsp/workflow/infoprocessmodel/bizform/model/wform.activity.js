(function($){
	var overrideAct = {
		id : "",
		name : "",
		taskRequests : null,
 		taskParameters : null,
 		isSetFlag : false,
 		
		init:function(){
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Activity");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);

			if(this.taskRequests)
			root.appendChild(this.taskRequests.generateXml(xmlDoc));
			if(this.taskParameters)
			root.appendChild(this.taskParameters.generateXml(xmlDoc));
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.isSetFlag=true;
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "TaskRequests") {
	         		this.taskRequests=new WFormTaskRequests();
	         		this.taskRequests.init();
	         		this.taskRequests.parseXml(child);
	         	} else if(child.nodeName == "DynamicParameters") {
	         		this.taskParameters=new WFormTaskParameters();
	         		this.taskParameters.init();
	         		this.taskParameters.parseXml(child);
	         	}
			}
		}
	};
	WFormActivity = $.inherit(WFormBase, overrideAct);
})(jQuery);