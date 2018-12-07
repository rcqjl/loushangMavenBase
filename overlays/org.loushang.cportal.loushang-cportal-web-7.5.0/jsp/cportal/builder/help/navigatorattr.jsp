<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<title>导航设置</title>
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
				<li class="ui-tabs-selected"><spring:message code="cportal.setting" text="导航设置"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li class = "icon"><label for="icon">
					<spring:message code="cportal.imgurl" text="导航图片"/>
					</label><input type="text" id="icon" maxlength="100" name="导航图片"></input></li>				
					<li  class = "icon" style="color:#828282;">
					<p><spring:message code="cportal.defaultValue" text="默认值："/><br>
					/skins/skin/cportal/images/def_img_navigator.png</p>
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
	var icon = obj.icon;
	$("#icon").val(icon);
	// “确定”按钮点击事件
	$("#confirmBtn").click(function(){
		var obj = new Object();
		var def = "/skins/skin/cportal/images/def_img_navigator.png";
		var icon = $("#icon").val();
		if("" !=icon && icon!= null){
			obj.icon = icon;
		}else{
			obj.icon = def;
		};
		// 关闭弹出框
		closeDialog(obj);
	});
});

</script>
</html>