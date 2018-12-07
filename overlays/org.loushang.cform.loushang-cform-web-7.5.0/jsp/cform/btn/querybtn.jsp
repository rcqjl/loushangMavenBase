<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title><s:message code="cf.actionbtn" text="表单操作定义"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/ztree.css,css/datatables.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: 0px;
		}
		
		.ztree li span.button.add{
			margin-right: 2px;
			background-position: -142px 0px;
			vertical-align: top;
		}
		
		.container {
			width: 100%;
			margin-left: 0px;
			margin-right: 0px;
		}
		.ue-menu-right{
			overflow:auto;
		}
		.form-inline .input-group{
			width: 200px;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,form.js,bootstrap.js,ztree.js,datatables.js,ui.js,l5-adapter.js"/>
	<script type="text/javascript" src="querybtn.js"></script>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="ue-menu-left">
			<ul id="btnTypeTree" class="ztree"></ul>
		</div>
		
		<div class="ue-menu-right">
			<div class="container">
				<form class="form-inline" onsubmit="return false">	
					<div class="input-group">									
						<input type="text" class="form-control ue-form" id="btnName" placeholder="<s:message code="cf.name" text="名称"/>"/>											
						<div class="input-group-addon ue-form-btn" id="queryBtn" >
							<span class="fa fa-search"></span>
					    </div>
					</div>
				    <div class="btn-group pull-right">
						<button id="addBtn" type="button" class="btn ue-btn">
							<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
						</button>
						<button id="batchDel" type="button" class="btn ue-btn">
							<span class="fa fa-trash"></span> <s:message code="cf.delete" text="批量删除"/>
						</button>
					</div>
				</form>
				<table id="btnList" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%"><input type="checkbox" id="selectAll"/></th>
							<th width="30%">ID</th>
							<th width="25%"><s:message code="cf.name" text="名称"/></th>
							<th width="25%"><s:message code="cf.function" text="函数"/></th>
							<th width="15%"><s:message code="cf.operation" text="操作"/></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
</html>