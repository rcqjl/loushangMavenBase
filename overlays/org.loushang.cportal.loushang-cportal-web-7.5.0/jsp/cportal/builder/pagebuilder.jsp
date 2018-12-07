<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%
    //相对路径
    String webPath = request.getContextPath();
    
    //绝对路径
	StringBuffer sb = new StringBuffer();
	sb.append(request.getScheme());
	sb.append("://");
	sb.append(request.getServerName());
	sb.append(":");
	sb.append(request.getServerPort());
	sb.append(webPath);

	String fullWebPath = sb.toString();
	
%>
<!DOCTYPE html>
<html>
	<head>
		<title><spring:message code="cportal.pageBuilder" text="云门户页面设计器"/></title>
		<meta content="text/html;charset=UTF-8" http-equiv="Content-Type">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" >
		<link rel="stylesheet" href="skin/css/reset.css" />
		<link rel="stylesheet" href="skin/css/builderlayout.css" />
		<link rel="stylesheet" href="skin/css/builder.css" />
		<link rel="stylesheet" href="skin/css/dialog.css" />
		<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>" />
		<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>" />
		<l:script path="jquery.js,form.js,loushang-framework.js"></l:script>
		<script src="skin/js/jquery.extend.js"></script>
		<script src="skin/js/jquery.tableresize.js"></script>
		<script src="skin/js/jquery.template.js"></script>
		<script src="skin/js/jquery.xtemplate.js"></script>
		<script src="skin/js/cportal.js"></script>
		<script type="text/javascript">
		    // 相对路径
			CPortal.webPath = '<%=webPath %>';
			
			// 绝对路径
			CPortal.fullWebPath = '<%=fullWebPath %>';
		</script>
		<script src="skin/js/cportal.widgetbar.js"></script>
		<script src="skin/js/cportal.event.js"></script>
		<script src="skin/js/cportal.builder.js"></script>
		<script src="skin/js/cportal.toolbar.js"></script>
		<script src="skin/js/cportal.pcbuilder.js"></script>
		<script src="skin/js/cportal.table.js"></script>
		<script src="skin/js/cportal.showdialog.js"></script>
	</head>
	<body style="overflow: hidden;">
		<textarea style="display: none" id="cfDefaultCss">
			
			<link id="cfLink" rel="stylesheet" type="text/css" href="<%=webPath%>/skins/skin/css/bootstrap.css"/>;
			<link id="cfLink" rel="stylesheet" type="text/css" href="<%=webPath%>/skins/skin/css/ui.css"/>;
			<link id="cfLink" rel="stylesheet" type="text/css" href="<%=webPath%>/skins/skin/css/font-awesome.css"/>;
			<link id="cfLink" rel="stylesheet" type="text/css" href="skin/css/cportal.css"/>;
		</textarea>
		<div class="tabnav">
			<ul class="ui-tabs-nav" style="clear:both;">
				<li class="ui-tabs-selected">
				<spring:message code="cportal.page" text="页面"/>
				</li>
				<li id="liTable">
				<spring:message code="cportal.table" text="表格"/>
				</li>
			</ul>
		</div>
		<div class="toolbar">
			<div class="savebtn"><ul></ul></div>
			<div class="ui-tabs">
				<div id="tbPage" class="ui-tabs-panel"><ul></ul></div>
				<div id="tbTable" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
			</div>
		</div>
		<!-- 组件栏-->
		<div class="widgetColumn" style="clear:both">
		  <div id="widgetContainer">
		  </div>
		  <div id="themeContainer" style="display:none">
		  </div>
		</div>
		<!-- 设计区栏 -->
		<div class="designColumn">
			<!-- 设计视图 -->
			<div id="designView" class="designView">
				<iframe id="designIframe" class="designFrame" frameBorder="0"  scrolling="auto" allowTransparency="true">
				</iframe>	
			</div>
		</div>
		<!-- 用于存放移动控件的div -->
		<div id="flyDiv"></div>
	</body>
	<script>
	/* 关闭设计器调用父页面方法刷新表格 */
		window.onbeforeunload = function(){
			window.opener.gridReload();
		}
	</script>
</html>