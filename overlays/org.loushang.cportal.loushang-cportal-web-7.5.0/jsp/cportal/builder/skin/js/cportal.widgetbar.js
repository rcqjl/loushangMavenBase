/**
 * 加载表单设计器组件
 */
(function($){
	if (typeof CPWidgetType == "undefined") {
		CPWidgetType = {
			// 类别层次关系
			inherType : [],

			// 组件类别模板
			widgetType : '<div class="widgetType" id="{wtId}">' +
				'<span class="widgetTitle">{wtName}</span>' +
				'<span class="widgetFold"></span>' +
				// 渐变背景
				'<span class="widgetGradualBg"></span>' + 
				'</div>',
			
			// 组件容器模板
			widgetDiv : '<div class="widgets"><ul></ul></div>',
			
			// 组件模板
			widget : '<li class="widget {className}" id="{id}" title="{desc}">' +
				'<span style="background:url({wLogoPath}) no-repeat 50% 50%"></span>' +
				'<input name="height" type="hidden" value="{height}">' +
				'<input name="author" type="hidden" value="{author}">' +
				'<label>{name}</label>' +
				'</li>'
		};
	}
	
	/**
	 * 构建组件类别
	 */
	CPWidgetType.buildWidgetType = function(data) {
		$.each(data, function(i, wt){
			// 一级组件类别
			if (wt.pId == "-1") {
				// 组件类别
				var widgetTypeTpl = new $.XTemplate(CPWidgetType.widgetType);
				var $widgetType = widgetTypeTpl.append($("#widgetContainer")[0], {
					"wtId" : wt.id,
					"wtName" : wt.name
				}, true);
				
				// 组件容器
				var widgetDivTpl = new $.XTemplate(CPWidgetType.widgetDiv);
				var $widgetDiv = widgetDivTpl.append($("#widgetContainer")[0], {}, true);
				var $widgetUI = $widgetDiv.find("ul");
				
				// 组件
				$.each(wt.widgets, function(j, w){
					CPWidgetType.buildWidget($widgetUI, w, wt.id);
				});
				
				// 保存类别层次关系
				wt.name += '（全部）';
				CPWidgetType.inherType[wt.id] = [wt];
			}
		});
		
		$.each(data, function(i, wt){
			// 二级组件类别
			if (wt.pId != '-1') {
				var $widgetTypeHtml = $('#' + wt.pId);
				var $widgetUI = $widgetTypeHtml.next().find('ul');
				// 组件
				$.each(wt.widgets, function(j, w){
					CPWidgetType.buildWidget($widgetUI, w, wt.id);
				});
				
				// 保存类别层次关系
				if (CPWidgetType.inherType[wt.pId]) {
					var wts = CPWidgetType.inherType[wt.pId];
					wts.push(wt);
				}
			}
		});
		
		// 初始化默认设置
		CPWidgetType.initDefault();
		
		// 构建组件类别下拉框
		CPWidgetType.buildWidgetTypeSelect();
	};
	
	/**
	 * 构建组件
	 */
	CPWidgetType.buildWidget = function($wd, w, wtId) {
		var widgetTpl = new $.XTemplate(CPWidgetType.widget);
		widgetTpl.append($wd[0], {
					"id" : w.id,
					"name" : w.name,
					"className" : wtId,
					"desc" : w.desc,
					"wLogoPath" : CPortal.webPath + w.icon,
					"height": w.height,
					"author":w.author
				}, false);
	};
	
	/**
	 * 初始化默认设置
	 */
	CPWidgetType.initDefault = function() {
		// 默认打开第一个组件类别，其他折叠
		// 图标
		$('.widgetType:first').find('span:eq(1)')
				.removeClass('widgetFold').addClass('widgetUnfold');
		
		// 组件
		var count = $('.widgetType').length;
		$('.widgets').hide().height($('.widgetColumn').height() - 30*count);
		$('.widgets:first').show();
	};
	
	/**
	 * 构建组件类别下拉框
	 */
	CPWidgetType.buildWidgetTypeSelect = function() {
		for (var pId in CPWidgetType.inherType) {
			var wts = CPWidgetType.inherType[pId];
			// 没有下级类别时，返回
			if (wts.length == 1) {
				continue;
			}
			var optionHtml = [];
			for (var i = 0; i < wts.length; i++) {
				var wt = wts[i];
				optionHtml.push('<option value="' + wt.id + '">' + wt.name + '</option>');
			}
			
			var $selectHtml = $('<select></select>').append(optionHtml.join(''));
			$('#' + pId).find('.widgetTitle').html('').append($selectHtml);
			
			// 下拉框事件绑定
			CPWidgetType.buildEvent($selectHtml);
		}
	};
	
	/**
	 * 绑定下拉框事件
	 */
	CPWidgetType.buildEvent = function($select) {
		// 阻止默认的折叠、展开事件
		$select.bind('click', function(e) {
			e.stopPropagation();
		});
		
		// 组件类别change事件
		var $ws = $select.parents('.widgetType').next();
		$select.bind('change', function(e){
			// 选中父类别
			if ($(this).find('option:selected').index() == 0) {
				$ws.find('ul li').show();
			}
			// 选中子类别
			else {
				var wt = $(this).val();
				$ws.find('ul li').hide();
				$ws.find('ul li.' + wt).show();
			}
		});
	 };
	 
	// 初始化组件栏
	CPWidgetType.init = function() {
		var json = {"widgetTypeIds" : ""};
		$.ajax({
			url : CPortal.webPath+"/service/cportal/widgets/getAllWidgetsWidthType",
			async : false,
			dataType : "json",
			contentType: "application/json",  
			data: JSON.stringify(json),
			type : "POST",
			success : function(data){
				CPWidgetType.buildWidgetType(data);
			}
		});
	};
})(jQuery);