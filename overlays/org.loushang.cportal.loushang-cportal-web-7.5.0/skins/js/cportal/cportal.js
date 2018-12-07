var defNavigator = true;//显示默认导航
var imgNavigator = false;//显示图片轮播导航
var pageInfoArray = ""
$(document).ready(function(){
	//请求用户有权限查看的页面信息
	pageInfoArray = queryAllPageInfo();
	//构建布局
	if(pageInfoArray&&pageInfoArray.length>0){
		layout(pageInfoArray);
	}
});
/////////////////////////////////请求用户有权限查看的页面信息/////////////////////////////
//@return：Array,每一项是一个Object
//key分别为：pageId、pageName、pageUrl
//pageId：页面id
//pageName：页面名称
//pageUrl：页面路径,jsp/cportal/output/***.html
function queryAllPageInfo(){
	var array = [];
	$.ajax({
		url:contextPath+"/service/cportal/pages/getAllPageId",
		async: false,
		dataType:"json",
		success:function(data){
			array = data;
		}
	});
	return array;
};
//////////////////////////////////构建门户////////////////////////////////////////////////
function layout(pageInfoArray){
	//判断门户展现形式
	if(defNavigator&&!imgNavigator){
		initDefNavigator(pageInfoArray);
	}else if(imgNavigator&&!defNavigator){
		initImgNavigator(pageInfoArray);
	}else{
		initOnePage(pageInfoArray[0].pageId, pageInfoArray[0].pageUrl);
	}
};
/////////////////////////////////////////默认导航页面//////////////////////////////////////////////
//构建默认导航页面
function initDefNavigator(pageInfoArray){
	initDefnavigator(pageInfoArray);
	initOnePage(pageInfoArray[0].pageId, pageInfoArray[0].pageUrl);
}
function initDefnavigator(pageInfoArray){
	 //判断是否多页面	 
	 if(pageInfoArray == null || pageInfoArray.length == 0) return;
	 //多个页面加载多页面导航
	 if(pageInfoArray.length > 1){
		 for(var i = 0; i < pageInfoArray.length; i++){
			 var data = {
					 pageName : pageInfoArray[i].pageName,
					 pageId : pageInfoArray[i].pageId,
					 pageUrl : pageInfoArray[i].pageUrl
			 }
			 var pageTpl = template('pageTpl', data);
			 $(".defnavigator").show();
			 $(".defnavigator ul").append(pageTpl);
		 }
	 }
	 $("li[id="+pageInfoArray[0].pageId+"]").addClass("isPage");
	 $("li[id="+pageInfoArray[0].pageId+"]").find("a").addClass("isPagea");
};
/////////////////////////////////////图片导航页面//////////////////////////////////////////
function initImgNavigator(pageInfoArray){
	setImg(pageInfoArray);
	setCarousel();
}
//初始化轮播图片
function setImg(pageInfoArray){
	$(".imgnavigator").show();
	$("#htmlTitle").show();
	if(pageInfoArray.length<=1){
		$(".carousel-control").hide();
		$(".carousel-indicators").hide();
	}else{
		$(".carousel-control").show();
		$(".carousel-indicators").show();
	}
	for(i in pageInfoArray){
		var src
		var iconUrl = pageInfoArray[i].icon;
		if(""!=iconUrl&&iconUrl!=null){
			src = getUrl(iconUrl);
		}else{
			iconUrl = "/skins/skin/cportal/images/def_img_navigator.png";
			src = getUrl(iconUrl);
		}
		var $li = $('<li data-target="#myCarousel" data-slide-to='+i+'></li>')
		var $div = $('<div class="item">'
		+'<input type="hidden" name = "pageId" value = '+pageInfoArray[i].pageId+'>'
		+'<input type="hidden" name = "pageUrl" value = '+pageInfoArray[i].pageUrl+'>'
		+'<input type="hidden" name = "pageName" value = '+pageInfoArray[i].pageName+'>'
		+'<img src='+src+' alt='+pageInfoArray[i].pageName+'>'
		+'</div>');
		if(i==0){
			$div.addClass("active");
			$li.addClass("active");
		}
		$(".carousel-inner").append($div);
		$(".carousel-indicators").append($li);
	}
};
//初始化轮播插件
function setCarousel(){
	$('.carousel').carousel({
			interval: 2000//每帧所停留的时间
	});
};
///////////////////////////////////根据页面id、url渲染一个具体的页面///////////////////////////////////////////////
//构建页面
function initOnePage(pageId,pageUrl){
	//请求页面信息
	var pageInfo = queryPageInfo(pageId);
	//加载布局
	loadPageHtml(pageUrl);
	//加载微件模版
	loadAllWidgetHtml(pageInfo.widgetInfo);
	//请求微件信息
	loadAllWidgetInfo(pageInfo.widgetInfo);
	//“添加微件”按钮
	loadEmptyTpl();
	//响应窗口调整,刷新微件
	resize(true);
}
///////////////////////////////////////加载指定页面信息///////////////////////////////////
//@return:Object
//key分别为:pageId、widgetInfo
//pageId:页面id
//widgetInfo:页面上包含的所有微件信息,是一个Array
//每一项是一个Object
//key分别为:widgetId、widgetName、widgetUrl、loadType、widgetHeight、tr、td
//widgetId:微件id
//widgetName:微件名称
//widgetUrl:微件访问地址
//loadType:加载方式
//widgetHeight:微件高度
//widgeType:微件类型
//icon:微件图标
//tr:微件所在行
//td:微件所在列
function queryPageInfo(pageId){
	var pageInfo = "";
	$.ajax({
	    url:contextPath+"/service/cportal/pages/getPageInfo",
	    data:{"pageId":pageId},
		async: false,
		dataType:"json",
		success:function(data){
			/*//判断页面是否通过云门户定义 
			if(data.pageId =="" ){//自定义页面，通过iframe加载
				var iframe = '<iframe src ="'+contextPath+"/"+pageUrl+
				'"frameBorder="0" scrolling="no" style="height:'+$(window).height()+'px; width:'+$(window).width()+'px;">'+
							'</iframe>';
				$("#htmlContainer").empty().append(iframe);
			}*/
			pageInfo = data
		}
    });
	return pageInfo;
}
/////////////////////////////////////////////////////////////////////////////////////
//加载布局页
function loadPageHtml(pageUrl){
	$.ajax({
		cache: false,
		url : contextPath+"/"+pageUrl,
		async : false,
		success : function(data, textStatus){
			if(data.indexOf("<title>404</title>")>=0){
				$.dialog({
					type : "alert",
					content : L.getLocaleMessage("tip-pagereqfail","页面请求失败，请重新发布！")
				});
				return;
			}else{
				//加载布局页面
				$("#htmlContainer").append(data);
			}
		}
	});
};
//加载微件模版
function loadAllWidgetHtml(widgetInfoArray){
	for(var i=0;i<widgetInfoArray.length;i++){
		var widgetInfo = widgetInfoArray[i];
		//加载微件模板
		loadWidgetHtml(widgetInfo);
	}
	//调整宽度
	setWidth();
};
//加载微件模板
function loadWidgetHtml(widgetInfo){
	var ntr = widgetInfo.tr;
	var ntd = widgetInfo.td;
	var tdElt = $(".cpTable>tbody>tr:eq(" + ntr + ")>td:eq(" + ntd + ")")
	//模板赋值
	var data = {
		widgetId : widgetInfo.widgetId,
		widgetTitle : widgetInfo.widgetName,
		height : widgetInfo.widgetHeight + "px",
		widgetUrl : widgetInfo.widgetUrl,
		widgetExpUrl : widgetInfo.widgetExpUrl,
		loadType : widgetInfo.loadType,
		widgetType : widgetInfo.widgetType,
		icon : widgetInfo.icon
	};
	var widgetTpl = template('widgetTpl', data);

	$(".cpTable>tbody>tr:eq(" + ntr + ")>td:eq(" + ntd + ")").append(widgetTpl);
};
//判断是否有权限访问微件信息
function loadAllWidgetInfo(widgetInfoArray){
	for(var i=0;i<widgetInfoArray.length;i++){
		var widgetInfo = widgetInfoArray[i];
		//加载微件信息
		loadWidgetInfo(widgetInfo);
	}
};
//加载微件信息
function loadWidgetInfo(widgetInfo){
	var isType = $("#htmlContainer>form").attr("istype");
	if(isType==null || isType.indexOf(widgetInfo.widgetType)>=0){
		//组装微件请求URL
		var url = getUrl(widgetInfo.widgetUrl);
		var widgetId = widgetInfo.widgetId;
		var loadType = widgetInfo.loadType;
		//判断加载方式
		if(loadType == 0){
			 $.ajax({
				    cache: false,
					url: url,
					async : false,
					success : function(widgetData){
						$("#" + widgetId).append(widgetData);
					}
			});
		 }else{
			var iframe = '<iframe src ="'+url+
			'"frameBorder="0" scrolling="no" style="height:100%;width:100%;">'+
						'</iframe>';
			 $("#" + widgetId).append(iframe);
		 }
	}else{
		$("#" + widgetInfo.widgetId).append("<div class='widget-notallowed'></div>")
		$(".widget-notallowed").css('background-image',"url("+tmpUrl+")");
	}
}

//////////////////////////////////////
//设置微件宽度
function setWidth(td){
	var $widgets;
	var layout;
	if ("" != td && td != null){
		$widgets = $(td).find(".cportal-widget");
		layout = $(td).attr("layout");
		if($widgets.length!=0){
			var width = 100;
			if(layout=="1"){
				width = 100/($widgets.length);
			};
			$widgets.css("width",width+"%");
		}
	}else{
		$(".cpTable>tbody>tr>td").each(function(){
			$widgets = $(this).find(".cportal-widget");
			layout = $(this).attr("layout");
			if($widgets.length!=0){
				var width = 100;
				if(layout=="1"){
					width = 100/($widgets.length);
				};
				$widgets.css("width",width+"%");
			}
		});
	}
};
//组装微件请求url
function getUrl(setUrl){
	var url;
	var preUrl=setUrl.substr(0,1).toLowerCase();
	
	if(preUrl=="/"){
		url=contextPath+setUrl;
	}else{
		url="http://"+setUrl
	}
	return url;
};
//加载微件添加模块模板
function loadEmptyTpl(){
	//获取所有空TD
	 var tds = $("td:empty");
	 for (var i = 0; i<tds.length; i++){
	    //对每个空TD加载微件添加模块模板	
		 var emptyTD = tds.get(i);
		 var widgetAddTpl = template('widgetAddTpl');
	     $(emptyTD).append(widgetAddTpl);
	  }
};
//响应窗口调整,刷新微件
function resize(resize){
	if(resize){
		$(window).resizeEnd({
			delay : 300
		}, function() {
			var widgetIds = "";
			var widgets = $("div[data_widgetId]");
			for(var i = 0 ;i<widgets.length;i++){
				var widget = widgets.get(i);
				var widgetId = $(widget).attr("data_widgetId");
				widgetIds += widgetId + ","
			}
			refresh(true,widgetIds)
		});
	}
};