<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@page import="org.loushang.next.data.Record"%>
<%@page import="org.loushang.next.data.DataSet"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="org.loushang.workflow.util.bsp.WfStru"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@page import="org.loushang.workflow.util.WfPageBtnDefApi"%>
<%@page import="org.loushang.workflow.util.WfProcessPluginTypeApi"%>
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
String displaySourceTypes=request.getParameter("displaySourceTypes");
%>
<html>
<head>
	<!-- 需要引用的CSS -->
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
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
		.form-group {
			margin-left:15px !important;
			margin-bottom:5px !important;
			width: 220px !important;
			width: 270px\9 !important;
		}
		.ue-form{
			background-color: #FFF;
		}
		.extrawidth{
			width: 150px !important;
			width: 170px\9 !important;
		}
		.pull_left{
			float:left;
		}
		.pull_right{
			float:right;
		}
		.btn{
			margin-left: 17px;
		}
		.labelel{
			float:left;
			margin-top:2px;
			margin-right:7px;
		}
		.nversion {
			width: 170px\9;
		}
		.popover {
			max-width: 296px\9;
			z-index: 1000;
		}
	</style>
  	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<!-- 需要引用的JS -->
	<l:script path="jquery.js,bootstrap.js,form.js,ztree.js,l5-adapter.js,knockout.js,ui.js,datatables.js,bpm/util.js"></l:script>
	<script type="text/javascript" src="query.js"></script>
	<%
		List jsPathList=WfProcessPluginTypeApi.getJsPathList();
			for(int i=0; i<jsPathList.size(); i++){
				String jsPath=(String)jsPathList.get(i);
		
	%>
		<script type="text/javascript" src="<%=basePath + jsPath%>"></script>
	<%
			}
	%>	
	<script type="text/javascript">
		//bsp应用地址
		var bspAppPath='<%=bspAppPath%>';
		//通过下面的一行代码为js中的updateOrganPro传参数组织机构根节点
		var displaySourceTypes='<%=displaySourceTypes%>';
		var basePath = '<%=basePath%>';
		var loginUserId = '<%=BspUtil.getInstance().getLoginUserId()%>';
	</script>
	<script id="searchpanel" type="text/html">
	  <div id="searchtemp" class="form-horizontal">
		<div class="form-group">
				<input type="text" class="form-control ue-form extrawidth" id="searchOrgan" placeholder="<spring:message code="BPM.INFOPROCESSMODEL.SubordinateUnits" text="所属单位"/>" onclick="selectCorp(this)"/>
		</div>
		<div class="form-group">
			<div class="pull_left nversion">
				<label class="labelel"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowVersion" text="版本："/></label>
				<select class="ue-form" id="searchProcessVersion">
		        	 <option value=""><spring:message code="BPM.INFOPROCESSMODEL.All" text="全部"/></option>
		       	  	 <option value="0"><spring:message code="BPM.INFOPROCESSMODEL.NewVersion" text="新版本"/></option>
		       		 <option value="1"><spring:message code="BPM.INFOPROCESSMODEL.OldVersion" text="旧版本"/></option>
		   		</select>
			</div>
			<div>
	        	<button type="button" id="search" class="btn ue-btn-primary"><spring:message code="BPM.INFOPROCESSMODEL.Query" text="搜索"/></button>
			</div>
		</div>
      <div>
	</script>
</head>
<body>
	<div class="ue-menu-wrap" style="top: 0px;">
		<div class="ue-menu-left">
			<ul id="procTypeTree" class="ztree"></ul>
		</div>
	
		<div class="ue-menu-right">
	
			<div class="container">
				<form class="form-inline" onsubmit="return false">
					<div class="input-group">
						<input type="text" class="form-control ue-form" id="searchProcessName" placeholder="<spring:message code="BPM.INFOPROCESSMODEL.WorkflowName" text="流程名称"/>"/>
						<div  class="input-group-addon ue-form-btn" id="query" >
							<span class="fa fa-search"></span>
						</div>	
					</div>
					<a class="btn ue-btn dbtn" id="moresearch"><spring:message code="BPM.INFOPROCESSMODEL.MoreSearch" text="更多搜索"/><i class="fa fa-angle-down"></i></a>
		
				    <div class="btn-group pull-right">
				  		<% 
						List ds = WfPageBtnDefApi.getProcDefPageButtonDef();
						boolean flag = true;
						for(int i = 0; i < ds.size(); i++) {
							Map btnDef = (HashMap) ds.get(i);
							String itemType = (String)btnDef.get("itemType");
							String pluginType = (String) btnDef.get("pluginType");
							String pluginPath = (String) btnDef.get("pluginPath");
							if (pluginPath.startsWith("/")) {
								pluginPath = pluginPath.substring(1);
							}
							String displayName = (String) btnDef.get("displayName");
							String needSetProcType = (String) btnDef.get("needSetProcType");
							String temp = "'"+pluginType + ";" + needSetProcType+";"+itemType+";"+pluginPath+"'";
							if(i<1){
						%>
									<button type="button" class="btn ue-btn" onclick="insertNewProcessDef(<%=temp %>)">
										<span class="fa fa-plus"></span> <%=displayName%>
									</button>
						<%		
							} else {
								if(flag){
						%>
						<div class="btn-group">
							<button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="BPM.INFOPROCESSMODEL.MoreCreate" text="更多新增"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
				            	<li><a onclick="insertNewProcessDef(<%=temp %>)"><span class="fa fa-plus"></span><%=displayName%></a></li>
			            <% 
			            			flag = false;
								}else{
			            %>
					           <li><a onclick="insertNewProcessDef(<%=temp %>)"><span class="fa fa-plus"></span><%=displayName%></a></li>
						<% 
								}
								if(i==ds.size()-1){
						%> </ul>
						</div>
						<%
								}
							}
						}
						%>
		   				<button id="release" type="button" class="btn ue-btn">
							<span class="fa fa-paper-plane"></span> <spring:message code="BPM.INFOPROCESSMODEL.Release" text="发布"/>
						</button>
						<button id="delete" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <spring:message code="BPM.INFOPROCESSMODEL.Delete" text="删除"/>
						</button>			
						<div class="btn-group">
				            <button class="btn ue-btn dropdown-toggle" type="button" data-toggle="dropdown">
								<spring:message code="BPM.INFOPROCESSMODEL.More" text="更多"/><span class="fa fa-caret-down"></span>
				            </button>
				            <ul class="dropdown-menu dropdown-menu-right ue-dropdown-menu">
					           <li><a id="updateProcessType"><span class="fa fa-pencil"></span><spring:message code="BPM.INFOPROCESSMODEL.ModifyType" text="修改流程类型"/></a></li>
					           <li><a id="updateOwnOrgan"><span class="fa fa-pencil"></span><spring:message code="BPM.INFOPROCESSMODEL.ModifyUnits" text="修改所属单位"/></a></li>
				               <li><a id="processImport"><span class="fa fa-download"></span><spring:message code="BPM.INFOPROCESSMODEL.ImportWorkflow" text="导入流程"/></a></li>
				               <li><a id="processExport"><span class="fa fa-upload"></span><spring:message code="BPM.INFOPROCESSMODEL.ExportWorkflow" text="导出流程"/></a></li>
				            </ul>
				         </div>								
					</div>
				</form>
				<table id="procList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="4%"><input type="checkbox" id="selectAll"/></th>
							<th width="27%"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowName" text="流程名称"/></th>
							<th width="8%"><spring:message code="BPM.INFOPROCESSMODEL.WorkflowVersion" text="流程版本"/></th>
							<th width="8%"><spring:message code="BPM.INFOPROCESSMODEL.IsRelease" text="是否发布"/></th>
							<th width="8%"><spring:message code="BPM.INFOPROCESSMODEL.SubordinateUnits" text="所属单位"/></th>
							<th width="12%"><spring:message code="BPM.INFOPROCESSMODEL.CreateTime" text="创建时间"/></th>
							<th width="10%"><spring:message code="BPM.INFOPROCESSMODEL.Operation" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>