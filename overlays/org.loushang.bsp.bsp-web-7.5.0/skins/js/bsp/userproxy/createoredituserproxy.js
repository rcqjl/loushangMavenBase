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

$(function() {
	//取消
	$("#cancel").click(function() {
		
		window.location.href = context + "/service/bsp/userproxylist";
	});
	$("#userProxyForm").Validform({
		btnSubmit : "#saveVal",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback : function(form) {
			saveVal();
		}

	});
	if(status=="create") {	
		createUserProxy();
	}
	if(status=="edit") {
		editUserProxy();	
	}
	
	
});

function createUserProxy(){
	
	$("#btn").removeAttr("disabled");
	$("#proxyPermissionId").show();
	
	$.ajax({
		url : context + "/service/bsp/userproxylist/selectproxypermission",
		async : false,
		success : function(data) {
			if(data.length < 1) 
				return;
			
			for (var i = 0; i < data.length; i++) {
				var option = "<option value='" + data[i]["proxyPermissionId"] + "'>" + data[i]["proxyPermissionName"] + "</option>";
				$("#proxyPermissionId").append(option);
			}
		
		},
		error : function(e) {
			alert(e.responseText);
		}
	})
	$(".select-principal, .select-emp").click(function(e) {
		selectProxy();
	});
	
}

function editUserProxy(){

	$("#tip").text(L.getLocaleMessage("bsp.userproxy.008","编辑"));
	if(proxyType=="0")
		$("#editproxyPermissionName").val(L.getLocaleMessage("bsp.userproxy.038","全代理"));
	$("#btn").css("disabled","disabled");
	$("#editproxyPermissionName").show();
	
}

// 选择代理人
function selectProxy() {
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/userselhelp?isChkbox=0&selType=8&struType=00",
		title : L.getLocaleMessage("bsp.userproxy.027","选择代理人"),
		width : 750,
		height : 470,
		onclose : function() {
			var nodes = this.returnValue;
			if(!nodes)
				return;
			
			if (nodes.length > 0) {
				
					$("#proxyUserName").val(nodes[1]);
					$("#proxyUserId").val(nodes[0]);
				
			}else{
				
					$("#proxyUserName").val("");
					$("#proxyUserId").val("");
				
			}
		}
	});

	$(".ui-dialog-body").css("padding","0px");
}

//保存组织项
function saveVal() {
	if (status == "create"){
		var url = context + "/service/bsp/userproxylist/adduserproxy";
	}
	if (status == "edit") {
		
		url = context + "/service/bsp/userproxylist/updateuserproxy";
	}

	if(!$("#proxyUserId").val()) {
		alert(L.getLocaleMessage("bsp.userproxy.028","请选择代理人"));
		return;
	}

	$("#userProxyForm").ajaxSubmit({
		url : url,
		type : "post",
		async : false,
		success : function() {
			//var dialog = parent.dialog.get(window);
			//dialog.close(true);// 关闭后会重新刷新页面
			//dialog.remove();
			sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"));
			// 修改成功后跳转到用户列表页面
			
				setTimeout(function() {
					window.location.href = context + "/service/bsp/userproxylist";
				},
				1000)
			
			return false;
		},
		error : function(msg) {
			alert(msg.responseText);
		}
		
	});
	return false;
}
