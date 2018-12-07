<!DOCTYPE html > 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><s:message code="cf.bdr.colprop" text="列属性"/></title>
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/dialog.css">
		<link rel="stylesheet" href="<l:assetcontext/>/jsp/cform/builder/skin/css/help.css" />
		<style type="text/css">
		#fieldDiv {
			height: 240px;
			padding-top: 10px;
			padding-left: 20px;
			overflow: auto;
		}
		#fieldDiv ul li{
			list-style: none;
			line-height: 30px;
		}
		#fieldDiv ul li input{
			margin-left: 10px;
			margin-right: 5px;
		}
		</style>
		<script src="<l:assetcontext/>/jsp/cform/skin/js/jquery.js"></script>
		<l:script path="i18n.js"/>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.showdialog.js"></script>
		<script src="<l:assetcontext/>/jsp/cform/builder/skin/js/cform.help.js"></script>
	</head>
	<body>
		<div id="fieldDiv">
			<ul id="columnUl">
			</ul>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
	<script type="text/javascript">
	$(function() {
		// 从父窗口传递来的值
		var obj = window.parent.document.getElementById("popupFrame").inParam;
		for ( var i in obj) {
			var wid = obj[i];
			var li = "<li><label>"+L.getLocaleMessage("cf.bdr.rownumn", "第"+i+"列", i)+":</label>"
					+ "<input id='w"+i+"' name='"+L.getLocaleMessage("cf.bdr.rownumn", "第"+i+"列", i)+"' value='' class='cfIsNumber'></input>"
					+ "<select>"
					+ 	"<option value='%'>%</option>"
					+ 	"<option value='px'>px</option>"
					+ "</select>"
					+ "</li>";
			var $li = $(li).appendTo("#columnUl");
			if(!wid || wid.indexOf("%") != -1){
				$li.find("input").val(wid.substring(0,wid.length - 1));
			}else {
				$li.find("input").val(wid.substring(0,wid.length - 2));
				$li.find("select").val("px");
			}
		}
		// 点击确定按钮
		$('#confirmBtn').click(function(){
			//校验
			if(!CFHelp.validate()){
				return;
			}
			var sum = 0;
			var rtn = new Object();
			$.each($("li"),function(i){
				var value = $(this).find("input").val();
				var type = $(this).find("select").val();
				rtn[i] = value ? value + type : null;
			});

			// 关闭弹出框
			closeDialog(rtn);
		});
	});
	</script>
</html>