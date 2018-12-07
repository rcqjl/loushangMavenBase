(function($){
	var overrideField = {
		id : "",
		name : "",
		isHidden : false,
		isReadOnly : false,
		isNotNull : false,
		isInitialize : false,
		
		generateXml : function() {
			//for ie
			var root = CFlow.xmlDoc.createElement("Field");
			root.setAttribute("id", this.id);
			root.setAttribute("name" , this.name);
			
			if(this.isHidden){
				root.setAttribute("isHidden", "true");
			}else{
				root.setAttribute("isHidden", "false");
			}
			if(this.isReadOnly){
				root.setAttribute("isReadOnly", "true");
			}else{
				root.setAttribute("isReadOnly", "false");
			}
			if(this.isNotNull){
				root.setAttribute("isNotNull", "true");				
			}else{
				root.setAttribute("isNotNull", "false");
			}
			if(this.isInitialize){
				root.setAttribute("isInitialize", "true");				
			}else{
				root.setAttribute("isInitialize", "false");
			}
			return root;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			if(element.getAttribute("isHidden")=="true")
				this.isHidden = true;
			if(element.getAttribute("isReadOnly")=="true")
				this.isReadOnly=true ;
			if(element.getAttribute("isNotNull")=="true")
				this.isNotNull = true;
			if(element.getAttribute("isInitialize")=="true")
				this.isInitialize = true;
		}
	};
	CFField = $.inherit(CFBase, overrideField);
})(jQuery);