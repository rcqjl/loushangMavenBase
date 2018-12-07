// 修复ie8对trim不支持
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var dataArray=new Array();
var dataArray1=new Array();
$(function() {
	var newLine=function(){
		var tr=$("<tr></tr>")
					.append($("<td></td>").css({
						"padding-left":"10px"
					}).append($("<input />").attr("type","text").bind("blur",checkTitle)))
					.append($("<td />").css({
						"padding-left":"10px"
						}).append($("<input />").attr("type","text").bind("blur",checkTitle1)))
					.append($("<td />").css("width","40px").append($("<div/>").addClass("delImg img").click(function(){
						var delData=$("tbody tr").has(this).children(":eq(0)").children("input").attr("id");
						var delKey=$("tbody tr").has(this).children(":eq(1)").children("input").attr("id");
						delete dataArray[delData];
						delete dataArray1[delKey];
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
		var data=$(this).val().trim();
		if(data==$(this).attr("id")) return false;
		if($(this).attr("id")){
			delete dataArray[$(this).attr("id")];
		}
		if(data!=""){
			var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
			if(!dfPatrn.exec(data)){
				$(this).val("");
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C051","相关数据必须以英文字母、_或$开头,且遵循java变量命名规范！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				return false;
			}
			if(dataArray[data]==null){
				dataArray[data]=$(this).val();
				$(this).attr("id",data);
				var tr=$("tr").has(this);
				if(!$(tr).children(":eq(1)").children("input").val().trim() && dataArray1[data]==null){
					dataArray1[data]=data;
					$(tr).children(":eq(1)").children("input").attr("id",data);
					$(tr).children(":eq(1)").children("input").val($(this).val());
				}
			}else{
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C052","该相关数据与其他相关数据发生冲突,请重设"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				$(this).val("");
				$(this).focus();
				return false;
			}
		}
		
	}
	var checkTitle1=function (){
		var data=$(this).val().trim();
		if(data==$(this).attr("id")) return false;
		if($(this).attr("id")){
			delete dataArray1[$(this).attr("id")];
		}
		if(data!=""){
			var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
			if(!dfPatrn.exec(data)){
				$(this).val("");
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C053","参数key必须以英文字母、_或$开头,且遵循java变量命名规范！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				return false;
			}
			if(dataArray1[data]==null){
				dataArray1[data]=$(this).val();
				$(this).attr("id",data);
			}else{
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C054","该参数key与其他参数key发生冲突,请重设"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				$(this).val("");
				$(this).focus();
				return false;
			}
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
			var key=$(tr).children(":eq(1)").children("input").val().trim();
			var value=$(tr).children(":eq(0)").children("input").val().trim();
			if(key!="" && value!=""){
				obj=new Object()
				obj.key=key;
				obj.value=value;
				retObj.push(obj);
			}
			
		}
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	//初始化数据
	var dyparameter=fromParentParam.dyparameter;
	for(var n in dyparameter){
		dataArray[dyparameter[n]]=dyparameter[n];
		dataArray1[n]=n;
		var tr=$("<tr />")
					.append($("<td />").append($("<input />").attr("type","text").val(dyparameter[n]).attr("id",dyparameter[n]).bind("blur",checkTitle)))
					.append($("<td />").append($("<input />").attr("type","text").val(n).attr("id",n).bind("blur",checkTitle1)))
					.append($("<td />").css("width","40px").append($("<div/>").addClass("delImg img").click(function(){
						var delData=$("tbody tr").has(this).children(":eq(0)").children("input").attr("id");
						var delKey=$("tbody tr").has(this).children(":eq(1)").children("input").attr("id");
						delete dataArray[delData];
						delete dataArray1[delKey];
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
		$("tbody").append(tr);
	}
	//默认新增一行
	newLine();
	var dataObject=fromParentParam.dataObject;
	for(var n in dataObject){
		dataArray[dataObject[n].key]=dataObject[n].key;
	}
});