var status;
$(document).ready(function() {
	
	if (check != null && check != undefined && check != '') {
		$("#userId").prop("readonly", true);
		$("#userId").removeAttr("datatype");
		$("#userId").removeAttr("nullmsg");
		$("#userId").next("span").remove();
		$("input[name=accountStatus][value=check]").prop("checked", true);
		if (check == "00" || check == "10") {
			$("#accountStatus2").prop("checked", true);
		}
		status = "edit";
	} else {
		status = "new";
	}
	
	//用户管理tab栏显示控制
	if (typeof flagStatus != "undefined" && flagStatus != null && flagStatus != '') {
		if(flagStatus == "flag_Edit"){
			if(!($('#zhxx').hasClass("active"))){
				$('#firstTab').addClass("active");
				$('#zhxx').addClass("active");
			}
		}else if(flagStatus == "flag_RoleAssignment"){
				if(!($('#gnqx').hasClass("active"))){
					$('#secondTab').addClass("active");
					$('#gnqx').addClass("active");
				  }
				 $('#zhxx').removeClass("active");
		}else if(flagStatus == "flag_joinGroup"){
				if(!($('#sjqx').hasClass("active"))){
					$('#thirdTab').addClass("active");
					$('#sjqx').addClass("active");
				  }
				 $('#zhxx').removeClass("active");
		}
	}
	// 校验
	$("#addForm").Validform({
		btnSubmit: "#saveVal",
		tiptype: function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype: {
			"account": ValidAccount,
			"password": ValidPassword
		},
		callback: function(form) {
			saveVal();
		}
	});
	
	$(".cancel").bind("click", function() {
		if(status == "new") {
			dialog.close();
			dialog.remove();
		} else {
			window.location.href = context + "/service/bsp/usernoorg";
		}
		return false;
	});
});


function ValidAccount(gets, obj, curform, regxp) {
	var results;
	if (gets == null || gets == "") {
		return false;
	}
	if(!regxp["ls"].test(gets)) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.user.100","请输入中、英文或下划线"));
		return false;
	}
	if (gets.length > 30) {
		var msg = L.getLocaleMessage("bsp.user.056","不能超过30个字符");
		obj.attr("errormsg", msg);
		return false;
	}
	$.ajax({
		url: context + "/service/bsp/usernoorg/isExistUserId?userId=" + gets,
		type: "post",
		async: false,
		success: function(result) {
			if (result == "true") {
				results = true;
			} else {
				results = false;
			}
		}
	});

	if (results) {
		var msg = L.getLocaleMessage("bsp.user.057","账号已存在");
		obj.attr("errormsg", msg);
		return false;
	} else {
		return true;
	}
}

function ValidPassword(gets, obj, curform, regxp) {
	var results;
	var message;
	if (gets == null || gets == "") {
		return false;
	}
	var oldPwd = $("#oldPassword").val()
	if (oldPwd != "" && oldPwd == gets) {
		return true;
	}
	$.ajax({
		url: context + "/service/bsp/usernoorg/passwdPolicy",
		type: "post",
		data: "password="+encodePwd(gets),
		async: false,
		success: function(result) {
			if (result.flag == "true") {
				results = true;
			} else {
				results = false;
				message = result.message;
				
			}
		}
	});

	if (!results) {
		obj.attr("errormsg", message);
		return false;
	} else {
		return true;
	}
}

// 密码加密
function encodePwd(rawPassword) {
	var pubKey;
	
	// 获取公钥
	$.ajax({
		url: context + "/service/bsp/usernoorg/pubKey",
		async: false,
		type: "get",
		success: function(data) {
			pubKey = data;
		}
	});
	
	setMaxDigits(129);
	var key = new RSAKeyPair("10001", "10001", pubKey);
	var result = encryptedString(key, rawPassword);
	return result;
}

// 保存
function saveVal() {
	// 防止重复保存
	$("#saveVal").attr("disabled", "disabled");
	var url;
	if (status == "new") {
		url = context + "/service/bsp/usernoorg/add";
	} else {
		url = context + "/service/bsp/usernoorg/updateUser";
	}
	var rawPwd = $("#passWord").val();
	var encPwd = encodePwd(rawPwd);
	$("#passWord").val(encPwd);
	$("#re_passWord").val(encPwd);
	$("#addForm").ajaxSubmit({
		url: url,
		type: "post",
		async: false,
		success: function(data) {
			if(status == "new") {
				dialog.close(true);
				dialog.remove();
			} else {
				var msg = L.getLocaleMessage("bsp.user.059","保存成功！");
				sticky(msg);
				setTimeout(function() {
					window.location.href = context + "/service/bsp/usernoorg";
				}, 1000);
			}
		}
	});
	return false;
}
