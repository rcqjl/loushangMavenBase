var targetNodeList=null;
$(function(){
	var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
	$("#divGatewayformPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divGatewayformPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#branchCondiId input:button").bind("click",function(){
		var url=CFlow.webPath+"/jsp/cform/procdef/html/condition/branch.jsp";
		
		var frontNode = WFlow.getFrontAct(CFlow.getSelectedId());
		if(frontNode==null){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D257","请为分支环节设置上一环节！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}else{
			frontAct=CFProcess.activities.childList[frontNode.id];
			if(frontAct.formId){
			}else{
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D258","请先为上一环节设置表单！"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;	
			}
		}
		if(targetNodeList==null){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D246","没有找到目标环节！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}else{
			var f=0;
			for(var n in targetNodeList){
				f++;
			}
			if(f==1){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D247","仅存在一个目标环节，无需设置分支条件！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;
			}
		}
		var param={gname:$(this).attr("gname"),frontAct:frontAct, targetNodeList:targetNodeList};
		showWindow(L.getLocaleMessage("CForm.BPM.D210","设置分支条件"), url, 600, 425,param, afterCloseForm);
	});
	
	function afterCloseForm(result){
		var flag=false;
		if(result!=null){
			//将分支条件保存到BPM端
			WFlow.setSeqCondition(CFlow.getSelectedId(), result.expDic, result.dataObjectDic);
			//更新模型信息之后，重新获取
			CFlow.initGataWay();
		}
	}
	CFlow.initGataWay();
});
CFlow.initGataWay =function(name){
	$("#branchCondiId input").attr("gname",name);
	targetNodeList=WFlow.getTargetNodeInfo(CFlow.getSelectedId());
	var flag=false;
	for(var nodeId in targetNodeList){
		var node=targetNodeList[nodeId];
		if(node["expression"]!=null && node["expression"]!=""){
			flag=true; break;
		}
	}
	if(flag){
		$("#branchCondiId input:text").val(L.getLocaleMessage("CForm.BPM.D191","已设置"));
	}else{
		$("#branchCondiId input:text").val("");
	}
}