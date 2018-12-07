/*
 * 表单--hidden,隐藏域
 */
(function($) {
	var overrides = {
		tpl : '<input id="{fieldId}" name="{fieldName}" type="hidden" value="" class="cfHidden" '
				// 域长度
				+ ' cf_fieldLength="100"'
				// 元素类型
				+ ' cf_elementType="field"'
				// 自动生成ID
				+ ' cf_isCreateId="{isCreateId}"'
				// 组件ID
				+ ' cf_widgetId="{widgetId}">',
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

		// 放下隐藏域
		drop : function(e, target) {
			// 只能放在td里
			if (target.tagName != "TD") {
				$td = $(target).parent("td");
				if ($td.length <= 0) {
					cfalert(L.getLocaleMessage("cf.bdr.hiddentimeincell", "隐藏域只能放到单元格内！"));
					return;
				}
				target = $td[0];
			}

			var hiddenTpl = new $.XTemplate(this.tpl);
			var fieldId = CForm.generateId();
			var fieldName = L.getLocaleMessage("cf.widget.hiddenw", "隐藏域");
			var widgetId = this.id;

			target.nextStep = function(attrObj) {
				if (!attrObj) {
					return;
				}
				fieldId = attrObj.fieldId;
				fieldName = attrObj.fieldName;

				var $hidden = hiddenTpl.append(target, {
					"fieldId" : fieldId,
					"fieldName" : fieldName,
					"widgetId" : widgetId,
					"isCreateId" : attrObj.isCreateId
				}, true);
			};
			CForm.getFieldAttr(target, false);
		},

		// 双击隐藏域
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

			showWindow(L.getLocaleMessage("cf.widget.hiddenw", "隐藏域"), "pwidget/hidden/hiddenattr.jsp", 400, 400,
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

	CFPHidden = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFPHidden);
})(jQuery);