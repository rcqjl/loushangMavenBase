/*
 * 表单--table,表格
 */
(function($, undefined) {
	var overrides = {
		tpl : '<table class="cfTable" cf_isCreateId="1"></table>',

		// 初始化组件
		init : function(builder) {
			this.builder = builder;
			this.initEvent();
		},

		// 更新组件
		update : function() {
			// 选择事件
			this.initSelectTable();
		},

		// 初始化事件
		initEvent : function() {
			// 注册放下事件
			this.builder.on(this.id+"_drop", $.proxy(this.drop, this));
			// 选择事件
			this.initSelectTable();
		},

		// 放下表格
		drop : function(e) {
			var $dropTarget = $target = $(CForm.getForm());

			var $table = $(this.tpl).appendTo($dropTarget);
			// <colgroup>标签，用于批量设置td的样式，不用在每个td上设置样式
			var $colgroup = $("<colgroup></colgroup>").appendTo($table);
			// <tbody>标签
			var $tbody = $("<tbody></tbody>").appendTo($table);
			
			showWindow("表格", "pwidget/table/table.jsp", 400, 300,
					null, handleReturn);
			/**
			 * 处理返回值
			 */
			function handleReturn(returnValue){
				if (!returnValue) {
					return;
				}
				// 行数
				var rowNum = returnValue.tableRow;
				// 列数
				var colNum = returnValue.tableCol;
				
				// <col> 标签
				for ( var i = 0; i < colNum; i++) {
					// 偶数列样式
					if (i % 2 == 0) {
						$colgroup.append('<col class="cfFieldLabel"></col>');
					}
					// 基数列样式
					else {
						$colgroup.append('<col class="cfFieldInput"></col>');
					}
				}

				// <tr>、<td>标签
				for ( var i = 0; i < rowNum; i++) {
					var $row = $('<tr></tr>').appendTo($tbody);
					for ( var j = 0; j < colNum; j++) {
						// 偶数列样式
						if (j % 2 == 0) {
							$row.append('<td class="cfFieldLabel"></td>');
						}
						// 基数列样式
						else {
							$row.append('<td class="cfFieldInput"></td>');
						}
					}
				}
				// 设置拖动表格调整宽度
				//$.tableresize($table);
			}
		},

		// 选择表格
		initSelectTable : function() {
			$target = $(CForm.getForm());
			$target.find('.cfTable')
			// 按下鼠标
			.live('mousedown', function(e) {
				// 保证只有一个表格被选中
				$target.find("td").removeClass('selected');
				var td = e.target;
				if (td.tagName == "TD") {
					// 初始化当前表格
					CForm.curTable = TableUtil({
						table : td.offsetParent,
						testdel : function(delCell){
							var s = 0;
							if($(delCell).html()){
								s = window.confirm('行(列)中包含非空单元格，确定删除？');
								if(s){
									s = 1;
								}
							}else{
								s = 2;
							}
							return s;
						}
					});
					CForm.curTr = td.parentNode;
					CForm.curTable.init();
					// 鼠标按下动作
					CForm.curTable.mousedown(e);
				} else {
					CForm.curTable = null;
					CForm.curTr = null;
				}
			})
			// 移动鼠标
			.live('mousemove', function(e) {
				// 当前表格
				var curTable = CForm.curTable;
				if (curTable) {
					curTable.mousemove(e);
				}
			})
			// 松开鼠标
			.live('mouseup', function(e) {
				// 当前表格
				var curTable = CForm.curTable;
				if (curTable) {
					curTable.mouseup(e);
				}
			});
		}
	};

	CFPTable = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFPTable);
})(jQuery);