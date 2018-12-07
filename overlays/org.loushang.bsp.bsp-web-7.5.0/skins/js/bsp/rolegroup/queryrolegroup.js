//添加角色组 表单
var vForm;
//记录状态：新增(1)、修改(3)
var state;
//提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}
function alert(msg) {
	$.dialog({
		type : "alert",
		content : msg
	});
}

$(function(){
	var url = context + "/service/bsp/rolegroup/queryAllRoleGroup";
	init(url);
	
	//初始化 添加角色组 的模态框
	initAddRoleGroup();
	
	// "添加角色组" 按钮
	$("#addRoleGroup").click(function(e) {
		state=1;
		addRoleGroup();
	});
	
	// "删除角色组"按钮
	$("#batchdel").click(function(e) {
		del();
	});
	
	//
	$("#query").click(function(e){
		var roleGroupName=$("#queryRoleGroupName").val();
		queryRoleGroup(roleGroupName);
	});
	
});

//初始化表格
function init(url){
	var options = {};
	grid = new L.FlexGrid("roleGroupList",url);
	grid.init(options);
}

//渲染 复选框
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
};

//渲染 操作 列的数据
function renderOpt(data,type,full){
	return '<div>'
	+'<a onclick="update('+"'"+full.roleGroupId+"'"+')">'+L.getLocaleMessage("bsp.rolegroup.007","编辑")+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="del('+"'"+ full.roleGroupId+"'"+')">'+L.getLocaleMessage("bsp.rolegroup.008","删除")+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="roleList('+"'"+ full.roleGroupId+ "'"+')">'+L.getLocaleMessage("bsp.rolegroup.009","角色列表")+'</a>'
	+'<span>&nbsp;&nbsp;&nbsp;</span>'
	+'<a onclick="definedRole('+"'"+ full.roleGroupId+ "','"+ full.roleGroupName+ "','"+ full.corporation+ "'"+')">'+L.getLocaleMessage("bsp.rolegroup.010","定义角色")+'</a></div>'
};


//初始化 添加角色组 的模态框
function initAddRoleGroup(){
	$("#addRoleGroupModal").modal({
		show : false,
		backdrop : "static"
	});
	
	// 选择所属单位和应用范围
	$(".select-organName,.select-useCorporationName").bind("click",function(){
		
		var id=$(this).prev().attr("id");
		selectOrganName(id);
	})
	
	// 校验
	vForm = $("#addRoleGroupForm").Validform({
		btnSubmit : "#saveVal",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback : function(form) {
			saveRoleGroup();
		},
		datatype : {
			//校验角色组名字
			"valid_roleGroupNameOrOrganName" : valid_roleGroupNameOrOrganName,
		}
	});

	// “取消”按钮
	$("#cancel").click(function() {
		$("#addRoleGroupModal").modal("hide");
	});
	
}

//添加角色组
function addRoleGroup(){
	// 重置表单
	$(".Validform_wrong").text("");
	vForm.resetForm();
	//手动打开模态框
	$('#addRoleGroupModal').modal("show");
}

//校验 角色组名称 和 所属单位：非空
function valid_roleGroupNameOrOrganName(gets, obj, curform, regxp){
	if (gets == null || gets == "") {
		return false;
	}
	if(!regxp["ls"].test(gets)) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.rolegroup.019","请输入中、英文或下划线"));
		return false;
	}
	if (gets.length > 30) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.rolegroup.020","不能超过30个字符"));
		return false;
	}
}
//选择所属单位或范围
function selectOrganName(id){
	var url=context + "/service/bsp/organHelp?isChkbox=0&isCascadeSelect=1&selType=1;2&struType=00&showableType=1;2";
	if(id!="organName"){
		url=context + "/service/bsp/organHelp?isChkbox=1&isCascadeSelect=0&selType=1;2&struType=00&showableType=1;2"
	}
	$.dialog({
		type: 'iframe',
		url: url,
		title: L.getLocaleMessage("bsp.rolegroup.021","选择组织"),
		width: 580,
		height: 400,
		onclose: function(){
			var node = this.returnValue;
			if(typeof node!='string'){
				if(id=="organName"){
					
					if(node.length>0){
						var organName = node[0].organName;
						var struId = node[0].struId;
						$("#organName").val(organName);
						$("#organName_struId").val(struId);
					} else {
						$("#organName").val("");
						$("#organName_struId").val("");
					}
				}else{
					
					if(node.length>0){
						var useCorporationName=node[0].organName;
						for(var i=1;i<node.length;i++){
							useCorporationName=useCorporationName+","+node[i].organName;
						}
						var struId = node[0].struId;
						for(var i=1;i<node.length;i++){
							struId=struId+","+node[i].struId;
						}
						$("#useCorporationName").val(useCorporationName);
						$("#useCorporationName_struId").val(struId);
					} else {
						$("#useCorporationName").val("");
						$("#useCorporationName_struId").val("");
					}
				}
			}
			
			//显式的调用表达验证
			vForm.check();
		} 
	});
}

//保存 新增或编辑后的 角色组
function saveRoleGroup(){
	
	var url=context + "/service/bsp/rolegroup/addRoleGroup?state="+state;
	if(state==3){
		url=context + "/service/bsp/rolegroup/updateRoleGroup?state="+state+"&roleGroupId="+update_roleGroupId;
	}
	//jquery.form.js的ajaxSubmit使用
	$("#addRoleGroupForm").ajaxSubmit({
        type: "post",
        url: url,
        error:function(data){
            alert("error："+data);  
        },
        success:function(data){
        	sticky(L.getLocaleMessage("bsp.rolegroup.022","保存成功！"));
        	grid.reload();
    		return false;
        }  
    });
	
	$('#addRoleGroupModal').modal("hide");
}

//删除角色组或删除 
function del(roleGroupId){
	var roleGroupIds=[];
	$(":checkbox[name=checkboxlist]:checked").each(function(){
		roleGroupIds.push(this.value);
	});
	
	if(roleGroupId) {
		roleGroupIds = [roleGroupId];
	}
	
	if(roleGroupIds.length < 1) {
		alert(L.getLocaleMessage("bsp.rolegroup.023","请选择要删除的记录！"));
		return false;
	}
	$.dialog({
		type : "confirm",
		content : L.getLocaleMessage("bsp.rolegroup.024","确认删除选中记录?"),
		autofocus : true,
		ok : function() {
			$.ajax({
				url : context + "/service/bsp/rolegroup/deleteRoleGroup/" + roleGroupIds.join(","),
				async : false,
				success : function(data) {
					sticky(L.getLocaleMessage("bsp.rolegroup.025","删除成功！"));
					// 刷新表格
					grid.reload();
				},
				error : function(msg) {
					alert(msg.responseText);
				}
			});
		},
		cancel : function() {
		}
	});
}

//编辑 
var update_roleGroupId;//记录需要编辑的角色组的id
function update(roleGroupId){
	state=3;
	update_roleGroupId=roleGroupId;
	var url=context + "/service/bsp/rolegroup/queryRoleGroupById?roleGroupId="+roleGroupId;
	$.ajax({
		url: url,
		async: false,
		contentType: "application/json;charset=UTF-8",
		success:function(data){
			//处理返回的json数据
			var d=data.data;
			var rs=d[0];
			
			// 重置表单
			$(".Validform_wrong").text("");
			vForm.resetForm();
			
			//回显表单数据
			$("#roleGroupName").val(rs.roleGroupName);//角色组名字
			$("#organName").val(rs.organName);//所属组织名
			$("#organName_struId").val(rs.corporation);//所属组织的组织id
			
			$("#useCorporationName").val(rs.useCorporationName);//应用范围组织名
			$("#useCorporationName_struId").val(rs.useCorporationId);//应用范围组织id
			$("#description").val(rs.description);
			
		} ,
	});	
	
	//手动打开模态框
	$('#addRoleGroupModal').modal("show");
	$("#addRoleGroupModal .modal-title").text(L.getLocaleMessage("bsp.rolegroup.007","编辑"));
	
}

//查询角色组 搜索框
function queryRoleGroup(roleGroupName){
	var url = context + "/service/bsp/rolegroup/queryAllRoleGroup?roleGroupName="+roleGroupName;
	url=encodeURI(encodeURI(url));
	grid.reload(url);
}

//角色列表  查询 
function roleList(roleGroupId){
	var url=context + "/service/bsp/rolegroup/queryRoleListByRoleGroupId?roleGroupId="+roleGroupId;
	window.location.href = url;
	
}

//定义角色功能
function definedRole(roleGroupId,roleGroupName,corporation){
	var url= context + "/service/bsp/rolegroup/addRolePage?roleGroupId="+roleGroupId+"&corporation="+corporation+"&roleGroupName="+roleGroupName;
	url=encodeURI(encodeURI(url));
	window.location.href = url;
	
}