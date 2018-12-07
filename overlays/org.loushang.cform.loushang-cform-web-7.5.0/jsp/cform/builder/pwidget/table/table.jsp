<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<html>
<head>
<title>表格属性</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/cform.help.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
</head>
<body>
	<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected"><s:message code="cf.bdr.basicprop" text="基本属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="tableRow">行数</label><input type="text" id="tableRow" name="行数" value="4" maxlength="2" class="cfIsRequired cfIsNumber"></input></li>				
					<li><label for="tableCol">列数</label><input type="text" id="tableCol" name="列数" value="4" maxlength="2" class="cfIsRequired cfIsNumber"></input></li>				
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
	</div>
</body>
<script>
$(function(){
	$('#confirmBtn').click(function(){
		var tableRow = $("#tableRow").val();
		var tableCol = $("#tableCol").val();

		//校验
		if(!CFHelp.validate()){
			return;
		}
		
		var obj = new Object();
		obj.tableRow = parseInt(tableRow);
		obj.tableCol = parseInt(tableCol);

		// 关闭弹出框
		closeDialog(obj);
	});
});
</script>
</html>