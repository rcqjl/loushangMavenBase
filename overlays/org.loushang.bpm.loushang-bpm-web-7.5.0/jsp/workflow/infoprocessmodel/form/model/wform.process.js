(function($){
	var overrideDef = {
		id : "",
		name : "",
		formId : "",
		formName : "",
		processSubject : "WF_PROC_SUBJECT",
		activities : null,
		buttons : null,
		yibanButtons : null,
		endButtons : null,
		taskRequests : null,
		taskParameters : null,
		isSetForm:false,
		isSetPara:false,
		isSetLocal:false,
		
 		init:function(){
 			this.activities=new WFormActivities();
 			this.activities.init();
 		}, 		
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Process");
			root.setAttribute("Id", this.id);
			root.setAttribute("name", this.name);
			root.setAttribute("formId", this.formId);
			root.setAttribute("formName", this.formName);
			root.setAttribute("processSubject", this.processSubject);
			root.appendChild(this.activities.generateXml(xmlDoc));
			if(this.taskRequests)
				root.appendChild(this.taskRequests.generateXml(xmlDoc));
			if(this.taskParameters)
				root.appendChild(this.taskParameters.generateXml(xmlDoc));
			if(this.buttons)
				root.appendChild(this.buttons.generateXml(xmlDoc));
			if(this.yibanButtons)
				root.appendChild(this.yibanButtons.generateXml(xmlDoc));
			if(this.endButtons)
				root.appendChild(this.endButtons.generateXml(xmlDoc));
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("Id");
			this.name = element.getAttribute("name");
			this.formId = element.getAttribute("formId");
			this.formName = element.getAttribute("formName");
			this.processSubject = element.getAttribute("processSubject");
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
				if(child.nodeName == "Buttons") {
					this.buttons=new WFormButtons();
					this.buttons.init();
					this.buttons.parseXml(child);
				}
				if(child.nodeName == "YiBanButtons") {
					this.yibanButtons=new WFormYiBanButtons();
					this.yibanButtons.init();
					this.yibanButtons.parseXml(child);
				}
				if(child.nodeName == "EndButtons") {
					this.endButtons=new WFormEndButtons();
					this.endButtons.init();
					this.endButtons.parseXml(child);
				}
			}
			if(this.formId){
				this.isSetForm=true;
			}
			if((this.buttons&&this.buttons.childList[0]) || (this.yibanButtons&& this.yibanButtons.childList[0])|| (this.endButtons&&this.endButtons.childList[0])){
				this.isSetLocal=true;
			}
			this.isSetPara=true;
		}
	};
	WFormProcess = $.inherit(WFormBase, overrideDef);
})(jQuery);