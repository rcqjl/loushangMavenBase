/**
 * 表单属性批量浏览
 */
// 常量
var Constants = {
	// 表单树
	FormTree : {
		FormNode : 0,
		ZoneNode : 1,
		FieldNode : 2
	}
};

// 表单
var $form = $(window.parent.document.getElementById('fieldAttrFrame').inParam);

$(function(){
	// 初始化表单树
	initFormTree();

	/**
	 * 域长度
	 */
	$('#fieldLength').on('blur', function(){
		var value = $(this).val();
		if(value){
			//校验
			if(!CFHelp.validate()){
				return;
			}
		}
		if(value > 4000){
			cfalert(L.getLocaleMessage("cf.bdr.fieldlengthmsg", "域长度设置不能超过4000！"));
			return;
		}
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.fieldLength = value;
			}
		}		
	});
	
	/**
	 * 数据类型校验
	 */
	$('#dataType').on('change', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			var value = $(this).val();
			if(value == 'default'){
				node.validateData.dataType = null;
				$('#precision,#regExp').val('');
				$('#precisionLi,#regExpLi').hide();
			}else{
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.dataType = value;
				// 如果是小数，显示精确度设置框
				if(value == 'cfIsFloat') {
					$('#precisionLi').show();
				}else {
					$('#precision').val('');
					$('#precisionLi').hide();
				}
				// 如果是正则表达式，显示表达式设置框
				if(value == 'cfIsRegExp') {
					$('#regExpLi').show();
				}else {
					$('#regExp').val('');
					$('#regExpLi').hide();
				}
			}
		}
	});
	
	/**
	 * 精确度
	 */
	$('#precision').on('blur', function(){
		var value = $(this).val();
		if(value){
			//校验
			if(!CFHelp.validate()){
				return;
			}
		}else {
			return;
		}
		
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.precision = value;
			}
		}
	});
	
	/**
	 * 正则表达式
	 */
	$('#regExp').on('blur', function(){
		var value = $(this).val();
		if(value){
			//校验
			if(!CFHelp.validate()){
				return;
			}
		}else {
			return;
		}
		
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.regExp = value;
			}
		}
	});
	
	/**
	 * 只读
	 */
	$('#isReadOnly').on('change', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.isReadOnly = $(this).is(':checked');
			}
		}
	});
	
	/**
	 * 必填
	 */
	$('#isRequired').on('change', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				node.validateData.isRequired = $(this).is(':checked');
			}
		}
	});
	
	/**
	 * 域关联
	 */
	$("#isDynCheck").on("change",function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			if(node.type == Constants.FormTree.FieldNode){
				if(!node.validateData){
					node.validateData = {};
				}
				var isDynCheck = $(this).prop("checked");
				node.validateData.isDynCheck = isDynCheck;
				if(isDynCheck){
					$("#dynCheckUl").show();
				}else{
					$("#dynCheckUl").hide();
					$("#dynCheckCondition").val('');
					$("#dynCheckValue").val('');
					$("#dynCheckAction").val('');
					$("#dynCheckTarget").val('');
				}
			}
		}
	});
	$('#dynCheckCondition').on('change', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			var value = $(this).val();
			if(node.validateData.isDynCheck){
				if(!node.validateData.dynCheckParam){
					node.validateData.dynCheckParam = {};
				}
				node.validateData.dynCheckParam.condition = value;
				if(value!='contains' && value!= 'uncontains' && value!='matches'){
					$('#dynCheckValue').addClass("cfIsNumber");
				}else{
					$('#dynCheckValue').removeClass("cfIsNumber");
				}
				if(value=='matches'){
					$('#dynCheckValue').addClass("cfRegExp");
				}else{
					$('#dynCheckValue').removeClass("cfRegExp");
				}
			}
			$("#dynCheckValue").focus();
		}
	});
	$('#dynCheckValue').on('blur', function(){
		var $self = $(this);
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			var value = $(this).val();
			if(!CFHelp.validate()){
				$self.val("");
				return;
			}
			if(node.validateData.isDynCheck){
				if(!node.validateData.dynCheckParam){
					node.validateData.dynCheckParam = {};
				}
				node.validateData.dynCheckParam.value = value
			}
		}
	});
	$('#dynCheckAction').on('change', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			var value = $(this).val();
			if(node.validateData.isDynCheck){
				if(!node.validateData.dynCheckParam){
					node.validateData.dynCheckParam = {};
				}
				node.validateData.dynCheckParam.action = value
			}
			$("#dynCheckTarget").focus();
		}
	});
	$('#dynCheckTarget').on('blur', function(){
		var tree = $.fn.zTree.getZTreeObj('formTree');
		var nodes = tree.getSelectedNodes();
		if(nodes.length){
			var node = nodes[0];
			var value = $(this).val();
			if(node.validateData.isDynCheck){
				if(!node.validateData.dynCheckParam){
					node.validateData.dynCheckParam = {};
				}
				node.validateData.dynCheckParam.target = value
			}
		}
	});
	
	/**
	 * 确定按钮处理
	 */
	$('#confirmBtn').click(function(){
		confirmBtn();
	});
	
});

/**
 * 初始化表单树
 */
function initFormTree() {
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
		if ($zoneParent.length) {
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
	var fieldArray = $form.find('[cf_elementType=field][type!=button][class!=cfAddTable][class!=cfDelTable]');
	$.each(fieldArray, function() {
		var $self = $(this);
		var fieldId = $self.attr("id");
		var fieldName = $self.attr("name");
		var pId = $form.attr("id");
		
		// 检测是否已经存在该域
		var isExist = $.grep(formTree, function(elem, idx){
			return elem.fieldId == fieldId && elem.fieldName == fieldName;
		});
		// 如果存在则跳过
		if(isExist.length){
			return;
		}
		if($self.parent()[0].tagName == "TD"){
			$("#dynCheckTarget").append($('<option value="'+fieldId+'">'+fieldName+'</option>'))
		}
		
		// 区域
		var $fieldZoneParent = $self.parents('[cf_elementType=zone]');
		if ($fieldZoneParent.length) {
			pId = $($fieldZoneParent[0]).attr("id");
		}

		var fieldJson = {
			fieldId : fieldId,
			fieldName : fieldName,
			type : Constants.FormTree.FieldNode,
			pId : pId,
			validateData : {}
		};
		
		// 只读
		fieldJson.validateData.isReadOnly = $self.attr('readonly') ? true : false;
		// 必填
		fieldJson.validateData.isRequired = $self.hasClass('cfIsRequired');
		// 域长度
		fieldJson.validateData.fieldLength = $self.attr('cf_fieldLength');
		//域联动
		fieldJson.validateData.isDynCheck = $self.hasClass('cfDynCheck');
		fieldJson.validateData.dynCheckParam = $self[0].hasAttribute('cf_dyncheckparam') ? function(){
			var p = JSON.parse($self.attr('cf_dyncheckparam'));
			var obj = {};
			obj.condition = p.c;
			obj.value = p.v;
			obj.action = p.a;
			obj.target = p.t;
			return obj 
		}() : {}
		
		
		if(isNeedDataTypeValidate($self)){
			var styleClass = $self.attr('class');
			// 对styleClass进行为空判断
			if(styleClass){
				var classArr = styleClass.split(/\s+/);
				$.each(classArr, function(i, clz){
					if(clz.match(/cfIs.*/) && 
							clz != 'cfIsRequired' && 
							clz != 'cfIsReadonly'){
						fieldJson.validateData.dataType = clz;
						return false;
					}
				});
			}
			var precision = $self.attr('cf_fieldPrecision');
			if (precision) {
				fieldJson.validateData.precision = precision;
			}
			var regExp = $self.attr('cf_regExp');
			if (regExp) {
				fieldJson.validateData.regExp = regExp;
			}
		}

		formTree.push(fieldJson);
		
	});

	var treeSetting = {
		view : {
			//addHoverDom : addHoverDomHandler,
			//removeHoverDom : removeHoverDom,
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
			onClick : clickHandler
		}
	};

	$.fn.zTree.init($("#formTree"), treeSetting, formTree);
};

/**
 * 单击节点处理
 */
function clickHandler(event, treeId, treeNode){
	if (treeNode.type == Constants.FormTree.FieldNode) {
		$('#dynCheckDiv').show();
		$('#fieldDiv').show();
		if (!treeNode.validateData) {
			return false;
		}
		
		resetValidateField();
		var $field = $($form).find('[id=' + treeNode.fieldId + ']');
		
		if($field.length && isNeedDataTypeValidate($field)){
			$('#dataTypeLi').show();
			$('#dataType').val(treeNode.validateData.dataType);
			// 如果是小数，显示精确度设置框
			if(treeNode.validateData.dataType == 'cfIsFloat'){
				var precision = treeNode.validateData.precision;
				if (precision) {
					$('#precision').val(precision);
				}
				$('#precisionLi').show();
			}
			// 如果是正则表达式，显示表达式设置框
			if(treeNode.validateData.dataType == 'cfIsRegExp'){
				var regExp = treeNode.validateData.regExp;
				if (regExp) {
					$('#regExp').val(regExp);
				}
				$('#regExpLi').show();
			}
		}
		
		if($field.length && isNeedReadOnly($field)){
			$('#isReadOnlyLi').show();
			var isReadOnly = treeNode.validateData.isReadOnly;
			if (isReadOnly) {
				$('#isReadOnly').attr('checked', true);
			}
		}
		
		var isRequired = treeNode.validateData.isRequired;
		if (isRequired) {
			$('#isRequired').attr('checked', true);
		}
		
		var fieldLength = treeNode.validateData.fieldLength;
		if (fieldLength) {
			$('#fieldLength').val(fieldLength);
		}
		
		var isDynCheck = treeNode.validateData.isDynCheck;
		if(isDynCheck){
			$('#isDynCheck').attr('checked', true);
			$('#dynCheckUl').show();
			var dynCheckParam = treeNode.validateData.dynCheckParam
			$("#dynCheckCondition").val(dynCheckParam.condition);
			$("#dynCheckValue").val(dynCheckParam.value);
			$("#dynCheckAction").val(dynCheckParam.action);
			$("#dynCheckTarget").val(dynCheckParam.target);
		}
	}
	// 点击非叶子节点时，右侧区域置空
	else {
		$('#fieldDiv').hide();
		$('#dynCheckDiv').hide();
	}
};

// 鼠标悬停在节点上时，显示“设置按钮”
function addHoverDomHandler(treeId, treeNode) {
	if (treeNode.type == Constants.FormTree.FieldNode) {
		// 为防止jQuery选择器误把"tblName:colName"中的":"作为选择器一部分，
		// 所以将":"替换为"_"，保存为新的属性
		treeNode.attrBtn = $.trim(treeNode.fieldId.replace(":", "_"));
	}
	if (treeNode.type != Constants.FormTree.FieldNode
			|| treeNode.editNameFlag
			|| $("#attrBtn_" + treeNode.attrBtn).length > 0) {
		return;
	}
	
	// “设置”按钮
	var attrStr = "<span class='button attr' id='attrBtn_" + treeNode.attrBtn
				+ "' title='设置' onfocus='this.blur();'></span>";

	if (treeNode.type == Constants.FormTree.FieldNode) {
		$("#" + treeNode.tId + "_a").append(attrStr);
	
		var btn = $("#attrBtn_" + treeNode.attrBtn);
		if (btn) {
			btn.bind("click", function(e) {
				var fieldId = treeNode.fieldId;
				var field = $form.find("#"+fieldId)[0];
				var widgetId = $(field).attr("cf_widgetid");
				parent.CForm.getBuilder().fireEvent(widgetId + "_dblClick", [ field ]);
			});
		}
	}
};

// 鼠标离开节点时，移除“设置按钮”
function removeHoverDom(treeId, treeNode) {
	$("#attrBtn_" + treeNode.attrBtn).unbind().remove();
};

/**
 * 重置输入域
 */
function resetValidateField(){
	// 只读
	$('#isReadOnly').attr('checked', false);
	$('#isReadOnlyLi').hide();
	// 必填
	$('#isRequired').attr('checked', false);
	// 域长度
	$('#fieldLength').val('');
	// 数据类型校验
	$('#dataType').val('default');
	$('#dataTypeLi').hide();
	// 精确度
	$('#precision').val('');
	$('#precisionLi').hide();
	// 正则表达式
	$('#regExp').val('');
	$('#regExpLi').hide();
	// 域关联
	$("#isDynCheck").prop("checked",false);
	$("#dynCheckCondition").val('');
	$("#dynCheckValue").val('');
	$("#dynCheckAction").val('');
	$("#dynCheckTarget").val('');
	$("#dynCheckUl").hide();
	
};

/**
 * 是否需要进行数据类型校验
 */
function isNeedDataTypeValidate($field){
	return ($field.get(0).type == 'text' 
				|| $field.get(0).type == 'textarea');
};

/**
 * 是否需要设置只读
 */
function isNeedReadOnly($field) {
	var type = $field.get(0).type;
	return (type != 'radio' && type != 'checkbox' 
			&& type != 'select-one' && type != 'select-multiple');
}

/**
 * 删除数据类型校验
 */
function removeValidateDataType($field){
	$field.removeClass('cfIsInteger cfIsFloat cfIsZipCode cfIsEmail cfIsRegExp cfIsPhoneNum cfIsMobileNum cfIsIdCard');
};

// 点击“确定”按钮
function confirmBtn() {
	var tree = $.fn.zTree.getZTreeObj('formTree');
	var nodes = tree.getNodes();
	nodes = tree.transformToArray(nodes);
	$.each(nodes, function(i, node){
		if(node.type == Constants.FormTree.FieldNode){
			var validateData = node.validateData || null;
			if(!validateData){
				return;
			}
			
			var $field = $form.find('[id=' + node.fieldId + ']');
			$field.attr('cf_fieldLength', validateData.fieldLength);
			//设置模型项长度属性
			if(window.parent.getModelItemLengthByFieldLength){
				var modelItemLength = window.parent.getModelItemLengthByFieldLength(
						$field.attr("cf_fieldLength"));
				if($.isNumeric(modelItemLength))
					$field.attr("cf_modelItemLength", modelItemLength);
			}
			validateData.isReadOnly ? $field.attr('readonly','readonly').addClass('cfIsReadonly')
					: $field.removeAttr('readonly').removeClass('cfIsReadonly');
			
			handleIsRequired(validateData, $field);
			
			if(isNeedDataTypeValidate($field)){
				// 首先移除原来的数据类型校验类
				removeValidateDataType($field);
				// 添加新类型
				$field.addClass(validateData.dataType);
				// 如果是小数，则添加精确度
				if(validateData.dataType == 'cfIsFloat' && 
						validateData.precision) {
					// 解决ie9兼容性视图下报“没有权限”错误问题
					$field[0].setAttribute('cf_fieldPrecision', validateData.precision);
				}else {
					$field[0].removeAttribute('cf_fieldPrecision');						
				}
				// 正则表达式
				if(validateData.dataType == 'cfIsRegExp' && 
						validateData.regExp) {
					$field[0].setAttribute('cf_regExp', validateData.regExp);
				}else {
					$field[0].removeAttribute('cf_regExp');						
				}
			}
			if(validateData.isDynCheck){
				var dyncheckparam = validateData.dynCheckParam;
				var c= dyncheckparam.condition;
				var v= dyncheckparam.value;
				var a= dyncheckparam.action;
				var t= dyncheckparam.target;
				if((c!=null && c!="") && (v!=null && v!="") && (a!=null && a!="") && (t!=null && t!="")){
					$field.addClass("cfDynCheck");
					var p = JSON.stringify({"c":c,"v":v,"a":a,"t":t})
					$field.attr("cf_dyncheckparam",p);
				}
			}else{
				$field.removeClass("cfDynCheck");
				$field.removeAttr("cf_dyncheckparam");
			}
		}
	});
	// 关闭弹出框
	$("#btn_attrPreview",window.parent.document).trigger("click");
}

/**
 * 处理必填项设置
 */
function handleIsRequired (validateData, $field) {
	// 设备类型
	var device = $form.attr('cf_deviceType');
	
	validateData.isRequired ? function () {
			// 添加必填符号*
			if (device == 'MOBILE') {
				$field.closest(".phone_widget").addClass("phone_widget_required");
			} else {
				// 动态行
				if($field.closest(".cfDynRow").length > 0) {
					var $dynRow = $field.closest(".cfDynRow");
					
					var index = $field.closest("td").index();
					var $th = $dynRow.find("thead th").eq(index);
					// 只在动态行的表头上添加必填符号
					if ($th.find("font.isRequiredSign").length < 1) {
						$th.append('<font class="isRequiredSign">*</font>');
					}
					
					// 如果是可编辑列表，在编辑区加上必填符号
					if($dynRow.hasClass("cfEditGrid")) {
						var editFieldId = $field.attr("cf_editfieldid");
						var $editField = $form.find("#" + editFieldId);
						// 文本域
						var $td = $editField.closest("td").prev("td");
						
						// 如果当前输入域前面有td，并且该td中没有星号*
						if($td.length > 0 && $td.find("font.isRequiredSign").length < 1) {
							$td.append('<font class="isRequiredSign">*</font>');
						}
					}
				}else{
					// 文本域
					var $td = $field.closest("td").prev("td");
					if($td.length > 0 && $td.find("font.isRequiredSign").length < 1) {
						$td.append('<font class="isRequiredSign">*</font>');
					}
				}
			}
			// 添加必填样式
			$field.addClass('cfIsRequired');
		}() : function () {
			// 删除必填符号*
			if (device == 'MOBILE') {
				$field.closest(".phone_widget").removeClass("phone_widget_required");
			} else {
				// 动态行
				if($field.closest(".cfDynRow").length > 0) {
					var $dynRow = $field.closest(".cfDynRow");
					var index = $field.closest("td").index();
					var $th = $dynRow.find("thead th").eq(index);
					$th.find("font.isRequiredSign").remove();
					
					// 如果是可编辑列表，将编辑区的星号删除
					if($dynRow.hasClass("cfEditGrid")) {
						var editFieldId = $field.attr("cf_editfieldid");
						var $editField = $form.find("#" + editFieldId);
						// 文本域
						var $td = $editField.closest("td").prev("td");
						
						if($td.length > 0) {
							$td.find("font.isRequiredSign").remove();
						}
					}
				}else{
					// 文本域
					var $td = $field.closest("td").prev("td");
					if($td.length > 0) {
						$td.find("font.isRequiredSign").remove();
					}
					
				}
			}
			// 移除样式
			$field.removeClass('cfIsRequired');
		}();
}