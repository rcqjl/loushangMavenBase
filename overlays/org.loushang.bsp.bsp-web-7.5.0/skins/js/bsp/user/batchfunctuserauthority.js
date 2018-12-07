var isSelected = "no";
$(document).ready(function(){
	
	//可选角色tab页
	$("#selectTab").click(function(){
		isSelected = "no";
		gridBatchFunct.reload();
	});
	
	//已选角色tab页
	$("#selectedTab").click(function(){
		isSelected = "yes";
		gridBatchFuncted.reload();
	});
	
	// 初始化可选角色datatable
	initBatchFunctionSelectTable();
	
	//初始化已选角色datatable
	initBatchFunctionSelectedTable();
	
	//角色类型按钮点击样式
	$("#forwardType .ue-btn").click(function(){
		$(this).siblings(".selected").removeClass("selected");
		$(this).addClass("selected");
	});

	//所有角色
	$("[name='batfAll']").click(function(){
		roleType();
	});
	
	//全局角色
	$("[name='batfGlobal']").each(function(){
		$(this).click(function(){
			roleType("global");
		});
	});
	
	//普通角色
	$("[name='batfCommon']").each(function(){
		$(this).click(function(){
			roleType("common");
		});
	});
	
	//内置角色
	$("[name='batfInternal']").each(function(){
		$(this).click(function(){
			roleType("internal");
		});
	});
	
	//查询
	$("[name='batfQuery']").each(function(){
		$(this).click(function(){
			batfQuery();
		});
	});
	
	//查询回车事件
	$("[name='toBatUserName']").each(function(){
		$(this).keydown(function(event){
			if(event.keyCode==13){ 
				batfQuery();
			}
		});
	});
});

///////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
//初始化可选角色表单
function initBatchFunctionSelectTable() {
	var options = {
		"ordering": false,
		"btnDefs": [

		            ]
	};
	userId2 = usersId;
	var url = context+"/service/bsp/user/functionData";
	gridBatchFunct = new L.FlexGrid("isSelectList",url);
	gridBatchFunct.setParameter("userId",userId2);
	gridBatchFunct.setParameter("isSelected","no");
	gridBatchFunct.setParameter("loginUserId",siginId);
	gridBatchFunct.init(options);
}

//初始化已选角色表格
function initBatchFunctionSelectedTable() {
	var optionsed = {
		"ordering": false,
		"btnDefs": [

		            ]
	};
	var url = context+"/service/bsp/user/functionData";
	gridBatchFuncted = new L.FlexGrid("isSelectedList",url);
	gridBatchFuncted.setParameter("userId",userId2);
	gridBatchFuncted.setParameter("isSelected","yes");
	gridBatchFuncted.setParameter("loginUserId",siginId);
	gridBatchFuncted.init(optionsed);
}

//角色类型选择
function roleType(roleType){
	var url = context+"/service/bsp/user/functionData";
	if(isSelected == "no"){
		gridBatchFunct.setParameter("roleType",roleType);
		gridBatchFunct.setParameter("userId",userId2);
		gridBatchFunct.setParameter("isSelected",isSelected);
		gridBatchFunct.reload();
	} 
	if(isSelected == "yes"){
		gridBatchFuncted.setParameter("roleType",roleType);
		gridBatchFuncted.setParameter("userId",userId2);
		gridBatchFuncted.setParameter("isSelected",isSelected);
		gridBatchFuncted.reload();
	}
}

//查询
function batfQuery(){
	var url = context+"/service/bsp/user/functionData";
	if(isSelected == "no"){
		roleName = $("#toBatUserNameId1").val();
		gridBatchFunct.setParameter("roleName",roleName);
		gridBatchFunct.reload();
	} 
	if(isSelected == "yes"){
		roleName = $("#toBatUserNameId2").val();
		gridBatchFuncted.setParameter("roleName",roleName);
		gridBatchFuncted.reload();
	}
}

//用户状态转换
function batchOperations(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.001","添加");
	var msg2 = L.getLocaleMessage("bsp.user.027","取消");
	if(data != "" || data != null)
	{
	  if(data == "no"){
		  data = "<a href=\"javascript:editAutority('"+userId2+"','"+full.roleId+"','"+full.isSelected+"')\"><button type='button' class='btn ue-btn-primary'/>"+msg1+"</button></a>";
	  }
	  if(data == "yes"){
		  data = "<a href=\"javascript:editAutority('"+userId2+"','"+full.roleId+"','"+full.isSelected+"')\"><button type='button' class='btn ue-btn'/>"+msg2+"</button></a>";
	  }			    		    			  
	}
	return data;
}

//操作
function editAutority(userId,roleId,isSelected){
	var editRoleId = roleId;
		if(isSelected=="no"){
			$.ajax({
	            url:context+"/service/bsp/user/addAutority",
	            data:JSON.stringify({"addRoleId":editRoleId,"userId":userId}),
	            type:"post",
	            contentType: "application/json",
	            async:false,
	            success:function(data){
	            	gridBatchFunct.reload();
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
	            success:function(data){
	            	gridBatchFuncted.reload();
	            }
	        });
		}
}