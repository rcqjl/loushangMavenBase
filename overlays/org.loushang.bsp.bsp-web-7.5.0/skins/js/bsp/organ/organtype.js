// 全局变量
var tree,rootNode,curNode;
var menuGrid;//表格对象
var resultArray;//搜索结果
var node;
var count=0;

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


$(function () {
	
	// 初始化菜单树
	initTree();
	
	// 初始化表格
	initTable();
	
	// 增加类型项
	$("#addMenuItem").click(function(e){
		addMenuItem();
	});
	
	// 删除类型项
	$("#delStru").click(function(e){
		delBatchStru();
	});
	
	//查询组织类型
	$("#query").click(function(e){
		searchOrganType();
	});
	//为查询组织类型绑定回车事件
	$("#organName").bind("keypress",function(event){
		if(event.keyCode == "13"){
			searchOrganType();
        }
	})
	
	
});

////////////////////////////////////////////////////   树      /////////////////////////////////////////////////
// 初始化菜单树
function initTree() {
	var msg = L.getLocaleMessage("bsp.organ.016","组织类型");
	// 用于存储树的节点
	var treeNodes = [];
	if(typeName==""){
		typeName=msg;
	}
	// 定义根节点
	root = {
			organType: "rootId",
			typeName: typeName,
			isParent: true,
			iconSkin: "icon01",
			isRoot: true//
	};
	treeNodes.push(root);
	
	// ztree设置
	var treeSetting = {
			data: {
				key: {
					//将 typeName 属性当作节点名称
					name: "typeName"
				}
			},
			async : {
				enable: true,
				url: context + "/service/bsp/organType/getTreeData",
				autoParam: [ "organType"],//设置自动提交的参数
				dataFilter: dataFilter//用于对 Ajax 返回数据进行预处理的函数
			},
			callback : {
				onClick: onClick,//用于捕获节点被点击 的事件回调函数
				onExpand: onExpand,//用于捕获节点被展开 的事件回调函数
				beforeDrag: beforeDrag,//用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
				onAsyncSuccess: onAsyncSuccess,
				beforeCollapse: beforeCollapse
			},
			edit : {
				// 不显示ztree默认提供的按钮
				enable : true,
				showRemoveBtn : false,
				showRenameBtn : false
			}
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#organTypeTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// curNode的初始值为根节点，点击树节点时进行切换
	curNode = rootNode;//记录当前该节点
	// 展开根节点
	tree.expandNode(rootNode);
	//初始化表格标题
	$(".tableTitle").text(msg);
}

//禁止拖拽操作
function beforeDrag(treeId, treeNodes) {
	return false;
}

//单击树节点
function onClick(e,treeId, treeNode) {
	
	if(treeNode["isparentTld"] !=null) {
		curNode = treeNode.getParentNode();
		return;
	}
	curNode = treeNode;
	// 设置表格标题
	$(".tableTitle").text(treeNode["typeName"]);
	menuGrid.setParameter("organType",treeNode["organType"]);
	menuGrid.setParameter("isParent",treeNode["isParent"]);
	menuGrid.setParameter("typeName",treeNode["typeName"]);
	
	menuGrid.reload();
}

// 对ajax请求返回的数据进行处理 （处理节点数据）
function dataFilter(treeId, parentNode, childNodes) {
//	alert(JSON.stringify(childNodes));
	for(var i = 0 ; i < childNodes.length ; i++) {
		var childNode = childNodes[i];
		childNode["isParent"] = childNode["isLeaf"] != "1";
	}
	return childNodes;
}
//节点被展开的事件处理函数
/*
 * e:标准的 js event 对象
 * treeId:对应 zTree 的 treeId
 * treeNode:被展开的节点 JSON 数据对象
 */
function onExpand(e, treeId, treeNode) {
	if(treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);//更新树节点的 isParent 属性
	}
	
}

//禁止 调用点击节点收缩的函数
function beforeCollapse(treeId, treeNode){
	if(treeNode.organType=="rootId"){
		return false;
	}else{
		return true;
	}
	
}

/*
 * 当查询到结果时，从可展开的第一个节点进行异步加载的调用
 * event:标准的 js event 对象
 * treeId:对应 zTree 的 treeId，便于用户操控
 * treeNode:进行异步加载的父节点 JSON 数据对象
 * msg:异步获取的节点数据字符串，主要便于用户调试使用
 */
function onAsyncSuccess(event, treeId, treeNode, msg){
	if (resultArray) {
		expandNodes(treeNode.children);
	}
}

function expandNodes(nodes) {
	if (!nodes) {
		return;
	}
	
	
	//遍历异步加载后已经展开的树节点
	for (var i = 0, l = nodes.length; i < l; i++) {
		//
		for (var j = 0; j < resultArray.length; j++) {
			if (tree.getNodeByParam("organType", resultArray[resultArray.length-j-1]) == nodes[i]) {
				tree.expandNode(nodes[i], true, false, false);
				if (0 == resultArray.length - 1-j) {
					tree.selectNode(nodes[i]);
					displayOrganDetail(nodes[i]);
				}
				
				if(count==0){
					if(nodes[i].typeName.indexOf($("#organName").val())!=-1){
						node=nodes[i];
						count++;
					}
				}
			}

		}
		//如果树节点是父节点且异步加载过，递归调用该函数
		if (nodes[i].isParent && nodes[i].zAsync) {
			expandNodes(nodes[i].children);
		}
	}
	if(node){			
		tree.selectNode(node);
		displayOrganDetail(node);
	}
}

//搜索框
function searchOrganType(){
	var typeName=$("#organName").val();
	var url=context+"/service/bsp/organType/searchOrganType?typeName=" + typeName;
	url = encodeURI(url);
	url = encodeURI(url);
	$.ajax({
		url: url,
		async: false,
		success: afterQueryOrgan
	});
	

}

//组织查询结果处理
function afterQueryOrgan(d) {
	var msg = L.getLocaleMessage("bsp.organ.052","没有查到该组织!");
	resultArray = d;
	
	$.fn.zTree.destroy();//销毁树
	initTree();//初始化树
	count=0;
	var rootNode = tree.getNodeByParam("organType", 'rootId');
	tree.expandAll(false);
	tree.expandNode(rootNode);
	
	if (resultArray.length > 0) {
		
		
		// 首先在已经展开的节点中寻找
		var queryNode = tree.getNodeByParam("organType",
				resultArray[resultArray.length - 1]);
		// 如果能够在已经展开的节点中定位，则直接选中节点,并展开
		if (queryNode) {
			
			for(var i=0;i<resultArray.length;i++){
				queryNode=tree.getNodeByParam("organType",resultArray[resultArray.length-1-i]);
				tree.expandNode(queryNode,true,false,false);
				if(resultArray.length-1-i==0){
					tree.selectNode(queryNode);
					displayOrganDetail(queryNode);
				}
			}
			
		} else {// 否则重新生成树，定位节点
			// 展开根节点
			var rootNode = tree.getNodeByParam("organType", 'rootId');
			tree.reAsyncChildNodes(rootNode, "refresh");
		}
	} else {
		// 没有查到
		sticky(msg);
	}
}
function displayOrganDetail(node){
	//刷新表格 获取表格数据并刷新表格
	$(".tableTitle").text(node["typeName"]);
	menuGrid.setParameter("organType", node["organType"]);
	menuGrid.setParameter("isParent", node["isParent"]);
	menuGrid.setParameter("typeName", node["typeName"]);
	menuGrid.reload();
}

////////////////////////////////////////////////////表格      /////////////////////////////////////////////////
function initTable() {
	var options = {
			 ordering: false
	};
	
	var url = context+"/service/bsp/organType/tableData";
	menuGrid = new L.FlexGrid("organList",url);
	//向后台传递请求参数，取表格中的数据
	menuGrid.setParameter("organType", rootNode["organType"]);
	menuGrid.setParameter("isParent", rootNode["isParent"]);
	menuGrid.setParameter("typeName", typeName);
	menuGrid.init(options);
}

//1、渲染表格首列的checkbox
function rendCheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="menuCheckbox"/>';
}

//2、渲染rendTitle 列的数据，添加title
function rendTitle(data, type, full) {
	
	if(data!=null && data != ""){
		var title = "<span title='" + data + "'>"+data+"</span>";
		return title;
	}
	return data;
}


//3、渲染上级类型 列的数据 
/*
 * data:列数据
 * full：行数据
 */
function parentType(data, type, full) {
	//alert(JSON.stringify(type));//display
	if(full.parentType != full.organType){
		return full.parentType;
	} else {
		return "--";
	}
}

//4、渲染表格内的操作按钮
function rendBtn(data,type,full) {
	var msg1 = L.getLocaleMessage("bsp.organ.008","删除");
	var msg2 = L.getLocaleMessage("bsp.organ.066","编辑");
	var delBtn = "<a href=\"javascript:delStru('" + full.organType + "')\">"+msg1+"</a>";
	var editBtn = "<a href=\"javascript:update('" + full.organType +"','"+full.typeName+"')\">"+msg2+"</a>";
	  
	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

//添加类型
function addMenuItem() {
	var msg1 = L.getLocaleMessage("bsp.organ.034","添加类型");
	var msg2 = L.getLocaleMessage("bsp.organ.075","保存成功!");
	var parentOrganType = curNode["organType"];
	var parentTypeName = curNode["typeName"];
	var url = context + "/service/bsp/organType/forCreateOrganItem?"
			  + "parentOrganId=" + parentOrganType 
			  + "&parentTypeName=" + parentTypeName;
	//进行编码，解决中文乱码
	url=encodeURI(url);
	url=encodeURI(url);
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: 200,
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

//删除类型
function delStru(organType) {
	var organTypes = [];
	if(organType){
		organTypes = [organType];
	}
	
	delAction(organTypes);
}

//批量删除
function delBatchStru() {
	var organTypes = [];
	$(":checkbox[name=menuCheckbox]:checked").each(function(){
		organTypes.push(this.value);
	});

	delAction(organTypes);
}

function delAction(organTypes) {
	var msg1 = L.getLocaleMessage("bsp.organ.098","请选择要删除的数据！");
	var msg2 = L.getLocaleMessage("bsp.organ.099","确认删除选中记录?");
	var msg3 = L.getLocaleMessage("bsp.organ.079","删除成功！");

	if(organTypes.length < 1) {
		alert(msg1);
		return false;
	}

	$.dialog({
		type: "confirm",
		content: msg2,
	    autofocus: true,
		ok: function() {
				$.ajax({
					url: context+"/service/bsp/organType/deleteOrganType",
					type: "post",
					data: "organTypes=" + organTypes.join(","),			
					async: false,
					success: function(data) {
						sticky(msg3);
						// 刷新树节点
						tree.reAsyncChildNodes(curNode, "refresh");
						// 删除成功后 刷新表格 移除 表头的选中状态
						$("#selectAllMenus").removeAttr("checked");
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

//编辑操作
function update(organType,typeName) {
	var msg1 = L.getLocaleMessage("bsp.organ.066","编辑");
	var msg2 = L.getLocaleMessage("bsp.organ.075","保存成功!");
	var url = context + "/service/bsp/organType/forUpdateOrganType?organType="+organType+"&typeName="+typeName+"&status=update";
	// 解决编码问题，需要执行两次转码
	url = encodeURI(url);
	url = encodeURI(url);
	$.dialog({
		type: "iframe",
		url: url,
		title: msg1,
		width: 580,
		height: 200,
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
