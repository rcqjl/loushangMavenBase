<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.bizmd" text="业务表源数据"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ztree.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: 0px;
		}
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.form-inline .input-group{
			width: 200px;
		}		
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,ztree.js,datatables.js,l5-adapter.js,ui.js"/>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<ul id="formTypeTree" class="ztree"></ul>
		</div>
	</div>
	<div class="ue-menu-right">
		<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">									
					<input type="text" class="form-control ue-form" id="modelName" placeholder="<s:message code="cf.name" text="名称"/>"/>											
					<div class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
				<div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
					</button>
				</div>
			</form>
			<table id="bizModelList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="30%">ID</th>
						<th width="30%"><s:message code="cf.name" text="名称"/></th>
						<th width="30%"><s:message code="cf.masterform" text="所属主表"/></th>
						<th width="10%"><s:message code="cf.operation" text="操作"/></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</body>
<script type="text/javascript">
var context = "<l:assetcontext/>";
// 弹窗函数
function UIAlert(msg) {
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
	// 初始化表格
	initTable();
	// 初始化业务表元数据类别树
	initFormTypeTree();
	// 查询
	$("#query").click(function(){
		queryModel();
	});
	
	// 查询事件回车键绑定
	$("#modelName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryModel();
		} 
	});
	
	// “增加”按钮
	$("#add").click(function(){
		addBizModel();
	});
});

// 初始化表格
function initTable(){
	$("#bizModelList").dtable({
		// 显示“正在加载”的图标
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "modelId"},
		          {data: "modelName"},
		          {data: "parentModelName"},
		          {data: "modelId"}
		          ],
		columnDefs: [
		            	{
		            		"targets": 0,
					    	"data": "formId",
					    	"render": function(data, type, full){
					    		return "<a href=\"javascript:selectItem('"+data+"','"+full.modelName+"')\">"+data+"</a>";
					    	}
		            	},
		            	{
		            		"targets": 3,
					    	"data": "modelId",
					    	"render": function(data, type, full){
					    		var delBtn = "<a href=\"javascript:delModel('"+data+"')\">"+m("cf.delete","删除")+"</a>";
					    		var editBtn = "<a href=\"javascript:updateBizModel('"+data+"','"+full.bizModelType+"')\">"+m("cf.edit","编辑")+"</a>";
					    		return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
					    	}
		            	}
		            ]
	});
}

// 加载数据。
function retrieveData(sSource, aoData, fnCallback){
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelQueryCmd");
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
	
	// 查询表单表。
	cmd.setParameter("MODEL_TYPE", "1");
	var modelName = $("#modelName").val();
	if(modelName){
		cmd.setParameter("MODEL_NAME",modelName);
	}
	if(curRecord && !curRecord.isRoot){
		cmd.setParameter("BIZ_MODEL_TYPE",curRecord.id);
	}
	cmd.execute("queryBizModels");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询业务模型。
function queryModel() {
	$("#bizModelList").DataTable().ajax.reload();
}

// 增加业务模型。
function addBizModel() {
	if(!curRecord){
		UIAlert(m("cf.choosetype", "请点击左侧树，选择一个类别！"));
		return false;
	}
	
	var bizModelType = curRecord.id;
	$.dialog({
		type: "iframe",
		title: "选择数据源",
		url: context + "/jsp/cform/biz/querydatasource.jsp",
		width: 770,
		height: 360,
		onclose: function () {
			var rtn = this.returnValue;
			var url = "addbizmodel.jsp?status=new"+"&bizModelType="+bizModelType
			if(rtn!=""&&rtn!=null){
				url = "addbizmodel.jsp?status=new"+"&bizModelType="+bizModelType+"&dsId="+rtn
			}
			$.dialog({
				type: "iframe",
				title: m("cf.cm", "新增业务模型"),
				url: url,
				width: 500,
				height: 230,
				onclose: function () {
					var changed = this.returnValue;
					if(changed){
						sticky(m("cf.savesucceed", "保存成功!"));
						// 清除查询条件。
						$("#modelName").val("");
						queryModel();
					}
				}
			});
		}
	});
}

// 修改业务模型。
function updateBizModel(modelId,bizModelType) {
	$.dialog({
		type: "iframe",
		title: m("cf.em", "修改业务模型"),
		url: "addbizmodel.jsp?status=edit" + "&modelId="+modelId+"&bizModelType="+bizModelType,
		width: 500,
		height: 180,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				// 清除查询条件。
				$("#modelName").val("");
				queryModel();
			}
		}
	});
}

// 查询模型项。
function selectItem(modelId,modelName) {
	window.location.href = "querybizmodelitem.jsp?modelId=" + modelId
}

// 删除业务模型。
function delModel(modelId) {
	// 查询是否可以删除
	if(isRefExisted(modelId)) {
		UIAlert(m("cf.cd", "该业务模型存在关联，不能删除！"));
		return;
	}
	
	// 删除
	$.dialog({
		type: "confirm",
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelCmd");
			command.setParameter("codes", [modelId]);
			command.execute("delete");
			if(!command.error){
				sticky(m("cf.deleted", "删除成功！"));
				queryModel();
			}else{
				sticky(command.error.message, 'error', 'center');
			}
		},
		cancel: function(){}
	});
}

// 后台校验是否可以删除。
// 返回true则表示存在关联，不能删除。
function isRefExisted(modelId) {
	// 后台校验，判断是否可以删除
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelCmd");
	command.setParameter("modelId", modelId);
	command.execute("isRefExisted");
	if(!command.error){
		return command.getReturn("isExisted");
	}else{
		sticky("error", 'error', 'center');
		return false;
	}
}
////////////////////////////////////////////树/////////////////////////////////
/**
 * 初始化业务表元数据类别树。
 */
function initFormTypeTree() {
	var formTypeTree = [];
	// 根节点
	var rootJson = {
			id:'-1', 
			name: m("cf.bmt", "业务表类别树"), 
			isParent: true,
			iconSkin:"icon01",
			isRoot: true
	}; 
	formTypeTree.push(rootJson);
	
	// ztree设置
	var treeSetting = {
		edit : {
			enable : true,
		},
		data : {
			key : {
				name : "name"
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey: "parentId",
				rootPId: null
			}
		},
		async : {
			enable : true,
			url : context + "/command/dispatcher/"
					+ "org.loushang.cform.biz.cmd.BizModelTypeDispatcherCmd/"
					+ "getBizModelTypes",
			autoParam : [ "id" ],
			dataFilter : dataFilter
		},
		callback : {
			onClick: onClick,
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		view : {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom
		}
	};
	
	// 初始化表单类别树
	var tree = $.fn.zTree.init($("#formTypeTree"), treeSetting, formTypeTree);
	// 打开根节点
	tree.expandNode(tree.getNodes()[0],true,false,true);
}
function dataFilter(treeId, parentNode, childNodes) {
	return childNodes;
}
// 鼠标悬停在节点上时，添加操作按钮。
function addHoverDom(treeId, treeNode) {
	// “增加”按钮。
	addNewBtn(treeId, treeNode);
	
	// 根节点只显示“增加”按钮。
	if(treeNode.isRoot){
		return;
	}
	
	// “修改”按钮。
	addModifyBtn(treeId, treeNode);
	// “删除”按钮。
	addDelBtn(treeId, treeNode);
};
// 添加“增加”按钮。
function addNewBtn(treeId, treeNode){
	// 组装“增加”按钮的id。
	var newBtnId = treeNode.tId + "_new";
	if ($("#"+newBtnId).length>0) {
		return;
	}
	
	var addStr = "<span id='"+newBtnId+"' class='button add' title='"+m("cf.createtype", "增加类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(addStr);
	
	// 绑定事件
	$("#"+newBtnId).bind("click", function(){
		var parentName = treeNode.name;
		var parentId = treeNode.id;
		$.dialog({
			type: "iframe",
			url: "addbizmodeltype.jsp?parentName=" + parentName + "&parentId=" + parentId + "&status=new",
			title: m("cf.cbmt", "新增业务表类别"),
			width: 500,
			height: 300,
			onclose: function () {
				var returnVal = this.returnValue;
					
				// 在树中添加节点
				if(returnVal) {
					sticky(m("cf.savesucceed", "保存成功!"));
					var newNode = {
							id: returnVal.id,
							name: returnVal.name
					}
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.addNodes(treeNode, newNode);
				}
			}
		});

	});
};
//添加“修改”按钮
function addModifyBtn(treeId, treeNode){
	// 组装“修改”按钮的id
	var editBtnId = treeNode.tId + "_edit";
	if ($("#"+editBtnId).length>0) {
		return;
	}
	
	var editBtn = "<span id='"+editBtnId+"' class='button edit' title='"+m("cf.edittype", "修改类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(editBtn);
	
	// 绑定事件
	$("#"+editBtnId).bind("click", function(){
		// 获取节点信息
		var typeId = treeNode.id;
		var parentName = treeNode.getParentNode().name;
		$.dialog({
			type: "iframe",
			url: "addbizmodeltype.jsp?status=edit" + "&typeId=" + typeId + "&parentName=" + parentName,
			title: m("cf.ebmt", "修改业务表类别"),
			width: 500,
			height: 260,
			onclose: function () {
				var returnVal = this.returnValue;
				
				// 修改树中的节点信息
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

// 添加“删除”按钮
function addDelBtn(treeId, treeNode){
	// 组装“删除”按钮的id
	var delBtnId = treeNode.tId + "_remove";
	if ($("#"+delBtnId).length>0) {
		return;
	}
	
	var delBtn = "<span id='"+delBtnId+"' class='button remove' title='"+m("cf.deltype", "删除类别")+"'></span>";
	$("#" + treeNode.tId + "_a").append(delBtn);
	
	// 绑定事件
	$("#"+delBtnId).bind("click", function(){
		var typeId = treeNode.id;
		
		var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelTypeCmd");
		command.setParameter("id", typeId);
		command.execute("isDelAble");
		if(command.returns.map.delAble=="0"){
			UIAlert(m("cf.mos", "类别下存在模型或子类别，不能删除！"));
			return false;
		}
		
		$.dialog({
			type: "confirm",
			content: m("cf.confirmdel", "确定删除？"),
			autofocus: true,
			ok: function(){
				var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelTypeCmd");
				command.setParameter("id", typeId);
				command.execute("delete");
				if(command.error){
					sticky(command.error.message, 'error', 'center');
				}else{
					var treeObj = $.fn.zTree.getZTreeObj(treeId);
					treeObj.removeNode(treeNode);
					sticky(m("cf.deleted", "删除成功！"));
				}
			},
			cancel: function(){}
		});
		
	})
};

// 鼠标离开节点时
function removeHoverDom(treeId, treeNode) {
	// 移除操作按钮
	$("#"+treeNode.tId + "_new").unbind().remove();
	$("#"+treeNode.tId + "_remove").unbind().remove();
	$("#"+treeNode.tId + "_edit").unbind().remove();
};
//当前选中的树节点
var curRecord;
/**
 * 单击节点，查询该类别下的表单
 */
function onClick(e,treeId, treeNode) {
	// 记录当前选中的节点
	curRecord = treeNode;
	
	// 清空查询条件
	$("#modelName").val(null);
	
	// 重新加载数据
	$("#bizModelList").DataTable().ajax.reload();
}

</script>
</html>