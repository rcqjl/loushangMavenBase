// 全局变量
var Grid;
// 用于记录当前展现的表格的数据类型，即当前节点的子节点类型，
// 点击树的节点时进行切换(App, Module, Function, Operation, Url)，初始值为"App"
// 提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}

function alert(msg) {
	$.dialog({
		type : "alert",
		content : msg
	});
}

$(document).ready(function() {

	// 初始化应用表格
	initTable();

	// 查询
	$("form [id^=query]").click(function() {
		// var searchVal = $(this).prev("input").val();
		var searchVal = $("#proxyPermissionName").val();
		query(searchVal);
	});
	// 表格上的“增加*”按钮
	$("button[id^=add]").bind("click", function() {
		create();
	});
	// 表格上的“删除*”按钮
	$("button[id^=batchDel]").bind("click", function() {
		del();
	});
});

function query(searchVal) {
	var url = context
			+ "/service/bsp/proxypermissionlist/querytableData?proxyPermissionName="
			+ searchVal;
	url = encodeURI(url);
	url = encodeURI(url);
	Grid.reload(url);
}
/**
 * 页面中的“增加”按钮都调用同一个函数，根据curType区分当前增加的数据类型
 */
function create() {
	var url = context + "/service/bsp/proxypermissionlist/ForCreateUserProxy";
	$.dialog({
		type : "iframe",
		url : url,
		title : L.getLocaleMessage("bsp.userproxy.014","增加委托项"),
		width : 650,
		height : 350,
		onclose : function() {
			var returnVal = this.returnValue;
			if (returnVal) {
				sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"));
				// 刷新表格
				Grid.reload();
			}
		}
	});
	$(".ui-dialog-body").css("padding", "0px");

};

/**
 * 页面中的“编辑”按钮都调用同一个函数，根据curType跳转至相应的页面
 * 
 * @param data
 */
function update(proxyPermissionName, note, proxyPermissionId) {
	var url = context
			+ "/service/bsp/proxypermissionlist/ForEditUserProxy?proxyPermissionName="
			+ proxyPermissionName + "&note=" + note + "&proxyPermissionId="
			+ proxyPermissionId + "&status=update";
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type : "iframe",
		url : url,
		title : L.getLocaleMessage("bsp.userproxy.015","编辑委托项"),
		width : 650,
		height :350,
		onclose : function() {
			var returnVal = this.returnValue;
			if (returnVal) {
				sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"));
				// 刷新表格
				Grid.reload();
			}
		}
	});
	$(".ui-dialog-body").css("padding", "0px");

}

// 添加角色
function roleproxy(data) {
	$
			.dialog({
				type : "iframe",
				url : context
						+ "/jsp/bsp/permit/pap/userproxy/roleproxy.jsp?proxypermissionId="
						+ data,
				title : L.getLocaleMessage("bsp.userproxy.019","角色委托"),
				width : 750,
				height : 440,
				onclose : function() {
				}
			});
	$(".ui-dialog-body").css("padding", "0px");
}

// 添加委托事项
function itemsproxy(data) {
	$
			.dialog({
				type : "iframe",
				url : context
						+ "/jsp/bsp/permit/pap/userproxy/itemsproxy.jsp?proxypermissionId="
						+ data,
				title : L.getLocaleMessage("bsp.userproxy.021","委托事项！"),
				width : 580,
				height : 440,
				onclose : function() {
					if (this.returnValue) {
						sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"))
					}
				}
			});
	$(".ui-dialog-body").css("padding", "0px");
}

/**
 * 页面中的“删除”按钮都调用同一个函数，后台根据curType和主键执行相应的删除操作
 */
function del() {
	var ids = [];
	var selecteds = $(":checkbox[name=checkboxlist]:checked");
	for (var i = 0; i < selecteds.length; i++) {
		ids.push(selecteds[i].value);
	}
	if (ids.length < 1) {
		alert(L.getLocaleMessage("bsp.userproxy.022","请选择要删除的记录！"));
		return false;
	}

	$.dialog({
		type : "confirm",
		content : L.getLocaleMessage("bsp.userproxy.023","确认删除选中记录?"),
		autofocus : true,
		ok : function() {
			$.ajax({
				url : context
						+ "/service/bsp/proxypermissionlist/deleteuserproxy/"
						+ ids.join(","),
				async : false,
				success : function(data) {
					sticky(L.getLocaleMessage("bsp.userproxy.033","删除成功！"));
					Grid.reload();
				},
				error : function(msg) {
					alert(msg.responseText);
				}
			});
		},
		cancel : function() {
		}
	});
};

// 渲染表格内的操作按钮
function rendBtn(data, type, full) {
	var msg1 = L.getLocaleMessage("bsp.userproxy.011","编辑");
	var msg2 = L.getLocaleMessage("bsp.userproxy.009","角色");
	var msg3 = L.getLocaleMessage("bsp.userproxy.021","委托事项");
	var editBtn = "<a href=\"javascript:update('" + full.proxyPermissionName
			+ "','" + full.note + "','" + data + "')\">" + msg1 + "</a>";
	var roleBtn = "<a href=\"javascript:roleproxy('" + data + "')\">" + msg2 + "</a>";
	var proxyBtn = "<a href=\"javascript:itemsproxy('" + data + "')\">" + msg3 + "</a>";
	return editBtn + "&nbsp;&nbsp;&nbsp;" + roleBtn + "&nbsp;&nbsp;&nbsp;"
			+ proxyBtn;
}

function initTable() {
	var options = {
		ordering : false
	};

	var url = context + "/service/bsp/proxypermissionlist/querytableData";
	Grid = new L.FlexGrid("ProxyPermissionList", url);
	Grid.init(options);
}

function rendercheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" title="' + data
			+ '" id="checkbox" name="checkboxlist"/>';
}

function saveproxy() {
	$("#addModal").modal("hide");

	var url = context + "/service/bsp/proxypremissionlist/adduserproxy";

	$("#Form").ajaxSubmit({
		type : "post",
		url : url,
		error : function() {
			alert(L.getLocaleMessage("bsp.userproxy.034","保存失败！"));
		},
		success : function() {
			sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"));
			Grid.reload();
		}
	});
}