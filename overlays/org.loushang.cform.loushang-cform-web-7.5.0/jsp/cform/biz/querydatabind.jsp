<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.dbl" text="数据绑定"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		
		.ztree li span.button.add{
			margin-right: 2px;
			background-position: -142px 0px;
			vertical-align: top;
		}
		.form-inline .input-group{
			width: 200px;
		}		
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,bootstrap.js,ui.js,datatables.js,form.js,l5-adapter.js"/>
</head>
<body>
	<div class="container">
		<form class="form-inline" onsubmit="return false">	
			<div class="input-group">									
				<input type="text" class="form-control ue-form" id="dataBindName" placeholder="<s:message code="cf.name" text="名称"/>"/>											
				<div class="input-group-addon ue-form-btn" id="queryDataBind" >
					<span class="fa fa-search"></span>
			    </div>
			</div>
		    <div class="btn-group pull-right">
				<button id="addDataBind" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
				</button>
				<button id="batchDel" type="button" class="btn ue-btn">
					<span class="fa fa-trash"></span> <s:message code="cf.delete" text="批量删除"/>
				</button>
			</div>
		</form>
		<table id="dataBindList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="5%"><input type="checkbox" id="selectAll"/></th>
					<th width="25%">ID</th>
					<th width="20%"><s:message code="cf.name" text="名称"/></th>
					<th width="25%"><s:message code="cf.type" text="类型"/></th>
					<th width="15%"><s:message code="cf.display" text="是否显示"/></th>
					<th width="10%"><s:message code="cf.operation" text="操作"/></th>
				</tr>
			</thead>
		</table>
	</div>
</body>
<script type="text/javascript">
// 枚举值。
var fieldTypeEnum,isDisplayEnum;

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
	// 初始化枚举值。
	initEnum();
	
	// 初始化表格。
	initDataBindTable();
	
	// “全选”按钮。
	$("#selectAll").click(function(){
		selectAll(this.checked);
	});
	
	// 查询数据绑定。
	$("#queryDataBind").click(function(){
		queryDataBind();
	});
	
	//查询事件回车键绑定。
	$("#dataBindName").keydown(function(event){ 
		if(event.keyCode == 13){
			queryDataBind();
		} 
	});
	
	// “增加”按钮。
	$("#addDataBind").click(function(){
		addDataBind();
	});
	
	// 批量删除。
	$("#batchDel").click(function() {
		delDataBind();
	});
});

function initEnum() {
	// 域绑定类型枚举。
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.BIND_FIELD_TYPE");
	command.execute();
	fieldTypeEnum = command.getData();
	
	// 是否显示枚举
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "CFORM.IS_DISPLAY");
	command.execute();
	isDisplayEnum = command.getData();
}

// 初始化表格。
function initDataBindTable(){
	$("#dataBindList").dtable({
		// 显示“正在加载”的图标
		processing: true,
		serverSide: true,
		fnServerData: retrieveData,
		ordering: false,
		columns: [
		          {data: "code"},
		          {data: "code"},
		          {data: "name"},
		          {data: "fieldType"},
		          {data: "isDisplay"},
		          {data: "code"}
		          ],
		 columnDefs: [
 	                    {
 					        targets: 0,	    		       
 					        data: "code",
 					        render: function(data, type, full) {
 					           return '<input type="checkbox" value="' + data + '" id="checkbox" name="checkList"/>';
 					         }
 					     },
 	                    {
 					    	 targets: 1,	    		       
	 					     data: "code",
	 					     render: function(data, type, full) {
	 					    	 return "<a href=\"javascript:updateDataBind('"+data+"')\">" + data + "</a>";
	 					     }
 					     },
 	                    {
 					    	 targets: 3,	    		       
	 					     data: "fieldType",
	 					     render: function(data, type, full) {
	 					    	 var showVal = getFieldTypeName(data)
	 					    	 return showVal ? showVal : "(" + data + ")";
	 					     }
 					     },
 	                    {
 					    	 targets: 4,	    		       
	 					     data: "isDisplay",
	 					     render: function(data, type, full) {
	 					    	 return getIsDisplay(data);
	 					     }
 					     },
 					    {
  		    		    	targets: 5,
  		    		    	data: "id",
  		    		    	render: function(data,type,full){
  		    		    		var delBtn = "<a href=\"javascript:delDataBind('"+data+"')\">"+m("cf.delete","删除")+"</a>";
  		    		    		var editBtn = "<a href=\"javascript:updateDataBind('"+data+"')\">"+m("cf.edit","编辑")+"</a>";
  		    		    		return delBtn + "&nbsp;&nbsp;&nbsp;" + editBtn;
  		    		    	}
  		    		      }
 	                 ]
	});
}

// 获取域绑定类型显示值。
function getFieldTypeName(fieldType) {
	for(index in fieldTypeEnum) {
		if(fieldTypeEnum[index].value == fieldType) {
			return fieldTypeEnum[index].text;
		}
	}
}

// 获取是否显示。
function getIsDisplay(isDisplay) {
	for(index in isDisplayEnum) {
		if(isDisplayEnum[index].value == isDisplay) {
			return isDisplayEnum[index].text;
		}
	}
}

// 加载数据绑定数据。
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.DataBindQueryCmd");
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
	
	var dataBindName = $("#dataBindName").val();
	if(dataBindName) {
		cmd.setParameter("NAME@LIKE", dataBindName);
	}
	
	cmd.execute("queryDataBinds");
	var data = cmd.getData();
	var total = cmd.returns.total;
	var rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

// 查询数据绑定。
function queryDataBind() {
	$("#dataBindList").DataTable().ajax.reload();
}

// 新增数据绑定定义。
function addDataBind() {
	$.dialog({
		type: "iframe",
		title: m("cf.cdb", "新增数据绑定定义"),
		url: "adddatabind.jsp?status=new",
		width: 500,
		height: 370,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryDataBind();
			}
		}
	});
}

// 修改数据绑定定义。
function updateDataBind(code) {
	$.dialog({
		type: "iframe",
		title: m("cf.edb", "修改数据绑定定义"),
		url: "adddatabind.jsp?status=edit" + "&code=" + code,
		width: 500,
		height: 330,
		onclose: function () {
			var changed = this.returnValue;
			if(changed){
				sticky(m("cf.savesucceed", "保存成功!"));
				queryDataBind();
			}
		}
	});
}

// 删除数据绑定定义。
function delDataBind(code) {
	var codes = [];
	if(code) {
		codes.push(code);
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
		content: m("cf.confirmdel", "确定要删除选中的记录吗？"),
		autofocus: true,
		ok: function() {
			var command = new L5.Command("org.loushang.cform.biz.cmd.DataBindCmd");
			command.setParameter("codes", codes);
			command.execute("delete");
			if(!command.error){
				queryDataBind();
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