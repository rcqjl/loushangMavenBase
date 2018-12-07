// datetimepicker
(function($) {
    /**时间选择器组件**/
    if($.fn.datetimepicker){
        $.fn.datetimepicker.dates['en-US'] = {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                  'Friday', 'Saturday', 'Sunday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            months: ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November',
                     'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                         'Sep', 'Oct', 'Nov', 'Dec'],
            meridiem: ['am', 'pm'],
            suffix: ['st', 'nd', 'rd', 'th'],
            today: 'Today',
            clear: 'Clear'
        };
    }
    
    /**artdialog组件**/
    if($.dialog) {
        $.dialog.locale = {
            'title': 'Message',
            'okValue': 'OK',
            'cancelValue': 'Cancel'
        }
    }
    
    /**更多搜索组件**/
    if($.fn.morequery) {
        $.fn.morequery.locale = {
            'title': 'More search',
            'simplifySearch': 'simplify search',
            'moreSearch': 'more search'
        };
    }
    
    /**页面渲染组件**/
    if($.pageloading) {
        $.pageloading.locale = {
            'loadingTips': 'Loading...'
        };
    }
    
    /**加载中组件**/
    if($.fn.loading) {
        $.fn.loading.locale = {
            'loadingText': 'Loading...'
        };
    }
    
    /**datatable中的分页器**/
    if($.fn.dtable) {
        $.fn.dtable.locale = {
            "loadingRecords": "Loading...",
            "zeroRecords": "No records were queried",
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            'sSearch': 'Search:'
        };
    }
    
    /**slickgrid中的分页器**/
    if($.fn.editgrid) {
        $.fn.editgrid.locale = {
            'info_item': 'Showing {0} to {1},&nbsp;',
            'info_total': '{0} of entries',
            'yes': 'yes',
            'no': 'no'
        }
    }
    
    /**上传组件**/
    if(typeof plupload !== 'undefined' && plupload) {
        plupload.addI18n({
            "Stop Upload":"Stop Upload",
            "Upload URL might be wrong or doesn't exist.":"Upload URL might be wrong or doesn't exist.",
            "tb":"tb","Size":"Size",
            "Close":"Close",
            "Init error.":"Init error.",
            "Add files to the upload queue and click the start button.":"Add files to the upload queue and click the start button.",
            "Filename":"Filename",
            "Image format either wrong or not supported.":"Image format either wrong or not supported.",
            "Status":"Status",
            "HTTP Error.":"HTTP Error.",
            "Start Upload":"Start Upload","mb":"mb","kb":"kb",
            "Duplicate file error.":"Duplicate file error.",
            "File size error.":"File size error.",
            "N/A":"N/A","gb":"gb","Error: Invalid file extension:":"Error: Invalid file extension:",
            "Select files":"Select files",
            "%s already present in the queue.":"%s already present in the queue.",
            "File: %s":"File: %s",
            "b":"b",
            "Uploaded %d/%d files":"Uploaded %d/%d files",
            "Upload element accepts only %d file(s) at a time. Extra files were stripped.":"Upload element accepts only %d file(s) at a time. Extra files were stripped.",
            "%d files queued":"%d files queued",
            "File: %s, size: %d, max file size: %d":"File: %s, size: %d, max file size: %d",
            "Drag files here.":"Drag files here.",
            "Runtime ran out of available memory.":"Runtime ran out of available memory.",
            "File count error.":"File count error.",
            "File extension error.":"File extension error.",
            "Error: File too large:":"Error: File too large:",
            "Add Files":"Add Files"
        });
    }
    
    if(typeof L !== 'undefined') {
        if(L.FlexGrid) {
            L.FlexGrid.locale = {
                "loadingRecords": "Loading...",
                "zeroRecords": "No records were queried",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                'sSearch': 'Search:'
            };
        }
        if(L.EditGrid) {
            L.EditGrid.locale = {
                'select_record': 'Please select a record',
                'delete_data': 'delete the datas?',
                'msg_isNumber': 'Please fill in the numbers!',
                'msg_isFloat': 'Please fill in the correct floating number!',
                'msg_isString': 'Illegal string!',
                'msg_isEmail': 'Please fill in the correct email address!',
                'msg_isUrl': 'Please fill in the correct url!'
            };
        }
    }
    
    if($.Tipmsg) {
        $.extend($.Tipmsg, {
            tit:"Prompts",
            w:{
                "*":"Not NULL！",
                "*6-16":"Please fill in 6 to 16 any character！",
                "n":"Please fill in the Numbers！",
                "n6-16":"Please fill in 6 to 16 digits！",
                "s":"Can't enter special characters！",
                "s6-18":"Please fill out the 6 to 18 characters！",
                "p":"Please fill in the zip code！",
                "m":"Please fill in the mobile phone number！",
                "e":"Not a valid email address！",
                "url":"Please fill out the URL！"
            },
            def:"Please fill in the correct information！",
            undef:"datatype undefined！",
            reck:"The content of the two input are inconsistent！",
            r:"Through the verification！",
            c:"Is testing…",
            s:"Please {fill out | select }{0|information}！",
            v:"The no validated the information later, please…",
            p:"Are submitting data, please wait…"
        })
    }
}(jQuery));