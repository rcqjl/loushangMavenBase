<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.widget.radioattr" text="单选框控件属性"/></title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/help.css" />
		<link rel="stylesheet" href="<%=request.getContextPath()%>/jsp/cform/builder/skin/css/dialog.css">
		<style type="text/css">
			.bDiv {
				height : 166px;
			}
		</style>
		
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
				<li><s:message code="cf.widget.options" text="选项"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="<s:message code="cf.name" text="名称"/>" class="cfIsRequired"></input></li>
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="ID" class="cfIsRequired cfNotStartWithNum"></input></li>
				</ul>
			
			</div>
			<div id="groupAttrDiv" class="ui-tabs-panel ui-tabs-hide">
				<div class="cfgrid">
					<div class="hDiv">
						<table>
							<thead>
								<tr>
									<th class="w35"><s:message code="cf.widget.showvalue" text="显示值"/></th>
									<th class="w30"><s:message code="cf.widget.savevalue" text="保存值"/></th>
									<th class="w15"><s:message code="cf.widget.defaultvalue" text="默认选中"/></th>
									<th class="w20"><s:message code="cf.operation" text="操作"/></th>
								</tr>	
							</thead>
						</table>
					</div>
					<div class="bDiv">
						<table>	
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="foot">
			<a href="javascript:void(0);" id="confirmBtn" class="cformhelp-confirmbtn"><s:message code="cf.confirm" text="确定"/></a>
		</div>
	</body>
<script>
// 行模板，用于初始化选项和增加行
var $trTpl =  $("<tr></tr>").append(
				"<td class='w35'><input type='text' value=''/></td>" +
				"<td class='w30'><input type='text' value=''/></td>" + 
				"<td class='w15'>" +
					"<input type='radio' name='isDefaultSelected' style='display:inline;'/>" +
				"</td>" +
				"<td class='w20'>" +
					"<a href='javascript:void(0);' class='addBtn'></a>" +
					"<a href='javascript:void(0);' class='delBtn'></a>" +
				"</td>"
			);
$(function() {
	
	// 从父窗口传递来的值
	var obj = window.parent.document.getElementById("popupFrame").inParam;

	CFHelp.setCreateId(obj.isCreateId, 'createId', $('#fieldName'), $('#fieldId'), 'blur');
	initPage(obj);

	/**
	* 确定按钮处理
	*/
	$('#confirmBtn').click(function(){
		// 获取所有选项
		var options = getOptions();
		if(!options){
			return false;
		}
		
		//校验
		if(!CFHelp.validate()){
			return;
		}
		// 组ID
		var groupId = $("#fieldId").val();
		// 组名称
		var groupName = $("#fieldName").val();

		//是否自动生成ID
		var isCreateId = $('#createId').is(':checked') ? '1' : '0';

		// 返回值
		var obj = new Object();
		
		obj.groupId = groupId;
		obj.groupName = groupName;
		obj.isCreateId = isCreateId;
		obj.options = options;
		
		// 关闭弹出框
		closeDialog(obj);
	});
	
	// 初始化页面
	function initPage(obj){
		// 初始化选项值
		initOptions(obj.options);
		
		if (obj.groupId) {
			$("#fieldId").val(obj.groupId);
		}

		if (obj.groupName) {
			$("#fieldName").val(obj.groupName);
		}
	};
	
	// 初始化选项值
	function initOptions(val){
		var $tbody = $(".bDiv tbody");
		if(val) {
			var options = val.split(";");
			$.each(options, function(i,n){
				var values = n.split(":");
				var $tr = $trTpl.clone();
				var $tds = $tr.find("td");
				
				$tds.eq(0).find("input").attr("value", values[1]);
				$tds.eq(1).find("input").attr("value", values[0]);
				if(values[2]){
					$tds.eq(2).find("input").attr("checked", true);
				}
				
				$tbody.append($tr);
			});
		}else {
			$tbody.append($trTpl.clone());
		}
	};
	
	// 获取选项值
	function getOptions(){
		var $trs = $(".bDiv tbody tr");
		var s = '';
		var saveValStr = "";
		
		$trs.each(function(i, tr){
			var $tds = $("td :input", tr);
			
			// 获取保存值
			var saveVal = $.trim($tds.get(1).value);
			if(!saveVal){
				alert(L.getLocaleMessage("cf.widget.rowisnull", "第"+(i+1)+"行的保存值为空！", i));
				s = false;
				return false;
			}
			
			// 保存值重复校验
			if(saveValStr.indexOf("#"+saveVal+"#") != "-1"){
				alert(L.getLocaleMessage("cf.widget.multiplesavevalue", "保存值 ["+saveVal+"]重复！", saveVal));
				s = false;
				return false;
			} else {
				saveValStr = saveValStr + "#" + saveVal + "#";
			}
			
			// 获取显示值
			var displayVal = $.trim($tds.get(0).value);
			if(displayVal){
				s = s + saveVal + ":" + displayVal;
				if($tds.eq(2).is(':checked')){
					s += ':selected'
				}
				if(i < $trs.length - 1){
					s += ';';
				}
			}
			
		});
		
		return s;
	};
	
	// "增加"按钮
	$(".bDiv").on("click", ".addBtn", function(){
		$(this).closest("tr").after($trTpl.clone());
	});
	
	// "删除"按钮
	$(".bDiv").on("click", ".delBtn", function(){
		var $trs = $(".bDiv tbody").find("tr");
		if($trs.length == 1){
			$trs.find(":input").val("");
			$trs.find(":radio").attr("checked",false);
		}else {
			$(this).closest("tr").remove();
		}
	});

});

</script>
</html>