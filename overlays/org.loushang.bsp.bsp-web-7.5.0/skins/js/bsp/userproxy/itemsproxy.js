//全局变量
var menuTree, menuTypeId;
var tree, rootNode;
// 常量
var Constants = {
	// 树节点图标类名
	Icon : {
		App : "app",
		Module : "module",
		Function : "function",
		Operation : "operation"
	}
};
var dialog = parent.dialog.get(window);
$(function() {
	// 初始化tab页
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
	// 初始化菜单类别选择按钮
	initMenuTypeSelector();
	// 初始化组织树
	initFunctionTree();
	// 保存
	$("#saveBtn").click(function() {
		save();
	});
	// 取消
	$("#returnBtn").click(function() {
		dialog.remove();
	});
});
// //////////////////////////////////菜单树///////////////////////////////////
// 初始化菜单类别选择按钮
function initMenuTypeSelector() {
	$.ajax({
		url : context + "/service/bsp/role/getAllMenuTypes",
		dataType : "json",
		async : false,
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var opt = "<option value=" + data[i].menuTypeId + ">"
						+ data[i].menuTypeName + "</option>";
				$("#menu-type").append(opt);
			}
			initMenuTree(data[0].menuTypeId, data[0].menuTypeName);
		},
		error : function(e) {
			alert("请求出错");
		}
	});
};
// 初始化菜单树
function initMenuTree(typeId, typeName) {
	menuTypeId = typeId;
	// 用于存储树的节点
	var treeNodes = [];

	// 定义根节点
	root = {
		proxypermissionId : proxypermissionId,
		menuId : "rootId",
		menuStruId : "rootId",
		menuTypeId : menuTypeId,
		type : "",
		name : typeName,
		isParent : true,
		iconSkin : "icon01",
		isRoot : true,
		nocheck : true,
		isLeaf : "0",
	};

	treeNodes.push(root);

	// ztree设置
	var treeSetting = {
		async : {
			enable : true,
			url : context
					+ "/service/bsp/proxypermissionlist/getItemsProxyMenuAuthorizeTreeData",
			autoParam : [ "proxypermissionId", "type", "menuTypeId",
					"menuStruId", "menuId", "isLeaf" ],
			dataFilter : menuDataFilter
		},
		callback : {
			onClick : menuOnClick,
			onExpand : menuOnExpand,
		},
		edit : {
			// 不显示ztree默认提供的按钮
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		check : {
			autoCheckTrigger : false,
			chkboxType : {
				"Y" : "ps",
				"N" : "ps"
			},
			chkStyle : "checkbox",
			enable : true,
			nocheckInherit : false,
			chkDisabledInherit : false,
			radioType : "level"
		},

	};
	// 初始化菜单树
	menuTree = $.fn.zTree.init($("#menuTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = menuTree.getNodes()[0];
	// 展开根节点
	menuTree.expandNode(rootNode);
};
function menuOnClick(e, treeId, treeNode) {
	menuTree.expandNode(treeNode, "", false, true, true);
};
function menuDataFilter(treeId, parentNode, childNodes) {
	// 会话超时
	if (!Array.isArray(childNodes)) {
		sticky(childNodes);
	}
	for (var i = 0; i < childNodes.length; i++) {
		var childNode = childNodes[i];
		if (childNode.nodeState == "1") {
			childNode.checked = true;
		}
		if (childNode.nodeState == "0") {
			childNode.halfCheck = true;
			childNode.checked = true;
		}
		if (childNode.nodeState == "-1") {
			childNode.checked = false;
		}
		childNode["menuTypeId"] = menuTypeId;
		childNode["name"] = childNode["nodeName"];
		childNode["type"] = childNode["nodeType"];
		childNode["menuStruId"] = childNode["menuStruId"];
		childNode["menuId"] = childNode["nodeId"]
		childNode["isParent"] = childNode["nodeType"] != "operation";

		childNode["proxypermissionId"] = proxypermissionId;
	}
	return childNodes;
};

function menuOnExpand(e, treeId, treeNode) {
	if (treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		menuTree.updateNode(treeNode);
	}
};
// /////////////////////////////////////功能树/////////////////////////////////
// 初始化功能树
function initFunctionTree() {
	// 用于存储树的节点
	var treeNodes = [];

	// 定义根节点
	root = {
		proxypermissionId : proxypermissionId,
		menuId : "rootId",
		type : "",
		name : L.getLocaleMessage("bsp.function.061","功能操作树"),
		isParent : true,
		iconSkin : "icon01",
		isRoot : true,
		nocheck : true,
		isLeaf : "0",
	};

	treeNodes.push(root);

	// ztree设置
	var treeSetting = {
		async : {
			enable : true,
			url : context
					+ "/service/bsp/proxypermissionlist/getItemsProxyNMenuAuthorizeTreeData",
			autoParam : [ "proxypermissionId", "type", "menuId", "isLeaf" ],
			dataFilter : dataFilter
		},
		callback : {
			onClick : onClick,
			onExpand : onExpand,
			beforeDrag : beforeDrag
		},
		edit : {
			// 不显示ztree默认提供的按钮
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		check : {
			autoCheckTrigger : false,
			chkboxType : {
				"Y" : "ps",
				"N" : "ps"
			},
			chkStyle : "checkbox",
			enable : true,
			nocheckInherit : false,
			chkDisabledInherit : false,
			radioType : "level"
		}
	};
	// 初始化功能树
	tree = $.fn.zTree.init($("#functionTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 展开根节点
	tree.expandNode(rootNode);
}

function onClick(e, treeId, treeNode) {
	tree.expandNode(treeNode, "", false, true, true);
}

function dataFilter(treeId, parentNode, childNodes) {
	// 会话超时
	if (!Array.isArray(childNodes)) {
		sticky(childNodes);
	}
	for (var i = 0; i < childNodes.length; i++) {
		var childNode = childNodes[i];
		// 根据节点类型选择节点图标
		if (childNode.nodeType == "app") {
			childNode["iconSkin"] = Constants.Icon.App;
		}
		if (childNode.nodeType == "module") {
			childNode["iconSkin"] = Constants.Icon.Module;
		}
		if (childNode.nodeType == "function") {
			childNode["iconSkin"] = Constants.Icon.Function;
		}
		if (childNode.nodeType == "operation") {
			childNode["iconSkin"] = Constants.Icon.Operation;
		}
		// 判断设置节点选中状态
		if (childNode.nodeState == "1") {
			childNode.checked = true;
		}
		if (childNode.nodeState == "0") {
			childNode.halfCheck = true;
			childNode.checked = true;
		}
		if (childNode.nodeState == "-1") {
			childNode.checked = false;
		}
		childNode["name"] = childNode["nodeName"];
		childNode["type"] = childNode["nodeType"];
		childNode["menuStruId"] = childNode["menuStruId"];
		childNode["menuId"] = childNode["nodeId"]
		childNode["isParent"] = childNode["nodeType"] != "operation";

		childNode["proxypermissionId"] = proxypermissionId;
	}
	return childNodes;
}

// 树节点展开后：如果没有子节点，则将该节点设置成子节点
function onExpand(e, treeId, treeNode) {
	if (treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
}

// 拖动树节点之前：不允许拖动
function beforeDrag(treeId, treeNodes) {
	return false;
}

// //////////////////////////////////////////////////////////////////////
function save() {
	var typeId;
	var treeId = $(".active").find(".ztree")[0].id;
	if (treeId == "functionTree") {
		typeId = "1"
		var returnVal = getMenuTreeResult(tree)
	} else if (treeId == "menuTree") {
		typeId = menuTypeId;
		var returnVal = getMenuTreeResult(menuTree)
	}
	var data = {
		"menuTypeId" : typeId,
		"proxypermissionId" : proxypermissionId,
		"appCodeList" : returnVal.appCodeArray.toString(),
		"moduleCodeList" : returnVal.moduleCodeArray.toString(),
		"functionCodeList" : returnVal.functionCodeArray.toString(),
		"operationCodeList" : returnVal.operationCodeArray.toString(),
		"userDefindCodeList" : returnVal.userDefinedArray.toString(),
		"appCodeCancelingList" : returnVal.appCodeCancelingArray.toString(),
		"moduleCodeCancelingList" : returnVal.moduleCodeCancelingArray
				.toString(),
		"functionCodeCancelingList" : returnVal.functionCodeCancelingArray
				.toString(),
		"operationCodeCancelingList" : returnVal.operationCodeCancelingArray
				.toString(),
		"userDefindCodeCancelingList" : returnVal.userDefinedCancelingArray
				.toString(),
	}
	$.ajax({
		url : context + "/service/bsp/proxypermissionlist/addItemsToProxy",
		data : data,
		type : "POST",
		success : function() {

			dialog.close(true);
			dialog.remove();
		},
		error : function() {

			dialog.close(true);
			dialog.remove();
		}
	});
};
function changeMenuTree() {
	var typeId = $("option:selected").val();
	var typeName = $("option:selected").text();
	menuTypeId = typeId;
	initMenuTree(typeId, typeName)
}
// 获得选择的结果
function getMenuTreeResult(treeObj) {
	// 新增的
	var appCodeArray = [];
	var moduleCodeArray = [];
	var functionCodeArray = [];
	var operationCodeArray = [];
	var userDefinedArray = [];
	// 取消的
	var appCodeCancelingArray = [];
	var moduleCodeCancelingArray = [];
	var functionCodeCancelingArray = [];
	var operationCodeCancelingArray = [];
	var userDefinedCancelingArray = [];
	var nodes = treeObj.getChangeCheckedNodes();
	for (index in nodes) {
		var type = nodes[index].type;
		if (nodes[index].checked == true
				&& nodes[index].getCheckStatus().half == false) {
			if (type == "app") {
				appCodeArray.push(nodes[index].menuId)
			}
			if (type == "module") {
				moduleCodeArray.push(nodes[index].menuId)
			}
			if (type == "function") {
				functionCodeArray.push(nodes[index].menuId)
			}
			if (type == "operation") {
				operationCodeArray.push(nodes[index].menuId)
			}
			if (type == "userDefined") {
				userDefinedArray.push(nodes[index].menuId)
			}
		} else if (nodes[index].checked == false) {
			if (type == "app") {
				appCodeCancelingArray.push(nodes[index].menuId)
			}
			if (type == "module") {
				moduleCodeCancelingArray.push(nodes[index].menuId)
			}
			if (type == "function") {
				functionCodeCancelingArray.push(nodes[index].menuId)
			}
			if (type == "operation") {
				operationCodeCancelingArray.push(nodes[index].menuId)
			}
			if (type = "userDefined") {
				userDefinedCancelingArray.push(nodes[index].menuId)
			}
		}
	}
	var returnVal = {
		appCodeArray : appCodeArray,
		moduleCodeArray : moduleCodeArray,
		functionCodeArray : functionCodeArray,
		operationCodeArray : operationCodeArray,
		userDefinedArray : userDefinedArray,
		appCodeCancelingArray : appCodeCancelingArray,
		moduleCodeCancelingArray : moduleCodeCancelingArray,
		functionCodeCancelingArray : functionCodeCancelingArray,
		operationCodeCancelingArray : operationCodeCancelingArray,
		userDefinedCancelingArray : userDefinedCancelingArray
	};
	return returnVal;
};

// 自动消失提示框
function sticky(msg, style, position) {
	var type = style ? style : "warning";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 3000,
		position : place,
		style : type
	});
};