/*
 * 表单--dynrow,动态行
 */
(function($) {
	var overrides = {
		tpl : '<li id="{dynRowId}" name="{dynRowName}" class="cfDynRow" '
				+ ' cf_modelId="{modelId}" '
				+ ' cf_modelName="{modelName}" '	
				+ ' cf_isCreateTable="{isCreateTable}" '
				+ ' cf_isPaging="{isPaging}" '
				+ ' cf_elementType="zone"'
				+ ' cf_isCreateId="{isCreateId}">'
				+ '<div class="cfDynRowTableContainer"></div>'
				+ '</li>',

		tableTpl : '<div class="cfDynRowTable"></div>',
		
		// 初始化组件
		init : function(builder) {
			this.builder = builder;
			this.initEvent();
		},
		
		// 更新组件
		update : function() {
		},

		// 初始化事件
		initEvent : function() {
			// 注册放下事件
			this.builder.on(this.id+"_drop", $.proxy(this.drop, this));
		},
		
		// 放下动态行
		drop : function(e, target) {
			var $target = $(CForm.getForm()).find(".cfContainer");
			var addRowId = CForm.generateId();
			var delRowId = CForm.generateId();

			var dynRow = new $.XTemplate(this.tpl);
			
			var globj = this;
			
			showWindow(L.getLocaleMessage("cf.dynrow", "动态行"), "mwidget/dynrow/dynrowattr.jsp", 400, 400,
					null, handleReturn);
			/**
			 * 处理返回值
			 */
			function handleReturn(result){
				if (!result) {
					return;
				}
				var dynRowId = result.zoneId;
				var dynRowName = result.zoneName;
				var tableCol = result.tableCol;
				var alias=result.alias;
				var $dynRow = dynRow.append($target[0], {
					"dynRowId" : dynRowId,
					"dynRowName" : dynRowName,
					"isCreateTable" : CForm.isCreateTable,
					"isCreateId" : result.isCreateId,
					"isPaging" : result.isPaging,
				}, true);
				
				var $table = $(globj.tableTpl).appendTo($dynRow.find(".cfDynRowTableContainer"));
				
				// 插入表格标题
				var $thead = $('<div class="dynRowTh">'
						+'<label class="dynRowName">'+dynRowName+'</label>(<label class="dynRowNum">1</label>)</div>').appendTo($table);
				var add = L.getLocaleMessage("cf.add", "增加");
				var deleterow = L.getLocaleMessage("cf.delete", "删除")
				$thead.append('<span class="cfAddAndDelTd">'
						+ '<input id="'+addRowId+'" name="'+add+'" type="button" value="'+add+'" class="cfAddRow" cf_elementType="field">'
						+ '<input id="'+delRowId+'" name="'+deleterow+'" type="button" value="'+deleterow+'" class="cfDelRow" cf_elementType="field">'
						+ '</span>');
				// 插入表格体
				var $tbody = $('<div class="dynRowTr"></div>').appendTo($table);
				for ( var i = 0; i < tableCol; i++) {
					$tbody.append('<ul class="dynRowTd cfContainer"></ul>');
				}
				// 是否分页
				if(result.isPaging){
					var $pageBarTpl = $('<div class="pageBarContainer">'+
							'<span>显示更多</span>'+
							'<select class="pageSize" style="display:none;"><option>'+result.pageSizeOption+'</option><select>'+
							'<input name="curPageNum" type="hidden" value=1/>'+
							'<input name="totalPage" type="hidden"/>'+
							'<input name="totalNum" type="hidden"/>'+
							'<div>').appendTo($dynRow);
					
				}
			}
		}
	}

	CFMDynRow = $.inherit(CFWidget, overrides);
	// 注册组件
	CForm.reg(CFMDynRow);
})(jQuery);