(function($){
	var overridePad = {
		id : "",
		name : "",
		deviceType : "PAD",
		
		form : null,
 		newActions : null,
 		actions : null,
 		yiBanActions : null,
 		endActions : null,
 		init:function(){/*
			this.form=new CFForm();
			this.form.init();
			this.newActions=new CFNewActions();
			this.newActions.init();
			this.actions=new CFActions();
			this.actions.init();
			this.yiBanActions=new CFYiBanActions();
			this.yiBanActions.init();
			this.endActions=new CFEndActions();
			this.endActions.init();*/
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("PadForm");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			root.setAttribute("deviceType", this.deviceType);
			
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
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.deviceType = element.getAttribute("deviceType");
			
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
	         	}
			}
			if(this.id){
				this.isSetForm=true;
			}
			if(((this.newActions&&this.newActions.childList[0])||this.actions&&this.actions.childList[0]) || (this.yiBanActions&& this.yiBanActions.childList[0])|| (this.endActions&&this.endActions.childList[0])){
				this.isSetLocal=true;
			}
			if(this.form){
				var subforms=this.form.childList[this.form.id].childList;
				for(var n in subforms){
					if(n=="") continue;
					this.isSetAuth=true;
					break;
				}
			}
		}
	};
	CFPadForm = $.inherit(CFBase, overridePad);
})(jQuery);