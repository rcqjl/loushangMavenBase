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
		delselected();
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
 * 页面中的“增加”按钮
 */
function create() {
	var url = context + "/service/bsp/userproxylist/ForCreateUserProxy?status=create";
	url=encodeURI(encodeURI(url));
	window.location.href = url;
	

};

/**
 * 页面中的“编辑”按钮
 * 
 * @param data
 */
function update( proxyUserId, proxyPermissionName,startTime,endTime,proxyType,proxyPermissionId,proxyUserName) {
	var url = context+ "/service/bsp/userproxylist/ForEditUserProxy?proxyUserId="
	+  proxyUserId + "&proxyUserName=" + proxyUserName + "&proxyPermissionName=" + proxyPermissionName + "&proxyPermissionId="
	+ proxyPermissionId +"&startTime="+startTime+"&endTime=" +endTime+"&proxyType=" +proxyType+ "&status=edit";
	url = encodeURI(url);
	url = encodeURI(url);
	window.location.href = url;

}

/**
 * 页面中的“批量删除”按钮
 */
function delselected(proxyType,proxyUserId) {
	var ids = [];
	if(proxyType) {
		ids.push(proxyType+";"+proxyUserId);
	} else {
		var selecteds = $(":checkbox[name=checkboxlist]:checked");
		
		for (var i = 0; i < selecteds.length; i++) {
			ids.push(selecteds[i].value);
		}
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
						+ "/service/bsp/userproxylist/deleteuserproxy/",
				async : false,
				data: "ids=" + ids.join(","),
				type: "post",
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


function del(proxyType,proxyUserId) {
	var ids = [];
	if(proxyType) {
		ids.push(proxyType+";"+proxyUserId);
	} else {
		var selecteds = $(":checkbox[name=checkboxlist]:checked");
		
		for (var i = 0; i < selecteds.length; i++) {
			ids.push(selecteds[i].value);
		}
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
						+ "/service/bsp/userproxylist/deleteuserproxy/",
				async : false,
				data: "ids=" + ids.join(","),
				type: "post",
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
	var msg2 = L.getLocaleMessage("bsp.userproxy.004","删除");
	var editBtn = "<a href=\"javascript:update('" + full.proxyUserId + "','" + full.proxyPermissionName + "','" + full.startTime +"','" + full.endTime +"','" + full.proxyType + "','"+ data +"','"+ full.proxyUserName +"')\">" + msg1 + "</a>";
	var delBtn = "<a href=\"javascript:del('" + full.proxyType + "','"  + full.proxyUserId +"')\">" + msg2 + "</a>";
	return editBtn + "&nbsp;&nbsp;&nbsp;" + delBtn ;
}

function initTable() {
	var options = {
		ordering : false
	};

	var url = context + "/service/bsp/userproxylist/querytableData";
	Grid = new L.FlexGrid("UserProxyList", url);
	Grid.init(options);
}

function rendercheckbox(data, type, full) {
	return '<input type="checkbox" value="' + full.proxyType+';'+full.proxyUserId + '" title="' + data
			+ '" id="checkbox" name="checkboxlist"/>';
}

