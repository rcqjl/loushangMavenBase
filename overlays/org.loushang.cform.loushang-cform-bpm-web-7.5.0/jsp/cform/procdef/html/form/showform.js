pers=8;
var fromParentParam = window.parent.document.getElementById("popupFrame").inParam;
var retObj={};
var formType=fromParentParam.formType;
$(function(){
	if(formType!="PCForm") 
		$("#bottom").hide();
	$("#search").bind("click",function(){
		var formName=$("#searchValue").val();
		if(!formName || formName!=""){
			getForm(formName,0,pers);
			$('#bottom').empty();
			$('#bottom').smartpaginator({ 
				totalrecords: pageCount,//总记录数
		        recordsperpage: pers,//每页显示记录数
		        length:4,//显示页数
		        next: L.getLocaleMessage("CForm.BPM.D187",'下页'), 
		        prev: L.getLocaleMessage("CForm.BPM.D188",'上页'), 
		        first: L.getLocaleMessage("CForm.BPM.D189",'首页'), 
		        last: L.getLocaleMessage("CForm.BPM.D190",'尾页'),
		        theme: 'black',
		        onchange:function(newPage){
		        	var formName=$("#searchValue").val();
		        	if(!formName || formName!=""){
		        		getForm(formName,newPage-1,pers);
		        	}
		        }});
			
		}
			return false;
		
	});
	
	$("#confirm").bind("click",function(){
		closeDialog(retObj);
	});
	
	$("#cancel").bind("click",function(){
		closeDialog();
	});
	pageCount=0;
	getForm("",0,pers);
	$('#bottom').smartpaginator({ 
		totalrecords: pageCount,
        recordsperpage: pers,
        length:4,
        next: L.getLocaleMessage("CForm.BPM.D187",'下页'), 
        prev: L.getLocaleMessage("CForm.BPM.D188",'上页'), 
        first: L.getLocaleMessage("CForm.BPM.D189",'首页'), 
        last: L.getLocaleMessage("CForm.BPM.D190",'尾页'),
        theme: 'black',
        onchange:function(newPage){
        	var formName=$("#searchValue").val();
        	if(!formName || formName!=""){
        		getForm(formName,newPage-1,pers);
        	}
        }});
	$("#1").trigger("click");
});
function showForm(data){
	$("tbody tr").empty();
	if(formType!="PCForm"){
		var form=data;
	}else{
		var form=data.form;
	}
	var m;
	for(var n in form){
		var formId=$("<td></td>").text(form[n].formId);
		var formName=$("<td></td>").text(form[n].formName);
		$("tbody tr:eq("+n+")").append(formId).append(formName);
		m=n;
	}
	m++;
	for(;m<8;m++){
		var formId=$("<td></td>");
		var formName=$("<td></td>");
		$("tbody tr:eq("+m+")").append(formId).append(formName);
	}
	$("tbody tr").removeClass("selected");
	$("tbody tr:odd").addClass("odd");
	$("tbody tr").bind("click",function(){
		$("tbody tr").removeClass("selected");
		$(this).addClass("selected");
		retObj.formId=$(this).children(":eq(0)").text();
		retObj.formName=$(this).children(":eq(1)").text();
		});
	pageCount=data.pageCount;
	
}


function getForm(formName,page,per){
	$.ajax({
		type:"POST",
		url: WFlow.fullWebPath + "/command/dispatcher/"
		+ "org.loushang.cform.procdef.html.cmd.FormDispatcherCmd/get"
		+ formType,
		data:{
			"formName":formName,
			"page":page,
			"per":per,
			"pcFormId":fromParentParam.formId
		},
		dataType:"json",
		async:false,
		success:function (data){
			if(data.errMessage){
				showDialog("alert",data.errMessage, L.getLocaleMessage("CForm.BPM.D191","提示信息"), 400,false,closefn);
			}else{
				showForm(data);
			}
			function closefn(){
				closeDialog(retObj);
			}
		},
		error:function(){
			showDialog("alert",L.getLocaleMessage("CForm.BPM.D192","请求数据出错"),L.getLocaleMessage("CForm.BPM.D191","提示信息"), 300);
		}
	});
}