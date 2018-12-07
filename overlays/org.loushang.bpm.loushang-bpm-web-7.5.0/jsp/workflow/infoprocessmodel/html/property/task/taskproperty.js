//@ sourceURL=msgprompt.js
var actTargetNodeList=null;
$(function(){
	$("#activityName input").bind("change",function(){
		var tempId = wfdTaskData.model.id;
		var tempName = wfdTaskData.model.name;
		
		var name=$.trim($("#activityName input").val());
		var nameV = WFlow.validateNodeName(name);
		if (nameV) {
			var id = WFlow.getNodeHomophonePinyin(name, tempId);
			var idV = WFlow.validateNodeId(id);
			if (idV) {
				// 如果修改了环节ID、环节名称
				// 1)触发事件”wf_event_update_diagram“通知bpm修改图形名称
				var data = {eventType:"userTask", model:wfdTaskData.model,updateInfo:{id:id, name:name}, orgId:tempId};
				WFlow.trigger(WFlow.event.WF_UPDATE_DIAGRAM, data);
				$("#activityId input").val(wfdTaskData.model.id);
				return;
			}
		}
		$("#activityName input").val(tempName);
		$("#activityId input").val(tempId);
	});
	$("#activityLimit select").bind("change",function(){
		var unit=$("#activityLimit select").val();
		if(unit=="N"){
			$("#activityWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D034","自然日"));
		}else{
			$("#activityWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D033","工作日"));
		}
		updateActivityData();
	});
	$("#activityLimit input").bind("change",function(){
		updateActivityData();
	});
	$("#activityWarn input").bind("change",function(){
		updateActivityData();
	});
	$("#activityLimit input,#activityWarn input").keydown(function (e){　　
		 if (/msie/.test(navigator.userAgent.toLowerCase())) {
		  if ( ((event.keyCode > 47) && (event.keyCode < 58)) || (event.keyCode == 8) ) {
		     return true; 
		     } else { 
		      return false; 
		      }
		     } else { 
		       if ( ((e.which > 47) && (e.which < 58)) || (e.which == 8) || (e.keyCode == 17) ) { 
		           return true; 
		       } else { 
		        return false; 
		     } 
		 }
	}).focus(function() {
	    this.style.imeMode='disabled';
	  });;
	$("#activityDescribe textarea").bind("change",function(){
		updateActivityData();
	});
	$("#chk1,#chk2,#taskRule select").bind("change",function(){
		updateActivityData();
	});
	$("#participants input:button").bind("click",function(){
		var partList=initPartyList();
		if(partList){
			var param = {activity : wfdTaskData.model, partList : partList};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D123","选择参与者"), WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/task/participantForm.jsp", 640, 515,param, afterCloseForm);
		}
	});
	$("#divActivityPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divActivityPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	
	$("#divAdvActPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divAdvActPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#splitChk,#joinChk,#joinRule select,#forkAct select").bind("change",function(){
		updateActivityData();
	});
	function afterCloseForm(result){
		if(result==null)
			return;
		var activity=wfdTaskData.model;
		activity.potentialOwnerList={};
		for(var pId in result.potentialOwnerList){
			var returnOwner = result.potentialOwnerList[pId];
			var pOwner = new Potentialowner();
			var id=WF.generatePartId();
			pOwner.id = "pOnwer"+id;
			pOwner.name = "pOnwer"+id;
			pOwner.expressionId = "exp"+id;
			pOwner.language = returnOwner.typeId+"-"+returnOwner.itemId;
			pOwner.typeId = returnOwner.typeId;
			pOwner.typeName = returnOwner.typeName;
			pOwner.itemId = returnOwner.itemId;
			pOwner.itemName = returnOwner.itemName;
			pOwner.organId = returnOwner.organId;
			pOwner.organName = returnOwner.organName;
			pOwner.internalId = returnOwner.internalId;
			activity.potentialOwnerList[pOwner.internalId] = pOwner;
			WFModel.process.potentialOwnerDic[pOwner.id] = pOwner;
			if(pOwner.typeId=="extend"){
				WFlow.setDataObject(pOwner.organId.substring(0,pOwner.organId.indexOf(":")));				
			}
		}
		showActivityPariticipants(activity.potentialOwnerList);
	}
	//获取所设置的参与者的种类
	initPartyList=function(){
		var partList=false;
		$.ajax({
			type : "POST",
			url:WFlow.fullWebPath+"/command/dispatcher/"
			+ "org.loushang.workflow.modeling.definition.htmlutil.ProcessDefUtil/"
			+ "getPartyList",
			data : {},
			dataType: "json",
			async : false,
			success : function(data) {
				if(data && data.success){
					if(data.partList.length==0){
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D124","未配置参与者页面，请配置！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);						
					}else{
						partList=data.partList;
					}
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				} 
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			}
		});
		return partList;
	};
	$("#actBranch input:button").bind("click",function(){
		var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/condition/branch.jsp";
		var activity = wfdTaskData.model;
		if(actTargetNodeList==null){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D125","没有找到目标环节！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}else{
			var f=0;
			for(var n in actTargetNodeList){
				f++;
			}
			if(f==1){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D126","仅存在一个目标环节，无需设置分支条件！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return false;
			}
		}
		var param={frontAct:activity, targetNodeList:actTargetNodeList};
		showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D003","设置分支条件"), url, 600, 425,param, afterCloseBranchForm);
	});
	function afterCloseBranchForm(result){
		var flag=false;
		if(result!=null){
			//将分支条件保存到BPM端
			WFlow.setSeqCondition(wfdTaskData.model.id, result.expDic, result.dataObjectDic);
			//更新模型信息之后，重新获取
			initTaskData(wfdTaskData);
		}
	}
});
var wfdTaskData;

function updateTaskIdAndName(data) {
	wfdTaskData = data;
	var newInfo = data.model;
	$("#activityName input").val(newInfo.name);
	$("#activityId input").val(newInfo.id);
}

function initTaskData(data){
	wfdTaskData = data;
	var activity = data.model;
	$("#activityName input").val(activity.name);
	$("#activityId input").val(activity.id);
	$("#activityLimit input").val(activity.limitTime);
	$("#activityWarn input").val(activity.warnTime);
	if(activity.unit){
		$("#activityLimit select").val(activity.unit);
		if(activity.unit=="N"){
				$("#activityWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D034","自然日"));
			}else{
				$("#activityWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D033","工作日"));
			}
	}else{
		$("#activityLimit select").val("D");
		$("#activityWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D033","工作日"));
	}
	$("#activityDescribe textarea").val(activity.describe);
	if(!activity.assignRuleType){
		activity.assignRuleType="Preemption";
	}
	$("#taskRule select").val(activity.assignRuleType);
	$("#chk1").prop({checked:false});
	if(activity.multiObj){
		if(activity.multiObj.language=="ActInstancePerParty"){
			$("#chk1").prop({checked:true});
		}
	}
	if(!activity.isAddActTimeToProcTime){
		$("#chk2").prop({checked:true});
	}else{
		$("#chk2").prop({checked:false});
	}
	//初始化参与者信息
	showActivityPariticipants(activity.potentialOwnerList);	
	setBratchDiv(activity);
}
function setBratchDiv(activity){
	if(!activity.restrictObj){
		activity.restrictObj={};
		activity.restrictObj.joinType="";
		activity.restrictObj.joinRule="";
		activity.restrictObj.splitType="";
		activity.restrictObj.splitActDefId="";
	}
	if(activity.restrictObj.splitType=="AND"){
		$("#splitChk").prop({checked:true});
	}else{
		$("#splitChk").prop({checked:false});
	}
	$("#forkAct select option").remove();
	var nodeDic=parent.WFModel.process.nodeDic;
	for(var actId in nodeDic){
		var node=nodeDic[actId];
		if(node.type!="startEvent"&& node.type!="endEvent" && node.id!=activity.id){
			var option=$("<option></option>").val(node.id).text(node.name);
			$("#forkAct select").append(option);
		}
	}
	if(activity.restrictObj.joinType=="AND"){
		$("#joinChk").prop({checked:true});
		if(activity.restrictObj.splitActDefId!=""){
			$("#forkAct select").val(activity.restrictObj.splitActDefId);
		}
		$("#forkAct").show();
	}else{
		$("#joinChk").prop({checked:false});
		$("#forkAct").hide();
	}
	$("#joinRule select option").remove();
	var joinRuleList=WFProp.getJoinRule();
	for(var id in joinRuleList){
		var node=joinRuleList[id];
		var option=$("<option></option>").val(node.data).text(node.label);
		$("#joinRule select").append(option);
	}
	if(activity.restrictObj.joinRule!=""){
		$("#joinRule select").val(activity.restrictObj.joinRule);
	}else{
		$("#joinRule select").val("default");
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
		$("#actBranch input:text").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D025","已设置"));
	}else{
		$("#actBranch input:text").val("");
	}
}
function updateActivityData(){
	var activity = wfdTaskData.model;
	activity.id=$("#activityId input").val();
	activity.name=$("#activityName input").val();	
	activity.unit=$("#activityLimit select").val();
	activity.describe=$("#activityDescribe textarea").val();
	activity.assignRuleType=$("#taskRule select").val();
	var isCreateActByPart=$("#chk1").is(":checked");
	if(isCreateActByPart) {
		if(!activity.multiObj){
			activity.multiObj = {};
		}
		activity.multiObj.language="ActInstancePerParty";
	}else{
		if(activity.multiObj){
			activity.multiObj.language="";
		}
	}
	activity.isAddActTimeToProcTime=!$("#chk2").is(":checked");
	var flag=false;
	var _warnTime=$("#activityWarn input").val();
	var _limitTime=$("#activityLimit input").val();
	var tmpWarnTime=parseInt(_warnTime);
	var tmpLimitTime=parseInt(_limitTime);
	if((isNaN(tmpLimitTime) && _limitTime!="")
			||(isNaN(tmpWarnTime) && _warnTime!="")){
		flag=true;
	}else{
		if(!isNaN(tmpLimitTime)){
			if(isNaN(tmpWarnTime) || tmpWarnTime<tmpLimitTime){
				activity.limitTime=_limitTime;
				activity.warnTime=_warnTime;
			}else{
				flag=true;
			}
		}else if(isNaN(tmpLimitTime) && isNaN(tmpWarnTime)){
			activity.limitTime=_limitTime;
			activity.warnTime=_warnTime;
		}else{
			flag=true;
		}
	}
	if(flag){
		$("#activityLimit input").val(activity.limitTime);
		$("#activityWarn input").val(activity.warnTime);
	}
	//处理分支条件
	if($("#splitChk").is(":checked")){
		activity.restrictObj.splitType="AND";
	}else{
		activity.restrictObj.splitType="";
	}
	if($("#joinChk").is(":checked")){
		activity.restrictObj.joinType="AND";
		activity.restrictObj.splitActDefId=$("#forkAct select").val();
		$("#forkAct").show();
	}else{
		activity.restrictObj.joinType="";
		activity.restrictObj.splitActDefId="";
		$("#forkAct").hide();
	}
	if($("#joinRule select").val()!="default"){
		activity.restrictObj.joinRule=$("#joinRule select").val();
	}else{
		activity.restrictObj.joinRule="";
	}
}

function isNodeExist(actId) {
	for (var key in WFGraph.nodeDiagramDic) {
		if (key == actId) {
			return true;
		}
	}
	return false;
}

//展现参与者信息
function showActivityPariticipants(pOwnerList){
	var title="";
	for(var pId in pOwnerList){
		title = title + dealPartsData(pOwnerList[pId])+" ";
	}
	if(title!=""){
		$("#participants input:text").val(title);
	}
	else{
		$("#participants input:text").val("");
	}
}
function dealPartsData(pOwner){
	if(pOwner.typeId=="creator"||pOwner.typeId=="sender"){
		if(pOwner.organName!=null && pOwner.organName!=""){
			return pOwner.itemName+"-"+pOwner.organName;
		}else{
			return pOwner.itemName;
		}
	}else if(pOwner.typeId=="historyactselect"){
		var index=pOwner.organName.indexOf("&");
		if(index!=-1){
			return "["+pOwner.organName.substring(0,index)+"]"+pOwner.itemName+
				"-"+pOwner.organName.substring(index+1);
		}else{
			return "["+pOwner.organName+"]"+pOwner.itemName;
		}
	}else if(pOwner.typeId=="extend"){
		return pOwner.itemName.substring(0,4)+
			"["+pOwner.organId.substring(0,pOwner.organId.indexOf(":"))+"]"+
			pOwner.itemName.substring(4)+"-"+pOwner.organName;
	}
	else if(pOwner.itemId=="unitAllEmp"){
		return pOwner.organName+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D121","(所有人)");
	}
	return pOwner.organName;
}
function getParts(e){
    e.title= e.value;
}