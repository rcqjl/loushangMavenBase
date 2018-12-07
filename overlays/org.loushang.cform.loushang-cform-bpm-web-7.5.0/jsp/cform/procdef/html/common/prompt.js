var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
$(function(){
	$("label").text(fromParentParam.title+":");
	$("#content").val(fromParentParam.content);
	$("#content").prop("title",fromParentParam.content);
	$("#content").change(function(){
		$(this).prop("title",$(this).val());
	});
	$("#confirm").click(function(){
		var result=fromParentParam.afterClose($('#content').val());
		if(result){
			closeDialog();
		}
	});
	$("#cancel").click(function(){
		closeDialog();
	});
});