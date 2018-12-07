(function($){
	var overridePack = {		
		processes : null,
		init:function(){
			this.processes=new CFProcesses();
			this.processes.init();
		},
		generateXml : function() {
			var root = CFlow.xmlDoc.createElement("PackageConfig");
			
			root.appendChild(this.processes.generateXml());
			return root;
		},
		
		parseXml : function(element) {
			var rootElement = element.getElementsByTagName("PackageConfig")[0];
			
			for (var i = 0; i < rootElement.childNodes.length; i++) {
				var child = rootElement.childNodes[i];
				if(child.nodeName == "Processes") {
					this.processes.parseXml(child);
	         	}
			}
		}
	};
	CFPackageConfig = $.inherit(CFBase, overridePack);
})(jQuery);