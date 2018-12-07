/*
 * 表单--日期时间框
 */
(function($) {
	var dateFormatMap = {
		'yy-mm-dd HH:ii:ss' : 'yyyy-MM-dd HH:mm:ss',
		'yy/mm/dd HH:ii:ss' : 'yyyy/MM/dd HH:mm:ss',
		'yymmdd HH:ii:ss' : 'yyyyMMdd HH:mm:ss'
	};

	var overrides = {
		dateTimeTpl : '<div cf_widgetId="{widgetId}" class="phone_widget phone_widget_datetime">'
			+ '<label class="field_name">{fieldName}</label>'
			+ '<input id="{fieldId}" name="{fieldName}" type="text" value=""'
			// 日期时间格式
			+ ' format="{format}"'
			// 只读
			+ ' readonly="readonly"'
			// 域长度
			+ ' cf_fieldLength="100"'
			// 元素类型
			+ ' cf_elementType="field"'
			// 自动生成ID
			+ ' cf_isCreateId="{isCreateId}"'
			// 组件ID
			+ ' cf_widgetId="{widgetId}">'
			+ '</div>',

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

		// 放下日期时间框
		drop : function(e, target) {
			var $target = $(CForm.getForm()).find(".cfContainer");
			
			var widgetId = this.id;
			
			var dateTimeTpl = new $.XTemplate(this.dateTimeTpl);
			
			var format = "yy-mm-dd HH:ii:ss";

			var oldProperty = {
					isCreateId : 1 ,
					format : format
			}
			showWindow(L.getLocaleMessage("cf.widget.datetimeattr", "日期时间框"), "mwidget/base/datetime/datetimeattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			function handleReturn(result){
				if (!result) {
					return;
				}
				
				var dateTime = dateTimeTpl.applyTemplate({
					"fieldId" : result.fieldId,
					"fieldName" : result.fieldName,
					"isCreateId" : result.isCreateId,
					"format" : result.format,
					"widgetId" : widgetId
				});
				
				$(dateTime).appendTo($target);
			}
			
		},

		// 双击日期时间框
		dblClick : function(e, target) {
			//文本域
			var $tgInput = $(target).parents(".phone_widget").find(":text");
			//文本域前标题
			var $tgName = $(target).parents(".phone_widget").find(".field_name");
			var globj = this;
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 域ID
				fieldId : $tgInput.attr("id"),
				// 域名称
				fieldName : $tgInput.attr("name"),
				// 是否自动生成ID
				isCreateId : $tgInput.attr("cf_isCreateId"),
				// 显示当前日期
				dataBindType : $tgInput.attr("cf_dataBindType"),
				/**
				 * 日期格式
				 */
				// 格式
				format : $tgInput.attr("format")
			};

			showWindow(L.getLocaleMessage("cf.widget.datetimeattr", "日期时间框"), "mwidget/base/datetime/datetimeattr.jsp", 400, 400,
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
					// 域名称
					name : result.fieldName,
					// 是否自动生成ID
					cf_isCreateId : result.isCreateId,
					// 显示当前日期时间
					cf_dataBindType : result.dataBindType ? result.dataBindType
							: function() {
								$(this).removeAttr("cf_databindtype");
							},
					cf_dataBindParam : result.dataBindType ? globj
							.toJavaDateFormat(result.format) : function() {
						$(this).removeAttr("cf_databindparam");
					},
					/**
					 * 日期格式
					 */
					// 格式
					format : result.format
				};
				$tgName.text(result.fieldName);
				$tgInput.attr(newProperty);
			}
		},
		/**
		 * 将L5 日期时间控件的格式转化为Java对应格式
		 */
		toJavaDateFormat : function(f) {
			if (dateFormatMap[f]) {
				return dateFormatMap[f];
			}

			f = f.replace(/yy/, 'yyyy')
				 .replace(/mm/, 'MM')
				 .replace(/ii/, 'mm');

			return f;
		}
	};

	CFMDatetime = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMDatetime);
})(jQuery);