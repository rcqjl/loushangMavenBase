$(function() {
	var url = context + "/service/bsp/dict/getAllDicts";
	init(url);
	$("#query").click(function() {
		var dictName = $("#dictName").val();
		queryDict(dictName);
	});
	
	//批量删除字典
	$("#batchDelDict").click(function() {
		var msg1 = L.getLocaleMessage("bsp.dict.028", "确认删除选中字典及其下级字典项吗?");
		var msg2 = L.getLocaleMessage("bsp.dict.009", "删除成功！");
		var msg3 = L.getLocaleMessage("bsp.dict.027", "请选择要删除的记录!");
		var dictCodeArr = getCheckBoxValue();
		if (dictCodeArr.length > 0) {
			$.dialog({
				autofocus : true,
				type : 'confirm',
				content : msg1,
				ok : function() {
					$.ajax({
						url : context + "/service/bsp/dict/batchDelDict",
						data : "dictCodeArr=" + dictCodeArr,
						type : "POST",
						async: false,
						success : function() {
							sticky(msg2);
							grid.reload();
						}
					});
				},
				cancel : function() {
				}
			});

		} else {
			$.dialog({
				autofocus : true,
				type : "alert",
				content : msg3
			});
			return;
		}
	});
	// checkbox全选
	$("#selectAll").click(function() {
		selectAll(this.checked);
	});

	// 新建字典
	$("#addDict").click(
			function() {
				var msg1 = L.getLocaleMessage("bsp.dict.002", "新增");
				var msg2 = L.getLocaleMessage("bsp.dict.008", "保存成功！");
				var url = context
						+ "/service/bsp/dict/CreateOrUpdatePage?status=create";
				// 解决编码问题，需要执行两次转码
				url = encodeURI(url);
				url = encodeURI(url);
				$.dialog({
					type : "iframe",
					url : url,
					title : msg1,
					width : 550,
					height : 230,
					autofocus : true,
					onclose : function() {
						grid.reload();
					}
				});
			});
});

function renderLen(data,type,full){
	var tdData = "<span title='" + data + "'>"+data+"</span>";
	return tdData;
};

function rendercheckbox(data, type, full) {
	return '<input type="checkbox" value="' + full.dictCode + '" title="'
			+ full.dictCode + '" id="checkbox" name="checkboxlist"/>';
}

// checkbox全选
function selectAll(checked) {
	$(":checkbox[name=checkboxlist]").prop("checked", checked);
}

// 获取选中的复选框中的值
function getCheckBoxValue() {
	var idArr = new Array();
	$(":checkbox[name=checkboxlist]:checked").each(function() {
		idArr.push(this.value);
	});

	return idArr;
}

// 条件查询角色信息
function queryDict(dictName) {
	url = context + "/service/bsp/dict/getAllDicts";
	grid.setParameter("dictName", dictName);
	grid.reload(url);
}

function renderOpt(data, type, full) {
	var msg1 = L.getLocaleMessage("bsp.dict.029", "字典项");
	var msg2 = L.getLocaleMessage("bsp.dict.004", "编辑");
	var msg3 = L.getLocaleMessage("bsp.dict.003", "删除");
	return '<div>' + '<a onclick="dictItem(' + "'" + full.dictCode + "'"
			+ ')">' + msg1 + '</a>' + '<span>&nbsp;&nbsp;&nbsp;</span>'
			+ '<a onclick="dictUpdate(' + "'" + full.dictCode + "','"
			+ full.dictName + "','" + full.note + "'" + ')">' + msg2 + '</a>'
			+ '<span>&nbsp;&nbsp;&nbsp;</span>' + '<a onclick="dictDel(' + "'"
			+ full.dictCode + "'" + ')">' + msg3 + '</a></div>'
}

// 删除字典
function dictDel(dictCode) {
	var msg1 = L.getLocaleMessage("bsp.dict.028", "确认删除选中字典及其下级字典项吗?");
	var msg2 = L.getLocaleMessage("bsp.dict.009", "删除成功！");
	
	$.dialog({
		type: "confirm",
		content: msg1,
	    autofocus: true,
		ok: function() {
			$.ajax({
				url : context + "/service/bsp/dict/batchDelDict",
				data : "dictCodeArr=" + dictCode,
				type : "POST",
				async: false,
				success : function() {
					sticky(msg2);
					grid.reload();
				},
				error: function(msg) {
					alert(msg.responseText);
				}
			});
		},
		cancel: function(){}
	});
}

function dictItem(dictCode) {
	window.location.href = context
	+ "/service/bsp/dict/dictItemPage?dictCode=" + dictCode;
}

// 初始化表格
function init(url) {
	var options = {};
	grid = new L.FlexGrid("dictList", url);
	grid.setParameter("inUse", "1");
	grid.init(options);
}

// 编辑字典
function dictUpdate(dictCode, dictName, note) {
	var msg1 = L.getLocaleMessage("bsp.dict.004", "编辑");
	var msg2 = L.getLocaleMessage("bsp.dict.008", "保存成功！");
	var status = "update";
	var url = context + "/service/bsp/dict/CreateOrUpdatePage?status=update"
			+ "&dictCode=" + dictCode + "&dictName=" + dictName + "&note="
			+ note;
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type : "iframe",
		url : url,
		title : msg1,
		width : 550,
		height : 230,
		autofocus : true,
		onclose : function() {
			grid.reload();
		}
	});

}
// 自动消失提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}