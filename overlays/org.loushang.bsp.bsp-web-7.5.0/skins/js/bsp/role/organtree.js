var tree, rootNode;

$(function() {
	initTree();
	var dialog = parent.dialog.get(window);
	$("#saveBtn").click(function(){
		var relationId = getChecked(tree);
		dialog.close(relationId);
		dialog.remove();
	});
	$("#returnBtn").click(function(){
		dialog.close();
		dialog.remove();
	});	
})

////////////////////////////////////////////////////   树      /////////////////////////////////////////////////
// 初始化机构树
function initTree() {
	var msg1 = L.getLocaleMessage("bsp.role.053","组织树");
	var msg2 = L.getLocaleMessage("bsp.role.054","单位");
	var msg3 = L.getLocaleMessage("bsp.role.055","人力资源");
	// 用于存储树的节点
	var treeNodes = [];
	
	// 定义根节点
	root = {
			parentId: '-1',
			isParent: true,
			
			organId: 'rootId',
			organName: msg1,
			organType: '1',
			organTypeName: msg2,
			inUseOrgan:'1',
			
			struId: 'rootId',
			struType: "00",
			struTypeId: "00",
			struTypeName: msg3,
			struLevel: '0',
			struPath: 'rootId',
			struOrder: '1',
			inUseStru: '1',
		    nocheck:true
	};
	
	treeNodes.push(root);
	
	// ztree设置
	var treeSetting = {
			async : {
				enable: true,
				url: context + "/service/bsp/role/treeData",
				autoParam: [ "parentId", "struId", "struType"],
				dataFilter: dataFilter
			},
			data: {
				key: {
					name: "organName"
				}
			},
			callback : {
				onClick: onClick,
				onExpand: onExpand
			},
			edit : {
				// 不显示ztree默认提供的按钮
				enable : true,
				showRemoveBtn : false,
				showRenameBtn : false
			},
			check : {
				autoCheckTrigger : false,
				chkboxType : {"Y": "ps", "N": "ps"},
				chkStyle : "radio",
				enable : true,
				nocheckInherit : false,
				chkDisabledInherit : false,
				radioType : "level"
			}
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#organTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 展开根节点
	tree.expandNode(rootNode);
}
function getChecked(tree){
  var node = tree.getCheckedNodes(true)[0];
  if(node!=null&&node!=""){
	  var organ = {
			  organId:node.struId,
			  organName:node.organName
	  }
	  return organ;
  };
  return "";
}
function onClick(e,treeId, treeNode) {
	tree.expandNode(treeNode, "", false, true, true);
}

function dataFilter(treeId, parentNode, childNodes) {
	for(var i = 0 ; i < childNodes.length ; i++) {
		var childNode = childNodes[i];
		childNode["isParent"] = true;
		
		if(parentNode["isRoot"]) {
			childNode["isTop"] = true;
		}
		
		if(childNode["menuName"]) {
			childNode["name"] = childNode["menuName"];
			continue;
		}
	}
	return childNodes;
}

function onExpand(e, treeId, treeNode) {
	if(treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
}