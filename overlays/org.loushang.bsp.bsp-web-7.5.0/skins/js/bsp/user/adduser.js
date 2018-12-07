var status;
var userForm;
var userMsg = L.getLocaleMessage("bsp.user.052","用户管理");
var editUserMsg = L.getLocaleMessage("bsp.user.053","编辑用户");
function alert(msg) {
	$.dialog({
		type: "alert",
		content: msg
	});
}
// 提示信息
function sticky(msg, style, position) {
	var type = style ? style: 'success';
	var place = position ? position: 'top';
	$.sticky(msg, // 提示框显示内容
	{
		autoclose: 1000,
		position: place,
		style: type
	});
}

$(document).ready(function() {
	$("#isSys").on("click",
	function() {
		isShow();
	});
	
	var msg3 = L.getLocaleMessage("bsp.user.054","增加用户");
	if (check != null && check != undefined && check != '') {
		$("#bread").append('<a href="' + context + '/service/bsp/user/">'+userMsg+'</a> > '+ editUserMsg);
		status = "edit";
		$("#userId").prop("readonly", true);
		$("#userId").removeAttr("datatype");
		$("#userId").removeAttr("nullmsg");
		$("#userId").next("span").remove();
		$("input[name=accountStatus][value=check]").prop("checked", true);
		if (isSysCheck == '1') {
			$("input[name=isSys]").prop("checked", true);
		}
		if (check == "00" || check == "10") {
			$("#accountStatus2").prop("checked", true);
		}
	} else {
		//$("#bread").append("<a href='" + context + "/service/bsp/user/'><spring:message code='bsp.user.052' text='用户管理'></spring:message></a> > <spring:message code='bsp.user.054' text='增加用户'></spring:message>");
		$("#bread").append('<a href="' + context + '/service/bsp/user/">'+userMsg+'</a> > '+msg3);
		status = "new";
	}

	isShow();

	// 选择人员
	$(".select-principal").on("click",
	function() {
		selectUser();
	});

	// 选择所辖范围
	$(".select-jurisdiction").on("click",
	function() {
		jurisdiction();
	});

	$("#gnqxTab,#sjqxTab,#rzclTab").on("click",
	function() {
		var temp = $("#userId").val();
		var results;
		if (status == "new") {
			$.ajax({
				url: context + "/service/bsp/user/isExistUserId?userId=" + temp,
				type: "post",
				async: false,
				success: function(result) {
					if (result == "true") {
						results = "true";
					} else {
						results = "false";
					}
				}
			});
			if (results == "false") {
				var msg = L.getLocaleMessage("bsp.user.055","请先保存用户！");
				alert(msg);
				return false;
			}
		}
	});

	// 校验
	userForm = $("#addForm").Validform({
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
		window.location.href = context + "/service/bsp/user";

	});
	
	$("#saveValBack").bind("click", function() {
		if(userForm.check()) {
			saveVal("back");
		}
	});
});

// 判断是否显示所辖范围框
function isShow() {
	if ($("input[name=isSys]").prop("checked") == true) {
		$(".isSystem").show();
	} else {
		$(".isSystem").hide();
		clearJurisdiction();
	}
}

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
		url: context + "/service/bsp/user/isExistUserId?userId=" + gets,
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
		url: context + "/service/bsp/user/passwdPolicy",
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

// 选择所辖范围
function jurisdiction() {
	var msg = L.getLocaleMessage("bsp.user.019","所辖范围");
	$.dialog({
		type: 'iframe',
		url: context + "/service/bsp/organHelp?isChkbox=1&selType=1;2&struType=00&showableType=1;2",
		title: msg,
		width: 580,
		height: 400,
		onclose: function() {
			var node = this.returnValue;
			var organNames, organIds, struIds, organTypes;
			if (typeof node != 'string') {
				if (node.length > 0) {
					organNames = node[0].organName;
					organIds = node[0].organId;
					struIds = node[0].struId;
					organTypes = node[0].organType;
					if (node.length > 1) {
						$.each(node,
						function(i, n) {
							if (i > 0) {
								organNames = organNames + "," + n["organName"];
								organIds = organIds + "," + n["organId"];
								struIds = struIds + "," + n["struId"];
								organTypes = organTypes + "," + n["organType"];
							}
						});
						$("#organNames").val(organNames);
						$("#organIds").val(organIds);
						$("#struIds").val(struIds);
						$("#dataTypeCode").val(organTypes);
					} else {
						$("#organNames").val(organNames);
						$("#organIds").val(organIds);
						$("#struIds").val(struIds);
						$("#dataTypeCode").val(organTypes);
					}
				} else {
					clearJurisdiction();
				}
			}
		}
	});
}

// 清空所辖范围
function clearJurisdiction() {
	$("#organNames").val("");
	$("#organIds").val("");
	$("#struIds").val("");
	$("#dataTypeCode").val("");
}

// 选择员工
function selectUser() {
	var msg = L.getLocaleMessage("bsp.user.058","选择员工");
	$.dialog({
		type: 'iframe',
		url: context + "/service/bsp/organHelp?isChkbox=0&selType=8&struType=00",
		title: msg,
		width: 580,
		height: 400,
		onclose: function() {
			var nodes = this.returnValue;
			if (typeof nodes != 'string') {
				if (nodes.length > 0) {
					var node = nodes[0];
					if (node["organType"] == "8") {
						$("#staffName").val(node["organName"]);
						$("#staffId").val(node["struId"]);
						$("#cropName").val(node["cropName"]);
						$("#corpId").val(node["cropId"]);
						$("#deptName").val(node["deptName"]);
						$("#deptId").val(node["deptId"]);
					}
				} else {
					$("#staffName").val("");
					$("#staffId").val("");
					$("#cropName").val("");
					$("#corpId").val("");
					$("#deptName").val("");
					$("#deptId").val("");
				}
			}
		}
	});
}

// 密码加密
function encodePwd(rawPassword) {
	var pubKey;
	
	// 获取公钥
	$.ajax({
		url: context + "/service/bsp/user/pubKey",
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
function saveVal(isBack) {
	var rawPwd = $("#passWord").val();
	var encPwd = encodePwd(rawPwd);
	$("#passWord").val(encPwd);
	$("#re_passWord").val(encPwd);
	if (status == "new") {
		var url = context + "/service/bsp/user/add";
	}
	if (status == "edit") {
		var url = context + "/service/bsp/user/updateUser";
	}
	$("#addForm").ajaxSubmit({
		url: url,
		type: "post",
		async: false,
		success: function(data) {
			var msg = L.getLocaleMessage("bsp.user.059","保存成功！");
			sticky(msg);

			if (isBack == "back") {
				setTimeout(function() {
					window.location.href = context + "/service/bsp/user";
				},
				1000)
			}
			// 新增保存后状态改为编辑
			if(status=="new") {
				$("#bread").empty().append('<a href="' + context + '/service/bsp/user/">'+userMsg+'</a> > '+ editUserMsg);
				status = "edit";
				$("#userId").prop("readonly", true);
				$("#userId").removeAttr("datatype");
				$("#userId").removeAttr("nullmsg");
				$("#userId").next("span").remove();
			}
		}
	});
	return false;
}
