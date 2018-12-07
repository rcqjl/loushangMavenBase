/**
 * 表单属性批量浏览
 */
$(function(){
	/**
	 * 常量
	 */
	var Constants = {
		// 表单树
		FormTree : {
			FormNode : 0,
			ZoneNode : 1,
			FieldNode : 2,
			BizMeanNode : 3
		},
		BizMeanTree : {
			BizMeanTypeNode : 0,
			BizMeanNode : 1
		}
	};
	
	// 表单
	var $form = $(window.parent.document.getElementById("popupFrame").inParam);
	
	var fieldBizMean = {
		/**
		 * 增加域业务含义
		 * 
		 * @param fieldId 域Id
		 * @param treeNode 节点
		 */
		add : function(fieldId, treeNode){
			var $field = $form.find("[id=" + fieldId + "]");
			if ($field) {
				var code = treeNode.code;
				var name = treeNode.name;
				$field.attr('cf_bizMean', code);
				$field.attr('cf_bizMeanName', name);
			}			
		},
		
		/**
		 * 删除域业务含义
		 * 
		 * @param fieldId 域Id
		 * @param treeNode 节点
		 */
		del : function(fieldId, treeNode){
			var $field = $form.find("[id=" + fieldId + "]");
			if ($field) {
				$field.removeAttr('cf_bizMean');
				$field.removeAttr('cf_bizMeanName');
			}
		}
	};
	
	/**
	 * 表单树
	 */
	var formTree = (function(){
		// 树的数据
		var formTree = [];

		// 根节点
		var rootJson = {
			fieldId : $form.attr("id"),
			fieldName : L.getLocaleMessage("cf.bdr.formtree", "表单树"),
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
		var fieldArray = $form.find('[cf_elementType=field]');
		$.each(fieldArray, function() {
			// 过滤按钮和超链接
			if (this.type == "button" || 
					this.tagName.toLowerCase() == "button" ||
					this.tagName.toLowerCase() == "a") {
				return;// 实现continue功能
			}
			var fieldId = $(this).attr("id");
			var fieldName = $(this).attr("name");
			var pId = $form.attr("id");
			
			// 检测是否已经存在该域
			var isExist = $.grep(formTree, function(elem, idx){
				return elem.fieldId == "p_" + fieldId && elem.fieldName == fieldName;
			});
			// 如果存在则跳过
			if(isExist.length > 0){
				return;
			}

			// 区域
			var $fieldZoneParent = $(this).parents('[cf_elementType=zone]');
			if ($fieldZoneParent.length > 0) {
				pId = $($fieldZoneParent[0]).attr("id");
			}

			var fieldJson = {
				fieldId : "p_" + fieldId,
				fieldName : fieldName,
				type : Constants.FormTree.FieldNode,
				pId : pId
			};
			formTree.push(fieldJson);
			
			// 已有业务含义
			var bizMean = $(this).attr("cf_bizMean");
			if (bizMean) {
				var bizMeanName = $(this).attr("cf_bizMeanName");
				var bizMeanJson = {};
				bizMeanJson.fieldId = bizMean;
				bizMeanJson.fieldName = bizMeanName;
				bizMeanJson.type = Constants.FormTree.BizMeanNode;
				bizMeanJson.pId = fieldJson.fieldId;
				formTree.push(bizMeanJson);
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
				beforeDrag : ftBeforeDrag,
				onExpand : resetHeight
			}
		};
		
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
		
		/**
		 * 增加按钮处理函数
		 */
		function addHoverDomHandler(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");

			if (treeNode.type != Constants.FormTree.BizMeanNode
					|| treeNode.editNameFlag
					|| $("#delBtn_" + treeNode.fieldId).length > 0) {
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
			var addStr = "<span class='button del' id='delBtn_" + treeNode.fieldId
					+ "' title='"+L.getLocaleMessage("cf.delete", "删除")+"' onfocus='this.blur();'></span>";

			if (treeNode.type == Constants.FormTree.BizMeanNode) {
				sObj.append(addStr);

				var btn = $("#delBtn_" + treeNode.fieldId);
				if (btn) {
					btn.bind("click", function(e) {
						var msg = L.getLocaleMessage("cf.bdr.bizmeanconfirm", "确定删除业务含义吗？")
						showConfirm(msg, function(){
							var fieldId = treeNode.getParentNode().fieldId;
							// 删除业务含义
							fieldBizMean.del(fieldId.substr(2), treeNode);
							
							var zTree = $.fn.zTree.getZTreeObj(treeId);
							zTree.removeNode(treeNode);
						});
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
				var zTree = $.fn.zTree.init($("#formTree"), treeSetting, formTree);
				// 默认打开根节点
				var nodes = zTree.getNodes();
				zTree.expandNode(nodes[0],true,false,true);
			}
		};
	})();
	
	/**
	 * 业务含义树
	 */
	var bizMeanTree = (function(){
		// 数据
		var bizMeanTree = [];
		
		// 根节点
		var rootJson = {
			code : "_rootCode",
			name : L.getLocaleMessage("cf.bizmean", "业务含义树"),
			type : Constants.BizMeanTree.BizMeanTypeNode,
			open : true,
			isParent : true
		};
		bizMeanTree.push(rootJson);

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
					name : "name"
				},
				simpleData : {
					enable : true,
					idKey : "code"
				}
			},
			async : {
				enable : true,
				url : context + "/command/dispatcher/"
						+ "org.loushang.cform.biz.cmd.BizMeanDispatcherCmd/"
						+ "getBizMeanJson",
				dataFilter : dataFilter,
				autoParam : [ "code" ]
				
			},
			callback : {
				beforeDrag : beforeDrag,
				beforeDrop : beforeDrop,
				onExpand : resetHeight
			}
		};
		
		/**
		 * 业务含义树数据过滤
		 * 
		 * @param treeId
		 * @param parentNode
		 * @param childNodes
		 * @returns
		 */
		function dataFilter(treeId, parentNode, childNodes) {
			if(parentNode.code == '_rootCode'){
				$.each(childNodes, function(idx, node){
					node.type = Constants.BizMeanTree.BizMeanTypeNode;
				});
			}else{
				$.each(childNodes, function(idx, node){
					node.type = Constants.BizMeanTree.BizMeanNode;
				});
			}
			return childNodes;
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
				if (treeNodes[i].type == Constants.BizMeanTree.BizMeanTypeNode) {
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
			if (targetNode.type != Constants.FormTree.FieldNode) {
				return false;
			}
			
			// 一个域只能关联一个业务含义
			var subNodes = targetNode.children;
			if (subNodes && subNodes.length) {
				cfalert(L.getLocaleMessage("cf.bdr.onefieldbizmeanmapping", "一个域只能关联一个业务含义！"));
				return false;
			}
			
			if (treeNodes.length > 0) {
				var node = treeNodes[0];
				if(fieldBizMean.add(targetNode.fieldId.substr(2), node) === false){
					return false;
				}
				node.fieldId = node.code;
				node.fieldName = node.name;
				node.type = Constants.FormTree.BizMeanNode;
			}

			return true;
		}

		return {
			init : function(){
				var zTree = $.fn.zTree.init($("#bizMeanTree"), treeSetting, bizMeanTree);
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
	
	// 初始化表单树
	formTree.init();
	
	// 初始化业务含义树
	bizMeanTree.init();
});