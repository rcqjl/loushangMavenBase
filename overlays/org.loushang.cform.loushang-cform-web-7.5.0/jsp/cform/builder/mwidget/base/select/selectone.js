/*
 * 表单--select-one,下拉框
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div cf_widgetId='{widgetId}' class='phone_widget phone_widget_selectone'>" +
				"<label class = 'field_name'>{fieldName}</label>"+
				"<select id='{fieldId}' name='{fieldName}' value=''" +
				"cf_elementType='field' " +
				"cf_fieldLength='100' " +
				"cf_isCreateId='{isCreateId}'" +
				"cf_widgetId='{widgetId}'" +
				"</select>" +
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

		// 放下下拉框
		drop : function(e, target) {
			var self = this;
			var $target = $(CForm.getForm()).find(".cfContainer");

			var widgetId = this.id;
			
			var selectOneTpl = new $.XTemplate(this.tpl);
			// 原属性值
			var oldProperty = {
				// 是否自动生成ID
				isCreateId : 1,
				// 选项
				staticValue : ""
			};
			showWindow(L.getLocaleMessage("cf.widget.selectone", "下拉框"), "mwidget/base/select/selectattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				if (!result) {
					return;
				}
				var fieldId = result.fieldId;
				var fieldName = result.fieldName;
				var isCreateId = result.isCreateId;
				
				var selectOne = selectOneTpl.applyTemplate({
					"fieldId" : fieldId,
					"fieldName" : fieldName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				});
				$(selectOne).appendTo($target);
				
				// 静态绑定
				var staticVal = result.staticValue
				if (!$.trim(staticVal)) {
					return;
				}

				var svArray = staticVal.split(";");
				$.each(svArray, function(i, sv) {
					var valArray = sv.split(":");
					var option = [ '<option value="', valArray[0], '"',
							valArray.length == 3 ? " selected>" : ">", valArray[1],
							'</option>' ].join("");

					$target.find("select").append(option);
				});
			}
		},
		
		// 双击下拉框
		dblClick : function(e, target) {
			var $target = $(target).parents(".phone_widget_selectone").find("select");
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 域ID
				fieldId : $target.attr("id"),
				// 域名称
				fieldName : $target.attr("name"),
				// 是否自动生成ID
				isCreateId : $target.attr("cf_isCreateId"),
				/**
				 * 数据绑定
				 */
				// 静态值
				staticValue : function() {
					var staticVal = [];
					var $options = $target.find("option");
					$.each($options, function(i, option) {
						staticVal.push([ $(option).val(), ":",
								$(option).text(),
								$(option).is(':selected') ? ":selected" : "" ]
								.join(""));
					});

					return staticVal.join(";");
				}()
			};
			
			showWindow(L.getLocaleMessage("cf.widget.selectone", "下拉框"), "mwidget/base/select/selectattr.jsp", 400, 440,
					oldProperty, handleReturn);
			
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}
				// 首先删除原来的option
				$target.find("option").remove();

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

				$target.attr(newProperty);
				$target.parent().find(".field_name").text(result.fieldName);
				
				// 静态绑定
				var staticVal = result.staticValue
				if (!$.trim(staticVal)) {
					return;
				}

				var svArray = staticVal.split(";");
				$.each(svArray, function(i, sv) {
					var valArray = sv.split(":");
					var option = [ '<option value="', valArray[0], '"',
							valArray.length == 3 ? " selected>" : ">", valArray[1],
							'</option>' ].join("");

					$target.append(option);
				});
			}
		}		
	};

	CFMSelect = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMSelect);
})(jQuery);