var signId;
var userIds = userIds;
var checkboxNames = "checkboxlists";
$(document).ready(function(){
	initBatchUserDataAuthority();
	$("#addBatchUserAut").on("click",function(){
		signIds = signId;
		addBatchUserAut(signIds);
	});
	
	$("#delBatchUserAut").on("click",function(){
		delBatchUserAut();
	});
});

//“全选”按钮
$(document).on("click","#selectAll",function() {
	selectAll(this.checked);
});

//初始化表单
function initBatchUserDataAuthority(){
	var options = {
			"ordering": false,
			"btnDefs": [

			            ]
			};
			var url = context +　"/service/bsp/user/dataAut";
			gridBatchData = new L.FlexGrid("batchDataAuthorityList",url);
			gridBatchData.setParameter("userId",userIds);
			gridBatchData.init(options);
}

//添加
function addBatchUserAut(signIds){
	var msg = L.getLocaleMessage("bsp.user.087","增加组织/岗位名称");
	$.dialog({
		type: "iframe",
		title: msg,
		url: context +　"/service/bsp/user/addBatchUserAutSkip?signIds="+signIds+"&userIds="+userIds,
		width: 800,
		height: 550,
		onclose: function () {
			gridBatchData.setParameter("userId",userIds);
			gridBatchData.reload();
		}
	});
}

//批量删除
function delBatchUserAut(){
	var msg1 = L.getLocaleMessage("bsp.user.076","请选要删除的记录！");
	var msg2 = L.getLocaleMessage("bsp.user.075","确认删除该记录?");
	var Ids = [];
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
			        	gridBatchData.reload();
			        }
			    });
			},
		cancel: function(){}
	});
}

//是否默认字段渲染
function renderIsDefault(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.088","否");
	var msg2 = L.getLocaleMessage("bsp.user.089","是");
	if(data == "0"){
		data = msg1;
		return data;
	}
	if(data == "1"){
		data = msg2;
		return data;
	}
}

//是否包含下级
function renderIsScope(data,type,full){
	var msg1 = L.getLocaleMessage("bsp.user.088","否");
	var msg2 = L.getLocaleMessage("bsp.user.089","是");
	if(data == "0"){
		data = msg1;
		return data;
	}
	if(data == "1"){
		data = msg2;
		return data;
	}
}

//复选框全选
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlists"/>';
}

//checkbox全选 
function selectAll(checked){
	$(":checkbox[name="+checkboxNames+"]").prop("checked", checked);
}