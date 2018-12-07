<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<title><spring:message code="BPM.INFOPROCESSMODEL.D047" text="子流程属性" /></title>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/wf.showdialog.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/subproc/subprocess.js"></script>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/dialog.css"/>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/wfdproperty.css" />


<script>
function switchCallTab(ProTag, ProBox) {
    $("#divCallPropertyBody #"+ProTag+" a").addClass("on");
    $("#divCallPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
    $("#divCallPropertyBody #"+ProBox).show();
    $("#divCallPropertyBody .wfdPropCon:not('#"+ProBox+"')").hide();
}
</script>
</head>
<body>
	<div id="divCallPropertyHead" class="headArea wfdFirstHeadArea"><span><spring:message code="BPM.INFOPROCESSMODEL.D047" text="子流程属性" /></span>
		<div class="shrinkDiv"></div>
	</div>
	<div id="divCallPropertyBody" class="wfPropertyBodyArea">
        <div id="wfdPropTabs" class="wfdPropTabs">
        <ul>
            <li id="wfdCallTab1" class="wfdPropBaseArea"><a href="#" class="on" onclick="switchCallTab('wfdCallTab1','wfdCallCon1');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.D048" text="基本" /></a></li>
            <li id="wfdCallTab2" class="wfdPropAdvArea"><a href="#" onclick="switchCallTab('wfdCallTab2','wfdCallCon2');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.D049" text="高级" /></a></li>
        </ul>
        </div>
        <div style="clear: both"></div>
        <div id="wfdCallCon1" class="wfdPropCon  wfdActProp">
	        <div id="callName" class="wfdProp  wfdActProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D017" text="名称" />:</label><input type="text"/></div>
	        <div id="callId" class="wfdProp  wfdActProp"><label>ID:</label><input type="text" readonly="readonly"/></div>
	        <div id="callProcExcuType" class="wfdProp  wfdActProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D050" text="类型" />:</label><select class="select">
	        	<option value="SYNCHR"><spring:message code="BPM.INFOPROCESSMODEL.D051" text="同步" /></option><option value="ASYNCHR"><spring:message code="BPM.INFOPROCESSMODEL.D052" text="异步" /></option>
	        </select></div>
	        <div id="callSub" class="wfdProp  wfdActProp wfdPropWithButton"><label><spring:message code="BPM.INFOPROCESSMODEL.D053" text="子流程" />:</label><input type="text" readonly="readonly"/><input id="callSubBtn" type="button"/></div>
        </div>
        <div id="wfdCallCon2" style="display: none" class="wfdPropCon">
	        <div id="dataMap" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label><spring:message code="BPM.INFOPROCESSMODEL.D054" text="数据映射" />:</label><input type="text" readonly="readonly" value=""/><input id="dataMapBtn" type="button"/></div>
	        <div id="callSplitType" class="wfdProp chk"><input type="checkbox" id="callSplitChk"><label for="callSplitChk"><spring:message code="BPM.INFOPROCESSMODEL.D018" text="并行分支" /></label></div>
	        <div id="callSplitRule" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label><spring:message code="BPM.INFOPROCESSMODEL.D022" text="分支条件:" /></label><input type="text" readonly="readonly" value=""/><input id="splitRuleBtn" type="button"/></div>
			<div id="callJoinType" class="wfdProp chk"><input type="checkbox" id="callJoinChk"><label for="callJoinChk"><spring:message code="BPM.INFOPROCESSMODEL.D019" text="并行汇聚" /></label></div>
			<div id="callSplitAct" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label><spring:message code="BPM.INFOPROCESSMODEL.D055" text="发散环节" />:</label><select></select></div>
	        <div id="callJoinRule" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label><spring:message code="BPM.INFOPROCESSMODEL.D021" text="复杂汇聚:" /></label><select>
	        </select></div>
	        <!-- <div id="calTime" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label>是否计时:</label><select>
	        	<option value="1">是</option><option value="0">否</option>
	        </select></div>
	        <div id="mapAct" class="wfdProp  wfdActProp  wfdPropWithButton callAct"><label>映射环节:</label><input type="text" readonly="readonly" value=""/><input id="mapActBtn" type="button"/></div> -->
	    </div>
	</div>
</body>
</html>