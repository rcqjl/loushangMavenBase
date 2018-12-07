var iii=0;
function switchTab(index) {
	$("#tab"+index+" a").addClass("on");
	$("ul li:not('#tab"+index+"')"+" a").removeClass("on");
	$("#con"+index).show();
	$(".con:not('#con"+index+"')").hide();
	var tmpW = $(".triangle").width()/2;
	var tmpL = $("#tabs").position().left;
	$("#triangle").css("left",$("ul li").width()*(index+iii-0.5)-tmpW+tmpL);
}
function getDiv(){
	var divDel=$("<div></div>").addClass("delImage");
	$(divDel).bind("click",function(){
		$(".con:visible .right .table table tbody tr").has(this).remove();
		$(".right tbody tr:even").removeClass("odd");
		$(".right tbody tr:odd").addClass("odd");
	});
	var divUp=$("<div></div>").addClass("upImage");
	$(divUp).click(function(){
		var tr=$(".con:visible .right .table table tbody tr").has(this);
		$(tr).insertBefore($(tr).prev());
		$(".right tbody tr:even").removeClass("odd");
		$(".right tbody tr:odd").addClass("odd");
	});
	var divDown=$("<div></div>").addClass("downImage");
	$(divDown).click(function(){
		var tr=$(".con:visible .right .table table tbody tr").has(this);
		$(tr).insertAfter($(tr).next());
		$(".right tbody tr:even").removeClass("odd");
		$(".right tbody tr:odd").addClass("odd");
	});
	return $("<div></div>").addClass("opt").append(divDown).append(divUp).append(divDel);
}
$(function (){
	$("body").height(window.innerHeight);
	var fromParentParam=window.parent.document.getElementById("popupFrame").inParam;
	if(!fromParentParam.show){
		iii=0;
		$("#triangle").css("left",68);
		$("#tab0").hide();
		var process=fromParentParam.CFProcess;
		if(!process.actions){
			process.actions=new parent.CFActions();
			process.actions.init();
		}
		var actions=fromParentParam.CFProcess.actions.childList;
			for(var n in actions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(actions[n].name).append(img);
				$(div).attr("id",actions[n].id)
				$(div).attr("description",actions[n].description);
				$("#con1right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
		if(!process.yiBanActions){
			process.yiBanActions=new parent.CFYiBanActions();
			process.yiBanActions.init();
		}
		var yiBanActions=fromParentParam.CFProcess.yiBanActions.childList;
			$("#con2").show();
			for(var n in yiBanActions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(yiBanActions[n].name).append(img);
				$(div).attr("id",yiBanActions[n].id)
				$(div).attr("description",yiBanActions[n].description);
				$("#con2right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con2").hide();
		if(!process.endActions){
			process.endActions=new parent.CFEndActions();
			process.endActions.init();
		}
		var endActions=fromParentParam.CFProcess.endActions.childList;
			$("#con3").show();
			for(var n in endActions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(endActions[n].name).append(img);
				$(div).attr("id",endActions[n].id)
				$(div).attr("description",endActions[n].description);
				$("#con3right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con3").hide();
		
	}else{
		if(parent.CFlow.isStart){
			iii=1;
		}else{
			$("#triangle").css("left",68);
			$("#tab0").hide();
			iii=0;
		}
		var activity=fromParentParam.localOpts;
		if(!activity.newActions){
			activity.newActions=new parent.CFNewActions();
			activity.newActions.init();
		}
		var newActions=activity.newActions.childList;
			$("#con0").show();
			for(var n in newActions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(newActions[n].name).append(img);
				$(div).attr("id",newActions[n].id)
				$(div).attr("description",newActions[n].description);
				$("#con0right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con0").hide();
		if(!activity.actions){
			activity.actions=new parent.CFActions();
			activity.actions.init();
		}
		var actions=activity.actions.childList;
			for(var n in actions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(actions[n].name).append(img);
				$(div).attr("id",actions[n].id)
				$(div).attr("description",actions[n].description);
				$("#con1right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
		if(!activity.yiBanActions){
			activity.yiBanActions=new parent.CFYiBanActions();
			activity.yiBanActions.init();
		}
		var yiBanActions=activity.yiBanActions.childList;
			$("#con2").show();
			for(var n in yiBanActions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(yiBanActions[n].name).append(img);
				$(div).attr("id",yiBanActions[n].id)
				$(div).attr("description",yiBanActions[n].description);
				$("#con2right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con2").hide();
		if(!activity.endActions){
			activity.endActions=new parent.CFEndActions();
			activity.endActions.init();
		}
		var endActions=activity.endActions.childList;
			$("#con3").show();
			for(var n in endActions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(endActions[n].name).append(img);
				$(div).attr("id",endActions[n].id)
				$(div).attr("description",endActions[n].description);
				$("#con3right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con3").hide();
		
	}
	
	$( ".comfirmArea" ).sortable();
	$( ".comfirmArea" ).disableSelection();
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/"
		+ "getBtnTypes",
		data:{
		},
		dataType:"json",
		async:false,
		success:function (data){
			show(data);
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
		}
	});
	$("#confirm").bind("click",function(){
		var xinjiantr=$("#con0right .comfirmArea > div").toArray();
		var xinjian=new Array();
		for(var n in xinjiantr){
			var action={};
			action.id=$(xinjiantr[n]).attr("id");
			action.name=$(xinjiantr[n]).text();
			action.description=$(xinjiantr[n]).attr("description");
			action.order=n;
			xinjian[n]=action;
		}
		
		var daibantr=$("#con1right .comfirmArea > div").toArray();
		var daiban=new Array();
		for(var n in daibantr){
			var action={};
			action.id=$(daibantr[n]).attr("id");
			action.name=$(daibantr[n]).text();
			action.description=$(daibantr[n]).attr("description");
			action.order=n;
			daiban[n]=action;
		}
		var yibantr=$("#con2right .comfirmArea > div").toArray();
		var yiban=new Array();
		for(var n in yibantr){
			var action={};
			action.id=$(yibantr[n]).attr("id");
			action.name=$(yibantr[n]).text();
			action.description=$(yibantr[n]).attr("description");
			action.order=n;
			yiban[n]=action;
		}
		var banjietr=$("#con3right .comfirmArea > div").toArray();
		var banjie=new Array();
		for(var n in banjietr){
			var action={};
			action.id=$(banjietr[n]).attr("id");
			action.name=$(banjietr[n]).text();
			action.description=$(banjietr[n]).attr("description");
			action.order=n;
			banjie[n]=action;
		}
		var localopt={};
		localopt.xinjian=xinjian;
		localopt.daiban=daiban;
		localopt.yiban=yiban;
		localopt.banjie=banjie;
		closeDialog(localopt);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	$(".select select").change(function(){
		var btntype=$(this).val();
		$(".left .table table tbody tr").each(function(){
			if($(this).attr("btntype")==btntype){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$(".select select").val(btntype);
		$(".left tbody tr:odd").removeClass("odd");
		$(".left tbody tr:even").addClass("odd");
	});
	function show(data){
		if(data.length<2){
			$(".selectArea").hide();
			for(var n=0;n<4;n++){
				if(/msie/.test(navigator.userAgent.toLowerCase())){
					$("#table"+n).css({"height":"240px"});
					document.getElementById("table"+n).style.cssText="height:210px !important";
					}
				else
					document.getElementById("table"+n).style.cssText="height:210px !important";
			}
			$(".table").css({
				"top":"10px",
				"position":"relative"
			});
			$("thead").css({
				"top":"51px"
			});
		}
		for(var i=0;i<data.length;i++){
			var option=$("<option/>").val(data[i].name).text(data[i].name);
			$(".select select").append(option);
			var btnList=data[i].btnList;
			for(var n in btnList){
				var tr=$("<tr></tr>");
				$(tr).attr("id",btnList[n].actionId);
				$(tr).append($("<td></td>").css("width","133px").text(btnList[n].actionName)).append($("<td></td>").css("width","240px").text(btnList[n].description));
				var image=$("<td></td>").css("width","91px").append($("<div></div>").addClass("addImage"));
				$(tr).attr("btntype",data[i].name);
				$(tr).append(image);
				$(".left .table table tbody").append(tr);
			}
		}
		$(".left tbody").each(function(){
			$(this).children("tr:odd").addClass("odd");
		});
		$(".left .table table tbody tr").bind("click",function(){
			$(".left .table table tbody tr").removeClass("selected");
			$(this).addClass("selected");
		}).hover(function(){
			$(this).children(":eq(2)").children("div").addClass("addImageHover");
		},function(){
			$(this).children(":eq(2)").children("div").removeClass("addImageHover");
		});
		$(".left .table table tbody tr td div").click(addopt);
		}
	function addopt(){
		$(".left .table table tbody tr").removeClass("selected");
		$(".left .table table tbody tr").has(this).addClass("selected");
		var tr=$(".left .table table tbody tr").has(this);
		var id=$(tr).attr("id");
		if($(".con:visible .comfirmArea >div[id='"+id+"']")[0]){
			return false;
		}
		var img=$("<div />").addClass("delImage").hide();
		$(img).bind("click",function(){
			$(".con:visible .comfirmArea > div").has(this).remove();
		});
		var div=$("<div />").text($(tr).children("td:eq(0)").text()).append(img);
		$(div).attr("id",$(tr).attr("id"))
		$(div).attr("description",$(tr).children("td:eq(1)").text());
		$(".con:visible .comfirmArea").append(div);
		$(div).width($(div).width()+18);
		$(div).hover(function(){
			$(this).children("div").show();
		},function(){
			$(this).children("div").hide();
		});
		
	}
	$(".left .table table tbody tr").each(function(){
		if($(this).attr("btntype")==L.getLocaleMessage("CForm.BPM.D236","系统默认")){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
		
	});