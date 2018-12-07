/**
 * 常量
 */
var Constants = {
	// 业务模型树
	FormModelTree : {
		BizModelNode : 0,
		BizModelItemNode : 1,
		BizModelItemMapNode : 2
	}
};

/**
 * 组装业务模型映射树
 */
function initFormModelTree() {
	var $form = $(window.parent.document.getElementById("popupFrame").inParam);
	var formModelTree = [];

	// 根节点
	var rootJson = {
		modelId : $form.attr("cf_modelId"),
		modelName : $form.attr("cf_modelName"),
		displayName : L.getLocaleMessage("cf.bdr.formmodel", "表单业务模型树"),
		type : Constants.FormModelTree.BizModelNode,
		open : true,
		isParent : true
	};
	formModelTree.push(rootJson);
	
	// 子模型节点
	var zoneArray = $form.find('[cf_elementType=zone]');
	$.each(zoneArray, function() {
		var modelId = $(this).attr("cf_modelId")?$(this).attr("cf_modelId"):$(this).attr("id");
		var modelName = $(this).attr("cf_modelName")?$(this).attr("cf_modelName"):$(this).attr("name");
		var pId = $form.attr("cf_modelId");

		// 父模型
		var $zoneParent = $(this).parents('[cf_elementType=zone]');
		if ($zoneParent.length) {
			pId = $($zoneParent[0]).attr("cf_modelId")?$($zoneParent[0]).attr("cf_modelId"):$($zoneParent[0]).attr("id");
		}

		var zoneJson = {
			modelId : modelId,
			modelName : modelName,
			displayName : modelName,
			type : Constants.FormModelTree.BizModelNode,
			pId : pId
		};
		formModelTree.push(zoneJson);
	});

	// 模型项节点
	var fieldArray = $form.find('[cf_elementType=field][cf_modelItemId]');
	var obj = new Object();
	$.each(fieldArray, function() {
		var modelId = $(this).attr("cf_modelItemId");
		var modelName = $(this).attr("cf_modelItemName");
		var pId = $form.attr("cf_modelId");
		
		if(!obj[modelId]){
			// 父模型
			var $fieldZoneParent = $(this).parents('[cf_elementType=zone]');
			if ($fieldZoneParent.length) {
				pId = $($fieldZoneParent[0]).attr("cf_modelId")?$($fieldZoneParent[0]).attr("cf_modelId"):$($fieldZoneParent[0]).attr("id");
			}

			var fieldJson = {
				modelId : "p_" + modelId,
				modelName : modelName,
				displayName : modelName,
				type : Constants.FormModelTree.BizModelItemNode,
				pId : pId
			};
			formModelTree.push(fieldJson);
			obj[modelId] = modelId;
			
			// 上行映射
			var form2Bizs = $(this).attr("cf_form2Biz");
			if (form2Bizs) {
				var form2BizNames = $(this).attr("cf_form2BizName");
				var form2BizArr = form2Bizs.split('#');
				var form2BizNameArr = form2BizNames.split('#');
				for (var i = 0; i < form2BizArr.length; i++) {
					// id
					var form2Biz = form2BizArr[i];
					// 中文名
					var form2BizName = form2BizNameArr[i];
					
					var ids = form2Biz.split('.');
					var modelId = ids[0];
					var modelItemId = ids[1];
					
					var names = form2BizName.split('.');
					var modelItemName = names[1];
					
					var mapJson = {
							modelId : modelItemId,
							modelName : modelItemName,
							displayName : form2BizName,
							type : Constants.FormModelTree.BizModelItemMapNode,
							parentModelId : modelId,
							pId : fieldJson.modelId
						};
					formModelTree.push(mapJson);
				}
			}
		}		
	});

	var treeSetting = {
		view : {
			addHoverDom : addHoverDomHandler,
			removeHoverDom : removeHoverDom,
			selectedMulti : false
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false,
			drag : {
				isMove : false,
				isCopy : false,
				prev : false,
				next : false
			}
		},
		data : {
			key : {
				name : "displayName"
			},
			simpleData : {
				enable : true,
				idKey : "modelId"
			}
		},
		callback : {
			beforeDrag : ftBeforeDrag,
			onExpand : resetHeight
		}
	};
	
	var zTree = $.fn.zTree.init($("#sourceTreeContainer"), treeSetting, formModelTree);
	// 默认打开根节点
	var nodes = zTree.getNodes();
	zTree.expandNode(nodes[0],true,false,true);
}

/**
 * 目标树拖动前处理函数，在该树上不允许拖动
 * 
 * @param treeId
 * @param treeNodes
 * @returns {Boolean}
 */
function ftBeforeDrag(treeId, treeNodes) {
	return false;
}

/**
 * 增加按钮处理函数
 * 
 * @param treeId
 * @param treeNode
 * @returns
 */
function addHoverDomHandler(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.type != Constants.FormModelTree.BizModelItemMapNode
			|| treeNode.editNameFlag
			|| $("#delBtn_" + treeNode.modelId).length > 0) {
		return;
	}
	removeBtn(treeId, treeNode, sObj);
};

/**
 * 删除按钮
 * 
 * @param treeId
 * @param treeNode
 * @param sObj
 */
function removeBtn(treeId, treeNode, sObj) {
	var addStr = "<span class='button del' id='delBtn_" + treeNode.modelId
			+ "' title='"+L.getLocaleMessage("cf.delete", "删除")+"' onfocus='this.blur();'></span>";

	if (treeNode.type == Constants.FormModelTree.BizModelItemMapNode) {
		sObj.append(addStr);

		var btn = $("#delBtn_" + treeNode.modelId);
		if (btn) {
			btn.bind("click", function(e) {
				showConfirm(L.getLocaleMessage("cf.bdr.confirmdeletemapping", "确定删除映射吗？"), function(){
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					zTree.removeNode(treeNode);
				});
			});
		}
	}
};

/**
 * 移除删除图标
 * 
 * @param treeId
 * @param treeNode
 * @returns
 */
function removeHoverDom(treeId, treeNode) {
	$("#delBtn_" + treeNode.modelId).unbind().remove();
};

/**
 * 初始化业务模型树
 */
function initBizModelTree() {
	var bizModelTree = [];
	
	// 根节点
	var rootJson = {
		modelId : "bizModelRoot",
		modelName : L.getLocaleMessage("cf.custommodel", "自定义业务模型树"),
		type : Constants.FormModelTree.BizModelNode,
		open : true,
		isParent : true
	};
	bizModelTree.push(rootJson);

	var treeSetting = {
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false,
			drag : {
				isMove : false,
				prev : false,
				next : false,
				inner : false
			}
		},
		data : {
			key : {
				name : "modelName"
			},
			simpleData : {
				enable : true,
				idKey : "modelId"
			}
		},
		async : {
			enable : true,
			url : context + "/command/dispatcher/"
					+ "org.loushang.cform.biz.cmd.BizModelDispatcherCmd/"
					+ "getAllBizModels",
			autoParam : [ "modelId" ],
			dataFilter : dataFilter
		},
		callback : {
			beforeDrag : beforeDrag,
			beforeDrop : beforeDrop,
			onExpand : resetHeight
		}
	};

	var zTree = $.fn.zTree.init($("#targetTreeContainer"), treeSetting, bizModelTree);
	// 默认打开根节点
	var nodes = zTree.getNodes();
	zTree.expandNode(nodes[0],true,false,true);
}

/**
 * 处理业务模型树上的拖动
 * 
 * @param treeId
 * @param treeNodes
 * @returns {Boolean}
 */
function beforeDrag(treeId, treeNodes) {
	for ( var i = 0, l = treeNodes.length; i < l; i++) {
		if (treeNodes[i].type == '0') {
			return false;
		}
		// 将节点所属表的名称、中文名称保存到节点中
		treeNodes[i].parentModelId = treeNodes[i].getParentNode().modelId;
		treeNodes[i].parentModelName = treeNodes[i].getParentNode().modelName;
	}
	return true;
}

/**
 * 处理拖放
 * 
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 * @returns {Boolean}
 */
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
	// 目标节点不是业务模型项节点
	if (targetNode == null || targetNode.type != Constants.FormModelTree.BizModelItemNode) {
		return false;
	}

	if (treeNodes.length > 0) {
		var node = treeNodes[0];
		node.type = Constants.FormModelTree.BizModelItemMapNode;
		node.displayName = node.parentModelName + "." + node.modelName;
		
		// 重复性校验
		var zTree = $.fn.zTree.getZTreeObj('sourceTreeContainer');
		var node = zTree.getNodeByParam("displayName", node.displayName, targetNode);
		if (node != null) {
			cfalert(L.getLocaleMessage("cf.bdr.multiplemapping", "不能重复添加映射！"));
			return false;
		}
	}

	return true;
}

/**
 * 展开节点时，重设ztree高度，解决ie浏览器标准模式下，不显示滚动条问题
 */
function resetHeight() {
	$("ul.ztree").height(0).height(415);
}

/**
 * 业务模型树数据过滤
 * 
 * @param treeId
 * @param parentNode
 * @param childNodes
 * @returns
 */
function dataFilter(treeId, parentNode, childNodes) {
	return childNodes;
}

$(function() {
	// 组装业务模型映射树
	initFormModelTree();
	
	// 组装业务模型树
	initBizModelTree();
	
	// 点击确定按钮
	$('#confirmBtn').click(function(){
		var $form = $(window.parent.document.getElementById("popupFrame").inParam);
		
		var zTree = $.fn.zTree.getZTreeObj('sourceTreeContainer');
		var itemNodes = zTree.getNodesByParam("type", "1", null);
		if(itemNodes.length){
			for(var i = 0; i < itemNodes.length; i++){
				var itemNode = itemNodes[i];
				var modelItemId = itemNode.modelId.substr(2);
				// 获取域
				var $field = $form.find("[cf_elementType=field][cf_modelItemId=" + modelItemId + "]");
				// 源
				var mapNodes = itemNode.children;
				if (mapNodes && mapNodes.length) {
					var mapValue = "";
					var mapNameValue = "";
					for(var m = 0; m < mapNodes.length; m++){
						var toModelId = mapNodes[m].parentModelId;
						var toModelItemId = mapNodes[m].modelId;
						var toModelName = mapNodes[m].displayName;
						mapValue += toModelId + "." + toModelItemId;
						mapNameValue += toModelName;
						if (m != mapNodes.length - 1) {
							mapValue += "#";
							mapNameValue += "#";
						}
					}
					$field.attr("cf_form2Biz", mapValue);
					$field.attr("cf_form2BizName", mapNameValue);
				} else {
					$field.removeAttr("cf_form2Biz");
					$field.removeAttr("cf_form2BizName");
				}
			}
		}
		
		closeDialog(null);
	});	
});