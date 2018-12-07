/*
 * 表单构建器基类
 */
(function($) {
	// overrides属性：add、Widgets、widgets、init、
	// initHeight、update、initUI、initEvent、initWidget
	var overrides = {
		/**
		 * 添加组件类
		 */
		add : function(id, Widget) {
			this.Widgets[id] = Widget;
		},

		/**
		 * 组件类
		 */
		Widgets : {},

		/**
		 * 组件实例
		 */
		widgets : [],

		/**
		 * 初始化方法
		 */
		init : function() {
			$this = $(this);
			// 解析url
			CPortal.parseUrl();

			// 初始化组件栏及设计区高度
			this.initHeight();
			// 初始化UI
			this.initUI();
			// 初始化事件
			this.initEvent();
			// 初始化组件
			this.initWidget();
		},

		/**
		 * 初始化组件栏及设计区高度
		 */
		initHeight : function() {
			// 设计区
			$(".designColumn").height($('body').get(0).clientHeight - 95);
			// 组件栏
			$(".widgetColumn").height($('body').get(0).clientHeight - 95);
		},
		
		/**
		 * 更新方法
		 */
		update : function() {
			// 设计区：鼠标移动、松开、单击、双击事件
			this.designZoneMouseEvent();

			// 更新其他组件
			$.each(this.widgets, function(i, widget) {
				if (widget.update) {
					try {
						widget.update();
					} catch (e) {
						showDialog("alert", "更新组件[" + widget.id + "]出现异常！",
								"提示信息");
					}
				}
			});
		},

		/**
		 * 初始化UI
		 */
		initUI : function() {
		},

		/**
		 * 初始化事件
		 */
		initEvent : function() {
			// window：调整窗口大小
			this.windowResizeEvent();
			
			// Body：鼠标移动、松开事件
			this.bodyMouseEvent();

			// 工具栏：标签页点击事件
			this.toolBarTabEvent();

			// 组件栏：鼠标悬停、按下、移动、松开事件
			this.widgetBarMouseEvent();

			// 组件栏:面板展开折叠事件
			this.widgetBarPanelToggleEvent();

			// 设计区：鼠标移动、松开、单击、双击事件
			this.designZoneMouseEvent();
		},
		
		/**
		 * 初始化组件
		 */
		initWidget : function() {
			for ( var id in this.Widgets) {
				var widget = null;
				try {
					var widget = new this.Widgets[id]({
						id : id
					});
					widget.init(this);
				} catch (e) {
					showDialog("alert", "初始化组件[" + id + "]出现异常！", "提示信息");
				}

				if (widget) {
					this.widgets.push(widget);
				}
			}
		}
	};

	CPBuilder = $.inherit(CPEvent, overrides);
})(jQuery);