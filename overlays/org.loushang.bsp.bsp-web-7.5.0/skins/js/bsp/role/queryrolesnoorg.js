$(function(){
	var url = context + "/service/bsp/rolenoorg/queryAllRoles";
	init(url);
	$("#add").click(function(){
		var msg1 = "创建角色";
		var msg2 = "创建角色成功";
		$.dialog({
		    type: 'iframe',
			url: context+"/service/bsp/rolenoorg/addRolePage",
			title: msg1,
			width: 580,
			height: 200,
			onclose: function(){
				var returnValue = this.returnValue;
				if(returnValue){
					sticky(msg2);
					grid.reload();
				}
			} 
		});
	});
	$("#batchdel").click(function(){
	   var msg1 = L.getLocaleMessage("bsp.role.035","确认删除选中记录?");
	   var msg2 = L.getLocaleMessage("bsp.role.036","删除成功！");
	   var msg3 = L.getLocaleMessage("bsp.role.037","角色");
	   var msg4 = L.getLocaleMessage("bsp.role.038","已授权给用户，请先取消授权！");
	   var msg5 = L.getLocaleMessage("bsp.role.039","请选择要删除的记录!");
	   var roleIdArr = getCheckBoxValue();
	   if(roleIdArr.length>0){
		   $.dialog({
			   autofocus:true,
			   type : 'confirm',
			   content : msg1,
			   ok : function(){
				   $.ajax({
						url:context + "/service/bsp/rolenoorg/delrole",
					    data:"idArr="+roleIdArr,
					    type:"POST",
					    dataType:"json",
					    success:function(data){
					    	if(data.length==0){
					    		sticky(msg2)
					    		grid.reload();
					    	}else{
					    		var roleId="";
					    		for(index in data){
					    			roleId = "[" + data[index] +"] "+  roleId 
					    		}
					    		$.dialog({
					    			type:"alert",
					    			content:msg3+roleId+msg4
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
				content : msg5
			});
			return;
	   }
	});
	// checkbox全选
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	$("#query").click(function(){
	   var roleName = $("#roleName").val();
	   var struId = $("#struId").val();
		queryRole(struId,roleName)
	});
});
//条件查询角色信息
function queryRole(struId,roleName){
	var url = context+"/service/bsp/rolenoorg/queryAllRoles";
	grid.setParameter("roleName", roleName);
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
	var msg = L.getLocaleMessage("bsp.role.040","选择所属组织");
	$.dialog({
	    type: 'iframe',
		url: context + "/service/bsp/rolenoorg/organHelp?isChkbox=0&isCascadeSelect=1&selType=1;2&struType=00&showableType=1;2",
		title: msg,
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
	if(full.roleId=="SUPERADMIN"||full.roleId=="PUBLIC"){
		return '';
	}else {
    	return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkboxlist"/>';
    }
};

function renderOpt(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.role.041","编辑");
	var msg2 = L.getLocaleMessage("bsp.role.025","角色授权");
	var msg3 = L.getLocaleMessage("bsp.role.026","批量用户授权");
	var oper= '<div>';
	if(full.roleId=="SUPERADMIN"||full.roleId=="PUBLIC"){
		oper+='<span style="color:#aaa">'+msg1+'</span>'
	} else {
		oper+='<a onclick="update('+"'"+ full.roleCode+"','"+full.roleName+"','"+full.roleId
		+ "'"+')">'+msg1+'</a>';
	}
	oper+='<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="roleAuthrize('+"'"+ data
	+ "'"+')">'+msg2+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="roleBatchAuthorize('+"'"+ data
	+ "'"+')">'+msg3+'</a></div>'
	return oper;
};

function roleAuthrize(data){
	var msg1 = L.getLocaleMessage("bsp.role.025","角色授权");
	var msg2 = L.getLocaleMessage("bsp.role.042","保存成功！");
	$.dialog({
		type:"iframe",
		url:context+"/jsp/bsp/permit/pap/role/roleauthrizenoorg.jsp?roleId="+data,
		title:msg1,
		width:580,
		height:440,
		onclose:function(){
			if(this.returnValue){
				sticky(msg2)
			}
		}
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
		onclose:function(){
		}
	});
	$(".ui-dialog-body").css("padding","0px");
};
//编辑
function update(roleCode,roleName,roleId){
	var msg1 = L.getLocaleMessage("bsp.role.044","编辑");
	var msg2 = L.getLocaleMessage("bsp.role.042","保存成功！");
	var url = context+"/jsp/bsp/permit/pap/role/updatenoorg.jsp?roleCode="+roleCode+"&roleName="+roleName;
	url=encodeURI(encodeURI(url));
	$.dialog({
	    type: 'iframe',
		url: url,
		title: msg1,
		width: 580,
		height: 200,
		onclose: function(){
			var returnValue = this.returnValue;
			if(returnValue!=""){
				$.ajax({
					url:context+"/service/bsp/rolenoorg/updateRoleName",
					data:{"roleId":roleId,"roleName":returnValue.roleName,"roleCode":returnValue.roleCode},
					type:"POST",
					success:function(){
						sticky(msg2)
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