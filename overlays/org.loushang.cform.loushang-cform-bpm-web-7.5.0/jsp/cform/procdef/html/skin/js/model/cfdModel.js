(function($){
	if (typeof CFModel =="undefined") {
		CFModel = {};
	};
	
	CFModel.parseModelContent = function(modelContent) {
		var xmlDoc;
		if (window.DOMParser) {
			xmlDoc = new DOMParser().parseFromString(modelContent, "text/xml");
		} else {
			// Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(modelContent);
		}
		CFPackageConfig.parseXml(xmlDoc);
	}
	
	CFModel.generateModelContent = function() {
		var xmlDoc;
		var isIE = false;
		try {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			isIE = true;
		} catch(e) {
			xmlDoc = document.implementation.createDocument("", "", null);
			isIE = false;
		}
		
		var xmlHead = xmlDoc.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"UTF-8\"");
		xmlDoc.appendChild(xmlHead);
		
		CFlow.xmlDoc = xmlDoc;
		
		var root = CFPackageConfig.generateXml();
		xmlDoc.appendChild(root);
		
		var modelContent;
		if (isIE) {
			modelContent = xmlDoc.xml;
		} else {
			var xs = new XMLSerializer();
			modelContent = xs.serializeToString(xmlDoc);
		}
		return modelContent;
	};
})(jQuery);