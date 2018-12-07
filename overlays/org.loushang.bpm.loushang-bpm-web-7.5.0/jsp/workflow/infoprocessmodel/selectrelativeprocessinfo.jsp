<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%
	//是否需要设置流程类型，如果不需要，则隐藏流程类型设置tab页
	String needSetProcType = "0";//(String)request.getParameter("needSetProcType");
	String itemType=(String)request.getParameter("itemType");
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
	</style>
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,l5-adapter.js,knockout.js,ui.js,datatables.js,prettify.js"></l:script>
	<script type="text/javascript" src="processplugintyperegister.js"></script>
</head>
<body>
	<div class="container">
		<div class="btn-group pull-right">
			<button id="ok" type="button" class="btn ue-btn-primary"><spring:message code="BPM.INFOPROCESSMODEL.Confirm" text="确定"/></button>
		</div>
		<ul id="myTab" class="nav nav-tabs ue-tabs">
		    <li id="li_ProcessType" class="active"><a href="#processType" data-toggle="tab"><spring:message code="BPM.INFOPROCESSMODEL.FlowTypeSelection" text="流程类型选择"/></a></li>
		    <li id="li_BussinessModel"><a href="#bussinessModel" data-toggle="tab"><spring:message code="BPM.INFOPROCESSMODEL.BusinessModelSelect" text="业务模型选择"/></a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
		    <div class="tab-pane active" id="processType" name="processType" >
		        <iframe name="iframe2" src="selectProcessType.jsp" scrolling="auto" frameborder="no" border="0" width="100%" height="400px" ></iframe>
		    </div>
		    <div class="tab-pane "id="bussinessModel" name="bussinessModel" >
		        <iframe name="iframe1" src="selectBussinessModel.jsp" scrolling="auto" frameborder="no" border="0" width="100%" height="400px"></iframe>
		    </div>
		</div>
	</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	var needSetProcType = "<%=needSetProcType%>";
	var itemType="<%=itemType%>";			
 	if(itemType==1){//版本类型，1为Html
		if(needSetProcType == "0"){
			$("#bussinessModel").hide();
			$("#processType").hide();
		}else{
			$("#bussinessModel").hide();
			$("#li_BussinessModel").hide();
		}
	}else{//itemType=0,flex版本
		if(needSetProcType == "0"){
			$("#processType").hide();
			$("#li_ProcessType").hide();
			$("#bussinessModel").addClass("active");
			$("#li_BussinessModel").addClass("active");
		}
	} 
})
$("#ok").click(function(){
	var BM = iframe1.window.returnBM(); 
	var PT = iframe2.window.returnPT();
	if(BM){
		var tmp=BM.split("@");
	}
	var ret=new Array();
	ret[0]=PT;
	if(tmp){
		ret[1]=tmp[0];
		ret[2]=tmp[1];
	}
	var dialog = parent.dialog.get(window);
	var retu={
		flag:true,
		data:ret
	}
	dialog.close(retu);
	dialog.remove();
	return false;
});
</script>
</html>