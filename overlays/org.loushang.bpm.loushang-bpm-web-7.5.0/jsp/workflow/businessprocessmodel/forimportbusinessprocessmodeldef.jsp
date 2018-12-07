<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@page import="java.lang.*" %>
<%
	String id = request.getParameter("id");
	if (id == null)
		id = "";
%>
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
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js,datatables.js,prettify.js"></l:script>

</head>
<body>
<model:datasets>
	<model:dataset id="upLoadDataSet" cmd="org.loushang.workflow.businessprocessmodel.exchange.cmd.BusinessProcessDefImportCmd">
		<model:record fromBean="org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcessDefModel"></model:record>
	</model:dataset>
</model:datasets>
<form id="upLoadFileForm" class="form-horizontal">
   <div class="form-group">
        <label for="position" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.BUSINESSPROCESSMODEL.Tip1" text="请选择要导入的流程文件"/></label>
     	<div class="col-xs-6 col-md-6">
	         <input type="file" id="businessProcDefModelFile" class="form-control ue-form" name="businessProcDefModelFile" value="<spring:message code="BPM.BUSINESSPROCESSMODEL.Browse" text="浏览..."/>" />
	    </div>
        <button id="importProcess" type="button" class="btn ue-btn">
			<span class="fa fa-plus "></span><spring:message code="BPM.BUSINESSPROCESSMODEL.Import" text="导入"/>
		</button>
        <button id="back" type="button" class="btn ue-btn">
			<span class="fa fa-undo "></span><spring:message code="BPM.BUSINESSPROCESSMODEL.Return" text="返回"/>
		</button>
    </div> 
</form>
</body>
<script type="text/javascript">
function init() {
	upLoadDataSet.newRecord();
	$("#importProcess").click(function(){
		importProcess();
	});
	$("#back").click(function(){
		location.href="querybusinessprocessmodeldef.jsp";
	});
}

function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}
 
function importProcess(){
	if(!$("#businessProcDefModelFile").val()) {
		UIAlert(L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip2","请选择要导入的文件!"));
		return false;
	}
	
	var record = upLoadDataSet.getCurrent();
	var command=new L5.Command("org.loushang.workflow.businessprocessmodel.exchange.cmd.BusinessProcessDefImportCmd"); 
	command.setForm($("#upLoadFileForm")[0]);
    command.setParameter("upLoadViewRecord",record); 
    var flag = false;
    command.afterExecute=function(){
        if (!command.error && !flag) {	
        	var state=command.getReturn("state");
        	command.setParameter("state",state);

        	command.afterExecute=function(){
	            	if (!command.error) {	
	            		flag = true;
	            		$.dialog({
	                        type: 'alert',
	                        content: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip3","导入成功"),
	                        ok: function () {
	                        	location.href="querybusinessprocessmodeldef.jsp";	   
	                      	}
	                    });
	          		}else{
	          			UIAlert(command.error.msg);
	          		}
			            	
       		}
       		if(state=="0"){
       			var text = L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip5","确定要导入该流程？");
       		}else if(state=="1" ){
            	var text = L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip4","该流程已存在,是否要覆盖原流程");
       		}
	       	 $.dialog({
	             type: 'confirm',
	             content: text,
	             ok: function () {
	             	command.execute('importProcessDef');
	             },
	             cancel: function () {}
	         });
	       	 
	       	 
		}else{
			UIAlert(command.error.msg);
		}
    }
    command.execute('isExist');
}

</script>
</html>