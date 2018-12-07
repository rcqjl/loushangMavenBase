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
	<style type="text/css">
		.col-xs-3  {
			width: 30%;
			margin-top:2px;
		}
		.Validform_input {
			width: 80%;
		}
		.required {
			top: 0;
		}
		textarea.form-control {
			height: 62px;
		}
	</style>
	
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js,datatables.js,prettify.js,bpm/util.js"></l:script>
	
</head>
<body>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label for="propertyKey" class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.BUSINESSPROCESSMODEL.TemplateSelect" text="模板选择"/></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input" id="selectKey">
	            <option value="0"><spring:message code="BPM.BUSINESSPROCESSMODEL.Tip19" text="普通流程建模"/></option>
				<option value="1"><spring:message code="BPM.BUSINESSPROCESSMODEL.Tip20" text="可划分阶段的流程建模"/></option>
            </select>
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
    <div class="form-group ">
    	<label class="col-xs-3 col-md-3 text-right"></label>
    	<div class="col-xs-8 col-md-8">
			<button id="ok" type="button" class="btn ue-btn-primary "><spring:message code="BPM.BUSINESSPROCESSMODEL.Confirm" text="确定"/>	</button>
			<button id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.BUSINESSPROCESSMODEL.Cancel" text="取消"/>	</button>
		</div>	
	</div>		
</form>	
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
$("#ok").click(function(){
	var value = $("#selectKey").val();
	var retu={
		flag:true,
		data:value
	};
	dialog.close(retu);
	dialog.remove();
	return false;
});

$("#undo").click(function(){
	dialog.close();
	dialog.remove();
	return false;
});
</script>
</html>