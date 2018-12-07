var gridRole;
var grid;
$(function(){
	//初始化左侧表格数据
	var allUserUrl = context+"/service/bsp/group/notingroupusers";
	initUser(allUserUrl);
	//初始化右侧表格
	var groupUserUrl = context+"/service/bsp/group/ingroupusers";
	initGroupUser(groupUserUrl);
	//初始化弹窗对象
	var dialog = parent.dialog.get(window);
	
	//保存按钮
	$("#saveBtn").click(function(){
		dialog.close();
		dialog.remove();
	});
	//添加权限按钮
	$("#move").click(function(){
		var userId = getCheckBoxValue("userList");
		if(""==userId){
			dialogtip()
			return
		}
		addGroupForUsers(userId)
	});
	//删除权限按钮
	$("#remove").click(function(){
		var userId = getCheckBoxValue("userGroupList");
		if(""==userId){
			dialogtip()
			return
		}
		delGroupForUsers(userId)
	});
	//查询
	$("#querySelect").click(function(){
		var userIdOrName = $("#userIdOrNameSelect").val();
		userIdOrName = userIdOrName.replace(/%/g,"\\\%");
		var param={"groupId": groupId, "userIdOrName": userIdOrName};
		grid.reload(allUserUrl, param);
	});
	$("#querySelected").click(function(){
		var userIdOrName = $("#userIdOrNameSelected").val();
		userIdOrName = userIdOrName.replace(/%/g,"\\\%");
		var param={"groupId": groupId, "userIdOrName": userIdOrName};
		gridGroup.reload(groupUserUrl, param);
	});
	if(groupId == '5000') {
		$("#move").attr("disabled", "disabled");
		$("#remove").attr("disabled", "disabled");
		$("#bitMsg").show();
	}
});
//初始化左侧表格
function initUser(url){
	var options = {
			"info":false
	};
	grid = new L.FlexGrid("userList",url);
	grid.setParameter("groupId",groupId);
	grid.init(options);
};
//初始化右侧表格
function initGroupUser(url){
	var options = {
			"info":false,
	};
	gridGroup = new L.FlexGrid("userGroupList",url);
	gridGroup.setParameter("groupId",groupId);
	gridGroup.init(options);
};

//用户组成员添加
function addGroupForUsers(userId){
	var msg = L.getLocaleMessage("bsp.group.051","添加成功！");
	$.ajax({
		url:context+"/service/bsp/group/groupmember/add",
		type:"POST",
		data:{"groupId":groupId,"userId":userId},
		success:function(){
			grid.reload();
			gridGroup.reload();
			$("#selectAllUser")[0].checked=false;
			sticky(msg)
		}
	});
}
//用户组成员删除
function delGroupForUsers(userId){
	var msg = L.getLocaleMessage("bsp.group.036","删除成功！");
	$.ajax({
		url:context+"/service/bsp/group/groupmember/delete",
		type:"POST",
		data:{"groupId":groupId,"userId":userId},
		success:function(){
			grid.reload();
			gridGroup.reload();
			$("#selectAllUserGroup")[0].checked=false;
			sticky(msg);
		}
	});
};
//渲染复选框左侧
function userCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" id="' + data + '" name="userList"/>';
};
//渲染右侧复选框
function userGroupCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="' + data + '" name="userGroupList"/>';
};
//获取选中的复选框的记录
function getCheckBoxValue(attrKey) {
	var confCheckBox = $("input:checkbox[name=" + attrKey + "]");
	var selectedValue = "";
	for ( var i = 0; i < confCheckBox.length; i++) {
		if (confCheckBox[i].checked) {
			if ("" == selectedValue) {
				selectedValue = confCheckBox[i].value;
			} else {

				selectedValue = selectedValue + "," + confCheckBox[i].value;
			}
		}
	}
	return selectedValue;
};
//自动消失提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(
		    msg,
		    {
		        autoclose : 2000, 
		        position : place,
		        style : type
		    }
	);
};
//弹窗提示框
function dialogtip(){
	var msg = L.getLocaleMessage("bsp.group.052","请至少选择一条记录!");
	$.dialog({
		autofocus:true,
		type : "alert",
		content : msg
	});
};