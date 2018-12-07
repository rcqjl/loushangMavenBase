<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
<title><s:message code="cf.bdr.areaattr" text="区域属性"/></title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/jsp/cform/builder/skin/js/pinyin.js"></script>
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
					<li><label for="zoneName"><s:message code="cf.name" text="名称"/></label><input type="text" id="zoneName" name="名称"  maxlength="100" ></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="zoneId">ID</label><input type="text" id="zoneId" name="ID"  maxlength="30" ></input></li>				
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
	</div>
</body>
<script>
	$(function() {
		// 从父窗口传递来的值
		var obj = window.parent.document.getElementById("popupFrame").inParam;

		CFHelp.setCreateId(obj.isCreateId, 'createId', $('#zoneName'), $('#zoneId'), 'blur');
		
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