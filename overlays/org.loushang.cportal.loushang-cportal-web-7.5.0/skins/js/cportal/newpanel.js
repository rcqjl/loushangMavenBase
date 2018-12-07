$(function(){
	 var $ntd; //目标td
	 var $otd; //原位置td
	 var $draggable;//拖拽目标
	 var widgetIds="";//需要刷新的微件id,多个id以逗号“,”分割
	$(".cportal-widget").livequery(function(){ 
		//拖拽
		$( ".isdraggable" ).draggable({
			handle: ".panel-heading",//指定拖拽位置
			revert: "invalid",//还原位置
			addClasses: false ,
			appendTo: "body",
			cursorAt: {top:0, left:0},//过渡层相对于鼠标光标的偏移
			helper: helper,
			start:function(event, ui){//拖拽开始
				$otd = $(this).parent();
			}
		});
		//放置
		$(".cpTable>tbody>tr>td").droppable({
		      hoverClass: "ui-state-hover",
		      accept: ".isdraggable",
		      drop: function( event, ui ) {
		    	 $draggable = ui.draggable;//拖拽的微件
		    	 $ntd = $(this); //目标td
		    	 var nlayout = $ntd.attr("layout");//目标td布局方式
		    	 var olayout = $otd.attr("layout");//原td布局方式
		    	 $ntd.find(".addWidget").remove();//移除“添加微件”按钮
		    	 if(nlayout == "1"){//行布局
					//向目标td中移动微件
					$ntd.append($draggable);
					if(olayout!="2"){
						widgetIds = gWidgetIds($ntd) + "," + gWidgetIds($otd);
		    		 }else{
		    			 widgetIds = gWidgetIds($ntd);
		    		 }
		    	 }else if(nlayout == "2"){//列布局
		    		 //向目标td中移动微件
		    		 $ntd.append($draggable);
		    		 
		    		 if(olayout!="2"){
		    			 widgetIds = gWidgetIds($otd) + "," + $draggable.attr("data_widgetid");
		    		 }else{
		    			 widgetIds = $draggable.attr("data_widgetid");
		    		 }
		    	 }else{//表格布局，每个单元格只允许放置一个微件
					//交换微件
					var $tmp = $ntd.find(".cportal-widget");
					$ntd.append($draggable);
					if($tmp.length!=0){
						$otd.append($tmp);
					}
					 if(olayout!="2"){
		    			 widgetIds = gWidgetIds($otd) + "," + $draggable.attr("data_widgetid");
		    		 }else{
		    			 widgetIds = $draggable.attr("data_widgetid");
		    		 }
				}
		    	//拖拽完成动态调整微件宽度
				$ntd.find(".cportal-widget").css("width",gWidthAfterDrag($ntd));
				$otd.find(".cportal-widget").css("width",gWidthAfterDrag($otd));
		    	
				refresh(true,widgetIds);//是否刷新，刷新微件ids
		        loadEmptyTpl();
		    	widgetIds = "";
		    	save();//保存
		      }
		 });
	});
});
function helper(event){
	var iconUrl = $(this).find("input[name=icon]").val();
	var src = contextPath+iconUrl
	var $div = $('<div></div>');
	$div.css({
		"background" : "url("+src+") no-repeat 50% 50%",
		"opacity" : "1",
		"height" : "100px",
		"width" : "100px",
		"border":"1px solid #ddd"
	});
	return $div
}
//拖拽后计算拖拽后每个微件宽度
function gWidthAfterDrag(td){
	//判断td的布局方式
	var layout = $(td).attr("layout");
	//如果是行布局则动态计算微件的宽度
	var width =100+"%";
	if(layout =="1"){
		var sum = $(td).find(".cportal-widget").length;//拖拽后微件数
		if(sum!=0){
			width = 100/(sum)+"%";
		}
	}
	
	return width;
}
function gWidgetIds($td){
	var ids = ""
	$td.find(".cportal-widget").each(function(){
		ids += "," + $(this).attr("data_widgetid");
	}); 
	return ids;
}