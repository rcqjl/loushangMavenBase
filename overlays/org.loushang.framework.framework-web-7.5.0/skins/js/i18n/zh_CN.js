
// datetimepicker
(function($) {
	/***时间选择器***/
	if($.fn.datetimepicker) {
		$.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
		    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月",
		            "十一月", "十二月"],
		    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
		             "十月", "十一月", "十二月"],
		    today: "今天",
		    suffix: [],
		    meridiem: ["上午", "下午"]
		};
	}
    
	/***artdialog弹出框***/
    if($.dialog) {
        $.dialog.locale = {
            'title': '提示',
            'okValue': '确定',
            'cancelValue': '取消'
        };
    }
    
    /***更多搜索组件***/
    if($.fn.morequery) {
        $.fn.morequery.locale = {
            'title': '更多搜索条件',
            'simplifySearch': '精简搜索',
            'moreSearch': '更多搜索'
        };
    }
    
    /***页面渲染中***/
    if($.pageloading) {
        $.pageloading.locale = {
            'loadingTips': '加载中...'
        }; 
    }
    
    /***加载中组件***/
    if($.fn.loading) {
    	$.fn.loading.locale = {
    		'loadingText': '加载中...'
    	};
    }
    
    /**datatable中的分页器**/
    if($.fn.dtable) {
    	$.fn.dtable.locale = {
    		"loadingRecords": "加载中...",
    		"zeroRecords": "未查询到记录",
    		"info": "显示 _START_ 到 _END_ 条 共 _TOTAL_ 条记录",
    		'sSearch': '搜索:'
    	};
    }
    
    /**slickgrid中的分页器**/
    if($.fn.editgrid) {
    	$.fn.editgrid.locale = {
    		'info_item': '显示&nbsp;{0}&nbsp;到&nbsp;{1}&nbsp;条,',
    		'info_total': '共&nbsp;{0}&nbsp;条记录',
    		'select_record': '请选择记录',
    		'delete_data': '确定删除数据？',
    		'msg_isNumber': '请填写数字！',
    		'msg_isFloat': '请填写正确的浮点数！',
    		'msg_isString': '非法字符串！',
    		'msg_isEmail': '请填写正确的邮箱地址！',
    		'msg_isUrl': '请填写正确的url！'
    	}
    }
    
    /**上传组件**/
    if(typeof plupload !== 'undefined' && plupload) {
        plupload.addI18n({
            "Stop Upload":"停止上传",
            "Upload URL might be wrong or doesn't exist.":"上传的URL可能是错误的或不存在。",
            "tb":"tb",
            "Size":"大小",
            "Close":"关闭",
            "Init error.":"初始化错误。",
            "Add files to the upload queue and click the start button.":"将文件添加到上传队列，然后点击”开始上传“按钮。",
            "Filename":"文件名",
            "Image format either wrong or not supported.":"图片格式错误或者不支持。",
            "Status":"状态",
            "HTTP Error.":"HTTP 错误。",
            "Start Upload":"开始上传",
            "mb":"mb",
            "kb":"kb",
            "Duplicate file error.":"重复文件错误。",
            "File size error.":"文件大小错误。",
            "N/A":"N/A",
            "gb":"gb",
            "Error: Invalid file extension:":"错误：无效的文件扩展名:",
            "Select files":"选择文件",
            "%s already present in the queue.":"%s 已经在当前队列里。",
            "File: %s":"文件: %s",
            "b":"b",
            "Uploaded %d/%d files":"已上传 %d/%d 个文件",
            "Upload element accepts only %d file(s) at a time. Extra files were stripped.":"每次只接受同时上传 %d 个文件，多余的文件将会被删除。",
            "%d files queued":"%d 个文件加入到队列",
            "File: %s, size: %d, max file size: %d":"文件: %s, 大小: %d, 最大文件大小: %d",
            "Drag files here.":"把文件拖到这里。",
            "Runtime ran out of available memory.":"运行时已消耗所有可用内存。",
            "File count error.":"文件数量错误。",
            "File extension error.":"文件扩展名错误。",
            "Error: File too large:":"错误: 文件太大:",
            "Add Files":"增加文件"
        });
    }
    
    if(typeof L !== 'undefined') {
        if(L.FlexGrid) {
            L.FlexGrid.locale = {
                "loadingRecords": "加载中...",
                "zeroRecords": "未查询到记录",
                "info": "显示 _START_ 到 _END_ 条 共 _TOTAL_ 条记录",
                'sSearch': "搜索"
            };
        }
        if(L.EditGrid) {
            L.EditGrid.locale = {
                'select_record': '请选择记录',
        		'delete_data': '确定删除数据？',
        		'msg_isNumber': '请填写数字！',
        		'msg_isFloat': '请填写正确的浮点数！',
        		'msg_isString': '非法字符串！',
        		'msg_isEmail': '请填写正确的邮箱地址！',
        		'msg_isUrl': '请填写正确的url！'
            };
        }
    }
}(jQuery));