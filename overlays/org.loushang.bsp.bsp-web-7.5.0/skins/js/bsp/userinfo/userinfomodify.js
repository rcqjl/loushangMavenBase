$(function() {
	var msg2 = L.getLocaleMessage("bsp.userinfo.015","修改密码");
	$("#bread").html(msg2);

	$("#saveForm").Validform(
			{
				btnSubmit : "#saveBtn",
				tiptype : function(msg, o, cssctl) {
					// 没有提示信息时不处理
					if(msg == "") {
						return;
					}
					if (!o.obj.is("form")) {
						var objtip = o.obj.siblings(".Validform_checktip");

						if (objtip.length == 0) {
							objtip = o.obj.parent("div").siblings(
									".Validform_checktip");
						}
						cssctl(objtip, o.type);
						objtip.text(msg);
					} else {
						var objtip = o.obj.find("#msgdemo");
						cssctl(objtip, o.type);
						objtip.text(msg);
					}
				},

				datatype : {

					"checkoldpassword" : Validoldpassword,
					"newpasswordstandard" : Validnewpassword

				},
				usePlugin : {// 密码强度
					passwordstrength : {
						minLen : 1
					}
				},

				callback : function(form) {
					saveBtn();
				}

			});

	$("#reset").bind("click", function() {
		window.location.href = context + "/service/bsp/userinfo";

	});

});
// 新密码规范校验
function Validnewpassword(gets, obj, curform, regxp) {
	var results;
	var msg = L.getLocaleMessage("bsp.userinfo.016","新密码不能与旧密码相同");
	if (gets == null || gets == "") {
		obj.attr("errormsg", L.getLocaleMessage("bsp.userinfo.004","请输入新密码"));
		return false;
	}
	
	// 判断是否和旧密码相同	
	var salt = "1#2$3%4(5)6@7!poeeww$3%4(5)djjkkldss";
	var pwd = hex_md5(gets + "{" + salt + "}");
	var url = context + "/service/bsp/userinfo/oldpassword";
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : "oldpassWord=" + pwd,
		success : function(result) {
			if (result == "success") {
				results = true;

			} else {
				results = false;
			}
		},
		error : function(data, textstatus) {
			alert("error");
		}
	});

	if (results) {
		obj.attr("errormsg", msg);
		return false;
	} else {
		return true;
	}

	var newpassWord = $("#newpassWord").val();

	var url = context + "/service/bsp/userinfo/checknewpassword";
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : "newpassWord=" + encodePwd(newpassWord),
		success : function(result) {
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
// 判断密码输入正误
function Validoldpassword(gets, obj, curform, regxp) {
	var results;
	var msg = L.getLocaleMessage("bsp.userinfo.017","密码有误");

	var salt = "1#2$3%4(5)6@7!poeeww$3%4(5)djjkkldss";
	var oldpassWord1 = $("#oldpassWord").val();
	var oldpassWord = hex_md5(oldpassWord1 + "{" + salt + "}");
	var url = context + "/service/bsp/userinfo/oldpassword";
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : "oldpassWord=" + oldpassWord,
		success : function(result) {
			if (result == "success") {
				results = true;

			} else {
				results = false;
			}
		},
		error : function(data, textstatus) {
			alert("error");
		}
	});

	if (!results) {
		obj.attr("errormsg", msg);
		return false;
	} else {
		return true;
	}
}
// 密码修改
function saveBtn() {
	var msg = L.getLocaleMessage("bsp.userinfo.018","保存成功！");
	var enPwd = encodePwd($("#newpassWord").val());
	$("#newpassWord").val(enPwd);
	$("#surepassword").val(enPwd);
	var newpassWord = $("#newpassWord").val();
	var url = context + "/service/bsp/userinfo/newpassword";
	$.ajax({
		type : "post",
		url : url,
		async : false,
		data : "newpassWord=" + newpassWord,
		success : function(result) {
			if (result == "success") {
				sticky(msg);

			}

		},
		error : function(data, textstatus) {
			alert("error");
		}
	});

}
function encodePwd(rawPassword) {
	var pubKey;
	
	// 获取公钥
	$.ajax({
		url: context + "/service/bsp/userinfo/pubKey",
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
