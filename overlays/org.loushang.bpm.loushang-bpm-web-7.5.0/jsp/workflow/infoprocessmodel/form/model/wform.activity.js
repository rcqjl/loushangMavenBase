(function($){
	var overrideAct = {
		id : "",
		name : "",
		formId : "",
		formName : "",
		taskRequests : null,
 		taskParameters : null,
 		buttons : null,
 		newButtons : null,
 		yibanButtons : null,
 		endButtons : null,
 		fields:null,
 		sysSubjectScDefs:null,
		isSetForm:false,
		isStart:false,
		isSetPara:false,
		isSetLocal:false,
		isSetAuth:false,
		phoneForm : null,
		padForm : null,
		init:function(){
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Activity");
			root.setAttribute("Id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("formId", this.formId);
			root.setAttribute("formName" , this.formName);
			if(this.taskRequests)
				root.appendChild(this.taskRequests.generateXml(xmlDoc));
			if(this.taskParameters)
				root.appendChild(this.taskParameters.generateXml(xmlDoc));
			if(this.buttons)
				root.appendChild(this.buttons.generateXml(xmlDoc));
			if(this.newButtons)
				root.appendChild(this.newButtons.generateXml(xmlDoc));
			if(this.yibanButtons)
				root.appendChild(this.yibanButtons.generateXml(xmlDoc));
			if(this.endButtons)
				root.appendChild(this.endButtons.generateXml(xmlDoc));
			if(this.fields)
				root.appendChild(this.fields.generateXml(xmlDoc));
			if(this.phoneForm)
				root.appendChild(this.phoneForm.generateXml(xmlDoc));
			if(this.padForm)
				root.appendChild(this.padForm.generateXml(xmlDoc));
			if(this.sysSubjectScDefs)
				root.appendChild(this.sysSubjectScDefs.generateXml(xmlDoc));
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("Id");
			this.name = element.getAttribute("name");
			this.formId = element.getAttribute("formId");
			this.formName = element.getAttribute("formName");
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
	         		this.isSetPara=true;
	         	}else if(child.nodeName == "Buttons") {
	         		this.buttons=new WFormButtons();
	         		this.buttons.init();
	         		this.buttons.parseXml(child);
	         	}else if(child.nodeName == "NewButtons") {
	         		this.newButtons=new WFormNewButtons();
	         		this.newButtons.init();
	         		this.newButtons.parseXml(child);
	         	}else if(child.nodeName == "YiBanButtons") {
	         		this.yibanButtons=new WFormYiBanButtons();
	         		this.yibanButtons.init();
	         		this.yibanButtons.parseXml(child);
	         	}else if(child.nodeName == "EndButtons") {
	         		this.endButtons=new WFormEndButtons();
	         		this.endButtons.init();
	         		this.endButtons.parseXml(child);
	         	}else if(child.nodeName == "Fields"){
	         		this.fields=new WFormFields();
	         		this.fields.init();
	         		this.fields.parseXml(child);
	         	}else if(child.nodeName == "PhoneForm"){
	         		this.phoneForm=new WFormPhoneForm();
	         		this.phoneForm.parseXml(child);
	         	}else if(child.nodeName == "PadForm"){
	         		this.padForm=new WFormPadForm();
	         		this.padForm.parseXml(child);
	         	}else if(child.nodeName == "SysSubjectScDefs"){
	         		this.sysSubjectScDefs = new WFormSysSubjectScDefs();
	         		this.sysSubjectScDefs.init();
	         		this.sysSubjectScDefs.parseXml(child);
	         	}
			}
			
			if(this.formId){
				this.isSetForm=true;
			}
			if(((this.newButtons&&this.newButtons.childList[0])||this.buttons&&this.buttons.childList[0]) || (this.yibanButtons&& this.yibanButtons.childList[0])|| (this.endButtons&&this.endButtons.childList[0])){
				this.isSetLocal=true;
			}
			if(this.fields&&this.fields.childList[0])
				this.isSetAuth=true;
		}
	};
	WFormActivity = $.inherit(WFormBase, overrideAct);
})(jQuery);