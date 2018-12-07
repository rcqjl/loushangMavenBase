(function($){
	var overrideProc = {
		type : "process",
		isExecutable : "true",
		// 流程上的自定义扩展属性等
		describe:null,//流程描述
		limitTime : null,
		warnTime : null,
		unit : null,
		
		nodeDic : {},
		seqFlowDic: {},
		potentialOwnerDic: {},
		dataObjectList : {},
		laneSet:null,
		laneDic:{},
		procExtList:null,
		isSubProc:null,
		procSubject:null,
		mappingObj:null,
		actSetList:null,
		monitorList:null,
		
		generateXml : function() {
			// 流程
			var proc = WF.xmlDoc.createElement("process");
			proc.setAttribute("id", this.id);
			proc.setAttribute("name" , this.name);
			proc.setAttribute("isExecutable" , this.isExecutable);

			// 泳道
			if (this.laneSet) {
				proc.appendChild(this.laneSet.generateXml());
			}
			
			// 环节
			for (var actId in this.nodeDic) {
				var node = this.nodeDic[actId];
				if (node.generateXml) {
					proc.appendChild(node.generateXml());
				}
			}
			
			// 迁移线
			for (var seqId in this.seqFlowDic) {
				var line = this.seqFlowDic[seqId];
				if (line.generateXml) {
					proc.appendChild(line.generateXml());
				}
			}
			
			// 相关对象
			for (var d in this.dataObjectList) {
				var dObjXml = WF.xmlDoc.createElement("dataObject");
				dObjXml.setAttribute("id",this.dataObjectList[d]);
				dObjXml.setAttribute("itemSubjectRef","String");
				proc.appendChild(dObjXml);
			}
			
			// 流程限时预警
			if(this.limitTime!= undefined && this.limitTime!=null && this.limitTime!="" ){
				var processLimitAndWarn = WF.xmlDoc.createElement("loushang:processLimitAndWarn");
				processLimitAndWarn.setAttribute("limitTime",this.limitTime);
				processLimitAndWarn.setAttribute("warnTime",this.warnTime);
				processLimitAndWarn.setAttribute("unit",this.unit);
				proc.appendChild(processLimitAndWarn);
			}
			
			// 流程描述
			if(this.describe!=undefined && this.describe!=null && this.describe!=""){
				var processDescription = WF.xmlDoc.createElement("loushang:processDescription");
				var textNode = WF.xmlDoc.createTextNode(this.describe);
				processDescription.appendChild(textNode);
				proc.appendChild(processDescription);
			}
			
			// 流程默认标题关联的变量
			if (this.procSubject) {
				var procSubjectXml = WF.xmlDoc.createElement("loushang:processSubjectDataObject");
				procSubjectXml.setAttribute("dataObjectId",this.procSubject);
				proc.appendChild(procSubjectXml);
			}
			
			// 是否仅作为子流程
			if (this.isSubProc) {
				var subXml = WF.xmlDoc.createElement("loushang:isStartActPartiesCreator");
				var subExp = WF.xmlDoc.createTextNode(this.isSubProc);
				subXml.appendChild(subExp);
				proc.appendChild(subXml);
			}

			// 关联的业务流程
			if (this.mappingObj && this.mappingObj.id) {
				var mappingXml = WF.xmlDoc.createElement("loushang:mappingBusinessProcess");
				mappingXml.setAttribute("mappingId",this.mappingObj.id);
				if (this.mappingObj.id && this.mappingObj.name) {
					mappingXml.setAttribute("mappingName", this.mappingObj.name);
				} else {
					mappingXml.setAttribute("mappingName", "");
				}
				proc.appendChild(mappingXml);
			}
			
			// 流程扩展属性
			if (this.procExtList) {
				var extListXml = WF.xmlDoc.createElement("loushang:processExtensionAttributes");
				for (var e in this.procExtList) {
					var tmpExt = this.procExtList[e];
					var extXml = WF.xmlDoc.createElement("loushang:extensionAttribute");
					extXml.setAttribute("key", tmpExt.key);
					extXml.setAttribute("value", tmpExt.value);
					if (tmpExt.description) {
						extXml.setAttribute("description", tmpExt.description);
					}
					extListXml.appendChild(extXml);
				}
				proc.appendChild(extListXml);
			}
			
			// 环节组
			if (this.actSetList) {
				var actSetListXml = WF.xmlDoc.createElement("loushang:activitySets");
				for (var a in this.actSetList) {
					var tmpActSet = this.actSetList[a];
					var actSetXml = WF.xmlDoc.createElement("loushang:activitySet");
					actSetXml.setAttribute("id", tmpActSet.id);
					actSetXml.setAttribute("name", tmpActSet.name);
					actSetXml.setAttribute("startActDefId", tmpActSet.startActDefId);
					actSetXml.setAttribute("endActDefId", tmpActSet.endActDefId);
					if(tmpActSet.limitTime && tmpActSet.unit){
						actSetXml.setAttribute("limitTime", tmpActSet.limitTime);
						actSetXml.setAttribute("warnTime", tmpActSet.warnTime);
						actSetXml.setAttribute("unit", tmpActSet.unit);
					}
					actSetListXml.appendChild(actSetXml);
				}
				proc.appendChild(actSetListXml);
			}
			
			// 流程监控人
			if (this.monitorList) {
				var monitorListXml = WF.xmlDoc.createElement("loushang:processMonitors");
				for(var pId in this.monitorList){
					var mOwner = this.monitorList[pId];
					var pOwnerXml = WF.xmlDoc.createElement("loushang:processMonitor");
					pOwnerXml.setAttribute("id", mOwner.id);
					pOwnerXml.setAttribute("name" , mOwner.name);
					var assExpXml = WF.xmlDoc.createElement("loushang:resourceAssignmentExpression");
					pOwnerXml.appendChild(assExpXml);
					var expXml = WF.xmlDoc.createElement("loushang:expression");
					expXml.setAttribute("id" , mOwner.expressionId);
					expXml.setAttribute("language" , mOwner.language);
					var partyData = "typeName="+mOwner.typeId+"|"+mOwner.typeName+",itemName="+mOwner.itemId+"|"+
						mOwner.itemName+",itemValue="+mOwner.organId+"|"+mOwner.organName;
					var textNode = WF.xmlDoc.createTextNode(partyData);
					expXml.appendChild(textNode);
					assExpXml.appendChild(expXml);
					
					monitorListXml.appendChild(pOwnerXml);
				}
				proc.appendChild(monitorListXml);
			}
			var procTypeId = WFlow.parameter["processType"];
			if (procTypeId) {
				this.procType = {};
				this.procType.id = procTypeId;
				this.procType.name = "";
				
			}
			// 流程所属流程类型
			if (this.procType) {
				if (this.procType.id) {
					var typeXml = WF.xmlDoc.createElement("loushang:processType");
					typeXml.setAttribute("procTypeId",this.procType.id);
					typeXml.setAttribute("procTypeName",this.procType.name);
					proc.appendChild(typeXml);
				}
			}
			
			return proc;
		},
		
		parseXml : function(element) {
			this.id = element.getAttribute("id");
			this.name = element.getAttribute("name");
			this.isExecutable = element.getAttribute("isExecutable");
			
			for (var i = 0; i < element.childNodes.length; i++) {
			     var child = element.childNodes[i];
			     var act;
			     var flow;
			     switch (child.nodeName) {
				     case "laneSet":
				    	 this.laneSet = new LaneSet();
				    	 this.laneSet.parseXml(child);
				    	 break;
					case "sequenceFlow": 
						flow = new SequenceFlow();
						flow.parseXml(child);
					 	break;
					case "startEvent": 
					case "intermediateCatchEvent":
						act = new CatchEvent();
						act.type = child.nodeName;
						act.parseXml(child);
	                	break;
					case "endEvent": 
						act = new ThrowEvent();
						act.type = child.nodeName;
						act.parseXml(child);
	                	break;
						break;
					case "userTask": 
						act = new UserTask();
						act.parseXml(child);
	                	break;
					case "callActivity" :
						act = new CallActivity();
						act.parseXml(child);
	                	break;
					case "inclusiveGateway":
					case "parallelGateway":
					case "exclusiveGateway":  
					case "complexGateway":  
						act = new Gateway();
						act.type = child.nodeName;
						act.parseXml(child);
	                	break;
					case "dataObject":
						var dObjectId = child.getAttribute("id");
						this.dataObjectList[dObjectId] = dObjectId;
	                	break;
					case "loushang:processDescription": 
						if (child.childNodes.length > 0 && child.childNodes[0].nodeValue)
							this.describe = child.childNodes[0].nodeValue;
	                	break;
					case "loushang:processLimitAndWarn":
						this.limitTime = child.getAttribute("limitTime");
						this.warnTime = child.getAttribute("warnTime");
						this.unit = child.getAttribute("unit");
	                	break;
					case "loushang:processSubjectDataObject":
						this.procSubject = child.getAttribute("dataObjectId");
	                	break;
					case "loushang:isStartActPartiesCreator":  
						if(child.childNodes.length > 0 && child.childNodes[0].nodeValue=="false") {
							this.isSubProc = true;
						}
	                	break;
					case "loushang:processType":
						if(!WFlow.parameter["processType"]){
							delete this.procType;
						}else{
							this.procType = {};
							this.procType.id = child.getAttribute("procTypeId");
							this.procType.name = child.getAttribute("procTypeName");
						}
	                	break;
					case "loushang:mappingBusinessProcess":
						if (child.getAttribute("mappingId")) {
							this.mappingObj = {};
							this.mappingObj.id = child.getAttribute("mappingId");
							this.mappingObj.name = child.getAttribute("mappingName");
						}
	                	break;
					case "loushang:processExtensionAttributes":
						if (child.childNodes.length > 0) {
							this.procExtList = {};
							for (var a = 0; a < child.childNodes.length; a++) {
							     var extElement = child.childNodes[a];
							     if (extElement.nodeName == "loushang:extensionAttribute") {
							    	 var extAttr = {};
								     extAttr.key = extElement.getAttribute("key");
								     extAttr.value = extElement.getAttribute("value");
								     extAttr.description = extElement.getAttribute("description");
								     this.procExtList[extAttr.key] = extAttr;
							     }
							}
						}
	                	break;
					case "loushang:activitySets":
						if (child.childNodes.length > 0) {
							this.actSetList = {};
							for (var s = 0; s < child.childNodes.length; s++) {
							     var actSetElement = child.childNodes[s];
							     if (actSetElement.nodeName == "loushang:activitySet") {
							    	 var actSetObj = {};
								     actSetObj.id = actSetElement.getAttribute("id");
								     actSetObj.name = actSetElement.getAttribute("name");
								     actSetObj.startActDefId = actSetElement.getAttribute("startActDefId");
								     actSetObj.endActDefId = actSetElement.getAttribute("endActDefId");
								     actSetObj.limitTime = actSetElement.getAttribute("limitTime");
								     actSetObj.warnTime = actSetElement.getAttribute("warnTime");
								     actSetObj.unit = actSetElement.getAttribute("unit");
								     this.actSetList[actSetObj.id] = actSetObj;
							     }
							}
						}
	                	break;
					case "loushang:processMonitors":
						if (child.childNodes.length > 0) {
							this.monitorList = {};
						}
						for (var m = 0; m < child.childNodes.length; m++) {
						     var mElement = child.childNodes[m];
						     switch (mElement.nodeName) {
						     	case "loushang:processMonitor":
						     		 var mOwner = {};
								     mOwner.id = mElement.getAttribute("id");
								     mOwner.name = mElement.getAttribute("name");
						     		for (var p = 0; p < mElement.childNodes.length; p++) {
									     var sChild = mElement.childNodes[p];
									     switch (sChild.nodeName) {
									     	case "loushang:resourceAssignmentExpression":
									     		for (var e = 0; e < child.childNodes.length; e++) {
												     var eChild = child.childNodes[e];
												     switch (eChild.nodeName) {
												     	case "expression":
												     		 mOwner.expressionId = eChild.getAttribute("id");
														     mOwner.language = eChild.getAttribute("language");
														     if (eChild.childNodes.length > 0 && eChild.childNodes[0].nodeValue) {
														    	 var textNode = eChild.childNodes[0].nodeValue;
															     var arr = textNode.split(",");
															     var typeName = (arr[0].split("="))[1];
															     mOwner.typeId = typeName.split("|")[0];
															     mOwner.typeName = typeName.split("|")[1];
															     var itemName = (arr[1].split("="))[1];
															     mOwner.itemId = itemName.split("|")[0];
															     mOwner.itemName = itemName.split("|")[1];
															     var itemValue = (arr[2].split("="))[1];
															     mOwner.organId = itemValue.split("|")[0];
															     mOwner.organName = itemValue.split("|")[1];
															     mOwner.internalId = mOwner.typeId+"|"+mOwner.itemId+"|"+mOwner.organId;
														     }
												     		break;
												     }
									     		}
									     		break;
									     }
						     		}
						     		this.monitorList[mOwner.internalId] = mOwner;
						     		break;
						     }
						}
	                	break;
	                	
			   	}
			    if (flow) {
			    	this.seqFlowDic[flow.id] = flow;
			    }
			    if (act) {
			    	this.nodeDic[act.id] = act;
			    }
			}
		}
	};
	Process = $.inherit(CallableElement, overrideProc);
})(jQuery);