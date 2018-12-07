/*
 * 手机表单--radio,单选按钮
 */
(function($) {
	var overrides = {
		// 创建组件模板
		tpl : "<div cf_widgetId='{widgetId}' class='phone_widget phone_widget_radio'>" +
				"<label class='field_name'>{groupName}</label>" +
				"<div class='radioContainer'></div>" +
			  "</div>",
		radioTpl : "<label>" +
						"<input type='radio' " +
						"id='{groupId}' " +
						"name='{groupName}' " + 
						"cf_fieldLength='100' " + 
						"cf_elementType='field' " + 
						// 是否自动生成ID
						"cf_isCreateId='{isCreateId}' " + 
						// 组件ID
						'cf_widgetId="{widgetId}">' +
					// 显示值+
				 "选项</label>",
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

		// 放下单选按钮组件
		drop : function(e, target) {
			var self = this;
			var $target = $(CForm.getForm()).find(".cfContainer");

			var widgetId = this.id;
			
			// 原属性值
			var oldProperty = {
				// 是否自动生成ID
				isCreateId : 1,
				// 选项
				options : ""
			};
			
			showWindow(L.getLocaleMessage("cf.widget.radioattr", "单选按钮"), "mwidget/base/radio/radioattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				if (!result) {
					return;
				}
				
				var options = result.options;
				// 组id和名称
				var groupId = result.groupId;
				var groupName = result.groupName;
				
				var $widgetWrapTpl = new $.XTemplate(self.tpl).append($target[0], {
					"groupName" : groupName,
					"widgetId" : widgetId
				}, true);
				var $labelTpl = new $.XTemplate(self.radioTpl);
				
				// 设置组id和name
				var labelTpl = $labelTpl.applyTemplate({
					"groupId" : groupId,
					"groupName" : groupName,
					"isCreateId" : result.isCreateId,
					"widgetId" : widgetId
				});
				
				var $inputTpl = $(labelTpl).find("input");
				
				// 动态生成业务模型
				if (CForm.isCreateTable == "1") {
					// 业务模型项ID
					$inputTpl.attr("cf_modelItemId", groupId);
					// 业务模型项名称
					$inputTpl.attr("cf_modelItemName", groupName);
				}
				
				var optionArr = options.split(";");
				$.each(optionArr, function(i,option) {
					var $filed = $(labelTpl).clone();
					var $input = $filed.find("input");
					
					var valArr = option.split(":");
					
					// 设置保存值
					$input.attr("value", valArr[0]);
					// 设置显示值
					$input[0].nextSibling.nodeValue = valArr[1];
					// 设置是否为默认选中
					if(valArr[2]) {
						$input.attr("checked", true);
					}
					
					$widgetWrapTpl.find(".radioContainer").append($filed);
				});
			}
		},
		
		// 双击单选按钮组件
		dblClick : function(e, target) {
			//获得所有单选按钮
			var $tgInputs = $(target).parents(".phone_widget").find(":radio");
			//获得所有选项组成的字符串
			var $options =  opt($tgInputs);
			// 原属性值
			var oldProperty = {
				// 组ID
				groupId : $tgInputs.attr("id"),
				// 组名称
				groupName : $tgInputs.attr("name"),
				// 是否自动生成ID
				isCreateId : $tgInputs.attr("cf_isCreateId"),
				// 选项
				options : $options
			};
			//将选项组装成字符串形如“1:男;0:女:selected”
			function opt($tgInputs){
				var staticVal = [];
				$tgInputs.each(function(i,tgInput){
					var label = $(tgInput).parent();
					staticVal.push([ $(tgInput).val(), ":",
						$(label).text(), 
						$(tgInput).attr('checked') ? ":selected" : "" ]
						.join(""));
					
				});

				return staticVal.join(";");
			}
			showWindow(L.getLocaleMessage("cf.widget.radioattr", "单选按钮"), "mwidget/base/radio/radioattr.jsp", 400, 400,
					oldProperty, handleReturn);
			
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}
				var options = result.options;
				// 组id和名称
				var groupId = result.groupId;
				var groupName = result.groupName;
				
				// 将当前域做为模板
				var radio = $(target).parents(".phone_widget_radio").find(":radio")[0];
				var $labelTpl =$(radio).parent().clone();
				//清空之前的选项
				var $radioContainer = $(radio).parents(".radioContainer");
				$radioContainer.empty();
				
				// 设置组id和name
				var $inputTpl = $labelTpl.find("input");
				$inputTpl.attr("id", groupId);
				$inputTpl.attr("name", groupName);
				$inputTpl.attr("checked", false);
				
				// 动态生成业务模型
				if (CForm.isCreateTable == "1") {
					// 业务模型项ID
					$inputTpl.attr("cf_modelItemId", groupId);
					// 业务模型项名称
					$inputTpl.attr("cf_modelItemName", groupName);
				}
				
				var optionArr = options.split(";");
				$.each(optionArr, function(i,option){
					var $filed = $labelTpl.clone();
					var $input = $filed.find("input");
					
					var valArr = option.split(":");
					
					// 设置保存值
					$input.attr("value", valArr[0]);
					// 设置显示值
					$input[0].nextSibling.nodeValue = valArr[1];
					// 设置是否为默认选中
					if(valArr[2]){
						$input.attr("checked", true);
					}
					
					$radioContainer.append($filed);
				});
			}			
		}		
	};

	CFMRadio = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMRadio);
})(jQuery);