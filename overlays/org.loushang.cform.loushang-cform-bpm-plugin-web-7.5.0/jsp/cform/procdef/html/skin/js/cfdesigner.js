(function($) {
	if (typeof CFDEvent == "undefined") {
		CFDEvent = {};
	}
	
	CFDEvent.initOperation = function() {
		$("#seeSource").click(
				function() {
					if($("#seeSource span").text()==L.getLocaleMessage("CForm.BPM.D266","查看源码")){
						$("#seeSource span").text(L.getLocaleMessage("CForm.BPM.D267","返回设计"))
					}else{
						$("#seeSource span").text(L.getLocaleMessage("CForm.BPM.D266","查看源码"))
					}
					if (WFlow.seeCode) {
						WFlow.seeCode=false;
		                $("#cfDivDesignArea").show();
		                $("#divSource").hide();
		        	} else {
		        		WFlow.seeCode=true;
		                $("#cfDivDesignArea").hide();
		                $("#divSource").show();
		              //绑定源码区事件
		            	$("#bpmnSource").click(function(){
		            		$(this).css("background","#ddd");
		            		$("#cformSource").css("background","#eee");
		            		var editor=CFlow.getDesignerEditor();
		            		var bpmnXml = CFlow.getProcModel();
		            		editor.setValue(bpmnXml);
		            		CodeMirror.commands["selectAll"](editor);
		            		editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
		            		CodeMirror.commands["goDocStart"](editor);
		            		return false;
		            	});
		            	$("#cformSource").click(function(){
		            		$(this).css("background","#ddd");
		            		$("#bpmnSource").css("background","#eee");
		            		var editor=CFlow.getDesignerEditor();
		            		var cformXml = CFlow.getCFormModelContent();
		            		editor.setValue(cformXml);
		            		CodeMirror.commands["selectAll"](editor);
		            		editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
		            		CodeMirror.commands["goDocStart"](editor);
		            		return false;
		            	});
		                
		                var bpmnXml = CFlow.getProcModel();
//		                	WFModel.generateModelContent();
						var editor;
						if (CFlow.getDesignerEditor()) {
							editor = CFlow.getDesignerEditor();
						} else {
							 var editor = CodeMirror.fromTextArea(
								document.getElementById("txtSource"), 
								{
									mode: "application/xml",
									lineNumbers: true
								});
							CFlow.setDesignerEditor(editor);
						}
						editor.setValue(bpmnXml);
						CodeMirror.commands["selectAll"](editor);
						editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
						CodeMirror.commands["goDocStart"](editor);
		        	}
				}
			);
		// 单击保存按钮时
		$("#cfBtnSave").click(
			function() {

				// 保存流程模型
				$.ajax({
					type : "POST",
					async : false,
					url : WFlow.fullWebPath + "/command/dispatcher/"
						+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
						+ "save",
					data : {"procDefUniqueId" : CFlow.getProcDefUniqueId(),
						"procDefId" : CFlow.getProcDefId(),
						"procDefName" : CFlow.getProcDefName(),
						"pluginType" : CFlow.getPluginType(),
						"procSpec" : CFlow.getProcSpec(),
						"processType":CFlow.getProcType(),
						"modelContent" : CFlow.getProcModel,
						"cfModelContent" : CFlow.getCFormModelContent()},
					dataType:"json",
					success : function(data) {
						if (data && data.success) {
							CFlow.setProcDefUniqueId(data.procDefUniqueId);
							if(!CFlow.isReleasing){
								showDialog("alert",L.getLocaleMessage("CForm.BPM.D268","保存成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
							}else{
								CFlow.isReleasing=false;
								CFlow.saveSuccess=true;
							}
						}else{
							showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						}
						
					},
					error:function(){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D269","保存数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					}
				});
			}
		);
		
		// 单击发布按钮时
		$("#cfBtnRelease").click(
			function() {
				CFlow.isReleasing=true;
				$("#cfBtnSave").trigger("click");
				// 发布
				if(CFlow.saveSuccess)
				$.ajax({
					type : "POST",
					async : false,
					url : WFlow.fullWebPath + "/command/dispatcher/"
						+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
						+ "release",
					data : {"procDefUniqueId" : CFlow.getProcDefUniqueId()},
					dataType:"json",
					success:function(data){
						if(data && data.success){
							WFlow.setRelease();
							showDialog("alert",L.getLocaleMessage("CForm.BPM.D270","保存并发布成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						}else{
							showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						}
					},
					error:function(){
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D260","流程发布出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					}
				});
				CFlow.saveSuccess=false;
			}
		);
		//另存为新流程
		$("#saveAsNewProcess").click(function(){
			var afterClose=function (backData){
				if(backData){
					var procObj=new Object();
					procObj.procDefUniqueId=CFlow.getProcDefUniqueId();
					procObj.id=WFlow.getPinyin(backData);
					procObj.name=backData;
					var tmpObj = WFlow.getModelContentAsNew(procObj); 
					$.ajax({
						type : "POST",
						async : false,
						url : WFlow.fullWebPath + "/command/dispatcher/"
							+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
							+ "saveAsNewProcess",
						data : {"procDefUniqueId" : CFlow.getProcDefUniqueId(),
							"procDefId" : WFlow.getPinyin(backData),
							"procDefName" : backData,
							"pluginType" : CFlow.getPluginType(),
							"procSpec" : CFlow.getProcSpec(),
							"processType":CFlow.getProcType(),
							"modelContent" : tmpObj.modelContent ,
							"cfModelContent" : CFlow.getCFormModelContent()},
						dataType:"json",
						success : function(data) {
							if (data && data.success) {
								CFlow.setProcDefUniqueId(data.procDefUniqueId);
								procObj.procDefUniqueId=data.procDefUniqueId;
								$("#procTitle").text(procObj.name);
								showDialog("alert",L.getLocaleMessage("CForm.BPM.D271","另存为新流程成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
							}else{
								WFlow.saveAs(tmpObj.oldObj);
								showDialog1("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
							}
							
						},
						error:function(){
							showDialog("alert",L.getLocaleMessage("CForm.BPM.D269","保存数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						}
					});
				}else{
					return false;
				}
			}
			
			var url=parent.CFlow.webPath+"/jsp/cform/procdef/html/common/prompt.jsp";
			var param={
					"title":L.getLocaleMessage("CForm.BPM.D272","请输入新名称"),
					"content":WFModel.process.name,
					"afterClose":afterClose
			}
			showWindow(L.getLocaleMessage("CForm.BPM.D273","修改流程名称"), url, 400, 150,param, afterClose);
			
			
		});
		//另存为新版本
		$("#saveAsNewVersion").click(function(){
			$.ajax({
				type : "POST",
				async : false,
				url : WFlow.fullWebPath + "/command/dispatcher/"
					+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
					+ "saveAsNewVersion",
				data : {"procDefUniqueId" : CFlow.getProcDefUniqueId(),
					"procDefId" : CFlow.getProcDefId(),
					"procDefName" : CFlow.getProcDefName(),
					"pluginType" : CFlow.getPluginType(),
					"procSpec" : CFlow.getProcSpec(),
					"processType":CFlow.getProcType(),
					"modelContent" : CFlow.getProcModel,
					"cfModelContent" : CFlow.getCFormModelContent()},
				dataType:"json",
				success : function(data) {
					if (data && data.success) {
						CFlow.setProcDefUniqueId(data.procDefUniqueId);
						var procObj=new Object();
						procObj.procDefUniqueId=data.procDefUniqueId;
						procObj.id=CFlow.getProcDefId();
						procObj.name=CFlow.getProcDefName();
						$("#procTitle").text(procObj.name);
						WFlow.saveAsVersion(procObj);
						showDialog("alert",L.getLocaleMessage("CForm.BPM.D274","另存为新版本成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
						
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
					}
					
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D269","保存数据出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}
			});
		
		});
		
		$("#cfBtnSaveAsNew").mouseenter(function(){
			$(".saveAs").show();
		}).mouseleave(function(){
			$(".saveAs").hide();
		});
		$(".saveAs").css("z-index","100");

	}
	
	function initSize(){
		var bodyWidth=document.documentElement.clientWidth;
		var bodyHeight=document.documentElement.clientHeight;
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("chrome") != -1){
			bodyHeight=670;
		}
		$("#cfDivDesignArea").width(bodyWidth);
		$("#cfDivDesignArea").height(bodyHeight-$("#cfDivHandle").height());
		$.ajax({
			type : "POST",
			async : false,
			url : cformPath + "/jsp/cform/procdef/html/cfdcore.jsp",
			data : parseUrl(),
			dataType:"html",
			success:function(data){
				$("#cfDivDesignArea").append(data);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D275","加载页面失败"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	
	function parseUrl() {
		var fullUrl = document.URL.split("?");
		if (fullUrl.length <= 1) {
			return;
		}
		var params={};
		var param = fullUrl[1].split("&");
		for ( var i = 0; i < param.length; i++) {
			var keyValue = param[i].split("=");
			if (keyValue.length == 2) {
				params[keyValue[0]] = keyValue[1];
			}
		}
		return params;
		}
	
	$(function() {
		initSize();
		if(CFlow.showCode=="1"){
			$("#cfDivHandle ul").width($("#cfDivHandle ul").width()+83);
			$("#seeSource").show();
		}
	});
	
})(jQuery);