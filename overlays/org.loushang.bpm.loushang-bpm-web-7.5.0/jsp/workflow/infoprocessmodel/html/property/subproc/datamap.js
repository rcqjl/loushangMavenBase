var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var mainData=fromParentParam.mainData;
var subData=fromParentParam.subData;
var fromMainToSub=fromParentParam.mainToSub;
var fromSubToMain=fromParentParam.subToMain;

function switchTab(index) {
	$("#tab"+index+" a").addClass("on");
	$("ul li:not('#tab"+index+"')"+" a").removeClass("on");
	$("#con"+index).show();
	$(".con:not('#con"+index+"')").hide();
	var tmpW = $(".triangle").width()/2;
	var tmpL = $("#tabs").position().left;
	$("#triangle").css("left",$("ul li").width()*(index+1-0.5)-tmpW+tmpL);
}
function getSubDataSelect(dataObj){
	var select=$("<select />");
	$(select).append($("<option />").val("").text(""));
	for(var n in dataObj){
		var op=$("<option />").val(dataObj[n]).text(dataObj[n]);
		$(select).append(op)
	}
	return select;
}
$(function() {
	
	$("#confirm").bind("click",function(){
		//主流程映射
		var mainTrs=$("#con0 tbody tr").toArray();
		var mainMap=new Array();
		var mapping;
		for(var n in mainTrs){
			var tr=mainTrs[n];
			var targetRef=$(tr).children(":eq(1)").children().val();
			if(targetRef){
				mapping=new Object();
				mapping.sourceRef=$(tr).children(":eq(0)").text();
				mapping.targetRef=targetRef;
				mainMap.push(mapping);
			}
		}
		
		//子流程映射
		var subTrs=$("#con1 tbody tr").toArray();
		var subMap=new Array();
		for(var n in subTrs){
			var tr=subTrs[n];
			var targetRef=$(tr).children(":eq(1)").children().val();
			if(targetRef){
				mapping=new Object();
				mapping.sourceRef=$(tr).children(":eq(0)").text();
				mapping.targetRef=targetRef;
				subMap.push(mapping);
			}
		}
		
		closeDialog([mainMap,subMap]);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	//初始化数据
	for(var n in mainData){
		var tr=$("<tr />");
		$(tr).attr("id",mainData[n]);
		$(tr).append($("<td />").text(mainData[n]));
		$(tr).append($("<td />").append(getSubDataSelect(subData)));
		$("#con0 tbody").append(tr);
	}
	
	for(var n in fromMainToSub){
		var data=fromMainToSub[n];
		$("#con0 tr[id='"+data.sourceRef+"']").children(":eq(1)").children().val(data.targetRef);
	}
	
	for(var n in subData){
		var tr=$("<tr />");
		$(tr).attr("id",subData[n]);
		$(tr).append($("<td />").text(subData[n]));
		$(tr).append($("<td />").append(getSubDataSelect(mainData)));
		$("#con1 tbody").append(tr);
	}
	
	for(var n in fromSubToMain){
		var data=fromSubToMain[n];
		$("#con1 tr[id='"+data.sourceRef+"']").children(":eq(1)").children().val(data.targetRef);
	}
	
//（IE8下出现兼容问题）刷新tr后，若下拉框处于展开状态，会自动关闭
//	$("tbody tr").hover(
//	function (){
//		$(this).addClass("hover");
//	},function(){
//		$(this).removeClass("hover");
//	}
//	);
	
});