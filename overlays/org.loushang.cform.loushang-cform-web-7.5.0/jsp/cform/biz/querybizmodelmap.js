// 定义表格对象。
var mapGrid;
// 表格数据。
var gridData = [];

// 弹窗函数。
function UIAlert(msg){
	$.dialog({
		type: "alert",
	    content: msg,
	    autofocus: true
    });
}

// 弹窗样式。
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	var param = {
			autoclose : 1000, 
	        position : place,
	        style : type
	}
	
	$.sticky(msg, param);
}
// 国际化。
function m(code, defMsg) {
	return L.getLocaleMessage(code, defMsg);
}

$(document).ready(function(){
	// 初始化表格。
	initTable();
	
	$("#moresearch").morequery({
    	"title":"",
    	"content":$("#searchpanel").html()
	});
	
	$("body").on("click","#search",function(){
		var fromModelName = $("#fromModelName").val();
		var toModelName = $("#toModelName").val();
		queryMap(fromModelName, toModelName);		
	});
	
	// 查询。
	$("#queryMap").click(function(){
		var fromModelName = $("#fromModelName").val();
		var toModelName = $("#toModelName").val();
		queryMap(fromModelName, toModelName);
	});
	
	// 查询事件回车键绑定。
	$("#fromModelName,#toModelName").keydown(function(event){
		if(event.keyCode == 13){
			var fromModelName = $("#fromModelName").val();
			var toModelName = $("#toModelName").val();
			queryMap(fromModelName, toModelName);
		} 
	});
	
	// 增加一行。
	$("#addRow").click(function(){
		addRow();
	});
	
	// 保存数据。
	$("#saveChangedData").click(function(){
		saveChangedData();
	});
	
	// 批量删除。
	$("#batchDel").click(function(){
		batchDel();
	});
	$(window).resize(function(){
		mapGrid.resizeCanvas();
	});
});

// 初始化表格。
function initTable(data) {
	// 获取首列：multiSelect为true时渲染成checkbox，为false则渲染成radio；可以通过width属性设置宽度，默认为35。
	var checkboxSelector = new Slick.CheckboxSelectColumn({multiSelect:true, width:35});
	// 定义所有列。
	var columns = [
		               checkboxSelector.getColumnDefinition(),
		               {
		            	   id: "fromModelId", 
		            	   name: m("cf.smi", "源表单表名"), 
		            	   field: "fromModelId"
		               },
		               {
		            	   id: "fromModelName", 
		            	   name: m("cf.smn", "源表单别名"), 
		            	   field: "fromModelName"
		               },
		               {
		            	   id: "toModelId", 
		            	   name: m("cf.tmi", "目标表单表名"), 
		            	   field: "toModelId"
		               },
		               {
		            	   id: "toModelName", 
		            	   name: m("cf.tmn", "目标表单别名"), 
		            	   field: "toModelName"
		               },
		               {
		            	   id: "operation", 
		            	   name: m("cf.operation", "操作"), 
		            	   field: "id",
		            	   formatter: operationBtn,
		            	   width: 100
		               }
		          ];
	// 获取表体数据
	if(!data) {
		data = queryData();
		gridData = data
	}
	
	// 表格配置项
	var options={
			selectActiveRow: true,	// 点击行时将其选中，并将其余行取消选中
			multiSelect: true, // true：多选(Ctrl+左键单击行)；false：单选；默认：true。
			defaultColumnWidth: 200, // 默认列宽
			enableTextSelectionOnCells: true,
			forceFitColumns:true
	};
	
	// 生成表格
	mapGrid = $("#mapGrid").editgrid(data, columns, options);
	mapGrid.registerPlugin(checkboxSelector);
	mapGrid.autosizeColumns();	//自动调整列宽
	
	// 绑定单击事件
	mapGrid.onClick.subscribe(function(e, args){
		mapGrid.setActiveCell(args.row, args.cell);
		
		// 当前单元格的id
		var curCellId = mapGrid.getColumns()[args.cell].id;
		if(curCellId != "fromModelId" && curCellId != "toModelId")
			return;
		
		// 取当前行的状态
		var state = mapGrid.getDataItem(args.row).state;
		if(state == 1) {
			selectForm();
	    }
	});
	
	// 鼠标悬停事件
	mapGrid.onMouseEnter.subscribe(function(e, args){
		// 获取当前节点
		var curCell = mapGrid.getCellFromEvent(e);
		
		var curCellId = mapGrid.getColumns()[curCell.cell].id;
		if(curCellId != "fromModelId" && curCellId != "toModelId")
			return;
		
		// 取当前行的状态
		var state = mapGrid.getDataItem(curCell.row).state;
		if(state == 1) {
			// 向当前单元格添加样式
			var hash = {};
			hash[curCell.row] = {};
			hash[curCell.row][curCellId] = "slick-cell-hover";
			mapGrid.setCellCssStyles("cellHover", hash);
	    }
	});
	
	// 鼠标离开事件
	mapGrid.onMouseLeave.subscribe(function(e, args){
		mapGrid.removeCellCssStyles("cellHover");
	});
}

// 获取数据
function queryData(fromModelName, toModelName) {
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapQueryCmd");
	if(fromModelName) {
		cmd.setParameter("fromBizModelName", fromModelName);
	}
	if(toModelName) {
		cmd.setParameter("toBizModelName", toModelName);
	}
	
	cmd.setParameter("start", 0);
	cmd.setParameter("limit", 10000);
	cmd.execute("queryBizModelMaps");
	
	return cmd.getData() ? cmd.getData() : [];
}

// 查询
function queryMap(fromModelName, toModelName) {
	gridData = queryData(fromModelName, toModelName);
	
	// 将表格销毁并重新初始化
	mapGrid.destroy();
	initTable(gridData);
}

// 操作按钮
function operationBtn(row, cell, value, columnDef, dataContext) {
	var itemBtn = "<a href=\"javascript:mapItem('"+row+"')\">"+m("cf.item","映射项")+"</a>";
	var delBtn = "<a href=\"javascript:delMap('"+row+"')\">"+m("cf.delete","删除")+"</a>";
	return itemBtn + "&nbsp;&nbsp;&nbsp;" + delBtn;
}

// 增加一行。
function addRow() {
	var data = {
			modelMapType: 2,
			state: 1
	}
	mapGrid.addRow(data);
}

// 表格的点击事件。
function selectForm() {
    // 选择表单
    $.dialog({
		type: "iframe",
		title: m("cf.modellist", "业务模型"),
		url: "selectbizmodel.jsp?modelType=0",
		width: 500,
		height: 400,
		onclose: function () {
			var formData = this.returnValue;
			if(formData) {
				addFormInfo(formData);
			}
		}
	});
    	
};

// 将数据添加到页面上
function addFormInfo(formData) {
	var activeCell = mapGrid.getActiveCell();
	// 获取当前行数据
	var curRowDate = mapGrid.getDataItem(activeCell.row);
	// 获取当前单元格及右侧单元格的id
	var cellId= mapGrid.getColumns()[activeCell.cell]["id"];
	var nextCellId = mapGrid.getColumns()[activeCell.cell + 1]["id"];
	
	// 设置当前单元格及右侧单元格的值
	curRowDate[cellId] = formData["modelId"];
	curRowDate[nextCellId] = formData["modelName"];
	
	// 刷新行
	mapGrid.updateRow(activeCell.row);
}

// 保存数据
function saveChangedData() {
	var addData = [];
	for(var i=0 ; i<gridData.length ; i++) {
		if(gridData[i].state == 1) {
			var rowNum = i+1;
			if(!gridData[i].fromModelId || !gridData[i].toModelId) {
				var colId = !gridData[i].fromModelId ? "fromModelId" : "toModelId";
				$.dialog({
			    	type: "alert",
			        content: m("cf.selectmodel", "请选择模型！"),
			        ok: function() {
			        	// 滚动到当前行。
			        	mapGrid.scrollRowIntoView(i);
			        	// 将当前单元格选中。
			        	mapGrid.setActiveCell(i, mapGrid.getColumnIndex(colId));
			        	// 让指定单元格闪烁。
			        	mapGrid.flashCell(i, mapGrid.getColumnIndex(colId), 200);
//			        	var activeCell = mapGrid.getActiveCell();
			        }
			    });
				return;
			}
			addData.push(gridData[i]);
		}
	}
	if(addData.length < 1) {
		UIAlert(m("cf.nochange", "没有需要保存的数据！"));
		return;
	}
	
	var records = L5.DataConvert(addData);
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapCmd");				
	cmd.setParameter("records", records);
	cmd.execute("save");
	if(cmd.error){
		sticky(command.error.message, 'error', 'center');
	}else{
		sticky(m("cf.savesucceed", "保存成功!"));
		queryMap();
	}
}

// 删除一行
function delMap(row) {
	if(!gridData[row].id) {
		mapGrid.deleteRow(row);
		return;
	}
	
	$.dialog({
		type: "confirm",
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapCmd");
			command.setParameter("codes", [gridData[row].id]);
			command.execute("delete");
			if(!command.error){
				mapGrid.deleteRow(row);
				sticky(m("cf.deleted", "删除成功！"));
			}else{
				sticky(command.error.message, 'error', 'center');
			}
		},
		cancel: function(){}
	});
}

// 批量删除
function batchDel(){
	var selected_rows = mapGrid.getSelectedRows();
	var selecteds = mapGrid.getSelectedDataItems();
	if(selecteds.length < 1){
		UIAlert(m("cf.choosearecord", "请选择一条记录！"));
		return false;
	}
	var pks = [];
	for(i in selecteds) {
		if(selecteds[i].id)
			pks.push(selecteds[i].id);
	}
	
	$.dialog({
		type: "confirm",
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			if(pks.length < 1) {
				mapGrid.deleteRow(selected_rows);
				sticky(m("cf.deleted", "删除成功！"));
			}else{
				var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapCmd");
				command.setParameter("codes", pks);
				command.execute("delete");
				if(!command.error){
					mapGrid.deleteRow(selected_rows);
					sticky(m("cf.deleted", "删除成功！"));
				}else{
					sticky(command.error.message, 'error', 'center');
				}
			}
		},
		cancel: function(){}
	});
}

// 映射项
function mapItem(row) {
	for(i in gridData) {
		if(gridData[i].state == 1) {
			UIAlert(m("cf.savefirst", "请先保存数据！"));
			return;
		}
	}
	
	var selectedRow = gridData[row];
	var url = "querybizmodelmapitem.jsp" +
			  "?id="+selectedRow.id +
			  "&fromModelId="+selectedRow.fromModelId +
			  "&toModelId="+selectedRow.toModelId;
	window.location.href = url;
	
}