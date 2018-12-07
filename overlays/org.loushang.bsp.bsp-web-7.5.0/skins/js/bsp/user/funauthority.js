var flag;
var isSelected,roleType;
var common,global,internal;

//提示信息
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg, //提示框显示内容
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    });
}

$(document).ready(function(){
	
	// 初始化datatable
	initFunctionTable();
	
	// 查询 
	$("#queryUser").on("click",function() { 
		queryUserForm(); 
	});
	
	// 回车事件
	$("#toRoleName").keydown(function(event) {
		if(event.keyCode==13){ 
			queryUserForm();
		}
	});
	
	// 选择角色类型（可选和已选）
	$("#selectall").on("click",function(){
		$("#selectBtn").html($("#selectall").html()+"<span class='caret'>");
		querySel("all");
	});
	
	$("#selectes").on("click",function(){
		$("#selectBtn").html($("#selectes").html()+"<span class='caret'>");
		querySel("no");
	});
	
	$("#selecteds").on("click",function(){
		$("#selectBtn").html($("#selecteds").html()+"<span class='caret'>");
		querySel("yes");
	});
	
	// 选择角色类型（普通、全局和内置）
	$("#typeRole").on("click",function(){
		$("#allRoles").html($("#typeRole").html()+"<span class='caret'>");
		flag = "allTypes";
		queryTypeRole();
	});
	
	$("#commonRole").on("click",function(){
		$("#allRoles").html($("#commonRole").html()+"<span class='caret'>");
		flag = "common";
		queryTypeRole();
	});
	
	$("#globalRole").on("click",function(){
		$("#allRoles").html($("#globalRole").html()+"<span class='caret'>");
		flag = "global";
		queryTypeRole();
	});
	
	$("#interiorRole").on("click",function(){
		$("#allRoles").html($("#interiorRole").html()+"<span class='caret'>");
		flag = "internal";
		queryTypeRole();
	});
});

///////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
//初始化表格
function initFunctionTable() {
	var options = {
		"ordering": false,
		"btnDefs": [
					
				  ]
	};
	var url = context+"/service/bsp/user/functionData";
	gridFun = new L.FlexGrid("functionList",url);
	gridFun.setParameter("userId",$("#userId").val());
	gridFun.setParameter("loginUserId",signId)
	gridFun.init(options);
}

// 用户状态转换
function operations(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.001","添加");
	var msg2 = L.getLocaleMessage("bsp.user.002","删除");
	if(data != "" && data != null)
	{
	  if(data == "no"){
		  data = "<button type='button' class='add btn ue-btn-primary'/>"+msg1+"</button>";
	  }
	  if(data == "yes"){
		  data = "<button type='button' class='add btn ue-btn'/>"+msg2+"</button>";
	  }			    		    			  
	}
	return data;
}

// 查询
function queryUserForm(){
	var roleName = $("#toRoleName").val();
	var url = context+"/service/bsp/user/functionData";
	var param={"roleName":roleName,"userId":$("#userId").val(),"loginUserId":signId,"isSelected":isSelected,"roleType":roleType};
	url=encodeURI(url,"utf-8");
	gridFun.reload(url,param);
}

// 可选/已选角色查询
function querySel(isSel){
	isSelected = isSel;
	common = isSelected;
	global = isSelected;
	internal = isSelected;
	var roleName = $("#toRoleName").val();
	var url = context+"/service/bsp/user/functionData";
	var param={"roleName":roleName,"userId":$("#userId").val(),"loginUserId":signId,"isSelected":isSelected,"roleType":roleType};
	url=encodeURI(url,"utf-8");
	gridFun.reload(url,param);
}

// 查询角色类型
function queryTypeRole(){
	roleType = flag;
	var roleName = $("#toRoleName").val();
	var url = context+"/service/bsp/user/functionData";
	var param={"roleName":roleName,"userId":$("#userId").val(),"loginUserId":signId,"isSelected":isSelected,"roleType":roleType};
	url=encodeURI(url,"utf-8");
	gridFun.reload(url,param);
}

// 操作
$(document).on("click",".add",function() {
	var msg1 = L.getLocaleMessage("bsp.user.084","用户ID为空不可添加");
	var msg2 = L.getLocaleMessage("bsp.user.085","添加成功!");
	var msg3 = L.getLocaleMessage("bsp.user.086","删除成功!");
	var msgAdd = L.getLocaleMessage("bsp.user.001","添加");
	var msgDel = L.getLocaleMessage("bsp.user.002","删除");

	var editRoleId = gridFun.oTable.row($(this).parents("tr")).data().roleId;
	var isSelected = gridFun.oTable.row($(this).parents("tr")).data().isSelected;
	var userId = $("#userId").val();
	var temp=$(this).parents("tr").find("button[type='button']").html();

	if(temp==msgAdd){
		isSelected="no";
		$(this).parents("tr").find("button[type='button']").removeClass("ue-btn-primary");
		$(this).parents("tr").find("button[type='button']").addClass("ue-btn");
		$(this).parents("tr").find("button[type='button']").html(msgDel);
	}else{
		isSelected="yes";
		$(this).parents("tr").find("button[type='button']").removeClass("ue-btn");
		$(this).parents("tr").find("button[type='button']").addClass("ue-btn-primary");
		$(this).parents("tr").find("button[type='button']").html(msgAdd);
	}
	
	if(userId == "" || userId == null || userId ==undefined){
		$.dialog({
			type: 'confirm',
			content: msg1,
		    autofocus: true
		});
	}else {
		if(isSelected=="no"){
			$.ajax({
	            url:context+"/service/bsp/user/addAutority",
	            data:JSON.stringify({"addRoleId":editRoleId,"userId":userId}),
	            type:"post",
	            contentType: "application/json",
	            async:false,
	            success:function(){
	            	sticky(msg2);
	            }
	        });
		}
		if(isSelected=="yes"){
			$.ajax({
	            url:context+"/service/bsp/user/deleteAutority",
	            data:JSON.stringify({"delRoleId":editRoleId,"userId":userId}),
	            type:"post",
	            contentType: "application/json",
	            async:false,
	            success:function(){
	            	sticky(msg3);
	            }
	        });
		}
	}
});