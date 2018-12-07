var targetNodeList=null;
$(function(){
	$("#divActivityformPropertyHead .shrinkDiv").addClass("shrinkUp");
	$("#divActivityformPropertyHead").bind("click", function() {
		$(this).next().toggle();
		if($(this).next().is(":hidden")){
			$(this).children(".shrinkDiv").removeClass("shrinkUp").addClass("shrinkDown");
		}else{
			$(this).children(".shrinkDiv").removeClass("shrinkDown").addClass("shrinkUp");
		}
	});
	$("#formName input:button").bind("click",function(){
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
		if(backData&&backData.formId){
			$("#formName input:text").val(backData.formName);
			$("#formName input:text").attr("id",backData.formId);
			setForm(backData);
		}
	}
	function setForm(form){
		var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
		if(activity.formId!=form.formId){
		activity.formId=form.formId;
		activity.formName=form.formName;
		activity.form=null;
		activity.isSetForm=true;
		activity.isSetAuth=false;
		$("#formAuth input:text").val("");
		}
	}
	$("#actBranchCondi input:button").bind("click",function(){
		var url=CFlow.webPath+"/jsp/cform/procdef/html/condition/branch.jsp";
		var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
		if(activity.formId){
		}else{
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D245","请先为分支环节设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;	
		}
		if(targetNodeList==null){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D246","没有找到目标环节！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}else{
			var f=0;
			for(var n in targetNodeList){
				f++;
			}
			if(f==1){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D247","仅存在一个目标环节，无需设置分支条件！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				return false;
			}
		}
		var param={gname:activity.name,frontAct:activity, targetNodeList:targetNodeList};
		showWindow(L.getLocaleMessage("CForm.BPM.D210","设置分支条件"), url, 600, 425,param, afterActBranchCloseForm);
	});
	
	function afterActBranchCloseForm(result){
		var flag=false;
		if(result!=null){
			//将分支条件保存到BPM端
			WFlow.setSeqCondition(CFlow.getSelectedId(), result.expDic, result.dataObjectDic);
			//更新模型信息之后，重新获取
			CFlow.initCFormActData();
		}
	}
	
	$("#localOpt input:button").bind("click",function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/localopt.jsp";
		var param={"show":true,"localOpts":CFProcess.activities.childList[CFlow.getSelectedId()]};
		showWindow(L.getLocaleMessage("CForm.BPM.D198","选择操作"), url, 550, 500,param, afterCloseLocalOpt);
	});
	
	function afterCloseLocalOpt(ret){
		var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
		if(ret){
			var xinjian=ret.xinjian;
			activity.newActions.childList={};
			for(var n in xinjian){
				var action=new CFAction();
				action.id=xinjian[n].id;
				action.name=xinjian[n].name;
				action.description=xinjian[n].description;
				action.order=xinjian[n].order;
				activity.newActions.childList[n]=action;
			}
			var daiban=ret.daiban;
			activity.actions.childList={};
			for(var n in daiban){
				var action=new CFAction();
				action.id=daiban[n].id;
				action.name=daiban[n].name;
				action.description=daiban[n].description;
				action.order=daiban[n].order;
				activity.actions.childList[n]=action;
			}
			var yiban=ret.yiban;
			activity.yiBanActions.childList={};
			for(var n in yiban){
				var action=new CFAction();
				action.id=yiban[n].id;
				action.name=yiban[n].name;
				action.description=yiban[n].description;
				action.order=yiban[n].order;
				activity.yiBanActions.childList[n]=action;
			}
			var banjie=ret.banjie;
			activity.endActions.childList={};
			for(var n in banjie){
				var action=new CFAction();
				action.id=banjie[n].id;
				action.name=banjie[n].name;
				action.description=banjie[n].description;
				action.order=banjie[n].order;
				activity.endActions.childList[n]=action;
			}
			if(xinjian[0] || daiban[0] || yiban[0] || banjie[0]){
				activity.isSetLocal=true;
				$("#localOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
			}else{
				activity.isSetLocal=false;
				$("#localOpt input:text").val("");
			}
		}
	}
	
	$("#formAuth input:button").bind("click",function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D197","请先设置表单"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/formauth.jsp";
		var param = {"activity" : CFProcess.activities.childList[CFlow.getSelectedId()]};
		// 打开子页面
		showWindow(L.getLocaleMessage("CForm.BPM.D248","设置域权限"), url, 700, 490,param, afterCloseFormAuth);
		// 子页面传给父页面的内容
		function afterCloseFormAuth(backData) {
//		    alert(backData);
			if(backData && backData.fields){
				var flag=false;
				for(var n in backData.fields){
					var field=backData.fields[n];
					if(field.isHidden || field.isReadOnly || field.isNotNull ||field.isInitialize){
						flag=true;
						break;
					}
				}
				if(flag){
					var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
					activity.isSetAuth=true;
					$("#formAuth input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
				}else{
					var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
					var areas=backData.subforms;
					for(var n in areas){
						if(areas[n].isHidden){
							flag=true;
							break;
						}
					}
					
					if(flag){
						activity.isSetAuth=true;
						$("#formAuth input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
					}else{
						activity.isSetAuth=false;
						activity.form=null;
						$("#formAuth input:text").val("");
					}
					
				}
			}
		}
	});

	//初始化手机表单选项
	$("#mobileFormName input:button").click(function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D249","请先设置PC表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$("#tab1 a").trigger("click");
			return false;
		}
		
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/getMobileForm",
			data:{
				"formName":"",
				"pcFormId":$("#formName input:text").attr("id")
			},
			dataType:"json",
			async:false,
			success:function (data){
					if(data[0]){
						var url=CFlow.webPath+"/jsp/cform/procdef/html/form/showForm.jsp";
						var param={formType:"MobileForm",formId:$("#formName input:text").attr("id")};
						// 打开子页面
						showWindow(L.getLocaleMessage("CForm.BPM.D250","选择手机表单"), url, 500, 455,param, afterCloseMobileForm);
					}else{
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D251","未查询到手机表单，请先定义手机表单"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 400);
					}
				
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
		
		function afterCloseMobileForm(backData){
			if(backData&&backData.formId){
				$("#mobileFormName input:text").val(backData.formName);
				$("#mobileFormName input:text").attr("id",backData.formId);
				if(!CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm){
					CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm=new CFMobileForm();
					CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm.init();
				}
				var mobileForm=CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm;
				if(mobileForm.id!=backData.formId){
				mobileForm.id=backData.formId;
				mobileForm.name=backData.formName;
				mobileForm.isSetForm=true;
				mobileForm.isSetAuth=false;
				$("#mobileFormAuth input:text").val("");
			}
			}
		}
	});
	//手机表单本地操作
	$("#mobileLocalOpt input:button").bind("click",function(){
		if(!$("#mobileFormName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D252","请先设置手机表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/localopt.jsp";
		var param={"show":true,"localOpts":CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm};
		showWindow(L.getLocaleMessage("CForm.BPM.D198","选择操作"), url, 550, 520,param, afterCloseMobileLocalOpt);
		function afterCloseMobileLocalOpt(ret){
			var mobileForm=CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm;
			if(ret){
				var xinjian=ret.xinjian;
				mobileForm.newActions.childList={};
				for(var n in xinjian){
					var action=new CFAction();
					action.id=xinjian[n].id;
					action.name=xinjian[n].name;
					action.description=xinjian[n].description;
					action.order=xinjian[n].order;
					mobileForm.newActions.childList[n]=action;
				}
				var daiban=ret.daiban;
				mobileForm.actions.childList={};
				for(var n in daiban){
					var action=new CFAction();
					action.id=daiban[n].id;
					action.name=daiban[n].name;
					action.description=daiban[n].description;
					action.order=daiban[n].order;
					mobileForm.actions.childList[n]=action;
				}
				var yiban=ret.yiban;
				mobileForm.yiBanActions.childList={};
				for(var n in yiban){
					var action=new CFAction();
					action.id=yiban[n].id;
					action.name=yiban[n].name;
					action.description=yiban[n].description;
					action.order=yiban[n].order;
					mobileForm.yiBanActions.childList[n]=action;
				}
				var banjie=ret.banjie;
				mobileForm.endActions.childList={};
				for(var n in banjie){
					var action=new CFAction();
					action.id=banjie[n].id;
					action.name=banjie[n].name;
					action.description=banjie[n].description;
					action.order=banjie[n].order;
					mobileForm.endActions.childList[n]=action;
				}
				if(xinjian[0] || daiban[0] || yiban[0] || banjie[0]){
					mobileForm.isSetLocal=true;
					$("#mobileLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
				}else{
					mobileForm.isSetLocal=false;
					$("#mobileLocalOpt input:text").val("");
				}
				
			}
		}
	});
	
	//手机表单域权限设置
	$("#mobileFormAuth input:button").bind("click",function(){
		if(!$("#mobileFormName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D252","请先设置手机表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/mobileformauth.jsp";
		var param = {"mobileForm" : CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm};
		// 打开子页面
		showWindow(L.getLocaleMessage("CForm.BPM.D248","设置域权限"), url, 700, 490,param, afterCloseFormAuth);
		// 子页面传给父页面的内容
		function afterCloseFormAuth(backData) {
//		    alert(backData);
			if(backData){
				var flag=false;
				for(var n in backData){
					var field=backData[n];
					if(field.isHidden || field.isReadOnly || field.isNotNull ||field.isInitialize){
						flag=true;
						break;
					}
				}
				if(flag){
					var mobileForm=CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm;
					mobileForm.form.id=mobileForm.id;
					mobileForm.form.name=mobileForm.name;
					CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm.isSetAuth=true;
					$("#mobileFormAuth input:text").val(L.getLocaleMessage("CForm.BPM.D191","已设置"));
				}else{
					CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm.form=null;
					CFProcess.activities.childList[CFlow.getSelectedId()].mobileForm.isSetAuth=false;
					$("#mobileFormAuth input:text").val("");
				}
				
			}
		}
	});
	
	
	//pad表单设置
	//初始化pad表单选项
	$("#padFormName input:button").click(function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D249","请先设置PC表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$("#tab1 a").trigger("click");
			return false;
		}
		
		$.ajax({
			type:"POST",
			url: WFlow.fullWebPath + "/command/dispatcher/"
			+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/getPadForm",
			data:{
				"formName":"",
				"pcFormId":$("#formName input:text").attr("id")
			},
			dataType:"json",
			async:false,
			success:function (data){
					if(data[0]){
						var url=CFlow.webPath+"/jsp/cform/procdef/html/form/showForm.jsp";
						var param={formType:"PadForm",formId:$("#formName input:text").attr("id")};
						// 打开子页面
						showWindow(L.getLocaleMessage("CForm.BPM.D253","选择pad表单"), url, 500, 455,param, afterClosePadForm);
						
					}else{
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D254","未查询到Pad表单，请先定义Pad表单"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 400);
					}
				
			},
			error:function(){
				showDialog("alert", L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
		
		function afterClosePadForm(backData){
			if(backData&&backData.formId){
				$("#padFormName input:text").val(backData.formName);
				$("#padFormName input:text").attr("id",backData.formId);
				if(!CFProcess.activities.childList[CFlow.getSelectedId()].padForm){
					CFProcess.activities.childList[CFlow.getSelectedId()].padForm=new CFPadForm();
					CFProcess.activities.childList[CFlow.getSelectedId()].padForm.init();
				}
				var padForm=CFProcess.activities.childList[CFlow.getSelectedId()].padForm;
				if(padForm.id!=backData.formId){
					padForm.id=backData.formId;
					padForm.name=backData.formName;
					padForm.isSetForm=true;
					padForm.isSetAuth=false;
					$("#padFormAuth input:text").val("");
			}
			}
		}
	});
	//pad表单本地操作
	$("#padLocalOpt input:button").bind("click",function(){
		if(!$("#padFormName input:text").attr("id")){
			showDialog("alert", L.getLocaleMessage("CForm.BPM.D255","请先设置pad表单！"),  L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/localopt.jsp";
		var param={"show":true,"localOpts":CFProcess.activities.childList[CFlow.getSelectedId()].padForm};
		showWindow(L.getLocaleMessage("CForm.BPM.D198","选择操作"), url, 550, 520,param, afterCloseMobileLocalOpt);
		function afterCloseMobileLocalOpt(ret){
			var padForm=CFProcess.activities.childList[CFlow.getSelectedId()].padForm;
			if(ret){
				var xinjian=ret.xinjian;
				padForm.newActions.childList={};
				for(var n in xinjian){
					var action=new CFAction();
					action.id=xinjian[n].id;
					action.name=xinjian[n].name;
					action.description=xinjian[n].description;
					action.order=xinjian[n].order;
					padForm.newActions.childList[n]=action;
				}
				var daiban=ret.daiban;
				padForm.actions.childList={};
				for(var n in daiban){
					var action=new CFAction();
					action.id=daiban[n].id;
					action.name=daiban[n].name;
					action.description=daiban[n].description;
					action.order=daiban[n].order;
					padForm.actions.childList[n]=action;
				}
				var yiban=ret.yiban;
				padForm.yiBanActions.childList={};
				for(var n in yiban){
					var action=new CFAction();
					action.id=yiban[n].id;
					action.name=yiban[n].name;
					action.description=yiban[n].description;
					action.order=yiban[n].order;
					padForm.yiBanActions.childList[n]=action;
				}
				var banjie=ret.banjie;
				padForm.endActions.childList={};
				for(var n in banjie){
					var action=new CFAction();
					action.id=banjie[n].id;
					action.name=banjie[n].name;
					action.description=banjie[n].description;
					action.order=banjie[n].order;
					padForm.endActions.childList[n]=action;
				}
				if(xinjian[0] || daiban[0] || yiban[0] || banjie[0]){
					padForm.isSetLocal=true;
					$("#padLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
				}else{
					padForm.isSetLocal=false;
					$("#padLocalOpt input:text").val("");
				}
			}
		}
	});
	
	//pad表单域权限设置
	$("#padFormAuth input:button").bind("click",function(){
		if(!$("#padFormName input:text").attr("id")){
			showDialog("alert", L.getLocaleMessage("CForm.BPM.D255","请先设置pad表单！"),  L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/form/mobileformauth.jsp";
		var param = {"mobileForm" : CFProcess.activities.childList[CFlow.getSelectedId()].padForm};
		// 打开子页面
		showWindow( L.getLocaleMessage("CForm.BPM.D248","设置域权限"), url, 700, 490,param, afterClosePadAuth);
		// 子页面传给父页面的内容
		function afterClosePadAuth(backData) {
//		    alert(backData);
			if(backData){
				var flag=false;
				for(var n in backData){
					var field=backData[n];
					if(field.isHidden || field.isReadOnly || field.isNotNull ||field.isInitialize){
						flag=true;
						break;
					}
				}
				if(flag){
					var padForm=CFProcess.activities.childList[CFlow.getSelectedId()].padForm;
					padForm.form.id=padForm.id;
					padForm.form.name=padForm.name;
					CFProcess.activities.childList[CFlow.getSelectedId()].padForm.isSetAuth=true;
					$("#padFormAuth input:text").val( L.getLocaleMessage("CForm.BPM.D193","已设置"));
				}else{
					CFProcess.activities.childList[CFlow.getSelectedId()].padForm.form=null;
					CFProcess.activities.childList[CFlow.getSelectedId()].padForm.isSetAuth=false;
					$("#padFormAuth input:text").val("");
				}
			}
		}
	});
	//环节流程类型标题关联设置
	$("#typeSubject input:button").click(function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert", L.getLocaleMessage("CForm.BPM.D249","请先设置PC表单！"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$("#tab1 a").trigger("click");
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
				if(data.length==0){
					showDialog("alert", L.getLocaleMessage("CForm.BPM.D256","请先设置流程类型标题"),  L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					return false;
				}else{
					var url=CFlow.webPath+"/jsp/cform/procdef/html/subject/proctypesubject.jsp";
					var subjects=new Array();
					if(CFProcess.activities.childList[CFlow.getSelectedId()].subjects)
						var subs=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
					else 
						var subs={};
					for(var n in subs){
						var obj=new Object();
						if(subs[n].type!="procType") continue;
						obj.type=subs[n].type;
						obj.fieldId=subs[n].fieldId;
						obj.fieldName=subs[n].fieldName;
						obj.subjectKey=subs[n].subjectKey;
						obj.subjectAlias=subs[n].subjectAlias;
						subjects.push(obj);
					}
					
					var param={
						formId:$("#formName input:text").attr("id"),
						procType:CFlow.getProcType(),
						subjects:subjects,
						data:data
						};
					showWindow(L.getLocaleMessage("CForm.BPM.D201","选择流程类型标题"), url, 500, 375,param, acProcTypeSubject);
					
					
				}
				function acProcTypeSubject(backdata){
					if(backdata){
						if(backdata && backdata[0]){
							if(!CFProcess.activities.childList[CFlow.getSelectedId()].subjects){
								CFProcess.activities.childList[CFlow.getSelectedId()].subjects=new CFSubjects();
								CFProcess.activities.childList[CFlow.getSelectedId()].subjects.init();
							}
							var childList=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
							for(var m in childList){
								if(childList[m].type=="procType") delete childList[m];
							}
							for(var n in backdata){
								if(n=="nameInfo") continue;
								var subject=new CFSubject();
								subject.type="procType";
								subject.fieldId=backdata[n].fieldId;
								subject.fieldName=backdata[n].fieldName;
								subject.subjectKey=backdata[n].subjectKey;
								subject.subjectAlias=backdata[n].subjectAlias;
								CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList[subject.type+"#"+subject.subjectKey]=subject;
							}
							$("#typeSubject input:text").val(backdata["nameInfo"]);
							$("#typeSubject input:text").prop("title",backdata["nameInfo"])
							var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
							activity.isSetProcTypeSub=true;
						}else{
							if(!CFProcess.activities.childList[CFlow.getSelectedId()].subjects){
								CFProcess.activities.childList[CFlow.getSelectedId()].subjects=new CFSubjects();
								CFProcess.activities.childList[CFlow.getSelectedId()].subjects.init();
							}
							var childList=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
							for(var m in childList){
								if(childList[m].type=="procType") delete childList[m];
							}
							$("#typeSubject input:text").val("");
							var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
							activity.isSetProcTypeSub=false;
						}
					}
					
				}
			},
			error : function() {
				showDialog("alert", L.getLocaleMessage("CForm.BPM.D192","请求数据出错"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});	
		
		
	});
	
	//环节流程定义标题设置
	$("#defSubject input:button").click(function(){
		if(!$("#formName input:text").attr("id")){
			showDialog("alert", L.getLocaleMessage("CForm.BPM.D249","请先设置PC表单！"),  L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			$("#tab1 a").trigger("click");
			return false;
		}
		var url=CFlow.webPath+"/jsp/cform/procdef/html/subject/proctypesubject.jsp";
		var subjects=new Array();
		if(CFProcess.activities.childList[CFlow.getSelectedId()].subjects)
			var subs=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
		else 
			var subs={};
		for(var n in subs){
			var obj=new Object();
			if(subs[n].type!="proc") continue;
			obj.type=subs[n].type;
			obj.fieldId=subs[n].fieldId;
			obj.fieldName=subs[n].fieldName;
			obj.subjectKey=subs[n].subjectKey;
			obj.subjectAlias=subs[n].subjectAlias;
			subjects.push(obj);
		}
		
		var data=new Array();
		if(CFProcess.procSubjectDefs){
			var procdefs=CFProcess.procSubjectDefs.childList;
			for(var n in procdefs){
				var obj=new Object();
				obj.id=procdefs[n].subjectKey;
				obj.name=procdefs[n].subjectAlias;
				data.push(obj);
			}
		}
		
		var param={
			isDef:true,
			formId:$("#formName input:text").attr("id"),
			subjects:subjects,
			data:data
			};
		showWindow(L.getLocaleMessage("CForm.BPM.D200","选择流程定义标题"), url, 500, 375,param, acProcDefSubject);
		function acProcDefSubject(backdata){
			if(backdata){
				if(backdata[0]){
					if(!CFProcess.activities.childList[CFlow.getSelectedId()].subjects){
						CFProcess.activities.childList[CFlow.getSelectedId()].subjects=new CFSubjects();
						CFProcess.activities.childList[CFlow.getSelectedId()].subjects.init();
					}
					var childList=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
					for(var m in childList){
						if(childList[m].type=="proc") delete childList[m];
					}
					for(var n in backdata){
						
						if(n=="nameInfo"){
							continue;
						}
						var subject=new CFSubject();
						subject.type="proc";
						subject.fieldId=backdata[n].fieldId;
						subject.fieldName=backdata[n].fieldName;
						subject.subjectKey=backdata[n].subjectKey;
						subject.subjectAlias=backdata[n].subjectAlias;
						CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList[subject.type+"#"+subject.subjectKey]=subject;
					}
					$("#defSubject input:text").val(backdata["nameInfo"]);
					$("#defSubject input:text").prop("title",backdata["nameInfo"]);
					var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
					activity.isSetProcDefSub=true;
				}else{
					if(!CFProcess.activities.childList[CFlow.getSelectedId()].subjects){
						CFProcess.activities.childList[CFlow.getSelectedId()].subjects=new CFSubjects();
						CFProcess.activities.childList[CFlow.getSelectedId()].subjects.init();
					}
					var childList=CFProcess.activities.childList[CFlow.getSelectedId()].subjects.childList;
					for(var m in childList){
						if(childList[m].type=="proc") delete childList[m];
					}
					$("#defSubject input:text").val("");
					var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
					activity.isSetProcDefSub=false;
				}
			}
			
		}
		
	});
	if(CFlow.getProcType()){
		$("#typeSubject").show();
	}else{
		$("#typeSubject").hide();
	}
	CFlow.initCFormActData();
});
function switchTab(ProTag, ProBox) {
		$("#divActivityFormPropertyBody #"+ProTag+" a").addClass("on");
		$("#divActivityFormPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
		$("#divActivityFormPropertyBody #"+ProBox).show();
		$("#divActivityFormPropertyBody .con:not('#"+ProBox+"')").hide();
	}
CFlow.initCFormActData =function(){
	var activity=CFProcess.activities.childList[CFlow.getSelectedId()];
	
	///////////////////////
	var data2=new Array();
	if(CFProcess.procSubjectDefs){
		var procdefs=CFProcess.procSubjectDefs.childList;
		for(var n in procdefs){
			var obj=new Object();
			obj.id=procdefs[n].subjectKey;
			obj.name=procdefs[n].subjectAlias;
			data2.push(obj);
		}
	}
	if(data2.length==0){
		$("#defSubject").hide();
	}else{
		$("#defSubject").show();
	}
	
	var data1;
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
			data1=data;
			if(data.length==0){
				$("#typeSubject").hide();
			}else{
				$("#typeSubject").show();
			}
		},
		error : function() {
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
		}
	});		
	if(activity.isSetForm){
		$("#formName input:text").val(activity.formName);
		$("#formName input:text").attr("id",activity.formId);
	}else if(CFProcess.isSet){
		$("#formName input:text").val(CFProcess.formName);
		$("#formName input:text").attr("id",CFProcess.formId);
		activity.formId=CFProcess.formId;
		activity.formName=CFProcess.formName;
	}else{
		$("#formName input:text").val("");
		$("#formName input:text").attr("id",null);
	}
	
	targetNodeList=WFlow.getTargetNodeInfo(CFlow.getSelectedId());
	var flag=false;
	for(var nodeId in targetNodeList){
		var node=targetNodeList[nodeId];
		if(node["expression"]!=null && node["expression"]!=""){
			flag=true; break;
		}
	}
	if(flag){
		$("#actBranchCondi input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#actBranchCondi input:text").val("");
	}
	
	if(activity.isSetLocal){
		$("#localOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else if(CFProcess.isSetLocal){
		var daiban=CFProcess.actions.childList;
		activity.actions=new CFActions();
		activity.actions.init();
		for(var n in daiban){
			var action=new CFAction();
			action.id=daiban[n].id;
			action.name=daiban[n].name;
			action.description=daiban[n].description;
			action.order=daiban[n].order;
			activity.actions.childList[n]=action;
		}
		var yiban=CFProcess.yiBanActions.childList;
		activity.yiBanActions=new CFYiBanActions();
		activity.yiBanActions.init();
		for(var n in yiban){
			var action=new CFAction();
			action.id=yiban[n].id;
			action.name=yiban[n].name;
			action.description=yiban[n].description;
			action.order=yiban[n].order;
			activity.yiBanActions.childList[n]=action;
		}
		var banjie=CFProcess.endActions.childList;
		activity.endActions=new CFEndActions();
		activity.endActions.init();
		for(var n in banjie){
			var action=new CFAction();
			action.id=banjie[n].id;
			action.name=banjie[n].name;
			action.description=banjie[n].description;
			action.order=banjie[n].order;
			activity.endActions.childList[n]=action;
		}
		activity.isSetLocal=true;
		$("#localOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#localOpt input:text").val("");
	}
	
	if(activity.isSetAuth){
		$("#formAuth input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#formAuth input:text").val("");
	}
	var procDefSubject="";
	var procTypeSubject="";
	if(activity.isSetSubject){
		if(activity.subjects){
			var subjects=activity.subjects.childList;
			for(var n in subjects){
				if(subjects[n].type=="procType"){
					procTypeSubject+=subjects[n].subjectAlias+"-"+subjects[n].fieldName+";";
				}else{
					procDefSubject+=subjects[n].subjectAlias+"-"+subjects[n].fieldName+";";
				}
			}
		}
	}else{
		if(CFProcess.subjects){
			var subjects=CFProcess.subjects.childList;
			nameInfo="";
			if(!activity.subjects){
				activity.subjects=new CFSubjects();
				activity.subjects.init();
			}
			for(var n in subjects){
				var subject=subjects[n];
				activity.subjects.childList[n]=new CFSubject();
				activity.subjects.childList[n].fieldId=subject.fieldId;
				activity.subjects.childList[n].type=subject.type;
				activity.subjects.childList[n].fieldName=subject.fieldName;
				activity.subjects.childList[n].subjectKey=subject.subjectKey;
				activity.subjects.childList[n].subjectAlias=subject.subjectAlias;
				if(subject.type=="proc"){
					procDefSubject+=subject.subjectAlias+"-"+subject.fieldName+";";
				}else{
					procTypeSubject+=subject.subjectAlias+"-"+subject.fieldName+";";
				}
			}
		}
	}
	procTypeSubject=procTypeSubject.substring(0,procTypeSubject.length-1);
	procDefSubject=procDefSubject.substring(0,procDefSubject.length-1);
	$("#typeSubject input:text").val(procTypeSubject);
	$("#typeSubject input:text").prop("title",procTypeSubject);
	$("#defSubject input:text").val(procDefSubject);
	$("#defSubject input:text").prop("title",procDefSubject);
	activity.isSetSubject=true;
	
	if(activity.mobileForm && activity.mobileForm.isSetForm){
		$("#mobileFormName input:text").val(activity.mobileForm.name);
		$("#mobileFormName input:text").attr("id",activity.mobileForm.id);
	}else{
		$("#mobileFormName input:text").val("");
		$("#mobileFormName input:text").attr("id",null);
	}
	
	if(activity.mobileForm && activity.mobileForm.isSetAuth){
		$("#mobileFormAuth input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#mobileFormAuth input:text").val("");
	}
	if(activity.mobileForm && activity.mobileForm.isSetLocal){
		$("#mobileLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#mobileLocalOpt input:text").val("");
	}
	
	if(activity.padForm && activity.padForm.isSetForm){
		$("#padFormName input:text").val(activity.padForm.name);
		$("#padFormName input:text").attr("id",activity.padForm.id);
	}else{
		$("#padFormName input:text").val("");
		$("#padFormName input:text").attr("id",null);
	}
	
	if(activity.padForm && activity.padForm.isSetAuth){
		$("#padFormAuth input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#padFormAuth input:text").val("");
	}
	if(activity.padForm && activity.padForm.isSetLocal){
		$("#padLocalOpt input:text").val(L.getLocaleMessage("CForm.BPM.D193","已设置"));
	}else{
		$("#padLocalOpt input:text").val("");
	}
}