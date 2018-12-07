<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<title>单元格布局方式</title>
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
				<li class="ui-tabs-selected"><spring:message code="cportal.setting" text="基本属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li>
						<label><spring:message code="cportal.layoutType" text="单元格布局方式"/></label>
						<select id = "layout" name = "layout">
							<option  value = "0"><spring:message code="cportal.defaultLayout" text="默认布局"/></option>
							<option  value = "1"><spring:message code="cportal.rowLayout" text="行布局"/></option>
							<option  value = "2"><spring:message code="cportal.columnLayout" text="列布局"/></option>
						</select>
					</li>				
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
	//初始页面值
	if(obj.layout){
		$("#layout").val(obj.layout);
		$.each($("option"),function(i,option){
			if($(option).val() ==obj.layout){
				
				$(option).attr({"selected" :"selected"});
			}
		});
	}
	
	// 保存页面属性信息
	function savePage(){
		
		var obj=new Object();

		obj.layout = $("option:selected").val();
		// 关闭弹出框
		closeDialog(obj);
	}
	
	// “确定”按钮点击事件
	$("#confirmBtn").click(function(){
		savePage();
	});
});

</script>
</html>