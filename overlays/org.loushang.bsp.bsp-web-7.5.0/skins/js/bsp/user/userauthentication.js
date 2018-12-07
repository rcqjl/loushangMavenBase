﻿$(function() {
	
	$(".ip-policy").hide();
	
	// 根据新增用户ID,显示设置过的值
	$("#rzclTab").click(function() {
		var userPolicy;
		$("#copyuserId").val($("#userId").val());
		var userId = $("#copyuserId").val();
		var url = context + "/service/bsp/user/getUserPolicy";
		$.ajax({
			type : "post",
			url : url,
			async : false,
			data : "userId=" + userId,
			success : function(result) {
				userPolicy = result;
			},
			error : function(data, textstatus) {
				alert("error");
			}
		});
		$("#maxsession").val(userPolicy["maxSessionNumber"]);
		// 若加载出来的最大会话数不为空，则点击保存按钮执行修改操作
		if ($("#maxsession").val() != "") {
			time = 1;
		}
		// 如果为空，填入一个默认值
		if ($("#maxsession").val() == "") {
			$("#maxsession").val("-1");
		}
		$(".ipPolicyValue").val(userPolicy["ipPolicyValue"]);
		if (userPolicy["isUseIp"] == "1") {
			$("#isUseIp").prop("checked", true);
			$(".ip-policy").show();
			$(".ipPolicyValue").attr("datatype", "ipPolicyValue");
		}
	});
	// textarea显示隐藏
	$("#isUseIp").click(function() {
		if ($("#isUseIp").is(":checked")) {
			$(".ip-policy").show();
			$(".ipPolicyValue").attr("datatype", "ipPolicyValue");
		} else {
			$(".ip-policy").hide();
			$(".ipPolicyValue").removeAttr("datatype");
		}
	});
	$("#cancelForRzcl").click(function() {
		window.location = context + "/service/bsp/user";
	});

	$("#PolicyForm").Validform({
		btnSubmit : "#saveBtn",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype : {

			"maxsession" : ValidMaxsession,
			"ipPolicyValue" : ValidipPolicyValue
		},
		callback : function(form) {
			saveBtn();

		}
	});

});

// 最大会话数输入规则
function ValidMaxsession(gets, obj, curform, regxp) {
	var msg1 = L.getLocaleMessage("bsp.user.072","不能超过8位整数");
	var msg2 = L.getLocaleMessage("bsp.user.073","输入整数");
	var results;
	if (gets == null || gets == "") {
		return false;
	}
	if (gets.length > 8) {
		obj.attr("errormsg", msg1);
		return false;
	}
	if (isNaN(gets)) {
		obj.attr("errormsg", msg2);
		return false;
	}
}
function ValidipPolicyValue(gets, obj, curform, regxp) {
	var results;
	var msg = L.getLocaleMessage("bsp.user.074","请填写信息！");
	if (gets == null || gets == "") {
		obj.attr("nullmsg", msg);
		return false;
	}
}
// 保存
function saveBtn() {
	var msg1 = L.getLocaleMessage("bsp.user.059","保存成功！");
	var msg2 = L.getLocaleMessage("bsp.user.083","保存失败！");
	if ($("#isUseIp").is(":checked")) {
		$("#isUseIp").val("1");
	} else {
		$("#isUseIp").val("0");
	}
	$("#copyuserId").val($("#userId").val());
	var maxsession = $("#maxsession").val();
	var isUseIp = $("#isUseIp").val();
	var ipPolicyValue = $(".ipPolicyValue").val();
	var userId = $("#copyuserId").val();

	if (time == 0)// time为零代表保存，为1代表修改
	{
		var url = context + "/service/bsp/user/addUserPolicy";
		$.ajax({
			url : url,
			type : "post",
			data : {
				'maxSessionNumber' : maxsession,
				'isUseIp' : isUseIp,
				'ipPolicyValue' : ipPolicyValue,
				'userId' : userId
			},
			// data : "maxSessionNumber=" + maxsession + "&isUseIp=" + isUseIp +
			// "&ipPolicyValue=" + ipPolicyValue + "&userId=" + userId,
			success : function(result) {
				if (result == "success") {

					sticky(msg1);
				} else {
					sticky(msg2);
				}
			}
		});
		time = 1;// 保存之后，再次编辑调用修改方法

	} else {
		var url = context + "/service/bsp/user/modifyUserPolicy";
		$.ajax({
			url : url,
			type : "post",
			data : {
				'maxSessionNumber' : maxsession,
				'isUseIp' : isUseIp,
				'ipPolicyValue' : ipPolicyValue,
				'userId' : userId
			},
			// data : "maxSessionNumber=" + maxsession + "&isUseIp=" + isUseIp +
			// "&ipPolicyValue=" + ipPolicyValue + "&userId=" + userId,
			success : function(result) {
				if (result == "success") {

					sticky(msg1);
				} else {
					sticky(msg2);
				}
			}
		});

	}

}
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(msg, // 提示框显示内容
	{
		autoclose : 1000,
		position : place,
		style : type
	});
}
