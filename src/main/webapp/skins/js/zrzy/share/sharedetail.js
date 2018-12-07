$(document).ready(function() {
	var stepOptions = {};
	var stepUrl = context + "/service/logquery/initStepLog";
	stepGrid = new L.FlexGrid("stepLog", stepUrl);
	stepGrid.setParameter("taskLogId", taskLogId);
	stepGrid.init(stepOptions); // 初始化datatable
	//隐藏id列
	var stepLogTab = document.getElementById("stepLog") ;
	var stepLogTrs = stepLogTab.rows;
	if(stepLogTrs[1].cells[0].innerHTML =="1"){
		for(var i = 0, len = stepLogTrs.length; i < len; i++){
			
	        var cellXH = stepLogTrs[i].cells[0];
	        if(cellXH.style.display == 'none'){
	        	cellXH.style.display = '';
	        }else{
	        	cellXH.style.display = 'none';
	        }
						
	        var cell = stepLogTrs[i].cells[1];
	        if(cell.style.display == 'none'){
	            cell.style.display = '';
	        }else{
	            cell.style.display = 'none';
	        }
	    }
		
		//获取阶段日志id
		var valueTd=document .getElementById ("stepLog").rows [1].cells[1];
		var stepLogId=valueTd.innerHTML ;
		
	    //初始化文件日志列表
		var fileOptions = {};
		var fileUrl = context + "/service/logquery/initFileLog";
		fileGrid = new L.FlexGrid("fileLog", fileUrl);
		fileGrid.setParameter("stepLogId", stepLogId);
		fileGrid.init(fileOptions); // 初始化datatable
		
		//增加空白行
		var fileLogTab = document.getElementById("fileLog") ;
		var fileLogTrs = fileLogTab.rows;
		var fileLogRows = fileLogTab.rows.length ;
		if(fileLogTrs[1].cells[0].innerHTML =="1"){
		    for(fileLogRows; fileLogRows<5; fileLogRows++){
			    fileLogTab.insertRow(-1).setAttribute("class", "trd0");
			    fileLogTab.insertRow(-1).insertCell(0);
		    }
		}
		
		//初始化评估日志列表
		var evaluateOptions = {};
		var evaluateUrl = context + "/service/logquery/initEvaluateLog";
		evaluateGrid = new L.FlexGrid("evaluateLog", evaluateUrl);
		evaluateGrid.setParameter("stepLogId", stepLogId);
		evaluateGrid.init(evaluateOptions); // 初始化datatable
		
		//增加空白行
		var evalLogTab = document.getElementById("evaluateLog") ;
		var evalLogTrs = evalLogTab.rows;
		var evalLogRows = evalLogTab.rows.length ;
		if(evalLogTrs[1].cells[0].innerHTML =="1"){
			for(evalLogRows; evalLogRows<5; evalLogRows++){
				evalLogTab.insertRow(-1).setAttribute("class", "trd0");
				evalLogTab.insertRow(-1).insertCell(0);
			}
		}
		
		
		
	}
	

	
	//增加空白行

    var stepLogRows = stepLogTab.rows.length ;
    if(stepLogTrs[1].cells[0].innerHTML =="1"){
	    for(stepLogRows; stepLogRows<5; stepLogRows++){
		    stepLogTab.insertRow(-1).setAttribute("class", "trd0");
		    stepLogTab.insertRow(-1).insertCell(0);
	    }
    }
    

	
	//点击阶段日志信息重新加载文件日志和评估日志
	$('#stepLog tbody').on( 'click', 'tr', function (e) {
		//点击改变行背景色
		$(this).addClass("changeColor").siblings().removeClass("changeColor");
		
		var index = $(this).parent().context._DT_RowIndex+1; //行号 
		var newStepLogId = stepLogTrs[index].cells[1].innerHTML;//获取阶段日志id
		var param = {
			"stepLogId" : newStepLogId
		};
		var newFileLogUrl = context + "/service/logquery/initFileLog";
		var newEvalLogUrl = context + "/service/logquery/initEvaluateLog";
		newFileLogUrl = encodeURI(newFileLogUrl, "utf-8");
		newEvalLogUrl = encodeURI(newEvalLogUrl, "utf-8");
		fileGrid.reload(newFileLogUrl, param);
		
		//增加文件日志表空白行
		var newFileLogTab = document.getElementById("fileLog") ;
		var newFileLogTrs = newFileLogTab.rows;
		var newFileLogRows = newFileLogTab.rows.length ;
		if(newFileLogTrs[1].cells[0].innerHTML =="1"){
		    for(newFileLogRows; newFileLogRows<5; newFileLogRows++){
			    newFileLogTab.insertRow(-1).setAttribute("class", "trd0");
			    newFileLogTab.insertRow(-1).insertCell(0);
		    }
		}
		
		evaluateGrid.reload(newEvalLogUrl, param);
		//增加评估日志表空白行
		var newEvalLogTab = document.getElementById("evaluateLog") ;
		var newEvalLogTrs = newEvalLogTab.rows;
		var newEvalLogRows = newEvalLogTab.rows.length ;
		if(newEvalLogTrs[1].cells[0].innerHTML =="1"){
			for(newEvalLogRows; newEvalLogRows<5; newEvalLogRows++){
				newEvalLogTab.insertRow(-1).setAttribute("class", "trd0");
				newEvalLogTab.insertRow(-1).insertCell(0);
			}
		}
		
		});
	
	
	//tab页
    $('#myTab a').click(function(e) {
	    e.preventDefault();
		$(this).tab('show');
	});
    
	//返回taskLogList页面
	$("#return").click(function() {
		window.location = context + "/service/logquery/returnListPage";
	});
	   
});

//评估详情
function detailoptions(data, type, full) {
	var viewBtn = "<a href=\"javascript:detail('"+full.ID+"')\">详情</a>";
	return viewBtn;	

}

function stepLogXhOptions(data, type, full, index) {
	var result = index.row + 1;
	return result;
}

function fileLogXhOptions(data, type, full, index) {
	var result = index.row + 1;
	return result;
}

function evalLogXhOptions(data, type, full, index) {
	var result = index.row + 1;
	return result;
}

function stepSuccessOptions(row, cell, value){
	if(value.IS_SUCCESS ==0)
        return "失败";
	if(value.IS_SUCCESS ==1)
        return "成功";
	return value.IS_SUCCESS;
}

function stepCodeOptions(row, cell, value){
	if(value.STEP_CODE ==1000)
        return "开始转换";
	if(value.STEP_CODE ==1100)
        return "拆分shp";
	if(value.STEP_CODE ==1200)
        return "导入sde";
	if(value.STEP_CODE ==2200)
        return "正确性评估";
	if(value.STEP_CODE ==2100)
        return "编码评估";
	return value.STEP_CODE;
}


function fileSuccessOptions(row, cell, value){
	if(value.IS_SUCCESS ==0)
        return "失败";
	if(value.IS_SUCCESS ==1)
        return "成功";
	return value.IS_SUCCESS;
}

function evalOptions(row, cell, value){
	if(value.EVAL_RESULT ==0)
        return "未发现问题";
	if(value.EVAL_RESULT ==1)
        return "发现问题";
	return value.EVAL_RESULT;
}


function detail(data) {
	$.dialog({
				type : 'dialog',
				url : context + "/service/logquery/toEvalLogDetail?id="+data,
				title : '评估详情',
				width : 800,
				height : 600,
				ok : false
			});
}