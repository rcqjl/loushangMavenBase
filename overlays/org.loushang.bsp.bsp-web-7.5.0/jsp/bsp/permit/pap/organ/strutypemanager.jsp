<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>组织视角管理</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<style type="text/css">
		.wrap-div {
			
		}
		.stru-container {
			width: 800px;
			margin: auto;
			margin-top: 70px;
		}
		.stru-type {
			height: 100px;
			width: 240px;
			border: 1px solid #ddd;
			background-color: #fafafa;
			margin: 10px;
			float: left;
		}
		.stru-type:hover{
			background-color: #00bbee;
			border-color: #00bbee;
		}
		.stru-type .oper-btn {
			height: 22%;
		}
		.stru-type .oper-btn span {
			width: 40px;
			text-align: center;
			float: right;
			margin: 1px;
			background: #008cb0;
			color: white;
			cursor: pointer;
		}
		.stru-type .stru-type-name {
			height: 78%;
			padding-top: 12px;
			font-size: 22px;
			font-family: "Microsoft YaHei";
			text-align: center;
			color: #737373;
			cursor: pointer;
		}
		.stru-type .stru-type-name span{
			display: block;
		    width: 90%;
		    margin: auto;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		}
		.stru-type:hover .stru-type-name {
			color: white;
		}
		
		.add-stru-type {
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
		.add-stru-type:hover {
			border-style: solid;
			border-color: #00bbee;
		}
		@media(max-width:768px) {
			.stru-container {
				width:660px;
				margin: auto;
				margin-top: 70px;
			}
			.stru-type,.add-stru-type {
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
	<script type="text/javascript" src="<l:asset path='loushang-framework.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
	<script type="text/javascript" src="<l:asset path='bsp/organ/strutypemanager.js'/>"></script>
</head>
<body>
	<div class="wrap-div">
		<div class="stru-container">
			<c:forEach items="${struTypeList}" var="item" varStatus="itemStatus">
				<div class="stru-type" data-type="${item.struType}">
					<div class="oper-btn">
					</div>
					<div class="stru-type-name">
						<span title="${item.struTypeName}">${item.struTypeName}</span>
					</div>
				</div>
			</c:forEach>
			<div class="add-stru-type">
				<span class="fa fa-plus"></span> <span><spring:message code="bsp.organ.058" text="创建组织视角"/></span>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var context = "<l:assetcontext/>";
</script>
</html>