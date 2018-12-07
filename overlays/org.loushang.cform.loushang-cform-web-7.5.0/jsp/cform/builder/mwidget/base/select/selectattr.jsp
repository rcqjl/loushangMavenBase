<!DOCTYPE html >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
	<head>
		<title><s:message code="cf.widget.selectone" text="下拉框控件属性"/></title>
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
				<li><s:message code="cf.db" text="数据绑定"/></li>
			</ul>
			<div id="baseAttrDiv" class="ui-tabs-panel">
				<ul>
					<li><label for="fieldName"><s:message code="cf.name" text="名称"/></label><input type="text" id="fieldName" name="fieldName" class="cfIsRequired"></input></li>				
					<li><input type="checkbox" id="createId" name="createId" style="display:inline;"></input><label for="createId" style="display:inline;"><s:message code="cf.generateid" text="自动生成ID"/></label></li>				
					<li><label for="fieldId">ID</label><input type="text" id="fieldId" name="fieldId" class="cfIsRequired cfNotStartWithNum"></input></li>				
				</ul>
			</div>
			<div id="dataBindDiv" class="ui-tabs-panel ui-tabs-hide">
				<ul>
					<li>
						<input type="radio"	id="staticValueRdo" name="dataBind" value="static" style="display:inline;" checked/><label style="width: 62px;"  class="rightLabel" for="staticValueRdo" style="display:inline;"><s:message code="cf.widget.staticvalue" text="静态值"/></label>
					</li>
					<li>
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

		/**
		* 确定按钮处理
		*/
		$('#confirmBtn').click(function(){
			// 域ID
			var fieldId = $("#fieldId").val();
			// 域名称
			var fieldName = $("#fieldName").val();
			// 是否自动生成ID
			var isCreateId = $('#createId').is(':checked') ? '1' : '0';

			//校验
			if(!CFHelp.validate()){
				return;
			}

			// 返回值
			var obj = new Object();
			obj.fieldId = fieldId;
			obj.fieldName = fieldName;
			obj.isCreateId = isCreateId;
			// 静态值
			obj.staticValue = getStaticValue();			
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

			initStaticValue(fromParent.staticValue);
		};

		function initStaticValue(val){
			var $tbody = $(".bDiv tbody");
			if(val) {
				$('#staticValueRdo').attr('checked', true);
				var options = val.split(";");
				$.each(options, function(i,n){
					var values = n.split(":");
					var s = '<tr>'
						+ '<td class="w35"><input type="text" value="' + values[1] + '" /></td>' 
						+ '<td class="w30"><input type="text" value="' + values[0] + '" /></td>' ;
						if(values[2]){
							s += '<td class="w15"><input type="radio" name="isDefaultSelected" style="display:inline;" checked="true"/></td>' ;
						}else{
							s += '<td class="w15"><input type="radio" name="isDefaultSelected" style="display:inline;"/></td>' ;
						}
						
						s += '<td class="w20"><a href="javascript:void(0);" class="addBtn"></a><a href="javascript:void(0);" class="delBtn"></a></td>'
						+ '</tr>';
					$tbody.append(s);
				});
			}else {
				var tr = document.createElement("tr");
				var s = "<td class='w35'><input type='text' value=''/></td>" +
					"<td class='w30'><input type='text' value=''/></td>" + 
					"<td class='w15'><input type='radio' name='isDefaultSelected' style='display:inline;'/></td>" +
					"<td class='w20'><a href='javascript:void(0);' class='addBtn'></a>" +
					"<a href='javascript:void(0);' class='delBtn'></a></td>";
				$(tr).append(s);
				$tbody.append($(tr));
			}
		};
		
		// 增加静态值
		$(".addBtn").live("click", function(e){
			var tr = document.createElement("tr");
			var s = "<td class='w35'><input type='text' value=''/></td>" +
				"<td class='w30'><input type='text' value=''/></td>" + 
				"<td class='w15'><input type='radio' name='isDefaultSelected' style='display:inline;'/></td>" +
				"<td class='w20'><a href='javascript:void(0);' class='addBtn'></a>" +
				"<a href='javascript:void(0);' class='delBtn'></a></td>";
			$(tr).append(s);
			var $tr = $(e.target).parents("tr").eq(0);	
			$tr.after($(tr));	
		});

		$(".delBtn").live("click",delBtnHandler);
	});

	function delBtnHandler(e){
		var $tr = $(".bDiv tbody").find("tr");
		if($tr.length == 1){
			$tr.find(":input").val("");
			$tr.find(":radio").attr("checked",false);
			return;
		}
		$($(e.target).parents("tr").eq(0)).remove();
	}

	function getStaticValue(){
		var $trs = $(".bDiv tbody tr");

		var s = '';
		$.each($trs, function(i, n){
			var $tds = $("td :input", n);
			var saveVal = $.trim($tds.get(1).value);
			var displayVal = $.trim($tds.get(0).value);
			if(displayVal && saveVal){
				s = s + saveVal + ":" + displayVal;
				if($($tds.get(2)).is(':checked')){
					s += ':selected'
				}
				if(i < $trs.length - 1){
					s += ';';
				}
			}			
		});

		return s;
	}
</script>
</html>