//@ sourceURL=gatewayProperty.js
(function($) {
	$("#gatewayName input").bind("change",function(){
		var tempId = wfdGatewayData.model.id;
		var tempName = wfdGatewayData.model.name;
		
		var name=$.trim($("#gatewayName input").val());
		var nameV = WFlow.validateNodeName(name);
		if (nameV) {
			var id = WFlow.getNodeHomophonePinyin(name, tempId);
			var idV = WFlow.validateNodeId(id);
			if (idV) {
				// 如果修改了环节ID、环节名称
				// 1)触发事件”wf_event_update_diagram“通知bpm修改图形名称
				var data = {eventType:"inclusiveGateway", model:wfdGatewayData.model, updateInfo:{id:id, name:name}, orgId:tempId};
				WFlow.trigger(WFlow.event.WF_UPDATE_DIAGRAM, data);
				$("#gatewayId input").val(wfdGatewayData.model.id);
				return;
			}
		}
		$("#gatewayName input").val(tempName);
		$("#gatewayId input").val(tempId);
	});
	$("#gwSplitChk, #gwJoinChk").bind("change",function(){
		updateGatewayData();
	});
	//初始化复杂汇聚
	$("#gwJoinRule select option").remove();
	var joinRuleList=WFProp.getJoinRule();
	for(var id in joinRuleList){
		var node=joinRuleList[id];
		var option=$("<option></option>").val(node.data).text(node.label);
		$("#gwJoinRule select").append(option);
	}
	$("#gwJoinRule").bind("change",function(){
		updateGatewayData();
	});
	$("#forkActivity select").bind("change",function(){
		updateGatewayData();
	});
	$("#divGatewayPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divGatewayPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#gateWayBranch input:button").bind("click",function(){
		var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/condition/branch.jsp";
		if(targetNodeList==null){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D023","没有找到目标环节！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}else{
			var f=0;
			for(var n in targetNodeList){
				f++;
			}
			if(f==1){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D024","仅存在一个目标环节，无需设置分支条件！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return false;
			}
		}
		var param={frontAct:wfdGatewayData.model, targetNodeList:targetNodeList};
		showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D003","设置分支条件"), url, 600, 425,param, afterCloseBranthForm);
	});
	function afterCloseBranthForm(result){
		var flag=false;
		if(result!=null){
			//将分支条件保存到BPM端
			WFlow.setSeqCondition(wfdGatewayData.model.id, result.expDic, result.dataObjectDic);
			//更新模型信息之后，重新获取
			initGatewayData(wfdGatewayData);
		}
	}
	function updateGatewayData(){
		var gateway=wfdGatewayData.model;
		gateway.name=$("#gatewayName input").val();
		gateway.id=$("#gatewayId input").val();

		if($("#gwSplitChk").is(":checked") && $("#gwJoinChk").is(":checked")){
			gateway.type="inclusiveGateway";
			gateway.gatewayDirection="Mixed";
			$("#forkActivity").show();
		}else if($("#gwSplitChk").is(":checked") && !$("#gwJoinChk").is(":checked")){
			gateway.type="inclusiveGateway";
			gateway.gatewayDirection="Diverging";
			$("#forkActivity").hide();
		}else if(!$("#gwSplitChk").is(":checked") && $("#gwJoinChk").is(":checked")){
			gateway.type="inclusiveGateway";
			gateway.gatewayDirection="Converging";
			$("#forkActivity").show();
		}else{
			if($("#gwJoinRule select").val()!="default"){
				gateway.gatewayDirection="";
			}else{
				gateway.type="exclusiveGateway";
				gateway.gatewayDirection="Diverging";
				$("#forkActivity").hide();
			}
		}
		if(!$("#forkActivity").is(":hidden")){
			gateway.relativeGateway=$("#forkActivity select").val();
		}else{
			gateway.relativeGateway=null;
		}
		if($("#gwJoinRule select").val()!="default"){
			gateway.type="complexGateway";
			gateway.conditionObj={};
			gateway.conditionObj.language=$("#gwJoinRule select").val();
		}else{
			gateway.conditionObj=null;
		}
	}
})(jQuery);
var targetNodeList=null;
var wfdGatewayData;
function initGatewayData(data){
	wfdGatewayData=data;
	var gateway=data.model;
	$("#gatewayName input").val(gateway.name);
	$("#gatewayId input").val(gateway.id);
	if(!gateway.gatewayDirection){
		$("#gwSplitChk").prop({checked:false});
		$("#gwJoinChk").prop({checked:false});
		$("#forkActivity").hide();
		gateway.type="exclusiveGateway";
		gateway.gatewayDirection="Diverging";
	}
	else{
		$("#forkActivity select option").remove();
		var nodeDic=parent.WFModel.process.nodeDic;
		for(var actId in nodeDic){
			var node=nodeDic[actId];
			if(node.type!="startEvent"&& node.type!="endEvent" && node.id!=gateway.id){
				var option=$("<option></option>").val(node.id).text(node.name);
				$("#forkActivity select").append(option);
			}
		}
		if(gateway.type=="exclusiveGateway"){
			$("#gwSplitChk").prop({checked:false});
			$("#gwJoinChk").prop({checked:false});
			$("#forkActivity").hide();
		}else{
			if(gateway.gatewayDirection=="Diverging"){
				$("#gwSplitChk").prop({checked:true});
				$("#gwJoinChk").prop({checked:false});
				$("#forkActivity").hide();
			}else if(gateway.gatewayDirection=="Converging"){
				$("#gwSplitChk").prop({checked:false});
				$("#gwJoinChk").prop({checked:true});
				$("#forkActivity").show();
			}else if(gateway.gatewayDirection=="Mixed"){
				$("#gwSplitChk").prop({checked:true});
				$("#gwJoinChk").prop({checked:true});
				$("#forkActivity").show();
			}else{
				$("#gwSplitChk").prop({checked:false});
				$("#gwJoinChk").prop({checked:false});
				$("#forkActivity").hide();
			}
		}
	}
	if(gateway.relativeGateway){
		$("#forkActivity select").val(gateway.relativeGateway);
	}
	if(gateway.conditionObj){
		$("#gwJoinRule select").val(gateway.conditionObj.language);
	}else{
		$("#gwJoinRule select").val("default");
	}
	targetNodeList=WFlow.getTargetNodeInfo(gateway.id);
	var flag=false;
	for(var nodeId in targetNodeList){
		var node=targetNodeList[nodeId];
		if(node["expression"]!=null && node["expression"]!=""){
			flag=true; break;
		}
	}
	if(flag){
		$("#gateWayBranch input:text").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D003","已设置"));
	}else{
		$("#gateWayBranch input:text").val("");
	}
}