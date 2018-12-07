(function($){
	var overrideDef = {
		id : "",
		name : "",
		formId : "",
		formName : "",
		processSubject : "",
		refSubjectField : "",
		refSubjectJoin : "",
		
		activities : null,
 		subjects : null,
 		procSubjectDefs : null,
 		procSubjectQueryDefs : null,
 		actions : null,//待办
 		yiBanActions : null,
 		endActions : null,
 		isSet:false,
 		isSetLocal:false,
 		isSetLocalD:false,
		isSetLocalY:false,
		isSetLocalE:false,
		isSetProcSubject:false,
		
 		init:function(){
 			this.activities=new CFActivities();
 			this.activities.init();/*
 			this.subjects=new CFSubjects();
 			this.subjects.init();
 			this.procSubjectDefs=new CFProcSubjectDefs();
 			this.procSubjectDefs.init();
 			this.procSubjectQueryDefs=new CFProcSubjectQueryDefs();
 			this.procSubjectQueryDefs.init();*/
 			/*this.actions=new CFActions();
 			this.actions.init();
 			this.yiBanActions=new CFYiBanActions();
 			this.yiBanActions.init();
 			this.endActions=new CFEndActions();
 			this.endActions.init();*/
 		}, 		
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Process");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("formId", this.formId);
			root.setAttribute("formName", this.formName);
			root.setAttribute("processSubject", this.processSubject);
			root.setAttribute("refSubjectField", this.refSubjectField);
			root.setAttribute("refSubjectJoin", this.refSubjectJoin);

			root.appendChild(this.activities.generateXml());
			if(this.subjects)
			root.appendChild(this.subjects.generateXml());
			if(this.procSubjectDefs)
			root.appendChild(this.procSubjectDefs.generateXml());
			if(this.procSubjectQueryDefs)
			root.appendChild(this.procSubjectQueryDefs.generateXml());
			if(this.actions)
			root.appendChild(this.actions.generateXml());
			if(this.yiBanActions)
			root.appendChild(this.yiBanActions.generateXml());
			if(this.endActions)
			root.appendChild(this.endActions.generateXml());
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.formId = element.getAttribute("formId");
			this.formName = element.getAttribute("formName");
			this.processSubject = element.getAttribute("processSubject");
			this.refSubjectField = element.getAttribute("refSubjectField");
			this.refSubjectJoin = element.getAttribute("refSubjectJoin");
			
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Activities") {
					this.activities.parseXml(child);
	         	} else if(child.nodeName == "Subjects") {
	         		this.subjects=new CFSubjects();
	         		this.subjects.init();
	         		this.subjects.parseXml(child);
	         	} else if(child.nodeName == "ProcSubjectDefs") {
	         		this.procSubjectDefs=new CFProcSubjectDefs();
	         		this.procSubjectDefs.init();
	         		this.procSubjectDefs.parseXml(child);
	         	} else if(child.nodeName == "ProcSubjectQueryDefs") {
	         		this.procSubjectQueryDefs=new CFProcSubjectQueryDefs();
	         		this.procSubjectQueryDefs.init();
	         		this.procSubjectQueryDefs.parseXml(child);
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
	         	}
			}

			if(this.formId){
				this.isSet=true;
			}
			if(this.refSubjectField){
				CFProcess.isSetDefault=true;
			}
			this.isSetProcSubject=true;
//			if(this.subjects)
//			for(var n in this.subjects.childList){
//				if(this.subjects.childList[n].type=="proc"){
//					CFProcess.isSetProcDef=true;
//					if(CFProcess.isSetProcType){
//						break;
//					}
//				}
//				
//				if(this.subjects.childList[n].type=="procType"){
//					CFProcess.isSetProcType=true;
//					if(CFProcess.isSetProcDef){
//						break;
//					}
//				}
//			}
			if((this.actions&&this.actions.childList[0]) || (this.yiBanActions&& this.yiBanActions.childList[0])|| (this.endActions&&this.endActions.childList[0])){
				this.isSetLocal=true;
			}
		}
	};
	CFProcess = $.inherit(CFBase, overrideDef);
})(jQuery);