(function($) {
	if (typeof WForm == "undefined") {
		WForm = {
			parameter:{}
		};
	}
	
	WForm.init = function() {
		// 初始化画布（兼容浏览器）
		initFormSize();	
		// 注册操作功能
		WForm.initOperation();
	};
	
	function initFormSize() {
		var bodyWidth=document.documentElement.clientWidth;
		var bodyHeight=document.documentElement.clientHeight;
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("chrome") != -1){
			bodyHeight=670;
		}
		$(".wfd_DesignColumn").width(bodyWidth);
		$(".wfd_DesignColumn").height(bodyHeight-$(".wfd_HandleArea").height());
		
		$.ajax({
			type : "POST",
			async : false,
			url : WForm.webPath + "/jsp/workflow/infoprocessmodel/form/wfdcore.jsp",
			data : parseUrl(),
			dataType:"html",
			success:function(data){
				afterLoadSuccess(data);
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C014","加载页面失败"),L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
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
	
	function afterLoadSuccess(data) {
		$(".wfd_DesignColumn").append(data);
		
	}
	
	WForm.getDesignerEditor = function() {
		return $(".wfd_DesignColumn").data("designerEditor");
	}
	WForm.setDesignerEditor = function(element) {
		$(".wfd_DesignColumn").data("designerEditor", element);
	}
	
	WForm.initOperation = function() {
		$("#seeSource").click(function() {
			if($(this).children("span").text()==L.getLocaleMessage("BPM.INFOPROCESSMODEL.C037","查看源码")){
				$(this).children("span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C038","返回设计"));
			}else{
				$(this).children("span").text(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C037","查看源码"));
			}
			if (WForm.seeCode) {
				WForm.seeCode=false;
                $(".wfd_DesignColumn").show();
                $(".wfd_SourceColumn").hide();
        	} else {
        		WForm.seeCode=true;
                $(".wfd_DesignColumn").hide();
                $(".wfd_SourceColumn").show();
              //绑定源码区事件
            	$("#wfd_ProcModelSource").click(function(){
            		$(this).css("background","#ddd");
            		$("#wfd_FormSource").css("background","#eee");
            		var editor=WForm.getDesignerEditor();
            		var bpmnXml = WFlow.getModelContent();
            		editor.setValue(bpmnXml);
            		CodeMirror.commands["selectAll"](editor);
            		editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
            		CodeMirror.commands["goDocStart"](editor);
            		return false;
            	});
            	$("#wfd_FormSource").click(function(){
            		$(this).css("background","#ddd");
            		$("#wfd_ProcModelSource").css("background","#eee");
            		var editor=WForm.getDesignerEditor();
            		var formXml = WFormModel.generateModelContent();
            		editor.setValue(formXml);
            		CodeMirror.commands["selectAll"](editor);
            		editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
            		CodeMirror.commands["goDocStart"](editor);
            		return false;
            	});
                
                var bpmnXml = WFlow.getModelContent();
				var editor;
				if (WForm.getDesignerEditor()) {
					editor = WForm.getDesignerEditor();
				} else {
					 var editor = CodeMirror.fromTextArea(
						document.getElementById("wfd_txtSource"), 
						{
							mode: "application/xml",
							lineNumbers: true
						});
					WForm.setDesignerEditor(editor);
				}
				editor.setValue(bpmnXml);
				CodeMirror.commands["selectAll"](editor);
				editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
				CodeMirror.commands["goDocStart"](editor);
        	}
		});
		// 单击保存按钮时
		$("#wfd_btn_save").click(function() {
			// 保存流程模型
			$.ajax({
				type : "POST",
				async : false,
				url : WForm.fullWebPath + "/command/dispatcher/"
					+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
					+ "save",
				data : {"procDefUniqueId" : WForm.procDefUniqueId,
					"procDefId" : WFlow.getProcInfo().id,
					"procDefName" : WFlow.getProcInfo().name,
					"pluginType" : WFlow.getProcInfo().pluginType,
					"procSpec" : WFlow.getProcInfo().procSpec,
					"processType":WFlow.getProcInfo().procType,
					"modelContent" : WFlow.getModelContent(),
					"formModelContent" : WFormModel.generateModelContent()},
				dataType:"json",
				success : function(data) {
					if (data && data.success) {
						WForm.procDefUniqueId = data.procDefUniqueId;
						WFlow.procDefUniqueId = data.procDefUniqueId;
						if(!WForm.isReleasing){
							showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C039","保存成功"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
						}else{
							WForm.isReleasing=false;
							WForm.saveSuccess=true;
						}
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
					
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C040","保存数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
		});
		
		// 单击发布按钮时
		$("#wfd_btn_saveAndRelease").click(function() {
			WForm.isReleasing=true;
			$("#wfd_btn_save").trigger("click");
			// 发布
			if(WForm.saveSuccess)
			$.ajax({
				type : "POST",
				async : false,
				url : WForm.fullWebPath + "/command/dispatcher/"
					+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
					+ "release",
				data : {"procDefUniqueId" : WForm.procDefUniqueId},
				dataType:"json",
				success:function(data){
					if(data && data.success){
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C041","保存并发布成功"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
				},
				error:function(){
					showDialog("alert", L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","发布流程出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
			WForm.saveSuccess=false;
		});
		
		//另存为新流程
		$("#saveAsNewProcess").click(function(){
			var afterClose=function(backData){
				if(backData){
					var procObj=new Object();
					procObj.procDefUniqueId=WForm.procDefUniqueId;
					procObj.id=WFlow.getPinyin(backData);
					procObj.name=backData;
					var tmpObj = WFlow.getModelContentAsNew({id:procObj.id,name:procObj.name});
					$.ajax({
						type : "POST",
						async : false,
						url : WFlow.fullWebPath + "/command/dispatcher/"
							+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
							+ "saveAsNewProcess",
						data : {"procDefUniqueId" : WForm.procDefUniqueId,
							"procDefId" : WFlow.getPinyin(backData),
							"procDefName" : backData,
							"pluginType" : WFlow.getProcInfo().pluginType,
							"procSpec" : WFlow.getProcInfo().procSpec,
							"processType":WFlow.getProcInfo().procType,
							"modelContent" : WFlow.getModelContent(),
							"formModelContent" : WFormModel.generateModelContent()},
						dataType:"json",
						success : function(data) {
							if (data && data.success) {
								WForm.setProcDefUniqueId(data.procDefUniqueId);
								procObj.procDefUniqueId=data.procDefUniqueId;
								$("#procTitle").text(procObj.name);
								showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C043","另存为新流程成功"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
							}else{
								WFlow.saveAs(tmpObj.oldProc);
								showDialog1("alert",data.errMessage,L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
							}
							
						},
						error:function(){
							showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C040","保存数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
						}
					});
				}else{
					return false;
				}
			}
			var url=parent.WForm.webPath+"/jsp/workflow/infoprocessmodel/form/common/prompt.jsp";
			var param={
					"title":L.getLocaleMessage("BPM.INFOPROCESSMODEL.C044","请输入新名称"),
					"content":WFModel.process.name,
					"afterClose":afterClose
			}
			showWindow(L.getLocaleMessage("BPM.INFOPROCESSMODEL.C045","修改流程名称"), url, 400, 150,param, afterClose);
		});
		//另存为新版本
		$("#saveAsNewVersion").click(function(){
			$.ajax({
				type : "POST",
				async : false,
				url : WFlow.fullWebPath + "/command/dispatcher/"
					+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
					+ "saveAsNewVersion",
				data : {"procDefUniqueId" : WForm.procDefUniqueId,
					"procDefId" : WFlow.getProcInfo().id,
					"procDefName" : WFlow.getProcInfo().name,
					"pluginType" : WFlow.getProcInfo().pluginType,
					"procSpec" : WFlow.getProcInfo().procSpec,
					"processType":WFlow.getProcInfo().procType,
					"modelContent" : WFlow.getModelContent(),
					"formModelContent" : WFormModel.generateModelContent()},
				dataType:"json",
				success : function(data) {
					if (data && data.success) {
						WForm.procDefUniqueId=data.procDefUniqueId;
						var procObj=new Object();
						procObj.procDefUniqueId=data.procDefUniqueId;
						procObj.id=WFlow.getProcInfo().id;
						procObj.name=WFlow.getProcInfo().name;
						$("#procTitle").text(procObj.name);
						WFlow.saveAsVersion(procObj);
						showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C046","另存为新版本成功"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
						
					}else{
						showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
					}
					
				},
				error:function(){
					showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C040","保存数据出错"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			});
		
		});
		
		$("#wfd_btn_saveAsNew").mouseenter(function(){
			$(".saveAs").show();
		}).mouseleave(function(){
			$(".saveAs").hide();
		});
		$(".saveAs").css("z-index","100");
		
		if(WForm.parameter['showCode']=="1"){
			$("#wfd_div_handle ul").width($("#wfd_div_handle ul").width()+83);
			$("#seeSource").show();
		}
	}
	
	$(function() {
		WForm.init();
	});
	
})(jQuery);