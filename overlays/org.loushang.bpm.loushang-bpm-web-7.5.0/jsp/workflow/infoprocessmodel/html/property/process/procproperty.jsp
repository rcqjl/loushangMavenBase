<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<%
String webPath = request.getContextPath();
StringBuffer sb = new StringBuffer();
sb.append(request.getScheme());
sb.append("://");
sb.append(request.getServerName());
sb.append(":");
sb.append(request.getServerPort());
sb.append(webPath);

String fullWebPath = sb.toString();
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="BPM.INFOPROCESSMODEL.D031" text="流程属性"/></title>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/process/procproperty.js"></script>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/wfdproperty.css" />
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script>
function switchPropTab(ProTag, ProBox) {
    $("#divProcessPropertyBody #"+ProTag+" a").addClass("on");
    $("#divProcessPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
    $("#divProcessPropertyBody #"+ProBox).show();
    $("#divProcessPropertyBody .wfdPropCon:not('#"+ProBox+"')").hide();
}
</script>
</head>
<body>
	<div id="divProcessPropertyHead" class="headArea wfdFirstHeadArea"><span><spring:message code="BPM.INFOPROCESSMODEL.D031" text="流程属性"/></span>
		<div class="shrinkDiv"></div>
	</div>
	<div id="divProcessPropertyBody" class="wfPropertyBodyArea">
        <div id="wfdPropTabs" class="wfdPropTabs">
        <ul>
            <li id="wfdPropTab1" class="wfdPropBaseArea"><a href="#" class="on" onclick="switchPropTab('wfdPropTab1','wfdPropCon1');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.D048" text="基本" /></a></li>
            <li id="wfdPropTab2" class="wfdPropAdvArea"><a href="#" onclick="switchPropTab('wfdPropTab2','wfdPropCon2');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.C024" text="高级"/></a></li>
        </ul>
        </div>
        <div style="clear: both"></div>
        <div id="wfdPropCon1" class="wfdPropCon">
	        <div id="processName" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D017" text="名称"/>:</label><input type="text"/></div>
	        <div id="processId" class="wfdProp"><label>ID:</label><input type="text" readonly="readonly"/></div>
        </div>
        <div id="wfdPropCon2" style="display: none" class="wfdPropCon">
	        <div id="processLimit" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D032" text="限时:"/></label><input class="txtDiv" type="text" onpaste="return false" style="width: 50px;"/><select class="limitSel">
	            <option value="D"><spring:message code="BPM.INFOPROCESSMODEL.D033" text="工作日"/></option>
	            <option value="N"><spring:message code="BPM.INFOPROCESSMODEL.D034" text="自然日"/></option>
	        </select></div>
	        <div id="processWarn" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D035" text="提前:"/></label><input class="txtDiv" type="text" onpaste="return false" style="width: 50px;"/>
	            <span><spring:message code="BPM.INFOPROCESSMODEL.D033" text="工作日"/></span><spring:message code="BPM.INFOPROCESSMODEL.D036" text="预警"/>
	        </div>
	        <div id="dataObject" class="wfdProp  wfdPropWithButton dataObj"><label><spring:message code="BPM.INFOPROCESSMODEL.D027" text="相关数据"/>:</label><input type="text" readonly="readonly"/><input type="button"/></div>
	        <div id="describe" class="wfdProp describe"><label><spring:message code="BPM.INFOPROCESSMODEL.D037" text="描述:"/></label><textarea></textarea></div>
	    </div>
	</div>
</body>
</html>