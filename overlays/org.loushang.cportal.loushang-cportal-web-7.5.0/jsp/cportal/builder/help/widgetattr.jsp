<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<title>微件属性</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/help.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/dialog.css">
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/pinyin.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.showdialog.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.help.js"></script>
</head>
<body>
	<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected">
				<spring:message code="cportal.setting" text="选择类别"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
					<label><spring:message code="cportal.typeAllowed" text="页面可显示的类别"/></label>			
				<ul id="allType" style = "height:180px;overflow:auto;margin-top: 10px;">
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cportalhelp-confirmbtn">
			<spring:message code="cportal.confirm" text="确定"/>
			</a>
	</div>
</body>
<script>
$(function() {
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;
	var allType = obj.allType
	for(i in allType){
		var widgetType = allType[i];
		var typeTpl = '<li><input type="checkbox" id="'+widgetType.id+'" name="isType" style="display:inline;"></input><label for="'+widgetType.id+'" style="display:inline;">'+widgetType.name+'</label></li>'
		$("#allType").append(typeTpl);
	}
	var isType = obj.isType;
	if(isType != null){
		if(isType != ""){
			for(i in isType){
				$("#"+isType[i]).attr("checked","checked");
			}
		}
	}else{
		$("input[type=checkbox]").attr("checked","checked");
	}
	// “确定”按钮点击事件
	$("#confirmBtn").click(function(){
		var arr = [];
		var istype = $(":checked");
		istype.each(function(){
			arr.push(this.id);
		});
		// 关闭弹出框
		closeDialog(arr);
	});
});

</script>
</html>