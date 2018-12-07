pers=8;
var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var retObj={};
var procs=new Array();
var procDefId=fromParentParam.procDefId;
$(function(){
	getCountByName("");
	$("#search").bind("click",function(){
		var procName=$("#searchValue").val();
		if(!procName || procName!=""){
			getCountByName(procName);
			
		}
			return false;
		
	});
	
	$("#confirm").bind("click",function(){
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	
});

function showProcess(index){
	$("tbody tr").empty();
	var m=0;
	for(var i=index;i<procs.length && i<(index+8);i++){
		var process=procs[i];
		var processId=$("<td></td>").text(process.procDefId);
		var processName=$("<td></td>").text(process.procDefName);
		$("tbody tr:eq("+m+")").append(processId).append(processName).attr("id",process.procDefUniqueId);
		m++;
	}
	for(;m<8;m++){
		var processId=$("<td></td>");
		var processName=$("<td></td>");
		$("tbody tr:eq("+m+")").append(processId).append(processName).attr("id","");
	}
	$("tbody tr").removeClass("selected");
	$("tbody tr").bind("click",function(){
		$("tbody tr").removeClass("selected");
		$(this).addClass("selected");
		retObj.procDefId=$(this).children(":eq(0)").text();
		retObj.procDefName=$(this).children(":eq(1)").text();
		retObj.procDefUniqueId=$(this).attr("id");
		});
}
function setNavigator(pageCount,fnc,dyn){
	$('#bottom').empty();
	$('#bottom').smartpaginator({ 
		totalrecords: pageCount,
        recordsperpage: pers,
        length:5,
        next: L.getLocaleMessage("BPM.INFOPROCESSMODEL.D056","下页"), 
        prev: L.getLocaleMessage("BPM.INFOPROCESSMODEL.D057","上页"), 
        first: L.getLocaleMessage("BPM.INFOPROCESSMODEL.D058","首页"), 
        last: L.getLocaleMessage("BPM.INFOPROCESSMODEL.D059","尾页"),
        theme: 'black',
        onchange:function(newPage){
        	fnc(newPage-1,pers,dyn);
        }});
}
	function updateProcs(procName){
		if(!procName) procName="";
		procs=new Array();
		for(var n in processes){
			var proc=processes[n];
			if(proc.procDefName.contains(procName)){
				procs.push(proc);
			}
		}
	}
function getProcessByDefId(start,limit,procDefId){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+"org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
		+ "getSubProcessDefListByProcDefId",
		data:{
			start:start*limit,
			limit:limit,
			procDefId:procDefId
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
			}else{
				procs=data.processList;
				showProcess(0);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	});
}

function getProcessByDefName(start,limit,procDefName){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+"org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
		+ "getSubProcessDefListByProcDefName",
		data:{
			start:start*limit,
			limit:limit,
			procDefName:procDefName,
			procDefId:procDefId
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
			}else{
				procs=data.processList;
				showProcess(0);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	});
}

function getCount(){

	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+"org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
		+ "getSubProcessDefCount",
		data:{
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
			}else{
				setNavigator(data.count, getProcessByDefId, procDefId);
				getProcessByDefId(0, pers, procDefId);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	});

}

function getCountByName(procDefName){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+"org.loushang.workflow.infoprocessmodel.cmd.ProcDefDispatcherCmd/"
		+ "getSubProcessDefCountByProcDefName",
		data:{
			procDefName:procDefName
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 400);
			}else{
				setNavigator(data.count,getProcessByDefName,procDefName);
				getProcessByDefName(0, pers, procDefName);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D060","请求数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
		}
	});


}