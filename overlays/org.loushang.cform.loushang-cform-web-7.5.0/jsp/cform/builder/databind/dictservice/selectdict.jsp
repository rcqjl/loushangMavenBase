<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<%@ taglib uri="/tags/next-web" prefix="next"%>
<%@ taglib uri="/tags/next-model" prefix="model"%>
<%
	org.loushang.next.i18n.ResourceBundle res=org.loushang.next.i18n.ResourceBundle.getPackageBundle("messages.CForm");
%>
<html>
<head>
<title>选择字典</title>
<next:ScriptManager></next:ScriptManager>
<l:script path="jquery.js"/>
</head>
<body style="margin: 0; padding: 0; scroll: auto;">
	<model:datasets>
		<model:dataset id="dictDataset"
			cmd="org.loushang.cform.builder.cmd.DictQueryCmd" autoLoad="false"
			global="true" method="query" pageAble="true" pageSize="10">
			<model:record>
				<model:field name="id" mapping="dictCode"/>	
				<model:field name="name" mapping="dictName"/>	
			</model:record>
		</model:dataset>
	</model:datasets>
	<next:ViewPort>
		<next:AnchorLayout>
			<next:GridPanel id="queryGridPanel" title='<%=res.getLocaleMsg("cf.bdr.dictlist","字典列表")%>'
				name="queryGridPanel" width="100%" height="100%"
				dataset="dictDataset" notSelectFirstRow="true">
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
					<next:PagingToolBar dataset="dictDataset" displayInfo="false"/>
				</next:BottomBar>
			</next:GridPanel>
		</next:AnchorLayout>
	</next:ViewPort>
</body>
<script>
	//初始化
	function init() {
		dictDataset.addListener('load', function(){
			// 从父窗口传递来的值
			var value = $(window.opener).find("#dataBindParam").val();
			if(value){
				for(var i = 0; i < dictDataset.getCount(); i++){
					var record = dictDataset.getAt(i);
					if(record.get('id') === value){
						var queryGridPanel = L5.getCmp("queryGridPanel");
						var selections = queryGridPanel.getSelectionModel();
						selections.selectRecords([record]);
						return false;
					}
				}
			}
		});
		dictDataset.load();
	}
	function queryHandler(){
		var  val = document.getElementById('queryDictName').value.trim();
		if(val){
			dictDataset.setParameter('DICT_NAME@LIKE', val);
		}
		dictDataset.load();
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
