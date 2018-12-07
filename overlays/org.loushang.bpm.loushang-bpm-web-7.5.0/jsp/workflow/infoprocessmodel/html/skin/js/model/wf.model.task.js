(function($){
	var overrideTask = {
		type : "userTask",
		//参与者、自定义扩展属性等
		potentialOwnerList : null,
		assignRuleType : "Preemption",
		limitTime : null,
		warnTime : null,
		unit : null,
		multiObj:null,
		isAddActTimeToProcTime:true,
		describe:null,
		mappingObj : null,
		restrictObj:null,
		extAttrList : null,
		
		generateXml : function() {
			// 流程
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);

			// 多环节实例:按参与者生成环节实例
			if(this.multiObj){
				var multiXml = WF.xmlDoc.createElement("multiInstanceLoopCharacteristics");
				act.appendChild(multiXml);
				var loopXml = WF.xmlDoc.createElement("loopCardinality");
				multiXml.appendChild(loopXml);
				if (this.multiObj.id) {
					loopXml.setAttribute("id", this.multiObj.id);
				} else {
					loopXml.setAttribute("id", "multi_"+this.id);
				}
				loopXml.setAttribute("language", this.multiObj.language);	
				
				if (!this.multiObj.expression) {
					this.multiObj.expression = "";
				}
				var multiExp = WF.xmlDoc.createTextNode(this.multiObj.expression);
				loopXml.appendChild(multiExp);
			}
			
			// 环节规则：OrderCountersignature（顺序），Countersignature（并行），Preemption（抢占）
			var assRuleXml = WF.xmlDoc.createElement("loushang:activityAssignRuleType");
			act.appendChild(assRuleXml);
			assRuleXml.setAttribute("ruleType",this.assignRuleType);
			
			//解析参与者信息
			for(var pId in this.potentialOwnerList){
				var pOwner = this.potentialOwnerList[pId];
				act.appendChild(pOwner.generateXml());
			}

			// 环节扩展属性
			if (this.extAttrList) {
				var extListXml = WF.xmlDoc.createElement("loushang:activityExtensionAttributes");
				for (var e in this.extAttrList) {
					var tmpExt = this.extAttrList[e];
					var extXml = WF.xmlDoc.createElement("loushang:extensionAttribute");
					extXml.setAttribute("key", tmpExt.key);
					extXml.setAttribute("value", tmpExt.value);
					if (tmpExt.description) {
						extXml.setAttribute("description", tmpExt.description);
					}
					extListXml.appendChild(extXml);
				}
				act.appendChild(extListXml);
			}
			
			//解析限时预警信息
			if(this.limitTime!= undefined && this.limitTime!=null && this.limitTime!="" ){
				var actLimitXml = WF.xmlDoc.createElement("loushang:activityLimitAndWarn");
				actLimitXml.setAttribute("limitTime",this.limitTime);
				actLimitXml.setAttribute("warnTime",this.warnTime);
				actLimitXml.setAttribute("unit",this.unit);
				act.appendChild(actLimitXml);
			}
			
			// 环节描述
			if(this.describe!=undefined && this.describe!=null && this.describe!=""){
				var actDesXml = WF.xmlDoc.createElement("loushang:activityDescription");
				var textNode = WF.xmlDoc.createTextNode(this.describe);
				actDesXml.appendChild(textNode);
				act.appendChild(actDesXml);
			}
			
			// 环节时限是否计入流程
			if(!this.isAddActTimeToProcTime){
				var timeXml = WF.xmlDoc.createElement("loushang:isNeedComputingTime");
				act.appendChild(timeXml);
				var textNode = WF.xmlDoc.createTextNode("false");
				timeXml.appendChild(textNode);
			}
			
			// 分支汇聚
			if(this.restrictObj){
				if (this.restrictObj.joinType!="" || this.restrictObj.joinRule!="" || 
						this.restrictObj.splitType!="" || this.restrictObj.splitActDefId!="") {
					var transXml = WF.xmlDoc.createElement("loushang:activityTransitionRestriction");
					transXml.setAttribute("joinType", this.restrictObj.joinType);
					transXml.setAttribute("joinRule", this.restrictObj.joinRule);
					transXml.setAttribute("splitType", this.restrictObj.splitType);
					transXml.setAttribute("relativeDivergingActDefId", this.restrictObj.splitActDefId);
					act.appendChild(transXml);
				}
			}
			
			// 关联的业务环节
			if (this.mappingObj && this.mappingObj.id) {
				var mappingXml = WF.xmlDoc.createElement("loushang:mappingBusinessProcessActivity");
				mappingXml.setAttribute("mappingActDefId", this.mappingObj.id);
				if (this.mappingObj.id && this.mappingObj.name) {
					mappingXml.setAttribute("mappingActDefName", this.mappingObj.name);
				} else {
					mappingXml.setAttribute("mappingActDefName", "");
				}
				act.appendChild(mappingXml);
			}
			
			return act;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.potentialOwnerList={};
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     var pOwner;
			     switch (child.nodeName) {
					case "multiInstanceLoopCharacteristics":
						this.multiObj = {};
						for (var m = 0; m < child.childNodes.length; m++) {
						     var sChild = child.childNodes[m];
						     switch (sChild.nodeName) {
							     case "loopCardinality":
							    	 this.multiObj.language = sChild.getAttribute("language");
									 this.multiObj.id = sChild.getAttribute("id");
									 if (sChild.childNodes.length > 0 && sChild.childNodes[0].nodeValue) {
										 this.multiObj.expression = sChild.childNodes[0].nodeValue;
									 }
							    	 break;
						     }
						}
	                	break;
					case "potentialOwner": 
						pOwner = new Potentialowner();
						pOwner.parseXml(child);
						this.potentialOwnerList[pOwner.internalId] = pOwner;
						WFModel.process.potentialOwnerDic[pOwner.id] = pOwner;
					 	break;
					case "loushang:activityAssignRuleType":  
						this.assignRuleType = child.getAttribute("ruleType");
	                	break;
					case "loushang:activityLimitAndWarn":
						this.limitTime = child.getAttribute("limitTime");
						this.warnTime = child.getAttribute("warnTime");
						this.unit = child.getAttribute("unit");
	                	break;
					case "loushang:activityDescription":  
						 if (child.childNodes.length > 0)
							 this.describe = child.childNodes[0].nodeValue;
	                	break;
					case "loushang:isNeedComputingTime":
						if (child.childNodes.length > 0 && child.childNodes[0].nodeValue=="false")
							this.isAddActTimeToProcTime = false;
	                	break;
					case "loushang:activityExtensionAttributes":
						if (child.childNodes.length > 0) {
							this.extAttrList = {};
							for (var a = 0; a < child.childNodes.length; a++) {
							     var extElement = child.childNodes[a];
							     if (extElement.nodeName == "loushang:extensionAttribute") {
							    	 var extAttr = {};
								     extAttr.key = extElement.getAttribute("key");
								     extAttr.value = extElement.getAttribute("value");
								     extAttr.description = extElement.getAttribute("description");
								     this.extAttrList[extAttr.key] = extAttr;
							     }
							}
						}
						break;
					case "loushang:activityTransitionRestriction":
						this.restrictObj = {};
						this.restrictObj.joinType = child.getAttribute("joinType");
						this.restrictObj.joinRule = child.getAttribute("joinRule");
						this.restrictObj.splitType = child.getAttribute("splitType");
						this.restrictObj.splitActDefId = child.getAttribute("relativeDivergingActDefId");
						break;
					case "loushang:mappingBusinessProcessActivity":
						if (child.getAttribute("mappingActDefId")) {
							this.mappingObj = {};
							this.mappingObj.id = child.getAttribute("mappingActDefId");
							this.mappingObj.name = child.getAttribute("mappingActDefName");
						}
						break;
			   	}
			}
		}
	};
	UserTask = $.inherit(FlowElement, overrideTask);
})(jQuery);