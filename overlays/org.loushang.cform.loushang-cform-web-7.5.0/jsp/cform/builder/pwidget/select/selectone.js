/*
 * 表单--select-one,下拉框
 */
(function($) {
	var overrides = {
		tpl : '<select id="{fieldId}" name="{fieldName}" type="select-one"  class="cfSelectOne"'
				// 域长度
				+ ' cf_fieldLength="100"'
				// 元素类型
				+ ' cf_elementType="field"'
				// 自动生成ID
				+ ' cf_isCreateId="{isCreateId}"'
				// 组件ID
				+ ' cf_widgetId="{widgetId}">' + '</select>',
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

		// 放下下拉框
		drop : function(e, target) {
			// 只能放在td里
			if (target.tagName != "TD") {
				$td = $(target).parent("td");
				if ($td.length <= 0) {
					cfalert(L.getLocaleMessage("cf.widget.selectoneincell", "下拉框只能放到单元格内！"));
					return;
				}
				target = $td[0];
			}

			var selectOneTpl = new $.XTemplate(this.tpl);
			var fieldId  = CForm.generateId();
			var fieldName  = L.getLocaleMessage("cf.widget.selectonew", "下拉框");
			var widgetId = this.id;
			
			target.nextStep = function(attrObj){
				if(!attrObj){
					return;
				}
				fieldId  = attrObj.fieldId;
				fieldName  = attrObj.fieldName;
				
				var $selectOne=selectOneTpl.append(target, {
					"fieldId" : fieldId,
					"fieldName" : fieldName,
					"widgetId" : widgetId,
					"isCreateId" : attrObj.isCreateId
				}, true);
			};
			CForm.getFieldAttr(target);
		},

		// 双击下拉框
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
				isCreateId : $(target).attr("cf_isCreateId"),
				/**
				 * 数据绑定
				 */
				// 静态值
				staticValue : function() {
					var staticVal = [];
					var $options = $(target).find("option");
					$.each($options, function(i, option) {
						staticVal.push([ $(option).val(), ":",
								$(option).text(),
								$(option).is(':selected') ? ":selected" : "" ]
								.join(""));
					});

					return staticVal.join(";");
				}()
			};

			showWindow(L.getLocaleMessage("cf.widget.selectone", "下拉框"), "pwidget/select/selectattr.jsp", 400, 440,
					oldProperty, handleReturn);
			
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}
				// 首先删除原来的option
				$(target).find("option").remove();

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

					$(target).append(option);
				});
			}
		}
	};

	CFPSelectOne = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFPSelectOne);
})(jQuery);