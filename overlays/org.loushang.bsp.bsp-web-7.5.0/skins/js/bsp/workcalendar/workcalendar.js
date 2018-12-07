var checkboxName = "checkboxlist";
var grid;

$(document).ready(function(){
	var dialog = parent.dialog.get(window);
	// 初始化datatable
	initTable();
	//增加工作日历
	$('#add').click(function() {			
	        $.dialog({
	            type: 'iframe',
	            //iframe地址,存在content参数时候,此参数无效
	            url: 'workcalendar/addPage',
	            title: L.getLocaleMessage("bsp.workcalendar.002",'新建工作日历'),
	            //设置对话框内容宽度
	            width: 450,
	            //设置对话框内容高度,一般情况下无需设置此值，对话框会自适应内容高度
	            height: 300,
	            //对话框关闭后执行的事件
	            onclose: function () {
	                if(this.returnValue == "success"){
	                    sticky(L.getLocaleMessage("bsp.workcalendar.010","工作日历添加成功!"));
	                    grid.reload();
	                }
	            }
	        });
	    });
	
	//批量删除
	$("#del").on("click",function(){
		del();

	});
	//编辑
	$(".edit").on("click",function() {
		var solarDate = grid.oTable.row($(this).parents("td").parents("tr")).data().solarDate;
		var organName =grid.oTable.row($(this).parents("td").parents("tr")).data().organName;
		var url = context+"/service/bsp/workcalendar/edit?solarDate="+solarDate+"&organName="+organName;
		url=encodeURI(encodeURI(url,"utf-8"));
		window.location.href = url;

	});
	// 新增
	$("#insert").on("click", function() {
		// 判断所选年份
		var solarDate = $("#solarDate").val();
		var isExist = false;
		if(solarDate == "") {
			sticky(L.getLocaleMessage("bsp.workcalendar.014","请设置年份"), "warning");
			return;
		}

		$.ajax({
			url: context + "/service/bsp/workcalendar/isexist/" + solarDate,
			async: false,
			success: function (data){
				if(data.msg == "true") {
					isExist = true;
				}
			}
		});

		if(isExist) {
			sticky(L.getLocaleMessage("bsp.workcalendar.015", "该单位{0}年份的工作日历已存在", solarDate), "warning");
			return;
		}

		$.ajax({
             type : "post",
             url : context+"/service/bsp/workcalendar/add?solarDate=" + solarDate,
             success : function (data){
          	 	if(data.status == "true") {
          	 		dialog.close("success");
          	 		dialog.remove();
          	 	} else {
          	 		sticky(data.msg, "warning");
          	 	}
             },
             error: function () {
             }
        });
	});
	
	$("#save").on("click",function(){
		save();		
	});
	
	
	
});
/**
 * 单击节点，查询该类别下的表单
 * 
 * @param e
 * @param treeId
 * @param treeNode
 */
// /////////////////////////////////////////// 表单// ///////////////////////////////////////////////////////
// 初始化表格
function initTable() {
	var options = {
			"ordering": false,
		  	"info": false, 
		  	"paging": false,
    };

	var url = context +　"/service/bsp/workcalendar/data";
	grid = new L.FlexGrid("workcalendarList",url);
	grid.init(options);
}

function save(){
	var solarDate = $("#solarDate").val();
	var noneWorks = "";
	var selectObject = $('input:checkbox[name=NONEWORK]:checked');
	for(var i=0;i<selectObject.length;i++){
		noneWorks += (selectObject[i].value+",");        
	}
	var url = context+"/service/bsp/workcalendar/update";
	url += "?solarDate="+solarDate+"&noneWorks="+noneWorks;
	window.location.href = url;
}


//删除用户
function del() {
	var years = ""
	var organNames ="";
		var selectObject = $('input:checkbox[name=checkboxlist]:checked');
		if(selectObject.length < 1) {
			$.dialog({
				type: 'alert',
				content: L.getLocaleMessage("bsp.workcalendar.012",'请选择要删除的记录！'),
			    autofocus: true,
				ok: function(){}
			});
			return;
		}
		for(var i=0;i<selectObject.length;i++){
		 	 if(0==i){
		 		   years = selectObject[i].value;
	
		       }else{
		    	years += (","+selectObject[i].value);
		        
		       }
		 }
		 
		//判断如果没有选择删除的记录则不继续进行删除操作
		 if(years==null){
			 return;
		 }else if(years==""){
				 return; 
		 }else{
				$.dialog({
					type: 'confirm',
					content: L.getLocaleMessage("bsp.workcalendar.013",'确认删除选中记录?'),
				    autofocus: true,
					ok: function(){
						var url = context+"/service/bsp/workcalendar/del";
						url += "?year="+years;
						window.location.href = url;
						},
					cancel: function(){}
				});	
		 }
			
}

//复选框全选
function rendercheckbox(data, type, full) {
    return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
}
//操作字段渲染
function renderedit(){
	var msg = L.getLocaleMessage("bsp.workcalendar.006","编辑");
	return '<div class="edit"><a><span class="" style="color:#3e99ff;">' + msg + '</span></a></div>'
}
// 提示信息
function sticky(msg, style, position) {
	var type = style ? style: 'success';
	var place = position ? position: 'top';
	$.sticky(msg, // 提示框显示内容
	{
		autoclose: 1000,
		position: place,
		style: type
	});
}