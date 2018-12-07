// 修复ie8对trim不支持
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
var dyparameter={};
$(function(){
	$("#divProcFormPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divProcFormPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	
	$("#procDaiban input").bind("blur",function(){
		updateTaskRequest("daiban", $(this).val().trim());
	});
	$("#procYiban input").bind("blur",function(){
		updateTaskRequest("yiban", $(this).val().trim());
	});
	$("#procSubject input").bind("blur",function(){
		var data=$(this).val().trim();
		var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
		if(data!=""&&!dfPatrn.exec(data)){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C076","标题必须以英文字母、_或$开头,且遵循java变量命名规范！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			return false;
		}
		if(data!=""){
			WFlow.setDataObject(data);
		}
		WFlow.setSubject(data);
	});
	$("#procDynamicParam input:button").bind("click",function(){
		var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/bizform/view/dynamicpara.jsp";
		dyparameter={};
		if(WFormProcess.taskParameters){
			var taskParameters=WFormProcess.taskParameters.childList;
			for(var key in taskParameters){
				dyparameter[key]=taskParameters[key].value;
			}
		}
		var param={"dyparameter":dyparameter};
		showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C017","设置动态参数"), url, 380, 360,param, aftDynapara1);
	});
	function aftDynapara1(backdata){
		if(backdata==null)
			return ;
		if(!WFormProcess.taskParameters){
			WFormProcess.taskParameters=new WFormTaskParameters();
		}
		WFormProcess.taskParameters.childList={};
		var taskParameters=WFormProcess.taskParameters.childList;
		var textValue="";
		var addList={};
		var para;
		for(var n in backdata){
			textValue+=backdata[n].key+"-"+backdata[n].value+";";
			WFlow.setDataObject(backdata[n].value);
			para=new WFormParameter();
			para.key=backdata[n].key;
			para.value=backdata[n].value;
			taskParameters[para.key]=para;
			if(!dyparameter[para.key]){
				addList[para.key]=para;
			}else{
				delete dyparameter[para.key];
			}
		}
		updateActDynamicParam(addList, dyparameter);
		if(textValue==""){
			delete WFormProcess.taskParameters;
		}else{
			textValue=textValue.substring(0,textValue.length-1);
		}
		$("#procDynamicParam input:text").val(textValue);
		$("#procDynamicParam input:text").attr("title",textValue);
	}
	function updateActDynamicParam(addList, delList){
		var activities=WFormProcess.activities.childList;
		for(var n in activities){
			if(!activities[n].taskParameters){
				activities[n].taskParameters=new WFormTaskParameters();
				activities[n].taskParameters.childList={};
			}
			var taskParameters=activities[n].taskParameters.childList;
			var para;
			for(var key1 in addList){
				para=new WFormParameter();
				para.key=key1;
				para.value=addList[key1].value;
				taskParameters[para.key]=para;
			}
			for(var key2 in delList){
				delete taskParameters[key2];
			}
		}
	}
	function updateTaskRequest(type, url){
		if(!WFormProcess.taskRequests){
			WFormProcess.taskRequests=new WFormTaskRequests();
			WFormProcess.taskRequests.init();
		}
		var taskRequests=WFormProcess.taskRequests.childList;
		if(url!=null && url!=""){
			if(taskRequests[type] && taskRequests[type].url==url){
				return ;
			}
			var taskRequest=new WFormTaskRequest();
			taskRequest.id=type;
			taskRequest.url=url;
			taskRequests[type]=taskRequest;
			updateActTaskRequest(type, url);
		}else{
			delete taskRequests[type];
		}
		var flag=false;
		for(var id in taskRequests){
			flag=true;break;
		}
		if(!flag){
			delete WFormProcess.taskRequests;
		}
	}
	function updateActTaskRequest(type, url){
		var activities=WFormProcess.activities.childList;
		var act=new Array();
		var index=0;
		for(var n in activities){
			if(activities[n].taskRequests){
				var actTaskRequest=activities[n].taskRequests.childList[type];
				if(actTaskRequest){
					if(actTaskRequest.url==url)
						continue;
					act.push(activities[n]);
				}else{
					actTaskRequest=new WFormTaskRequest();
					actTaskRequest.id=type;
					actTaskRequest.url=url;
					activities[n].taskRequests.childList[type]=actTaskRequest;
				}
			}else{
				activities[n].taskRequests=new WFormTaskRequests();
				activities[n].taskRequests.init();
				var actTaskRequest=new WFormTaskRequest();
				actTaskRequest.id=type;
				actTaskRequest.url=url;
				activities[n].taskRequests.childList[type]=actTaskRequest;
			}
			activities[n].isSetFlag=true;
		}
		function dealTaskRequest(){
			if(index==act.length)
				return false;
			showConfirm(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C036","是否将变化同步到")+act[index].name+"?", taskConfirmClick, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300, false,taskCancelClick);
		}
		function taskConfirmClick(){
			var actTaskRequests=act[index].taskRequests.childList;
			var actTaskRequest=new WFormTaskRequest();
			actTaskRequest.id=type;
			actTaskRequest.url=url;
			actTaskRequests[type]=actTaskRequest;
			index++;
			dealTaskRequest();
		}
		function taskCancelClick(){
			index++;
			dealTaskRequest();
		}
		dealTaskRequest();
	}
	WForm.initWFormProcData();
});
WForm.initWFormProcData=function(){
	if(WFormProcess.isSetFlag){
		if(WFormProcess.taskRequests){
			var taskRequests=WFormProcess.taskRequests.childList;
			for(var n in taskRequests){
				switch(taskRequests[n].id){
					case "daiban":
						$("#procDaiban input").val(taskRequests[n].url);
						break;
					case "yiban":
						$("#procYiban input").val(taskRequests[n].url);
						break;
					default :
						break;
				}
			}
		}
		if(WFormProcess.taskParameters){
			var taskParameters=WFormProcess.taskParameters.childList;
			var textValue="";
			for(var key in taskParameters){
				textValue+=key+"-"+taskParameters[key].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#procDynamicParam input:text").val(textValue);
			$("#procDynamicParam input:text").attr("title",textValue);
		}
		var subject=WFlow.getSubject();
		if(subject!=null && subject!=""){
			$("#procSubject input").val(subject);
		}else{
			$("#procSubject input").val("");
		}
	}else{
		$("#procDynamicParam input:text").val("dataId-dataId");
		$("#procDynamicParam input:text").attr("title","dataId-dataId");
		WFormProcess.taskParameters=new WFormTaskParameters();
		WFormProcess.taskParameters.childList={};
		var para=new WFormParameter();
		para.key="dataId";
		para.value="dataId";
		WFormProcess.taskParameters.childList["dataId"]=para;
		WFlow.setSubject("dataId");
		WFlow.setDataObject("dataId");
		
		$("#procSubject input").val("WF_PROC_SUBJECT");
		WFlow.setSubject("WF_PROC_SUBJECT");
		WFlow.setDataObject("WF_PROC_SUBJECT");
		WFormProcess.isSetFlag=true;
	}
};
