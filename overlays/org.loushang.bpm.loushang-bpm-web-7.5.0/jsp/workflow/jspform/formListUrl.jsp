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
					<input type="text" class="form-control ue-form" id="searchId" placeholder="Url名称"/>											
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
						<th width="10%"><spring:message code="BPM.JSPFORM.UrlID" text="UrlID"></spring:message></th>
						<th width="25%"><spring:message code="BPM.JSPFORM.UrlName" text="Url名称"></spring:message></th>
						<th width="25%"><spring:message code="BPM.JSPFORM.PCFormUrl" text="PC表单Url"></spring:message></th>
						<th width="13%"><spring:message code="BPM.JSPFORM.PhoneFormUrl" text="手机表单Url"></spring:message></th>
						<th width="13%"><spring:message code="BPM.JSPFORM.PadFormUrl" text="Pad表单Url"></spring:message></th>
						<th width="9%"><spring:message code="BPM.JSPFORM.Operating" text="操作"></spring:message></th>
					</tr>
				</thead>
			</table>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
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
function initformList(){
	var table = $("#formList").dtable({
			"processing": true,
		    "serverSide": true,
		    "fnServerData": retrieveData,
		    "ordering": false,
			"columns": [
		                  {"data": "id"},
		                  {"data": "urlId"},
		                  {"data": "urlName"},
		                  {"data": "urlValue"},
		                  {"data": "phoneUrlValue"},
		                  {"data": "padUrlValue"},
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
				       						if(data){
			 					    			return "<li title='"+ data +"'>"+data+"</li>";
			 					    		}else{
			 					    			return "";
			 					    		}
	       								}
	                       },
	                       {
		       					"targets":4,	    		       
		       					"render": function(data, type, full) {
				       						if(data){
			 					    			return "<li title='"+ data +"'>"+data+"</li>";
			 					    		}else{
			 					    			return "";
			 					    		}
	       								}
	                       },
	                       {
		       					"targets":5,	    		       
		       					"render": function(data, type, full) {
				       						if(data){
			 					    			return "<li title='"+ data +"'>"+data+"</li>";
			 					    		}else{
			 					    			return "";
			 					    		}
	       								}
	                       },
	                        {
		    		    		"targets": 6,
		    		    		"render": function(data,type,full){
		    		    			var delBtn = "<a href=\"javascript:del('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Delete","删除")+"</a>";
		    		    			var editBtn = "<a href=\"javascript:update('"+data+"')\">"+L.getLocaleMessage("BPM.PROCESSTYPE.Modify","编辑")+"</a>";
		    		    			return  editBtn + "&nbsp;&nbsp;&nbsp;" + delBtn;
		    		    			//return editBtn;
		    		    	}
	                       }
		       	      	]
		});
		return table;
}

function retrieveData( sSource, aoData, fnCallback ) {
	var draw=null;
	var cmd = new L5.Command("org.loushang.workflow.jspform.formdef.requesturl.cmd.RequestUrlQueryCmd");
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
		cmd.setParameter("URL_NAME@like",$("#searchId").val());
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
		url: "modifyFormUrl.jsp?id=" + id+"&formId="+ formId,
		width: 500,
		height: 270,
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
	         url: "modifyFormUrl.jsp?status=new&formId="+ formId,
	         title: L.getLocaleMessage("BPM.JSPFORM.Add","新增"),
	         width: 500,
	         height: 270,
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
	var command=new L5.Command("org.loushang.workflow.jspform.formdef.requesturl.cmd.RequestUrlCommand"); 
	var fieldId = id;
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
</script>
</html>