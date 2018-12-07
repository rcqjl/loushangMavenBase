<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model"%>
<%
	org.loushang.next.i18n.ResourceBundle res=org.loushang.next.i18n.ResourceBundle.getPackageBundle("messages.CForm");
%>
<html>
<head>
<title><s:message code="cf.bdr.maxswiftnumber" text="最大流水号列表"/></title>
<next:ScriptManager></next:ScriptManager>
<l:script path="jquery.js"/>
</head>
<body style="margin: 0; padding: 0; scroll: auto;">
	<model:datasets>
		<model:dataset id="maxValueDataset"
			cmd="org.loushang.cform.builder.cmd.MaxValueQueryCmd" autoLoad="false"
			global="true" method="query" pageAble="true" pageSize="10">
			<model:record>
				<model:field name="id" mapping="idId"/>	
				<model:field name="name" mapping="idName"/>	
			</model:record>
		</model:dataset>
	</model:datasets>
	<next:ViewPort>
		<next:AnchorLayout>
			<next:GridPanel id="queryGridPanel" title='<%=res.getLocaleMsg("cf.bdr.maxswiftnumber","确定")%>'
				name="queryGridPanel" width="100%" height="100%"
				dataset="maxValueDataset" notSelectFirstRow="true">
				
				<next:Columns>
					<next:RowNumberColumn width="30" />
					<next:RadioBoxColumn></next:RadioBoxColumn>
					<next:Column header="ID" field="id" width="160">
						<next:TextField allowBlank="false" />
					</next:Column>
					<next:Column header='<%=res.getLocaleMsg("cf.name","名称")%>' field="name" width="200">
						<next:TextField allowBlank="false" />
					</next:Column>
				</next:Columns>
				<next:TopBar>
					<next:ToolBarItem symbol="->"></next:ToolBarItem>
					<next:ToolBarItem iconCls="yes" text='<%=res.getLocaleMsg("cf.confirm","确定")%>' handler="confirmSelect" />
					<next:ToolBarItem iconCls="no" text='<%=res.getLocaleMsg("cf.cancel","取消")%>' handler="closeWindow" />
				</next:TopBar>
				<next:BottomBar>
					<next:PagingToolBar dataset="maxValueDataset" displayInfo="false"/>
				</next:BottomBar>
			</next:GridPanel>
		</next:AnchorLayout>
	</next:ViewPort>
</body>
<script>
	//初始化
	function init() {
		maxValueDataset.setParameter('IS_GLOBAL', '1');
		maxValueDataset.addListener('load', function(){
			// 从父窗口传递来的值
			var idvalue = $(window.opener).find("#dataBindParam").val();
			if(idvalue){
				for(var i = 0; i < maxValueDataset.getCount(); i++){
					var record = maxValueDataset.getAt(i);
					if(record.get('id') === idvalue){
						var queryGridPanel = L5.getCmp("queryGridPanel");
						var selections = queryGridPanel.getSelectionModel();
						selections.selectRecords([record]);
						return false;
					}
				}
			}
		});
		maxValueDataset.load();
	}
	function queryHandler(){
		var  val = document.getElementById('queryIdName').value.trim();
		if(val){
			maxValueDataset.setParameter('ID_NAME@LIKE', val);
		}
		maxValueDataset.setParameter('IS_GLOBAL', '1');
		maxValueDataset.load();
	}
	// 确定
	function confirmSelect() {
		var queryGridPanel = L5.getCmp("queryGridPanel");
		var selecteds = queryGridPanel.getSelectionModel().getSelections();
		if(selecteds.length != 1){
			L5.MessageBox.alert(L.getLocaleMessage("cf.bdr.msg", "消息提示"), L.getLocaleMessage("cf.chooseorcancel", "请选择一条记录"));
			return false;
		}
	
		var rtnObj = {};
		rtnObj.id = selecteds[0].get("id");
		rtnObj.name = selecteds[0].get("name");
		// 关闭弹出框
		window.returnValue = rtnObj;
		window.close();
	}
	
	// 关闭
	function closeWindow() {
		window.returnValue = "";
		window.close();
	}
</script>
</html>
