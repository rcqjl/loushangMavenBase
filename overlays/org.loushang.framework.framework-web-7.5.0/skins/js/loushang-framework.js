/* 
 * Name: Loushang-UI
 * Version: 2.0.0
 * SVN: 13778
 * Date: 2017-03-28
 */

L= {
		version : '1.0'
	};

/*******************************************************************************
 * L 表格 第二种封装
 * @param 表格id
 * @param 表格数据请求的路径
 ******************************************************************************/
L.FlexGrid = function(listId, appUrl, usingOdata) {
	this.listId = listId;  //表格的ID
	this.appUrl = appUrl;
	this.usingOdata = usingOdata || false; // 是否使用odata协议
	this.columnList = [];  //列属性列表
	this.columnDefList = [];  //列定义列表
	this.params = new Object();
	this.returns = new Object();
	this.initData = [];
	this.total;
	this.allData = [];
	// 默认参数列表
	this.defaults = {
		idTypeOdata : "String",
		bProcessing : true,// DataTables载入数据时，是否显示‘进度’提示
		autoWidth : false,// 展开、合起菜单栏时，表格自适应宽度
		lengthMenu : [ 10, 25, 50, 100 ],// 自定义长度菜单的选项
		iDisplayLength : 10,// 分页，每页的显示数量
		lengthChange: true,
		scrollX : "",// 水平滚动
		scrollY : "",
		scrollCollapse: false,
		ordering : true,// 是否启动各个字段的排序功能 ,默认不排序
		order : [],// 默认不设置任何列初始化排序
		info : true,// 是否显示页脚信息，DataTables插件左下角显示记录数
		paging : true,// 是否分页
		bPaginate : true,// 是否显示（应用）分页器
		serverSide: true,
		searching: false,
		colResize: false,
		retrieve: false,
		oScroll :{
			bCollapse: null,
			sX: null,
			sY: null
		},
		callBack : function() {
		},// 表格加载完成回调函数
		stateSave : false,// Datatables设置
							// stateSave选项后，可以保存最后一次分页信息、排序信息，当页面刷新，或者重新进入这个页面，恢复上次的状态。
		stateDuration : 0,// -1 保存到session中， 0~更大保存到localstorage中， 以秒计算
							// 0表示没有时间限制
		trCheckedCallBack : trCheckedCallBack,// 行选中回调
		trUnCheckedCallBack : trUnCheckedCallBack,// 行取消选中回调
		drawCallback : tableDrawCallback,
		format: tableRowFormat
	// 表单加载完成回调
	};
	this.oTable = null;
};

L.FlexGrid.locale = {
    "loadingRecords": "加载中...",
    "zeroRecords": "未查询到记录",
    "info": "显示 _START_ 到 _END_ 条 共 _TOTAL_ 条记录",
    'sSearch': "搜索"
};

//扩展表格对象的实例方法属性
L.FlexGrid.prototype = {
	/***************************************************************************
	 * 表格加载初始化方法
	 **************************************************************************/
	init : function(options) {// 列信息数组
		var _that = this;
		// 将用户自定义的信息赋值给default
		if (options) {
			$.each(options, function(i, val) {
				if (typeof val == 'object' && _that.defaults[i]) {
					$.extend(_that.defaults[i], val);
				} else {
					_that.defaults[i] = val;
				}
			});
		}
		//判断是前台分页还后端分页
		var fnserver = this.retrieveData;
		var url="";
		if(this.defaults.serverSide){
			 fnserver = this.retrieveData
			 url = "" ;
		}else{
			fnserver = "";
			url = this.appUrl;
		}
		this.columnsData(); //初始化列数据
		_that.oTable = $('#' + this.listId).DataTable({
			"grid": _that,  //传L.FlexGrid域
			"aLengthMenu" : this.defaults.lengthMenu,// 自定义长度菜单的选项
			"iDisplayLength" : this.defaults.iDisplayLength,// 分页，每页显示的数量
			"bProcessing" : this.defaults.bProcessing,// DataTables载入数据时，是否显示‘进度’提示
			"order" : this.defaults.order,// 默认无初始列的排序
			"ordering" : this.defaults.ordering,// 是否启动各个字段的排序功能 ,默认不排序
			"bAutoWidth" : this.defaults.autoWidth,// 展开、合起菜单栏时，表格自适应宽度
			"bServerSide" : this.defaults.serverSide,
			"fnServerData" : fnserver,
			"sAjaxSource" : url,
			"retrieve" : false,
			"paging": this.defaults.paging,
			"scrollX" : this.defaults.scrollX,// 水平滚动
			"scrollY": this.defaults.scrollY,//垂直滚动
	        "scrollCollapse": this.defaults.scrollCollapse,//
			"bPaginate" : this.defaults.bPaginate, // 是否显示（应用）分页器
			"bLengthChange" : this.defaults.lengthChange,
			"bInfo" : this.defaults.info, // 是否显示页脚信息，DataTables插件左下角显示记录数
			"columns" : _that.columnList,
			"columnDefs": _that.columnDefList,
			"colResize": this.defaults.colResize,
			"stateSave" : this.defaults.stateSave,// 保存状态
			"stateDuration" : this.defaults.stateDuration,// 保存状态的时间
			"oScroll" :{
				"bCollapse": this.defaults.oScroll.bCollapse,
				"sX": this.defaults.oScroll.sX,
				"sY": this.defaults.oScroll.sY
			},
			"searching": this.defaults.searching,
			"pagingType": "full_numbers",
			"dom": 'f<"H"r>t<"F"ipl><"clearfix">' + (this.defaults.colResize ? 'Z':''),   //支持搜索框的出现
			"language": {
				"processing": "",
			    "lengthMenu": " _MENU_ ",
			    "loadingRecords": L.FlexGrid.locale['loadingRecords'],            
			    "zeroRecords": L.FlexGrid.locale['zeroRecords'],
			    "info": L.FlexGrid.locale['info'],
			    "infoEmpty": "",
			    "sInfoFiltered": "",
			    "sSearch": L.FlexGrid.locale['sSearch'],
			    "emptyTable":"<span class='norecord'></span>",
			    "paginate": {//分页的样式文本内容。
			        "previous": "《",
			        "next": "》",
			        "first": "",
			        "last": ""
			    }
			},
			"initComplete" : function() {// 初始化加载回调函数
				_that.defaults.callBack();
			}, // 结束
			"rowCallback": function(row,data,index){ //为每行的最后一个单元格绘制操作按钮
				var $lasttd = $('td:last-child',row);
				if (options.btnDefs && options.btnDefs.length) {
				   var operationBody = _that.defaults.format(data,options).html();
				   var operationBtn = "<div class='operation-btn'><span class='operation-btn-text'>操作</span><span class='fa fa-angle-double-left'></span></div>";
				   if (!$lasttd.find(".operation").length) {
					   var opr_height = (index + 1) * 40;
					   //防止前端分页时的重绘问题
					   $lasttd.append("<div class='operation' style='top:" + opr_height + "px;'>" + operationBtn + operationBody + "</div>");
				   }
				}
		   },
			"drawCallback" : function(settings) {
				var api = this.api();
				_that.defaults.drawCallback(settings, api);
				if(_that.defaults.scrollY != ""){
					 $(window).bind('resize', function () {
						 _that.oTable.columns.adjust();
					 }); 
				}
			}
		});
		
		return _that.oTable;
	},
	columnsData: function(){
		var _that = this;
		if(_that.columnList.length !== 0){
			return _that.columnList;
		}
		//根据表头信息获取列的定义及列的个性化定义
		var columnList = [];
		var columnDefList = [];
		
		// 根据表头内容创建二维数组thead存储单元格对象,并将每个元素初始化为null
		var thead = [];
		var rows = $('#'+_that.listId+' thead tr').length;
		
		// IE8下面有问题
		// 为了兼容IE8采用以下写法,简单写法$('#'+_that.listId+' thead th:not([colspan])').length,不支持IE8
		var cols = $('#'+_that.listId+' thead th').filter(function(thindex, thelement) {
          return !($(thelement).attr("colspan") > 1);
        }).length;
		
		for(var i = 0; i < rows; i++) {
		  thead.push([]);
		  for(var j = 0; j < cols; j++) {
		    thead[i][j] = null;
		  }
		}
		// 获取表头 
		var $thead = $('#'+_that.listId+' thead');
		// 遍历表头中的每一行
		for(var row = 0; row < rows; row++) {
		  // 遍历每行中的每个单元格
		  $("tr:eq(" + row + ") th", $thead).each(function() {
		    for(var col = 0; col < cols; col++) {
		      // 将单元格根据行列号放置在二维数组thead中
		      if(thead[row][col] == null) {
		        thead[row][col] = this;
		        // 如果有合并行,将合并行的值赋值为0
		        if($(this).attr("rowspan")) {
		          thead[row][col] = this;
		          var rowspan = parseInt($(this).attr("rowspan"), 10);
		          while(rowspan > 1) {
		            thead[row + rowspan - 1][col] = 0;
		            rowspan--;
		          }
		        }
		        // 如果有合并列，将合并列的值赋值为0
		        if($(this).attr("colspan")) {
		          thead[row][col] = this;
		          var colspan = parseInt($(this).attr("colspan"), 10);
                  while(colspan > 1) {
                    thead[row][col + colspan - 1] = 0;
                    colspan--;
                  }
		        }
		        break;
		      }
		    }
		  });
		}
		
		// 遍历二维数组thead并拼接column和columnDef信息
		$.each(thead, function(trindex, trelement) {
		  $.each(trelement, function(thindex, thelement) {
		    var columnMap = {};
		    var columnDefMap = {};
		    
		    if(thelement != 0) {
		      if($(thelement).attr("data-field")) {
		        columnMap["data"]=$(thelement).attr("data-field");
		        columnMap['bSortable'] = true;
		        columnMap['visible'] = true;
		      }
		      if($(thelement).attr("data-sortable")){
		        columnMap["bSortable"] = ($(thelement).attr("data-sortable") === 'true');
              }
		      
		      //此列是否隐藏
		      columnMap['visible'] = !($(thelement).attr("data-hidden") === 'true');
		      
		      if($(this).attr("data-render")){
		        var render = $(this).attr("data-render");//根据方法名生成对应的方法
		        columnDefMap["targets"] = thindex;
                columnDefMap["data"] = $(this).attr("data-field");
                
                if(render == "checkbox" && typeof render == "string"){
                    columnDefMap["render"] = function(data,type,full){
                      return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
                    }
                }else if(render == "radio" && typeof render == "string"){
                    columnDefMap["render"] = function(data,type,full){
                      return '<input type="radio" value="' + data + '" title="' + data + '" id="radio" name="radiolist"/>';
                    }
                }else if(render == "num" && typeof render == "string"){
                    columnDefMap["render"] = function(data,type,full,meta) {
                       var rowId = meta.settings._iDisplayStart + meta.row + 1
                       return rowId;
                    }
                } else {
                  columnDefMap["render"] = eval(render);
                }
                columnDefList.push(columnDefMap);
		      }
		      
		      if(!$.isEmptyObject(columnMap)) {
		        columnList[thindex] = columnMap;
		      }
		    }
		  });
		});
		_that.columnList = columnList;
		_that.columnDefList = columnDefList;
	},
	/***************************************************************************
	 * 表格加载 数据请求
	 **************************************************************************/
	retrieveData: function(sSource, aoData, fnCallback, oSettings){
		//分页信息
		var start = aoData[3].value;
		var limit = aoData[4].value;
		var _that = oSettings.oInit.grid;
		
		// 判断是否分页，如果不分页，则传递limit为-1
		var paging = _that.defaults.paging;
		if (paging) {
			// 分页信息
			_that.setParameter("start", start);
			_that.setParameter("limit", limit);
			_that.setParameter("dataTotal",true);
		} else {// 不分页
			_that.setParameter("limit", -1);
		}
		
		// 启用排序功能
		if (_that.defaults.ordering) {			
			//排序信息
			//如果有排序信息
			if((aoData[2].value).length > 0){
				//单列排序
				if((aoData[2].value).length == 1){
					var columnIndex = (aoData[2].value)[0].column;
					var order = (aoData[2].value)[0].dir;
					var columnName = (aoData[1].value)[columnIndex].data;
					
					_that.setParameter("orderfield", columnName);
					_that.setParameter("orderdir", order);
				} else {
					//排序信息集合
					var sortList = [];
					//多列联合排序
					for(var i = ((aoData[2].value).length - 1); i >= 0; i--){
						//排序信息map对象 包含两个key field 列信息  dir   排序方向
						var sortMap = new Object();
						var columnIndex = (aoData[2].value)[i].column;
						var order = (aoData[2].value)[i].dir;
						var columnName = (aoData[1].value)[columnIndex].data;
						if(i > 0){
							sortMap["orderfield"] = columnName;
							sortMap["orderdir"] = order;
							sortList.push(sortMap);
						} else if(i == 0){
							_that.setParameter("orderfield", columnName);
							_that.setParameter("orderdir", order);
						}
					}
					_that.setParameter("multisort", sortList);
				}
			}
		}
		_that.execute(_that);		
		
		var initData = _that.initData;
		var draw = aoData[0].value;
		var length = initData.length;
		var total = _that.total;
		var json = {
			"draw": draw,
			"iTotalRecords": total,
			"iTotalDisplayRecords": total,
			"aaData": initData
		};
		//渲染数据
		fnCallback(json);
		
		
		if($("table>thead>tr>th input[type='checkbox']").prop("checked")){
			$("table>thead>tr>th input[type='checkbox']").prop("checked", false);
		}
		// checkbox绑定全（不）选定事件
		$("table>thead>tr>th input[type='checkbox']").on("click",function(e){
			$(this).closest('table').find('input:checkbox').not(this).prop('checked', this.checked);
		});
		// 表格行内，单选多选点击时，触发给当前行增加\删除类
		$("table>tbody>tr>td input[type='checkbox']").on("click", function(e) {
		  if (!$(this).is('input:checkbox')) {
            var $checkbox = $(this).closest('tr').find('input:checkbox');
            $checkbox.prop('checked', !$checkbox.is(":checked"));
          }
          var $table = $(this).closest('table');
          var $checkboxes = $table.find('tbody input:checkbox');
          var $checked = $table.find('tbody input:checked');
          var $checkAll = $table.find('thead input:checkbox');
          var curStatus = $checked.length === $checkboxes.length;
          if ($checkAll.is(":checked") ^ curStatus) {
              $checkAll.prop('checked', curStatus);
          }
		});
		$(".table>tbody>tr>td input[type='radio']").on("click", function(e) {
			if(e.target.checked){
				$(this).parents("tr").siblings().removeClass("selected");
				$(this).parents("tr").addClass("selected");
				_that.defaults.trCheckedCallBack(this);
			}else{
				$(this).parents("tr").removeClass("selected");
				_that.defaults.trUnCheckedCallBack(this);
			}
		});
		
		//为每行操作按钮添加折叠事件
		$(".table>tbody>tr>td").on("click", ".operation-btn", function() {
			var $disCell = $(this).next(".operation-body");
			var $txt = $(this).find('.operation-btn-text');
			if ($disCell.css("display") == "none") {
				$txt.hide();
				$disCell.show(100).css('display', 'table-cell');
				$(this).find('.fa-angle-double-left').removeClass('fa-angle-double-left').addClass('btn ue-btn fa-angle-double-right');
			} else {
				$(this).find('.fa-angle-double-right').removeClass('btn ue-btn fa-angle-double-right').addClass('fa-angle-double-left');
				$disCell.hide(100, function() {
					$txt.show();
				});
			}
		});
	},
	
	/**
	 * 设置初始化表格的数据
	 * @method setInitData
	 * @param {Object} data 参数名称
	 */
	setInitData: function(data){
		this.initData = data;
	},
	
	/**
	 * 获得初始化表格的数据
	 * @method getReturn
	 * @return {Oject} 值
	 */
	getInitData: function(){
		return this.initData;
	},
	
	/***************************************************************************
	 * 设置grid的列
	 * 
	 * @param columnData
	 *            列信息数组
	 **************************************************************************/
	setColumns : function(columnData) {
		this.columns = columnData;
	},
	
	/**
	 * 设置提交到服务器的参数
	 * @method setParameter
	 * @param {String} key 参数名称
	 * @param {String} value 参数值
	 */
	setParameter: function(key, value){
	   this.params[key]=value;
	},
	
	/**
	 * 根据键值从map对象中取值
	 * 
	 * @method get
	 * @param {String}key键值
	 * @return {Oject} 值
	 */
	getParameter: function(key) {
		var val = this.params[key];
		return val;
	},
	
	/**
	 * 获取初始化的所有值
	 * 
	 * @method get
	 * @return {Oject} 值
	 */
	getAllData: function(){
		return this.allData;
	},
	/**
	 * 获得服务器返回的参数
	 * @method getReturn
	 * @param {String} key 参数名称
	 * @return {String} 参数对应的值
	 */
	getReturns: function(key){
		var val = this.returns[key];
		return val;
	},
	
	/**
	 * 执行ajax
	 * @method execute
	 * @param {Boolean} sync 是否同步执行，默认为true
	 */
	execute: function(_that,sync){
		if(sync == false || sync == "false"){
			sync = false;
		}else{
			sync = true;
		}
		var url = _that.appUrl;	
    var json = JSON.stringify(this.params);
    
    if(_that.usingOdata) { // 如果是odata标准服务
      var tempParam = $.extend({}, this.params);
      var arr = [];
      
      // 若含有limit属性且limit值不为-1,则添加分页信息
      if(('limit' in tempParam) && tempParam['limit'] != -1) {
    	  if(tempParam['dataTotal']){
    		  arr.push('$count=true');
    		  delete tempParam.dataTotal;
    	  }
        arr.push('$skip=' + tempParam['start']);
        arr.push('$top=' + tempParam['limit']);
      }
      // 删除分页信息
      delete tempParam['start'];
      delete tempParam['limit'];
      
      // 设置排序信息
      if("orderfield" in tempParam) {
        arr.push("$orderby=" + tempParam['orderfield'] + " " + tempParam['orderdir']);
      }
      // 删除排序信息
      delete tempParam['orderfield'];
      delete tempParam['orderdir'];
      
      if(!$.isEmptyObject(tempParam)) {
        var filter = "$filter";
        var separator = "=";
        
        // 如果url中存在$filter,则不再添加$filter
        if(url.indexOf("$filter") != -1) {
          var filterStr = url.substring(url.indexOf('$filter'));
          var connectorIndex = filterStr.indexOf('&');
          if(connectorIndex != -1) {
            filter = filterStr.substring(0, connectorIndex);
            // 删掉$filter重新添加
            url = url.replace(filter + '&', '');
          } else {
            filter = filterStr;
            // 删掉$filter重新添加
            url = url.replace(filter, '');
          }
          
          separator = ' and ';
        }
        for(var key in tempParam) {
          filter += separator;
          var item = tempParam[key];
          for(var k in item) {
            if(k == 'contains' || k == 'startswith' || k == 'endswith') {
              filter += k + "(" + key + "," + item[k] + ")";
            } else {
              filter += key + " " + k + " " + item[k];
            }
          }
          separator = " and ";
        }
        
        // $filter=之后必须带有参数才追加到url后面,否则舍弃$filter
        if(filter != '$filter=') {
          arr.push(filter);
        }
      }
      if(arr.length != 0){
        if(url.indexOf('?') == -1) {
          url += "?";
        } else if(url.indexOf('$') != -1){
          url += "&";
        }
    	  url += arr.join("&");
      }
      try{
        $.ajax({
          url : url,
          type : "GET",
          async : !sync,
          contentType: "application/json",
          dataType: "json",
          success : function(data){
            _that.initData = data['value'];
            _that.total = data['@odata.count'];
            _that.allData = data;
          },
          error : function(data, textstatus){
            $.dialog({
               type:"alert",
               content:data.responseText,
               autofocus: true
             });
          }
        });
      }catch(e){
        throw "请求数据出错";
      }
    } else {
      try{
        $.ajax({
          url : url,
          type : "POST",
          async : !sync,
          contentType: "application/json",
          
          dataType: "json",
          data: json,
          success : function(data){
            _that.initData = data.data;
            _that.total = data.total;
            _that.allData = data;
          },
          error : function(data, textstatus){
            $.dialog({
               type:"alert",
               content:data.responseText,
               autofocus: true
             });
          }
        });
      }catch(e){
        throw "请求数据出错";
      }
    }
	},
	
	/**
	 * 重新加载数据 可使用新的数据源
	 * ***/
	reload : function(url, param, resetPaging){//重新加载数据
		var _that = this;
		if(url){
			this.appUrl = url;
			_that.oTable.ajax.url(url);
		}
		if(param){
			this.params = param;
			_that.oTable.ajax.params(param);
		}
		if(resetPaging){
			this.resetPaging = resetPaging;
		}
		_that.oTable.ajax.reload(null, resetPaging); //resetPaging true从地一页开始加载，resetPaging false 从本页加载

	}
};

//空方法
//行选中回调
function trCheckedCallBack(obj) {

}
//行取消回调
function trUnCheckedCallBack(obj) {

}
//表格加载回调
function tableDrawCallback(settings, api) {

}
//表格行操作按钮
function tableRowFormat(data,options){
	var containerBtn = $('<div class="btn-group operation-body"></div>');
	//btnDefs可传两种类型的值：function和object
	if(typeof options.btnDefs == "function"){
		item = options.btnDefs(data);
		containerBtn.append(item);
	}else if(typeof options.btnDefs == "object"){
		for (var i = 0; i < options.btnDefs.length; i++) {
			var item = $('<button class="btn ue-btn" type="button">' + 
							'<span class="' + options.btnDefs[i].icon + '"></span>'+ options.btnDefs[i].text + 
						'</button>');
			item[0].setAttribute("onclick", options.btnDefs[i].handler + "("+ JSON.stringify(data) +")");
			containerBtn.append(item);
		}
	}
	return $('<div></div>').append(containerBtn);
}


//slickGrid
L.EditGrid = function(gridId,url,usingOdata) {
	this.gridId = gridId;  //表格的ID
	this.url = url;	//请求数据的地址
	this.usingOdata = usingOdata || false; // 是否使用odata协议
/*	this.widthType = "%";
*/	this.params = {
		start: 0,
		limit: 10,
		dataTotal: true
	};
	this.changedRows = [];
	// 默认参数列表
	this.defaults = {
		paging: true,
		lengthMenu: [ 10, 25, 50, 100 ],
		info: true,
		editable:true,
		autoEdit: true,
		autoHeight: true,
		colresizable:true,
		widthType: "%",
		rerenderOnResize: true,
		selectActiveRow: false,	// 点击行时将其选中，并将其余行取消选中
		multiSelect: true, // true：多选(Ctrl+左键单击行)；false：单选；默认：true。
		defaultColumnWidth: 20, // 默认列宽
		enableTextSelectionOnCells: true,
		forceFitColumns:true,
		lastRendering: 0,  
		isNextMerged: 0,  
		changedCells: {}  

	};
	this.oTable = null;
	this.pageBar = null;
	this.dataView = null;
}

// 对象原型方法
L.EditGrid.prototype = {
		init: function(options) {
			var _that = this;
			options = $.extend(_that.defaults, options);
			
			var gridId = _that.gridId + "_ls";
			var columns = _that.getColumns();
			
			// 创建表格容器元素
			$("#" + _that.gridId).after("<div id="+gridId+" class='grid'></div>");
			$("#" + _that.gridId).hide();
			_that.dataView = new Slick.Data.DataView({inlineFilters: true});
			_that.oTable = new Slick.Grid("#" + gridId, _that.dataView, columns, options);
			_that.dataView.setIdProperty("rowId");
			//行的改变
			_that.dataView.onRowCountChanged.subscribe(function (e, args) {
				_that.oTable.updateRowCount();
				_that.oTable.render();
				var changes = options.changedCells;  
				_that.oTable.setCellCssStyles('cell-noneline-bottom', changes);  
            });
			//行数的改变
			_that.dataView.onRowsChanged.subscribe(function (e, args) {
				_that.oTable.invalidateRows(args.rows);
				_that.oTable.render();
			});
			
			_that.dataView.setFilter(filter); //过滤删除的数据state="2"
			var url = _that.url;
			// 是否分页
			if(_that.defaults.paging) {
				var pageId = _that.gridId + "_ls_page";
				$("#" + gridId).after("<div id="+pageId+" class='page'></div>");
				_that.params["limit"] = options.lengthMenu[0];
				this.pageBar = new Slick.Controls.Pager({
					usingOdata:_that.usingOdata,//是否使用odata请求数据
					type:(_that.usingOdata == false) ? "POST" : "GET",
					"usingOdata":_that.usingOdata,
					url: _that.url,
					params: _that.params,
					options: options,
					container: $("#" + pageId), 
					datagrid: _that.oTable,
					dataView: _that.dataView
				});
			}else{
				_that.params["limit"] = -1;
				$.ajax({
					url : url,
					type :(_that.usingOdata == false) ? "POST" : "GET",
					async : false,
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(_that.params),
					success : function(rtdata){
						if(_that.usingOdata){
							var data = rtdata.value;
						}else{
							var data = rtdata.data;
						}
						for(var i = 0,datalen=data.length ; i < datalen; i++) {
							 data[i]["rowId"] = i;//添加行号
							 if(_that.usingOdata){//初始化状态
								 	data[i]["state"] = 0;
								}
						}	
						_that.dataView.setItems(data);
						_that.oTable.render();
					},
					error : function(data, textstatus){
						$.dialog({
							 type:"alert",
							 content:data.responseText,
							 autofocus: true
						 });
					}
				});
			}
			_that.oTable.setSelectionModel(new Slick.RowSelectionModel({
				selectActiveRow:options.selectActiveRow
			}));
			
			//AutoTooltips
			_that.oTable.registerPlugin( new Slick.AutoTooltips({ enableForHeaderCells: true }) );
			
			if(_that.checkboxSelectColumn) {
				_that.oTable.registerPlugin(_that.checkboxSelectColumn);
			}
			if(_that.defaults.widthType == "%") {
				_that.oTable.autosizeColumns();	//自动调整列宽
			}
			//浏览器改变，宽度自适应
			window.onresize = function(){
				_that.oTable.resizeCanvas();
			}
			// 初始化事件
			this.initEvent(_that);
			
			return _that.oTable;
		},
		// 绑定事件
		initEvent: function(grid) {
			// 绑定单元格值的改变事件，用于获取变动的数据
			grid.oTable.onCellChange.subscribe(function(e,args){
				if(args.item['state'] == 0){
					args.item["state"] = 3;
				}
			});
			//绑定排序
			grid.oTable.onSort.subscribe(function(e,args){
				var comparer = function(a,b){
					return (a[args.sortCol.field]>b[args.sortCol.field])?1:-1;
				}
				grid.dataView.sort(comparer,args.sortAsc);
			})
			
			//绑定校验
			grid.oTable.onValidationError.subscribe(function(e, args){
				$.dialog({
					type: "alert",
					content: args["validationResults"]["msg"]
				});
			});
			
			//最后一个编辑的单元格中数据获取不到问题修改
            $('.grid-canvas').on('blur', 'input, select, textarea', function() {
                if(!$(this).parent().hasClass("date")) {
                    window.setTimeout(function() {
                        if (grid.oTable.getEditorLock().isActive()) {
                            grid.oTable.getEditorLock().commitCurrentEdit();
                            grid.oTable.resetActiveCell();
                        }
                    });
                }
            });
			
		},
		// 获取变动的数据，即state的值为1、2、3的行
		getChangedData: function() {
			var changedData = [];
			var data = this.dataView.getItems();
			for(var i = 0,datalen=data.length ; i < datalen; i++) {
				delete data[i].rowId;
				if(data[i]["state"] != 0) {
					changedData.push(data[i]);
				}
			}
			return changedData;
		},
		// 更新单元格
		updateItem: function() {
		    if(arguments.length == 2) {
		        var id = +arguments[0];
		        var item = arguments[1];
		        if(item['state'] != 1) {
		            item['state'] = 3;
		        }
		        item['rowId'] = id;
		        this.dataView.updateItem(id, item);
		    } else if(arguments.length == 3) {
		        var id = +arguments[0];
		        var field = arguments[1];
		        var value = arguments[2];
		        var item = this.dataView.getItem(id);
		        item[field] = value;
		        item['rowId'] = id;
		        if(item['state'] != 1) {
                    item['state'] = 3;
                }
		        this.dataView.updateItem(id, item);
		    } else {
		        console.log("参数非法");
		    }
		},
		//Odata服务进行新增保存
		postByOdata: function(uri,param) {
			$.ajax({
	    		url : uri,
	    		type : "POST",
	        	contentType: "application/json",
	    		data: JSON.stringify(param),
	    		async:false,
	    		success : function(data){
	    		},
	    		error : function(data){
	    			odataErrorInfo=odataErrorInfo+JSON.stringify(data);
	    		}
	    	});			
		},
		
		//Odata服务进行删除
		deleteByOdata: function(uri) {
			  $.ajax({
					 url : uri,
					 type : "DELETE",
					 contentType: "application/json",
					 async:false,
					 success : function(data){
					 },
					 error : function(data){
						 odataErrorInfo=odataErrorInfo+JSON.stringify(data);
					 }
			  });
		},
		
		//Odata服务进行修改
		updateByOdata: function(uri,param) {
			$.ajax({
	    		url : uri,
	    		type : "PUT",
	        	contentType: "application/json",
	    		data: JSON.stringify(param),
	    		async:false,
	    		success : function(data){
	    		},
	    		error : function(data){
	    			odataErrorInfo=odataErrorInfo+JSON.stringify(data);	
	    		}
	    	});			
		},
		
		//Odata服务进行查询
		getByOdata: function() {
			
		},
		
		//Odata服务根据变动的数据进行保存
		saveChangedDataByOdata: function(url,id) {
			odataErrorInfo="";
			var changedRows = grid.getChangedData();

			for(var key in changedRows){
				var item=changedRows[key];
				if(item.state==2){
					if(this.defaults.idTypeOdata=="String"){
						var uri = url+"('"+item[id]+"')";
						grid.deleteByOdata(uri);
					}else{
						var uri = url+"("+item[id]+")";
						grid.deleteByOdata(uri);
					}
				}else if(item.state==3){
					var idMark =item[id];
					delete item["state"];
					delete item[id];
					var param=item;
					if(this.defaults.idTypeOdata=="String"){
						var uri = url+"('"+idMark+"')";
						grid.updateByOdata(uri,param);
					}else{
						var uri = url+"("+idMark+")";
						grid.updateByOdata(uri,param);
					}
				}else if(item.state==1){
					var idMark =id;
					delete item["state"];
					if(this.defaults.idTypeOdata=="String"){
						item[id]=createUUID();
						var param=item;
						var uri = url;
						grid.postByOdata(uri,param);
					}else{
						var param=item;
						var uri = url;
						grid.postByOdata(uri,param);
					}
				}
			}
			
			errorInfo=odataErrorInfo;
			this.odataErrorInfo="";
			if(errorInfo==""){
				return true;
			}else{
				return errorInfo;
			}
		},
		
		//获取被选中的所有行的数据
		getSelectedDataItems: function(){
			var grid = this.oTable;
			 var items = grid.getSelectedRows().map(function (x) {
			     return grid.getDataItem(x);
			 });
			 for(var i = 0, datalen = items.length;i<datalen; i++){
				 delete items[i].rowId;
			 }
			 return items;
		},
		
		// 获取列定义
		getColumns: function() {
			var instance = this;
			var columns = [];
			var $ths = $("#" + this.gridId + " th");
			$ths.each(function(i, th){
				var field = th.getAttribute("data-field");
				var name = $(th).text();
				var render = th.getAttribute("data-render");
				var editor = th.getAttribute("data-editor");
				var formatter = th.getAttribute("data-render");
				var sort = th.getAttribute("data-sortable");
				var validator = th.getAttribute("data-validator");
				var width = parseInt(th.getAttribute("width"));
				var hidden = th.getAttribute("data-hidden"); 
				if(render == "checkbox" && typeof render == "string") {
					instance.checkboxSelectColumn = new Slick.CheckboxSelectColumn({multiSelect:true});
					columns.push(instance.checkboxSelectColumn.getColumnDefinition());
					return true;
				}
				if(render == "radio" && typeof render == "string"){
					instance.checkboxSelectColumn = new Slick.CheckboxSelectColumn({multiSelect:false});
					columns.push(instance.checkboxSelectColumn.getColumnDefinition());
					return true;
				}
				
				var col = {};
				col["id"] = col["field"] = field;
				col["name"] = name;
			
				switch(editor) {
					case "text":
						col["editor"] = Slick.Editors.Text;
						break;
					case "select":
						col["editor"] = Slick.Editors.SelectEditor;
						var source = th.getAttribute("data-source");
						if(void 0 == source) {
							alert("下拉框需要设置data-source属性");
							columns = false;
							return false;
						}
						if (typeof(eval(source)) == "function") {
							source = window[source]();
							if(typeof(source) == "string") {
								source = eval("("+source+")");
							}
						}else if(typeof(source) == "string"){
							source = eval("("+source+")");
						}
						
						col["source"] = source;
						break;
					case "date":
						col["editor"] = Slick.Editors.MonthDateEditor;
						break;
						
					default:
						break;
				}
				if(hidden){
					col["cssClass"] = "ue-slickGrid-hidden";
					col["headerCssClass"] = "ue-slickGrid-hidden";
					col["maxWidth"] = 0;
					col["minWidth"] = 0;
					col["width"] = 0;
				}else {
					if(width){
						col["width"] = width;
					}else{
						col["width"] = instance.defaults.defaultColumnWidth;
					}
				}
				if(formatter) {
					col["formatter"] = eval(formatter);
				}
				if(sort) {
					col["sortable"] = sort;
				}
				if(validator){
					col["validator"] = eval(validator);
				}
				col["resizable"] = instance.defaults.colresizable;
				columns.push(col);
			});
			
			return columns;
		},
		/**
		 * 增加一行
		 **/
		 addRow: function(rowData) {
			 if(!rowData["rowId"]){
				 rowData["rowId"] = this.dataView.getLength();
			 }
			 rowData["state"] = 1;
             this.dataView.addItem(rowData);
		 },
		 
		 /**
		 * 删除一行
		 **/
		  deleteRow: function(){
			 var grid = this.oTable;
			 var dview = this.dataView;
			 var row = grid.getSelectedRows();//获取被选择所有行的行号
			 if(row==undefined || row==null || row==""){
				 $.dialog({
					 type: "alert",
					 content: L.EditGrid.locale['select_record']
				 });
				return;
			 }
			 $.dialog({
				 type: "alert",
				 content: L.EditGrid.locale['delete_data'],
				 ok:function(){
					 var current_rows;
					 if(!isNaN(row)){
						 current_rows=[row];
					 }else{
						 current_rows=row;
					 }

					 /*var data=dview.getItems().filter(function(e){ //过滤掉原先删除状态的数据
						 return e.state != 2;
					 });*/
					 var data = dview.getItems();
					 var temp = [];
					 for(var i = 0, len = data.length; i < len; i++) {
					     if(data[i].state != 2) {
					         temp.push(data[i]);
					     }
					 }
					 data = temp;
					 for(var i=0,len=current_rows.length;i<len;i++){
						 if(current_rows[i] < data.length){
							 data[current_rows[i]]["state"] = 2;
						 }
					 }
					dview.refresh();//过滤刷新
					grid.setSelectedRows([]);
				 }
			 });
		 },
		/**
		 * 设置提交到服务器的参数
		 * @method setParameter
		 * @param {String} key 参数名称
		 * @param {String} value 参数值
		 */
		setParameter: function(key, value){
		   this.params[key]=value;
		},
		/**
		 * 重新加载数据 可使用新的数据源
		 * 
		 **/
		reload : function(_url,_params){
			var _that = this;
			if(_url){
				this.url=_url;
			}
			if(_params){
				this.params.params=_params;
			}	
			//处理odata服务请求的url
			if(_that.usingOdata) { // 如果是odata标准服务
				var url = this.url;
			    var json = JSON.stringify(this.params.params);
			      var tempParam = $.extend({}, this.params);
			      var arr = [];
			      
			      // 若含有limit属性且limit值不为-1,则添加分页信息
			      if(('limit' in tempParam) && tempParam['limit'] != -1) {
			        if(tempParam['dataTotal']){
			          arr.push('$count=true');
			          delete tempParam.dataTotal;
			        }
			        arr.push('$skip=' + tempParam['start']);
			        arr.push('$top=' + tempParam['limit']);
			      }
			      // 删除分页信息
			      delete tempParam['start'];
			      delete tempParam['limit'];
			      
			      // 设置排序信息
			      if("orderfield" in tempParam) {
			        arr.push("$orderby=" + tempParam['orderfield'] + " " + tempParam['orderdir']);
			      }
			      // 删除排序信息
			      delete tempParam['orderfield'];
			      delete tempParam['orderdir'];

			      tempParam=this.params.params;
			      if(!$.isEmptyObject(tempParam)) {
			        var filter = "$filter";
			        var separator = "=";
			        
			        // 如果url中存在$filter,则不再添加$filter
			        if(url.indexOf("$filter") != -1) {
			          var filterStr = url.substring(url.indexOf('$filter'));
			          var connectorIndex = filterStr.indexOf('&');
			          if(connectorIndex != -1) {
			            filter = filterStr.substring(0, connectorIndex);
			            // 删掉$filter重新添加
			            url = url.replace(filter + '&', '');
			          } else {
			            filter = filterStr;
			            // 删掉$filter重新添加
			            url = url.replace(filter, '');
			          }
			          
			          separator = ' and ';
			        }
			        for(var key in tempParam) {
			          filter += separator;
			          var item = tempParam[key];
			          for(var k in item) {
			            if(k == 'contains' || k == 'startswith' || k == 'endswith') {
			              filter += k + "(" + key + "," + item[k] + ")";
			            } else {
			              filter += key + " " + k + " " + item[k];
			            }
			          }
			          separator = " and ";
			        }
			        
			        // $filter=之后必须带有参数才追加到url后面,否则舍弃$filter
			        if(filter != '$filter=') {
			          arr.push(filter);
			          //将filter参数传递给分页插件
			          _that.params["filter"]=filter;
			        }
			      }
			      if(arr.length != 0){
			        if(url.indexOf('?') == -1) {
			          url += "?";
			        } else if(url.indexOf('$') != -1){
			          url += "&";
			        }
			        url += arr.join("&");
			        
			      }
			}else{
				var url = _that.url; 
			}
			$.ajax({
				url : url,
				type : (_that.usingOdata == false) ? "POST" : "GET",
				async : false,
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(_that.params),
				success : function(rtdata){
					if(this.type=="GET"){
						var data = rtdata.value;
						for(var i = 0,datalen=data.length ; i < datalen; i++) {
							 data[i]["rowId"] = i;//添加行号
							 if(_that.usingOdata){//初始化状态
								 	data[i]["state"] = 0;
								}
						}	
						_that.dataView.setItems(data);
						_that.oTable.invalidate();
						_that.dataView.refresh();
						if(_that.defaults.paging) {
							if(rtdata.data == ""){
								$(".recordstate").css("display","none");
								return;
							}else {
								if(rtdata.value == ""){
									$(".recordstate").css("display","none");
									return;
								}
								$(".recordstate").css("display","block");
								data["total"]=rtdata["@odata.count"];
								_that.pageBar.loadPageInfo(1,data,_that.params,url);
							}
							
							
						}
						
					}else{
						var data = rtdata.data;
						for(var i = 0,datalen=data.length ; i < datalen; i++) {
							 data[i]["rowId"] = i;//添加行号
							 if(_that.usingOdata){//初始化状态
								 	data[i]["state"] = 0;
								}
						}	
						
						
						_that.dataView.setItems(data);
						_that.oTable.invalidate();
						_that.dataView.refresh();
						

						if(_that.defaults.paging) {
							//_that.pageBar.param = _that.params;
							if(rtdata.data == ""){
								$(".recordstate").css("display","none");
								return;
							}else {
								$(".recordstate").css("display","block");
								_that.pageBar.loadPageInfo(1, rtdata,_that.params,_that.url);
							}
						}
					}
					
				},
				error : function(data, textstatus){
					$.dialog({
						 type:"alert",
						 content:data.responseText,
						 autofocus: true
					 });
				}
			});
		}
};
function filter(items){
	 if(items["state"]=="2"){
		return false; 
	 }
	 return true;
}

//校验是否为数字
function isNumber(value) {
	var reg = /^[0-9]*$/;
	if(!reg.test(value)) {
    	return {valid: false, msg: L.EditGrid.locale['msg_isNumber']};
	}
	return {valid: true, msg: null};
}
//浮点数校验规则
function isFloat(value){
	var regx = /^(-?\d+)(\.\d+)?$/;
	if(!reg.test(value)) {
    	return {valid: false, msg: L.EditGrid.locale['msg_isFloat']};
	}
	return {valid: true, msg: null};
}
//字符串
function isString(value){
	var regx = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/;
	if(!regx.test(value)){
		return {valid: false,msg:L.EditGrid.locale['msg_isString']};
	}
	return {valid: true, msg: null};
}
//邮箱校验规则
function isEmail(value){
	var regx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if(!regx.test(value)){
		return {valid: false, msg: L.EditGrid.locale['msg_isEmail'] };
	}
	return {valid: true, msg: null};
}

//网址校验规则
function isUrl(value){
	var regx = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
	if(!regx.test(value)){
		return {valid: false, msg: L.EditGrid.locale['msg_isUrl'] };
	}
	return {valid: true, msg: null};
}

//创建没有分割-的uuid
function createUUID(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";//添加uuid中间的-
    var uuid = s.join("");
    return uuid;
}

L.EditGrid.locale = {
    'select_record': '请选择记录',
	'delete_data': '确定删除数据？',
	'msg_isNumber': '请填写数字！',
	'msg_isFloat': '请填写正确的浮点数！',
	'msg_isString': '非法字符串！',
	'msg_isEmail': '请填写正确的邮箱地址！',
	'msg_isUrl': '请填写正确的url！'
};