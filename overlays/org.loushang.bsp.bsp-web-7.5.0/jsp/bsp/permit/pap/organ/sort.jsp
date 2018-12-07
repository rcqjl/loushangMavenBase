<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<html>
<head>
	<title>下级排序</title>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<style type="text/css">
		.left, .right {
			height: 87%;
		}
		.left {
			position: absolute;
			background: #fafafa;
			width: 70%;
		}
		ul {
			margin-bottom: 0;
		}
		.ue-list {
			background: inherit;
		}
		.ue-list li {
			padding: 5px;
			padding-left: 15px;
		}
		.ue-list li:hover {
			background: #ddd;
		}
		.ue-list li.selected {
			background: #ccc;
		}
		.ue-list li span {
			margin-right: 5px;
		}
		
		.right {
			padding-top: 50px;
			position: absolute;
			width: 30%;
			margin-left: 70%;
			text-align: center;
			border-left: 1px solid #ddd;
		}
		.right .ue-btn {
			margin-bottom: 5px;
		}
		#top, #down {
			margin-bottom: 50px;
		}
		
		.footer {
			position: absolute;
			height: 13%;
			width: 100%;
			bottom: 0;
			border-top: 1px solid #ddd;
			text-align: right;
		}
		.footer .btn {
			margin-top: 10px;
		}
		#cancel {
			margin-right: 20px;
		}
	</style>
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <script type="text/javascript" src="<l:asset path='jquery.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='form.js'/>"></script>
    <script type="text/javascript" src="<l:asset path='i18n.js'/>"></script>
</head>
<body>
	<div class="wrap">
		<div class="left">
			<ul class="ue-list">
				<c:forEach items="${organList}" var="item" varStatus="itemStatus">
				    <li>
				        <span class="ue-relative-layout">
				            <input type="radio" name="organ">
				        </span>
				        <input class="struId" type="hidden" value="${item.struId}"/>
				        <span class="organName">
				        	<c:choose>
				        		<c:when test="${!empty item.struName}">${item.struName}</c:when>
				        		<c:otherwise>${item.organName}</c:otherwise>
				        	</c:choose>
				        </span>
				    </li>
				</c:forEach>
			</ul>
		</div>
		<div class="right">
			<button id="top" class="btn ue-btn"><span class="fa fa-arrow-up"></span><spring:message code="bsp.organ.054" text="置于顶部"/></button>
			<button id="up" class="btn ue-btn"><span class="fa fa-arrow-up"></span><spring:message code="bsp.organ.055" text="上移一行"/></button>
			<button id="down" class="btn ue-btn"><span class="fa fa-arrow-down"></span><spring:message code="bsp.organ.056" text="下移一行"/></button>
			<button id="bottom" class="btn ue-btn"><span class="fa fa-arrow-down"></span><spring:message code="bsp.organ.057" text="置于底部"/></button>
		</div>
		<div class="footer">
			<button id="save" class="btn ue-btn-primary"><spring:message code="bsp.organ.003" text="保存"/></button>
			<button id="cancel" class="btn ue-btn "><spring:message code="bsp.organ.004" text="取消"/></button>
		</div>
	</div>
</body>
<script type="text/javascript">
var context = "<l:assetcontext/>";
var dialog = parent.dialog.get(window);

$(function(){
	$(".ue-list li").click(function(e){
		$(".ue-list li.selected").removeClass("selected");
		$(this).addClass("selected");
		$(this).find(":radio").prop("checked", "checked");
	});
	$(".ue-list").slimscroll({
	    height: "100%",
	    size: "5px",
	    color: "#949faa",
	    distance: "2px",
	    wheelStep: "12px",
	    railVisible: true,
	    railColor: "#ecf0f6",
	    railOpacity: 1,
	    allowPageScroll: true,
	    disableFadeOut: true
	});
	$("#top").click(function(){
		moveTop();
	});
	$("#up").click(function(){
		moveUp();
	});
	$("#down").click(function(){
		moveDown();
	});
	$("#bottom").click(function(){
		moveBottom();
	});
	// “保存”按钮
	$("#save").click(function(){
		save();
	});
	// 取消按钮
	$("#cancel").click(function(){
		cancel();
	});
})

// 置于顶部
function moveTop() {
	var $selectedLis = $(".ue-list li.selected");
	if($selectedLis.length < 1) {
		return false;
	}
	
	// 放到第一个同级节点前面
	$(".ue-list li:first").before($selectedLis[0]);
}

// 上移一行
function moveUp() {
	var $selectedLis = $(".ue-list li.selected");
	if($selectedLis.length < 1) {
		return false;
	}
	
	$selectedLi = $selectedLis.eq(0);
	// 找到前一个同级节点
	var $prev = $selectedLi.prev();
	if($prev.length > 0) {
		$prev.before($selectedLi);
	}
}

// 下移一行
function moveDown() {
	var $selectedLis = $(".ue-list li.selected");
	if($selectedLis.length < 1) {
		return false;
	}
	
	$selectedLi = $selectedLis.eq(0);
	// 找到后一个同级节点
	var $next = $selectedLi.next();
	if($next.length > 0) {
		$next.after($selectedLi);
	}
}

// 置于底部
function moveBottom() {
	var $selectedLis = $(".ue-list li.selected");
	if($selectedLis.length < 1) {
		return false;
	}
	
	// 放到最后一个同级节点后面
	$(".ue-list li:last").after($selectedLis[0]);
}

// 保存排序
function save() {
	var struIdArr = [];
	
	$("ul.ue-list li").each(function(){
		struIdArr.push($(this).find(".struId").val());
	});
	
	$.ajax({
		url: context + "/service/bsp/organ/saveSort",
		data: {"struIdArr": struIdArr},
		async: false,
		success: function() {
			dialog.close(true);
    		dialog.remove();
    		return false;
		}
	});
}
// 取消
function cancel() {
	dialog.close();
	dialog.remove();
	return false;
}
</script>
</html>