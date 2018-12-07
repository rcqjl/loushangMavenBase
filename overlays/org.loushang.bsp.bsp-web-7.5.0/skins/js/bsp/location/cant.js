var cantCode,superCode;
var crtMayType; //当前行政区划的可能类型
var countryCode = "CN";

$(function() {
	var url = context + "/service/bsp/location/cant/data";
	init(url);
	$("#query").click(function() {
		var cantName = $("#queryCant").val();
		queryCant(cantName);
	});
	
	//批量删除
	$("#batchDelCant").click(function() {
		var msg3 = L.getLocaleMessage("bsp.cant.020", "请选择要删除的记录!");
		var cantCodeArr = getCheckBoxValue();
		if (cantCodeArr.length > 0) {
			cantDel(cantCodeArr);
		} else {
			$.dialog({
				autofocus : true,
				type : "alert",
				content : msg3
			});
			return;
		}
	});
	// checkbox全选
	$("#selectAll").click(function() {
		selectAll(this.checked);
	});

	// 新建
	$("#addCant").click(
			function() {
				var msg1 = L.getLocaleMessage("bsp.cant.021", "新增");
				var msg2 = L.getLocaleMessage("bsp.cant.022", "保存成功！");
				var url = context
						+ "/service/bsp/location/cant/addpage?supercode=" + superCode + "&maytype=" + crtMayType;
				$.dialog({
					type : "iframe",
					url : url,
					title : msg1,
					width : 640,
					height : 280,
					autofocus : true,
					onclose : function() {
						var returnVal = this.returnValue;
						if(returnVal) {
							sticky(msg2);
							grid.reload();
						}
					}
				});
			});
});


//初始化表格
function init(url) {
	var options = {};
	superCode = "CN";
	
	grid = new L.FlexGrid("cantList", url);
	grid.setParameter("superCode", superCode);
	grid.init(options);
	
	initBread();
}

// checkbox全选
function selectAll(checked) {
	$(":checkbox[name=checkboxlist]").prop("checked", checked);
}

// 获取选中的复选框中的值
function getCheckBoxValue() {
	var idArr = new Array();
	$(":checkbox[name=checkboxlist]:checked").each(function() {
		idArr.push(this.value);
	});

	return idArr;
}

// 条件查询
function queryCant(cantName) {
	var url = context + "/service/bsp/location/cant/data";
	grid.setParameter("queryCant", cantName);
	grid.reload(url);
}

// 删除
function cantDel(cantCode) {
	var msg1 = L.getLocaleMessage("bsp.cant.023", "确认删除选中行政区划吗?");
	var msg2 = L.getLocaleMessage("bsp.cant.024", "删除成功！");
	var msg3 = L.getLocaleMessage("bsp.cant.025", "存在下级行政区划，不能删除");
	
	$.dialog({
		type: "confirm",
		content: msg1,
	    autofocus: true,
		ok: function() {
			$.ajax({
				url : context + "/service/bsp/location/cant/deleting",
				data : "cantCodeArr=" + cantCode,
				type : "POST",
				async: false,
				success : function(data) {
					if(data.length==0){
			    		sticky(msg2)
			    		grid.reload();
			    	}else{
			    		var code="";
			    		for(index in data){
			    			code = "[" + data[index] +"] "+  code 
			    		}
			    		$.dialog({
			    			type:"alert",
			    			content:code+msg3
			    		});
			    		grid.reload();
			    	}
				},
				error: function(msg) {
					alert(msg.responseText);
				}
			});
		},
		cancel: function(){}
	});
}

// 编辑
function cantUpdate(cantCode) {
	var msg1 = L.getLocaleMessage("bsp.cant.026", "编辑");
	var msg2 = L.getLocaleMessage("bsp.cant.022", "保存成功！");
	var url = context + "/service/bsp/location/cant/editpage?cantcode=" + cantCode +"&supercode=" + superCode;
	$.dialog({
		type : "iframe",
		url : url,
		title : msg1,
		width : 640,
		height : 280,
		autofocus : true,
		onclose : function() {
			var returnVal = this.returnValue;
			if(returnVal) {
				sticky(msg2);
				grid.reload();
			}
		}
	});

}

function renderOpt(data, type, full) {
	var msg2 = L.getLocaleMessage("bsp.cant.026", "编辑");
	var msg3 = L.getLocaleMessage("bsp.cant.003", "删除");
	return '<div>' + '<a onclick="cantUpdate(' + "'" + full.cantCode + "'"
			+ ')">' + msg2 + '</a>'
			+ '<span>&nbsp;&nbsp;&nbsp;</span>' + '<a onclick="cantDel(' + "'"
			+ full.cantCode + "'" + ')">' + msg3 + '</a></div>'
}

function renderLen(data,type,full){
	var tdData = "<span title='" + data + "'>"+data+"</span>";
	return tdData;
};

function rendercheckbox(data, type, full) {
	crtMayType = full.cantType;
	return '<input type="checkbox" value="' + full.cantCode + '" title="'
			+ full.cantCode + '" id="checkbox" name="checkboxlist"/>';
}

function renderName(data, type, full) {
	var newName = "<a href='javascript:subCant(" + '"' + data + '","' + full.cantCode + '"' + ");'>" + data + "</a>";
	return newName;
}

//点击表格中的名称
function subCant(name, cant) {	
	var url = context + "/service/bsp/location/cant/data";
	grid.setParameter("superCode", cant);
	grid.setParameter("queryCant", null);
	grid.reload(url);
	
	superCode = cant;
	editBread(name, cant);
}

function initBread(){
	$("#bread").append(L.getLocaleMessage("bsp.cant.027", "当前位置")
			+ "：<a id=" + superCode + " href='javascript:parentCant(" + '"' + superCode + '"' + ");'>"
			+ L.getLocaleMessage("bsp.cant.028", "中国")
			+ "</a>");
}

function editBread(name, code) {
	var split = "<span> > </span>"
	var txt = "<a id="+code+" href='javascript:parentCant(" + '"' + code + '"' + ");'>" + name + "</a>";
	
	$("#bread").append(split);
	$("#bread").append(txt);
}

//点击面包屑中的名称
function parentCant(cant) {
	$("#queryCant").val();
	
	var url = context + "/service/bsp/location/cant/data";
	grid.setParameter("superCode", cant);
	grid.setParameter("queryCant", null);
	grid.reload(url);
	
	superCode = cant;

	$("#"+cant).nextAll().remove();
}

//自动消失提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}