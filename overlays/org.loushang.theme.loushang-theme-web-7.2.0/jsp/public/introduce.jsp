<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<l:script path="jquery.js,form.js"/>

<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
<link rel="stylesheet" type="text/css"href="<l:asset path='platform/css/home.css'/>" />
<title>产品介绍</title>
</head>
<body>
	<div id="fullpage">
		<div class="section framework">
			<div class="headline">
				<label class="title"><spring:message code="home.Tip29" text="框架"/></label>
				<label class="subtitle"><spring:message code="home.Tip30" text="组件多、开发快、体验好、架构优、稳定强的轻应用开发运行底层支撑平台"/></label>
			</div>
			<div>
				<img class="intro" id="intro_framework" src="<l:assetcontext/>/skins/skin/platform/img/intro_framework.png">
			</div>
		</div>
		<div class="section bsp">
			<div class="headline">
				<label class="title">BSP</label>
				<label class="subtitle"><spring:message code="home.Tip31" text="开箱即用的公共技术组件，高度柔性的通用业务模型，灵活应对互联网、企业、政府应用"/></label>
			</div>
			<div>
				<img class="intro" id="intro_BSP" src="<l:assetcontext/>/skins/skin/platform/img/intro_bsp.png">
			</div>
		</div>
		<div class="section bpm">
			<div class="headline">
				<label class="title">BPM</label>
				<label class="subtitle"><spring:message code="home.Tip32" text="一体化全生命周期业务流程管理：流程建模、流程开发、流程运行、流程监控分析"/></label>
			</div>
			<div>
				<img class="intro" id="intro_BPM" src="<l:assetcontext/>/skins/skin/platform/img/intro_bpm.png">
			</div>
		</div>
		<div class="section cform">
			<div class="headline">
				<label class="title"><spring:message code="home.Tip33" text="云表单"/></label>
				<label class="subtitle"><spring:message code="home.Tip34" text="灵活扩展、简单实用、操作高效、所见即所得的在线表单设计器"/></label>
			</div>
			<div>
				<img class="intro" id="intro_cform" src="<l:assetcontext/>/skins/skin/platform/img/intro_cform.png">
			</div>
		</div>
		<div class="section cportal">
			<div class="headline">
				<label class="title"><spring:message code="home.Tip35" text="云门户"/></label>
				<label class="subtitle"><spring:message code="home.Tip36" text="简单易用、快速高效、体验卓越、安全可靠的轻量级企业门户解决方案"/></label>
			</div>
			<div>
				<img class="intro" id="intro_cportal" src="<l:assetcontext/>/skins/skin/platform/img/intro_cportal.png">
			</div>
		</div>
		<div class="section hsf">
			<div class="headline">
				<label class="title">HSF</label>
				<label class="subtitle"><spring:message code="home.Tip37" text="应用前后端分离、应用间高效通信的轻量级服务化解决方案"/></label>
			</div>
			<div>
				<img class="intro" id="intro_HSF" src="<l:assetcontext/>/skins/skin/platform/img/intro_hsf.png">
			</div>
		</div>
		<div class="section alm">
			<div class="headline">
				<label class="title">ALM</label>
				<label class="subtitle"><spring:message code="home.Tip38" text="提升开发效率、管控研发流程、保证软件质量、持续集成发布的软件开发生命周期管理产品"/></label>
			</div>
			<div>
				<img class="intro" id="intro_ALM" src="<l:assetcontext/>/skins/skin/platform/img/intro_alm.png">
			</div>
		</div>
	</div>
	<script type="text/javascript">
	$(function(){
		var tmpframework = L.getLocaleMessage("home.Tip46","框架");
        var tmpcform = L.getLocaleMessage("home.Tip47","云表单");
        var tmpcportal = L.getLocaleMessage("home.Tip48","云门户");
        var tmpAnchors= '['+'\"'+tmpframework+'\"'+',"BSP","BPM",'+'\"'+tmpcform+'\"'+','+'\"'+tmpcportal+'\"'+',"HSF","ALM"]';
        var objAnchors = eval('('+ tmpAnchors +')');
		
		$("#intro_framework").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip22","/skins/skin/platform/img/intro_framework.png"));
		$("#intro_BSP").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip23","/skins/skin/platform/img/intro_bsp.png"));
		$("#intro_BPM").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip24","/skins/skin/platform/img/intro_bpm.png"));
		$("#intro_cform").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip25","/skins/skin/platform/img/intro_cform.png"));
		$("#intro_cportal").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip26","/skins/skin/platform/img/intro_cportal.png"));
		$("#intro_HSF").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip27","/skins/skin/platform/img/intro_hsf.png"));
		$("#intro_ALM").attr("src", "<l:assetcontext/>"+L.getLocaleMessage("home.Tip28","/skins/skin/platform/img/intro_alm.png"));
		$("#fullpage").fullpage({
			navigation: true,
			navigationPosition: 'right',
			anchors:objAnchors,
			afterLoad:function(anchorLink,index){
				var label = '<label class="tip">'+anchorLink+'</label>'
				$("li:eq("+(index-1)+")").append(label)
			},
			onLeave:function(index){
				$("li:eq("+(index-1)+")").find("label").remove();
			}
		});
	})
	</script>
</body>
</html>