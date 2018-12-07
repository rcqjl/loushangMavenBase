<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
	String formId = request.getParameter("id");
%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/prettify.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.table {
			table-layout:fixed;
		}
		.table tr td li{
			overflow-x: hidden;
			text-overflow: ellipsis;
		    white-space: nowrap;
		}
	</style>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js,bpm/util.js"></l:script>
	<script type="text/javascript">
		var formId = "<%=formId %>";
	</script>
</head>
<body>
	<div class="container">
			<form class="form-inline" onsubmit="return false">	
				<div class="input-group">									
					<input type="text" class="form-control ue-form" id="searchId" placeholder="<spring:message code="BPM.JSPFORM.AreaName" text="域名称"></spring:message>"/>											
					<div type="button" class="input-group-addon ue-form-btn" id="query" >
						<span class="fa fa-search"></span>
				    </div>
				</div>
			    <div class="btn-group pull-right">
					<button id="add" type="button" class="btn ue-btn">
						<span class="fa fa-plus"></span><spring:message code="BPM.JSPFORM.Add" text="新增"></spring:message>
					</button>
					<button id="delete" type="button" class="btn ue-btn">
						<span class="fa fa-trash"></span><spring:message code="BPM.JSPFORM.Del" text="删除"></spring:message>
					</button>
					<button id="back" type="button" class="btn ue-btn">
						<span class="fa fa-undo"></span><spring:message code="BPM.JSPFORM.Return" text="返回"></spring:message>
					</button>
				</div>
			</form>
			<table id="formList" class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="5%"><input type="checkbox" id="selectAll" /></th>
						<th width="25%"><spring:message code="BPM.JSPFORM.AreaID" text="域ID"></spring:message></th>
						<th width="40%"><spring:message code="BPM.JSPFORM.AreaName" text="域名称"></spring:message></th>
						<th width="10%"><spring:message code="BPM.JSPFORM.AreaType" text="域类型"></spring:message></th>
						<th width="10%"><spring:message code="BPM.JSPFORM.FormType" text="表单类型"></spring:message></th>
						<th width="10%"><spring:message code="BPM.JSPFORM.Operating" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	initEnum();
	initformList();
	$("#query").click(function(){
		$("#formList").DataTable().ajax.reload();
	});
	$("#delete").click(function(){
		del();
	});
	$("#back").click(function(){
		location.href = "form_query.jsp";
	});
});
//初始化表格Field
function initformList(){
	var table = $("#formList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "id"},
		                  {"data": "fieldId"},
		                  {"data": "fieldName"},
		                  {"data": "fieldType"},
		                  {"data": "deviceType"},
		                  {"data": "id"}
		                ],
	        "columnDefs": [
	                       {
		       					"targets":0,	    		       
		       					"render": function(data, type, full) {
		       						return '<input type="checkbox"  id="' + data + '" name="checkbox"/>';
		       					}
	                       },
	                       {
		       					"targets":1,	    		       
		       					"render": function(data, type, full) {
		       						var id = full.id;
		       						return "<a title='"+data +"' href=\"javascript:update('"+ id +"')\">"+data+"</a>";
		       					}
                     	  },
                     	 {
		       					"targets":2,	    		       
		       					"render": function(data, type, full) {
				       						if(data){
			 					    			return "<li title='"+ data +"'>"+data+"</li>";
			 					    		}else{
			 					    			return "";
			 					    		}				
		       							}
	                       },
	                       {
		       					"targets":3,	    		       
		       					"render": function(data, type, full) {
		 					    	return getJspFormDataFieldTypeEnum(data);
		       					}
	                       },
	                       {
		       					"targets":4,	    		       
		       					"render": function(data, type, full) {
		 					    	return getJspFormDeviceTypeEnum(data);
		       					}
	                       },
	                       {
		    		    		"targets": 5,
		    		    		"render": function(data,type,full){
		    		    			var delBtn = "<a href=\"javascript:del('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Delete","删除")+"</a>";
		    		    			var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Modify","编辑")+"</a>";
		    		    			return editBtn + "&nbsp;&nbsp;&nbsp;" + delBtn;
		    		    			//return  editBtn;
		    		    		}
		    		      }
		       	      	]
		});
		return table;
}
function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.jspform.formdef.field.cmd.FieldQueryCmd"); 
	var rData;
	for(var i = 0; i<aoData.length; i++){
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
	var formId = "<%=formId%>";
	cmd.setParameter("FORM_ID",formId);
	if($("#searchId").val()){
		cmd.setParameter("FIELD_NAME@like",$("#searchId").val());
	}
	cmd.execute("query");
	var data = cmd.getData();
	if(!data){
		data = {};
	}
	var total = cmd.returns.total;
	if(!total){
		total = 0;
	}
	rData = {"sEcho":"sEcho","draw":draw,"iTotalRecords":total,"iTotalDisplayRecords":total,"aaData":data};
    fnCallback(rData);
}

//更新
function update(id){
	$.dialog({
		type: "iframe",
		title: L.getLocaleMessage("BPM.JSPFORM.Modify","修改"),
		url: "modifyFormField.jsp?id=" + id+"&formId="+ formId,
		width: 500,
		height: 320,
        onclose: function () {
            $("#formList").DataTable().ajax.reload();
            if(this.returnValue){
           	 sticky(L.getLocaleMessage("BPM.JSPFORM.Tip1","保存数据成功！"));
            }
		}
	});
}
//新增
$(function(){
	var formId = "<%=formId%>";
	$("#add").click(function(){
		$(this).blur();
		$.dialog({
	         type: 'iframe',
	         url: "modifyFormField.jsp?status=new&formId="+ formId,
	         title: L.getLocaleMessage("BPM.JSPFORM.Add","新增"),
	         width: 500,
	         height: 320,
	         onclose: function () {
	             $("#formList").DataTable().ajax.reload();
	             if(this.returnValue){
	            	 sticky(L.getLocaleMessage("BPM.JSPFORM.Tip1","保存数据成功！"));
	             }
	         }	
		});
	});
})

function del(id){
	var flag = true;
	if(($("input[name='checkbox']:checked").length>0)||id){
		$.dialog({
            type: 'confirm',
            content: L.getLocaleMessage("BPM.JSPFORM.Tip2","确实要删除选中记录吗？"),
            //确定按钮，回调函数
            ok: function () {
            	if(id){
            		flag = delById(id, flag);
            	} else {
            		var Id;
            		$("input:checked").each(function(){
            			Id = $(this).attr("id");
            			flag = delById(Id, flag);
            		});
            	}
            	if (flag){
            		//UIAlert("删除成功！");
            		sticky(L.getLocaleMessage("BPM.JSPFORM.Tip3","删除成功！"));
				}
            },
            //取消按钮，回调函数
            cancel: function () {}
        });	
	}else {
		UIAlert(L.getLocaleMessage("BPM.JSPFORM.Tip4","请选要删除的记录！"));
	}
}
function delById(id, flag) {
	var command=new L5.Command("org.loushang.workflow.jspform.formdef.field.cmd.FieldCmd"); 
	command.setParameter("id",id);
	command.execute("delete");
	if (!command.error) {
		$("#formList").DataTable().ajax.reload();
	}else{
		flag = false;
		sticky(command.error.msg, 'error', 'center');
	}
		return flag;
}

//加载枚举
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "JSP_FORM_DATA_FIELD_TYPE");
	command.execute();
	jspFormDataFieldTypeEnum = command.getData();
	command.setParameter("enumName", "JSP_FORM.DEVICE_TYPE");
	command.execute();
	jspFormDeviceTypeEnum = command.getData();
}
//域类型
function getJspFormDataFieldTypeEnum(Id) {
	for(index in jspFormDataFieldTypeEnum) {
		if(jspFormDataFieldTypeEnum[index].value == Id) {
			return jspFormDataFieldTypeEnum[index].text;
		}
	}
}
//表单设备类型
function getJspFormDeviceTypeEnum(Id) {
	for(index in jspFormDeviceTypeEnum) {
		if(jspFormDeviceTypeEnum[index].value == Id) {
			return jspFormDeviceTypeEnum[index].text;
		}
	}
}

</script>
</html>