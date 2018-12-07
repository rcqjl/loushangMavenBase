(function($){
	var reCallAct = {
		type : "callActivity",
		//关联的子流程
		calledElement:"",
		// name：流程名称，type：执行方式（SYNCHR：同步，ASYNCHR：异步）,id:流程定义唯一id
		subProcDefObj:null,
		// 主流程到子流程的映射
		fromMainToSubList:null,
		// 子流程到主流程的映射
		fromSubToMainList:null,
		//关联的业务流程环节:id(业务流程环节ID),name(业务流程环节名称)
		mappingObj:null,
		// 分支汇聚:joinType(汇聚类型),joinRule(汇聚规则),splitType(分支类型),splitActDefId(关联的分支环节)
		restrictObj:null,
		
		generateXml : function() {
			var act = WF.xmlDoc.createElement(this.type);
			act.setAttribute("id", this.id);
			act.setAttribute("name" , this.name);
			act.setAttribute("calledElement" , this.calledElement);

			// 子流程信息
			if(this.calledElement){
				var subDefXml = WF.xmlDoc.createElement("loushang:subProcessDefInfo");
				subDefXml.setAttribute("subProcDefUniqueId", this.subProcDefObj.id);
				subDefXml.setAttribute("subProcName", this.subProcDefObj.name);
				act.appendChild(subDefXml);
				var subExeTypeXml = WF.xmlDoc.createElement("loushang:subProcessExecutionType");
				subExeTypeXml.setAttribute("executionType", this.subProcDefObj.type);
				act.appendChild(subExeTypeXml);
			}
			
			//主流程和子流程之间的映射关系
			if (this.fromMainToSubList || this.fromSubToMainList) {
				var mappingXml = WF.xmlDoc.createElement("loushang:dataObjectMapping");
				act.appendChild(mappingXml);
				
				if (this.fromMainToSubList) {
					var mainToSubXml = WF.xmlDoc.createElement("loushang:fromMainProcessToSubProcessMapping");
					mappingXml.appendChild(mainToSubXml);
					for (var m in this.fromMainToSubList) {
						var mainObj = this.fromMainToSubList[m];
						var mainTmpXml = WF.xmlDoc.createElement("loushang:mappingItem");
						mainTmpXml.setAttribute("sourceRef", mainObj.sourceRef);
						mainTmpXml.setAttribute("targetRef", mainObj.targetRef);
						mainToSubXml.appendChild(mainTmpXml);
					}
				}
				
				if (this.fromSubToMainList) {
					var subToMainXml = WF.xmlDoc.createElement("loushang:fromSubProcessToMainProcessMapping");
					mappingXml.appendChild(subToMainXml);
					
					for (var s in this.fromSubToMainList) {
						var mainObj = this.fromSubToMainList[s];
						var subTmpXml = WF.xmlDoc.createElement("loushang:mappingItem");
						subTmpXml.setAttribute("sourceRef", mainObj.sourceRef);
						subTmpXml.setAttribute("targetRef", mainObj.targetRef);
						subToMainXml.appendChild(subTmpXml);
					}
				}
			}
			
			// 分支汇聚
			if (this.restrictObj &&(this.restrictObj.joinType || this.restrictObj.joinRule || 
					this.restrictObj.splitType || this.restrictObj.splitActDefId)) {
				var transXml = WF.xmlDoc.createElement("loushang:activityTransitionRestriction");
				transXml.setAttribute("joinType", this.restrictObj.joinType);
				transXml.setAttribute("joinRule", this.restrictObj.joinRule);
				transXml.setAttribute("splitType", this.restrictObj.splitType);
				transXml.setAttribute("relativeDivergingActDefId", this.restrictObj.splitActDefId);
				act.appendChild(transXml);
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
			this.calledElement = element.getAttribute("calledElement");
			if (this.calledElement) {
				this.subProcDefObj = {};
			}
			
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     switch (child.nodeName) {
					case "loushang:subProcessDefInfo": 
						if (this.calledElement) {
							this.subProcDefObj.name = child.getAttribute("subProcName");
							this.subProcDefObj.id=child.getAttribute("subProcDefUniqueId");
						}
	                	break;
					case "loushang:subProcessExecutionType":
						if (this.calledElement) {
							this.subProcDefObj.type = child.getAttribute("executionType");
						}
	                	break;
					case "loushang:dataObjectMapping":
						for (var a = 0; a < child.childNodes.length; a++) {
						     var dElement = child.childNodes[a];
						     switch (dElement.nodeName) {
								case "loushang:fromMainProcessToSubProcessMapping": 
									this.fromMainToSubList = new Array();
									for (var m = 0; m < dElement.childNodes.length; m++) {
									     var mElement = dElement.childNodes[m];
									     switch (mElement.nodeName) {
										     case "loushang:mappingItem":
										    	 var mObj = {};
										    	 mObj.sourceRef = mElement.getAttribute("sourceRef");
										    	 mObj.targetRef = mElement.getAttribute("targetRef");
										    	 this.fromMainToSubList.push(mObj);
										    	 break;
									     }
									}
				                	break;
								case "loushang:fromSubProcessToMainProcessMapping":
									this.fromSubToMainList = new Array();
									for (var s = 0; s < dElement.childNodes.length; s++) {
									     var sElement = dElement.childNodes[s];
									     switch (sElement.nodeName) {
										     case "loushang:mappingItem":
										    	 var sObj = {};
										    	 sObj.sourceRef = sElement.getAttribute("sourceRef");
										    	 sObj.targetRef = sElement.getAttribute("targetRef");
										    	 this.fromSubToMainList.push(sObj);
										    	 break;
									     }
									}
				                	break;
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
						this.mappingObj = {};
						this.mappingObj.id = child.getAttribute("mappingActDefId");
						this.mappingObj.name = child.getAttribute("mappingActDefName");
						break;
			   	}
			}
		}
	};
	CallActivity = $.inherit(FlowElement, reCallAct);
})(jQuery);