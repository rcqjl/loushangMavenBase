// 全局变量
var tree,rootNode,curNode;
var menuGrid;
// 系统默认菜单类别的id
var sysDefaultMenuTypeId = "1";

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
		type: "alert",
		content: msg
	});
}

$(function() {
	// 系统预置菜单不可修改
	if(menuTypeId == sysDefaultMenuTypeId) {
		$(".ue-menu-right .btn-group button").hide();
		$("#menuList th:first").remove();
		$("#menuList th:last").remove();
	}
	
	// 初始化菜单类别选择按钮
	initMenuTypeSelector();
	
	// 初始化菜单树
	initTree();
	
	// 初始化表格
	initTable();
	
	// 增加菜单项
	$("#addMenuItem").click(function(e){
		addMenuItem();
	});
	
	// 选择下级菜单
	$("#selectItem").click(function(e){
		selectItem();
	});
	
	// 删除菜单项
	$("#delStru").click(function(e){
		delStru();
	});
	
	// 导入
	$(".import").click(function() {
		importing();
	});
	// 导出
	$(".export").click(function() {
		var curNode = tree.getSelectedNodes()[0] || rootNode;
		window.location.href = context + "/service/bsp/menu/exporting?treeId=" 
		+ curNode.menuTypeId+"&menuStruId="+curNode.menuStruId;
	});
})

////////////////////////////////////////////////////   树      /////////////////////////////////////////////////
// 初始化菜单类别选择按钮
function initMenuTypeSelector() {
	var msg1 = L.getLocaleMessage("bsp.menu.030","菜单类别");
	var msg2 = L.getLocaleMessage("bsp.menu.031","管理菜单类别");
	
	$.ajax({
		url: context + "/service/bsp/menu/getAllMenuTypes",
		dataType: "json",
		async: false,
		success: function(data) {
			
			var $selectorContainer = $('<div class="menu-container"></div>');
			for(var i = 0 ; i < data.length ; i++) {
				var $divEle = $("<div></div>");
				$divEle.data("type", data[i]["menuTypeId"]);
				$divEle.attr("class", "menu-type");
				$divEle.attr("title", data[i]["menuTypeName"]);
				$divEle.text(data[i]["menuTypeName"]);
				
				$selectorContainer.append($divEle);
			}
			$(".select-menu-type").popover({
				title: msg1+"<a href='"+context+"/service/bsp/menu'>"+msg2+"</a>",
				html: true,
				content: $selectorContainer,
				placement: "right",
				trigger: "focus",
				delay: {
					show: 0, 
					hide: 100
				}
			});
			// 设置元素堆叠顺序,将分页元素置底
			$(".select-menu-type").on("show.bs.popover", function(){
				$("ul.pagination > li.active > a").css("z-index", 0);
			});
		},
		error: function(e) {
			alert("请求出错");
		}
	});
	
	$(".ue-menu-left").on("click", ".menu-type", function(e){
		var menuTypeId = $(this).data("type");
		window.location.href = context + "/service/bsp/menu/forMenuDetail?menuTypeId=" + menuTypeId;
	});
}
// 初始化菜单树
function initTree() {
	// 用于存储树的节点
	var treeNodes = [];
	
	// 定义根节点
	root = {
			menuId: "rootId",
			menuName: menuTypeName,
			menuPath: "",
			menuStruId: "rootId",
			menuTypeId: menuTypeId,
			type: "root", 
			isLeafModule: "0",
			isParent: true,
			iconSkin: "icon01",
			isRoot: true
	};
	treeNodes.push(root);
	
	// ztree设置
	var treeSetting = {
			data: {
				key: {
					name: "menuName"
				}
			},
			async : {
				enable: true,
				url: context + "/service/bsp/menu/treeData",
				autoParam: [ "type", "menuTypeId", "struId", "menuId", "menuPath", "isLeafModule"],
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
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#menuTypeTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// curNode的初始值为根节点，点击树节点时进行切换
	curNode = rootNode;
	// 展开根节点
	tree.expandNode(rootNode);
}

//拖动树节点之前：不允许拖动
function beforeDrag(treeId, treeNodes) {
	return false;
}

// 点击树节点
function onClick(e,treeId, treeNode) {
	if(treeNode["isLeaf"] == "1") {
		curNode = treeNode.getParentNode();
		return;
	}
	curNode = treeNode;
	
	// 设置表格标题
	$(".tableTitle").text(treeNode["menuName"]);
	
	menuGrid.setParameter("type", treeNode["type"]);
	menuGrid.setParameter("isLeafModule", treeNode["isLeafModule"]);
	menuGrid.setParameter("menuTypeId", treeNode["menuTypeId"]);
	menuGrid.setParameter("menuId", treeNode["menuId"]);
	menuGrid.setParameter("menuPath", treeNode["menuPath"]);
	menuGrid.reload();
}

// 处理节点数据
function dataFilter(treeId, parentNode, childNodes) {
	for(var i = 0 ; i < childNodes.length ; i++) {
		var childNode = childNodes[i];
		childNode["isParent"] = childNode["isLeaf"] != "1";
	}
	return childNodes;
}

function onExpand(e, treeId, treeNode) {
	if(treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
}

////////////////////////////////////////////////////   表格      /////////////////////////////////////////////////
function initTable() {
	var options = {
			 ordering: false
	};
	
	var url = context+"/service/bsp/menu/tableData";
	menuGrid = new L.FlexGrid("menuList",url);
	menuGrid.setParameter("type", rootNode["type"]);
	menuGrid.setParameter("isLeafModule", rootNode["isLeafModule"]);
	menuGrid.setParameter("menuTypeId", menuTypeId);
	menuGrid.setParameter("menuId", "rootId");
	menuGrid.setParameter("menuPath", "");
	menuGrid.init(options);
}

// 渲染表格首列的checkbox
function rendCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="menuCheckbox"/>';
}

// 渲染数据，添加title
function rendTitle(data, type, full) {
	if(data!=null && data != ""){
		var title = "<span title='" + data + "'>"+data+"</span>";
		return title;
	}
	return data;
}

//渲染是否叶子菜单列
function rendLeafMenu(data, type, full) {
	var msg1 = L.getLocaleMessage("bsp.menu.032","是");
	var msg2 = L.getLocaleMessage("bsp.menu.033","否");
	if(data == "1"){
		return msg1;
	} else {
		return msg2;
	}
}

// 渲染表格内的操作按钮
function rendBtn(data,type,full) {
	var msg1 = L.getLocaleMessage("bsp.menu.001","删除");
	var msg2 = L.getLocaleMessage("bsp.menu.002","编辑");
	var delBtn = "<a href=\"javascript:delStru('" + full.menuId + "')\">"+msg1+"</a>";
	var editBtn = "<a href=\"javascript:update('" + full.menuStruId + "')\">"+msg2+"</a>";
	  
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

// 增加菜单项
function addMenuItem() {
	var msg1 = L.getLocaleMessage("bsp.menu.034","增加菜单项");
	var msg2 = L.getLocaleMessage("bsp.menu.035","保存成功！");
	var parentMenuId = curNode["menuId"];
	var parentMenuName = curNode["menuName"];
	var url = context + "/service/bsp/menu/forCreateMenuItem?status=create"
			  + "&parentMenuId=" + parentMenuId 
			  + "&parentMenuName=" + parentMenuName
			  + "&menuTypeId=" + menuTypeId;
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: 400,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				sticky(msg2);
				// 刷新树节点
				curNode["isParent"] = true;
				tree.reAsyncChildNodes(curNode, "refresh");
				// 刷新表格
				menuGrid.reload();
			}
		}
	});
}

// 选择下级菜单
function selectItem() {
	var msg = L.getLocaleMessage("bsp.menu.023","选择下级菜单");
	$.dialog({
		type: "iframe",
		url: context + "/service/bsp/menu/forSelectMenuItem",
		title: msg,
		width: 580,
		height: 400,
		onclose: function () {
			var srcNodes = this.returnValue;
			if(srcNodes) {
				saveSelect(srcNodes);
			}
		}
	});
}

// 将从系统预置菜单中选择的节点添加到当前节点下
function saveSelect(srcNode) {
	var msg = L.getLocaleMessage("bsp.menu.035","保存成功！");
	srcNode = srcNode[0];
	// 只能从系统默认菜单中选择，所以源菜单类别id固定为系统默认菜单的id
	var selectMenuTypeId = sysDefaultMenuTypeId;
	$.ajax({
		url: context + "/service/bsp/menu/saveSelect",
		type: "POST",
		data: {
			selectMenuTypeId: selectMenuTypeId,
			selectMenuId: srcNode["menuId"],
			selectMenuPath: srcNode["menuPath"],
			selectMenuStruId: srcNode["menuStruId"],
			selectPathName: srcNode["pathName"],
			selectType: srcNode["type"],
			
			menuId: curNode["menuId"],
			menuName: curNode["menuName"],
			menuPath: curNode["menuPath"],
			menuStruId: curNode["menuStruId"],
			menuTypeId: curNode["menuTypeId"]
		},
		async: false,
		success: function(message) {
			sticky(msg);
			// 刷新树节点
			curNode["isParent"] = true;
			tree.reAsyncChildNodes(curNode, "refresh");
			// 刷新表格
			menuGrid.reload();
		},
		error: function(e) {
			alert("请求出错！");
		}
	});
}

// 修改菜单项
function update(menuStruId) {
	var msg1 = L.getLocaleMessage("bsp.menu.036","修改");
	var msg2 = L.getLocaleMessage("bsp.menu.035","保存成功！");
	var parentItemId = curNode["menuId"];
	var parentMenuName = curNode["menuName"];
	var url = context + "/service/bsp/menu/forUpdateMenuItem/"+menuStruId+"?status=update" + "&parentMenuName=" + parentMenuName;
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: 400,
		onclose: function () {
			var returnVal = this.returnValue;
			if(returnVal) {
				sticky(msg2);
				// 刷新树节点
				tree.reAsyncChildNodes(curNode, "refresh");
				// 刷新表格
				menuGrid.reload();
			}
		}
	});
}

// 删除菜单项
function delStru(menuId) {
	var msg1 = L.getLocaleMessage("bsp.menu.037","请选择要删除的数据！");
	var msg2 = L.getLocaleMessage("bsp.menu.038","确认删除选中记录?");
	var msg3 = L.getLocaleMessage("bsp.menu.039","删除成功！");
	var menuIds = [];
	$(":checkbox[name=menuCheckbox]:checked").each(function(){
		menuIds.push(this.value);
	});
	
	if(menuId) {
		menuIds = [menuId];
	}
	if(menuIds.length < 1) {
		alert(msg1);
		return false;
	}
	
	$.dialog({
		type: "confirm",
		content: msg2,
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/bsp/menu/deleteMenuItem/" + menuTypeId + "/" + menuIds.join(","),
					async: false,
					success: function(data) {
						sticky(msg3);
						// 刷新树节点
						tree.reAsyncChildNodes(curNode, "refresh");
						// 刷新表格
						menuGrid.reload();
					},
					error: function(msg) {
						alert(msg.responseText);
					}
				});
			},
		cancel: function(){}
	});
}

//导入
function importing() {
	var msg = L.getLocaleMessage("bsp.menu.025","导入");
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/menu/forImporting",
		title : msg,
		width : 580,
		height : 200,
		onclose : function() {
			tree.reAsyncChildNodes(rootNode, "refresh");
			// 刷新表格
			menuGrid.reload();
		}
	});
	$(".ui-dialog-body").css("padding","0px");
}