(function($){
	if (typeof WFormModel =="undefined") {
		WFormModel = {};
	};
	
	WFormModel.getAndParserModelContent = function(id) {
		$.ajax({
			type : "POST",
			async : false,
			url : WForm.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.workflow.infoprocessmodel.form.cmd.FormDispatcherCmd/"
				+ "getFormModel",
			data : {"id" : id},
			dataType:"json",
			success : function(data) {
				if(data && data.success){
					if(data.modelContent)
						WFormModel.parseModelContent(data.modelContent);
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("BPM.INFOPROCESSMODEL.C007","请求数据出错！"), L.getLocaleMessage("BPM.INFOPROCESSMODEL.C006","提示信息"), 300);
			}
		});
	};
	
	WFormModel.parseModelContent = function(modelContent) {
		var xmlDoc;
		if (window.DOMParser) {
			xmlDoc = new DOMParser().parseFromString(modelContent, "text/xml");
		} else {
			// Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(modelContent);
		}
		
		this.model().parseXml(xmlDoc);
	};
	
	WFormModel.generateModelContent = function() {
		var xmlDoc;
		var isIE = false;
		try {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			isIE = true;
		} catch(e) {
			xmlDoc = document.implementation.createDocument("", "", null);
			isIE = false;
		}
		
		var xmlHead = xmlDoc.createProcessingInstruction("xml", "version=\"1.0\" encoding=\"UTF-8\"");
		xmlDoc.appendChild(xmlHead);
		
		var root = this.model().generateXml(xmlDoc);
		xmlDoc.appendChild(root);
		
		var modelContent;
		if (isIE) {
			modelContent = xmlDoc.xml;
		} else {
			var xs = new XMLSerializer();
			modelContent = xs.serializeToString(xmlDoc);
		}
		return modelContent;
	};
	
	var tmpFormModel;
	WFormModel.model = function(value) {
		if (value) {
			tmpFormModel = value;
		} else {
			return tmpFormModel;
		}
	}
	
	WFormModel.init = function() {
		var rootModel = new WFormPackage();
		rootModel.init();
		this.model(rootModel);
		this.process = rootModel.processes.process;
		WFormProcess=rootModel.processes.process;
		if (WForm.parameter["procDefUniqueId"]) {
			this.getAndParserModelContent(WForm.procDefUniqueId);
		} else {
			// 初始化流程模型
			this.process.id = 'LiuCheng';
			this.process.name = L.getLocaleMessage("BPM.INFOPROCESSMODEL.C008","流程");
		}
		$("#wfd_procTitle").text(this.process.name);
		
		/**
		 * 增加节点/迁移线时，需要记录表单模型
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）环节/迁移线ID（id）
		 *    3）环节/迁移线名称（name）
		 */
		WFlow.bind(WFlow.event.WF_ADD_MODEL, function(e, data){
			switch(data.eventType) {
				case "userTask":
					var formAct = new WFormActivity();
					formAct.init();
					formAct.id = data.id;
					formAct.name = data.name;
					WFormModel.process.activities.childList[formAct.id]=formAct;
					WForm.parameter['selectedId']=data.id;
					break;
				case "callActivity" :
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					break;
				case "startEvent":
				case "endEvent":
					break;
				case "process":
					break;
				case "lane":
					break;
				case "sequenceFlow":
					break;
			}
		});
		
		WFlow.bind(WFlow.event.WF_UPDATE_MODEL, function(e, data){
			switch(data.eventType) {
				case "userTask":
					var formAct = WFormModel.process.activities.childList[data.orgId];
					formAct.name = data.name;
					formAct.id = data.id;
					delete WFormModel.process.activities.childList[data.orgId];
					WFormModel.process.activities.childList[data.id]=formAct;
					break;
				case "callActivity" :
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					break;
				case "startEvent":
				case "endEvent":
					break;
				case "process":
					WFormModel.process.id = data.id;
					WFormModel.process.name = data.name;
					$("#wfd_procTitle").text(WFormModel.process.name);
					break;
				case "lane":
					break;
				case "sequenceFlow":
					break;
			}
		});
		
		/**
		 * 删除图形时，需要删除流程模型
		 * @param e
		 * @param data，值为
		 *    1）事件对象类型（eventType）（类型的取值：process，userTask，inclusiveGateway，startEvent，endEvent，sequenceFlow） 
		 *    2）环节/迁移线ID（id）
		 *    3）环节/迁移线名称（name）
		 */
		WFlow.bind(WFlow.event.WF_DELETE_MODEL, function(e, data){
			switch(data.eventType) {
				case "userTask":
					delete WFormModel.process.activities.childList[data.id];
					break;
				case "callActivity" :
					break;
				case "inclusiveGateway":
				case "exclusiveGateway":
				case "parallelGateway":
				case "complexGateway":
					break;
				case "startEvent":
				case "endEvent":
					break;
				case "process":
					break;
				case "lane":
					break;
				case "sequenceFlow":
					break;
			}
		});
	};
	
})(jQuery);