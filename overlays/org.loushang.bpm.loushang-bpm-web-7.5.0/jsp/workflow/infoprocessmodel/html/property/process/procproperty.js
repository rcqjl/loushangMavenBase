$(function(){
	$("#processName input").bind("change",function(){
		var tempId = wfdProcessData.model.id;
		var tempName = wfdProcessData.model.name;
		
		var name=$.trim($("#processName input").val());
		var nameV = true;
		if (!name) {
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D038","流程名称不能为空！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			nameV = false;
		}
		if (nameV) {
			var id="";
			if(WFlow.procDefUniqueId)
				id = $("#processId input").val();
			else
				id=WF.getPinyin(name);
			var idV = true;
			if (!id || id == "") {
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D039","流程ID不能为空！"),  L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				idV = false;
			}
			if (idV) {
				// 如果修改了流程ID、流程名称
				// 1)触发事件”wf_event_update_diagram“通知bpm修改图形名称
				var data = {eventType:"process", model:wfdProcessData.model, updateInfo:{id:id, name:name}, orgId:tempId};
				WFlow.trigger(WFlow.event.WF_UPDATE_DIAGRAM, data);
				$("#processId input").val(wfdProcessData.model.id);
				return;
			}
		}
		$("#processName input").val(tempName);
		$("#processId input").val(tempId);
	});
	$("#processLimit select").bind("change",function(){
		var unit=$("#processLimit select").val();
		if(unit=="N"){
			$("#processWarn span").text( L.getLocaleMessage("BPM.INFOPROCESSMODEL.D034","自然日"));
		}else{
			$("#processWarn span").text( L.getLocaleMessage("BPM.INFOPROCESSMODEL.D033","工作日"));
		}
		updateProcessData();
	});
	$("#processLimit input").bind("change",function(){
		 updateProcessData();
	});
	$("#processWarn input").bind("change",function(){
		updateProcessData();
	});
	$("#processLimit input,#processWarn input").keydown(function (e){　　
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
	$("#describe textarea").bind("change",function(){
		updateProcessData();
	});
	$("#divProcessPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divProcessPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	
	//设置相关数据
	$("#dataObject input:button").click(function(){
			var url=WFlow.webPath+"/jsp/workflow/infoprocessmodel/html/property/process/dataobj.jsp";
			var param={"dataobj":WFlow.getDataObject()};
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D040","设置相关数据"), url, 330, 360,param, aftDataobj);
		
		function aftDataobj(backdata){
			if(backdata){
				var textValue="";
				for(var n in backdata){
					textValue+=backdata[n]+";";
					WFlow.setDataObject(backdata[n]);
				}
				if(textValue){
					textValue=textValue.substring(0,textValue.length-1);
				}
				$("#dataObject input:text").val(textValue);
				$("#dataObject input:text").attr("title",textValue);
			}
		}
	});
});
var wfdProcessData;
function initProcessData(data){
	wfdProcessData = data;
	var process=data.model;
	$("#processName input").val(process.name);
	$("#processId input").val(process.id);
	$("#processLimit input").val(process.limitTime);
	$("#processWarn input").val(process.warnTime);
	if(process.unit){
		$("#processLimit select").val(process.unit);
		if(process.unit=="N"){
				$("#processWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D034","自然日"));
			}else{
				$("#processWarn span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D033","工作日"));
			}
	}
	$("#describe textarea").val(process.describe);
	
	var dataobj=WFlow.getDataObject();
	var textValue="";
	for(var n in dataobj){
		textValue+=dataobj[n]+";";
	}
	if(textValue){
		textValue=textValue.substring(0,textValue.length-1);
	}
	$("#dataObject input:text").val(textValue);
	$("#dataObject input:text").attr("title",textValue);
}

function updateProcessData(){
	var process=wfdProcessData.model;
	process.name=$("#processName input").val();
	process.id=$("#processId input").val();
	process.unit=$("#processLimit select").val();
	process.describe=$("#describe textarea").val();

	var _warnTime=$("#processWarn input").val();
	var _limitTime=$("#processLimit input").val();
	var tmpWarnTime = parseInt(_warnTime);
	var tmpLimitTime = parseInt(_limitTime);
	var flag=false;
	if((isNaN(tmpLimitTime) && _limitTime!="")
			||(isNaN(tmpWarnTime) && _warnTime!="")){
		flag=true;
	}else{
		if(!isNaN(tmpLimitTime)){
			if(isNaN(tmpWarnTime) || tmpWarnTime<tmpLimitTime){
				process.limitTime=_limitTime;
				process.warnTime=_warnTime;
			}else{
				flag=true;
			}
		}else if(isNaN(tmpLimitTime) && isNaN(tmpWarnTime)){
			process.limitTime=_limitTime;
			process.warnTime=_warnTime;
		}else{
			flag=true;
		}
	}
	if(flag){
		$("#processLimit input").val(process.limitTime);
		$("#processWarn input").val(process.warnTime);
	}
}