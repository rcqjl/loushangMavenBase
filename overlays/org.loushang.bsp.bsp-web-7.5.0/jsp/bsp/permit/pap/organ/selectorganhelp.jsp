<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>组织通用帮助</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<style type="text/css">
		.body {
			width: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			padding-bottom: 60px;
		}
		.ue-sticky-queue.center {
			left: 8%;
			margin: 0 auto!important;
		}
		.foot {
			width: 100%;
			height: 40px;
			padding-top: 9px;
			position: fixed;
			bottom: 0px;
			border-top: 1px solid #ddd;
			background: #fff;
		}
		.btnGroup {
			float: right;
		}
	</style>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
</head>
<body>
	<div class="body">
		<select id="struTypeSel" style="display:none" class="form-control ue-form">
		    <option value=""><spring:message code="bsp.organ.048" text="请选择组织视角"/></option>
            <c:forEach items="${struTypeList}" var="item">
                <option value="${item.struType}">${item.struTypeName }</option>
            </c:forEach>
        </select>
        <div class="input-group searchDiv" style="width: 240px;">
	       	<input class="form-control ue-form" type="text" id="organName" placeholder="<spring:message code="bsp.organ.015" text="组织名称"/>">
	        <div class="input-group-addon ue-form-btn" id="query" >
	        	<span class="fa fa-search"></span>
	        </div>
	    </div>
		<ul id="organTree" class="ztree"></ul>
	</div>
	<div class="foot">
		<div class="btnGroup">
	   	    <button id="confirm" type="button" class="btn ue-btn-primary"><spring:message code="bsp.organ.046" text="确定"/></button>
	   	    <button id="clear" type="button" class="btn ue-btn"><spring:message code="bsp.organ.048" text="清除"/></button>
	   	</div>
	</div>
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
var tree, rootNode;
var context = "<l:assetcontext/>";
var resultArray;//存储搜寻结果
// 登录用户
var userId = "${userId}";

// 根节点
var rootId = "${rootId}";

// 显示的组织树
var struType = "${struType}";

// 显示的组织类型，以;分开，如单位和部门为 1;2
// 默认组织类型编号：1:单位，2:部门，6:岗位，8:员工
var showableType = '${showableType}';

// 可以选择的组织类型，用“;”隔开，例如“8;6”表示岗位和员工可以被选择，默认类型编号同上
var selType = '${selType}';

// 是否精确匹配可以选择的类型
var isPreciseMatch = '${isPreciseMatch}';

// 选择框类型，是否为复选框，1为复选框，0为单选框
var isChkbox = '${isChkbox}';

// 复选框是否级联选择，1为是，0为否
var isCascadeSelect = '${isCascadeSelect}';	

// 是否进行数据权限控制
var isDataPermitControl = '${isDataPermitControl}';

var struTypeName = '${struTypeName}';

//提示框
function sticky(msg, style, position) {
	var type = style ? style : "warning";
	var place = position ? position : "center";
	$.sticky(msg, {
		autoclose : 1000,
		position : place,
		style : type
	});
}

$(function(){
	// 如果没有指定组织视角，则显示下拉框用于选择组织视角
	if(!struType) {
		$(".ztree").css({"height":"85%"});
		$("#struTypeSel").change(function(){
			tree.setting.async.otherParam.struType = this.value;
			rootNode["isParent"] = true;
			tree.reAsyncChildNodes(rootNode, "refresh");
		}).show();
	}
	
	// 初始化组织机构树
	initTree();
	
	//查询组织类型
	$("#query").click(function(e){
		searchOrganType();
	});
	
	//为查询组织类型绑定回车事件
	$("#organName").bind("keypress",function(event){
		if(event.keyCode == "13"){
			searchOrganType();
        }
	});
	
	// 确定按钮
	$("#confirm").click(function(){
		confirm();
	});
	
	// 取消按钮
	$("#clear").click(function(){
		clear();
	});
})

// 初始组织机构树
function initTree() {
	var msg1 = L.getLocaleMessage("bsp.organ.049","组织树");
	var msg2 = L.getLocaleMessage("bsp.organ.050","单位");
	var msg3 = L.getLocaleMessage("bsp.organ.051","人力资源");
	// 用于存储树的节点
	var treeNodes = [];
	
	// 定义根节点
	root = {
			parentId: '-1',
			isParent: true,
			
			organId: 'rootId',
			organName: msg1,
			organType: '1',
			nocheck: true,
			organTypeName: msg2,
			inUseOrgan:'1',
			
			struId: 'rootId',
			struType: "00",
			struTypeId: "00",
			struTypeName: msg3,
			struLevel: '0',
			struPath: 'rootId',
			struOrder: '1',
			inUseStru: '1'
	};
	treeNodes.push(root);
	
	// ztree设置
	var treeSetting = {
			data: {
				key: {
					name: "organName"
				}
			},
			async : {
				enable: true,
				url: context + "/service/bsp/organHelp/treeData",
				autoParam: [ "parentId", "struId" ],
				otherParam: {"userId": userId, "struType": struType, "isDataPermitControl": isDataPermitControl},
				dataFilter: dataFilter
			},
			callback : {
				onClick: onClick,
				onExpand: onExpand,
				beforeCollapse: beforeCollapse
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
				chkStyle: isChkbox == "1" ? "checkbox" : "radio",
				radioType: "all",
				chkboxType: {"Y": isCascadeSelect == "1" ? "s" : "", "N": isCascadeSelect == "1" ? "s" : ""}
			}
		};
	// 初始化功能树
	tree = $.fn.zTree.init($("#organTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 展开根节点
	tree.expandNode(rootNode,null,null,null,true);
}

//禁止 调用点击节点收缩的函数
function beforeCollapse(treeId, treeNode){
	if(treeNode.organId=="rootId"){
		return false;
	}else{
		return true;
	}
	
}

// 单击节点
function onClick(e,treeId, treeNode) {
	tree.expandNode(treeNode, "", false, true, true);
}

// 处理节点数据
function dataFilter(treeId, parentNode, childNodes) {
	var childNodes = $.grep(childNodes, function(childNode, index){
		var organType = childNode["organType"];
		
		childNode["isParent"] = (childNode["isLeaf"] != "1");
		
		// 设置可以选择的节点类型，如果不设置selectableType属性，则默认所有节点都可以被选中
		var selectTypes = selType.split(";");
		if(selType){
			if(isPreciseMatch == "1") {
				if($.inArray(organType, selType) == "-1")
					childNode["nocheck"] = true;
			}else{
				var isInclude = false;
				$.each(selectTypes, function(i, type){
					if(organType.match("^" + type + ".*")){
						isInclude = true;
						return false;
					}
				});
				if(!isInclude){
					childNode["nocheck"] = true;
				}
			}
		}
		
		// 设置可以显示的节点类型，如果不设置showableType属性值，则默认全部显示
		if(!showableType)
			return true;
		
		var showTypes = showableType.split(";");
		if(isPreciseMatch == "1") {
			if($.inArray(organType, showTypes) == "-1")
				return false;
			else
				return true;
		}else{
			var isShow = false;
			$.each(showTypes, function(i, type){
				if(organType.match("^" + type + ".*")){
					isShow = true;
				}
			});
			return isShow;
		}
		
	})
	return childNodes;
}

function onExpand(e, treeId, treeNode) {
	if(treeNode.children&&treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}
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
			if (tree.getNodeByParam("struId", resultArray[j]) == nodes[i]) {
				tree.expandNode(nodes[i], true, false, true, true);
				if (0 == resultArray.length - 1-j) {
					tree.selectNode(nodes[i]);
					// 定位到所查找的节点后清空
					resultArray = [];
				}
			}

		}
		//如果树节点是父节点且异步加载过，递归调用该函数
		if (nodes[i].isParent && nodes[i].zAsync) {
			expandNodes(nodes[i].children);
		}
	}
}

//搜索框
function searchOrganType(){
	var organName=$("#organName").val();
	if(organName != "") {
		var url=context+"/service/bsp/organHelp/searchOrganType?organName=" + organName
				+ "&struType=" + struType
				+ "&organType=" + selType;
		url = encodeURI(url);
		url = encodeURI(url);
		$.ajax({
			url: url,
			async: false,
			success: afterQueryOrgan
		});
	}

}

//组织查询结果处理
function afterQueryOrgan(d) {
	var msg = L.getLocaleMessage("bsp.organ.052","没有查到该组织!");
	resultArray = d;
	
	$.fn.zTree.destroy();//销毁树
	initTree();//初始化树
	count=0;
	var rootNode = tree.getNodeByParam("struId", 'rootId');
	tree.expandAll(false);
	tree.expandNode(rootNode);
	
	if (resultArray.length > 0) {

		// 首先在已经展开的节点中寻找
		var queryNode = tree.getNodeByParam("struId",
				resultArray[resultArray.length - 1]);
		// 如果能够在已经展开的节点中定位，则直接选中节点,并展开
		if (queryNode) {
			for(var i=0;i<resultArray.length;i++){
				queryNode=tree.getNodeByParam("struId",resultArray[i]);
				tree.expandNode(queryNode,true,false,true,true);
				if(resultArray.length-1-i==0){
					tree.selectNode(queryNode);
					// 定位到所查找的节点后清空
					resultArray = [];
				}
			}
		} else {// 否则重新生成树，定位节点
			initTree();
		}
	} else {
		// 没有查到
		sticky(msg);
	}
}
// 确定按钮
function confirm() {
	var msg = L.getLocaleMessage("bsp.organ.053","请选择至少一个节点！");
	var selectedNodes = tree.getCheckedNodes();
	if(selectedNodes.length < 1) {
		$.sticky(msg, {
			autoclose : 1000,
			position : "center",
			style : "warning"
		});
		return false;
	}
	
	dialog.close(selectedNodes);
	dialog.remove();
}

// 取消
function clear() {
	dialog.close([]);
	dialog.remove();
	return false;
}
</script>
</html>