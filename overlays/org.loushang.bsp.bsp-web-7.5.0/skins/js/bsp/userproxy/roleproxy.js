$(function(){
	// 初始化左侧表格数据
	var NotBeenSelectedRolesUrl = context+"/service/bsp/proxypermissionlist/getHaveNotBeenSelectedroles";
	initNotBeenSelectedRoles(NotBeenSelectedRolesUrl);
	// 初始化右侧表格
	var SelectedRolesUrl = context+"/service/bsp/proxypermissionlist/getSelectedRolesByRoleId";
	initSelectedRoles(SelectedRolesUrl);
	// 初始化弹窗对象
	var dialog = parent.dialog.get(window);
	
	// 关闭按钮
	$("#saveBtn").click(function(){
		dialog.close();
		dialog.remove();
	});
	// 添加角色委托按钮
	$("#move").click(function(){
		var roleId = getCheckBoxValue("roleCheckboxLeft");
		if(""==roleId){
			dialogtip()
			return
		}
		addRoleForUsers(roleId)
	});
	// 删除角色委托按钮
	$("#remove").click(function(){
		var roleId = getCheckBoxValue("roleCheckboxRight");
		if(""==roleId){
			dialogtip()
			return
		}
		delRoleForUsers(roleId)
	});
	// 查询
	$("[id^=query]").click(function() {
		var searchVal = $("#roleCodeOrName").val();
		query(searchVal);
		
	});
	
});
//查询功能
function query(searchVal) {
	var url = context+"/service/bsp/proxypermissionlist/getHaveNotBeenSelectedroles?roleCodeOrName="+searchVal;
	url = encodeURI(url);
	url = encodeURI(url);
	grid.reload(url);
}
// 初始化左侧表格
function initNotBeenSelectedRoles(url){
	var options = {
			"info":false
	};
	grid = new L.FlexGrid("RoleListLeft",url);
	grid.setParameter("proxypermissionId",proxypermissionId);
	grid.init(options);
};
// 初始化右侧表格
function initSelectedRoles(url){
	var options = {
			"info":false,
	};
	gridRole = new L.FlexGrid("RoleListRight",url);
	gridRole.setParameter("proxypermissionId",proxypermissionId);
	gridRole.init(options);
};

// 增加角色委托事件
function addRoleForUsers(roleId){
	$.ajax({
		url:context+"/service/bsp/proxypermissionlist/addRoleToProxy",
		type:"POST",
		data:{"roleId":roleId,"proxypermissionId":proxypermissionId},
		success:function(){
			grid.reload();
			gridRole.reload();
			$("#selectAllRoleLeft")[0].checked=false;
			sticky(L.getLocaleMessage("bsp.userproxy.032","保存成功！"))
		}
	});
}
// 删除用户角色事件
function delRoleForUsers(roleId){
	$.ajax({
		url:context+"/service/bsp/proxypermissionlist/delRoleFromProxy",
		type:"POST",
		data:{"roleId":roleId,"proxypermissionId":proxypermissionId},
		success:function(){
			grid.reload();
			gridRole.reload();
			$("#selectAllRoleRight")[0].checked=false;
			sticky(L.getLocaleMessage("bsp.userproxy.033","删除成功！"));
		}
	});
};

// 渲染复选框左侧
function roleCheckboxLeft(data, type, full) {
    return '<input type="checkbox" value="' + data + '" id="' + data + '" name="roleCheckboxLeft"/>';
};
// 渲染右侧复选框
function roleCheckboxRight(data, type, full) {
	return '<input type="checkbox" value="' + data + '" id="' + data + '" name="roleCheckboxRight"/>';
};
// 获取选中的复选框的记录
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
// 自动消失提示框
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
// 弹窗提示框
function dialogtip(){
	$.dialog({
		autofocus:true,
		type : "alert",
		content : L.getLocaleMessage("bsp.userproxy.035","请至少选择一项！")
	});
};