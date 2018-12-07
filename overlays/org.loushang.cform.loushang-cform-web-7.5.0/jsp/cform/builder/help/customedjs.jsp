<!DOCTYPE html > 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.customjs" text="自定义Js"/></title>
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/dialog.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/codemirror.css">
		<style type="text/css">
		.customedUl {
			height: 100%;
			width: 90%;
			margin: 8px auto;
			line-height: 25px;
			list-style: none;
		}
		.contentDiv {
		    border: 1px solid #e6e6e6;
		}
		.CodeMirror {
			height: 260px;
		}
		</style>
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/codemirror.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/codemirror.javascript.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/codemirror.matchbrackets.js"></script>
	</head>
	<body>
		<div class="customedJsDiv">
			<ul class="customedUl">
				<li>
					<div class="contentDiv">
						<textarea id="jscontent" name="jscontent"></textarea>
					</div>
				</li>
				<li style="color:#828282;">
					<p>
						<b><s:message code="cf.note" text="说明"/>：</b><br/>
						<s:message code="cf.bdr.customjsnote" text="自定义Js既可以定义页面加载完成后执行的逻辑，也可以定义表单数据加载完成后执行的逻辑。
						前者:直接写业务逻辑；后者:需要监听事件afterLoadFormData，示例：CForm.on('afterLoadFormData', 函数名/函数实现);"/>
					</p>
				</li>				
			</ul>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
	$(function() {
		// 从父窗口传递来的值
		var scr = window.parent.document.getElementById("popupFrame").inParam;
		$("#jscontent").val(scr);

		var highLightZone = CodeMirror.fromTextArea(
				document.getElementById("jscontent"), {
				lineNumbers: true,
	        	matchBrackets: true
			});

		// 确定按钮
		$("#confirmBtn").bind("click", function(){
			closeDialog(highLightZone.getValue());
		});
	});
</script>
</html>