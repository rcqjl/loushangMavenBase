$(function(){
	//初始化左侧表格数据
	var allUserUrl = context+"/service/bsp/role/queryUsers";
	initUser(allUserUrl);
	//初始化右侧表格
	var roleUserUrl = context+"/service/bsp/role/getUsersByRoleId";
	initRoleUser(roleUserUrl);
	//初始化弹窗对象
	var dialog = parent.dialog.get(window);
	//初始化岗位下拉列表
	$.ajax({
		url:context+"/service/bsp/role/queryAllPositionType",
		dataType:"json",
		success:initPositionTypeList
	});
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
		addRoleForUsers(userId)
	});
	//删除权限按钮
	$("#remove").click(function(){
		var userId = getCheckBoxValue("userRoleList");
		if(""==userId){
			dialogtip()
			return
		}
		delRoleForUsers(userId)
	});
	//岗位下拉框事件
	$("#positionType").change(function(){
		var positionCode = $(this).find("option:selected")[0].value;
		queryUserByPosition(positionCode);
	});
	//查询
	$("#querySelect").click(function(){
		var userIdOrName = $("#userIdOrNameSelect").val();
		userIdOrName = userIdOrName.replace(/%/g,"\\\%");
		var param={"roleId": roleId, "userIdOrName": userIdOrName};
		grid.reload(allUserUrl, param);
	});
	$("#querySelected").click(function(){
		var userIdOrName = $("#userIdOrNameSelected").val();
		userIdOrName = userIdOrName.replace(/%/g,"\\\%");
		var param={"roleId": roleId, "userIdOrName": userIdOrName};
		gridRole.reload(roleUserUrl, param);
	});
});
//初始化左侧表格
function initUser(url){
	var options = {
			"info":false
	};
	grid = new L.FlexGrid("userList",url);
	grid.setParameter("roleId",roleId);
	grid.init(options);
};
//初始化右侧表格
function initRoleUser(url){
	var options = {
			"info":false,
	};
	gridRole = new L.FlexGrid("userRoleList",url);
	gridRole.setParameter("roleId",roleId);
	gridRole.init(options);
};
//初始化岗位下拉列表
function initPositionTypeList(positionTypeList){
	for(index in positionTypeList){
		var option ='<option value='+positionTypeList[index].code+'>'+positionTypeList[index].name+'</option>'
		$("#positionType").append(option);
	}
}
//用户增加角色事件
function addRoleForUsers(userId){
	var msg = L.getLocaleMessage("bsp.role.051","添加成功！");
	$.ajax({
		url:context+"/service/bsp/role/addRoleForUsers",
		type:"POST",
		data:{"roleId":roleId,"userId":userId},
		success:function(){
			grid.reload();
			gridRole.reload();
			$("#selectAllUser")[0].checked=false;
			sticky(msg)
		}
	});
}
//删除用户角色事件
function delRoleForUsers(userId){
	var msg = L.getLocaleMessage("bsp.role.036","删除成功！");
	$.ajax({
		url:context+"/service/bsp/role/delRoleForUsers",
		type:"POST",
		data:{"roleId":roleId,"userId":userId},
		success:function(){
			grid.reload();
			gridRole.reload();
			$("#selectAllUserRole")[0].checked=false;
			sticky(msg);
		}
	});
};
//岗位下拉框改变事件
function queryUserByPosition(positionCode){
	var url = "";
	
	if(""!=positionCode){
		url=context+"/service/bsp/role/queryUserByPosition";
	}else{
		url = context+"/service/bsp/role/queryUsers";
	}
	var param={"positionCode":positionCode, "roleId":roleId};
	grid.reload(url,param);
}
//渲染复选框左侧
function userCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" id="' + data + '" name="userList"/>';
};
//渲染右侧复选框
function userRoleCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="' + data + '" name="userRoleList"/>';
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
	var msg = L.getLocaleMessage("bsp.role.052","请至少选择一条记录!");
	$.dialog({
		autofocus:true,
		type : "alert",
		content : msg
	});
};