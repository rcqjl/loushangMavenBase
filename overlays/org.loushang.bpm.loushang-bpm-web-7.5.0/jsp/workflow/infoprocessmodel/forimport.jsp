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
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js"></l:script>
</head>
<body>
<model:datasets>
	<model:dataset id="upLoadDataSet" cmd="org.loushang.workflow.infoprocessmodel.exchange.cmd.InfoProcessDefModelImportCmd">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.definition.data.InfoProcessDefModel"></model:record>
	</model:dataset>
</model:datasets>
<form id="upLoadFileForm" class="form-horizontal">
   <div class="form-group">
        <label for="position" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.INFOPROCESSMODEL.Tip22" text="请选择要导入的流程文件"/></label>
     	<div class="col-xs-6 col-md-6">
	         <input type="file" id="procDefModelFile" class="form-control ue-form" name="procDefModelFile" value="<spring:message code="BPM.INFOPROCESSMODEL.Tip23" text="浏览..."/>" />
	    </div>
        <button id="importProcess" type="button" class="btn ue-btn">
			<span class="fa fa-plus "></span><spring:message code="BPM.INFOPROCESSMODEL.Import" text="导入"/>
		</button>
        <button id="back" type="button" class="btn ue-btn">
			<span class="fa fa-undo "></span><spring:message code="BPM.INFOPROCESSMODEL.Return" text="返回"/>
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
		location.href="query.jsp";
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
	if(!$("#procDefModelFile").val()) {
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip22","请选择要导入的文件!"));
		return false;
	}
	
	var record = upLoadDataSet.getCurrent();
	var command=new L5.Command("org.loushang.workflow.infoprocessmodel.exchange.cmd.InfoProcessDefModelImportCmd"); 
	command.setForm($("#upLoadFileForm")[0]);
    command.setParameter("upLoadViewRecord",record); 
    var flag = false;
    command.afterExecute=function(){
    	
        if (!command.error && !flag) {	
        	var state=command.getReturn("state");
        	command.setParameter("state",state);
            if(state=="0"){
            	command.execute('importProcessDef');
            	if (!command.error) {	
            		flag = true;
            		//UIAlert("导入成功！");  
            		//location.href="query.jsp";
            		$.dialog({
                        type: 'alert',
                        content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip24","导入成功"),
                        ok: function () {
                        	location.href="query.jsp";	   
                      	}
                    });
          		}else{
          			UIAlert(command.error.msg);
          		}
            	
            }else if(state=="1" || state=="2"){
            	var text = L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip25","该流程已存在,是否要覆盖原流程");
            	if (state=="2"){
            		text = L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip26","该流程已存在且已发布,是否要覆盖原流程");
            	}
                $.dialog({
                    type: 'confirm',
                    content: text,
                    ok: function () {
                    	command.execute('importProcessDef');
                    	if (!command.error) {
                    		flag = true;
                    		$.dialog({
                                type: 'alert',
                                content: L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip24","导入成功"),
                                ok: function () {
                                	location.href="query.jsp";	   
                              	}
                            });
                  		}else{
                  			UIAlert(command.error.msg);
                  		}
                    },
                    cancel: function () {}
                });
            }
		}else{
			UIAlert(command.error.msg);
		}
    }
    command.execute('isExist');
}

</script>
</html>