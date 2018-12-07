/*
 * 表单--textarea,多行文本
 */
(function($) {
	var overrides = {
		tpl : '<textarea id="{fieldId}" name="{fieldName}" value="" class="cfTextArea"'
				// 域长度
				+ ' cf_fieldLength="500"'
				// 元素类型
				+ ' cf_elementType="field"'
				// 自动生成ID
				+ ' cf_isCreateId="{isCreateId}"'
				// 组件ID
				+ ' cf_widgetId="{widgetId}">' + '</textarea>',
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

		// 放下多行文本
		drop : function(e, target) {
			// 只能放在td里
			if (target.tagName != "TD") {
				$td = $(target).parent("td");
				if ($td.length <= 0) {
					//showDialog("alert", "多行文本只能放到单元格内！", "提示信息", 300);
					cfalert(L.getLocaleMessage("cf.widget.textareaincell", "多行文本只能放到单元格内！"));
					return;
				}
				target = $td[0];
			}

			var textareaTpl = new $.XTemplate(this.tpl);
			var fieldId = CForm.generateId();
			var fieldName = "多行文本";
			var widgetId = this.id;


			target.nextStep = function(attrObj) {
				if (!attrObj) {
					return;
				}
				fieldId = attrObj.fieldId;
				fieldName = attrObj.fieldName;

				var $textarea = textareaTpl.append(target, {
					"fieldId" : fieldId,
					"fieldName" : fieldName,
					"widgetId" : widgetId,
					"isCreateId" : attrObj.isCreateId
				}, true);
			};
			CForm.getFieldAttr(target);
		},

		// 双击多行文本
		dblClick : function(e, target) {
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 域ID
				fieldId : $(target).attr("id"),
				// 域名称
				fieldName : $(target).attr("name"),
				// 是否自动生成ID
				isCreateId : $(target).attr("cf_isCreateId")
			};

			showWindow("多行文本", "pwidget/textarea/textareaattr.jsp", 400, 400,
					oldProperty, handleReturn);

			/**
			 * 处理返回值
			 */
			function handleReturn(result) {
				if (!result) {
					return;
				}

				// 新属性值
				var newProperty = {
					/**
					 * 基本属性
					 */
					// 域ID
					id : result.fieldId,
					// 域ID
					name : result.fieldName,
					// 是否自动生成ID
					cf_isCreateId : result.isCreateId
				};
				$(target).attr(newProperty);
			}
		}
	};

	CFPTextArea = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFPTextArea);
})(jQuery);