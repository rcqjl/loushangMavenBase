$(function() {
	init();
	$("#query").click(function() {
		var dictName = $("#dictName").val();
		queryDict(dictName);
	});
	$("#confirm").click(function(){
		
		var $radio = $("[type=radio]:checked");
		if(!$radio.length) {
			return false;
		}
		
		var rtnObj = {};
		rtnObj.id = $radio.val();
		rtnObj.name = $radio.attr("title");
		// 关闭弹出框
		window.returnValue = rtnObj;
		window.close();
	});
	$("#cancel").click(function(){
		window.returnValue = "";
		window.close();
	});
});

function renderLen(data,type,full){
	var tdData = "<span title='" + data + "'>"+data+"</span>";
	return tdData;
};

function rendercheckbox(data, type, full) {
	return '<input type="radio" value="' + full.dictCode + '" title="'
			+ full.dictName + '" id="checkbox" name="checkboxlist"/>';
}

// 条件查询
function queryDict(dictName) {
	url = context + "/service/cform/builder/getAllDictsPaged";
	grid.setParameter("dictName", dictName);
	grid.reload(url);
}
// 初始化表格
function init() {
	var url = context + "/service/cform/builder/getAllDictsPaged";
	var options = {};
	grid = new L.FlexGrid("dictList", url);
	grid.setParameter("inUse", "1");
	grid.init(options);
}