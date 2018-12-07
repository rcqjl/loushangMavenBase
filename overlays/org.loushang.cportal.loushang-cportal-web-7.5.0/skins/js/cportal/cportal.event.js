$(function() {
	//页面切换
	switchPage();
	//微件工具栏事件
	widgetTool();
	//侧边栏
	widgetSideBar();
	//显示图片轮播导航
	showImgNavigator();
});
////页面切换/////
function switchPage(){
	$(document).on("click",".defnavigator li",function() {
		$(".defnavigator li").removeClass("isPage");
		$(".defnavigator li a").removeClass("isPagea");
		$(this).addClass("isPage");
		$(this).find("a").addClass("isPagea");
		var pageId = $(this).find("input[name=pageId]").val();
		var pageUrl = $(this).find("input[name=pageUrl]").val();
		$("#htmlContainer").empty();
		initOnePage(pageId,pageUrl);
		isExist();
	});
	$(document).on("click",".imgnavigator .item",function() {
		$(".imgnavigator").hide();
		$("#htmlContainer").show();
		var pageId = $(this).find("input[name=pageId]").val();
		var pageUrl = $(this).find("input[name=pageUrl]").val();
		
		$("#htmlContainer").empty();
		initOnePage(pageId,pageUrl);
		isExist();
	});
};
var oldpanelBodyHeight;
function widgetTool(){
	//隐藏显示
	$(document).on("mouseover mouseout",".ue-panel .panel-heading",function() {
		$(this).find(".ue-panel-tools").toggle();
	});
	//刷新功能
	$(document).on("click",".ue-panel-tools .fa-refresh",function() {
		var obj = $(this);
		var widgetId = obj.parents(".cportal-widget").attr("data_widgetId");
		refresh(true,widgetId);
	});
	//放大功能
	$(document).on("click",".ue-panel-tools .fa-expand",function() {
		var obj = $(this);
		$( ".isdraggable" ).draggable( "disable" );//取消拖拽功能
		expand(obj);
	});
	//缩小
	$(document).on("click",".ue-panel-tools .fa-compress",function() {
		var obj = $(this);
		$( ".isdraggable" ).draggable( "enable" );//添加拖拽功能
		compress(obj);
	});
	//删除
	$(document).on("click",".ue-panel-tools .fa-times",function() {
		var obj = $(this);
		deleted(obj);
	});
}
////页面微件放大/////
function expand(obj){
	//记录原微件宽高
	oldpanelBodyHeight = obj.parents(".ue-panel").find(".panel-body").height()+30;
	//放大宽高
	obj.parents(".ue-panel").find(".panel-body").css({"width":"100%","height":$(window).height()-50+'px'});
	obj.parents(".cportal-widget").css({"width":"100%"});
	$("body").css("position","relative");
	obj.parents(".ue-panel").addClass("fullscreen").css("min-height",$(window).height()+'px');
	obj.removeClass("fa-expand").addClass("fa-compress");
	obj.parents(".ue-panel-tools").find(".fa-refresh").hide();
	obj.parents(".ue-panel-tools").find(".fa-times").hide();
	var widgetExpUrl = obj.parents("li").find("input[name=widgetExpUrl]").val();
	var loadType = obj.parents("li").find("input[name=loadType]").val();
	var widgetType = obj.parents("li").find("input[name=widgetType]").val();
	var widgetId = obj.attr("widget_id");
	if(widgetExpUrl!=""){
		var preUrl=widgetExpUrl.substr(0,1).toLowerCase();
		var load ="";
		if(preUrl=="/"){
			load = "0"
		}else{
			load = loadType
		}
		var widgetInfo = {
			"widgetUrl":widgetExpUrl,
			"loadType" :load,
			"widgetId" :widgetId,
			"widgetType" :widgetType
		};
		$("#" + widgetId).empty();
		loadWidgetInfo(widgetInfo);
	}else{
		var widgetId = obj.parents(".cportal-widget").attr("data_widgetId");
		refresh(true,widgetId);
	}
}
////页面微件缩小/////
function compress(obj){
	$("body").css("position","absolute");
	obj.parents(".ue-panel").removeClass("fullscreen");
	$(".ue-panel").css("min-height","0px");
	obj.parents(".ue-panel").find(".panel-body").css("height",oldpanelBodyHeight+"px");
	var olTd = obj.parents("td");
	var layout = olTd.attr("layout");
	if(layout == "1"){
		var num = $(olTd).find(".cportal-widget").length;
		width = 100/(num);
		//重置目标td中微件宽度
		$(olTd).find(".cportal-widget").css({"width":width+"%"})
	}
	obj.removeClass("fa-compress").addClass("fa-expand");
	obj.parents(".ue-panel-tools").find(".fa-refresh").show();
	obj.parents(".ue-panel-tools").find(".fa-times").show();
	var widgetUrl = obj.parents("li").find("input[name=widgetUrl]").val();
	var loadType = obj.parents("li").find("input[name=loadType]").val();
	var widgetType = obj.parents("li").find("input[name=widgetType]").val();
	var widgetId = obj.attr("widget_id");
	if(widgetUrl!=""){
		var preUrl=widgetUrl.substr(0,1).toLowerCase();
		var load ="";
		if(preUrl=="/"){
			load = "0"
		}else{
			load = loadType
		}
		var widgetInfo = {
			"widgetUrl":widgetUrl,
			"loadType" :load,
			"widgetId" :widgetId,
			"widgetType" :widgetType
		};
		$("#" + widgetId).empty();
		loadWidgetInfo(widgetInfo);
	}else{
		
		var widgetId = obj.parents(".cportal-widget").attr("data_widgetId");
		refresh(true,widgetId);
	}
};

////页面微件刷新/////
function refresh(refresh,widgetIds){
	if(refresh){
		$.ajax({
			cache: false,
			async : false,
			type : "POST",
			url:contextPath+"/service/cportal/widgets/findByWidgetIds",
			data : {"widgetIds":widgetIds},
			dataType: "json",
			success:function(widgetInfos){
				for(index in widgetInfos){
					var widgetInfo = widgetInfos[index];
					//清空微件内容
					$("#" + widgetInfo.widgetId).empty();
					//加载微件详细信息
					loadWidgetInfo(widgetInfo);
				}
			}	
		})
	}
}

////页面微件删除/////
function deleted(obj){
	// 页面微件删除事件
	var oTd = obj.parents("td")
	obj.parents(".ue-panel").remove();
	setWidth(oTd);
	// 如果td行布局，还需要修改删除后td中剩余微件的宽度；
	var layout = oTd.attr("layout");
	var $widgets = $(oTd).find(".cportal-widget");
	if (layout == "1") {
		var widgetIds = "";
		$.each($widgets, function(i, widget) {
			widgetIds = $(widget).attr("data_widgetId") + "," + widgetIds;
		})
		refresh(true,widgetIds);
	}
	loadEmptyTpl();
	// 执行后台保存操作
	save();
	isExist();
};
var td;
function widgetSideBar(div) {
	//触发侧边栏
	$(document).on("click", ".addWidgetBtn", function() {
		td = $(this).parents("td");
		if ($(".jsPanel ").length == 0) {
			//获取页面上允许的微件类别
			var widgetType = $("#htmlContainer>form").attr("istype");
			if(widgetType==null){
				widgetType = "";
			}
			//查询指定类别下的微件
			var allWidgetsWidthType	= queryWidgetWidthType(widgetType);
			// 构建侧边栏
			buildWidget(allWidgetsWidthType);
			// 判断侧边栏微件状态，已使用、未使用
			isExist();
		}
	});
	//关闭侧边栏
	$(document).on("click", ".jsPanel-hdr-r-btn-close", function() {
		$(this).parents(".jsPanel").remove();
	});
	//折叠事件
	$(document).on("click",".widgetType",function(){
		$(this).parent().find(".isWidget").toggle();
	});
	//选择微件事件
	$(document).on("click",".widget",function() {
		var obj = $(this);
		update(obj);
	});
};
//查询指定类别的微件，没有类别，返回全部类别微件
function queryWidgetWidthType(widgetTypeIds){
	var allWidgetsWidthType = "";
	var json = {"widgetTypeIds" : widgetTypeIds};
	$.ajax({
		url : contextPath+"/service/cportal/widgets/getAllWidgetsWidthType",
		type : "POST",
		async : false,
		dataType : "json",
		contentType: "application/json",  
		data: JSON.stringify(json),
		success : function(data){
			allWidgetsWidthType = data;
		}
	});
	return allWidgetsWidthType;
};
//构建侧边栏中微件
function buildWidget(data){
	$(".pageWidgetContainer").empty();//清除上次加载的微件内容
	$.each(data, function(i, widgetType){
		if(widgetType.widgets.length<1)return;
		// 组件类别
		var typeData = {
				widgetTypeId : widgetType.id,
				widgetTypeName :widgetType.name
		}
		var widgetDiv = template('widgetDiv',typeData);
		$(".pageWidgetContainer").append(widgetDiv);
		
		// 组件
		$.each(widgetType.widgets, function(j, widget){
			var widgetData = {
					widgetId : widget.id,
					widgetName : widget.name,
					widgetDesc : widget.desc,
					wLogoPath :  contextPath + widget.icon,
					widgetHeight: widget.height,
					widgetAuthor:widget.author,
					loadType :widget.loadType,
					widgetUrl : widget.content,
					widgetExpUrl :widget.expContent
			}
			var widgetTpl = template('widgets',widgetData);
	        $("ul[id="+widgetType.id+"]").append(widgetTpl);
		});
			
	});
	var pageWidgetColumn= $(".pageWidgetColumn")[0].innerHTML;
	/*侧边栏初始化配置参数*/
	 $('body').jsPanel({
		id : "jsPanelSidr",
		size : {
			width : 265,
			height : $(window).height() - 50
		},
		theme : "light",
		position : "top left",
		overflow : "hidden",
		content : pageWidgetColumn,// 加载内容
		controls : {
			iconfont : 'font-awesome',
			buttons : 'closeonly'
		},
		title : false,
	}); 
}
function update(obj){
	//获取所需数据
	var widgetId = obj.find("input[name=widgetId]").val();
	var widgetName = obj.find("input[name=widgetName]").val();
	var widgetHeight =obj.find("input[name=widgetHeight]").val();
	var loadType = obj.find("input[name=loadType]").val();
	var widgetUrl = obj.find("input[name=widgetUrl]").val();
	var widgetExpUrl = obj.find("input[name=widgetExpUrl]").val();
	var $widgets;
	//获取微件存在状态
	var display= obj.find(".fa-check-square")[0].style.display
	//根据存在状态判断处理
	if(display!="none"){//页面已存在该微件
		//当前微件所在页面TD
		var widgetTd = $(".ue-panel[data_widgetId="+widgetId+"]").parents("td")[0]
		//删除该页面上的微件
		$("div[data_widgetId="+widgetId+"]").remove();
		//侧边栏中微件图标去除对号
		obj.find(".fa-check-square").hide();
		//调整原td中微件宽度
		setWidth(widgetTd);
	    $widgets = $(widgetTd).find(".cportal-widget")
		//向该空TD中加载"添加微件"按钮
		 loadEmptyTpl();
	}else{
		//移除添加微件按钮，更改侧边栏状态
		$(td).find(".addWidget").remove();
		obj.find(".fa-check-square").show();
		var tdlayout = $(td).attr("layout");
		if(tdlayout!="1"&&tdlayout!="2"){
			$(td).empty();
		}
		//模板赋值
		var data = {
				widgetId: widgetId,
				widgetTitle: widgetName,
				height: widgetHeight+"px",
				widgetUrl:widgetUrl,
	    		widgetExpUrl:widgetExpUrl,
	    		loadType:loadType
		 };
	    var widgetTpl = template('widgetTpl', data);
		//添加新微件
	    $(td).append(widgetTpl);
	    $widgets = $(td).find(".cportal-widget");
	    setWidth(td);
	}
	var widgetIds ="";
	$.each($widgets,function(i,widget){
		widgetIds = $(widget).attr("data_widgetId")+","+widgetIds;
	})
	refresh(true,widgetIds);
	isExist();
	save();
};
function showImgNavigator(){
	$(document).on("click", "#showImgNavigator", function() {
		$(".jsPanel").remove();
		$(".imgnavigator").show();
		$("#htmlContainer").hide();
	});
};
// ////////////////////////////////////////////////////////////////////
//解析当前页面内容执行后台保存操作
function save(){
	var arrayObj = new Array()
	var widgets = $("div[data_widgetId]");
	var pageId = $("#table-panel").parents("form").attr("id");
	//解析微件所在行列信息
	for(var i = 0 ;i<widgets.length;i++){
		var widget = widgets.get(i);
		var widgetId = $(widget).attr("data_widgetId");
	    var cellIndex = widget.parentElement.cellIndex;
		var rowIndex = widget.parentElement.parentElement.rowIndex;
	    var jsonObj = "["+rowIndex+','+cellIndex+','+'"'+widgetId+'"'+"]";
	    arrayObj.push(jsonObj);
	 }
	//执行后台保存操作
	$.ajax({
		url : contextPath+"/service/cportal/pages/dragSave",
		data : "widgetIds="+"["+arrayObj+"]"+"&pageId="+pageId,
		type : "POST"
	});
};
//循环判断页面已有微件与侧边栏中微件状态对应关系
function isExist(){
	$(".fa-check-square").hide();
	//获取所有页面微件id,循环比较
	var pageWidgets = $("div[data_widgetId]");//获得页面上的微件
	var sidrWidgets = $(".jsPanel .widget");//侧边栏中微件
	for(var i = 0 ;i<pageWidgets.length;i++){
		var pageWidget = pageWidgets.get(i);
		var pageWidgetId = $(pageWidget).attr("data_widgetId");//页面上每个微件ID
		for(var j = 0 ;j<sidrWidgets.length;j++){
			var sidrWidget = sidrWidgets.get(j);
			var sidrWidgetId = $(sidrWidget).find("input[name=widgetId]").val();//侧边栏中每个微件ID
			//若页面微件与侧边栏微件id相同，则侧边栏中微件已存在于页面上，对侧边栏中微件添加对号标志
			if(pageWidgetId == sidrWidgetId){
			  var exist = $(".jsPanel input[value="+sidrWidgetId+"]").parent("li").find(".fa-check-square");
			  $(exist).show()
			}
		}
	}
}