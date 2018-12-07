<!DOCTYPE html >
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
<title>页面属性</title>
<l:link path="css/form.css,css/ui.css"></l:link>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/help.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cportal/builder/skin/css/dialog.css">
<style type="text/css">
	.ui-dialog-grid{
		padding-left:0px;
	}
</style>
<l:script path="jquery.js,form.js"></l:script>
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
					<li><label for="pageName">
					<spring:message code="cportal.page.name" text="页面名称"/>
					</label><input type="text" id="pageName" maxlength="100" name="页面名称" class="cfIsRequired"></input></li>				
					<li><input type="checkbox" checked="checked" id="createId" name="createId" style="display:inline;"></input>
					<label for="createId" style="display:inline;"><spring:message code="cportal.autoId" text="自动生成ID"/></label></li>				
					<li><label for="pageId">
					<spring:message code="cportal.page.id" text="页面定义ID"/>
					</label><input type="text" id="pageId" maxlength="30" name="页面定义ID" class="cfIsRequired cfNotStartWithNum"></input></li>				
				    <li><div><label for="description">
				    <spring:message code="cportal.page.description" text="页面描述"/>
				    </label></div><textarea  id="description" maxlength="100" name="页面描述" style="width:200px" rows="3"></textarea></li>	
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cportalhelp-confirmbtn">
			<spring:message code="cportal.confirm" text="确定"/></a>
	</div>
</body>
<script>
$(function() {
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;
	CPHelp.setCreateId(obj.isCreateId, 'createId', $('#pageName'), $('#pageId'), 'blur');
	if(obj.pageId){
		$("#pageId").val(obj.pageId);
	}
	
	if(obj.pageName){
		$("#pageName").val(obj.pageName);
	}
	if(obj.description){
		$("#description").val(obj.description);
	}
	// 如果当前状态是修改，则不可修改页面定义ID
	if(obj.curState == "1"){
		$("#createId").removeAttr("checked").parent("li").hide();
		$("#pageId").attr("disabled","disabled");
	}
	
	// 保存页面属性信息
	function savePage(){
		// 页面定义ID
		var pageId = $("#pageId").val();
		// 页面名称
		var pageName = $("#pageName").val();
		//页面描述
		var description=$("#description").val();
		var obj=new Object();

		obj.pageId=pageId;
		obj.pageName=pageName;
		obj.description=description;
		// 关闭弹出框
		closeDialog(obj);
	}
	
	// “确定”按钮点击事件
	$("#confirmBtn").click(function(){
		var pageId = $("#pageId").val();
		var pageName = $("#pageName").val();
		if(pageName.length<100){
			var reg = /^[\u4E00-\u9FA5A-Za-z0-9_\s]+$/;
			if(!reg.test(pageName)){
			$.dialog({
				autofocus:true,
				type : "alert",
				content : L.getLocaleMessage("tip-nametip","中文、字母、数字、下划线")
			});
			return
			}
		}else{
			$.dialog({
				autofocus:true,
				type : "alert",
				content : L.getLocaleMessage("tip-Maximum100","最大值100个字符")
			});
			return
		}
		// 新增状态
		if(obj.curState == "0"){
			$.ajax({
				url : "<%=request.getContextPath()%>/service/cportal/pages/isExit",
				async : false,
				data : "pageId="+pageId,
				type : "POST",
				success: function(options, success, response){
					var isExit = response.responseText;
					if(isExit == "true"){
						$.dialog({
							autofocus:true,
							type : "alert",
							content : L.getLocaleMessage("tip-idexists","ID已存在 ！")
						});
						return;
					}else{
						savePage();
					}
				},
			});
		}else{
			savePage();
		}
	});
});

</script>
</html>