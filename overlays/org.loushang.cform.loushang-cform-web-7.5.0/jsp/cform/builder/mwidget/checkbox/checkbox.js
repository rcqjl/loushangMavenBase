/*
 * 表单--checkbox,复选框
 */
(function($) {
	var overrides = {
		ftpl : '<li>'
			+ '<label class="cfLabel">'+L.getLocaleMessage("cf.widget.checkbox", "复选框")+'</label>'
			+ '<div class="checkboxContainer">'
			+ '<label>'
			+ '<input id="{groupId}" name="{groupName}" type="checkbox" value="" class="cfCheckBox"'
			// 域长度
			+ ' cf_fieldLength="100"'
			// 元素类型
			+ ' cf_elementType="field"'
			// 自动生成ID
			+ ' cf_isCreateId="{isCreateId}"'
			// 组件ID
			+ ' cf_widgetId="{widgetId}">'
			// 显示值
			+ '选项'
			+ '</label>'
			+ '</div>'
			+ '</li>',
			
		stpl : '<label>'
			+ '<input id="{groupId}" name="{groupName}" type="checkbox" value="" class="cfCheckBox"'
			// 域长度
			+ ' cf_fieldLength="100"'
			// 元素类型
			+ ' cf_elementType="field"'
			// 自动生成ID
			+ ' cf_isCreateId="{isCreateId}"'
			// 组件ID
			+ ' cf_widgetId="{widgetId}">'
			// 显示值
			+ '选项'
			+ '</label>',

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

		// 放下复选框
		drop : function(e, target) {
			var $target = $(target).hasClass("cfContainer")? $(target):target.tagName=="BODY"?$(target).find("form>.cfContainer"):$(target).parents("body").find("form>.cfContainer");
			// 首先默认生成一个ID
			var groupId = CForm.generateId();
			// 组名称，同一组的checkbox，name必须一致
			var groupName = L.getLocaleMessage("cf.widget.checkbox", "复选框");
			// 组件id
			var widgetId = this.id;
			var isCreateId = "1";

			if(target.tagName != 'DIV'){
				target = target.parentNode;
			}
			if(target.tagName == 'DIV' && $(target).hasClass("checkboxContainer")){
				$target = $(target);
				var $checkbox = $target.find("input[type=checkbox]");
				if ($checkbox.length > 0) {
					groupId = $checkbox.attr("id");
					groupName = $checkbox.attr("name");
				}
				var sTpl = new $.XTemplate(this.stpl);
				var secondCheckbox = sTpl.applyTemplate( {
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				});
				$(secondCheckbox).appendTo($target);
			}else{
				var fTpl = new $.XTemplate(this.ftpl);
				var firstCheckbox = fTpl.applyTemplate( {
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				});
				$(firstCheckbox).appendTo($target);
			}
		},
		// 双击复选框
		dblClick : function(e, target) {
			// 原属性值
			var oldProperty = {
				/**
				 * 基本属性
				 */
				// 显示值
				displayValue : target.nextSibling.nodeValue,
				// 保存值
				saveValue : $(target).val(),
				// 默认选中
				isSelected : $(target).attr('checked') ? true : false,
				/**
				 * 组属性
				 */
				// 组ID
				groupId : $(target).attr("id"),
				// 组名称
				groupName : $(target).attr("name"),
				// 是否自动生成ID
				isCreateId : $(target).attr("cf_isCreateId")
			};
			
			showWindow(L.getLocaleMessage("cf.widget.checkbox", "复选框"), "mwidget/checkbox/checkboxattr.jsp", 400, 300,
					oldProperty, handleReturn);
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}
				/**
				 * 基本属性
				 */
				// 显示值
				target.nextSibling.nodeValue = result.displayValue;
				// 保存值
				$(target).val(result.saveValue);
				// 默认选中
				$(target).attr('checked', result.isSelected);
				/**
				 * 组属性
				 */
				var newGroupProperty = {
					// 组ID
					id : result.groupId,
					// 组名称
					name : result.groupName,
					// 是否自动生成ID
					cf_isCreateId : result.isCreateId
				};
				// 修改组名称
				$(target).parent().parent().prev()[0].innerText = result.groupName;
				// 保证同一单元格内组属性一致
				var $checkboxs = $(target).parent().parent().find("input[type='checkbox']");
				$.each($checkboxs, function() {
					$(this).attr(newGroupProperty);
				});
			}
		}
	};

	CFMCheckBox = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMCheckBox);
})(jQuery);