<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>选择下级菜单</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: -10px;
		}
		.ztree {
			height: 90%;
			border-bottom: 1px solid #ddd;
		}
		.custom-btn {
			position: absolute;
			bottom: 0;
			right: 0;
		}
	</style>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
</head>
<body>
	<div class="ue-menu-wrap">
		<ul id="moduleTree" class="ztree"></ul>
	</div>
	<div class="custom-btn">
   	    <button id="confirm" type="button" class="btn ue-btn-primary"><spring:message code="bsp.menu.040" text="确定"></spring:message></button>
   	    <button id="cancel" type="button" class="btn ue-btn"><spring:message code="bsp.menu.005" text="取消"></spring:message></button>
	</div>
</body>
<script type="text/javascript">
var tree, rootNode;
var context = "<l:assetcontext/>";
var dialog = parent.dialog.get(window);

$(function(){
	initTree();
	
	// 确定按钮
	$("#confirm").click(function(){
		confirm();
	});
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
})

// 初始化菜单树
function initTree() {
	// 用于存储树的节点
	var treeNodes = [];
	var msg = L.getLocaleMessage("bsp.menu.041","系统预置菜单");
	// 定义根节点
	root = {
			menuTypeId: "1",
			menuId: "rootId",
			menuName: msg, 
			menuPath:"",
			iconSkin: "icon01",
			nocheck: true,
			type: "root", 
			isLeafModule: "0",
			isParent: true,
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
				autoParam: [ "type", "isLeafModule", "menuTypeId", "menuId", "menuPath" ],
				dataFilter: dataFilter
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
			view: {
				selectedMulti: false
			},
			check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all",
			}
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#moduleTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 展开根节点
	tree.expandNode(rootNode);
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
		
		if(childNode["isLeaf"] == "1"){
			childNode["isParent"] = false;
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

// 确定按钮
function confirm() {
	var msg = L.getLocaleMessage("bsp.menu.042","请至少选择一个节点，或点击取消！");
	var selectedNodes = tree.getCheckedNodes();
	if(selectedNodes.length < 1) {
		parent.alert(msg);
		return false;
	}
	
	dialog.close(selectedNodes);
	dialog.remove();
}
// 取消
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>