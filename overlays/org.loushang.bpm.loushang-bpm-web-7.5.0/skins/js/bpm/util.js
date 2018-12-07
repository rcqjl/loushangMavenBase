//全选
$(document).on("click","#selectAll",function(){
	selectAll(this.checked);
})
function selectAll(checked){
	$(":checkbox[name='checkbox']").prop("checked", checked);
}

//单击任意td选中
$(document).on("click","#formList tr td:not(:first-child)",function(){
	var obj = $(this).parent().find("td:first").find("input");
	obj.prop("checked",!obj.is(":checked"));
});

//弹窗函数
function UIAlert(content) {
	$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}

//父级窗口弹窗函数
function PAlert(content) {
	parent.$.dialog({
		type: "alert",
		content: content,
		autofocus: true
	});
}

//弹窗提示样式
function sticky(msg, style, position) {
	var type = style ? style : 'success';
	var place = position ? position : 'top';
	$.sticky(
		    msg,
		    {
		        autoclose : 3000, 
		        position : place,
		        style : type
		    }
	);
}