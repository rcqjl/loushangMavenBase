(function($){
	var overrideDef = {
		id : "",
		name : "",
		activities : null,
		taskRequests : null,
		taskParameters : null,
		isSetFlag : false,
	
 		init:function(){
 			this.activities=new WFormActivities();
 			this.activities.init();
 		}, 		
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Process");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.appendChild(this.activities.generateXml(xmlDoc));
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
				if(child.nodeName == "Activities") {
					this.activities.parseXml(child);
	         	}
				if(child.nodeName == "TaskRequests") {
	         		this.taskRequests=new WFormTaskRequests();
	         		this.taskRequests.init();
	         		this.taskRequests.parseXml(child);
	         	}
				if(child.nodeName == "DynamicParameters") {
	         		this.taskParameters=new WFormTaskParameters();
	         		this.taskParameters.init();
	         		this.taskParameters.parseXml(child);
	         	}
			}
		}
	};
	WFormProcess = $.inherit(WFormBase, overrideDef);
})(jQuery);