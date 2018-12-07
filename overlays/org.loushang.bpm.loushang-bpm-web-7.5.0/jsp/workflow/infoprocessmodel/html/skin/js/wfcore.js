(function($){
	if (typeof WFlow == "undefined") {
		WFlow = {};
	}
	
	/**
	 * 事件说明：<br>
	 * WF_ADD_MODEL：增加节点/迁移线，通知业务构建业务模型<br>
	 * WF_DELETE_MODEL：删除节点/迁移线，通知业务删除业务模型<br>
	 * WF_UPDATE_MODEL：图形上的环节的ID和名称变化时，通知业务更新业务模型<br>
	 * WF_SHOW_PROPERTY：选中节点/迁移线时/单击绘图区的空白区域时，通知业务展现业务属性面板<br>
	 */
	WFlow.event = {
		// 增加节点/迁移线，触发事件，构建流程模型
		WF_ADD_BASIC_MODEL : "wf_event_add_basic_model",
		// 删除节点/迁移线，触发事件，删除流程模型
		WF_DELETE_BASIC_MODEL : "wf_event_delete_basic_model",
		// 图形上的环节的ID和名称变化时，触发事件，更新流程模型
		WF_UPDATE_BASIC_MODEL : "wf_event_update_basic_model",
		// 选中节点/迁移线时/单击绘图区的空白区域时，触发事件，展现流程流程属性面板
		WF_SHOW_BASIC_PROPERTY : "wf_event_show_basic_property",
		
		// 增加节点/迁移线，触发事件，构建业务模型
		WF_ADD_MODEL : "wf_event_add_model",
		// 删除节点/迁移线，触发事件，删除业务模型
		WF_DELETE_MODEL : "wf_event_delete_model",
		// 图形上的环节的ID和名称变化时，触发事件，更新业务模型
		WF_UPDATE_MODEL : "wf_event_update_model",
		// 选中节点/迁移线时/单击绘图区的空白区域时，触发事件，展现流程业务属性面板
		WF_SHOW_PROPERTY : "wf_event_show_property",
		
		// 解析BPMN模型时，触发事件，用于绘图
		WF_ADD_DIAGRAM : "wf_event_add_diagram",
		// 属性面板修改了环节ID、环节名称时，触发事件，修改图形名称
		WF_UPDATE_DIAGRAM : "wf_event_update_diagram"
	}
	
	function parseUrl() {
		WFlow.parameter = {};
		var fullUrl = document.URL.split("?");
		if (fullUrl.length > 1) {
			// 只有一个参数
			var params = fullUrl[1].split("&");
			for ( var i = 0; i < params.length; i++) {
				var keyValue = params[i].split("=");
				if (keyValue.length == 2) {
					WFlow.parameter[keyValue[0]] = keyValue[1];
				}
			}
			if (WFlow.parameter["procDefUniqueId"]) {
				WFlow.procDefUniqueId = WFlow.parameter["procDefUniqueId"];
			}
		}
	}
	
	function initBBox() {		
		var tmpCssRight = $(".propertyShrink").css("right");
		var tmpPropWidth = $(".wfdPropertyArea").width();
		var mainWidth = $("#divMain").width() - tmpPropWidth - $(".wfdToolArea").width()-4;
		$("#divMain").width(mainWidth);

		var isShrink = false;
		$(".propertyShrink").bind("click", function() {
			$(".wfdPropertyArea").toggle();
			if(isShrink){
				var width=$("#divMain").width()-tmpPropWidth;
				$("#divMain").width(width);
				$(this).css("right",tmpCssRight);
				$(this).removeClass("wfdPropShrinkLeft").addClass("wfdPropShrinkRight");
			}else{
				var width=$("#divMain").width()+tmpPropWidth;
				$("#divMain").width(width);
				$(this).css("right",0);
				$(this).removeClass("wfdPropShrinkRight").addClass("wfdPropShrinkLeft");
			}
			WF.setScrollWhenDragNode();
			isShrink = !isShrink;
		});
	}
	
	/**
	 * 绑定事件
	 * 
	 * @param eventName 事件名称
	 * @param method 触发事件时需要完成的功能
	 */
	WFlow.bind = function(eventName, method) {
		$(WFlow).bind(eventName, method);
	}
	
	/**
	 * 触发事件
	 * 
	 * @param eventName 事件名称
	 * @param args 触发事件时传递的参数
	 */
	WFlow.trigger = function(eventName, args) {
		$(WFlow).trigger(eventName, args);
	}
	
	/**
	 * 获取指定环节的前续人工环节<br>
	 * 返回值为：前续环节模型对象{id:"",name:""}
	 * 
	 * @param actId 环节定义ID
	 */
	WFlow.getFrontAct = function(actId) {
		var fromNode;
		for(var key in WFGraph.flowDiagramDic) {
			if(fromNode!=null)
				break;
			var line = WFGraph.flowDiagramDic[key].model;
			var toNodeModel = line.targetNode;
			if (actId == toNodeModel.model.id) {
				if(line.sourceNode.model.type == "userTask"){
					fromNode = line.sourceNode.model;
					break;
				}else{
					fromNode = WFlow.getFrontAct(line.sourceNode.model.id);
					if(fromNode!=null){
						break;
					}
				}
			}
		}
		return fromNode;
	}
	
	/**
	 * 获取指定环节的分支条件<br>
	 * 返回值为：目标环节定义ID和其分支条件的键值对
	 * 
	 * @param actId 环节定义ID
	 */
	WFlow.getTargetNodeInfo = function(actId) {
		var targetNodeList={};
		var flag=false;
		for(var key in WFGraph.flowDiagramDic) {
			var line = WFGraph.flowDiagramDic[key].model;
			var fromNodeModel = line.sourceNode;
			if (actId == fromNodeModel.model.id) {
				if(line.targetNode.model.type!="endEvent"){
					var targetNode={};
					targetNode["name"]=line.targetNode.model.name;
					if(line.expObj!=null){
						targetNode["expression"]=line.expObj.expression;
						targetNode["language"]=line.expObj.language;
					}
					targetNodeList[line.targetNode.model.id]=targetNode;
					flag=true;
				}
			}
		}
		if(flag)
			return targetNodeList;
		return null;
	}
	
	/**
	 * 更新分支条件
	 * 
	 * @param actId 环节定义ID
	 * @param expDic 目标环节定义ID和其对象{expression:""}的键值对
	 * @param dataObjectDic 相关数据定义
	 */
	WFlow.setSeqCondition = function(actId, expDic, dataObjectDic) {
		for(var key in WFGraph.flowDiagramDic) {
			var lineModel = WFGraph.flowDiagramDic[key].model;
			var fromNodeModel = lineModel.sourceNode;
			var toNodeModel = lineModel.targetNode;
			if(fromNodeModel.model.id==actId && expDic[toNodeModel.model.id]!=null){
				if(expDic[toNodeModel.model.id].expression!=null && 
					expDic[toNodeModel.model.id].expression!=""){
					lineModel.expObj=expDic[toNodeModel.model.id];
				}else{
					lineModel.expObj=null;
				}

			}
		}
		for(var key in dataObjectDic){
			WFModel.process.dataObjectList[key]=dataObjectDic[key];
		}
	}
	
	/**
	 * 设置相关数据
	 * 
	 * @param value 相关数据ID
	 */
	WFlow.setDataObject=function(value){
		WFModel.process.dataObjectList[value]=value;
	}
	
	/**
	 * 获取相关数据<br>
	 * 返回值为：相关数据对象列表
	 */
	WFlow.getDataObject=function(){
		return WFModel.process.dataObjectList;
	}
	
	/**
	 * 设置默认标题
	 * 
	 * @param value 标题相关数据ID
	 */
	WFlow.setSubject=function(value){
		if(value==null || value==""){
			WFModel.process.procSubject=null;
		}else{
			WFModel.process.procSubject=value;
		}
	}
	
	/**
	 * 获取默认标题<br>
	 * 返回值为：标题相关数据ID
	 */
	WFlow.getSubject=function(){
		return WFModel.process.procSubject;
	}
	/**
	 * 获取流程定义信息<br>
	 * 调用时点：保存、发布、另存为新流程、另存为新版本时调用<br>
	 * 返回值为：流程对象，其各项说明如下<br>
	 * 		id-流程定义ID<br>
	 * 		name-流程定义名称<br>
	 * 		procSpec-流程模型的规范及版本<br>
	 *      procType-流程类型ID<br>
	 *      pluginType-插件类型<br>
	 *      procDefUniqueId：流程定义唯一ID<br>
	 */
	WFlow.getProcInfo = function() {
		return {id:WFModel.process.id, name:WFModel.process.name, 
			procSpec:"BPMN|2.0", procType:WFlow.parameter["processType"], 
			pluginType:WFlow.parameter["pluginType"], procDefUniqueId:WFlow.procDefUniqueId};
	}
	
	/**
	 * 获取流程模型（BPMN2.0）<br>
	 * 调用时点：保存、发布、另存为新版本、查看流程模型时调用<br>
	 * 返回值为：xml格式的流程模型
	 */
	WFlow.getModelContent = function() {
		return WFModel.generateModelContent();
	}
	/**
	 * 用于获取新流程模型（BPMN2.0），同时备份原流程信息，方便保存失败时恢复数据<br>
	 * 调用时点：另存为新流程时调用<br>
	 * 返回值为：对象，其各项说明如下<br>
	 * 		oldProc-当前流程的基本信息<br>
	 * 		modelContent-流程模型（BPMN2.0）<br>
	 * 
	 * @param procObj 流程对象，其各项说明如下<br>
	 * 		id-流程定义ID<br>
	 * 		name-流程定义名称<br>
	 * 		procDefUniqueId-流程定义唯一ID
	 */
	WFlow.getModelContentAsNew = function(procObj) {
		var tmpProcInfo = $.extend(true, {}, WFlow.getProcInfo(), {definitionId:WFModel.model().id});
		procObj.definitionId = WF.generateProcessId();
		WFlow.saveAs(procObj);
		return {oldProc:tmpProcInfo, modelContent:WFlow.getModelContent()};
	}
	
	/**
	 * 汉字转拼音（最大保留32位）<br>
	 * 返回值为：拼音（只包含字母和数字）
	 * 
	 * @param 汉字
	 */
	WFlow.getPinyin = function(key) {
		return WF.getOrgPinyin(key);
	}
	
	/**
	 * 更新环节状态（用于控制哪些环节可删除，哪些环节不能删除）<br>
	 * 调用时点：发布成功时调用
	 */
	WFlow.setRelease = function() {
		WFlow.parameter["isRelease"] = "1";
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
				+ "getReleaseActList",
			data : {"id" : WFlow.procDefUniqueId},
			dataType:"json",
			success : function(data) {
				var jsonData = eval(data);
				if(data && data.errMessage){
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				}else {
					updateActState(data.actList);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D140","请求已发布的环节数据时出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
	}
	
	function updateActState(actArr){
		if (actArr) {
			for(var i in actArr){
				var actId = actArr[i].id;
				var tmpAct = WFModel.process.nodeDic[actId];
				if (tmpAct) {
					tmpAct.isNew = false;
				}
			}
		}
	}
	
	/**
	 * 更新流程信息<br>
	 * 调用时点：另存为新流程失败时调用
	 * 
	 * @param procObj 流程对象，其各项说明如下<br>
	 * 		id-流程定义ID<br>
	 * 		name-流程定义名称<br>
	 * 		procDefUniqueId-流程定义唯一ID
	 */
	WFlow.saveAs = function(procObj) {
		if (procObj) {
			WFlow.procDefUniqueId = procObj.procDefUniqueId;
			WFModel.model().id = procObj.definitionId;
			
			var oldProcId = WFModel.process.id;
			procObj.type = "process";
			WFModel.process.id = procObj.id;
			WFEvent.triggerWhenUpdateGraph(procObj, oldProcId);
		}
	}
	
	/**
	 * 更新流程信息<br>
	 * 调用时点：另存为新版本成功时调用<br>
	 * 
	 * @param procObj 流程对象，其各项说明如下<br>
	 * 		id-流程定义ID<br>
	 * 		name-流程定义名称<br>
	 * 		procDefUniqueId-流程定义唯一ID
	 */
	WFlow.saveAsVersion = function(procObj) {
		if (procObj) {
			WFlow.procDefUniqueId = procObj.procDefUniqueId;
		}
	}
	
	/**
	 * 保存或发布前，验证流程正确性
	 */
	WFlow.validateProcess = function() {
		var retObj = new Array();
		var nodeLen = 0;
		var hasStart = false, hasEnd = false, hasTask = false;
		var startActDic = {}, endActDic = {}, taskDic = {}, otherActDic = {};
		if (WFModel.process.nodeDic) {
			for (var n in WFModel.process.nodeDic) {
				if (n) {
					var nodeModel = WFModel.process.nodeDic[n];
					switch(nodeModel.type) {
						case "process":
							break;
						case "lane":
							break;
						case "startEvent":
							nodeLen++;
							hasStart = true;
							var sTmp = {model:nodeModel};
							for(var sKey in WFModel.process.seqFlowDic) {
								if (WFModel.process.seqFlowDic[sKey].sourceNode.model.id == nodeModel.id) {
									$.extend(true, sTmp, {hasLine:true});
									break;
								}
							}
							startActDic[nodeModel.id] = sTmp;
							break;
						case "endEvent":
							nodeLen++;
							hasEnd = true;
							var eTmp = {model:nodeModel};
							for(var eKey in WFModel.process.seqFlowDic) {
								if (WFModel.process.seqFlowDic[eKey].targetNode.model.id == nodeModel.id) {
									$.extend(true, eTmp, {hasLine:true});
									break;
								}
							}
							endActDic[nodeModel.id] = eTmp;
							break;
						case "userTask":
						case "callActivity" :
						case "inclusiveGateway":
						case "exclusiveGateway":
						case "parallelGateway":
						case "complexGateway":
						case "intermediateCatchEvent":
							nodeLen++;
							hasTask = true;
							var tTmp = {model:nodeModel};
							if (nodeModel.potentialOwnerList) {
								for(var p in nodeModel.potentialOwnerList) {
									if (p) {
										$.extend(true, tTmp, {hasOwner:true});
										break;
									}
								}
							}
							for(var tKey in WFModel.process.seqFlowDic) {
								if (WFModel.process.seqFlowDic[tKey].sourceNode.model.id == nodeModel.id || 
										WFModel.process.seqFlowDic[tKey].targetNode.model.id == nodeModel.id) {
									$.extend(true, tTmp, {hasLine:true});
									break;
								}
							}
							taskDic[nodeModel.id] = tTmp;
							otherActDic[nodeModel.id] = tTmp;
							break;
					}
				}
			}
		}
		if (nodeLen == 0){
			retObj.push(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D141","必须绘制环节!"));
			return retObj;
		}
		if (!hasStart) {
			retObj.push(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D142","必须绘制开始环节!"));
		}
		if (!hasEnd) {
			retObj.push(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D0143","必须绘制结束环节!"));
		}
		
		for(var s in startActDic) {
			var sModel = startActDic[s];
			if (!sModel.hasLine) {
				retObj.push(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D144","开始环节")+"【" + sModel.model.name + "】"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D145","必须有迁出线!"));
			}
		}
		for(var e in endActDic) {
			var eModel = endActDic[e];
			if (!eModel.hasLine) {
				retObj.push(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D146","结束环节")+"【" + eModel.model.name + "】"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D146","必须有迁入线!"));
			}
		}
		for(var o in otherActDic) {
			var oModel = otherActDic[o];
			if (!oModel.hasLine) {
				retObj.push("【" + oModel.model.name + "】"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D147","必须有迁入或迁出线!"));
			}
		}
		for(var t in taskDic) {
			var tObj = taskDic[t];
			var tModel = tObj.model
			if (!tObj.hasOwner) {
				retObj.push("【" + tModel.name + "】"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D148","必须选择参与者!"));
			} else {
				for(var tFlow in WFModel.process.seqFlowDic) {
					if (WFModel.process.seqFlowDic[tFlow].targetNode.model.id == tModel.id) {
						if ("startEvent" == WFModel.process.seqFlowDic[tFlow].sourceNode.model.type) {
							var isErr = false;
							for(var p in nodeModel.potentialOwnerList) {
								if (p) {
									var pTmp = nodeModel.potentialOwnerList[p];
									if (pTmp.language && (pTmp.language.indexOf("creator") != -1 || 
											pTmp.language.indexOf("sender") != -1 || 
											pTmp.language.indexOf("historyactselect") != -1)) {
										retObj.push("【" + tModel.name + "】"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D149","的参与者不能选择为创建人、发送人、历史环节处理人!"));
										isErr = true;
										break;
									}
								}
							}
							if (isErr) {
								break;
							}
						}
					}
				}
			}
		}
		return retObj;
	}
	
	/**
	 * 验证环节定义名称是否合理<br>
	 * 返回值为：布尔值，true表示正确
	 * 
	 * @param name 环节定义名称
	 */
	WFlow.validateNodeName = function(name) {
		if (!name) {
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D150","环节名称不能为空！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		
		if (isNodeNameExist(name)) {
			// 提示用户不能修改
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D152","环节")+"["+name+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D151","已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		return true;
	}
	
	/**
	 * 验证环节定义ID是否合理<br>
	 * 返回值为：布尔值，true表示正确
	 * 
	 * @param id 环节定义ID
	 */
	WFlow.validateNodeId = function(id) {
		if (!id) {
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D153","环节ID不能为空！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		if (isNodeIdExist(id) == true) {
			// 提示用户不能修改
			showDialog("alert","环节ID["+id+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D151","已经存在！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		return true;
	}
	
	/**
	 * 将环节名称转为拼音（过滤同名环节名称）<br>
	 * 返回值为：修改后的环节定义ID
	 * 
	 * @param name 修改后的环节定义名称
	 * @param orgId 修改前的环节定义ID
	 */
	WFlow.getNodeHomophonePinyin = function(name, orgId) {
		var id = WF.getOrgPinyin(name);
		if (id == orgId) {
			return id;
		}
		var newId = getNodeIdHomophone(id, orgId);
		return newId;
	}
	
	function getNodeIdHomophone(id, orgId) {
		var i=0;
		var hasHomophone = false;
		for (var innerId in WFGraph.nodeDiagramDic) {
			var node = WFGraph.nodeDiagramDic[innerId].model;
			var key = node.id;
			if (key && key != orgId) {
				var idx = key.indexOf("_");
				if (key == id || key.substring(0, idx) == id) {
					if (idx > 0 && key.substring(idx+1) > i) {
						i = key.substring(idx+1);
					}
					i++;
					hasHomophone = true;
				}
			}
		}
		if (!hasHomophone) {
			return id;
		}
		return id + "_"+i;
	}
	
	function isNodeNameExist(name) {
		for (var key in WFGraph.nodeDiagramDic) {
			var act = WFGraph.nodeDiagramDic[key];
			if (act.model.name == name) {
				return true;
			}
		}
		return false;
	}
	
	function isNodeIdExist(id) {
		for (var key in WFGraph.nodeDiagramDic) {
			var act = WFGraph.nodeDiagramDic[key];
			if (act.model.id == id) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 获取指定环节的前续环节<br>
	 * 返回值为：环节定义ID和其模型对象的键值对
	 * 
	 * @param actId 环节定义ID
	 */
	WFlow.getPreActivities=function(actId){
		var returnAct={};
		for(var nodeId in WFGraph.nodeDiagramDic){
			var nodeModel=WFGraph.nodeDiagramDic[nodeId].model;
			if(nodeModel.id!=actId 
					&& nodeModel.type!="startEvent" 
					&& nodeModel.type!="endEvent"){
				var tmpActDic={};
				if(findRoad(nodeModel.id, actId, tmpActDic)){
					returnAct[nodeModel.id]=nodeModel;
				}
			}
		}
		return returnAct;
	}

	function findRoad(startActId, endActId, tmpActDic){
		if(tmpActDic[startActId])
			return false;
		for(seqId in WFGraph.flowDiagramDic){
			var lineModel=WFGraph.flowDiagramDic[seqId].model;
			if(lineModel.sourceNode.model.id==startActId){
				if(lineModel.targetNode.model.id==endActId){
					return true;
				}
			}
		}
		return false;
	}
	
	$(function() {
		// 解析url，方便后使用
		parseUrl();
		// 初始化画布（兼容浏览器）
		initBBox();
		// 初始化组件栏
		WFTool.init();
		// 初始化绘图区
		WFEvent.init();
		// 初始化图形
		WFGraph.init();
		// 初始化模型
		WFModel.init();
		// 初始化画布
		WFGraph.createNode();
	});
	
})(jQuery);