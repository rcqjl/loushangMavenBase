var wfdCallData;
var actTargetNodeList=null;
(function($){
	$(function(){
		
		$("#callName input").bind("change",function(){
			var tempId = wfdCallData.model.id;
			var tempName = wfdCallData.model.name;
			
			var name=$.trim($("#callName input").val());
			var nameV = WFlow.validateNodeName(name);
			if (nameV) {
				var id = WFlow.getNodeHomophonePinyin(name, tempId);
				var idV = WFlow.validateNodeId(id);
				if (idV) {
					// 如果修改了环节ID、环节名称
					// 1)触发事件”wf_event_update_diagram“通知bpm修改图形名称
					var data = {eventType:"callActivity", model:wfdCallData.model,updateInfo:{id:id, name:name}, orgId:tempId};
					WFlow.trigger(WFlow.event.WF_UPDATE_DIAGRAM, data);
					$("#callId input").val(wfdCallData.model.id);
					return;
				}
			}
			$("#callName input").val(tempName);
			$("#callId input").val(tempId);
		});
		
		$("#callProcExcuType select").change(function(){
			wfdCallData.model.subProcDefObj.type=$(this).val();
		});
		
		$("#callSplitChk, #callJoinChk, #callSplitAct select, #callJoinRule select")
				.bind("change",function(){
					updateCallData();
		});
		
		$("#callSplitRule input:button").bind("click",function(){
			var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/condition/branch.jsp";
			if(actTargetNodeList==null){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D023","没有找到目标环节！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return false;
			}else{
				var f=0;
				for(var n in actTargetNodeList){
					f++;
				}
				if(f==1){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D024","仅存在一个目标环节，无需设置分支条件！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
					return false;
				}
			}
			var param={frontAct:wfdCallData.model, targetNodeList:actTargetNodeList};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D003","设置分支条件"), url, 600, 425,param, afterCloseBranchForm);
		});
		function afterCloseBranchForm(result){
			var flag=false;
			if(result!=null){
				//将分支条件保存到BPM端
				WFlow.setSeqCondition(wfdCallData.model.id, result.expDic, result.dataObjectDic);
				//更新模型信息之后，重新获取
				initCallData(wfdCallData);
			}
		}
		$("#callSubBtn").click(function (){
			var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/subproc/showprocess.jsp";
			var param={"procDefId":WFModel.process.id};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D061","选择子流程"), url, 550, 455,param, afterClose);
			function afterClose(backdata){
				var callActivity=wfdCallData.model;
				if(backdata){
					if(backdata.procDefUniqueId){
						$("#callSub input:text").val(backdata.procDefName);
						$("#callSub input:text").attr("id",backdata.procDefUniqueId);
						$("#callSub input:text").attr("procDefId",backdata.procDefId);
						callActivity.calledElement=backdata.procDefId;
						if(callActivity.subProcDefObj){}else{
							callActivity.subProcDefObj=new Object();
						}
						callActivity.subProcDefObj.name=backdata.procDefName;
						callActivity.subProcDefObj.id=backdata.procDefUniqueId;
						
					}
					
				}
			}
		});
		
	});
	
	//相关数据映射
	$("#dataMapBtn").click(function(){
		if($("#callSub input:text").attr("id")){}else{
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D061","请先选择子流程"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			$("#wfdCallTab1 a").trigger("click");
			return false;
		}
		var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/subproc/datamap.jsp";
		var subproc=new Array();

		function afterCloseDataMap(backdata){
			if(backdata){
				var callAct=wfdCallData.model;
				var mainMap=backdata[0];
				var mapping;
				var mapTitle="";
				if(mainMap.length>0) mapTitle+="fromMainToSub : ";
				callAct.fromMainToSubList=new Array();
				for(var n in mainMap){
					mapping=new Object();
					mapTitle+=mainMap[n].sourceRef+"-"+mainMap[n].targetRef+";";
					mapping.sourceRef=mainMap[n].sourceRef;
					mapping.targetRef=mainMap[n].targetRef;
					callAct.fromMainToSubList.push(mapping);
				}
				var subMap=backdata[1];
				if(subMap.length>0) mapTitle+="fromSubToMain : ";
				callAct.fromSubToMainList=new Array();
				for(var n in subMap){
					mapping=new Object();
					mapTitle+=subMap[n].sourceRef+"-"+subMap[n].targetRef+";";
					mapping.sourceRef=subMap[n].sourceRef;
					mapping.targetRef=subMap[n].targetRef;
					callAct.fromSubToMainList.push(mapping);
				}
				if(subMap.length>0||mainMap.length>0){
					$("#dataMap input:text").val(mapTitle.substring(0,mapTitle.length-1));
					$("#dataMap input:text").attr("title",mapTitle.substring(0,mapTitle.length-1));
				}else{
					$("#dataMap input:text").val("");
				}
			}
		};
		var fnc=function(){
			if(subproc.length==0){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D062","子流程未设置相关数据"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return false;
			}
			var param={
					mainData:WFModel.process.dataObjectList,
					subData:subproc,
					mainToSub:wfdCallData.model.fromMainToSubList,
					subToMain:wfdCallData.model.fromSubToMainList};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D054","数据映射"), url, 450, 425,param, afterCloseDataMap);
		};
		getAndParserModelContent(subproc,$("#callSub input:text").attr("procdefid"),fnc);	
	});

	//获取复杂汇聚规则
	$("#callJoinRule select option").remove();
	var joinRuleList=WFProp.getJoinRule();
	for(var id in joinRuleList){
		var node=joinRuleList[id];
		var option=$("<option></option>").val(node.data).text(node.label);
		$("#callJoinRule select").append(option);
	}
	
	//绑定属性栏点击事件
	$("#divCallPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divCallPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});

})(jQuery);
function updateCallIdAndName(data) {
	wfdCallData = data;
	var newInfo = data.model;
	$("#callName input").val(newInfo.name);
	$("#callId input").val(newInfo.id);
}
function updateCallData(){
	var callAct=wfdCallData.model;
	//处理分支条件
	if($("#callSplitChk").is(":checked")){
		callAct.restrictObj.splitType="AND";
	}else{
		callAct.restrictObj.splitType="";
	}
	if($("#callJoinChk").is(":checked")){
		callAct.restrictObj.joinType="AND";
		callAct.restrictObj.splitActDefId=$("#callSplitAct select").val();
		$("#callSplitAct").show();
	}else{
		callAct.restrictObj.joinType="";
		callAct.restrictObj.splitActDefId="";
		$("#callSplitAct").hide();
	}
	if($("#callJoinRule select").val()!="default"){
		callAct.restrictObj.joinRule=$("#callJoinRule select").val();
	}else{
		callAct.restrictObj.joinRule="";
	}
}
function initCallData(data){
	wfdCallData=data;
	var callAct=data.model;
	
	$("#callName input").val(callAct.name);
	$("#callId input").val(callAct.id);
	
	if(callAct && callAct.calledElement){
		$("#callSub input:text").attr("procDefId",callAct.calledElement);
	}else{
		$("#callSub input:text").attr("procDefId","");
	}
	if(callAct && callAct.subProcDefObj){
		if(callAct.subProcDefObj.name){
			$("#callSub input:text").val(callAct.subProcDefObj.name);
			$("#callSub input:text").attr("id",callAct.subProcDefObj.id);}
		else{
			$("#callSub input:text").val("");
			$("#callSub input:text").attr("id","");
		}
	}else{
		callAct.subProcDefObj=new Object();
	}
	
	if(callAct && callAct.subProcDefObj){
		if(callAct.subProcDefObj.type)
			$("#callProcExcuType select").val(callAct.subProcDefObj.type);
		else {
			callAct.subProcDefObj.type="SYNCHR";
		}
	}
	
	//相关数据映射
	var mapTitle="";
	var mainMap=new Array();
	if(callAct.fromMainToSubList){
		mainMap=callAct.fromMainToSubList;
		if(mainMap.length>0){
			mapTitle+="fromMainToSub : ";
			for(var n in mainMap){
				mapTitle+=mainMap[n].sourceRef+"-"+mainMap[n].targetRef+";";
			}
		}
		
	}
	var subMap=new Array();
	if(callAct.fromSubToMainList){
		subMap=callAct.fromSubToMainList;
		if(subMap.length>0){
			mapTitle+="fromSubToMain : ";
			for(var n in subMap){
				mapTitle+=subMap[n].sourceRef+"-"+subMap[n].targetRef+";";
			}
		}
	}
	
	if(subMap.length>0||mainMap.length>0){
		$("#dataMap input:text").val(mapTitle.substring(0,mapTitle.length-1));
		$("#dataMap input:text").attr("title",mapTitle.substring(0,mapTitle.length-1));
	}else{
		$("#dataMap input:text").val("");
	}
	//分支环节
	setBratchDivInSub(callAct);
}

function setBratchDivInSub(activity){
	if(!activity.restrictObj){
		activity.restrictObj={};
		activity.restrictObj.joinType="";
		activity.restrictObj.joinRule="";
		activity.restrictObj.splitType="";
		activity.restrictObj.splitActDefId="";
	}
	if(activity.restrictObj.splitType=="AND"){
		$("#callSplitChk").prop({checked:true});
	}else{
		$("#callSplitChk").prop({checked:false});
	}
	$("#callSplitAct select option").remove();
	var nodeDic=parent.WFModel.process.nodeDic;
	for(var actId in nodeDic){
		var node=nodeDic[actId];
		if(node.type!="startEvent"&& node.type!="endEvent" && node.id!=activity.id){
			var option=$("<option></option>").val(node.id).text(node.name);
			$("#callSplitAct select").append(option);
		}
	}
	if(activity.restrictObj.joinType=="AND"){
		$("#callJoinChk").prop({checked:true});
		if(activity.restrictObj.splitActDefId!=""){
			$("#callSplitAct select").val(activity.restrictObj.splitActDefId);
		}
		$("#callSplitAct").show();
	}else{
		$("#callJoinChk").prop({checked:false});
		$("#callSplitAct").hide();
	}
	
	if(activity.restrictObj.joinRule!=""){
		$("#callJoinRule select").val(activity.restrictObj.joinRule);
	}else{
		$("#callJoinRule select").val("default");
	}
	
	actTargetNodeList=WFlow.getTargetNodeInfo(activity.id);
	var flag=false;
	for(var nodeId in actTargetNodeList){
		var node=actTargetNodeList[nodeId];
		if(node["expression"]!=null && node["expression"]!=""){
			flag=true; break;
		}
	}
	if(flag){
		$("#callSplitRule input:text").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D025","已设置"));
	}else{
		$("#callSplitRule input:text").val("");
	}
}

function parseModelContent(subproc,modelContent) {
	var xmlDoc;
	if (window.DOMParser) {
		xmlDoc = new DOMParser().parseFromString(modelContent, "text/xml");
	} else {
		// Internet Explorer
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(modelContent);
	}
	var definitions = xmlDoc.getElementsByTagName("definitions")[0];
	if(definitions){
		for (var i = 0; i < definitions.childNodes.length; i++) {
			var child = definitions.childNodes[i];
			if(child.nodeName == "process") {
				for (var j = 0; j < child.childNodes.length; j++) {
				     var schild = child.childNodes[j];
				     switch (schild.nodeName) {
						case "dataObject":
							var dObjectId = schild.getAttribute("id");
							subproc.push(dObjectId);
		                	break;
		                	
				   	}
				}
	     	}
		}
	}else{
		var process= xmlDoc.getElementsByTagName("WorkflowProcess")[0];
		if(process){
			for(var i=0; i<process.childNodes.length; i++){
				var childNode=process.childNodes[i];
				if(childNode.nodeName=="DataFields"){
					for(var m=0; m<childNode.childNodes.length; m++){
						var schildNode=childNode.childNodes[m];
						switch(schildNode.nodeName){
						case "DataField":
							var sObjectId=schildNode.getAttribute("Id");
							subproc.push(sObjectId);
							break;
						}
					}
				}
			}
		}
	}
	
}

function getAndParserModelContent(subproc,procDefId,fnc) {
	//为了兼容studio流程，这里根据procDefId来获取模型
	$.ajax({
		type : "POST",
		async : false,
		url : WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
			+ "getProcInfoModelByProcDefId",
		data : {"procDefId" : procDefId},
		dataType:"json",
		success : function(data) {
			if(data && data.success){
				if(data.modelContent){
					parseModelContent(subproc,data.modelContent);
					fnc();
				}
					
			}else{
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		},
		error:function(){
			showDialog("alert", L.getLocaleMessage("BPM.INFOPROCESSMODEL.D063","请求流程模型时出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	});
};

