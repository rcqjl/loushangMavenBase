<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ page import="java.util.*"%>
<%@ page import="org.loushang.cform.widget.data.Widget"%>
<%@ page import="org.loushang.cform.widget.WidgetUtil"%>
<%
    // 相对路径
    String webPath = request.getContextPath();
    
    // 绝对路径
	StringBuffer sb = new StringBuffer();
	sb.append(request.getScheme());
	sb.append("://");
	sb.append(request.getServerName());
	sb.append(":");
	sb.append(request.getServerPort());
	sb.append(webPath);

	String fullWebPath = sb.toString();
	
	// 展现设备
	String deviceType = request.getParameter("deviceType");
	if(deviceType == null){
		deviceType = "PC";
	}
	
	// 表单类别
	String formType = request.getParameter("formType");
	
	Map widgetMaps = WidgetUtil.getFormWidgets(deviceType);
%>
<html>
	<head>
		<title><s:message code="cf.formbuilder" text="云表单设计器"></s:message></title>
		<meta content="text/html;charset=UTF-8" http-equiv="Content-Type">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" >
		<link rel="stylesheet" href="skin/css/reset.css" />
		<link rel="stylesheet" href="skin/css/builderlayout.css" />
		<link rel="stylesheet" href="skin/css/builder.css" />
		<link rel="stylesheet" href="skin/css/dialog.css" />
		<link rel="stylesheet" href="skin/css/colorpicker.css" />
		
		<script src="<%=webPath%>/jsp/cform/skin/js/jquery.js"></script>
		<next:ScriptManager></next:ScriptManager>
		<l:script path="i18n.js"/>
		<script src="skin/js/jquery.extend.js"></script>
		<script src="skin/js/jquery.colorpicker.js"></script>
		<script src="skin/js/jquery.tableresize.js"></script>
		<script src="skin/js/jquery.template.js"></script>
		<script src="skin/js/jquery.xtemplate.js"></script>

		<script src="skin/js/pinyin.js"></script>
		<script src="skin/js/cform.js"></script>
		<script type="text/javascript">
		    // 相对路径
			CForm.webPath = '<%=webPath %>';
			
			// 绝对路径
			CForm.fullWebPath = '<%=fullWebPath %>';
			
			// 设备类型
			var deviceType = '<%=deviceType %>';
		</script>
		
		<script src="skin/js/cform.widgetbar.js"></script>
		<script src="skin/js/cform.themebar.js"></script>
		<script src="skin/js/cform.event.js"></script>
		<script src="skin/js/cform.builder.js"></script>
		<script src="skin/js/cform.toolbar.js"></script>
		<%
		  //PC版
		  if("PC".equals(deviceType)){
		%>
				<script src="skin/js/cform.pcbuilder.js"></script>
		<%  
		  }
		  //手机版
		  else if("MOBILE".equals(deviceType)){
		%>
				<script src="skin/js/cform.mobilebuilder.js"></script>
		<%    
		  }
		  //PAD版
		  else if("PAD".equals(deviceType)){
		%>
				<script src="skin/js/cform.padbuilder.js"></script>
		<%    
		  }
		%>
		<script src="skin/js/cform.table.js"></script>
		<script src="skin/js/cform.widget.js"></script>
		<script src="skin/js/cform.showdialog.js"></script>
		<script src="skin/js/cform.configure.js" ></script>
<%
	if (!widgetMaps.isEmpty()) {
		Collection widgetLists = widgetMaps.values();
		
		Iterator widgetLisIt = widgetLists.iterator();
		List widgetList = null;
		while(widgetLisIt.hasNext()){
			widgetList = (List)widgetLisIt.next();
			Iterator widgetIt = widgetList.iterator();
			while(widgetIt.hasNext()){
				Map widget = (Map)widgetIt.next();
%>
		<script src="<%=fullWebPath%><%=widget.get("jsPath")%>?id=<%=widget.get("widgetId") %>"></script>	
<%
			}
		}
	}
%>
	</head>
	<body style="overflow: hidden;">
		<%
		  // PC版
		  if("PC".equals(deviceType)){
		%>
		<textarea style="display: none" id="cfDefaultCss"><link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/widget.css"/>;<link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/widgetie.css"/></textarea>
		<%
		  }
		  //手机版
		  else if("MOBILE".equals(deviceType)){
		%>
		<textarea style="display: none" id="cfDefaultCss"><link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/mwidget.css"/></textarea>
		<% 
		  }
		  //PAD版
		  else if("PAD".equals(deviceType)){
		 %>
		<textarea style="display: none" id="cfDefaultCss"><link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/widget.css"/>;<link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/pwidget.css"/>;<link id="cfLink" rel="stylesheet" type="text/css" href="<%=fullWebPath%>/jsp/cform/builder/skin/css/widgetie.css"/></textarea>
		 <% 
		  }
		  %>
		<!-- 导航栏 -->
		<div class="tabnav">
			<ul class="ui-tabs-nav" style="clear:both;">
				<li class="ui-tabs-selected"><s:message code="cf.form" text="表单"/></li>
				<li id="liTable"><s:message code="cf.table" text="表格"/></li>
				<li><s:message code="cf.font" text="字体"/></li>
				<li id="liDynrow"><s:message code="cf.dynrow" text="动态行"/></li>
				<li id="liEditGrid"><s:message code="cf.editablerow" text="可编辑列表"/></li>
				<li id="liDynTable"><s:message code="cf.dyntable" text="动态表格"/></li>
				<li id="liFieldSet"><s:message code="cf.fieldset" text="节"/></li>
				<li id="liAdvance"><s:message code="cf.advanced" text="高级"/></li>
			</ul>
		</div>
		<!-- 工具栏 -->
		<div class="toolbar">
			<div class="savebtn"><ul></ul></div>
			<div class="ui-tabs">
				<div id="tbForm" class="ui-tabs-panel"><ul></ul></div>
				<div id="tbTable" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbFont" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbDynrow" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbEditGrid" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbDynTable" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbFieldSet" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
				<div id="tbAdvance" class="ui-tabs-panel ui-tabs-hide"><ul></ul></div>
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
			<!-- 源代码视图 -->
			<div id="sourceView">
				<iframe id="sourceCode" class="sourceCode" frameBorder="0"  scrolling="auto" allowTransparency="true"
				    src="help/sourcecode.jsp">
				</iframe>
			</div>
		</div>
		<!-- 用于存放移动控件的div -->
		<div id="flyDiv"></div>
		
		<!-- 用于存放域属性设置页面的div -->
		<div id="fieldAttr">
			<iframe style='width:100%;height:100%;background-color:transparent;' frameborder='0' id='fieldAttrFrame' name='fieldAttrFrame' width='100%' height='100%'></iframe>
		</div>
	</body>
	<script>
		var formType = "<%=formType %>";
		window.onbeforeunload = function(){
			if(window.opener.queryForm){
				window.opener.queryForm();
			}
		}
	</script>
</html>