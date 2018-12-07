var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var activities=fromParentParam.activities;
var subjectData=fromParentParam.subjectData;
var type=fromParentParam.type;
$(function() {
	var sysSubject="";
	for(var n in subjectData){
		sysSubject+=subjectData[n].subjectKey+"-"+subjectData[n].fieldName+";";
	}
	$("#synSubject").text(sysSubject.substring(0,sysSubject.length-1));
	$("#confirm").bind("click",function(){
		var trs=$("#actContext tr").toArray();
		var selAct=new Array();
		for(var n in trs){
			var tr=trs[n];
			var flag=$(tr).children("td:eq(0)").children("input").prop("checked");
			if(!flag) continue;
			selAct.push($(tr).children("td:eq(0)").attr("actId"));
		}
		closeDialog(selAct);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	var newLine=function(id,act){
		var txtSubject="";
		if(act.subjects){
			for(var n in act.subjects.childList){
				var actSubject=act.subjects.childList[n];
				if(actSubject.type==type){
					txtSubject+=actSubject.subjectKey+"-"+actSubject.fieldName+";";
				}
			}
		}
		var tr=$("<tr/>").attr("id",id)
				.append($("<td />").addClass("actTh").append($("<input/>").attr("type","checkbox")).attr("actId",act.id).append(act.name))
				.append($("<td />").addClass("conTh").append($("<div></div").addClass("actTxtContext").text(txtSubject.substring(0,txtSubject.length-1))));
		$("#actContext").append(tr);
		
	}
	for(var n in activities){
		newLine(n,activities[n]);
	}
	
	//绑定表头复选框单击事件
	$("th input:checkbox:gt(0)").bind("click",function(){
		var index=$(this).parent().index();
		var checked=$(this).prop("checked");
		$("#actContext tr").each(function(){
			$(this).children("td:eq("+index+")").children().prop("checked",checked);
		});
	});
	//左上角复选框单击事件
	$("th input:checkbox:eq(0)").bind("click",function(){
		var checked=$(this).prop("checked");
		$("input:checkbox").prop("checked",checked);
	});
	//第一列复选框单击事件
	$("#actContext tr").each(function(){
		$(this).children("td:eq(0)").children("input").click(function(){
			var checked=$(this).prop("checked");
			$("#actContext tr").has(this).children("td").children("input").prop("checked",checked);
		});
	});
	$("input").prop("checked",true);
});