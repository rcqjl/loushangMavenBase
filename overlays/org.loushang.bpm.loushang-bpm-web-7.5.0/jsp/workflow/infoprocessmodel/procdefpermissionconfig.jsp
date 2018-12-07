<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/prettify.css'/>"/>
	<style type="text/css">
		.form-group{
			margin: 0 auto;
			width: 600px;
		}
		.per-label{
			margin-top: 5px;
			float:left;
		}
		.form-select{
			float:left;
			width:240px; 
			margin-left:20px; 
			margin-right:20px;
		}
		.save-button{
			float:left;
		}
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js"></l:script>
</head>
<body>
   <div class="form-group">
        <label class="control-label per-label"><spring:message code="BPM.INFOPROCESSMODEL.PermissionsControl" text="流程定义权限控制"/></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form" id="procDefPremission"  name="procDefPremission" ></select>
        </div>
        <button id="save" type="button" class="btn ue-btn"><spring:message code="BPM.INFOPROCESSMODEL.Save" text="保存"/></button>
    </div> 
<script type="text/javascript">
$(document).ready(function(){
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PROC_DEF_PERMISSION_CONFIG");
	command.execute();
	procDefPremissionEnum = command.getData();
	
	var options = "";
	for(var i=0; i<procDefPremissionEnum.length; i++) {
		var option = "<option value='"+ procDefPremissionEnum[i].value +"'>"+ procDefPremissionEnum[i].text +"</option>";
		options += option;	
	}
	$("#procDefPremission").append(options);
	
	var cmd=new L5.Command("org.loushang.workflow.infoprocessmodel.permissionconfig.cmd.InfoProcPermissionConfigCmd");
	cmd.execute("query");
	var Id = cmd.getReturn("permissionCode");
	
	for(var i=0; i<procDefPremissionEnum.length; i++) {
		if(procDefPremissionEnum[i].value == Id) {
			$("#procDefPremission").val(Id);
			break;
		}
	}
	$("#save").click(function(){
		var permissionCode = $("#procDefPremission").val();
		cmd.execute("query");
		for(var i=0; i< procDefPremissionEnum.lenth; i++) {
			if(procDefPremissionEnum[i].value == permissionCode) {
				var permissionDesc = procDefPremissionEnum[i].text;
				break;
			}
		}		
		cmd.setParameter("permissionCode",permissionCode);
		cmd.setParameter("permissionDesc",permissionDesc);
		cmd.execute("save");
		
		try {
			var dialog = parent.dialog.get(window);
		} catch (e) {
			return;
		}
		
		if (!command.error) {
			parent.$.dialog({
	            type: 'alert',
	            content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip44",'保存数据成功！')
	        });	
		}else{
			parent.$.dialog({
	            type: 'alert',
	            content: command.error.message
	        });	
			return  false;
		}
	});
})
</script>
</body>
</html>