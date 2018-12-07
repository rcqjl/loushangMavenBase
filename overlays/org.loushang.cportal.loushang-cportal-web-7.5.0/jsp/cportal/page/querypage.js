var windowParam = "left=0,top=0,width="+ (screen.availWidth-20) +",height="+ (screen.availHeight-70) +",scrollbars=no,resizable=yes,toolbar=no";
$(function() {
	var url = context + "/service/cportal/pages/data";
	init(url);
	
	 $("#add").bind("click", function() {
		  window.open(context+"/jsp/cportal/builder/pagebuilder.jsp",L.getLocaleMessage("cportal.pageBuilder","页面设计器"),windowParam);
	 });	
	// 条件查询
	$("#query").bind("click", function() {

				var pageName = $("#pageName").val();

				if ((pageName == "" || pageName == null)) {
					var url = context + "/service/cportal/pages/data";
					grid.reload(url);
				} else {
					var url=context + "/service/cportal/pages/queryByPageName";
					var options = {
							"pageName":pageName
					};
					grid.reload(url,options);
				}
			});
	// 删除选中的记录
	$("#batchdel").bind("click", function() {
				var pageIds = getCheckBoxValue("checkboxlist");
				if (pageIds.length < 1) {
					$.dialog({
						autofocus:true,
						type : "alert",
						content : L.getLocaleMessage("tip-select","请至少选择一条记录!")
					});
					return;
				}
				$.dialog({
					autofocus:true,
					type : 'confirm',
					content : L.getLocaleMessage("tip-delete","确认删除该记录?"),
					ok : function() {
						window.location.href=context + "/service/cportal/pages/delete/"+pageIds;
					},
					cancel : function() {
					}

				});
			});
	$("#release").bind("click",function(){
		var pageIds = getCheckBoxValue("checkboxlist");
		if (pageIds.length < 1) {
			$.dialog({
				autofocus:true,
				type : "alert",
				content : L.getLocaleMessage("tip-select","请至少选择一条记录!")
			});
			return;
		}
		release(pageIds)
	});
});
function init(url){
	var options = {};
	grid = new L.FlexGrid("pageList",url);
	grid.init(options);
}
function gridReload(){
	var url = context + "/service/cportal/pages/data";
	grid.reload(url);
}
//操作列按钮 
function operation(data, type, full) {
	return '<div><a onclick="del('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("cportal.page.delete","删除")+'</a>'
	+'<span>&nbsp;&nbsp</span>'
	+'<a onclick="modify('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("cportal.page.modify","编辑")+'</a>'
	+'<span>&nbsp;&nbsp</span>'
	+'<a onclick="release('+"'"+ data
	+ "'"+')">'+L.getLocaleMessage("cportal.page.release","发布")+'</a>'
	+'<span>&nbsp;&nbsp</span>'
	+'<a onclick="unrelease('+"'"+ data
	+ "'"+')">取消发布</a></div>'
}
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
};
function modifyLink(data, type, full){
	return '<a onclick="modify('+"'"+full.id+"'"+')">'+data+'</a>'
}
function renderstatus(data,type,full){
	if(data != "" || data != null)
	{
	  if(data == "1"){
		  data = L.getLocaleMessage("cportal.yes","是");
	  }
	  if(data == "0"){
		  data = L.getLocaleMessage("cportal.no","否");
	  }			    		    			  
	}
return data;
}

//删除
function del(pageId){
	$.dialog({
		type : 'confirm',
		content : L.getLocaleMessage("tip-delete","确认删除该记录?"),
		autofocus:true,	
		ok : function() {
			window.location.href=context + "/service/cportal/pages/delete/"+pageId;
		},
		cancel : function() {
		}
	});
}
//编辑
function modify(pageId){
	var url = context + "/jsp/cportal/builder/pagebuilder.jsp?pageId=" + pageId
    window.open(url, L.getLocaleMessage("cportal.pageBuilder","页面设计器"), windowParam);
}
function release(pageId){
	$.ajax({
		url:context + "/service/cportal/pages/release/",
		data:"pageIds="+pageId,
		success:function(msg){
			releaseSticky(msg);
			grid.reload();
		}
	});
}
function unrelease(pageId){
	$.ajax({
		url:context + "/service/cportal/pages/unrelease/",
		data:{"pageIds":pageId},
		success:function(msg){
			releaseSticky(msg);
			grid.reload();
		}
	});
}
//发布提示
function releaseSticky(msg){
	if(msg=="true"){
		var info =L.getLocaleMessage("cportal.success","成功");
		var style ="success";
	}else{
		var info =L.getLocaleMessage("cportal.error","失败");
		var style ="error";
	}
	$.sticky(
			info,
			{
				autoclose:1000,
				position:'top',
				style:style
			});
}
//checkbox全选
function selectAll(obj, iteName) {
	if (obj.checked) {
		$("input[name='checkboxlist']").each(function() {
			this.checked = true;
		});
	} else {
		$("input[name='checkboxlist']").each(function() {
			this.checked = false;
		});
	}
}
// 获取选中的复选框的记录
function getCheckBoxValue(attrKey) {
	var confCheckBox = $("input:checkbox[name=" + attrKey + "]");
	var selectedValue = "";
	for ( var i = 0; i < confCheckBox.length; i++) {
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
