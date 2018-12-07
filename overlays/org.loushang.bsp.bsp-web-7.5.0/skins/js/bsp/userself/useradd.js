$(function() {
	$("#bread").append('<a href="' + context + '/service/bsp/userself/">用户管理</a> > 增加用户');
	$("#saveForm").Validform({
		btnSubmit:"#saveBtn",
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				// 根据生日框的DOM结构查找其验证结果框
				if(objtip.length == 0){
					 objtip=o.obj.parent("div").siblings(".Validform_checktip");
				}
			    cssctl(objtip,o.type);
			    objtip.text(msg);
			} else{
				var objtip=o.obj.find("#msgdemo");
				cssctl(objtip,o.type);
				objtip.text(msg);
			} 
		
		},
		datatype: {
			"account": ValidAccount,
			"password": ValidPassword
		},
		/*datatype:{//传入自定义datatype类型;[]
		      "idcard":idcard,
		      "password_rule" : function(gets, obj){
                  var result = /^[\w\W]{6,15}$/i.test(gets);
                  return result;
		      }
		},*/
		callback:function(form){
			
			save();
			/*dialog({
				title: '提示',
				width:258,
	 		    height:13,
			    content: '您确定要提交表单吗？',
			    okValue: '确定',
			    ok: function () { save();},
			    cancelValue: '取消',
			    cancel: function () {},
			    autofocus: false
		    }).show();*/
		}
	});
	// 返回user页面
	$("#returnBtn").click(function() {
		window.location = context + "/service/bsp/userself";
	});
	$("#reset").bind("click", function() {
		window.location.href = context + "/jsp/bsp/userself/user_add.jsp";
	});

});
		// 保存实例
		function save(){
			var enPwd = encodePwd($("#passWord").val());
			$("#passWord").val(enPwd);
			$("#passwordConfirm").val(enPwd);
			// alert(enPwd);
			var url = context+"/service/bsp/userself/save";
			saveForm.action = url;
			saveForm.method = "POST";
			saveForm.submit();
			
		}
		 function save2(){
			var enPwd = encodePwd($("#passWord").val());
			$("#passWord").val(enPwd);
			var userId = $("#userId").val();
			var userName = $("#userName").val();
			var passWord = $("#passWord").val();
			var isSys = $("input[name='isSys']").val();
			var accountStatus = $("select[name='accountStatus']").val();
			var userTypeId = $("input[name='userTypeId']").val();
			var url = context+"/service/bsp/userself/save";
			$.ajax({
				type:"POST",
				url: url,
				data:{
					'userId':userId,
					'userName':userName,
					'passWord':passWord,
					'accountStatus':accountStatus,
					'isSys':isSys,
					'userTypeId':userTypeId
					},
				
				success:function(result){
					if(result=='0') {
						//diaFailure();						
					}else {
						//diaSuccess();	
						window.location = context + "/service/bsp/userself";
					}
				}
		}); 	
		 }
		// 密码加密
		function encodePwd(rawPassword) {
			var pubKey = pubkey;
			setMaxDigits(130);
			var key = new RSAKeyPair("10001", "", pubKey); // "00a285169b1b7826a1220edcb1aaaca92187b2c290e43ec60d0dc9ca34f5c0a3764bc86edc1e5418631e912f761b3fb7206c278a8673ae45f5a67941d37315548a4458604b4c4ea87fef9f51b40daf5052e3db6aa60fefc7d159915b0c0924acadeebceeb11625a3f91616f3b673b65531f26812191f89cb9707151f0f27a8c28f"
			var result = encryptedString(key, rawPassword);
			return result;
		}
		
		function diaFailure(){
			dialog({
				title: '提示',
				width:258,
	 		    height:13,
			    content: '添加失败！',
			    autofocus: false
		    }).show().delay(5000).hide();
		}
		function diaSuccess(){
			dialog({
				title: '提示',
				width:258,
				height:13,
				content: '添加成功！',
				autofocus: false
			}).show().delay(5000).hide();
		}
		
		function ValidAccount(gets, obj, curform, regxp) {
			var results;
			if (gets == null || gets == "") {
				return false;
			}
			if (gets.length > 30) {
				obj.attr("errormsg", "不能超过30个字符");
				return false;
			}
			$.ajax({
				url: context + "/service/bsp/userself/isExistUserId?userId=" + gets,
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
				obj.attr("errormsg", "账号已存在");
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
				url: context + "/service/bsp/userself/passwdPolicy",
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