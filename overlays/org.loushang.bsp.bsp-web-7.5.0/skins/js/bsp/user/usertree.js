var checkboxName = "checkboxlist";
var specialSubject = ["superadmin","SUPERADMIN","public","PUBLIC"];
$(document).ready(function(){
	
	// 初始化左侧的组件类别树
	initOrganTypeTree();
	
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
	
	// 更多搜索
	$("#moresearch").popover({
    	"title":"",
    	"content":template('searchpanel',{}),
    	"html": true,
    	"placement": "bottom"
	});
});
////////////////////////////////////以下为树的处理逻辑    //////////////////////////////////////////////

// 初始化组件类别树
function initOrganTypeTree(){
	
	// 存放树节点的数组
	var OrganTypeTree = [];
	
	// 根节点
	var root = {
			type: 'root', 
			name: L.getLocaleMessage("bsp.user.000","组织机构"), 
			isParent: true,
			iconSkin:"icon01",
			isRoot: true,
			struId: 'rootId',
			struType: '00'
	};
	OrganTypeTree.push(root);
	
	// ztree设置
	treeSetting = {
			async : {
				enable: true,
				url: context + "/service/bsp/user/treeData", 
				autoParam: ["struId", "struType"],
				dataFilter: dataFilter
			},
			callback : {
				onClick: onClick,
				onExpand: onExpand,
				beforeDrag: beforeDrag
			},
			edit : {
				// 不显示ztree默认提供的按钮
				enable : true,
				showRemoveBtn : false,
				showRenameBtn : false
			}
	}
	
	// 初始化组件类别树
	tree = $.fn.zTree.init($("#organTypeTree"), treeSetting, OrganTypeTree);
	
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	
	// 展开根节点
	tree.expandNode(rootNode);
}

function onClick(e,treeId, treeNode) {
	//tree.expandNode(treeNode, "", false, true, true);
	var url = context+"/service/bsp/user/data";
	var param = {};
	if(treeNode.struId!="rootId"){
		param={"organId":treeNode.organId};
	}
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);
}

// 树节点展开后：如果没有子节点，则将该节点设置成子节点
function onExpand(e, treeId, treeNode) {
	if(treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
}

//拖动树节点之前：不允许拖动
function beforeDrag(treeId, treeNodes) {
	return false;
}

// 处理查询到的子节点：设置是否为父节点(isParent)->设置节点的name属性用于树的展现
function dataFilter(treeId, parentNode, childNodes){
	if(childNodes.length<1){
		return childNodes;
	}
	for(var i = 0 ; i < childNodes.length ; i++) {
		var childNode = childNodes[i];
		childNode["isParent"] = true;
		childNode["name"] = childNode["organName"];
	}
	return childNodes;
}

// /////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
// 初始化表格
function initTable() {
	var options = {
		"ordering": false,
		"btnDefs": [

		            ]
	};
	var url = context +　"/service/bsp/user/data";
	grid = new L.FlexGrid("userList",url);
	grid.init(options);
}

// 编辑用户
function modify(data) {
	var recordIds = data;
	var url = context+"/service/bsp/user/edit";
	url += "?userId="+recordIds;
	window.location.href=encodeURI(encodeURI(url));
}

// 删除用户
function del(data) {
	var msg = L.getLocaleMessage("bsp.user.075","确认删除该记录?");
	var recordIds = data;
	var url = context+"/service/bsp/user/del";
	url += "?userId="+recordIds;
	urls=encodeURI(encodeURI(url,"utf-8"));
	$.dialog({
		type: 'confirm',
		content: msg,
	    autofocus: true,
		ok: function() {
				window.location.href=urls;
			},
		cancel: function(){}
	});
}

// 批量删除户
function batchDel(userId){
	var msg1 = L.getLocaleMessage("bsp.user.076","请选择要删除的记录！");
	var msg2 = L.getLocaleMessage("bsp.user.075","确认删除该记录?");
	var msg3 = L.getLocaleMessage("bsp.user.077","删除时出错");
	var userIds = [];
	if(userId) {
		userIds.push(userId);
	}else{
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
		userIds = userIds.join();
		var url = context+"/service/bsp/user/batchDel";
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
							window.location.href = context + "/service/bsp/user";
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
}

// 增加用户
function addUser(data) {
	var url = context +　"/service/bsp/user/addPage";
	window.location.href = url;
}

// 查询
function queryForm(){
	var userId = $("#toUserId").val();
	var userName = $("#toUserName").val();
	var url = context+"/service/bsp/user/data";
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
	
	var delBtn = "<a href=\"javascript:del('"+full.userId+"')\">"+msg2+"</a>";
	if($.inArray(full.userId, specialSubject)>=0){
		delBtn = '<span style="color:#aaa">'+msg2+'</span>';
	}
	var editBtn = "<a href=\"javascript:modify('"+full.userId+"')\">"+msg1+"</a>";
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
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