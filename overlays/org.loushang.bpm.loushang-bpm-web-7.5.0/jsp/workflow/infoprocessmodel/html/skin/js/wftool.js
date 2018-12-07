(function($) {
	if (typeof WFTool == "undefined") {
		WFTool = {};
	}
	
	WFTool.init = function() {
		addIconElement("", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D158","选择"), "wfdIconMouse");
		addIconElement("sequenceFlow", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D159","连接线"), "wfdIconLine");
		addIconElement("userTask", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D152","环节"), "wfdIconTask");
		addIconElement("inclusiveGateway", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D160","分支汇聚"), "wfdIconGateway");
		addIconElement("callActivity", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D053","子流程"), "wfdIconSubProc");
		addIconElement("startEvent", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D161","开始"), "wfdIconStart");
		addIconElement("endEvent", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D162","结束"), "wfdIconEnd");
		
		$(".wfdToolComponent").click(function(){
			$(".wfdToolComponent").removeClass("wfdToolSelected");
			$(this).addClass("wfdToolSelected");
		});
		
		function addIconElement(eleType, eleName, eleCssName) {
			var btnDiv = $("<div></div>").addClass("wfdToolComponent");
			$("<div></div>").addClass("wfdIcon").addClass(eleCssName).appendTo(btnDiv);
			$("<div></div>").addClass("wfdIconDesc").append(
					$("<span></span>").text(eleName)).appendTo(btnDiv);
			btnDiv.appendTo($(".wfdToolAreaMain"));
			
			btnDiv.click(function() {
				if (eleType) {
					WF.selectedType(eleType);
				} else {
					WF.clearSelectedType();
				}
			});
		}
	}
	
	WFTool.setSelected = function() {
		$(".wfdToolComponent").siblings().removeClass("wfdToolSelected");
	}
	
})(jQuery);