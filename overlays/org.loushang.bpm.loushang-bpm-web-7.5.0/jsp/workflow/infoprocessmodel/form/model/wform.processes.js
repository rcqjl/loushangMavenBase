(function($){
	var overrideProcss = {
		process : null,
		init:function(){
			this.process=new WFormProcess();
			this.process.init();
		},
		generateXml : function(xmlDoc) {
			var root = xmlDoc.createElement("Processes");
			root.appendChild(this.process.generateXml(xmlDoc));
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
	WFormProcesses = $.inherit(WFormBase, overrideProcss);
})(jQuery);