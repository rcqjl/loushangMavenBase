(function($){
	var overrideAct = {
		id : "",
		name : "",
		formId : "",
		formName : "",
		isModify:false,
		isSetForm:false,
		isSetLocal:false,
		isSetAuth:false,
		
		form : null,
		mobileForm : null,
		padForm : null,
 		subjects : null,
 		newActions : null,
 		actions : null,
 		yiBanActions : null,
 		endActions : null,
 		isSetSubject:false,
 		
		init:function(){
			/*this.form=new CFForm();
			this.form.init();
			this.mobileForm=new CFMobileForm();
			this.mobileForm.init();
			this.padForm=new CFPadForm();
			this.padForm.init();*/
			/*this.subjects=new CFSubjects();
			this.subjects.init();*/
			/*this.newActions=new CFNewActions();
			this.newActions.init();
			this.actions=new CFActions();
			this.actions.init();
			this.yiBanActions=new CFYiBanActions();
			this.yiBanActions.init();
			this.endActions=new CFEndActions();
			this.endActions.init();*/
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Activity");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("formId", this.formId);
			root.setAttribute("formName", this.formName);
			
			if(this.form)
			root.appendChild(this.form.generateXml());
			if(this.newActions)
			root.appendChild(this.newActions.generateXml());
			if(this.actions)
			root.appendChild(this.actions.generateXml());
			if(this.yiBanActions)
			root.appendChild(this.yiBanActions.generateXml());
			if(this.endActions)
			root.appendChild(this.endActions.generateXml());
			if(this.mobileForm)
			root.appendChild(this.mobileForm.generateXml());
			if(this.padForm)
			root.appendChild(this.padForm.generateXml());
			if(this.subjects)
			root.appendChild(this.subjects.generateXml());
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.formId = element.getAttribute("formId");
			this.formName = element.getAttribute("formName");
			
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Form") {
					this.form=new CFForm();
					this.form.init();
					this.form.parseXml(child);
	         	} else if(child.nodeName == "NewActions") {
	         		this.newActions=new CFNewActions();
	         		this.newActions.init();
	         		this.newActions.parseXml(child);
	         	} else if(child.nodeName == "Actions") {
	         		this.actions=new CFActions();
	         		this.actions.init();
	         		this.actions.parseXml(child);
	         	} else if(child.nodeName == "YiBanActions") {
	         		this.yiBanActions=new CFYiBanActions();
	         		this.yiBanActions.init();
	         		this.yiBanActions.parseXml(child);
	         	} else if(child.nodeName == "EndActions") {
	         		this.endActions=new CFEndActions();
	         		this.endActions.init();
	         		this.endActions.parseXml(child);
	         	} else if(child.nodeName == "MobileForm") {
	         		this.mobileForm=new CFMobileForm();
	         		this.mobileForm.parseXml(child);
	         	} else if(child.nodeName == "PadForm") {
	         		this.padForm=new CFPadForm();
	         		this.padForm.parseXml(child);
	         	} else if(child.nodeName == "Subjects") {
	         		this.subjects=new CFSubjects();
	         		this.subjects.init();
	         		this.subjects.parseXml(child);
	         	}
			}
			
			if(this.formId){
				this.isSetForm=true;
			}
			if(((this.newActions&&this.newActions.childList[0])||this.actions&&this.actions.childList[0]) || (this.yiBanActions&& this.yiBanActions.childList[0])|| (this.endActions&&this.endActions.childList[0])){
				this.isSetLocal=true;
			}
			
			if(this.form){
				var subforms=this.form.childList;
				for(var n in subforms){
					if(n=="") continue;
					this.isSetAuth=true;
					break;
				}
				
			}
//			if(this.subjects)
//			for(var n in this.subjects.childList){
//				if(this.subjects.childList[n].type=="proc"){
//					this.isSetProcDefSub=true;
//					if(this.isSetProcTypeSub){
//						break;
//					}
//				}
//				
//				if(this.subjects.childList[n].type=="procType"){
//					this.isSetProcTypeSub=true;
//					if(this.isSetProcDefSub){
//						break;
//					}
//				}
//			}
			this.isSetSubject=true;
			
		}
	};
	CFActivity = $.inherit(CFBase, overrideAct);
})(jQuery);