<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model"%>
<%@ taglib uri="/tags/next-resourcebundle" prefix="resource" %>
<%@page import="org.loushang.next.skin.SkinUtils"%>
<%@page import="java.util.*"%>
<%@page import="org.loushang.workflow.util.bsp.BspUtil" %>
<%@page import="org.loushang.workflow.util.bsp.WfStru" %>
<%@page import="org.loushang.next.i18n.ResourceBundle"%>
<resource:resource localeDir="ui.bpm.analysis"></resource:resource>
<%
ResourceBundle res = ResourceBundle.getPackageBundle("ui.bpm.analysis");
%>
<html>
	<head><style>a{TEXT-DECORATION:none}</style>
		<title><%=res.getLocaleMsg("UI.BPM.ANALYSIS.005","人员绩效统计分析") %></title>
		<next:ScriptManager></next:ScriptManager>
	</head>

<body>
<%
	WfStru loginUserStruId = BspUtil.getInstance().getEmployeeStruView();
	String corporationStruId = "";
	if(loginUserStruId!=null){
		corporationStruId = BspUtil.getInstance().getCorporation(loginUserStruId.getStruId()).getStruId();
	}
%>
<model:datasets>
	<model:dataset pageSize="10" id="taskAnalysisDataset" cmd="org.loushang.workflow.analysis.cmd.ParticipantPerformanceAnalysisQueryCmd" 
				   method="taskAnalyse" autoLoad="false" global="true">
		<model:record>
			<model:field name="organId" type="string" />
			<model:field name="organName" type="string" />
			<model:field name="departmentName" type="string" />
			<model:field name="totalTask" type="int" />
			
			<model:field name="complementOnTimeTask" type="int" />
			<model:field name="complementOnTimeTaskPercent" type="string" />
			<model:field name="timeOutTask" type="int" />
			<model:field name="timeOutTaskPercent" type="string" />
			<model:field name="normalDaiBanTask" type="int" />
			<model:field name="normalDaiBanTaskPercent" type="string" />
			<model:field name="timeOutDaiBanTask" type="int" />
			<model:field name="timeOutDaiBanTaskPercent" type="string" />
		</model:record>
	</model:dataset>
	<model:dataset id="selectPositionDataset" cmd="org.loushang.workflow.analysis.cmd.ParticipantPerformanceAnalysisQueryCmd" autoLoad="true" global="true">
		<model:record>
			<model:field name="text" mapping="typeName" type="string"/>
			<model:field name="value" mapping="organType" type="string"/>
		</model:record>
	</model:dataset>
</model:datasets>

<next:ViewPort>
	<next:BorderLayout>
		<next:Defaults>{collapsible:true,split:true,animFloat:true,autoHide:true,useSplitTips:true,bodyStyle:'padding:6px;'}</next:Defaults>
		<next:Center floatable="true" cmargins="0 0 0 0" margins="0 0 0 0" >
			<next:Panel>
			<next:Panel width="100%" border="0" bodyStyle="padding-bottom:10px;padding-top:0px;">
				<next:Html>			
				<fieldset style="overflow: visible;" class="GroupBox">
					<legend class="GroupBoxTitle"><%=res.getLocaleMsg("UI.BPM.ANALYSIS.006","查询条件") %>
						<img class="GroupBoxExpandButton" src='<%=SkinUtils.getImage(request,"groupbox_collapse.gif")%>' onclick="collapse(this);"/>									
					</legend>
					<div class="GroupBoxDiv" style="width: 100%;height: 100%;">	
						<form onsubmit="return false;" class="L5form">				
							<table  border="1" width="100%">
								<tr>
								 	<td class="FieldLabel"><%=res.getLocaleMsg("UI.BPM.ANALYSIS.007","请选择时间范围：") %></td>
									<td class="FieldInput"><input type="text"
										id="startDate" class="TextEditor"
										title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.008","开始时间") %>' size="40" format='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.024","Ymd") %>'
										onclick="LoushangDate(this)" /> <%=res.getLocaleMsg("UI.BPM.ANALYSIS.029","至") %> <input type="text" id="endDate"
										class="TextEditor" title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.009","结束时间") %>' size="40"
										format='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.024","Ymd") %>' 
										onclick="LoushangDate(this)" />
									</td>
								</tr>
								<tr>
				                    <td class="FieldLabel"><%=res.getLocaleMsg("UI.BPM.ANALYSIS.010","请选择单位或部门：") %></td>
									<td class="FieldInput"><input type="text" id="organName" class="TextEditor" 
										style="width: 262px" title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.011","组织名称") %>' />
										<input type="text" id="organIds" class="TextEditor" style="display:none" />
										<img src="<%=SkinUtils.getImage(request,"l5/liulan.gif")%>"  style="cursor:pointer " onclick="selectStru()" />
									</td>
									<td class="FieldLabel"><%=res.getLocaleMsg("UI.BPM.ANALYSIS.012","请选择岗位：") %></td>
									<td class="FieldInput" width="30%">
										<select id="selectPosition" style="width:200">
											<option dataset="selectPositionDataset"></option>
										</select>
									</td>
									<td class="FieldButton" width="15%">
									<button onclick="query()"><%=res.getLocaleMsg("UI.BPM.ANALYSIS.013","查询") %></button>
									</td>
								</tr>
							</table>
						</form>		
					</div>
				</fieldset>
				</next:Html>
			</next:Panel>			
			<next:GridPanel id="taskGridPanel" name="participantTaskAnalysis" width="100%" height="100%" dataset="taskAnalysisDataset" 
							title='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.014","人员绩效统计分析列表") %>' notSelectFirstRow="true">
				<next:Columns>
	   				<next:RowNumberColumn width="30"/>
	    			<next:RadioBoxColumn></next:RadioBoxColumn>
					<next:Column id="organId" header="organId" field="organId" width="50" hidden="true" >
						<next:TextField allowBlank="false"/>
					</next:Column>
		        	<next:Column id="organName" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.015","人员") %>' field="organName" width="100" sortable="false">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="departmentName" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.016","人员所属部门") %>' field="departmentName" width="100" sortable="false">
						<next:TextField allowBlank="false"/>
					</next:Column>
		        	<next:Column id="totalTask" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.017","总任务数") %>' field="totalTask" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="complementOnTimeTask" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.018","按时完成任务数") %>' field="complementOnTimeTask" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="complementOnTimeTaskPercent" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.019","占比") %>' field="complementOnTimeTaskPercent" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="timeOutTask" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.020","逾期完成任务数") %>' field="timeOutTask" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="timeOutTaskPercent" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.019","占比") %>' field="timeOutTaskPercent" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="normalDaiBanTask" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.021","正常待办数") %>' field="normalDaiBanTask" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="normalDaiBanTaskPercent" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.019","占比") %>' field="normalDaiBanTaskPercent" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="timeOutDaiBanTask" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.022","逾期待办数") %>' field="timeOutDaiBanTask" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
					<next:Column id="timeOutDaiBanTaskPercent" header='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.019","占比") %>' field="timeOutDaiBanTaskPercent" width="100" sortable="false" align="right">
						<next:TextField allowBlank="false"/>
					</next:Column>
				</next:Columns>
				<next:BottomBar>
					<next:PagingToolBar displayMsg='<%=res.getLocaleMsg("UI.BPM.ANALYSIS.023","从第{0}条到{1}条，一共{2}条")%>' displayInfo="true" dataset="taskAnalysisDataset"/>
				</next:BottomBar>
			</next:GridPanel>
			</next:Panel>
		</next:Center>
	</next:BorderLayout>
</next:ViewPort>
</body>
<script language="javascript"  type="text/javascript" >
function collapse(element){
	var fieldsetParent=L5.get(element).findParent("fieldset");
	if(element.expand==null||element.expand==true){	
		fieldsetParent.getElementsByTagName("div")[0].style.display="none";
		element.src = '<%=SkinUtils.getImage(request,"groupbox_expand.gif")%>';
		element.expand=false;
	}else{
		fieldsetParent.getElementsByTagName("div")[0].style.display="";
		element.src = "<%=SkinUtils.getImage(request,"groupbox_collapse.gif")%>";
		element.expand =true;
	}
}

function init(){
	var corporationStruId = "<%=corporationStruId%>";
	if(corporationStruId =="")
		L5.Msg.alert(getLocaleMsg("UI.BPM.ANALYSIS.025","提示"),getLocaleMsg("UI.BPM.ANALYSIS.026","当前用户未关联员工！"));
}

function selectStru(){
	var corporationStruId = "<%=corporationStruId%>";
	var url=L5.webPath+"/jsp/public/help/help.jsp?helpCode=bsp_organhelp&organType=1,2&showOrganType=1,2&rootId="+corporationStruId+"&isCheckBox=1";
	var returnValue = showModalDialog(url, window,"scroll:yes;status:no;dialogWidth:500px;dialogHeight:400px");
	if(!returnValue){
		return;
	}
	var returnValues = returnValue.split(";");
	document.getElementById("organIds").value = returnValues[0];
	document.getElementById("organName").value = returnValues[1];
}

//办结任务查询
function query(){
	var loginUserStruId = "<%=loginUserStruId%>";
	if(loginUserStruId =="null"){
		L5.Msg.alert(getLocaleMsg("UI.BPM.ANALYSIS.025","提示"),getLocaleMsg("UI.BPM.ANALYSIS.026","当前用户未关联员工！"));
		return false;
	}
	var startDate = document.getElementById("startDate").value;
	var endDate = document.getElementById("endDate").value;
	if(startDate=="" && endDate==""){
		L5.Msg.alert(getLocaleMsg("UI.BPM.ANALYSIS.025","提示"),getLocaleMsg("UI.BPM.ANALYSIS.027","请设置时间范围！"));
		return false;
	}
	if(endDate !="" && startDate > endDate){
		L5.Msg.alert(getLocaleMsg("UI.BPM.ANALYSIS.025","提示"),getLocaleMsg("UI.BPM.ANALYSIS.028","时间范围设置不正确！"));
		return false;
	}
	var organIds = document.getElementById("organIds").value;
	var organType = document.getElementById("selectPosition").value;
	var taskAnalysisDataset = L5.DatasetMgr.lookup("taskAnalysisDataset");
	taskAnalysisDataset.setParameter("organIds",organIds);
	taskAnalysisDataset.setParameter("organType",organType);
	taskAnalysisDataset.setParameter("startDate",startDate);
	taskAnalysisDataset.setParameter("endDate",endDate);
	taskAnalysisDataset.load();
}

</script>
</html>