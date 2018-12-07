/*
 * 表单--日期框
 */
(function($) {
	var dateFormatMap = {
		'yy-mm-dd' : 'yyyy-MM-dd',
		'yy/mm/dd' : 'yyyy/MM/dd',
		'yymmdd' : 'yyyyMMdd'
	};
	var overrides = {
		tpl : '<li>'
			+ '<label class="cfLabel">'+L.getLocaleMessage("cf.widget.datek", "日期框")+'</label>'
			+ '<div>'
			+ '<input id="{fieldId}" name="{fieldName}" type="text" value="" class="cfDate"'
			// 日期格式
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
			+ '</div>'
			+ '</li>',

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

		// 放下日期框
		drop : function(e, target) {
			var $target = $(target).hasClass("cfContainer")? $(target):target.tagName=="BODY"?$(target).find("form>.cfContainer"):$(target).parents("body").find("form>.cfContainer");
			var dateTpl = new $.XTemplate(this.tpl);
			var fieldId = CForm.generateId();
			var fieldName = L.getLocaleMessage("cf.widget.datek", "日期框");
			var widgetId = this.id;
			var isCreateId = "1";
			var format = "yy-mm-dd";

			var date = dateTpl.applyTemplate({
				"fieldId" : fieldId,
				"fieldName" : fieldName,
				"isCreateId" : isCreateId,
				"format" : format,
				"widgetId" : widgetId
			});

			$(date).appendTo($target);
		},

		// 双击日期框
		dblClick : function(e, target) {
			var globj = this;
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
				isCreateId : $(target).attr("cf_isCreateId"),
				// 显示当前日期
				dataBindType : $(target).attr("cf_dataBindType"),
				/**
				 * 日期格式
				 */
				// 格式
				format : $(target).attr("format")
			};

			showWindow(L.getLocaleMessage("cf.widget.dateattr", "日期框属性"), "mwidget/date/dateattr.jsp", 400, 400,
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
					// 显示当前日期
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
				$(target).parent().prev()[0].innerText = result.fieldName;
				$(target).attr(newProperty);
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
				 .replace(/mm/, 'MM');

			return f;
		}
	};

	CFDate = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFDate);
})(jQuery);