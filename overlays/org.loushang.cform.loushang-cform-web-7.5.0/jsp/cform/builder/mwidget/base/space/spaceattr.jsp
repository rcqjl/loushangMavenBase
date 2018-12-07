<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.widget.spaceattr" text="占位符属性"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css" />
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
		<script type="text/javascript">
			var context = '<%=request.getContextPath()%>';			
		</script>
		<script src="<%=request.getContextPath()%>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
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
					<li style="margin-top:30px">
						<label for="spaceHeight"><s:message code="" text="高度"/>
							<input type="text" id="spaceHeight" name="高度" class="cfIsRequired cfIsNumber" style="display:inline;width:100px;"></input>
							<span>px</span>
						</label>
					</li>				
				</ul>
			</div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
		// 从父窗口传递来的值
		var fromParent = null;
		$(function(){
			// 从父窗口传递来的值
			fromParent = window.parent.document.getElementById("popupFrame").inParam;
			
			initPage(fromParent);

			/**
			* 确定按钮处理
			*/
			$('#confirmBtn').click(function(){
				//校验
				if(!CFHelp.validate()){
					return;
				}
				// 点位符高度
				var spaceHeight = $("#spaceHeight").val();
				
				// 返回值
				var obj = {
					spaceHeight : spaceHeight
				};
				
				// 关闭弹出框
				closeDialog(obj);
			});

			/**
			* 初始化控件的值
			*/
			function initPage(fromParent){
				if (fromParent.spaceHeight) {
					$("#spaceHeight").val(fromParent.spaceHeight);
				}
			};
		});
	</script>
</html>
