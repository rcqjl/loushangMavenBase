/*
 * 表单--textarea,多行文本
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div cf_widgetId='{widgetId}' class='phone_widget phone_widget_textarea'>" +
				"<label class='field_name'>{fieldName}</label>" +
				"<textarea type='text' " +
					"cf_elementType='field' " +
					"cf_fieldLength='100'" +
					"id='{fieldId}'" +
					"name='{fieldName}'" +
					"cf_isCreateId='{isCreateId}'" +
					"cf_widgetId='{widgetId}'>" +
				"</textarea>" +
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

		// 放地址组件
		drop : function(e, target) {
			var $target = $(CForm.getForm()).find(".cfContainer");

			var fieldId = CForm.generateId();
			var widgetId = this.id;
			var isCreateId = "1";
			var textTpl = new $.XTemplate(this.tpl);
			// 原属性值
			var oldProperty = {
				isCreateId : 1
			};
			showWindow(L.getLocaleMessage("cf.widget.textarea", "多行文本框"), "mwidget/base/textarea/textareaattr.jsp", 400, 400,
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
				CForm.log("添加新的【多行文本框】到：" + $target.attr("class"));
				$(text).appendTo($target);
			}
		},
		
		// 双击多行文本
		dblClick : function(e, target) {
			//文本域
			var $tgtextarea = $(target).parents(".phone_widget").find("textarea[type=text]");
			//文本域前标题
			var $tgName = $(target).parents(".phone_widget").find(".field_name");
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 域ID
				fieldId : $tgtextarea.attr("id"),
				// 域名称
				fieldName : $tgtextarea.attr("name"),
				// 是否自动生成ID
				isCreateId : $tgtextarea.attr("cf_isCreateId")
			};
			
			showWindow(L.getLocaleMessage("cf.widget.textarea", "多行文本框"), "mwidget/base/textarea/textareaattr.jsp", 400, 400,
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
				$tgName.text(result.fieldName); 
				$tgtextarea.attr(newProperty);
			}			
		}		
	};

	CFMTextarea = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMTextarea);
})(jQuery);