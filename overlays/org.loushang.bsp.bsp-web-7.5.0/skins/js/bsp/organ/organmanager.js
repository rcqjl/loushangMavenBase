//全局变量
var tree, rootNode, curNode;
var grid;
var resultArray;//存储搜寻结果

// 记录状态：新增(new)、修改(edit)
var status;
// 表单校验对象
var vForm, vBizForm;

// 提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}
function alert(msg) {
	$.dialog({
		type : "alert",
		content : msg
	});
}

$(function() {
	// 初始化组织视角选择按钮
	initStruTypeSelector();

	// 初始化组织树
	initTree();

	// 初始化表格
	initTable();

	// 初始化“增加”按钮的弹窗
	initAddOrgan();

	// “增加”按钮
	$("#addOrgan").click(function(e) {
		forAddOrgan();
	});

	// “删除”按钮
	$("#del").click(function(e) {
		delBatch();
	});

	// “排序”按钮
	$("#sort").click(function(e) {
		sort();
	});
	
	// 导入
	$("#import").click(function() {
		importing();
	});
	
	// 导出
	$("#export").click(function() {
		window.location.href = context + "/service/bsp/organ/exporting/" + curNode.struId;
	});
	
	// 变更隶属关系
	$("#change").click(function() {
		change();
	});
	
	//查询组织类型
	$("#query").click(function(e){
		searchOrganType();
	});
	//为查询组织类型绑定回车事件
	$("#queryorganName").bind("keypress",function(event){
		if(event.keyCode == "13"){
			searchOrganType();
        }
	})

})

////////////////////////////////////////////////////  树     ///////////////////////////////////////////////////
// 初始组织视角选择按钮
function initStruTypeSelector() {
	$.ajax({
		url: context + "/service/bsp/organ/getAllStruTypes",
		dataType: "json",
		async: false,
		success: function(data) {
			var msg1 = L.getLocaleMessage("bsp.organ.064","组织视角");
			var msg2 = L.getLocaleMessage("bsp.organ.065","管理组织视角");
			var $selectorContainer = $('<div class="stru-container"></div>');
			for(var i = 0 ; i < data.length ; i++) {
				var $divEle = $("<div></div>");
				$divEle.data("type", data[i]["struType"]);
				$divEle.attr("class", "stru-type");
				$divEle.attr("title", data[i]["struTypeName"]);
				$divEle.text(data[i]["struTypeName"]);
				
				$selectorContainer.append($divEle);
			}
			$(".select-stru-type").popover({
				title: msg1+"<a href='"+context+"/service/bsp/organ'>"+msg2+"</a>",
				html: true,
				content: $selectorContainer,
				placement: "right",
				trigger: "focus",
				delay: {
					show: 0, 
					hide: 100
				}
			});
			// 设置元素堆叠顺序,将分页元素置底
			$(".select-stru-type").on("show.bs.popover", function(){
				$("ul.pagination > li.active > a").css("z-index", 0);
			});
		},
		error: function(e) {
			alert("请求出错");
		}
	});
	
	$(".ue-menu-left").on("click", ".stru-type", function(e){
		var struType = $(this).data("type");
		struType = encodeURI(encodeURI(struType));
		window.location.href = context + "/service/bsp/organ/forOrganDetail?struType=" + struType;
	});
}
// 初始化机构树
function initTree() {
	var msg1 = L.getLocaleMessage("bsp.organ.006","组织树");
	var msg2 = L.getLocaleMessage("bsp.organ.050","单位");
	var msg3 = L.getLocaleMessage("bsp.organ.051","人力资源");
	// 用于存储树的节点
	var treeNodes = [];

	// 定义根节点
	root = {
		parentId : '-1',
		isParent : true,
		name: msg1,

		organId : 'rootId',
		organName : msg1,
		organType : '1',
		organTypeName : msg2,
		inUseOrgan : '1',

		struId : 'rootId',
		struType : struType,
		struTypeId : "00",
		struTypeName : msg3,
		struLevel : '0',
		struPath : 'rootId',
		struOrder : '1',
		inUseStru : '1'
	};

	treeNodes.push(root);

	// ztree设置
	var treeSetting = {
		async : {
			enable : true,
			url : context + "/service/bsp/organ/treeData",
			autoParam : [ "parentId", "struId" ,"organId"],
			otherParam : {
				"struType" : struType
			},
			dataFilter : dataFilter
		},
		callback : {
			beforeAsync: true,
			onClick : onClick,
			onExpand : onExpand,
			beforeCollapse: beforeCollapse
		},
		edit : {
			// 不显示ztree默认提供的按钮
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false,
			drag : {
				isCopy : false,
				isMove : false
			}
		}
	};
	// 初始化功能树
	tree = $.fn.zTree.init($("#organTree"), treeSetting, treeNodes);
	// 将根节点存储在全局变量中，方便以后获取
	rootNode = tree.getNodes()[0];
	// 初始化时默认当前节点为根节点，点击树节点时进行切换
	curNode = rootNode;
	// 展开根节点
	tree.expandNode(rootNode,null,null,null,true);
}

//禁止 调用点击节点收缩的函数
function beforeCollapse(treeId, treeNode){
	if(treeNode.organId=="rootId"){
		return false;
	}else{
		return true;
	}
	
}

function onClick(e, treeId, treeNode) {
	var showTable = false;
	
	// 判断组织规则是否能够添加下级
	$.ajax({
		url : context + "/service/bsp/organ/selectOrganRule/" + treeNode["organType"] + "/" + treeNode["struType"],
		async : false,
		success : function(data) {
			if(data.length>0) {
				showTable = true;
			}
		}
	});
	
	if(showTable) {
		curNode = treeNode;
		$(".tableTitle").text(treeNode["organName"]);
	
		grid.setParameter("struId", treeNode["struId"]);
		grid.setParameter("struType", treeNode["struType"]);
		grid.reload();
	}
}

function dataFilter(treeId, parentNode, childNodes) {
	return $.grep(childNodes, function(childNode, index){
		childNode["isParent"] = childNode["isLeaf"] != "1";
		
		// 设置节点显示的名称
		childNode["name"] = childNode["struName"] ? childNode["struName"] : childNode["organName"];
		if(struType!="00"&&childNode["empOrganName"]) {
			childNode["name"] = childNode["name"] + "[" + childNode["empOrganName"] + "]";
		} else {
			childNode["name"] = childNode["name"];
		}
		return true;
	})
}

function onExpand(e, treeId, treeNode) {
	if (treeNode.children&&treeNode.children.length < 1) {
		treeNode["isParent"] = false;
		tree.updateNode(treeNode);
	}

	if (resultArray&&resultArray.length>0) {
		expandNodes(treeNode.children);
	}
}

function expandNodes(nodes) {
	if (!nodes) {
		return;
	}
	//遍历异步加载后已经展开的树节点
	for (var i = 0, l = nodes.length; i < l; i++) {
		for (var j = 0; j < resultArray.length; j++) {
			if (resultArray[j] == nodes[i].struId) {
				tree.expandNode(nodes[i], true, false, true, true);
				
				if (0 == resultArray.length - 1-j) {
					tree.selectNode(nodes[i]);
					displayOrganDetail(nodes[i]);
					// 定位到所查找的节点后清空
					resultArray = [];
				}
			}

		}
		//如果树节点是父节点且异步加载过，递归调用该函数
		if (nodes[i].isParent && nodes[i].zAsync) {
			expandNodes(nodes[i].children);
		}
	}
	
}

//搜索框
function searchOrganType(){
	var organName=$("#queryorganName").val();
	if(organName != "") { 
		var url=context+"/service/bsp/organ/searchOrganType?organName=" + organName+"&struType="+struType;
		url = encodeURI(url);
		url = encodeURI(url);
		$.ajax({
			url: url,
			async: false,
			success: afterQueryOrgan
		});
	}

}

//组织查询结果处理
function afterQueryOrgan(d) {
	var msg = L.getLocaleMessage("bsp.organ.052","没有查到该组织!");
	resultArray = d;

	var rootNode = tree.getNodeByParam("struId", 'rootId');
	
	if (resultArray.length > 0) {

		// 首先在已经展开的节点中寻找
		var queryNode = tree.getNodeByParam("struId",
				resultArray[resultArray.length - 1]);
		// 如果能够在已经展开的节点中定位，则直接选中节点,并展开
		if (queryNode) {
			for(var i=0;i<resultArray.length;i++){
				queryNode=tree.getNodeByParam("struId",resultArray[i]);
				tree.expandNode(queryNode,true,false,true,true);
				
				if(resultArray.length-1-i==0){
					tree.selectNode(queryNode);
					displayOrganDetail(queryNode);
					// 定位到所查找的节点后清空
					resultArray = [];
				}
			}
		} else {// 否则重新生成树，定位节点
			initTree();
		}
	} else {
		// 没有查到
		sticky(msg);
	}
}
function displayOrganDetail(node){
	//刷新表格 获取表格数据并刷新表格
	var showTable = false;
	
	// 判断组织规则是否能够添加下级
	$.ajax({
		url : context + "/service/bsp/organ/selectOrganRule/" + node["organType"] + "/" + node["struType"],
		async : false,
		success : function(data) {
			if(data.length>0) {
				showTable = true;
			}
		}
	});
	
	if(showTable) {
		$(".tableTitle").text(node["organName"]);
		grid.setParameter("struId", node["struId"]);
		grid.setParameter("struType", node["struType"]);
		grid.reload();
	}
}

//////////////////////////////////////////////////  表格      /////////////////////////////////////////////////
function initTable() {
	var options = {
		ordering : false
	};
	var url = context + "/service/bsp/organ/tableData";
	grid = new L.FlexGrid("organList", url);
	grid.setParameter("struId", "rootId");
	grid.setParameter("struType", struType);
	grid.init(options);
}

function rendOrganCode(data, type, full) {
	return full["struCode"] ? full["struCode"] : data;
}
function rendOrganName(data, type, full) {
	var name = data;
	if(full["struName"])
		name = full["struName"];
	
	if(full["empOrganName"])
		name = name + " [" + full["empOrganName"] + "]";
	
	return name;
}
function rendCheckbox(data, type, full) {
	return '<input type="checkbox" id="' + data + '" value="' + full["organType"] + '" name="organCheckbox"/>';
}

// 渲染表格内的操作按钮
function rendBtn(data, type, full) {
	var msg1 = L.getLocaleMessage("bsp.organ.008","删除");
	var msg2 = L.getLocaleMessage("bsp.organ.066","编辑");
	var delBtn = "<a href=\"javascript:del('" + data + "', '" + full["organType"] + "')\">"+msg1+"</a>";
	var editBtn = "<a href=\"javascript:update('" + data + "')\">"+msg2+"</a>";

	return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
}

// 初始化“增加”按钮弹窗
function initAddOrgan() {
	$("#addOrganModal").modal({
		show : false,
		backdrop : "static"
	});
	
	// “业务机构类型”选择
	$(":radio[name=bizType]").change(function() {
		// 控制域的显示隐藏和校验
		controlFieldAndValid();
	});
	
	// 组织类别
	$("#organType").change(function() {
		controlFieldAndValid();
	});
	
	// “选择下级”域
	$(".select-organ-btn").click(function(e) {
		selectOrgan();
	});
	
	// “负责人”域、“员工”域
	$(".select-principal, .select-emp").click(function(e) {
		selectUser();
	});
	
	// 校验
	vForm = $("#organForm").Validform({
		btnSubmit : "#saveVal",
		tiptype : function(msg, o, cssctl) {
			var objtip = o.obj.siblings(".Validform_checktip");
			cssctl(objtip, o.type);
			objtip.text(msg);
		},
		callback : function(form) {
			saveOrgan();
		},
		datatype : {
			"organCode" : ValidOrganCode,
			"struOrder" : ValidStruOrder
		}
	});

	// “取消”按钮
	$("#cancel").click(function() {
		$("#addOrganModal").modal("hide");
	});
}

// 校验组织代码
function ValidOrganCode(gets, obj, curform, regxp) {
	var msg2 = L.getLocaleMessage("bsp.organ.067","编码已存在！");
	if (gets == null || gets == "") {
		return false;
	}
	var isExist = false;
	$.ajax({
		url : context + "/service/bsp/organ/isExistOrganCodeInUse/" + gets,
		data: {"struId": curform.find("#struId").val()},
		async : false,
		success : function(data) {
			isExist = data;
		}
	});
	if (isExist) {
		obj.attr("errormsg", msg2);
		return false;
	}

	return true;
}

function ValidStruOrder(gets, obj, curform, regxp) {
	var msg = L.getLocaleMessage("bsp.organ.068","请输入整数！");
	if (gets == null || gets == "") {
		return false;
	}
	if (isNaN(gets)) {
		obj.attr("errormsg", msg);
		return false;
	}

}

// 增加组织项
function forAddOrgan() {
	status = "new";
	$(".struOrder").hide();
	$("#organType").show();
	$("#organTypeRO").hide();
	
	// 重置表单
	$(".Validform_wrong").text("");
	vForm.resetForm();
	$("#parentId").val(curNode["struId"]);
	$("#struType").val(curNode["struType"]);

	// 查询组织类型下拉列表
	$("#organType").empty();
	$.ajax({
		url : context + "/service/bsp/organ/selectOrganRule/" + curNode["organType"] + "/" + curNode["struType"],
		async : false,
		success : function(data) {
			if(data.length < 1) 
				return;
			
			for (var i = 0; i < data.length; i++) {
				var option = "<option value='" + data[i]["targetRef"] + "'>" + data[i]["typeName"] + "</option>";
				$("#organType").append(option);
			}
			// 根节点下不能增加岗位和员工
			if(curNode["struId"] == "rootId") {
				$("#organType option[value=6]").remove();
				$("#organType option[value=8]").remove();
			}
			// 岗位下面只能选择员工，不能新增员工
			if(struType!="00"&&curNode["organType"] == "6") {
				$("#organType option[value=8]").remove();
			}
		},
		error : function(e) {
			alert(e.responseText);
		}
	})
	
	if(struType!="00"&&$("#organType option").length < 1) {
		var msg1 = L.getLocaleMessage("bsp.organ.069","非人力资源组织视角下岗位只能指定员工，不能新增员工！");
		var msg2 = L.getLocaleMessage("bsp.organ.070","根据当前组织视角的规则，该类型的组织没有可添加的下级组织类型！");
		var msg3 = L.getLocaleMessage("bsp.organ.018","增加组织项");
		if(curNode["organType"] == "6") {
			alert(msg1);
		} else {
			alert(msg2);
		}
		return;
	}
	
	$("#addOrganModal .modal-title").text(msg3);
	$("#addOrganModal").modal("show");
	controlFieldAndValid();
}

// 选择用户
function selectUser() {
	var msg = L.getLocaleMessage("bsp.organ.071","选择员工");
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/organHelp?isChkbox=0&selType=8&struType=00",
		title : msg,
		width : 580,
		height : 400,
		onclose : function() {
			var nodes = this.returnValue;
			if(!nodes)
				return;
			
			if (nodes.length > 0) {
				var node = nodes[0];
				if($("#organType").val() == "6") {
					$("#empOrganName").val(node["organName"]);
					$("#empStruId").val(node["struId"]);
				}else{
					$("#principalName").val(node["organName"]);
					$("#principalId").val(node["organId"]);
				}
			}else{
				if($("#organType").val() == "6") {
					$("#empOrganName").val("");
					$("#empStruId").val("");
				}else{
					$("#principalName").val("");
					$("#principalId").val("");
				}
			}
		}
	});
}

// “选择下级”
function selectOrgan() {
	var msg1 = L.getLocaleMessage("bsp.organ.072","请选择组织类型");
	var msg2 = L.getLocaleMessage("bsp.organ.073","选择下级组织");
	var selType = $("#organType").val();
	if(!selType) {
		alert(msg1);
		return false;
	}
	
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/organHelp?isChkbox=0&selType=" + selType + "&struType=00",
		title : msg2,
		width : 580,
		height : 400,
		onclose : function() {
			var nodes = this.returnValue;
			if(!nodes)
				return;
			
			if (nodes.length > 0) {
				var node = nodes[0];
				$("#selectedOrganName").val(node["organName"]);
				$("#selectedStruId").val(node["struId"]);
			}else{
				$("#selectedOrganName").val("");
				$("#selectedStruId").val("");
			}
		}
	});
}

// 修改组织项
function update(struId) {
	var msg = L.getLocaleMessage("bsp.organ.074","修改组织项");
	$(".struOrder").show();
	status = "edit";
	// 清除表单上的校验错误提示信息
	$(".Validform_wrong").text("");
	vForm.resetForm();

	$("#organType").empty();
	// 查询组织类型下拉列表
	$.ajax({
		url : context + "/service/bsp/organ/selectOrganRule/" + curNode["organType"] + "/" + curNode["struType"],
		async : false,
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var option = "<option value='" + data[i]["targetRef"] + "'>" + data[i]["typeName"] + "</option>"
				$("#organType").append(option);
			}
		},
		error : function(e) {
			alert("错误");
		}
	});
	// 请求组织项数据
	$.ajax({
		url : context + "/service/bsp/organ/forUpdateOrgan/" + struId,
		async : false,
		success : function(data) {
			$("#organType").val(data["organType"]).hide();
			$("#organType").data("organType", data["organType"]);
			// “组织类型”不允许修改，用只读的input域代替select显示
			$("#organTypeRO").val(data["organTypeName"]).show();
			$("#organCode").val(data["struCode"] ? data["struCode"] : data["organCode"]);
			$("#organName").val(data["struName"] ? data["struName"] : data["organName"]);
			$("#parentId").val(data["parentId"]);
			$("#struType").val(data["struType"]);
			$("#struId").val(data["struId"]);
			$("#shortName").val(data["shortName"]);
			$("#principalId").val(data["principalId"]);
			$("#principalName").val(data["principalName"]);
			$("#empStruId").val(data["empStruId"]);
			$("#empOrganName").val(data["empOrganName"]);
			$("#struOrder").val(data["struOrder"]);
		},
		error : function(e) {
			alert("错误");
		}
	});
	
	$("#addOrganModal .modal-title").text(msg);
	$("#addOrganModal").modal("show");
	controlFieldAndValid();
}

// 保存组织项
function saveOrgan() {
	var msg = L.getLocaleMessage("bsp.organ.075","保存成功！");
	$("#addOrganModal").modal("hide");
	
	var url = context + "/service/bsp/organ/addOrganInUse";
	var data = $("#organForm").serialize();
	// 从行政机构下选择
	if(struType != "00" 
		&& $(":radio[name=bizType]:checked").val() == "0" 
		/*&& $("#organType").val() != "6"*/) {
		url = context + "/service/bsp/organ/selectOrgan";
	}
	if (status == "edit") {
		url = context + "/service/bsp/organ/updateOrganInUse";
	}
	$.ajax({
		url : url,
		type : "post",
		async : false,
		data : data,
		success : function() {
			sticky(msg);
			// 刷新树节点和表格
			curNode["isParent"] = true;
			tree.reAsyncChildNodes(curNode, "refresh");
			grid.reload();
		},
		error: function(e) {
			alert(e.responseText);
		}
	});
}

// 保存选择的下级
function saveSelect() {
	$.ajax({
		url : context + "/service/bsp/organ/selectOrgan",
		data: {"parentId": curNode["struId"], "selectStruId": $("#selectedStruId").val(), "struType": struType},
		async: false,
		success : function() {
			sticky("保存成功");
			// 刷新树节点和表格
			curNode["isParent"] = true;
			tree.reAsyncChildNodes(curNode, "refresh");
			grid.reload();
		},
		error: function(e) {
			alert(e);
		}
	});
}

// 删除组织项
function del(struId, organType) {
	var msg1 = L.getLocaleMessage("bsp.organ.076","确认删除选中记录?");
	var msg2 = L.getLocaleMessage("bsp.organ.077","删除类型为[员工]的组织时，同时会删除其对应的用户，确定删除组织吗？");
	var struIds = [];
	var confirmInfo = msg1;
	
	if(struId) {
		struIds = [struId];
	}

	if(organType !=null && organType.indexOf("8")==0) {
		confirmInfo = msg2;
	}

	delAction(struIds, confirmInfo);
}

function delBatch() {
	var msg1 = L.getLocaleMessage("bsp.organ.076","确认删除选中记录?");
	var msg2 = L.getLocaleMessage("bsp.organ.077","删除类型为[员工]的组织时，同时会删除其对应的用户，确定删除组织吗？");
	var struIds = [];
	var confirmInfo = msg1;
	$(":checkbox[name=organCheckbox]:checked").each(function(){
		struIds.push(this.id);
		var organType = this.value;
		if(organType !=null && organType.indexOf("8")==0) {
			confirmInfo = msg2;
		}
	});

	delAction(struIds, confirmInfo);

}

function delAction(struIds, confirmInfo) {
	var msg1 = L.getLocaleMessage("bsp.organ.078","请选择要删除的记录！");
	var msg2 = L.getLocaleMessage("bsp.organ.079","删除成功！");
	if(struIds.length < 1) {
		alert(msg1);
		return false;
	}

	$.dialog({
		type : "confirm",
		content : confirmInfo,
		autofocus : true,
		ok : function() {
			$.ajax({
				url : context + "/service/bsp/organ/deleteOrgan/" + struIds.join(","),
				async : false,
				success : function(data) {
					sticky(msg2);
					// 刷新树节点和表格
					tree.reAsyncChildNodes(curNode, "refresh");
					grid.reload();
				},
				error : function(msg) {
					alert(msg.responseText);
				}
			});
		},
		cancel : function() {
		}
	});

}

// 排序
function sort() {
	var msg1 = L.getLocaleMessage("bsp.organ.080","下级排序");
	var msg2 = L.getLocaleMessage("bsp.organ.075","保存成功！");
	var url = context + "/service/bsp/organ/forSort/" + curNode["struType"] + "/" + curNode["struId"];
	$.dialog({
		type : "iframe",
		url : url,
		title : msg1,
		width : 580,
		height : 400,
		skin : "sort",
		onclose : function() {
			var returnVal = this.returnValue;
			if (returnVal) {
				sticky(msg2);
				// 刷新树节点和表格
				tree.reAsyncChildNodes(curNode, "refresh");
				grid.reload();
			}
		}
	});
}

// 导入
function importing() {
	var msg = L.getLocaleMessage("bsp.organ.012","导入");
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/organ/forImporting",
		title : msg,
		width : 580,
		height : 200,
		onclose : function() {
			tree.reAsyncChildNodes(rootNode, "refresh");
			grid.reload();
		}
	});
	$(".ui-dialog-body").css("padding","0px");
}

// 变更隶属关系
function change() {
	var msg1 = L.getLocaleMessage("bsp.organ.081","选择直接上级");
	$.dialog({
		type : "iframe",
		url : context + "/service/bsp/organHelp?isChkbox=0&selType=1;2&struType=" + struType,
		title : msg1,
		width : 580,
		height : 400,
		onclose : function() {
			var nodes = this.returnValue;
			if(!nodes) {
				return;
			}
			if(nodes.length > 0) {
				var data;
				var node = nodes[0];
				var struId = curNode["struId"];
				var newParentStruId = node["struId"];
				
				var data = data = "struId=" + struId + "&newParentStruId=" + newParentStruId;
				if(struType != "00") {
					data += "&struType=" + struType;
				}
				
				//执行变更
				$.ajax({
					url : context + "/service/bsp/organ/changing",
					data : data,
					success: function(data) {
						if(data.flag == "success") {
							var msg2 = L.getLocaleMessage("bsp.organ.082","成功变更隶属关系");
							sticky(msg2);
							// 刷新树节点
							tree.reAsyncChildNodes(rootNode, "refresh");
						} else {
							alert(data.msg);
						}
					},
					error : function(XMLHttpRequst, textStatus, errorThrown) {
						alert(errorThrown);
					}
				});
			}
		}
	});
}

////////////////////////////////   通用方法        /////////////////////////////////////////
// 控制域的显示和隐藏
function controlFieldAndValid() {
	$(".form-group.field").hide();
	
	// 要增加的组织类型：1-单位、2-部门、6-岗位、8-员工
	var organType = $("#organType").val();
	// 增加的业务机构类别：0-从行政机构树选择、1-创建虚拟节点
	var bizOrganType = $(":radio[name=bizType]:checked").val();
	
	if(status == "new") {
		if(struType == "00") {  //行政机构树
			if(organType == "6") {
				$(".form-group.position").show();
			}
			else {
				$(".form-group.organ").show();
			}
			
		} else {  //业务机构树
			$(".form-group.biz-organ").show();
			/*if(organType == "6") {
				$(".form-group.position").show();
				saveType = "position";
			}
			else */if(bizOrganType == "1" || status == "edit"){  //创建虚拟节点
				$(".form-group.organ").show();
				organMehtod = "addOrgan";
			}
			else if(organType){  //从行政机构树上选择
				$(".form-group.select-organ").show();
			}
		}
	}else{  //修改
		if($("#organType").data("organType") == "6") {
			$(".form-group.position").show();
		}else{
			$(".form-group.organ").show();
		}
	}
	
	vForm.ignore();
	vForm.unignore("input:visible, select:visible");
}