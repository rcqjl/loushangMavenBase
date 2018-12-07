/**
 * showDialog
 * Date: 2012.12.18
*/
// 弹出框对象
var gPopFrame = null;
// 回调方法
var gReturnFunc;

$(function(){
	// 解决拖动弹出框时，如果在非标题栏松开鼠标，弹出框会随鼠标移动而移动问题
	$("body").mouseup(function(){
		window.parent.sd_move = false;
	});
	// 解决双击组件，弹出框后，组件处于编辑状态问题
	$("body").focus();
});

function detectMacXFF() {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf("mac") != -1 && userAgent.indexOf("firefox") != -1) {
		return true;
	}
}
/**
 * 判断某值是否在数组中
 * @param needle
 * @param haystack
 * @returns {Boolean}
 */
function in_array(needle, haystack) {
	if(typeof needle == "string" || typeof needle == "number") {
		for(var i in haystack) {
			if(haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}
/**
 * 计算弹出框的上、左偏移，使之居中
 * @param sd_width
 * @param sd_height
 */
function sd_load(sd_width, sd_height) {
	if(sd_width) {
		$("#SD_window").css("width", sd_width + "px");
	}
	if(sd_height){
		$("#SD_window").css("height", sd_height + "px");
	}	
	// 计算居中位置
	// document.compatMode == \"CSS1Compat\"        
	// 默认的兼容模式
	if (document.compatMode == "BackCompat") { 
		sd_top = (document.body.scrollTop + ((document.body.clientHeight-$("#SD_window").height()) / 2)) + "px";
		sd_left = (document.body.scrollLeft + ((document.body.clientWidth-$("#SD_window").width()) / 2)) + "px";
	} else {		
   		var sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
    	var sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
    	sd_top = (sTop + ((document.documentElement.clientHeight-$("#SD_window").height()) / 2)) + "px";			
    	sd_left =  (sLeft + ((document.documentElement.clientWidth-$("#SD_window").width()) / 2)) + "px";
	}
	$("#SD_window").css("top", sd_top);
	$("#SD_window").css("left", sd_left);
}
/**
 * 关闭弹出框
 */
function sd_remove() {
	$("#SD_close,#SD_cancel,#SD_confirm").unbind("click");
	if(gPopFrame){
		// 解决IE下jquery remove iframe 焦点 光标 丢失问题
		// 先将iframe的src置空
		gPopFrame.src = "";
	}	
	// 再remove	
	$("#SD_window,#SD_overlay,#SD_HideSelect").remove();
	
	if(typeof document.body.style.maxHeight == "undefined") {
		$("body","html").css({height: "auto", width: "auto"});
	}
}

/**
 * 关闭弹出框并回调方法
 * @param returnVal 返回值
 */
function closeDialog(returnVal){
	// 回调方法
	if(window.parent.gReturnFunc){
		window.parent.gReturnFunc(returnVal);
	}
	
	// 关闭弹出框
	$("#SD_close",window.parent.document).unbind("click");
	if(window.parent.gPopFrame){
		// 解决IE下jquery remove iframe 焦点 光标 丢失问题
		// 先将iframe的src置空
		window.parent.gPopFrame.src = "";
	}	
	// 再remove	
	$("#SD_overlay",window.parent.document).remove();
	$("#SD_HideSelect",window.parent.document).remove();
	$("#SD_window",window.parent.document).remove();
	
	if(typeof window.parent.document.body.style.maxHeight == "undefined") {
		$("body",window.parent.document).css({height: "auto", width: "auto"});
	}
}

/**
 * 弹出框（confirm、alert、window）
 * @param mode
 * @param msg
 * @param t
 * @param sd_width
 * @param param
 * @param fn
 */
function showDialog(mode, msg, t,confirmtxt,canceltxt, sd_width, isHideCancel) {
	var sd_width = sd_width ? sd_width : 400;
	var mode = in_array(mode, ['confirm', 'info', 'loading']) ? mode : 'alert';
	var t = t ? t : "提示信息";
	var msg = msg ? msg : "";
	var confirmtxt = confirmtxt ? confirmtxt : "确定";
	var canceltxt = canceltxt ? canceltxt : "取消";
	sd_remove();
	try {
		if(typeof document.body.style.maxHeight === "undefined") {
			$("body","html").css({height: "100%", width: "100%"});
			if(document.getElementById("SD_HideSelect") === null) {
				$("body").append("<iframe id='SD_HideSelect'></iframe><div id='SD_overlay'></div>");
			}
		} else {
			if(document.getElementById("SD_overlay") === null) {
				$("body").append("<div id='SD_overlay'></div>");
			}
		}
		if(mode == "alert") {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG");
			}
		} else {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack2");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG2");
			}
		}
		$("body").append("<div id='SD_window'></div>");
		var SD_html = "";
		SD_html += "<table class='SD_table' cellspacing='0' cellpadding='0'><tbody>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td>";
		SD_html += "<td id='SD_container'>";
		SD_html += "<h3 id='SD_title'>" + t + "</h3>";
		SD_html += "<div id='SD_body'><div id='SD_content'>" + msg + "</div></div>";
		SD_html += "<div id='SD_button'><div class='SD_button'>";
		SD_html += "<a id='SD_confirm'>" + confirmtxt + "</a>";
		SD_html += "<a id='SD_cancel'>" + canceltxt + "</a>";
		SD_html += "</div></div>";
		SD_html += "<a href='javascript:;' id='SD_close' title='关闭'></a>";
		SD_html += "</td>";
		SD_html += "<td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr></tbody></table>";
		$("#SD_window").append(SD_html);
		
		$("#SD_title").css("font-size","14px");	
		
		$("#SD_confirm,#SD_cancel,#SD_close").bind("click", function(){
			sd_remove();
		});
		if(mode == "info" || mode == "alert") {
			$("#SD_cancel").hide();
			$("#SD_button").show();
		}
		if(mode == "confirm") {
			$("#SD_button").show();
			if(isHideCancel){
				$("#SD_cancel").hide();
			}
		}
		setCommon(sd_width);		
	} catch(e) {
		alert("系统异常！");
	}
}
/**
 * 提示信息弹出框（定时关闭）
 * @param msg
 * @param fn
 * @param timeout
 */
function showInfo(msg, fn, timeout) {
	showDialog("info", msg);
	$("#SD_confirm").unbind("click");
	if(fn && timeout) {
		st = setTimeout(function(){
			sd_remove();
			fn();
		}, timeout * 1000);
	}
	$("#SD_confirm").bind("click", function(){
		if(timeout) {
			clearTimeout(st);
		}
		sd_remove();
		if(fn) {
			fn();
		}
	});
}
/**
 * 窗口弹出框（转向url页面）
 * @param title
 * @param the_url
 * @param sd_width
 * @param sd_height
 * @param param
 * @param fn
 */
function showWindow(title, the_url, sd_width, sd_height, param, fn) {
	var sd_width = sd_width ? sd_width : 400;
	var sd_height = sd_height ? sd_height : 450;
	sd_remove();
	try {
		if(typeof document.body.style.maxHeight === "undefined") {
			$("body","html").css({height: "100%", width: "100%"});
			if(document.getElementById("SD_HideSelect") === null) {
				$("body").append("<iframe id='SD_HideSelect'></iframe><div id='SD_overlay'></div>");
			}
		} else {
			if(document.getElementById("SD_overlay") === null) {
				$("body").append("<div id='SD_overlay'></div>");
			}
		}
		if(detectMacXFF()) {
			$("#SD_overlay").addClass("SD_overlayMacFFBGHack2");
		} else {
			$("#SD_overlay").addClass("SD_overlayBG2");
		}
		$("body").append("<div id='SD_window'></div>");
		var SD_html = "";
		SD_html += "<table class='SD_table' cellspacing='0' cellpadding='0'><tbody>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td>";
		SD_html += "<td id='SD_container'>";
		SD_html += "<h3 id='SD_title'>" + title + "</h3>";
		SD_html += "<div id='SD_body'><div id='SD_content'><iframe style='width:100%;height:100%;background-color:transparent;' frameborder='0' id='popupFrame' name='popupFrame' width='100%' height='100%'></iframe></div></div>";
		SD_html += "<a href='javascript:;' id='SD_close' title='关闭'></a>";
		SD_html += "</td>";
		SD_html += "<td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr></tbody></table>";
		$("#SD_window").append(SD_html);
		$("#SD_close").bind("click", function(){
			sd_remove();
		});
		
		$("#SD_close").show();
		$("#SD_body").css("padding","0");
		
		setCommon(sd_width, sd_height);
		// 保存输入参数
		gPopFrame = document.getElementById("popupFrame");
		gPopFrame.inParam = param;
		gPopFrame.src = the_url;
		// 保存回调方法
		gReturnFunc = fn;
	} catch(e) {
		alert("系统异常！");
	}
}
/**
 * 提取共通部分
 * @param sd_width
 * @param sd_height
 */
// 弹出框是否处于移动状态
var sd_move = false;
function setCommon(sd_width, sd_height){
	var sd_x, sd_y, maxTop, maxLeft;
	$("#SD_container > h3").click(function(){}).mousedown(function(e){
		e = e || window.event;
		sd_move = true;
		maxTop = $(document.body).height() - $("#SD_window").height();
		maxLeft = $(document.body).width() - $("#SD_window").width();
		sd_x = e.pageX - parseInt($("#SD_window").css("left"));
		sd_y = e.pageY - parseInt($("#SD_window").css("top"));
	});
	$(document).mousemove(function(e){
		if(sd_move){
			e = e || window.event;
			var x = e.pageX - sd_x;
			var y = e.pageY - sd_y;
			// 控制拖动范围
			x = x < 0 ? 0 : x;
			x = x > maxLeft ? maxLeft : x;
			y = y < 0 ? 0 : y;
			y = y > maxTop ? maxTop : y;
			$("#SD_window").css({left:x, top:y});
		}
	}).mouseup(function(){
		sd_move = false;
	});
	
	if(sd_height){
		// 弹出窗口的情况
		$("#SD_body").height(sd_height - 50);
		$("#SD_body").width(sd_width - 2);
	}else{
		$("#SD_body").width(sd_width - 50);
	}
	sd_load(sd_width, sd_height);
	$("#SD_window").show();
	$("#SD_window").focus();
}

/**
 * 确认弹出框
 * @param msg
 * @param fn
 * @param info
 * @param wid
 */
function showConfirm(msg, fn, info, wid, isHideCancel) {
	showDialog("confirm", msg, info, wid, isHideCancel);
	$("#SD_confirm").unbind("click");
	$("#SD_confirm").bind("click", function(){
		sd_remove();
		if(fn) {
			fn();
		}
	});
}