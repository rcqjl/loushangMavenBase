var grid;
var checkboxName = "checkboxlist";
var specialSubject = ["superadmin","SUPERADMIN","public","PUBLIC"];

$(document).ready(function(){
	
	// 初始化datatable
	initTable();
	
	// 更多搜索
	$("body").on("click","#search",function(){
		queryForm();		
	});
	
	$("#add").bind("click",addUser);
	
	// 查询 
	$("#query").on("click",function() { 
		queryForm(); 
	});
	  
	$("#toUserName,#toUserId").keydown(function(event) {
		if(event.keyCode==13){ 
			queryForm();
		}
	});
	
	// 批量删除
	$("#batchDel").on("click",function() {
		batchDel();
	});
	
	// 批量功能授权
	$("#batchFunAuthority").on("click",function(){
		batchFunAuthority();
	});
	
	//批量数据授权
	$("#batchDataAuthority").on("click",function(){
		batchDataAuthority();
	});
});

// /////////////////////////////////////////// 表单// /////////////////////////////////////////
function initTable() {
	var options = {
		"ordering": false,
		"btnDefs": [

		            ]
	};
	var url = context +"/service/bsp/usernoorg/data";
	grid = new L.FlexGrid("userList",url);
	grid.init(options);
}

// 编辑用户
function modify(data,flag) {
	var recordIds = data;
	var flagStatus = flag;
	var url = context+"/service/bsp/usernoorg/edit";
	url += "?userId="+recordIds+"&flagStatus="+flagStatus;
	window.location.href=encodeURI(encodeURI(url));
}

// 删除用户
function del(data) {
	var userIds = [];
	userIds.push(data);
	
	delAction(userIds);
}

// 批量删除户
function batchDel(){
	var msg1 = L.getLocaleMessage("bsp.user.076","请选择要删除的记录！");
	var userIds = [];

	var $selected = $(":checkbox[name=" + checkboxName + "]:checked");
	if($selected.length < 1) {
		$.dialog({
			type: 'confirm',
			content: msg1,
		    autofocus: true
		});
		return;
	}
	$selected.each(function(i, checkbox){
		userIds.push($(checkbox).val());
	});
	
	delAction(userIds);
}

function delAction(userIds) {
	var msg2 = L.getLocaleMessage("bsp.user.075","确认删除吗?");
	var msg3 = L.getLocaleMessage("bsp.user.077","删除时出错");
	userIds = userIds.join();
	var url = context+"/service/bsp/usernoorg/batchDel";
	$.dialog({
		type: 'confirm',
		content: msg2,
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: url,
					type: "post",
					data: "userIds=" + userIds,
					success: function(data) {
						sticky("删除用户成功");
						grid.reload();
					},
					error: function(XHR, textStatus, errorThrown) {
						$.dialog({
							type: 'alert',
							content: msg3,
						    autofocus: true,
						});
					}
				});
			},
		cancel: function(){}
	});

}

// 增加用户
function addUser(data) {
	var url = context +"/service/bsp/usernoorg/addPage";
	$.dialog({
		type: "iframe",
		url: url,
		title: "创建用户",
		width: 580,
		height: 350,
		autofocus: true,
		onclose: function() {
			if(this.returnValue) {
				sticky("创建用户成功");
				grid.reload();
			}
		}
	});
}

// 查询
function queryForm(){
	var userId = $("#toUserId").val();
	var userName = $("#toUserId").val();
	var url = context+"/service/bsp/usernoorg/data";
	var param={"userId":userId,"userName":userName};
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);
}

// 批量功能授权
function batchFunAuthority(userId){
	var msg = L.getLocaleMessage("bsp.user.078","请选择要授权的用户！");
	var userIds = [];
	var userId1;
	var $selected = $(":checkbox[name=" + checkboxName + "]:checked");
	if($selected.length < 1) {
		$.dialog({
			type: 'confirm',
			content: msg,
		    autofocus: true,
		});
		return;
	}
	$selected.each(function(i, checkbox){
		userIds.push($(checkbox).val());
	});
	userId1 = userIds.join();
	var url = context+"/service/bsp/user/batchFunAuthority";
	url += "?userIds="+userId1;
	window.location.href=url;
}

//批量数据授权
function batchDataAuthority(){
	var msg = L.getLocaleMessage("bsp.user.079","请选择要添加的用户！");
	var userIds = [];
	var userId1;
	var $selected = $(":checkbox[name=" + checkboxName + "]:checked");
	if($selected.length < 1) {
		$.dialog({
			type: 'confirm',
			content: msg,
		    autofocus: true,
		});
		return;
	}
	$selected.each(function(i, checkbox){
		userIds.push($(checkbox).val());
	});
	userId1 = userIds.join();
	var url = context+"/service/bsp/user/batchDataAuthoritySkip";
	url += "?userIds="+userId1;
	window.location.href=url;
}

// 复选框全选
function rendercheckbox(data, type, full) {
	if($.inArray(full.userId, specialSubject)>=0){
		return "";
	} else {
    	return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
    }
}

// 操作字段渲染
function renderedit(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.080","编辑");
	var msg2 = L.getLocaleMessage("bsp.user.002","删除");
	var msg3 = "分配角色";
	var msg4 = "加入组";
	
	var delBtn = "<a href=\"javascript:del('"+full.userId+"')\">"+msg2+"</a>";
	if($.inArray(full.userId, specialSubject)>=0){
		delBtn = '<span style="color:#aaa">'+msg2+'</span>';
	}
	var editBtn = "<a href=\"javascript:modify('"+full.userId+"','flag_Edit')\">"+msg1+"</a>";
	var roleAssignment =  "<a href=\"javascript:modify('"+full.userId+"','flag_RoleAssignment')\">"+msg3+"</a>";
	var joinGroup =  "<a href=\"javascript:modify('"+full.userId+"','flag_joinGroup')\">"+msg4+"</a>";
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn + "&nbsp;&nbsp;&nbsp;" + roleAssignment + "&nbsp;&nbsp;&nbsp;" + joinGroup;
}

// 用户状态转换
function renderstatus(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.081","正常");
	var msg2 = L.getLocaleMessage("bsp.user.082","锁定");
	if(data != "" || data != null)
	{
	  if(data == "11"){
		  data = msg1;
	  }
	  if(data == "00" || data == "10"){
		  data = msg2;
	  }			    		    			  
	}
	return data;
}