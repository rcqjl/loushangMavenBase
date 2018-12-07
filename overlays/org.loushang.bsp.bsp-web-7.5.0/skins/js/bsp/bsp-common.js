/**
 * Loushang BSP Common Javascript
 * BSP Group
 */

/**
 * validform extension
 */
$.extend($.Datatype,{
	//Legal String合法字符串判断，允许的字符有中文、英文和下划线
	"ls" : /^[\u4E00-\u9FA5A-Za-z0-9_·\u0020]+$/,
	
	//合法字符及长度判断
	"ls10" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 10);
	},
	"ls30" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 30);
	},
	"ls32" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 32);
	},
	"ls50" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 50);
	},
	"ls60" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 60);
	},
	"ls100" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 100);
	},
	"lse" : /^[A-Za-z0-9_·\u0020]+$/,
	"lse60" : function(gets, obj, curform, regxp) {
		return isLegalString(gets, obj, curform, regxp, 60);
	}
});

/**
 * 合法字符及长度判断
 */
function isLegalString(gets, obj, curform, regxp, lsLen) {
	if(!regxp["ls"].test(gets)) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.common.000","请输入中、英文或下划线"));
		return false;
	}

	var len = 0;  
    for (var i = 0; i < gets.length; i++) {
        var a = gets.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }

	if(len > lsLen || len < 1) {
		obj.attr("errormsg", L.getLocaleMessage("bsp.common.001","长度不能超过{0}(1汉字的长度为2)",lsLen));
		return false;
	}
}

//提示框
function sticky(msg, style, position) {
	var type = style ? style : "success";
	var place = position ? position : "top";
	$.sticky(msg, {
		autoclose : 2000,
		position : place,
		style : type
	});
}

function alert(msg) {
	$.dialog({
		type: "alert",
		content: msg
	});
}

function renderTitle(data,type,full){
	var tdData = "<span title='" + data + "'>"+data+"</span>";
	return tdData;
};
