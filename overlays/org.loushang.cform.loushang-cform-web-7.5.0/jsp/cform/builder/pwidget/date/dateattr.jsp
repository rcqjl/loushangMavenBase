<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.widget.dateattr" text="日期框属性"/></title>
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
				<li><s:message code="cf.widget.dateformat" text="日期格式"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="<s:message code="cf.name" text="名称"/>" class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="ID" class="cfIsRequired cfNotStartWithNum"></input></li>				
					<li><input type="checkbox" id="currentDate" name="currentDate" style="display:inline;"/><label for="currentDate" style="display:inline;"><s:message code="cf.widget.showcurdate" text="显示当前日期"/></label></li>
				</ul>
			</div>
			<div id="formatDiv" class="ui-tabs-panel ui-tabs-hide">
				<ul style="margin-top:15px;">
					<li>
						<input type="radio" id="yy-mm-dd" name="dateFormat" value="yy-mm-dd" style="display:inline;"/><label  class="rightLabel" for="yy-mm-dd" style="display:inline;"><s:message code="cf.widget.yy-mm-dd" text="年-月-日"/></label>
					</li>
					<li>
						<input type="radio" id="yy/mm/dd" name="dateFormat" value="yy/mm/dd" style="display:inline;"/><label  class="rightLabel" for="yy/mm/dd" style="display:inline;"><s:message code="cf.widget.yy-mm-dd" text="年/月/日"/></label>
					</li>
					<li>
						<input type="radio" id="yymmdd" name="dateFormat" value="yymmdd" style="display:inline;"/><label  class="rightLabel" for="yymmdd" style="display:inline;"><s:message code="cf.widget.yymmdd" text="年月日"/></label>
					</li>
					<li>
						<input type="radio" id="customFormat" name="dateFormat" value="custom" style="display:inline;"/><label  class="rightLabel" for="customFormat" style="display:inline;"><s:message code="cf.widget.customformat" text="自定义格式"/></label>
					</li>
					<li>
						<input type="text" id="customFormatValue" name="<s:message code="cf.widget.customformat" text="自定义格式"/>"/>
					</li>
					<li style="color:#828282;line-height:20px;">
						<p><b><s:message code="" text="说明"/>：</b><br/>
						<s:message code="cf.widget.datewidgetnote" text="yy代表年;mm代表月;dd代表日"/></p>
					</li>
				</ul>
			
			</div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
<script>
//从父窗口传递来的值
var fromParent=null;
$(function() {
	// 从父窗口传递来的值
	fromParent = window.parent.document.getElementById("popupFrame").inParam;
	
	CFHelp.setCreateId(fromParent.isCreateId, 'createId', $('#fieldName'), $('#fieldId'), 'blur');

	initPage(fromParent);

	$('#confirmBtn').click(function(){
		//校验
		if(!CFHelp.validate()){
			return;
		}
		if($("#customFormat").is(":checked")){
			var custVal = $("#customFormatValue");
			if(!$.trim(custVal.val())){
				cfalert(L.getLocaleMessage("cf.widget.customformatnull", "域[自定义格式]不能为空！"));
				// 焦点定位
				custVal.focus();
				return false;
			}
		}
		
		// 域ID
		var fieldId = $("#fieldId").val();
		// 域名称
		var fieldName = $("#fieldName").val();

		// 日期时间格式
		var format = $(':input[name=dateFormat]:checked').val();
		if(format == 'custom'){
			format = $('#customFormatValue').val();
		}

		//是否自动生成ID
		var isCreateId = $('#createId').is(':checked') ? '1' : '0';

		// 返回值
		var obj = new Object();
		obj.fieldId = fieldId;
		obj.fieldName = fieldName;
		obj.format = format;
		obj.isCreateId = isCreateId;

		if($("#currentDate").is(':checked')){
			obj.dataBindType = 'curDate';
		}
		// 关闭弹出框
		closeDialog(obj);
	});

	function initPage(fromParent){
		if (fromParent.fieldId) {
			$("#fieldId").val(fromParent.fieldId);
		}

		if (fromParent.fieldName) {
			$("#fieldName").val(fromParent.fieldName);
		}

		if (fromParent.format) {
			var isCustomFormat = true;
			$(':input[name=dateFormat]').each(function(i, n){
				if($(n).val() == fromParent.format){
					$(n).attr('checked', true);
					isCustomFormat = false;
					return false;
				}
			});

			if(isCustomFormat){
				$('#customFormat').attr('checked', true);
				$('#customFormatValue').val(fromParent.format);
			}
		}

		if(fromParent.dataBindType){
			$("#currentDate").attr('checked', true);
		}
	};
});
</script>
</html>