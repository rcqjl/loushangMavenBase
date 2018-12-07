// datetimepicker
(function($) {
	/***时间选择器***/
	if($.fn.datetimepicker) {
		$.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期壹", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周壹", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin: ["日", "壹", "二", "三", "四", "五", "六", "日"],
		    months: ["壹月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月",
			         "十壹月", "十二月"],
		    monthsShort: ["壹月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
				          "十月", "十壹月", "十二月"],
		    today: "今天",
		    suffix: [],
		    meridiem: ["上午", "下午"]
		};
	}
    
	/***artdialog弹出框***/
    if($.dialog) {
        $.dialog.locale = {
            'title': '提示',
            'okValue': '確定',
            'cancelValue': '取消'
        };
    }
    
    /***更多搜索组件***/
    if($.fn.morequery) {
        $.fn.morequery.locale = {
            'title': '更多搜索條件',
            'simplifySearch': '精簡搜索',
            'moreSearch': '更多搜索'
        };
    }
    
    /***页面渲染中***/
    if($.pageloading) {
        $.pageloading.locale = {
            'loadingTips': '加載中...'
        }; 
    }
    
    /***加载中组件***/
    if($.fn.loading) {
    	$.fn.loading.locale = {
    		'loadingText': '加載中...'
    	};
    }
    
    /**datatable中的分页器**/
    if($.fn.dtable) {
    	$.fn.dtable.locale = {
    		"loadingRecords": "加載中...",
    		"zeroRecords": "未查詢到記錄",
    		"info": "顯示 _START_ 到 _END_ 條 共 _TOTAL_ 條記錄",
    		'sSearch': '搜索:'
    	};
    }
    
    /**slickgrid中的分页器**/
    if($.fn.editgrid) {
    	$.fn.editgrid.locale = {
    		'info_item': '顯示&nbsp;{0}&nbsp;到&nbsp;{1}&nbsp;條,',
    		'info_total': '共&nbsp;{0}&nbsp;條記錄',
    		'select_record': '請選擇記錄',
    		'delete_data': '確定刪除數據？',
    		'msg_isNumber': '請填寫數字！',
    		'msg_isFloat': '請填寫正確的浮點數！',
    		'msg_isString': '非法字符串！',
    		'msg_isEmail': '請填寫正確的郵箱地址！',
    		'msg_isUrl': '請填寫正確的url！'
    	}
    }
    
    /**上传组件**/
    if(typeof plupload !== 'undefined' && plupload) {
        plupload.addI18n({
            "Stop Upload":"停止上傳",
            "Upload URL might be wrong or doesn't exist.":"上傳的URL可能是錯誤的或不存在。",
            "tb":"tb",
            "Size":"大小",
            "Close":"關閉",
            "Init error.":"初始化錯誤。",
            "Add files to the upload queue and click the start button.":"將文件添加到上傳隊列，然後點擊”開始上傳“按鈕。",
            "Filename":"文件名",
            "Image format either wrong or not supported.":"圖片格式錯誤或者不支持。",
            "Status":"狀態",
            "HTTP Error.":"HTTP 錯誤。",
            "Start Upload":"開始上傳",
            "mb":"mb",
            "kb":"kb",
            "Duplicate file error.":"重複文件錯誤。",
            "File size error.":"文件大小錯誤。",
            "N/A":"N/A",
            "gb":"gb",
            "Error: Invalid file extension:":"錯誤：無效的文件擴展名:",
            "Select files":"選擇文件",
            "%s already present in the queue.":"%s 已經在當前隊列裏。",
            "File: %s":"文件: %s",
            "b":"b",
            "Uploaded %d/%d files":"已上傳 %d/%d 个文件",
            "Upload element accepts only %d file(s) at a time. Extra files were stripped.":"每次只接受同時上傳 %d 個文件，多余的文件將會被刪除。",
            "%d files queued":"%d 個文件加入到隊列",
            "File: %s, size: %d, max file size: %d":"文件: %s, 大小: %d, 最大文件大小: %d",
            "Drag files here.":"把文件拖到這裏。",
            "Runtime ran out of available memory.":"運行時已消耗所有可用內存。",
            "File count error.":"文件數量錯誤。",
            "File extension error.":"文件擴展名錯誤。",
            "Error: File too large:":"錯誤: 文件太大:",
            "Add Files":"增加文件"
        });
    }
    
    if(typeof L !== 'undefined') {
        if(L.FlexGrid) {
            L.FlexGrid.locale = {
                "loadingRecords": "加載中...",
                "zeroRecords": "未查询到记录",
                "info": "顯示 _START_ 到 _END_ 條 共 _TOTAL_ 條記錄",
                'sSearch': "搜索"
            };
        }
        if(L.EditGrid) {
            L.EditGrid.locale = {
                'select_record': '請選擇記錄',
        		'delete_data': '確定刪除數據？',
        		'msg_isNumber': '請填寫數字！',
        		'msg_isFloat': '請填寫正確的浮點數！',
        		'msg_isString': '非法字符串！',
        		'msg_isEmail': '請填寫正確的郵箱地址！',
        		'msg_isUrl': '請填寫正確的url！'
            };
        }
    }
}(jQuery));