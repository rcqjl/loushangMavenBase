// 表格操作
function TableUtil(arg0) {
	var table = arg0.table;
	var testdel = arg0.testdel || function() {
		return 1;
	};

	var cells = null; // 单元格数组
	var ctom = null; // 单元格-矩阵
	var mtoc = null; // 矩阵-单元格
	var columns = null; // 列数组

	var selectedTds = null; // 当前选择的单元格
	var coordinates = null; // 坐标

	/**
	 * cd:can do
	 */
	var cd_merge = false;
	var cd_split = false;
	var cd_delrow = false;
	var cd_delcol = false;
	var cd_addrow = true;
	var cd_addcol = true;

	// 对选中的单元格着色
	function paint(selectedCells) {
		if (!selectedCells) {
			return;
		}

		// 首先取消所有单元格的着色
		$.each(cells, function(i, cell) {
			$(cell).removeClass('selected');
		});

		// 然后对选中的单元格着色
		$.each(selectedCells, function(i, selectedCell) {
			$(selectedCell).addClass('selected');
		});
	}

	// 对新td做某些设置
	function setCell(cell) {
		cell.vAlign = 'top';
		return cell;
	}

	// 拆分单元格
	function ac_split() {
		if (!cd_split)
			return;
		var td = selectedTds[0];
		var tr = td.parentNode;
		var ri = tr.rowIndex;
		var ci = td.cellIndex;
		var rs = td.rowSpan;
		var cs = td.colSpan;
		var i, j, k, n = 1;

		td.rowSpan = td.colSpan = 1;
		// 处理跨列
		for (i = 1; i < cs; i++) {
			selectedTds[n++] = setCell(tr.insertCell(ci + i));
		}

		// 处理跨行
		for (i = 1; i < rs; i++) {
			for (j = 0; j < ctom[ri + i].length; j++)
				if (ctom[ri + i][j][1] > ctom[ri][ci][1])
					break;
			for (k = 0; k < cs; k++)
				selectedTds[n++] = setCell(table.rows[ri + i].insertCell(j));
		}

		firstTd = td;
		paint(selectedTds);
		prepare();
		ms_select_end();
	}

	// 合并单元格
	function ac_merge() {
		if (!cd_merge)
			return;
		var a = selectedTds;
		var b = coordinates;
		var td = firstTd = a[0];
		var i, j, de, col, cois, node, tr;
		var mt1, mt2, t1, t2, eq;

		td.rowSpan = b.r2 - b.r1 + 1;
		td.colSpan = b.c2 - b.c1 + 1;

		i = a.length;
		while (--i) {
			while (a[i].firstChild)
				td.appendChild(a[i].firstChild);

			de = ctom[a[i].parentNode.rowIndex][a[i].cellIndex].detail;
			for (j = 0; j < de.length; j++)
				mtoc[de[j][0]][de[j][1]] = td;

			a[i].parentNode.removeChild(a[i]);
		}

		mt1 = mt2 = null;
		i = mtoc.length;
		while (i--) {
			mt2 = [];
			t1 = t2 = null;
			for (j = 0; j < mtoc[i].length; j++) {
				t2 = mtoc[i][j];
				if (t2 != t1) {
					mt2.push(t2);
					t1 = t2;
				}
			}
			if (mt1 && mt1.length == mt2.length) {
				eq = true;
				for (j = 0; j < mt1.length; j++)
					if (mt1[j] != mt2[j]) {
						eq = false;
						break;
					}
				if (eq) {
					for (j = 0; j < mt1.length; j++)
						mt2[j].rowSpan--;
				}
			}
			mt1 = mt2;
		}

		mt1 = mt2 = null;
		cois = [];
		j = mtoc[0].length;
		while (j--) {
			mt2 = [];
			t1 = t2 = null;
			for (i = 0; i < mtoc.length; i++) {
				t2 = mtoc[i][j];
				if (t2 != t1) {
					mt2.push(t2);
					t1 = t2;
				}
			}
			if (mt1 && mt1.length == mt2.length) {
				eq = true;
				for (i = 0; i < mt1.length; i++)
					if (mt1[i] != mt2[i]) {
						eq = false;
						break;
					}
				if (eq) {
					for (i = 0; i < mt1.length; i++)
						mt2[i].colSpan--;
					cois.push(j + 1);
				}
			}
			mt1 = mt2;
		}

		for (i = 0; i < cois.length; i++) {
			col = columns.splice(cois[i], 1)[0];
			columns[cois[i] - 1].width = (+columns[cois[i] - 1].width || 0)
					+ (+col.width || 0) || '';
			col.parentNode.removeChild(col);
		}

		i = table.rows.length;
		while (i--) {
			tr = table.rows[i];
			if (tr.cells.length == 0)
				tr.parentNode.removeChild(tr);
		}

		selectedTds.length = 1;
		paint(selectedTds);
		prepare();
		ms_select_end();
	}

	/**
	 * 在左边添加列
	 */
	function ac_addcol() {
		if (!cd_addcol){
			return;
		}
		// 如果没有选中表格则直接返回
		if(!selectedTds || selectedTds.length == 0){
			return;
		}
		// 选中单元格
		var selectedTd = selectedTds[0];
		var selectedCellIndex = selectedTd.cellIndex;
		var rows = table.rows;
		
		for(var rowIndex = 0; rowIndex < rows.length;){
			// 临时cell
			var tmpCell = rows[rowIndex].cells[selectedCellIndex],
			// 临时行
				tr;
			
			for (var j = 0; j < tmpCell.rowSpan; j++) {
				var newCell = document.createElement('td');
				newCell.rowSpan = newCell.colSpan = 1;
				newCell.style.borderWidth = selectedTd.style.borderWidth;
	            newCell.style.borderColor = selectedTd.style.borderColor;
	            tr = rows[rowIndex + j];
	            
	            if (tr.children[selectedCellIndex]) {
	                $(tr.children[selectedCellIndex]).before(newCell);
	            } else {
	                $(tr).append(newCell);
	            }
			}
			rowIndex += tmpCell.rowSpan;
		}
		
		var $col = $(table).find('col:eq(' + selectedCellIndex + ')');
		$col.before('<col></col>');
		
		prepare();
	}
	
	/**
	 * 在右边添加列
	 */
	function ac_addRightCol() {
		if (!cd_addcol){
			return;
		}
		// 如果没有选中表格则直接返回
		if(!selectedTds || selectedTds.length == 0){
			return;
		}
		// 选中单元格
		var selectedTd = selectedTds[0];
		var selectedCellIndex = selectedTd.cellIndex;
		var rows = table.rows;
		var totalCols = rows[0].cells.length;
		
		for(var rowIndex = 0; rowIndex < rows.length;){
			// 临时cell
			var tmpCell = rows[rowIndex].cells[selectedCellIndex],
			// 临时行
				tr;
			
			for (var j = 0; j < tmpCell.rowSpan; j++) {
				var newCell = document.createElement('td');
				newCell.rowSpan = newCell.colSpan = 1;
				newCell.style.borderWidth = selectedTd.style.borderWidth;
	            newCell.style.borderColor = selectedTd.style.borderColor;
	            tr = rows[rowIndex + j];
	            
	            if (tr.children[selectedCellIndex]) {
	                $(tr.children[selectedCellIndex]).after(newCell);
	            } else {
	                $(tr).append(newCell);
	            }
	            
	           
			}
			rowIndex += tmpCell.rowSpan;
		}
		
		var $col = $(table).find('col:eq(' + selectedCellIndex + ')');
		$col.before('<col></col>');
		
		prepare();
	}
	
	// 动态行添加列
	function ac_dynRowAddCol() {
		if (!cd_addcol){
			return;
		}
		// 如果没有选中表格则直接返回
		if(!selectedTds || selectedTds.length == 0){
			return;
		}
		// 选中单元格
		var selectedTd = selectedTds[0];
		var selectedCellIndex = selectedTd.cellIndex;
		var rows = table.rows;
		
		for(var rowIndex = 0; rowIndex < rows.length;){
			// 临时cell
			var tmpCell = rows[rowIndex].cells[selectedCellIndex],
			// 临时行
				tr;
			
			for (var j = 0; j < tmpCell.rowSpan; j++) {
				var newCell = document.createElement('td');
				if(rowIndex == 0){
					newCell = document.createElement('th');
				}
				
				newCell.rowSpan = newCell.colSpan = 1;
	            newCell.className = '';
	            tr = rows[rowIndex + j];
	            
	            if (tr.children[selectedCellIndex]) {
	                $(tr.children[selectedCellIndex]).before(newCell);
	            } else {
	                $(tr).append(newCell);
	            }
			}
			rowIndex += tmpCell.rowSpan;
		}
		prepare();
	}
	
	/**
	 * 动态行添加列
	 */
	function ac_dynRowAddColRight() {
		if (!cd_addcol){
			return;
		}
		// 如果没有选中表格则直接返回
		if(!selectedTds || selectedTds.length == 0){
			return;
		}
		// 选中单元格
		var selectedTd = selectedTds[0];
		var selectedCellIndex = selectedTd.cellIndex;
		var rows = table.rows;
		
		for(var rowIndex = 0; rowIndex < rows.length;){
			// 临时cell
			var tmpCell = rows[rowIndex].cells[selectedCellIndex],
			// 临时行
				tr;
			
			for (var j = 0; j < tmpCell.rowSpan; j++) {
				var newCell = document.createElement('td');
				if(rowIndex == 0){
					newCell = document.createElement('th');
				}
				
				newCell.rowSpan = newCell.colSpan = 1;
	            newCell.className = '';
	            tr = rows[rowIndex + j];
	            
	            if (tr.children[selectedCellIndex]) {
	                $(tr.children[selectedCellIndex]).after(newCell);
	            } else {
	                $(tr).append(newCell);
	            }
			}
			rowIndex += tmpCell.rowSpan;
		}
		prepare();
	}

	// 添加行
	function ac_addrow() {
		if (!cd_addrow)
			return;
		
		// 选中单元格
		var selectedTd = selectedTds[0];
		var $tr = $(selectedTd).parent('tr');
		
		var newtr = document.createElement('tr');
		$tr.before(newtr);
		
		var cells = $tr.get(0).cells;
		for(var i = 0; i < cells.length; i++){
			var tmpCell = cells[i];
			for(var j = 0; j < tmpCell.colSpan; j++){
				var newCell = document.createElement('td');
				newCell.rowSpan = newCell.colSpan = 1;
	            newCell.className = tmpCell.className;
	            newCell.style.width = tmpCell.style.width;
	            newCell.style.borderWidth = tmpCell.style.borderWidth;
	            newCell.style.borderColor = tmpCell.style.borderColor;
	            $(newtr).append(newCell);
			}
		}
		prepare();
	}
	
	/**
	 * 在下方插入行
	 * @return
	 */
	function ac_addrowBelow() {
		if (!cd_addrow)
			return;
		
		// 选中单元格
		var selectedTd = selectedTds[0];
		var $tr = $(selectedTd).parent('tr');
		
		var newtr = document.createElement('tr');
		$tr.after(newtr);
		
		var cells = $tr.get(0).cells;
		for(var i = 0; i < cells.length; i++){
			var tmpCell = cells[i];
			for(var j = 0; j < tmpCell.colSpan; j++){
				var newCell = document.createElement('td');
				newCell.rowSpan = newCell.colSpan = 1;
	            newCell.className = tmpCell.className;
	            newCell.style.width = tmpCell.style.width;
	            newCell.style.borderWidth = tmpCell.style.borderWidth;
	            newCell.style.borderColor = tmpCell.style.borderColor;
	            $(newtr).append(newCell);
			}
		}
		prepare();
	}

	// 删除列
	function ac_delcol() {
		if (!cd_delcol)
			return;
		var td = selectedTds[0];
		var tr = td.parentNode;
		var ri = tr.rowIndex;
		var ci = td.cellIndex;
		var mt = ctom[ri][ci];
		var t1, t2, mt1, mt2;
		var i, j, eq;

		t1 = t2 = null;
		i = mtoc.length;
		while (i--) {
			t2 = mtoc[i][mt[1]];
			if (t2 != t1) {
				var result = testdel(t2);
				if (result == 0)
					return false;
				if (result == 1)
					break;
				t1 = t2;
			}
		}

		t1 = t2 = null;
		i = mtoc.length;
		while (i--) {
			t2 = mtoc[i].splice(mt[1], 1)[0];
			if (t2 != t1) {
				if (t2.colSpan == 1) {
					t2.parentNode.removeChild(t2);
				} else {
					t2.colSpan--;
				}
				t1 = t2;
			}
		}

		mt1 = mt2 = null;
		i = mtoc.length;
		while (i--) {
			mt2 = [];
			t1 = t2 = null;
			for (j = 0; j < mtoc[i].length; j++) {
				t2 = mtoc[i][j];
				if (t2 != t1) {
					mt2.push(t2);
					t1 = t2;
				}
			}
			if (mt1 && mt1.length == mt2.length) {
				eq = true;
				for (j = 0; j < mt1.length; j++)
					if (mt1[j] != mt2[j]) {
						eq = false;
						break;
					}
				if (eq) {
					for (j = 0; j < mt1.length; j++)
						mt2[j].rowSpan--;
				}
			}
			mt1 = mt2;
		}

		i = table.rows.length;
		while (i--) {
			tr = table.rows[i];
			if (tr.cells.length == 0)
				tr.parentNode.removeChild(tr);
		}

		var col = columns[mt[1]];
		if (col) {
			col.parentNode.removeChild(col);
		}

		selectedTds = null;
		ms_select_end();
		paint('');
		prepare();

		return true;
	}

	// 删除行
	function ac_delrow() {
		if (!cd_delrow)
			return;
		var td = selectedTds[0];
		var tr = td.parentNode;
		var ri = tr.rowIndex;
		var ci = td.cellIndex;
		var mt = ctom[ri][ci];
		var i, j, t1, t2, t2ri, t2ci, ntd;

		for (i = 0; i < tr.cells.length; i++){
			var result = testdel.call(this, tr.cells[i]);
			if(result == 0) return;
			if(result == 1) break;
		}

		t1 = t2 = null;
		i = mtoc[mt[0]].length;
		while (i--) {
			t2 = mtoc[mt[0]][i];
			if (t2 != t1) {
				if (t2.rowSpan == 1) {
					tr.removeChild(t2);
				} else if (mt[0] > 0 && mtoc[mt[0] - 1][i] == t2) {
					t2.rowSpan--;
				} else {
					t2ri = t2.parentNode.rowIndex;
					t2ci = t2.cellIndex;
					for (j = 0; j < ctom[ri + 1].length; j++)
						if (ctom[ri + 1][j][1] >= ctom[t2ri][t2ci][1])
							break;

					ntd = table.rows[ri + 1].insertCell(j);
					ntd.colSpan = t2.colSpan;
					ntd.rowSpan = t2.rowSpan - 1;
					ntd.style.width = t2.style.width;
					setCell(ntd);

					tr.removeChild(t2);
				}
				t1 = t2;
			}
		}
		table.deleteRow(ri);

		selectedTds = null;
		ms_select_end();
		paint('');
		prepare();

		return true;
	}

	// 判断a是否包含b
	function contains(a, b) {
		while (b && (b != a))
			b = b.parentNode;
		return a == b;
	}

	/**
	 * 取得鼠标所在的td
	 * 
	 * 在cells存储结构中查询该td元素
	 * 
	 * @param etar
	 *            事件的目标元素
	 * 
	 */ 
	function getTargetTd(etar) {
		for ( var i = 0; i < cells.length; i++)
			if (contains(cells[i], etar))
				return cells[i];
		return null;
	}

	var msuped = true;
	var firstTd = null;
	var secondTd = null;
	
	/**
	 * 处理点下鼠标事件 当鼠标按下时，记录鼠标按下时所在的td
	 * 
	 * @param e
	 * @return
	 */
	function mousedown(e) {
		var etar = e.target || e.srcElement;
		if (!contains(table, etar)) {
			return;
		}

		var theTd = getTargetTd(etar);
		if (!theTd)
			return;

		firstTd = theTd;
		// 对选中td进行背景着色
		ms_select_begin();

		msuped = false;
	}

	// 移动鼠标
	function mousemove(e) {
		// 如果鼠标处于非点击状态， 则返回
		if (msuped)
			return;
		var etar = e.target || e.srcElement;
		if (!contains(table, etar))
			return;

		var theTd = getTargetTd(etar);
		if (!theTd || secondTd == theTd)
			return;

		secondTd = theTd;
		ms_selecting();
	}

	// 松开鼠标
	function mouseup(e) {
		if (msuped)
			return;
		msuped = true;

		ms_select_end();
	}

	/**
	 * 开始选择
	 */
	function ms_select_begin() {
		paint(selectedTds = [ firstTd ]);
	}

	/**
	 * 选择中
	 */ 
	function ms_selecting() {
		// 选中的单元格
		var a = [];
		if (firstTd == secondTd) {
			a[0] = firstTd;
		} else {
			// 第二个td所在行
			var r1 = firstTd.parentNode.rowIndex;
			// 第二个td所在行
			var r2 = secondTd.parentNode.rowIndex;
			// td在行中处于第几个
			var c1 = ctom[r1][firstTd.cellIndex][1];
			var c2 = ctom[r2][secondTd.cellIndex][1];
			if (r1 > r2)
				r1 = r2 + (r2 = r1) * 0;
			if (c1 > c2)
				c1 = c2 + (c2 = c1) * 0;

			var k = 0;
			for ( var i = r1; i <= r2; i++) {
				for ( var j = 0; j < ctom[i].length; j++) {
					if (ctom[i][j][1] < c1)
						continue;
					if (ctom[i][j][1] > c2)
						break;
					a[k++] = table.rows[i].cells[j];
				}
			}
		}
		// 保存选中的td，并对其进行背景着色
		paint(selectedTds = a);
	}

	/**
	 * 选择完成
	 */ 
	function ms_select_end() {
		// 如果没有选中单元格，则不能进行操作
		if (!selectedTds || !selectedTds.length) {
			coordinates = null;
			// 不能合并、拆分单元格
			cd_merge = cd_split = false;
			// 不能删除行、列
			cd_delrow = cd_delcol = false;
			return;
		}
		var a = selectedTds, b = [];
		for ( var i = 0; i < a.length; i++)
			b.push.apply(b,ctom[selectedTds[i].parentNode.rowIndex][selectedTds[i].cellIndex].detail);
		coordinates = b;

		cd_merge = i != 1 && isrect(b);
		cd_split = i == 1 && (firstTd.rowSpan != 1 || firstTd.colSpan != 1);
		// cd_addrow = cd_addcol = i == 1;
		cd_delrow = i == 1 && mtoc.length > 1;
		cd_delcol = i == 1 && mtoc[0].length > 1;

		firstTd = secondTd = null;
	}

	/**
	 * 判断选中单元格的组合是否为矩形
	 * 
	 * @param a
	 */ 
	function isrect(a) {
		var r1 = a[0][0];
		var r2 = a[0][0];
		var c1 = a[0][1];
		var c2 = a[0][1];
		for ( var i = 1; i < a.length; i++) {
			if (r1 > a[i][0])
				r1 = a[i][0];
			else if (r2 < a[i][0])
				r2 = a[i][0];
			if (c1 > a[i][1])
				c1 = a[i][1];
			else if (c2 < a[i][1])
				c2 = a[i][1];
		}
		a.r1 = r1;
		a.r2 = r2;
		a.c1 = c1;
		a.c2 = c2;
		return (r2 - r1 + 1) * (c2 - c1 + 1) == i;
	}

	// 把单元格展开成n个小格
	function expandmt(a) {
		var r = [];
		for ( var i = 0; i < a[2]; i++)
			for ( var j = 0; j < a[3]; j++)
				r.push([ a[0] + i, a[1] + j ]);
		a.detail = r;
	}

	/**
	 * 初始化表格操作要用的数据
	 * 
	 * @return
	 */
	function prepare() {
		cells = [];
		// cell到matrix的映射，记录每个cell在table中的坐标、rowspan和colspan值
		ctom = [];
		// matrix到cell的映射，成员为每个td
		// 2*4表格，记录为
		// [[td11, td12, td13, td14], [td21, td22, td23, td24]]
		mtoc = [];
		// 记录表格的列
		columns = [];

		var i, j, k, l, tr, td, n;
		for (i = 0; i < table.rows.length; i++) {
			tr = table.rows[i];
			ctom[i] = [];
			if (!mtoc[i])
				mtoc[i] = [];
			n = 0;
			for (j = 0; j < tr.cells.length; j++) {
				cells.push(td = tr.cells[j]);
				while (mtoc[i][n])
					n++;
				ctom[i][j] = [ i, n, td.rowSpan, td.colSpan ];
				k = 0;
				do {
					for (l = 0; l < td.colSpan; l++) {
						mtoc[i + k][n + l] = td;
					}
					if (++k >= td.rowSpan)
						break;
					if (!mtoc[i + k])
						mtoc[i + k] = [];
				} while (true);
				n += td.colSpan;
			}
		}

		for (i = 0; i < ctom.length; i++)
			for (j = 0; j < ctom[i].length; j++)
				expandmt(ctom[i][j]);

		var nd = table.firstChild, cg = null;
		while (nd.nodeType != 1)
			nd = nd.nextSibling;
		if (nd.tagName == 'COLGROUP') {
			cg = nd;
			var a = nd.getElementsByTagName('COL');
			for ( var i = 0; i < a.length; i++)
				columns[i] = a[i];
		} else {
			i = 0;
			while (nd.tagName == 'COL') {
				columns[i++] = nd;
				while (nd = nd.nextSibling)
					if (nd.nodeType == 1)
						break;
				if (!nd)
					break;
			}
		}
	}

	function init() {
		prepare();
	}

	/**
	 * 返回对象：各种操作是否可用
	 */ 
	function cando() {
		return {
			merge : cd_merge,
			split : cd_split,
			addrow : cd_addrow,
			addcol : cd_addcol,
			delrow : cd_delrow,
			delcol : cd_delcol
		};
	}

	/**
	 * 各种操作
	 */ 
	var action = {
		merge : ac_merge,
		split : ac_split,
		addrow : ac_addrow,
		addrowBelow : ac_addrowBelow,
		addcol : ac_addcol,
		addRightCol : ac_addRightCol,
		delrow : ac_delrow,
		delcol : ac_delcol,
		addDynRowCol : ac_dynRowAddCol,
		addDynRowColRight : ac_dynRowAddColRight
	};

	return {
		table : table,
		mousedown : mousedown,
		mousemove : mousemove,
		mouseup : mouseup,
		init : init,
		cando : cando,
		action : action
	};
}
