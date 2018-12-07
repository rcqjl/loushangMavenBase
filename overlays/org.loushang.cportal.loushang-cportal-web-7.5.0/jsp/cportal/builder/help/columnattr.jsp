<!DOCTYPE html > 
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>列属性</title>
		<l:link path="css/form.css,css/ui.css"></l:link>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/help.css" />
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
		.ui-dialog-grid{
			padding-left:0px;
		}
		</style>
		<l:script path="jquery.js,form.js"></l:script>
		<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.help.js"></script>
		<script src="<%=request.getContextPath()%>/jsp/cportal/builder/skin/js/cportal.showdialog.js"></script>
	</head>
	<body>
		<div id="fieldDiv">
			<ul id="columnUl">
			</ul>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cportalhelp-confirmbtn">
			<spring:message code="cportal.confirm" text="确定"/>
			</a>
		</div>
	</body>
	<script type="text/javascript">
	$(function() {
		// 从父窗口传递来的值
		var obj = window.parent.document.getElementById("popupFrame").inParam;
		for ( var i in obj) {
			var wid = obj[i];
			var li = "<li><label>"+L.getLocaleMessage("cportal.the","第")+" "+i+" "+L.getLocaleMessage("cportal.strow","列：")+"</label>"
					+"<input id='w'"+i+" name='"+L.getLocaleMessage("cportal.the","第")+" "+i+" "+L.getLocaleMessage("cportal.strow","列")+"' value='"+wid.substring(0,wid.length-1)+"' class='cfIsRequired cfIsNumber'></input>%"
					+"</li>";
			$("#columnUl").append(li);
		}
		// 点击确定按钮
		$('#confirmBtn').click(function(){
			//校验
			if(!CPHelp.validate()){
				return;
			}
			var sum = 0;
			var rtn = new Object();
			$.each($("li input"),function(i){
				rtn[i] = parseInt(this.value);
				sum += rtn[i];
			});
			if(sum != 100){
				$.dialog({
					autofocus:true,
					type : "alert",
					content : L.getLocaleMessage("tip-sum","百分比之和不等于100%！")
				});
				return;
			}
			// 关闭弹出框
			closeDialog(rtn);
		});
	});
	</script>
</html>