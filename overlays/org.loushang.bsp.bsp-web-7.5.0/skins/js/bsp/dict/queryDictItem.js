$(function() {
	var url = context + "/service/bsp/dict/queryDictItemsPaged";
	init(url);

	// 返回首页
	$("#backDict").click(function() {
		window.location.href = context + "/service/bsp/dict";
	})

	// 上级
	$("#parentDictItem").click(function() {
		// 获取parent code
		var arrLength = grid.allData.data.length;
		if (arrLength > 0) {
			var parentCode = grid.allData.data[0].parentCode;
		} else {
			var parentCode = grid.params.parentCode;
		}
		if (parentCode != null) {
			url = context + "/service/bsp/dict/parentDictItemPaged";
			grid.setParameter("dictCode", dictCode);
			grid.setParameter("itemCode", parentCode);
			grid.setParameter("inUse", "1");
			grid.reload(url);
		} else {
			window.location.href = context + "/service/bsp/dict";
		}
	})
	
	// 新增字典项
	$("#addDictItem")
			.click(
					function() {
						var msg1 = L.getLocaleMessage("bsp.dict.002", "新增");
						var msg2 = L.getLocaleMessage("bsp.dict.008", "保存成功！");
						var arrLength = grid.allData.data.length;
						if (arrLength > 0) {
							var parentCode = grid.allData.data[0].parentCode;
						} else {
							var parentCode = grid.params.parentCode;
						}
						var url = context
								+ "/service/bsp/dict/CreateOrUpdateItemPage?status=create"
								+ "&dictCode=" + dictCode + "&parentCode="+ parentCode;
						// 解决编码问题，需要执行两次转码
						url = encodeURI(url);
						url = encodeURI(url);
						$.dialog({
							type : "iframe",
							url : url,
							title : msg1,
							width : 550,
							height : 300,
							autofocus : true,
							onclose : function() {
								grid.reload();
							}
						});
					})
					
	// 批量删除
	$("#batchdelItem").click(
			function() {
				var msg1 = L.getLocaleMessage("bsp.dict.028", "确认删除选中字典项及其下级字典项吗?");
				var msg2 = L.getLocaleMessage("bsp.dict.009", "删除成功！");
				var msg3 = L.getLocaleMessage("bsp.dict.027", "请选择要删除的记录!");
				var dictItemCodeArr = getCheckBoxValue();
				if (dictItemCodeArr.length > 0) {
					$.dialog({
						autofocus : true,
						type : 'confirm',
						content : msg1,
						ok : function() {
							$.ajax({
								url : context + "/service/bsp/dict/batchDelDictItem",
								data : "dictItemCodeArr=" + dictItemCodeArr + "&dictCode=" + dictCode,
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
})

function renderLen(data,type,full){
	var tdData = "<span title='" + data + "'>"+data+"</span>";
	return tdData;
};

function rendercheckbox(data, type, full) {
	return '<input type="checkbox" value="' + full.itemCode + '" title="'
			+ full.parentCode + '" id="checkbox" name="checkboxlist"/>';
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

function renderOpt(data, type, full) {
	var msg1 = L.getLocaleMessage("bsp.dict.006", "下级");
	var msg2 = L.getLocaleMessage("bsp.dict.004", "编辑");
	var msg3 = L.getLocaleMessage("bsp.dict.003", "删除");
	return '<div>' 
		+ '<a onclick="childenItem(' + "'" + full.dictCode + "','" + full.itemCode + "'" + ')">' + msg1 + '</a>' 
		+ '<span>&nbsp;&nbsp;&nbsp;</span>'
		+ '<a onclick="dictItemUpdate(' + "'" + full.itemCode 
		+ "','" + full.itemValue + "','" + full.xh + "','" + full.note + "'" + ')">' + msg2 + '</a>' 
		+ '<span>&nbsp;&nbsp;&nbsp;</span>'
		+ '<a onclick="dictItemDel(' + "'" + full.itemCode + "'" + ')">' + msg3 + '</a>'
		+ '</div>'
}

// 删除字典项
function dictItemDel(itemCode) {
	var msg1 = L.getLocaleMessage("bsp.dict.028", "确认删除选中字典项及其下级字典项吗?");
	var msg2 = L.getLocaleMessage("bsp.dict.009", "删除成功！");
	
	$.dialog({
		type: "confirm",
		content: msg1,
	    autofocus: true,
		ok: function() {
			$.ajax({
				url : context + "/service/bsp/dict/batchDelDictItem",
				data : "dictItemCodeArr=" + itemCode+ "&dictCode=" + dictCode,
				async: false,
				type : "POST",
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

// 下级
function childenItem(dictCode, itemCode) {
	url = context + "/service/bsp/dict/queryDictItemsPaged";
	grid.setParameter("dictCode", dictCode);
	grid.setParameter("parentCode", itemCode);
	grid.setParameter("inUse", "1");
	grid.reload(url);
}

// 初始化表格
function init(url) {
	var options = {};
	grid = new L.FlexGrid("itemList", url);
	grid.setParameter("dictCode", dictCode);
	grid.setParameter("parentCode", null);
	grid.setParameter("inUse", "1");
	grid.init(options);
}

// 编辑字典项
function dictItemUpdate(itemCode, itemValue, xh, note) {
	var msg1 = L.getLocaleMessage("bsp.dict.004", "编辑");
	var msg2 = L.getLocaleMessage("bsp.dict.008", "保存成功！");
	var arrLength = grid.allData.data.length;
	if (arrLength > 0) {
		var parentCode = grid.allData.data[0].parentCode;
	} else {
		var parentCode = grid.params.parentCode;
	}
	var status = "update";
	var url = context
			+ "/service/bsp/dict/CreateOrUpdateItemPage?status=update"
			+ "&itemCode=" + itemCode + "&itemValue=" + itemValue + "&xh=" + xh
			+ "&note=" + note + "&dictCode=" + dictCode + "&parentCode" + parentCode;
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type : "iframe",
		url : url,
		title : msg1,
		width : 550,
		height : 300,
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
