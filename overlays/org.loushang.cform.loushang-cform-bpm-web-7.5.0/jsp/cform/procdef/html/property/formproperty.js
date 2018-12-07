$(function(){
	if(CFProcess.formId&&CFProcess.formId!='null'){
			$("#procFormName input:text").val(CFProcess.formName);
			$("#procFormName input:text").attr("id",CFProcess.formId);
		
	}
	if(CFProcess.isSetLocal){
		$("#procLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}
	if(CFProcess.isSetDefault){
		var nameInfo="";
		var subject=CFProcess.refSubjectField;
		if(CFProcess.refSubjectJoin){
			var subjects=subject.split("#");
			for(var n in subjects){
				if(n=="")continue;
				nameInfo+=subjects[n].split(":")[1]+CFProcess.refSubjectJoin;
			}
			nameInfo=nameInfo.substring(0,nameInfo.length-CFProcess.refSubjectJoin.length);
		}else{
			nameInfo+=subject.split(":")[1];
		}
		
		$("#procDefaultSubject input:text").val(nameInfo);
		$("#procDefaultSubject input:text").prop("title",nameInfo);
	}
	if(CFProcess.isSetProcSubject){
		if(CFProcess.subjects){
			var subjects=CFProcess.subjects.childList;
			var procDefSujectInfo="";
			var procTypeSujectInfo="";
			for(var n in subjects){
				if(subjects[n].type=="procType"){
					procTypeSujectInfo+=subjects[n].subjectAlias+"-"+subjects[n].fieldName+";";
				}else{
					procDefSujectInfo+=subjects[n].subjectAlias+"-"+subjects[n].fieldName+";";
				}
			}
			procTypeSujectInfo=procTypeSujectInfo.substring(0,procTypeSujectInfo.length-1);
			procDefSujectInfo=procDefSujectInfo.substring(0,procDefSujectInfo.length-1);
			$("#procTypeSubject input:text").val(procTypeSujectInfo);
			$("#procTypeSubject input:text").prop("title",procTypeSujectInfo);
			$("#procDefSubject input:text").val(procDefSujectInfo);
			$("#procDefSubject input:text").prop("title",procDefSujectInfo);
		}
	}
	CFProcess.isSetProcSubject=true;
	function switchprocTab(ProTag, ProBox) {
		$("#divProcessFormPropertyBody #"+ProTag+" a").addClass("on");
		$("#divProcessFormPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
		$("#divProcessFormPropertyBody #"+ProBox).show();
		$("#divProcessFormPropertyBody .procCon:not('#"+ProBox+"')").hide();
	}

	$("#procTab1 a").bind("click",function(){
		switchprocTab("procTab1","procCon1");
		this.blur();
		return false;
	});
	$("#procTab2 a").bind("click",function(){
		switchprocTab("procTab2","procCon2");
		this.blur();
		return false;
	});
	
	$("#divProcessformPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divProcessformPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	
	$("#procFormName input:button").bind("click",function(){
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/getPCForm",
			data:{
				"formName":"",
				"page":0,
				"per":1
			},
			dataType:"json",
			async:false,
			success:function (data){
				if(data.errMessage){
					showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 400);
				}else{
					if(data.pageCount>0){
						var url=CFlow.webPath+"/jsp/cform/procdef/html/form/showForm.jsp";
						var param={formType:"PCForm"};
						showWindow(L.getLocaleMessage("CForm.BPM.D194","选择表单"), url, 500, 455,param, afterCloseForm);
					}else{
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D195","未查询到表单，请先定义表单"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 400);
					}
					
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	});
	
	function afterCloseForm(backData){
		var act=new Array();
		var actleng=0;
		var index=0;
		if(backData&&backData.formId){
			$("#procFormName input:text").val(backData.formName);
			$("#procFormName input:text").attr("id",backData.formId);
			CFProcess.formId=backData.formId;
			CFProcess.formName=backData.formName;
			CFProcess.isSet=true;
			var activities=CFProcess.activities.childList;
			for(var n in activities){
				var activity=activities[n];
				if(!activity.isSetForm){
					activity.formId=backData.formId;
					activity.formName=backData.formName;
					activity.isSetForm=true;
				}else{
					if(activity.formId!=backData.formId){
						act.push(activity);
//					showConfirm("是否将变化同步到"+activity.name+"?", changeForm, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300, false);
					
					}
				}	
			}
			actleng=act.length;
			dealAct();
		}
		
		function dealAct(){
			if(index==actleng)
				return false;
			showConfirm(L.getLocaleMessage("CForm.BPM.D196","是否将变化同步到")+act[index].name+"?", confirmclick, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300, false,cancelclick);
		}
		function confirmclick(){
			act[index].formName=backData.formName;
			act[index].formId=backData.formId;
			act[index].form=null;
			act[index].isSetForm=true;
			act[index].isSetAuth=false;
			index++;
			dealAct();
		}
		function cancelclick(){
			index++;
			dealAct();
		}
		
	}
	$("#procLocalOpt input:button").bind("click",function(){
		if(!$("#procFormName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$("#procTab1 a").trigger("click");
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/localopt.jsp";
		var param={"show":false,"CFProcess":CFProcess};
		showWindow(L.getLocaleMessage("CForm.BPM.D198","选择操作"), url, 550, 500,param, afterCloseLocalOpt);
	});
	
	function afterCloseLocalOpt(ret){
		if(ret){
			var txtDaiban="";
			var txtYiban="";
			var txtBanjie="";
			var addDaiban={};
			var addYiban={};
			var addBanjie={};
			var delDaiban={};
			var delYiban={};
			var delBanjie={};
			if(CFProcess.buttons){
				var btnList=CFProcess.buttons.childList;
				for(var n in btnList){
					delDaiban[btnList[n].id]=btnList[n];
				}
			}
			if(CFProcess.yibanButtons){
				var btnList=CFProcess.yibanButtons.childList;
				for(var n in btnList){
					delYiban[btnList[n].id]=btnList[n];
				}
			}
			if(CFProcess.endButtons){
				var btnList=CFProcess.endButtons.childList;
				for(var n in btnList){
					delBanjie[btnList[n].id]=btnList[n];
				}
			}
			
			var daiban=ret.daiban;
			CFProcess.actions.childList={};
			for(var n in daiban){
				var action=new CFAction();
				action.id=daiban[n].id;
				action.name=daiban[n].name;
				action.description=daiban[n].description;
				action.order=daiban[n].order;
				CFProcess.actions.childList[n]=action;
				txtDaiban+=action.name+";";
				if(delDaiban[daiban[n].id]){
					delete delDaiban[daiban[n].id];
				}else{
					addDaiban[daiban[n].id]=daiban[n];
				}
			}
			var yiban=ret.yiban;
			CFProcess.yiBanActions.childList={};
			for(var n in yiban){
				var action=new CFAction();
				action.id=yiban[n].id;
				action.name=yiban[n].name;
				action.description=yiban[n].description;
				action.order=yiban[n].order;
				CFProcess.yiBanActions.childList[n]=action;
				txtYiban+=action.name+";";
				if(delYiban[yiban[n].id]){
					delete delYiban[yiban[n].id];
				}else{
					addYiban[yiban[n].id]=yiban[n];
				}
			}
			var banjie=ret.banjie;
			CFProcess.endActions.childList={};
			for(var n in banjie){
				var action=new CFAction();
				action.id=banjie[n].id;
				action.name=banjie[n].name;
				action.description=banjie[n].description;
				action.order=banjie[n].order;
				CFProcess.endActions.childList[n]=action;
				txtBanjie+=action.name+";";
				if(delBanjie[banjie[n].id]){
					delete delBanjie[banjie[n].id];
				}else{
					addBanjie[banjie[n].id]=banjie[n];
				}
			}
			if(daiban[0] || yiban[0] || banjie[0]){
				CFProcess.isSetLocal=true;
				$("#procLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
			}else{
				CFProcess.isSetLocal=false;
				$("#procLocalOpt input:text").val("");
			}
			/////同步环节
			
			var afterSyn=function (backdata){
				var activities=CFProcess.activities.childList;
				for(var n in backdata){
					var bd=backdata[n];
					var activity=activities[bd.id];
					if(bd.daibansyn){
						if(!activity.actions){
							activity.actions=new CFActions();
							activity.actions.init();
						}
						var actBtns={};
						var tmpBtns=activity.actions.childList;
						for(var m in tmpBtns){
							actBtns[tmpBtns[m].id]=tmpBtns[m];
						}
						for(var key1 in addDaiban){
							actBtns[key1]=addDaiban[key1];
						}
						for(var key2 in delDaiban){
							delete actBtns[key2];
						}
						var num=0;
						for(var key in actBtns){
							var action=new CFAction();
							action.id=actBtns[key].id;
							action.name=actBtns[key].name;
							action.description=actBtns[key].description;
							action.order=actBtns[key].order;
							activity.actions.childList[num++]=action;
							activity.isSetLocal=true;
						}
					}
					if(bd.yibansyn){
						if(!activity.yiBanActions){
							activity.yiBanActions=new CFYiBanActions();
							activity.yiBanActions.init();
						}
						var actBtns={};
						var tmpBtns=activity.yiBanActions.childList;
						for(var m in tmpBtns){
							actBtns[tmpBtns[m].id]=tmpBtns[m];
						}
						for(var key1 in addYiban){
							actBtns[key1]=addYiban[key1];
						}
						for(var key2 in delYiban){
							delete actBtns[key2];
						}
						var num=0;
						for(var key in actBtns){
							var action=new CFAction();
							action.id=actBtns[key].id;
							action.name=actBtns[key].name;
							action.description=actBtns[key].description;
							action.order=actBtns[key].order;
							activity.yiBanActions.childList[num++]=action;
							activity.isSetLocal=true;
						}
					}
					if(bd.endsyn){
						if(!activity.endActions){
							activity.endActions=new CFEndActions();
							activity.endActions.init();
						}
						var actBtns={};
						var tmpBtns=activity.endActions.childList;
						for(var m in tmpBtns){
							actBtns[tmpBtns[m].id]=tmpBtns[m];
						}
						for(var key1 in addBanjie){
							actBtns[key1]=addBanjie[key1];
						}
						for(var key2 in delBanjie){
							delete actBtns[key2];
						}
						var num=0;
						for(var key in actBtns){
							var action=new CFAction();
							action.id=actBtns[key].id;
							action.name=actBtns[key].name;
							action.description=actBtns[key].description;
							action.order=actBtns[key].order;
							activity.endActions.childList[num++]=action;
							activity.isSetLocal=true;
						}
					}
				}
			};
			var url=CFlow.webPath+"/jsp/cform/procdef/html/form/actsyn.jsp";
			var param={activities:CFProcess.activities.childList, procDaiban:txtDaiban, procYiBan:txtYiban, procBanjie:txtBanjie};
			var flag=false;
			for(var n in CFProcess.activities.childList){
				flag=true;break;
			}
			if(flag)
				showWindow(L.getLocaleMessage("CForm.BPM.D199","选择同步环节"), url,  650, 500,param, afterSyn);
		}
	}
	//流程默认标题设置
	$("#procDefaultSubject input:button").click(function(){
		if(!$("#procFormName input:text").attr("id")){
			switchprocTab("procTab1","procCon1");
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/formarea.jsp";
		var param={
			isdefault:true,
			formId:$("#procFormName input:text").attr("id"),
			refSubjectJoin:CFProcess.refSubjectJoin,
			refSubjectField:CFProcess.refSubjectField
			};
		showWindow1(L.getLocaleMessage("CForm.BPM.D204","选择流程默认标题"), url, 500, 505,param, acProcDefaultSubject);
		function acProcDefaultSubject(backdata){
			if(backdata){
				if(backdata.id){
					WFlow.setDataObject("WF_PROC_SUBJECT");
					CFProcess.refSubjectField=backdata.id;
					CFProcess.refSubjectJoin=backdata.refSubjectJoin;
					CFProcess.processSubject="WF_PROC_SUBJECT";
					$("#procDefaultSubject input:text").val(backdata.nameInfo);
					$("#procDefaultSubject input:text").prop("title",backdata.nameInfo);
					CFProcess.isSetDefault=true;
				}else{
					//WFlow.setProcessSubject("");
					CFProcess.refSubjectField="";
					CFProcess.refSubjectJoin="";
					CFProcess.processSubject="";
					$("#procDefaultSubject input:text").val("");
					CFProcess.isSetDefault=false;
				}
				
			}
		}
		
	});
	//流程类型标题设置
	$("#procTypeSubject input:button").click(function(){
		if(!$("#procFormName input:text").attr("id")){
			switchprocTab("procTab1","procCon1");
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		
		$.ajax({
			type : "POST",
			url : WFlow.fullWebPath
					+ "/command/dispatcher/"
					+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/"
					+ "getProcTypeSubjectDefList",
			data : {
				"procType" : CFlow.getProcType()
			},
			dataType : "json",
			async : false,
			success : function(data) {
				var oldSubjects={};
				if(data.length==0){
					showDialog("alert","请先设置流程类型标题", L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					return false;
				}else{
					var url=CFlow.webPath+"/jsp/cform/procdef/html/subject/proctypesubject.jsp";
					var subjects=new Array();
					if(CFProcess.subjects){
						var subs=CFProcess.subjects.childList;
						for(var n in subs){
							var obj=new Object();
							if(subs[n].type!="procType") continue;
							obj.type=subs[n].type;
							obj.fieldId=subs[n].fieldId;
							obj.fieldName=subs[n].fieldName;
							obj.subjectKey=subs[n].subjectKey;
							obj.subjectAlias=subs[n].subjectAlias;
							subjects.push(obj);
							oldSubjects[obj.fieldId+"#"+obj.subjectKey]=obj;
						}
					}
					var param={
						formId:$("#procFormName input:text").attr("id"),
						subjects:subjects,
						data:data
						};
					showWindow(L.getLocaleMessage("CForm.BPM.D201","选择流程类型标题"), url, 500, 375,param, acProcTypeSubject);
				}
				function acProcTypeSubject(backdata){
					if(backdata){
						if(backdata[0]){
							if(!CFProcess.subjects){
								CFProcess.subjects=new CFSubjects();
								CFProcess.subjects.init();
							}
							var childList=CFProcess.subjects.childList;
							for(var m in childList){
								if(childList[m].type=="procType") delete childList[m];
							}
							var addList={};
							for(var n in backdata){
								if(n=="nameInfo"){
									$("#procTypeSubject input:text").val(backdata["nameInfo"]);
									$("#procTypeSubject input:text").prop("title",backdata["nameInfo"]);
									continue;
								}
								var subject=new CFSubject();
								subject.type="procType";
								subject.fieldId=backdata[n].fieldId;
								subject.fieldName=backdata[n].fieldName;
								subject.subjectKey=backdata[n].subjectKey;
								subject.subjectAlias=backdata[n].subjectAlias;
								CFProcess.subjects.childList[subject.type+"#"+subject.subjectKey]=subject;
								if(oldSubjects[subject.fieldId+"#"+subject.subjectKey]){
									delete oldSubjects[subject.fieldId+"#"+subject.subjectKey];
								}else{
									addList[subject.fieldId+"#"+subject.subjectKey]=subject;
								}
							}
						}else{
							if(!CFProcess.subjects){
								CFProcess.subjects=new CFSubjects();
								CFProcess.subjects.init();
							}
							var childList=CFProcess.subjects.childList;
							for(var m in childList){
								if(childList[m].type=="procType") delete childList[m];
							}
							$("#procTypeSubject input:text").val("");
						}
						delete backdata["nameInfo"];
						dealWithSynAct(addList, oldSubjects, "procType", backdata);
					}
				}
			},
			error : function() {
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});			

		
	});
	//流程定义标题设置
	$("#procDefSubject input:button").click(function(){
		if(!$("#procFormName input:text").attr("id")){
			switchprocTab("procTab1","procCon1");
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/subject/subjectdef.jsp";
		var subjects=new Array();
		var oldSubjects={};
		if(CFProcess.subjects){
			var subs=CFProcess.subjects.childList;
			for(var n in subs){
				var obj=new Object();
				if(subs[n].type!="proc") continue;
				obj.type=subs[n].type;
				obj.fieldId=subs[n].fieldId;
				obj.fieldName=subs[n].fieldName;
				obj.subjectKey=subs[n].subjectKey;
				obj.subjectAlias=subs[n].subjectAlias;
				subjects.push(obj);
				oldSubjects[obj.fieldId+"#"+obj.subjectKey]=obj;
			}
		}

		var defs=new Array();
		if(CFProcess.procSubjectDefs){
			var procdefs=CFProcess.procSubjectDefs.childList;
			if(CFProcess.procSubjectQueryDefs)
				var procques=CFProcess.procSubjectQueryDefs.childList;
			else
				var procques={};
			for(var n in procdefs){
				var obj=new Object();
				obj.subjectKey=procdefs[n].subjectKey;
				obj.subjectAlias=procdefs[n].subjectAlias;
				obj.subjectWidth=procdefs[n].subjectWidth;
				obj.subjectOrder=procdefs[n].subjectOrder;
				obj.isQueryCondition=procdefs[n].isQueryCondition;
				if(procques[obj.subjectKey]!=null){
					obj.subjectOrder2=procques[obj.subjectKey].subjectOrder;
				}else{
					obj.subjectOrder2="";
				}
				defs.push(obj);
			}
		}
		var param={
			isShow:true,
			formId:$("#procFormName input:text").attr("id"),
			refSubjectJoin:CFProcess.refSubjectJoin,
			refSubjectField:CFProcess.refSubjectField,
			procType:CFlow.getProcType(),
			subjects:subjects,
			defs:defs
		};
		showWindow(L.getLocaleMessage("CForm.BPM.D200","选择流程定义标题"), url, 600, 450,param, acProcDefSubject);
		function acProcDefSubject(backdata){
			if(backdata){
				if(backdata.retArr[0]){
					if(!CFProcess.subjects){
						CFProcess.subjects=new CFSubjects();
						CFProcess.subjects.init();
					}
					var childList=CFProcess.subjects.childList;
					for(var m in childList){
						if(childList[m].type=="proc") delete childList[m];
					}
					var addList={};
					for(var n in backdata.retArr){
						var subject=new CFSubject();
						subject.type="proc";
						subject.fieldId=backdata.retArr[n].fieldId;
						subject.fieldName=backdata.retArr[n].fieldName;
						subject.subjectKey=backdata.retArr[n].subjectKey;
						subject.subjectAlias=backdata.retArr[n].subjectAlias;
						CFProcess.subjects.childList[subject.type+"#"+subject.subjectKey]=subject;
						if(oldSubjects[subject.fieldId+"#"+subject.subjectKey]){
							delete oldSubjects[subject.fieldId+"#"+subject.subjectKey];
						}else{
							addList[subject.fieldId+"#"+subject.subjectKey]=subject;
						}
					}
					$("#procDefSubject input:text").val(backdata.nameInfo);
					$("#procDefSubject input:text").prop("title",backdata.nameInfo);
				}else{
					if(!CFProcess.subjects){
						CFProcess.subjects=new CFSubjects();
						CFProcess.subjects.init();
					}
					var childList=CFProcess.subjects.childList;
					for(var m in childList){
						if(childList[m].type=="proc") delete childList[m];
					}
					$("#procDefSubject input:text").val("");
				}
				dealWithSynAct(addList, oldSubjects, "proc", backdata.retArr);
				if(backdata.retArr2){
					if(!CFProcess.procSubjectDefs){
						CFProcess.procSubjectDefs=new CFProcSubjectDefs();
						CFProcess.procSubjectDefs.init();
					}
					CFProcess.procSubjectDefs.childList={};
					for(var n in backdata.retArr2){
						var subjectDef=new CFProcSubjectDef();
						subjectDef.subjectKey=backdata.retArr2[n].subjectKey;
						subjectDef.subjectAlias=backdata.retArr2[n].subjectAlias;
						subjectDef.subjectWidth=backdata.retArr2[n].subjectWidth;
						subjectDef.subjectOrder=backdata.retArr2[n].subjectOrder;
						subjectDef.isQueryCondition=backdata.retArr2[n].isQueryCondition;
						CFProcess.procSubjectDefs.childList[subjectDef.subjectKey]=subjectDef;
					}
				}
				
				if(backdata.retArr3){
					if(!CFProcess.procSubjectQueryDefs){
						CFProcess.procSubjectQueryDefs=new CFProcSubjectQueryDefs();
						CFProcess.procSubjectQueryDefs.init();
					}
					CFProcess.procSubjectQueryDefs.childList={};
					for(var n in backdata.retArr3){
						var subjectQueryDef =new CFProcSubjectQueryDef();
						subjectQueryDef.index=backdata.retArr3[n].index;
						subjectQueryDef.subjectKey=backdata.retArr3[n].subjectKey;
						subjectQueryDef.subjectAlias=backdata.retArr3[n].subjectAlias;
						subjectQueryDef.subjectOrder=backdata.retArr3[n].subjectOrder;
						subjectQueryDef.subjectFieldType=backdata.retArr3[n].subjectFieldType;
						CFProcess.procSubjectQueryDefs.childList[subjectQueryDef.subjectKey]=subjectQueryDef;
					}
				}
				
				
			}
		}
	});
	if(CFlow.getProcType()){
		$("#procTypeSubject").show();
	}else{
		$("#procTypeSubject").hide();
	}
	
	function dealWithSynAct(addList, oldSubjects, type, subjectData ){
		var flag=false;
		for(var key3 in addList){
			flag=true;
		}
		for(var key4 in oldSubjects){
			flag=true;
		}
		if(flag){
			var url=CFlow.webPath+"/jsp/cform/procdef/html/form/actsubjectsyn.jsp";
			var param={activities:CFProcess.activities.childList, type:type, subjectData:subjectData};
			var afterSubjectSyn=function (actIds){
				var activities=CFProcess.activities.childList;
				for(var n in actIds){
					var activity=activities[actIds[n]];
					if(activity.subjects){}else{
						activity.subjects=new CFSubjects();
						activity.subjects.init();
					}
					for(var key2 in oldSubjects){
						delete activity.subjects.childList[type+"#"+oldSubjects[key2].subjectKey];
					}
					for(var i in addList){
						var subject=new CFSubject();
						subject.type=type;
						subject.fieldId=addList[i].fieldId;
						subject.fieldName=addList[i].fieldName;
						subject.subjectKey=addList[i].subjectKey;
						subject.subjectAlias=addList[i].subjectAlias;
						activity.subjects.childList[subject.type+"#"+subject.subjectKey]=subject;
					}
				}
			};
			showWindow(L.getLocaleMessage("CForm.BPM.D199","选择同步环节"), url, 570, 475,param, afterSubjectSyn);
		}
	}
});