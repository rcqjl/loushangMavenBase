<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="/tags/loushang-web" prefix="l"%>
<html>
<head>
	<title><s:message code="cf.fim" text="表单映射项定义"/></title>
	<l:link path="css/bootstrap.css,css/font-awesome.css,css/slickgrid.css,css/ui.css,css/form.css"/>
	<style type="text/css">
		.ue-menu-wrap {
			top: 0px;
			margin: 5px;
			margin-top: 0;
		}
		.grid {
			width: 100%;
			height: 90%;
			border: 1px solid #ddd;
		}
		.pull-right {
			overflow: overlay;
			margin-bottom: 5px;
		}
		.ue-container {
			margin-top: 0;
			width: 100%;
		}
		.btn-box {
			display: none;
		}
		.row {
			margin-right: 0;
			margin-left: 0;
			text-align: center;
		}
		.top {
			height: 40%;
			min-height: 260px;
		}
		.botton {
			height: 50%;
		}
		.box1, .box2 {
			float: none;
			display: inline-block;
			width: 40%;
		}
	</style>
	
    <!--[if lt IE 9]>
      <script src="<l:asset path='html5shiv.js'/>"></script>
      <script src="<l:asset path='respond.js'/>"></script>
    <![endif]-->
    <l:script path="jquery.js,bootstrap.js,slickgrid.js,form.js,l5-adapter.js,ui.js"/>
</head>
<body>
	<div class="ue-menu-wrap">
		<div class="top">
			<select id="doublebox" multiple="multiple" size="10" name="doublebox">
	        </select>
		</div>
		<div class="botton">
		    <div class="btn-group pull-right">
				<button id="addRow" type="button" class="btn ue-btn">
					<span class="fa fa-plus"></span> <s:message code="cf.add" text="增加"/>
				</button>
				<button id="saveChangedData" type="button" class="btn ue-btn">
					<span class="fa fa-save"></span> <s:message code="cf.save" text="保存"/>
				</button>
				<button id="back" type="button" class="btn ue-btn">
					<span class="fa fa-undo"></span> <s:message code="cf.return" text="返回"/>
				</button>
			</div>
			<div id="mapItemGrid" class="grid"></div>
		</div>
	</div>
</body>
<script type="text/javascript">
var bizModelMapPk = "${param.bizModelMapPk}";
var fromBizModel = "${param.fromBizModel}";
var toBizModel = "${param.toBizModel}";
// 国际化。
function m(code, defMsg) {
	return L.getLocaleMessage(code, defMsg);
}
// 定义表格对象。
var mapItemGrid;
// 表格数据。
var gridItemData = [];

// 弹窗函数。
function UIAlert(msg) {
	$.dialog({
		type: "alert",
		content: msg,
		autofocus: true
	});
}

// 弹窗样式。
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

$(document).ready(function(){
	// 初始化表格。
	initTable();
	
	// 初始化双边栏。
	initDoublebox();
	
	$("#addRow").click(function(){
		addRow();
	});
	
	// 保存数据。
	$("#saveChangedData").click(function(){
		saveChangedData();
	});
	// “返回”按钮。
	$("#back").click(function(){
		back();
	});
})

// 初始化双边栏。
function initDoublebox() {
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelItemQueryCmd");
	cmd.setParameter("MODEL_ID", fromBizModel);
	cmd.execute("queryBizModelItems");
	var fromItems = cmd.getData();
	
	cmd.setParameter("MODEL_ID", toBizModel);
	cmd.execute("queryBizModelItems");
	var toItems = cmd.getData();
	
	$("#doublebox").doublebox({
		nonSelectedListLabel: m("cf.si", "源表单项"),
        selectedListLabel: m("cf.ti", "目标表单项"),
        //filterPlaceHolder: "输入表单项名称查询",
        showFilterInputs: false,	// 隐藏查询框
        nonSelectedList: fromItems,
        selectedList: toItems,
        moveOnSelect: false,
        optionValue: "modelItemId",
        optionText: "modelItemName",
	});
}

// 初始化映射项
function initTable() {
	// 定义列
	var checkboxSelector = new Slick.CheckboxSelectColumn({multiSelect:true});
	var columns = [
	               checkboxSelector.getColumnDefinition(),
	               {
	            	   id: "fromModelItemId", 
	            	   name: m("cf.sii", "源表单项ID"), 
	            	   field: "fromModelItemId", 
	            	   width: 200
	               },
	               {
	            	   id: "fromModelItemName", 
	            	   name: m("cf.sin", "源表单项名称"), 
	            	   field: "fromModelItemName", 
	            	   width: 200
	               },
	               {
	            	   id: "toModelItemId", 
	            	   name: m("cf.tii", "目标表单项ID"), 
	            	   field: "toModelItemId", 
	            	   width: 200
	               },
	               {
	            	   id: "toModelItemName", 
	            	   name: m("cf.tin", "目标表单项名称"), 
	            	   field: "toModelItemName",
	            	   width: 200
	               }
	          ];
	// 获取表体数据。
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapItemQueryCmd");
	cmd.setParameter("bizModelMapPk", bizModelMapPk);
	cmd.setParameter("fromBizModel", fromBizModel);
	cmd.setParameter("toBizModel", toBizModel);
	cmd.setParameter("start", 0);
	cmd.setParameter("limit", 10);
	cmd.execute("queryBizModelMapItems");
	gridItemData = cmd.getData() ? cmd.getData() : [];
	
	// 表格配置项。
	var options={
			selectActiveRow: false,	//点击行时将其选中
			multiSelect: true, //多选。true：多选；false：单选；默认：true。
	};
	
	// 生成表格。
	mapItemGrid = $("#mapItemGrid").editgrid(gridItemData, columns, options);
	mapItemGrid.registerPlugin(checkboxSelector);
	mapItemGrid.autosizeColumns();	//自动调整列宽
}

// 增加一行。
function addRow() {
	var $fromItem = $("select[multiple=multiple]").eq(0).find("option:selected");
	if($fromItem.length < 1) {
		UIAlert(m("cf.csi", "请选择源表单项！"));
		return;
	}
	var $toItem = $("select[multiple=multiple]").eq(1).find("option:selected");
	if($toItem.length < 1) {
		UIAlert(m("cf.cti", "请选择目标表单项！"));
		return;
	}
	var data = {
			bizModelMapPk: bizModelMapPk,
			fromModelItemId: $fromItem.val(),
			fromModelItemName: $fromItem.text(),
			toModelItemId: $toItem.val(),
			toModelItemName: $toItem.text(),
			state: 1
	}
	mapItemGrid.addRow(data);
}

// 保存数据
function saveChangedData() {
	var addData = [];
	for(i in gridItemData) {
		if(gridItemData[i].state == 1)
			addData.push(gridItemData[i]);
	}
	if(addData.length < 1) {
		UIAlert(m("cf.nochange", "没有需要保存的数据！"));
		return;
	}
	
	var records = L5.DataConvert(mapItemGrid.object2String(addData));
	
	var cmd = new L5.Command("org.loushang.cform.biz.cmd.BizModelMapItemCmd");				
	cmd.setParameter("records", records);
	cmd.execute("save");
	if(cmd.error){
		sticky(m("cf.savefailed", "保存出错！"), "error", "center");
	}else{
		sticky(m("cf.savesucceed", "保存成功！"));
	}
}

//返回
function back() {
	window.location.href = "querybizmodelmap.jsp";
}
</script>
</html>