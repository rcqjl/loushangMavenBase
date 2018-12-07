﻿var checkboxName = "checkboxlist";
var grid;
$(document).ready(function(){
	
	// 初始化datatable
	initTable();

	// 查询
	$("#query").on("click",function() { 
		queryForm();
	});
	  
	// 绑定回车键
	$("#toUserNameOrId").keydown(function(event) {
		if(event.keyCode==13){ 
			queryForm();	
		}
	});
	
});

// 初始化表格
function initTable() {
	var options = {
		"ordering": false
	};
	var url = context +　"/service/bsp/audit/online/getonlineuser";
	grid = new L.FlexGrid("onlineList",url);
	grid.init(options);
}

// 查询
function queryForm(){
	var userId= $("#toUserNameOrId").val();
	var userName=$("#toUserNameOrId").val();
	var url = context+"/service/bsp/audit/online/getonlineuser";
	var param={"userId":userId,"userName":userName};
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);

}