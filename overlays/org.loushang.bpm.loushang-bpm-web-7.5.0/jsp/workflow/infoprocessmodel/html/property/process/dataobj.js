var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var dataArray=new Array();
$(function() {
	var newLine=function(){
		var tr=$("<tr></tr>")
					.append($("<td></td>").css({
						"padding-left":"10px"
					}).append($("<input />").attr("type","text").bind("blur",checkTitle)))
					.append($("<td />").css("width","40px").append($("<div/>").addClass("delImg img").click(function(){
						var delData=$("tbody tr").has(this).find("input").val();
						delete dataArray[delData];
						$("tbody tr").has(this).remove();
					})));
		$(tr).hover(function(){
			
			$(this).children().each(function(){
				$(this).addClass("hover");
				$(this).children().each(function(){
					$(this).addClass("hover");
				});
			});
		},function(){
			$(this).children().each(function(){
				$(this).removeClass("hover");
				$(this).children().each(function(){
					$(this).removeClass("hover");
				});
			});
		});
		$(tr).addClass("tr");
		$(" tbody").append(tr);
	}
	
	//检测标题合法性
	var checkTitle=function (){
		var data=$(this).val();
		if($(this).val()=="" || data==$(this).attr("id")) return false;
		var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
		if(!dfPatrn.exec(data)){
			$(this).val("");
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D012","相关数据必须以英文字母、_或$开头,且遵循java变量命名规范！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			return false;
		}
		if(dataArray[data]==null){
			dataArray[data]=$(this).val();
			$(this).attr("id",data);
			var tr=$("tr").has(this);
			$(tr).children(":eq(1)").children("input").val($(this).val());
		}else{
			showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D029","该相关数据与其他相关数据发生冲突,请重设"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
			$(this).val("");
			$(this).focus();
			return false;
		}
	}
	//添加按钮点击事件
	$("#add").click(function(){
		newLine();
	});
	$(".addImg").click(function(){
		newLine();
	});
	
	$("#confirm").bind("click",function(){
		var trs=$("tbody tr").toArray();
		var retObj=new Array();
		var obj;
		for(var n in trs){
			if(n=="") continue;
			var tr=trs[n];
			if($(tr).children(":eq(0)").children("input").val()){
				dataobj=$(tr).children(":eq(0)").children("input").val();
				retObj.push(dataobj);
			}
		}
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	//初始化数据
	var dataobj=fromParentParam.dataobj;
	for(var n in dataobj){
		dataArray[n]=n;
		var tr=$("<tr />")
					.append($("<td />").append($("<input />").attr("type","text").val(n).attr("id",n).attr("readonly","readonly").bind("blur",checkTitle)))
					.append($("<td />").css("width","40px").append($("<div/>").addClass("delImg img").click(function(){
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D030","该相关数据不能删除"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
						return false;
					})));
		$(tr).hover(function(){
			$(this).children().each(function(){
				$(this).addClass("hover");
				$(this).children().each(function(){
					$(this).addClass("hover");
				});
			});
		},function(){
			$(this).children().each(function(){
				$(this).removeClass("hover");
				$(this).children().each(function(){
					$(this).removeClass("hover");
				});
			});
		});
		$(tr).addClass("tr");
		$("tbody").append(tr);
	}
	//默认新增一行
	newLine();
	var dataObject=fromParentParam.dataObject;
});