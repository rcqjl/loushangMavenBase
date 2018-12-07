<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/l5-adapter" prefix="model"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page import="org.loushang.workflow.util.bsp.BspUtil"%>
<%@ page import="org.loushang.workflow.util.bsp.WfStru"%>
<% 
WfStru wfStru=BspUtil.getInstance().getEmployeeStruView();
String organId=wfStru.getOrganId();
if(organId==null)
	organId="";
String organName=wfStru.getOrganName();
if(organName==null)
	organName="";
String userId=BspUtil.getInstance().getLoginUserId();
if(userId==null){
	userId="";
}
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
%>
<%
	String status = request.getParameter("status");
	String id = request.getParameter("id");
	String procDefId= request.getParameter("procDefId");
	String oldProxyOrganId=request.getParameter("oldProxyOrganId");
	String returnProc=request.getParameter("returnProc");
	
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/bootstrap.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/font-awesome.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/form.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ztree.css'/>"/>
	<link rel="stylesheet" type="text/css" href="<l:asset path='css/ui.css'/>"/>
	<style type="text/css">
		.required {
			top: 0;
		}
	</style>
	
	<l:script path="jquery.js,bootstrap.js,form.js,form.js,l5-adapter.js,knockout.js,ui.js,bpm/util.js"></l:script>
	<script type="text/javascript">
		var bspAppPath='<%=bspAppPath%>';	
		var status = "<%=status%>";
		var id="<%=id%>";
		var procDefId="<%=procDefId%>";
		var originalOrganId="<%=organId%>";
		var originalOrganName="<%=organName%>";
		var oldProxyOrganId='<%=oldProxyOrganId%>';
		var returnProc="<%=returnProc%>";
		returnProc = decodeURI(returnProc);
		var userId = '<%=BspUtil.getInstance().getLoginUserId()%>';
	</script>
</head>
<body>
<model:datasets>
	<model:dataset id="proxyProcDefDs"  cmd="org.loushang.workflow.tripproxy.cmd.TripProxyProcDefQueryCmd" method="queryByProcDefId">
		<model:record>
			<model:field name="ID" type="string" />
			<model:field name="PROC_DEF_NAME" type="string" />
			<model:field name="PROC_DEF_ID" type="string" />
			<model:field name="ORIGINAL_ORGAN_NAME" type="string" />
			<model:field name="ORIGINAL_ORGAN_ID" type="string"/>
			<model:field name="PROXY_ORGAN_ID" type="string" />
			<model:field name="PROXY_ORGAN_NAME" type="string" />
			<model:field name="IS_PROXY_EXIST_TASK" type="string" />
		</model:record>
		<model:params>
			<model:param name="ID" value="<%=id %>"></model:param>
		</model:params>
	</model:dataset>	
</model:datasets>
<form class="form-horizontal" id="saveForm" name="saveForm" onsubmit="return false">
    <div class="form-group">
        <label  class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.TRIPPROXY.ProcessName" text="流程名称"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
       		<input class="form-control ue-form Validform_input" id="PROC_DEF_NAME"  type="text"  data-bind="value: PROC_DEF_NAME">
            <button id="selectProcess" type="button" class="btn ue-btn">
					<span class="fa fa-pencil "></span><spring:message code="BPM.TRIPPROXY.SelectProcess" text="选择流程"></spring:message>
			</button>
        </div>
    </div>  
	<div class="form-group">
        <label  class="col-xs-3 col-md-3 text-right"><spring:message code="BPM.TRIPPROXY.Agent" text="代理人"></spring:message><span class="required">*</span></label>
        <div class="col-xs-8 col-md-8">
            <input class="form-control ue-form Validform_input" id="PROXY_ORGAN_NAME"  type="text"  data-bind="value: PROXY_ORGAN_NAME">
            <button id="selectProxyOrgan" type="button" class="btn ue-btn">
					<span class="fa fa-pencil "></span><spring:message code="BPM.TRIPPROXY.Agent" text="选择代理人"></spring:message>
			</button>
        </div>
    </div>  
    <div class="form-group">
       <label class="col-xs-3 col-md-3  text-right" for="IS_PROXY_EXIST_TASK"><spring:message code="BPM.TRIPPROXY.AgentTask" text="代理已有任务"></spring:message></label>
       <div class="col-xs-8 col-md-8">
     	  <div class="radio" id="IS_PROXY_EXIST_TASK">
     	  </div>
       </div>
    </div>
    
    
    <div class="form-group ">
    	<label class="col-xs-3 col-md-3 text-right"></label>
    	<div class="col-xs-8 col-md-8">
			<button id="save" type="button" class="btn ue-btn-primary "><spring:message code="BPM.INFOPROCESSMODEL.Save" text="保存"></spring:message></button>
			<button id="undo" type="button" class="btn ue-btn"><spring:message code="BPM.INFOPROCESSMODEL.Cancel" text="取消"></spring:message></button>
		</div>	
	</div>		
</form>	
<script type="text/javascript">
var procDefIds;
var procDefNames
var proxyOrganIds;
var proxyOrganNames;
var currentProxyNames;
var currentIsProxyExistTask
//定时器，存好当前代理人，用于稍后比较
var interval;
function set(){
	var is=$("input[name='IS_PROXY_EXIST_TASK']:checked").val();
	if(is){
		currentIsProxyExistTask=$("input[name='IS_PROXY_EXIST_TASK']:checked").val();
		currentProxyNames=$("#PROXY_ORGAN_NAME").val();
		clearInterval(interval);
	}
}
$(document).ready(function(){
	initEnum();
	
	if(status != "new") {
		$("#selectProcess").hide();
		$("#PROC_DEF_NAME").attr("readonly",true);
		$("#PROXY_ORGAN_NAME").attr("readonly",true);
		proxyProcDefDs.setParameter("PROC_DEF_ID",procDefId);
		proxyProcDefDs.setParameter("ORIGINAL_ORGAN_ID",originalOrganId);
		proxyProcDefDs.load();
		interval=setInterval(set,300);
	} else {
		/**********新版*****************/
		proxyProcDefDs.newRecord();
		$("#IS_PROXY_EXIST_TASK :radio[value=1]").prop("checked",true);
		/****************************/
	}
	
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

//弹窗提示样式
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg,
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    }
	);
}

//保存功能
function save_click() {
	if(status=="new"){
		var isProxyExistTask=$("input[name='IS_PROXY_EXIST_TASK']:checked").val();
		if((procDefNames==""||procDefNames==undefined||proxyOrganNames==""||proxyOrganNames==undefined)){
            parent.$.dialog({
                 type: 'alert',
                 content: L.getLocaleMessage("BPM.TRIPPROXY.Tip1","[流程名称]和[代理人]不能为空"),
             });
            return false;
		}
		proxyOrganIds=proxyOrganIds.split(",")
		var command =new L5.Command("org.loushang.workflow.tripproxy.cmd.TripProxyProcDefCmd");
		command.setParameter("procDefNames",procDefNames);
		command.setParameter("processIds",procDefIds);
		command.setParameter("proxyOrganId",proxyOrganIds);
		command.setParameter("proxyOrganName",proxyOrganNames);
		command.setParameter("originalOrganName",originalOrganName);
		command.setParameter("originalOrganId",originalOrganId);
		command.setParameter("isProxyExistTask",isProxyExistTask);
		command.afterExecute = function() {
			if (!command.error) {
                var dialog = parent.dialog.get(window);
                dialog.close(true);
              /*   parent.$.dialog({
	                 type: 'alert',
	                 content: "设置成功",
	             }); */
			}else {
				//UIAlert(command.error.msg);
				sticky(command.error.msg, 'error', 'center');
			}
	    }
		command.execute("insert");
	}else{
		var record = proxyProcDefDs.getCurrent();
		var isProxyExistTask=$("input[name='IS_PROXY_EXIST_TASK']:checked").val();
		if((proxyOrganNames==""||proxyOrganNames==undefined||proxyOrganNames==currentProxyNames)&(currentIsProxyExistTask==isProxyExistTask)){
             parent.$.dialog({
                type: 'alert',
                content: L.getLocaleMessage("BPM.TRIPPROXY.Tip2","请修改代理人"),
            }); 
           // sticky("请修改代理人", 'error', 'center');
            return false;
		}else if((currentIsProxyExistTask!=isProxyExistTask)){
			proxyOrganNames=currentProxyNames;
		}
		record.set("ID",id);
		record.set("PROXY_ORGAN_ID",proxyOrganIds);
		record.set("PROXY_ORGAN_NAME",proxyOrganNames);
		var command =new L5.Command("org.loushang.workflow.tripproxy.cmd.TripProxyProcDefCmd");
		command.setParameter("record",record);
		command.setParameter("oldProxyOrganId",oldProxyOrganId);
		command.setParameter("isProxyExistTask",isProxyExistTask);
		command.afterExecute = function() {
			if (!command.error) {
				 var dialog = parent.dialog.get(window);
	             dialog.close(true);
	             /* parent.$.dialog({
	                 type: 'alert',
	                 content: "修改成功",
	             }); */	 
			}else {
				//UIAlert(command.error.msg);
				sticky(command.error.msg, 'error', 'center');
			}
		}
		command.execute("update");
	}
}
 $(function(){
	$("#selectProcess").click(function(){
		add();
	})
})
function add(){
	parent.$.dialog({
        type: 'iframe',
        url: "selectProcess.jsp",
        title: L.getLocaleMessage("BPM.TRIPPROXY.SelectProcess","选择流程"),
        width: 500,
        height: 400,
        onclose: function () {
       		if(this.returnValue.flag){
       			procDefIds=this.returnValue.procDefIds.split(",");//已经是数组
       			procDefNames=this.returnValue.procDefNames;  //字符串
       			$("#PROC_DEF_NAME").val(procDefNames);
       			procDefNames=procDefNames.split(",");  //已经是数组
			}
       }	
	});
} 

//bsp接口未提供
$(function(){
	$("#selectProxyOrgan").click(function(){
		var url = bspAppPath + "service/bsp/organHelp?isChkbox=1&selType=8&struType=00&showableType=1;2;6;8";
		url = url + "&userId=" + userId;
		
		parent.$.dialog({
	 		type: 'iframe',
	 		url: url,
	 		title: L.getLocaleMessage("BPM.TRIPPROXY.SelectAgent","选择代理人"),
	 		width: 300,
	 		height: 500,
	 		onclose: function(){
	 			var node = this.returnValue;
	 			if(typeof node!='string'){
	 				if(node.length>0){
	 					proxyOrganNames=node[0].organName;
	 					proxyOrganIds=node[0].organId;
	 					if(node.length>1){
	 						$.each(node,function(i,n){
	 							if(i>0){
	 								proxyOrganNames=proxyOrganNames+","+n["organName"];
	 								proxyOrganIds=proxyOrganIds+","+n["organId"];
	 							}
	 						});
	 					
	 					}
	 					$("#PROXY_ORGAN_NAME").val(proxyOrganNames);
	 					
	 				}else{
	 					$("#PROXY_ORGAN_NAME").val("");
	 					proxyOrganNames="";
	 					proxyOrganIds="";
	 				}
	 			}
	 		}
	 	});
	});	
})

//取消
function undo_click() {
	var dialog = parent.dialog.get(window);
	dialog.close();
	dialog.remove();
	return false;
}

//加载枚举值
function initEnum() {
	var command = new L5.Command("org.loushang.next.commons.nenum.EnumQueryCommand");
	command.setParameter("enumName", "TRIP_PROXY.IS_PROXY_EXIST_TASK");
	command.execute();
	var data = command.getData();
	for(var i = 0; i < data.length; i++){
		var saveVal = data[i].value;
		var showVal = data[i].text;		
		var radio = "<label><input type='radio' name='IS_PROXY_EXIST_TASK' value='"+ saveVal +"' data-bind='checked:IS_PROXY_EXIST_TASK'/>"+ showVal +"</label> "
		// 添加到页面
		$("#IS_PROXY_EXIST_TASK").append(radio);
	}
}
</script>
</body>
</html>