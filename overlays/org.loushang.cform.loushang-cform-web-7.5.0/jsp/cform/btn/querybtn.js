function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
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
	// 初始化左侧的组件类别树。
	initBtnTypeTree();
	
	// 初始化右侧的组件表格。
	initBtnTable();
	
	// “全选”按钮。
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	
	// 查询表单操作按钮。
	$("#queryBtn").click(function(){
		queryBtn();
	});
	
	// 查询事件回车键绑定。
	$("#btnName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryBtn();
		} 
	});
	
	// 增加操作按钮。
	$("#addBtn").click(function(){
		addBtn();
	});
	
	// 批量删除。
	$("#batchDel").click(function() {
		delBtn();
	});
});

////////////////////////////////////以下为树的处理逻辑    //////////////////////////////////////////////
// 初始化操作类别树。
function initBtnTypeTree() {
	// 存放树节点的数组。
	var treeNodes = [];
	
	// 根节点。
	var root = {
			isRoot: true,
			isParent: true,
			id: "-1",
			name: m("cf.abt", "操作类别树"),
			description: "root"
	}
	treeNodes.push(root);
	
	// ztree设置。
	treeSetting = {
			data : {
				key : {
					name : "name"
				}
			},
			callback : {
				onClick : onClick,
				beforeExpand : beforeExpand
			},
			view : {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom
			}
	}
	
	// 初始化操作类别树。
	var tree = $.fn.zTree.init($("#btnTypeTree"), treeSetting, treeNodes);
	// 打开根节点。
	tree.expandNode(tree.getNodes()[0],true,false,true,true);
}

// 鼠标悬停。
function addHoverDom(treeId, treeNode) {
	// 只在根节点显示“增加”按钮
	if(treeNode.isRoot){
		// 添加"增加"按钮
		appendAddBtn(treeId, treeNode);
		return;
	}
	
	// 添加“修改”按钮
	addModifyBtn(treeId, treeNode);
	// 添加“删除”按钮
	addDelBtn(treeId, treeNode);
}

// 添加“增加”按钮。
function appendAddBtn(treeId, treeNode) {
	// 组装“增加”按钮的id。
	var newBtnId = treeNode.tId + "_add";
	if ($("#"+newBtnId).length>0) {
		return;
	}
	
	var addStr = "<span id='"+newBtnId+"' class='button add' title='"+m("cf.createtype", "增加类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(addStr);
	
	// 绑定事件。
	$("#"+newBtnId).bind("click", function(){
		var childrenNum = treeNode.children.length;
		$.dialog({
			type: "iframe",
			url: "addbtntype.jsp?status=new" + "&childrenNum="+childrenNum,
			title: m("cf.cfbt", "新增表单操作类别"),
			width: 500,
			height: 210,
			onclose: function () {
				var returnVal = this.returnValue;
				addChildNodes(treeId, treeNode);
			}
		});

	});
}

// 添加“修改”按钮。
function addModifyBtn(treeId, treeNode){
	// 组装“修改”按钮的id。
	var editBtnId = treeNode.tId + "_edit";
	if ($("#"+editBtnId).length > 0) {
		return;
	}
	
	var editBtn = "<span id='"+editBtnId+"' class='button edit' title='"+m("cf.edittype", "修改类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(editBtn);
	
	// 绑定事件。
	$("#"+editBtnId).bind("click", function(){
		// 获取节点信息。
		var typeId = treeNode.id;
		
		$.dialog({
			type: "iframe",
			url: "addbtntype.jsp?status=edit&typeId=" + typeId,
			title: m("cf.efbt", "修改表单操作类别"),
			width: 500,
			height: 210,
			onclose: function () {
				var returnVal = this.returnValue;
				// 修改树中的节点信息。
				if(returnVal) {
					sticky(m("cf.savesucceed", "保存成功!"));
					treeNode.name = returnVal.name;
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.updateNode(treeNode, false);
				}
			}
		});
	})
}

// 添加“删除”按钮。
function addDelBtn(treeId, treeNode){
	// 组装“删除”按钮的id。
	var delBtnId = treeNode.tId + "_remove";
	if ($("#"+delBtnId).length > 0) {
		return;
	}
	
	var delBtn = "<span id='"+delBtnId+"' class='button remove' title='"+m("cf.deltype", "删除类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(delBtn);
	
	// 绑定事件。
	$("#"+delBtnId).bind("click", function(){
		$.dialog({
			type: "confirm",
			content: m("cf.confirmdel", "确定删除？"),
			autofocus: true,
			ok: function() {
				var command = new L5.Command("org.loushang.cform.btn.cmd.BtnTypeCmd");
				command.setParameter("ids", [treeNode.id]);
				command.execute("delete");
				
				if(!command.error){
					sticky(m("cf.deleted", "删除成功！"));
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.removeNode(treeNode);
				}else{
					UIAlert(m("cf.notempty", "类别非空，不能删除！"));
				}
			},
			cancel: function() {}
		});
	})
}

// 鼠标离开。
function removeHoverDom(treeId, treeNode) {
	// 移除操作按钮。
	$("#"+treeNode.tId + "_add").unbind().remove();
	$("#"+treeNode.tId + "_edit").unbind().remove();
	$("#"+treeNode.tId + "_remove").unbind().remove();
}

// 单击树节点。
function onClick(event, treeId, treeNode) {
	// 清除查询条件。
	$("#btnName").val("");
	
	// 重新加表格载数据。
	$("#btnList").DataTable().ajax.reload();
}

// 展开节点时，动态添加子节点。
function beforeExpand(treeId, treeNode) {
	addChildNodes(treeId, treeNode);
	// 允许展开。
	return true;
}

// 加载子节点。
function addChildNodes(treeId, treeNode) {
	var tree = $.fn.zTree.getZTreeObj(treeId);
	tree.removeChildNodes(treeNode);

	// 获取子节点数据。
	var childNodes = getChildNodes(treeId, treeNode);
	// 添加节点。
	tree.addNodes(treeNode, childNodes);
}

// 获取子节点数据。
function getChildNodes(treeId, treeNode) {
	var cmd = new L5.Command("org.loushang.cform.btn.cmd.BtnTypeQueryCmd");
	cmd.execute("queryBtnTypes");
	var data = cmd.getData();
	
	return data;
}

////////////////////////////////////以下为表格的处理逻辑    //////////////////////////////////////////////
// 初始化右侧的组件表格。
function initBtnTable(){
	$("#btnList").dtable({
		// 显示“正在加载”的图标。
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "actionId", bSortable: false},
		          {data: "actionId"},
		          {data: "actionName"},
		          {data: "functionName"},
		          {data: "actionId"}
		          ],
		 columnDefs: [
						{
						     targets: 0,	    		       
						     data: "actionId",
						     render: function(data, type, full) {
						    	 return '<input type="checkbox" value="' + data + '" name="checkList"/>';
						     }
						},
						{
							targets: 1,	    		       
							data: "actionId",
							render: function(data, type, full) {
	 					    	 return "<a href=\"javascript:updateBtn('"+data+"')\">" + data + "</a>";
	 					    }
						},
						{
 		    		    	targets: 4,
 		    		    	data: "actionId",
 		    		    	render: function(data,type,full){
 		    		    		var delBtn = "<a href=\"javascript:delBtn('"+data+"')\">"+m("cf.delete","删除")+"</a>";
 		    		    		var editBtn = "<a href=\"javascript:updateBtn('"+data+"')\">"+m("cf.edit","编辑")+"</a>";
 		    		    		return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
 		    		    	}
 		    		    }
 	                   ]
	});
}

// 加载组件数据。
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.btn.cmd.BtnQueryCmd");
	for(var i=0; i<aoData.length; i++){
		  if(aoData[i].name=="draw"){
			  draw=aoData[i].value;
		  }
		  if(aoData[i].name=="start"){
			  cmd.setParameter("start", aoData[i].value);
		  }
		  if(aoData[i].name=="length"){
			  cmd.setParameter("limit", aoData[i].value);
		  }
	}
	
	// 查询条件。
	var btnName = $("#btnName").val();
	if(btnName) {
		cmd.setParameter("ACTION_NAME", btnName);
	}
	
	// 类别信息。
	var tree = $.fn.zTree.getZTreeObj("btnTypeTree");
	var selectedNodes = tree.getSelectedNodes();
	if(selectedNodes.length > 0 && !selectedNodes[0].isRoot){
		var typeId = selectedNodes[0].id;
		cmd.setParameter("ACTION_TYPE", typeId);
	}
	
	cmd.execute("queryBtns");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询表单操作按钮。
function queryBtn() {
	$("#btnList").DataTable().ajax.reload();
}

// 增加表单操作按钮。
function addBtn() {
	var nodes = $.fn.zTree.getZTreeObj("btnTypeTree").getSelectedNodes();
	if(!nodes.length || nodes[0].isRoot) {
		UIAlert(m("cf.choosetype", "请点击左侧树，选择一个类别！"));
		return false;
	}
	
	var typeId = nodes[0].id;
	$.dialog({
		type: "iframe",
		title: m("cf.cab", "新增表单操作按钮"),
		url: "addbtn.jsp?status=new&" + "typeId=" + typeId,
		width: 500,
		height: 360,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryBtn();
			}
		}
	});
}

// 修改表单操作按钮。
function updateBtn(actionId) {
	$.dialog({
		type: "iframe",
		title: m("cf.eab", "修改表单操作按钮"),
		url: "addbtn.jsp?status=edit" + "&actionId=" + actionId,
		width: 500,
		height: 310,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryBtn();
			}
		}
	});
}

// 删除表单操作按钮。
function delBtn(actionId){
	var codes = [];
	if(actionId) {
		codes.push(actionId);
	}else{
		var $selected = $(":checkbox[name=checkList]:checked");
		if($selected.length < 1) {
			UIAlert(m("cf.choosearecord", "请选择一条记录！"));
			return;
		}
		$selected.each(function(i, checkbox){
			codes.push($(checkbox).val());
		});
	}
	
	// 删除
	$.dialog({
		type: "confirm",
		content:  m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.btn.cmd.BtnCmd");
			command.setParameter("codes", codes);
			command.execute("delete");
			if(!command.error){
				queryBtn();
				sticky(m("cf.deleted", "删除成功！"));
			}else{
				sticky(command.error.message, 'error', 'center');
			}
		},
		cancel: function(){}
	});
}

// checkbox全选。
function selectAll(checked){
	$(":checkbox[name=checkList]").prop("checked", checked);
}