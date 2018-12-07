<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%
	String procDefUniqueId = (String)request.getParameter("procDefUniqueId");
	String processId = (String)request.getParameter("processId");
	
	//获取bsp应用地址
	String bspAppName=BspUtil.getInstance().getBspAppPath();
	String bspAppPath;
	if (80 == request.getServerPort()) {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName()
			+ bspAppName + "/";
	} else {
		bspAppPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+bspAppName + "/";
	}
	String userId=BspUtil.getInstance().getLoginUserId();
	if(userId==null){
		userId="";
	}
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	
	<l:script path="jquery.js,bootstrap.js,ui.js,form.js,l5-adapter.js,knockout.js"></l:script>
	<script type="text/javascript">
		var processId="<%=processId%>";
		var procDefUniqueId="<%=procDefUniqueId%>";
		var bspAppPath='<%=bspAppPath%>';
		var userId = '<%=userId%>';
	</script>
</head>
<body>
 <model:datasets>
 	<model:dataset id="activityDefIdDst" cmd="org.loushang.workflow.manage.activity.cmd.ActivityManageQueryCmd" >
 		<model:record>
 			<model:field name="value" mapping="actDefId" type="string"/>
 			<model:field name="text" mapping="actDefName" type="string"/>
 		</model:record>
 	</model:dataset>
 </model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.MANAGE.SelectAspect" text="选择环节"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <select class="form-control ue-form Validform_input" id="text" datatype="s" nullmsg="<spring:message code="BPM.MANAGE.Tip33" text="请选择环节"/>" >
            	<option value=""><spring:message code="BPM.MANAGE.Option" text="请选择.."/></option>
            </select>
            <span class="Validform_checktip Validform_span"></span>
        </div>
    </div>  
	<div class="form-group">
        <label class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.MANAGE.SelectParticipants" text="选择参与者"/><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="parts"  type="text" datatype="*" nullmsg="<spring:message code="BPM.MANAGE.Tip33" text="请选择参与者"/>" >
            <button id="selectParts" type="button" class="btn ue-btn">
				<span class="fa fa-pencil" ></span>
			</button>
			<span class="Validform_checktip "></span>
        </div>
    </div>      
    <div class="form-group ">
    	<label class="col-xs-3 col-md-3 text-right"></label>
    	<div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.MANAGE.Save" text="保存"/></button>
			<button  id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.MANAGE.Canceled" text="取消"/>	</button>
		</div>	
	</div>		
</form>	
<script type="text/javascript">
$(document).ready(function(){
	activityDefIdDst.newRecord();
	var cmd = new L5.Command("org.loushang.workflow.manage.activity.cmd.ActivityManageQueryCmd");
	cmd.setParameter("processId",processId);
	cmd.setParameter("proDefId",procDefUniqueId);
	cmd.execute("getAllActivityDef");
	var data = cmd.getData();
	var options = "";
	for(var i=0;i<data.length;i++) {
		var option = "<option value='"+ data[i].actDefId +"'>"+ data[i].actDefName +"</option>";
		options += option;	
	}
	$("#text").append(options);	
	
	/****************表单校验******************/
	$("#saveForm").Validform({
        btnSubmit:"#save",
        tiptype:function(msg,o,cssctl){
            if(!o.obj.is("form")){
                var objtip=o.obj.siblings(".Validform_checktip");
                cssctl(objtip,o.type);
                objtip.text(msg);
            }
        },
        callback:function(form){
                save_click();
        }
    });
	/***********************************/
	
	$("#undo").click(function(){
		undo_click();
	});
});

var revalue;
$("#selectParts").click(function(){
	var url = bspAppPath + "service/bsp/organHelp?isChkbox=1&selType=8&struType=00&showableType=1;2;6;8";
	url = url + "&userId=" + userId;
	
	parent.$.dialog({
		type: 'iframe',
		url: url,
		title: L.getLocaleMessage("BPM.MANAGE.Range","所辖范围"),
		width: 300,
		height: 500,
		onclose: function(){
			var node = this.returnValue;
			var organNames,organIds;
			if(typeof node!='string'){
				if(node.length>0){
					organNames=node[0].organName;
					organIds=node[0].organId;
					if(node.length>1){
						$.each(node,function(i,n){
							if(i>0){
								organNames=organNames+","+n["organName"];
								organIds=organIds+","+n["organId"];
							}
						});
					}
					$("#parts").val(organNames);
					revalue = organIds + ";" + organNames;
				}else{
					organIds = "";
					organNames = "";
				}
			}
		}
	});
});
 
//保存功能
function save_click() {
	var actValue =$("#text").val();
	var returnValue={
			organs:revalue,
			actDefUniqueId:actValue
	}
	var dialog = parent.dialog.get(window);
	dialog.close(returnValue);
	dialog.remove();
	return false;
}
 
//取消
function undo_click() {
	var dialog = parent.dialog.get(window);
	dialog.close();
}
</script>
</body>
</html>