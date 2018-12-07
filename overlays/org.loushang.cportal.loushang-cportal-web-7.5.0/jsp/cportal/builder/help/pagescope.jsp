<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
<title>应用范围</title>
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
				<li class="ui-tabs-selected">基本属性</li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="pageScope">应用范围</label><input type="text" id="pageScope" maxlength="100" name="应用范围" class="cfIsRequired"></input></li>				
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cportalhelp-confirmbtn"></a>
	</div>
</body>
<script>
$(function() {
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;
	CPHelp.setCreateId(obj.isCreateId, 'createId', $('#pageName'), $('#pageId'), 'blur');
	
	if(obj.pageScope){
		$("#pageScope").val(obj.pageScope);
	}

	function saveForm(){
		// 应用范围
		var pageScope = $("#pageScope").val();
		
		var obj=new Object();

		obj.pageScope=pageScope;
		
		// 关闭弹出框
		closeDialog(obj);
	}
	
	$('#confirmBtn').click(function(){
		saveForm();
	});
});

</script>
</html>