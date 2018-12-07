/*
 * 表单--checkbox,复选框
 */
(function($) {
	var overrides = {
		tpl : '<input id="{groupId}" name="{groupName}" type="checkbox" value="" class="cfCheckBox"'
				// 域长度
				+ ' cf_fieldLength="100"'
				// 元素类型
				+ ' cf_elementType="field"'
				// 是否自动生成ID
				+ ' cf_isCreateId="{isCreateId}"'
				// 组件ID
				+ ' cf_widgetId="{widgetId}">'
				// 显示值
				+ '选项',

		// 初始化组件
		init : function(builder) {
			this.builder = builder;
			this.initEvent();
		},

		// 初始化事件
		initEvent : function() {
			// 注册放下事件
			this.builder.on(this.id + "_drop", $.proxy(this.drop, this));
			// 注册双击事件
			this.builder
					.on(this.id + "_dblClick", $.proxy(this.dblClick, this));
		},

		// 放下复选框
		drop : function(e, target) {
			// 只能放在td里
			if (target.tagName != "TD") {
				$td = $(target).parent("td");
				if ($td.length <= 0) {
					cfalert(L.getLocaleMessage("cf.widget.checkboxincell", "复选框只能放到单元格内！"));
					return;
				}
				target = $td[0];
			}

			// 组ID
			var groupId = CForm.generateId();
			// 组名称
			var groupName = L.getLocaleMessage("cf.widget.groupname", "组名称");
			// 是否自动生成ID
			var isCreateId = "0";
			// 组件ID
			var widgetId = this.id;

			var checkboxTpl = new $.XTemplate(this.tpl);

			// 如果td里已经有checkbox了，则保持组属性一致
			var $groupCheckBoxes = $(target).find("input[type=checkbox]");
			if ($groupCheckBoxes.length > 0) {
				var $groupCheckBox = $groupCheckBoxes.first();
			
				isCreateId = $groupCheckBox.attr("cf_isCreateId");
				groupId = $groupCheckBox.attr("id");
				groupName = $groupCheckBox.attr("name");
				
				var $checkbox = checkboxTpl.append(target, {
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				}, true);
				
				// 业务含义
				var bizMean = $groupCheckBox.attr("cf_bizMean");

				// 业务含义
				if (bizMean) {
					$checkbox.attr("cf_bizMean", bizMean);
				}
			} else {
				target.nextStep = function(attrObj) {
					if (!attrObj) {
						return;
					}
					groupId = attrObj.fieldId;
					groupName = attrObj.fieldName;
					isCreateId = attrObj.isCreateId;
					var $checkbox = checkboxTpl.append(target, {
						"groupId" : groupId,
						"groupName" : groupName,
						"isCreateId" : isCreateId,
						"widgetId" : widgetId
					}, true);
				};
				CForm.getFieldAttr(target);
			}
		},

		// 双击复选框
		dblClick : function(e, target) {
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 显示值
				displayValue : target.nextSibling.nodeValue,
				// 保存值
				saveValue : $(target).val(),
				// 默认选中
				isSelected : $(target).attr('checked') ? true : false,
				/**
				 * 组属性
				 */
				// 组ID
				groupId : $(target).attr("id"),
				// 组名称
				groupName : $(target).attr("name"),
				// 是否自动生成ID
				isCreateId : $(target).attr("cf_isCreateId")
			};
			
			showWindow(L.getLocaleMessage("cf.widget.checkbox", "复选框"), "pwidget/checkbox/checkboxattr.jsp", 400, 400,
					oldProperty, handleReturn);
			/**
			 * 处理返回值
			 */
			function handleReturn(result) {
				if (!result) {
					return;
				}
				/**
				 * 基本属性
				 */
				// 显示值
				target.nextSibling.nodeValue = result.displayValue;
				// 保存值
				$(target).val(result.saveValue);
				// 默认选中
				$(target).attr('checked', result.isSelected);
				/**
				 * 组属性
				 */
				var newGroupProperty = {
					// 组ID
					id : result.groupId,
					// 组名称
					name : result.groupName,
					// 是否自动生成ID
					cf_isCreateId : result.isCreateId
				};
				// 保证同一单元格内组属性一致
				var $radios = $(target).parent("td").find(
						"input[type=checkbox]");
				$.each($radios, function() {
					$(this).attr(newGroupProperty);
				});
			}
		}
	};

	CFPCheckBox = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFPCheckBox);
})(jQuery);