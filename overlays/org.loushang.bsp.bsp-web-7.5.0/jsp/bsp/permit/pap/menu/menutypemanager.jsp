<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>菜单管理</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.wrap-div {
			
		}
		.menu-container {
			width: 800px;
			margin: auto;
			margin-top: 70px;
		}
		.menu-type {
			height: 100px;
			width: 240px;
			border: 1px solid #ddd;
			background-color: #fafafa;
			margin: 10px;
			float: left;
		}
		.menu-type:hover{
			background-color: #00bbee;
			border-color: #00bbee;
		}
		.menu-type .oper-btn {
			height: 22%;
		}
		.menu-type .oper-btn span {
			width: 40px;
			text-align: center;
			float: right;
			margin: 1px;
			background: #008cb0;
			color: white;
			cursor: pointer;
		}
		.menu-type .menu-type-name{
			height: 78%;
			padding-top: 12px;
			font-size: 22px;
			font-family: "Microsoft YaHei";
			text-align: center;
			color: #737373;
			cursor: pointer;
		}
		.menu-type .menu-type-name span{
			display: block;
		    width: 90%;
		    margin: auto;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		}
		.menu-type:hover .menu-type-name {
			color: white;
		}
		.menu-type-default{
			background-color: #00bbee;
			border-color: #00bbee;
		}
		.menu-type-default .menu-type-name span {
			color: white;
		}
		
		.add-menu-type {
			height: 100px;
			width: 240px;
			border: 2px dashed #ddd;
			background-color: #fff;
			margin: 10px;
			float: left;
			cursor: pointer;
			font-size: 18px;
			font-family: "Microsoft YaHei";
			line-height: 100px;
			text-align: center;
			color: #737373;
		}
		.add-menu-type:hover {
			border-style: solid;
			border-color: #00bbee;
		}
		@media(max-width:768px) {
			.menu-container {
				width:660px;
				margin: auto;
				margin-top: 70px;
			}
			.menu-type,.add-menu-type {
				height: 90px;
				width: 200px;
			}
		}
	</style>
	<!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->	
	<script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bootstrap.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='form.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/menu/menutypemanager.js'/>"></script>
</head>
<body>
	<div class="wrap-div">
		<div class="menu-container">
			<c:forEach items="${menuType}" var="item" varStatus="itemStatus">
				<div class="menu-type<c:if test='${item.isSysDefault eq "1"}'> menu-type-default</c:if>"
					data-type="${item.menuTypeId}">
					<div class="oper-btn"></div>
					<div class="menu-type-name">
						<span title="${item.menuTypeName}">${item.menuTypeName}</span>
					</div>
				</div>
			</c:forEach>
			<div class="add-menu-type">
				<span class="fa fa-plus"></span> <span><spring:message code="bsp.menu.000" text="创建菜单类别"></spring:message></span>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>