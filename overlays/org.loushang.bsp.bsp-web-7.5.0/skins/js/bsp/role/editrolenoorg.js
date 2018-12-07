//////////////////////////////////////////////校验///////////////////////////////////////////
var count_role = 0;
var Validform;
var status;
$(function() {
	
	if (check != null && check != undefined && check != '') {
		status = "edit";
	} else {
		status = "new";
	}
	
	//初始化表单验证
	initValidform();
	
	//查看所有权限
	$(".queryAllroles").click(function() {
		window.location = context + "/service/bsp/rolenoorg";
	});
	//取消按钮
	$("#returnBtn").click(function(){
		dialog.close();
		dialog.remove();
	});
});

function initValidform() {
	//校验
	$("#saveForm").Validform({
		btnSubmit : "#saveBtn",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		datatype:{
			"code": ValidCode
		},
		callback : function(form) {
			save();
		}
	});
}

function ValidCode(gets, obj, curform, regxp){
	var msg1 = L.getLocaleMessage("bsp.role.033","不能超过30个字符");
	var msg2 = L.getLocaleMessage("bsp.role.034","角色编码已存在");
	var isExist;
	if(gets == null || gets == ""){
		return false;
	}
	if(gets.length >30){
		obj.attr("errormsg",msg1);
		return false;
	}
	var roleCodeOld = $(".roleCodeVOld").val();
	if(roleCodeOld!=gets){
		$.ajax({
			url: context + "/service/bsp/rolenoorg/isExistRoleCode?roleCode="+gets,
			type: "post",
			async: false,
			success: function(result){
				if(result == "true"){
					isExist = true;
				}else{
					isExist = false;
				}
			}
		});
	}
	
	if(isExist){
		obj.attr("errormsg",msg2);
		return false;
	}else{
		return true;
	}
}

//保存表单实例
function save(){
	var url=context+"/service/bsp/rolenoorg/addrole";
	if (status == "edit") {
		url = context + "/service/bsp/rolenoorg/updateRoleName";
	}
	
	$("#saveForm").ajaxSubmit({
		url:url,
		type:"POST",
		success: function() {
			dialog.close(true);
			dialog.remove();
		}
	});
}

function renderstatus(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.role.018","全局");
	var msg2 = L.getLocaleMessage("bsp.role.048","机构");
	if(data != "" || data != null)
	{
	  if(data == "1"){
		  data = msg1;
	  }
	  if(data == "0"){
		  data = msg2;
	  }			    		    			  
	}
	return data;
};
function roleAuthrize(data){
	var msg = L.getLocaleMessage("bsp.role.025","角色授权");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/roleauthrizenoorg.jsp?roleId="+data,
		title:msg,
		width:580,
		height:440,
		onclose:function(){}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//批量用户授权
function roleBatchAuthorize(data){
	var msg = L.getLocaleMessage("bsp.role.043","将角色批量授权给用户");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/rolebatchauthorizenoorg.jsp?roleId="+data,
		title:msg,
		width:750,
		height:470,
		onclose:function(){}
	});
	$(".ui-dialog-body").css("padding","0px");
};