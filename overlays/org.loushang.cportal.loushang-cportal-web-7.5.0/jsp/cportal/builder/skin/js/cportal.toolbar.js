/*
 * 工具栏：保存、页面、表格
 */
(function($) {
	CPToolBar = function(config) {
		$.apply(this, config);
	};

	CPToolBar.prototype = {
		// ///////////////////////////////////////////////
		//
		// 保存：保存页面、保存并发布页面
		//
		// ///////////////////////////////////////////////
		/**
		 * 保存页面
		 */
		savePage : function() {
			//自身引用
			var self=this;
			
			$.btn({
				id : 'btn_save',
				title : L.getLocaleMessage('cportal.save',"保存")
			}).appendTo('.savebtn ul').click(function(){
				// 校验页面
				var validate = self.validatePage();
				if (!validate) {
					return;
				}
				
				CPortal.formId = $(CPortal.getForm()).attr("id");
				// 新增页面
				if (CPortal.curState == "0") {
					// 设置页面初始定义ID
					//正则表达式解决ajax传值过程中%无法自动转义导致的传值丢失问题
					var content=CPortal.getCode().replace(/\%/g, "%25");
					$.ajax({
						url : CPortal.webPath+"/service/cportal/pages/insertPage",
						data: "content=" + content,
						async : false,
						type:"POST",
						success : function(data){
							$.dialog({
								autofocus:true,
								type : "alert",
								content : L.getLocaleMessage("cportal.success1","保存成功 !")
							});
							CPortal.curState = "1";
						}
					});
				}else{
					//正则表达式解决ajax传值过程中%无法自动转义导致的传值丢失问题
					var content=CPortal.getCode().replace(/\%/g, "%25");
					$.ajax({
						url : CPortal.webPath+"/service/cportal/pages/updatePage",
						data: "content=" + content+"&pageId=" + CPortal.formId,
						async : false,
						type:"POST",
						success : function(data){
							$.dialog({
								autofocus:true,
								type : "alert",
								content : L.getLocaleMessage("cportal.success2","修改成功 !")
							});
						}
					});
				}
			});
		},

		/**
		 * 保存并发布页面
		 */
		saveAndReleasePage : function() {
			//自身引用
			var self=this;
			
			$.btn({
				id : 'btn_saveandrelease',
				title : L.getLocaleMessage("cportal.saveandpublish","保存并发布")
			}).appendTo('.savebtn ul').click(function(){
				// 校验表单
				if (!self.validatePage()) {
					return;
				}
				CPortal.formId = $(CPortal.getForm()).attr("id");
				// 新增并发布
				if (CPortal.curState == "0") {
					//正则表达式解决ajax传值过程中%无法自动转义导致的传值丢失问题
					var content=CPortal.getCode().replace(/\%/g, "%25");
					$.ajax({
						url : CPortal.webPath+"/service/cportal/pages/insertAndRelease",
						data : "content="+content,
						type:"POST",
						async : false,
						success : function(){
							$.dialog({
								autofocus:true,
								type : "alert",
								content : L.getLocaleMessage("cportal.success3","保存并发布成功 !")
							});
							CPortal.curState = "1";
						}
					});
				}
				// 修改并发布
				else{
					//正则表达式解决ajax传值过程中%无法自动转义导致的传值丢失问题
					var content=CPortal.getCode().replace(/\%/g, "%25");
					$.ajax({
						url : CPortal.webPath+"/service/cportal/pages/updateAndRelease",
						data: "content=" + content+"&pageId=" + CPortal.formId,
						type:"POST",
						async : false,
						success : function(data){
							$.dialog({
								autofocus:true,
								type : "alert",
								content : L.getLocaleMessage("cportal.success4","修改并发布成功 ！")
							});
						}
					});
				}
			});

		},
		
		/**
		 * 校验页面信息
		 */
		validatePage : function(){
			// 校验结果
			var result = true;
			// 自身引用
			var self=this;
			
			var $form = $(CPortal.getForm());
			
			// 页面定义ID
			var pageId = $form.attr("id");
			if(!pageId || !$.trim(pageId)){
				$.dialog({
					autofocus:true,
					type : "alert",
					content : L.getLocaleMessage("tip-setId","请设置页面定义ID，再点击保存 ！"),
					ok:function(){
						self.setPageAttr()
					}
				});
				return false;
			}
			
			return result;
		},

		// ///////////////////////////////////////////////
		//
		// 页面：页面属性、应用范围、预览
		//
		// ///////////////////////////////////////////////
		/**
		 * 页面属性
		 */
		pageAttr : function() {
			//自身引用
			var self = this;

			$.btn({
				id : 'btn_formattr',
				title : L.getLocaleMessage("cportal.pageproperties","页面属性")
			}).appendTo("#tbPage ul").click(function() {
				self.setPageAttr();
			});
		},
		
		/**
		 * 设置页面属性
		 */
		setPageAttr : function(){
			var $form = $(CPortal.getForm());
			var obj = new Object();
			obj.pageId = $form.attr("id");
			obj.pageName = $form.attr("name");
			obj.description=$form.attr("description");
			obj.curState = CPortal.curState;
			
			showWindow(L.getLocaleMessage("cportal.pageproperties","页面属性"), "help/pageattr.jsp", 400, 400, obj,
					handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				// 取消设置
				if (!result) {
					return false;
				}
				
				$form.attr("id", result.pageId);
				$form.attr("name", result.pageName);
				$form.attr("description",result.description);
			}
		},
		
		/**
		 * 页面预览
		 */
		pagePreview : function() {
			$.btn({
				id : 'btn_formpreview',
				title : L.getLocaleMessage("cportal.preview","预览")
			}).appendTo('#tbPage ul').click(function() {
				
				var winParam = "fullscreen=yes";

				window.open(CPortal.webPath
						+"/jsp/cportal/builder/help/preview.jsp","_blank",'width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30));
			});
		},

		/**
		 * 设置页面显示哪一类别的微件
		 */
		widgetAttr : function(){
			//自身引用
			var self = this;
			$.btn({
				id : 'btn_widgetAttr',
				title : L.getLocaleMessage("cportal.widgetType","微件类别")
			}).appendTo('#tbPage ul').click(function(){
				self.setWidgetAttr();
			});
		},
		setWidgetAttr : function(){
			var $form = $(CPortal.getForm());
			var obj = new Object();
			var isType = $form.attr("istype");
			if(isType!=null){
				var arr = isType.split(",");
				obj.isType = arr;
			}
			var allTypes = [];
			$("#widgetContainer").find(".widgetType").each(function(){
				var id = this.id;
				var name = $(this).find(".widgetTitle").text();
				var widgetType = {
						"id" : id,
						"name" : name
				};
				allTypes.push(widgetType);
			});
			obj.allType = allTypes;
			showWindow(L.getLocaleMessage("cportal.widgetType","微件类别"), "help/widgetattr.jsp", 400, 400, obj,
					handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				// 取消设置
				if (!result) {
					return false;
				}
				$form.attr("isType",result);
				
			}
		},
		navigator : function(){
			//自身引用
			var self = this;
			$.btn({
				id : 'btn_navigator',
				title : L.getLocaleMessage("cportal.pagenavigation","页面导航")
			}).appendTo('#tbPage ul').click(function(){
				self.setNavigator();
			});
		},
		setNavigator : function(){
			var $form = $(CPortal.getForm());
			var obj = new Object();
			var icon = $form.attr("icon");
			if(icon!=null){
				obj.icon = icon;
			}
			showWindow(L.getLocaleMessage("cportal.pagenavigation","页面导航"), "help/navigatorattr.jsp", 400, 400, obj,
					handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				// 取消设置
				if (!result) {
					return false;
				}
				$form.attr("icon",result.icon);
			}
		},
		// ///////////////////////////////////////////////
		//
		// 表格：布局属性、列属性、表格操作
		//
		// ///////////////////////////////////////////////
		
		layoutAttr :function(){
			//自身引用
			var self = this;
			$.btn({
				id : 'btn_layoutAttr',
				title : L.getLocaleMessage("cportal.settinglayout","设置布局")
			}).appendTo("#tbTable ul").click(function(){
				self.setLayoutAttr();
			})
		},
		setLayoutAttr : function(){
			var $form = $(CPortal.getForm());
			var $tdselected = $form.find(".selected");
			var $tdchildren = $($tdselected).children()
			var layout;
			if(!$tdchildren[0]){
				
				if($tdselected.length ==0){
					$.dialog({
						autofocus:true,
						type : "alert",
						content : L.getLocaleMessage("tip-cell","请选择一个单元格！")
					});
					return
				}else if($tdselected.length ==1){
					if($($tdselected[0]).attr("layout")!=null){
						layout = $($tdselected[0]).attr("layout")
					}else{
						layout = "0"
					}
				}else{
					$.dialog({
						autofocus:true,
						type : "alert",
						content : L.getLocaleMessage("tip-cell","请选择一个单元格！")
					});
					return
				}
			}else{
				$.dialog({
					autofocus:true,
					type : "alert",
					content : L.getLocaleMessage("tip-cellempty","请选择一个空单元格！")
				});
				return
			}
			var obj = new Object();
			obj.layout = layout
			
			showWindow(L.getLocaleMessage("cportal.settinglayout","设置布局"), "help/layoutattr.jsp", 400, 400, obj,
					handleReturn);
			
			// 处理返回值
			function handleReturn(result) {
				// 取消设置
				if (!result) {
					return false;
				}
				
				$tdselected.attr({"layout":result.layout})
			}
		},
		/**
		 * 列属性
		 */
		colAttr : function() {
			// 列属性
			$.btn({
				id : 'btn_columnattr',
				title : L.getLocaleMessage("cportal.columnattributes","列属性")
			}).appendTo("#tbTable ul").click(
					function() {
						// 判断是否选中表格
						if (!CPortal.curTable) {
							showDialog("alert", L.getLocaleMessage("tip-table","请选择要操作的表格"), L.getLocaleMessage("tip-message","提示信息"),L.getLocaleMessage("cportal.confirm","确定"),L.getLocaleMessage("cportal.cancel","取消"));
							return;
						}
						// 获取当前表格所有列宽
						var colWidths = new Object();
						var cols = $(CPortal.curTable.table).find("colgroup col");
						$.each(cols, function(i, col) {
							colWidths[i + 1] = col.style.width;
						});

						// 弹出框
						showWindow(L.getLocaleMessage("cportal.columnattributes","列属性"), "help/columnattr.jsp", 380, 400,
								colWidths, handleReturn);

						/**
						 * 处理返回值
						 */
						function handleReturn(result) {
							if (!result) {
								return false;
							}
							// 更新宽度
							$.each(cols, function(i, col) {
								col.style.width = result[i] + "%";
							});
						}
					});
		},

		////////////////////////////////////////////////////
		//
		// 表格操作：合并单元格、拆分单元格、插入一行、删除一行、插入一列、删除一列
		//
		////////////////////////////////////////////////////
		tableAction : function() {
			var btnArray = [ {
				id : 'btn_merge',
				title : L.getLocaleMessage("cportal.merge","合并单元格")
			}, {
				id : 'btn_split',
				title : L.getLocaleMessage("cportal.split","拆分单元格")
			}, {
				id : 'btn_addrow',
				title : L.getLocaleMessage("cportal.addrow","上方插入行")
			}, {
				id : 'btn_addrowBelow',
				title : L.getLocaleMessage("cportal.addrowBelow","下方插入行")
			}, {
				id : 'btn_delrow',
				title : L.getLocaleMessage("cportal.delrow","删除一行")
			}, {
				id : 'btn_addcol',
				title : L.getLocaleMessage("cportal.addcol","左侧插入列")
			}, {
				id : 'btn_addcolRight',
				title : L.getLocaleMessage("cportal.addcolRight","右侧插入列")
			}, {
				id : 'btn_delcol',
				title : L.getLocaleMessage("cportal.delcol","删除一列")
			} ];
			var actionName = [ 'merge', 'split', 'addrow', 'addrowBelow',
					'delrow', 'addcol', 'addRightCol', 'delcol' ];

			// 表格操作
			$.each(btnArray, function(i, btn) {
				$.btn(btn).appendTo("#tbTable ul").click(function() {
					// 当前表格
					var curTable = CPortal.curTable;
					if (curTable) {
						curTable.action[actionName[i]]();
						if(actionName[i] == 'addcol' || actionName[i] == 'addRightCol'){
							$(CPortal.curTable.table).find('col').removeAttr('style');
						}
					} else {
						showDialog("alert", L.getLocaleMessage("tip-table","请选择要操作的表格"), L.getLocaleMessage("tip-message","提示信息"),L.getLocaleMessage("cportal.confirm","确定"),L.getLocaleMessage("cportal.cancel","取消"));
					}
				});
			});
		}
	};
})(jQuery);