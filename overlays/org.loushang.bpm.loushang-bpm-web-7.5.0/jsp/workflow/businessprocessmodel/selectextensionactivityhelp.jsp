<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%
	String id = (String)request.getParameter("id");
%>
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
<model:datasets>
	<model:dataset id="actDefDataset" cmd="org.loushang.workflow.businessprocessmodel.definition.cmd.BusinessProcessDefModelQueryCmd" method="getProcActivities">
		<model:record  fromBean="org.loushang.workflow.businessprocessmodel.definition.data.BusinessProcActivityDef"></model:record>
	</model:dataset>
</model:datasets>

<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.BUSINESSPROCESSMODEL.Tip18" text="高层环节"/></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input" id="selectAct">
            </select>
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
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
    <div class="form-group">
        <label class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.BUSINESSPROCESSMODEL.SetLeaf" text="设置为末级"/></label>
        <div class="col-xs-8 col-md-8">
            <input type="checkbox" id="setLeaf" />
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
function set(){
	var data = actDefDataset.data;
	if(data instanceof Array){
		var options = "";
		for(var i=0;i<data.length;i++) {
			var option = "<option value='"+data[i].actDefId+"'>"+ data[i].actDefName +"</option>";
			options += option;	
		} 
		$("#selectAct").append(options);
		clearInterval(interval);
	}
}

function init() {
	var id = '<%=id%>';
	actDefDataset.baseParams = {"start":0,"limit":100, "id":id};
	actDefDataset.load();
	interval=setInterval(set,50);
 
}

var dialog = parent.dialog.get(window);
$("#ok").click(function(){
	var setLeafProc;
	if($("#setLeaf").is(":checked")){
		setLeafProc= '1';
	}else{
		setLeafProc='0';
	}
	
	var actDefId = $("#selectAct").val();
	if(!actDefId){
		parent.$.dialog({
            type: 'alert',
            content: L.getLocaleMessage("BPM.BUSINESSPROCESSMODEL.Tip21",'请选择要细化的环节！'),
        });	
		return false;
	}
	var templateType = $("#selectKey").val();
	var retu={
		flag:true,
		actDefId:actDefId,
		setLeafProc:setLeafProc,
		templateType:templateType
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