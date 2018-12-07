var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var activities=fromParentParam.activities;
var procDaiban=fromParentParam.procDaiban;
var procYiBan=fromParentParam.procYiBan;
var procBanjie=fromParentParam.procBanjie;
$(function() {
	$("#procDaiban").text(procDaiban.substring(0,procDaiban.length-1));
	$("#procYiban").text(procYiBan.substring(0,procYiBan.length-1));
	$("#procBanjie").text(procBanjie.substring(0,procBanjie.length-1));
	$("#confirm").bind("click",function(){
		var trs=$("#actContext tr").toArray();
		var synArrs=new Array();
		var synArr;
		for(var n in trs){
			var tr=trs[n];
			var flag=$(tr).children("td:eq(0)").children("input").prop("checked");
			if(!flag) continue;
			synArr=new Object();
			synArr.id=$(tr).attr("id");
			synArr.daibansyn=$(tr).children("td:eq(1)").children("input").prop("checked");
			synArr.yibansyn=$(tr).children("td:eq(2)").children("input").prop("checked");
			synArr.endsyn=$(tr).children("td:eq(3)").children("input").prop("checked");
			if(synArr.endsyn || synArr.yibansyn || synArr.daibansyn)
				synArrs.push(synArr);
		}
		closeDialog(synArrs);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	var newLine=function(id,name,txtDaiBanBtn,txtYiBanBtn,txtEndBtn){
		var tr=$("<tr/>").attr("id",id)
				.append($("<td />").append($("<input/>").attr("type","checkbox")).append(name))
				.append($("<td />").append($("<input/>").attr("type","checkbox")).append($("<div></div>").addClass("actTxtBtn").text(txtDaiBanBtn)))
				.append($("<td />").append($("<input/>").attr("type","checkbox")).append($("<div></div>").addClass("actTxtBtn").text(txtYiBanBtn)))
				.append($("<td />").append($("<input/>").attr("type","checkbox")).append($("<div></div>").addClass("actTxtBtn").text(txtEndBtn)));
		$("#actContext").append(tr);
		
	}
	for(var n in activities){
		var txtDaiBanBtn="";
		var txtYiBanBtn="";
		var txtEndBtn="";
		if(activities[n].buttons){
			var actDaiBanBtns=activities[n].buttons.childList;
			for(var m in actDaiBanBtns){
				txtDaiBanBtn+=actDaiBanBtns[m].name+";";
			}
		}
		if(activities[n].yibanButtons){
			var actYiBanBtns=activities[n].yibanButtons.childList;
			for(var m in actYiBanBtns){
				txtYiBanBtn+=actYiBanBtns[m].name+";";
			}
		}
		if(activities[n].endButtons){
			var actEndBtns=activities[n].endButtons.childList;
			for(var m in actEndBtns){
				txtEndBtn+=actEndBtns[m].name+";";
			}
		}
		txtDaiBanBtn=txtDaiBanBtn.substring(0,txtDaiBanBtn.length-1);
		txtYiBanBtn=txtYiBanBtn.substring(0,txtYiBanBtn.length-1);
		txtEndBtn=txtEndBtn.substring(0,txtEndBtn.length-1);
		newLine(n,activities[n].name,txtDaiBanBtn,txtYiBanBtn,txtEndBtn);
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
		
		$(this).children("td:gt(0)").children("input").click(function(){
			var checked=$(this).prop("checked");
			if(checked){
				$("#actContext tr").has(this).children("td:eq(0)").children("input").prop("checked",checked);
			}
			
		});
	});
	$("input").prop("checked",true);
});