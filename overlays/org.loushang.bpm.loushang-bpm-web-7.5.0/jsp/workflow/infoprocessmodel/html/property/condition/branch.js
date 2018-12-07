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
				.append($("<input />").attr("type","text").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","输入相关数据")).click(function(){
					if($(this).val()==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","输入相关数据")){
						$(this).val("");
					}
				})
				.focus(function() {
					this.style.imeMode='disabled';
				})
				.blur(function(){
					if($.trim($(this).val())==""){
						$(this).val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","输入相关数据"));
					}
				}))
				.append($("<select></select>")
						.append("<option selected='selected' value='contains'>"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D005","包含")+"</option>")
						.append("<option value='uncontains'>"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D006","不包含")+"</option>")
						.append("<option value='matches'>"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D007","匹配")+"</option>")
						.append("<option value='>'>&gt;</option>")
						.append("<option value='>='>&gt;=</option>")
						.append("<option value='=='>==</option>")
						.append("<option value='<='>&lt;=</option>")
						.append("<option value='<'>&lt;</option>")
						.append("<option value='!='>!=</option>")
				)
				.append($("<input />").attr("type","text").val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D008","输入值")).click(function(){
					if($(this).val()==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D008","输入值")){
						$(this).val("");
					}
				}).keydown(function(e){
					var li=$("ul li").has(this);
					var v=$(li).children("select").val();
					if(v!='contains' && v!= 'uncontains' && v!='matches'){
						if (/msie/.test(navigator.userAgent.toLowerCase())) {
							if ( ((event.keyCode > 47) && (event.keyCode < 58)) || (event.keyCode == 8) ) {
								return true; 
							} else {
								return false;
							}
						} else {
							if ( ((e.which > 47) && (e.which < 58)) || (e.which == 8) || (e.keyCode == 17) ) {
								return true;
							} else {
								return false;
							}
						}
					}				}).blur(function(){
					if($.trim($(this).val())==""){
						$(this).val(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D008","输入值"));
					}
				}))
				.append($("<select />")
						.append($("<option />").val("&&").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D009","与")))
						.append($("<option />").val("||").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.D010","或")))
						)
				.append($("<div />").addClass("addImg").click(function(){
					var li=$("ul li").has(this);
					var dataValue=$.trim($(li).children("input[type='text']:eq(0)").val());
					if(dataValue==null && dataValue=="" || dataValue==L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","输入相关数据")){
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","输入相关数据"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
						return false;
					}
					var dfPatrn=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
					if(!dfPatrn.exec(dataValue)){
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D004","相关数据必须以英文字母、_或$开头，且遵循java变量命名规范！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
						return false;
					}
					var rule1=$(li).children("textarea").val();
					var rule="";
					var tmpRule="";
					var value=$.trim($(li).children("input[type='text']:eq(1)").val());					
					if(value!=null && value!="" && value!=L.getLocaleMessage("BPM.INFOPROCESSMODEL.D008","输入值")){
						if($(li).children("textarea").val()){
							rule += $(li).children("select:eq(1)").val();
						}
						var scopeType = $(li).children("select:eq(0)").val();
						if(scopeType=="contains" || scopeType=="uncontains" || scopeType=="matches"){
							if(scopeType=="uncontains"){
								rule +="!"+dataValue+".contains"+"(\""+value+"\")";
								tmpRule+="!"+dataValue+".contains"+"(\""+value+"\")";
							}else{
								rule +=dataValue+"."+scopeType+"(\""+value+"\")";
								tmpRule +=dataValue+"."+scopeType+"(\""+value+"\")";
							}
						}else{
							var valuePatrn=/^[0-9]*$/;
							if(!valuePatrn.exec(value)){
								showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D013","值只能为数字！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
								return false;
							}
							rule += "Double.valueOf("+dataValue+")"+scopeType+parseInt(value);
							tmpRule += "Double.valueOf("+dataValue+")"+scopeType+parseInt(value);
						}
					}else{
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.D014","请输入值！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
						$(li).children("input[type='text']").focus();
					}
					if(rule1.indexOf(tmpRule)!=-1){
						return false;
					}
					$(li).children("textarea").val(rule1+rule);
				}))
				.append($("<br />"))
				.append($("<textarea/>").keydown(function(){
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
	gname=frontAct.name;
	for(var nodeId in targetNodeList) {
			newDiv(nodeId,targetNodeList[nodeId]);
			if(targetNodeList[nodeId].expression){
				$("#"+nodeId+" ul li textarea").val(targetNodeList[nodeId].expression);
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
			var dataValue="";
			if(strPatrn.exec(tmpExp)){
				dataValue=tmpExp.substring(0,tmpExp.indexOf("."));
				dataObjectDic[dataValue]=dataValue;
			}else if(numPatrn.exec(tmpExp)){
				dataValue=tmpExp.substring(tmpExp.indexOf("(")+1,tmpExp.indexOf(")"));
				dataObjectDic[dataValue]=dataValue;
			}else{
				showDialog("alert","["+gname+"-->"+targetName+"]"+L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.D011","提示信息"), 300);
				return false;
			}
		}
		return true;
	}
});