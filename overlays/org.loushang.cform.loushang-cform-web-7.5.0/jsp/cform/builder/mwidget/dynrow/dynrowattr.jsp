<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
<title><s:message code="cf.bdr.drprop" text="动态行属性"/></title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
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
				<li><s:message code="cf.bdr.advancedprop" text="高级属性"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="zoneName" style="width:90px;"><s:message code="cf.name" text="名称"/></label><input type="text" id="zoneName" name="动态行名称"  maxlength="100" class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="zoneId" style="width:90px;">ID</label><input type="text" id="zoneId" name="dynrowID"  maxlength="30" class="cfIsRequired cfNotStartWithNum"></input></li>				
					<li><label for="tableCol" style="width:90px;"><s:message code="cf.widget.colnum" text="列数"/></label><input type="text" id="tableCol" name="tableCol"  size="30" value="3" maxlength="2" class="cfIsNumber"></input></li>	
				</ul>
			</div>
			<div id="advancedAttrDiv" class="ui-tabs-panel ui-tabs-hide">
				<ul>
					<li><input type="checkbox"	id="isPaging" name="isPaging" style="display:inline;"/><label class="rightLabel" for="isPaging" style="display:inline;">&nbsp;<s:message code="cf.widget.paging" text="分页"/></label></li>
					<li  style="display:none;"><s:message code="cf.widget.itmesperpages" text="每页显示条数"/><input value='3' type="text" id="pageSizeOption"/></li>
				</ul>
			</div>
	</div>
	<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
	</div>
</body>
<script>
$(function(){
	
	CFHelp.setCreateId('1', 'createId', $('#zoneName'), $('#zoneId'), 'blur');
	
	function isExistHandler(d){
		if(d == "true"){
			cfalert(L.getLocaleMessage("cf.widget.dynrowidexist", "动态行定义ID已经存在！"));
			return false;
		}else{
			//校验
			if(!CFHelp.validate()){
				return;
			}
			
			var zoneId = $("#zoneId").val();
			var zoneName = $("#zoneName").val();
			var tableCol = $("#tableCol").val();
			// 是否自动生成ID
			var isCreateId = $("#createId").is(':checked') ? '1' : '0';
			
			var obj = new Object();
			
			obj.zoneId = zoneId;
			obj.zoneName = zoneName;
			obj.isCreateId = isCreateId;
			obj.tableCol = parseInt(tableCol);
			obj.isPaging = isPaging;
			// 是否分页
			var isPaging = $("#isPaging").is(':checked') ? true : false;
			if($("#isPaging").is(":checked")){
				obj.isPaging = true;
				obj.pageSizeOption = $("#pageSizeOption").val();
			}else{
				obj.isPaging = false;
			}

			// 关闭弹出框
			closeDialog(obj);
		}
	};

	$('#confirmBtn').click(function(){
		$.ajax({
			url: "<%=request.getContextPath()%>/command/dispatcher/"
				+ "org.loushang.cform.form.cmd.FormDispatcherCmd/"
				+ "isSubFormExist",
			data: "subFormId=" + $("#zoneId").val(),
			success: isExistHandler
		});
	});
	
	$("#isPaging").click(function(){
		if($(this).is(":checked"))
			$("#pageSizeOption").parent().show();
		else{
			$("#pageSizeOption").parent().hide();
		}
	});
});

</script>
</html>