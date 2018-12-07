// 全局变量
var tree, rootNode, 
appGrid, moduleGrid, functionGrid, operationGrid, urlGrid,
// 用于记录当前展现的表格的数据类型，即当前节点的子节点类型，
// 点击树的节点时进行切换(App, Module, Function, Operation, Url)，初始值为"App"
curType = "App";
// 提示框
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
}

function alert(msg) {
	$.dialog({
		type: "alert",
		content: msg
	});
}

// 常量
var Constants = {
		// 在表格初始化时赋值
		Grid: {
			App: "",
			Module: "",
			Function: "",
			Operation: "",
			Url: ""
		},
		// 树节点图标类名
		Icon: {
			App: "app",
			Module: "module",
			Function: "function",
			Operation: "operation"
		},
		TypeName: {
			App: "app",
			Module: "module",
			Operation: "operation",
			Function: "function",
			Url: "url"
		},
		CheckboxName: {
			App: "appCheckbox",
			Module: "moduleCheckbox",
			Operation: "operationCheckbox",
			Function: "functionCheckbox",
			Url: "urlCheckbox"
		},
		// 主键名称
		KeyField: {
			App: "appCode",
			Module: "moduleCode",
			Operation: "operationCode",
			Function: "functionCode",
			Url: "urlCode"
		},
		Default: {
			// 系统默认应用编码
			AppCode: "-1"
		}
	};
$(document).ready(function(){
	// 初始化模块树
	initTree();
	
	// 初始化应用表格
	initAppTable();
	
	// 初始化模块表格
	initModuleTable();
	
	// 初始化功能表格
	initFunctionTable();
	
	// 初始化操作表格
	initOperationTable();
	
	// 初始化URL表格
	initUrlTable();
	
	// 查询
	$("form [id^=query]").click(function(){
		var searchVal = $(this).prev("input").val();
		query(this);
	});
	// 表格上的“增加*”按钮
	$("button[id^=add]").bind("click", function() {
		create();
	});
	// 表格上的“删除*”按钮
	$("button[id^=batchDel]").bind("click", function() {
		del();
	});
	// 变更关系
	$(".change").click(function() {
		change();
	});
	// 导入
	$(".import").click(function() {
		importing();
	});
	// 导出
	$(".export").click(function() {
		var curNode = tree.getSelectedNodes()[0] || rootNode;
		window.location.href = context + "/service/bsp/function/exporting?treeId=" + curNode.id
								+ "&treeType=" + curNode.type;
	});
});

///////////////////////////////////////////////////////  以下为树的处理逻辑    ///////////////////////////////////////////////////////////
// 初始化功能树
function initTree() {
	var msg = L.getLocaleMessage("bsp.function.061","功能操作树");
	// 用于存储树的节点
	var treeNodes = [];
	
	// 定义根节点
	var root = {
			type: 'root', 
			id : "rootId",
			name: msg, 
			isParent: true,
			iconSkin:"icon01",
			isRoot: true
	};
	treeNodes.push(root);
	
	// ztree设置
	var treeSetting = {
			async : {
				enable: true,
				url: context + "/service/bsp/function/treeData",
				autoParam: [ "type", "appCode", "moduleCode", "isLeafModule", "functionCode", "operationCode" ],
				dataFilter: dataFilter
			},
			callback : {
				onClick: onClick,
				onExpand: onExpand,
				beforeDrag: beforeDrag,
				beforeDrop: beforeDrop
			},
			edit : {
				// 不显示ztree默认提供的按钮
				enable : true,
				showRemoveBtn : false,
				showRenameBtn : false
			}
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#functionTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 展开根节点
	tree.expandNode(rootNode);
}

// 单击树节点：展开节点->将所有表格隐藏->获取节点类型(type属性)->设置当前数据类型(curType)、显示相应的表格、加载表格数据
function onClick(e,treeId, treeNode) {
	
	$(".row").hide();
	
	switch(treeNode.type) {
		case "root":
			curType = "App";
			$(".appRow").show();
			appGrid.reload();
			break;
		case "app":
			curType = "Module";
			$(".changeBtn").hide(); // 显示变更按钮
			$(".moduleRow").show();
			moduleGrid.setParameter("moduleCode", "-1");
			moduleGrid.setParameter("appCode", treeNode["appCode"]);
			moduleGrid.setParameter("isLeafModule", treeNode["isLeafModule"]);
			moduleGrid.reload();
			break;
		case "module":
			var moduleCode = treeNode["moduleCode"];
			// 如果是叶子节点，则加载function表格
			if(treeNode.isLeafModule == "1") {
				curType = "Function";
				$(".functionRow").show();
				functionGrid.setParameter("moduleCode", moduleCode);
				functionGrid.reload();
			} else {// 如果不是叶子节点，则加载子节点数据
				curType = "Module";
				$(".changeBtn").show(); // 显示变更按钮
				$(".moduleRow").show();
				moduleGrid.setParameter("appCode", treeNode["appCode"]);
				moduleGrid.setParameter("moduleCode", moduleCode);
				moduleGrid.reload();
			}
			break;
		case "function":
			curType = "Operation";
			$(".operationRow").show();
			operationGrid.setParameter("functionCode", treeNode.functionCode);
			operationGrid.reload();
			break;
		case "operation":
			curType = "Url";
			$(".urlRow").show();
			urlGrid.setParameter("operationCode", treeNode.operationCode);
			urlGrid.reload();
			break;
			
		default:
			
	}
}

// 处理查询到的子节点：设置是否为父节点(isParent)->根据相应的名称属性判断节点类型->设置节点的name属性用于树的展现->设置节点图标->设置节点类型
function dataFilter(treeId, parentNode, childNodes) {
	for(var i = 0 ; i < childNodes.length ; i++) {
		var childNode = childNodes[i];
		childNode["isParent"] = true;
		
		if(childNode["appName"]) {
			childNode["id"] = childNode["appCode"];
			childNode["name"] = childNode["appName"];
			childNode["iconSkin"] = Constants.Icon.App;
			childNode["type"] = Constants.TypeName.App;
			continue;
		}
		if(childNode["moduleName"]) {
			childNode["id"] = childNode["moduleCode"];
			childNode["name"] = childNode["moduleName"];
			childNode["iconSkin"] = Constants.Icon.Module;
			childNode["type"] = Constants.TypeName.Module;
			childNode["icon"] = null; //功能树图标使用默认，不需要更改
			continue;
		}
		if(childNode["functionName"]) {
			childNode["id"] = childNode["functionCode"];
			childNode["name"] = childNode["functionName"];
			childNode["iconSkin"] = Constants.Icon.Function;
			childNode["type"] = Constants.TypeName.Function;
			continue;
		}
		if(childNode["operationName"]) {
			childNode["id"] = childNode["operationCode"];
			childNode["name"] = childNode["operationName"];
			childNode["iconSkin"] = Constants.Icon.Operation;
			childNode["isParent"] = false;
			childNode["type"] = Constants.TypeName.Operation;
			continue;
		}
	}
	return childNodes;
}

// 树节点展开后：如果没有子节点，则将该节点设置成子节点
function onExpand(e, treeId, treeNode) {
	if(treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
}

// 拖动树节点之前：不允许拖动
function beforeDrag(treeId, treeNodes) {
	return false;
}

// 放下节点之前
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
	return true;
	var msg1 = L.getLocaleMessage("bsp.function.063","不能放在该节点内！");
	var msg2 = L.getLocaleMessage("bsp.function.064","节点类型不同，不能成为同级节点");
	var nodeType  = treeNodes[0]["type"];
	var targetType = targetNode["type"];
	if(moveType == "inner") {
		if((nodeType == Constants.TypeName.App && !targetNode.isRoot)
				||(nodeType == Constants.TypeName.Module && targetType != Constants.TypeName.App && targetType != Constants.TypeName.Module)
				||(nodeType == Constants.TypeName.Function && targetType != Constants.TypeName.Module)
				||(nodeType == Constants.TypeName.Operation && targetType != Constants.TypeName.Function)
				||(nodeType == Constants.TypeName.Url && targetType != Constants.TypeName.Operation)){
			alert(msg1);
			return false;
		}
	}else{
		if(nodeType != targetType) {
			alert(msg2);
			return false;
		}
	}
}

////////////////////////////////////////////////////////////  表格   ////////////////////////////////////////////////////////////////////
function query(btn) {
	var $inputField = $(btn).parent(".input-group").find("input");
	var searchKey = $inputField.attr("id");
	var serchVal = $inputField.val();
	Constants.Grid[curType].setParameter(searchKey, serchVal);
	Constants.Grid[curType].reload();
}
/**
 * 页面中的“增加”按钮都调用同一个函数，根据curType区分当前增加的数据类型
 */
function create() {
	var msg1 = L.getLocaleMessage("bsp.function.064","新增");
	var msg2 = L.getLocaleMessage("bsp.function.065","保存成功！");
	var dialogHeight;
	var curNode = tree.getSelectedNodes()[0] || rootNode;
	// 获取默认顺序号
	var seq = 0;
	if(curNode.children && curNode.children.length > 0) {
		seq = curNode.children[curNode.children.length-1].seq + 1;
	}
	// url的默认序列号从表格的数据中获取
	if(curType == "Url") {
		seq = Constants.Grid[curType].total;
	}
	
	var url = context + "/service/bsp/function/forCreate/"+Constants.TypeName[curType]+"?status=create&seq=" + seq;
	if(curType == "App") {
		dialogHeight = 445;
	}
	if(curType == "Module") {
		var msg = L.getLocaleMessage("bsp.function.063","无");
		var parentModuleCode = curNode["moduleCode"] || "-1";
		var parentModuleName = curNode["moduleName"] || msg;
		
		// 获取所属应用
		var parentNode = curNode;
		var moduleIsMenu=parentNode["isMenu"];
		while(parentNode["type"] != Constants.TypeName.App) {
			parentNode = parentNode.getParentNode();
		}
		
		var appCode = parentNode["appCode"];
		var appName = parentNode["appName"];
		url += "&appCode=" + appCode
			+ "&appName=" + appName
			+ "&parentModuleCode=" + parentModuleCode
			+ "&parentModuleName=" + parentModuleName
			+"&moduleIsMenu=" + moduleIsMenu;
		
		dialogHeight = 400;
	}
	if(curType == "Function") {
		var moduleCode = curNode["moduleCode"];
		var moduleName = curNode["moduleName"];
		var isMenu = curNode["isMenu"];
		url += "&moduleCode=" + moduleCode
			+ "&moduleName=" + moduleName
			+ "&moduleIsMenu=" + isMenu;
		
		dialogHeight = 350;
	}
	if(curType == "Operation") {
		var functionCode = curNode["functionCode"];
		var functionName = curNode["functionName"];
		url += "&functionCode=" + functionCode
			+ "&functionName=" + functionName;
		
		dialogHeight = 350;
	}
	if(curType == "Url") {
		var operationCode = curNode["operationCode"];
		var functionCode = curNode.getParentNode()["functionCode"];
		url += "&operationCode=" + operationCode
		+ "&functionCode=" + functionCode;
		
		dialogHeight = 350;
	}
	
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: dialogHeight,
		autofocus: true,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				sticky(msg2);
				// 刷新树节点
				var curNode = tree.getSelectedNodes()[0] || rootNode;
				if(curNode["type"] != "operation") {
					curNode["isParent"] = true;
					tree.reAsyncChildNodes(curNode, "refresh");
				}
				// 刷新表格
				Constants.Grid[curType].reload();
			}
		}
	});
};

/**
 * 页面中的“编辑”按钮都调用同一个函数，根据curType跳转至相应的页面
 * @param data
 */
function update(code) {
	var msg1 = L.getLocaleMessage("bsp.function.066","修改");
	var msg2 = L.getLocaleMessage("bsp.function.065","保存成功！");
	var curNode = tree.getSelectedNodes()[0] || rootNode;
	
	// 获取数据类型
	var typeName = Constants.TypeName[curType];
	var url = context + "/service/bsp/function/forUpdate/"+typeName+"/" + code + "?status=update";
	var dialogHeight;
	if(curType == "App") {
		dialogHeight = 445;
	} else if(curType == "Module") {
		dialogHeight = 400;
		var isMenu = curNode["isMenu"];
		url +="&moduleIsMenu=" + isMenu;
		} else if(curType == "Function") {
			dialogHeight = 350;
			var isMenu = curNode["isMenu"];
			url +="&moduleIsMenu=" + isMenu;
			} else {
				dialogHeight = 350;
			}
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: dialogHeight,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				sticky(msg2);
				// 刷新树节点
				tree.reAsyncChildNodes(curNode, "refresh");
				// 刷新表格
				Constants.Grid[curType].reload();
			}
		}
	});
}

/**
 * 页面中的“删除”按钮都调用同一个函数，后台根据curType和主键执行相应的删除操作
 */
function del(code) {
	var msg1 = L.getLocaleMessage("bsp.function.067","请选择要删除的记录！");
	var msg2 = L.getLocaleMessage("bsp.function.068","确认删除选中记录?");
	var msg3 = L.getLocaleMessage("bsp.function.069","删除成功！");
	var ids = [];
	
	if(code) {
		ids.push(code);
	} else {
		var selecteds = $(":checkbox[name="+Constants.CheckboxName[curType]+"]:checked");
		for(var i = 0 ; i < selecteds.length ; i++) {
			ids.push(selecteds[i].value);
		}		
	}
	if(ids.length < 1) {
		alert(msg1);
		return false;
	}
	
	$.dialog({
		type: "confirm",
		content: msg2,
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/bsp/function/delete/"+Constants.TypeName[curType]+"/"+ids.join(","),
					async: false,
					success: function(data) {
						sticky(msg3);
						var curNode = tree.getSelectedNodes()[0] || rootNode;
						// 刷新树节点
						tree.reAsyncChildNodes(curNode, "refresh");
						// 刷新表格
						Constants.Grid[curType].reload();
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
		cancel: function(){}
	});
};

// 变更关系
function change() {
	var msg1 = L.getLocaleMessage("bsp.function.070","选择");
	var msg2 = L.getLocaleMessage("bsp.function.071","成功变更隶属关系");
	var selType;
	var curNode = tree.getSelectedNodes()[0] || rootNode;
	var treeType = selType = curNode.type;
	
	/*
	 * 如果待变更的节点是模块，可以选择应用和非叶子模块；
	 * 如果待变更的节点是功能，可以选择叶子模块和非叶子模块；
	 * 如果待变更的节点是操作，可以选择功能；
	 */
	if(treeType == Constants.TypeName.Module) {
		selType = "app;parentModule";
	} else if(treeType == Constants.TypeName.Function) {
		selType = "module;parentModule";
	} else if(treeType == Constants.TypeName.Operation) {
		selType = "function";
	} else {
		return;
	}
	
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/functionHelp?"
				+"isChkbox=0&isPreciseMatch=1&isCascadeSelect=1&selType=" + selType,
		title : msg1,
		width : 580,
		height : 400,
		onclose : function() {
			var nodes = this.returnValue;
			if(!nodes) {
				return;
			}
			if(nodes.length > 0) {
				var data;
				var node = nodes[0];
				var treeId = curNode["id"];
				var treeType = curNode["type"];
				var newParentId = node["id"];
				var newParentName = node["name"];
				var newParentType = node["type"];
				
				var data = "treeId=" + treeId
							 + "&newParentId=" + newParentId
							 + "&newParentType="+newParentType
							 + "&newParentName="+newParentName
							 + "&treeType="+treeType

				//执行变更
				$.ajax({
					url : context + "/service/bsp/function/changing",
					data : data,
					success: function(data) {
						if(data.flag == "success") {
							sticky(msg2);
							// 刷新树节点
							tree.reAsyncChildNodes(rootNode, "refresh");
							// 刷新表格
							$(".row").hide();
							curType = "App";
							$(".appRow").show();
							appGrid.reload();
							
						} else {
							alert(data.msg);
						}
					},
					error : function(XMLHttpRequst, textStatus, errorThrown) {
						alert(errorThrown);
					}
				});
			}
		}
	});
}

//导入
function importing() {
	var msg = L.getLocaleMessage("bsp.function.008","导入");
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/function/forImporting",
		title : msg,
		width : 580,
		height : 200,
		onclose : function() {
			tree.reAsyncChildNodes(rootNode, "refresh");
			// 刷新表格
			$(".row").hide();
			curType = "App";
			$(".appRow").show();
			appGrid.reload();
		}
	});
	$(".ui-dialog-body").css("padding","0px");
}

function rendYesOrNo(data,type,full) {
	var msg1 = L.getLocaleMessage("bsp.function.051","是");
	var msg2 = L.getLocaleMessage("bsp.function.052","否");
	if(data == 1) {
		return msg1;
	} else {
		return msg2;
	}
	
	return data;
}

// 渲染功能表格中的“操作类型”
function rendOptType(data,type,full) {
	var msg1 = L.getLocaleMessage("bsp.function.072","查询");
	var msg2 = L.getLocaleMessage("bsp.function.003","操作");
	if(data == "00")
		return msg1;
	if(data == "01")
		return msg2;
	
	return data;
}

// 渲染表格内的操作按钮
function rendBtn(data,type,full) {
	var msg1 = L.getLocaleMessage("bsp.function.073","删除");
	var msg2 = L.getLocaleMessage("bsp.function.074","编辑");
	var delBtn = "<a href=\"javascript:del('"+data+"')\">"+msg1+"</a>";
	var editBtn = "<a href=\"javascript:update('"+data+"')\">"+msg2+"</a>";
	  
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

//////////////////////////////////////////  app表格  ///////////////////////////////////////////////
function initAppTable() {
	var options = {
			 ordering: false
	};
	
	var url = context+"/service/bsp/function/tableData";
	appGrid = new L.FlexGrid("appList",url);
	Constants.Grid.App = appGrid;
	appGrid.setParameter("type", Constants.TypeName.App);
	appGrid.init(options);
}

function appCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.App+'"/>';
};

//////////////////////////////////////////  module表格  ///////////////////////////////////////////////
function initModuleTable() {
	var options = {
			ordering: false
	};
	
	var url = context+"/service/bsp/function/tableData";
	moduleGrid = new L.FlexGrid("moduleList",url);
	Constants.Grid.Module = moduleGrid;
	moduleGrid.setParameter("type", Constants.TypeName.Module);
	moduleGrid.setParameter("appCode", Constants.Default.AppCode);
	moduleGrid.setParameter("moduleCode", "-1");
	moduleGrid.init(options);
}

function moduleCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.Module+'"/>';
};

//////////////////////////////////////////  function表格  ///////////////////////////////////////////////
function initFunctionTable() {
	var options = {
			ordering: false
	};
	
	var url = context+"/service/bsp/function/tableData";
	functionGrid = new L.FlexGrid("functionList",url);
	Constants.Grid.Function = functionGrid;
	functionGrid.setParameter("type", Constants.TypeName.Function);
	functionGrid.setParameter("moduleCode", "-1");
	functionGrid.init(options);
}

function functionCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.Function+'"/>';
}

//////////////////////////////////////////  operation表格  ///////////////////////////////////////////////
function initOperationTable() {
	var options = {
			ordering: false
	};
	
	var url = context+"/service/bsp/function/tableData";
	operationGrid = new L.FlexGrid("operationList",url);
	Constants.Grid.Operation = operationGrid;
	operationGrid.setParameter("type", Constants.TypeName.Operation);
	operationGrid.setParameter("functionCode", "-1");
	operationGrid.init(options);
}

function operationCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.Operation+'"/>';
}

//////////////////////////////////////////   url表格  ///////////////////////////////////////////////
function initUrlTable() {
	var options = {
			ordering: false
	};
	
	var url = context+"/service/bsp/function/tableData";
	urlGrid = new L.FlexGrid("urlList",url);
	Constants.Grid.Url = urlGrid;
	urlGrid.setParameter("type", Constants.TypeName.Url);
	urlGrid.setParameter("operationCode", "-1");
	urlGrid.init(options);
}

function urlCheckbox(data, type, full) {
	return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="'+Constants.CheckboxName.Url+'"/>';
}

// 渲染是否菜单入口
function showIsDefault(data, type, full){
	var msg1 = L.getLocaleMessage("bsp.function.051","是");
	var msg2 = L.getLocaleMessage("bsp.function.052","否");
	if(data=="0"){
		data=msg1;
	}else{
		data=msg2;
	}
	return data;
}

// 渲染url
function rendTipBox(data, type, full) {
	var tipBox = "<span title='" + data + "'>"+data+"</span>";
	return tipBox;
}