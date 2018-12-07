/**
 * 编辑域->列表域
 */
$(function(){
	/**
	 * 常量
	 */
	var Constants = {
		// 列表域树
		GridFieldTree : {
			EditGridNode : 0,
			FieldNode : 1
		},
		// 编辑域树
		EditFieldTree : {
			EditGridNode : 0,
			EditFieldNode : 2
		}
	};
	
	// 当前可编辑列表
	var $curEditGrid = $(window.parent.document.getElementById("popupFrame").inParam);
	
	var fieldMap = {
		/**
		 * 增加映射关系
		 * 
		 * @param fieldId 域Id
		 * @param treeNode 节点
		 */
		add : function(fieldId, treeNode){
			var $field = $curEditGrid.find("[id=" + fieldId + "]");
			if ($field) {
				var treeNodeId = treeNode.fieldId;
				var treeNodeName = treeNode.fieldName;
				$field.attr('cf_editfieldid', treeNodeId);
				$field.attr('cf_editfieldname', treeNodeName);
			}			
		},
		
		/**
		 * 删除映射关系
		 * 
		 * @param fieldId 域Id
		 * @param treeNode 节点
		 */
		del : function(fieldId, treeNode){
			var $field = $curEditGrid.find("[id=" + fieldId + "]");
			if ($field) {
				$field.removeAttr('cf_editfieldid');
				$field.removeAttr('cf_editfieldname');
			}
		}
	};
	
	/**
	 * 列表域树
	 */
	var gridFieldTree = (function(){
		// 树的数据
		var gridFieldTree = [];

		// 根节点
		var rootJson = {
			fieldId : $curEditGrid.attr("id"),
			fieldName : L.getLocaleMessage("cf.bdr.rowfield", "列表域"),
			// 节点类型，0：EditGrid节点，1：Field节点
			type : Constants.GridFieldTree.EditGridNode,
			open : true,
			isParent : true
		};
		gridFieldTree.push(rootJson);

		// 域节点
		var fieldArray = $curEditGrid.find('.cfDynRowTable [cf_elementType=field]');
		$.each(fieldArray, function() {
			// 过滤按钮和超链接
			if (this.type == "button" || 
					this.tagName.toLowerCase() == "button" ||
					this.tagName.toLowerCase() == "a") {
				return;// 实现continue功能
			}
			var fieldId = $(this).attr("id");
			var fieldName = $(this).attr("name");
			var pId = $curEditGrid.attr("id");
			
			// 检测是否已经存在该域
			var isExist = $.grep(gridFieldTree, function(elem, idx){
				return elem.fieldId == "p_" + fieldId && elem.fieldName == fieldName;
			});
			// 如果存在则跳过
			if(isExist.length > 0){
				return;
			}

			var fieldJson = {
				fieldId : "p_" + fieldId,
				fieldName : fieldName,
				type : Constants.GridFieldTree.FieldNode,
				pId : pId
			};
			gridFieldTree.push(fieldJson);
			
			// 已有编辑域映射关系
			var editFieldId = $(this).attr("cf_editFieldId");
			var editFieldName = $(this).attr("cf_editFieldName");
			if (editFieldId) {
				var editFieldJson = {};
				editFieldJson.fieldId = editFieldId;
				editFieldJson.fieldName = editFieldName;
				editFieldJson.type = Constants.EditFieldTree.EditFieldNode;
				editFieldJson.pId = fieldJson.fieldId;
				gridFieldTree.push(editFieldJson);
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
					name : "fieldName"
				},
				simpleData : {
					enable : true,
					idKey : "fieldId"
				}
			},
			callback : {
				beforeDrag : gtBeforeDrag,
				onExpand : resetHeight
			}
		};
		
		/**
		 * 列表域树拖动前处理函数，在该树上不允许拖动
		 * 
		 * @param treeId
		 * @param treeNodes
		 * @returns {Boolean}
		 */
		function gtBeforeDrag(treeId, treeNodes) {
			return false;
		}
		
		/**
		 * 增加按钮处理函数
		 */
		function addHoverDomHandler(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			
			if (treeNode.type != Constants.EditFieldTree.EditFieldNode
					|| treeNode.editNameFlag
					|| $("#delBtn_" + treeNode.fieldId).length > 0) {
				return;
			}
			removeBtn(treeId, treeNode, sObj);
		};

		/**
		 * “删除”按钮
		 * 
		 * @param treeId
		 * @param treeNode
		 * @param sObj
		 */
		function removeBtn(treeId, treeNode, sObj) {
			var addStr = "<span class='button del' id='delBtn_" + treeNode.fieldId
					+ "' title='"+L.getLocaleMessage("cf.delete", "删除")+"' onfocus='this.blur();'></span>";

			if (treeNode.type == Constants.EditFieldTree.EditFieldNode) {
				sObj.append(addStr);

				var btn = $("#delBtn_" + treeNode.fieldId);
				if (btn) {
					btn.bind("click", function(e) {
						var fieldId = treeNode.getParentNode().fieldId;
						// 删除映射关系
						fieldMap.del(fieldId.substr(2), treeNode);
						
						var zTree = $.fn.zTree.getZTreeObj(treeId);
						zTree.removeNode(treeNode);
					});
				}
			}
		};

		/**
		 * 删除按钮处理函数
		 */
		function removeHoverDom(treeId, treeNode) {
			$("#delBtn_" + treeNode.fieldId).unbind().remove();
		};
		
		return {
			init : function(){
				var zTree = $.fn.zTree.init($("#gridFieldTree"), treeSetting, gridFieldTree);
				// 默认打开根节点
				var nodes = zTree.getNodes();
				zTree.expandNode(nodes[0],true,false,true);
			}
		};
	})();
	
	/**
	 * 编辑域树
	 */
	var editFieldTree = (function(){
		
		// 树的数据
		var editFieldTree = [];

		// 根节点
		var rootJson = {
			fieldId : $curEditGrid.attr("id"),
			fieldName : L.getLocaleMessage("cf.bdr.editfield", "编辑域"),
			// 节点类型，0：EditGrid节点，1：Field节点
			type : Constants.GridFieldTree.EditGridNode,
			open : true,
			isParent : true
		};
		editFieldTree.push(rootJson);

		// 编辑域节点
		var edidFieldArray = $curEditGrid.find('.cfEditTable [cf_elementType]');
		$.each(edidFieldArray, function() {
			// 过滤按钮和超链接
			if (this.type == "button" || 
					this.tagName.toLowerCase() == "button" ||
					this.tagName.toLowerCase() == "a") {
				return;// 实现continue功能
			}
			var fieldId = $(this).attr("id");
			var fieldName = $(this).attr("name");
			var pId = $curEditGrid.attr("id");
			
			// 检测是否已经存在该域
			var isExist = $.grep(editFieldTree, function(elem, idx){
				return elem.fieldId == "p_" + fieldId && elem.fieldName == fieldName;
			});
			// 如果存在则跳过
			if(isExist.length > 0){
				return;
			}

			var fieldJson = {
				fieldId : fieldId,
				fieldName : fieldName,
				type : Constants.GridFieldTree.FieldNode,
				pId : pId
			};
			editFieldTree.push(fieldJson);
			
		});
		
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
					name : "fieldName"
				},
				simpleData : {
					enable : true,
					idKey : "fieldId"
				}
			},
			callback : {
				beforeDrag : beforeDrag,
				beforeDrop : beforeDrop,
				onExpand : resetHeight
			}
		};
		
		/**
		 * 处理编辑域树上的拖动
		 * 
		 * @param treeId
		 * @param treeNodes
		 * @returns {Boolean}
		 */
		function beforeDrag(treeId, treeNodes) {
			for ( var i = 0, l = treeNodes.length; i < l; i++) {
				if (treeNodes[i].type == Constants.EditFieldTree.EditGridNode) {
					return false;
				}
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
			if (targetNode.type != Constants.GridFieldTree.FieldNode) {
				return false;
			}
			
			// 一个列表区的域只能与一个编辑区的域有映射关系
			var subNodes = targetNode.children;
			if (subNodes && subNodes.length) {
				return false;
			}
			
			if (treeNodes.length > 0) {
				var node = treeNodes[0];
				if(fieldMap.add(targetNode.fieldId.substr(2), node) === false){
					return false;
				}
				node.fieldId = node.fieldId;
				node.fieldName = node.fieldName;
				node.type = Constants.EditFieldTree.EditFieldNode;
			}

			return true;
		}

		return {
			init : function(){
				var zTree = $.fn.zTree.init($("#editFieldTree"), treeSetting, editFieldTree);
				// 默认打开根节点
				var nodes = zTree.getNodes();
				zTree.expandNode(nodes[0],true,false,true);
			}
		};
	})();
	
	/**
	 * 展开节点时，重设ztree高度，解决ie浏览器标准模式下，不显示滚动条问题
	 */
	function resetHeight() {
		$("ul.ztree").height(0).height(390);
	}
	
	// 初始化列表树
	gridFieldTree.init();
	
	// 初始化编辑树
	editFieldTree.init();
});