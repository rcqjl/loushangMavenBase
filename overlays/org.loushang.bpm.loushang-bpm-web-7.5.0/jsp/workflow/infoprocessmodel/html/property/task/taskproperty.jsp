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
<title>Insert title here</title>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/js/frame/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/skins/js/i18n.js"></script>
<script type="text/javascript" src="<%=webPath%>/jsp/workflow/infoprocessmodel/html/property/task/taskproperty.js"></script>
<link rel="stylesheet" href="<%=webPath%>/jsp/workflow/infoprocessmodel/html/skin/css/wfdproperty.css" />
<script>
function switchActPropTab(ProTag, ProBox) {
    $("#divActivityPropertyBody #"+ProTag+" a").addClass("on");
    $("#divActivityPropertyBody ul li:not('#"+ProTag+"')"+" a").removeClass("on");
    $("#divActivityPropertyBody #"+ProBox).show();
    $("#divActivityPropertyBody .wfdActPropCon:not('#"+ProBox+"')").hide();
}
</script>
</head>
<body>
	<div id="preActDiv" class="propertyArea">
		<div id="divActivityPropertyHead" class="headArea wfdFirstHeadArea"><span><spring:message code="BPM.INFOPROCESSMODEL.D016" text="环节属性" /></span><div class="shrinkDiv"></div></div>
		<div id="divActivityPropertyBody" class="wfPropertyBodyArea wfdTaskPropBodyArea">
        <div id="wfdActPropTabs" class="wfdActPropTabs">
        <ul>
            <li id="wfdActPropTab1" class="wfdActPropBaseArea"><a href="#" class="on" onclick="switchActPropTab('wfdActPropTab1','wfdActPropCon1');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.D048" text="基本" /></a></li>
            <li id="wfdActPropTab2" class="wfdActPropAdvArea"><a href="#" onclick="switchActPropTab('wfdActPropTab2','wfdActPropCon2');this.blur();return false;"><spring:message code="BPM.INFOPROCESSMODEL.D049" text="高级" /></a></li>
        </ul>
        </div>
        <div style="clear: both"></div>
        <div id="wfdActPropCon1" class="wfdActPropCon">
            <div id="activityName" class="wfdProp wfdActProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D017" text="名称" />:</label><input type="text"/></div>
            <div id="activityId" class="wfdProp wfdActProp"><label>ID:</label><input type="text" readonly="readonly"/></div>
            <div id="participants" class="wfdProp  wfdActProp wfdPropWithButton"><label><spring:message code="BPM.INFOPROCESSMODEL.D128" text="参与者" />:</label><input type="text" readonly="readonly"/><input type="button"/></div>
        </div>
        <div id="wfdActPropCon2" style="display: none" class="wfdActPropCon">
	        <div id="activityLimit" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D032" text="限时:" /></label><input type="text" onpaste="return false" class="txtDiv" style="width: 50px;"/><select class="limitSel">
	            <option value="D"><spring:message code="BPM.INFOPROCESSMODEL.D033" text="工作日" /></option>
	            <option value="N"><spring:message code="BPM.INFOPROCESSMODEL.D034" text="自然日" /></option>
	        </select></div>
	        <div id="activityWarn" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D035" text="提前:" /></label><input type="text" onpaste="return false" class="txtDiv" style="width: 50px;"/>
	            <span><spring:message code="BPM.INFOPROCESSMODEL.D033" text="工作日" /></span><spring:message code="BPM.INFOPROCESSMODEL.D036" text="预警" />
	        </div>
	        <div id="taskRule" class="wfdProp wfdActProp1"><label><spring:message code="BPM.INFOPROCESSMODEL.D129" text="任务规则" />:</label><select style="text-align:left;">
	            <option value="Preemption"><spring:message code="BPM.INFOPROCESSMODEL.D130" text="抢占" /></option>
	            <option value="Countersignature"><spring:message code="BPM.INFOPROCESSMODEL.D131" text="并行会签" /></option>
	            <option value="OrderCountersignature"><spring:message code="BPM.INFOPROCESSMODEL.D132" text="顺序会签" /></option>
	        </select></div>
		<div id="isCreateActByPart" class="wfdProp chk"><input type="checkbox" id="chk1"><label><spring:message code="BPM.INFOPROCESSMODEL.D133" text="按参与者生成环节实例" /></label></div>
		<div id="isAddActTimeToProcTime" class="wfdProp chk"><input type="checkbox" id="chk2"><label><spring:message code="BPM.INFOPROCESSMODEL.D134" text="环节执行时间不计入流程" /></label></div>
		<div id="splitType" class="wfdProp chk"><input type="checkbox" id="splitChk"><label><spring:message code="BPM.INFOPROCESSMODEL.D018" text="并行分支" /></label></div>
		<div id="joinType" class="wfdProp chk"><input type="checkbox" id="joinChk"><label><spring:message code="BPM.INFOPROCESSMODEL.D019" text="并行汇聚" /></label></div>
	        <div id="forkAct" class="wfdProp"><label><spring:message code="BPM.INFOPROCESSMODEL.D135" text="关联的分支环节" />:</label><select>
	        </select></div>
	        <div id="joinRule" class="wfdProp wfdActProp1"><label><spring:message code="BPM.INFOPROCESSMODEL.D021" text="复杂汇聚:" /></label><select>
	        </select></div>
	        <div id="actBranch" class="wfdProp wfdActProp1"><label><spring:message code="BPM.INFOPROCESSMODEL.D022" text="分支条件:" /></label><input type="text" readonly="readonly" class="formTxtDiv" />
				<input type="button" class="formBtnDiv"/></div>
	        <div id="activityDescribe" class="wfdProp describe"><label><spring:message code="BPM.INFOPROCESSMODEL.D136" text="子描述" />:</label><textarea></textarea></div>
        </div>
		</div>
	</div>
</body>
</html>