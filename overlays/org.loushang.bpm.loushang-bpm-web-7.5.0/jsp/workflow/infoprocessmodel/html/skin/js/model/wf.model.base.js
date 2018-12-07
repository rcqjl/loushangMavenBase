(function($){
	BaseElement = function(config) {
		$.apply(this, config);
	};
	BaseElement.prototype = {
		innerId	: null,
		id : null,
		generateXml : function() {
			
		},
		parseXml : function(element) {
			
		}
	};
	var overrideCall = {
		name : null
	};
	CallableElement = $.inherit(BaseElement, overrideCall);
	
	var overrideFlow = {
		name : null,
		type : null,
		isNew : true
	};
	FlowElement = $.inherit(BaseElement, overrideFlow);
})(jQuery);