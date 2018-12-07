/*
 * 表单事件类
 */
(function($) {
	CPEvent = function(config) {
		$.apply(this, config);
	};

	CPEvent.prototype = {
		$this : null,
		/**
		 * 监听事件
		 */
		on : function(eventName, func) {
			$this.on.apply($this, arguments);
		},

		/**
		 * 取消监听事件
		 */
		un : function(eventName, func) {
			$this.off.apply($this, arguments);
		},

		/**
		 * 触发事件
		 */
		fireEvent : function(eventName, args) {
			$this.trigger.apply($this, arguments);
		},

		/**
		 * 初始化事件
		 */
		initEvent : function() {
		},
		
		// ///////////////////////////////////////////////
		//
		// window：调整大小
		//
		// ///////////////////////////////////////////////
		windowResizeEvent : function() {
			$(window)
			.resize(function(){
				// 设计区
				$(".designColumn").height($('body').get(0).clientHeight - 95);
				// 组件栏
				$(".widgetColumn").height($('body').get(0).clientHeight - 95);
				// 组件div
				$(".widgets").height($(".widgetColumn").height() - 30*$(".widgetType").length);
				//主题
				$('.themeBody').height($('.widgetColumn').height() - 30);
			});
		},

		// ///////////////////////////////////////////////
		//
		// Body：鼠标移动、松开事件
		//
		// ///////////////////////////////////////////////
		bodyMouseEvent : function() {
			$("body")
			// 移动鼠标
			.mousemove(function(e) {
				// 设计模式下解决IE中拖动时的选中问题
				// 源码模式下不能阻止默认事件，否则无法选中文本
				if(CPortal.curMode == "0"){
					e.preventDefault();
				}				
				var f = $("#flyDiv:visible");
				if (f[0]) {
					f.css("left", e.pageX + 5);
					f.css("top", e.pageY + 5);
				}
			})
			// 松开鼠标
			.mouseup(function() {
				var f = $("#flyDiv:visible").hide();
				if (f[0]) {
					f.hide();
				}
			});
		},

		// ///////////////////////////////////////////////
		//
		// 工具栏：标签页点击事件    图标悬停事件
		//
		// ///////////////////////////////////////////////
		toolBarTabEvent : function() {
			$(".tabnav li").on(
					'click',
					function() {
						var tabs = $(".tabnav li");
						var panels = $('.ui-tabs-panel');
						var index = $(this).index();
						if (panels.eq(index)[0]) {
							tabs.removeClass("ui-tabs-selected").eq(index)
									.addClass("ui-tabs-selected");
							panels.addClass("ui-tabs-hide").eq(index)
									.removeClass("ui-tabs-hide");
						}
						if (panels.eq(index).attr("id") != "tbForm") {
							if (CPortal.curMode == "1") {
								$('#btn_srcedit').click();
							}
						}
					});
			// 工具栏图片悬停时
			$(".toolbar a.btn").on({
				mouseover: function() {
					
					var y = $(this).find(".btnIcon").css("background-position-y");
					y = y.slice(0, y.length-2);
					y =  parseInt(y);
					$(this).find(".btnIcon").css("background-position-y", y-24);
				},
				mouseout: function() {
					
					var y = $(this).find(".btnIcon").css("background-position-y");
					y = y.slice(0, y.length-2);
					y =  parseInt(y);
					$(this).find(".btnIcon").css("background-position-y", y+24);
				}
			});
		},

		// ///////////////////////////////////////////////
		//
		// 组件栏：鼠标悬停、按下、移动、松开事件、面板展开折叠事件
		//
		// ///////////////////////////////////////////////
		widgetBarMouseEvent : function() {
			$(".widget").on(
					{
						mouseover : function() {
							$(this).toggleClass("widgetHover");
						},
						mouseout : function() {
							$(this).toggleClass("widgetHover");
						},
						mousedown : function(e) {
							// 解决IE，chrome中拖动时选中元素问题
							e.preventDefault();
							$("#flyDiv").empty().append(
									$(this).clone().removeClass("widgetHover")
									.css({
										"padding" : "0px",
										"margin" : "0px",
										"width" : "100%"
									}))
									.css({
										"width" : "90px",
										"left" : e.pageX + 5 + "px",
										"top" : e.pageY + 5 + "px"
									}).show();
							
							CPortal.curDragWidget = this;

						},
						mousemove : function(e) {
							// 移除可放置控件样式
							CPortal.removeDroppableStyle();

							var f = $("#flyDiv:visible");
							if (f[0]) {
								if (e.pageX >= screen.availWidth) {
									f.css("left", screen.availWidth);
								} else {
									f.css("left", e.pageX + 5);
								}
								f.css("top", e.pageY + 5);
							}
						},
						mouseup : function() {
							CPortal.curDragWidget = null;
							$("#flyDiv").hide();
						}
					});
		},

		/**
		 * 组件栏面板展开折叠事件
		 */
		widgetBarPanelToggleEvent : function() {
			$(".widgetType").on(
					'click',
					function() {
						var $widgetDiv = $(this).next('div.widgets');
						// 当前组件类别图标更新
			            if ($widgetDiv.is(':visible')) {
							$('span:eq(1)', $(this))
									.removeClass('widgetUnfold').addClass(
											'widgetFold');
						} else {
							$('span:eq(1)', $(this)).removeClass('widgetFold')
									.addClass('widgetUnfold');
						}						
						$widgetDiv.slideToggle('fast');
						// 解决合并后再打开时，滚动条消失问题
						// slideUp默认添加overflow:hidden属性
						$widgetDiv.css({'overflow':'auto'});
						
						// 其他组件类别图标更新
						$(this).siblings('div.widgetType')
							.find('span:eq(1)').each(function(){
								var self = $(this);
								if(self.hasClass('widgetUnfold')){
									self.removeClass('widgetUnfold').addClass(
									'widgetFold');
								}
							});
			            $(this).siblings('div.widgets')
		            		.not($(this).next('div.widgets')).slideUp('fast');
					});
		},

		// ///////////////////////////////////////////////
		//
		// 设计区：鼠标移动、松开、单击、双击事件 悬停事件
		//
		// ///////////////////////////////////////////////
		// 设计区到顶部的高度
		designZoneTop : 95,

		/**
		 * 鼠标移动、松开、单击、双击事件
		 */
		designZoneMouseEvent : function() {
			// 设计区iframe的document
			var iframeDoc = CPortal.getDocument();
			// 自身引用
			var self = this;

			var $iframe = $('#designIframe');

			$(iframeDoc)
			// 移动鼠标
			.mousemove(function(e) {
				var f = $("#flyDiv:visible");
				if (f[0]) {
					// 因为拖动的时候可能会出现滚动条，所以用clientX(Y)计算坐标
					f.css("left", e.clientX + $iframe.offset().left + 5);
					// 设计区到顶部的高度
					f.css("top", e.clientY + self.designZoneTop);

					// 解决IE，chrome中拖动时选中元素问题
					e.preventDefault();

					// 动态设置可放置控件样式
					CPortal.setDroppableStyle(e, f[0]);
				}
			})
			// 松开鼠标
			.mouseup(
					function(e) {
						// 解决IE，chrome中拖动时选中元素问题
						e.preventDefault();

						// 移除可放置控件样式
						CPortal.removeDroppableStyle();

						var f = $("#flyDiv:visible");
						
						// 移动的是设计区内的组件
						if (f[0] && CPortal.curWidget) {
							//获取原Td
							var oldTd  = CPortal.curWidget.parents("td");
							//移动微件并更新目标td中微件的宽度
							if(e.target.tagName == "TD") {//目标区域是td
								var sum = $(e.target).find(".cportal-widget").length;
								var width =100;
								if($(e.target).attr("layout")=="1"){
									width = 100/(sum+1);
									$(e.target).find(".cportal-widget").css({"width":width+"%"});//更新目标区域原有微件宽度
									$(CPortal.curWidget).css({"width":width+"%"});
									$(e.target).append(CPortal.curWidget);
								}else if($(e.target).attr("layout")=="2"){
									$(e.target).append($(CPortal.curWidget).css("width","100%"));
								}else{
									if(!$(e.target).find(".cportal-widget").length){
										$(e.target).append($(CPortal.curWidget).css("width","100%"));
									}else{
										if($(e.target).find(".panel-body")[0].id!=$(CPortal.curWidget).find(".panel-body")[0].id){
											$.dialog({
												type:"alert",
												content:L.getLocaleMessage("tip-position","该位置已存在微件,请选择其他位置,或更改布局方式！")
											});
										}
									}
								}
							} else if($(e.target).parents("td").find(".cportal-widget").length) {
								var sum = $(e.target).parents("td").find(".cportal-widget").length;
								var width =100;
								if($(e.target).parents("td").attr("layout")=="1"){
									width = 100/(sum+1);
									$(e.target).parents("td").find(".cportal-widget").css({"width":width+"%"});//更新目标区域原有微件宽度
									$(CPortal.curWidget).css({"width":width+"%"});
									$(e.target).parents(".cportal-widget").after(CPortal.curWidget);
								}else if($(e.target).parents("td").attr("layout")=="2"){
									$(e.target).parents(".cportal-widget").after(CPortal.curWidget);
								}else{
									if(!$(e.target).parents("td").find(".cportal-widget").length){
										$(e.target).parents(".cportal-widget").after(CPortal.curWidget);
									}else{
										if($(e.target).parents("td").find(".panel-body")[0].id!=$(CPortal.curWidget).find(".panel-body")[0].id){
											$.dialog({
												type:"alert",
												content:L.getLocaleMessage("tip-position","该位置已存在微件,请选择其他位置,或更改布局方式！")
											});
										}
									}
								}
							};
							//更新原Td中微件的宽度
							var sum = $(oldTd).find(".cportal-widget").length;
							var width =100;
							if($(oldTd).attr("layout")=="1"&&sum!=0){
								width = 100/sum;
								$(oldTd).find(".cportal-widget").css({"width":width+"%"});
							};
							
						}
						// 移动的是从组件区拖过来的组件
						if (f[0] && CPortal.curDragWidget) {
							var widgetTpl = new $.XTemplate(CPortal.widgetTpl);
							var targetZone;
							if(e.target.tagName == "TD") {
								targetZone = e.target;
							} else {
								targetZone = $(e.target).parents("td")[0];
							}
							//判断设计区内没有重复的微件
							if(!$(targetZone).parents("form").find("#"+CPortal.curDragWidget.id).length){
								var width =100;
								var sum = $(targetZone).find(".cportal-widget").length
								
								if($(targetZone).attr("layout")=="1"){//行布局，单元格内允许放置多个微件动，微件宽度为平分单元格宽度
									width = 100/(sum+1);
									if(sum!=0){
										$(targetZone).find(".cportal-widget").css({"width":width+"%"})
									}
									widgetTpl.append(targetZone, {
										"widgetTitle" : $(CPortal.curDragWidget).find("label").text(),
										"widgetId": CPortal.curDragWidget.id,
										"height": $(CPortal.curDragWidget).find("input[name=height]").val()+"px",
										"author": $(CPortal.curDragWidget).find("input[name=author]").val(),
										"desc": CPortal.curDragWidget.title,
										"width":width+"%"
									}, true);
								}else if($(targetZone).attr("layout")=="2"){//列布局，单元格内允许放置多个微件，不计算宽度
									widgetTpl.append(targetZone, {
										"widgetTitle" : $(CPortal.curDragWidget).find("label").text(),
										"widgetId": CPortal.curDragWidget.id,
										"height": $(CPortal.curDragWidget).find("input[name=height]").val()+"px",
										"author": $(CPortal.curDragWidget).find("input[name=author]").val(),
										"desc": CPortal.curDragWidget.title,
										"width":width+"%"
									}, true);
								}else{//默认表格布局，单元格内不允许放置多个微件
									if(!$(targetZone).find(".panel").length){
										widgetTpl.append(targetZone, {
											"widgetTitle" : $(CPortal.curDragWidget).find("label").text(),
											"widgetId": CPortal.curDragWidget.id,
											"height": $(CPortal.curDragWidget).find("input[name=height]").val()+"px",
											"author": $(CPortal.curDragWidget).find("input[name=author]").val(),
											"desc": CPortal.curDragWidget.title,
											"width":width+"%"
										}, true);
									}else{
										$.dialog({
											type:"alert",
											content:L.getLocaleMessage("tip-position","该位置已存在微件,请选择其他位置,或更改布局方式！")
										});
									}
								}
							}else{
								$.dialog({
									type:"alert",
									content:L.getLocaleMessage("tip-exist","该微件已存在,请勿重复添加")
								});
							};
						}
						f.hide();
						
						// 当拖动选中表格内容时，如果拖出表格后松开鼠标
						// 需要手动触发表格的mouseup事件，否则表格内鼠标仍处于mousedown状态
						// 当鼠标再次进入表格时，会出现继续选中单元格的问题
						if(CPortal.curTable){
							CPortal.curTable.mouseup(e);
						}
						
						CPortal.curDragWidget = null;
						CPortal.curWidget = null;
					})
			// 鼠标按下事件
			.mousedown(function(e) {
				// 触发父窗口body单击事件，隐藏颜色组件
				$(document.body).trigger("click");

				var target = e.target;
				
				// 点击组件上的移动按钮
				if ($(target).hasClass("panel-heading")) {
					var $widget = $(target).closest(".ue-panel");
					// 解决IE，chrome中拖动时选中元素问题
					e.preventDefault();
					
					$("#flyDiv").empty().append(
							$widget.clone()
							.css({
								"padding" : "0px",
								"margin" : "0px",
								"width" : "300px",
								"height" : "150px"
							}))
							.css({
								"width" : "300px",
								"left" : e.clientX + $iframe.offset().left + 5,
								"top" : e.clientY + self.designZoneTop
							}).show();
					
					CPortal.curWidget = $widget;
					return true;
				}
				
				// 点击组件上的删除按钮
				if ($(target).hasClass("fa-times")) {
					$(target).closest(".ue-panel").remove();
				}
				/*//点击组件上的刷新按钮
				if($(target).hasClass("fa-refresh")){
					alert("重新加载！");
				}*/
				var targetParent = target.offsetParent;
				// 表格内单击，不做处理
				if (targetParent && targetParent.tagName == "TABLE") {
					return;
				}
				
				// 点击document，将当前保存的元素都置空
				CPortal.curTr = null;
				
				$(CPortal.getForm()).find("td").removeClass("selected");
				
				// 模糊触发单击事件
				self.fireEvent("clickEvent", [ target ]);
			})
			// 双击事件
			.dblclick(function(e) {
				var target = e.target;
				var widgetId = $(target).attr("cf_widgetId");
				
				// 精确触发双击事件
				if (widgetId) {
					self.fireEvent(widgetId + "_dblClick", [ target ]);
				}
				// 模糊触发双击事件
				else {
					self.fireEvent("dblClickEvent", [ target ]);
				}
			})
			//鼠标悬停事件
			.mouseover(function(e){
				  if($(e.target).hasClass("panel-heading")) {
					  $(e.target).find(".ue-panel-tools").show();
				  }
				  if($(e.target).parents(".panel-heading")) {
					  $(e.target).parents(".panel-heading").find("ul").show();
				  }
			})
			//鼠标离开事件
			.mouseout(function(e){
				if($(e.target).hasClass("panel-heading")) {
					  $(e.target).find(".ue-panel-tools").hide();
				  }
			});
		}
	};
})(jQuery);