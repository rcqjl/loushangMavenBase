$(document).ready(function() {
	var options ={};
	var url = context + "/service/zrzy/share/query";
	grid = new L.FlexGrid("logList", url);
	//grid.setParameter("limit", 10);
	
	grid.init(options); // 初始化datatable
	
	// 更多搜索
	$("body").on("click", "#search", function() {
		query();
	});
	$("body").on("click", "#reset", function() {
		reset();
	});
	$("#moresearch").popover({
		title : "",
		content : $("#searchpanel").html(),
		placement : "bottom",
		html : true,
		trigger : "click"
	});   
		
	$("#query").on("click", query);
	
});	


//日志详情
function detailoptions(data, type, full) {
	var viewBtn = "<a href=\"javascript:detail('"+full.bsm_DY +"')\">详情</a>";
	return viewBtn;	
}

//任务状态字段的替换
function dateFormat(data,type,full){
	var time = "";
    if(data != "" || data != null)
		{
		  var date = new Date(data);
		  time = time + date.getFullYear() +"-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() 
		  + ":" + date.getMinutes() + ":" + date.getSeconds();
		}
	return time;
}
function detail(data) {
	var url = context + "/service/zrzy/share/detail?BSM_DY="+data;
	window.location.href = url;
}



function reset() {
	$("#zrzydymc").val("");
	$("#djdylx").val("");
	$("#xzqmc").val("");
	$("#syqr").val("");	
/*	$('#endTime').datetimepicker('setStartDate', $("#endTime").val(""));
	$('#startTime').datetimepicker('setEndDate', "");*/
	
}
//查询
function query() {
	var ZRZYDYMC = $("#zrzydymc").val();
	var DJDYLX = $("#djdylx").val();
	var XZQMC = $("#xzqmc").val();
	var SYQR = $("#syqr").val();
	var url = context + "/service/zrzy/share/query";
	var param = {
		"ZRZYDYMC" : ZRZYDYMC,
		"DJDYLX" : DJDYLX,
		"XZQMC" : XZQMC,
		"SYQR" : SYQR
		
	};
	url = encodeURI(url, "utf-8");
	grid.reload(url, param);
}


Date.prototype.Format = function(fmt)   
{ 
//author:wangweizhen
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   

}; 
