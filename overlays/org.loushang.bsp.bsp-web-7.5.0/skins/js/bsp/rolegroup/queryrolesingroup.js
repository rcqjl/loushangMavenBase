$(function(){
	url=context + "/service/bsp/rolegroup/queryRolesByRoleGroupId?roleGroupId="+roleGroupId;
	init(url);
	
	$("#add").click(function(){
		var url= context + "/service/bsp/rolegroup/addRolePage?roleGroupId="+roleGroupId+"&roleGroupName="+roleGroupName;
		url=encodeURI(encodeURI(url));
		window.location.href = url;
	});
	
	$("#batchdel").click(function(){
	   var roleIdArr = getCheckBoxValue();
	   if(roleIdArr.length>0){
		   $.dialog({
			   autofocus:true,
			   type : 'confirm',
			   content : L.getLocaleMessage("bsp.rolegroup.024","确认删除选中记录?"),
			   ok : function(){
				   $.ajax({
						url:context + "/service/bsp/role/delrole",
					    data:"idArr="+roleIdArr,
					    type:"POST",
					    dataType:"json",
					    success:function(data){
					    	if(data.length==0){
					    		sticky(L.getLocaleMessage("bsp.rolegroup.025","删除成功！"))
					    		grid.reload();
					    	}else{
					    		var roleId="";
					    		for(index in data){
					    			roleId = "[" + data[index] +"] "+  roleId 
					    		}
					    		$.dialog({
					    			type:"alert",
					    			content:L.getLocaleMessage("bsp.rolegroup.026", "角色{0}已授权给用户，请先取消授权！", roleId)
					    		});
					    		grid.reload();
					    	}
					    	
					    }
					});
			   },
			   cancel : function() {
				}
		   });
		   
	   }else{
		   $.dialog({
				autofocus:true,
				type : "alert",
				content : L.getLocaleMessage("bsp.rolegroup.023","请选择要删除的记录!")
			});
			return;
	   }
	});
	
	$("#query").click(function(){
	   var roleName = $("#roleName").val();
	   queryRole(roleName)
	});
	
	$("#undoBtn").click(function(){
		window.location.href = context + "/service/bsp/rolegroup";
	});
});
//条件查询角色信息
function queryRole(roleName){
	var url = context+"/service/bsp/role/queryAllRoles?roleName="+roleName+"&roleGroupId="+roleGroupId;
	url=encodeURI(encodeURI(url));
	grid.reload(url);
}
//初始化表格
function init(url){
	var options = {};
	grid = new L.FlexGrid("roleList",url);
	grid.init(options);
}
//////////////////////////////////////////////////////////////////////////////////
function selectOrgan(data){
	$.dialog({
	    type: 'iframe',
		url: context + "/service/bsp/organHelp?isChkbox=0&isCascadeSelect=1&selType=1;2&struType=00&showableType=1;2",
		title: L.getLocaleMessage("bsp.rolegroup.021",'选择所属组织'),
		width: 580,
		height: 400,
		onclose: function(){
			var node = this.returnValue;
			if(typeof node!='string'){
				if(node.length>0){
					var organName = node[0].organName;
					var struId = node[0].struId;
					$("#relationName").val(organName);
					$("#struId").val(struId);
				} else {
					$("#relationName").val("");
					$("#struId").val("");
				}
			}
		} 
	});
}
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
};

function renderOpt(data,type,full){
	return '<div>'
	+'<a onclick="update('+"'"+ full.roleCode+"','"+full.roleName+"','"+full.roleId
	+ "'"+')">'+L.getLocaleMessage("bsp.rolegroup.007","编辑")+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="roleAuthrize('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("bsp.role.025","角色授权")+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="roleBatchAuthorize('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("bsp.role.026","批量用户授权")+'</a></div>'
};
function renderstatus(data,type,full){
	if (data == "1") {
		data = L.getLocaleMessage("bsp.role.056","全局");
	} else {
		data = full.organName;
	}
	return data;
};
function roleAuthrize(data){
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/roleauthrize.jsp?roleId="+data,
		title:L.getLocaleMessage("bsp.role.025",'角色授权'),
		width:580,
		height:440,
		onclose:function(){
			if(this.returnValue){
				sticky(L.getLocaleMessage("bsp.rolegroup.022","保存成功！"))
			}
		}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//批量用户授权
function roleBatchAuthorize(data){
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/rolebatchauthorize.jsp?roleId="+data,
		title:L.getLocaleMessage("bsp.role.043",'将角色批量授权给用户'),
		width:750,
		height:470,
		onclose:function(){
		}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//编辑
function update(roleCode,roleName,roleId){
	var url = context+"/jsp/bsp/permit/pap/role/update.jsp?roleCode="+roleCode+"&roleName="+roleName;
	url=encodeURI(encodeURI(url));
	$.dialog({
	    type: 'iframe',
		url: url,
		title: L.getLocaleMessage("bsp.rolegroup.007",'编辑'),
		width: 580,
		height: 200,
		onclose: function(){
			var returnValue = this.returnValue;
			if(returnValue!=""){
				$.ajax({
					url:context+"/service/bsp/role/updateRoleName",
					data:{"roleId":roleId,"roleName":returnValue.roleName,"roleCode":returnValue.roleCode},
					type:"POST",
					success:function(){
						sticky(L.getLocaleMessage("bsp.rolegroup.022","保存成功！"))
						grid.reload();
					}
				});
			}
		} 
	});
}
//checkbox全选 
function selectAll(checked){
	$(":checkbox[name=checkboxlist]").prop("checked", checked);
}

// 获取选中的复选框中的值
// 返回值为数组，数组中的每一项为一个表单ID
function getCheckBoxValue() {
	var idArr = new Array();
	$(":checkbox[name=checkboxlist]:checked").each(function(){
		idArr.push(this.value);
	});
	
	return idArr;
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