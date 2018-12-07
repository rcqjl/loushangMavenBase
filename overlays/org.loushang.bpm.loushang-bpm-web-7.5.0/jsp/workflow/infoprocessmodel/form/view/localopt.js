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
		$("#triangle").css("left",70);
		$("#tab0").hide();
		var process=fromParentParam.FormProcess;
		if(!process.buttons){
			process.buttons=new parent.WFormButtons();
			process.buttons.init();
		}
		var actions=fromParentParam.FormProcess.buttons.childList;
		if(actions[0]){
			for(var n in actions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(actions[n].name).append(img);
				$(div).attr("id",actions[n].id)
				$(div).attr("funName",actions[n].funName);
				$(div).attr("description",actions[n].description);
				$("#con1right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
		}
		if(!process.yibanButtons){
			process.yibanButtons=new parent.WFormYiBanButtons();
			process.yibanButtons.init();
		}
		var yiBanButtons=fromParentParam.FormProcess.yibanButtons.childList;
		if(yiBanButtons[0]){
			$("#con2").show();
			for(var n in yiBanButtons){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(yiBanButtons[n].name).append(img);
				$(div).attr("id",yiBanButtons[n].id);
				$(div).attr("funName",yiBanButtons[n].funName);
				$(div).attr("description",yiBanButtons[n].description);
				$("#con2right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con2").hide();
		}
		if(!process.endButtons){
			process.endButtons=new parent.WFormEndButtons();
			process.endButtons.init();
		}
		var endButtons=fromParentParam.FormProcess.endButtons.childList;
		if(endButtons[0]){
			$("#con3").show();
			for(var n in endButtons){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(endButtons[n].name).append(img);
				$(div).attr("id",endButtons[n].id)
				$(div).attr("funName",endButtons[n].funName);
				$(div).attr("description",endButtons[n].description);
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
		
	}else{//环节操作
		if(parent.WForm.isStart){
			iii=1;
		}else{
			$("#triangle").css("left",70);
			$("#tab0").hide();
			iii=0;
		}
		var formHandle=fromParentParam.localOpts;
		if(!formHandle.newButtons){
			formHandle.newButtons=new parent.WFormNewButtons();
			formHandle.newButtons.init();
		}
		var newButtons=formHandle.newButtons.childList;
		if(newButtons[0]){
			$("#con0").show();
			for(var n in newButtons){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(newButtons[n].name).append(img);
				$(div).attr("id",newButtons[n].id)
				$(div).attr("funName",newButtons[n].funName);
				$(div).attr("description",newButtons[n].description);
				$("#con0right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con0").hide();
		}
		if(!formHandle.buttons){
			formHandle.buttons=new parent.WFormButtons();
			formHandle.buttons.init();
		}
		var actions=formHandle.buttons.childList;
		if(actions[0]){
			for(var n in actions){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(actions[n].name).append(img);
				$(div).attr("id",actions[n].id)
				$(div).attr("funName",actions[n].funName);
				$(div).attr("description",actions[n].description);
				$("#con1right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
		}
		if(!formHandle.yibanButtons){
			formHandle.yibanButtons=new parent.WFormYiBanButtons();
			formHandle.yibanButtons.init();
		}
		var yibanButtons=formHandle.yibanButtons.childList;
		if(yibanButtons[0]){
			$("#con2").show();
			for(var n in yibanButtons){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(yibanButtons[n].name).append(img);
				$(div).attr("id",yibanButtons[n].id)
				$(div).attr("funName",yibanButtons[n].funName);
				$(div).attr("description",yibanButtons[n].description);
				$("#con2right .comfirmArea").append(div);
				$(div).width($(div).width()+18);
				$(div).hover(function(){
					$(this).children("div").show();
				},function(){
					$(this).children("div").hide();
				});
			}
			$("#con2").hide();
		}
		if(!formHandle.endButtons){
			formHandle.endButtons=new parent.WFormEndButtons();
			formHandle.endButtons.init();
		}
		var endButtons=formHandle.endButtons.childList;
		if(endButtons[0]){
			$("#con3").show();
			for(var n in endButtons){
				var img=$("<div />").addClass("delImage").hide();
				$(img).bind("click",function(){
					$(".con:visible .comfirmArea > div").has(this).remove();
				});
				var div=$("<div />").text(endButtons[n].name).append(img);
				$(div).attr("id",endButtons[n].id)
				$(div).attr("funName",endButtons[n].funName);
				$(div).attr("description",endButtons[n].description);
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
		
	}
	
	$( ".comfirmArea" ).sortable();
	$( ".comfirmArea" ).disableSelection();

	$("#confirm").bind("click",function(){
		var xinjiantr=$("#con0right .comfirmArea > div").toArray();
		var xinjian=new Array();
		for(var n in xinjiantr){
			var action={};
			action.id=$(xinjiantr[n]).attr("id");
			action.name=$(xinjiantr[n]).text();
			action.funName=$(xinjiantr[n]).attr("funName");
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
			action.funName=$(daibantr[n]).attr("funName");
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
			action.funName=$(yibantr[n]).attr("funName");
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
			action.funName=$(banjietr[n]).attr("funName");
			action.description=$(banjietr[n]).attr("description");
			action.order=n;
			banjie[n]=action;
		}
		var localopt={};
		localopt.xinjian=xinjian;
		localopt.daiban=daiban;
		localopt.yiban=yiban;
		localopt.banjie=banjie;
		localopt.formType=fromParentParam.formType;
		closeDialog(localopt);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	$(".select select").change(function(){/*
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
	*/});
	showBtn(fromParentParam.btnList);
	function showBtn(data){
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
			$("thead").attr("id","theadTop");
		}
		for(var i=0;i<data.length;i++){
			var option=$("<option/>").val(data[i].name).text(data[i].name);
			$(".select select").append(option);
			var btnList=data[i].btnList;
			for(var n in btnList){
				var tr=$("<tr></tr>");
				$(tr).attr("id",btnList[n].buttonId);
				$(tr).attr("buttonFunName",btnList[n].buttonFunName);
				$(tr).append($("<td></td>").css("width","133px").text(btnList[n].buttonName)).append($("<td></td>").css("width","240px").text(btnList[n].buttonDescription));
				var image=$("<td></td>").css("width","91px").append($("<div></div>").addClass("addImage"));
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
		$(div).attr("funName",$(tr).attr("buttonFunName"));
		$(div).attr("description",$(tr).children("td:eq(1)").text());
		$(".con:visible .comfirmArea").append(div);
		$(div).width($(div).width()+18);
		$(div).hover(function(){
			$(this).children("div").show();
		},function(){
			$(this).children("div").hide();
		});
		
	}
	$(".left .table table tbody tr").each(function(){/*
		if($(this).attr("btntype")=="系统默认"){
			$(this).show();
		}else{
			$(this).hide();
		}
	*/});
		
	});