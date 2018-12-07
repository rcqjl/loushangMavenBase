<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<title><s:message code="cf.itemlist" text="列"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: 0px;
			margin: 5px;
			margin-top: 0;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,datatables.js,ui.js,l5-adapter.js"/>
</head>
<body>
	<div class="ue-menu-wrap">
		<form class="form-inline" onsubmit="return false">	
			<div class="input-group">									
				<input type="text" class="form-control ue-form" id="colName" placeholder="<s:message code="cf.alias" text="别名"/>"/>											
				<div class="input-group-addon ue-form-btn" id="query" >
					<span class="fa fa-search"></span>
			    </div>
			</div>
			<div class="btn-group pull-right">
				<button id="add" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
				</button>
				<button id="batchDel" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <s:message code="cf.delete" text="批量删除"/>
				</button>
				<button id="back" type="button" class="btn ue-btn">
					<span class="fa fa-undo"></span> <s:message code="cf.return" text="返回"/>
				</button>
			</div>
		</form>
		<table id="columnList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%"><input type="checkbox" id="selectAll"/></th>
					<th width="20%"><s:message code="cf.name" text="名称"/></th>
					<th width="20%"><s:message code="cf.alias" text="别名"/></th>
					<th width="15%"><s:message code="cf.coltype" text="类型"/></th>
					<th width="10%"><s:message code="cf.length" text="长度"/></th>
					<th width="10%"><s:message code="cf.pk" text="主键"/></th>
					<th width="10%"><s:message code="cf.fk" text="外键"/></th>
					<th width="10%"><s:message code="cf.operation" text="操作"/></th>
				</tr>
			</thead>
		</table>
	</div>
</body>
<script type="text/javascript">
var modelId = "${param.modelId}";
// 列类型与主外键枚举值
var modelItemTypeEnum,isKeyEnum;
// 弹窗函数
function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}

//弹窗样式
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg,
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    }
	);
}
// 国际化。
function m(code, defMsg) {
	return L.getLocaleMessage(code, defMsg);
}

$(document).ready(function(){
	// 加载枚举
	initEnum();
	
	// 初始化表格
	initTable();
	
	// “全选”按钮
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	
	// 查询
	$("#query").click(function(){
		queryModelItem();
	});
	
	//查询事件回车键绑定
	$("#colName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryModelItem();
		} 
	});
	
	// “增加”按钮
	$("#add").click(function(){
		addBizModelItem();
	});
	
	// “批量删除”按钮
	$("#batchDel").click(function() {
		delItem();
	});
	
	// “返回”按钮
	$("#back").click(function(){
		back();
	});
});

// 加载枚举
function initEnum() {
	// 列类型枚举
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.MODEL_ITEM_TYPE");
	command.execute();
	modelItemTypeEnum = command.getData();
	
	// 是否主外键枚举
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_KEY");
	command.execute();
	isKeyEnum = command.getData();
}

// 初始化表格
function initTable(){
	$("#columnList").dtable({
		// 显示“正在加载”的图标
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "modelItemId"},
		          {data: "modelItemId"},
		          {data: "modelItemName"},
		          {data: "modelItemType"},
		          {data: "modelItemLength"},
		          {data: "isPk"},
		          {data: "isFk"},
		          {data: "modelItemId"}
		         ],
		columnDefs: [
		             {
				        targets: 0,	    		       
				        data: "modelItemId",
				        render: function(data, type, full) {
				           return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkList"/>';
				         }
				     },
		             {
		            	 targets: 1,
		            	 data: "modelItemId",
		            	 render: function(data, type, full) {
		            		 return "<a href=\"javascript:updateItem('"+data+"')\">" + data + "</a>";
		            	 }
		             },
		             {
		            	 targets: 3,
		            	 data: "modelItemType",
		            	 render: function(data, type, full) {
		            		 var name = getModelItemTypeName(data);
				    		 if(!name) {
				    			 return "(" + data + ")";
				    		 } else {
				    			 return name;
				    		 }
		            	 }
		             },
		             {
		            	 targets: 5,
		            	 data: "isPk",
		            	 render: function(data, type, full) {
		            		 return getIsKey(data);
		            	 }
		             },
		             {
		            	 targets: 6,
		            	 data: "isFk",
		            	 render: function(data, type, full) {
		            		 return getIsKey(data);
		            	 }
		             },
		             {
		            	 targets: 7,
	    		    	 data: "modelItemId",
	    		    	 render: function(data,type,full){
	    		    		 var delBtn = "<a href=\"javascript:delItem('"+data+"')\">"+m("cf.delete","删除")+"</a>";
	    		    		 var editBtn = "<a href=\"javascript:updateItem('"+data+"')\">"+m("cf.edit","编辑")+"</a>";
	    		    		 
	    		    		 return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
	    		    	 }
		             }
		            ]

	});
};

// 加载数据
function retrieveData(sSource, aoData, fnCallback){
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemQueryCmd");
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
	
	// 设置参数
	cmd.setParameter("MODEL_ID", modelId);
	
	var colName = $("#colName").val();
	if(colName){
		cmd.setParameter("MODEL_ITEM_NAME@LIKE",colName);
	}
	
	cmd.execute("queryBizModelItems");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询业务模型项
function queryModelItem() {
	$("#columnList").DataTable().ajax.reload();
}

// 新增业务模型项
function addBizModelItem() {
	$.dialog({
		type: "iframe",
		title: m("cf.cmi", "新增业务模型项"),
		url: "addbizmodelitem.jsp?status=new" + "&modelId=" + modelId,
		width: 500,
		height: 360,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				// 清除查询条件
				$("#colName").val("");
				queryModelItem();
			}
		}
	});
}

// 修改业务模型项
function updateItem(modelItemId) {
	$.dialog({
		type: "iframe",
		title: m("cf.emi", "修改业务模型项"),
		url: "addbizmodelitem.jsp?status=edit" + "&modelId=" + modelId + "&modelItemId=" + modelItemId,
		width: 500,
		height: 320,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				// 清除查询条件
				$("#colName").val("");
				queryModelItem();
			}
		}
	});
}

// 删除业务模型项
function delItem(modelItemId) {
	var modelIds = [];
	var modelItemIds = [];
	if(modelItemId) {
		modelIds.push(modelId);
		modelItemIds.push(modelItemId);
	}else{
		var $selected = $(":checkbox[name=checkList]:checked");
		if($selected.length < 1) {
			UIAlert(m("cf.choosearecord", "请选择一条记录！"));
			return;
		}
		$selected.each(function(i, checkbox){
			modelIds.push(modelId);
			modelItemIds.push($(checkbox).val());
		});
	}
	// 后台校验是否存在关联
	for(i in modelItemIds) {
		if(isRefExisted(modelItemIds[i])) {
			UIAlert(m("cf.cd", "该业务模型存在关联，不能删除！") + "： [" + modelItemIds[i] + "]");
			return;
		}
	}
	
	// 删除
	$.dialog({
		type: "confirm",
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemCmd");
			command.setParameter("modelIds", modelIds);
			command.setParameter("modelItemIds", modelItemIds);
			command.execute("delete");
			if(!command.error){
				sticky(m("cf.deleted", "删除成功！"));
				queryModelItem();
			}else{
				sticky(command.error.message, 'error', 'center');
			}	
		},
		cancel: function(){}
	});
}

// 后台校验是否可以删除
function isRefExisted(modelItemId) {
	var command = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemCmd");
	command.setParameter("modelId", modelId);
	command.setParameter("modelItemId", modelItemId);
	command.execute("isRefExisted");
	if (!command.error) {
		return command.getReturn("isExisted");
	} else {
		sticky("error", 'error', 'center');
		return;
	}
}

// 获取类型显示值
function getModelItemTypeName(modelItemType) {
	for(index in modelItemTypeEnum) {
		if(modelItemTypeEnum[index].value == modelItemType) {
			return modelItemTypeEnum[index].text;
		}
	}
}

// 获取是否主外键显示值
function getIsKey(isKey) {
	for(index in isKeyEnum) {
		if(isKeyEnum[index].value == isKey) {
			return isKeyEnum[index].text;
		}
	}
}

// 返回
function back() {
	window.location.href = "querybizmodel.jsp";
}

// checkbox全选 
function selectAll(checked){
	$(":checkbox[name=checkList]").prop("checked", checked);
}
</script>
</html>