/*
 * 表单--占位符
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div " +
				"cf_widgetId='{widgetId}' " +
				"class='phone_widget phone_widget_space' " +
				"style='min-height:{spaceHeight}px;'>" +
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
			
			var text = textTpl.applyTemplate({
				"spaceHeight" : "25",
				"widgetId" : widgetId
			});
			
			$(text).appendTo($target);
			CForm.log("添加新的【占位符】到屏幕上");
		},
		
		// 双击占位符
		dblClick : function(e, target) {
			// 原属性值
			var oldProperty = {
				spaceHeight : parseInt($(target).height())
			};
			
			showWindow(L.getLocaleMessage("cf.widget.spaceattr", "占位符"), "mwidget/base/space/spaceattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}

				$(target).css("min-height", result.spaceHeight);
			}			
		}		
	};

	CFMSpace = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMSpace);
})(jQuery);