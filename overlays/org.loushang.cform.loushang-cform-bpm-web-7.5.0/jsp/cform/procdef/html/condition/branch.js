var expDic={};
var targetNodeList={};
var dataObjectDic={};
var frontAct={};
var gname="";
var num=0;
var setButton;
$(function($){
	var newDiv = function(nodeId,targetNode){
		var target=targetNode.name;
		var label1=$("<div />").addClass("labelDown");
		var div1=$("<div />").append(label1).append($("<label />").text(gname+"-->"+targetNode.name)).addClass("header");
		var div2=$("<div />").addClass("ruleArea").append($("<ul />").append($("<li />")
				.append($("<input />").attr("type","button").val(L.getLocaleMessage("CForm.BPM.D211","选择表单域")).click(function(){
					var fieldId=$(this).attr("id");
					var fieldName=$(this).val();
					var li=$("ul li").has(this);
					var param={formId:frontAct.formId,fieldId:fieldId,fieldName:fieldName};
					setButton=$(this);
					parent.SD_Dialog.showAreaDiv2(param);
				}))
				.append($("<select></select>")
						.append("<option selected='selected' value='contains'>"+L.getLocaleMessage("CForm.BPM.D212","包含")+"</option>")
						.append("<option value='uncontains'>"+L.getLocaleMessage("CForm.BPM.D213","不包含")+"</option>")
						.append("<option value='matches'>"+L.getLocaleMessage("CForm.BPM.D214","匹配")+"</option>")
						.append("<option value='>'>&gt;</option>")
						.append("<option value='>='>&gt;=</option>")
						.append("<option value='=='>==</option>")
						.append("<option value='<='>&lt;=</option>")
						.append("<option value='<'>&lt;</option>")
						.append("<option value='!='>!=</option>")
						.change(function(){
							var li=$("ul li").has(this);
							var input=$(li).children("input[type='text']");
							var v=$(this).val();
							if(v!='contains' && v!= 'uncontains' && v!='matches'){
								if(!parseInt($(input).val())){
									$(input).val("");
									$(input).focus();
								}
							}
						}))
				.append($("<input />").attr("type","text").val(L.getLocaleMessage("CForm.BPM.D215","输入值")).click(function(){
					if($(this).val()==L.getLocaleMessage("CForm.BPM.D215","输入值")){
						$(this).val("");
					}
				}).keydown(function(e){
					var li=$("ul li").has(this);
					var v=$(li).children("select").val();
					if(v!='contains' && v!= 'uncontains' && v!='matches')
					if((e.keyCode<48  || e.keyCode>57) && e.keyCode!=8){
						return false;
					}
				}).blur(function(){
					if($.trim($(this).val())==""){
						$(this).val(L.getLocaleMessage("CForm.BPM.D215","输入值"));
					}
				}))
				.append($("<select />")
						.append($("<option />").val("&&").text(L.getLocaleMessage("CForm.BPM.D216","与")))
						.append($("<option />").val("||").text(L.getLocaleMessage("CForm.BPM.D217","或")))
						)
				.append($("<div />").addClass("addImg").click(function(){
					//$(this).parent().parent().append(getLi(target));
					//alert("确定");
					var li=$("ul li").has(this);
					if($(li).children("input[type='button']:eq(0)").val()==L.getLocaleMessage("CForm.BPM.D211","选择表单域")){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D218","请选择表单域！"), L.getLocaleMessage("CForm.BPM.D191","提示信息！"), 300);
						return false;
					}
					var rule1=$(li).children("textarea").val();
					var rule="";
					var value=$.trim($(li).children("input[type='text']").val());					
					if(value!=null && value!="" && value!=L.getLocaleMessage("CForm.BPM.D215","输入值")){
						if($(li).children("textarea").val()){
							rule += $(li).children("select:eq(1)").val();
						}
					var scopeType = $(li).children("select:eq(0)").val();
					var itemId=$(li).children("input[type='button']:eq(0)").attr("id");
					if(scopeType=="contains" || scopeType=="uncontains" || scopeType=="matches"){
						if(scopeType=="uncontains"){
							rule +="!"+itemId+".contains"+"(\""+value+"\")";
						}else{
							rule +=itemId+"."+scopeType+"(\""+value+"\")";
						}
					}else{
						var valuePatrn=/^[0-9]*$/;
						if(!valuePatrn.exec(value)){
							showDialog("alert",L.getLocaleMessage("CForm.BPM.D219","值只能为数字！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
							return false;
						}
						rule += "Double.valueOf("+itemId+")"+scopeType+parseInt(value);
						}
						}else{
							showDialog("alert",L.getLocaleMessage("CForm.BPM.D220","请输入值！"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
							$(li).children("input[type='text']").focus();
						}
						if(rule1.indexOf(rule)!=-1){
							return false;
						}
						$(li).children("textarea").val(rule1+rule);
						dataObjectDic[itemId]=itemId;
				}))
				.append($("<br />"))
				.append($("<textarea/>").keydown(function(){
//					return false;
				}))
				));
		$(div1).click(function(){
			$(div2).toggle();
			if($(label1).hasClass("labelUp")){
				$(label1).removeClass("labelUp");
				$(div1).css("font-weight","normal");
			}else{
				$(label1).addClass("labelUp");
				$(div1).css("font-weight","bold");
			}
		});
		var div=$("<div />").append(div1).append(div2).attr("id",nodeId);
		$("#mainDiv").append(div);
	}
	
	var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
	frontAct=fromParentParam.frontAct;
	targetNodeList=fromParentParam.targetNodeList;
	gname=fromParentParam.gname;
	for(var nodeId in targetNodeList) {
			newDiv(nodeId,targetNodeList[nodeId]);
			if(targetNodeList[nodeId].expression){
				$("#"+nodeId+" ul li textarea").val(targetNodeList[nodeId].expression);
			}
	}
	
	
	if(typeof parent.SD_Dialog == "undefined"){
		parent.SD_Dialog={};
	}
	parent.SD_Dialog.showAreaDiv2=function(param){
		var url=parent.CFlow.webPath+"/jsp/cform/procdef/html/form/formarea.jsp";
		parent.SD_Dialog.showWindow1(L.getLocaleMessage("CForm.BPM.D211","选择表单域"), url, 500, 390,param, afterCloseForm1);
		function afterCloseForm1(backData){
			if(backData && backData.id){
				$(setButton).val(backData.name);
				$(setButton).attr("id",backData.id);
			}
		}
	}
	
	
	$('#confirm').click(function(){		
		for(var nodeId in targetNodeList) {
			var li=$("#"+nodeId+" ul li");
			if(!validate($(li).children("textarea").val(), targetNodeList[nodeId].name))
				return false;
			expDic[nodeId]={"language":"JAVA", "expression":$(li).children("textarea").val()};
		}
		var retObj={};
		retObj.expDic=expDic;
		retObj.dataObjectDic=dataObjectDic;
		closeDialog(retObj);
	});
	$("#cancel").bind("click",function(){
		closeDialog(null);
	});
	$(".mainDiv > div .header").trigger("click");
	$(".mainDiv > div:eq(0) .header").css("border-top","none");
	
	function validate(exp, targetName){
		if(exp==null || exp==""){
			return true;
		}
		var numPatrn=/^(Double.valueOf\(){1}[a-zA-Z_][a-zA-Z0-9_]*\)(>|>=|==|<|<=|!=)\d+$/;
		var strPatrn=/^[a-zA-Z_][a-zA-Z0-9_]*\.(contains|matches)\("[a-z0-9A-Z\u4e00-\u9fa5]+"\)$/;
		var exp1=exp.replace("||","&&");
		var exps=exp1.split("&&");
		for(var i=0;i<exps.length;i++){
			var tmpExp=exps[i];
			if("!"==exps[i].substring(0,1)){
				tmpExp=exps[i].substring(1);
			}
			if(!strPatrn.exec(tmpExp) && !numPatrn.exec(tmpExp)){
				showDialog("alert","["+gname+"-->"+targetName+L.getLocaleMessage("CForm.BPM.D221","]的表达式格式不正确！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;
			}
		}
		return true;
	}
});