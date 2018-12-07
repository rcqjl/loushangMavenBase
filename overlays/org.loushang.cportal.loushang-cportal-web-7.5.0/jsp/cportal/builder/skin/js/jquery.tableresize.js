(function($) {
	//是否为拖动状态
	var resizing = false;
	//当前是否可拖动
	var resizable = false;
	//每列的最小宽度
	var minWidth = 10;
	//当前拖动的列
	var resizeHeader;
	//参考线
	var refLine;
	//当前表格对象
	var curTable;
	//当前受影响的列
	var refTd;
	//当前受影响的列的位置
	var tdPosition;
	//要调整列的总宽度
	var refWid;
	/**
	 * 表格宽度调整
	 */
	$.tableresize = function ($table) {
		//监听td的mousemove事件
		$table.delegate("td","mousemove",function(e){
			if(CPortal.curDragWidget){
				return;
			}
			var target = $(e.target);
			if(resizing){
				//当已经在拖动变化列宽时
				onDraging(e);
			}else if(fnIsLeftEdge(e)){
				//当鼠标停留在左边框时
				refTd = target.prev();
				//不响应第一列的左边框拖动事件
				if(refTd.length == 0)
					return;
				resizeHeader = target;
				tdPosition = "L";
				refWid = target.width() + refTd.width();
				//当鼠标停在左边框时，设置当前为可拖动状态
				resizable = true;			
				//设置鼠标样式为拖动时的样式
				target.css("cursor", "col-resize");
			}else if(fnIsRightEdge(e)){
				//当鼠标停留在右边框时
				refTd = target.next();
				//不响应最后一列的右边框拖动事件
				if(refTd.length == 0)
					return;
				resizeHeader = target;
				tdPosition = "R";
				refWid = target.width() + refTd.width();
				resizable = true;
				target.css("cursor", "col-resize");	
			}else{
				//超出可拖动的区域，设为不可拖动状态
				resizable = false;
				target.css("cursor", "default");
			}
		});
		//当在拖动列上点击鼠标
		$table.delegate("td","mousedown",function(e){
			onDragingStart(e);
		});
		//当在document上移动鼠标,因为拖动可能超出表格的范围
		$(CPortal.getDocument()).on("mousemove",function(e){
			onDraging(e);
		});
		//当拖动而释放时候未在标题行的释放也需要结束拖动
		$(CPortal.getDocument()).on("mouseup",function(e){
			onDragingEnd(e);
		});
	};
	/**
	 * 计算当前鼠标位置是不是在可拖动的范围内
	 * @param event e目标事件
	 * @side boolean true表示在左边边框附近，false表示右边
	 * @return boolean true在表格边框附近，false未在
	 */
	function _fnIsColEdge(e, side){
		var target = $(e.target);
		var x = e.pageX;
		var offset = target.offset();
		var left = offset.left;
		var right = left + target.outerWidth();
		return side ? x<=left+1 : x >=right-1;
	}
	/**
	 * 计算当前鼠标位置是不是在左边框附近
	 * @param event e目标事件
	 * @return boolean true是， false否
	 */
	function fnIsLeftEdge(e){
		return _fnIsColEdge(e, true);
	}
	/**
	 * 计算当前鼠标位置是不是在右边框附近
	 * @param event e目标事件
	 * @return boolean true是， false否
	 */
	function fnIsRightEdge(e){
		return _fnIsColEdge(e, false);
	}
	/**
	 * 初始化拖动状态
	 * @param event e目标事件
	 * @return void
	 */
	function onDragingStart(e){
		//当前是否为拖动状态
		if(resizable){
			var target = $(e.target);
			var bobj = $("body",$(CPortal.getDocument()));
			//设置当前文本不可选中，否则拖动时会选中文本
			if(!$.browser.mozilla){
				$(CPortal.getDocument()).bind("selectstart", function(){	return false; });
			}else{
				bobj.css("-moz-user-select", "none");
			}
			//创建参考线
			if(!refLine){
				refLine = $("<div style='width:0px;border-style:solid;border-color:#0066FF;border-width: 0 0 0 1px;position:absolute;'></div>");
				refLine.appendTo(bobj[0]);
			}
			//显示参考线
			curTable = resizeHeader.parent().parent();
			refLine.css({"top":curTable.offset().top, "left": e.pageX, "css":"col-resize", "height": curTable.innerHeight()});
			refLine.show();
			//设置为已经在拖动
			resizing = true;
		}
	}
	/**
	 * 列宽拖动中
	 * @param event e目标事件
	 * @return void
	 */
	function onDraging(e){
		//如果已经在拖动
		if(resizing){
			refLine.css("left", e.pageX);
			// 解决拖拽过程中选中其他td问题
			curTable.find("td").removeClass("selected");
			// 选中当前td
			resizeHeader.addClass("selected");
		}
	}
	/**
	 * 鼠标释放拖动结束，改变列宽，结束拖动状态
	 * @param event e目标事件
	 * @return void
	 */
	function onDragingEnd(e){
		//如果已经在拖动
		if(resizing){
			resizing = false;
			//隐藏参考线
			refLine.hide();
			//设置文本可以选中
			if(!$.browser.mozilla){
				$(CPortal.getDocument()).unbind("selectstart");
			}else{
				$("body",$(CPortal.getDocument())).css("-moz-user-select", "");
			}
			//计算设置新的列宽
			doResize(e);
			// 解决拖动过程中选中其他td问题
			curTable.find("td").removeClass("selected");
			// 选中当前td
			resizeHeader.addClass("selected");
			// 解决鼠标松开后移动选中其他td问题
			resizeHeader.trigger("mouseup");
		}
	}
	/**
	 * 设置新的列宽
	 * @param event e目标事件
	 * @return void
	 */
	function doResize(e){
		var pos = resizeHeader.offset();
        var index = resizeHeader.prevAll().length;
        var refindex = refTd.prevAll().length;
        // 事件触发点与td左边框的间距
        var epdiff = e.pageX - pos.left;
        // td的最终宽度
        var lastWid = minWidth;
        // 拖动右边框时
        if(tdPosition == "R"){
            // td宽度的最大值
            var rmdiff = refWid - minWidth;
            // 计算列宽的变化值
            if(epdiff > minWidth){
            	if(epdiff < rmdiff){
            		lastWid = epdiff;
            	}else{
            		lastWid = rmdiff;
            	}				        	
            }
        }else if(tdPosition == "L"){
            // td宽度最大变动值
            var rmdiff = resizeHeader.width() - minWidth;
            // td宽度最小变动值
            var rmrdiff = resizeHeader.width() + minWidth - refWid;
            // 计算列宽的变化值
            if(epdiff < rmdiff){
            	if(epdiff > rmrdiff){
            		lastWid = pos.left + resizeHeader.width() - e.pageX;
            	}else{
            		lastWid = refWid - minWidth; 
            	}            	
            }           
        }
        //设置新列宽
        var colgroups = curTable.prev("colgroup");
        colgroups.children().eq(index).width(lastWid);
        colgroups.children().eq(refindex).width(refWid-lastWid);
	}
})(jQuery);