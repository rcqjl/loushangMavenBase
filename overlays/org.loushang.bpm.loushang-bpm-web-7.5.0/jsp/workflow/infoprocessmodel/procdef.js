function init() {
	query();
}

function getIframeWindow(id){
	return document.getElementById(id).contentWindow || document.frames[id].window;
}

function designerLoadCompleted()
{
	document.body.onscroll=procEditorScrollEventHandler;
}

function procEditorScrollEventHandler()
{
	var frame=getIframeWindow("procEditor");
	frame.designerContainerScrollSizeChanged(document.body.scrollLeft,document.body.scrollTop);
}

function needConvertHighLevelToExecuteLevel()
{
	return true;
}

function saveProcessDefinition() {
	getIframeWindow("procEditor").saveProcessPre("insert");
}
// 新增流程定义
function insert() {
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	if (record.get("id")!="") {
		if(executeUpdate())
			alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.071", "流程定义修改成功！"));
	}
	else
	{
		if(executeInsert())
			alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.072", "流程定义保存成功！"));
	}
}

function executeInsert()
{
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var procDefId = getIframeWindow("procEditor").getProcDefId();
	var procDefName = getIframeWindow("procEditor").getProcDefName();
	var modelContent = getIframeWindow("procEditor").getModelContent();
	var extensionContent = getIframeWindow("procEditor").getExtensionContent();
	var pluginType = document.getElementById('pluginType').value;
	var processType = document.getElementById('processType').value;
	var procSpec = getIframeWindow("procEditor").getProcSpec();
	
	record.set("procDefId", procDefId);
	record.set("procDefName", procDefName);
	record.set("modelContent", modelContent);
	record.set("extensionContent", extensionContent);
	record.set("procSpec", procSpec);
	record.set("pluginType", pluginType);
	record.set("processType", processType);
	var valid = procDefDataset.isValidate();
	if (valid !== true) {
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.073", "校验未通过，不能保存！") + valid);
		return false;
	}
	var command = new L5.Command(
			"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
	command.setParameter("procDef",procDefDataset.getCurrent().toBean(
						"org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"));
	command.execute("insert");
	if (!command.error) {
		record.set("id",command.getReturn("procDefUniqueId"));
		record.set("isHistory", command.getReturn("isHistory"));
		return true;
	} else {
		alert(command.error);
		return false;
	}
}

function updatePre() {
	getIframeWindow("procEditor").saveProcessPre("update");
}

// 修改流程定义
function update() {
	if(executeUpdate())
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.071", "流程定义修改成功！"));
}

function executeUpdate()
{
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var procDefIdOriginal = record.get("procDefId");
	var procDefId = getIframeWindow("procEditor").getProcDefId();
	if(procDefIdOriginal!=procDefId){
		var rt = confirm(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.074", "您不能修改流程定义ID，您对其的修改将无效！"));
		if(rt==false)return false;
		getIframeWindow("procEditor").updateProcDefId(procDefIdOriginal);
	}
	var processType = document.getElementById('processType').value;
	var procDefName = getIframeWindow("procEditor").getProcDefName();
	var modelContent = getIframeWindow("procEditor").getModelContent();
	var extensionContent = getIframeWindow("procEditor").getExtensionContent();

	record.set("processType", processType);
	record.set("procDefId", procDefIdOriginal);
	record.set("procDefName", procDefName);
	record.set("modelContent", modelContent);
	record.set("extensionContent", extensionContent);
	var isValidate = procDefDataset.isValidate();
	if (isValidate != true) {
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.073", "校验未通过，不能保存！") + isValidate);
		return false;
	}
	var command = new L5.Command(
			"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
	command.setParameter("procDef",procDefDataset.getCurrent().toBean(
					"org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"));
	command.execute("update");
	if (!command.error) {
		return true;
	} else {
		alert(command.error);
		return false;
	}	
}
function releaseProcDefPre() {
	getIframeWindow("procEditor").saveProcessPre("releaseProcDef");
}

function releaseProcDef() {
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var command = new L5.Command("org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
	if(record.get("id")=="")
	{
		if(!executeInsert())
		{
			return false;
		}
	}
	else
	{
		if(!executeUpdate())
		{
			return false;
		}
	}
	command.setParameter("procDefUniqueIds",[record.get("id")]);
	command.execute("release");
	if (!command.error) {
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.049", "发布成功!"));
		return true;
	} else {
		alert(command.error);
		return false;
	}	
}

function saveAsPre() {
	getIframeWindow("procEditor").saveProcessPre("saveAs");
}

function saveAs() {
	var procDefIdNeedModify = "";
	var procDefNameNeedModify = "";
	var sysAutoSet= "";
	
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var procDefIdOriginal = record.get("procDefId");
	var procDefNameOriginal = record.get("procDefName");
	
	var procDefId = getIframeWindow("procEditor").getProcDefId();
	var procDefName = getIframeWindow("procEditor").getProcDefName();
	
	//流程定义名称未修改
	if(procDefNameOriginal==procDefName){
		procDefNameNeedModify = "1";
	}
	
	//流程定义ID未修改
	if(procDefIdOriginal==procDefId){
		procDefIdNeedModify = "1";
	}else{
		//校验流程类型id的长度
		if(procDefId.length>32){
			alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.075", "流程定义ID已超过最大长度32位！"));
			return false;
		}
		//校验是否有重复的流程定义ID
		var command = new L5.Command(
					"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
		command.setParameter("procDefId",procDefId);
		command.execute("checkDuplicatePorcDefId");
		if(!command.error){
			var isDuplicatePorcDefId = command.getReturn("isDuplicatePorcDefId");
			if(isDuplicatePorcDefId){
				var rt = confirm(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.076", "您输入的流程定义Id已存在，点击<确定>系统自动修改，点击<取消>手动修改"));
				if(rt == true){
					sysAutoSet ="1";
				}else{
					sysAutoSet ="2";
				}
			}
		}else{
			alert(command.error);
		}
	}
	//修改后的流程定义ID重复了，需要手动修改procDefId
	if(sysAutoSet=="2")return false;
	
	var msg ="";
	if(procDefIdNeedModify=="1"&&procDefNameNeedModify==""){
		msg = getLocaleMsg("UI.BPM.INFOPROCESSMODEL.077", "您未修改流程定义ID，点击<确定>系统自动修改，点击<取消>手动修改！");
	}
	if(procDefIdNeedModify==""&&procDefNameNeedModify=="1"){
		msg = getLocaleMsg("UI.BPM.INFOPROCESSMODEL.078", "您未修改流程定义名称，点击<确定>不作修改继续，点击<取消>手动修改！");
	}
	if(procDefIdNeedModify=="1"&&procDefNameNeedModify=="1"){
		msg = getLocaleMsg("UI.BPM.INFOPROCESSMODEL.079", "您未修改流程定义名称和Id，点击<确定>系统自动处理，点击<取消>手动修改！");
	}
	
	//另存为新流程时，没有修改流程定义名称或ID，弹出提示
	if(procDefIdNeedModify=="1"||procDefNameNeedModify=="1"){
		var state = confirm(msg);
		if (state == true) {
			if(procDefIdNeedModify=="1" || sysAutoSet =="1"){
				getIframeWindow("procEditor").changeProcDefId();
			}
			var procDefId = getIframeWindow("procEditor").getProcDefId();
			var procDefName = getIframeWindow("procEditor").getProcDefName();
			
			var modelContent = getIframeWindow("procEditor").getModelContent();
			var extensionContent = getIframeWindow("procEditor").getExtensionContent();
			var pluginType = document.getElementById('pluginType').value;
			var processType = document.getElementById('processType').value;
			var procSpec = getIframeWindow("procEditor").getProcSpec();
			
			record.set("procDefId", procDefId);
			record.set("procDefName", procDefName);
			record.set("modelContent", modelContent);
			record.set("extensionContent", extensionContent);
			record.set("procSpec", procSpec);
			record.set("pluginType", pluginType);
			record.set("processType", processType);
			var isValidate = procDefDataset.isValidate();
			if (isValidate != true) {
				alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.073", "校验未通过，不能保存！") + isValidate);
				return false;
			}
			var command = new L5.Command(
					"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
			command.setParameter("procDef",procDefDataset.getCurrent().toBean(
					"org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"));
			command.execute("saveas");
			if (!command.error) {
				alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.080", "成功另存为新流程！"));
				var procDefUniqueIdSaveAs = command.getReturn("procDefUniqueId");
				record.set("id", procDefUniqueIdSaveAs);
				record.set("isRelease", "0");
				
			} else {
				alert(command.error);
			}
		} else {
			return false;
		}
	}else{
		//流程定义ID和名称都做了修改但是流程定义ID出现重复需要系统修改
		if(sysAutoSet =="1"){
			getIframeWindow("procEditor").changeProcDefId();
		}
		var procDefId = getIframeWindow("procEditor").getProcDefId();
		var procDefName = getIframeWindow("procEditor").getProcDefName();
		 
		var modelContent = getIframeWindow("procEditor").getModelContent();
		var extensionContent = getIframeWindow("procEditor").getExtensionContent();
		var pluginType = document.getElementById('pluginType').value;
		var processType = document.getElementById('processType').value;
		var procSpec = getIframeWindow("procEditor").getProcSpec();

		record.set("procDefId", procDefId);
		record.set("procDefName", procDefName);
		record.set("modelContent", modelContent);
		record.set("extensionContent", extensionContent);
		record.set("procSpec", procSpec);
		record.set("pluginType", pluginType);
		record.set("processType", processType);
		var isValidate = procDefDataset.isValidate();
		if (isValidate != true) {
			alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.073", "校验未通过，不能保存！") + isValidate);
			return false;
		}
		var command = new L5.Command(
				"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
		command.setParameter("procDef",procDefDataset.getCurrent().toBean(
				"org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"));
		command.execute("saveas");
		if (!command.error) {
			alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.080", "成功另存为新流程！"));
			var procDefUniqueIdSaveAs = command.getReturn("procDefUniqueId");
			procDefUniqueId=procDefUniqueIdSaveAs;
			record.set("id", procDefUniqueIdSaveAs);
			record.set("isRelease", "0");
		} else {
			alert(command.error);
		}
	}
}
function saveAsVersionPre() {
	getIframeWindow("procEditor").saveProcessPre("saveAsVersion");
}
function saveAsVersion() {
	var procDefId = getIframeWindow("procEditor").getProcDefId();
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var procDefIdOriginal = record.get("procDefId");

	if(procDefIdOriginal!=procDefId){
		var rt = confirm(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.074", "您不能修改流程定义ID，您对其的修改将无效！"));
		if(rt==false)return false;
		getIframeWindow("procEditor").updateProcDefId(procDefIdOriginal);
	}
	var procDefName = getIframeWindow("procEditor").getProcDefName();
	var modelContent = getIframeWindow("procEditor").getModelContent();
	var extensionContent = getIframeWindow("procEditor").getExtensionContent();
	var pluginType = document.getElementById('pluginType').value;
	var processType = document.getElementById('processType').value;
	var procSpec = getIframeWindow("procEditor").getProcSpec();
	record.set("procDefId", procDefIdOriginal);
	record.set("procDefName", procDefName);
	record.set("modelContent", modelContent);
	record.set("extensionContent", extensionContent);
	record.set("procSpec", procSpec);
	record.set("pluginType", pluginType);
	record.set("processType", processType);
	var isValidate = procDefDataset.isValidate();
	if (isValidate != true) {
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.073", "校验未通过，不能保存！") + isValidate);
		return false;
	}
	var command = new L5.Command(
			"org.loushang.workflow.infoprocessmodel.definition.cmd.InfoProcessDefModelCmd");
	command.setParameter("procDef",procDefDataset.getCurrent().toBean(
			"org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"));
	command.execute("saveasversion");
	if (!command.error) {
		alert(getLocaleMsg("UI.BPM.INFOPROCESSMODEL.081", "成功另存为新版本！"));
		var procDefUniqueIdSaveAs = command.getReturn("procDefUniqueId");
		record.set("id", procDefUniqueIdSaveAs);
		record.set("isRelease", "0");
	} else {
		alert(command.error);
	}
		
}
// 全屏时返回
function backToQueryPage(){
	window.returnValue="backToQueryPage";
	window.close();
}
// 非全屏时返回,跳转到流程定义查询页面
function back() {
	var procDefDataset = L5.DatasetMgr.lookup("procDefDataset");
	var record = procDefDataset.getCurrent();
	var url = "";
	if (record.get("id")!="") {
		url = 'jsp/workflow/infoprocessmodel/query.jsp?procDefName='+procDefName+'&version='+version+"&displaySourceTypes="+displaySourceTypes;
		url = encodeURI(encodeURI(url));
	} else {
		url = 'jsp/workflow/infoprocessmodel/query.jsp?displaySourceTypes='+displaySourceTypes;
	}
	var text = getLocaleMsg("UI.BPM.INFOPROCESSMODEL.027", '流程定义查询');
	L5.forward(url, text);
}