var dialog = parent.dialog.get(window);

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
	//取消
	$("#cancel").click(function() {
		dialog.remove();
	});
	$("#note").val(note);
	$("#Form").Validform({
		btnSubmit : "#saveVal",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback : function(form) {
			saveVal();
			// 解决使用回车键时表单提交两次的问题
			$("#Form").resetForm();
		}

	});
});

function saveVal() {

	var url = context + "/service/bsp/proxypermissionlist/adduserproxy";
	if (status == "update")
		var url = context + "/service/bsp/proxypermissionlist/updateuserproxy/"
				+ proxyPermissionId;

	$("#Form").ajaxSubmit({
		type : "post",
		url : url,
		error : function() {
			alert(L.getLocaleMessage("bsp.userproxy.034","保存失败"));
		},
		success : function() {
			dialog.close(true);// 关闭后会重新刷新页面
			dialog.remove();
			return false;
		}
	});
	return false;
}