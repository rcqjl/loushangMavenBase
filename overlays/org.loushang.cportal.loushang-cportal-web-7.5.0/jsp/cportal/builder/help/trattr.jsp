<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
<title>行属性</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/help.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/dialog.css">
<script src="<%=request.getContextPath()%>/jsp/cportal/skin/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/pinyin.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.help.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.showdialog.js"></script>
</head>
<body>
	<div class="ui-tabs">
			<ul class="ui-tabs-nav">
				<li class="ui-tabs-selected">基本属性</li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="zoneName">行名称</label><input type="text" id="zoneName" maxlength="100" name="zoneName"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;">自动生成ID</label></li>				
					<li><label for="zoneId">行定义ID</label><input type="text" id="zoneId" maxlength="30" name="zoneId"></input></li>				
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

		CPHelp.setCreateId(obj.isCreateId, 'createId', $('#zoneName'), $('#zoneId'), 'blur');
		
		if (obj.zoneId) {
			$("#zoneId").val(obj.zoneId);
		}

		if (obj.zoneName) {
			$("#zoneName").val(obj.zoneName);
		}

		$('#confirmBtn').click(function(){
			// 区域ID
			var zoneId = $("#zoneId").val();
			// 区域名称
			var zoneName = $("#zoneName").val();

			//是否自动生成ID
			var isCreateId = $('#createId').is(':checked') ? '1' : '0';

			// 返回值
			var obj = new Object();
			obj.zoneId = zoneId;
			obj.zoneName = zoneName;
			obj.isCreateId = isCreateId;

			// 关闭弹出框
			closeDialog(obj);
		});
	});
</script>
</html>