//////////////////////////////////////////////校验///////////////////////////////////////////
var dialog = parent.dialog.get(window);
var Validform;
var status;
$(function() {
	if(id != null && id != "" && id != undefined) {
		status = "edit";
	} else {
		status = "new";
	}
	
	if(status == "edit") {
		$("#groupId").prop("readonly", true);
	}
	
	initValidform();
	
	//取消按钮
	$("#returnBtn").click(function() {
		dialog.close();
		dialog.remove();
	});
	
});
//初始化表单校验
function initValidform(){
	//表单校验
	Validform = $("#saveForm").Validform({
		btnSubmit:"#saveBtn",
		tiptype:function(msg,o,cssctl){
				var objtip=o.obj.siblings(".Validform_checktip");
			    cssctl(objtip,o.type);
			    objtip.text(msg);
		},
		datatype:{
			"groupId": ValidGroupId
		},
		callback:function(form){
			save();
		}
	});	
};
function ValidGroupId(gets, obj, curform, regxp){
	var msg2 = L.getLocaleMessage("bsp.group.034","组名称已存在");
	var isExist;
	if(gets == null || gets == ""){
		return false;
	}
	
	var groupIdOld = $("#groupIdOld").val();
	if(status == "edit" && groupIdOld != gets || status == "new") {
		$.ajax({
			url: context + "/service/bsp/group/isExistGroupId",
			type: "post",
			data: "groupId=" + gets,
			async: false,
			success: function(result){
				if(result == "true"){
					obj.attr("errormsg",msg2);
					isExist = true;
				}else{
					isExist = false;
				}
			}
		});
	}
	
	return !isExist;
}

//保存表单实例
function save(){
	var url=context+"/service/bsp/group/add";
	if(status == "edit") {
		url=context+"/service/bsp/group/update";
	}
	$("#saveForm").ajaxSubmit({
		url:url,
		type:"POST",
		success: function(){
			dialog.close(true);
			dialog.remove();
		}
	});
}

function roleAuthrize(data){
	var msg = L.getLocaleMessage("bsp.group.025","角色授权");
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
	var msg = L.getLocaleMessage("bsp.group.043","将角色批量授权给用户");
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

