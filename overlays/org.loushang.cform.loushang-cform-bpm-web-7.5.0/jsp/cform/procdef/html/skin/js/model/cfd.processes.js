(function($){
	var overrideProcss = {
		process : null,
		init:function(){
			this.process=new CFProcess();
			this.process.init();
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("Processes");
			root.appendChild(this.process.generateXml());
			return root;
		},
		
		parseXml : function(element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if(child.nodeName == "Process") {
					this.process.parseXml(child);
	         	}
			}
		}
	};
	CFProcesses = $.inherit(CFBase, overrideProcss);
})(jQuery);