// 修复ie8对trim不支持
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
var activity;
$(function(){
	$("#divActFormPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divActFormPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#actNew input").bind("blur",function(){
		updateTaskRequest("new", $(this).val().trim());
	});
	$("#actDaiban input").bind("blur",function(){
		updateTaskRequest("daiban", $(this).val().trim());
	});
	$("#actYiban input").bind("blur",function(){
		updateTaskRequest("yiban", $(this).val().trim());
	});
	$("#actDynamicParam input:button").bind("click",function(){
		var url=WForm.webPath+"/jsp/workflow/infoprocessmodel/bizform/view/dynamicpara.jsp";
		var dyparameter={};
		if(activity.taskParameters){
			var taskParameters=activity.taskParameters.childList;
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
		if(!activity.taskParameters){
			activity.taskParameters=new WFormTaskParameters();
		}
		activity.taskParameters.childList={};
		var taskParameters=activity.taskParameters.childList;
		var textValue="";
		var para;
		for(var n in backdata){
			textValue+=backdata[n].key+"-"+backdata[n].value+";";
			WFlow.setDataObject(backdata[n].value);
			para=new WFormParameter();
			para.key=backdata[n].key;
			para.value=backdata[n].value;
			taskParameters[para.key]=para;
		}
		if(textValue==""){
			delete activity.taskParameters;
		}else{
			textValue=textValue.substring(0,textValue.length-1);
		}
		$("#actDynamicParam input:text").val(textValue);
		$("#actDynamicParam input:text").attr("title",textValue);
	}
	
	function updateTaskRequest(type, url){
		if(!activity.taskRequests){
			activity.taskRequests=new WFormTaskRequests();
			activity.taskRequests.init();
		}
		var taskRequests=activity.taskRequests.childList;
		if(url!=null && url!=""){
			var taskRequest=new WFormTaskRequest();
			taskRequest.id=type;
			taskRequest.url=url;
			taskRequests[type]=taskRequest;
		}else{
			delete taskRequests[type];
		}
		var flag=false;
		for(var id in taskRequests){
			flag=true;break;
		}
		if(!flag){
			delete activity.taskRequests;
		}
	}
	
	WForm.initWFormActData();
});
WForm.initWFormActData=function(){
	activity=WFormModel.process.activities.childList[WForm.parameter['selectedId']];
	if(WForm.isStart){
		$("#actNew").show();
	}else{
		$("#actNew").hide();
	}
	$(".prop input").val("");
	if(activity.isSetFlag){
		if(activity.taskRequests){
			var requests=activity.taskRequests.childList;
			for(var n in requests){
				switch(requests[n].id){
				case "new":
					$("#actNew input").val(requests[n].url);
					break;
				case "daiban":
					$("#actDaiban input").val(requests[n].url);
					break;
				case "yiban":
					$("#actYiban input").val(requests[n].url);
					break;
				default :
					break;
				}
			}
		}
		if(activity.taskParameters){
			var taskParameters=activity.taskParameters.childList;
			var textValue="";
			for(var key in taskParameters){
				textValue+=key+"-"+taskParameters[key].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#actDynamicParam input:text").val(textValue);
			$("#actDynamicParam input:text").attr("title",textValue);
		}
	}else{
		if(WFormProcess.taskRequests){
			var taskRequests=WFormProcess.taskRequests.childList;
			activity.taskRequests=new WFormTaskRequests();
			activity.taskRequests.init();
			for(var n in taskRequests){
				var actTaskRequest=new WFormTaskRequest();
				switch(taskRequests[n].id){
					case "daiban":
						actTaskRequest.id="daiban";
						$("#actDaiban input").val(taskRequests[n].url);
						break;
					case "yiban":
						actTaskRequest.id="yiban";
						$("#actYiban input").val(taskRequests[n].url);
						break;
					default :
						break;
				}
				actTaskRequest.url=taskRequests[n].url;
				activity.taskRequests.childList[actTaskRequest.id]=actTaskRequest;
			}			
		}
		if(WFormProcess.taskParameters){
			var taskParameters=WFormProcess.taskParameters.childList;
			var textValue="";
			activity.taskParameters=new WFormTaskParameters();
			activity.taskParameters.childList={};
			var actTaskParameters=activity.taskParameters.childList;
			for(var key in taskParameters){
				var para=new WFormParameter();
				para.key=key;
				para.value=taskParameters[key].value;
				actTaskParameters[key]=para;

				textValue+=key+"-"+taskParameters[key].value+";";
			}
			textValue=textValue.substring(0,textValue.length-1);
			$("#actDynamicParam input:text").val(textValue);
			$("#actDynamicParam input:text").attr("title",textValue);			
		}
		activity.isSetFlag=true;
	}
	
};