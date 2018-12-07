<!DOCTYPE html>
<%@page contentType="text/html; charset=utf-8"%>
<%@taglib uri="/tags/loushang-web" prefix="l"%>
<%@taglib uri="/tags/l5-adapter" prefix="model"%>
<%@page import="org.loushang.workflow.api.WfQuery"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%
	String path = request.getContextPath();
	String bspAppName=BspUtil.getInstance().getBspAppPath();
	String basePath;
	String bspAppPath;
	if (80 == request.getServerPort()) {
		basePath = request.getScheme() + "://"
			+ request.getServerName()
			+ path + "/";
		bspAppPath = request.getScheme() + "://"
				+ request.getServerName()
				+ bspAppName + "/";
	} else {
		basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
		bspAppPath = request.getScheme() + "://"
				+ request.getServerName() + ":" + request.getServerPort()
				+bspAppName + "/";
	}
%>
<%
	String primaryKey = request.getParameter("dataId");
	if (primaryKey == null)
		primaryKey = "";
	//任务类型--0:新建任务,1:待办任务,2:已办任务,3:办结任务
	String actDefUniqueId = (String) request.getParameter("actDefUniqueId");
	String taskType = request.getParameter("taskType");
	String deviceType = (String) request.getParameter("deviceType");
	//调用接口获取该环节的按钮信息及域信息
	List actButtonsList = WfQuery.getActButtons(actDefUniqueId,taskType, deviceType);
//	System.out.println("actButtonsList: "+ actButtonsList);
	List actFieldsList = WfQuery.getActFields(actDefUniqueId);
//	System.out.println("actFieldsList: "+ actFieldsList);
	String fieldId, fieldName, isHidden, isReadOnly, isNotNull;
	
%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<style type="text/css">
		.container {
			width: 100%;
			margin-bottom:10px;
		}
		.form-group{
			margin-left:-150px !important;
		}
		.Validform_input {
			width: 48%;
		}
		.required {
			top: 3px;
		}
		textarea.form-control {
			height: 82px;
		}
	</style>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<!-- 需要引用的JS -->
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='ui.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='l5-adapter.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='knockout.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bpm/util.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bpm/bpm.js'/>"></script>

	<script type="text/javascript">
		var bspAppPath='<%=bspAppPath%>';
		var basePath = '<%=basePath%>';
		var actButtonsList = '<%=actButtonsList%>';
		var actFieldsList = new Array();
	 	<%
		   if(actFieldsList!=null){
		  	  for(int i=0;i<actFieldsList.size();i++){
		%>
				actFieldsList[<%=i%>]='<%=actFieldsList.get(i)%>';
		<%    } 
		   }
		%>
		
		var actButtonsList = new Array();
	 	<%
		   if(actButtonsList!=null){
		  	  for(int i=0;i<actButtonsList.size();i++){
		%>
				actButtonsList[<%=i%>]='<%=actButtonsList.get(i)%>';
		<%    } 
		   }
		%>
	</script>
</head>
<body>
	<div class="container">
		 <div id="buttonDiv" class="btn-group pull-right" style=" margin-bottom:16px;">
		 
		</div>
	</div>
		
	<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
		<input type="hidden" id="id" name="id" />
	    <div class="form-group" >
	        <label class="col-sm-3 control-label">出差人<span class="required">*</span></label>
	        <div class="col-sm-9">
	            <input class="form-control ue-form Validform_input" id="traveller" name="traveller" placeholder="出差人" type="text" datatype="s" nullmsg="请填写出差人!">
	            <span class="Validform_checktip Validform_span"></span>
	        </div>
	    </div>
	    <div class="form-group" >
	        <label class="col-sm-3 control-label">出差目的地<span class="required">*</span></label>
	        <div class="col-sm-9">
	            <input class="form-control ue-form Validform_input" id="travelDest" name="travelDest"  placeholder="出差目的地" type="text" datatype="s" nullmsg="请填写出差目的地!">
	            <span class="Validform_checktip Validform_span"></span>
	        </div>
	    </div>
	    <div class="form-group">
	        <label class="col-sm-3 control-label">出差费用<span class="required">*</span></label>
	        <div class="col-sm-9">
	            <input class="form-control ue-form Validform_input" id="travelFee" name="travelFee"  type="text" datatype="n" nullmsg="请填写出差费用!">
	            <span class="Validform_checktip Validform_span"></span>
	        </div>
	    </div>
		<div class="form-group">
			<label class="col-sm-3 control-label">领导审批意见<span class="required">*</span></label>
			<div class="col-sm-9">
				<textarea class="form-control ue-form Validform_input" id="leaderApprove" name="leaderApprove"  rows="5" datatype="*" nullmsg="领导审批意见不能为空!"></textarea>	
				<span class="Validform_checktip Validform_span"></span>
			</div>			
		</div>   
		<div class="form-group">
			<label class="col-sm-3 control-label">财务审批意见<span class="required">*</span></label>
			<div class="col-sm-9">
				<textarea class="form-control ue-form Validform_input" id="financeApprove" name="financeApprove" data-bind="value: financeApprove" rows="5" datatype="*" nullmsg="财务审批意见不能为空!" ></textarea>	
				<span class="Validform_checktip Validform_span"></span>
			</div>			
		</div> 	
		<input type="hidden" name="assignmentId" id="assignmentId"/>
		<input type="hidden" name="procDefUniqueId" id="procDefUniqueId"/>
		<input type="hidden" name="startActDefUniqueId" id="startActDefUniqueId"/>
	</form>
	
</body>
<script type="text/javascript">
var context = "<l:assetcontext/>";
$(document).ready(function(){
	
 	actFiledsArr = list2Arr(actFieldsList);
	//表单中域是否显示设置
	dealWithField(actFiledsArr);
	//按钮显示
 	actButtonsArr = list2Arr(actButtonsList);
 	dealWithButton(actButtonsArr);
 	
 	dealWithCommandContext();
 	
 	var primaryKey = '<%=primaryKey%>';
	if(primaryKey != "" ){
	    $.ajax({
		      type: "post",
		      url: context + "/service/demo/workflow/travelloan/query",
		      data:{"id" : primaryKey},
		      success: function(map) {
		          if (map != null) {
		        	  $.each(map, function(key, value) { 
		        		  $("#"+key).val(value);
	        		  }); 
			         
		    	  } else {
		    		  sticky("获取出错", 'error', 'center');
		    	  }
		          
		      }
	    });
	}
	
	/****************表单校验******************/
	 demo = $("#saveForm").Validform({
        btnSubmit:".ue-btn",
        tiptype:function(msg,o,cssctl){
            var objtip=o.obj.siblings(".Validform_checktip");
            cssctl(objtip,o.type);
            objtip.text(msg);
        },
        callback:function(form){
        }
    }); 
	/***********************************/

})

/*
 * 按钮展现控制
 */
function dealWithButton(actButtonsArr) {
 	var html="";
	for(var i=0;i<actButtonsArr.length;i++){
		var t = actButtonsArr[i].map;
		var buttonName=t.buttonName;
		var buttonFunName=t.buttonFunName;
		if(i<2){
			html+='<button type="button" class="btn ue-btn" onclick="'+buttonFunName+'"><span class="fa fa-plus"></span>'+buttonName+'</button>'
		}else{
			if(i==2){
				html+='<div class="btn-group">'+
						'<button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">更多操作<span class="fa fa-caret-down"></span> </button>'+
						'<ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">'+
							'<li><a onclick="'+buttonFunName+'"><span class="fa fa-plus"></span>'+buttonName+'</a></li>'
			}else{
				html+=		'<li><a onclick="'+buttonFunName+'"><span class="fa fa-plus"></span>'+buttonName+'</a></li>'
			}
			if(i==actButtonsList.length-1){
				html+=  '</ul>'+
					 '</div>'
			}
		}
	}
	$("#buttonDiv").append(html);
}


function dealWithCommandContext(){
	 $("#assignmentId").val(getProcessInfoFromContext("assignmentId"));
     $("#procDefUniqueId").val(getProcessInfoFromContext("procDefUniqueId"));
     $("#startActDefUniqueId").val(getProcessInfoFromContext("startActDefUniqueId"));
}

function list2Arr(actFieldsList){
	var arr = new Array();
	for(var i =0; i< actFieldsList.length; i++){
		var str =actFieldsList[i].substring(1,actFieldsList[i].length-1);
		str = str.split(",");
		var data=new L5.Map();
		for (var j in str){
			var obj = str[j].trim();
			obj = obj.split("=");
			var key=obj[0];
			var value=obj[1];
			data.put(key,value);
		}
		arr.push(data);
	}
	return arr;
}


//创建操作
function create(){
	if(!validateNotNull()){
		return false;
	}
	debugger;
   $.ajax({
	      type: "post",
	      url: context + "/service/demo/workflow/travelloan/create",
	      data: $("form").serialize(),
	      success: function(flag) {
	          if (flag) {
	      		//跳转到已办任务页面
	      		var url = "jsp/workflow/tasklist/querydaiban.jsp";
	      		var htmlUrl = basePath + url;
	      		OKAlert("创建流程成功!", htmlUrl);
	    	  } else {
	    		  sticky("创建流程失败", 'error', 'center');
	    	  }
	      }
    });
}

//创建并发送操作
function createAndSend(){
	if(!validateNotNull()){
		return false;
	}
   $.ajax({
	      type: "post",
	      url: context + "/service/demo/workflow/travelloan/createAndSend",
	      data: $("form").serialize(),
	      success: function(flag) {
	          if (flag) {
	        	  var url = "jsp/workflow/tasklist/queryyiban.jsp";
	      		  var htmlUrl = basePath + url;
	      		  OKAlert("流程发起并发送成功!", htmlUrl);
	    	  } else {
	    		  sticky("发送失败", 'error', 'center');
	    	  }
	      }
    });
}

//保存操作
function save(){
	if(!validateNotNull()){
		return false;
	}
	
    $.ajax({
      type: "post",
      url: context + "/service/demo/workflow/travelloan/update",
      data: $("form").serialize(),
      success: function(flag) {
          if (flag) {
        	  UIAlert("保存成功!");
    	  } else {
    		  sticky("保存出错", 'error', 'center');
    	  }
      }
    });
}

//发送操作
function send(){
	if(!validateNotNull()){
		return false;
	}
    $.ajax({
	      type: "post",
	      url: context + "/service/demo/workflow/travelloan/send",
	      data: $("form").serialize(),
	      success: function(flag) {
	          if (flag) {
	        	  var url = "jsp/workflow/tasklist/queryyiban.jsp";
	      		  var htmlUrl = basePath + url;
	      		  OKAlert("流程发送成功!", htmlUrl);
	    	  } else {
	    		  sticky("发送失败", 'error', 'center');
	    	  }
	      }
    });
}

//退回操作
function back(){
	if(!validateNotNull()){
		return false;
	}
	$.ajax({
	      type: "post",
	      url: context + "/service/demo/workflow/travelloan/back",
	      data: $("form").serialize(),
	      success: function(flag) {
	          if (flag) {
	        	  //跳转到已办任务页面
	      		  var url = "jsp/workflow/tasklist/queryyiban.jsp";
	      		  var htmlUrl = basePath + url;
	      		  OKAlert("退回成功!", htmlUrl);
	    	  } else {
	    		  sticky("退回失败", 'error', 'center');
	    	  }
	      }
    });
}

//撤回任务操作
function revoke(){
	if(!validateNotNull()){
		return false;
	}
	$.ajax({
	      type: "post",
	      url: context + "/service/demo/workflow/travelloan/revoke",
	      data: $("form").serialize(),
	      success: function(flag) {
	          if (flag) {
	        	  //跳转到已办任务页面
      		      var url = "jsp/workflow/tasklist/querydaiban.jsp";
	      		  var htmlUrl = basePath + url;
	      		  OKAlert("撤回成功!", htmlUrl);
	    	  } else {
	    		  sticky("撤回失败", 'error', 'center');
	    	  }
	      }
  	});
}

//弹窗函数
function OKAlert(content, url){
	$.dialog({
           type: 'alert',
           content: content,
           ok: function () {
        	   	location.href=url;	   
           }
    });
}

/*
 * 域设置函数，在页面初始化时调用
 */
function dealWithField(actFieldsArr){
	//遍历list，如果该页面上某个域需要隐藏，则设置该行为不显示
	//如果域是只读的则显示为只读
	//如果是非空的，则在域后面添加非空标志
	for(var i=0;i<actFieldsArr.length;i++){
		var t = actFieldsArr[i];
		fieldId = t.map.fieldId;
		if(!fieldId) {
			UIAlert("控制域不存在");
			return false;
		}
		isHidden = t.map.isHidden;
		isReadOnly = t.map.isReadOnly;
		isNotNull = t.map.isNotNull;
		
		//var fieldTag = $("#"+target).find("div .Validform_input");
		var fieldDiv = $("#"+fieldId).parent().parent();
    	var fieldSpan = $("#"+fieldId).parent().parent().find(".required");
    	fieldSpan.hide();
    	
    	if (1 == isHidden){
    		fieldDiv.hide();
    	} else if (1 == isReadOnly){
    		$("#"+fieldId).attr("readonly", true);
    	} else if (1 == isNotNull){
    		fieldSpan.show();
    	}
	}
}
/*
 * 校验非空的域是否为空
 */
function validateNotNull(){
	//遍历数组，如果是非空的，则在点击按钮时进行校验 ，若为空弹出提示框
	for(var i=0; i<actFiledsArr.length; i++){
		var t = actFiledsArr[i];
		var fieldId = t.map.fieldId;
		var fieldName = t.map.fieldName;
		var isNotNull = t.map.isNotNull;
		//如果限制为非空，未输入值点击按钮时弹出提示框
		if (1 == isNotNull){
			var value = $("#"+fieldId).val();
			if (value == null || value== "") {
				UIAlert(fieldName + "不能为空!");
				return false;
			}
		}
	}  
	return true;
}
</script>
</html>