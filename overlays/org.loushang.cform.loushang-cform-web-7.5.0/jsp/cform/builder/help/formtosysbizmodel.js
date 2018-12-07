/**
 * 常量
 */
var Constants = {
	// 表单树
	FormTree : {
		FormNode : 0,
		ZoneNode : 1,
		FieldNode : 2,
		// 拖动新增的节点
		BizModelItem : 3
	},
	// 业务模型树
	BizModelTree : {
		BizModelNode : 0,
		BizModelItem : 1
	}
};

/**
 * 组装表单树
 */
function initFormTree() {
	var $form = $(window.parent.document.getElementById("popupFrame").inParam);
	var formTree = [];

	// 根节点
	var rootJson = {
		fieldId : $form.attr("id"),
		fieldName : $form.attr("name"),
		// 节点类型，0：Form节点，1：Zone节点，2：Field节点
		type : Constants.FormTree.FormNode,
		open : true,
		isParent : true
	};
	formTree.push(rootJson);

	// 区域节点
	var zoneArray = $form.find('[cf_elementType=zone]');
	$.each(zoneArray, function() {
		var zoneId = $(this).attr("id");
		var zoneName = $(this).attr("name");
		var pId = $form.attr("id");

		// 父区域
		var $zoneParent = $(this).parents('[cf_elementType=zone]');
		if ($zoneParent.length > 0) {
			pId = $($zoneParent[0]).attr("id");
		}

		var zoneJson = {
			fieldId : zoneId,
			fieldName : zoneName,
			type : Constants.FormTree.ZoneNode,
			pId : pId
		};

		formTree.push(zoneJson);
	});

	// 域节点
	var fieldArray = $form.find('[cf_elementType=field][type!=button]');
	var obj = new Object();
	$.each(fieldArray, function() {
		var fieldId = $(this).attr("id");
		var fieldName = $(this).attr("name");
		var pId = $form.attr("id");

		if(!obj[fieldId]){
			// 区域
			var $fieldZoneParent = $(this).parents('[cf_elementType=zone]');
			if ($fieldZoneParent.length > 0) {
				pId = $($fieldZoneParent[0]).attr("id");
			}

			var fieldJson = {
				fieldId : fieldId,
				fieldName : fieldName,
				type : Constants.FormTree.FieldNode,
				pId : pId
			};

			formTree.push(fieldJson);

			// 获取已有业务模型映射
			var modelItemId = $(this).attr("cf_modelItemId");
			var modelItemName = $(this).attr("cf_modelItemName");

			if (modelItemId) {
				var modelItemJson = {};
				modelItemJson.fieldId = "MODELITEM:" + modelItemId;
				modelItemJson.fieldName = modelItemName;

				modelItemJson.pId = fieldId;
				modelItemJson.type = Constants.FormTree.BizModelItem;
				formTree.push(modelItemJson);
			}
			obj[fieldId] = fieldId;
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
				prev : false,
				next : false
			}
		},
		data : {
			key : {
				name : "fieldName"
			},
			simpleData : {
				enable : true,
				idKey : "fieldId"
			}
		},
		callback : {
			beforeDrag : ftBeforeDrag
		}
	};

	$.fn.zTree.init($("#formTreeContainer"), treeSetting, formTree);
}

/**
 * 表单树拖动前处理函数，在该树上不允许拖动
 * 
 * @param treeId
 * @param treeNodes
 * @returns {Boolean}
 */
function ftBeforeDrag(treeId, treeNodes) {
	return false;
}

function addHoverDomHandler(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");

	if (treeNode.type == Constants.FormTree.BizModelItem) {
		// 为防止jQuery选择器误把"tblName:colName"中的":"作为选择器一部分，
		// 所以将":"替换为"_"，保存为新的属性
		treeNode.delBtn = treeNode.fieldId.replace(":", "_");
	}
	if (treeNode.type != Constants.FormTree.BizModelItem
			|| treeNode.editNameFlag
			|| $("#delBtn_" + treeNode.delBtn).length > 0) {
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
	var addStr = "<span class='button del' id='delBtn_" + treeNode.delBtn
			+ "' title='"+L.getLocaleMessage("cf.delete", "删除")+"' onfocus='this.blur();'></span>";

	if (treeNode.type == Constants.FormTree.BizModelItem) {
		sObj.append(addStr);

		var btn = $("#delBtn_" + treeNode.delBtn);
		if (btn) {
			btn.bind("click", function(e) {
				showConfirm(L.getLocaleMessage("cf.bdr.confirmdeletemapping", "确定删除映射吗？"), function(){
					var tmpStr = treeNode.fieldId;

					var $form = $(window.parent.document.getElementById("popupFrame").inParam);
					var $field = $form.find("[id="
							+ treeNode.getParentNode().fieldId + "]");

					$field.removeAttr('cf_modelItemId');
					$field.removeAttr('cf_modelItemName');
					$field.removeAttr('cf_bizMean');
					$field.removeAttr('cf_dataBindType');
					$field.removeAttr('cf_dataBindParam');
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					zTree.removeNode(treeNode);
				});
			});
		}
	}
};

function removeHoverDom(treeId, treeNode) {
	$("#delBtn_" + treeNode.delBtn).unbind().remove();
};

/**
 * 初始化业务模型树
 */
function initBizModelTree() {
	var $form = $(window.parent.document.getElementById("popupFrame").inParam);
	var bizModelTree = [];
	// 根节点
	var rootJson = {
		modelId : "bizModelRoot",
		modelName : L.getLocaleMessage("cf.modellist", "业务模型树"),
		modelLength : null,
		bizMean : "",
		dataBindType : "",
		dataBindParam : "",
		type : Constants.BizModelTree.BizModelNode,
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
					+ "getBizModelWithBizMeanAndDataBindInfo",
			autoParam : [ "modelId" ],
			dataFilter : dataFilter,
			otherParam : [ "initModelId", $form.attr("cf_modelId"), "referedFormId", $form.attr("cf_formIdRef") ]
		},
		callback : {
			beforeDrag : beforeDrag,
			beforeDrop : beforeDrop
		}
	};

	$.fn.zTree.init($("#bizModelTreeContainer"), treeSetting, bizModelTree);
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
		// 将节点所属表的名称和中文名保存到节点中
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
	// 目标节点不是域节点
	if (targetNode == null || targetNode.type != Constants.FormTree.FieldNode) {
		return false;
	}
	//自动映射区域
	var $form = $(window.parent.document.getElementById("popupFrame").inParam);
	
	var $cfDynRow = $form.find("[id=" + targetNode.pId + "]");
	if($cfDynRow.hasClass("cfDynRow")){
		if(!$cfDynRow.attr("cf_modelid")){
			$cfDynRow.attr("cf_modelid",treeNodes[0].parentModelId);
			$cfDynRow.attr("cf_modelname",treeNodes[0].parentModelName);
		}
	}
	var $field = $form.find("[id=" + targetNode.fieldId + "]");

	if ($field) {
		if (treeNodes.length > 0) {
			if (targetNode.children && targetNode.children.length >= 1) {
				showDialog(L.getLocaleMessage("cf.bdr.onefieldbizmodelmapping", "每个域只能映射一个业务模型项！"));
				return false;
			}
			
			// 子节点
			var node = treeNodes[0];
			node.fieldId = node.modelId;
			node.fieldName = node.modelName;
			node.type = Constants.FormTree.BizModelItem;
			
			$field.attr('cf_modelItemId', node.modelId);
			$field.attr('cf_modelItemName', node.modelName);
			$field.attr('cf_fieldLength', node.modelLength);
			$field.attr('cf_bizMean', node.bizMean);
			$field.attr('cf_dataBindType', node.dataBindType);
			$field.attr('cf_dataBindParam', node.dataBindParam);
		}
	}

	return true;
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