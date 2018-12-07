(function($) {
	if (typeof CFlow == "undefined") {
		CFlow = {};
	}
	CFlow.setProcDefUniqueId=function(procDefUniqueId){
		CFlow.procDefUniqueId = procDefUniqueId;
		WFlow.procDefUniqueId = procDefUniqueId;
	}
	CFlow.getProcDefUniqueId=function(){
		return CFlow.procDefUniqueId;
	}
	CFlow.getProcDefId=function(){
		return WFlow.getProcInfo().id;
	}
	CFlow.getProcDefName=function(){
		return WFlow.getProcInfo().name;
	}
	CFlow.getProcType=function(){
		return WFlow.getProcInfo().procType;
	}
	CFlow.getPluginType=function(){
		return WFlow.getProcInfo().pluginType;
	}
	CFlow.getProcSpec=function(){
		return WFlow.getProcInfo().procSpec;
	}
	CFlow.getProcModel=function(){
		return WFlow.getModelContent();
	}
	CFlow.getCFormModelContent=function(){
		return CFModel.generateModelContent();
	}
	CFlow.setSelectedId=function(selectedId){
		CFlow.selectedId=selectedId;
	}
	CFlow.getSelectedId=function(){
		return CFlow.selectedId;
	}
	CFlow.releaseModel=function(procDefUniqueIds){
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
				+ "release",
			data : {"procDefUniqueIds" : procDefUniqueIds},
			dataType:"json",
			success:function(data){
				if(data && data.success){
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D259","发布成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}else{
					showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D260","流程发布出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	CFlow.deleteModel=function(procDefUniqueIds){
		$.ajax({
			type : "POST",
			async : false,
			url : WFlow.fullWebPath + "/command/dispatcher/"
				+ "org.loushang.cform.procdef.html.cmd.ProcDefDispatcherCmd/"
				+ "delete",
			data : {"procDefUniqueIds" : procDefUniqueIds},
			dataType:"json",
			success:function(data){
				if(data && data.success){
					showDialog("alert",L.getLocaleMessage("CForm.BPM.D261","删除成功"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}else{
					showDialog("alert",data.errMessage,L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
				}
			},
			error:function(){
				showDialog("alert",L.getLocaleMessage("CForm.BPM.D262","流程删除出错"), L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
			}
		});
	}
	
	CFlow.validate=function (){
		var result=new Array();
		var activities=CFProcess.activities.childList;
		for(var n in activities){
			var activity=activities[n];
			if(activity.form){
				
			}else{
				result.push(L.getLocaleMessage("CForm.BPM.D264","环节")+":"+activity.name+L.getLocaleMessage("CForm.BPM.D263","未定义表单"));
			}
		}
		return result;
	}
	
	CFlow.getDesignerEditor = function() {
		return $(".cfdCore-Area").data("designerEditor");
	}
	CFlow.setDesignerEditor = function(element) {
		$(".cfdCore-Area").data("designerEditor", element);
	}
})(jQuery);