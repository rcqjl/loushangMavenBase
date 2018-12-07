<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>用户详细信息</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='/dev/css/base.css'/>" />
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/datatables.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='bsp/css/userself/user.css'/>"/>
	
	<style>
	  .container {
	  	width: 100%;
	  }
	</style>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
	<script  type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='datatables.js'/>"></script>
	<script  type="text/javascript" src="<l:asset path='bsp/userself/user.js'/>"></script>
	<%-- <script  type="text/javascript" src="<l:asset path='ui.js'/>"></script> --%>
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
	<script id="searchpanel" type="text/html">
	  
	</script>
	<script type="text/javascript">
		var context="<%=request.getContextPath()%>";
	</script>
</head>
<body>
	<!-- 位置导航 -->
	<!-- <div class="sitemap">
		左侧面包屑
		<div class="sitemap-left">
			<a href="">系统管理</a>&nbsp;&nbsp;/&nbsp;&nbsp;权限管理
			&nbsp;&nbsp;/&nbsp;&nbsp;用户管理
		</div>
		右侧“返回上一级”
		<div class="sitemap-right">
			<a id="go-back" href="#">返回上一级</a>			
		</div> 
	</div> -->
	<!-- <div class="topdist"></div> -->
	<div class="container">
		<form class="form-inline" onsubmit="return false;">										
			 <div class="input-group pull-left">
		        <input class="form-control ue-form" type="text" id="queryInput" placeholder="请输入登录名或用户名称"/>
		        <div class="input-group-addon ue-form-btn" id="query">
		        	<span class="fa fa-search"></span>
		        </div>
	        </div>
		    <div class="btn-group pull-right">
				<button id="add" type="button"
					class="btn ue-btn">
					<span class="fa fa-plus"></span>增加
				</button>
				 <button id="batchdel" type="button"
					class="btn ue-btn">
					<span class="fa fa-trash"></span>批量删除
				</button> 
				<!-- <button id="modify" type="button" class="btn ue-btn">
					<span class="fa fa-pencil"></span> 修改
				</button>  -->
			</div>
			
		</form>
		<table id="userList" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th width="20px" style="text-align: left;padding-left: 12px;" data-field="userId" data-sortable="false" data-render="checkBox" >
					<input type="checkbox" id="selectAll"
						onclick="selectAll(this,'checkList')"  /></th>
					<th width="20%" data-field="userId" data-sortable="false" >登录名</th>
					<th width="20%"data-field="userName" data-sortable="false" >用户名称</th>
					<!-- <th width="15%">是否是管理员</th> -->
					<th width="10%" data-field="accountStatus" data-sortable="false" data-render="accountStatus" >账号状态</th>
					<th width="20%" data-field="createTime" data-sortable="false" >创建时间</th>
					<th width="150px" data-sortable="false" data-render="manager" >操作</th>
				</tr>
			</thead>
		</table>
	</div>
</body>
</html>