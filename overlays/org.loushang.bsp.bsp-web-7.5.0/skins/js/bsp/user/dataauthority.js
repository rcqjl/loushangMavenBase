var userIdAdds;
var checkboxNames = "checkboxlists";

//提示信息
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg, //提示框显示内容
		    {
		        autoclose : 1000, 
		        position : place,
		        style : type
		    });
}

$(document).ready(function(){
	
	// 初始化datatable
	initDataTable();
	
	//增加
	$("#addDateAutority").on("click",function(){
		userId = $("#userId").val();
		addDataAuthority(userId);
	});
	
	//批量删除
	$("#delDateAutority").on("click",function(){
		delDataAutoritys();
	});
	
});

$(document).on("click","#selectAll",function(){
	selectAll(this.checked);
});

///////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
//初始化表格
function initDataTable() {
var options = {
	"ordering": false,
	"btnDefs": [

	            ]
	};
	var url = context +　"/service/bsp/user/dataAut";
	gridData = new L.FlexGrid("dataList",url);
	gridData.setParameter("userId",$("#userId").val());
	gridData.init(options);
}

//增加
function addDataAuthority(userId){
	var msg = L.getLocaleMessage("bsp.user.087","增加组织/岗位名称");
	$.dialog({
		type: "iframe",
		title: msg,
		url: context +　"/service/bsp/user/dataAutorityAdd?userIds="+userId,
		width: 800,
		height: 550,
		onclose: function () {
			gridData.setParameter("userId",userId);
			gridData.reload();
		}
	});
}

//操作字段渲染
function renderOrganType(data,type,full){
	var msg = L.getLocaleMessage("bsp.user.002","删除");
	var delBtn = "<a href=\"javascript:delDataAutority('"+full.id+"')\">"+msg+"</a>";
	return delBtn + "&nbsp;&nbsp;&nbsp;";
}

//是否默认字段渲染
function renderIsDefault(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.088","否");
	var msg2 = L.getLocaleMessage("bsp.user.089","是");
	if(data == "0"){
		data = msg1;
	}
	if(data == "1"){
		data = msg2;
	}
	return data;
}

//是否包含下级
function renderIsScope(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.088","否");
	var msg2 = L.getLocaleMessage("bsp.user.089","是");
	if(data == "0"){
		data = msg1;
	}
	if(data == "1"){
		data = msg2;
	}
	return data;
}

//删除用户
function delDataAutority(data){
	var msg1 = L.getLocaleMessage("bsp.user.075","确认删除该记录?");
	var msg2 = L.getLocaleMessage("bsp.user.086","删除成功！");
	var recordIds = data;
	var url = context+"/service/bsp/user/delDataAutoritys";
	url += "?Ids="+recordIds;
	$.dialog({
		type: 'confirm',
		content: msg1,
	    autofocus: true,
		ok: function() {
				$.ajax({
			        url:url,
			        type:"post",
			        async:false,
			        success:function(data){
			        	gridData.reload();
			        	sticky(msg2);
			        }
			    });
			},
		cancel: function(){}
	});
}

//批量删除户
function delDataAutoritys(Id){
	var msg1 = L.getLocaleMessage("bsp.user.076","请选要删除的记录！");
	var msg2 = L.getLocaleMessage("bsp.user.075","确认删除该记录?");
	var msg3 = L.getLocaleMessage("bsp.user.086","删除成功！");
	var Ids = [];
	if(Id) {
		Ids.push(Id);
	}else{
		var $selected = $(":checkbox[name=" + checkboxNames + "]:checked");
		if($selected.length < 1) {
			$.dialog({
				type: 'confirm',
				content: msg1,
			    autofocus: true,
				cancel: function(){}
			});
			return;
		}
		$selected.each(function(i, checkbox){
			Ids.push($(checkbox).val());
		});
		Ids = Ids.join();
		var url = context+"/service/bsp/user/delDataAutoritys";
		url += "?Ids="+Ids;
		$.dialog({
			type: 'confirm',
			content: msg2,
		    autofocus: true,
			ok: function() {
					$.ajax({
				        url:url,
				        type:"post",
				        async:false,
				        success:function(data){
				        	gridData.reload();
				        	sticky(msg3);
				        }
				    });
				},
			cancel: function(){}
		});
	}
}

//复选框全选
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlists"/>';
}

//全选
function selectAll(checked){
	$(":checkbox[name="+checkboxNames+"]").prop("checked",checked);
}