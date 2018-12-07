<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%
	String formPartRule = request.getParameter("formPartRule");
%>
<html>
<head>
		
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<style type="text/css">
		.bootstrap-duallistbox-container option {
			overflow-x: hidden;
			text-overflow: ellipsis;
		    white-space: nowrap;
		}
		.form-control {
			table-layout:fixed;
		}
		.box1, .box2 {
		    width: 45%;
		    float: left;
     	    padding-left: 22px;
     	    padding-right: 20px;
		}
		.row {
		    width: 780px;
		    padding: 0;
		    margin: 0;
		}
		@media screen and (max-width: 800px){
			.row{
				width: 800;
				padding: 0;
			}
		}
		.addClass{
			margin-left: 22px;
		}
		.btn{
			margin-top: 20px;
		}
		.bootstrap-duallistbox-container .btn-box {
			margin-top: 45px;
		}
	</style>

	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"></l:script>
	<script type="text/javascript">
		var formPartRule = "<%=formPartRule %>";
	</script>

</head>
<body>
<model:datasets>
	<model:dataset id="partUrlDefDataset" cmd="org.loushang.workflow.infoprocessmodel.parturldef.cmd.PartUrlQueryDefCmd">
		<model:record fromBean="org.loushang.workflow.infoprocessmodel.parturldef.data.PartUrlDef"></model:record>
	</model:dataset>	
</model:datasets>
	<div>
		<select multiple="multiple" size="10" name="doublebox" class="demo"></select>
	</div>
    <div class="i-dialog-button addClass">
		<button id="save" type="button" class="btn ue-btn-primary"><spring:message code="BPM.INFOPROCESSMODEL.Confirm" text="确定"/></button>
		<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.INFOPROCESSMODEL.Cancel" text="取消"/></button>	
	</div>
<script type="text/javascript">
$(document).ready(function(){
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "PART_RULE");
	command.execute();
	partRuleEnum = command.getData();
	if(formPartRule){
		var arr = new Array();
		arr = formPartRule.split(",");
		var left = '[';
		var right = '[';
		for(var i = 0; i <partRuleEnum.length; i++){
			var flag = false;
			for(var j = 0; j <arr.length; j++){
				if(partRuleEnum[i].value == arr[j]){
					flag = true;
					right += '{"value":"'+ arr[j] +'","text":"'+partRuleEnum[i].text + '"}';
						right += ',';
					break;
				}
			}
			if(!flag){
				left += '{"value":"'+partRuleEnum[i].value+'","text":"'+partRuleEnum[i].text+'"}';
					left += ',';
				flag=false;
			}
		}
		if(right.length>1){
			right=right.substring(0,right.length-1);
		}
		right += ']';
		if(left.length>1){
			left=left.substring(0,left.length-1);
		}
		left += ']';
	}

		
//	alert(text);
 	 demo2 = $('.demo').doublebox({
	    nonSelectedListLabel: L.getLocaleMessage("BPM.INFOPROCESSMODEL.OptionalParticipants",'可选参与者'),
	    selectedListLabel: L.getLocaleMessage("BPM.INFOPROCESSMODEL.SelectedParticipants",'已选参与者'),
	    preserveSelectionOnMove: 'moved',
	    moveOnSelect: false,
	    nonSelectedList:$.parseJSON(left),
	    selectedList:$.parseJSON(right),
	    optionValue:"value",
	    optionText:"text",
	    doubleMove:true,
	    //filterPlaceHolder: "搜索参与者"
	    showFilterInputs: false
	}); 
})

$("#save").click(function(){
	var dialog = parent.dialog.get(window);
	/* var returnValue= $("#bootstrap-duallistbox-selected-list_doublebox>option").map(function(){
		return $(this).val();
	}).get().join(",");  */
	var returnValue = demo2.getSelectedOptions();
	if(returnValue){
		dialog.close(returnValue);
	}else{
		UIAlert(L.getLocaleMessage("BPM.INFOPROCESSMODEL.Tip33","参与者规则不能为空！"));
	}
});
$("#undo").click(function(){
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
});
function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}
</script>
</body>
</html>