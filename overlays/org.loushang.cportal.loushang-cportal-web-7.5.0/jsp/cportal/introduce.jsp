<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>

<html>
<head>
	<title>云门户</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<l:asset path='css/loushang2016.css'/>"/>
    <style type="text/css">
	    .whole-div {
			width: 85%;
			margin: 0 auto 0 auto;
		}
		
		.model-container {
			height: 360px;
			margin-top: 50px;
			overflow: hidden;
			text-align: center;
		}
		
		.model-div {
			height: 150px;
			width: 240px;
			border: 1px solid #f0f0f0;
			background-color: #fafafa;
			text-align: center;
			line-height: 150px;
			font-size: 22px;
			font-family: "Microsoft YaHei";
			color: #737373;
			display: inline-block;
			margin: 15px;
		}
		
		.model-div:hover{
			background-color: #0be;
			border-color: #0be;
			color: white;
		}
		
		.model-btn {
			text-align: center;
			font-size: 40px;
			
		}
		
		
		.model-btn span{
			margin: 15px;
			color: #ddd;
			cursor: pointer;
		}
		
		.model-btn span:hover{
			color: gray;
		}
    </style>
</head>
<body>
	<div class="whole-div">
		<div class="model-container">
			<a href="page/querypage.jsp" class="model-div">
			<spring:message code="cportal.page.title" text="页面定义"/>
			</a>
			<a href="widget/querywidget.jsp" class="model-div">
			<spring:message code="cportal.widget.title" text="微件定义"/>
			</a>
		</div>
	</div>
</body>
<script type="text/javascript">
	
</script>
</html>