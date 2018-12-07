$(function() {
	var options={};
	var url = context + "/service/bsp/userself/pagedata",
	grid = new L.FlexGrid("userList",url); 
	grid.init(options); //初始化datatable
	
	$("table tbody").on("click",".modify",function(){
			var recordIds = grid.oTable.row($(this).parents("tr")).data().userId;
			var url = context + "/service/bsp/userself/edit/" + recordIds;
			window.location.href= url;
	});
	
	$("table tbody").on("click",".delete", function() {
			var id = grid.oTable.row($(this).parents("tr")).data().userId;
			var url = context+ "/service/bsp/userself/delete/" + id;
			$.dialog({
				type : 'confirm',
				content : '删除该记录?',
				ok : function() {
					window.location.href = url;
				},
				cancel : function() {	}
			});
	});
	// 条件查询
	$("#query").bind("click", function(){
		query();
	});
	$("#queryInput").bind('keypress',function(event) {
		if (event.keyCode == "13") {
				query();
		 }
	});
	
	//增加
	$("#add").bind("click", add);
	// 删除选中的记录
	$("#batchdel").bind(
			"click",
			function() {
				var recordIds = getCheckBoxValue("checkList");
				var recourdCount = recordIds.split(",").length;
				if (recordIds.length < 1) {
					$.dialog({
						type : "alert",
						content : "未选中任何记录!"
					});
					return;
				}
				$.dialog({
					type : 'confirm',
					content : '删除这'+recourdCount+'条记录?',
					ok : function() {
						window.location.href = context
								+ "/service/bsp/userself/delete/" + recordIds;
					},
					cancel : function() {
					}
				});
			});
	function query() {
		var searchKey = encodeURI($("#queryInput").val());
		if (searchKey == undefined) {
			searchKey = "";
		}
		var url = context + "/service/bsp/userself/pagedata?searchKey=" +searchKey;	
		grid.reload(url);	
	}

});

function add(){
	window.location.href = context + "/jsp/bsp/userself/user_add.jsp";
}

function checkBox(data, type, full){
	return '<input type="checkbox" value="'	+ data	+ '" title="'+ data	+ '" id="checkbox" name="checkList"/>';
}

function accountStatus(data, type, full) {
	if (data != "" || data != null) {
		if (data == "00" || data == "10") {
			data = '<span class="fa fa-ban" style="margin-right:3px; color:#ff0000;"></span>' + "锁定";
		} else if (data == "11") {
			data = '<span class="fa fa-check-circle" style="margin-right:3px; color:#7ed424;"></span>' + "打开";
		} 
	}
	return data;
}

function manager(data,type,full){
	return '<div class="btn-group pull-left" style="display:block;margin-top:6px;">'
	+'<button id="toTheck"  type="button"  class="btn btn-xs ue-btn modify" style="margin:0 auto;display:block;">'
	+'<span class="fa fa-cog"></span>管理</button>'
	+'<button type="button"  class="btn btn-xs ue-btn delete" style="margin-left:5px;margin-bottom:3px;">'
	+'<span class="fa fa-trash"></span>删除</button></div>';
}

//checkbox全选
function selectAll(obj, iteName) {
	if (obj.checked) {
		$("input[name='checkList']").each(function() {
			this.checked = true;
		});
	} else {
		$("input[name='checkList']").each(function() {
			this.checked = false;
		});
	}
}

// 获取选中的复选框的记录
function getCheckBoxValue(attrKey) {
	var confCheckBox = $("input:checkbox[name=" + attrKey + "]");
	var selectedValue = "";
	for (var i = 0; i < confCheckBox.length; i++) {
		if (confCheckBox[i].checked) {
			if ("" == selectedValue) {
				selectedValue = confCheckBox[i].value;
			} else {
				selectedValue = selectedValue + "," + confCheckBox[i].value;
			}
		}
	}
	return selectedValue;
}