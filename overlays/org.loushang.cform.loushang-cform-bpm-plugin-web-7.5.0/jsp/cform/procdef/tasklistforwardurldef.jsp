<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title>任务列表跳转页面注册</title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		
		.ztree li span.button.add {
			margin-right: 2px;
			background-position: -142px 0px;
			vertical-align: top;
		}
		
		#forwardType font {
			color: #999;
		}
		
		#forwardType .ue-btn {
			border: 0;
		}
		
		.selected {
			background-color: #76bdf5;
			color: #fff;
		}
		.pull-right {
			margin-bottom:6px;
		}
	</style>

    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,datatables.js,l5-adapter.js,ui.js"/>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">
			<div id="forwardType" class="input-group">
				<font><s:message code="cf.type" text="类型"/>：</font>&nbsp;&nbsp;
				<button value="" type="button" class="btn ue-btn selected"><s:message code="cf.all" text="全部"/> </button>&nbsp;
			</div>
		    <div class="btn-group pull-right">
				<button id="addUrl" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
				</button>
				<button id="batchDel" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <s:message code="cf.delete" text="批量删除"/>
				</button>
			</div>
		</form>
		<table id="urlList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%"><input type="checkbox" id="selectAll"/></th>
					<th width="15%"><s:message code="cf.forwardtype" text="跳转类型"/></th>
					<th width="20%"><s:message code="cf.tasktype" text="任务类型"/></th>
					<th width="40%"><s:message code="cf.relativepath" text="跳转路径"/></th>
					<th width="20%"><s:message code="cf.operation" text="操作"/></th>
				</tr>
			</thead>
		</table>
	</div>
</body>
<script type="text/javascript">
// 枚举值
var forwardTypeEnum,taskTypeEnum;

// 弹窗
function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}

// 弹窗样式
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
	// 初始化枚举值
	initEnum();
	
	// 初始化表格
	initTable();
	
	// “全选”按钮
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	
	// “查询”按钮
	$("#forwardType .ue-btn").click(function(){
		$(this).siblings(".selected").removeClass("selected");
		$(this).addClass("selected");
		queryTaskListForwardUrlDefs();
	});
	
	// “增加”按钮
	$("#addUrl").click(function(){
		forInsertTaskListForwardUrlDef();
	});
	
	// 批量删除
	$("#batchDel").click(function() {
		deleteTaskListForwardUrlDef();
	});
});

// 初始化枚举值
function initEnum() {
	// 跳转类型枚举
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM_BPM.TASK_LIST_FORWARD_TYPE");
	command.execute();
	forwardTypeEnum = command.getData();
	for(i in forwardTypeEnum) {
		var $button = $("<button type='button'></button>");
		$button.prop("value", forwardTypeEnum[i].value);
		$button.prop("class", "btn ue-btn");
		$button.text(forwardTypeEnum[i].text);
		
		$("#forwardType").append($button);
		$("#forwardType").append("&nbsp;");
	}
	
	// 任务类型枚举。
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM_BPM.FORWARD_TASK_TYPE");
	command.execute();
	taskTypeEnum = command.getData();
}

// 初始化表格。
function initTable(){
	$("#urlList").dtable({
		// 显示“正在加载”的图标
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {"data": "id"},
		          {"data": "forwardType"},
		          {"data": "taskType"},
		          {"data": "relativePath"},
		          {"data": "id"}
		          ],
		 columnDefs: [
 	                    {
 					        targets: 0,
 					        data:"id",
 					        render: function(data, type, full) {
 					           return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkList"/>';
 					         }
 					     },
 	                    {
 					        targets: 1,
 					        data:"forwardType",
 					        render: function(data, type, full) {
 					           return getForwardTypeVal(data);
 					         }
 					     },
 	                    {
 					        targets: 2,
 					        data:"taskType",
 					        render: function(data, type, full) {
 					           return getTaskTypeVal(data);
 					         }
 					     },
 					    {
  		    		    	targets: 4,
  		    		    	data: "id",
  		    		    	render: function(data,type,full){
  		    		    		var delBtn = "<a href=\"javascript:deleteTaskListForwardUrlDef('"+data+"')\">"+m("cf.delete","删除")+"</a>";
  		    		    		var editBtn = "<a href=\"javascript:editTaskListForwardUrlDef('"+data+"')\">"+m("cf.edit","编辑")+"</a>";
  		    		    		return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
  		    		    		
  		    		    	}
  		    		    }
 	                  ]
	});
}

// 加载数据。
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.procdef.cmd.TaskListForwardUrlDefQueryCmd");
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
	var forwardType = $("#forwardType .ue-btn.selected").val();
	if(forwardType) {
		cmd.setParameter("FORWARD_TYPE", forwardType);
	}
	
	cmd.execute("queryTaskListForwardUrlDefs");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 获取跳转类型显示值。
function getForwardTypeVal(forwardType) {
	for(index in forwardTypeEnum) {
		if(forwardTypeEnum[index].value == forwardType) {
			return forwardTypeEnum[index].text;
		}
	}
}

// 获取任务类型显示值。
function getTaskTypeVal(taskType) {
	for(index in taskTypeEnum) {
		if(taskTypeEnum[index].value == taskType) {
			return taskTypeEnum[index].text;
		}
	}
}

// 查询
function queryTaskListForwardUrlDefs() {
	$("#urlList").DataTable().ajax.reload();
}

// 新增
function forInsertTaskListForwardUrlDef() {
	var type = $("#forwardType .ue-btn.selected").val();
	$.dialog({
		type: "iframe",
		title: m("cf.ctfp", "新增任务跳转路径"),
		url: "addtasklistforwardurldef.jsp?status=new" + "&type="+type,
		width: 500,
		height: 310,
		onclose: function() {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryTaskListForwardUrlDefs();
			}
		}
	});
}

// 修改
function editTaskListForwardUrlDef(id) {
	$.dialog({
		type: "iframe",
		title: m("cf.etfp", "修改任务跳转路径"),
		url: "addtasklistforwardurldef.jsp?status=edit" + "&id="+id,
		width: 500,
		height: 310,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryTaskListForwardUrlDefs();
			}
		}
	});
}

// 删除任务跳转路径
function deleteTaskListForwardUrlDef(id) {
	var ids = [];
	if(id) {
		ids.push(id);
	}else{
		var $selected = $(":checkbox[name=checkList]:checked");
		if($selected.length < 1) {
			UIAlert(m("cf.choosearecord", "请选择一条记录！"));
			return;
		}
		$selected.each(function(i, checkbox){
			ids.push($(checkbox).val());
		});
	}
	
	// 删除
	$.dialog({
		type: "confirm",
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.procdef.cmd.TaskListForwardUrlDefCmd");
			command.setParameter("ids", ids);
			command.execute("delete");
			if(!command.error){
				queryTaskListForwardUrlDefs();
				sticky(m("cf.deleted", "删除成功！"));
			}else{
				sticky(command.error.message, 'error', 'center');
			}
		},
		cancel: function(){}
	});
}

// checkbox全选 
function selectAll(checked){
	$(":checkbox[name=checkList]").prop("checked", checked);
}
</script>
</html>