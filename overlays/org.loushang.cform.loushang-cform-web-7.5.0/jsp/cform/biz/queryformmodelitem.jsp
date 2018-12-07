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
				<button id="back" type="button" class="btn ue-btn">
					<span class="fa fa-undo"></span> <s:message code="cf.return" text="返回"/>
				</button>
			</div>
		</form>
		<table id="columnList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="20%"><s:message code="cf.name" text="名称"/></th>
					<th width="20%"><s:message code="cf.alias" text="别名"/></th>
					<th width="20%"><s:message code="cf.coltype" text="类型"/></th>
					<th width="20%"><s:message code="cf.length" text="长度"/></th>
					<th width="10%"><s:message code="cf.pk" text="主键"/></th>
					<th width="10%"><s:message code="cf.fk" text="外键"/></th>
				</tr>
			</thead>
		</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	// 初始化表格。
	initTable();
	
	// 查询。
	$("#query").click(function(){
		queryModelItem();
	});
	
	// 查询事件回车键绑定。
	$("#colName").keydown(function(event){
		if(event.keyCode == 13){
			queryModelItem();
		}
	});
	
	// “返回”按钮。
	$("#back").click(function(){
		back();
	});
});

// 初始化表格。
function initTable(){
	$("#columnList").dtable({
		// 显示“正在加载”的图标。
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "modelItemId"},
		          {data: "modelItemName"},
		          {data: "modelItemType"},
		          {data: "modelItemLength"},
		          {data: "isPk"},
		          {data: "isFk"}
		         ],

	});
};

// 加载数据。
function retrieveData(sSource, aoData, fnCallback){
	var draw = null;
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemQueryCmd");
	for(var i = 0; i < aoData.length; i++){
		  if(aoData[i].name == "draw"){
			  draw = aoData[i].value;
		  }
		  if(aoData[i].name == "start"){
			  cmd.setParameter("start", aoData[i].value);
		  }
		  if(aoData[i].name == "length"){
			  cmd.setParameter("limit", aoData[i].value);
		  }
	}
	
	// 设置参数。
	cmd.setParameter("MODEL_ID", "${param.modelId}");
	
	var colName = $("#colName").val();
	if(colName){
		cmd.setParameter("MODEL_ITEM_NAME@LIKE", colName);
	}
	
	cmd.execute("queryBizModelItems");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询
function queryModelItem() {
	$("#columnList").DataTable().ajax.reload();
}

// 返回
function back() {
	window.location.href = "queryformmodel.jsp";
}
</script>
</html>