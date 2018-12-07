/*
 * 表单--text,单行文本
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div class='phone_widget'>" +
				"<input type='text' class='phone_widget_text'>" +
			  	"<div class='widget_opt_btn'>" +
				  	"<span class='move-btn'></span>" +
				  	"<span class='del-btn'></span>" +
			  	"</div>" +
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

			var fieldId = CForm.generateId();
			var fieldName = L.getLocaleMessage("cf.widget.text", "单行文本");
			var widgetId = this.id;
			var isCreateId = "1";
			var textTpl = new $.XTemplate(this.tpl);
			var text = textTpl.applyTemplate({
				"fieldId" : fieldId,
				"fieldName" : fieldName,
				"isCreateId" : isCreateId,
				"widgetId" : widgetId
			});

			$(text).appendTo($target);
		},
		
		// 双击单行文本
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
			
			showWindow(L.getLocaleMessage("cf.widget.text", "单行文本"), "mwidget/text/textattr.jsp", 400, 400,
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
				$(target).parent().prev()[0].innerText = result.fieldName;
				$(target).attr(newProperty);
			}			
		}		
	};

	CFMText = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMText);
})(jQuery);