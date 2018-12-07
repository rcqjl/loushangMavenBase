/*
 * 手机表单--text,单行文本
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div cf_widgetId='{widgetId}' class='phone_widget phone_widget_text'>" +
				"<label class='field_name'>{fieldName}</label>" +
				"<input type='text' " +
					"cf_elementType='field' " +
					"cf_fieldLength='100'" +
					"id='{fieldId}'" +
					"name='{fieldName}'" +
					"cf_isCreateId='{isCreateId}'" +
					"cf_widgetId='{widgetId}'>" +
			  "</div>",
		// 初始化组件
		init : function(builder) {
			this.builder = builder;
			this.initEvent();
		},

		// 初始化事件
		initEvent : function() {
			// 注册放下事件
			this.builder.on(this.id+"_drop", $.proxy(this.drop, this));
			// 注册双击事件
			this.builder.on(this.id+"_dblClick", $.proxy(this.dblClick, this));
		},

		// 放下单行文本
		drop : function(e, target) {
			var $target = $(CForm.getForm()).find(".cfContainer");

			var widgetId = this.id;
			var textTpl = new $.XTemplate(this.tpl);
			// 原属性值
			var oldProperty = {
				isCreateId : 1
			};
			showWindow(L.getLocaleMessage("cf.widget.text", "单行文本"), "mwidget/base/text/textattr.jsp", 400, 400,
					oldProperty, handleReturn);
			function handleReturn(result){
				if (!result) {
					return;
				}
				var text = textTpl.applyTemplate({
					"fieldId" : result.fieldId,
					"fieldName" : result.fieldName,
					"isCreateId" : result.isCreateId,
					"widgetId" : widgetId
				});
				CForm.log("添加新的【单行文本框】到：" + $target.attr("class"));
				$(text).appendTo($target);
			}
		},
		
		// 双击单行文本
		dblClick : function(e, target) {
			//文本域
			var $tgInput = $(target).parents(".phone_widget").find(":text");
			//文本域前标题
			var $tgName = $(target).parents(".phone_widget").find(".field_name");
			// 原属性值
			var oldProperty = {
				// 域名称
				fieldName : $tgInput.attr("name"),
				// 域ID
				fieldId : $tgInput.attr("id"),
				// 是否自动生成ID
				isCreateId : $tgInput.attr("cf_isCreateId")
			};
			
			showWindow(L.getLocaleMessage("cf.widget.text", "单行文本"), "mwidget/base/text/textattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}

				// 新属性值
				var newProperty = {
					// 域ID
					id : result.fieldId,
					// 域名称
					name : result.fieldName,
					// 是否自动生成ID
					cf_isCreateId : result.isCreateId
				};
				//更新属性
				$tgName.text(result.fieldName);
				$tgInput.attr(newProperty);
			}			
		}		
	};

	CFMText = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMText);
})(jQuery);