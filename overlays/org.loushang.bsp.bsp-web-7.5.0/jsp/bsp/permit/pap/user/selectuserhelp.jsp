<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title><spring:message code="bsp.user.101" text="用户通用帮助" /></title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<style type="text/css">
		.body {
			width: 100%;
			top: 0;
			display: table;
		}
		.ue-menu-wrap {
			top: 0px;
		}
		
		.ztree li span.button.add{
			margin-right: 2px;
			background-position: -142px 0px;
			vertical-align: top;
		}
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.popover {
			min-width: 360px;
		}
		.form-group {
			width: 100%;
		}
		.col-md-3 {
			width: 40%;
		}
		.col-md-8 {
			width: 60%;
		}
		.label-border{
			padding-right: 20px;
			padding-left: 0px;
			margin-top: 5px;
		}
		.search-border{
			margin-top: 2px;
		}
		.search-text{
			margin-left: -67px;
			margin-top: 10px;
			padding-left:3px;
		}
		.ue-menu-right{
			overflow:auto;
			padding-top: 10px;
		}
		.search-label{
			float:left;
			margin-left:20px;
			padding-right:0px;
		}
		.search-input{
			padding-left:5px;
		}
		table.dataTable thead>tr>th {
			line-height: 30px;
			height: 30px;
		}

		.table-bordered>tbody>tr>td {
			height: 30px;
			line-height: 30px;
		}
		.foot {
			width: 100%;
			height: 40px;
			padding-top: 9px;
			position: fixed;
			bottom: 6px;
			right: 6px;
			border-top: 1px solid #ddd;
			background: #ffffff;
			z-index:2;
		}
		.btnGroup {
			float: right;
		}
		.query-group {
			width: 260px;
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
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
</head>
<body>
	<div class="content">
		<div class="body">
			<div class="ue-menu-wrap">
				<div class="ue-menu-left">
					<ul id="organTypeTree" class="ztree"></ul>
				</div>
				
				<div class="ue-menu-right">
					<div class="container">
						<form class="form-inline" onsubmit="return false;">	
							<div class="input-group query-group">									
								<input type="text" class="form-control ue-form" id="toUserId" placeholder="<spring:message code="bsp.user.102" text="请输入账号/名称" />"/>
								<div class="input-group-addon ue-form-btn" id="query" >
									<span class="fa fa-search"></span>
							    </div>
							</div>
						</form>
						<table id="userList" class="table table-bordered table-hover">
							<thead>
								<tr>
									<th width="5%" data-field="userId" data-sortable="false" data-render="rendercheckbox"></th>
									<th width="27%" data-field="userId" data-sortable="false"><spring:message code="bsp.user.030" text="账号" /></th>
									<th width="33%" data-field="userName"><spring:message code="bsp.user.031" text="名称" /></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="foot">
			<div class="btnGroup">
				<button type="button" class="btn ue-btn-primary" id="confirm"><spring:message code="bsp.user.026" text="确定" /></button>
				<button type="button" class="btn ue-btn-primary" id="clear"><spring:message code="bsp.user.027" text="清除" /></button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
var dialog = parent.dialog.get(window);
var tree, rootNode;
var context = "<l:assetcontext/>";
var resultArray;//存储搜寻结果
var count=0;//避免再次别复制的计数器
var node;//用来存储需要在搜索中定位的节点
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
	
	// 初始化表格
	initTable();
	
	//查询
	$("#query").click(function(e){
		queryForm();
	});
	
	//为查询绑定回车事件
	$("#toUserId").bind("keypress",function(event){
		if(event.keyCode == "13"){
			queryForm();
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
	// 用于存储树的节点
	var treeNodes = [];
	
	// 定义根节点
	root = {
		type: 'root', 
		name: L.getLocaleMessage("bsp.user.000","组织机构"), 
		isParent: true,
		iconSkin:"icon01",
		isRoot: true,
		struId: 'rootId',
		struType: '00'
	};
	treeNodes.push(root);
	
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
	tree = $.fn.zTree.init($("#organTypeTree"), treeSetting, treeNodes);
	
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	
	// 展开根节点
	tree.expandNode(rootNode);
}

//初始化表格
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

// 单击节点
function onClick(e,treeId, treeNode) {
	if(treeNode.struId=="rootId"){
		return;
	}
	var url = context+"/service/bsp/user/data";
	var param={"organId":treeNode.organId};
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);
}

//树节点展开后：如果没有子节点，则将该节点设置成子节点
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

//处理查询到的子节点：设置是否为父节点(isParent)->设置节点的name属性用于树的展现
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

//复选框全选
function rendercheckbox(data, type, full) {
	var info = data + "," + full["userName"];
    return '<input type="radio" value="' + info + '" id="radio" name="radio"/>';
}

//查询
function queryForm(){
	var userId = $("#toUserId").val();
	var url = context+"/service/bsp/user/data";
	var param={"userId":userId,"userName":userId};
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);
}

// 确定按钮
function confirm() {
	var selectedNodes = $("input[name='radio']:checked").val();
	if(!selectedNodes) {
		$.sticky(L.getLocaleMessage("bsp.user.079","请选择一个节点！"), {
			autoclose : 1000,
			position : "center",
			style : "warning"
		});
		return false;
	}

	dialog.close(selectedNodes.split(","));
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