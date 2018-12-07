<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<title>功能通用帮助</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<style type="text/css">
		
		.container {
			padding: 0 0 30px 0;
			margin: -15px 0 0 -10px;
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

		/*ztree icon修改*/
		.ztree li span.button.app_ico_open, 
		.ztree li span.button.app_ico_close,
		.ztree li span.button.app_ico_docu,
		.hint-app-ico {
			background: url(<l:asset path='bsp/img/function_tree.png'/>);
		}
		.ztree li span.button.module_ico_open, 
		.ztree li span.button.module_ico_close,
		.ztree li span.button.module_ico_docu,
		.hint-module-ico {
			background: url(<l:asset path='bsp/img/function_tree.png'/>) -16px 0px;
		}
		.ztree li span.button.function_ico_open, 
		.ztree li span.button.function_ico_close,
		.ztree li span.button.function_ico_docu,
		.hint-function-ico {
			background: url(<l:asset path='bsp/img/function_tree.png'/>) -32px 0px;
		}
		.ztree li span.button.operation_ico_docu,
		.hint-operation-ico {
			background: url(<l:asset path='bsp/img/function_tree.png'/>) -48px 0px;
		}
	</style>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ztree.js'/>"></script>
	
</head>
<body>
	<div class="container">
		<ul id="functionTree" class="ztree"></ul>
	</div>
	<div class="foot">
		<div class="btnGroup">
	   	    <button id="confirm" type="button" class="btn ue-btn-primary"><spring:message code="bsp.function.059" text="确定"/></button>
	   	    <button id="clear" type="button" class="btn ue-btn"><spring:message code="bsp.function.060" text="清除"/></button>
	   	</div>
	</div>

	<script type="text/javascript">
		var context = "<l:assetcontext/>";
		var dialog = parent.dialog.get(window);
		var tree, rootNode;

		// 根节点
		var rootId = "${rootId}";

		// 显示的节点类型
		var showableType = "${showableType}";

		// 可以选择的节点类型
		var selType = "${selType}";

		// 是否精确匹配可以选择的类型
		var isPreciseMatch = "${isPreciseMatch}";

		// 选择框类型，是否为复选框，1为复选框，0为单选框
		var isChkbox = "${isChkbox}";

		// 复选框是否级联选择，1为是，0为否
		var isCascadeSelect = "${isCascadeSelect}";

		// 常量
		var Constants = {
			// 树节点图标类名
			Icon: {
				App: "app",
				Module: "module",
				Function: "function",
				Operation: "operation"
			},
			TypeName: {
				App: "app",
				ParentModule: "parentModule",
				Module: "module",
				Operation: "operation",
				Function: "function",
				Url: "url"
			}
		};

		$(function() {

			// 初始化树
			initTree();

			// 确定按钮
			$("#confirm").click(function(){
				confirm();
			});
			
			// 取消按钮
			$("#clear").click(function(){
				clear();
			});

		});

		// 初始化功能树
		function initTree() {
			var msg = L.getLocaleMessage("bsp.function.061","功能操作树");
			// 存储树节点
			var treeNodes = [];

			// 定义根节点
			var root = {
				type : "root",
				id : "rootId",
				name : msg,
				isParent : true,
				iconSkin : "icon01",
				isRoot : true,
				nocheck: true,
				ntype : "root" // 用户判断可选类型
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
					onExpand: onExpand
				},
				edit : {
					enable : true,
					showRemoveBtn : false,
					showRenameBtn : false
				},
				check: {
					enable: true,
					chkStyle: isChkbox == "1" ? "checkbox" : "radio",
					radioType: "all",
					chkboxType: {"Y": isCascadeSelect == "1" ? "s" : "", "N": isCascadeSelect == "1" ? "s" : ""}
				}
			
			};

			// 初始化树
			tree = $.fn.zTree.init($("#functionTree"), treeSetting, treeNodes);
			// 将根节点存储在全局变量中，方便以后获取
			rootNode = tree.getNodes()[0];
			// 展开跟节点
			tree.expandNode(rootNode);
		}

		// 单击树节点时展开节点
		function onClick(e,treeId, treeNode) {
			tree.expandNode(treeNode, "", false, true, true);
		}

		// 处理查询到的子节点：设置是否为父节点(isParent)->根据相应的名称属性判断节点类型->设置节点的name属性用于树的展现->设置节点图标->设置节点类型
		function dataFilter(treeId, parentNode, childNodes) {
			var childNodes = $.grep(childNodes, function(childNode, index){
				childNode["isParent"] = true;
				
				if(childNode["appName"]) {
					childNode["id"] = childNode["appCode"];
					childNode["name"] = childNode["appName"];
					childNode["iconSkin"] = Constants.Icon.App;
					childNode["type"] = Constants.TypeName.App;
					childNode["ntype"] = Constants.TypeName.App;
					
				}else if(childNode["moduleName"]) {
					childNode["id"] = childNode["moduleCode"];
					childNode["name"] = childNode["moduleName"];
					childNode["iconSkin"] = Constants.Icon.Module;
					childNode["type"] = Constants.TypeName.Module;
					if(childNode["isLeafModule"] == "1") {
						childNode["ntype"] = Constants.TypeName.Module;
					}else {
						childNode["ntype"] = Constants.TypeName.ParentModule;
					}
					childNode["icon"] = null; //功能树图标使用默认，不需要更改
					
				}else if(childNode["functionName"]) {
					childNode["id"] = childNode["functionCode"];
					childNode["name"] = childNode["functionName"];
					childNode["iconSkin"] = Constants.Icon.Function;
					childNode["type"] = Constants.TypeName.Function;
					childNode["ntype"] = Constants.TypeName.Function;
					
				}else if(childNode["operationName"]) {
					childNode["id"] = childNode["operationCode"];
					childNode["name"] = childNode["operationName"];
					childNode["iconSkin"] = Constants.Icon.Operation;
					childNode["isParent"] = false;
					childNode["type"] = Constants.TypeName.Operation;
					childNode["ntype"] = Constants.TypeName.Operation;
					
				}else {
					return false;
				}

				// 设置可以选择的节点类型
				var selectTypes = selType.split(";");
				if(selType) {
					if(isPreciseMatch == "1") {
						if($.inArray(childNode["ntype"], selectTypes) == "-1") {
							childNode["nocheck"] = true;
						}
					} else {
						var isInclude = false;
						$.each(selectTypes, function(i, type){
							if(childNode["ntype"].match("^"+type+".*")) {
								isInclude = true;
								return true;
							}
						});
						if(!isInclude) {
							childNode["nocheck"] = true;
						}
					}
				}

				// 设置可以显示的节点类型，如果不设置showableType属性值，则默认全部显示
				if(!showableType) {
					return true;
				}
				var showTypes = showableType.split(";");
				if($.isArray(childNode["ntype"], showTypes) == "-1") {
					return false;
				} else {
					return true;
				}

			});
			return childNodes;
		}

		// 树节点展开后：如果没有子节点，则将该节点设置成子节点
		function onExpand(e, treeId, treeNode) {
			if(treeNode.children.length < 1) {
				treeNode["isParent"] = false;
				tree.updateNode(treeNode);
			}
		}


		// 提示框
		function sticky (msg, style, position) {
			var type = style ? style : "warning";
			var place = position ? position : "center";
			$.sticky(msg, {
				autoclose : 1000,
				position : place,
				style : type
			});
		}

		// 确定按钮
		function confirm() {
			var msg = L.getLocaleMessage("bsp.function.062","请选择一个节点，或点击关闭！");
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
</body>
</html>