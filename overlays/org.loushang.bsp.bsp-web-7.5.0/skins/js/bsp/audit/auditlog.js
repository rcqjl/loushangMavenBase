﻿var checkboxName = "checkboxlist";
var grid;
var details=0;// 是否明细片段，‘1’代表明细，‘0’代表取消明细
$(document).ready(function(){
	
	// 初始化datatable
	initTable();
	
	// 更多搜索
	$("body").on("click","#search",function(){
		queryForm();	
	
	});

	// 查询
	$("#query").on("click",function() { 
		queryForm();
	});
	  
	// 绑定回车键
	$("#toUserNameOrId").keydown(function(event) {
		if(event.keyCode==13){ 
			queryForm();	
			}
	});
	
	// 明细按钮
	$("#details").on("click",function() {// 当前页面进行明细操作的显示
		var msg1 = L.getLocaleMessage("bsp.auditlog.013","取消明细");
		var msg2 = L.getLocaleMessage("bsp.auditlog.007","明细");
		if(details==0){
			for(var i=0;i<$("tr").length-1;i++){
				$("tr:eq("+(i+1)+") td:eq(2)").animate("height","80px");
				var path=forgetpath(i);
				$("tr:eq("+(i+1)+") td:eq(2)").append("<br>"+path+"</br>");
			}
			$("#details").text(msg1);
			details=1;
		} else {
			for(var i=0;i<$("tr").length-1;i++) {
				$("tr:eq("+(i+1)+") td:eq(2)").animate("height","80px");
				var name=forgetname(i);
				$("tr:eq("+(i+1)+") td:eq(2)").html(name);
			}
			$("#details").text(msg2);
			details=0;
		}
	
	});
	
	// 更多搜索
	$("#moresearch").popover({
    	"title":"",
    	"content":template('searchpanel',{}),
    	"html": true,
    	"placement": "bottom",
    	"trigger": "manual"
	});
	$("#moresearch").click(function(){
		if($("#moresearch").attr("aria-describedby")==undefined) {
			$("#moresearch").popover("show");
			$("#faangle").attr("class", "fa fa-angle-up");
			
			$(".dateDemo").datetimepicker({
	    		container: $("#create-date"),
	 	    	language: "zh-CN",
	 	    	autoclose: 1,
	 	    	startView: 2,
	        	format: "yyyymmdd hh:ii:ss",
	 			forceParse: 0 
	    	});
			
			$("#search").on("click", function(){
				$("#moresearch").popover("hide");
				$("#faangle").attr("class", "fa fa-angle-down");
			});
			
		}else {
			$("#moresearch").popover("hide");
			$("#faangle").attr("class", "fa fa-angle-down");
		}
	}); 
	
	// 更多搜索时初始化时间控件
	$("#moresearch").on("click", function(){
		  $(".dateDemo").datetimepicker({
    		container: $("#create-date"),
 	    	language: "zh-CN",
 	    	autoclose: 1,
 	    	startView: 2,
        	format: "yyyymmdd hh:ii:ss",
 			forceParse: 0 
    	});
	});
	
});

// 初始化表格
function initTable() {
	var options = {
		"ordering": false
	};
	var url = context +　"/service/bsp/audit/getauditlog";
	grid = new L.FlexGrid("auditlogList",url);
	grid.init(options);
}

// 查询
function queryForm(){
	var  userId= $("#toUserNameOrId").val();
	var userName=$("#toUserNameOrId").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var url = context+"/service/bsp/audit/getauditlog";
	var param={"userId":userId,"userName":userName,"startTime":startTime,"endTime":endTime};
	url=encodeURI(url,"utf-8");
	grid.reload(url,param);

}

function requestActionNameAndPath(data,type,full){
	if(details==1){
		var ActionNameAndPath = data+"<br>"+full["requestResourcePath"]+"</br>";// 返回操作名称和路径
		return ActionNameAndPath;	
	} else {
		return  data;
	}
	
}

// 获得路径
function forgetpath(i) {
	var list;
	var url = context + "/service/bsp/audit/forgetpathandname";
	$.ajax({// 获取日志数据，为了得到路径
		url : url,
		type : "post",
		async : false,
		success : function(result) {
			list = result;
		},
		error : function(e) {
			alert("请求出错");
		}
	});
	return list["data"][i]["requestResourcePath"];
}

// 获得操作名称
function forgetname(i) {
	var list;
	var url = context + "/service/bsp/audit/forgetpathandname";
	$.ajax({// 获取日志数据，为了得到路径
		url : url,
		type : "post",
		async : false,
		success : function(result) {
			list = result;
		},
		error : function(e) {
			alert("请求出错");
		}
	});
	return list["data"][i]["requestActionName"];
}
