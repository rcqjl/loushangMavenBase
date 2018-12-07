/*
 * 表单--radio，单选框
 */
(function($) {
	var overrides = {
		ftpl : '<li>'
			+ '<label class="cfLabel">'+L.getLocaleMessage("cf.widget.radio", "单选按钮")+'</label>'
			+ '<div class="radioContainer">'
			+ '<label>'
			+ '<input id="{groupId}" name="{groupName}" type="radio" value="" class="cfRadio"'
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
			+ '<input id="{groupId}" name="{groupName}" type="radio" value="" class="cfRadio"'
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

		// 放下单选框
		drop : function(e, target) {
			var $target = $(target).hasClass("cfContainer")? $(target):target.tagName=="BODY"?$(target).find("form>.cfContainer"):$(target).parents("body").find("form>.cfContainer");
			// 首先默认生成一个ID
			var groupId = CForm.generateId();
			// 组名称，同一组的radio，name必须一致
			var groupName = L.getLocaleMessage("cf.widget.radio", "单选按钮");
			// 组件id
			var widgetId = this.id;
			var isCreateId = "1";
			
			if(target.tagName!='DIV'){
				target = target.parentNode;
			}
			if(target.tagName=='DIV' && $(target).hasClass("radioContainer")){
				$target = $(target);
				var $radio = $target.find("input[type=radio]");
				if ($radio.length > 0) {
					groupId = $radio.attr("id");
					groupName = $radio.attr("name");
				}
				var stpl = new $.XTemplate(this.stpl);
				var secondRadio = stpl.applyTemplate( {
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				});
				$(secondRadio).appendTo($target);
			}else{
				var ftpl = new $.XTemplate(this.ftpl);
				var firstRadio = ftpl.applyTemplate( {
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : isCreateId,
					"widgetId" : widgetId
				});
				$(firstRadio).appendTo($target);
			}
		},

		// 双击单选框
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
			
			showWindow(L.getLocaleMessage("cf.widget.radioattr", "单选按钮"), "mwidget/radio/radioattr.jsp", 400, 300,
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
				var $radios = $(target).parent().parent().find("input[type='radio']");
				$.each($radios, function() {
					$(this).attr(newGroupProperty);
				});
			}			
		}
	};
	CFMRadio = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMRadio);
})(jQuery);