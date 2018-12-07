$(document).ready(function(){
	
	// 初始化datatable
	initTable();
	
	//根据编码查询
	$("#query").on("click",function(){
		var options = {
				"ordering": false,
				"btnDefs": [

				            ]
			};
			
		//获取要查询的内容
		var idId =document.getElementById("idId").value;
		if(idId==null){
			idId="";
		}
		url = context +　"/service/bsp/bizid/data";
		var param={"idId" : idId};
		url=encodeURI(url,"utf-8"); 
		/*grid = new L.FlexGrid("list",url);*/
        grid.reload(url, param);
    	$(".edit11").bind("click",function() {
    		var idId = grid.oTable.row($(this).parents("td").parents("tr")).data().idId;
    		var organId =grid.oTable.row($(this).parents("td").parents("tr")).data().organId;
    		var url = context+"/service/bsp/bizid/edit?idId="+idId+"&organId="+organId;;
    		url=encodeURI(encodeURI(url,"utf-8"));
    		window.location.href = url;
    	});
	});
	
	//根据编码查询
	$("#idName").on("keydown",function(event){
		if(event.keyCode==13){
			var options = {
				"ordering": false,
				"btnDefs": [

				            ]
			};
			
			//获取要查询的内容
			var idId =document.getElementById("idId").value;
			if(idId==null){
				idId="";
			}
			url = context +　"/service/bsp/bizid/data";
			var param={"idId" : idId};
			url=encodeURI(url,"utf-8"); 

			url=encodeURI(url,"utf-8"); 
			/*grid = new L.FlexGrid("list",url);*/
	        grid.reload(url);
	    	$(".edit").bind("click",function() {
	    		var idId = grid.oTable.row($(this).parents("td").parents("tr")).data().idId;
	    		var organId =grid.oTable.row($(this).parents("td").parents("tr")).data().organId;
	    		var url = context+"/service/bsp/bizid/edit?idId="+idId+"&organId="+organId;;
	    		url=encodeURI(encodeURI(url,"utf-8"));
	    		window.location.href = url;
	    	});
		}
	});
	
	//删除选中的业务流水号
	$("#delBizid").on("click",function(){
		var ids = "";
		var organIds ="";
			var selectObject = $('input:checkbox[name=checkboxlist]:checked');
			var length=selectObject.length;
			if(length<=0){
				$.dialog({
					type: 'alert',
					content: L.getLocaleMessage("bsp.bizid.042",'请选择要删除的记录！'),
				    autofocus: true
				});
			}
			for(var i=0;i<selectObject.length;i++){
			 	 if(0==i){
			    	   /*ids =  grid.oTable.row(selectObject[i].parents("tr")).data().id;*/
			    	   ids = selectObject[i].value;
			    	   if(grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId==null){
			    		   organIds ="nullx";
			    	   }else if(grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId==""){
			    		   organIds ="nullx";
			    	   }else{
			    		   organIds = grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId;
			    	   }
			    	   
			       }else{
			        ids += (","+selectObject[i].value);
			        if(grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId==null){
			        		organIds += (","+"nullx");
			    	   }else if(grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId==""){
			    		   organIds += (","+"nullx");			        	
			        }else{
			        	organIds += (","+grid.oTable.row(selectObject[i].parentNode.parentNode).data().organId);
			        }
			        
			       }
			 }
			 
			//判断如果没有选择删除的记录则不继续进行删除操作
			 if(ids==null){
				 return;
			 }else if(ids==""){
					 return; 
			 }else{
					$.dialog({
						type: 'confirm',
						content: L.getLocaleMessage("bsp.bizid.043",'确认删除选中记录?'),
					    autofocus: true,
						ok: function(){window.location.href=context+"/service/bsp/bizid/delete/"+ids+"/"+organIds;},
						cancel: function(){}
					});	
			 }
			
	});

	//跳转到增加业务流水号页面
	$("#addBizid").on("click",function(){		
		window.location.href=context+"/service/bsp/bizid/add";		
	});
	
	// 组织内码复选框变化是否选择出现文本框
	$("#isGlobal").on("change",function(){
		if($("#organName").attr("title")=="hide"){
			$("#organName").attr("title","show");
			$("#organIdDiv").removeAttr("style");
		}else{
			$("#organId").val("");
			$("#organName").val(L.getLocaleMessage("bsp.bizid.031","选择组织"));
			$("#organName").attr("title","hide");
			$("#organIdDiv").attr("style","display:none");
		} 
		 
	});

	//选择组织
	$(".select-organ").on("click",function(){
		$.dialog({
			type: 'iframe',
			url: context+"/service/bsp/organHelp?isChkbox=0&selType=1;2&struType=00&showableType=1;2",
			title: L.getLocaleMessage("bsp.bizid.031","选择组织"),
			width: 580,
			height: 400,
			onclose: function(){
				var node = this.returnValue;
				var organName,organId;
				if(typeof node!='string'){
					if(node.length>0){
						organName=node[0].organName;
						organId=node[0].organId;
						$("#organName").val(organName);
						$("#organId").val(organId);
					}else{
						$("#organName").val("");
						$("#organId").val("");
					}
				}
			}
		});
	});	

	//改变前缀的选中状态改变前缀的文本框
	$("#idPrefix").on("change",function(){
		 if($("#idPrefixText").attr("title")=="hide"){
			 $("#idPrefixText").removeAttr("style");
			 $("#idPrefixText").attr("title","show");
			 $("#idPrefixTextDiv").removeAttr("style");
		 }else{
			 $("#idPrefixText").attr("style","display:none");
			 $("#idPrefixText").attr("title","hide");
			 $("#idPrefixText").val("");
			 $("#idPrefixTextDiv").attr("style","display:none");
		} 
	});

	//改变后缀的选中状态改变后缀的文本框
	$("#idSuffix").on("change",function(){
		 if($("#idSuffixText").attr("title")=="hide"){
			 $("#idSuffixText").removeAttr("style");
			 $("#idSuffixText").attr("title","show");
			 $("#idSuffixTextDiv").removeAttr("style");
		 }else{
			 $("#idSuffixText").attr("style","display:none");
			 $("#idSuffixText").attr("title","hide");
			 $("#idSuffixText").val("");
			 $("#idSuffixTextDiv").attr("style","display:none");
		} 
	});

	$("#cancel").on("click",function(){
		window.location.href=context+"/service/bsp/bizid";
	});
	
    $("#saveForm").uValidform({
        btnSubmit:"#validate",
        datatype:{
          	//此处为自定义类型
          	"idId": idIdCheck,
        	"idPrefix": idPrefixCheckNull,
        	"idSuffix": idSuffixCheckNull
        },
        //在使用ajax提交表单数据时，数据提交后的回调函数
        callback:function(form){
        	//校验前缀是否符合为按年月日流水的填写情况
        	var idType=$("#idType").val();
        	var idPrefixText =$("#idPrefixText").val();
        	var regyyyymmdd=/^(?:(?:(?:(?:(?:1[6-9]|[2-9][0-9])?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))()(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9][0-9])?[0-9]{2})()(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[13-9]|1[0-2])\2(?:29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1[0-9]|2[0-8]))))$/;
        	var regyyyymm=/^[1-9][0-9]{3}(0\d|1[0-2])$/;
        	var number = Number(idPrefixText);
        	if(!$("#isGlobal").prop("checked")) {
        		if($("#organId").val() == "" || $("#organId").val() == null ) {
        			$.dialog({
		                type: 'alert',
		                content: L.getLocaleMessage("bsp.bizid.046",'请勾选全局或者选择一个组织'),
		                ok: function () {}
		            });
        			return false;
        		}
        	}
        	if(idType!="00"){
        		//校验前缀
        		if(idType=="01"){
        			if(!(idPrefixText!=null&&(/[1-9][0-9]{3}/.test(idPrefixText) || "YYYY" == idPrefixText)&&(idPrefixText.length==4))){
        				$.dialog({
			                type: 'alert',
			                content: L.getLocaleMessage("bsp.bizid.053",'选择了按年流水时，前缀必须为YYYY或是四位的年份！'),
			                ok: function () {}
			            });
        				return false;
        			}        			
        		}
        		if(idType=="02"){
        			if(!(idPrefixText!=null&&(regyyyymm.test(idPrefixText) || "YYYYMM" == idPrefixText)&&(idPrefixText.length==6))){
	        			$.dialog({
			                type: 'alert',
			                content: L.getLocaleMessage("bsp.bizid.054",'选择了按月流水时，前缀必须包为YYYYMM或是六位的年份月份！'),
			                ok: function () {}
			            });
	        			return false;
        			}
        		}
        		if(idType=="03"){
        			if(!(idPrefixText!=null&&(regyyyymmdd.test(idPrefixText) || "YYYYMMDD" == idPrefixText)&&(idPrefixText.length==7||idPrefixText.length==8))){
	        			$.dialog({
			                type: 'alert',
			                content: L.getLocaleMessage("bsp.bizid.055",'选择了按日流水时，前缀必须为YYYYMMDD或是七位到八位的年份月份日！'),
			                ok: function () {}
			            });
	        			return false;
        			}
        		}
        	}
                	
	    	//提交表单
        	saveForm();
        }
    });
    
});

//编辑
$(document).on("click",".edit11",function(){
	var idId = grid.oTable.row($(this).parents("td").parents("tr")).data().idId;
	var organId = grid.oTable.row($(this).parents("td").parents("tr")).data().organId;
	var url = context+"/service/bsp/bizid/edit?idId="+idId+"&organId="+organId;;
	url=encodeURI(encodeURI(url,"utf-8"));
	window.location.href = url;
});


// 初始化业务流水号表格
function initTable() {
	var options = {
		"ordering": false,
		"btnDefs": [

		            ]
	};
	var url = context +　"/service/bsp/bizid/data";
	grid = new L.FlexGrid("list",url);
	grid.init(options);
}

function saveForm() {
	 $("#saveForm").ajaxSubmit({
		url: $("saveForm").attr("action"),
		type: "POST",
		success: function(data){
			if(data == 'success') {
				sticky(L.getLocaleMessage("bsp.bizid.044","保存成功！"));
				setTimeout(function(){
					window.location.href=context+"/service/bsp/bizid";
				}, 1000);
			} else {
				$.dialog({
	                type: 'alert',
	                content: data,
	                ok: function () {}
	            });
			}
		}
	});
}

function idIdCheck(gets, obj, curform, regxp) {
	 
	 // 判断编码是否重复
	 var isExist;
	 var organId =  $("#organId").val();
	 $.ajax({
	 	type: "post",
	 	url: context + "/service/bsp/bizid/queryIdId",
	 	data : "idId=" + gets + "&organId=" + organId,
	 	async: false,
	 	success: function(data) {
	 		var total = data.total;
	 		if(total > 0) {
	 			isExist = true;
	 		}
	 	}
	 });
	 
	 if(isExist) {
		 obj.attr("errormsg", L.getLocaleMessage("bsp.bizid.052","已存在相同的编码"));
		 return false;
	 }
	 return true;
}

// 如果选中了前缀，则需要输入前缀的内容
function idPrefixCheckNull(gets, obj, curform, regxp) {
	 if($("#idPrefix").prop("checked")) {
		 if(gets == null || gets == "") {
			 obj.attr("nullmsg", L.getLocaleMessage("bsp.bizid.050","选择了使用前缀，请设置前缀"));
			 return false;
		 }
		 if (gets.length > 30) {
				obj.attr("errormsg", L.getLocaleMessage("bsp.bizid.049","不能超过30个字符"));
				return false;
		}
	 }
	 return true;
}

// 如果选中了后缀，则需要输入后缀的内容
function idSuffixCheckNull(gets, obj, curform, regxp) {
	 if($("#idSuffix").prop("checked")) {
		 if(gets == null || gets == "") {
			 obj.attr("nullmsg", L.getLocaleMessage("bsp.bizid.051","选择了使用后缀，请设置后缀"));
			 return false;
		 }
		 if (gets.length > 30) {
				obj.attr("errormsg", L.getLocaleMessage("bsp.bizid.049","不能超过30个字符"));
				return false;
			}
	 }
	 return true;
}

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
		}
	);
}

//对特殊行添加遍历显示的代码
function bizidOperation(){
	var msg = L.getLocaleMessage("bsp.bizid.013",'编辑');
	return '<div ><a><span class="edit11" style="color:#3e99ff;">' + msg + '</span></a></div>'
}

//“是否全局流水”列修改
function bizidGlobal(data, type, full){
	var msg1 = L.getLocaleMessage("bsp.bizid.048",'否');
	var msg2 = L.getLocaleMessage("bsp.bizid.047",'是');
	if(data=="0"){
		data=msg1;
	}else{
		data=msg2;
	}
	
	return data;
}

//“业务流水类型”列修改
function bizidType(data, type, full){
	var msg1 = L.getLocaleMessage("bsp.bizid.039",'按年流水');
	var msg2 = L.getLocaleMessage("bsp.bizid.040",'按月流水');
	var msg3 = L.getLocaleMessage("bsp.bizid.041",'按日流水');
	if(data=="01"){
		data=msg1;
	}else if(data=="02"){
		data=msg2;
	}else if(data=="03"){
		data=msg3;
	}else{
		data="";
	}
	
	return data;
}

//渲染表格内的操作按钮
function rendTipBox(data, type, full) {
	var tipBox = "<span title='" + data + "'>"+data+"</span>";
	return tipBox;
}
