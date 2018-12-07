(function($){
	var overridePhoneForm = {
		buttons : null,
 		newButtons : null,
 		yibanButtons : null,
 		endButtons : null,
 		fields : null,
 		isSetLocal : false,
		isSetAuth : false,
		
		init:function(){
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("PadForm");
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
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Buttons") {
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
	         	}
			}
			if(((this.newButtons&&this.newButtons.childList[0])||this.buttons&&this.buttons.childList[0]) || (this.yibanButtons&& this.yibanButtons.childList[0])|| (this.endButtons&&this.endButtons.childList[0])){
				this.isSetLocal=true;
			}
			if(this.fields&&this.fields.childList[0])
				this.isSetAuth=true;
		}
	};
	WFormPadForm = $.inherit(WFormBase, overridePhoneForm);
})(jQuery);