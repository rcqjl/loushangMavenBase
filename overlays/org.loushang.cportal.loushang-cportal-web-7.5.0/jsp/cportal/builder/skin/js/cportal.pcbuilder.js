/*
 * PC表单构建器
 */
(function($) {
	// overrides的属性：initUI
	var overrides = {
		/**
		 * 初始化UI
		 */
		initUI : function() {
			/**
			 * 工具栏
			 */
			var toolBarItem = [
				// 保存:保存、保存并发布
				"savePage", "saveAndReleasePage",
	
				// 页面:页面属性、预览、微件类别 ,图片轮播导航
				"pageAttr", "pagePreview","widgetAttr","navigator",
	
				// 表格:列属性、表格操作
				"layoutAttr", "colAttr", "tableAction"
			];

			var builder = this;
			var toolbar = new CPToolBar();
			$.each(toolBarItem, function(index, item) {
				toolbar[item](builder);
			});

			/**
			 * 组件栏
			 */
			CPWidgetType.init();
			
			/**
			 * 设计区
			 */
			var iframeDoc = CPortal.getDocument();
			iframeDoc.designMode = "on";
			iframeDoc.open();

			// 页面定义ID
			var pageId = CPortal.pageId;
			// 修改表单
			if (pageId) {
				var url = CPortal.webPath + "/service/cportal/pages/getPageContent";
				$.ajax({
					cache : false,
					url : url,
					data : "pageId="+pageId,
					type : "POST",
					async : false,
					success : function(options, success, response) {
						iframeDoc.write(response.responseText);
					}
				});

				// 当前状态
				CPortal.curState = "1";
			}
			// 新增表单
			else {
				var table = '<table id="table-panel" name="表格" class="cpTable">'
								+ '<colgroup>'
									+ '<col>'
									+ '<col>'
									+ '<col>'
								+ '</colgroup>'
								+ '<tbody>'
									+ '<tr>'
										+ '<td></td>'
										+ '<td></td>'
										+ '<td></td>'
									+ '</tr>'
									+ '<tr>'
										+ '<td></td>'
										+ '<td></td>'
										+ '<td></td>'
									+ '</tr>'
									+ '<tr>'
										+ '<td></td>'
										+ '<td></td>'
										+ '<td></td>'
									+ '</tr>'
								+ '</tbody>'
							+ '</table>';
				var html = '<html>'
						+ '<head>'
						+ '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
						+ '</head>'
						+ '<body>'
						+ '<form>'
						+ table
						+ '</form>'
						+ '</body>' 
						+ '</html>';

				iframeDoc.write(html);

				var $form = $(CPortal.getForm());
			};
			
			CPortal.curTable = CPortal.getTable();

			// 引入设计时css
			CPortal.importLink();

			iframeDoc.close();
			
			// 初始化表格
			CPortal.curTable = TableUtil({
				table : CPortal.getTable(),
				testdel : function(delCell){
					var s = 0;
					if($(delCell).html()){
						s = window.confirm(L.getLocaleMessage("tip-deletecell","行(列)中包含非空单元格，确定删除？"));
						if(s){
							s = 1;
						}
					}else{
						s = 2;
					}
					return s;
				}
			});
			CPortal.curTable.init();
			
			// 初始化表格操作事件
			$(CPortal.getTable())
			// 按下鼠标
			.on('mousedown', function(e) {
				$(this).find("td").removeClass('selected');
				var td = e.target;
				if (td.tagName == "TD") {
					CPortal.curTr = td.parentNode;
					// 鼠标按下动作
					CPortal.curTable.mousedown(e);
				} else {
					CPortal.curTr = null;
				}
			})
			// 移动鼠标
			.on('mousemove', function(e) {
				// 当前表格
				var curTable = CPortal.curTable;
				if (curTable) {
					curTable.mousemove(e);
				}
			})
			// 松开鼠标
			.on('mouseup', function(e) {
				// 当前表格
				var curTable = CPortal.curTable;
				if (curTable) {
					curTable.mouseup(e);
				}
			});
		}
	};

	CPPcBuilder = $.inherit(CPBuilder, overrides);
	// 注册构建器
	CPortal.setBuilder(new CPPcBuilder());
})(jQuery);