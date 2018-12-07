var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
$(function() {
	showFormArea(fromParentParam.fieldList);
	$("#confirm").bind("click",function(){
		var trs=$("tbody tr").toArray();
		var field=null;
		var retObj=new parent.WFormFields();
		retObj.init();
		for(var n in trs){
			if(n){
				field=new parent.WFormField();
				field.id=$(trs[n]).children("td:eq(0)").attr("id");
				field.name=$(trs[n]).children("td:eq(0)").text();
				field.fieldType=$(trs[n]).prop("fieldType");
				field.isHidden=$(trs[n]).children("td:eq(1)").children("input").prop("checked");
				field.isReadOnly=$(trs[n]).children("td:eq(2)").children("input").prop("checked");
				field.isNotNull=$(trs[n]).children("td:eq(3)").children("input").prop("checked");
				if(field.isHidden || field.isReadOnly || field.isNotNull)
					retObj.childList[n]=field;
			}
		}
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	function showFormArea(data){
		if(data){
			$("tbody tr").remove();
			for(var n in data){
				var tr=$("<tr></tr>");
				$(tr).prop("fieldType",data[n].fieldType).attr("id",data[n].id).append($("<td></td>").text(data[n].name).attr("id",data[n].id).css({
					"text-align":"left",
					"padding-left":"10px"
						}));
					$(tr).append($("<td></td>").append($("<input />").attr("type","radio").prop("name",data[n].id)));
					$(tr).append($("<td></td>").append($("<input />").attr("type","radio").prop("name",data[n].id)));
					$(tr).append($("<td></td>").append($("<input />").attr("type","radio").prop("name",data[n].id)));
				$("tbody").append(tr);
			}
			
		}
		
		var fields=fromParentParam.fields;
		if(fields){}else{
			fields=new parent.WFormFields();
			fields.init();
			fields=fields.childList;
		}
		for(var n in fields.childList){
			var field=fields.childList[n];
			var tr=$("tbody tr[id='"+field.id+"']");
			$(tr).children("td:eq(1)").children("input").prop("checked",field.isHidden);
			$(tr).children("td:eq(2)").children("input").prop("checked",field.isReadOnly);
			$(tr).children("td:eq(3)").children("input").prop("checked",field.isNotNull);
		}
	
	}
	
	//绑定表头复选框单击事件
	$("th input:radio").bind("click",function(){
		var index=$(this).parent().index();
		var checked=$(this).prop("checked");
		var trs=$("tbody tr").each(function(){
			$(this).children("td:eq("+index+")").children().prop("checked",checked);
		});
	});
});