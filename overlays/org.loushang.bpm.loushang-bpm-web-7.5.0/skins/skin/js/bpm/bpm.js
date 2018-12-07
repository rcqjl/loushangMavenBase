/////////////////////////////////////////////////////
//                                                 //
//             js helper for bpm5                  //
//                                                 //
/////////////////////////////////////////////////////
putProcessInfoIntoContext();
function putProcessInfoIntoContext()
{
	var parameters=document.URL.split("?");
	if(parameters.length>0)
	{
		var keyValues=parameters[1].split("&");
		for ( var i = 0; i < keyValues.length; i++) {
			var keyValue = keyValues[i].split("=");
			if (keyValue.length == 2) {
				var key = keyValue[0];
				var value = keyValue[1];
				if (key == "procDefUniqueId" || key == "assignmentId" || key == "startActDefUniqueId" 
					|| key == "selectedOrganId" || key =="actDefUniqueId") {
					L5.setCP(key, value);
				}
			}
		}
	}
}

function getProcessInfoFromContext(key){
	return L5.Command.context.get(key);
}

//[start activity] select and send
function selectNextActivitiesAndPartiesFromStartAct(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectnextactivitiesandpartiesfromstartact.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId") + "&procDefUniqueId=" + getProcessInfoFromContext("procDefUniqueId");
	UIFrame(command, method, Url, "Next");
}

//[start activity] select and send(display employees)
function selectNextActivitiesAndEmployeesFromStartAct(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectnextactivitiesandemployeesfromstartact.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId") + "&procDefUniqueId=" + getProcessInfoFromContext("procDefUniqueId");
	UIFrame(command, method, Url, "Next");
}

//[middle activity] select and send
function selectNextActivitiesAndParties(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectnextactivitiesandparties.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url, "Next");
}

//[middle activity] select and send(display employees)
function selectNextActivitiesAndEmployees(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectnextactivitiesandemployees.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url, "Next");
}

//[middle activity] select and send(display employees)
function selectNextActivitiesAndEmployeesIncludeCurrentActivity(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectnextactivitiesandemployeesincludecurrentactivity.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url, "Next");
}

//[middle activity] select and jump
function selectJumpActivitiesAndParties(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectjumpactivitiesandparties.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url, "Next");
}	

//[middle activity] select and jump(display employees)
function selectJumpActivitiesAndEmployees(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectjumpactivitiesandemployees.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url, "Next");
}

//[middle activity] select and rollback 
function selectHistoryActivitiesAndParties(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selecthistoryactivitiesandparties.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Back");
}

//[middle activity] select and rollback (display employees)
function selectHistoryActivitiesAndEmployees(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selecthistoryactivitiesandemployees.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Back");
}

//[middle activity] select and rollback (display actualhandler)
function selectHistoryActivitiesAndActualHandler(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selecthistoryactivitiesandactualhandler.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Back");
}

//[middle activity] select and rollback (display actualhandler)
function selectHistoryActivitiesAndActualHandlerIncludeCurrentActivity(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selecthistoryactivitiesandactualhandlerincludecurrentactivity.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Back");
}

//[middle activity] in activity freesend (display stru)
function selectCurrentActivityEmployees(command, method) {
	var Url = L5.webPath + "/jsp/workflow/help/selectcurrentactivityemployees.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Next");
}

//[middle activity] in activity freesend (display stru)
function selectLoopSend() {
	var Url = L5.webPath + "/jsp/workflow/help/selectloopsend.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Next");
}

//[middle activity] in activity freesend (display stru)
function selectLoopSendDisplayByGrid() {
	var Url = L5.webPath + "/jsp/workflow/help/selectloopsend.jsp?assignmentId="
	+ getProcessInfoFromContext("assignmentId");
	UIFrame(command, method, Url,"Next");
	
/*	var url=L5.webPath+"/jsp/public/help/help.jsp?helpCode=bsp_employeelistquery"

	var returnValue = showModalDialog(url, window,
	"scroll:no;status:no;dialogWidth:500px;dialogHeight:400px");
	return assignValueToCurrentActivity(returnValue);*/
}

function UIFrame(command, method, Url, state){
	$.dialog({
        type: 'iframe',
        url: Url,
        title: '环节选择',
        width: 400,
        height: 300,
        onclose: function () {
       		if(this.returnValue.flag){
       			if(state=="Next"){
       				assignValueToNextActivity(this.returnValue);
       			}else if(state=="Back"){
       				assignValueToBackActivity(this.returnValue);
       			}else if(state=="Current"){
       			 	assignValueToCurrentActivity(this.returnValue);
       			}
       			command.execute(method);
       			if(!command.error){
       				//跳转到已办任务页面
       				var htmlUrl = L5.webPath  + "/jsp/workflow/tasklist/queryyiban.jsp";	
       				if(state=="Next"){
           				OKAlert("跳转发送成功!", htmlUrl);
           			}else if(state=="Back"){
           				OKAlert("跳转退回成功!", htmlUrl);
           			}else if(state=="Current"){
           			 	OKAlert("跳转成功!", htmlUrl);
           			}
       			} else{
       				UIAlert(command.error.msg);
       			}
			}
       }	
	});
}

//assign value to the next activity
function assignValueToNextActivity(returnValue) {
	if (!returnValue){
		return;
	}
	L5.setCP("nextActDefUniqueId", returnValue.actDefUniqueId);
	L5.setCP("nextActOrganIds", returnValue.organId);
	L5.setCP("nextActOrganNames", returnValue.organName);
	return "true";
}

//assign value to the rollback activity
function assignValueToBackActivity(returnValue) {
	if (!returnValue){
		return;
	}
	L5.setCP("backActDefUniqueId", returnValue.actDefUniqueId);
	L5.setCP("backActOrganIds", returnValue.organId);
	L5.setCP("backActOrganNames", returnValue.organName);
	return "true";
}

//assign value to the current activity
function assignValueToCurrentActivity(returnValue) {
	if (!returnValue){
		return;
	}
	L5.setCP("selectedOrganId", returnValue[0]);
	L5.setCP("selectedOrganName", returnValue[1]);
	return "true";
}